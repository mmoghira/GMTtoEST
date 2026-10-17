import fs from "fs";

const xml = fs.readFileSync(".vercel/output/static/sitemap-0.xml", "utf8");
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
console.log("Total URLs before:", urls.length);

const sitemapExcludedPaths = new Set([
  "/gmt-to-est-converter/",
  "/what-is-gmt/",
  "/what-is-est/",
  "/gmt-to-mest/",
  "/mest-to-est/",
]);

const nonEnglishExcludedPages = new Set([
  "/about-us/",
  "/author/",
  "/author/jackie-bruce/",
  "/contact-us/",
  "/disclaimer/",
  "/privacy-policy/",
  "/terms-of-service/",
  "/sitemap/",
]);

const removed = [];
const kept = [];

for (const page of urls) {
  const url = new URL(page);
  const pathname = url.pathname;
  const langMatch = pathname.match(/^\/([a-z]{2})\//);
  const lang = langMatch ? langMatch[1] : "en";
  const cleanPath = pathname.replace(/^\/[a-z]{2}\//, "/");

  if (sitemapExcludedPaths.has(cleanPath)) {
    removed.push({ url: page, reason: "sitemapExcludedPaths (MEST redirect source or legacy)" });
  } else if (lang !== "en" && nonEnglishExcludedPages.has(cleanPath)) {
    removed.push({ url: page, reason: "non-English boilerplate (noindex)" });
  } else {
    kept.push(page);
  }
}

console.log("Total URLs kept:", kept.length);
console.log("Total URLs removed:", removed.length);

const reasons = {};
for (const r of removed) {
  reasons[r.reason] = (reasons[r.reason] || 0) + 1;
}
console.log("Removed by reason:", reasons);

// Check if any English boilerplate was accidentally removed
const enBoilerplateRemoved = removed.filter(r => !r.url.match(/\.com\/[a-z]{2}\//));
console.log("English URLs removed:", enBoilerplateRemoved.map(r => r.url));
