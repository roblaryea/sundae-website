import type { Metadata } from 'next';
import { fetchManagedPersonalContext } from '@/lib/personalBookingClient';
import { normalizeWebsiteLocale } from '@/lib/i18n';
import { cookies } from 'next/headers';
import { resolveWebsiteLocale } from '@/lib/i18n';
import { BookingView } from '../BookingView';
import { BookingUnavailable } from '../BookingUnavailable';

export const metadata: Metadata = { title: 'Manage your call · Sundae', robots: { index: false, follow: false }, referrer: 'no-referrer' };
export const dynamic = 'force-dynamic';
export default async function ManagePersonalBooking({ searchParams }: {
  searchParams: Promise<{ id?: string; token?: string; locale?: string }>;
}) {
  const query = await searchParams;
  const locale = query.locale ? normalizeWebsiteLocale(query.locale) : resolveWebsiteLocale(await cookies());
  if (!query.id || !query.token) return <BookingUnavailable locale={locale} />;
  const result = await fetchManagedPersonalContext(query.id, query.token);
  if (!result.ok) return <BookingUnavailable locale={locale} />;
  return <BookingView token={query.token} locale={locale} ctx={result.body} personal={result.body} />;
}
