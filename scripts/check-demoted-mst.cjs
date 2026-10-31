const fs = require('fs');

const demoted = ['zh', 'hi', 'ar', 'ru', 'ja', 'ko', 'tr', 'ur', 'bn', 'vi', 'th', 'id', 'fa', 'pl', 'nl'];
demoted.forEach(lang => {
  const p = `.vercel/output/static/${lang}/mst-to-est/index.html`;
  if (fs.existsSync(p)) {
    const f = fs.readFileSync(p, 'utf8');
    console.log(lang, 'h1:', f.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1]?.trim());
    console.log(lang, 'canonical:', f.match(/<link\s+rel=["']canonical["'][^>]*href=["']([^"']*)["']/i)?.[1]);
  }
});
