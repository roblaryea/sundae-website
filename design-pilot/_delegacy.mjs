// Remove legacy product names from specific live files (NOT architecture).
// Scout/Canvas -> Sundae Core ; Forge/Nexus -> Sundae Intelligence.
// Case-sensitive + word-boundary so lowercase icon/colorClass keys (scout/forge/canvas) are untouched.
// node design-pilot/_delegacy.mjs [--apply]
import fs from 'fs';
const APPLY = process.argv.includes('--apply');

const FILES = [
  'src/app/4d-intelligence/page.tsx',
  'src/app/resources/page.tsx',
  'src/app/docs/page.tsx',
  'src/components/ui/Breadcrumbs.tsx',
  'src/generated-locales/app_4d_intelligence_page.ts',
  'src/generated-locales/app_resources_page.ts',
  'src/generated-locales/app_docs_page.ts',
];

// ordered: 'Sundae X' first so we don't make 'Sundae Sundae Core'
const MAP = [
  [/Sundae Scout\b/g, 'Sundae Core'],
  [/Sundae Forge\b/g, 'Sundae Intelligence'],
  [/Sundae Canvas\b/g, 'Sundae Core'],
  [/Sundae Nexus\b/g, 'Sundae Intelligence'],
  [/\bScout\b/g, 'Sundae Core'],
  [/\bForge\b/g, 'Sundae Intelligence'],
  [/\bNexus\b/g, 'Sundae Intelligence'],
  [/\bCanvas\b/g, 'Sundae Core'],
];

let total = 0;
for (const f of FILES) {
  if (!fs.existsSync(f)) { console.log('MISSING', f); continue; }
  let s = fs.readFileSync(f, 'utf8');
  let hits = 0;
  for (const [re, rep] of MAP) s = s.replace(re, () => { hits++; return rep; });
  if (hits) { total += hits; console.log(`${String(hits).padStart(4)}  ${f}`); if (APPLY) fs.writeFileSync(f, s); }
}
console.log(`\n${APPLY ? 'APPLIED' : 'DRY RUN'}: ${total} replacements`);
