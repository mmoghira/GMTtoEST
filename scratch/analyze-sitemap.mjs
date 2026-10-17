import fs from 'node:fs';

const content = fs.readFileSync('.vercel/output/static/sitemap-0.xml', 'utf8');
const locUrls = [...content.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
const xhtmlUrls = [...content.matchAll(/href="([^"]+)"/g)].map(m => m[1]);

console.log('Total <loc> URLs:', locUrls.length);
console.log('Total <xhtml:link> URLs:', xhtmlUrls.length);

const enLocs = locUrls.filter(u => u.includes('/en/'));
const enXhtml = xhtmlUrls.filter(u => u.includes('/en/'));
console.log('<loc> containing /en/:', enLocs.length);
console.log('<xhtml:link> containing /en/:', enXhtml.length);
if (enXhtml.length > 0) {
  console.log('Sample enXhtml:', enXhtml.slice(0, 5));
}

// Check non-trailing slash URLs
const nonTrailing = locUrls.filter(u => !u.endsWith('/'));
console.log('Non-trailing slash <loc>:', nonTrailing.length);
if (nonTrailing.length > 0) console.log(nonTrailing.slice(0, 5));

// Check vercel.json redirect sources
const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
const redirects = vercelConfig.redirects || [];
console.log('Total redirects in vercel.json:', redirects.length);

// See which redirect sources appear in locUrls
const redirectSourcesInLoc = [];
for (const r of redirects) {
  const src = r.source;
  // check exact match or regex
  for (const u of locUrls) {
    const pathname = new URL(u).pathname;
    if (src === pathname || src === pathname.replace(/\/$/, '') || (src.endsWith('/') && src === pathname)) {
      redirectSourcesInLoc.push({ source: src, url: u, dest: r.destination });
    }
  }
}
console.log('Redirect sources in <loc>:', redirectSourcesInLoc.length);
console.log(redirectSourcesInLoc.slice(0, 10));
