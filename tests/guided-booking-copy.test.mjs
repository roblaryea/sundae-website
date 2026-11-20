// Guided booking copy: every website locale, same shape as English, house style,
// protected product names, and package notes that match the shared constants.
import assert from 'node:assert/strict';
import test from 'node:test';
import { guidedBookingCopy } from '../src/lib/leadConversation/copy.ts';
import { FOCUS_FACTS, FOCUS_KEYS, FOCUS_KEYS_WITH_NOTES } from '../src/lib/leadConversation/packageNotes.ts';
import { ROLE_KEYS, ROLE_LABELS_EN, TOPIC_KEYS, TOPIC_LABELS_EN } from '../src/lib/leadConversation/script.ts';

const LOCALES = ['en', 'ar', 'fr', 'es', 'de', 'nl', 'pt', 'hi', 'ur', 'it', 'pl', 'tr', 'zh-Hans', 'ja', 'ko', 'id', 'vi', 'ro', 'sv', 'bn', 'th', 'ms'];

// Phase A's Operations Diagnostic packs: the same markets, written the same day.
// The booking follows their register, location word and package notes.
const DIAGNOSTIC = Object.fromEntries(await Promise.all(LOCALES.filter((locale) => locale !== 'en').map(async (locale) => {
  const mod = await import(`../src/lib/diagnostic/copy/${locale}.ts`);
  return [locale, mod[locale.replace('-', '')]];
})));

const LOCATION_WORD = {
  ar: /فرع|فروع/, ur: /برانچ/, hi: /आउटलेट/, bn: /লোকেশন/, fr: /sites?\b/i, es: /locales?\b/i, de: /Standort/, nl: /locatie/i,
  pt: /unidade/i, it: /sed[ei]\b/i, pl: /lokalizac/i, tr: /lokasyon/i, 'zh-Hans': /门店/, ja: /店舗/, ko: /매장/, id: /outlet/i,
  vi: /địa điểm/i, ro: /locați/i, sv: /enhet/i, th: /สาขา/, ms: /outlet/i,
};
const PROTECTED = ['Sundae', 'Crew Manage', 'Crew Operating', 'Crew Complete', 'Crew Pay', 'Core Performance', 'Core Growth', 'Foresight', 'Watchtower', 'POS'];

function strings(value, at = '') {
  if (typeof value === 'string') return [[at, value]];
  return Object.entries(value).flatMap(([key, child]) => strings(child, at ? `${at}.${key}` : key));
}
const placeholders = (text) => [...text.matchAll(/\{[^}]+\}/g)].map((match) => match[0]).sort().join('|');

test('every website locale has guided booking copy with the English shape', () => {
  assert.deepEqual(Object.keys(guidedBookingCopy).sort(), [...LOCALES].sort());
  const english = new Map(strings(guidedBookingCopy.en));
  for (const locale of LOCALES) {
    const localized = new Map(strings(guidedBookingCopy[locale]));
    assert.deepEqual([...localized.keys()].sort(), [...english.keys()].sort(), locale);
    for (const [path, text] of localized) {
      assert.ok(text.trim(), `${locale}.${path} is empty`);
      assert.equal(placeholders(text), placeholders(english.get(path)), `${locale}.${path} placeholders`);
      assert.doesNotMatch(text, /[—–]/, `${locale}.${path} uses an em/en dash`);
      assert.doesNotMatch(text, /!/, `${locale}.${path} uses an exclamation mark`);
      for (const term of PROTECTED) {
        if (english.get(path).includes(term)) assert.ok(text.includes(term), `${locale}.${path} must keep "${term}"`);
      }
    }
  }
});

test('English copy matches the stored English labels and package facts', () => {
  const en = guidedBookingCopy.en;
  for (const key of FOCUS_KEYS) {
    assert.equal(en.focus.options[key], FOCUS_FACTS[key].label, key);
    assert.equal(en.focus.agenda[key], FOCUS_FACTS[key].agenda, key);
  }
  assert.deepEqual(Object.keys(en.focus.notes).sort(), [...FOCUS_KEYS_WITH_NOTES].sort());
  for (const key of FOCUS_KEYS_WITH_NOTES) assert.equal(en.focus.notes[key], FOCUS_FACTS[key].note, key);
  for (const key of ROLE_KEYS) assert.equal(en.role.options[key], ROLE_LABELS_EN[key], key);
  for (const key of TOPIC_KEYS) assert.equal(en.topic.options[key], TOPIC_LABELS_EN[key], key);
});

test('the name error and the guided /demo heading exist in every locale', () => {
  assert.equal(guidedBookingCopy.en.errors.nameInvalid, 'Enter your name, not an email or a number');
  assert.equal(guidedBookingCopy.en.demoHeading, 'Tell us about your operation');
  for (const locale of LOCALES) {
    const copy = guidedBookingCopy[locale];
    assert.ok(copy.errors.nameInvalid.trim(), locale);
    assert.ok(copy.demoHeading.trim(), locale);
    if (locale !== 'en') {
      assert.notEqual(copy.errors.nameInvalid, guidedBookingCopy.en.errors.nameInvalid, locale);
      assert.notEqual(copy.demoHeading, guidedBookingCopy.en.demoHeading, locale);
    }
  }
});

test('Sundae is labelled as guided booking and never as a person', () => {
  for (const locale of LOCALES) {
    const copy = guidedBookingCopy[locale];
    for (const opening of Object.values(copy.openings)) assert.match(opening, /Sundae/, `${locale} opening names Sundae`);
  }
  assert.match(guidedBookingCopy.en.header.subline, /^Guided booking/);
});

test('package notes are word-for-word the Operations Diagnostic notes in every locale', () => {
  for (const [locale, pack] of Object.entries(DIAGNOSTIC)) {
    const notes = guidedBookingCopy[locale].focus.notes;
    const diag = pack.facts.notes;
    assert.equal(notes.tasks_logbook, diag.tasks_logbook, `${locale} tasks_logbook`);
    assert.equal(notes.tips, diag.tips, `${locale} tips`);
    assert.equal(notes.payroll, diag.payroll, `${locale} payroll`);
    assert.equal(notes.forecasting, diag.foresight, `${locale} forecasting`);
    assert.equal(notes.competitors_market, diag.watchtower, `${locale} competitors_market`);
  }
});

test('locations use the Operations Diagnostic word for a location in every locale', () => {
  for (const [locale, word] of Object.entries(LOCATION_WORD)) {
    const copy = guidedBookingCopy[locale];
    for (const [key, value] of Object.entries({ prompt: copy.locations.prompt, label: copy.locations.label, one: copy.locations.one, many: copy.locations.many, known: copy.locations.known, pricing: copy.openings.pricing })) {
      assert.match(value, word, `${locale} ${key}: "${value}"`);
    }
  }
});

test('Romanian uses the formal dumneavoastră register, like the diagnostic', () => {
  const informal = /(^|[^\p{L}])(tu|tău|ta|tale|tine|ți|îți|te rog|ai|poți|vrei|alege|introdu|scrie)([^\p{L}]|$)/iu;
  for (const [path, text] of strings(guidedBookingCopy.ro)) assert.doesNotMatch(text, informal, `ro.${path}: "${text}"`);
});
