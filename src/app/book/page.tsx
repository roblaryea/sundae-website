// Token-gated booking page - the self-serve scheduler the outreach email links
// to. Server-fetches the lead's booking context by token, then hands off to the
// app-styled client view (light/dark, live slots, confirm/reschedule/cancel).
// The token is the credential: an invalid/expired one renders an app-styled
// NotFound rather than leaking anything.

import type { Metadata } from 'next';
import { fetchBookingContext } from '@/lib/sundaeBookingClient';
import { BookingView } from './BookingView';
import { normalizeBookingLocale } from '@/lib/booking/locales';
import { BookingUnavailable } from './BookingUnavailable';

export const metadata: Metadata = {
  title: 'Book a call · Sundae',
  robots: { index: false, follow: false },
  referrer: 'no-referrer',
};

// Tokenised, per-request - never statically cache a booking surface.
export const dynamic = 'force-dynamic';

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; locale?: string; eventType?: string }>;
}) {
  const { token, locale: queryLocale, eventType } = await searchParams;
  const result = await fetchBookingContext(token ?? '', eventType);
  const locale = normalizeBookingLocale(queryLocale ?? result?.context?.locale);

  if (!result?.ok || !result.context) {
    return <BookingUnavailable locale={locale} />;
  }

  return <BookingView token={token ?? ''} locale={locale} ctx={result.context} />;
}
