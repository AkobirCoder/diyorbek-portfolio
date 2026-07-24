/**
 * Portretni Hero uchun qayta ishlaydi (Blueprint §12).
 * - Chetlarni shaffoflikka eritadi (feather mask) — subyekt qorong'ilikdan
 *   "paydo bo'layotgandek" ko'rinadi va Hero foni bilan seamless qo'shiladi.
 * - AVIF + WebP, desktop + mobil variant.
 * - LQIP blur placeholder base64 chiqaradi.
 *
 * Ishga tushirish: node scripts/process-portrait.mjs
 */
import sharp from "sharp";
import { writeFileSync, statSync } from "node:fs";

const SRC = "portrait.PNG";
const OUT = "public/portrait";

const meta = await sharp(SRC).metadata();
const { width, height } = meta;
const aspect = width / height;
console.log(`Manba: ${width}×${height}`);

/**
 * Feather mask — oq ELLIPS, rasterda blur qilingan.
 *
 * Nega ellips: to'rtburchak mask (hatto yumshatilgan bo'lsa ham) fonda
 * "quti" hissini qoldiradi. Ellips esa tabiiy yorug'lik hovuzi beradi —
 * subyekt qorong'ilikdan paydo bo'layotgandek ko'rinadi.
 *
 * Nega rasterda blur: sharp/librsvg SVG ichidagi feGaussianBlur filtrini
 * e'tiborsiz qoldiradi, shuning uchun blur alohida bosqichda qo'llanadi.
 */
async function makeMask(w, h) {
  const svg = Buffer.from(
    `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${w}" height="${h}" fill="#000"/>
      <ellipse cx="${w / 2}" cy="${h * 0.5}" rx="${w * 0.45}" ry="${h * 0.475}" fill="#fff"/>
    </svg>`,
  );
  const flat = await sharp(svg).png().toBuffer();
  // Ikkinchi bosqich — kafolatlangan raster blur
  return sharp(flat)
    .blur(Math.max(2, w * 0.055))
    .toColorspace("b-w")
    .png()
    .toBuffer();
}

/** Feather qilingan tasvir — resize qilingandan keyin mask qo'llanadi. */
async function feathered(w) {
  const h = Math.round(w / aspect);
  const mask = await makeMask(w, h);
  return sharp(SRC)
    .resize({ width: w })
    .ensureAlpha()
    .composite([{ input: mask, blend: "dest-in" }]);
}

// Desktop (to'liq kenglik)
await (await feathered(width)).avif({ quality: 62, effort: 6 }).toFile(`${OUT}/portrait.avif`);
await (await feathered(width)).webp({ quality: 74, effort: 6 }).toFile(`${OUT}/portrait.webp`);

// Mobil (kichikroq)
await (await feathered(760)).avif({ quality: 58, effort: 6 }).toFile(`${OUT}/portrait-mobile.avif`);
await (await feathered(760)).webp({ quality: 70, effort: 6 }).toFile(`${OUT}/portrait-mobile.webp`);

// LQIP — kichik blur placeholder (base64)
const lqip = await (await feathered(20)).webp({ quality: 40 }).toBuffer();
const lqipBase64 = `data:image/webp;base64,${lqip.toString("base64")}`;
writeFileSync(`${OUT}/portrait-lqip.txt`, lqipBase64);
writeFileSync("src/content/portrait-lqip.ts", `/** Portret LQIP blur placeholder — process-portrait.mjs generatsiya qiladi. */
export const portraitLqip =
  "${lqipBase64}";
`);

// Natijalar
for (const f of ["portrait.avif", "portrait.webp", "portrait-mobile.avif", "portrait-mobile.webp"]) {
  console.log(`${f}: ${Math.round(statSync(`${OUT}/${f}`).size / 1024)} KB`);
}
console.log(`LQIP uzunligi: ${lqipBase64.length} belgi`);
console.log(`Nisbat (aspect): ${aspect.toFixed(4)}`);
