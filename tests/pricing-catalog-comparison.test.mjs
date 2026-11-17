import assert from 'node:assert/strict'
import fs from 'node:fs'
import test from 'node:test'
import { normalizeCatalogComparison } from '../scripts/lib/catalog-comparison.mjs'
const saved = JSON.parse(fs.readFileSync('src/lib/pricing/catalogSnapshot.json', 'utf8'))
const changed = mutate => { const copy = structuredClone(saved); mutate(copy); return normalizeCatalogComparison(copy) }
const expected = normalizeCatalogComparison(saved)
test('catalogue parity accepts reordered keyed module rows without rewriting display source', () => {
  const order = saved.modules.map(m => m.id)
  assert.deepEqual(changed(c => c.modules.reverse()), expected)
  assert.deepEqual(saved.modules.map(m => m.id), order)
})
for (const [name, mutate] of [
  ['location-band price', c => c.modules[0].locationBands[0][1]++],
  ['package inclusion', c => c.tiers[0].includedModuleIds.push('not-in-this-package')],
  ['Watchtower eligibility', c => c.tiers[0].allowsWatchtower = !c.tiers[0].allowsWatchtower],
  ['ordered location bands', c => c.modules.find(m => m.locationBands.length > 1).locationBands.reverse()],
]) test(`catalogue parity still rejects changed ${name}`, () => {
  assert.throws(() => assert.deepEqual(changed(mutate), expected))
})
