import fs from 'node:fs';

const content = fs.readFileSync('.vercel/output/static/sitemap-0.xml', 'utf8');
const lines = content.split('\n');
for (const line of lines) {
  if (line.includes('uefa')) {
    console.log(line);
  }
}
