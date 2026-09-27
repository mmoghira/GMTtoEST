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
        const logoPngBuffer = await sharp(svgBuffer)
            .png()
            .resize(512, 512, {
                fit: 'contain',
                background: { r: 255, g: 255, b: 255, alpha: 0 }
            })
            .toBuffer();
        fs.writeFileSync(path.join(assetsPath, 'logo.png'), logoPngBuffer);
        fs.writeFileSync(path.join(publicAssetsPath, 'logo.png'), logoPngBuffer);
        fs.writeFileSync(path.join(__dirname, '..', 'public', 'logo.png'), logoPngBuffer);

        console.log('Generated logo.png (512x512)');

        // Generate logo.webp (512x512)
        const logoWebpBuffer = await sharp(svgBuffer)
            .webp({ quality: 85 })
            .resize(512, 512, {
                fit: 'contain',
                background: { r: 255, g: 255, b: 255, alpha: 0 }
            })
            .toBuffer();
        fs.writeFileSync(path.join(assetsPath, 'logo.webp'), logoWebpBuffer);
        fs.writeFileSync(path.join(publicAssetsPath, 'logo.webp'), logoWebpBuffer);
        fs.writeFileSync(path.join(__dirname, '..', 'public', 'logo.webp'), logoWebpBuffer);

        console.log('Generated logo.webp (512x512)');

        // Generate logo.avif (512x512)
        const logoAvifBuffer = await sharp(svgBuffer)
            .avif({ quality: 75 })
            .resize(512, 512, {
                fit: 'contain',
                background: { r: 255, g: 255, b: 255, alpha: 0 }
            })
            .toBuffer();
        fs.writeFileSync(path.join(assetsPath, 'logo.avif'), logoAvifBuffer);
        fs.writeFileSync(path.join(publicAssetsPath, 'logo.avif'), logoAvifBuffer);
        fs.writeFileSync(path.join(__dirname, '..', 'public', 'logo.avif'), logoAvifBuffer);

        console.log('Generated logo.avif (512x512)');

        // Generate favicon for public folder (32x32)
        await sharp(svgBuffer)
            .png()
            .resize(32, 32, {
                fit: 'contain',
                background: { r: 255, g: 255, b: 255, alpha: 0 }
            })
            .toFile(path.join(__dirname, '..', 'public', 'favicon.png'));

        console.log('Generated favicon.png (32x32)');

        // Also generate a larger favicon for better quality
        const favicon192Buffer = await sharp(svgBuffer)
            .png()
            .resize(192, 192, {
                fit: 'contain',
                background: { r: 255, g: 255, b: 255, alpha: 0 }
            })
            .toBuffer();
        fs.writeFileSync(path.join(assetsPath, 'favicon-192.png'), favicon192Buffer);
        fs.writeFileSync(path.join(publicAssetsPath, 'favicon-192.png'), favicon192Buffer);
        fs.writeFileSync(path.join(__dirname, '..', 'public', 'favicon-192.png'), favicon192Buffer);

        console.log('Generated favicon-192.png (192x192)');

        const illustrations = [
            {
                sourceName: 'timeflow-hero',
                outputNames: ['timeflow-hero', 'gmt-to-est-timeflow-hero', 'gmt-to-est-converter-featured-image'],
                widths: [480, 960]
            },
            {
                sourceName: 'clock-visual',
                outputNames: ['clock-visual', 'gmt-to-est-clock-visual', 'gmt-to-est-converter-clock-visual'],
                widths: [450, 900]
            },
            {
                sourceName: 'world-time-map',
                outputNames: ['world-time-map', 'gmt-to-est-world-time-map', 'gmt-to-est-converter-world-time-map'],
                widths: [600, 1200]
            },
        ];

        for (const illustration of illustrations) {
            const source = path.join(publicAssetsPath, `${illustration.sourceName}.svg`);
            const rootSource = path.join(assetsPath, `${illustration.sourceName}.svg`);

            for (const outputName of illustration.outputNames) {
                if (outputName !== illustration.sourceName) {
                    fs.copyFileSync(source, path.join(publicAssetsPath, `${outputName}.svg`));
                    if (fs.existsSync(rootSource)) {
                        fs.copyFileSync(rootSource, path.join(assetsPath, `${outputName}.svg`));
                    }
                }

                for (const width of illustration.widths) {
                    await sharp(source)
                        .resize({ width })
                        .avif({ quality: 58 })
                        .toFile(path.join(publicAssetsPath, `${outputName}-${width}.avif`));

                    await sharp(source)
                        .resize({ width })
                        .webp({ quality: 82 })
                        .toFile(path.join(publicAssetsPath, `${outputName}-${width}.webp`));
                }
            }

            console.log(`Generated responsive AVIF/WebP assets for ${illustration.outputNames.join(', ')}`);
        }

        console.log('\nAll logo files generated successfully!');
    } catch (error) {
        console.error('Error generating logos:', error);
        process.exit(1);
    }
}

generateLogos();
