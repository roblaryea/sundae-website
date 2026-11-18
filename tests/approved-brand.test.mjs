import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';

const manifest = JSON.parse(fs.readFileSync('src/lib/brandAssetManifest.json', 'utf8'));
const original = asset => fs.readFileSync(path.join('public', asset.path));

test('current logo downloads retain the approved original artwork and dimensions', () => {
  for (const asset of Object.values(manifest.wordmarks)) {
    const bytes = original(asset);
    assert.equal(createHash('sha256').update(bytes).digest('hex'), asset.sha256);
    assert.equal(bytes.readUInt32BE(16), 480);
    assert.equal(bytes.readUInt32BE(20), 120);
  }
});

test('the active download kit contains only the two approved original PNGs', () => {
  const zip = fs.readFileSync('public/brand/sundae-brand-assets.zip');
  const entries = new Map(); let offset = 0;
  while (zip.readUInt32LE(offset) === 0x04034b50) {
    assert.equal(zip.readUInt16LE(offset + 8), 0, 'stored originals, without transformation');
    const length = zip.readUInt32LE(offset + 18), nameLength = zip.readUInt16LE(offset + 26), extra = zip.readUInt16LE(offset + 28);
    const name = zip.subarray(offset + 30, offset + 30 + nameLength).toString();
    const start = offset + 30 + nameLength + extra;
    entries.set(name, zip.subarray(start, start + length)); offset = start + length;
  }
  assert.equal(entries.size, 2);
  for (const asset of Object.values(manifest.wordmarks)) assert.deepEqual(entries.get(path.basename(asset.path)), original(asset));
});

test('active identity producers cannot import retired marks or reconstructed wordmark files', () => {
  const retired = /SundaeMark|WordmarkCherry|\/brand\/(?:logo|banners)\/|\/logos\/(?:sundae-(?:app-icon|mark|icon|lockup|wordmark)|apple-touch-icon)|M118,46/;
  function inspect(directory) {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const name = path.join(directory, entry.name);
      if (entry.isDirectory()) inspect(name);
      else if (/\.(?:tsx?|m?js|html)$/.test(name) && !name.includes('generated')) assert.doesNotMatch(fs.readFileSync(name, 'utf8'), retired, name);
    }
  }
  inspect('src'); inspect('scripts');
  const archive = JSON.parse(fs.readFileSync('brand-archive/retired-identity-2026-11-18/inventory.json', 'utf8'));
  const regenerated = new Set(['public/favicon.ico', 'src/app/favicon.ico', 'public/logos/og-operations.png', 'public/profile/robert-og.png', 'public/brand/sundae-brand-assets.zip']);
  for (const { formerPath } of archive) if (!regenerated.has(formerPath)) assert.equal(fs.existsSync(formerPath), false, formerPath);
});

test('the saved-contact fallback uses the same complete-wordmark square composition', () => {
  const source = fs.readFileSync('src/lib/profileAvatar.ts', 'utf8');
  const encoded = source.match(/'([A-Za-z0-9+/=]+)'/)?.[1];
  assert.ok(encoded);
  assert.deepEqual(Buffer.from(encoded, 'base64'), fs.readFileSync('public/brand/icons/wordmark-192.png'));
});

test('legacy email and card image URLs resolve only to approved public artwork', () => {
  const redirects = JSON.parse(fs.readFileSync('src/lib/retiredBrandRedirects.json', 'utf8'));
  assert.equal(new Set(redirects.map(entry => entry.source)).size, redirects.length);
  for (const entry of redirects) {
    assert.ok(/^\/brand\/(?:wordmarks|icons)\/[a-z0-9.-]+\.png$/.test(entry.destination) || (entry.source === '/logos/og-card.png' && entry.destination === '/logos/og-operations.png'));
    assert.ok(fs.existsSync(path.join('public', entry.destination)), entry.destination);
    assert.ok(!entry.source.includes('/banners/'), 'no blanket banner replacement');
  }
});

test('file-based favicons use RGBA PNG payloads accepted by the Next.js decoder', () => {
  for (const file of ['src/app/favicon.ico', 'public/favicon.ico']) {
    const bytes = fs.readFileSync(file), count = bytes.readUInt16LE(4);
    assert.ok(count > 0);
    for (let index = 0; index < count; index++) {
      const offset = bytes.readUInt32LE(6 + index * 16 + 12);
      assert.equal(bytes.subarray(offset + 1, offset + 4).toString(), 'PNG');
      assert.equal(bytes[offset + 25], 6, 'RGBA colour type');
    }
  }
});
