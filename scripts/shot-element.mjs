import puppeteer from "puppeteer-core";
const [url, sel, out, waitMs] = process.argv.slice(2);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({
  executablePath: process.env.CHROME,
  headless: true,
  protocolTimeout: 120000,
  args: [
    "--force-color-profile=srgb", "--hide-scrollbars", "--no-sandbox",
    "--disable-gpu", "--disable-3d-apis", "--disable-dev-shm-usage", "--disable-extensions",
    "--user-data-dir=/tmp/pptr-" + Date.now(),
  ],
});
try {
  const p = await b.newPage();
  // prefers-reduced-motion → hero gates to SVG (no WebGL) → stable headless tab
  // WebGL disabled via --disable-3d-apis so the hero gates to SVG; animations run live
  await p.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 2 });
  p.on("pageerror", (e) => console.log("PAGEERR:", e.message));
  await p.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
  await sleep(2000);
  const found = await p.evaluate((s) => {
    const el = document.querySelector(s);
    if (!el) return false;
    el.scrollIntoView({ block: "center" });
    return true;
  }, sel);
  if (!found) throw new Error("selector not found: " + sel);
  await sleep(Number(waitMs || 2500));
  await p.screenshot({ path: out });
  console.log("OK ->", out);
} catch (e) {
  console.log("ERR:", e.message);
  process.exitCode = 1;
} finally {
  await b.close();
}
