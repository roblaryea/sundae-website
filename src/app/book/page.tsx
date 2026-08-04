// Token-gated booking page - the self-serve scheduler the outreach email links
// to. Server-fetches the lead's booking context by token, then hands off to the
// app-styled client view (light/dark, live slots, confirm/reschedule/cancel).
// The token is the credential: an invalid/expired one renders an app-styled
// NotFound rather than leaking anything.

import Link from 'next/link';
import type { Metadata } from 'next';
import { fetchBookingContext } from '@/lib/sundaeBookingClient';
import { BookingView } from './BookingView';
import { normalizeWebsiteLocale, websiteLocaleDirection, type WebsiteLocale } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'Book a call · Sundae',
  robots: { index: false, follow: false },
};

// Tokenised, per-request - never statically cache a booking surface.
export const dynamic = 'force-dynamic';

function BookingNotFound({ locale }: { locale: WebsiteLocale }) {
  const dir = websiteLocaleDirection[locale] ?? 'ltr';
  return (
    <div className="min-h-screen bg-[#020617] text-stone-100 grid place-items-center px-6" dir={dir}>
      <div className="text-center max-w-md">
        <span className="text-2xl font-extrabold tracking-tight">
          sundae<span className="text-[#FF5C4D]">.</span>
        </span>
        <h1 className="text-xl font-bold mt-6">This booking link has expired</h1>
        <p className="text-sm text-stone-400 mt-2">
          The link may have already been used or timed out. Reply to your email from Sundae and
          we&rsquo;ll send a fresh one.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-1.5 mt-6 px-5 py-2.5 rounded-xl bg-[#FF5C4D] hover:bg-[#C2410C] text-white text-sm font-bold transition-colors"
        >
          Contact the team
        </Link>
      </div>
    </div>
  );
}

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; locale?: string }>;
}) {
  const { token, locale: queryLocale } = await searchParams;
  const result = await fetchBookingContext(token ?? '');
  const locale = normalizeWebsiteLocale(result?.context?.locale ?? queryLocale);

  if (!result?.ok || !result.context) {
    return <BookingNotFound locale={locale} />;
  }

  return <BookingView token={token ?? ''} locale={locale} ctx={result.context} />;
}
