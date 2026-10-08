import assert from 'node:assert/strict';
import { test } from 'node:test';
import { registerHooks } from 'node:module';
// Match Next's bundler resolution for pure TypeScript imports in the Node test runner.
registerHooks({ resolve(specifier, context, nextResolve) {
  try { return nextResolve(specifier,context); } catch (error) {
    if (error.code !== 'ERR_MODULE_NOT_FOUND' || !specifier.startsWith('.') || /\.[a-z]+$/i.test(specifier)) throw error;
    return nextResolve(`${specifier}.ts`,context);
  }
} });
const { buildPricingSimUrl } = await import('../src/lib/diagnostic/pricingLink.ts');
const { decodePricingIntent } = await import('../src/lib/pricingIntent.ts');

test('diagnostic pricing preserves actual package and Crew recommendations without contact details', () => {
  const url = new URL(buildPricingSimUrl({outlets:'6_15'}, {recommendedStack:[{layer:'core',label:'Core Growth'},{layer:'crew',label:'Crew Operating'},{layer:'watchtower',label:'Watchtower'}]}, {email:'private@example.test',name:'Private Buyer',company:'Private Group',country:'AE'}));
  const intent = decodePricingIntent(url.searchParams.get('cfg'));
  assert.equal(intent.layer,'both');
  assert.equal(intent.corePackage,'core_growth');
  assert.equal(intent.locations,10);
  assert.deepEqual(intent.watchtowerModules,['bundle']);
  assert.deepEqual(intent.crewSkus,['crew_operations','crew_scheduling','crew_tna','crew_payroll']);
  assert.equal(url.toString().includes('private'),false);
  assert.equal(JSON.stringify(intent).includes('Private'),false);
  assert.deepEqual([...url.searchParams.keys()],['cfg']);
});
test('Crew-only recommendations do not seed a Core purchase', () => {
  const url = new URL(buildPricingSimUrl({outlets:'1'}, {recommendedStack:[{layer:'crew',label:'Schedule & Time'}]}, {email:'',name:'',company:'',country:''}));
  const intent = decodePricingIntent(url.searchParams.get('cfg'));
  assert.equal(intent.layer,'crew');
  assert.deepEqual(intent.crewSkus,['crew_scheduling','crew_tna']);
  assert.deepEqual(intent.watchtowerModules,[]);
});
