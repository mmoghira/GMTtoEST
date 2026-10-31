const fs = require('fs');
const path = require('path');

const sampleUrls = [
  'hi/contact-us',
  'ur/privacy-policy',
  'fa/privacy-policy',
  'es/privacy-policy',
  'de/terms-of-service',
  'fr/about-us',
  'id/business-hours-overlap',
  'id/world-clock',
  'vi/mst-to-est',
  'id/kst-to-est'
];

for (const u of sampleUrls) {
  const p = path.join('.vercel', 'output', 'static', u, 'index.html');
  if (fs.existsSync(p)) {
    const html = fs.readFileSync(p, 'utf8');
    const robots = html.match(/<meta\s+name=["']robots["']\s+content=["']([^"']*)["']/i);
    const canonical = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i);
    console.log(u, '=> ROBOTS:', robots ? robots[1] : 'NONE', '| CANONICAL:', canonical ? canonical[1] : 'NONE');
  } else {
    console.log(u, '=> FILE NOT FOUND');
  }
}
