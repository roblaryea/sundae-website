import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';

const root = path.resolve(import.meta.dirname, '..');
const contentGroup = process.argv.find(a => a.startsWith('--content-group='))?.slice('--content-group='.length) || 'buyer-clarity';
if (!['buyer-clarity', 'buyer-depth', 'buyer-feature-details', 'buyer-proof-labels'].includes(contentGroup)) throw new Error('Unknown reviewed content group');
const directory = path.join(root, 'src/content', contentGroup);
const temporary = path.join(root, 'output/seo', `${contentGroup}-locales`);
const english = JSON.parse(await fs.readFile(path.join(directory, 'en.json'), 'utf8'));
const sourceHash = createHash('sha256').update(JSON.stringify(english)).digest('hex');
const protectedNumbers = [];
function mapStrings(value, change) {
  if (typeof value === 'string') return change(value);
  if (Array.isArray(value)) return value.map(item => mapStrings(item, change));
  return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, mapStrings(item, change)]));
}
const translationSource = mapStrings(english, text => text.replace(/\d+(?:[.,]\d+)*/g, number => {
  const marker = `__SUNDAE_NUM_${protectedNumbers.length}__`;
  protectedNumbers.push(number);
  return marker;
}));
function flatten(value, location = '', target = {}) {
  if (typeof value === 'string') target[location] = value;
  else for (const [key, item] of Object.entries(value)) flatten(item, location ? `${location}.${key}` : key, target);
  return target;
}
const flatSource = flatten(translationSource);
function restoreShape(template, translated, location = '') {
  if (typeof template === 'string') return translated[location];
  if (Array.isArray(template)) return template.map((item, index) => restoreShape(item, translated, `${location}.${index}`));
  return Object.fromEntries(Object.entries(template).map(([key, item]) => [key, restoreShape(item, translated, location ? `${location}.${key}` : key)]));
}
const model = process.env.OPENAI_TRANSLATION_MODEL || 'gpt-5-mini';
if (!process.env.OPENAI_API_KEY) throw new Error('The configured translation key is required');
const names = { ar: 'Arabic', fr: 'French', es: 'Spanish', de: 'German', nl: 'Dutch', pt: 'Portuguese',
  hi: 'Hindi', ur: 'Urdu', it: 'Italian', pl: 'Polish', tr: 'Turkish', 'zh-Hans': 'Simplified Chinese',
  ja: 'Japanese', ko: 'Korean', id: 'Indonesian', vi: 'Vietnamese', ro: 'Romanian', sv: 'Swedish',
  bn: 'Bengali', th: 'Thai', ms: 'Malay' };
const selected = process.argv.find(a => a.startsWith('--locales='))?.slice('--locales='.length).split(',') || Object.keys(names);
if (selected.some(l => !names[l])) throw new Error('Unknown marketing locale');
await fs.mkdir(temporary, { recursive: true });

function validate(expected, actual, location) {
  if (Array.isArray(expected)) {
    if (!Array.isArray(actual) || actual.length !== expected.length) throw new Error(`${location}: array shape`);
    expected.forEach((value, i) => validate(value, actual[i], `${location}.${i}`));
  } else if (expected && typeof expected === 'object') {
    if (!actual || Array.isArray(actual) || typeof actual !== 'object'
      || JSON.stringify(Object.keys(actual).sort()) !== JSON.stringify(Object.keys(expected).sort())) throw new Error(`${location}: object shape`);
    for (const [key, value] of Object.entries(expected)) validate(value, actual[key], `${location}.${key}`);
  } else {
    if (typeof actual !== 'string' || !actual.trim() || actual.includes('—')) throw new Error(`${location}: invalid copy`);
    const numbers = value => [...value.matchAll(/\d+(?:[.,]\d+)*/g)].map(m => m[0]).sort();
    if (JSON.stringify(numbers(expected)) !== JSON.stringify(numbers(actual))) throw new Error(`${location}: changed example figures`);
    if ((expected.match(/\*/g) || []).length !== (actual.match(/\*/g) || []).length) throw new Error(`${location}: emphasis markers`);
    if (expected.length > 30 && expected === actual) throw new Error(`${location}: untranslated sentence`);
  }
}

async function translate(locale) {
  const filename = path.join(temporary, `${locale}.json`);
  try {
    const saved = JSON.parse(await fs.readFile(filename, 'utf8'));
    if (saved.sourceHash === sourceHash) {
      validate(english, saved.copy, locale);
      console.log(`${locale}: reused matching reviewed source`);
      return;
    }
  } catch { /* Missing or obsolete output must be regenerated. */ }
  let failure;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST', signal: AbortSignal.timeout(240_000),
        headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ model, reasoning_effort: 'low', max_completion_tokens: 28000,
          response_format: { type: 'json_schema', json_schema: { name: 'buyer_clarity_translation', strict: true,
            schema: { type: 'object', properties: Object.fromEntries(Object.keys(flatSource).map(key => [key, { type: 'string' }])),
              required: Object.keys(flatSource), additionalProperties: false } } },
          messages: [
            { role: 'system', content: 'Transcreate reviewed B2B hospitality and food-service operations copy for actual operators. Return JSON only with exactly the same keys, nested objects, arrays and lengths. Use concise, natural professional language. Preserve product names Sundae, Core, Crew, Pulse, Benchmarks, Watchtower, Insights, Ask Sundae, Foresight. Preserve every __SUNDAE_NUM_n__ placeholder exactly, in the same field, once for each occurrence; these will become real numbers after translation. Do not spell out or remove a placeholder, even where your language might use a dual noun. Do not add or strengthen any claim, timing, guarantee, causation or package entitlement. Keep limitations and demo/customer/evidence distinctions accurate. Preserve each *emphasis* marker. Do not use em dashes. Translate every functional sentence; do not leave English prose or invent a fallback.' },
            { role: 'user', content: `Translate every value into ${names[locale]} (${locale}), including all titles and metadata. "Sundae in Practice" is a descriptive phrase to localize, not a fixed product name. Keep the flat field-path keys exactly unchanged. ${attempt ? 'Correct the previous validation issue: '+failure.message+'. ' : ''}\n\n${JSON.stringify(flatSource)}` },
          ] }),
      });
      if (!response.ok) throw new Error(`Translation service HTTP ${response.status}`);
      const result = await response.json();
      if (result.choices?.[0]?.finish_reason !== 'stop') throw new Error('Incomplete translation');
      const translated = restoreShape(english, JSON.parse(result.choices[0].message.content));
      const copy = mapStrings(translated, text => text.replace(/__SUNDAE_NUM_(\d+)__/g, (_, index) => {
        if (protectedNumbers[index] === undefined) throw new Error('Unknown numeric placeholder');
        return protectedNumbers[index];
      }));
      await fs.writeFile(path.join(temporary, `${locale}-attempt-${attempt + 1}.json`), JSON.stringify(copy, null, 2) + '\n');
      validate(english, copy, locale);
      const saved = { sourceHash, model, copy };
      await fs.writeFile(filename, JSON.stringify(saved, null, 2) + '\n');
      console.log(`${locale}: complete and validated`);
      return;
    } catch (error) {
      failure = error;
      console.log(`${locale}: attempt ${attempt + 1} failed (${error.message})`);
    }
  }
  throw failure;
}

let next = 0;
const failures = [];
await Promise.all(Array.from({ length: Math.min(2, selected.length) }, async () => {
  while (next < selected.length) {
    const locale = selected[next++];
    try { await translate(locale); } catch (error) { failures.push(locale); console.log(`${locale}: needs correction (${error.message})`); }
  }
}));
if (failures.length) throw new Error(`Incomplete locales retained for correction: ${failures.join(', ')}`);

const localized = { en: english };
for (const locale of Object.keys(names)) {
  try {
    const saved = JSON.parse(await fs.readFile(path.join(temporary, `${locale}.json`), 'utf8'));
    if (saved.sourceHash !== sourceHash) throw new Error('obsolete');
    validate(english, saved.copy, locale);
    localized[locale] = saved.copy;
  } catch {
    console.log('Partial locale preparation retained; published dictionaries are unchanged.');
    process.exit(0);
  }
}
for (const group of Object.keys(english)) {
  const copy = Object.fromEntries(Object.entries(localized).map(([locale, value]) => [locale, value[group]]));
  await fs.writeFile(path.join(directory, `${group}.json`), JSON.stringify(copy, null, 2) + '\n');
}
await fs.writeFile(path.join(directory, 'source-manifest.json'), JSON.stringify({ sourceHash, model, locales: Object.keys(localized) }, null, 2) + '\n');
console.log('All 22 locale groups published together from the same reviewed English source.');
