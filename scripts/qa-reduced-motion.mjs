#!/usr/bin/env node
/**
 * Guard: content must never be hidden behind a reduced-motion check.
 *
 * `useReducedMotion()` returns false during SSR and the first client render,
 * then flips to true after hydration for a user who prefers reduced motion.
 * So this pairing strands content permanently invisible:
 *
 *     initial={reduce ? false : { opacity: 0, y: 16 }}   // applied: opacity 0
 *     whileInView={reduce ? undefined : { opacity: 1 }}  // becomes undefined
 *
 * Nothing ever animates it back. Only the MOTION may be conditional, never the
 * visible end state:
 *
 *     initial={reduce ? false : { opacity: 0, y: 16 }}
 *     whileInView={{ opacity: 1, y: 0 }}
 *     transition={{ duration: reduce ? 0 : 0.5 }}
 *
 * Shipped invisible on the homepage "Measure and learn" section (2026-08-19).
 */
import { readFileSync } from 'node:fs';
import { globSync } from 'node:fs';
import { execSync } from 'node:child_process';

const FLAG = String.raw`(?:reduce|reduced|reduceMotion|prefersReduced|shouldReduce|isReduced)`;
// A reveal prop (not `exit`, which only runs on unmount) short-circuited to undefined/false.
const REVEAL_GATED = new RegExp(String.raw`(whileInView|animate)=\{${FLAG}\s*\?\s*(undefined|false)`, 'g');
// An initial state that hides the element.
const HIDES = /initial=\{[^}]*opacity:\s*0/;

const files = execSync(
  "find src -name '*.tsx' -not -path '*/node_modules/*'",
  { encoding: 'utf8' },
).trim().split('\n').filter(Boolean);

const findings = [];
for (const file of files) {
  const src = readFileSync(file, 'utf8');
  const lines = src.split('\n');
  lines.forEach((line, i) => {
    REVEAL_GATED.lastIndex = 0;
    if (!REVEAL_GATED.test(line)) return;
    // Only a defect when the same motion element also starts hidden: look at the
    // few lines around it, which is where `initial` sits on these components.
    const window = lines.slice(Math.max(0, i - 3), i + 4).join('\n');
    if (!HIDES.test(window)) return;
    findings.push({ file, line: i + 1, text: line.trim().slice(0, 110) });
  });
}

if (findings.length) {
  console.error('\n✖ Reduced-motion QA failed: content can be stranded invisible.\n');
  for (const f of findings) {
    console.error(`  ${f.file}:${f.line}`);
    console.error(`    ${f.text}`);
  }
  console.error(
    '\n  Fix: keep the reveal prop unconditional and gate only the transition,\n' +
    '  e.g. whileInView={{ opacity: 1 }} + transition={{ duration: reduce ? 0 : 0.5 }}\n',
  );
  process.exit(1);
}
console.log(`Reduced-motion QA passed - scanned ${files.length} components, no content gated behind a reduced-motion check.`);
