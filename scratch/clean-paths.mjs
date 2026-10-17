import fs from 'node:fs';

const content = fs.readFileSync('.vercel/output/static/sitemap-0.xml', 'utf8');
const urls = [...content.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);

// Check all unique pathnames without locale
const cleanPaths = new Set();
const langCounts = {};

for (const u of urls) {
  const p = new URL(u).pathname;
  const m = p.match(/^\/([a-z]{2})\//);
  const lang = m ? m[1] : 'en';
  const clean = p.replace(/^\/[a-z]{2}\//, '/');
  cleanPaths.add(clean);
  langCounts[lang] = (langCounts[lang] || 0) + 1;
}

console.log('Total URLs:', urls.length);
console.log('Language distribution:', langCounts);
console.log('\nUnique clean paths count:', cleanPaths.size);
console.log('\nAll unique clean paths:');
console.log([...cleanPaths].sort().join('\n'));
