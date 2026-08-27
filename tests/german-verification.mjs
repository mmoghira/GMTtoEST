import fs from "node:fs";
import path from "node:path";
import assert from "node:assert";

const deRoot = path.resolve("dist/client/de");

console.log("=== RUNNING GERMAN LOCALIZATION & SEO VERIFICATION TESTS ===");

const primaryPages = [
  {
    path: path.join(deRoot, "index.html"),
    url: "https://gmttoestconverter.com/de/",
    expectedTitle: "GMT zu EST Umrechner – GMT in EST/EDT umrechnen",
    expectedH1: "GMT zu EST Umrechner",
    expectedDesc: "GMT zu EST einfach und schnell umrechnen. Sehen Sie den Zeitunterschied, aktuelle GMT- und EST/EDT-Uhrzeiten sowie eine 24-Stunden-Umrechnungstabelle."
  },
  {
    path: path.join(deRoot, "gmt-to-est/index.html"),
    url: "https://gmttoestconverter.com/de/gmt-to-est/",
    expectedH1: "GMT zu EST Umrechner"
  },
  {
    path: path.join(deRoot, "est-to-gmt/index.html"),
    url: "https://gmttoestconverter.com/de/est-to-gmt/",
    expectedH1: "EST in GMT umrechnen"
  },
  {
    path: path.join(deRoot, "gmt-vs-est/index.html"),
    url: "https://gmttoestconverter.com/de/gmt-vs-est/",
    expectedH1: "GMT vs. EST: Zeitunterschied & Vergleich"
  },
  {
    path: path.join(deRoot, "time-zone-guide/index.html"),
    url: "https://gmttoestconverter.com/de/time-zone-guide/",
    expectedH1: "Zeitzonen-Ratgeber: GMT, EST & Weltzeit"
  },
  {
    path: path.join(deRoot, "blog/index.html"),
    url: "https://gmttoestconverter.com/de/blog/",
    expectedH1: "Blog & Ratgeber"
  },
  {
    path: path.join(deRoot, "blog/understanding-gmt-est/index.html"),
    url: "https://gmttoestconverter.com/de/blog/understanding-gmt-est/",
    expectedH1: "Den Unterschied zwischen GMT und EST verstehen"
  }
];

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

for (const page of primaryPages) {
  console.log(`Checking ${page.url}...`);
  assert(fs.existsSync(page.path), `Missing generated file: ${page.path}`);
  const html = fs.readFileSync(page.path, "utf8");

  // 1. Language attribute
  assert(html.includes('lang="de"'), `HTML lang attribute is not "de" on ${page.url}`);

  // 2. Canonical
  const canonicalMatch = html.match(/<link rel="canonical" href="([^"]*)"/i);
  assert(canonicalMatch, `Missing canonical link on ${page.url}`);
  assert.strictEqual(canonicalMatch[1], page.url, `Canonical link does not match self URL on ${page.url}`);

  // 3. Single H1
  const h1Matches = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => text(m[1]));
  assert.strictEqual(h1Matches.length, 1, `Expected exactly 1 H1 on ${page.url}, found ${h1Matches.length}: ${h1Matches.join(", ")}`);
  if (page.expectedH1) {
    assert.strictEqual(h1Matches[0], page.expectedH1, `H1 mismatch on ${page.url}. Got: "${h1Matches[0]}", Expected: "${page.expectedH1}"`);
  }

  // 4. Meta robots index,follow
  const robotsMatch = html.match(/<meta name="robots" content="([^"]*)"/i);
  assert(robotsMatch, `Missing robots meta tag on ${page.url}`);
  assert(robotsMatch[1].includes("index"), `Robots meta tag does not allow indexing on ${page.url}`);
  assert(!robotsMatch[1].includes("noindex"), `Robots meta tag specifies noindex on ${page.url}`);

  // 5. Hreflang alternates (en, de, x-default)
  assert(html.includes('hreflang="de"'), `Missing hreflang="de" on ${page.url}`);
  assert(html.includes('hreflang="en"'), `Missing hreflang="en" on ${page.url}`);
  assert(html.includes('hreflang="x-default"'), `Missing hreflang="x-default" on ${page.url}`);

  // 6. Title and description
  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
  assert(titleMatch, `Missing title on ${page.url}`);
  const rawTitle = text(titleMatch[1]);
  assert(rawTitle.length >= 30 && rawTitle.length <= 60, `Title length out of bounds (30-60) on ${page.url}: "${rawTitle}" (${rawTitle.length} chars)`);

  const descMatch = html.match(/<meta name="description" content="([^"]*)"/i);
  assert(descMatch, `Missing description on ${page.url}`);
  assert(descMatch[1].length >= 70 && descMatch[1].length <= 155, `Description length out of bounds (70-155) on ${page.url}: "${descMatch[1]}" (${descMatch[1].length} chars)`);

  if (page.expectedTitle) {
    assert.strictEqual(rawTitle, page.expectedTitle, `Title mismatch on ${page.url}`);
  }
  if (page.expectedDesc) {
    assert.strictEqual(descMatch[1], page.expectedDesc, `Description mismatch on ${page.url}`);
  }

  // 7. Schema JSON-LD validation
  const schemas = [...html.matchAll(/<script type="application\/ld\+json"(?:[^>]*)>([\s\S]*?)<\/script>/gi)];
  assert(schemas.length > 0, `No JSON-LD schemas found on ${page.url}`);
  for (const s of schemas) {
    JSON.parse(s[1]); // Ensure valid JSON
  }

  console.log(`  PASS: ${page.url}`);
}

console.log("\n>>> ALL GERMAN LOCALIZATION & SEO VERIFICATION TESTS PASSED SUCCESSFULLY! <<<");
