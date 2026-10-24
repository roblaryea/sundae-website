import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  DEFAULT_RESEND_COOLDOWN_SECONDS,
  buildContactMailto,
  classifyDecisionResponse,
  classifyRequestResponse,
  classifyVerificationResponse,
  cooldownSecondsLeft,
  fillTemplate,
  formatWait,
  readRequestStatus,
  readRetryAfterSeconds,
  safeSenderEmail,
  splitAtToken,
  templateParts,
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

test('a request is only "sent" on a 202 with an id; every other answer maps to a distinct outcome', () => {
  assert.deepEqual(classifyRequestResponse(202, { requestId: 'r1' }), { kind: 'sent' });
  assert.deepEqual(classifyRequestResponse(202, {}), { kind: 'failed' });
  assert.deepEqual(classifyRequestResponse(429, { error: 'too_many_pending_requests', retryAfterSeconds: 5400 }), { kind: 'rate_limited', retryAfterSeconds: 5400 });
  assert.deepEqual(classifyRequestResponse(429, {}), { kind: 'rate_limited', retryAfterSeconds: null });
  assert.deepEqual(classifyRequestResponse(409, { error: 'slot_unavailable' }), { kind: 'slot_unavailable' });
  assert.deepEqual(classifyRequestResponse(503, { error: 'request_unavailable' }), { kind: 'unavailable' });
  // A backend without the route (404 from the proxy) degrades to the mailto fallback, not a crash.
  assert.deepEqual(classifyRequestResponse(404, { error: 'backend_status_404' }), { kind: 'unavailable' });
  assert.deepEqual(classifyRequestResponse(422, { error: 'please_refresh_and_try_again' }), { kind: 'failed' });
});

test('the host decision page maps every backend answer, shape-checks the free times and never invents a success', () => {
  assert.deepEqual(classifyDecisionResponse(200, { status: 'approved', visitorEmail: 'a@b.co' }), { kind: 'approved', email: 'a@b.co' });
  assert.deepEqual(classifyDecisionResponse(200, { status: 'declined' }), { kind: 'declined' });
  assert.deepEqual(classifyDecisionResponse(200, {}), { kind: 'error' });
  const taken = classifyDecisionResponse(409, { error: 'slot_taken', alternatives: [
    { startUtc: '2026-10-27T12:00:00.000Z', label: 'Tue 12:00' }, { startUtc: 'not a date', label: 'x' }, 'junk', { label: 'no start' },
    ...Array.from({ length: 10 }, (_, i) => ({ startUtc: `2026-10-28T0${i}:00:00.000Z`, label: String(i) }))] });
  assert.equal(taken.kind, 'slot_taken');
  assert.equal(taken.alternatives.length, 6);
  assert.deepEqual(taken.alternatives[0], { startUtc: '2026-10-27T12:00:00.000Z', label: 'Tue 12:00' });
  assert.deepEqual(classifyDecisionResponse(409, { error: 'slot_taken' }), { kind: 'slot_taken', alternatives: [] });
  assert.deepEqual(classifyDecisionResponse(409, { error: 'request_already_decided' }), { kind: 'used' });
  assert.deepEqual(classifyDecisionResponse(409, { error: 'request_in_progress' }), { kind: 'used' });
  assert.deepEqual(classifyDecisionResponse(409, { error: 'already_booked' }), { kind: 'already_booked' });
  assert.deepEqual(classifyDecisionResponse(410, { error: 'request_expired' }), { kind: 'expired' });
  assert.deepEqual(classifyDecisionResponse(401, { error: 'invalid_link' }), { kind: 'invalid' });
  assert.deepEqual(classifyDecisionResponse(500, null), { kind: 'error' });
  assert.equal(readRequestStatus('pending'), 'pending');
  assert.equal(readRequestStatus('<script>'), null);
});

test('copy templates split into text and placeholders in order', () => {
  assert.deepEqual(templateParts('Nothing sent to {email}. If {name} approves, ok.'), [
    { text: 'Nothing sent to ' }, { token: 'email' }, { text: '. If ' }, { token: 'name' }, { text: ' approves, ok.' }]);
  assert.deepEqual(templateParts('plain'), [{ text: 'plain' }]);
  assert.deepEqual(templateParts('{a}{b}'), [{ token: 'a' }, { token: 'b' }]);
});

const NEW_KEYS = {
  codeSentFrom: ['{sender}'], codeSpamHint: [], resendCode: [], resendIn: ['{wait}'], codeResent: ['{email}'],
  tooManyRequestsWait: ['{wait}'], emailUnavailable: [], noCodeEmail: ['{name}'], mailtoSubject: [],
  mailtoBody: ['{name}', '{visitorName}', '{visitorEmail}', '{slot}', '{duration}'], verificationExpired: [],
  waitSeconds: ['{n}'], waitMinutes: ['{n}'],
  attemptNotice: [], requestInstead: [], requestSent: ['{name}'], requestSentDetail: ['{email}', '{name}'], requestFailed: [], requestSlotTaken: [],
  reqTitle: [], reqIntro: ['{name}'], reqLabelVisitor: [], reqLabelWhen: [], reqLabelNote: [], reqApprove: [], reqDecline: [],
  reqApproved: ['{email}'], reqDeclined: [], reqExpired: [], reqUsed: [], reqInvalid: [], reqSlotTaken: [], reqApproveAt: ['{time}'],
  reqNoAlternatives: [], reqAlreadyBooked: [], reqError: [],
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
  // Single words and unit patterns can legitimately coincide with English (for example "Visitor" is not, but "{n} s" is).
  const sentences = Object.keys(NEW_KEYS).filter((key) => !['waitSeconds', 'waitMinutes', 'reqLabelNote'].includes(key));
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
