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

const htmlFiles = walk(deDir);

console.log(`Found ${htmlFiles.length} German HTML files in dist/client/de/`);

function match(html, pattern) {
  return html.match(pattern)?.[1]?.trim() || "";
}

function text(html) {
  return html
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&(?:[a-z]+|#\d+|#x[\da-f]+);/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const audited = [];

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  const relPath = path.relative(deDir, path.dirname(file)).replaceAll("\\", "/");
  const route = `/de/${relPath ? `${relPath}/` : ""}`;
  
  const title = text(match(html, /<title>([\s\S]*?)<\/title>/i));
  const description = match(html, /<meta name="description" content="([^"]*)"/i);
  const canonical = match(html, /<link rel="canonical" href="([^"]*)"/i);
  const robots = match(html, /<meta name="robots" content="([^"]*)"/i);
  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => text(m[1]));
  const h2s = [...html.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/gi)].map(m => text(m[1]));
  const langAttr = match(html, /<html\b[^>]*\blang="([^"]*)"/i);
  const ogLocale = match(html, /<meta property="og:locale" content="([^"]*)"/i);
  const ogUrl = match(html, /<meta property="og:url" content="([^"]*)"/i);
  const hreflangs = [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]*)"/gi)].map(m => ({ lang: m[1], href: m[2] }));
  
  // Anchors
  const anchors = [...html.matchAll(/<a\b[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi)].map(m => ({
    href: m[1],
    anchorText: text(m[2])
  }));

  // Schema
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)].map(m => {
    try {
      return JSON.parse(m[1]);
    } catch (e) {
      return { parseError: e.message };
    }
  });

  audited.push({
    file,
    route,
    title,
    titleLen: title.length,
    description,
    descLen: description.length,
    canonical,
    robots,
    h1s,
    h2s,
    langAttr,
    ogLocale,
    ogUrl,
    hreflangs,
    anchorsCount: anchors.length,
    schemasCount: schemas.length,
    anchors,
    schemas
  });
}

// Print summary of primary German pages
const primaryRoutes = ["/de/", "/de/gmt-to-est/", "/de/est-to-gmt/", "/de/gmt-vs-est/", "/de/time-zone-guide/", "/de/blog/"];
for (const p of audited.filter(a => primaryRoutes.includes(a.route))) {
  console.log(`\n========================================`);
  console.log(`ROUTE: ${p.route}`);
  console.log(`Title (${p.titleLen} chars): ${p.title}`);
  console.log(`Description (${p.descLen} chars): ${p.description}`);
  console.log(`Canonical: ${p.canonical}`);
  console.log(`Robots: ${p.robots}`);
  console.log(`HTML Lang: ${p.langAttr}`);
  console.log(`OG Locale: ${p.ogLocale}`);
  console.log(`OG URL: ${p.ogUrl}`);
  console.log(`H1s (${p.h1s.length}): ${p.h1s.join(" | ")}`);
  console.log(`H2s (${p.h2s.length}):`);
  p.h2s.forEach(h => console.log(`  - ${h}`));
  console.log(`Hreflangs (${p.hreflangs.length}):`, p.hreflangs.map(h => `${h.lang}->${h.href}`).slice(0, 5));
}
