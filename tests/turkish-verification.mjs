import fs from "node:fs";
import path from "node:path";
import assert from "node:assert";

const trRoot = path.resolve("dist/client/tr");
const distClient = path.resolve("dist/client");

console.log("=== RUNNING HARDENED TURKISH LOCALIZATION & SEO VERIFICATION TESTS ===");

function walk(directory) {
  const files = [];
  if (!fs.existsSync(directory)) return files;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walk(target));
    else if (entry.name === "index.html") files.push(target);
  }
  return files;
}

const allTurkishHtmlFiles = walk(trRoot);
console.log(`Found ${allTurkishHtmlFiles.length} Turkish pages to verify.`);
assert.strictEqual(allTurkishHtmlFiles.length, 107, `Expected exactly 107 Turkish pages, found ${allTurkishHtmlFiles.length}`);

function text(html) {
  return html
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#38;/g, "&")
    .replace(/&ndash;/g, "–")
    .replace(/&mdash;/g, "—")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

let testedCount = 0;
let totalHreflangReciprocalChecks = 0;

for (const filePath of allTurkishHtmlFiles) {
  const relPath = path.relative(trRoot, path.dirname(filePath)).replaceAll("\\", "/");
  const expectedRoute = `/tr/${relPath ? `${relPath}/` : ""}`;
  const fullUrl = `https://gmttoestconverter.com${expectedRoute}`;

  const html = fs.readFileSync(filePath, "utf8");

  // 1. Language attribute
  assert(html.includes('lang="tr"'), `HTML lang attribute is not "tr" on ${fullUrl}`);

  // 2. Strict Canonical tag
  const canonicalMatch = html.match(/<link rel="canonical" href="([^"]*)"/i);
  assert(canonicalMatch, `Missing canonical link on ${fullUrl}`);
  assert.strictEqual(canonicalMatch[1], fullUrl, `Canonical link does not match self URL on ${fullUrl}`);
  assert(canonicalMatch[1].startsWith("https://gmttoestconverter.com/"), `Canonical must use https non-www on ${fullUrl}`);
  assert(canonicalMatch[1].endsWith("/"), `Canonical must end with a trailing slash on ${fullUrl}`);

  // 3. Exactly 1 H1
  const h1Matches = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => text(m[1]));
  assert.strictEqual(h1Matches.length, 1, `Expected exactly 1 H1 on ${fullUrl}, found ${h1Matches.length}: ${h1Matches.join(", ")}`);
  assert(h1Matches[0].length >= 5 && h1Matches[0].length <= 100, `H1 length unexpected on ${fullUrl}: "${h1Matches[0]}"`);

  // 4. Meta robots index,follow
  const robotsMatch = html.match(/<meta name="robots" content="([^"]*)"/i);
  assert(robotsMatch, `Missing robots meta tag on ${fullUrl}`);
  assert(robotsMatch[1].includes("index"), `Robots meta tag does not allow indexing on ${fullUrl}`);
  assert(!robotsMatch[1].includes("noindex"), `Robots meta tag specifies noindex on ${fullUrl}`);

  // 5. Hreflang alternates (en, tr, x-default) & full reciprocity
  const hreflangTags = [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)];
  assert(hreflangTags.length >= 2, `Expected at least 2 hreflang tags on ${fullUrl}, found ${hreflangTags.length}`);

  const hreflangMap = new Map();
  for (const h of hreflangTags) {
    hreflangMap.set(h[1], h[2]);
  }

  assert(hreflangMap.has("tr"), `Missing hreflang="tr" on ${fullUrl}`);
  assert.strictEqual(hreflangMap.get("tr"), fullUrl, `hreflang="tr" must be self-referential on ${fullUrl}`);
  assert(hreflangMap.has("x-default"), `Missing hreflang="x-default" on ${fullUrl}`);
  assert(hreflangMap.has("en"), `Missing hreflang="en" on ${fullUrl}`);

  // Reciprocal verification of every hreflang target
  for (const [langCode, targetUrl] of hreflangMap.entries()) {
    if (langCode === "x-default") continue;
    const parsedTarget = new URL(targetUrl);
    let targetRel = parsedTarget.pathname;
    if (targetRel.endsWith("/")) targetRel += "index.html";
    else targetRel += "/index.html";
    if (targetRel.startsWith("/")) targetRel = targetRel.slice(1);

    const targetFilePath = path.resolve(distClient, targetRel);
    assert(fs.existsSync(targetFilePath), `Hreflang target file does not exist: ${targetFilePath} (from ${fullUrl} -> ${targetUrl})`);

    const targetHtml = fs.readFileSync(targetFilePath, "utf8");
    const reciprocalMatch = targetHtml.match(/<link rel="alternate" hreflang="tr" href="([^"]+)"/);
    assert(reciprocalMatch, `Non-reciprocal hreflang: ${fullUrl} links to ${langCode} (${targetUrl}), but ${targetUrl} lacks hreflang="tr"!`);
    assert.strictEqual(reciprocalMatch[1], fullUrl, `Hreflang reciprocity mismatch: ${fullUrl} -> ${targetUrl} returns tr=${reciprocalMatch[1]}`);
    totalHreflangReciprocalChecks++;
  }

  // 6. Title and description
  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
  assert(titleMatch, `Missing title on ${fullUrl}`);
  const rawTitle = text(titleMatch[1]);
  assert(rawTitle.length >= 15 && rawTitle.length <= 80, `Title length out of bounds on ${fullUrl}: "${rawTitle}" (${rawTitle.length} chars)`);

  const descMatch = html.match(/<meta name="description" content="([^"]*)"/i);
  assert(descMatch, `Missing description on ${fullUrl}`);
  assert(descMatch[1].length >= 40 && descMatch[1].length <= 180, `Description length out of bounds on ${fullUrl}: "${descMatch[1]}" (${descMatch[1].length} chars)`);

  // 7. Schema JSON-LD validation
  const schemas = [...html.matchAll(/<script type="application\/ld\+json"(?:[^>]*)>([\s\S]*?)<\/script>/gi)];
  assert(schemas.length > 0, `No JSON-LD schemas found on ${fullUrl}`);
  for (const s of schemas) {
    const parsed = JSON.parse(s[1]);
    const nodes = Array.isArray(parsed) ? parsed : (parsed["@graph"] || [parsed]);
    for (const node of nodes) {
      if (node.inLanguage) {
        if (Array.isArray(node.inLanguage)) {
          assert(node.inLanguage.includes("tr"), `inLanguage array does not include "tr" on ${fullUrl}`);
        } else {
          assert.strictEqual(node.inLanguage, "tr", `inLanguage is not "tr" on ${fullUrl}`);
        }
      }
    }
  }

  testedCount++;
}

console.log(`Audited ${totalHreflangReciprocalChecks} hreflang connections with 100% reciprocity verified.`);

// 8. Verify sitemap inclusion and exact parity
const sitemapPath = path.resolve("dist/client/sitemap-0.xml");
assert(fs.existsSync(sitemapPath), "dist/client/sitemap-0.xml does not exist");
const sitemapContent = fs.readFileSync(sitemapPath, "utf8");

// Check crucial Turkish URLs in sitemap
assert(sitemapContent.includes("<loc>https://gmttoestconverter.com/tr/</loc>"), "Sitemap does not include /tr/");
assert(sitemapContent.includes("<loc>https://gmttoestconverter.com/tr/gmt-to-est/</loc>"), "Sitemap does not include /tr/gmt-to-est/");
assert(sitemapContent.includes("<loc>https://gmttoestconverter.com/tr/est-to-gmt/</loc>"), "Sitemap does not include /tr/est-to-gmt/");
assert(sitemapContent.includes("<loc>https://gmttoestconverter.com/tr/gmt-vs-est/</loc>"), "Sitemap does not include /tr/gmt-vs-est/");
assert(sitemapContent.includes("<loc>https://gmttoestconverter.com/tr/sitemap/</loc>"), "Sitemap does not include /tr/sitemap/");
assert(sitemapContent.includes("<loc>https://gmttoestconverter.com/tr/about-us/</loc>"), "Sitemap does not include /tr/about-us/");
assert(sitemapContent.includes("<loc>https://gmttoestconverter.com/tr/contact-us/</loc>"), "Sitemap does not include /tr/contact-us/");
assert(sitemapContent.includes("<loc>https://gmttoestconverter.com/tr/author/jackie-bruce/</loc>"), "Sitemap does not include /tr/author/jackie-bruce/");

const trSitemapMatches = sitemapContent.split("<loc>").filter(x => x.startsWith("https://gmttoestconverter.com/tr/"));
console.log(`Found ${trSitemapMatches.length} Turkish URLs in sitemap-0.xml.`);

// Strict parity assertion
assert.strictEqual(
  trSitemapMatches.length,
  allTurkishHtmlFiles.length,
  `Strict Parity Failed: Turkish pages (${allTurkishHtmlFiles.length}) != Turkish sitemap URLs (${trSitemapMatches.length})`
);

// 9. Distinct content verification (/tr/ vs /tr/gmt-to-est/)
const homeHtml = fs.readFileSync(path.join(trRoot, "index.html"), "utf8");
const gmtToEstHtml = fs.readFileSync(path.join(trRoot, "gmt-to-est/index.html"), "utf8");

const homeTitle = text(homeHtml.match(/<title>([\s\S]*?)<\/title>/i)[1]);
const gmtToEstTitle = text(gmtToEstHtml.match(/<title>([\s\S]*?)<\/title>/i)[1]);
assert.notStrictEqual(homeTitle, gmtToEstTitle, "Homepage and gmt-to-est page must have distinct titles to prevent cannibalization");
assert(homeTitle.includes("Canlı Saat Farkı"), `Expected Turkish title on /tr/, found: "${homeTitle}"`);
assert(gmtToEstTitle.includes("24 Saatlik Dönüşüm"), `Expected Turkish title on /tr/gmt-to-est/, found: "${gmtToEstTitle}"`);

const homeH1 = text(homeHtml.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)[0]);
const gmtToEstH1 = text(gmtToEstHtml.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)[0]);
assert.notStrictEqual(homeH1, gmtToEstH1, "Homepage and gmt-to-est page must have distinct H1 tags");

// 10. Verify dedicated Turkey comparison section & 2026 DST dates
assert(homeHtml.includes('id="turkiye-gmt-new-york"'), "Dedicated section #turkiye-gmt-new-york missing on /tr/");
assert(homeHtml.includes("Türkiye (TRT)"), "Section missing 'Türkiye (TRT)' reference");
assert(homeHtml.includes("UTC+3"), "Section missing 'UTC+3' reference");
assert(homeHtml.includes("8 Mart 2026"), "Missing 2026 US EDT transition date (8 Mart 2026)");
assert(homeHtml.includes("1 Kasım 2026"), "Missing 2026 US EST transition date (1 Kasım 2026)");

// 11. Verify factual accuracy on /tr/est-to-gmt/
const estToGmtHtml = fs.readFileSync(path.join(trRoot, "est-to-gmt/index.html"), "utf8");
const estToGmtH1 = text(estToGmtHtml.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)[0]);
assert(estToGmtH1.includes("EST'den GMT'ye") || estToGmtH1.includes("EST GMT"), `Factual error on /tr/est-to-gmt/ H1: "${estToGmtH1}"`);

// 12. Verify natural Turkish phrasing on /tr/gmt-vs-est/
const gmtVsEstHtml = fs.readFileSync(path.join(trRoot, "gmt-vs-est/index.html"), "utf8");
const gmtVsEstH1 = text(gmtVsEstHtml.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)[0]);
assert(!gmtVsEstH1.includes("vs"), `Unnatural loanword 'vs' in H1: "${gmtVsEstH1}"`);
assert(gmtVsEstH1.includes("GMT ile EST Arasındaki Saat Farkı"), `H1 mismatch on /tr/gmt-vs-est/: "${gmtVsEstH1}"`);

// 13. Verify all 9 tool pages are unique and localized
const toolSlugs = [
  { slug: "world-clock", expectedTitle: "Dünya Saati" },
  { slug: "meeting-planner", expectedTitle: "Toplantı Planlayıcı" },
  { slug: "event-time-converter", expectedTitle: "Etkinlik Saati" },
  { slug: "time-difference-calculator", expectedTitle: "Saat Farkı" },
  { slug: "business-hours-overlap", expectedTitle: "Mesai Saatleri" },
  { slug: "holiday-calendar", expectedTitle: "Tatil Takvimi" },
  { slug: "travel-planner", expectedTitle: "Seyahat Planlayıcı" },
  { slug: "developer-tools", expectedTitle: "Geliştirici Araçları" },
  { slug: "tools", expectedTitle: "Saat Dilimi Araçları" }
];

for (const { slug, expectedTitle } of toolSlugs) {
  const toolPath = path.join(trRoot, slug, "index.html");
  assert(fs.existsSync(toolPath), `Tool page missing: ${slug}`);
  const toolHtml = fs.readFileSync(toolPath, "utf8");
  const toolTitle = text(toolHtml.match(/<title>([\s\S]*?)<\/title>/i)[1]);
  assert(toolTitle.includes(expectedTitle), `Tool ${slug} title does not include '${expectedTitle}': "${toolTitle}"`);
  assert.notStrictEqual(toolTitle, homeTitle, `Tool ${slug} has cloned homepage title`);
}

// 14. Verify all 7 trust/legal pages
const legalSlugs = [
  { slug: "about-us", expectedH1: "Hakkımızda" },
  { slug: "contact-us", expectedH1: "İletişim" },
  { slug: "author", expectedH1: "Yazar" },
  { slug: "author/jackie-bruce", expectedH1: "Jackie Bruce" },
  { slug: "privacy-policy", expectedH1: "Gizlilik Politikası" },
  { slug: "terms-of-service", expectedH1: "Kullanım Koşulları" },
  { slug: "disclaimer", expectedH1: "Sorumluluk Reddi" }
];

for (const { slug, expectedH1 } of legalSlugs) {
  const legalPath = path.join(trRoot, slug, "index.html");
  assert(fs.existsSync(legalPath), `Legal page missing: ${slug}`);
  const legalHtml = fs.readFileSync(legalPath, "utf8");
  const legalH1 = text(legalHtml.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)[0]);
  assert(legalH1.includes(expectedH1), `Legal page ${slug} H1 does not include '${expectedH1}': "${legalH1}"`);
}

// 15. Verify interactive converter UX on Turkish homepage
assert(homeHtml.includes('data-component="converter"'), "Missing interactive converter component on /tr/");
assert(homeHtml.includes('data-copied="Kopyalandı!"'), "Missing Turkish 'Kopyalandı!' copy confirmation label");
assert(homeHtml.includes('data-role="copy-result"'), "Missing copy-result button");

// 16. Verify vercel.json redirect configuration
const vercelConfig = JSON.parse(fs.readFileSync(path.resolve("vercel.json"), "utf8"));
for (const redirect of vercelConfig.redirects) {
  if (redirect.source.includes("am-to-est") || redirect.source.includes("pm-to-est") || redirect.source.includes("am-to-gmt") || redirect.source.includes("pm-to-gmt")) {
    assert(!redirect.source.includes("tr|"), `Unexpected 'tr|' in vercel redirect source: ${redirect.source}`);
  }
}

// Ensure /tr/blog/ redirect is kept
const blogRedirect = vercelConfig.redirects.find(r => r.source.includes("tr") && r.destination.includes("/blog"));
assert(blogRedirect, "Missing /tr/blog/ redirect rule in vercel.json");

console.log(`\n================================================================`);
console.log(`>>> VERIFIED ALL ${testedCount} TURKISH PAGES WITH EXACT PARITY (107/107): 100% PASSING! <<<`);
console.log(`>>> RECIPROCAL HREFLANG CHECKS: ${totalHreflangReciprocalChecks} VERIFIED (100% RECONCILED)! <<<`);
console.log(`================================================================\n`);
