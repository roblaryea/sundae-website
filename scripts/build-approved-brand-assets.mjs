import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';

const root = path.resolve(import.meta.dirname, '..');
const manifest = JSON.parse(await fs.readFile(path.join(root, 'src/lib/brandAssetManifest.json'), 'utf8'));
const sources = {};
for (const [tone, asset] of Object.entries(manifest.wordmarks)) {
  const bytes = await fs.readFile(path.join(root, 'public', asset.path));
  if (createHash('sha256').update(bytes).digest('hex') !== asset.sha256) throw new Error(`Unapproved ${tone} wordmark`);
  sources[tone] = bytes;
}
for (const [assetPath, asset] of Object.entries(manifest.symbolOriginals)) {
  const bytes = await fs.readFile(path.join(root, 'public', assetPath));
  if (createHash('sha256').update(bytes).digest('hex') !== asset.sha256) throw new Error(`Unapproved symbol asset ${assetPath}`);
}
sources.symbol = await fs.readFile(path.join(root, 'public', manifest.symbol.path));
sources.symbolPng = await fs.readFile(path.join(root, 'public/brand/icons/mark-512.png'));

// Resize only the confirmed full symbol tile; preserve original PNGs and ICO.
execFileSync('python3', [path.join(root, 'scripts/build-approved-brand-icons.py')], { stdio: 'inherit' });
const contactIcon = await fs.readFile(path.join(root, 'public/brand/icons/mark-192.png'));

// Preserve the existing vCard fallback producer without server-time filesystem reads.
await fs.writeFile(path.join(root, 'src/lib/profileAvatar.ts'),
  `/** Owner-confirmed S-and-cherry contact fallback. Generated from the approved full symbol tile. */\nexport const PROFILE_AVATAR_PNG_BASE64 =\n  '${contactIcon.toString('base64')}';\n`);

// The kit contains original symbol SVG/PNG and both exact wordmark PNGs.
function crc32(bytes) {
  let crc = 0xffffffff;
  for (const byte of bytes) { crc ^= byte; for (let bit = 0; bit < 8; bit++) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1)); }
  return (crc ^ 0xffffffff) >>> 0;
}
const local = [], central = []; let localOffset = 0;
const kit = [
  ...Object.entries(manifest.wordmarks).map(([tone, asset]) => ({ name: path.basename(asset.path), bytes: sources[tone] })),
  { name: 'sundae-mark.svg', bytes: sources.symbol },
  { name: 'sundae-mark-512.png', bytes: sources.symbolPng },
];
for (const asset of kit) {
  const bytes = asset.bytes, name = Buffer.from(asset.name), crc = crc32(bytes);
  const entry = Buffer.alloc(30); entry.writeUInt32LE(0x04034b50); entry.writeUInt16LE(20, 4);
  entry.writeUInt32LE(crc, 14); entry.writeUInt32LE(bytes.length, 18); entry.writeUInt32LE(bytes.length, 22); entry.writeUInt16LE(name.length, 26);
  local.push(entry, name, bytes);
  const record = Buffer.alloc(46); record.writeUInt32LE(0x02014b50); record.writeUInt16LE(20, 4); record.writeUInt16LE(20, 6);
  record.writeUInt32LE(crc, 16); record.writeUInt32LE(bytes.length, 20); record.writeUInt32LE(bytes.length, 24);
  record.writeUInt16LE(name.length, 28); record.writeUInt32LE(localOffset, 42); central.push(record, name);
  localOffset += entry.length + name.length + bytes.length;
}
const directory = Buffer.concat(central), end = Buffer.alloc(22);
end.writeUInt32LE(0x06054b50); end.writeUInt16LE(kit.length, 8); end.writeUInt16LE(kit.length, 10);
end.writeUInt32LE(directory.length, 12); end.writeUInt32LE(localOffset, 16);
await fs.writeFile(path.join(root, 'public/brand/sundae-brand-assets.zip'), Buffer.concat([...local, directory, end]));
console.log('Verified symbol and wordmark originals; generated icon derivatives, vCard fallback and four-file kit.');
