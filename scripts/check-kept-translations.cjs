const fs = require('fs');

const kept = ['es', 'de', 'fr', 'pt', 'it'];
const content = fs.readFileSync('theme/i18n/config.ts', 'utf8');
const regex = /slug:\s*["']([^"']*)["']/g;
const slugs = [];
let match;
while ((match = regex.exec(content)) !== null) {
  if (match[1]) slugs.push(match[1]);
}
const uniqueSlugs = [...new Set(slugs)];

for (const lang of kept) {
  let englishTitleCount = 0;
  for (const s of uniqueSlugs) {
    const p = `.vercel/output/static/${lang}/${s}/index.html`;
    if (fs.existsSync(p)) {
      const html = fs.readFileSync(p, 'utf8');
      const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || '';
      if (h1.includes('Denver to New York Time difference')) {
        englishTitleCount++;
      }
    }
  }
  console.log(lang, 'English untranslated titles found:', englishTitleCount);
}
