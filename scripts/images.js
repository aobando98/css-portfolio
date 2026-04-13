const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '..', 'images');
const outputDir = path.join(inputDir, 'optimized');
const sizes = [480, 800, 1200];

fs.mkdirSync(outputDir, { recursive: true });

async function processImage(file) {
  const ext = path.extname(file).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) return;
  const name = path.parse(file).name;
  const inputPath = path.join(inputDir, file);

  await Promise.all(sizes.map(async size => {
    const jpegOut = path.join(outputDir, `${name}-${size}.jpg`);
    const webpOut = path.join(outputDir, `${name}-${size}.webp`);
    await sharp(inputPath)
      .resize({ width: size })
      .jpeg({ quality: 80 })
      .toFile(jpegOut);
    await sharp(inputPath)
      .resize({ width: size })
      .webp({ quality: 80 })
      .toFile(webpOut);
  }));

  try {
    const avifOut = path.join(outputDir, `${name}.avif`);
    await sharp(inputPath).avif({ quality: 60 }).toFile(avifOut);
  } catch (err) {
    console.warn('AVIF generation failed for', inputPath, err.message);
  }
}

(async () => {
  const files = fs.readdirSync(inputDir);
  for (const file of files) {
    await processImage(file);
  }
  console.log('Images optimized to', outputDir);
})().catch(err => {
  console.error(err);
  process.exit(1);
});