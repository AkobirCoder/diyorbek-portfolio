/**
 * Hero skrinshotlarini oladi (dev tekshiruvi uchun).
 * Ishga tushirish: node scripts/shot.mjs <baseUrl> <outDir>
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const base = process.argv[2] ?? "http://localhost:3120";
const outDir = process.argv[3] ?? "shots";
mkdirSync(outDir, { recursive: true });

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "laptop", width: 1280, height: 800 },
  { name: "tablet", width: 820, height: 1180 },
  { name: "mobile", width: 390, height: 844 },
];

const browser = await chromium.launch();

for (const vp of viewports) {
  const page = await browser.newPage({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 2,
  });
  await page.goto(base, { waitUntil: "networkidle" });
  // Kirish partiturasi ~2.4s — tugashini kutamiz
  await page.waitForTimeout(3800);
  await page.screenshot({ path: `${outDir}/hero-${vp.name}.png` });
  console.log(`${outDir}/hero-${vp.name}.png`);
  await page.close();
}

await browser.close();
