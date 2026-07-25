/** LCP / CLS / JS transfer o'lchovi (Playwright, buffered observer). */
import { chromium } from "playwright";

const base = process.argv[2] ?? "http://localhost:3134";
const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});

await page.addInitScript(() => {
  window.__lcp = 0;
  window.__cls = 0;
  window.__lcpEl = "";
  new PerformanceObserver((l) => {
    for (const e of l.getEntries()) {
      window.__lcp = e.startTime;
      window.__lcpEl = e.element ? e.element.tagName + "." + (e.element.className || "") : "";
    }
  }).observe({ type: "largest-contentful-paint", buffered: true });
  new PerformanceObserver((l) => {
    for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value;
  }).observe({ type: "layout-shift", buffered: true });
});

await page.goto(base, { waitUntil: "load" });
await page.waitForTimeout(4500);

const m = await page.evaluate(() => ({
  lcp: window.__lcp,
  cls: window.__cls,
  lcpEl: window.__lcpEl,
  js: Math.round(
    performance
      .getEntriesByType("resource")
      .filter((r) => r.name.endsWith(".js"))
      .reduce((a, r) => a + (r.transferSize || 0), 0) / 1024,
  ),
}));

console.log(`LCP: ${Math.round(m.lcp)} ms  (element: ${m.lcpEl})`);
console.log(`CLS: ${m.cls.toFixed(4)}`);
console.log(`JS transfer: ${m.js} KB`);

await browser.close();
