/**
 * Accessibility auditi — axe-core (WCAG 2 A/AA) jonli manzilda.
 * Ishga tushirish: node scripts/audit-a11y.mjs <url>
 */
import { chromium } from "playwright";
import { AxeBuilder } from "@axe-core/playwright";

const url = process.argv[2] ?? "https://diyorbek-portfolio.vercel.app";
const paths = ["/", "/work", "/work/silk-road-fashion"];

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
});
let total = 0;

for (const p of paths) {
  const page = await context.newPage();
  await page.goto(url + p, { waitUntil: "networkidle" });
  await page.waitForTimeout(2500);
  // mix-blend-mode grain qatlami axe kontrast hisobini buzadi — test uchun yashiramiz
  if (process.env.NOGRAIN) {
    await page.addStyleTag({ content: ".grain-layer{display:none!important}" });
    await page.waitForTimeout(200);
  }

  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();

  console.log(`\n=== ${p} ===`);
  if (results.violations.length === 0) {
    console.log("  ✓ Buzilish yo'q");
  } else {
    for (const v of results.violations) {
      total += v.nodes.length;
      console.log(`  ✗ [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length})`);
      for (const n of v.nodes.slice(0, 5)) {
        const d = n.any?.[0]?.data;
        const info = d
          ? `fg=${d.fgColor} bg=${d.bgColor} ratio=${d.contrastRatio} need=${d.expectedContrastRatio}`
          : "";
        console.log(`      → ${n.target.join(" ")}`);
        if (info) console.log(`        ${info}`);
      }
    }
  }
  await page.close();
}

console.log(`\n=== JAMI buzilishlar: ${total} ===`);
await browser.close();
