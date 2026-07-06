import fs from "node:fs";
import path from "node:path";

const root = path.resolve("dist/client");
const htmlFiles = [];

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(target);
    else if (entry.name === "index.html") htmlFiles.push(target);
  }
}

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

function duplicatePageCount(pages, field) {
  const groups = new Map();
  for (const page of pages) {
    if (!page[field]) continue;
    const matches = groups.get(page[field]) || [];
    matches.push(page.route);
    groups.set(page[field], matches);
  }
  return [...groups.values()]
    .filter((routes) => routes.length > 1)
    .reduce((total, routes) => total + routes.length, 0);
}

function duplicateGroups(pages, field) {
  const groups = new Map();
  for (const page of pages) {
    if (!page[field]) continue;
    const matches = groups.get(page[field]) || [];
    matches.push(page.route);
    groups.set(page[field], matches);
  }
  return [...groups.entries()]
    .filter(([, routes]) => routes.length > 1)
    .sort((a, b) => b[1].length - a[1].length);
}

walk(root);

const pages = htmlFiles.map((file) => {
  const html = fs.readFileSync(file, "utf8");
  const route = `/${path.relative(root, path.dirname(file)).replaceAll("\\", "/")}/`.replace("//", "/");
  const robots = match(html, /<meta name="robots" content="([^"]*)"/i);
  const anchors = [...html.matchAll(/<a\b[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi)];
  const internalAnchors = anchors.filter((anchor) =>
    anchor[1].startsWith("/") || anchor[1].startsWith("https://gmttoestconverter.com")
  );
  const headings = [...html.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi)]
    .map((heading) => ({ level: Number(heading[1]), value: text(heading[2]) }));
  const bodyText = text(match(html, /<body\b[^>]*>([\s\S]*?)<\/body>/i));

  return {
    route,
    html,
    robots,
    indexable: !robots.toLowerCase().includes("noindex"),
    title: text(match(html, /<title>([\s\S]*?)<\/title>/i)),
    description: match(html, /<meta name="description" content="([^"]*)"/i),
    h1: text(match(html, /<h1\b[^>]*>([\s\S]*?)<\/h1>/i)),
    firstH2: headings.find((heading) => heading.level === 2)?.value || "",
    headings,
    wordCount: bodyText.match(/[\p{L}\p{N}]+/gu)?.length || 0,
    keywords: match(html, /<meta name="keywords" content="([^"]*)"/i),
    canonical: match(html, /<link rel="canonical" href="([^"]*)"/i),
    hreflangTargets: [...html.matchAll(/<link rel="alternate" hreflang="[^"]+" href="([^"]*)"/gi)]
      .map((alternate) => alternate[1]),
    emptyInternalAnchors: internalAnchors.filter((anchor) => !text(anchor[2])).length,
    genericInternalAnchors: internalAnchors.filter((anchor) =>
      /^(?:click here|read more|learn more|more|details|here)\s*(?:→|&rarr;)?$/i.test(text(anchor[2]))
    ).length,
    internalTargets: internalAnchors.map((anchor) => {
      try {
        const url = new URL(anchor[1], match(html, /<link rel="canonical" href="([^"]*)"/i));
        url.hash = "";
        url.search = "";
        return url.toString();
      } catch {
        return "";
      }
    }).filter(Boolean),
  };
}).filter((page) => /<html\b/i.test(page.html));

const indexablePages = pages.filter((page) => page.indexable);
const byCanonical = new Map(pages.map((page) => [page.canonical, page]));
const incomingLinks = new Map(pages.map((page) => [page.canonical, 0]));
const brokenInternalTargets = new Set();

for (const page of pages) {
  for (const target of new Set(page.internalTargets)) {
    if (incomingLinks.has(target)) {
      incomingLinks.set(target, incomingLinks.get(target) + 1);
    } else {
      const pathname = new URL(target).pathname;
      if (!path.extname(pathname) && !pathname.startsWith("/_")) brokenInternalTargets.add(target);
    }
  }
}

const noindexHreflangTargets = pages.reduce(
  (total, page) =>
    total + page.hreflangTargets.filter((target) => byCanonical.get(target)?.indexable === false).length,
  0
);

const report = {
  generatedPages: pages.length,
  noindexPages: pages.length - indexablePages.length,
  missingTitles: pages.filter((page) => !page.title).length,
  missingDescriptions: pages.filter((page) => !page.description).length,
  missingH1s: pages.filter((page) => !page.h1).length,
  duplicateTitlePages: duplicatePageCount(indexablePages, "title"),
  duplicateDescriptionPages: duplicatePageCount(indexablePages, "description"),
  duplicateH1Pages: duplicatePageCount(indexablePages, "h1"),
  duplicatePrimaryH2Pages: duplicatePageCount(indexablePages, "firstH2"),
  titlesOver60Characters: indexablePages.filter((page) => page.title.length > 60).length,
  titlesUnder30Characters: indexablePages.filter((page) => page.title.length < 30).length,
  descriptionsOver155Characters: indexablePages.filter((page) => page.description.length > 155).length,
  descriptionsUnder70Characters: indexablePages.filter((page) => page.description.length < 70).length,
  emptyInternalAnchors: pages.reduce((total, page) => total + page.emptyInternalAnchors, 0),
  genericInternalAnchors: pages.reduce((total, page) => total + page.genericInternalAnchors, 0),
  missingH2s: pages.filter((page) => !page.firstH2).length,
  h1sOver70Characters: indexablePages.filter((page) => page.h1.length > 70).length,
  h2sOver70Characters: indexablePages.filter((page) =>
    page.headings.some((heading) => heading.level === 2 && heading.value.length > 70)
  ).length,
  nonSequentialHeadingPages: indexablePages.filter((page) =>
    page.headings.some((heading, index) => index > 0 && heading.level > page.headings[index - 1].level + 1)
  ).length,
  pagesUnder300Words: indexablePages.filter((page) => page.wordCount < 300).length,
  missingMetaKeywords: pages.filter((page) => !page.keywords).length,
  duplicateMetaKeywordPages: duplicatePageCount(indexablePages, "keywords"),
  noindexHreflangTargets,
  missingHreflangTargets: pages.reduce(
    (total, page) => total + page.hreflangTargets.filter((target) => !byCanonical.has(target)).length,
    0
  ),
  orphanPages: indexablePages.filter((page) => (incomingLinks.get(page.canonical) || 0) === 0).length,
  brokenInternalTargets: brokenInternalTargets.size,
};

console.table(report);

if (process.env.SEO_AUDIT_DETAILS === "1") {
  for (const field of ["title", "description", "h1", "firstH2", "keywords"]) {
    console.log(`\nTop duplicate ${field} groups:`);
    for (const [value, routes] of duplicateGroups(indexablePages, field).slice(0, 12)) {
      console.log(`${routes.length} pages: ${value}`);
      console.log(`  ${routes.slice(0, 4).join(", ")}`);
    }
  }
  for (const [label, matches] of [
    ["short titles", indexablePages.filter((page) => page.title.length < 30)],
    ["short descriptions", indexablePages.filter((page) => page.description.length < 70)],
    ["long H1s", indexablePages.filter((page) => page.h1.length > 70)],
    ["low word count pages", indexablePages.filter((page) => page.wordCount < 300)],
  ]) {
    console.log(`\n${label}:`);
    for (const page of matches) {
      const value = label.includes("titles") ? page.title
        : label.includes("descriptions") ? page.description
        : label.includes("H1") ? page.h1
        : `${page.wordCount} words`;
      console.log(`${page.route}: ${value}`);
    }
  }
  console.log("\nlong H2s:");
  for (const page of indexablePages) {
    for (const heading of page.headings.filter((item) => item.level === 2 && item.value.length > 70)) {
      console.log(`${page.route}: ${heading.value}`);
    }
  }
}

const hardFailures = [
  "missingTitles",
  "missingDescriptions",
  "missingH1s",
  "missingH2s",
  "emptyInternalAnchors",
  "noindexHreflangTargets",
  "missingHreflangTargets",
  "brokenInternalTargets",
];

if (hardFailures.some((key) => report[key] > 0)) {
  for (const page of pages.filter((item) => !item.title || !item.description || !item.h1)) {
    console.error(`Missing required SEO markup: ${page.route}`);
  }
  process.exit(1);
}
