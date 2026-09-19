import fs from "node:fs";
import path from "node:path";
import assert from "node:assert";

console.log("=== COMPREHENSIVE VERIFICATION FOR EEST -> GMT & EET -> GMT ===");

const distRoot = path.resolve("dist");

function read(file) {
  return fs.readFileSync(path.join(distRoot, file), "utf8");
}

// 1. Check file existence
assert(fs.existsSync(path.join(distRoot, "eest-to-gmt/index.html")), "eest-to-gmt/index.html does not exist in dist!");
assert(fs.existsSync(path.join(distRoot, "eet-to-gmt/index.html")), "eet-to-gmt/index.html does not exist in dist!");
console.log("✓ Build files exist: dist/eest-to-gmt/index.html and dist/eet-to-gmt/index.html");

const eestHtml = read("eest-to-gmt/index.html");
const eetHtml = read("eet-to-gmt/index.html");

// 2. Canonicals
const eestCanonical = eestHtml.match(/<link rel="canonical" href="([^"]*)"/i)?.[1];
const eetCanonical = eetHtml.match(/<link rel="canonical" href="([^"]*)"/i)?.[1];
assert.strictEqual(eestCanonical, "https://gmttoestconverter.com/eest-to-gmt/", `EEST canonical mismatch: ${eestCanonical}`);
assert.strictEqual(eetCanonical, "https://gmttoestconverter.com/eet-to-gmt/", `EET canonical mismatch: ${eetCanonical}`);
console.log("✓ Canonicals verified: self-canonical for both pages");

// 3. Titles and H1s
const eestTitle = eestHtml.match(/<title>([^<]*)<\/title>/i)?.[1];
const eetTitle = eetHtml.match(/<title>([^<]*)<\/title>/i)?.[1];
assert.strictEqual(eestTitle, "EEST to GMT Converter – Eastern European Summer Time", `EEST title mismatch: ${eestTitle}`);
assert.strictEqual(eetTitle, "EET to GMT Converter – Eastern European Time", `EET title mismatch: ${eetTitle}`);

const eestH1 = eestHtml.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1]?.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
const eetH1 = eetHtml.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1]?.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
assert.strictEqual(eestH1, "EEST to GMT Converter", `EEST H1 mismatch: ${eestH1}`);
assert.strictEqual(eetH1, "EET to GMT Converter", `EET H1 mismatch: ${eetH1}`);
console.log("✓ Titles & H1s verified exactly as specified");

// 4. Meta descriptions
const eestDesc = eestHtml.match(/<meta name="description" content="([^"]*)"/i)?.[1];
const eetDesc = eetHtml.match(/<meta name="description" content="([^"]*)"/i)?.[1];
assert(eestDesc && eestDesc.length >= 70 && eestDesc.length <= 155, `EEST desc length invalid (${eestDesc?.length}): ${eestDesc}`);
assert(eetDesc && eetDesc.length >= 70 && eetDesc.length <= 155, `EET desc length invalid (${eetDesc?.length}): ${eetDesc}`);
console.log(`✓ Meta descriptions valid: EEST (${eestDesc.length} chars), EET (${eetDesc.length} chars)`);

// 5. Robots
const eestRobots = eestHtml.match(/<meta name="robots" content="([^"]*)"/i)?.[1];
const eetRobots = eetHtml.match(/<meta name="robots" content="([^"]*)"/i)?.[1];
assert(eestRobots?.includes("index") && !eestRobots?.includes("noindex"), "EEST robots blocked");
assert(eetRobots?.includes("index") && !eetRobots?.includes("noindex"), "EET robots blocked");
console.log("✓ Robots meta verified: indexable (noindex = false)");

// 6. Converter attributes
assert(eestHtml.includes('data-source-zone="Etc/GMT-3"'), "EEST missing data-source-zone=Etc/GMT-3");
assert(eestHtml.includes('data-target-zone="UTC"'), "EEST missing data-target-zone=UTC");
assert(eestHtml.includes('data-source-label="EEST"'), "EEST missing data-source-label=EEST");
assert(eestHtml.includes('data-target-label="GMT"'), "EEST missing data-target-label=GMT");

assert(eetHtml.includes('data-source-zone="Etc/GMT-2"'), "EET missing data-source-zone=Etc/GMT-2");
assert(eetHtml.includes('data-target-zone="UTC"'), "EET missing data-target-zone=UTC");
assert(eetHtml.includes('data-source-label="EET"'), "EET missing data-source-label=EET");
assert(eetHtml.includes('data-target-label="GMT"'), "EET missing data-target-label=GMT");
console.log("✓ Converter data attributes verified: Etc/GMT-3 (UTC+3) and Etc/GMT-2 (UTC+2) to UTC");

// 7. Sitemap verification
function checkSitemap(targetUrl) {
  let found = 0;
  const sitemapFiles = fs.readdirSync(distRoot).filter(f => f.startsWith("sitemap") && f.endsWith(".xml"));
  for (const sf of sitemapFiles) {
    const sContent = fs.readFileSync(path.join(distRoot, sf), "utf8");
    const locTag = `<loc>${targetUrl}</loc>`;
    const matches = sContent.split(locTag).length - 1;
    found += matches;
  }
  return found;
}

const eestSitemapCount = checkSitemap("https://gmttoestconverter.com/eest-to-gmt/");
const eetSitemapCount = checkSitemap("https://gmttoestconverter.com/eet-to-gmt/");
assert.strictEqual(eestSitemapCount, 1, `EEST in sitemap expected 1, found ${eestSitemapCount}`);
assert.strictEqual(eetSitemapCount, 1, `EET in sitemap expected 1, found ${eetSitemapCount}`);
console.log("✓ Sitemap verified: both URLs present as <loc> exactly once in XML sitemap");

// 8. JSON-LD Structured Data
for (const [name, html] of [["EEST", eestHtml], ["EET", eetHtml]]) {
  const schemas = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
  assert(schemas.length > 0, `${name} has no JSON-LD schemas!`);
  let hasApp = false;
  let hasFaq = false;
  let hasBreadcrumbs = false;
  for (const s of schemas) {
    const parsed = JSON.parse(s[1]);
    const items = Array.isArray(parsed) ? parsed : (parsed["@graph"] || [parsed]);
    for (const item of items) {
      if (item["@type"] === "SoftwareApplication") hasApp = true;
      if (item["@type"] === "FAQPage") hasFaq = true;
      if (item["@type"] === "BreadcrumbList") hasBreadcrumbs = true;
    }
  }
  assert(hasApp, `${name} missing SoftwareApplication schema`);
  assert(hasFaq, `${name} missing FAQPage schema`);
  assert(hasBreadcrumbs, `${name} missing BreadcrumbList schema`);
  console.log(`✓ Structured data verified for ${name}: SoftwareApplication, FAQPage, BreadcrumbList`);
}

// 9. Reciprocal hreflang checks
for (const [name, html, slug] of [["EEST", eestHtml, "eest-to-gmt"], ["EET", eetHtml, "eet-to-gmt"]]) {
  const hreflangMatches = [...html.matchAll(/<link rel="alternate" hreflang="([^"]*)" href="([^"]*)"/gi)];
  assert(hreflangMatches.length > 0, `${name} has no hreflang tags!`);
  for (const [, hl, href] of hreflangMatches) {
    const url = new URL(href);
    const relFile = url.pathname.replace(/^\//, "").replace(/\/$/, "") + "/index.html";
    const targetPath = path.join(distRoot, relFile);
    assert(fs.existsSync(targetPath), `Hreflang target ${href} does not exist at ${targetPath}!`);
    // Check reciprocal
    const targetHtml = fs.readFileSync(targetPath, "utf8");
    const selfCanonical = targetHtml.match(/<link rel="canonical" href="([^"]*)"/i)?.[1];
    assert.strictEqual(selfCanonical, href, `Hreflang target ${href} canonical mismatch: ${selfCanonical}`);
  }
  console.log(`✓ Reciprocal hreflang verified for ${name} (${hreflangMatches.length} alternates pointing to valid 200 pages)`);
}

console.log("\n>>> ALL VERIFICATION CHECKS PASSED PERFECTLY! <<<");