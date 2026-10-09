import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatBookingDate } from '../src/lib/booking/date-format.ts';

test('Papiamento uses native calendar labels even when Intl lacks its locale', () => {
  assert.equal(formatBookingDate(new Date('2026-10-28T00:00:00Z'), 'pap', { weekday: 'long', month: 'short', day: 'numeric', timeZone: 'UTC' }), 'diaranson, oct 28');
  assert.equal(formatBookingDate(new Date('2026-10-01T00:00:00Z'), 'pap', { month: 'long', year: 'numeric', timeZone: 'UTC' }), 'october 2026');
  assert.equal(formatBookingDate(new Date('2026-10-28T00:00:00Z'), 'pap', { weekday: 'short', timeZone: 'UTC' }), 'Ras');
  assert.match(formatBookingDate(new Date('2026-10-28T00:30:00Z'), 'pap', { weekday: 'long', day: 'numeric', timeZone: 'America/Curacao' }), /diamars/);
});

test('supported locales retain Intl calendar formatting', () => {
  const date = new Date('2026-10-28T00:00:00Z');
  const options = { weekday: 'long', month: 'short', day: 'numeric', timeZone: 'UTC' };
  for (const locale of ['en-US', 'ru-RU', 'ar-AE']) {
    assert.equal(formatBookingDate(date, locale, options), new Intl.DateTimeFormat(locale, options).format(date));
  }
});

test('Azerbaijani calendar never depends on embedded-browser root locale data', () => {
  const date = new Date('2026-10-28T00:00:00Z');
  assert.equal(formatBookingDate(date, 'az-AZ', { month: 'long', year: 'numeric', timeZone: 'UTC' }), 'oktyabr 2026');
  assert.match(formatBookingDate(date, 'az-AZ', { weekday: 'long', month: 'short', day: 'numeric', timeZone: 'UTC' }), /çərşənbə/);
  assert.equal(formatBookingDate(date, 'az-AZ', { weekday: 'short', timeZone: 'UTC' }), 'Ç.');
});
