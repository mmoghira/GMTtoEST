const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateLogos() {
    try {
        const svgPath = path.join(__dirname, '..', 'public', 'logo.svg');
        const assetsPath = path.join(__dirname, '..', 'assets');

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

        console.log('\nAll logo files generated successfully!');
    } catch (error) {
        console.error('Error generating logos:', error);
        process.exit(1);
    }
}

generateLogos();
