import fs from "node:fs";
import path from "node:path";
import assert from "node:assert";

const distClient = fs.existsSync(path.resolve("dist/client"))
  ? path.resolve("dist/client")
  : path.resolve("dist");
const nlRoot = path.join(distClient, "nl");

console.log("=== RUNNING HARDENED DUTCH LOCALIZATION & SEO VERIFICATION TESTS ===");

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

const allDutchHtmlFiles = walk(nlRoot);
console.log(`Found ${allDutchHtmlFiles.length} Dutch pages to verify.`);
assert.strictEqual(allDutchHtmlFiles.length, 109, `Expected exactly 109 Dutch pages, found ${allDutchHtmlFiles.length}`);

function text(html) {
  return html
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#38;/g, "&")
    .replace(/&ndash;/g, "–")
    .replace(/&mdash;/g, "—")
    .replace(/\s+/g, " ")
    .trim();
}

let testedCount = 0;
let totalHreflangReciprocalChecks = 0;

for (const filePath of allDutchHtmlFiles) {
  const relPath = path.relative(nlRoot, path.dirname(filePath)).replaceAll("\\", "/");
  const expectedRoute = `/nl/${relPath ? `${relPath}/` : ""}`;
  const fullUrl = `https://gmttoestconverter.com${expectedRoute}`;

  const html = fs.readFileSync(filePath, "utf8");

  // 1. Language attribute
  assert(html.includes('lang="nl"'), `HTML lang attribute is not "nl" on ${fullUrl}`);

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

  // 5. Hreflang alternates (en, nl, x-default) & full reciprocity
  const hreflangTags = [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)];
  assert(hreflangTags.length >= 2, `Expected at least 2 hreflang tags on ${fullUrl}, found ${hreflangTags.length}`);

  const hreflangMap = new Map();
  for (const h of hreflangTags) {
    hreflangMap.set(h[1], h[2]);
  }

  assert(hreflangMap.has("nl"), `Missing hreflang="nl" on ${fullUrl}`);
  assert.strictEqual(hreflangMap.get("nl"), fullUrl, `hreflang="nl" must be self-referential on ${fullUrl}`);
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
    const reciprocalMatch = targetHtml.match(/<link rel="alternate" hreflang="nl" href="([^"]+)"/);
    assert(reciprocalMatch, `Non-reciprocal hreflang: ${fullUrl} links to ${langCode} (${targetUrl}), but ${targetUrl} lacks hreflang="nl"!`);
    assert.strictEqual(reciprocalMatch[1], fullUrl, `Hreflang reciprocity mismatch: ${fullUrl} -> ${targetUrl} returns nl=${reciprocalMatch[1]}`);
    totalHreflangReciprocalChecks++;
  }

  // 6. Title and description
  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
  assert(titleMatch, `Missing title on ${fullUrl}`);
  const rawTitle = text(titleMatch[1]);
  assert(rawTitle.length >= 20 && rawTitle.length <= 75, `Title length out of bounds on ${fullUrl}: "${rawTitle}" (${rawTitle.length} chars)`);

  const descMatch = html.match(/<meta name="description" content="([^"]*)"/i);
  assert(descMatch, `Missing description on ${fullUrl}`);
  assert(descMatch[1].length >= 50 && descMatch[1].length <= 180, `Description length out of bounds on ${fullUrl}: "${descMatch[1]}" (${descMatch[1].length} chars)`);

  // 7. Schema JSON-LD validation
  const schemas = [...html.matchAll(/<script type="application\/ld\+json"(?:[^>]*)>([\s\S]*?)<\/script>/gi)];
  assert(schemas.length > 0, `No JSON-LD schemas found on ${fullUrl}`);
  for (const s of schemas) {
    const parsed = JSON.parse(s[1]);
    const nodes = Array.isArray(parsed) ? parsed : (parsed["@graph"] || [parsed]);
    for (const node of nodes) {
      if (node.inLanguage) {
        if (Array.isArray(node.inLanguage)) {
          assert(node.inLanguage.includes("nl"), `inLanguage array does not include "nl" on ${fullUrl}`);
        } else {
          assert.strictEqual(node.inLanguage, "nl", `inLanguage is not "nl" on ${fullUrl}`);
        }
      }
    }
  }

  testedCount++;
}

console.log(`Audited ${totalHreflangReciprocalChecks} hreflang connections with 100% reciprocity verified.`);

// 8. Verify sitemap inclusion and exact parity
const sitemapPath = path.join(distClient, "sitemap-0.xml");
assert(fs.existsSync(sitemapPath), `${sitemapPath} does not exist`);
const sitemapContent = fs.readFileSync(sitemapPath, "utf8");

// Check crucial Dutch URLs in sitemap
assert(sitemapContent.includes("<loc>https://gmttoestconverter.com/nl/</loc>"), "Sitemap does not include /nl/");
assert(sitemapContent.includes("<loc>https://gmttoestconverter.com/nl/gmt-to-est/</loc>"), "Sitemap does not include /nl/gmt-to-est/");
assert(sitemapContent.includes("<loc>https://gmttoestconverter.com/nl/est-to-gmt/</loc>"), "Sitemap does not include /nl/est-to-gmt/");
assert(sitemapContent.includes("<loc>https://gmttoestconverter.com/nl/gmt-vs-est/</loc>"), "Sitemap does not include /nl/gmt-vs-est/");
assert(sitemapContent.includes("<loc>https://gmttoestconverter.com/nl/sitemap/</loc>"), "Sitemap does not include /nl/sitemap/");

const dutchSitemapMatches = sitemapContent.match(/<loc>https:\/\/gmttoestconverter\.com\/nl\/[^<]*<\/loc>/g) || [];
console.log(`Found ${dutchSitemapMatches.length} Dutch URLs in sitemap-0.xml.`);

// Strict parity assertion
assert.strictEqual(
  dutchSitemapMatches.length,
  allDutchHtmlFiles.length,
  `Strict Parity Failed: Dutch pages (${allDutchHtmlFiles.length}) != Dutch sitemap URLs (${dutchSitemapMatches.length})`
);

// 9. Distinct content & sentence-style capitalization verification (/nl/ vs /nl/gmt-to-est/)
const homeHtml = fs.readFileSync(path.join(nlRoot, "index.html"), "utf8");
const gmtToEstHtml = fs.readFileSync(path.join(nlRoot, "gmt-to-est/index.html"), "utf8");

const homeTitle = text(homeHtml.match(/<title>([\s\S]*?)<\/title>/i)[1]);
const gmtToEstTitle = text(gmtToEstHtml.match(/<title>([\s\S]*?)<\/title>/i)[1]);
assert.notStrictEqual(homeTitle, gmtToEstTitle, "Homepage and gmt-to-est page must have distinct titles to prevent cannibalization");
assert(homeTitle.includes("actuele tijd en 24-uurstabel"), `Expected Dutch sentence-case title on /nl/, found: "${homeTitle}"`);
assert(gmtToEstTitle.includes("actuele tijd en tijdsverschil"), `Expected Dutch sentence-case title on /nl/gmt-to-est/, found: "${gmtToEstTitle}"`);

const homeH1 = text(homeHtml.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)[0]);
const gmtToEstH1 = text(gmtToEstHtml.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)[0]);
assert.notStrictEqual(homeH1, gmtToEstH1, "Homepage and gmt-to-est page must have distinct H1 tags");

// 10. Verify dedicated Amsterdam/Brussels & 2026 DST section with London BST distinction
assert(homeHtml.includes('id="nederland-gmt-new-york"'), "Dedicated section #nederland-gmt-new-york missing on /nl/");
assert(homeHtml.includes("Nederland &amp; België") || homeHtml.includes("Nederland & België"), "Section title missing 'Nederland & België'");
assert(homeHtml.includes("8 maart 2026"), "Missing 2026 US EDT transition date (8 maart 2026)");
assert(homeHtml.includes("29 maart 2026"), "Missing 2026 EU CEST transition date (29 maart 2026)");
assert(homeHtml.includes("25 oktober 2026"), "Missing 2026 EU CET transition date (25 oktober 2026)");
assert(homeHtml.includes("1 november 2026"), "Missing 2026 US EST transition date (1 november 2026)");
assert(homeHtml.includes("British Summer Time (BST"), "Missing London/BST seasonal distinction note in #nederland-gmt-new-york");

// 11. Verify interactive converter UX on Dutch homepage
assert(homeHtml.includes('data-component="converter"'), "Missing interactive converter component on /nl/");
assert(homeHtml.includes('data-copied="Gekopieerd'), "Missing Dutch 'Gekopieerd' copy confirmation label");
assert(homeHtml.includes('data-role="copy-result"'), "Missing copy-result button");
assert(homeHtml.includes('Format 24 h') || homeHtml.includes('24-uurs') || homeHtml.includes('Format'), "Missing 24h toggle label");

// 12. Verify visible FAQ on Dutch blog post
const blogPostHtml = fs.readFileSync(path.join(nlRoot, "blog/understanding-gmt-est/index.html"), "utf8");
assert(blogPostHtml.includes('class="faq"'), "Missing visible FAQ section on Dutch blog post /nl/blog/understanding-gmt-est/");

// 13. Exact Hreflang reconciliation assertion
assert.strictEqual(totalHreflangReciprocalChecks, 2264, `Expected exactly 2264 reciprocal locale hreflang connections, found ${totalHreflangReciprocalChecks}`);

console.log(`\n================================================================`);
console.log(`>>> VERIFIED ALL ${testedCount} DUTCH PAGES WITH EXACT PARITY (109/109): 100% PASSING! <<<`);
console.log(`>>> RECIPROCAL HREFLANG CHECKS: ${totalHreflangReciprocalChecks} VERIFIED (100% RECONCILED)! <<<`);
console.log(`================================================================\n`);
