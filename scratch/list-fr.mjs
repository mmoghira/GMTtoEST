import fs from 'node:fs';

const content = fs.readFileSync('.vercel/output/static/sitemap-0.xml', 'utf8');
const urls = [...content.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
const frUrls = urls.filter(u => u.includes('/fr/'));
console.log('Total /fr/ URLs:', frUrls.length);
console.log(frUrls.join('\n'));
