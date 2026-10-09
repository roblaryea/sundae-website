import { websiteLocaleProfiles, type WebsiteLocale } from '@/lib/i18n';

// Booking has its own full catalogue: adding a booking language must not
// advertise untranslated marketing pages through the website locale selector.
export const bookingLocaleProfiles = {
  ...websiteLocaleProfiles,
  pap: { nativeName: 'Papiamento', dir: 'ltr', intlLocale: 'pap' },
  az: { nativeName: 'Azərbaycanca', dir: 'ltr', intlLocale: 'az-AZ' },
  ru: { nativeName: 'Русский', dir: 'ltr', intlLocale: 'ru-RU' },
} as const;

export type BookingLocale = WebsiteLocale | 'pap' | 'az' | 'ru';
export const bookingLocales = Object.keys(bookingLocaleProfiles) as BookingLocale[];

export function getBookingLocaleProfile(locale: BookingLocale) {
  return bookingLocaleProfiles[locale];
}

export function matchBookingLocale(value?: string | null): BookingLocale | null {
  if (!value) return null;
  const tag = value.trim().replaceAll('_', '-').toLowerCase();
  if (['zh', 'zh-cn', 'zh-sg'].includes(tag)) return 'zh-Hans';
  if (tag === 'in') return 'id';
  return bookingLocales.find((locale) => locale.toLowerCase() === tag ||
    bookingLocaleProfiles[locale].intlLocale.toLowerCase() === tag) ??
    bookingLocales.find((locale) => locale.toLowerCase() === tag.split('-')[0]) ?? null;
}

export function normalizeBookingLocale(value?: string | null): BookingLocale {
  return matchBookingLocale(value) ?? 'en';
}

export function resolveBookingLocale(preferred?: string | null, acceptLanguage?: string | null): BookingLocale {
  const selected = matchBookingLocale(preferred);
  if (selected) return selected;
  const candidates = (acceptLanguage ?? '').split(',').map((entry) => {
    const [tag, ...parameters] = entry.trim().split(';');
    const quality = parameters.find((item) => item.trim().startsWith('q='));
    return { tag, quality: quality ? Number(quality.trim().slice(2)) : 1 };
  }).filter((item) => item.quality > 0).sort((a, b) => b.quality - a.quality);
  for (const candidate of candidates) {
    const locale = matchBookingLocale(candidate.tag);
    if (locale) return locale;
  }
  return 'en';
}

export function bookingIntlLocale(locale: BookingLocale): string {
  const requested = bookingLocaleProfiles[locale].intlLocale;
  // Some runtimes have no CLDR data for Papiamento. Curaçao's familiar Dutch
  // calendar formatting is the explicit fallback, never a claim of pap data.
  return Intl.DateTimeFormat.supportedLocalesOf([requested]).length ? requested : 'nl-CW';
}
