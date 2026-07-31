import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve(process.cwd(), 'dist/client');

console.log('=== PHASE 6 MULTILINGUAL & INTERNATIONAL SEO AUDIT ===');
let allPassed = true;

const testLocales = [
  { code: 'en', dir: 'ltr' },
  { code: 'es', dir: 'ltr' },
  { code: 'ar', dir: 'rtl' },
  { code: 'ur', dir: 'rtl' },
  { code: 'ja', dir: 'ltr' },
  { code: 'de', dir: 'ltr' },
  { code: 'fr', dir: 'ltr' },
  { code: 'zh', dir: 'ltr' }
];

for (const loc of testLocales) {
  const relPath = loc.code === 'en' ? 'index.html' : `${loc.code}/index.html`;
  const filePath = path.join(distDir, relPath);
  
  if (!fs.existsSync(filePath)) {
    console.error(`❌ MISSING: ${relPath}`);
    allPassed = false;
    continue;
  }
  
  const html = fs.readFileSync(filePath, 'utf-8');
  
  // Check text direction
  const hasCorrectDir = html.includes(`dir="${loc.dir}"`);
  
  // Check self-referencing canonical
  const expectedCanonical = loc.code === 'en' 
    ? 'rel="canonical" href="https://gmttoestconverter.com/"'
    : `rel="canonical" href="https://gmttoestconverter.com/${loc.code}/"`;
  const hasCanonical = html.includes(expectedCanonical);
  
  // Check reciprocal hreflang annotations
  const hasHreflangEn = html.includes('hreflang="en"');
  const hasHreflangEs = html.includes('hreflang="es"');
  const hasHreflangAr = html.includes('hreflang="ar"');
  const hasHreflangXDefault = html.includes('hreflang="x-default"');
  
  if (hasCorrectDir && hasCanonical && hasHreflangEn && hasHreflangEs && hasHreflangAr && hasHreflangXDefault) {
    console.log(`✅ VERIFIED [${loc.code.toUpperCase()}]: dir="${loc.dir}", Self-Canonical OK, Hreflang (en, es, ar, x-default) OK`);
  } else {
    console.warn(`⚠️ ISSUE IN [${loc.code.toUpperCase()}]: Dir:${hasCorrectDir}, Canonical:${hasCanonical}, Hreflang:${hasHreflangEn && hasHreflangEs && hasHreflangAr && hasHreflangXDefault}`);
    allPassed = false;
  }
}

// Check sitemap-index.xml
const sitemapIndexPath = path.join(distDir, 'sitemap-index.xml');
if (fs.existsSync(sitemapIndexPath)) {
  console.log(`\n✅ VERIFIED: sitemap-index.xml exists and generated successfully.`);
} else {
  console.error(`❌ MISSING: sitemap-index.xml`);
  allPassed = false;
}

if (allPassed) {
  console.log('\n🎉 ALL PHASE 6 INTERNATIONAL SEO & LOCALIZATION TESTS PASSED 100%!');
} else {
  console.log('\n⚠️ Some issues were detected.');
}
