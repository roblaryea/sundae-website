'use client';

import { useWebsiteI18n } from '@/components/i18n/LocaleProvider';

/**
 * Localization for the Crew phone-screen mockups. Each screen owns an English
 * `EN` strings object and a `LOC` map (locale → overrides, in a co-located
 * `locales/<Component>.locales.ts`). This merges EN with the active locale's
 * overrides and hands back the active locale (for crewMoney/date formatting).
 *
 * Proper nouns (people, places, the org name) stay in EN and are not translated.
 */
export function useCrewScreen<T extends Record<string, string>>(
  en: T,
  byLocale: Record<string, Record<string, string>>,
): { t: T; locale: string } {
  const { locale } = useWebsiteI18n();
  const ov = byLocale[locale as keyof typeof byLocale];
  return { t: (ov ? { ...en, ...ov } : en) as T, locale };
}
