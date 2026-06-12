// Normalize transliterated product NAMES in nav mega-menu (pillars / plansList /
// products menu) to canonical English, matching on the stable href.
// Descriptions/subtitles (correctly translated) are left untouched.
// node design-pilot/_navnames.mjs <file> [--apply]
import fs from 'fs';

const FILE = process.argv[2];
const APPLY = process.argv.includes('--apply');

const MAP = {
  '/product/pulse': 'Pulse',
  '/benchmarking': 'Benchmarks',
  '/product/watchtower': 'Watchtower',
  '/insights': 'Insights',
  '/intelligence': 'Sundae Intelligence',
  '/product/foresight': 'Foresight',
  '/product/cross-intelligence': 'Cross-Intelligence',
  '/report': 'Sundae Report',
  '/product/sundae-report': 'Sundae Report',
  '/core': 'Sundae Core',
  '/crew': 'Sundae Crew',
};

const lines = fs.readFileSync(FILE, 'utf8').split('\n');
// supports both "name": "X"  and  name: 'X'
const nameRe = /^(\s*["']?name["']?\s*:\s*)(["'])(?:(?!\2).)*\2(.*)$/;
const hrefRe = /["']?href["']?\s*:\s*["'](\/[^"']*)["']/;

let hits = 0;
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(hrefRe);
  if (!m) continue;
  const canonical = MAP[m[1]];
  if (!canonical) continue;
  // search up to 6 lines back for the nearest name: in this object
  for (let j = i - 1; j >= Math.max(0, i - 6); j--) {
    const nm = lines[j].match(nameRe);
    if (nm) {
      const q = nm[2];
      const newLine = `${nm[1]}${q}${canonical}${q}${nm[3]}`;
      if (newLine !== lines[j]) { lines[j] = newLine; hits++; }
      break;
    }
  }
}
if (APPLY) fs.writeFileSync(FILE, lines.join('\n'));
console.log(`${APPLY ? 'APPLIED' : 'DRY RUN'}: ${hits} name normalizations in ${FILE}`);
