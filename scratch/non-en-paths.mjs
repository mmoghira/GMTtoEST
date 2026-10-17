import fs from 'node:fs';

const content = fs.readFileSync('.vercel/output/static/sitemap-0.xml', 'utf8');
const urls = [...content.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);

const nonEnglishPaths = new Set();
for (const u of urls) {
  const p = new URL(u).pathname;
  if (/^\/[a-z]{2}\//.test(p)) {
    const clean = p.replace(/^\/[a-z]{2}\//, '/');
    nonEnglishPaths.add(clean);
  }
}

console.log('Total non-English clean paths:', nonEnglishPaths.size);
console.log([...nonEnglishPaths].sort().join('\n'));
