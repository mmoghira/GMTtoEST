import fs from 'node:fs';

const files = [
  'src/pages/[lang]/author/index.astro',
  'src/pages/[lang]/author/jackie-bruce/index.astro',
  'src/pages/[lang]/about-us/index.astro',
  'src/pages/[lang]/contact-us/index.astro',
  'src/pages/[lang]/disclaimer/index.astro',
  'src/pages/[lang]/privacy-policy/index.astro',
  'src/pages/[lang]/terms-of-service/index.astro',
  'src/pages/[lang]/sitemap/index.astro'
];

for (const f of files) {
  if (fs.existsSync(f)) {
    const content = fs.readFileSync(f, 'utf8');
    const robotsMatch = content.match(/robots:\s*["']([^"']+)["']/);
    console.log(f, robotsMatch ? robotsMatch[1] : 'NO ROBOTS FOUND');
  } else {
    console.log(f, 'DOES NOT EXIST');
  }
}
