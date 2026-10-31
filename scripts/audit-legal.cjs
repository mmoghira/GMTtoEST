const fs = require('fs');
const path = require('path');

const languages = [
  "es", "zh", "hi", "ar", "pt", "ru", "ja", "de", "fr", "ko",
  "it", "tr", "ur", "bn", "vi", "th", "id", "fa", "pl", "nl"
];

const legalSlugs = [
  "contact-us",
  "privacy-policy",
  "terms-of-service",
  "about-us",
  "disclaimer",
  "author",
  "author/jackie-bruce",
  "sitemap"
];

const staticDir = path.join(process.cwd(), '.vercel', 'output', 'static');
const results = [];

for (const lang of languages) {
  for (const slug of legalSlugs) {
    const relPath = `${lang}/${slug}/index.html`;
    const fullPath = path.join(staticDir, relPath);
    const url = `/${lang}/${slug}/`;
    if (fs.existsSync(fullPath)) {
      const html = fs.readFileSync(fullPath, 'utf8');
      const robotsMatch = html.match(/<meta\s+name=["']robots["']\s+content=["']([^"']*)["']/i);
      const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i);
      const robots = robotsMatch ? robotsMatch[1] : 'NONE';
      const canonical = canonicalMatch ? canonicalMatch[1] : 'NONE';
      results.push({
        url,
        exists: true,
        robots,
        isNoindex: robots.toLowerCase().includes('noindex'),
        canonical,
        isCanonicalToEnglish: canonical === `https://gmttoestconverter.com/${slug}/`
      });
    } else {
      results.push({
        url,
        exists: false,
        robots: 'FILE NOT FOUND',
        isNoindex: false,
        canonical: 'NONE',
        isCanonicalToEnglish: false
      });
    }
  }
}

console.log('Total checked:', results.length);
const missingNoindex = results.filter(r => r.exists && !r.isNoindex);
console.log('Existing but missing noindex:', missingNoindex.length);
const notFound = results.filter(r => !r.exists);
console.log('File not found:', notFound.length);
console.log('Missing noindex list:', missingNoindex.map(r => r.url));
console.log('Not found list:', notFound.map(r => r.url));
