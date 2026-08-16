import { chromium } from "playwright";

const OUT = process.argv[2];
const browser = await chromium.launch();

// Includes extreme zoom-out shapes (very wide/short and very tall).
const sizes = [
  [2560, 1440, "1440p"],
  [1920, 1080, "1080p"],
  [1680, 1050, "wide"],
  [1440, 900, "mbp"],
  [1366, 768, "common"],
  [1360, 684, "user"],
  [1280, 800, "sm-laptop"],
  [1024, 640, "short"],
  [1600, 500, "very-short"], // hard zoom-out
  [2400, 700, "ultra-wide"], // hard zoom-out
  [1100, 1400, "tall"],
  [820, 1180, "tablet-p"],
  [768, 1024, "ipad"],
  [430, 932, "phone-lg"],
  [390, 844, "phone"],
  [360, 740, "phone-sm"],
  [320, 568, "tiny"],
];

let bad = 0;
for (const [w, h, tag] of sizes) {
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
    // Well past the zoom phase so the machine is at full scale, and settle
    // twice so `scrub` smoothing has finished.
    await page.evaluate((t) => window.scrollTo(0, t + window.innerHeight * 3), top);
    await page.waitForTimeout(900);
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
    const lr = lap?.getBoundingClientRect();
    const ir = info?.getBoundingClientRect();
    return {
      lw: lr ? Math.round(lr.width) : 0,
      lh: lr ? Math.round(lr.height) : 0,
      ratio: lr && lr.height ? +(lr.width / lr.height).toFixed(2) : 0,
      overlap: lr && ir ? Math.round(lr.bottom - ir.top) : 0,
      overflowX: d.scrollWidth > d.clientWidth + 1,
      lapTop: lr ? Math.round(lr.top) : 0,
      vh: window.innerHeight,
    };
  });

  const p = [];
  // Lid is 16:10 + bezel + base => roughly 1.3–1.9 when correct.
  if (m.ratio < 1.15 || m.ratio > 2.1) p.push(`RATIO ${m.ratio}`);
  if (m.overlap > 1) p.push(`OVERLAP ${m.overlap}`);
  if (m.overflowX) p.push("OVERFLOW-X");
  if (m.lw < 150) p.push(`TOO SMALL ${m.lw}`);
  if (m.lapTop < -5) p.push(`CLIPPED ${m.lapTop}`);
  if (p.length) bad++;

  console.log(
    `${tag.padEnd(11)} ${String(w).padStart(4)}x${String(h).padEnd(4)} lap=${String(m.lw).padStart(4)}x${String(m.lh).padEnd(4)} ar=${String(m.ratio).padEnd(4)} ${p.length ? "❌ " + p.join(", ") : "ok"}`,
  );
  if (OUT && ["very-short", "ultra-wide", "tiny"].includes(tag))
    await page.screenshot({ path: `${OUT}/r-${tag}.png` });
  await ctx.close();
}
console.log(bad === 0 ? "\n✅ ALL VIEWPORTS OK" : `\n${bad} problem viewport(s)`);
await browser.close();
