import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import ts from 'typescript';

// Compile the actual URL helper and its shared pricing validator without a framework runtime.
const moduleUrl = (source) => 'data:text/javascript;base64,' + Buffer.from(ts.transpile(source, { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 })).toString('base64');
const intentUrl = moduleUrl(readFileSync(new URL('../src/lib/pricingIntent.ts', import.meta.url), 'utf8'));
const source = readFileSync(new URL('../src/lib/accessRequestUrl.ts', import.meta.url), 'utf8')
  .replace(/import .* from '.\/i18n';/, `const websiteLocales = ['en','fr','ar']; const localizeWebsiteHref = (path, locale) => locale === 'en' ? path : '/' + locale + path;`)
  .replace("'./pricingIntent'", JSON.stringify(intentUrl));
const { accessRequestUrl } = await import(moduleUrl(source));
const { encodePricingIntent, decodePricingIntent } = await import(intentUrl);
const config = { v:2, layer:'both', corePackage:'core_growth', locations:4, addOns:[], watchtowerModules:[], crewSkus:['crew_operations'], crossIntelligence:'none', billingCycle:'annual_upfront', operatingModels:[], employees:80, payrollCountry:'AE' };
test('legacy pricing return links preserve validated selection and language', () => {
  const result = new URL(accessRequestUrl('/onboarding?lang=fr&cfg=' + encodePricingIntent(config), 'en'), 'https://www.sundae.io');
  assert.equal(result.pathname, '/fr/get-started');
  const decoded = decodePricingIntent(result.searchParams.get('cfg'));
  assert.equal(decoded.locations, 4);
  assert.equal(decoded.employees, 80);
  assert.equal(decoded.billingCycle, 'annual_upfront');
  assert.equal(result.searchParams.get('source'), 'pricing-configurator');
});
test('invalid and external destinations never become signup redirects', () => {
  for (const input of [undefined, ['x'], 'https://evil.example', '//evil.example', '/other?cfg=bad', '/onboarding?cfg=bad', '/onboarding?cfg=%', '/onboarding?next=https://evil.example']) {
    assert.equal(accessRequestUrl(input, 'ar'), '/ar/get-started');
  }
});

const handles = await import(moduleUrl(readFileSync(new URL('../src/lib/profileHandles.ts', import.meta.url), 'utf8')));
test('access request page is reserved rather than treated as a public profile', () => {
  assert.equal(handles.isProfileCardPath('/get-started'), false);
});
