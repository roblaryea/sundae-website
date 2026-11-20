// Guided booking copy: every website locale, same shape as English, house style,
// protected product names, and package notes that match the shared constants.
import assert from 'node:assert/strict';
import test from 'node:test';
import { guidedBookingCopy } from '../src/lib/leadConversation/copy.ts';
import { FOCUS_FACTS, FOCUS_KEYS, FOCUS_KEYS_WITH_NOTES } from '../src/lib/leadConversation/packageNotes.ts';
import { ROLE_KEYS, ROLE_LABELS_EN, TOPIC_KEYS, TOPIC_LABELS_EN } from '../src/lib/leadConversation/script.ts';

const LOCALES = ['en', 'ar', 'fr', 'es', 'de', 'nl', 'pt', 'hi', 'ur', 'it', 'pl', 'tr', 'zh-Hans', 'ja', 'ko', 'id', 'vi', 'ro', 'sv', 'bn', 'th', 'ms'];
const PROTECTED = ['Sundae', 'Crew Operating', 'Crew Complete', 'Crew Payroll', 'Core Performance', 'Core Growth', 'Foresight', 'Watchtower', 'POS'];

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

test('Sundae is labelled as guided booking and never as a person', () => {
  for (const locale of LOCALES) {
    const copy = guidedBookingCopy[locale];
    for (const opening of Object.values(copy.openings)) assert.match(opening, /Sundae/, `${locale} opening names Sundae`);
  }
  assert.match(guidedBookingCopy.en.header.subline, /^Guided booking/);
});
