#!/usr/bin/env node
/**
 * Guard: `position: fixed` must resolve against the viewport.
 *
 * `transform`, `filter`, `backdrop-filter`, `perspective`, `will-change` on
 * those, and `contain: paint|layout|strict|content` each make an element a
 * containing block for its `position: fixed` descendants. A full-screen overlay
 * nested inside one silently shrinks to that ancestor's box.
 *
 * Shipped that way: <nav> carried `backdrop-blur-md`, so the mobile drawer's
 * `fixed inset-0` click-away scrim was 80px tall instead of the full viewport,
 * and tapping outside the drawer below the top strip did nothing. It survived
 * review because at phone width the drawer is nearly full-bleed - there is
 * barely any "outside" - so it only reproduces from about tablet width up.
 *
 * LIMITATION: this reads JSX nesting inside a single file. It cannot see an
 * overlay that is trapped by an ancestor in a different component. Those need
 * the rendered DOM; this catches the same-file shape, which is the one that
 * actually shipped.
 */
import { readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

// Utilities that create a containing block for fixed descendants.
const TRAPPING = [
  /\bbackdrop-blur(-|\b)/, /\bbackdrop-filter\b/,
  /\bfilter\b/, /(^|[\s"'`{])blur-(sm|md|lg|xl|2xl|3xl|none|\[)/,
  /\bwill-change-(transform|filter|perspective)\b/,
  /\bcontain-(paint|layout|strict|content)\b/,
  /\bperspective(-|\[)/,
  // static transform utilities (transition-transform / group-hover: are not)
  /(^|[\s"'`{])(scale|rotate|skew)-(?!none)/,
  /(^|[\s"'`{])-?translate-(x|y|z)-/,
  /(^|[\s"'`{])transform-gpu\b/,
];
// `transition-transform`, `hover:scale-…` etc. only apply transiently or on a
// pseudo-state; a class list that ONLY matches through those is not a trap.
const TRANSIENT = /(transition-|duration-|ease-|group-hover:|hover:|focus:|active:|peer-)/;

const isTrapping = (cls) => {
  const stripped = cls
    .split(/\s+/)
    .filter((t) => !TRANSIENT.test(t))
    .join(' ');
  return TRAPPING.some((re) => re.test(stripped));
};
const isFixed = (cls) => /(^|[\s"'`{])fixed(\s|$|["'`}])/.test(cls);

const files = execSync("find src -name '*.tsx' -not -path '*/node_modules/*'", { encoding: 'utf8' })
  .trim().split('\n').filter(Boolean);

const findings = [];

for (const file of files) {
  const src = readFileSync(file, 'utf8');
  // Walk JSX tags, keeping a stack of open elements and whether each traps.
  const tagRe = /<(\/?)([A-Za-z][\w.]*)((?:[^<>{}]|\{(?:[^{}]|\{[^{}]*\})*\})*?)(\/?)>/g;
  const stack = [];
  let m;
  while ((m = tagRe.exec(src))) {
    const [full, closing, tag, attrs, selfClose] = m;
    if (closing) { stack.pop(); continue; }

    const clsMatch = attrs.match(/className=(?:"([^"]*)"|\{`([^`]*)`\}|\{([^}]*)\})/);
    const cls = clsMatch ? (clsMatch[1] ?? clsMatch[2] ?? clsMatch[3] ?? '') : '';
    const scoped = /data-fixed-scoped=\{?["']?true/.test(attrs);

    if (cls && isFixed(cls) && !scoped) {
      const trap = stack.find((f) => f.traps);
      if (trap) {
        findings.push({
          file,
          line: src.slice(0, m.index).split('\n').length,
          el: `<${tag}>`,
          cls: cls.replace(/\s+/g, ' ').trim().slice(0, 64),
          trapTag: trap.tag,
          trapLine: trap.line,
          trapCls: trap.cls.replace(/\s+/g, ' ').trim().slice(0, 64),
        });
      }
    }
    if (!selfClose) {
      stack.push({ tag: `<${tag}>`, traps: cls ? isTrapping(cls) : false, cls, line: src.slice(0, m.index).split('\n').length });
    }
  }
}

if (findings.length) {
  console.error(`\n✖ Fixed-positioning QA failed: ${findings.length} overlay(s) trapped by an ancestor.\n`);
  for (const f of findings) {
    console.error(`  ${f.file}:${f.line}  ${f.el} is position:fixed`);
    console.error(`    ${f.cls}`);
    console.error(`  but its ancestor ${f.trapTag} at line ${f.trapLine} creates a containing block:`);
    console.error(`    ${f.trapCls}\n`);
  }
  console.error(
    '  The overlay resolves against that ancestor, not the viewport.\n' +
    '  Fix: move the transform/filter/backdrop-filter onto a sibling layer, or\n' +
    '  hoist the fixed element out. Use data-fixed-scoped="true" only when the\n' +
    '  element is genuinely meant to be scoped to its parent.\n',
  );
  process.exit(1);
}
console.log(`Fixed-positioning QA passed - scanned ${files.length} components, no overlay trapped by a containing-block ancestor.`);
