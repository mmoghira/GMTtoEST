import fs from "node:fs";
import path from "node:path";
import assert from "node:assert";

const nlRoot = path.resolve("dist/client/nl");

console.log("=== RUNNING DUTCH LOCALIZATION & SEO VERIFICATION TESTS ===");

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
assert(allDutchHtmlFiles.length >= 100, `Expected at least 100 Dutch pages, found ${allDutchHtmlFiles.length}`);

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
for (const filePath of allDutchHtmlFiles) {
  const relPath = path.relative(nlRoot, path.dirname(filePath)).replaceAll("\\", "/");
  const expectedRoute = `/nl/${relPath ? `${relPath}/` : ""}`;
  const fullUrl = `https://gmttoestconverter.com${expectedRoute}`;

  const html = fs.readFileSync(filePath, "utf8");

  // 1. Language attribute
  assert(html.includes('lang="nl"'), `HTML lang attribute is not "nl" on ${fullUrl}`);

  // 2. Canonical tag
  const canonicalMatch = html.match(/<link rel="canonical" href="([^"]*)"/i);
  assert(canonicalMatch, `Missing canonical link on ${fullUrl}`);
  assert.strictEqual(canonicalMatch[1], fullUrl, `Canonical link does not match self URL on ${fullUrl}`);

  // 3. Exactly 1 H1
  const h1Matches = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => text(m[1]));
  assert.strictEqual(h1Matches.length, 1, `Expected exactly 1 H1 on ${fullUrl}, found ${h1Matches.length}: ${h1Matches.join(", ")}`);

  // 4. Meta robots index,follow
  const robotsMatch = html.match(/<meta name="robots" content="([^"]*)"/i);
  assert(robotsMatch, `Missing robots meta tag on ${fullUrl}`);
  assert(robotsMatch[1].includes("index"), `Robots meta tag does not allow indexing on ${fullUrl}`);
  assert(!robotsMatch[1].includes("noindex"), `Robots meta tag specifies noindex on ${fullUrl}`);

  // 5. Hreflang alternates (en, nl, x-default)
  assert(html.includes('hreflang="nl"'), `Missing hreflang="nl" on ${fullUrl}`);
  assert(html.includes('hreflang="en"'), `Missing hreflang="en" on ${fullUrl}`);
  assert(html.includes('hreflang="x-default"'), `Missing hreflang="x-default" on ${fullUrl}`);

  // 6. Title and description
  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
  assert(titleMatch, `Missing title on ${fullUrl}`);
  const rawTitle = text(titleMatch[1]);
  assert(rawTitle.length >= 20 && rawTitle.length <= 70, `Title length out of bounds (20-70) on ${fullUrl}: "${rawTitle}" (${rawTitle.length} chars)`);

  const descMatch = html.match(/<meta name="description" content="([^"]*)"/i);
  assert(descMatch, `Missing description on ${fullUrl}`);
  assert(descMatch[1].length >= 50 && descMatch[1].length <= 175, `Description length out of bounds on ${fullUrl}: "${descMatch[1]}" (${descMatch[1].length} chars)`);

  // 7. Schema JSON-LD validation
  const schemas = [...html.matchAll(/<script type="application\/ld\+json"(?:[^>]*)>([\s\S]*?)<\/script>/gi)];
  assert(schemas.length > 0, `No JSON-LD schemas found on ${fullUrl}`);
  for (const s of schemas) {
    const parsed = JSON.parse(s[1]); // Ensure valid JSON
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

// 8. Verify sitemap inclusion
const sitemapPath = path.resolve("dist/client/sitemap-0.xml");
assert(fs.existsSync(sitemapPath), "dist/client/sitemap-0.xml does not exist");
const sitemapContent = fs.readFileSync(sitemapPath, "utf8");
assert(sitemapContent.includes("<loc>https://gmttoestconverter.com/nl/</loc>"), "Sitemap does not include /nl/");
assert(sitemapContent.includes("<loc>https://gmttoestconverter.com/nl/est-to-gmt/</loc>"), "Sitemap does not include /nl/est-to-gmt/");
assert(sitemapContent.includes("<loc>https://gmttoestconverter.com/nl/gmt-vs-est/</loc>"), "Sitemap does not include /nl/gmt-vs-est/");

// Count /nl/ URLs in sitemap
const dutchSitemapMatches = sitemapContent.match(/<loc>https:\/\/gmttoestconverter\.com\/nl\/[^<]*<\/loc>/g) || [];
console.log(`Found ${dutchSitemapMatches.length} Dutch URLs in sitemap-0.xml.`);
assert(dutchSitemapMatches.length >= 100, `Expected at least 100 Dutch URLs in sitemap, found ${dutchSitemapMatches.length}`);

// 9. Verify dedicated section on homepage
const nlHomeHtml = fs.readFileSync(path.join(nlRoot, "index.html"), "utf8");
assert(nlHomeHtml.includes('id="nederland-gmt-new-york"'), "Dedicated section #nederland-gmt-new-york missing on /nl/");
assert(nlHomeHtml.includes("Nederland en België"), "Section content missing 'Nederland en België'");

console.log(`\n>>> VERIFIED ALL ${testedCount} DUTCH PAGES + SITEMAP: 100% PASSING! <<<`);
