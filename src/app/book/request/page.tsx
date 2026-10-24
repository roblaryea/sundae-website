import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { fetchRequestDetails } from '@/lib/personalBookingClient';
import { resolveBookingLocale } from '@/lib/booking/locales';
import { WEBSITE_LOCALE_COOKIE } from '@/lib/i18n';
import { BookingUnavailable } from '../BookingUnavailable';
import { RequestDecision } from './RequestDecision';

// The token in this URL is the credential: never indexed, never sent as a referrer, never cached.
export const metadata: Metadata = { title: 'Booking request · Sundae', robots: { index: false, follow: false }, referrer: 'no-referrer' };
export const dynamic = 'force-dynamic';
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function BookingRequestDecision({ searchParams }: {
  searchParams: Promise<{ id?: string; token?: string; action?: string; locale?: string }>;
}) {
  const query = await searchParams;
  const locale = resolveBookingLocale(query.locale || (await cookies()).get(WEBSITE_LOCALE_COOKIE)?.value);
  if (!query.id || !uuid.test(query.id) || !query.token) return <BookingUnavailable locale={locale} />;
  // Reading is side-effect free: a mail scanner that opens this link changes nothing.
  const result = await fetchRequestDetails(query.id, query.token);
  return (
    <RequestDecision
      id={query.id}
      token={query.token}
      locale={locale}
      intent={query.action === 'decline' ? 'decline' : 'approve'}
      details={result.ok ? result.body : null}
      unavailable={!result.ok && result.status !== 401 && result.status !== 404}
    />
  );
}
