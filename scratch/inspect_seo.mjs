import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve(process.cwd(), 'dist/client');
const toolSlugs = [
  'world-clock',
  'meeting-planner',
  'event-time-converter',
  'time-difference-calculator',
  'business-hours-overlap',
  'dst-calendar-tool',
  'workday-calculator',
  'time-zone-map',
  'travel-time-planner',
  'developer-tools',
  'widgets',
  'downloads'
];

console.log('=== PHASE 5 VERIFICATION AUDIT ===');
let allPassed = true;

for (const slug of toolSlugs) {
  const filePath = path.join(distDir, slug, 'index.html');
  if (!fs.existsSync(filePath)) {
    console.error(`❌ MISSING: ${slug}/index.html`);
    allPassed = false;
    continue;
  }
  const html = fs.readFileSync(filePath, 'utf-8');
  
  // Check required tags
  const hasCanonical = html.includes(`rel="canonical" href="https://gmttoestconverter.com/${slug}/"`);
  const hasSoftwareAppSchema = html.includes('SoftwareApplication');
  const hasFaqSchema = html.includes('FAQPage');
  const hasBreadcrumbSchema = html.includes('BreadcrumbList');
  
  if (hasCanonical && hasSoftwareAppSchema && hasFaqSchema && hasBreadcrumbSchema) {
    console.log(`✅ VERIFIED: /${slug}/ (Canonical, SoftwareApplication, FAQPage, BreadcrumbList OK)`);
  } else {
    console.warn(`⚠️ ISSUE IN /${slug}/: Canonical:${hasCanonical}, AppSchema:${hasSoftwareAppSchema}, FAQ:${hasFaqSchema}, Breadcrumb:${hasBreadcrumbSchema}`);
    allPassed = false;
  }
}

if (allPassed) {
  console.log('\n🎉 ALL 12 PHASE 5 INTERACTIVE TOOLS PASSED SEO & STRUCTURED DATA AUDIT 100%!');
} else {
  console.log('\n⚠️ Some issues were detected.');
}
