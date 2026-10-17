import type { CardLocale } from './profileCardLocale'

/**
 * Shared, fully localized vocabulary for profile cards: job titles and cities.
 * A staff profile points at these by key, so every card renders its role and location
 * in all 22 website locales without the card author translating anything. Countries are
 * not listed here: they come from the platform's own locale data (Intl.DisplayNames)
 * keyed by ISO code.
 *
 * Adding an entry means supplying every locale (tests enforce it). Titles that carry
 * grammatical gender in a language are given as { masculine, feminine }; the card
 * owner chooses which form their card uses (see PersonProfile.titleForm), so no form is
 * ever assumed from a name.
 */
export type TitleForm = 'masculine' | 'feminine'
export type GenderedText = { masculine: string; feminine: string }
export type TitleText = string | GenderedText
type ByLocale<T> = Record<CardLocale, T>

export const ROLE_TITLES = {
  'founder-ceo': {
    en: 'Founder & CEO',
    ar: { masculine: 'المؤسس والرئيس التنفيذي', feminine: 'المؤسِّسة والرئيسة التنفيذية' },
    fr: { masculine: 'Fondateur et PDG', feminine: 'Fondatrice et PDG' },
    es: { masculine: 'Fundador y CEO', feminine: 'Fundadora y CEO' },
    de: { masculine: 'Gründer und CEO', feminine: 'Gründerin und CEO' },
    nl: 'Oprichter en CEO',
    pt: { masculine: 'Fundador e CEO', feminine: 'Fundadora e CEO' },
    hi: 'संस्थापक और सीईओ',
    ur: 'بانی اور سی ای او',
    it: { masculine: 'Fondatore e CEO', feminine: 'Fondatrice e CEO' },
    pl: { masculine: 'Założyciel i CEO', feminine: 'Założycielka i CEO' },
    tr: 'Kurucu ve CEO',
    'zh-Hans': '创始人兼首席执行官',
    ja: '創業者兼CEO',
    ko: '창립자 겸 CEO',
    id: 'Pendiri dan CEO',
    vi: 'Nhà sáng lập kiêm CEO',
    ro: { masculine: 'Fondator și CEO', feminine: 'Fondatoare și CEO' },
    sv: 'Grundare och vd',
    bn: 'প্রতিষ্ঠাতা ও সিইও',
    th: 'ผู้ก่อตั้งและซีอีโอ',
    ms: 'Pengasas dan CEO',
    ru: { masculine: 'Основатель и CEO', feminine: 'Основательница и CEO' },
    az: 'Qurucu və CEO',
    pap: 'Fundador y CEO',
  } satisfies ByLocale<TitleText>,
} as const

export type RoleKey = keyof typeof ROLE_TITLES

export const CITIES = {
  dubai: {
    country: 'AE',
    names: {
      en: 'Dubai',
      ar: 'دبي',
      fr: 'Dubaï',
      es: 'Dubái',
      de: 'Dubai',
      nl: 'Dubai',
      pt: 'Dubai',
      hi: 'दुबई',
      ur: 'دبئی',
      it: 'Dubai',
      pl: 'Dubaj',
      tr: 'Dubai',
      'zh-Hans': '迪拜',
      ja: 'ドバイ',
      ko: '두바이',
      id: 'Dubai',
      vi: 'Dubai',
      ro: 'Dubai',
      sv: 'Dubai',
      bn: 'দুবাই',
      th: 'ดูไบ',
      ms: 'Dubai',
      ru: 'Дубай',
      az: 'Dubay',
      pap: 'Dubai',
    } satisfies ByLocale<string>,
  },
} as const

export type CityKey = keyof typeof CITIES

/** Separator between city and country, per writing system. */
const LIST_SEPARATOR: Partial<Record<CardLocale, string>> = {
  ar: '، ',
  ur: '، ',
  'zh-Hans': '，',
  ja: '、',
}

export function titleText(value: TitleText, form: TitleForm): string {
  return typeof value === 'string' ? value : value[form]
}

/** The job title in a locale, in the card owner's grammatical form. */
export function roleTitle(roleKey: RoleKey, form: TitleForm, locale: CardLocale): string {
  const entry = ROLE_TITLES[roleKey] as Partial<Record<CardLocale, TitleText>> & { en: TitleText }
  return titleText(entry[locale] ?? entry.en, form)
}

export function cityName(cityKey: CityKey, locale: CardLocale): string {
  const names = CITIES[cityKey].names as Partial<Record<CardLocale, string>> & { en: string }
  return names[locale] ?? names.en
}

/**
 * Country names for languages whose platform locale data is missing or unreliable. Papiamento
 * has no CLDR coverage in many runtimes, so its country names are listed here. Every country
 * used by a city in CITIES needs an entry (a test enforces it).
 */
export const COUNTRY_NAME_OVERRIDES: Partial<Record<CardLocale, Record<string, string>>> = {
  pap: { AE: 'Emiratonan Arabe Uni' },
}

/** Localized country name: explicit override, then platform locale data, then the English name. */
export function countryName(cityKey: CityKey, locale: CardLocale): string {
  const code: string = CITIES[cityKey].country
  const override = COUNTRY_NAME_OVERRIDES[locale]?.[code]
  if (override) return override
  try {
    return new Intl.DisplayNames([locale], { type: 'region' }).of(code) ?? code
  } catch {
    return new Intl.DisplayNames(['en'], { type: 'region' }).of(code) ?? code
  }
}

export function locationText(cityKey: CityKey, locale: CardLocale): string {
  const separator = LIST_SEPARATOR[locale] ?? ', '
  return `${cityName(cityKey, locale)}${separator}${countryName(cityKey, locale)}`
}
