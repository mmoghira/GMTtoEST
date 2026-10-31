const fs = require('fs');

const f1 = fs.readFileSync('.vercel/output/static/id/business-hours-overlap/index.html', 'utf8');
const f2 = fs.readFileSync('.vercel/output/static/id/world-clock/index.html', 'utf8');

console.log('f1 h1:', f1.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1]);
console.log('f2 h1:', f2.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1]);

console.log('f1 title:', f1.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]);
console.log('f2 title:', f2.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]);

console.log('f1 canonical:', f1.match(/<link\s+rel=["']canonical["'][^>]*href=["']([^"']*)["']/i)?.[1]);
console.log('f2 canonical:', f2.match(/<link\s+rel=["']canonical["'][^>]*href=["']([^"']*)["']/i)?.[1]);

console.log('Length f1:', f1.length, 'Length f2:', f2.length);
