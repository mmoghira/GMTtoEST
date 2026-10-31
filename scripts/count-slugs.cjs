const fs = require('fs');

const content = fs.readFileSync('theme/i18n/config.ts', 'utf8');
const slugs = [];
const regex = /slug:\s*["']([^"']*)["']/g;
let match;
while ((match = regex.exec(content)) !== null) {
  if (match[1]) slugs.push(match[1]);
}
console.log('Unique slugs found in config.ts:', [...new Set(slugs)].length);
console.log('Sample slugs:', [...new Set(slugs)].slice(0, 20));
