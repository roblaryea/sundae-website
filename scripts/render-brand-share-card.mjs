import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from '@playwright/test';

const root = path.resolve(import.meta.dirname, '..');
let html = await fs.readFile(path.join(root, 'scripts/brand-share-card.html'), 'utf8');
for (const file of ['hanken-grotesk-latin-var.woff2', 'fraunces-latin-var.woff2']) {
  const bytes = await fs.readFile(path.join(root, 'scripts/profile-og/fonts', file));
  html = html.replace(`./profile-og/fonts/${file}`, `data:font/woff2;base64,${bytes.toString('base64')}`);
}
const wordmark = await fs.readFile(path.join(root, 'public/brand/wordmarks/sundae-wordmark-fraunces-white.png'));
html = html.replace('../public/brand/wordmarks/sundae-wordmark-fraunces-white.png', `data:image/png;base64,${wordmark.toString('base64')}`);
const symbol = await fs.readFile(path.join(root, 'public/brand/marks/sundae-mark.svg'));
html = html.replace('../public/brand/marks/sundae-mark.svg', `data:image/svg+xml;base64,${symbol.toString('base64')}`);
const browser = await chromium.launch({ channel: 'chrome' }).catch(() => chromium.launch());
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.locator('img').evaluateAll(images => Promise.all(images.map(image => image.decode())));
  await fs.mkdir(path.join(root, 'public/logos'), { recursive: true });
  await page.screenshot({ path: path.join(root, 'public/logos/og-operations.png') });
  console.log('Rendered the existing share layout with the confirmed symbol and original white wordmark.');
} finally { await browser.close(); }
