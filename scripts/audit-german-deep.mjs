import fs from "node:fs";
import path from "node:path";

const root = path.resolve("dist/client");
const deDir = path.join(root, "de");

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

const allHtmlFiles = walk(root);
const deHtmlFiles = walk(deDir);

console.log(`Auditing ${deHtmlFiles.length} German pages against ${allHtmlFiles.length} total site pages...`);

const allExistingRoutes = new Set(allHtmlFiles.map(f => {
  const rel = path.relative(root, path.dirname(f)).replaceAll("\\", "/");
  return `/${rel ? `${rel}/` : ""}`;
}));
allExistingRoutes.add("/sitemap-index.xml");
allExistingRoutes.add("/sitemap.xml");
allExistingRoutes.add("/sitemap-0.xml");

const vercelJson = JSON.parse(fs.readFileSync("vercel.json", "utf8"));
const redirects = vercelJson.redirects || [];

const issues = {
  brokenLinks: [],
  englishLinksOnGermanPages: [],
  canonicalMismatches: [],
  hreflangIssues: [],
  missingH1: [],
  multipleH1: [],
  badTitleLength: [],
  badDescLength: [],
  wrongLangAttr: [],
  jsonLdUrlIssues: [],
  factualTextIssues: []
};

function text(html) {
  return html
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&(?:[a-z]+|#\d+|#x[\da-f]+);/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

for (const file of deHtmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  const relPath = path.relative(deDir, path.dirname(file)).replaceAll("\\", "/");
  const route = `/de/${relPath ? `${relPath}/` : ""}`;
  const fullUrl = `https://gmttoestconverter.com${route}`;

  // 1. Lang attribute
  const langMatch = html.match(/<html\b[^>]*\blang="([^"]*)"/i);
  if (!langMatch || langMatch[1] !== "de") {
    issues.wrongLangAttr.push({ route, lang: langMatch ? langMatch[1] : "missing" });
  }

  // 2. Canonical
  const canonicalMatch = html.match(/<link rel="canonical" href="([^"]*)"/i);
  if (!canonicalMatch) {
    issues.canonicalMismatches.push({ route, issue: "missing canonical" });
  } else if (canonicalMatch[1] !== fullUrl) {
    issues.canonicalMismatches.push({ route, expected: fullUrl, actual: canonicalMatch[1] });
  }

  // 3. H1
  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => text(m[1]));
  if (h1s.length === 0) issues.missingH1.push(route);
  if (h1s.length > 1) issues.multipleH1.push({ route, h1s });

  // 4. Title / Desc
  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? text(titleMatch[1]) : "";
  if (title.length < 30 || title.length > 65) {
    issues.badTitleLength.push({ route, title, len: title.length });
  }

  const descMatch = html.match(/<meta name="description" content="([^"]*)"/i);
  const desc = descMatch ? descMatch[1] : "";
  if (desc.length < 70 || desc.length > 160) {
    issues.badDescLength.push({ route, desc, len: desc.length });
  }

  // 5. Hreflang
  const hreflangs = [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]*)"/gi)].map(m => ({ lang: m[1], href: m[2] }));
  const deHreflang = hreflangs.find(h => h.lang === "de");
  if (!deHreflang || deHreflang.href !== fullUrl) {
    issues.hreflangIssues.push({ route, issue: "hreflang de missing or mismatch", deHreflang });
  }
  const xDefault = hreflangs.find(h => h.lang === "x-default");
  if (!xDefault) {
    issues.hreflangIssues.push({ route, issue: "missing x-default" });
  }

  // 6. Internal links
  const langCodes = new Set(['EN', 'ES', 'DE', 'FR', 'JA', 'ZH', 'HI', 'AR', 'PT', 'KO', 'IT', 'TR', 'UR', 'BN', 'VI', 'TH', 'ID', 'FA', 'PL']);
  const anchors = [...html.matchAll(/<a\b([^>]*)href="([^"]*)"([^>]*)>([\s\S]*?)<\/a>/gi)];
  for (const m of anchors) {
    const fullTag = m[1] + m[3];
    const href = m[2];
    const anchorText = text(m[4]);

    if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("https://") || href.startsWith("http://")) {
      continue;
    }

    // Normalized internal path
    const targetPath = href.split("?")[0].split("#")[0];
    if (!allExistingRoutes.has(targetPath)) {
      issues.brokenLinks.push({ from: route, href, text: anchorText });
    }

    // Check if link goes to English page when German equivalent exists
    // (excluding intentional language switcher buttons and sitemap cross-language links with hreflang)
    const isLangSwitch = langCodes.has(anchorText) || /hreflang=/i.test(fullTag);
    if (!isLangSwitch && !targetPath.startsWith("/de/")) {
      const deTarget = `/de${targetPath}`;
      if (allExistingRoutes.has(deTarget)) {
        issues.englishLinksOnGermanPages.push({ from: route, href, suggestedDe: deTarget, text: anchorText });
      }
    }
  }

  // 7. Structured data
  const schemas = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
  for (const s of schemas) {
    try {
      const parsed = JSON.parse(s[1]);
      const graph = parsed["@graph"] || [parsed];
      for (const node of graph) {
        if (node.url && !node.url.includes("/de/") && !node.url.includes("facebook") && !node.url.includes("x.com") && !node.url.includes("editorial-policy") && node["@type"] !== "Organization" && node["@type"] !== "WebSite" && node["@type"] !== "Person") {
          issues.jsonLdUrlIssues.push({ route, type: node["@type"], url: node.url });
        }
      }
    } catch (e) {
      issues.jsonLdUrlIssues.push({ route, parseError: e.message });
    }
  }
}

console.log("\n=== AUDIT RESULTS ===");
console.log(`Wrong lang attr: ${issues.wrongLangAttr.length}`);
console.log(`Canonical mismatches: ${issues.canonicalMismatches.length}`);
console.log(`Hreflang issues: ${issues.hreflangIssues.length}`);
console.log(`Missing H1: ${issues.missingH1.length}`);
console.log(`Multiple H1: ${issues.multipleH1.length}`);
console.log(`Bad Title length (<30 or >65): ${issues.badTitleLength.length}`);
console.log(`Bad Desc length (<70 or >160): ${issues.badDescLength.length}`);
console.log(`Broken links: ${issues.brokenLinks.length}`);
console.log(`English links where German exists: ${issues.englishLinksOnGermanPages.length}`);
console.log(`JSON-LD URL issues: ${issues.jsonLdUrlIssues.length}`);

if (issues.englishLinksOnGermanPages.length > 0) {
  console.log("\n--- Sample English links on German pages ---");
  const uniqueSamples = new Map();
  for (const item of issues.englishLinksOnGermanPages) {
    const key = `${item.href} -> ${item.suggestedDe}`;
    if (!uniqueSamples.has(key)) {
      uniqueSamples.set(key, item);
    }
  }
  for (const [key, item] of uniqueSamples.entries()) {
    console.log(`  [Link]: ${item.href} (Text: "${item.text}") -> Should be: ${item.suggestedDe} (Found on: ${item.from})`);
  }
}

if (issues.brokenLinks.length > 0) {
  console.log("\n--- Broken links ---");
  console.log(issues.brokenLinks.slice(0, 10));
}

if (issues.badTitleLength.length > 0) {
  console.log("\n--- Bad Title Lengths ---");
  console.log(issues.badTitleLength.slice(0, 10));
}

if (issues.badDescLength.length > 0) {
  console.log("\n--- Bad Desc Lengths ---");
  console.log(issues.badDescLength.slice(0, 10));
}
