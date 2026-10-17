import fs from 'node:fs';
import path from 'node:path';

const content = fs.readFileSync('.vercel/output/static/sitemap-0.xml', 'utf8');
const urls = [...content.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);

const sitemapExcludedPaths = new Set([
  "/gmt-to-est-converter/",
  "/what-is-gmt/",
  "/what-is-est/",
  "/contact/",
  "/index.php/",
  "/en/",
  "/gmt-to-mest/",
  "/mest-to-est/"
]);

const nonEnglishExcludedSlugs = new Set([
  "/about-us/",
  "/author/",
  "/author/jackie-bruce/",
  "/contact-us/",
  "/disclaimer/",
  "/privacy-policy/",
  "/terms-of-service/",
  "/sitemap/",
  "/editorial-policy/",
  "/gmt-to-mest/",
  "/mest-to-est/"
]);

function filterPage(page) {
  const url = new URL(page);
  const pathname = url.pathname;
  const langMatch = pathname.match(/^\/([a-z]{2})\//);
  const lang = langMatch ? langMatch[1] : "en";
  const cleanPath = pathname.replace(/^\/[a-z]{2}\//, "/");

  // Exclude global exclusions
  if (sitemapExcludedPaths.has(cleanPath)) {
    return false;
  }

  // Exclude translated legal, author and obsolete pages
  if (lang !== "en" && nonEnglishExcludedSlugs.has(cleanPath)) {
    return false;
  }

  return true;
}

const kept = [];
const removed = [];

for (const u of urls) {
  if (filterPage(u)) {
    kept.push(u);
  } else {
    removed.push(u);
  }
}

console.log('Before count:', urls.length);
console.log('After count:', kept.length);
console.log('Removed count:', removed.length);

// Verify kept URLs: check if every kept URL exists as index.html
const staticDir = path.resolve('.vercel/output/static');
let missingKept = 0;
for (const u of kept) {
  const p = new URL(u).pathname;
  const localFile = p === '/' ? path.join(staticDir, 'index.html') : path.join(staticDir, p.replace(/^\//, '').replace(/\/$/, ''), 'index.html');
  if (!fs.existsSync(localFile)) {
    console.log('Missing kept file:', p);
    missingKept++;
  }
}
console.log('Missing kept files count:', missingKept);

console.log('\nSample 10 removed URLs:');
console.log(removed.slice(0, 10));
