const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateLogos() {
    try {
        const svgPath = path.join(__dirname, '..', 'public', 'logo.svg');
        const assetsPath = path.join(__dirname, '..', 'assets');
        const publicAssetsPath = path.join(__dirname, '..', 'public', 'assets');

        // Read SVG
        const svgBuffer = fs.readFileSync(svgPath);

        // Generate logo.png (512x512)
        await sharp(svgBuffer)
            .png()
            .resize(512, 512, {
                fit: 'contain',
                background: { r: 255, g: 255, b: 255, alpha: 0 }
            })
            .toFile(path.join(assetsPath, 'logo.png'));

        console.log('✓ Generated logo.png (512x512)');

        // Generate logo.webp (512x512)
        await sharp(svgBuffer)
            .webp({ quality: 90 })
            .resize(512, 512, {
                fit: 'contain',
                background: { r: 255, g: 255, b: 255, alpha: 0 }
            })
            .toFile(path.join(assetsPath, 'logo.webp'));

        console.log('✓ Generated logo.webp (512x512)');

        // Generate favicon for public folder (32x32)
        await sharp(svgBuffer)
            .png()
            .resize(32, 32, {
                fit: 'contain',
                background: { r: 255, g: 255, b: 255, alpha: 0 }
            })
            .toFile(path.join(__dirname, '..', 'public', 'favicon.png'));

        console.log('✓ Generated favicon.png (32x32)');

        // Also generate a larger favicon for better quality
        await sharp(svgBuffer)
            .png()
            .resize(192, 192, {
                fit: 'contain',
                background: { r: 255, g: 255, b: 255, alpha: 0 }
            })
            .toFile(path.join(assetsPath, 'favicon-192.png'));

        console.log('✓ Generated favicon-192.png (192x192)');

        const illustrations = [
            { name: 'timeflow-hero', widths: [480, 960] },
            { name: 'clock-visual', widths: [450, 900] },
            { name: 'world-time-map', widths: [600, 1200] },
        ];

        for (const illustration of illustrations) {
            const source = path.join(publicAssetsPath, `${illustration.name}.svg`);

            for (const width of illustration.widths) {
                await sharp(source)
                    .resize({ width })
                    .avif({ quality: 58 })
                    .toFile(path.join(publicAssetsPath, `${illustration.name}-${width}.avif`));

                await sharp(source)
                    .resize({ width })
                    .webp({ quality: 82 })
                    .toFile(path.join(publicAssetsPath, `${illustration.name}-${width}.webp`));
            }

            console.log(`✓ Generated responsive AVIF/WebP assets for ${illustration.name}`);
        }

        console.log('\nAll logo files generated successfully!');
    } catch (error) {
        console.error('Error generating logos:', error);
        process.exit(1);
    }
}

generateLogos();
