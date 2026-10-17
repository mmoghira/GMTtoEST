import fs from 'node:fs';
import path from 'node:path';

const content = fs.readFileSync('.vercel/output/static/sitemap-0.xml', 'utf8');
const urls = [...content.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);

const staticDir = path.resolve('.vercel/output/static');
const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
const redirects = vercelConfig.redirects || [];

console.log('Total URLs to check:', urls.length);

const missingFiles = [];
const redirectMatches = [];
const soft404s = [];
const noindexLegal = [];

const legalSlugs = ['about-us', 'author', 'contact-us', 'disclaimer', 'privacy-policy', 'terms-of-service', 'sitemap', 'editorial-policy'];

for (const u of urls) {
  const urlObj = new URL(u);
  const pathname = urlObj.pathname; // e.g. /fr/author/
  
  // 1. Check if file exists in static output
  let localPath;
  if (pathname === '/') {
    localPath = path.join(staticDir, 'index.html');
  } else {
    const clean = pathname.replace(/^\//, '').replace(/\/$/, '');
    localPath = path.join(staticDir, clean, 'index.html');
  }
  
  if (!fs.existsSync(localPath)) {
    missingFiles.push({ url: u, pathname, localPath });
  } else {
    // Check if the page contains thin/soft-404 or robots noindex
    const html = fs.readFileSync(localPath, 'utf8');
    if (html.toLowerCase().includes('robots') && html.toLowerCase().includes('noindex')) {
      console.log('Found noindex HTML:', pathname);
    }
  }

  // 2. Check translated legal/author
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length >= 2 && parts[0].length === 2) {
    const lang = parts[0];
    const rest = parts.slice(1).join('/');
    if (legalSlugs.some(l => rest.startsWith(l))) {
      noindexLegal.push({ url: u, pathname, lang, rest });
    }
  }

  // 3. Check if pathname matches any vercel.json redirect
  for (const r of redirects) {
    const srcRegex = new RegExp('^' + r.source.replace(/\/:[a-zA-Z0-9_]+/g, '[^/]+').replace(/\*/g, '.*') + '$');
    if (srcRegex.test(pathname) || srcRegex.test(pathname.replace(/\/$/, ''))) {
      redirectMatches.push({ url: u, pathname, source: r.source, dest: r.destination });
      break;
    }
  }
}

console.log('Missing static files (would be 404):', missingFiles.length);
if (missingFiles.length > 0) console.log(missingFiles.slice(0, 10));

console.log('Translated legal/author URLs in sitemap:', noindexLegal.length);
console.log('Sample translated legal/author:', noindexLegal.slice(0, 10).map(x => x.pathname));

console.log('Redirect matches in sitemap:', redirectMatches.length);
if (redirectMatches.length > 0) console.log(redirectMatches.slice(0, 10));
