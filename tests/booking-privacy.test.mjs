import assert from 'node:assert/strict';
import { test } from 'node:test';
import { containsBookingData, isBookingUrl } from '../src/lib/booking/privacy.ts';

test('booking privacy rejects public, private, localized, referrer and queued API URLs', () => {
  for (const value of ['/book', '/ar/book/qa-host', 'https://www.sundae.io/book/manage?id=guest&token=private', '/api/personal-book/qa-host/book']) assert.equal(isBookingUrl(value), true);
  assert.equal(containsBookingData({ properties: { '$referrer': 'https://www.sundae.io/book/manage?token=private' } }), true);
  assert.equal(containsBookingData({ breadcrumbs: [{ data: { url: '/api/personal-book/manage/id/cancel?token=private' } }] }), true);
  assert.equal(containsBookingData({ request: { url: 'https://api.example/scheduling/manage/id?token=private' } }), true);
  assert.equal(containsBookingData({ properties: { '$current_url': 'https://www.sundae.io/contact' } }), false);
});
