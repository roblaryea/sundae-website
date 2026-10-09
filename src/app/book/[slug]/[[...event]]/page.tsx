import type { Metadata } from 'next';
import { fetchPersonalContext } from '@/lib/personalBookingClient';
import { BookingView } from '../../BookingView';
import { BookingUnavailable } from '../../BookingUnavailable';
import { resolveBookingLocale } from '@/lib/booking/locales';
import { cookies } from 'next/headers';
import { WEBSITE_LOCALE_COOKIE } from '@/lib/i18n';

export const metadata: Metadata = { title: 'Book a call · Sundae', robots: { index: false, follow: false }, referrer: 'no-referrer' };
export const dynamic = 'force-dynamic';
export default async function PersonalBookPage({ params, searchParams }: {
  params: Promise<{ slug: string; event?: string[] }>;
  searchParams: Promise<{ locale?: string }>;
}) {
  const [{ slug, event }, { locale: rawLocale }] = await Promise.all([params, searchParams]);
  const locale = resolveBookingLocale(rawLocale || (await cookies()).get(WEBSITE_LOCALE_COOKIE)?.value);
  if ((event?.length || 0) > 1) return <BookingUnavailable locale={locale} />;
  const result = await fetchPersonalContext(slug, event?.[0]);
  if (!result.ok) return <BookingUnavailable locale={locale} />;
  return <BookingView token="" locale={locale} ctx={result.body} personal={result.body} />;
}
