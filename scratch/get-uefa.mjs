import fs from 'node:fs';

const content = fs.readFileSync('.vercel/output/static/sitemap-0.xml', 'utf8');
const urls = [...content.matchAll(/<url>[\s\S]*?<\/url>/g)].map(m => m[0]);
for (const u of urls) {
  if (u.includes('uefa')) {
    console.log(u);
  }
}
