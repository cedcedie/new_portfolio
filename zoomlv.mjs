import { chromium } from "playwright";

const OUT = process.argv[2];
const browser = await chromium.launch();

// Browser zoom on a 1366x768 screen = smaller CSS viewport.
const base = [1366, 768];
const levels = [1, 1.25, 1.5, 1.75, 2, 2.5];

for (const z of levels) {
  const w = Math.round(base[0] / z);
  const h = Math.round(base[1] / z);
  const ctx = await browser.newContext({
    viewport: { width: w, height: h },
    isMobile: w < 700,
    hasTouch: w < 700,
  });
  const page = await ctx.newPage();
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  const top = await page.evaluate(
    () =>
      (document.getElementById("work")?.getBoundingClientRect().top ?? 0) +
      window.scrollY,
  );
  if (w > 900) {
    await page.evaluate((t) => window.scrollTo(0, t + window.innerHeight * 3), top);
    await page.waitForTimeout(800);
    await page.evaluate((t) => window.scrollTo(0, t + window.innerHeight * 3), top);
  } else {
    await page.evaluate(() =>
      document.querySelector(".sw-lap")?.scrollIntoView({ block: "center" }),
    );
  }
  await page.waitForTimeout(900);

  const m = await page.evaluate(() => {
    const d = document.documentElement;
    const lap = document.querySelector(".sw-lap .lap");
    const info = document.querySelector(".sw-info");
    const desc = document.querySelector('.sw-info-body article[data-on="true"] p');
    const title = document.querySelector('.sw-info-body article[data-on="true"] h3');
    const lr = lap?.getBoundingClientRect();
    const ir = info?.getBoundingClientRect();
    const dr = desc?.getBoundingClientRect();
    const tr = title?.getBoundingClientRect();
    return {
      lapW: lr ? Math.round(lr.width) : 0,
      overlap: lr && ir ? Math.round(lr.bottom - ir.top) : 0,
      titleVisible: tr ? tr.top >= 0 && tr.bottom <= window.innerHeight : false,
      descVisible: dr ? dr.top >= 0 && dr.bottom <= window.innerHeight + 1 : false,
      descBottom: dr ? Math.round(dr.bottom) : 0,
      vh: window.innerHeight,
      overflowX: d.scrollWidth > d.clientWidth + 1,
    };
  });

  const p = [];
  if (m.overlap > 1) p.push(`OVERLAP ${m.overlap}`);
  if (!m.descVisible) p.push(`DESC CUT (${m.descBottom} > ${m.vh})`);
  if (!m.titleVisible) p.push("TITLE CUT");
  if (m.overflowX) p.push("OVERFLOW-X");

  console.log(
    `${String(Math.round(z * 100) + "%").padEnd(5)} ${String(w).padStart(4)}x${String(h).padEnd(4)} lap=${String(m.lapW).padStart(4)} ${p.length ? "❌ " + p.join(", ") : "ok"}`,
  );
  if (OUT && [1.75, 2].includes(z))
    await page.screenshot({ path: `${OUT}/zoom-${Math.round(z * 100)}.png` });
  await ctx.close();
}
await browser.close();
