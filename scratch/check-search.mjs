import fs from 'node:fs';

const content = fs.readFileSync('.vercel/output/static/sitemap-0.xml', 'utf8');
const search = ['bn/gmt-to-nzdt', 'hi/gmt-to-pkt', 'es/gmt-to-hdt', 'japan-time-to-est', 'uefa'];
for (const s of search) {
  console.log(s, content.includes(s));
}
