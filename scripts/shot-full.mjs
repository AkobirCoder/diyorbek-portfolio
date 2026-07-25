import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const base = process.argv[2] ?? "http://localhost:3131";
const outDir = process.argv[3] ?? "shots";
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();

// To'liq sahifa — desktop
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});
await page.goto(base, { waitUntil: "networkidle" });
await page.waitForTimeout(2500);
// Sekin pastga skroll — lazy/reveal animatsiyalarni ishga tushirish
await page.evaluate(async () => {
  await new Promise((resolve) => {
    let y = 0;
    const step = () => {
      window.scrollTo(0, y);
      y += 700;
      if (y < document.body.scrollHeight) setTimeout(step, 120);
      else resolve(true);
    };
    step();
  });
});
await page.waitForTimeout(1200);
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(600);
await page.screenshot({ path: `${outDir}/full-desktop.png`, fullPage: true });
console.log(`${outDir}/full-desktop.png`);
await page.close();

await browser.close();
