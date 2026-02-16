const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SVG_PATH = path.join(__dirname, '..', 'public', 'logo.svg');
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

async function generateFavicons() {
  const svgBuffer = fs.readFileSync(SVG_PATH);

  // Generate PNG at various sizes
  const sizes = [16, 32, 48, 192, 512];

  for (const size of sizes) {
    const outputPath = path.join(PUBLIC_DIR, `logo${size}.png`);
    await sharp(svgBuffer, { density: 300 })
      .resize(size, size)
      .png()
      .toFile(outputPath);
    console.log(`Generated ${outputPath}`);
  }

  // Generate favicon.ico (48x48 PNG saved as .ico compatible)
  // ICO format: we'll create a simple 48x48 PNG and save as .ico
  // For true ICO, we embed a PNG inside an ICO container
  const png48 = await sharp(svgBuffer, { density: 300 })
    .resize(48, 48)
    .png()
    .toBuffer();

  const png32 = await sharp(svgBuffer, { density: 300 })
    .resize(32, 32)
    .png()
    .toBuffer();

  const png16 = await sharp(svgBuffer, { density: 300 })
    .resize(16, 16)
    .png()
    .toBuffer();

  // Build ICO file with multiple PNG images
  const icoBuffer = createIco([png16, png32, png48]);
  fs.writeFileSync(path.join(PUBLIC_DIR, 'favicon.ico'), icoBuffer);
  console.log('Generated favicon.ico');

  console.log('All favicons generated successfully!');
}

function createIco(pngBuffers) {
  // ICO file format:
  // Header: 6 bytes
  // Directory entries: 16 bytes each
  // Image data: PNG buffers
  const numImages = pngBuffers.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  const dirSize = dirEntrySize * numImages;
  let dataOffset = headerSize + dirSize;

  const buffers = [];

  // ICO Header
  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0);       // Reserved
  header.writeUInt16LE(1, 2);       // Type: 1 = ICO
  header.writeUInt16LE(numImages, 4); // Number of images
  buffers.push(header);

  // Directory entries
  const sizes = [16, 32, 48];
  for (let i = 0; i < numImages; i++) {
    const entry = Buffer.alloc(dirEntrySize);
    const size = sizes[i];
    entry.writeUInt8(size === 256 ? 0 : size, 0);  // Width
    entry.writeUInt8(size === 256 ? 0 : size, 1);  // Height
    entry.writeUInt8(0, 2);                          // Color palette
    entry.writeUInt8(0, 3);                          // Reserved
    entry.writeUInt16LE(1, 4);                       // Color planes
    entry.writeUInt16LE(32, 6);                      // Bits per pixel
    entry.writeUInt32LE(pngBuffers[i].length, 8);    // Image size
    entry.writeUInt32LE(dataOffset, 12);             // Image offset
    dataOffset += pngBuffers[i].length;
    buffers.push(entry);
  }

  // Image data
  for (const png of pngBuffers) {
    buffers.push(png);
  }

  return Buffer.concat(buffers);
}

generateFavicons().catch(console.error);
