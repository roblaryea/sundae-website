import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

const persona = fs.readFileSync('src/components/home/sections/SectionPersonaSwitcher.tsx', 'utf8');
const intro = fs.readFileSync('src/components/home/SectionCinematicIntro.tsx', 'utf8');

test('homepage role switcher keeps a named tablist and roving keyboard focus', () => {
  assert.match(persona, /role="tablist"/);
  assert.match(persona, /aria-labelledby="persona-headline"/);
  assert.match(persona, /tabIndex=\{isActive \? 0 : -1\}/);
  assert.match(persona, /event\.key === 'ArrowRight'/);
  assert.match(persona, /event\.key === 'ArrowLeft'/);
  assert.match(persona, /event\.key === 'Home'/);
  assert.match(persona, /event\.key === 'End'/);
  assert.doesNotMatch(persona, /aria-label="Choose your role"/);
});

test('homepage supporting copy is available before entrance motion hydrates', () => {
  assert.match(intro, /This is the mobile LCP text/);
  assert.match(intro, /initial=\{false\}/);
});
