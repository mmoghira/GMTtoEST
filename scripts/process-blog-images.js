/**
 * Process generated blog images into responsive formats (600w/1200w in WebP and AVIF)
 * for the "What Is GMT?" blog article.
 *
 * Usage: node scripts/process-blog-images.js
 */
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const ARTIFACT_DIR = path.join(
  "C:\\Users\\PMYLS\\.gemini\\antigravity\\brain\\569b2062-22bd-4b8d-ad9f-2ca4a9101b15"
);
const OUTPUT_DIR = path.join(__dirname, "..", "public", "assets");

// Map source image files to output base names
const images = [
  {
    pattern: "gmt_featured_greenwich",
    output: "what-is-gmt-greenwich-mean-time",
  },
  {
    pattern: "gmt_prime_meridian",
    output: "gmt-prime-meridian-greenwich",
  },
  {
    pattern: "gmt_vs_utc",
    output: "gmt-vs-utc-time-standard",
  },
  {
    pattern: "gmt_world_timezones",
    output: "gmt-time-zones-around-world",
  },
  {
    pattern: "gmt_daylight_saving",
    output: "gmt-daylight-saving-time",
  },
  {
    pattern: "gmt_conversion_guide",
    output: "gmt-time-conversion-guide",
  },
];

async function findSourceFile(pattern) {
  const files = fs.readdirSync(ARTIFACT_DIR);
  const match = files.find(
    (f) => f.startsWith(pattern) && f.endsWith(".png")
  );
  if (!match) throw new Error(`No source file found for pattern: ${pattern}`);
  return path.join(ARTIFACT_DIR, match);
}

async function processImage(sourcePath, outputBaseName) {
  const sizes = [
    { width: 600, suffix: "-600" },
    { width: 1200, suffix: "-1200" },
  ];
  const formats = [
    { format: "webp", options: { quality: 82 } },
    { format: "avif", options: { quality: 65, effort: 4 } },
  ];

  for (const size of sizes) {
    for (const fmt of formats) {
      const outputPath = path.join(
        OUTPUT_DIR,
        `${outputBaseName}${size.suffix}.${fmt.format}`
      );
      await sharp(sourcePath)
        .resize(size.width, null, { withoutEnlargement: true })
        .toFormat(fmt.format, fmt.options)
        .toFile(outputPath);
      const stats = fs.statSync(outputPath);
      console.log(
        `  ✓ ${path.basename(outputPath)} (${(stats.size / 1024).toFixed(1)} KB)`
      );
    }
  }
}

async function main() {
  console.log("Processing blog images for 'What Is GMT?' article...\n");

  for (const img of images) {
    try {
      const sourcePath = await findSourceFile(img.pattern);
      console.log(`Processing: ${img.pattern} → ${img.output}`);
      await processImage(sourcePath, img.output);
      console.log("");
    } catch (err) {
      console.error(`ERROR processing ${img.pattern}: ${err.message}`);
    }
  }

  console.log("All images processed successfully!");
}

main().catch(console.error);
