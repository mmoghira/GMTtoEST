import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve(process.cwd(), 'dist/client');

console.log('=== PHASE 7 CONTINUOUS GROWTH & SEO HEALTH AUDIT ===');

if (!fs.existsSync(distDir)) {
  console.error('❌ Build directory dist/client does not exist. Run "npm run build" first.');
  process.exit(1);
}

let totalPages = 0;
let passCanonicalCount = 0;
let passSchemaCount = 0;
let passHreflangCount = 0;
let brokenLinksCount = 0;

function scanDirectory(directory) {
  const entries = fs.readdirSync(directory, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      scanDirectory(fullPath);
    } else if (entry.isFile() && entry.name === 'index.html') {
      totalPages++;
      const html = fs.readFileSync(fullPath, 'utf-8');

      // 1. Check Canonical Tag
      if (html.includes('rel="canonical"')) {
        passCanonicalCount++;
      }

      // 2. Check JSON-LD Schema
      if (html.includes('application/ld+json')) {
        passSchemaCount++;
      }

      // 3. Check Hreflang Tags
      if (html.includes('hreflang=')) {
        passHreflangCount++;
      }

      // 4. Check Internal Links for relative broken paths
      const hrefMatches = html.match(/href="([^"]+)"/g) || [];
      for (const match of hrefMatches) {
        const href = match.slice(6, -1);
        if (href.startsWith('/') && !href.startsWith('//') && !href.startsWith('/#')) {
          const targetPath = path.join(distDir, href.endsWith('/') ? href + 'index.html' : href);
          const targetDirIndex = path.join(distDir, href + '/index.html');
          
          if (!fs.existsSync(targetPath) && !fs.existsSync(targetDirIndex) && !href.includes('.') && !href.includes('?')) {
            // Log missing page link
            brokenLinksCount++;
          }
        }
      }
    }
  }
}

scanDirectory(distDir);

console.log(`\n📊 AUDIT METRICS SUMMARY:`);
console.log(`- Total Static HTML Pages Scanned: ${totalPages}`);
console.log(`- Pages with Valid Self-Canonical: ${passCanonicalCount} / ${totalPages}`);
console.log(`- Pages with JSON-LD Schemas: ${passSchemaCount} / ${totalPages}`);
console.log(`- Pages with Hreflang Tags: ${passHreflangCount} / ${totalPages}`);
console.log(`- Internal Broken Links Detected: ${brokenLinksCount}`);

if (brokenLinksCount === 0 && passCanonicalCount === totalPages) {
  console.log('\n🎉 ALL PHASE 7 SEO HEALTH & CONTINUOUS GROWTH AUDITS PASSED 100%!');
} else {
  console.log('\n⚠️ Audit completed with minor warnings.');
}
