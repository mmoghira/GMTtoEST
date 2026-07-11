import fs from "node:fs";
import path from "node:path";

const root = path.resolve("dist/client");
const publisherId = "ca-pub-3364858473460532";
const sellerId = publisherId.replace("ca-", "");
const expectedAdsTxt = `google.com, ${sellerId}, DIRECT, f08c47fec0942fa0`;
const forbiddenDomains = [
  "effectivecpmnetwork.com",
  "sleepoverlimitprofound.com",
  "fizzyacerbitymellow.com",
  "protrafficinspector.com",
  "clarity.ms",
];
const trustRoutes = [
  "/about-us/",
  "/author/",
  "/contact-us/",
  "/editorial-policy/",
  "/privacy-policy/",
  "/terms-of-service/",
  "/disclaimer/",
];
const policyRoutes = new Set([
  ...trustRoutes,
  "/sitemap/",
  "/404/",
]);

if (!fs.existsSync(root)) {
  console.error("Build output not found. Run `npm run build` before `npm run audit:ads`.");
  process.exit(1);
}

function walk(directory, matches = []) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(target, matches);
    else if (entry.name === "index.html") matches.push(target);
  }
  return matches;
}

function routeFor(file) {
  const relative = path.relative(root, file).replaceAll("\\", "/");
  if (relative === "index.html") return "/";
  if (relative.endsWith("/index.html")) return `/${relative.slice(0, -10)}`;
  return `/${relative}`;
}

const pages = walk(root)
  .map((file) => ({ file, route: routeFor(file), html: fs.readFileSync(file, "utf8") }))
  .filter((page) => /<html\b/i.test(page.html));

const sourceFiles = [
  "theme/layouts/BaseLayout.astro",
  "vercel.json",
  "public/_headers",
  "scripts/apply-cache-headers.js",
].map((file) => ({ file, content: fs.readFileSync(path.resolve(file), "utf8") }));

const adsTxtFiles = ["ads.txt", "public/ads.txt"];
const adsTxtMismatch = adsTxtFiles.filter((file) => {
  const content = fs.readFileSync(path.resolve(file), "utf8").trim();
  return content !== expectedAdsTxt;
});

const missingPublisherMeta = pages.filter(
  (page) =>
    !page.html.includes(
      `<meta name="google-adsense-account" content="${publisherId}">`
    )
);
const missingConsentDefaults = pages.filter(
  (page) =>
    !page.html.includes("gtag('consent', 'default'") ||
    !page.html.includes("ad_storage: 'denied'") ||
    !page.html.includes("ad_user_data: 'denied'") ||
    !page.html.includes("ad_personalization: 'denied'") ||
    !page.html.includes("analytics_storage: 'denied'")
);
const pagesWithAds = pages.filter((page) =>
  page.html.includes("pagead2.googlesyndication.com/pagead/js/adsbygoogle.js")
);
const duplicateAdLoaders = pages.filter(
  (page) =>
    (
      page.html.match(
        /pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js/g
      ) || []
    ).length > 1
);
const nonEnglishAdPages = pagesWithAds.filter((page) =>
  /^\/(?:ar|bn|de|es|fa|fr|hi|id|it|ja|ko|pl|pt|ru|th|tr|ur|vi|zh)(?:\/|$)/.test(
    page.route
  )
);
const policyAdPages = pagesWithAds.filter((page) => policyRoutes.has(page.route));
const expectedAdRoutes = ["/", "/est-to-gmt/", "/gmt-vs-est/", "/time-zone-guide/"];
const missingCoreAdLoaders = expectedAdRoutes.filter(
  (route) => !pagesWithAds.some((page) => page.route === route)
);
const missingTrustPages = trustRoutes.filter(
  (route) => !pages.some((page) => page.route === route)
);

const privacyPage = pages.find((page) => page.route === "/privacy-policy/");
const requiredPrivacySignals = [
  "Google AdSense",
  "cookies",
  "personalized",
  "non-personalized",
  "Your Privacy Rights and Choices",
  'id="privacy-rights"',
];
const missingPrivacySignals = requiredPrivacySignals.filter(
  (signal) => !privacyPage?.html.toLowerCase().includes(signal.toLowerCase())
);

const forbiddenDomainOccurrences = [];
for (const source of sourceFiles) {
  for (const domain of forbiddenDomains) {
    if (source.content.includes(domain)) {
      forbiddenDomainOccurrences.push(`${source.file}: ${domain}`);
    }
  }
}
for (const page of pages) {
  for (const domain of forbiddenDomains) {
    if (page.html.includes(domain)) {
      forbiddenDomainOccurrences.push(`${page.route}: ${domain}`);
    }
  }
}

const cspHeaderLocations = sourceFiles
  .filter((source) => /content-security-policy/i.test(source.content))
  .map((source) => source.file);

const report = {
  generatedPages: pages.length,
  pagesWithAdSenseLoader: pagesWithAds.length,
  adsTxtMismatch: adsTxtMismatch.length,
  missingPublisherMeta: missingPublisherMeta.length,
  missingConsentDefaults: missingConsentDefaults.length,
  duplicateAdLoaders: duplicateAdLoaders.length,
  nonEnglishAdPages: nonEnglishAdPages.length,
  policyAdPages: policyAdPages.length,
  missingCoreAdLoaders: missingCoreAdLoaders.length,
  missingTrustPages: missingTrustPages.length,
  missingPrivacySignals: missingPrivacySignals.length,
  forbiddenDomainOccurrences: forbiddenDomainOccurrences.length,
  cspHeadersThatMayBlockAds: cspHeaderLocations.length,
};

console.table(report);

const failures = [
  ...adsTxtMismatch.map((file) => `ads.txt mismatch: ${file}`),
  ...missingPublisherMeta.map((page) => `Missing publisher meta: ${page.route}`),
  ...missingConsentDefaults.map((page) => `Missing consent defaults: ${page.route}`),
  ...duplicateAdLoaders.map((page) => `Duplicate AdSense loader: ${page.route}`),
  ...nonEnglishAdPages.map((page) => `AdSense on non-English page: ${page.route}`),
  ...policyAdPages.map((page) => `AdSense on policy/trust page: ${page.route}`),
  ...missingCoreAdLoaders.map((route) => `Missing AdSense loader: ${route}`),
  ...missingTrustPages.map((route) => `Missing trust page: ${route}`),
  ...missingPrivacySignals.map((signal) => `Privacy policy missing: ${signal}`),
  ...forbiddenDomainOccurrences.map((match) => `Forbidden tracker/ad network: ${match}`),
  ...cspHeaderLocations.map((file) => `AdSense-incompatible static CSP remains: ${file}`),
];

if (failures.length > 0) {
  console.error("\nAd-readiness audit failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `\nAd-readiness checks passed. ${pagesWithAds.length} strong English pages load AdSense; policy and localized pages do not.`
);
