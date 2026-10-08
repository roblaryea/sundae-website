import Link from 'next/link';
import { BookingBrand } from './BookingBrand';
import { personalBookingCopy } from '@/lib/booking/personal-copy';
import { getLocalizedCopy, websiteLocaleDirection, type WebsiteLocale } from '@/lib/i18n';

export function BookingUnavailable({ locale = 'en' }: { locale?: WebsiteLocale }) {
  const copy = getLocalizedCopy(personalBookingCopy, locale);
  return <div dir={websiteLocaleDirection[locale]} className="min-h-screen bg-[var(--navy-deep)] text-[var(--text-primary)] grid place-items-center px-6">
    <div className="max-w-md text-center space-y-5">
      <BookingBrand centered />
      <h1 className="font-display text-3xl">{copy.pageUnavailable}</h1>
      <p className="text-[var(--text-secondary)]">{copy.pageUnavailableHelp}</p>
      <Link href="/contact" className="inline-flex min-h-11 items-center rounded-xl px-5 bg-[var(--warm-deep)] text-white">{copy.contactTeam}</Link>
    </div>
  </div>;
}
