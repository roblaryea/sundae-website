import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  buildBookingTimezoneOptions,
  detectBookingTimezone,
  formatBookingTimezoneLabel,
  isValidBookingTimezone,
} from '../src/lib/booking/timezones.ts';

test('booking timezone options include required zones, UTC, and remove invalid duplicates', () => {
  const options = buildBookingTimezoneOptions(
    'en',
    ['America/Bogota', 'Asia/Dubai', 'America/Bogota', 'Asia/Kolkata', 'Not/A_Timezone'],
    ['Europe/London', 'America/Bogota', 'Asia/Calcutta'],
  );
  const values = options.map((option) => option.value);

  assert.equal(values.includes('UTC'), true);
  assert.equal(values.includes('America/Bogota'), true);
  assert.equal(values.includes('Asia/Dubai'), true);
  assert.equal(values.includes('Europe/London'), true);
  assert.equal(values.includes('Not/A_Timezone'), false);
  assert.equal(values.filter((value) => value === 'America/Bogota').length, 1);
  assert.equal(
    values.filter((value) => value === 'Asia/Calcutta' || value === 'Asia/Kolkata').length,
    1,
  );
});

test('timezone labels are readable and retain the canonical IANA identity', () => {
  const label = formatBookingTimezoneLabel(
    'America/Argentina/Buenos_Aires',
    'en',
    new Date('2026-10-06T12:00:00Z'),
  );

  assert.match(label, /America \/ Argentina \/ Buenos Aires/);
  assert.match(label, /GMT-3|UTC-3/);
});

test('timezone validation and detection always return a usable IANA zone', () => {
  assert.equal(isValidBookingTimezone('America/Bogota'), true);
  assert.equal(isValidBookingTimezone('Not/A_Timezone'), false);
  assert.equal(isValidBookingTimezone(detectBookingTimezone('Asia/Dubai')), true);
});
