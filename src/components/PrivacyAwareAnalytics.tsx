'use client';

import { Analytics } from '@vercel/analytics/next';
import { isBookingUrl } from '@/lib/booking/privacy';

/** Do not send token-bearing booking paths or visitor interactions to analytics. */
export function PrivacyAwareAnalytics() {
  return <Analytics beforeSend={(event) => isBookingUrl(event.url) || isBookingUrl(document.referrer) || isBookingUrl(window.location.href) ? null : event} />;
}
