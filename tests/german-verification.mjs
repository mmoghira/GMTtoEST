import fs from "node:fs";
import path from "node:path";
import assert from "node:assert";

const deRoot = fs.existsSync(path.resolve(".vercel/output/static/de"))
  ? path.resolve(".vercel/output/static/de")
  : fs.existsSync(path.resolve("dist/client/de"))
  ? path.resolve("dist/client/de")
  : path.resolve("dist/de");

console.log("=== RUNNING GERMAN LOCALIZATION & SEO VERIFICATION TESTS ===");

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

const allGermanHtmlFiles = walk(deRoot);
console.log(`Found ${allGermanHtmlFiles.length} German pages to verify.`);
assert(allGermanHtmlFiles.length >= 100, `Expected at least 100 German pages, found ${allGermanHtmlFiles.length}`);

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
for (const filePath of allGermanHtmlFiles) {
  const relPath = path.relative(deRoot, path.dirname(filePath)).replaceAll("\\", "/");
  const expectedRoute = `/de/${relPath ? `${relPath}/` : ""}`;
  const fullUrl = `https://gmttoestconverter.com${expectedRoute}`;

  const html = fs.readFileSync(filePath, "utf8");
  if (html.includes('http-equiv="refresh"')) {
    continue;
  }

  // 1. Language attribute
  assert(html.includes('lang="de"'), `HTML lang attribute is not "de" on ${fullUrl}`);

  // 4. Meta robots & Canonical check
  const isBoilerplate = /de\/(about-us|author|contact-us|disclaimer|privacy-policy|terms-of-service|sitemap|tools|world-clock|meeting-planner|event-time-converter|time-difference-calculator|business-hours-overlap|holiday-calendar|travel-planner|developer-tools)\//.test(fullUrl);

  // 2. Canonical
  const canonicalMatch = html.match(/<link rel="canonical" href="([^"]*)"/i);
  assert(canonicalMatch, `Missing canonical link on ${fullUrl}`);
  if (isBoilerplate) {
    const cleanSlug = relPath.replace(/\/$/, "");
    assert.strictEqual(canonicalMatch[1], `https://gmttoestconverter.com/${cleanSlug}/`, `Canonical link should point to English on boilerplate page ${fullUrl}`);
  } else {
    assert.strictEqual(canonicalMatch[1], fullUrl, `Canonical link does not match self URL on ${fullUrl}`);
  }

  // 3. Exactly 1 H1
  const h1Matches = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => text(m[1]));
  assert.strictEqual(h1Matches.length, 1, `Expected exactly 1 H1 on ${fullUrl}, found ${h1Matches.length}: ${h1Matches.join(", ")}`);

  const robotsMatch = html.match(/<meta name="robots" content="([^"]*)"/i);
  assert(robotsMatch, `Missing robots meta tag on ${fullUrl}`);
  if (isBoilerplate) {
    assert(robotsMatch[1].includes("noindex"), `Robots meta tag should specify noindex on boilerplate page ${fullUrl}`);
  } else {
    assert(robotsMatch[1].includes("index"), `Robots meta tag does not allow indexing on ${fullUrl}`);
    assert(!robotsMatch[1].includes("noindex"), `Robots meta tag specifies noindex on ${fullUrl}`);
  }

  // 5. Hreflang alternates (en, de, x-default) on indexable pages
  if (!isBoilerplate) {
    assert(html.includes('hreflang="de"'), `Missing hreflang="de" on ${fullUrl}`);
    assert(html.includes('hreflang="en"'), `Missing hreflang="en" on ${fullUrl}`);
    assert(html.includes('hreflang="x-default"'), `Missing hreflang="x-default" on ${fullUrl}`);
  }

  // 6. Title and description
  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
  assert(titleMatch, `Missing title on ${fullUrl}`);
  const rawTitle = text(titleMatch[1]);
  assert(rawTitle.length >= 25 && rawTitle.length <= 65, `Title length out of bounds (25-65) on ${fullUrl}: "${rawTitle}" (${rawTitle.length} chars)`);

  const descMatch = html.match(/<meta name="description" content="([^"]*)"/i);
  assert(descMatch, `Missing description on ${fullUrl}`);
  assert(descMatch[1].length >= 60 && descMatch[1].length <= 165, `Description length out of bounds on ${fullUrl}: "${descMatch[1]}" (${descMatch[1].length} chars)`);

  // 7. Schema JSON-LD validation
  const schemas = [...html.matchAll(/<script type="application\/ld\+json"(?:[^>]*)>([\s\S]*?)<\/script>/gi)];
  assert(schemas.length > 0, `No JSON-LD schemas found on ${fullUrl}`);
  for (const s of schemas) {
    const parsed = JSON.parse(s[1]); // Ensure valid JSON
    const nodes = Array.isArray(parsed) ? parsed : (parsed["@graph"] || [parsed]);
    for (const node of nodes) {
      if (node.inLanguage) {
        if (Array.isArray(node.inLanguage)) {
          assert(node.inLanguage.includes("de"), `inLanguage array does not include "de" on ${fullUrl}`);
        } else {
          assert.strictEqual(node.inLanguage, "de", `inLanguage is not "de" on ${fullUrl}`);
        }
      }
    }
  }

  testedCount++;
}

console.log(`\n>>> VERIFIED ALL ${testedCount} GERMAN PAGES: 100% PASSING! <<<`);

