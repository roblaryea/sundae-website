// Build a contact sheet from PNGs: node design-pilot/_montage.mjs <out.png> <cols> <cellW> <img1> <img2> ...
// Lays images in a grid via an HTML page screenshotted by Playwright. Keeps final <2000px.
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const out = process.argv[2];
const cols = parseInt(process.argv[3], 10) || 3;
const cellW = parseInt(process.argv[4], 10) || 460;
const imgs = process.argv.slice(5);

const cells = imgs.map(f => {
  const buf = fs.readFileSync(f);
  const b64 = buf.toString('base64');
  const label = path.basename(f).replace('.png', '');
  return `<figure><img src="data:image/png;base64,${b64}"/><figcaption>${label}</figcaption></figure>`;
}).join('\n');

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
  *{margin:0;box-sizing:border-box}
  body{background:#222;padding:8px}
  .grid{display:grid;grid-template-columns:repeat(${cols},${cellW}px);gap:8px}
  figure{background:#111;border:1px solid #444}
  img{width:${cellW}px;display:block}
  figcaption{color:#ffd;font:11px monospace;padding:3px 5px;background:#000}
</style></head><body><div class="grid">${cells}</div></body></html>`;

const tmp = path.join(path.dirname(out), '_montage_tmp.html');
fs.writeFileSync(tmp, html);
const b = await chromium.launch();
const totalW = cols * (cellW + 8) + 24;
const p = await (await b.newContext({ viewport: { width: totalW, height: 1000 }, deviceScaleFactor: 1 })).newPage();
await p.goto('file://' + path.resolve(tmp), { waitUntil: 'load' });
await p.waitForTimeout(400);
await p.screenshot({ path: out, fullPage: true });
await b.close();
fs.unlinkSync(tmp);
console.log('montage:', out, 'width', totalW);
