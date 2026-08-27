const fs = require('fs');
const deHtml = fs.readFileSync('dist/client/de/index.html', 'utf8');

console.log('=== AUDITING GERMAN HOMEPAGE (/de/) ===');

// 1. Converter mode tab text
console.log('Mode 1 (Von GMT in Eastern Time):', deHtml.includes('<span>Von</span><b>GMT</b><small>in Eastern Time</small>'));
console.log('Mode 2 (Von EST / EDT in GMT):', deHtml.includes('<span>Von</span><b>EST / EDT</b><small>in GMT</small>'));
console.log('No duplicated "in in":', !deHtml.includes('in in'));
console.log('No "GMTin":', !deHtml.includes('GMTin'));

// 2. Footer Brand name
const footerSnippet = deHtml.match(/<footer[\s\S]*?<\/footer>/i)?.[0] || '';
console.log('Footer Brand text GMT zu EST Umrechner:', footerSnippet.includes('GMT zu EST Umrechner'));

// 3. Header Brand name
const headerSnippet = deHtml.match(/<header[\s\S]*?<\/header>/i)?.[0] || '';
console.log('Header Brand text GMT zu EST Umrechner:', headerSnippet.includes('GMT zu EST Umrechner'));

// 4. Footer guide links
const guideTests = [
  'Was ist GMT?', 'Was ist EST?', 'GMT vs. UTC', 'EST vs. EDT',
  'Sommerzeit erklärt', 'Leitfaden zur 24-Stunden-Zeit', 'Leitfaden zu den Zeitzonen der Welt'
];
guideTests.forEach(t => console.log('Footer guide link - ' + t + ':', footerSnippet.includes(t)));

// 5. Footer geo links
const geoTests = [
  'Zeitzonen der USA', 'Zeitzonen Kanadas', 'Zeitzonen Australiens',
  'Zeitzone Indiens', 'Uhrzeit in New York', 'Uhrzeit in London', 'Uhrzeit in Los Angeles'
];
geoTests.forEach(t => console.log('Footer geo link - ' + t + ':', footerSnippet.includes(t)));

// 6. Footer company links
const companyTests = [
  'Redaktionsrichtlinien', 'Datenschutzeinstellungen', 'Glossar',
  'Unternehmensplanung', 'Flugzeit-Rechner', 'Übersicht'
];
companyTests.forEach(t => console.log('Footer company link - ' + t + ':', footerSnippet.includes(t)));

// 7. Converter footer links
const convTests = [
  'EST zu GMT Umrechner', 'EST zu PST Umrechner', 'EST zu CST Umrechner',
  'PDT zu EST Umrechner', 'CDT zu EST Umrechner', 'CST zu EST Umrechner', 'KST zu EST Umrechner'
];
convTests.forEach(t => console.log('Converter footer link - ' + t + ':', footerSnippet.includes(t)));

// 8. Search button shortcut
console.log('Search shortcut Strg+K:', headerSnippet.includes('Strg+K'));

// 9. H1 and Meta
console.log('H1 GMT zu EST Umrechner:', deHtml.includes('GMT zu EST Umrechner'));
console.log('Canonical /de/:', deHtml.includes('rel="canonical" href="https://gmttoestconverter.com/de/"'));
console.log('HTML lang=de:', deHtml.includes('<html lang="de"'));
console.log('og:locale de_DE:', deHtml.includes('property="og:locale" content="de_DE"'));

// 10. English regression check
const enHtml = fs.readFileSync('dist/client/index.html', 'utf8');
console.log('\n=== CHECKING ENGLISH HOMEPAGE REGRESSION ===');
console.log('English lang=en:', enHtml.includes('<html lang="en"'));
console.log('English Canonical:', enHtml.includes('rel="canonical" href="https://gmttoestconverter.com/"'));
console.log('English Title:', enHtml.includes('GMT to EST Converter'));
console.log('No German in English Footer:', !enHtml.includes('Redaktionsrichtlinien'));

// 11. Spanish regression check
const esHtml = fs.readFileSync('dist/client/es/index.html', 'utf8');
console.log('\n=== CHECKING SPANISH HOMEPAGE REGRESSION ===');
console.log('Spanish lang=es:', esHtml.includes('<html lang="es"'));
console.log('Spanish Canonical:', esHtml.includes('rel="canonical" href="https://gmttoestconverter.com/es/"'));
console.log('Spanish Title:', esHtml.includes('Convertidor GMT a EST'));
console.log('No German in Spanish Footer:', !esHtml.includes('Redaktionsrichtlinien'));
