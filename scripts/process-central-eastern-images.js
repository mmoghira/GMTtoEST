const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Source directory (artifact directory where images were generated)
const ARTIFACT_DIR = String.raw`C:\Users\PMYLS\.gemini\antigravity\brain\09a8586f-60dd-4624-b93a-5f072c9517a5`;
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'assets');

// Image mappings: source name pattern → output base name
const IMAGE_MAP = [
  { pattern: 'central_eastern_hero', outputBase: 'central-eastern-time-hero' },
  { pattern: 'ct_et_conversion_chart', outputBase: 'central-eastern-conversion-chart' },
  { pattern: 'ct_et_dst_diagram', outputBase: 'central-eastern-dst-diagram' },
  { pattern: 'central_eastern_timezone_map', outputBase: 'central-eastern-timezone-map' },
];

// Processing settings
const WEBP_QUALITY = 82;
const AVIF_QUALITY = 65;
const AVIF_EFFORT = 4;
const WIDTHS = [600, 1200];

async function findSourceImage(pattern) {
  const files = fs.readdirSync(ARTIFACT_DIR);
  const match = files.find(
    (f) => f.startsWith(pattern) && /\.(jpg|jpeg|png|webp)$/i.test(f)
  );
  if (!match) {
    throw new Error(`No source image found for pattern: ${pattern}`);
  }
  return path.join(ARTIFACT_DIR, match);
}

async function processImage(sourcePath, outputBase) {
  const results = [];

  for (const width of WIDTHS) {
    // WebP variant
    const webpOut = path.join(OUTPUT_DIR, `${outputBase}-${width}.webp`);
    await sharp(sourcePath)
      .resize(width)
      .webp({ quality: WEBP_QUALITY })
      .toFile(webpOut);
    results.push(webpOut);
    console.log(`  ✓ ${path.basename(webpOut)}`);

    // AVIF variant
    const avifOut = path.join(OUTPUT_DIR, `${outputBase}-${width}.avif`);
    await sharp(sourcePath)
      .resize(width)
      .avif({ quality: AVIF_QUALITY, effort: AVIF_EFFORT })
      .toFile(avifOut);
    results.push(avifOut);
    console.log(`  ✓ ${path.basename(avifOut)}`);
  }

  return results;
}

async function main() {
  // Ensure output directory exists
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  console.log('Processing Central-Eastern time zone images...\n');

  const allResults = [];
  const skipped = [];

  for (const { pattern, outputBase } of IMAGE_MAP) {
    try {
      const sourcePath = await findSourceImage(pattern);
      console.log(`Processing: ${path.basename(sourcePath)} → ${outputBase}`);
      const results = await processImage(sourcePath, outputBase);
      allResults.push(...results);
    } catch (err) {
      console.warn(`⚠ Skipping ${pattern}: ${err.message}`);
      skipped.push(pattern);
    }
  }

  console.log(`\n✅ Done! Generated ${allResults.length} image variants.`);
  if (skipped.length > 0) {
    console.log(`⚠ Skipped ${skipped.length} source(s): ${skipped.join(', ')}`);
  }

  // List all generated files
  console.log('\nGenerated files:');
  allResults.forEach((f) => console.log(`  ${path.basename(f)}`));
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
