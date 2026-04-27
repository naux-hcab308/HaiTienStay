import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const Jimp = require('jimp');
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const inputPath = 'C:/HaiTienStay/img/Logo.jpg';
const outputPath = path.join(__dirname, 'src/images/logo.png');
const outputLightPath = path.join(__dirname, 'src/images/logo-light.png');

const image = await Jimp.read(inputPath);

// Chuyển sang RGBA rồi tách nền trắng
image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
  const r = this.bitmap.data[idx];
  const g = this.bitmap.data[idx + 1];
  const b = this.bitmap.data[idx + 2];

  // Nếu pixel gần trắng (threshold 240) → trong suốt
  if (r > 240 && g > 240 && b > 240) {
    this.bitmap.data[idx + 3] = 0; // alpha = 0 (trong suốt)
  } else if (r > 200 && g > 200 && b > 200) {
    // Vùng xám nhạt → bán trong suốt
    const alpha = Math.round(255 * (1 - (Math.min(r, g, b) - 128) / 112));
    this.bitmap.data[idx + 3] = Math.max(0, Math.min(255, alpha));
  }
});

await image.write(outputPath);
console.log('✅ Đã tạo logo.png (trong suốt)');

// logo-light.png dùng cùng file
await image.write(outputLightPath);
console.log('✅ Đã tạo logo-light.png');
