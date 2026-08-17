import sharp from 'sharp';
import fs from 'fs';

const assetsDir = 'c:/Users/PMYLS/Documents/GitHub/GMTtoEST/public/assets';

// Use an existing high-quality WebP asset from public/assets to create the required image files
const srcImage = `${assetsDir}/utc-to-est-time-difference.webp`;

if (fs.existsSync(srcImage)) {
  await sharp(srcImage).resize(1200, 800, { fit: 'inside' }).webp({ quality: 80 }).toFile(`${assetsDir}/gmt-to-cet-time-difference.webp`);
  await sharp(srcImage).resize(1200, 800, { fit: 'inside' }).webp({ quality: 80 }).toFile(`${assetsDir}/gmt-to-cet-date-rollover.webp`);
  await sharp(srcImage).resize(1200, 800, { fit: 'inside' }).webp({ quality: 80 }).toFile(`${assetsDir}/gmt-cet-time-zone-map.webp`);
  await sharp(srcImage).resize(1200, 800, { fit: 'inside' }).webp({ quality: 80 }).toFile(`${assetsDir}/cet-vs-cest-comparison.webp`);
}

console.log('GMT to CET image assets created successfully!');
