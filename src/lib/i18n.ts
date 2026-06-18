import { generatedWebsiteMessageOverrides } from './generatedWebsiteMessageOverrides'

export const websiteLocaleProfiles = {
  en: { name: 'English', nativeName: 'English', dir: 'ltr', intlLocale: 'en-US', currency: 'USD' },
  ar: { name: 'Arabic', nativeName: 'العربية', dir: 'rtl', intlLocale: 'ar-AE', currency: 'AED' },
  fr: { name: 'French', nativeName: 'Français', dir: 'ltr', intlLocale: 'fr-FR', currency: 'EUR' },
  es: { name: 'Spanish', nativeName: 'Español', dir: 'ltr', intlLocale: 'es-ES', currency: 'EUR' },
  de: { name: 'German', nativeName: 'Deutsch', dir: 'ltr', intlLocale: 'de-DE', currency: 'EUR' },
  nl: { name: 'Dutch', nativeName: 'Nederlands', dir: 'ltr', intlLocale: 'nl-NL', currency: 'EUR' },
  pt: { name: 'Portuguese', nativeName: 'Português', dir: 'ltr', intlLocale: 'pt-BR', currency: 'BRL' },
  hi: { name: 'Hindi', nativeName: 'हिन्दी', dir: 'ltr', intlLocale: 'hi-IN', currency: 'INR' },
  ur: { name: 'Urdu', nativeName: 'اردو', dir: 'rtl', intlLocale: 'ur-PK', currency: 'PKR' },
  it: { name: 'Italian', nativeName: 'Italiano', dir: 'ltr', intlLocale: 'it-IT', currency: 'EUR' },
  pl: { name: 'Polish', nativeName: 'Polski', dir: 'ltr', intlLocale: 'pl-PL', currency: 'PLN' },
  tr: { name: 'Turkish', nativeName: 'Türkçe', dir: 'ltr', intlLocale: 'tr-TR', currency: 'TRY' },
  'zh-Hans': { name: 'Chinese (Simplified)', nativeName: '简体中文', dir: 'ltr', intlLocale: 'zh-Hans-CN', currency: 'CNY' },
  ja: { name: 'Japanese', nativeName: '日本語', dir: 'ltr', intlLocale: 'ja-JP', currency: 'JPY' },
  ko: { name: 'Korean', nativeName: '한국어', dir: 'ltr', intlLocale: 'ko-KR', currency: 'KRW' },
  id: { name: 'Indonesian', nativeName: 'Bahasa Indonesia', dir: 'ltr', intlLocale: 'id-ID', currency: 'IDR' },
  vi: { name: 'Vietnamese', nativeName: 'Tiếng Việt', dir: 'ltr', intlLocale: 'vi-VN', currency: 'VND' },
  ro: { name: 'Romanian', nativeName: 'Română', dir: 'ltr', intlLocale: 'ro-RO', currency: 'RON' },
  sv: { name: 'Swedish', nativeName: 'Svenska', dir: 'ltr', intlLocale: 'sv-SE', currency: 'SEK' },
  bn: { name: 'Bengali', nativeName: 'বাংলা', dir: 'ltr', intlLocale: 'bn-BD', currency: 'BDT' },
  th: { name: 'Thai', nativeName: 'ไทย', dir: 'ltr', intlLocale: 'th-TH', currency: 'THB' },
  ms: { name: 'Malay', nativeName: 'Bahasa Melayu', dir: 'ltr', intlLocale: 'ms-MY', currency: 'MYR' },
} as const

export type WebsiteLocale = keyof typeof websiteLocaleProfiles
export const websiteLocales = Object.keys(websiteLocaleProfiles) as WebsiteLocale[]
export type NonEnglishWebsiteLocale = Exclude<WebsiteLocale, 'en'>
export type RequiredEnglishLocalizedRecord<T> = Partial<Record<WebsiteLocale, T>> & { en: T }
export const defaultWebsiteLocale: WebsiteLocale = 'en'
export const WEBSITE_LOCALE_HEADER = 'x-sundae-locale'
export const WEBSITE_PUBLIC_PATH_HEADER = 'x-sundae-public-path'

type CookieStoreLike = {
  get(name: string): { value?: string } | undefined
}

export const WEBSITE_LOCALE_COOKIE = 'sundae_locale'

export function getSharedWebsiteCookieDomain(hostname?: string | null): string | undefined {
  const resolvedHostname =
    hostname?.toLowerCase() ??
    (typeof window !== 'undefined' ? window.location.hostname.toLowerCase() : undefined)

  if (!resolvedHostname) return undefined

  const isLocalhost =
    resolvedHostname === 'localhost' ||
    resolvedHostname === '127.0.0.1' ||
    resolvedHostname.endsWith('.localhost')

  if (isLocalhost) return undefined

  if (resolvedHostname === 'sundae.io' || resolvedHostname.endsWith('.sundae.io')) {
    return '.sundae.io'
  }

  if (resolvedHostname === 'sundaetech.ai' || resolvedHostname.endsWith('.sundaetech.ai')) {
    return '.sundaetech.ai'
  }

  return undefined
}

export function persistWebsiteLocalePreference(locale: WebsiteLocale) {
  if (typeof window === 'undefined') return

  const attrs = ['path=/', 'max-age=31536000', 'samesite=lax']
  const domain = getSharedWebsiteCookieDomain()
  if (domain) {
    attrs.push(`domain=${domain}`)
  }
  if (window.location.protocol === 'https:') {
    attrs.push('secure')
  }

  document.cookie = `${WEBSITE_LOCALE_COOKIE}=${locale}; ${attrs.join('; ')}`
  window.localStorage.setItem(WEBSITE_LOCALE_COOKIE, locale)
}

export const websiteLocaleNames = Object.fromEntries(
  websiteLocales.map((locale) => [locale, websiteLocaleProfiles[locale].nativeName]),
) as Record<WebsiteLocale, string>

export const websiteLocaleDirection = Object.fromEntries(
  websiteLocales.map((locale) => [locale, websiteLocaleProfiles[locale].dir]),
) as Record<WebsiteLocale, 'ltr' | 'rtl'>

export const websiteLocaleCurrencies = Object.fromEntries(
  websiteLocales.map((locale) => [locale, websiteLocaleProfiles[locale].currency]),
) as Record<WebsiteLocale, string>

export const websiteIntlLocales = Object.fromEntries(
  websiteLocales.map((locale) => [locale, websiteLocaleProfiles[locale].intlLocale]),
) as Record<WebsiteLocale, string>

const websiteLocaleLookup = new Map<string, WebsiteLocale>(
  websiteLocales.flatMap((locale) => {
    const lower = locale.toLowerCase()
    const intl = websiteLocaleProfiles[locale].intlLocale.toLowerCase()
    return [
      [lower, locale],
      [intl, locale],
    ]
  }),
)

websiteLocaleLookup.set('zh', 'zh-Hans')
websiteLocaleLookup.set('zh-cn', 'zh-Hans')
websiteLocaleLookup.set('zh-sg', 'zh-Hans')
websiteLocaleLookup.set('zh-hans-cn', 'zh-Hans')
websiteLocaleLookup.set('in', 'id')

function matchWebsiteLocaleSegment(segment?: string | null): WebsiteLocale | null {
  if (!segment) return null
  return websiteLocaleLookup.get(segment.trim().replace('_', '-').toLowerCase()) ?? null
}

export function normalizeWebsiteLocale(locale?: string | null): WebsiteLocale {
  if (!locale) return defaultWebsiteLocale
  const normalized = locale.trim().replace('_', '-').toLowerCase()
  const directMatch = websiteLocaleLookup.get(normalized)
  if (directMatch) return directMatch

  const prefix = normalized.split('-')[0]
  return websiteLocaleLookup.get(prefix) ?? defaultWebsiteLocale
}

export function getWebsiteCurrency(locale: WebsiteLocale): string {
  return websiteLocaleCurrencies[locale] ?? websiteLocaleCurrencies[defaultWebsiteLocale]
}

export function getWebsiteIntlLocale(locale: WebsiteLocale): string {
  return websiteIntlLocales[locale] ?? websiteIntlLocales[defaultWebsiteLocale]
}

export function getLocalizedCopy<T>(
  copyByLocale: RequiredEnglishLocalizedRecord<T>,
  locale: WebsiteLocale,
): T {
  return copyByLocale[locale] ?? copyByLocale.en
}

export function formatWebsiteCurrency(
  value: number,
  locale: WebsiteLocale,
  options?: Intl.NumberFormatOptions & { currency?: string },
): string {
  const currency = options?.currency ?? getWebsiteCurrency(locale)
  return new Intl.NumberFormat(getWebsiteIntlLocale(locale), {
    style: 'currency',
    currency,
    maximumFractionDigits: Number.isInteger(value) ? 0 : 2,
    ...options,
  }).format(value)
}

export function formatWebsiteNumber(value: number, locale: WebsiteLocale): string {
  return new Intl.NumberFormat(getWebsiteIntlLocale(locale)).format(value)
}

export function resolveWebsiteLocale(cookieStore?: CookieStoreLike | null) {
  return normalizeWebsiteLocale(cookieStore?.get(WEBSITE_LOCALE_COOKIE)?.value)
}

export function normalizeWebsitePathname(pathname?: string | null): string {
  if (!pathname || pathname === '') return '/'
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`
  if (normalized === '/') return normalized
  return normalized.replace(/\/+$/, '') || '/'
}

export function parseWebsiteLocaleFromPathname(pathname?: string | null): {
  locale: WebsiteLocale | null
  pathname: string
} {
  const normalizedPathname = normalizeWebsitePathname(pathname)
  const segments = normalizedPathname.split('/').filter(Boolean)
  const firstSegment = segments[0]
  const segmentLocale = matchWebsiteLocaleSegment(firstSegment)

  if (segmentLocale) {
    const pathnameWithoutLocale = `/${segments.slice(1).join('/')}` || '/'
    return {
      locale: segmentLocale,
      pathname: normalizeWebsitePathname(pathnameWithoutLocale),
    }
  }

  return {
    locale: null,
    pathname: normalizedPathname,
  }
}

export function getLocalizedPathname(pathname: string, locale: WebsiteLocale): string {
  const { pathname: basePathname } = parseWebsiteLocaleFromPathname(pathname)

  if (locale === defaultWebsiteLocale) {
    return basePathname
  }

  return basePathname === '/'
    ? `/${locale}`
    : `/${locale}${basePathname}`
}

export function localizeWebsiteHref(href: string, locale: WebsiteLocale): string {
  if (
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:') ||
    href.startsWith('#')
  ) {
    return href
  }

  const [pathWithMaybeSearch = '/', hashFragment = ''] = href.split('#', 2)
  const [pathname = '/', search = ''] = pathWithMaybeSearch.split('?', 2)
  const localizedPathname = getLocalizedPathname(pathname, locale)
  const searchSuffix = search ? `?${search}` : ''
  const hashSuffix = hashFragment ? `#${hashFragment}` : ''

  return `${localizedPathname}${searchSuffix}${hashSuffix}`
}

export function buildWebsiteAlternateUrls(pathname: string, baseUrl: string) {
  const canonicalPathname = normalizeWebsitePathname(pathname)
  const localizedEntries = Object.fromEntries(
    websiteLocales.map((locale) => [
      locale,
      new URL(getLocalizedPathname(canonicalPathname, locale), baseUrl).toString(),
    ]),
  ) as Record<WebsiteLocale, string>

  return {
    canonical: localizedEntries[defaultWebsiteLocale],
    languages: {
      ...localizedEntries,
      'x-default': localizedEntries[defaultWebsiteLocale],
    },
  }
}

export const websiteMessages = {
  en: {
    metadata: {
      title: 'Sundae - Decision Intelligence for Restaurants',
      description:
        'The decision intelligence platform for restaurants - unify POS, labor, cost, and operational data to benchmark performance and turn it into the next right move.',
    },
    layout: {
      skipToContent: 'Skip to main content',
      languageSelector: 'Language',
    },
    navbar: {
      products: 'Products',
      solutions: 'Solutions',
      resources: 'Resources',
      company: 'Company',
      intelligence: 'Intelligence',
      plans: 'Plans',
      bySegment: 'By Segment',
      byRole: 'By Role',
      learn: 'Learn',
      pricing: 'Pricing',
      about: 'About',
      signIn: 'Sign In',
      bookDemo: 'Book a Demo',
      comparePlans: 'Compare Plans →',
      startFree: 'Start with Report Lite',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      closeNavigation: 'Close navigation',
      mobileNavigation: 'Mobile navigation',
      pillars: [
        { name: 'Pulse', description: 'Intraday operations monitor', href: '/product/pulse' },
        { name: 'Benchmarks', description: 'Competitive intelligence', href: '/benchmarking' },
        { name: 'Watchtower', description: 'External market signals', href: '/product/watchtower' },
        { name: 'Insights', description: 'Specialized analytics modules', href: '/insights' },
        { name: 'Sundae Intelligence', description: 'AI-powered conversational analytics', href: '/intelligence' },
        { name: 'Foresight', description: 'Predictive intelligence & forecasting', href: '/product/foresight' },
      ],
      plansList: [
        { name: 'Sundae Report', description: 'Free, historical analysis', href: '/report' },
        { name: 'Sundae Core', description: 'Real-time operations', href: '/core' },
        { name: 'Sundae Crew', description: 'Operational substrate · people, schedules, payroll', href: '/crew' },
      ],
      solutionsSegments: [
        { name: 'Multi-location Restaurants', href: '/solutions/multi-location-groups' },
        { name: 'Franchises', href: '/solutions/franchises' },
        { name: 'Cloud Kitchens', href: '/solutions/cloud-kitchens' },
        { name: 'Enterprise Hospitality Groups', href: '/solutions/hospitality-operators' },
      ],
      solutionsRoles: [
        { name: 'Operations Leaders', href: '/solutions/regional-managers' },
        { name: 'Finance & FP&A Teams', href: '/solutions/finance-teams' },
        { name: 'Marketing Teams', href: '/solutions/marketing-teams' },
        { name: 'C-Suite & Owners', href: '/solutions/c-suite-executives' },
        { name: 'Data & Technology Teams', href: '/solutions/technology-teams' },
        { name: 'People & HR Teams', href: '/solutions/hr-teams' },
      ],
      resourcesList: [
        { name: 'Blog', href: '/blog' },
        { name: 'Documentation', href: '/docs' },
        { name: 'Industry Outcomes', href: '/resources' },
        { name: 'FAQ', href: '/faq' },
        { name: 'Free Tools & Calculators', href: '/tools' },
      ],
    },
    footer: {
      readyTitle: "Stop running your restaurants on yesterday's numbers.",
      readyDescription: 'See how Sundae would work against your operation, using your data where available or a representative restaurant scenario.',
      bookDemo: 'Book a Working Session',
      startFree: 'Start with Report Lite',
      brandDescription:
        'The decision intelligence platform for multi-location operators. See every layer. Act in time.',
      global: 'Global',
      allCurrencies: 'All currencies',
      sectionProduct: 'Product',
      sectionSolutions: 'Solutions',
      sectionResources: 'Resources',
      sectionCompany: 'Company',
      pricing: 'Pricing',
      privacy: 'Privacy',
      terms: 'Terms',
      copyrightSuffix: 'All rights reserved.',
      companyLinks: [
        { name: 'About', href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'Contact', href: '/contact' },
        { name: 'Security & Compliance', href: '/security' },
        { name: 'Integrations', href: '/integrations' },
      ],
      extraResources: [
        { name: 'Getting Started', href: '/getting-started' },
      ],
    },
    home: {
      badge: 'Decision Intelligence Platform',
      titleTop: 'Decision Intelligence',
      titleBottom: 'for multi-location restaurants',
      description:
        'Your data lives across POS, delivery, reservations, labor, inventory, and finance. Sundae brings it into one AI-native operating layer - spotting what changed, explaining why, and',
      descriptionEmphasis: 'surfacing the next move before the shift is over.',
      narrativeAnchor: 'From reporting lag to ops speed.',
      startFree: 'Book a demo',
      bookDemo: 'See Pulse live',
      noCard: '',
      proofStats: [
        { number: '5 min', label: 'From signal to action' },
        { number: '18', label: 'Decisions surfaced today' },
        { number: '12', label: 'Operating domains unified' },
        { number: '6', label: 'Intelligence layers, one truth' },
      ],
      problem: {
        eyebrow: 'THE PROBLEM',
        heading: 'The gaps costing you money every day',
        description: 'Every restaurant group we work with faces the same blind spots.',
        kpis: [
          { value: '12+', label: 'Data sources', supporting: 'Disconnected across your operation', color: 'red' },
          { value: '72hrs+', label: 'To close books', supporting: 'And it often takes longer than three days', color: 'amber' },
          { value: '0%', label: 'Market context', supporting: 'No peer benchmarks for your KPIs', color: 'red' },
          { value: '$50K+', label: 'Annual leakage', supporting: 'From voids, comps, and overrides', color: 'amber' },
        ],
      },
      platform: {
        eyebrow: '6 LAYERS · ONE TRUTH',
        heading: 'Six layers. One truth.',
        description: 'From the live shift to the long-range plan - one stack, six layers that talk to each other.',
        countLabel: 'of 6',
        exploreModules: 'Explore all modules',
        learnMore: 'Learn more',
        layers: [
          { name: 'Pulse', subtitle: 'Real-time operations', description: 'Live pacing, adaptive targets, server performance, leakage - shift by shift.', href: '/product/pulse' },
          { name: 'Benchmarks', subtitle: 'Competitive intelligence', description: 'Anonymous peer benchmarks across 30+ metrics. Know where you stand.', href: '/benchmarking' },
          { name: 'Watchtower', subtitle: 'Market intelligence', description: 'Competitors, weather, events - before they hit your numbers.', href: '/product/watchtower' },
          { name: 'Insights', subtitle: '12 analytics modules', description: 'Revenue, labor, inventory, marketing, delivery - each with AI recommendations.', href: '/insights' },
          { name: 'Sundae Intelligence', subtitle: 'Conversational AI', description: 'Ask your data anything - source-cited answers in seconds on web, WhatsApp, Telegram, Slack or Teams.', href: '/intelligence' },
          { name: 'Foresight', subtitle: 'Predictive intelligence', description: 'Forecasts, budgets and what-if scenarios - with exec briefings that correct themselves.', href: '/product/foresight' },
        ],
      },
      modules: {
        eyebrow: 'INTELLIGENCE MODULES',
        heading: '12 modules. One action loop.',
        description: 'Every dimension of restaurant performance - surfaced as a decision, not a chart. Benchmarked against your real cohort, ranked by margin impact, and routed to the right person on the floor.',
        categories: [
          { name: 'Revenue Intelligence', count: '4 modules' },
          { name: 'Labor Intelligence', count: '5 modules' },
          { name: 'Guest Experience', count: '3 modules' },
          { name: 'Inventory & Waste', count: '3 modules' },
          { name: 'Purchasing', count: '3 modules' },
          { name: 'Marketing Performance', count: '3 modules' },
          { name: 'Delivery & Platforms', count: '2 modules' },
          { name: 'Reservations', count: '2 modules' },
          { name: 'Revenue Assurance', count: '2 modules' },
          { name: 'Profit Intelligence', count: '3 modules' },
          { name: 'Guest CRM', count: '3 modules' },
          { name: 'Cross-Intelligence', count: 'Correlation engine' },
        ],
      },
      personas: {
        eyebrow: 'WHAT WE HEAR FROM OPERATORS',
        heading: 'Every role. One platform.',
        description: 'Different teams, different questions. One source of truth.',
        roles: [
          { title: 'Operations Leaders', pain: "You can't be in every restaurant at once.", outcome: 'Live pacing and server performance across every outlet - see who needs help right now.', attribution: 'Pattern across multi-location operators' },
          { title: 'Finance & FP&A', pain: '3 days to close the books? That is 3 days too many.', outcome: 'Real-time margins, shift-level labor cost, variance tied to root cause.', attribution: 'Pattern across CFO conversations' },
          { title: 'C-Suite & Owners', pain: 'Your worst outlet is invisible until Thursday.', outcome: 'Portfolio view, daily AI briefings, market signal - across every brand you run.', attribution: 'Pattern across founders and group CEOs' },
          { title: 'Data & Technology', pain: '12 vendor APIs. 5 formats. Zero unified schema.', outcome: 'Clean pipelines, governed metrics, public API, webhooks, RBAC out of the box.', attribution: 'Pattern across heads of data' },
        ],
      },
      howItWorks: {
        eyebrow: 'HOW IT WORKS',
        heading: 'From data to decision in four steps',
        steps: [
          { step: '01', title: 'Connect', description: 'POS, labor, inventory, delivery - most integrations under 5 minutes.' },
          { step: '02', title: 'Understand', description: 'AI surfaces anomalies and layers in weather, events, and competitor signals.' },
          { step: '03', title: 'Decide', description: 'Specific, explainable recommendations - targets, staffing, menu, pricing.' },
          { step: '04', title: 'Improve', description: 'Every decision feeds the system. Playbooks get sharper, forecasts get more precise.' },
        ],
      },
      mockup: {
        frameLabel: 'Pulse - Sales Pacing',
        updatedAt: 'Tuesday, 7:42 PM',
        kpis: [
          { label: 'Revenue', value: '$14,280', trend: '+12% vs target', trendUp: true },
          { label: 'Covers', value: '287', trend: '+12 vs plan', trendUp: true, color: '#22C55E' },
          { label: 'Avg Check', value: '$49.50', trend: '-2.1%', trendUp: false, color: '#FBBF24' },
          { label: 'Labor %', value: '28.4%', trend: 'Under 30% target', trendUp: true, color: '#22C55E' },
        ],
        paceLabel: 'Revenue Pace',
        tableHeaders: ['Server', 'Sales', 'Upsell %', 'Avg Check'],
        tableRows: [
          ['Sarah M.', '$2,840', '32%', '$52.10'],
          ['Marcus J.', '$2,410', '28%', '$48.20'],
          ['James K.', '$1,960', '18%', '$44.50'],
        ],
        coachAlert: 'James K. upsell rate is 14% below shift average. Consider pairing with Sarah for the next 2 tables.',
      },
      closingTitle: 'Stop running on yesterday’s numbers.',
      closingDescription: '30 minutes. Your data. What Sundae would actually change for the team.',
      pages: {
        signIn: {
          metadataTitle: 'Sign In - Sundae',
          metadataDescription:
            'Sign in to Sundae - your unified view of performance, operations, and competitive intelligence for restaurants.',
          brandTitle: 'Decision intelligence for restaurants',
          brandDescription:
            'Performance, operations, and competitive intelligence - unified in one platform.',
          trustPoints: [
            'Real-time operations intelligence',
            'Multi-location benchmarking',
            'Competitive market signals',
          ],
          headingTitle: 'Sign in to Sundae',
          headingDescription:
            'Your unified view of performance, operations, and competitive intelligence.',
          ssoGoogle: 'Continue with Google',
          ssoMicrosoft: 'Continue with Microsoft',
          or: 'or',
          emailLabel: 'Email',
          emailPlaceholder: 'you@company.com',
          passwordLabel: 'Password',
          passwordPlaceholder: 'Enter your password',
          rememberMe: 'Remember me',
          forgotPassword: 'Forgot password?',
          signingIn: 'Signing in...',
          redirecting: 'Redirecting...',
          signInButton: 'Sign in',
          continueToApp: 'Continue to Sundae App',
          noAccount: "Don't have an account?",
          getStartedFree: 'Get started free',
          signInMainAppDescription:
            'Sign-in happens in the main Sundae application. This website does not store or process your password.',
          signInMainAppBenefits: [
            'Access your organization workspace',
            'Switch locations and products',
            'Manage password reset and account recovery',
          ],
          footerTerms: 'Terms',
          footerPrivacy: 'Privacy',
          footerSecurity: 'Security & Compliance',
          footerSupport: 'Support',
          emailRequired: 'Email is required',
          emailInvalid: 'Enter a valid email address',
          passwordRequired: 'Password is required',
          passwordMin: 'Password must be at least 6 characters',
          invalidCredentials: 'Invalid email or password',
          genericError: 'Something went wrong. Please try again.',
        },
        demo: {
          metadataTitle: 'Book a Demo',
          metadataDescription:
            'See Sundae in action with your own restaurant data. Book a 30-minute demo focused on your numbers, your priorities, and the questions your team needs answered.',
          badge: 'BOOK A DEMO',
          title: '30 Minutes. Your Data. Real Answers.',
          description:
            "We'll connect to your POS, show you what your numbers actually mean, and let you decide whether Sundae would make the team sharper day to day.",
          requestTitle: 'Request Your Demo',
          requestDescription: 'Tell us about your operation and we will tailor the session to your priorities.',
          ctaLabel: 'Book a Demo',
          defaultMessage:
            "I'm interested in seeing how Sundae can help my restaurant operations.",
          whatYoullSeeTitle: "What You'll See",
          whatYoullSeeDescription: 'A focused walkthrough built around your operation.',
          benefits: [
            {
              title: 'Your Data, Live',
              description:
                "We connect to your POS and show you what's actually happening across your locations - not a generic demo with sample data.",
              details: [
                'Live POS integration',
                'Multi-location overview',
                'Real-time anomaly detection',
                'Historical trend analysis',
              ],
            },
            {
              title: 'Your Blind Spots',
              description:
                "We'll surface the gaps you didn't know existed - revenue leakage, labor inefficiencies, and missed opportunities hiding in your data.",
              details: [
                'Revenue leakage patterns',
                'Labor cost optimization',
                'Menu performance gaps',
                'Operational anomalies',
              ],
            },
            {
              title: 'Your Questions, Answered',
              description:
                "Bring your toughest operational questions. We'll show you exactly how Sundae answers them - or we'll tell you it can't.",
              details: [
                'Integration with your stack',
                'Pricing for your scale',
                'Implementation timeline',
                'Data security and compliance',
              ],
            },
          ],
          whyOperatorsTitle: 'Why Operators Take the Call',
          stats: [
            { stat: '30 min', label: 'Focused demo - no filler, no fluff' },
            { stat: 'Your data', label: 'We use your actual numbers, not a sandbox' },
            { stat: 'Zero pressure', label: "If it's not a fit, we will tell you" },
            { stat: '24 hr', label: 'Most demos scheduled within one business day' },
          ],
          ctaTitle: "See What You've Been Missing",
          ctaDescription: '30 minutes to look at your data and understand what deserves attention first.',
          bookDemo: 'Book Your Demo',
          viewPricing: 'View Pricing',
        },
        pricing: {
          metadataTitle: 'Pricing - Sundae',
          metadataDescription:
            'Simple, transparent pricing for Sundae Report, Core, Watchtower, and modules.',
          badge: 'Pricing',
          title: 'Simple, Transparent Pricing',
          description:
            'Start free with Report. Scale to real-time intelligence with Core. Every plan includes Sundae Intelligence credits.',
          monthly: 'Monthly',
          annual: 'Annual',
          savePercent: 'Save 10%',
          reportBadge: 'Sundae Report - Historical Analysis & Benchmarking',
          coreBadge: 'Sundae Core - Real-Time Operations & Predictive Intelligence',
          enterpriseBadge: 'Enterprise',
          enterpriseTitle: 'Custom Pricing for Large Operations',
          enterpriseDescription:
            'For multi-location groups that need white-label, SSO, custom SLAs, and dedicated support. 50,000+ intelligence credits included.',
          addOnsTitle: 'Add-Ons',
          addOnsDescription: 'Extend your plan with specialized intelligence modules.',
          detailedPricingCalculator: 'See Detailed Pricing Calculator',
          faqTitle: 'Common Questions',
          faqDescription: 'Clear answers. No fine print.',
          ctaTitle: 'Ready to Get Started?',
          ctaDescription: "Start free, upgrade when you're ready. No credit card required.",
          bookDemo: 'Book a Demo',
          startFree: 'Start Free',
        },
        faq: {
          metadataTitle: 'FAQ - Sundae',
          metadataDescription:
            'Frequently asked questions about Sundae - pricing, integrations, data security, onboarding, and everything else restaurant operators need to know before getting started.',
          badge: 'Frequently Asked Questions',
          title: 'Everything You Need to Know',
          description:
            'Find answers to common questions about Sundae, our products, pricing, and how operators make better decisions.',
          jumpToCategory: 'Jump to category:',
          stillHaveQuestions: 'Still Have Questions?',
          helpDescription: 'Our team is here to help. Book a demo, contact sales, or start free.',
          startFree: 'Start Free',
          seePricing: 'See Pricing',
          bookDemo: 'Book Demo',
          contactUs: 'Contact Us',
          emailSupportPrefix: 'Or email us at:',
          categories: [
            'Getting Started',
            'Products & Tiers',
            'Data & Integration',
            'Modules',
            'Watchtower',
            'Pricing & Billing',
            'Features & Capabilities',
            'Support & Training',
            'Security & Compliance',
            'Enterprise',
            'Comparison Questions',
            'Specific Use Cases',
          ],
        },
        modules: {
          metadataTitle: 'Modules - Sundae',
          badge: 'Specialized Modules',
          title: 'Go Deeper Where It Matters Most',
          description:
            'Add specialized modules to Sundae Core. Get deep operational intelligence in labor, inventory, purchasing, marketing, and reservations.',
          mixAndMatch: 'Mix and match based on your priorities.',
          exploreAllModules: 'Explore All Modules',
          calculateModuleRoi: 'Calculate Module ROI',
          whatAreModules: 'What Are Sundae Modules?',
          whatAreModulesDescription:
            'Modules are specialized intelligence add-ons that deepen your insights in specific operational areas. While Core gives you comprehensive real-time visibility across your entire operation, Modules provide focused expertise in key domains.',
          pillars: [
            { title: 'Specialized, Not Scattered', description: 'Deep features you will not find in generic analytics. Purpose-built for each operational area.' },
            { title: 'Add What You Need', description: 'Start with your biggest pain point. Add modules as priorities shift. No forced bundles.' },
            { title: 'Integrated, Not Siloed', description: 'Modules share data with Core tier. Cross-module insights. One unified platform.' },
          ],
          fiveModules: 'FIVE SPECIALIZED MODULES',
          chooseStack: 'Choose Your Intelligence Stack',
          chooseStackDescription: 'Add one module or all five. Build the intelligence your operation needs.',
          coreCapabilities: 'Core Capabilities:',
          roi: 'ROI',
          bestFor: 'Best for:',
          faqTitle: 'Frequently Asked Questions',
          faqDescription: 'Common questions about Modules, upgrades, pricing, and implementation.',
          ctaTitle: 'Ready to Add Specialized Intelligence?',
          ctaDescription: 'Start with the module that solves your biggest pain point.',
          bookDemo: 'Book a Demo',
          contactSales: 'Contact Sales',
        },
        integrations: {
          metadataTitle: 'Integrations - Sundae',
          badge: 'Integrations',
          title: 'Connect Everything. Unify Your Data.',
          description:
            'Sundae integrates with 200+ restaurant systems across POS, labor, inventory, reservations, delivery, and more.',
          process: [
            { step: '1', title: 'Connect', description: 'Authenticate your platforms with OAuth or API key - most integrations take under 5 minutes.' },
            { step: '2', title: 'Normalize', description: 'Sundae Core, our data layer, cleans, maps, and unifies every data source into a consistent schema.' },
            { step: '3', title: 'Analyze', description: 'Unified data flows into dashboards, alerts, and intelligent recommendations - no manual exports needed.' },
          ],
          domainsTitle: '12 Data Domains. One Unified View.',
          domainsDescription:
            'POS, labor, inventory, purchasing, reservations, delivery, marketing, guest experience, CRM, accounting, and daily sales summaries - all connected.',
          live: 'Live',
          upcoming: 'Upcoming',
          liveNow: 'Live - available now',
          roadmap: 'Upcoming - on our roadmap',
          roadmapDescription:
            'Upcoming integrations are actively in development. Timelines may vary. Contact us to request priority for a specific integration.',
          webhooksTitle: 'Webhooks & Public API',
          webhooksDescription: "Build custom integrations with Sundae's developer tools.",
          customWebhooks: 'Custom Webhooks',
          customWebhooksDescription:
            'Configure webhooks for any non-POS data domain. Push data into Sundae from any system with HTTP support.',
          publicApi: 'Public API',
          publicApiDescription:
            "Use Sundae's API to pull structured analytics into your own workflows, tools, and reporting layers.",
          liveDomains: 'Available for all 12 data domains',
          signatureVerification: 'HMAC-SHA256 signature verification',
          testPayloads: 'Test payloads and delivery tracking',
        },
        resources: {
          metadataTitle: 'Resources - Sundae',
          badge: 'Resources & Tools',
          title: 'Decision Intelligence Resources',
          description:
            'Access guides, reports, and tools to help you make smarter decisions for your restaurant business.',
          getStarted: 'Get Started with Sundae',
          freeReport: 'Get Free Benchmark Report',
          caseStudies: 'Industry Outcome Examples',
          caseStudiesDescription:
            'How operators use Sundae to improve performance, margins, and decision-making - drawn from real engagement patterns.',
          caseStudiesNote:
            'Anonymized examples representative of real operator engagements. Specific customer names withheld until pilots agree to attribution.',
          segment: 'Segment',
          challenge: 'Challenge:',
          solution: 'Sundae Solution:',
          outcomes: 'Outcomes:',
          exploreProducts: 'Explore the products used in these case studies:',
          toolsTitle: 'Free Tools & Calculators',
          toolsDescription:
            'Try Sundae&apos;s free calculators for labor costs, menu margins, benchmark readiness, and more.',
          exploreTools: 'Explore All Tools',
          stayUpdated: 'Stay Updated',
          newsletterDescription:
            'Get the latest restaurant industry insights, benchmarks, and decision intelligence trends delivered to your inbox.',
          subscribe: 'Subscribe',
          privacyNote: 'We respect your privacy. Unsubscribe at any time.',
          ctaTitle: 'Ready to Transform Your Restaurant?',
          ctaDescription:
            'Join thousands of restaurant operators who use Sundae to make smarter, numbers-backed decisions.',
          bookDemo: 'Book a Demo',
          contactSales: 'Contact Sales',
        },
      },
    },
  },
  ar: {
    metadata: {
      title: 'صنداي - ذكاء القرار للمطاعم',
      description:
        'منصة ذكاء القرار للمطاعم - توحّد نقاط البيع والعمالة والتكاليف والعمليات لمقارنة الأداء وتحويله إلى الخطوة الصحيحة التالية.',
    },
    layout: {
      skipToContent: 'انتقل إلى المحتوى الرئيسي',
      languageSelector: 'اللغة',
    },
    navbar: {
      products: 'المنتج',
      solutions: 'الحلول',
      resources: 'الموارد',
      company: 'الشركة',
      intelligence: 'طبقات الذكاء',
      plans: 'الخطط',
      bySegment: 'حسب الفئة',
      byRole: 'حسب الدور',
      learn: 'تعلّم',
      pricing: 'الأسعار',
      about: 'حول',
      signIn: 'تسجيل الدخول',
      bookDemo: 'احجز جلسة عمل',
      comparePlans: 'قارن الخطط ←',
      startFree: 'ابدأ مع Report Lite',
      openMenu: 'افتح القائمة',
      closeMenu: 'أغلق القائمة',
      closeNavigation: 'أغلق التنقل',
      mobileNavigation: 'تنقل الجوال',
      pillars: [
        { name: 'Pulse', description: 'مراقبة العمليات خلال اليوم', href: '/product/pulse' },
        { name: 'Benchmarks', description: 'ذكاء تنافسي', href: '/benchmarking' },
        { name: 'Watchtower', description: 'إشارات السوق الخارجية', href: '/product/watchtower' },
        { name: 'Insights', description: 'وحدات تحليلات متخصصة', href: '/insights' },
        { name: 'Sundae Intelligence', description: 'تحليلات محادثية مدعومة بالذكاء الاصطناعي', href: '/intelligence' },
        { name: 'Foresight', description: 'تنبؤات وذكاء استشرافي', href: '/product/foresight' },
      ],
      plansList: [
        { name: 'Sundae Report', description: 'تحليل تاريخي مجاني', href: '/report' },
        { name: 'Sundae Core', description: 'عمليات في الوقت الحقيقي', href: '/core' },
        { name: 'Sundae Crew', description: 'ركيزة تشغيلية · موظفون، جدولة، رواتب', href: '/crew' },
      ],
      solutionsSegments: [
        { name: 'مطاعم متعددة الفروع', href: '/solutions/multi-location-groups' },
        { name: 'الامتيازات التجارية', href: '/solutions/franchises' },
        { name: 'المطابخ السحابية', href: '/solutions/cloud-kitchens' },
        { name: 'مجموعات الضيافة الكبيرة', href: '/solutions/hospitality-operators' },
      ],
      solutionsRoles: [
        { name: 'قادة العمليات', href: '/solutions/regional-managers' },
        { name: 'فرق المالية والتخطيط', href: '/solutions/finance-teams' },
        { name: 'فرق التسويق', href: '/solutions/marketing-teams' },
        { name: 'الإدارة التنفيذية والمالكون', href: '/solutions/c-suite-executives' },
        { name: 'فرق البيانات والتقنية', href: '/solutions/technology-teams' },
        { name: 'فرق الأفراد والموارد البشرية', href: '/solutions/hr-teams' },
      ],
      resourcesList: [
        { name: 'المدونة', href: '/blog' },
        { name: 'التوثيق', href: '/docs' },
        { name: 'دراسات الحالة', href: '/resources' },
        { name: 'الأسئلة الشائعة', href: '/faq' },
        { name: 'أدوات وحاسبات مجانية', href: '/tools' },
      ],
    },
    footer: {
      readyTitle: 'توقّف عن إدارة مطاعمك بأرقام الأمس.',
      readyDescription: 'اكتشف كيف يعمل Sundae مع عمليتك، باستخدام بياناتك حيثما توفّرت أو سيناريو مطعم تمثيلي.',
      bookDemo: 'احجز جلسة عمل',
      startFree: 'ابدأ مع Report Lite',
      brandDescription:
        'منصة الذكاء القراري لمشغّلي المواقع المتعددة. See every layer. Act in time.',
      global: 'عالمي',
      allCurrencies: 'كل العملات',
      sectionProduct: 'المنتج',
      sectionSolutions: 'الحلول',
      sectionResources: 'الموارد',
      sectionCompany: 'الشركة',
      pricing: 'الأسعار',
      privacy: 'الخصوصية',
      terms: 'الشروط',
      copyrightSuffix: 'جميع الحقوق محفوظة.',
      companyLinks: [
        { name: 'حول', href: '/about' },
        { name: 'الوظائف', href: '/careers' },
        { name: 'اتصل بنا', href: '/contact' },
        { name: 'الأمان والامتثال', href: '/security' },
        { name: 'التكاملات', href: '/integrations' },
      ],
      extraResources: [
        { name: 'البدء', href: '/getting-started' },
      ],
    },
    home: {
      badge: 'منصة ذكاء القرار',
      titleTop: 'ذكاء القرار',
      titleBottom: 'للمطاعم متعددة الفروع',
      description:
        'بياناتك موزّعة على أنظمة الـ POS والتوصيل والحجوزات والعمالة والمخزون والمالية. يجمعها صنداي في طبقة تشغيل واحدة قائمة على الذكاء الاصطناعي - ترصد ما تغيّر، وتشرح السبب، و',
      descriptionEmphasis: 'تُبرز الخطوة التالية قبل أن تنتهي الوردية.',
      narrativeAnchor: 'من تأخر التقارير إلى سرعة العمليات.',
      startFree: 'احجز عرضاً',
      bookDemo: 'احجز عرضاً',
      noCard: 'لا حاجة إلى بطاقة ائتمان',
      proofStats: [
        { number: '6', label: 'طبقات ذكاء، حقيقة واحدة' },
        { number: '18', label: 'قرارات أُبرزت اليوم' },
        { number: '12', label: 'مجال تشغيل موحّد' },
        { number: '5 د', label: 'من الإشارة إلى الإجراء' },
      ],
      problem: {
        eyebrow: 'المشكلة',
        heading: 'الفجوات التي تكلفك المال كل يوم',
        description: 'كل مجموعة مطاعم نعمل معها تواجه نفس نقاط العمى.',
        kpis: [
          { value: '12+', label: 'مصادر البيانات', supporting: 'مجزأة عبر عملياتك', color: 'red' },
          { value: '+72 ساعة', label: 'لإغلاق الحسابات', supporting: 'وغالباً ما يستغرق الأمر أكثر من ثلاثة أيام', color: 'amber' },
          { value: '0%', label: 'السياق السوقي', supporting: 'لا توجد مقارنات مرجعية لأدائك', color: 'red' },
          { value: '$50K+', label: 'فاقد سنوي', supporting: 'من الهدر والتعويضات والتجاوزات', color: 'amber' },
        ],
      },
      platform: {
        eyebrow: '٦ طبقات · حقيقة واحدة',
        heading: 'ست طبقات. حقيقة واحدة.',
        description: 'من الوردية الحية إلى الخطة طويلة المدى - منصة واحدة، ست طبقات تتحدث مع بعضها.',
        countLabel: 'من ٦',
        exploreModules: 'استعرض كل الوحدات',
        learnMore: 'اعرف المزيد',
        layers: [
          { name: 'Pulse', subtitle: 'العمليات الفورية', description: 'وتيرة حية، أهداف تكيفية، أداء الموظفين، اكتشاف التسرب - وردية بوردية.', href: '/product/pulse' },
          { name: 'Benchmarks', subtitle: 'الذكاء التنافسي', description: 'مقارنات نظراء مجهولة عبر أكثر من 30 مقياساً. اعرف موقعك بدقة.', href: '/benchmarking' },
          { name: 'Watchtower', subtitle: 'ذكاء السوق', description: 'المنافسون، الطقس، الأحداث - قبل أن تصل إلى أرقامك.', href: '/product/watchtower' },
          { name: 'Insights', subtitle: 'أكثر من 30 وحدة تحليلية', description: 'الإيرادات، العمالة، المخزون، التسويق، التوصيل - وكل منها مع توصيات ذكية.', href: '/insights' },
          { name: 'Sundae Intelligence', subtitle: 'ذكاء محادثي', description: 'اسأل بياناتك أي شيء - إجابات موثّقة المصدر في ثوانٍ على الويب وWhatsApp وTelegram وSlack وTeams.', href: '/intelligence' },
          { name: 'Foresight', subtitle: 'ذكاء استباقي', description: 'توقعات وميزانيات وسيناريوهات ماذا لو - مع إحاطات تنفيذية تصحّح نفسها.', href: '/product/foresight' },
        ],
      },
      modules: {
        eyebrow: 'وحدات الذكاء',
        heading: 'أكثر من 30 وحدة عبر 12 مجالاً',
        description: 'كل بُعد من أبعاد أداء المطعم - محلل، ومقارن، وقابل للتنفيذ.',
        categories: [
          { name: 'ذكاء الإيرادات', count: '4 وحدات' },
          { name: 'ذكاء العمالة', count: '5 وحدات' },
          { name: 'تجربة الضيف', count: '3 وحدات' },
          { name: 'المخزون والهدر', count: '3 وحدات' },
          { name: 'المشتريات', count: '3 وحدات' },
          { name: 'أداء التسويق', count: '3 وحدات' },
          { name: 'التوصيل والمنصات', count: 'وحدتان' },
          { name: 'الحجوزات', count: 'وحدتان' },
          { name: 'ضمان الإيرادات', count: 'وحدتان' },
          { name: 'ذكاء الربحية', count: '3 وحدات' },
          { name: 'إدارة بيانات الضيوف', count: '3 وحدات' },
          { name: 'الذكاء المتقاطع', count: 'محرك ترابط' },
        ],
      },
      personas: {
        eyebrow: 'ما نسمعه من المشغّلين',
        heading: 'كل دور. منصة واحدة.',
        description: 'فِرَق مختلفة، أسئلة مختلفة. مصدر حقيقة واحد.',
        roles: [
          { title: 'قادة العمليات', pain: 'لا يمكنك أن تكون في كل مطعم في الوقت نفسه.', outcome: 'وتيرة حية وأداء الموظفين عبر كل موقع - اعرف من يحتاج المساعدة الآن.', attribution: 'نمط متكرر عبر مجموعات المطاعم متعددة المواقع' },
          { title: 'المالية و FP&A', pain: '3 أيام لإغلاق الحسابات؟ هذا وقت أكثر من اللازم.', outcome: 'هوامش فورية، تكلفة عمالة على مستوى الوردية، انحرافات مرتبطة بالأسباب الجذرية.', attribution: 'نمط متكرر في حوارات المدراء الماليين' },
          { title: 'الإدارة العليا والمالكون', pain: 'أسوأ موقع أداء لا يظهر حتى يوم الخميس.', outcome: 'نظرة محفظة، إحاطات يومية بالذكاء الاصطناعي، إشارات سوق - عبر كل علامة.', attribution: 'نمط متكرر بين المؤسسين والرؤساء التنفيذيين' },
          { title: 'البيانات والتقنية', pain: '12 واجهة API. 5 صيغ. لا مخطط موحد.', outcome: 'مسارات نظيفة، مقاييس محكومة، API عامة، webhooks، وضوابط RBAC جاهزة.', attribution: 'نمط متكرر بين قادة البيانات' },
        ],
      },
      howItWorks: {
        eyebrow: 'كيف يعمل',
        heading: 'من البيانات إلى القرار في أربع خطوات',
        steps: [
          { step: '01', title: 'اتصل', description: 'نقاط البيع، العمالة، المخزون، التوصيل - معظم التكاملات أقل من 5 دقائق.' },
          { step: '02', title: 'افهم', description: 'يكتشف الذكاء الاصطناعي الشذوذ ويضيف الطقس والأحداث وإشارات المنافسين.' },
          { step: '03', title: 'قرر', description: 'توصيات محددة وقابلة للتفسير - أهداف، جدولة، قائمة، تسعير.' },
          { step: '04', title: 'تحسن', description: 'كل قرار يغذي النظام. خطط العمل تصبح أدق، والتوقعات أكثر دقة.' },
        ],
      },
      mockup: {
        frameLabel: 'Pulse - وتيرة المبيعات',
        updatedAt: 'الثلاثاء، 7:42 مساءً',
        kpis: [
          { label: 'الإيرادات', value: '$14,280', trend: '+12% مقابل الهدف', trendUp: true },
          { label: 'الضيوف', value: '287', trend: '+12 مقابل الخطة', trendUp: true, color: '#22C55E' },
          { label: 'متوسط الفاتورة', value: '$49.50', trend: '-2.1%', trendUp: false, color: '#FBBF24' },
          { label: 'نسبة العمالة', value: '28.4%', trend: 'أقل من هدف 30%', trendUp: true, color: '#22C55E' },
        ],
        paceLabel: 'وتيرة الإيرادات',
        tableHeaders: ['الموظف', 'المبيعات', 'نسبة البيع الإضافي', 'متوسط الفاتورة'],
        tableRows: [
          ['Sarah M.', '$2,840', '32%', '$52.10'],
          ['Marcus J.', '$2,410', '28%', '$48.20'],
          ['James K.', '$1,960', '18%', '$44.50'],
        ],
        coachAlert: 'معدل البيع الإضافي لدى James K. أقل بـ 14% من متوسط الوردية. فكر في إقرانه مع Sarah للطلبتين القادمتين.',
      },
      closingTitle: 'توقف عن إدارة مطعمك بأرقام الأمس.',
      closingDescription: '30 دقيقة. بياناتك. ما الذي سيتغير فعلياً لفريقك مع Sundae.',
      pages: {
        signIn: {
          metadataTitle: 'تسجيل الدخول - Sundae',
          metadataDescription:
            'سجل الدخول إلى Sundae - عرض موحد للأداء والعمليات والذكاء التنافسي للمطاعم.',
          brandTitle: 'ذكاء القرار للمطاعم',
          brandDescription: 'الأداء والعمليات والذكاء التنافسي - في منصة واحدة.',
          trustPoints: [
            'ذكاء تشغيلي فوري',
            'مقاييس مرجعية متعددة المواقع',
            'إشارات السوق التنافسية',
          ],
          headingTitle: 'تسجيل الدخول إلى Sundae',
          headingDescription: 'عرض موحد للأداء والعمليات والذكاء التنافسي.',
          ssoGoogle: 'المتابعة عبر Google',
          ssoMicrosoft: 'المتابعة عبر Microsoft',
          or: 'أو',
          emailLabel: 'البريد الإلكتروني',
          emailPlaceholder: 'you@company.com',
          passwordLabel: 'كلمة المرور',
          passwordPlaceholder: 'أدخل كلمة المرور',
          rememberMe: 'تذكرني',
          forgotPassword: 'هل نسيت كلمة المرور؟',
          signingIn: 'جارٍ تسجيل الدخول...',
          redirecting: 'جارٍ التحويل...',
          signInButton: 'تسجيل الدخول',
          continueToApp: 'المتابعة إلى تطبيق Sundae',
          noAccount: 'ليس لديك حساب؟',
          getStartedFree: 'ابدأ مجانًا',
          signInMainAppDescription:
            'تسجيل الدخول يتم داخل التطبيق الرئيسي لـ Sundae. هذا الموقع لا يخزن كلمة المرور ولا يعالجها.',
          signInMainAppBenefits: [
            'الوصول إلى مساحة العمل الخاصة بالمؤسسة',
            'التبديل بين المواقع والمنتجات',
            'إدارة استعادة الحساب وإعادة تعيين كلمة المرور',
          ],
          footerTerms: 'الشروط',
          footerPrivacy: 'الخصوصية',
          footerSecurity: 'الأمان والامتثال',
          footerSupport: 'الدعم',
          emailRequired: 'البريد الإلكتروني مطلوب',
          emailInvalid: 'أدخل عنوان بريد إلكتروني صالح',
          passwordRequired: 'كلمة المرور مطلوبة',
          passwordMin: 'يجب أن تتكون كلمة المرور من 6 أحرف على الأقل',
          invalidCredentials: 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
          genericError: 'حدث خطأ ما. حاول مرة أخرى.',
        },
        demo: {
          metadataTitle: 'احجز عرضًا توضيحيًا',
          metadataDescription:
            'شاهد Sundae أثناء العمل باستخدام بيانات مطعمك. احجز عرضًا لمدة 30 دقيقة - بلا شرائح، بلا عرض مبيعات. فقط أرقامك على الشاشة مع إجابات حقيقية.',
          badge: 'احجز عرضًا',
          title: '30 دقيقة. بياناتك. إجابات حقيقية.',
          description:
            'سنربط النظام بنقطة البيع الخاصة بك، ونوضح ما تعنيه أرقامك فعليًا، ونترك لك القرار. بلا شرائح ولا عرض مبيعات.',
          requestTitle: 'اطلب العرض',
          requestDescription: 'أخبرنا عن عملياتك وسنخصص الجلسة حسب أولوياتك.',
          ctaLabel: 'احجز عرضًا',
          defaultMessage: 'أرغب في معرفة كيف يمكن لـ Sundae مساعدة عمليات مطعمي.',
          whatYoullSeeTitle: 'ما الذي ستراه',
          whatYoullSeeDescription: 'جولة مركزة مبنية حول عملياتك.',
          benefits: [
            {
              title: 'بياناتك مباشرة',
              description:
                'نربط نقطة البيع ونوضح ما يحدث فعليًا عبر مواقعك - وليس عرضًا عامًا ببيانات تجريبية.',
              details: ['تكامل مباشر مع POS', 'نظرة عامة متعددة المواقع', 'اكتشاف الشذوذ لحظيًا', 'تحليل الاتجاهات التاريخية'],
            },
            {
              title: 'نقاط العمى لديك',
              description:
                'سنكشف الفجوات التي لم تكن تراها - تسرب الإيرادات، وعدم كفاءة العمالة، والفرص المفقودة في بياناتك.',
              details: ['أنماط تسرب الإيرادات', 'تحسين تكلفة العمالة', 'فجوات أداء القائمة', 'الشذوذ التشغيلي'],
            },
            {
              title: 'إجابات على أسئلتك',
              description:
                'أحضر أصعب أسئلتك التشغيلية. سنوضح كيف يجيب Sundae عنها - أو سنقول لك إنه لا يستطيع.',
              details: ['التكامل مع مجموعتك التقنية', 'التسعير المناسب لحجمك', 'الجدول الزمني للتنفيذ', 'الأمن والامتثال'],
            },
          ],
          whyOperatorsTitle: 'لماذا يحجز المشغلون هذا الاتصال',
          stats: [
            { stat: '30 دقيقة', label: 'عرض مركّز - بلا حشو ولا زوائد' },
            { stat: 'بياناتك', label: 'نستخدم أرقامك الفعلية، لا بيئة تجريبية' },
            { stat: 'بدون ضغط', label: 'إذا لم يكن مناسبًا، سنخبرك' },
            { stat: '24 ساعة', label: 'يتم جدولة معظم العروض خلال يوم عمل واحد' },
          ],
          ctaTitle: 'شاهد ما فاتك',
          ctaDescription: '30 دقيقة. بياناتك. رؤى حقيقية. بلا عرض مبيعات.',
          bookDemo: 'احجز عرضك',
          viewPricing: 'عرض الأسعار',
        },
        pricing: {
          metadataTitle: 'الأسعار - Sundae',
          metadataDescription:
            'أسعار بسيطة وشفافة لـ Sundae Report وCore وWatchtower والوحدات المتخصصة.',
          badge: 'الأسعار',
          title: 'أسعار بسيطة وشفافة',
          description:
            'ابدأ مجانًا مع Report. وتوسّع إلى ذكاء فوري مع Core. كل خطة تتضمن أرصدة Sundae Intelligence.',
          monthly: 'شهري',
          annual: 'سنوي',
          savePercent: 'وفّر 10%',
          reportBadge: 'Sundae Report - تحليل تاريخي ومقارنة مرجعية',
          coreBadge: 'Sundae Core - عمليات فورية وذكاء تنبؤي',
          enterpriseBadge: 'Enterprise',
          enterpriseTitle: 'أسعار مخصصة للعمليات الكبيرة',
          enterpriseDescription:
            'للمجموعات متعددة المواقع التي تحتاج إلى white-label وSSO وSLA مخصصة ودعم مخصص. يتضمن 50,000+ رصيد ذكاء.',
          addOnsTitle: 'الإضافات',
          addOnsDescription: 'وسّع خطتك بوحدات ذكاء متخصصة.',
          detailedPricingCalculator: 'عرض حاسبة الأسعار التفصيلية',
          faqTitle: 'أسئلة شائعة',
          faqDescription: 'إجابات واضحة. بلا شروط مخفية.',
          ctaTitle: 'هل أنت مستعد للبدء؟',
          ctaDescription: 'ابدأ مجانًا، وارتقِ عندما تكون جاهزًا. لا حاجة لبطاقة ائتمان.',
          bookDemo: 'احجز عرضًا',
          startFree: 'ابدأ مجانًا',
        },
        faq: {
          metadataTitle: 'الأسئلة الشائعة - Sundae',
          metadataDescription:
            'أسئلة شائعة حول Sundae - الأسعار والتكاملات وأمن البيانات والتهيئة وكل ما يحتاجه مشغلو المطاعم قبل البدء.',
          badge: 'الأسئلة الشائعة',
          title: 'كل ما تحتاج إلى معرفته',
          description:
            'اعثر على إجابات للأسئلة الشائعة حول Sundae ومنتجاتنا وأسعارنا وكيف يتخذ المشغلون قرارات أفضل.',
          jumpToCategory: 'انتقل إلى الفئة:',
          stillHaveQuestions: 'هل لديك أسئلة أخرى؟',
          helpDescription: 'فريقنا هنا للمساعدة. احجز عرضًا، تواصل مع المبيعات، أو ابدأ مجانًا.',
          startFree: 'ابدأ مجانًا',
          seePricing: 'عرض الأسعار',
          bookDemo: 'احجز عرضًا',
          contactUs: 'اتصل بنا',
          emailSupportPrefix: 'أو راسلنا عبر البريد الإلكتروني:',
          categories: [
            'البدء',
            'المنتجات والطبقات',
            'البيانات والتكامل',
            'الوحدات',
            'Watchtower',
            'الأسعار والفوترة',
            'الميزات والقدرات',
            'الدعم والتدريب',
            'الأمن والامتثال',
            'Enterprise',
            'أسئلة المقارنة',
            'حالات استخدام محددة',
          ],
        },
        modules: {
          metadataTitle: 'الوحدات - Sundae',
          badge: 'وحدات متخصصة',
          title: 'تعمق في ما يهمك أكثر',
          description:
            'أضف وحدات متخصصة إلى Sundae Core للحصول على ذكاء تشغيلي عميق في العمالة والمخزون والمشتريات والتسويق والحجوزات.',
          mixAndMatch: 'اختر وامزج حسب أولوياتك.',
          exploreAllModules: 'استعرض جميع الوحدات',
          calculateModuleRoi: 'احسب عائد الوحدة',
          whatAreModules: 'ما هي وحدات Sundae؟',
          whatAreModulesDescription:
            'الوحدات هي إضافات ذكاء متخصصة تعمّق رؤيتك في مجالات تشغيلية محددة.',
          fiveModules: 'خمس وحدات متخصصة',
          chooseStack: 'اختر حزمة الذكاء الخاصة بك',
          chooseStackDescription: 'أضف وحدة واحدة أو الخمس كلها. ابنِ الذكاء الذي تحتاجه عمليتك.',
          coreCapabilities: 'القدرات الأساسية:',
          roi: 'عائد الاستثمار',
          bestFor: 'الأفضل لـ:',
          faqTitle: 'أسئلة متكررة',
          faqDescription: 'أسئلة شائعة حول الوحدات والترقية والتسعير والتنفيذ.',
          ctaTitle: 'هل أنت مستعد لإضافة ذكاء متخصص؟',
          ctaDescription: 'ابدأ بالوحدة التي تحل أكبر مشكلة لديك.',
          bookDemo: 'احجز عرضًا',
          contactSales: 'تواصل مع المبيعات',
          pillars: [
            { title: 'متخصصة وليست مبعثرة', description: 'ميزات عميقة مصممة لكل مجال تشغيلي.' },
            { title: 'أضف ما تحتاجه', description: 'ابدأ بأكبر نقطة ألم لديك وأضف الوحدات مع تغيّر الأولويات.' },
            { title: 'متكاملة وليست معزولة', description: 'تتشارك الوحدات البيانات مع Core في منصة موحدة.' },
          ],
        },
        integrations: {
          metadataTitle: 'التكاملات - Sundae',
          badge: 'التكاملات',
          title: 'صِل كل شيء. وحّد بياناتك.',
          description:
            'يتكامل Sundae مع أكثر من 30 نظامًا للمطاعم عبر نقاط البيع والعمالة والمخزون والحجوزات والتوصيل وغيرها.',
          process: [
            { step: '1', title: 'اتصال', description: 'صادق على منصاتك باستخدام OAuth أو API key - معظم التكاملات تستغرق أقل من 5 دقائق.' },
            { step: '2', title: 'توحيد', description: 'يقوم Sundae Core بتنظيف البيانات وربطها وتوحيدها في مخطط موحد.' },
            { step: '3', title: 'تحليل', description: 'تتدفق البيانات الموحدة إلى لوحات المعلومات والتنبيهات والتوصيات الذكية.' },
          ],
          domainsTitle: '12 مجال بيانات. رؤية موحدة واحدة.',
          domainsDescription:
            'نقاط البيع، العمالة، المخزون، المشتريات، الحجوزات، التوصيل، التسويق، تجربة الضيف، CRM، المحاسبة، وملخصات المبيعات اليومية - كلها متصلة.',
          live: 'مباشر',
          upcoming: 'قادم',
          liveNow: 'مباشر - متاح الآن',
          roadmap: 'قادم - على خارطة الطريق',
          roadmapDescription: 'التكاملات القادمة قيد التطوير النشط. تواصل معنا لطلب أولوية لتكامل محدد.',
          webhooksTitle: 'Webhooks و Public API',
          webhooksDescription: 'ابنِ تكاملات مخصصة باستخدام أدوات المطور في Sundae.',
          customWebhooks: 'Webhooks مخصصة',
          customWebhooksDescription:
            'اضبط webhooks لأي مجال بيانات غير POS وأرسل البيانات إلى Sundae من أي نظام يدعم HTTP.',
          publicApi: 'Public API',
          publicApiDescription:
            'استخدم API الخاص بـ Sundae لسحب التحليلات المهيكلة إلى سير العمل والأدوات ولوحات التقارير الخاصة بك.',
          liveDomains: 'متاح لجميع مجالات البيانات الـ 12',
          signatureVerification: 'تحقق توقيع HMAC-SHA256',
          testPayloads: 'حِزم اختبار وتتبع التسليم',
        },
        resources: {
          metadataTitle: 'الموارد - Sundae',
          badge: 'الموارد والأدوات',
          title: 'موارد ذكاء القرار',
          description:
            'احصل على الأدلة والتقارير والأدوات لمساعدتك على اتخاذ قرارات أذكى لعمل مطعمك.',
          getStarted: 'ابدأ مع Sundae',
          freeReport: 'احصل على تقرير مرجعي مجاني',
          caseStudies: 'دراسات حالة',
          caseStudiesDescription:
            'شاهد كيف يستخدم المشغلون Sundae لتحسين الأداء والهوامش واتخاذ القرار.',
          caseStudiesNote: 'أمثلة تمثيلية مبنية على تحديات تشغيلية حقيقية؛ تم إخفاء أسماء العملاء.',
          segment: 'القطاع',
          challenge: 'التحدي:',
          solution: 'حل Sundae:',
          outcomes: 'النتائج:',
          exploreProducts: 'استكشف المنتجات المستخدمة في دراسات الحالة هذه:',
          toolsTitle: 'أدوات وحاسبات مجانية',
          toolsDescription:
            'جرّب حاسبات Sundae المجانية لتكاليف العمالة وهوامش القائمة وجاهزية المقارنة وغيرها.',
          exploreTools: 'استعرض جميع الأدوات',
          stayUpdated: 'ابقَ على اطلاع',
          newsletterDescription:
            'احصل على أحدث رؤى القطاع والمقارنات واتجاهات ذكاء القرار مباشرة إلى بريدك.',
          subscribe: 'اشترك',
          privacyNote: 'نحترم خصوصيتك. يمكنك إلغاء الاشتراك في أي وقت.',
          ctaTitle: 'هل أنت مستعد لتحويل مطعمك؟',
          ctaDescription:
            'انضم إلى آلاف مشغلي المطاعم الذين يستخدمون Sundae لاتخاذ قرارات أذكى مبنية على الأرقام.',
          bookDemo: 'احجز عرضًا',
          contactSales: 'تواصل مع المبيعات',
        },
      },
    },
  },
  fr: {
    metadata: {
      title: 'Sundae - Intelligence décisionnelle pour la restauration',
      description:
        "La plateforme d'intelligence décisionnelle pour les restaurants - unifie POS, main-d'œuvre, coûts et opérations pour comparer les performances et en faire la prochaine bonne décision.",
    },
    layout: {
      skipToContent: 'Aller au contenu principal',
      languageSelector: 'Langue',
    },
    navbar: {
      products: 'Produit',
      solutions: 'Solutions',
      resources: 'Ressources',
      company: 'Entreprise',
      intelligence: 'Couches d\'intelligence',
      plans: 'Offres',
      bySegment: 'Par segment',
      byRole: 'Par rôle',
      learn: 'Apprendre',
      pricing: 'Tarifs',
      about: 'À propos',
      signIn: 'Se connecter',
      bookDemo: 'Réserver une démo',
      comparePlans: 'Comparer les offres →',
      startFree: 'Commencer avec Report Lite',
      openMenu: 'Ouvrir le menu',
      closeMenu: 'Fermer le menu',
      closeNavigation: 'Fermer la navigation',
      mobileNavigation: 'Navigation mobile',
      pillars: [
        { name: 'Pulse', description: 'Suivi des opérations en cours de service', href: '/product/pulse' },
        { name: 'Benchmarks', description: 'Intelligence concurrentielle', href: '/benchmarking' },
        { name: 'Watchtower', description: 'Signaux de marché externes', href: '/product/watchtower' },
        { name: 'Insights', description: 'Modules analytiques spécialisés', href: '/insights' },
        { name: 'Sundae Intelligence', description: 'Analytique conversationnelle par IA', href: '/intelligence' },
        { name: 'Foresight', description: 'Prévision et intelligence prédictive', href: '/product/foresight' },
      ],
      plansList: [
        { name: 'Sundae Report', description: 'Analyse historique gratuite', href: '/report' },
        { name: 'Sundae Core', description: 'Opérations en temps réel', href: '/core' },
        { name: 'Sundae Crew', description: 'Socle opérationnel · équipes, plannings, paie', href: '/crew' },
      ],
      solutionsSegments: [
        { name: 'Restaurants multi-sites', href: '/solutions/multi-location-groups' },
        { name: 'Franchises', href: '/solutions/franchises' },
        { name: 'Dark kitchens', href: '/solutions/cloud-kitchens' },
        { name: 'Groupes hôteliers enterprise', href: '/solutions/hospitality-operators' },
      ],
      solutionsRoles: [
        { name: 'Responsables opérations', href: '/solutions/regional-managers' },
        { name: 'Équipes finance et FP&A', href: '/solutions/finance-teams' },
        { name: 'Équipes marketing', href: '/solutions/marketing-teams' },
        { name: 'Direction et propriétaires', href: '/solutions/c-suite-executives' },
        { name: 'Équipes data et technologie', href: '/solutions/technology-teams' },
        { name: 'Équipes RH', href: '/solutions/hr-teams' },
      ],
      resourcesList: [
        { name: 'Blog', href: '/blog' },
        { name: 'Documentation', href: '/docs' },
        { name: 'Cas clients', href: '/resources' },
        { name: 'FAQ', href: '/faq' },
        { name: 'Outils et calculateurs gratuits', href: '/tools' },
      ],
    },
    footer: {
      readyTitle: 'Arrêtez de piloter vos restaurants avec les chiffres d\'hier.',
      readyDescription: 'Découvrez ce que Sundae donnerait sur votre activité, à partir de vos données lorsqu\'elles sont disponibles ou d\'un scénario de restaurant représentatif.',
      bookDemo: 'Réserver une session de travail',
      startFree: 'Commencer avec Report Lite',
      brandDescription:
        "La plateforme d'intelligence décisionnelle pour les opérateurs multi-sites. See every layer. Act in time.",
      global: 'Global',
      allCurrencies: 'Toutes les devises',
      sectionProduct: 'Produit',
      sectionSolutions: 'Solutions',
      sectionResources: 'Ressources',
      sectionCompany: 'Entreprise',
      pricing: 'Tarifs',
      privacy: 'Confidentialité',
      terms: 'Conditions',
      copyrightSuffix: 'Tous droits réservés.',
      companyLinks: [
        { name: 'À propos', href: '/about' },
        { name: 'Carrières', href: '/careers' },
        { name: 'Contact', href: '/contact' },
        { name: 'Sécurité et conformité', href: '/security' },
        { name: 'Intégrations', href: '/integrations' },
      ],
      extraResources: [
        { name: 'Bien demarrer', href: '/getting-started' },
      ],
    },
    home: {
      badge: 'Plateforme d\'intelligence décisionnelle',
      titleTop: 'Intelligence décisionnelle',
      titleBottom: 'pour les restaurants multi-sites',
      description:
        'Vos données vivent dans le POS, la livraison, les réservations, le personnel, les stocks et la finance. Sundae les réunit dans une seule couche opérationnelle native IA - repère ce qui a changé, explique pourquoi et',
      descriptionEmphasis: 'fait remonter le prochain geste avant la fin du service.',
      narrativeAnchor: 'Du reporting en retard à la réactivité opérationnelle.',
      startFree: 'Réserver une démo',
      bookDemo: 'Demander une démo',
      noCard: 'Aucune carte bancaire requise',
      proofStats: [
        { number: '6', label: 'Couches d\'intelligence, une seule vérité' },
        { number: '18', label: 'Décisions remontées aujourd\'hui' },
        { number: '12', label: 'Domaines opérationnels unifiés' },
        { number: '5 min', label: 'Du signal à l\'action' },
      ],
      problem: {
        eyebrow: 'LE PROBLÈME',
        heading: 'Les écarts qui vous coûtent de l\'argent chaque jour',
        description: 'Chaque groupe de restaurants avec lequel nous travaillons fait face aux mêmes angles morts.',
        kpis: [
          { value: '12+', label: 'Sources de données', supporting: 'Déconnectées dans toute votre activité', color: 'red' },
          { value: '72 h+', label: 'Pour clôturer les comptes', supporting: 'Et souvent il faut plus de trois jours', color: 'amber' },
          { value: '0%', label: 'Contexte marché', supporting: 'Aucun benchmark de pairs sur vos KPI', color: 'red' },
          { value: '$50K+', label: 'Fuite annuelle', supporting: 'Pertes, offerts et ajustements cumulés', color: 'amber' },
        ],
      },
      platform: {
        eyebrow: '6 COUCHES · UNE SEULE VÉRITÉ',
        heading: 'Six couches. Une seule vérité.',
        description: 'Du service en direct au plan long terme - une plateforme, six couches qui se parlent.',
        countLabel: 'sur 6',
        exploreModules: 'Explorer tous les modules',
        learnMore: 'En savoir plus',
        layers: [
          { name: 'Pulse', subtitle: 'Opérations en temps réel', description: 'Rythme en direct, objectifs adaptatifs, performance serveurs, détection des fuites - service par service.', href: '/product/pulse' },
          { name: 'Benchmarks', subtitle: 'Intelligence concurrentielle', description: 'Benchmarks anonymes de pairs sur plus de 30 indicateurs. Sachez où vous vous situez.', href: '/benchmarking' },
          { name: 'Watchtower', subtitle: 'Intelligence marché', description: 'Concurrents, météo, événements - avant que cela touche vos chiffres.', href: '/product/watchtower' },
          { name: 'Insights', subtitle: '12 modules analytiques', description: 'Revenu, main-d\'œuvre, stock, marketing, livraison - chacun avec ses recommandations IA.', href: '/insights' },
          { name: 'Sundae Intelligence', subtitle: 'IA conversationnelle', description: 'Posez n\'importe quelle question - des réponses sourcées en secondes sur le web, WhatsApp, Telegram, Slack ou Teams.', href: '/intelligence' },
          { name: 'Foresight', subtitle: 'Intelligence prédictive', description: 'Prévisions, budgets et scénarios hypothèse - avec des briefings dirigeants auto-correctifs.', href: '/product/foresight' },
        ],
      },
      modules: {
        eyebrow: 'MODULES D\'INTELLIGENCE',
        heading: 'Plus de 30 modules dans 12 domaines',
        description: 'Chaque dimension de la performance restaurant - analysée, comparée et exploitable.',
        categories: [
          { name: 'Intelligence du revenu', count: '4 modules' },
          { name: 'Intelligence de la main-d\'œuvre', count: '5 modules' },
          { name: 'Expérience client', count: '3 modules' },
          { name: 'Stock et pertes', count: '3 modules' },
          { name: 'Achats', count: '3 modules' },
          { name: 'Performance marketing', count: '3 modules' },
          { name: 'Livraison et plateformes', count: '2 modules' },
          { name: 'Réservations', count: '2 modules' },
          { name: 'Garantie du revenu', count: '2 modules' },
          { name: 'Intelligence de profit', count: '3 modules' },
          { name: 'CRM clients', count: '3 modules' },
          { name: 'Cross-Intelligence', count: 'Moteur de corrélation' },
        ],
      },
      personas: {
        eyebrow: 'CE QUE NOUS ENTENDONS DES OPÉRATEURS',
        heading: 'Chaque rôle. Une seule plateforme.',
        description: 'Des équipes différentes, des questions différentes. Une seule source de vérité.',
        roles: [
          { title: 'Responsables opérations', pain: 'Vous ne pouvez pas être dans chaque restaurant à la fois.', outcome: 'Rythme en direct et performance serveurs sur chaque site - voyez qui a besoin d\'aide maintenant.', attribution: 'Constat récurrent chez les opérateurs multi-sites' },
          { title: 'Finance & FP&A', pain: '3 jours pour clôturer les comptes ? C\'est 3 jours de trop.', outcome: 'Marge en direct, coût main-d\'œuvre par service, écarts reliés à leurs causes profondes.', attribution: 'Constat récurrent dans les échanges avec les DAF' },
          { title: 'Direction & propriétaires', pain: 'Votre pire site reste invisible jusqu\'au jeudi.', outcome: 'Vue portefeuille, briefings IA quotidiens, signaux de marché - pour chaque marque.', attribution: 'Constat récurrent chez les fondateurs et CEO' },
          { title: 'Data & technologie', pain: '12 API fournisseurs. 5 formats. Aucun schéma unifié.', outcome: 'Pipelines propres, métriques gouvernées, API publique, webhooks et RBAC prêts à l\'emploi.', attribution: 'Constat récurrent chez les responsables data' },
        ],
      },
      howItWorks: {
        eyebrow: 'COMMENT ÇA MARCHE',
        heading: 'De la donnée à la décision en quatre étapes',
        steps: [
          { step: '01', title: 'Connecter', description: 'POS, main-d\'œuvre, stock, livraison - la plupart des intégrations en moins de 5 minutes.' },
          { step: '02', title: 'Comprendre', description: 'L\'IA révèle les anomalies et superpose météo, événements et signaux concurrents.' },
          { step: '03', title: 'Décider', description: 'Des recommandations précises et explicables - objectifs, planning, menu, tarifs.' },
          { step: '04', title: 'Améliorer', description: 'Chaque décision nourrit le système. Les playbooks s\'affinent, les prévisions se précisent.' },
        ],
      },
      mockup: {
        frameLabel: 'Pulse - Rythme des ventes',
        updatedAt: 'Mardi, 19:42',
        kpis: [
          { label: 'Revenu', value: '$14,280', trend: '+12% vs objectif', trendUp: true },
          { label: 'Couverts', value: '287', trend: '+12 vs plan', trendUp: true, color: '#22C55E' },
          { label: 'Ticket moyen', value: '$49.50', trend: '-2,1%', trendUp: false, color: '#FBBF24' },
          { label: 'Main-d\'œuvre %', value: '28.4%', trend: 'Sous l\'objectif de 30%', trendUp: true, color: '#22C55E' },
        ],
        paceLabel: 'Rythme du revenu',
        tableHeaders: ['Serveur', 'Ventes', 'Upsell %', 'Ticket moyen'],
        tableRows: [
          ['Sarah M.', '$2,840', '32%', '$52.10'],
          ['Marcus J.', '$2,410', '28%', '$48.20'],
          ['James K.', '$1,960', '18%', '$44.50'],
        ],
        coachAlert: 'Le taux d\'upsell de James K. est 14% sous la moyenne du service. Pensez à le faire travailler avec Sarah sur les 2 prochaines tables.',
      },
      closingTitle: 'Arrêtez de piloter sur les chiffres d\'hier.',
      closingDescription: '30 minutes. Vos données. Ce que Sundae changerait concrètement pour l\'équipe.',
      pages: {
        signIn: {
          metadataTitle: 'Connexion - Sundae',
          metadataDescription:
            "Connectez-vous à Sundae - votre vue unifiée de la performance, des opérations et de l'intelligence concurrentielle pour les restaurants.",
          brandTitle: 'Intelligence décisionnelle pour la restauration',
          brandDescription:
            'Performance, opérations et intelligence concurrentielle - réunies dans une seule plateforme.',
          trustPoints: [
            'Intelligence opérationnelle en temps réel',
            'Benchmarking multi-sites',
            'Signaux de marché concurrentiel',
          ],
          headingTitle: 'Connexion à Sundae',
          headingDescription:
            'Votre vue unifiée de la performance, des opérations et de l\'intelligence concurrentielle.',
          ssoGoogle: 'Continuer avec Google',
          ssoMicrosoft: 'Continuer avec Microsoft',
          or: 'ou',
          emailLabel: 'E-mail',
          emailPlaceholder: 'vous@entreprise.com',
          passwordLabel: 'Mot de passe',
          passwordPlaceholder: 'Saisissez votre mot de passe',
          rememberMe: 'Se souvenir de moi',
          forgotPassword: 'Mot de passe oublié ?',
          signingIn: 'Connexion en cours...',
          redirecting: 'Redirection en cours...',
          signInButton: 'Se connecter',
          continueToApp: "Continuer vers l'application Sundae",
          noAccount: "Vous n'avez pas de compte ?",
          getStartedFree: 'Commencer gratuitement',
          signInMainAppDescription:
            "La connexion se fait dans l'application principale Sundae. Ce site n'enregistre pas et ne traite pas votre mot de passe.",
          signInMainAppBenefits: [
            "Accéder à votre espace de travail",
            'Changer de site et de produit',
            'Gérer la réinitialisation du mot de passe et la récupération du compte',
          ],
          footerTerms: 'Conditions',
          footerPrivacy: 'Confidentialité',
          footerSecurity: 'Sécurité et conformité',
          footerSupport: 'Support',
          emailRequired: "L'e-mail est requis",
          emailInvalid: 'Saisissez une adresse e-mail valide',
          passwordRequired: 'Le mot de passe est requis',
          passwordMin: 'Le mot de passe doit contenir au moins 6 caractères',
          invalidCredentials: "E-mail ou mot de passe invalide",
          genericError: 'Une erreur est survenue. Veuillez réessayer.',
        },
        demo: {
          metadataTitle: 'Réserver une démo',
          metadataDescription:
            "Voyez Sundae en action avec vos propres données de restaurant. Réservez une démo de 30 minutes, centrée sur vos chiffres et vos priorités opérationnelles.",
          badge: 'RÉSERVER UNE DÉMO',
          title: '30 minutes. Vos données. De vraies réponses.',
          description:
            'Nous connecterons votre POS, montrerons ce que vos chiffres signifient vraiment et vous laisserons juger si Sundae peut vous faire gagner du temps.',
          requestTitle: 'Demander votre démo',
          requestDescription:
            'Parlez-nous de votre activité et nous adapterons la session à vos priorités.',
          ctaLabel: 'Réserver une démo',
          defaultMessage:
            "Je souhaite voir comment Sundae peut aider les opérations de mon restaurant.",
          whatYoullSeeTitle: 'Ce que vous verrez',
          whatYoullSeeDescription: 'Une visite guidée centrée sur votre activité.',
          benefits: [
            {
              title: 'Vos données, en direct',
              description:
                "Nous connectons le POS et montrons ce qui se passe vraiment sur vos sites - pas une démo générique avec des données fictives.",
              details: [
                'Intégration POS en direct',
                'Vue d\'ensemble multi-sites',
                'Détection d\'anomalies en temps réel',
                'Analyse des tendances historiques',
              ],
            },
            {
              title: 'Vos angles morts',
              description:
                'Nous ferons ressortir les écarts que vous ne voyiez pas - pertes de revenus, inefficacités de main-d\'œuvre et opportunités manquées.',
              details: [
                'Schémas de fuite de revenus',
                'Optimisation des coûts de main-d\'œuvre',
                'Écarts de performance du menu',
                'Anomalies opérationnelles',
              ],
            },
            {
              title: 'Vos questions, des réponses',
              description:
                'Apportez vos questions opérationnelles les plus difficiles. Nous montrerons exactement comment Sundae y répond - ou nous vous dirons que ce n\'est pas possible.',
              details: [
                'Intégration à votre stack',
                'Tarification adaptée à votre taille',
                'Calendrier de mise en œuvre',
                'Sécurité et conformité des données',
              ],
            },
          ],
          whyOperatorsTitle: 'Pourquoi les opérateurs acceptent l\'appel',
          stats: [
            { stat: '30 min', label: 'Démo ciblée - sans remplissage ni blabla' },
            { stat: 'Vos données', label: 'Nous utilisons vos vrais chiffres, pas un bac à sable' },
            { stat: 'Zéro pression', label: 'Si ce n\'est pas pertinent, nous vous le dirons' },
            { stat: '24 h', label: 'La plupart des démos sont planifiées sous un jour ouvrable' },
          ],
          ctaTitle: 'Voyez ce qu\'il vous manque',
          ctaDescription: 'Trente minutes pour regarder vos données et voir ce qui mérite vraiment votre attention.',
          bookDemo: 'Réserver votre démo',
          viewPricing: 'Voir les tarifs',
        },
        pricing: {
          metadataTitle: 'Tarifs - Sundae',
          metadataDescription:
            'Tarifs simples et transparents pour Sundae Report, Core, Watchtower et les modules.',
          badge: 'Tarifs',
          title: 'Tarifs simples et transparents',
          description:
            'Commencez gratuitement avec Report. Passez à l\'intelligence en temps réel avec Core. Chaque formule inclut des crédits Sundae Intelligence.',
          monthly: 'Mensuel',
          annual: 'Annuel',
          savePercent: 'Économisez 10 %',
          reportBadge: 'Sundae Report - Analyse historique et benchmarking',
          coreBadge: 'Sundae Core - Opérations en temps réel et intelligence prédictive',
          enterpriseBadge: 'Enterprise',
          enterpriseTitle: 'Tarification sur mesure pour les grandes opérations',
          enterpriseDescription:
            'Pour les groupes multi-sites ayant besoin de white-label, SSO, SLA personnalisés et support dédié. 50 000+ crédits inclus.',
          addOnsTitle: 'Modules complémentaires',
          addOnsDescription: 'Étendez votre offre avec des modules d\'intelligence spécialisés.',
          detailedPricingCalculator: 'Voir le calculateur de tarifs détaillé',
          faqTitle: 'Questions fréquentes',
          faqDescription: 'Des réponses claires. Sans petits caractères.',
          ctaTitle: 'Prêt à commencer ?',
          ctaDescription: 'Commencez gratuitement, évoluez quand vous êtes prêt. Aucune carte requise.',
          bookDemo: 'Réserver une démo',
          startFree: 'Commencer gratuitement',
        },
        faq: {
          metadataTitle: 'FAQ - Sundae',
          metadataDescription:
            'Questions fréquentes sur Sundae - tarifs, intégrations, sécurité des données, onboarding et tout ce que les opérateurs doivent savoir avant de commencer.',
          badge: 'Questions fréquentes',
          title: 'Tout ce qu\'il faut savoir',
          description:
            'Trouvez des réponses aux questions courantes sur Sundae, nos produits, nos tarifs et la manière dont les opérateurs prennent de meilleures décisions.',
          jumpToCategory: 'Aller à la catégorie :',
          stillHaveQuestions: 'Vous avez encore des questions ?',
          helpDescription: 'Notre équipe est là pour vous aider. Réservez une démo, contactez les ventes ou commencez gratuitement.',
          startFree: 'Commencer gratuitement',
          seePricing: 'Voir les tarifs',
          bookDemo: 'Réserver une démo',
          contactUs: 'Nous contacter',
          emailSupportPrefix: 'Ou envoyez-nous un e-mail à :',
          categories: [
            'Démarrage',
            'Produits et niveaux',
            'Données et intégration',
            'Modules',
            'Watchtower',
            'Tarifs et facturation',
            'Fonctionnalités et capacités',
            'Support et formation',
            'Sécurité et conformité',
            'Enterprise',
            'Questions comparatives',
            'Cas d\'usage spécifiques',
          ],
        },
        modules: {
          metadataTitle: 'Modules - Sundae',
          badge: 'Modules spécialisés',
          title: 'Allez plus loin là où ça compte le plus',
          description:
            'Ajoutez des modules spécialisés à Sundae Core pour une intelligence approfondie en main-d\'œuvre, stock, achats, marketing et réservations.',
          mixAndMatch: 'Combinez selon vos priorités.',
          exploreAllModules: 'Explorer tous les modules',
          calculateModuleRoi: 'Calculer le ROI du module',
          whatAreModules: 'Que sont les modules Sundae ?',
          whatAreModulesDescription:
            'Les modules sont des extensions d\'intelligence spécialisées qui approfondissent vos analyses dans des domaines opérationnels précis.',
          fiveModules: 'Cinq modules spécialisés',
          chooseStack: 'Composez votre pile d\'intelligence',
          chooseStackDescription: 'Ajoutez un module ou les cinq. Construisez l\'intelligence dont votre activité a besoin.',
          coreCapabilities: 'Capacités principales :',
          roi: 'ROI',
          bestFor: 'Idéal pour :',
          faqTitle: 'Questions fréquentes',
          faqDescription: 'Questions courantes sur les modules, la montée en gamme, le tarif et le déploiement.',
          ctaTitle: 'Prêt à ajouter une intelligence spécialisée ?',
          ctaDescription: 'Commencez par le module qui résout votre plus gros problème.',
          bookDemo: 'Réserver une démo',
          contactSales: 'Contacter les ventes',
          pillars: [
            { title: 'Spécialisé, pas dispersé', description: 'Des fonctionnalités approfondies pensées pour chaque domaine opérationnel.' },
            { title: 'Ajoutez ce dont vous avez besoin', description: 'Commencez par votre plus gros point de friction et ajoutez des modules au fil des priorités.' },
            { title: 'Intégré, pas en silos', description: 'Les modules partagent leurs données avec Core dans une plateforme unifiée.' },
          ],
        },
        integrations: {
          metadataTitle: 'Intégrations - Sundae',
          badge: 'Intégrations',
          title: 'Connectez tout. Unifiez vos données.',
          description:
            'Sundae s\'intègre à plus de 30 systèmes de restauration couvrant POS, main-d\'œuvre, stock, réservations, livraison et plus encore.',
          process: [
            { step: '1', title: 'Connecter', description: 'Authentifiez vos plateformes via OAuth ou clé API - la plupart des intégrations prennent moins de 5 minutes.' },
            { step: '2', title: 'Normaliser', description: 'Sundae Core nettoie, mappe et unifie chaque source de données dans un schéma cohérent.' },
            { step: '3', title: 'Analyser', description: 'Les données unifiées alimentent tableaux de bord, alertes et recommandations intelligentes.' },
          ],
          domainsTitle: '12 domaines de données. Une vue unifiée.',
          domainsDescription:
            'POS, main-d\'œuvre, stock, achats, réservations, livraison, marketing, expérience client, CRM, comptabilité et résumés quotidiens - tout est connecté.',
          live: 'En ligne',
          upcoming: 'À venir',
          liveNow: 'En ligne - disponible maintenant',
          roadmap: 'À venir - sur notre feuille de route',
          roadmapDescription: 'Les intégrations à venir sont en cours de développement. Contactez-nous pour prioriser une intégration précise.',
          webhooksTitle: 'Webhooks et Public API',
          webhooksDescription: 'Construisez des intégrations personnalisées avec les outils développeur de Sundae.',
          customWebhooks: 'Webhooks personnalisés',
          customWebhooksDescription:
            'Configurez des webhooks pour tout domaine de données hors POS et envoyez vos données à Sundae depuis n\'importe quel système HTTP.',
          publicApi: 'Public API',
          publicApiDescription:
            'Utilisez l\'API Sundae pour récupérer des analyses structurées dans vos propres flux, outils et couches de reporting.',
          liveDomains: 'Disponible pour les 12 domaines de données',
          signatureVerification: 'Vérification de signature HMAC-SHA256',
          testPayloads: 'Payloads de test et suivi des livraisons',
        },
        resources: {
          metadataTitle: 'Ressources - Sundae',
          badge: 'Ressources et outils',
          title: 'Ressources d\'intelligence décisionnelle',
          description:
            'Accédez à des guides, rapports et outils pour prendre de meilleures décisions pour votre restaurant.',
          getStarted: 'Commencer avec Sundae',
          freeReport: 'Obtenir un rapport de benchmark gratuit',
          caseStudies: 'Études de cas',
          caseStudiesDescription:
            'Voyez comment les opérateurs utilisent Sundae pour améliorer la performance, les marges et la prise de décision.',
          caseStudiesNote: 'Exemples représentatifs inspirés de vrais défis opérationnels ; noms de clients masqués.',
          segment: 'Segment',
          challenge: 'Défi :',
          solution: 'Solution Sundae :',
          outcomes: 'Résultats :',
          exploreProducts: 'Explorez les produits utilisés dans ces études de cas :',
          toolsTitle: 'Outils et calculateurs gratuits',
          toolsDescription:
            'Essayez les calculateurs gratuits de Sundae pour les coûts de main-d\'œuvre, les marges menu, votre niveau de préparation au benchmark et plus encore.',
          exploreTools: 'Explorer tous les outils',
          stayUpdated: 'Restez à jour',
          newsletterDescription:
            'Recevez les derniers insights du secteur, benchmarks et tendances de l\'intelligence décisionnelle directement dans votre boîte mail.',
          subscribe: 'S\'inscrire',
          privacyNote: 'Nous respectons votre confidentialité. Désabonnez-vous à tout moment.',
          ctaTitle: 'Prêt à transformer votre restaurant ?',
          ctaDescription:
            'Rejoignez des milliers d\'opérateurs qui utilisent Sundae pour prendre des décisions plus intelligentes, fondées sur les chiffres.',
          bookDemo: 'Réserver une démo',
          contactSales: 'Contacter les ventes',
        },
      },
    },
  },
  es: {
    metadata: {
      title: 'Sundae - Inteligencia de decisión para restaurantes',
      description:
        'La plataforma de inteligencia de decisión para restaurantes: unifica POS, personal, costos y operaciones para comparar el rendimiento y convertirlo en tu próximo movimiento acertado.',
    },
    layout: {
      skipToContent: 'Ir al contenido principal',
      languageSelector: 'Idioma',
    },
    navbar: {
      products: 'Producto',
      solutions: 'Soluciones',
      resources: 'Recursos',
      company: 'Empresa',
      intelligence: 'Capas de inteligencia',
      plans: 'Planes',
      bySegment: 'Por segmento',
      byRole: 'Por rol',
      learn: 'Aprender',
      pricing: 'Precios',
      about: 'Acerca de',
      signIn: 'Iniciar sesión',
      bookDemo: 'Reservar demo',
      comparePlans: 'Comparar planes →',
      startFree: 'Comienza con Report Lite',
      openMenu: 'Abrir menú',
      closeMenu: 'Cerrar menú',
      closeNavigation: 'Cerrar navegación',
      mobileNavigation: 'Navegación móvil',
      pillars: [
        { name: 'Pulse', description: 'Monitor de operaciones intradía', href: '/product/pulse' },
        { name: 'Benchmarks', description: 'Inteligencia competitiva', href: '/benchmarking' },
        { name: 'Watchtower', description: 'Señales externas del mercado', href: '/product/watchtower' },
        { name: 'Insights', description: 'Módulos analíticos especializados', href: '/insights' },
        { name: 'Sundae Intelligence', description: 'Analítica conversacional con IA', href: '/intelligence' },
        { name: 'Foresight', description: 'Inteligencia predictiva y pronósticos', href: '/product/foresight' },
      ],
      plansList: [
        { name: 'Sundae Report', description: 'Análisis histórico gratuito', href: '/report' },
        { name: 'Sundae Core', description: 'Operaciones en tiempo real', href: '/core' },
        { name: 'Sundae Crew', description: 'Sustrato operativo · personal, horarios, nómina', href: '/crew' },
      ],
      solutionsSegments: [
        { name: 'Restaurantes multilocal', href: '/solutions/multi-location-groups' },
        { name: 'Franquicias', href: '/solutions/franchises' },
        { name: 'Cocinas fantasma', href: '/solutions/cloud-kitchens' },
        { name: 'Grupos de hospitality enterprise', href: '/solutions/hospitality-operators' },
      ],
      solutionsRoles: [
        { name: 'Líderes de operaciones', href: '/solutions/regional-managers' },
        { name: 'Equipos de finanzas y FP&A', href: '/solutions/finance-teams' },
        { name: 'Equipos de marketing', href: '/solutions/marketing-teams' },
        { name: 'Dirección y propietarios', href: '/solutions/c-suite-executives' },
        { name: 'Equipos de datos y tecnología', href: '/solutions/technology-teams' },
        { name: 'Equipos de personas y RR. HH.', href: '/solutions/hr-teams' },
      ],
      resourcesList: [
        { name: 'Blog', href: '/blog' },
        { name: 'Documentación', href: '/docs' },
        { name: 'Casos de estudio', href: '/resources' },
        { name: 'Preguntas frecuentes', href: '/faq' },
        { name: 'Herramientas y calculadoras gratis', href: '/tools' },
      ],
    },
    footer: {
      readyTitle: 'Deja de gestionar tus restaurantes con los números de ayer.',
      readyDescription: 'Mira cómo funcionaría Sundae con tu operación, usando tus datos cuando estén disponibles o un escenario de restaurante representativo.',
      bookDemo: 'Reservar una sesión de trabajo',
      startFree: 'Comienza con Report Lite',
      brandDescription:
        'La plataforma de inteligencia de decisión para operadores multilocal. See every layer. Act in time.',
      global: 'Global',
      allCurrencies: 'Todas las monedas',
      sectionProduct: 'Producto',
      sectionSolutions: 'Soluciones',
      sectionResources: 'Recursos',
      sectionCompany: 'Empresa',
      pricing: 'Precios',
      privacy: 'Privacidad',
      terms: 'Términos',
      copyrightSuffix: 'Todos los derechos reservados.',
      companyLinks: [
        { name: 'Acerca de', href: '/about' },
        { name: 'Carreras', href: '/careers' },
        { name: 'Contacto', href: '/contact' },
        { name: 'Seguridad y cumplimiento', href: '/security' },
        { name: 'Integraciones', href: '/integrations' },
      ],
      extraResources: [
        { name: 'Primeros pasos', href: '/getting-started' },
      ],
    },
    home: {
      badge: 'Plataforma de inteligencia de decisión',
      titleTop: 'Inteligencia de decisión',
      titleBottom: 'para restaurantes multilocal',
      description:
        'Tus datos viven en el POS, el delivery, las reservas, el personal, el inventario y las finanzas. Sundae los reúne en una sola capa operativa nativa de IA - detecta qué cambió, explica por qué y',
      descriptionEmphasis: 'te muestra el siguiente movimiento antes de que acabe el turno.',
      narrativeAnchor: 'Del retraso del reporting a la velocidad operativa.',
      startFree: 'Reservar una demo',
      bookDemo: 'Reservar demo',
      noCard: 'No se requiere tarjeta de crédito',
      proofStats: [
        { number: '6', label: 'Capas de inteligencia, una sola verdad' },
        { number: '18', label: 'Decisiones reveladas hoy' },
        { number: '12', label: 'Dominios operativos unificados' },
        { number: '5 min', label: 'De la señal a la acción' },
      ],
      problem: {
        eyebrow: 'EL PROBLEMA',
        heading: 'Las brechas que te cuestan dinero cada día',
        description: 'Todos los grupos de restaurantes con los que trabajamos comparten los mismos puntos ciegos.',
        kpis: [
          { value: '12+', label: 'Fuentes de datos', supporting: 'Desconectadas en toda tu operación', color: 'red' },
          { value: '72 h+', label: 'Para cerrar libros', supporting: 'Y muchas veces tarda más de tres días', color: 'amber' },
          { value: '0%', label: 'Contexto de mercado', supporting: 'Sin benchmarks de pares para tus KPI', color: 'red' },
          { value: '$50K+', label: 'Fuga anual', supporting: 'Por mermas, cortesías y ajustes', color: 'amber' },
        ],
      },
      platform: {
        eyebrow: '6 CAPAS · UNA VERDAD',
        heading: 'Seis capas. Una verdad.',
        description: 'Del turno en vivo al plan a largo plazo: una plataforma, seis capas que se hablan entre sí.',
        countLabel: 'de 6',
        exploreModules: 'Explorar todos los módulos',
        learnMore: 'Saber más',
        layers: [
          { name: 'Pulse', subtitle: 'Operaciones en tiempo real', description: 'Ritmo en vivo, objetivos adaptativos, rendimiento del personal y fugas, turno a turno.', href: '/product/pulse' },
          { name: 'Benchmarks', subtitle: 'Inteligencia competitiva', description: 'Benchmarks anónimos de pares en más de 30 métricas. Sabe exactamente dónde estás.', href: '/benchmarking' },
          { name: 'Watchtower', subtitle: 'Inteligencia de mercado', description: 'Competencia, clima y eventos, antes de que toquen tus números.', href: '/product/watchtower' },
          { name: 'Insights', subtitle: '12 módulos analíticos', description: 'Ingresos, personal, inventario, marketing y delivery, cada uno con recomendaciones de IA.', href: '/insights' },
          { name: 'Sundae Intelligence', subtitle: 'IA conversacional', description: 'Pregúntale cualquier cosa a tus datos - respuestas con fuente en segundos en web, WhatsApp, Telegram, Slack o Teams.', href: '/intelligence' },
          { name: 'Foresight', subtitle: 'Inteligencia predictiva', description: 'Pronósticos, presupuestos y escenarios hipotéticos - con briefings ejecutivos autocorregibles.', href: '/product/foresight' },
        ],
      },
      modules: {
        eyebrow: 'MÓDULOS DE INTELIGENCIA',
        heading: 'Más de 30 módulos en 12 dominios',
        description: 'Cada dimensión del rendimiento del restaurante: analizada, comparada y accionable.',
        categories: [
          { name: 'Inteligencia de ingresos', count: '4 módulos' },
          { name: 'Inteligencia laboral', count: '5 módulos' },
          { name: 'Experiencia del cliente', count: '3 módulos' },
          { name: 'Inventario y desperdicio', count: '3 módulos' },
          { name: 'Compras', count: '3 módulos' },
          { name: 'Rendimiento de marketing', count: '3 módulos' },
          { name: 'Delivery y plataformas', count: '2 módulos' },
          { name: 'Reservas', count: '2 módulos' },
          { name: 'Aseguramiento de ingresos', count: '2 módulos' },
          { name: 'Inteligencia de beneficio', count: '3 módulos' },
          { name: 'CRM de clientes', count: '3 módulos' },
          { name: 'Cross-Intelligence', count: 'Motor de correlación' },
        ],
      },
      personas: {
        eyebrow: 'LO QUE ESCUCHAMOS DE OPERADORES',
        heading: 'Cada rol. Una sola plataforma.',
        description: 'Equipos distintos, preguntas distintas. Una sola fuente de verdad.',
        roles: [
          { title: 'Líderes de operaciones', pain: 'No puedes estar en todos los restaurantes al mismo tiempo.', outcome: 'Ritmo en vivo y rendimiento del personal en cada local: sabes quién necesita ayuda ahora.', attribution: 'Patrón entre operadores multilocal' },
          { title: 'Finanzas y FP&A', pain: '¿3 días para cerrar libros? Eso es demasiado tiempo.', outcome: 'Margen en tiempo real, costo laboral por turno y variaciones ligadas a la causa raíz.', attribution: 'Patrón en conversaciones con CFO' },
          { title: 'C-suite y propietarios', pain: 'Tu peor local no se hace visible hasta el jueves.', outcome: 'Vista de portafolio, briefings diarios con IA y señales de mercado, por cada marca.', attribution: 'Patrón entre fundadores y CEOs' },
          { title: 'Datos y tecnología', pain: '12 APIs. 5 formatos. Cero esquema unificado.', outcome: 'Pipelines limpios, métricas gobernadas, API pública, webhooks y RBAC listos.', attribution: 'Patrón entre líderes de datos' },
        ],
      },
      howItWorks: {
        eyebrow: 'CÓMO FUNCIONA',
        heading: 'De los datos a la decisión en cuatro pasos',
        steps: [
          { step: '01', title: 'Conectar', description: 'POS, personal, inventario y delivery: la mayoría de integraciones en menos de 5 minutos.' },
          { step: '02', title: 'Entender', description: 'La IA detecta anomalías y suma clima, eventos y señales de competencia.' },
          { step: '03', title: 'Decidir', description: 'Recomendaciones concretas y explicables: objetivos, staffing, menú y pricing.' },
          { step: '04', title: 'Mejorar', description: 'Cada decisión alimenta el sistema. Los playbooks se afinan y los pronósticos se precisan.' },
        ],
      },
      mockup: {
        frameLabel: 'Pulse - Ritmo de ventas',
        updatedAt: 'Martes, 7:42 PM',
        kpis: [
          { label: 'Ingresos', value: '$14,280', trend: '+12% vs objetivo', trendUp: true },
          { label: 'Cubiertos', value: '287', trend: '+12 vs plan', trendUp: true, color: '#22C55E' },
          { label: 'Ticket medio', value: '$49.50', trend: '-2.1%', trendUp: false, color: '#FBBF24' },
          { label: '% Labor', value: '28.4%', trend: 'Por debajo del objetivo 30%', trendUp: true, color: '#22C55E' },
        ],
        paceLabel: 'Ritmo de ingresos',
        tableHeaders: ['Mesero', 'Ventas', '% Upsell', 'Ticket medio'],
        tableRows: [
          ['Sarah M.', '$2,840', '32%', '$52.10'],
          ['Marcus J.', '$2,410', '28%', '$48.20'],
          ['James K.', '$1,960', '18%', '$44.50'],
        ],
        coachAlert: 'La tasa de upsell de James K. está 14% por debajo del promedio del turno. Considera emparejarlo con Sarah para las próximas 2 mesas.',
      },
      closingTitle: 'Deja de operar con los números de ayer.',
      closingDescription: '30 minutos. Tus datos. Lo que Sundae cambiaría realmente para tu equipo.',
      pages: {
        signIn: {
          metadataTitle: 'Iniciar sesión - Sundae',
          metadataDescription:
            'Inicia sesión en Sundae: tu vista unificada del rendimiento, las operaciones y la inteligencia competitiva para restaurantes.',
          brandTitle: 'Inteligencia de decisión para restaurantes',
          brandDescription:
            'Rendimiento, operaciones e inteligencia competitiva, en una sola plataforma.',
          trustPoints: [
            'Inteligencia operativa en tiempo real',
            'Benchmarking multisitio',
            'Señales de mercado competitivo',
          ],
          headingTitle: 'Inicia sesión en Sundae',
          headingDescription:
            'Tu vista unificada del rendimiento, las operaciones y la inteligencia competitiva.',
          ssoGoogle: 'Continuar con Google',
          ssoMicrosoft: 'Continuar con Microsoft',
          or: 'o',
          emailLabel: 'Correo electrónico',
          emailPlaceholder: 'tu@empresa.com',
          passwordLabel: 'Contraseña',
          passwordPlaceholder: 'Introduce tu contraseña',
          rememberMe: 'Recordarme',
          forgotPassword: '¿Olvidaste tu contraseña?',
          signingIn: 'Iniciando sesión...',
          redirecting: 'Redirigiendo...',
          signInButton: 'Iniciar sesión',
          continueToApp: 'Continuar a la app de Sundae',
          noAccount: '¿No tienes una cuenta?',
          getStartedFree: 'Empieza gratis',
          signInMainAppDescription:
            'El inicio de sesión ocurre en la aplicación principal de Sundae. Este sitio no almacena ni procesa tu contraseña.',
          signInMainAppBenefits: [
            'Accede al espacio de trabajo de tu organización',
            'Cambia entre ubicaciones y productos',
            'Gestiona el restablecimiento de contraseña y la recuperación de cuenta',
          ],
          footerTerms: 'Términos',
          footerPrivacy: 'Privacidad',
          footerSecurity: 'Seguridad y cumplimiento',
          footerSupport: 'Soporte',
          emailRequired: 'El correo electrónico es obligatorio',
          emailInvalid: 'Introduce una dirección de correo válida',
          passwordRequired: 'La contraseña es obligatoria',
          passwordMin: 'La contraseña debe tener al menos 6 caracteres',
          invalidCredentials: 'Correo electrónico o contraseña inválidos',
          genericError: 'Algo salió mal. Inténtalo de nuevo.',
        },
        demo: {
          metadataTitle: 'Reservar una demo',
          metadataDescription:
            'Mira Sundae en acción con tus propios datos de restaurante. Reserva una demo de 30 minutos centrada en tus cifras y en tus prioridades operativas.',
          badge: 'RESERVAR DEMO',
          title: '30 minutos. Tus datos. Respuestas reales.',
          description:
            'Conectaremos tu POS, mostraremos lo que significan realmente tus números y te dejaremos decidir si Sundae puede ahorrarte tiempo y dar más claridad al equipo.',
          requestTitle: 'Solicita tu demo',
          requestDescription:
            'Cuéntanos sobre tu operación y adaptaremos la sesión a tus prioridades.',
          ctaLabel: 'Reservar una demo',
          defaultMessage:
            'Me interesa ver cómo Sundae puede ayudar a las operaciones de mi restaurante.',
          whatYoullSeeTitle: 'Lo que verás',
          whatYoullSeeDescription: 'Un recorrido enfocado en torno a tu operación.',
          benefits: [
            {
              title: 'Tus datos, en vivo',
              description:
                'Conectamos tu POS y mostramos lo que realmente ocurre en tus ubicaciones, no una demo genérica con datos de muestra.',
              details: [
                'Integración POS en vivo',
                'Vista general multisitio',
                'Detección de anomalías en tiempo real',
                'Análisis de tendencias históricas',
              ],
            },
            {
              title: 'Tus puntos ciegos',
              description:
                'Sacaremos a la luz las brechas que no sabías que existían: fugas de ingresos, ineficiencias laborales y oportunidades perdidas en tus datos.',
              details: [
                'Patrones de fuga de ingresos',
                'Optimización de costos laborales',
                'Brechas de rendimiento del menú',
                'Anomalías operativas',
              ],
            },
            {
              title: 'Tus preguntas, respondidas',
              description:
                'Trae tus preguntas operativas más difíciles. Te mostraremos exactamente cómo las responde Sundae, o te diremos que no puede.',
              details: [
                'Integración con tu stack',
                'Precios según tu escala',
                'Cronograma de implementación',
                'Seguridad y cumplimiento de datos',
              ],
            },
          ],
          whyOperatorsTitle: 'Por qué los operadores toman la llamada',
          stats: [
            { stat: '30 min', label: 'Demo enfocada, sin relleno ni humo' },
            { stat: 'Tus datos', label: 'Usamos tus números reales, no un entorno de prueba' },
            { stat: 'Sin presión', label: 'Si no encaja, te lo diremos' },
            { stat: '24 h', label: 'La mayoría de las demos se programan en un día hábil' },
          ],
          ctaTitle: 'Mira lo que te estás perdiendo',
          ctaDescription: 'Treinta minutos para revisar tus datos y ver qué merece realmente la atención de tu equipo.',
          bookDemo: 'Reservar tu demo',
          viewPricing: 'Ver precios',
        },
        pricing: {
          metadataTitle: 'Precios - Sundae',
          metadataDescription:
            'Precios simples y transparentes para Sundae Report, Core, Watchtower y los módulos.',
          badge: 'Precios',
          title: 'Precios simples y transparentes',
          description:
            'Empieza gratis con Report. Escala a inteligencia en tiempo real con Core. Cada plan incluye créditos de Sundae Intelligence.',
          monthly: 'Mensual',
          annual: 'Anual',
          savePercent: 'Ahorra 10%',
          reportBadge: 'Sundae Report - Análisis histórico y benchmarking',
          coreBadge: 'Sundae Core - Operaciones en tiempo real e inteligencia predictiva',
          enterpriseBadge: 'Enterprise',
          enterpriseTitle: 'Precios personalizados para operaciones grandes',
          enterpriseDescription:
            'Para grupos multisitio que necesitan white-label, SSO, SLA personalizados y soporte dedicado. Incluye más de 50,000 créditos de inteligencia.',
          addOnsTitle: 'Complementos',
          addOnsDescription: 'Amplía tu plan con módulos de inteligencia especializados.',
          detailedPricingCalculator: 'Ver calculadora de precios detallada',
          faqTitle: 'Preguntas frecuentes',
          faqDescription: 'Respuestas claras. Sin letra pequeña.',
          ctaTitle: '¿Listo para empezar?',
          ctaDescription: 'Empieza gratis y mejora cuando estés listo. No se requiere tarjeta.',
          bookDemo: 'Reservar una demo',
          startFree: 'Empieza gratis',
        },
        faq: {
          metadataTitle: 'FAQ - Sundae',
          metadataDescription:
            'Preguntas frecuentes sobre Sundae: precios, integraciones, seguridad de datos, onboarding y todo lo que los operadores de restaurantes necesitan saber antes de empezar.',
          badge: 'Preguntas frecuentes',
          title: 'Todo lo que necesitas saber',
          description:
            'Encuentra respuestas a preguntas comunes sobre Sundae, nuestros productos, precios y cómo los operadores toman mejores decisiones.',
          jumpToCategory: 'Ir a categoría:',
          stillHaveQuestions: '¿Aún tienes preguntas?',
          helpDescription: 'Nuestro equipo está aquí para ayudarte. Reserva una demo, contacta con ventas o empieza gratis.',
          startFree: 'Empieza gratis',
          seePricing: 'Ver precios',
          bookDemo: 'Reservar demo',
          contactUs: 'Contáctanos',
          emailSupportPrefix: 'O escríbenos a:',
          categories: [
            'Inicio',
            'Productos y niveles',
            'Datos e integración',
            'Módulos',
            'Watchtower',
            'Precios y facturación',
            'Funciones y capacidades',
            'Soporte y formación',
            'Seguridad y cumplimiento',
            'Enterprise',
            'Preguntas comparativas',
            'Casos de uso específicos',
          ],
        },
        modules: {
          metadataTitle: 'Módulos - Sundae',
          badge: 'Módulos especializados',
          title: 'Profundiza donde más importa',
          description:
            'Añade módulos especializados a Sundae Core para obtener inteligencia operativa profunda en personal, inventario, compras, marketing y reservas.',
          mixAndMatch: 'Combínalos según tus prioridades.',
          exploreAllModules: 'Explorar todos los módulos',
          calculateModuleRoi: 'Calcular el ROI del módulo',
          whatAreModules: '¿Qué son los módulos de Sundae?',
          whatAreModulesDescription:
            'Los módulos son extensiones de inteligencia especializadas que profundizan tus análisis en áreas operativas concretas.',
          fiveModules: 'Cinco módulos especializados',
          chooseStack: 'Elige tu pila de inteligencia',
          chooseStackDescription: 'Añade un módulo o los cinco. Construye la inteligencia que necesita tu operación.',
          coreCapabilities: 'Capacidades principales:',
          roi: 'ROI',
          bestFor: 'Ideal para:',
          faqTitle: 'Preguntas frecuentes',
          faqDescription: 'Preguntas comunes sobre módulos, actualizaciones, precios e implementación.',
          ctaTitle: '¿Listo para añadir inteligencia especializada?',
          ctaDescription: 'Empieza con el módulo que resuelve tu mayor dolor.',
          bookDemo: 'Reservar una demo',
          contactSales: 'Contactar ventas',
          pillars: [
            { title: 'Especializado, no disperso', description: 'Funciones profundas creadas para cada área operativa.' },
            { title: 'Añade lo que necesitas', description: 'Empieza por tu mayor problema y añade módulos cuando cambien las prioridades.' },
            { title: 'Integrado, no aislado', description: 'Los módulos comparten datos con Core en una plataforma unificada.' },
          ],
        },
        integrations: {
          metadataTitle: 'Integraciones - Sundae',
          badge: 'Integraciones',
          title: 'Conecta todo. Unifica tus datos.',
          description:
            'Sundae se integra con más de 30 sistemas de restauración en POS, personal, inventario, reservas, delivery y más.',
          process: [
            { step: '1', title: 'Conectar', description: 'Autentica tus plataformas con OAuth o clave API; la mayoría de integraciones tardan menos de 5 minutos.' },
            { step: '2', title: 'Normalizar', description: 'Sundae Core limpia, mapea y unifica cada fuente de datos en un esquema coherente.' },
            { step: '3', title: 'Analizar', description: 'Los datos unificados alimentan dashboards, alertas y recomendaciones inteligentes.' },
          ],
          domainsTitle: '12 dominios de datos. Una vista unificada.',
          domainsDescription:
            'POS, personal, inventario, compras, reservas, delivery, marketing, experiencia del cliente, CRM, contabilidad y resúmenes diarios de ventas: todo conectado.',
          live: 'En vivo',
          upcoming: 'Próximamente',
          liveNow: 'En vivo - disponible ahora',
          roadmap: 'Próximamente - en nuestra hoja de ruta',
          roadmapDescription: 'Las integraciones futuras están en desarrollo activo. Escríbenos para priorizar una integración concreta.',
          webhooksTitle: 'Webhooks y Public API',
          webhooksDescription: 'Crea integraciones personalizadas con las herramientas de desarrollador de Sundae.',
          customWebhooks: 'Webhooks personalizados',
          customWebhooksDescription:
            'Configura webhooks para cualquier dominio de datos que no sea POS y envía datos a Sundae desde cualquier sistema HTTP.',
          publicApi: 'Public API',
          publicApiDescription:
            'Usa la API de Sundae para llevar analítica estructurada a tus propios flujos, herramientas y capas de reportes.',
          liveDomains: 'Disponible para los 12 dominios de datos',
          signatureVerification: 'Verificación de firma HMAC-SHA256',
          testPayloads: 'Payloads de prueba y seguimiento de entregas',
        },
        resources: {
          metadataTitle: 'Recursos - Sundae',
          badge: 'Recursos y herramientas',
          title: 'Recursos de inteligencia de decisión',
          description:
            'Accede a guías, informes y herramientas para tomar decisiones más inteligentes para tu restaurante.',
          getStarted: 'Empezar con Sundae',
          freeReport: 'Obtener un informe benchmark gratis',
          caseStudies: 'Casos de estudio',
          caseStudiesDescription:
            'Mira cómo los operadores usan Sundae para mejorar el rendimiento, los márgenes y la toma de decisiones.',
          caseStudiesNote: 'Ejemplos representativos basados en retos operativos reales; nombres de clientes omitidos.',
          segment: 'Segmento',
          challenge: 'Reto:',
          solution: 'Solución Sundae:',
          outcomes: 'Resultados:',
          exploreProducts: 'Explora los productos usados en estos casos de estudio:',
          toolsTitle: 'Herramientas y calculadoras gratis',
          toolsDescription:
            'Prueba las calculadoras gratis de Sundae para costes de personal, márgenes de menú, readiness benchmark y más.',
          exploreTools: 'Explorar todas las herramientas',
          stayUpdated: 'Mantente actualizado',
          newsletterDescription:
            'Recibe los últimos insights del sector, benchmarks y tendencias de decision intelligence directamente en tu correo.',
          subscribe: 'Suscribirse',
          privacyNote: 'Respetamos tu privacidad. Puedes darte de baja en cualquier momento.',
          ctaTitle: '¿Listo para transformar tu restaurante?',
          ctaDescription:
            'Únete a miles de operadores que usan Sundae para tomar decisiones más inteligentes y basadas en datos.',
          bookDemo: 'Reservar una demo',
          contactSales: 'Contactar ventas',
        },
      },
    },
  },
} as const

type WidenLiterals<T> =
  T extends string ? string :
  T extends number ? number :
  T extends boolean ? boolean :
  T extends readonly (infer U)[] ? WidenLiterals<U>[] :
  T extends object ? { [K in keyof T]: WidenLiterals<T[K]> } :
  T

type WebsiteMessagesBase = WidenLiterals<typeof websiteMessages.en>

export type WebsiteMessages = WebsiteMessagesBase & {
  pages: WebsiteMessagesBase['home']['pages']
}

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends readonly (infer U)[]
    ? readonly DeepPartial<U>[]
    : T[K] extends object
      ? DeepPartial<T[K]>
      : T[K]
}

const expandedLocaleMessageOverrides = {
  de: {
    metadata: {
      title: 'Sundae - Entscheidungsintelligenz für Restaurants',
      description:
        'Die Entscheidungsintelligenz-Plattform für Restaurants - vereinheitlicht POS-, Personal-, Kosten- und Betriebsdaten, vergleicht die Leistung und macht daraus den nächsten richtigen Schritt.',
    },
    layout: {
      skipToContent: 'Zum Hauptinhalt springen',
      languageSelector: 'Sprache',
    },
    navbar: {
      products: 'Produkte',
      solutions: 'Lösungen',
      resources: 'Ressourcen',
      company: 'Unternehmen',
      intelligence: 'Intelligenz',
      plans: 'Pläne',
      bySegment: 'Nach Segment',
      byRole: 'Nach Rolle',
      learn: 'Lernen',
      pricing: 'Preise',
      about: 'Über uns',
      signIn: 'Anmelden',
      bookDemo: 'Demo buchen',
      comparePlans: 'Pläne vergleichen →',
      startFree: 'Kostenlos starten →',
    },
    footer: {
      readyTitle: 'Bereit zu sehen, was Ihnen entgeht?',
      readyDescription: 'Schließen Sie sich Betreibern an, die vom Raten zum Wissen gewechselt sind.',
      bookDemo: 'Demo buchen',
      startFree: 'Kostenlos mit Report starten',
      global: 'Global',
      allCurrencies: 'Alle Währungen',
      sectionProduct: 'Produkt',
      sectionSolutions: 'Lösungen',
      sectionResources: 'Ressourcen',
      sectionCompany: 'Unternehmen',
      pricing: 'Preise',
      privacy: 'Datenschutz',
      terms: 'Bedingungen',
      copyrightSuffix: 'Alle Rechte vorbehalten.',
    },
  },
  nl: {
    metadata: {
      title: 'Sundae - beslissingsintelligentie voor restaurants',
      description:
        'Het beslissingsintelligentie-platform voor restaurants - brengt POS-, personeels-, kosten- en operationele data samen, benchmarkt prestaties en maakt er de juiste volgende stap van.',
    },
    layout: {
      skipToContent: 'Ga naar hoofdinhoud',
      languageSelector: 'Taal',
    },
    navbar: {
      products: 'Producten',
      solutions: 'Oplossingen',
      resources: 'Bronnen',
      company: 'Bedrijf',
      intelligence: 'Intelligentie',
      plans: 'Pakketten',
      bySegment: 'Per segment',
      byRole: 'Per rol',
      learn: 'Leren',
      pricing: 'Prijzen',
      about: 'Over ons',
      signIn: 'Inloggen',
      bookDemo: 'Demo boeken',
      comparePlans: 'Pakketten vergelijken →',
      startFree: 'Gratis starten →',
    },
    footer: {
      readyTitle: 'Klaar om te zien wat u mist?',
      readyDescription: 'Sluit u aan bij operators die niet meer gokken maar weten.',
      bookDemo: 'Demo boeken',
      startFree: 'Gratis starten met Report',
      global: 'Wereldwijd',
      allCurrencies: 'Alle valuta',
      sectionProduct: 'Product',
      sectionSolutions: 'Oplossingen',
      sectionResources: 'Bronnen',
      sectionCompany: 'Bedrijf',
      pricing: 'Prijzen',
      privacy: 'Privacy',
      terms: 'Voorwaarden',
      copyrightSuffix: 'Alle rechten voorbehouden.',
    },
  },
  pt: {
    metadata: {
      title: 'Sundae - inteligência de decisão para restaurantes',
      description:
        'A plataforma de inteligência de decisão para restaurantes - unifica POS, equipe, custos e operações para comparar o desempenho e transformá-lo no próximo passo certo.',
    },
    layout: {
      skipToContent: 'Ir para o conteúdo principal',
      languageSelector: 'Idioma',
    },
    navbar: {
      products: 'Produtos',
      solutions: 'Soluções',
      resources: 'Recursos',
      company: 'Empresa',
      intelligence: 'Inteligência',
      plans: 'Planos',
      bySegment: 'Por segmento',
      byRole: 'Por função',
      learn: 'Aprender',
      pricing: 'Preços',
      about: 'Sobre',
      signIn: 'Entrar',
      bookDemo: 'Agendar demo',
      comparePlans: 'Comparar planos →',
      startFree: 'Começar grátis →',
    },
    footer: {
      readyTitle: 'Pronto para ver o que está faltando?',
      readyDescription: 'Junte-se a operadores que saíram do palpite e passaram a decidir com clareza.',
      bookDemo: 'Agendar demo',
      startFree: 'Começar grátis com Report',
      global: 'Global',
      allCurrencies: 'Todas as moedas',
      sectionProduct: 'Produto',
      sectionSolutions: 'Soluções',
      sectionResources: 'Recursos',
      sectionCompany: 'Empresa',
      pricing: 'Preços',
      privacy: 'Privacidade',
      terms: 'Termos',
      copyrightSuffix: 'Todos os direitos reservados.',
    },
  },
  hi: {
    metadata: {
      title: 'Sundae - रेस्टोरेंट्स के लिए निर्णय इंटेलिजेंस',
      description:
        'रेस्टोरेंट के लिए डिसीज़न इंटेलिजेंस प्लेटफॉर्म - POS, श्रम, लागत और ऑपरेशनल डेटा को जोड़कर प्रदर्शन की तुलना करें और उसे अगले सही कदम में बदलें।',
    },
    layout: {
      skipToContent: 'मुख्य सामग्री पर जाएं',
      languageSelector: 'भाषा',
    },
    navbar: {
      products: 'उत्पाद',
      solutions: 'समाधान',
      resources: 'संसाधन',
      company: 'कंपनी',
      intelligence: 'इंटेलिजेंस',
      plans: 'प्लान',
      bySegment: 'सेगमेंट के अनुसार',
      byRole: 'भूमिका के अनुसार',
      learn: 'सीखें',
      pricing: 'कीमतें',
      about: 'परिचय',
      signIn: 'साइन इन',
      bookDemo: 'डेमो बुक करें',
      comparePlans: 'प्लान तुलना करें →',
      startFree: 'मुफ्त शुरू करें →',
    },
    footer: {
      readyTitle: 'क्या आप देखना चाहते हैं कि आप क्या मिस कर रहे हैं?',
      readyDescription: 'उन ऑपरेटरों से जुड़ें जो अनुमान से स्पष्ट निर्णय तक पहुंच चुके हैं.',
      bookDemo: 'डेमो बुक करें',
      startFree: 'Report के साथ मुफ्त शुरू करें',
      global: 'वैश्विक',
      allCurrencies: 'सभी मुद्राएं',
      sectionProduct: 'उत्पाद',
      sectionSolutions: 'समाधान',
      sectionResources: 'संसाधन',
      sectionCompany: 'कंपनी',
      pricing: 'कीमतें',
      privacy: 'गोपनीयता',
      terms: 'शर्तें',
      copyrightSuffix: 'सर्वाधिकार सुरक्षित.',
    },
  },
  ur: {
    metadata: {
      title: 'Sundae - ریستورانوں کے لیے فیصلہ سازی انٹیلیجنس',
      description:
        'ریستورانوں کے لیے ڈیسیژن انٹیلی جنس پلیٹ فارم - POS، عملہ، لاگت اور آپریشنل ڈیٹا کو یکجا کر کے کارکردگی کا موازنہ کریں اور اسے اگلے درست قدم میں بدلیں۔',
    },
    layout: {
      skipToContent: 'مرکزی مواد پر جائیں',
      languageSelector: 'زبان',
    },
    navbar: {
      products: 'مصنوعات',
      solutions: 'حل',
      resources: 'وسائل',
      company: 'کمپنی',
      intelligence: 'انٹیلیجنس',
      plans: 'پلانز',
      bySegment: 'طبقے کے حساب سے',
      byRole: 'کردار کے حساب سے',
      learn: 'سیکھیں',
      pricing: 'قیمتیں',
      about: 'تعارف',
      signIn: 'سائن ان',
      bookDemo: 'ڈیمو بک کریں',
      comparePlans: 'پلانز کا موازنہ →',
      startFree: 'مفت شروع کریں →',
    },
    footer: {
      readyTitle: 'کیا آپ دیکھنا چاہتے ہیں کہ آپ سے کیا رہ رہا ہے؟',
      readyDescription: 'ان آپریٹرز میں شامل ہوں جو اندازے سے یقین تک پہنچ چکے ہیں۔',
      bookDemo: 'ڈیمو بک کریں',
      startFree: 'Report کے ساتھ مفت شروع کریں',
      global: 'عالمی',
      allCurrencies: 'تمام کرنسیاں',
      sectionProduct: 'مصنوعات',
      sectionSolutions: 'حل',
      sectionResources: 'وسائل',
      sectionCompany: 'کمپنی',
      pricing: 'قیمتیں',
      privacy: 'رازداری',
      terms: 'شرائط',
      copyrightSuffix: 'جملہ حقوق محفوظ ہیں۔',
    },
  },
  it: {
    metadata: {
      title: 'Sundae - intelligence decisionale per ristoranti',
      description:
        'La piattaforma di decision intelligence per i ristoranti - unifica POS, personale, costi e operazioni per confrontare le prestazioni e trasformarle nella prossima mossa giusta.',
    },
    layout: { skipToContent: 'Vai al contenuto principale', languageSelector: 'Lingua' },
    navbar: {
      products: 'Prodotti',
      solutions: 'Soluzioni',
      resources: 'Risorse',
      company: 'Azienda',
      intelligence: 'Intelligence',
      plans: 'Piani',
      bySegment: 'Per segmento',
      byRole: 'Per ruolo',
      learn: 'Impara',
      pricing: 'Prezzi',
      about: 'Chi siamo',
      signIn: 'Accedi',
      bookDemo: 'Prenota demo',
      comparePlans: 'Confronta piani →',
      startFree: 'Inizia gratis →',
    },
    footer: {
      readyTitle: 'Pronto a vedere cosa ti stai perdendo?',
      readyDescription: 'Unisciti agli operatori che sono passati dalle ipotesi alla chiarezza.',
      bookDemo: 'Prenota demo',
      startFree: 'Inizia gratis con Report',
      global: 'Globale',
      allCurrencies: 'Tutte le valute',
      sectionProduct: 'Prodotto',
      sectionSolutions: 'Soluzioni',
      sectionResources: 'Risorse',
      sectionCompany: 'Azienda',
      pricing: 'Prezzi',
      privacy: 'Privacy',
      terms: 'Termini',
      copyrightSuffix: 'Tutti i diritti riservati.',
    },
  },
  pl: {
    metadata: {
      title: 'Sundae - inteligencja decyzyjna dla restauracji',
      description:
        'Platforma decision intelligence dla restauracji - łączy POS, pracowników, koszty i operacje, aby porównywać wyniki i zamieniać je w kolejny właściwy ruch.',
    },
    layout: { skipToContent: 'Przejdź do treści głównej', languageSelector: 'Język' },
    navbar: {
      products: 'Produkty',
      solutions: 'Rozwiązania',
      resources: 'Zasoby',
      company: 'Firma',
      intelligence: 'Inteligencja',
      plans: 'Plany',
      bySegment: 'Według segmentu',
      byRole: 'Według roli',
      learn: 'Nauka',
      pricing: 'Cennik',
      about: 'O nas',
      signIn: 'Zaloguj',
      bookDemo: 'Umów demo',
      comparePlans: 'Porównaj plany →',
      startFree: 'Zacznij za darmo →',
    },
    footer: {
      readyTitle: 'Gotowy zobaczyć, co Ci umyka?',
      readyDescription: 'Dołącz do operatorów, którzy przeszli od zgadywania do jasnych decyzji.',
      bookDemo: 'Umów demo',
      startFree: 'Zacznij za darmo z Report',
      global: 'Globalnie',
      allCurrencies: 'Wszystkie waluty',
      sectionProduct: 'Produkt',
      sectionSolutions: 'Rozwiązania',
      sectionResources: 'Zasoby',
      sectionCompany: 'Firma',
      pricing: 'Cennik',
      privacy: 'Prywatność',
      terms: 'Warunki',
      copyrightSuffix: 'Wszelkie prawa zastrzeżone.',
    },
  },
  tr: {
    metadata: {
      title: 'Sundae - restoranlar için karar zekası',
      description:
        'Restoranlar için karar zekâsı platformu - POS, ekip, maliyet ve operasyon verilerini birleştirir, performansı kıyaslar ve bir sonraki doğru hamleye dönüştürür.',
    },
    layout: { skipToContent: 'Ana içeriğe geç', languageSelector: 'Dil' },
    navbar: {
      products: 'Ürünler',
      solutions: 'Çözümler',
      resources: 'Kaynaklar',
      company: 'Şirket',
      intelligence: 'Zeka',
      plans: 'Planlar',
      bySegment: 'Segmente göre',
      byRole: 'Role göre',
      learn: 'Öğren',
      pricing: 'Fiyatlandırma',
      about: 'Hakkımızda',
      signIn: 'Giriş yap',
      bookDemo: 'Demo al',
      comparePlans: 'Planları karşılaştır →',
      startFree: 'Ücretsiz başla →',
    },
    footer: {
      readyTitle: 'Neyi kaçırdığınızı görmeye hazır mısınız?',
      readyDescription: 'Tahminden net karara geçen operatörlere katılın.',
      bookDemo: 'Demo al',
      startFree: 'Report ile ücretsiz başla',
      global: 'Küresel',
      allCurrencies: 'Tüm para birimleri',
      sectionProduct: 'Ürün',
      sectionSolutions: 'Çözümler',
      sectionResources: 'Kaynaklar',
      sectionCompany: 'Şirket',
      pricing: 'Fiyatlandırma',
      privacy: 'Gizlilik',
      terms: 'Şartlar',
      copyrightSuffix: 'Tüm hakları saklıdır.',
    },
  },
  'zh-Hans': {
    metadata: {
      title: 'Sundae - 面向餐厅的决策智能',
      description:
        '面向餐厅的决策智能平台--统一 POS、人员、成本和运营数据，对比绩效，并将其转化为下一步正确的行动。',
    },
    layout: { skipToContent: '跳到主要内容', languageSelector: '语言' },
    navbar: {
      products: '产品',
      solutions: '解决方案',
      resources: '资源',
      company: '公司',
      intelligence: '智能',
      plans: '方案',
      bySegment: '按细分',
      byRole: '按角色',
      learn: '学习',
      pricing: '价格',
      about: '关于我们',
      signIn: '登录',
      bookDemo: '预约演示',
      comparePlans: '比较方案 →',
      startFree: '免费开始 →',
    },
    footer: {
      readyTitle: '准备好看看您错过了什么吗？',
      readyDescription: '加入已经从猜测转向清晰决策的运营者。',
      bookDemo: '预约演示',
      startFree: '从 Report 免费开始',
      global: '全球',
      allCurrencies: '所有货币',
      sectionProduct: '产品',
      sectionSolutions: '解决方案',
      sectionResources: '资源',
      sectionCompany: '公司',
      pricing: '价格',
      privacy: '隐私',
      terms: '条款',
      copyrightSuffix: '保留所有权利。',
    },
  },
  ja: {
    metadata: {
      title: 'Sundae - レストランのための意思決定インテリジェンス',
      description:
        'レストランのための意思決定インテリジェンス・プラットフォーム。POS、人員、コスト、運営データを統合し、成果を比較して次の最善手に変えます。',
    },
    layout: { skipToContent: 'メインコンテンツへ移動', languageSelector: '言語' },
    navbar: {
      products: '製品',
      solutions: 'ソリューション',
      resources: 'リソース',
      company: '会社',
      intelligence: 'インテリジェンス',
      plans: 'プラン',
      bySegment: 'セグメント別',
      byRole: '役割別',
      learn: '学ぶ',
      pricing: '料金',
      about: '会社情報',
      signIn: 'サインイン',
      bookDemo: 'デモを予約',
      comparePlans: 'プランを比較 →',
      startFree: '無料で開始 →',
    },
    footer: {
      readyTitle: '見落としているものを確認しませんか？',
      readyDescription: '勘に頼る運営から、確かな判断へ移行したオペレーターに加わりましょう。',
      bookDemo: 'デモを予約',
      startFree: 'Report で無料開始',
      global: 'グローバル',
      allCurrencies: 'すべての通貨',
      sectionProduct: '製品',
      sectionSolutions: 'ソリューション',
      sectionResources: 'リソース',
      sectionCompany: '会社',
      pricing: '料金',
      privacy: 'プライバシー',
      terms: '利用規約',
      copyrightSuffix: 'All rights reserved.',
    },
  },
  ko: {
    metadata: {
      title: 'Sundae - 레스토랑을 위한 의사결정 인텔리전스',
      description:
        '레스토랑을 위한 의사결정 인텔리전스 플랫폼입니다. POS, 인력, 비용, 운영 데이터를 통합하고 성과를 비교해 다음 최선의 결정으로 바꿉니다.',
    },
    layout: { skipToContent: '본문으로 건너뛰기', languageSelector: '언어' },
    navbar: {
      products: '제품',
      solutions: '솔루션',
      resources: '리소스',
      company: '회사',
      intelligence: '인텔리전스',
      plans: '플랜',
      bySegment: '세그먼트별',
      byRole: '역할별',
      learn: '학습',
      pricing: '가격',
      about: '회사 소개',
      signIn: '로그인',
      bookDemo: '데모 예약',
      comparePlans: '플랜 비교 →',
      startFree: '무료 시작 →',
    },
    footer: {
      readyTitle: '놓치고 있는 것을 확인할 준비가 되셨나요?',
      readyDescription: '감이 아닌 명확한 판단으로 전환한 운영자들과 함께하세요.',
      bookDemo: '데모 예약',
      startFree: 'Report로 무료 시작',
      global: '글로벌',
      allCurrencies: '모든 통화',
      sectionProduct: '제품',
      sectionSolutions: '솔루션',
      sectionResources: '리소스',
      sectionCompany: '회사',
      pricing: '가격',
      privacy: '개인정보',
      terms: '약관',
      copyrightSuffix: '모든 권리 보유.',
    },
  },
  id: {
    metadata: {
      title: 'Sundae - intelijen keputusan untuk restoran',
      description:
        'Platform decision intelligence untuk restoran - menyatukan POS, tenaga kerja, biaya, dan operasi untuk membandingkan kinerja dan mengubahnya menjadi langkah tepat berikutnya.',
    },
    layout: { skipToContent: 'Lewati ke konten utama', languageSelector: 'Bahasa' },
    navbar: {
      products: 'Produk',
      solutions: 'Solusi',
      resources: 'Sumber daya',
      company: 'Perusahaan',
      intelligence: 'Intelijen',
      plans: 'Paket',
      bySegment: 'Menurut segmen',
      byRole: 'Menurut peran',
      learn: 'Pelajari',
      pricing: 'Harga',
      about: 'Tentang',
      signIn: 'Masuk',
      bookDemo: 'Pesan demo',
      comparePlans: 'Bandingkan paket →',
      startFree: 'Mulai gratis →',
    },
    footer: {
      readyTitle: 'Siap melihat apa yang Anda lewatkan?',
      readyDescription: 'Bergabunglah dengan operator yang beralih dari menebak ke keputusan yang jelas.',
      bookDemo: 'Pesan demo',
      startFree: 'Mulai gratis dengan Report',
      global: 'Global',
      allCurrencies: 'Semua mata uang',
      sectionProduct: 'Produk',
      sectionSolutions: 'Solusi',
      sectionResources: 'Sumber daya',
      sectionCompany: 'Perusahaan',
      pricing: 'Harga',
      privacy: 'Privasi',
      terms: 'Ketentuan',
      copyrightSuffix: 'Hak cipta dilindungi.',
    },
  },
  vi: {
    metadata: {
      title: 'Sundae - trí tuệ quyết định cho nhà hàng',
      description:
        'Nền tảng trí tuệ quyết định cho nhà hàng - hợp nhất POS, nhân sự, chi phí và vận hành để so sánh hiệu suất và biến nó thành nước đi đúng tiếp theo.',
    },
    layout: { skipToContent: 'Chuyển đến nội dung chính', languageSelector: 'Ngôn ngữ' },
    navbar: {
      products: 'Sản phẩm',
      solutions: 'Giải pháp',
      resources: 'Tài nguyên',
      company: 'Công ty',
      intelligence: 'Trí tuệ',
      plans: 'Gói',
      bySegment: 'Theo phân khúc',
      byRole: 'Theo vai trò',
      learn: 'Tìm hiểu',
      pricing: 'Giá',
      about: 'Giới thiệu',
      signIn: 'Đăng nhập',
      bookDemo: 'Đặt demo',
      comparePlans: 'So sánh gói →',
      startFree: 'Bắt đầu miễn phí →',
    },
    footer: {
      readyTitle: 'Sẵn sàng xem bạn đang bỏ lỡ điều gì?',
      readyDescription: 'Tham gia cùng các nhà vận hành đã chuyển từ phỏng đoán sang quyết định rõ ràng.',
      bookDemo: 'Đặt demo',
      startFree: 'Bắt đầu miễn phí với Report',
      global: 'Toàn cầu',
      allCurrencies: 'Tất cả tiền tệ',
      sectionProduct: 'Sản phẩm',
      sectionSolutions: 'Giải pháp',
      sectionResources: 'Tài nguyên',
      sectionCompany: 'Công ty',
      pricing: 'Giá',
      privacy: 'Quyền riêng tư',
      terms: 'Điều khoản',
      copyrightSuffix: 'Đã đăng ký bản quyền.',
    },
  },
  ro: {
    metadata: {
      title: 'Sundae - inteligență decizională pentru restaurante',
      description:
        'Platforma de decision intelligence pentru restaurante - unește POS, personal, costuri și operațiuni pentru a compara performanța și a o transforma în următoarea mișcare corectă.',
    },
    layout: { skipToContent: 'Sari la conținutul principal', languageSelector: 'Limbă' },
    navbar: {
      products: 'Produse',
      solutions: 'Soluții',
      resources: 'Resurse',
      company: 'Companie',
      intelligence: 'Inteligență',
      plans: 'Planuri',
      bySegment: 'După segment',
      byRole: 'După rol',
      learn: 'Învață',
      pricing: 'Prețuri',
      about: 'Despre',
      signIn: 'Autentificare',
      bookDemo: 'Programează demo',
      comparePlans: 'Compară planuri →',
      startFree: 'Începe gratuit →',
    },
    footer: {
      readyTitle: 'Gata să vezi ce îți scapă?',
      readyDescription: 'Alătură-te operatorilor care au trecut de la presupuneri la claritate.',
      bookDemo: 'Programează demo',
      startFree: 'Începe gratuit cu Report',
      global: 'Global',
      allCurrencies: 'Toate monedele',
      sectionProduct: 'Produs',
      sectionSolutions: 'Soluții',
      sectionResources: 'Resurse',
      sectionCompany: 'Companie',
      pricing: 'Prețuri',
      privacy: 'Confidențialitate',
      terms: 'Termeni',
      copyrightSuffix: 'Toate drepturile rezervate.',
    },
  },
  sv: {
    metadata: {
      title: 'Sundae - beslutsintelligens för restauranger',
      description:
        'Beslutsintelligens-plattformen för restauranger - förenar POS, personal, kostnader och drift för att jämföra resultat och göra det till nästa rätta drag.',
    },
    layout: { skipToContent: 'Gå till huvudinnehåll', languageSelector: 'Språk' },
    navbar: {
      products: 'Produkter',
      solutions: 'Lösningar',
      resources: 'Resurser',
      company: 'Företag',
      intelligence: 'Intelligens',
      plans: 'Planer',
      bySegment: 'Efter segment',
      byRole: 'Efter roll',
      learn: 'Lär dig',
      pricing: 'Priser',
      about: 'Om oss',
      signIn: 'Logga in',
      bookDemo: 'Boka demo',
      comparePlans: 'Jämför planer →',
      startFree: 'Starta gratis →',
    },
    footer: {
      readyTitle: 'Redo att se vad du missar?',
      readyDescription: 'Gå med operatörer som gått från gissningar till tydlighet.',
      bookDemo: 'Boka demo',
      startFree: 'Starta gratis med Report',
      global: 'Globalt',
      allCurrencies: 'Alla valutor',
      sectionProduct: 'Produkt',
      sectionSolutions: 'Lösningar',
      sectionResources: 'Resurser',
      sectionCompany: 'Företag',
      pricing: 'Priser',
      privacy: 'Integritet',
      terms: 'Villkor',
      copyrightSuffix: 'Alla rättigheter förbehållna.',
    },
  },
  bn: {
    metadata: {
      title: 'Sundae - রেস্তোরাঁর জন্য সিদ্ধান্ত বুদ্ধিমত্তা',
      description:
        'রেস্তোরাঁর জন্য ডিসিশন ইন্টেলিজেন্স প্ল্যাটফর্ম - POS, কর্মী, খরচ ও অপারেশন একত্র করে পারফরম্যান্স তুলনা করুন এবং তা পরের সঠিক পদক্ষেপে রূপান্তর করুন।',
    },
    layout: { skipToContent: 'মূল কনটেন্টে যান', languageSelector: 'ভাষা' },
    navbar: {
      products: 'পণ্য',
      solutions: 'সমাধান',
      resources: 'রিসোর্স',
      company: 'কোম্পানি',
      intelligence: 'ইন্টেলিজেন্স',
      plans: 'প্ল্যান',
      bySegment: 'সেগমেন্ট অনুযায়ী',
      byRole: 'ভূমিকা অনুযায়ী',
      learn: 'শিখুন',
      pricing: 'মূল্য',
      about: 'সম্পর্কে',
      signIn: 'সাইন ইন',
      bookDemo: 'ডেমো বুক করুন',
      comparePlans: 'প্ল্যান তুলনা করুন →',
      startFree: 'বিনামূল্যে শুরু করুন →',
    },
    footer: {
      readyTitle: 'আপনি কী মিস করছেন তা দেখতে প্রস্তুত?',
      readyDescription: 'যারা অনুমান থেকে স্পষ্ট সিদ্ধান্তে গেছে, সেই অপারেটরদের সাথে যোগ দিন।',
      bookDemo: 'ডেমো বুক করুন',
      startFree: 'Report দিয়ে বিনামূল্যে শুরু করুন',
      global: 'গ্লোবাল',
      allCurrencies: 'সব মুদ্রা',
      sectionProduct: 'পণ্য',
      sectionSolutions: 'সমাধান',
      sectionResources: 'রিসোর্স',
      sectionCompany: 'কোম্পানি',
      pricing: 'মূল্য',
      privacy: 'গোপনীয়তা',
      terms: 'শর্তাবলি',
      copyrightSuffix: 'সর্বস্বত্ব সংরক্ষিত।',
    },
  },
  th: {
    metadata: {
      title: 'Sundae - ข่าวกรองการตัดสินใจสำหรับร้านอาหาร',
      description:
        'แพลตฟอร์ม AI ที่เปลี่ยนข้อมูลร้านอาหารให้เป็นการลงมือทำ: รวม POS พนักงาน ต้นทุน และการดำเนินงาน เพื่อเปรียบเทียบผลงานและรับอินไซต์ทันที',
    },
    layout: { skipToContent: 'ข้ามไปยังเนื้อหาหลัก', languageSelector: 'ภาษา' },
    navbar: {
      products: 'ผลิตภัณฑ์',
      solutions: 'โซลูชัน',
      resources: 'แหล่งข้อมูล',
      company: 'บริษัท',
      intelligence: 'อินเทลลิเจนซ์',
      plans: 'แพ็กเกจ',
      bySegment: 'ตามกลุ่ม',
      byRole: 'ตามบทบาท',
      learn: 'เรียนรู้',
      pricing: 'ราคา',
      about: 'เกี่ยวกับ',
      signIn: 'เข้าสู่ระบบ',
      bookDemo: 'จองเดโม',
      comparePlans: 'เปรียบเทียบแพ็กเกจ →',
      startFree: 'เริ่มฟรี →',
    },
    footer: {
      readyTitle: 'พร้อมดูสิ่งที่คุณพลาดไปหรือยัง?',
      readyDescription: 'เข้าร่วมกับผู้ประกอบการที่เปลี่ยนจากการคาดเดาเป็นความชัดเจน',
      bookDemo: 'จองเดโม',
      startFree: 'เริ่มฟรีด้วย Report',
      global: 'ทั่วโลก',
      allCurrencies: 'ทุกสกุลเงิน',
      sectionProduct: 'ผลิตภัณฑ์',
      sectionSolutions: 'โซลูชัน',
      sectionResources: 'แหล่งข้อมูล',
      sectionCompany: 'บริษัท',
      pricing: 'ราคา',
      privacy: 'ความเป็นส่วนตัว',
      terms: 'ข้อกำหนด',
      copyrightSuffix: 'สงวนลิขสิทธิ์',
    },
  },
  ms: {
    metadata: {
      title: 'Sundae - kecerdasan keputusan untuk restoran',
      description:
        'Platform AI yang menukar data restoran kepada tindakan: satukan POS, tenaga kerja, kos dan operasi untuk membandingkan prestasi serta mendapatkan insight segera.',
    },
    layout: { skipToContent: 'Langkau ke kandungan utama', languageSelector: 'Bahasa' },
    navbar: {
      products: 'Produk',
      solutions: 'Penyelesaian',
      resources: 'Sumber',
      company: 'Syarikat',
      intelligence: 'Kecerdasan',
      plans: 'Pelan',
      bySegment: 'Mengikut segmen',
      byRole: 'Mengikut peranan',
      learn: 'Belajar',
      pricing: 'Harga',
      about: 'Tentang',
      signIn: 'Log masuk',
      bookDemo: 'Tempah demo',
      comparePlans: 'Bandingkan pelan →',
      startFree: 'Mula percuma →',
    },
    footer: {
      readyTitle: 'Bersedia melihat apa yang anda terlepas?',
      readyDescription: 'Sertai operator yang telah beralih daripada tekaan kepada kejelasan.',
      bookDemo: 'Tempah demo',
      startFree: 'Mula percuma dengan Report',
      global: 'Global',
      allCurrencies: 'Semua mata wang',
      sectionProduct: 'Produk',
      sectionSolutions: 'Penyelesaian',
      sectionResources: 'Sumber',
      sectionCompany: 'Syarikat',
      pricing: 'Harga',
      privacy: 'Privasi',
      terms: 'Terma',
      copyrightSuffix: 'Hak cipta terpelihara.',
    },
  },
} satisfies Partial<Record<WebsiteLocale, DeepPartial<WebsiteMessagesBase>>>

const expandedLocaleOverridesByLocale = {
  ...expandedLocaleMessageOverrides,
  ...generatedWebsiteMessageOverrides,
} as unknown as Partial<Record<WebsiteLocale, DeepPartial<WebsiteMessagesBase>>>

function mergeDeep<T>(base: T, override?: DeepPartial<T>): T {
  if (!override) return base
  const merged: Record<string, unknown> = { ...(base as Record<string, unknown>) }

  for (const [key, value] of Object.entries(override)) {
    if (value === undefined) continue
    const baseValue = merged[key]
    const canMergeObject =
      value !== null &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      baseValue !== null &&
      typeof baseValue === 'object' &&
      !Array.isArray(baseValue)

    merged[key] = canMergeObject
      ? mergeDeep(baseValue, value as DeepPartial<typeof baseValue>)
      : value
  }

  return merged as T
}

export function getWebsiteMessages(locale: WebsiteLocale): WebsiteMessages {
  const sourceMessages =
    locale in websiteMessages
      ? websiteMessages[locale as keyof typeof websiteMessages]
      : mergeDeep(websiteMessages.en as unknown as WebsiteMessagesBase, expandedLocaleOverridesByLocale[locale])
  const messages = sourceMessages as WebsiteMessagesBase
  return {
    ...messages,
    pages: messages.home.pages,
  }
}
