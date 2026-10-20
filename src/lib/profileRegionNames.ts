import type { CardLocale } from './profileCardLocale'

/**
 * Country names for languages whose platform locale data is missing or unreliable. Papiamento
 * has no CLDR coverage in many runtimes, so its country names are listed here. Every country
 * used by a city in CITIES needs an entry (a test enforces it).
 */
export const COUNTRY_NAME_OVERRIDES: Partial<Record<CardLocale, Record<string, string>>> = {
  pap: {
    AE: 'Emiratonan Arabe Uni',
    // The phone country selector lists every country, so Papiamento (Aruban spelling) carries a broad
    // set of the countries visitors are most likely to pick. The rest fall back to the English name.
    AW: 'Aruba', CW: 'Corsou', SX: 'Sint Maarten', NL: 'Hulanda', US: 'Estados Unidos', GB: 'Reino Uni',
    DE: 'Alemania', FR: 'Francia', ES: 'Spaña', PT: 'Portugal', IT: 'Italia', BE: 'Belgica', CH: 'Suiza',
    AT: 'Austria', SE: 'Suecia', NO: 'Noruega', DK: 'Dinamarca', FI: 'Finlandia', IE: 'Irlanda',
    IS: 'Islandia', LU: 'Luxemburgo', MT: 'Malta', CY: 'Chipre', GR: 'Grecia', PL: 'Polonia',
    CZ: 'Republica Checa', SK: 'Eslovaquia', SI: 'Eslovenia', HU: 'Hungria', RO: 'Rumania',
    BG: 'Bulgaria', HR: 'Croacia', RS: 'Serbia', UA: 'Ukrania', RU: 'Rusia', LT: 'Lituania',
    LV: 'Letonia', EE: 'Estonia', TR: 'Turkia', GE: 'Georgia', AM: 'Armenia', AZ: 'Azerbaijan',
    KZ: 'Kazakstan', IL: 'Israel', IR: 'Iran', IQ: 'Irak', SY: 'Siria', LB: 'Libanon', JO: 'Jordania',
    SA: 'Arabia Saudita', QA: 'Qatar', KW: 'Kuwait', BH: 'Bahrain', OM: 'Oman', YE: 'Yemen',
    EG: 'Egipto', LY: 'Libia', TN: 'Tunisia', DZ: 'Algeria', MA: 'Marruecos', SD: 'Sudan',
    ET: 'Etiopia', KE: 'Kenia', TZ: 'Tanzania', UG: 'Uganda', GH: 'Ghana', NG: 'Nigeria',
    SN: 'Senegal', CI: 'Costa di Marfil', CM: 'Camerun', AO: 'Angola', MZ: 'Mozambique',
    ZA: 'Africa di Sur', IN: 'India', PK: 'Pakistan', BD: 'Bangladesh', LK: 'Sri Lanka',
    NP: 'Nepal', AF: 'Afganistan', CN: 'China', HK: 'Hong Kong', TW: 'Taiwan', JP: 'Hapon',
    KR: 'Corea di Sur', SG: 'Singapur', MY: 'Malesia', TH: 'Tailandia', VN: 'Vietnam',
    PH: 'Filipinas', ID: 'Indonesia', AU: 'Australia', NZ: 'Nueva Zelandia', CA: 'Canada',
    MX: 'Mexico', BR: 'Brasil', AR: 'Argentina', CL: 'Chile', CO: 'Colombia', VE: 'Venezuela',
    PE: 'Peru', EC: 'Ecuador', UY: 'Uruguay', PA: 'Panama', CR: 'Costa Rica', DO: 'Republica Dominicana',
    CU: 'Cuba', JM: 'Jamaica', HT: 'Haiti', TT: 'Trinidad y Tobago', SR: 'Surinam', GY: 'Guyana',
  },
}

const regionNamers = new Map<string, Intl.DisplayNames | null>()
function regionNamer(locale: CardLocale): Intl.DisplayNames | null {
  let namer = regionNamers.get(locale)
  if (namer === undefined) {
    try {
      // A runtime without data for this language would silently answer in its own default language;
      // use English explicitly instead so a card never mixes in an unrelated script.
      const supported = Intl.DisplayNames.supportedLocalesOf([locale]).length > 0
      namer = new Intl.DisplayNames([supported ? locale : 'en'], { type: 'region' })
    } catch {
      namer = null
    }
    regionNamers.set(locale, namer)
  }
  return namer
}

/** Localized name of a country (ISO 3166-1 alpha-2): explicit override, then platform locale data, then English, then the code. */
export function regionName(code: string, locale: CardLocale): string {
  const override = COUNTRY_NAME_OVERRIDES[locale]?.[code]
  if (override) return override
  try {
    return regionNamer(locale)?.of(code) ?? code
  } catch {
    return code
  }
}
