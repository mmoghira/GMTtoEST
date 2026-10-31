const fs = require('fs');

const files = [
  'src/pages/[lang]/contact-us/index.astro',
  'src/pages/[lang]/privacy-policy/index.astro',
  'src/pages/[lang]/terms-of-service/index.astro',
  'src/pages/[lang]/about-us/index.astro',
  'src/pages/[lang]/disclaimer/index.astro',
  'src/pages/[lang]/sitemap/index.astro',
  'src/pages/ar/about-us/index.astro',
  'src/pages/ar/disclaimer/index.astro'
];

for (const f of files) {
  if (fs.existsSync(f)) {
    console.log('=== ' + f + ' ===');
    const content = fs.readFileSync(f, 'utf8');
    const match = content.match(/<BaseLayout[\s\S]*?>/);
    console.log(match ? match[0] : 'not found');
  }
}
