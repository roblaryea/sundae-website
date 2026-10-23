import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  DEFAULT_RESEND_COOLDOWN_SECONDS,
  buildContactMailto,
  classifyVerificationResponse,
  cooldownSecondsLeft,
  fillTemplate,
  formatWait,
  readRetryAfterSeconds,
  safeSenderEmail,
  splitAtToken,
} from '../src/lib/booking/verification.ts';
import { personalBookingCopy } from '../src/lib/booking/personal-copy.ts';

// Registered booking locales (src/lib/booking/locales.ts cannot be imported by node: it uses the @/ alias).
const bookingLocales = ['en', 'ar', 'fr', 'es', 'de', 'nl', 'pt', 'hi', 'ur', 'it', 'pl', 'tr', 'zh-Hans', 'ja', 'ko', 'id', 'vi', 'ro', 'sv', 'bn', 'th', 'ms', 'ru', 'az', 'pap'];

test('a 202 yields the id and the server cooldown, defaulting to 45s on an older backend', () => {
  assert.deepEqual(classifyVerificationResponse(202, { verificationId: 'abc', cooldownSeconds: 45 }), { kind: 'sent', verificationId: 'abc', cooldownSeconds: 45 });
  assert.deepEqual(classifyVerificationResponse(202, { verificationId: 'abc' }), { kind: 'sent', verificationId: 'abc', cooldownSeconds: DEFAULT_RESEND_COOLDOWN_SECONDS });
  assert.equal(DEFAULT_RESEND_COOLDOWN_SECONDS, 45);
  // A 202 with no id is never treated as success.
  assert.deepEqual(classifyVerificationResponse(202, {}), { kind: 'failed' });
});

test('429 carries the real wait from the body, else the header, else null', () => {
  assert.deepEqual(classifyVerificationResponse(429, { error: 'rate_limited', retryAfterSeconds: 1830 }), { kind: 'rate_limited', retryAfterSeconds: 1830 });
  assert.deepEqual(classifyVerificationResponse(429, { error: 'rate_limited' }, '600'), { kind: 'rate_limited', retryAfterSeconds: 600 });
  assert.deepEqual(classifyVerificationResponse(429, { error: 'rate_limited' }), { kind: 'rate_limited', retryAfterSeconds: null });
  assert.deepEqual(classifyVerificationResponse(429, { error: 'resend_too_soon', retryAfterSeconds: 31 }), { kind: 'cooldown', retryAfterSeconds: 31 });
  assert.equal(readRetryAfterSeconds({ retryAfterSeconds: 12.2 }), 13);
  assert.equal(readRetryAfterSeconds({ retryAfterSeconds: -1 }, 'abc'), null);
  assert.equal(readRetryAfterSeconds({ retryAfterSeconds: 10 ** 9 }), 86400);
});

test('503, a vanished challenge and unknown shapes map to distinct outcomes', () => {
  assert.deepEqual(classifyVerificationResponse(503, { error: 'verification_email_unavailable' }), { kind: 'email_unavailable' });
  assert.deepEqual(classifyVerificationResponse(503, { error: 'scheduler_unavailable' }), { kind: 'email_unavailable' });
  assert.deepEqual(classifyVerificationResponse(404, { error: 'verification_not_found' }), { kind: 'expired' });
  assert.deepEqual(classifyVerificationResponse(422, { error: 'please_refresh_and_try_again' }), { kind: 'failed' });
  assert.deepEqual(classifyVerificationResponse(500, null), { kind: 'failed' });
  assert.deepEqual(classifyVerificationResponse(404, { error: 'backend_status_404' }), { kind: 'failed' });
});

test('cooldown arithmetic never goes negative and rounds up', () => {
  assert.equal(cooldownSecondsLeft(null, 1000), 0);
  assert.equal(cooldownSecondsLeft(46_000, 1000), 45);
  assert.equal(cooldownSecondsLeft(1_001, 1000), 1);
  assert.equal(cooldownSecondsLeft(500, 1000), 0);
});

test('waits use the locale unit patterns and number system', () => {
  const en = personalBookingCopy.en;
  assert.equal(formatWait(45, en, 'en'), '45 s');
  assert.equal(formatWait(90, en, 'en'), '90 s');
  assert.equal(formatWait(91, en, 'en'), '2 min');
  assert.equal(formatWait(1800, en, 'en'), '30 min');
  assert.equal(formatWait(0, en, 'en'), '1 s');
  assert.match(formatWait(45, personalBookingCopy.ar, 'ar-EG'), /^[٤4][٥5] ث$/);
  assert.equal(formatWait(45, en, 'not a locale!'), '45 s');
});

test('template helpers substitute known tokens only and split once for element insertion', () => {
  assert.equal(fillTemplate('Hi {name}, {x}', { name: 'Rob' }), 'Hi Rob, {x}');
  assert.deepEqual(splitAtToken('The code comes from {sender}.', 'sender'), ['The code comes from ', '.']);
  assert.deepEqual(splitAtToken('no token', 'sender'), ['no token', '']);
});

test('only a plain mailbox can reach a mailto link', () => {
  assert.equal(safeSenderEmail(' robert@sundaetech.ai '), 'robert@sundaetech.ai');
  for (const bad of ['a@b.co?cc=evil@x.com', 'a@b.co,evil@x.com', 'Robert <a@b.co>', 'a b@c.co', 'a@b', 'a%40b@c.co', '', null, undefined, 42])
    assert.equal(safeSenderEmail(bad), null, String(bad));
});

test('mailto encodes the multi-line body and subject', () => {
  const href = buildContactMailto({ to: 'host@example.com', subject: 'Book & go', body: 'Line 1\nLine 2 ?&' });
  assert.equal(href, 'mailto:host@example.com?subject=Book%20%26%20go&body=Line%201%0ALine%202%20%3F%26');
});

const NEW_KEYS = {
  codeSentFrom: ['{sender}'], codeSpamHint: [], resendCode: [], resendIn: ['{wait}'], codeResent: ['{email}'],
  tooManyRequestsWait: ['{wait}'], emailUnavailable: [], noCodeEmail: ['{name}'], mailtoSubject: [],
  mailtoBody: ['{name}', '{visitorName}', '{visitorEmail}', '{slot}', '{duration}'], verificationExpired: [],
  waitSeconds: ['{n}'], waitMinutes: ['{n}'],
};

test('every new verification string exists in all 25 locales with its placeholders intact', () => {
  assert.equal(bookingLocales.length, 25);
  assert.deepEqual(Object.keys(personalBookingCopy).sort(), [...bookingLocales].sort());
  for (const locale of bookingLocales) {
    assert.deepEqual(Object.keys(personalBookingCopy[locale]).sort(), Object.keys(personalBookingCopy.en).sort(), locale);
    for (const [key, placeholders] of Object.entries(NEW_KEYS)) {
      const value = personalBookingCopy[locale][key];
      assert.ok(typeof value === 'string' && value.trim() !== '', `${locale}.${key} is empty`);
      for (const placeholder of placeholders) assert.ok(value.includes(placeholder), `${locale}.${key} lost ${placeholder}`);
      assert.ok(!value.includes('—'), `${locale}.${key} uses an em dash`);
    }
  }
});

test('non-English locales do not silently inherit English for the new sentences', () => {
  const sentences = Object.keys(NEW_KEYS).filter((key) => !['waitSeconds', 'waitMinutes'].includes(key));
  for (const locale of bookingLocales.filter((item) => item !== 'en')) {
    for (const key of sentences) assert.notEqual(personalBookingCopy[locale][key], personalBookingCopy.en[key], `${locale}.${key} is English`);
  }
});

test('Papiamento keeps the Aruban spelling of the existing catalogue', () => {
  const pap = personalBookingCopy.pap;
  assert.match(pap.resendCode, /atrobe/);
  assert.match(pap.codeResent, /\bcodigo\b/);
  assert.doesNotMatch(pap.codeSpamHint, /\bkodigo\b/i);
});
