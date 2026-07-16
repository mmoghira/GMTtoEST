const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const brainDir = path.resolve('C:/Users/PMYLS/.gemini/antigravity/brain/c1f3b227-6bd5-474c-9f27-8f48e81518ff');
const targetDir = path.resolve(__dirname, '../public/assets');

const mappings = [
  { src: 'toronto_skyline_clock_1784186987319.png', dest: 'toronto-skyline-clock.webp' },
  { src: 'toronto_time_zone_map_1784187001386.png', dest: 'toronto-time-zone-map.webp' },
  { src: 'ontario_time_map_1784187014625.png', dest: 'ontario-time-map.webp' }
];

async function convert() {
  for (const m of mappings) {
    const srcPath = path.join(brainDir, m.src);
    const destPath = path.join(targetDir, m.dest);
    
    if (!fs.existsSync(srcPath)) {
      console.error(`Source file not found: ${srcPath}`);
      continue;
    }
    
    console.log(`Converting ${m.src} to ${m.dest}...`);
    try {
      await sharp(srcPath)
        .webp({ quality: 85 })
        .toFile(destPath);
      console.log(`Success: Saved to ${destPath}`);
    } catch (err) {
      console.error(`Error converting ${m.src}:`, err);
    }
  }
}

convert();
