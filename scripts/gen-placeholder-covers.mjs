/**
 * gen-placeholder-covers.mjs — QORALAMA loyiha muqovalarini yaratadi.
 *
 * Haqiqiy muqovalar tayyor bo'lganda, shu skript o'chiriladi va rasmlar
 * public/work/{slug}/cover.jpg ga qo'yiladi (bir xil nom). Ishga tushirish:
 *   node scripts/gen-placeholder-covers.mjs
 */
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";

const TINT = { brand: "#FF6B21", fashion: "#1D5CFF", reels: "#E97AFF" };

/** 10 loyiha — content/projects/* bilan mos (slug, client, category, format). */
const items = [
  { slug: "atlas-textile", client: "Atlas Textile", category: "brand", format: "16:9" },
  { slug: "silk-road-fashion", client: "Silk Road Atelier", category: "fashion", format: "16:9" },
  { slug: "zamin-coffee", client: "Zamin Coffee", category: "reels", format: "9:16" },
  { slug: "osiyo-bank", client: "Osiyo Bank", category: "brand", format: "16:9" },
  { slug: "oydin-beauty", client: "Oydin Beauty", category: "fashion", format: "9:16" },
  { slug: "qadam-sneakers", client: "Qadam", category: "reels", format: "9:16" },
  { slug: "nur-restaurant", client: "Nur Restaurant", category: "brand", format: "16:9" },
  { slug: "bahor-cosmetics", client: "Bahor Cosmetics", category: "fashion", format: "9:16" },
  { slug: "techno-park", client: "Techno Park", category: "brand", format: "16:9" },
  { slug: "tashkent-fashion-week", client: "Tashkent Fashion Week", category: "reels", format: "9:16" },
];

// QORALAMA muqova = faqat gradient (matnsiz) — haqiqiy foto muqovalar ham
// matnsiz bo'ladi; kartochka meta matnini o'zi chizadi. Shu bois matn qo'shilmaydi.
// `seed` — galereya kadrlariga xilma-xillik beradi (gradient burchagi).
function svg({ category, format }, seed = 0) {
  const [w, h] = format === "16:9" ? [1280, 720] : [720, 1280];
  const tint = TINT[category];
  const x2 = seed % 2 === 0 ? 1 : 0;
  const cx = 0.3 + (seed % 3) * 0.2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="${x2}" y2="1">
      <stop offset="0" stop-color="${tint}" stop-opacity="0.28"/>
      <stop offset="0.5" stop-color="${tint}" stop-opacity="0.06"/>
      <stop offset="1" stop-color="#05070C" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="v" cx="${cx}" cy="0.4" r="0.85">
      <stop offset="0.5" stop-color="#000" stop-opacity="0"/>
      <stop offset="1" stop-color="#000" stop-opacity="0.5"/>
    </radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#080B12"/>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
  <rect width="${w}" height="${h}" fill="url(#v)"/>
</svg>`;
}

/** Galereyali loyihalar — content/projects/* dagi gallery src'lariga mos (16:9). */
const galleries = [
  { slug: "atlas-textile", category: "brand", count: 2 },
  { slug: "silk-road-fashion", category: "fashion", count: 2 },
  { slug: "osiyo-bank", category: "brand", count: 2 },
];

let count = 0;
for (const item of items) {
  const out = `public/work/${item.slug}/cover.jpg`;
  mkdirSync(dirname(out), { recursive: true });
  await sharp(Buffer.from(svg(item)))
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(out);
  console.log(out);
  count++;
}

// Galereya kadrlari (16:9)
for (const g of galleries) {
  for (let i = 1; i <= g.count; i++) {
    const out = `public/work/${g.slug}/${String(i).padStart(2, "0")}.jpg`;
    mkdirSync(dirname(out), { recursive: true });
    await sharp(Buffer.from(svg({ category: g.category, format: "16:9" }, i)))
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(out);
    console.log(out);
    count++;
  }
}

console.log(`\n${count} placeholder rasm yaratildi.`);
