import fs from 'node:fs/promises';
import assert from 'node:assert/strict';

// Read-only drift check. The public, active database catalogue is authoritative;
// do not silently rewrite a reviewed website snapshot when product policy moves.
const saved = JSON.parse(await fs.readFile(new URL('../src/lib/pricing/catalogSnapshot.json', import.meta.url), 'utf8'));
const response = await fetch('https://www.sundae.io/api/pricing/catalog', { signal: AbortSignal.timeout(30_000) });
if (!response.ok) throw new Error(`Active pricing catalogue unavailable (${response.status}); parity not verified.`);
const live = await response.json();
assert.equal(live.version?.isAuthoritative, true, 'Expected the authoritative active catalogue');
const pick = (item, keys) => Object.fromEntries(keys.map(key => [key, item[key] ?? null]));
const actual = {
  ...pick(live.version, ['versionName', 'publishedAt', 'isAuthoritative']),
  verifiedOn: saved.verifiedOn,
  tiers: live.tiers.map(item => pick(item, ['id', 'name', 'basePrice', 'locationBands', 'includedModuleIds', 'aiCreditsBase'])),
  modules: live.modules.filter(item => saved.modules.some(savedItem => savedItem.id === item.id)).map(item => pick(item, ['id', 'name', 'locationBands'])),
  bundles: live.bundles.map(item => pick(item, ['id', 'name', 'basePrice', 'locationBands', 'moduleIds'])),
  discounts: live.discounts.map(item => pick(item, ['billingCycle', 'discountPercent', 'paymentSchedule'])),
  maxCombinedDiscountPercent: live.version.maxCombinedDiscountPercent,
};
assert.deepEqual(actual, saved, 'Website price snapshot differs from the active catalogue. Review rates, package scope and copy before release.');
console.log(`Pricing parity verified: ${saved.versionName}; Core, Crew, concepts, bundles, module inclusions and payment discounts.`);
