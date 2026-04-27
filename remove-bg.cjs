const { Jimp } = require('jimp');
const path = require('path');

const inputPath = 'C:/HaiTienStay/img/Logo.jpg';
const outputPath = path.join(__dirname, 'src/images/logo.png');
const outputLightPath = path.join(__dirname, 'src/images/logo-light.png');

async function run() {
  const image = await Jimp.read(inputPath);

  image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
    const r = this.bitmap.data[idx];
    const g = this.bitmap.data[idx + 1];
    const b = this.bitmap.data[idx + 2];

    // Pixel gần trắng → trong suốt hoàn toàn
    if (r > 235 && g > 235 && b > 235) {
      this.bitmap.data[idx + 3] = 0;
    } else if (r > 200 && g > 200 && b > 200) {
      // Vùng trung gian → bán trong suốt
      const brightness = (r + g + b) / 3;
      const alpha = Math.round(255 * (1 - (brightness - 150) / 100));
      this.bitmap.data[idx + 3] = Math.max(0, Math.min(255, alpha));
    }
  });

  await image.write(outputPath);
  console.log('✅ Đã tạo logo.png (nền trong suốt)');

  await image.write(outputLightPath);
  console.log('✅ Đã tạo logo-light.png');
}

run().catch(console.error);
