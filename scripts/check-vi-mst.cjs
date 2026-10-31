const fs = require('fs');

const f = fs.readFileSync('.vercel/output/static/vi/mst-to-est/index.html', 'utf8');

console.log('vi/mst-to-est h1:', f.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1]);
console.log('vi/mst-to-est title:', f.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]);
console.log('vi/mst-to-est canonical:', f.match(/<link\s+rel=["']canonical["'][^>]*href=["']([^"']*)["']/i)?.[1]);
console.log('vi/mst-to-est robots:', f.match(/<meta\s+name=["']robots["'][^>]*content=["']([^"']*)["']/i)?.[1]);
