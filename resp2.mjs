import { chromium } from "playwright";

const browser = await chromium.launch();
// Is the small width real, or just mid-zoom when sampled?
for (const [w, h, tag] of [
  [1366, 768, "common"],
  [1360, 684, "user"],
  [1440, 900, "mbp"],
]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h } });
  const page = await ctx.newPage();
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  const top = await page.evaluate(
    () =>
      (document.getElementById("work")?.getBoundingClientRect().top ?? 0) +
      window.scrollY,
  );
  const out = [];
  for (const mult of [1, 2, 3, 4]) {
    await page.evaluate(
      ([t, m]) => window.scrollTo(0, t + window.innerHeight * m),
      [top, mult],
    );
    await page.waitForTimeout(1000);
    const m = await page.evaluate(() => {
      const lap = document.querySelector(".sw-lap .lap");
      const r = lap?.getBoundingClientRect();
      const t = lap ? getComputedStyle(lap).transform : "none";
      const scale = t === "none" ? 1 : +parseFloat(t.split("(")[1]).toFixed(2);
      return {
        w: r ? Math.round(r.width) : 0,
        scale,
        // Untransformed layout width.
        layoutW: lap ? Math.round(lap.offsetWidth) : 0,
      };
    });
    out.push(`x${mult}: rendered=${m.w} layout=${m.layoutW} scale=${m.scale}`);
  }
  console.log(tag.padEnd(8), out.join(" | "));
  await ctx.close();
}
await browser.close();
