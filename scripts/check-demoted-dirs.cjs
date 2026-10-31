const fs = require('fs');
const path = require('path');

const demoted = ['zh', 'hi', 'ar', 'ru', 'ja', 'ko', 'tr', 'ur', 'bn', 'vi', 'th', 'id', 'fa', 'pl', 'nl'];
const staticDir = path.join(process.cwd(), '.vercel', 'output', 'static');

for (const lang of demoted) {
  const p = path.join(staticDir, lang);
  if (fs.existsSync(p)) {
    const items = fs.readdirSync(p);
    console.log(lang, 'subfolders:', items.length);
  } else {
    console.log(lang, 'NOT FOUND');
  }
}
