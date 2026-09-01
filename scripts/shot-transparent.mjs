import puppeteer from "puppeteer-core";
const out = process.argv[2];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await puppeteer.launch({
  executablePath: process.env.CHROME,
  headless: true,
  protocolTimeout: 180000,
  args: ["--force-color-profile=srgb", "--hide-scrollbars", "--no-sandbox", "--use-gl=angle", "--enable-webgl", "--ignore-gpu-blocklist", "--user-data-dir=/tmp/pptr-t" + Date.now()],
});
try {
  const p = await b.newPage();
  await p.setViewport({ width: 1300, height: 1000, deviceScaleFactor: 2 });
  p.on("pageerror", (e) => console.log("PAGEERR:", e.message));
  await p.goto("http://localhost:3000/", { waitUntil: "domcontentloaded", timeout: 60000 });
  await sleep(7000);
  // strip every CSS background so only the WebGL glass (canvas alpha) remains opaque
  await p.addStyleTag({ content: "html,body,section,div,main,header{background:transparent !important;background-image:none !important;box-shadow:none !important;}" });
  await sleep(300);
  const el = await p.$("canvas[data-engine]");
  if (!el) throw new Error("no canvas[data-engine] (3D not mounted)");
  await el.screenshot({ path: out, omitBackground: true });
  console.log("OK ->", out);
} catch (e) { console.log("ERR:", e.message); process.exitCode = 1; }
finally { await b.close(); }
