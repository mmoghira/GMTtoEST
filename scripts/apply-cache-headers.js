const fs = require("fs");
const path = require("path");

const configPath = path.join(process.cwd(), ".vercel", "output", "config.json");

if (!fs.existsSync(configPath)) {
  console.log("No Vercel output config found; skipping cache header patch.");
  process.exit(0);
}

const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

const allLanguages = [
  "es", "zh", "hi", "ar", "pt", "ru", "ja", "de", "fr", "ko",
  "it", "tr", "ur", "bn", "vi", "th", "id", "fa", "pl", "nl"
];
const langPattern = allLanguages.join("|");

const validZones = "acdt|acst|adt|aedt|aest|akdt|akst|ast|awst|bst|cat|cdt|cest|cet|chst|cst|eat|edt|eest|eet|est|hdt|hkt|hst|idt|ist|jst|kst|mdt|mest|met|msk|mst|ndt|nst|nzdt|nzst|pdt|pkt|pst|sast|sst|utc|wat|west|wet|wib|wit|wita";
const validZonesEst = "acdt|acst|adt|aedt|aest|akdt|akst|ast|awst|bst|cat|cdt|cest|cet|chst|cst|eat|edt|eest|eet|gmt|hdt|hkt|hst|idt|ist|jst|kst|mdt|mest|met|msk|mst|ndt|nst|nzdt|nzst|pdt|pkt|pst|sast|sst|utc|wat|west|wet|wib|wit|wita";

const englishOnlyBlogPosts = [
  "2026-monaco-grand-prix-schedule-gmt-est-timezone",
  "black-friday-cyber-monday-2026-times-gmt-est-timezone",
  "canada-time-zones",
  "central-time-to-eastern-time",
  "clocks-change-2026-uk-us-daylight-saving-dates",
  "cst-vs-est",
  "est-vs-edt",
  "fifa-world-cup-2026-kickoff-times-gmt-est-timezone",
  "gmt-vs-est",
  "icc-womens-t20-world-cup-2026-schedule-gmt-est-bst-timezone",
  "la-2028-olympics-timezone-guide-gmt-bst-pkt-ist-worldwide",
  "nba-conference-finals-2026-gmt-est-schedule",
  "newfoundland-time-zone",
  "solheim-cup-2026-schedule-gmt-est-bst-cest-timezone",
  "tour-de-france-2026-stage-times-gmt-est-timezone",
  "uefa-champions-league-final-2026-kickoff-time-gmt-est",
  "us-open-tennis-2026-schedule-gmt-bst-pkt-ist-timezone",
  "us-time-zones",
  "utc-vs-gmt",
  "what-is-daylight-saving-time",
  "what-is-est",
  "what-is-gmt",
  "wimbledon-2026-schedule-gmt-est-bst-timezone"
];

const englishOnlyConverters = [
  "akst-to-est", "sast-to-est", "gmt-to-hdt", "gmt-to-hkt", "gmt-to-hst",
  "gmt-to-jst", "gmt-to-mst", "gmt-to-nst", "gmt-to-nzdt", "gmt-to-pkt", "gmt-to-wat",
  "ist-to-gmt", "est-to-ist"
];

const englishOnlyGuides = [
  "aest", "auckland-time", "australia-time-zones", "berlin-time",
  "best-time-us-asia-meetings", "best-time-us-europe-meetings", "brazil-time-zones",
  "bst", "business-impact-of-dst", "canada-time-zones", "cdt", "cet",
  "chicago-time", "china-time-zone", "corporate-timezone-scheduling",
  "countries-that-use-dst", "countries-without-dst", "cst", "cst-vs-est",
  "daylight-saving-time-explained", "delhi-time", "downloads", "dst-calendar",
  "dst-calendar-tool", "dst-history", "dst-start-end-dates", "dubai-time",
  "editorial-policy", "edt", "est", "est-to-cst", "est-to-pst", "est-vs-edt",
  "faq", "flight-time-calculator", "france-time-zone", "germany-time-zone",
  "global-customer-support-scheduling", "glossary", "gmt", "gmt-vs-utc",
  "handling-time-zones-javascript", "how-time-zones-work", "how-to-convert-time-zones",
  "india-time-zone", "international-date-line-explained", "international-flight-planning",
  "iso-8601-date-time-format", "ist", "japan-time-zone", "java-time-api",
  "jet-lag-explained", "jst", "karachi-time", "london-time", "los-angeles-time",
  "mexico-time-zones", "military-time-converter-guide", "mumbai-time",
  "new-york-time", "pakistan-time-zone", "paris-time", "pdt", "pdt-vs-est",
  "php-datetime-guide", "pst", "remote-team-scheduling", "russia-time-zones",
  "seoul-time", "singapore-time", "south-africa-time-zone",
  "standard-time-vs-daylight-saving-time", "stock-market-opening-times",
  "sydney-time", "time-zone-abbreviations", "time-zone-cheatsheet",
  "time-zone-database-iana", "time-zone-map", "time-zones-for-freelancers",
  "time-zones-for-travelers", "time-zones-in-python", "tokyo-time",
  "toronto-time", "travel-time-planner", "uae-time-zone",
  "united-kingdom-time-zone", "unix-time-explained", "usa-time-zones",
  "utc", "utc-vs-est", "utc-vs-gmt", "vancouver-time",
  "what-is-daylight-saving-time", "what-is-edt", "what-is-utc",
  "what-is-utc-offset", "why-dst-exists", "why-time-zones-exist",
  "widgets", "workday-calculator", "world-time-zones-guide"
];

function generatePreFilesystemRedirects() {
  const routes = [];

  // Canonical host
  routes.push({
    src: "^/(.*)$",
    has: [{ type: "host", value: "www.gmttoestconverter.com" }],
    headers: { Location: "https://gmttoestconverter.com/$1" },
    status: 301
  });

  // 1. Root & legacy aliases
  routes.push({ src: "^/en/?$", headers: { Location: "/" }, status: 301 });
  routes.push({ src: "^/gmt-to-est-converter/?$", headers: { Location: "/" }, status: 301 });
  routes.push({ src: "^/index\\.php/?$", headers: { Location: "/" }, status: 301 });
  routes.push({ src: "^/contact/?$", headers: { Location: "/contact-us/" }, status: 301 });
  routes.push({ src: "^/what-is-gmt/?$", headers: { Location: "/blog/what-is-gmt/" }, status: 301 });

  // 2. MEST redirects
  routes.push({ src: "^/gmt-to-mest/?$", headers: { Location: "/gmt-to-cest/" }, status: 301 });
  routes.push({ src: "^/mest-to-est/?$", headers: { Location: "/cest-to-est/" }, status: 301 });
  routes.push({ src: `^/(${langPattern})/gmt-to-mest/?$`, headers: { Location: "/$1/gmt-to-cest/" }, status: 301 });
  routes.push({ src: `^/(${langPattern})/mest-to-est/?$`, headers: { Location: "/$1/cest-to-est/" }, status: 301 });

  // 3. Japan time alias
  routes.push({ src: "^/japan-time-to-est/?$", headers: { Location: "/jst-to-est/" }, status: 301 });
  routes.push({ src: `^/(${langPattern})/japan-time-to-est/?$`, headers: { Location: "/$1/jst-to-est/" }, status: 301 });

  // 4. Missing language blog root
  routes.push({ src: "^/(?:es|hi|pt|ja|tr|ur|vi|th|id|pl|fr)/blog/?$", headers: { Location: "/blog/" }, status: 301 });

  // 5. English-only blog posts accessed with language prefix
  const blogPattern = englishOnlyBlogPosts.join("|");
  routes.push({ src: `^/(?:${langPattern})/blog/(${blogPattern})/?$`, headers: { Location: "/blog/$1/" }, status: 301 });
  routes.push({ src: `^/(?:es|hi|ar|pt|ru|ja|de|fr|tr|ur|bn|vi|th|id|fa|pl|nl)/blog/(nba-finals-time-gmt-2026)/?$`, headers: { Location: "/blog/$1/" }, status: 301 });
  routes.push({ src: `^/(?:es|zh|hi|pt|ja|fr|ko|it|tr|ur|vi|th|id|pl)/blog/(understanding-gmt-est)/?$`, headers: { Location: "/blog/$1/" }, status: 301 });

  // 6. English-only converters accessed with language prefix
  const convPattern = englishOnlyConverters.join("|");
  routes.push({ src: `^/(?:${langPattern})/(${convPattern})/?$`, headers: { Location: "/$1/" }, status: 301 });

  // 7. English-only guides & cities accessed with language prefix
  const guidePattern = englishOnlyGuides.join("|");
  routes.push({ src: `^/(?:${langPattern})/(${guidePattern})/?$`, headers: { Location: "/$1/" }, status: 301 });

  // 8. Invalid / unactivated converters
  routes.push({ src: `^/gmt-to-(?:(?!${validZones})[a-z0-9]+)/?$`, headers: { Location: "/" }, status: 301 });
  routes.push({ src: `^/(?:(?!${validZonesEst})[a-z0-9]+)-to-est/?$`, headers: { Location: "/" }, status: 301 });
  routes.push({ src: `^/(?:${langPattern})/gmt-to-(?:(?!${validZones})[a-z0-9]+)/?$`, headers: { Location: "/" }, status: 301 });
  routes.push({ src: `^/(?:${langPattern})/(?:(?!${validZonesEst})[a-z0-9]+)-to-est/?$`, headers: { Location: "/" }, status: 301 });

  return routes;
}

const preRedirects = generatePreFilesystemRedirects();

const securityHeadersSource = "^/(.*)$";
const managedSources = new Set([
  securityHeadersSource,
  "^/ads\\.txt$",
  "^/assets/(.*)$",
  "^/(.*\\.(?:avif|webp|png|jpg|jpeg|gif|svg|ico|css|js|woff2?))$",
  "^/(.*\\.(?:html|xml|txt|json))$",
]);

const securityRoutes = [
  {
    src: securityHeadersSource,
    headers: {
      "x-content-type-options": "nosniff",
      "x-frame-options": "SAMEORIGIN",
      "referrer-policy": "strict-origin-when-cross-origin",
    },
    continue: true,
  },
];

const cacheRoutes = [
  {
    src: "^/ads\\.txt$",
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=86400",
    },
    continue: true,
  },
  {
    src: "^/assets/(.*)$",
    headers: {
      "cache-control": "public, max-age=31536000, immutable",
    },
    continue: true,
  },
  {
    src: "^/(.*\\.(?:avif|webp|png|jpg|jpeg|gif|svg|ico|css|js|woff2?))$",
    headers: {
      "cache-control": "public, max-age=31536000, immutable",
    },
    continue: true,
  },
  {
    src: "^/(.*\\.(?:html|xml|txt|json))$",
    headers: {
      "cache-control": "public, max-age=0, must-revalidate",
    },
    continue: true,
  },
];

let routes = Array.isArray(config.routes) ? config.routes : [];

// 1. Update any 308 trailing slash normalizers to 301
for (const r of routes) {
  if (r.headers && r.headers.Location === "/$1/" && r.status === 308) {
    r.status = 301;
  }
}

// 2. Remove any previously injected managed cache/security/custom routes to avoid duplicates
const cleanRoutes = routes.filter((route) => {
  if (managedSources.has(route.src)) return false;
  // Also filter any route that matches our generated preRedirects src
  if (preRedirects.some((pr) => pr.src === route.src)) return false;
  return true;
});

// Locate insertion points
const wellKnownIndex = cleanRoutes.findIndex((route) => route.src && route.src.includes(".well-known"));
const redirectInsertIndex = wellKnownIndex !== -1 ? wellKnownIndex + 1 : 0;

// Insert pre-filesystem redirects before trailing-slash normalizer
const withRedirects = [
  ...cleanRoutes.slice(0, redirectInsertIndex),
  ...preRedirects,
  ...cleanRoutes.slice(redirectInsertIndex),
];

const filesystemIndex = withRedirects.findIndex((route) => route.handle === "filesystem");
const headerInsertIndex = filesystemIndex === -1 ? withRedirects.length : filesystemIndex;

// Insert security and cache headers right before filesystem
const withHeaders = [
  ...withRedirects.slice(0, headerInsertIndex),
  ...securityRoutes,
  ...cacheRoutes,
  ...withRedirects.slice(headerInsertIndex),
];

// Post-filesystem fallbacks (after filesystem check, before 404.html)
const notFoundIndex = withHeaders.findIndex((route) => route.dest === "/404.html");
const fallbackInsertIndex = notFoundIndex !== -1 ? notFoundIndex : withHeaders.length;

const postFilesystemFallbacks = [
  // Any unmatched language blog request -> /blog/
  {
    src: `^/(?:${langPattern})/blog(?:/.*)?$`,
    headers: { Location: "/blog/" },
    status: 301,
  },
  // Any unmatched language converter request -> /
  {
    src: `^/(?:${langPattern})/(?:gmt-to-[^/]+|[^/]+-to-est)/?$`,
    headers: { Location: "/" },
    status: 301,
  },
];

// Filter any existing fallback duplicates
const finalRoutes = [
  ...withHeaders.slice(0, fallbackInsertIndex).filter(r => !postFilesystemFallbacks.some(pf => pf.src === r.src)),
  ...postFilesystemFallbacks,
  ...withHeaders.slice(fallbackInsertIndex),
];

config.routes = finalRoutes;

fs.writeFileSync(configPath, `${JSON.stringify(config, null, "\t")}\n`);
console.log(`Applied single-hop redirects, 301 trailing slash, security, and cache headers to .vercel/output/config.json (${config.routes.length} total routes)`);

// Ensure sitemap.xml exists alongside sitemap-index.xml in output directories
const vercelStaticDir = path.join(process.cwd(), ".vercel", "output", "static");
const distClientDir = path.join(process.cwd(), "dist", "client");

[vercelStaticDir, distClientDir].forEach((dir) => {
  const indexXml = path.join(dir, "sitemap-index.xml");
  const sitemapXml = path.join(dir, "sitemap.xml");
  if (fs.existsSync(indexXml)) {
    fs.copyFileSync(indexXml, sitemapXml);
    console.log(`Copied sitemap-index.xml to sitemap.xml in ${dir}`);
  }
});
