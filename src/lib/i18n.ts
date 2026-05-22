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

export function normalizeWebsiteLocale(locale?: string | null): WebsiteLocale {
  if (!locale) return defaultWebsiteLocale
  const normalized = locale.trim().toLowerCase()
  if ((websiteLocales as readonly string[]).includes(normalized)) {
    return normalized as WebsiteLocale
  }
  const prefix = normalized.split('-')[0]
  if ((websiteLocales as readonly string[]).includes(prefix)) {
    return prefix as WebsiteLocale
  }
  return defaultWebsiteLocale
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

  if ((websiteLocales as readonly string[]).includes(firstSegment)) {
    const locale = firstSegment as WebsiteLocale
    const pathnameWithoutLocale = `/${segments.slice(1).join('/')}` || '/'
    return {
      locale,
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
      title: 'Sundae – Decision Intelligence for Restaurants',
      description:
        'The AI platform that turns restaurant data into action — unify POS, labor, cost, and operational data to benchmark performance and get instant insights.',
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
      bookDemo: 'Book Demo',
      comparePlans: 'Compare Plans →',
      startFree: 'Start Free →',
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
        { name: 'Case Studies', href: '/resources' },
        { name: 'FAQ', href: '/faq' },
        { name: 'Free Tools & Calculators', href: '/tools' },
      ],
    },
    footer: {
      readyTitle: "Ready to see what you're missing?",
      readyDescription: 'Join operators who have moved from guessing to knowing.',
      bookDemo: 'Book a Demo',
      startFree: 'Start Free with Report',
      brandDescription:
        "Decision intelligence for restaurants. Understand performance, predict what's next, and act with confidence.",
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
        { name: 'Security', href: '/security' },
        { name: 'Integrations', href: '/integrations' },
      ],
      extraResources: [
        { name: 'Getting Started', href: '/getting-started' },
      ],
    },
    home: {
      badge: 'Decision Intelligence Platform',
      titleTop: 'Decision Intelligence',
      titleBottom: 'for Restaurants',
      description:
        'Your data lives in 5–10 disconnected systems. Your team decides by gut while margins leak daily.',
      descriptionEmphasis: 'That’s the tradeoff Sundae removes.',
      narrativeAnchor: 'From reporting lag to ops speed.',
      startFree: 'Start Free',
      bookDemo: 'Book a Demo',
      noCard: 'No credit card required',
      proofStats: [
        { number: '6', label: 'Intelligence layers' },
        { number: '30+', label: 'Analytics modules' },
        { number: '12', label: 'Data domains unified' },
        { number: '5 min', label: 'Shift refresh cycle' },
      ],
      problem: {
        eyebrow: 'THE PROBLEM',
        heading: 'The gaps costing you money every day',
        description: 'Every restaurant group we work with faces the same blind spots.',
        kpis: [
          { value: '12+', label: 'Data sources', supporting: 'Disconnected across your operation', color: 'red' },
          { value: '72hrs', label: 'To close books', supporting: 'While margin leaks compound daily', color: 'amber' },
          { value: '0%', label: 'Market context', supporting: 'No peer benchmarks for your KPIs', color: 'red' },
          { value: '$50K+', label: 'Annual leakage', supporting: 'From voids, comps, and overrides', color: 'amber' },
        ],
      },
      platform: {
        eyebrow: '6 LAYERS · ONE TRUTH',
        heading: 'Six layers. One truth.',
        description: 'From the live shift to the long-range plan — one stack, six layers that talk to each other.',
        countLabel: 'of 6',
        exploreModules: 'Explore all modules',
        learnMore: 'Learn more',
        layers: [
          { name: 'Pulse', subtitle: 'Real-time operations', description: 'Live pacing, adaptive targets, server performance, leakage — shift by shift.', href: '/product/pulse' },
          { name: 'Benchmarks', subtitle: 'Competitive intelligence', description: 'Anonymous peer benchmarks across 30+ metrics. Know where you stand.', href: '/benchmarking' },
          { name: 'Watchtower', subtitle: 'Market intelligence', description: 'Competitors, weather, events — before they hit your numbers.', href: '/product/watchtower' },
          { name: 'Insights', subtitle: '30+ analytics modules', description: 'Revenue, labor, inventory, marketing, delivery — each with AI recommendations.', href: '/insights' },
          { name: 'Sundae Intelligence', subtitle: 'Conversational AI', description: 'Ask your data anything. Answers in seconds on web, Slack, or Teams.', href: '/intelligence' },
          { name: 'Foresight', subtitle: 'Predictive intelligence', description: '14–90 day forecasts, what-if scenarios, exec briefings that correct themselves.', href: '/product/foresight' },
        ],
      },
      modules: {
        eyebrow: 'INTELLIGENCE MODULES',
        heading: '30+ modules across 12 domains',
        description: 'Every dimension of restaurant performance — analyzed, benchmarked, and actionable.',
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
          { title: 'Operations Leaders', pain: "You can't be in every restaurant at once.", outcome: 'Live pacing and server performance across every outlet — see who needs help right now.', attribution: 'Pattern across multi-location operators' },
          { title: 'Finance & FP&A', pain: '3 days to close the books? That is 3 days too many.', outcome: 'Real-time margins, shift-level labor cost, variance tied to root cause.', attribution: 'Pattern across CFO conversations' },
          { title: 'C-Suite & Owners', pain: 'Your worst outlet is invisible until Thursday.', outcome: 'Portfolio view, daily AI briefings, market signal — across every brand you run.', attribution: 'Pattern across founders and group CEOs' },
          { title: 'Data & Technology', pain: '12 vendor APIs. 5 formats. Zero unified schema.', outcome: 'Clean pipelines, governed metrics, public API, webhooks, RBAC out of the box.', attribution: 'Pattern across heads of data' },
        ],
      },
      howItWorks: {
        eyebrow: 'HOW IT WORKS',
        heading: 'From data to decision in four steps',
        steps: [
          { step: '01', title: 'Connect', description: 'POS, labor, inventory, delivery — most integrations under 5 minutes.' },
          { step: '02', title: 'Understand', description: 'AI surfaces anomalies and layers in weather, events, and competitor signals.' },
          { step: '03', title: 'Decide', description: 'Specific, explainable recommendations — targets, staffing, menu, pricing.' },
          { step: '04', title: 'Improve', description: 'Every decision feeds the system. Playbooks get sharper, forecasts get more precise.' },
        ],
      },
      mockup: {
        frameLabel: 'Pulse — Sales Pacing',
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
          metadataTitle: 'Sign In — Sundae',
          metadataDescription:
            'Sign in to Sundae — your unified view of performance, operations, and competitive intelligence for restaurants.',
          brandTitle: 'Decision intelligence for restaurants',
          brandDescription:
            'Performance, operations, and competitive intelligence — unified in one platform.',
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
          footerSecurity: 'Security',
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
          metadataTitle: 'Pricing — Sundae',
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
          metadataTitle: 'FAQ — Sundae',
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
          metadataTitle: 'Modules — Sundae',
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
          metadataTitle: 'Integrations — Sundae',
          badge: 'Integrations',
          title: 'Connect Everything. Unify Your Data.',
          description:
            'Sundae integrates with 30+ restaurant systems across POS, labor, inventory, reservations, delivery, and more.',
          process: [
            { step: '1', title: 'Connect', description: 'Authenticate your platforms with OAuth or API key - most integrations take under 5 minutes.' },
            { step: '2', title: 'Normalize', description: 'Scout, our data layer, cleans, maps, and unifies every data source into a consistent schema.' },
            { step: '3', title: 'Analyze', description: 'Unified data flows into dashboards, alerts, and intelligent recommendations - no manual exports needed.' },
          ],
          domainsTitle: '12 Data Domains. One Unified View.',
          domainsDescription:
            'POS, labor, inventory, purchasing, reservations, delivery, marketing, guest experience, CRM, accounting, and daily sales summaries - all connected.',
          live: 'Live',
          upcoming: 'Upcoming',
          liveNow: 'Live — available now',
          roadmap: 'Upcoming — on our roadmap',
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
          metadataTitle: 'Resources — Sundae',
          badge: 'Resources & Tools',
          title: 'Decision Intelligence Resources',
          description:
            'Access guides, reports, and tools to help you make smarter decisions for your restaurant business.',
          getStarted: 'Get Started with Sundae',
          freeReport: 'Get Free Benchmark Report',
          caseStudies: 'Case Studies',
          caseStudiesDescription:
            'See how operators use Sundae to improve performance, margins, and decision-making.',
          caseStudiesNote:
            'Representative examples based on real operator challenges; specific client names omitted.',
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
        'منصة ذكاء اصطناعي تحول بيانات المطاعم إلى قرارات عملية عبر توحيد نقاط البيع والعمل والتكاليف والعمليات.',
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
      bookDemo: 'احجز عرضاً',
      comparePlans: 'قارن الخطط ←',
      startFree: 'ابدأ مجاناً ←',
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
      readyTitle: 'هل أنت مستعد لرؤية ما يفوتك؟',
      readyDescription: 'انضم إلى المشغلين الذين انتقلوا من التخمين إلى اليقين.',
      bookDemo: 'احجز عرضاً',
      startFree: 'ابدأ مجاناً مع Report',
      brandDescription:
        'ذكاء القرار للمطاعم. افهم الأداء، توقع ما سيحدث لاحقاً، وتصرف بثقة.',
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
        { name: 'الأمان', href: '/security' },
        { name: 'التكاملات', href: '/integrations' },
      ],
      extraResources: [
        { name: 'البدء', href: '/getting-started' },
      ],
    },
    home: {
      badge: 'منصة ذكاء القرار',
      titleTop: 'ذكاء القرار',
      titleBottom: 'للمطاعم',
      description:
        'بياناتك موزعة على 5 إلى 10 أنظمة منفصلة. فريقك يقرر بالحدس بينما تتسرب الهوامش يومياً.',
      descriptionEmphasis: 'هذه المقايضة هي ما يلغيه صنداي.',
      narrativeAnchor: 'من تأخر التقارير إلى سرعة العمليات.',
      startFree: 'ابدأ مجاناً',
      bookDemo: 'احجز عرضاً',
      noCard: 'لا حاجة إلى بطاقة ائتمان',
      proofStats: [
        { number: '6', label: 'طبقات ذكاء' },
        { number: '+30', label: 'وحدة تحليلية' },
        { number: '12', label: 'مجال بيانات موحّد' },
        { number: '5 د', label: 'دورة تحديث الوردية' },
      ],
      problem: {
        eyebrow: 'المشكلة',
        heading: 'الفجوات التي تكلفك المال كل يوم',
        description: 'كل مجموعة مطاعم نعمل معها تواجه نفس نقاط العمى.',
        kpis: [
          { value: '12+', label: 'مصادر البيانات', supporting: 'مجزأة عبر عملياتك', color: 'red' },
          { value: '72 ساعة', label: 'لإغلاق الحسابات', supporting: 'بينما تتراكم خسائر الهامش يومياً', color: 'amber' },
          { value: '0%', label: 'السياق السوقي', supporting: 'لا توجد مقارنات مرجعية لأدائك', color: 'red' },
          { value: '$50K+', label: 'فاقد سنوي', supporting: 'من الهدر والتعويضات والتجاوزات', color: 'amber' },
        ],
      },
      platform: {
        eyebrow: '٦ طبقات · حقيقة واحدة',
        heading: 'ست طبقات. حقيقة واحدة.',
        description: 'من الوردية الحية إلى الخطة طويلة المدى — منصة واحدة، ست طبقات تتحدث مع بعضها.',
        countLabel: 'من ٦',
        exploreModules: 'استعرض كل الوحدات',
        learnMore: 'اعرف المزيد',
        layers: [
          { name: 'Pulse', subtitle: 'العمليات الفورية', description: 'وتيرة حية، أهداف تكيفية، أداء الموظفين، اكتشاف التسرب — وردية بوردية.', href: '/product/pulse' },
          { name: 'Benchmarks', subtitle: 'الذكاء التنافسي', description: 'مقارنات نظراء مجهولة عبر أكثر من 30 مقياساً. اعرف موقعك بدقة.', href: '/benchmarking' },
          { name: 'Watchtower', subtitle: 'ذكاء السوق', description: 'المنافسون، الطقس، الأحداث — قبل أن تصل إلى أرقامك.', href: '/product/watchtower' },
          { name: 'Insights', subtitle: 'أكثر من 30 وحدة تحليلية', description: 'الإيرادات، العمالة، المخزون، التسويق، التوصيل — وكل منها مع توصيات ذكية.', href: '/insights' },
          { name: 'Sundae Intelligence', subtitle: 'ذكاء محادثي', description: 'اسأل بياناتك أي شيء. إجابات في ثوانٍ على الويب أو Slack أو Teams.', href: '/intelligence' },
          { name: 'Foresight', subtitle: 'ذكاء استباقي', description: 'توقعات 14–90 يوماً، سيناريوهات ماذا لو، إحاطات تنفيذية تصحح نفسها.', href: '/product/foresight' },
        ],
      },
      modules: {
        eyebrow: 'وحدات الذكاء',
        heading: 'أكثر من 30 وحدة عبر 12 مجالاً',
        description: 'كل بُعد من أبعاد أداء المطعم — محلل، ومقارن، وقابل للتنفيذ.',
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
          { title: 'قادة العمليات', pain: 'لا يمكنك أن تكون في كل مطعم في الوقت نفسه.', outcome: 'وتيرة حية وأداء الموظفين عبر كل موقع — اعرف من يحتاج المساعدة الآن.', attribution: 'نمط متكرر عبر مجموعات المطاعم متعددة المواقع' },
          { title: 'المالية و FP&A', pain: '3 أيام لإغلاق الحسابات؟ هذا وقت أكثر من اللازم.', outcome: 'هوامش فورية، تكلفة عمالة على مستوى الوردية، انحرافات مرتبطة بالأسباب الجذرية.', attribution: 'نمط متكرر في حوارات المدراء الماليين' },
          { title: 'الإدارة العليا والمالكون', pain: 'أسوأ موقع أداء لا يظهر حتى يوم الخميس.', outcome: 'نظرة محفظة، إحاطات يومية بالذكاء الاصطناعي، إشارات سوق — عبر كل علامة.', attribution: 'نمط متكرر بين المؤسسين والرؤساء التنفيذيين' },
          { title: 'البيانات والتقنية', pain: '12 واجهة API. 5 صيغ. لا مخطط موحد.', outcome: 'مسارات نظيفة، مقاييس محكومة، API عامة، webhooks، وضوابط RBAC جاهزة.', attribution: 'نمط متكرر بين قادة البيانات' },
        ],
      },
      howItWorks: {
        eyebrow: 'كيف يعمل',
        heading: 'من البيانات إلى القرار في أربع خطوات',
        steps: [
          { step: '01', title: 'اتصل', description: 'نقاط البيع، العمالة، المخزون، التوصيل — معظم التكاملات أقل من 5 دقائق.' },
          { step: '02', title: 'افهم', description: 'يكتشف الذكاء الاصطناعي الشذوذ ويضيف الطقس والأحداث وإشارات المنافسين.' },
          { step: '03', title: 'قرر', description: 'توصيات محددة وقابلة للتفسير — أهداف، جدولة، قائمة، تسعير.' },
          { step: '04', title: 'تحسن', description: 'كل قرار يغذي النظام. خطط العمل تصبح أدق، والتوقعات أكثر دقة.' },
        ],
      },
      mockup: {
        frameLabel: 'Pulse — وتيرة المبيعات',
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
          footerSecurity: 'الأمان',
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
            { step: '2', title: 'توحيد', description: 'يقوم Scout بتنظيف البيانات وربطها وتوحيدها في مخطط موحد.' },
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
      title: 'Sundae - Intelligence decisionnelle pour la restauration',
      description:
        "La plateforme IA qui transforme les donnees restaurant en actions en unifiant POS, main-d'oeuvre, couts et operations.",
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
      intelligence: 'Couches d intelligence',
      plans: 'Offres',
      bySegment: 'Par segment',
      byRole: 'Par role',
      learn: 'Apprendre',
      pricing: 'Tarifs',
      about: 'A propos',
      signIn: 'Se connecter',
      bookDemo: 'Demander une demo',
      comparePlans: 'Comparer les offres →',
      startFree: 'Commencer gratuitement →',
      openMenu: 'Ouvrir le menu',
      closeMenu: 'Fermer le menu',
      closeNavigation: 'Fermer la navigation',
      mobileNavigation: 'Navigation mobile',
      pillars: [
        { name: 'Pulse', description: 'Suivi des operations intra-journee', href: '/product/pulse' },
        { name: 'Benchmarks', description: 'Intelligence concurrentielle', href: '/benchmarking' },
        { name: 'Watchtower', description: 'Signaux de marche externes', href: '/product/watchtower' },
        { name: 'Insights', description: 'Modules analytiques specialises', href: '/insights' },
        { name: 'Sundae Intelligence', description: 'Analytique conversationnelle par IA', href: '/intelligence' },
        { name: 'Foresight', description: 'Prevision et intelligence predictive', href: '/product/foresight' },
      ],
      plansList: [
        { name: 'Sundae Report', description: 'Analyse historique gratuite', href: '/report' },
        { name: 'Sundae Core', description: 'Operations en temps reel', href: '/core' },
        { name: 'Sundae Crew', description: 'Substrat operationnel · equipes, plannings, paie', href: '/crew' },
      ],
      solutionsSegments: [
        { name: 'Restaurants multi-sites', href: '/solutions/multi-location-groups' },
        { name: 'Franchises', href: '/solutions/franchises' },
        { name: 'Dark kitchens', href: '/solutions/cloud-kitchens' },
        { name: 'Groupes hospitality enterprise', href: '/solutions/hospitality-operators' },
      ],
      solutionsRoles: [
        { name: 'Responsables operations', href: '/solutions/regional-managers' },
        { name: 'Equipes finance et FP&A', href: '/solutions/finance-teams' },
        { name: 'Equipes marketing', href: '/solutions/marketing-teams' },
        { name: 'Direction et proprietaires', href: '/solutions/c-suite-executives' },
        { name: 'Equipes data et technologie', href: '/solutions/technology-teams' },
        { name: 'Equipes RH', href: '/solutions/hr-teams' },
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
      readyTitle: 'Pret a voir ce qui vous echappe ?',
      readyDescription: 'Rejoignez les operateurs passes de l intuition a la certitude.',
      bookDemo: 'Demander une demo',
      startFree: 'Commencer avec Report',
      brandDescription:
        "Intelligence decisionnelle pour la restauration. Comprenez la performance, anticipez la suite et agissez avec confiance.",
      global: 'Global',
      allCurrencies: 'Toutes les devises',
      sectionProduct: 'Produit',
      sectionSolutions: 'Solutions',
      sectionResources: 'Ressources',
      sectionCompany: 'Entreprise',
      pricing: 'Tarifs',
      privacy: 'Confidentialite',
      terms: 'Conditions',
      copyrightSuffix: 'Tous droits reserves.',
      companyLinks: [
        { name: 'A propos', href: '/about' },
        { name: 'Carrieres', href: '/careers' },
        { name: 'Contact', href: '/contact' },
        { name: 'Securite', href: '/security' },
        { name: 'Integrations', href: '/integrations' },
      ],
      extraResources: [
        { name: 'Bien demarrer', href: '/getting-started' },
      ],
    },
    home: {
      badge: 'Plateforme d intelligence decisionnelle',
      titleTop: 'Intelligence decisionnelle',
      titleBottom: 'pour les restaurants',
      description:
        'Vos donnees vivent dans 5 a 10 systemes deconnectes. Votre equipe decide au feeling pendant que les marges fuient.',
      descriptionEmphasis: 'C est l arbitrage que Sundae supprime.',
      narrativeAnchor: 'Du retard de reporting a la vitesse operationnelle.',
      startFree: 'Commencer',
      bookDemo: 'Demander une demo',
      noCard: 'Aucune carte bancaire requise',
      proofStats: [
        { number: '6', label: 'Couches d intelligence' },
        { number: '30+', label: 'Modules analytiques' },
        { number: '12', label: 'Domaines de donnees unifies' },
        { number: '5 min', label: 'Rafraichissement par service' },
      ],
      problem: {
        eyebrow: 'LE PROBLEME',
        heading: 'Les ecarts qui vous coutent de l argent chaque jour',
        description: 'Chaque groupe de restaurants avec lequel nous travaillons fait face aux memes angles morts.',
        kpis: [
          { value: '12+', label: 'Sources de donnees', supporting: 'Deconnectees dans toute votre operation', color: 'red' },
          { value: '72 h', label: 'Pour cloturer les comptes', supporting: 'Pendant que les fuites de marge s aggravent chaque jour', color: 'amber' },
          { value: '0%', label: 'Contexte marche', supporting: 'Aucun benchmark de pairs pour vos KPI', color: 'red' },
          { value: '$50K+', label: 'Fuite annuelle', supporting: 'A cause des pertes, offerts et ajustements', color: 'amber' },
        ],
      },
      platform: {
        eyebrow: '6 COUCHES · UNE SEULE VERITE',
        heading: 'Six couches. Une seule verite.',
        description: 'Du service en direct au plan long terme — une plateforme, six couches qui se parlent.',
        countLabel: 'sur 6',
        exploreModules: 'Explorer tous les modules',
        learnMore: 'En savoir plus',
        layers: [
          { name: 'Pulse', subtitle: 'Operations en temps reel', description: 'Rythme live, objectifs adaptatifs, performance serveurs, detection des fuites — service par service.', href: '/product/pulse' },
          { name: 'Benchmarks', subtitle: 'Intelligence concurrentielle', description: 'Benchmarks anonymes de pairs sur 30+ indicateurs. Sachez ou vous vous situez.', href: '/benchmarking' },
          { name: 'Watchtower', subtitle: 'Intelligence marche', description: 'Concurrents, meteo, evenements — avant que cela touche vos chiffres.', href: '/product/watchtower' },
          { name: 'Insights', subtitle: '30+ modules analytiques', description: 'Revenu, main-d oeuvre, stock, marketing, livraison — chacun avec des recommandations IA.', href: '/insights' },
          { name: 'Sundae Intelligence', subtitle: 'IA conversationnelle', description: 'Posez n importe quelle question. Reponses en secondes sur le web, Slack ou Teams.', href: '/intelligence' },
          { name: 'Foresight', subtitle: 'Intelligence predictive', description: 'Previsions 14–90 jours, scenarios hypothese, briefings execs auto-correctifs.', href: '/product/foresight' },
        ],
      },
      modules: {
        eyebrow: 'MODULES D INTELLIGENCE',
        heading: 'Plus de 30 modules dans 12 domaines',
        description: 'Chaque dimension de la performance restaurant — analysee, comparee et exploitable.',
        categories: [
          { name: 'Intelligence du revenu', count: '4 modules' },
          { name: 'Intelligence de la main-d oeuvre', count: '5 modules' },
          { name: 'Experience client', count: '3 modules' },
          { name: 'Stock et pertes', count: '3 modules' },
          { name: 'Achats', count: '3 modules' },
          { name: 'Performance marketing', count: '3 modules' },
          { name: 'Livraison et plateformes', count: '2 modules' },
          { name: 'Reservations', count: '2 modules' },
          { name: 'Garantie du revenu', count: '2 modules' },
          { name: 'Intelligence de profit', count: '3 modules' },
          { name: 'CRM clients', count: '3 modules' },
          { name: 'Cross-Intelligence', count: 'Moteur de correlation' },
        ],
      },
      personas: {
        eyebrow: 'CE QUE NOUS ENTENDONS DES OPERATEURS',
        heading: 'Chaque role. Une seule plateforme.',
        description: 'Equipes differentes, questions differentes. Une seule source de verite.',
        roles: [
          { title: 'Leaders operations', pain: 'Vous ne pouvez pas etre dans chaque restaurant a la fois.', outcome: 'Rythme live et performance serveurs sur chaque site — voyez qui a besoin d aide maintenant.', attribution: 'Motif recurrent chez les operateurs multi-sites' },
          { title: 'Finance & FP&A', pain: '3 jours pour cloturer les comptes ? C est 3 jours de trop.', outcome: 'Marge live, cout main-d oeuvre par service, ecarts relies aux causes profondes.', attribution: 'Motif recurrent dans les conversations DAF' },
          { title: 'Direction & proprietaires', pain: 'Votre pire site reste invisible jusqu a jeudi.', outcome: 'Vue portefeuille, briefings IA quotidiens, signaux de marche — pour chaque marque.', attribution: 'Motif recurrent chez les fondateurs et CEO' },
          { title: 'Donnees & technologie', pain: '12 API fournisseurs. 5 formats. Aucun schema unifie.', outcome: 'Pipelines propres, metriques gouvernees, API publique, webhooks, RBAC prets a l emploi.', attribution: 'Motif recurrent chez les responsables data' },
        ],
      },
      howItWorks: {
        eyebrow: 'COMMENT CA MARCHE',
        heading: 'Des donnees a la decision en quatre etapes',
        steps: [
          { step: '01', title: 'Connecter', description: 'POS, main-d oeuvre, stock, livraison — la plupart des integrations en moins de 5 minutes.' },
          { step: '02', title: 'Comprendre', description: 'L IA revele les anomalies et superpose meteo, evenements et signaux concurrents.' },
          { step: '03', title: 'Decider', description: 'Recommandations specifiques et explicables — objectifs, planning, menu, pricing.' },
          { step: '04', title: 'Ameliorer', description: 'Chaque decision nourrit le systeme. Les playbooks s affinent, les previsions se precisent.' },
        ],
      },
      mockup: {
        frameLabel: 'Pulse — Rythme des ventes',
        updatedAt: 'Mardi, 19:42',
        kpis: [
          { label: 'Revenu', value: '$14,280', trend: '+12% vs objectif', trendUp: true },
          { label: 'Couverts', value: '287', trend: '+12 vs plan', trendUp: true, color: '#22C55E' },
          { label: 'Ticket moyen', value: '$49.50', trend: '-2,1%', trendUp: false, color: '#FBBF24' },
          { label: 'Main-d oeuvre %', value: '28.4%', trend: 'Sous l objectif de 30%', trendUp: true, color: '#22C55E' },
        ],
        paceLabel: 'Rythme du revenu',
        tableHeaders: ['Serveur', 'Ventes', 'Upsell %', 'Ticket moyen'],
        tableRows: [
          ['Sarah M.', '$2,840', '32%', '$52.10'],
          ['Marcus J.', '$2,410', '28%', '$48.20'],
          ['James K.', '$1,960', '18%', '$44.50'],
        ],
        coachAlert: 'Le taux d upsell de James K. est 14% sous la moyenne du service. Envisagez de le faire travailler avec Sarah pour les 2 prochaines tables.',
      },
      closingTitle: 'Arretez de piloter sur les chiffres d hier.',
      closingDescription: '30 minutes. Vos donnees. Ce que Sundae changerait concretement pour l equipe.',
      pages: {
        signIn: {
          metadataTitle: 'Connexion - Sundae',
          metadataDescription:
            "Connectez-vous à Sundae - votre vue unifiee de la performance, des operations et de l'intelligence concurrentielle pour les restaurants.",
          brandTitle: 'Intelligence decisionnelle pour la restauration',
          brandDescription:
            'Performance, operations et intelligence concurrentielle - reunies dans une seule plateforme.',
          trustPoints: [
            'Intelligence operationnelle en temps reel',
            'Benchmarking multi-sites',
            'Signaux de marche concurrentiel',
          ],
          headingTitle: 'Connexion à Sundae',
          headingDescription:
            'Votre vue unifiee de la performance, des operations et de l intelligence concurrentielle.',
          ssoGoogle: 'Continuer avec Google',
          ssoMicrosoft: 'Continuer avec Microsoft',
          or: 'ou',
          emailLabel: 'E-mail',
          emailPlaceholder: 'vous@entreprise.com',
          passwordLabel: 'Mot de passe',
          passwordPlaceholder: 'Saisissez votre mot de passe',
          rememberMe: 'Se souvenir de moi',
          forgotPassword: 'Mot de passe oublie ?',
          signingIn: 'Connexion en cours...',
          redirecting: 'Redirection en cours...',
          signInButton: 'Se connecter',
          continueToApp: "Continuer vers l'application Sundae",
          noAccount: "Vous n'avez pas de compte ?",
          getStartedFree: 'Commencer gratuitement',
          signInMainAppDescription:
            "La connexion se fait dans l'application principale Sundae. Ce site n'enregistre pas et ne traite pas votre mot de passe.",
          signInMainAppBenefits: [
            "Acceder à votre espace de travail",
            'Changer de site et de produit',
            'Ger er la reinitialisation du mot de passe et la recuperation du compte',
          ],
          footerTerms: 'Conditions',
          footerPrivacy: 'Confidentialite',
          footerSecurity: 'Securite',
          footerSupport: 'Support',
          emailRequired: "L'e-mail est requis",
          emailInvalid: 'Saisissez une adresse e-mail valide',
          passwordRequired: 'Le mot de passe est requis',
          passwordMin: 'Le mot de passe doit contenir au moins 6 caracteres',
          invalidCredentials: "E-mail ou mot de passe invalide",
          genericError: 'Une erreur est survenue. Veuillez reessayer.',
        },
        demo: {
          metadataTitle: 'Reserver une demo',
          metadataDescription:
            "Voyez Sundae en action avec vos propres donnees de restaurant. Reservez une demo de 30 minutes, centree sur vos chiffres et vos priorites operationnelles.",
          badge: 'RESERVER UNE DEMO',
          title: '30 minutes. Vos donnees. De vraies reponses.',
          description:
            'Nous connecterons votre POS, montrerons ce que vos chiffres signifient vraiment et vous laisserons juger si Sundae peut vous faire gagner du temps.',
          requestTitle: 'Demander votre demo',
          requestDescription:
            'Parlez-nous de votre operation et nous adapterons la session à vos priorites.',
          ctaLabel: 'Reserver une demo',
          defaultMessage:
            "Je souhaite voir comment Sundae peut aider les operations de mon restaurant.",
          whatYoullSeeTitle: 'Ce que vous verrez',
          whatYoullSeeDescription: 'Une visite guidee concentree sur votre operation.',
          benefits: [
            {
              title: 'Vos donnees, en direct',
              description:
                "Nous connectons le POS et montrons ce qui se passe vraiment sur vos sites - pas une demo generique avec des donnees fictives.",
              details: [
                'Integration POS en direct',
                'Vue d ensemble multi-sites',
                'Detection d anomalies en temps reel',
                'Analyse des tendances historiques',
              ],
            },
            {
              title: 'Vos angles morts',
              description:
                'Nous ferons ressortir les ecarts que vous ne voyiez pas - pertes de revenus, inefficacites de main-d oeuvre et opportunites manquées.',
              details: [
                'Motifs de fuite de revenus',
                'Optimisation des couts de main-d oeuvre',
                'Ecarts de performance du menu',
                'Anomalies operationnelles',
              ],
            },
            {
              title: 'Vos questions, reponses',
              description:
                'Apportez vos questions operationnelles les plus difficiles. Nous montrerons exactement comment Sundae y repond - ou nous vous dirons que ce n est pas possible.',
              details: [
                'Integration à votre stack',
                'Tarification adaptee à votre taille',
                'Calendrier de mise en oeuvre',
                'Securite et conformite des donnees',
              ],
            },
          ],
          whyOperatorsTitle: 'Pourquoi les operateurs acceptent l appel',
          stats: [
            { stat: '30 min', label: 'Demo ciblee - sans remplissage ni blabla' },
            { stat: 'Vos donnees', label: 'Nous utilisons vos vrais chiffres, pas un bac à sable' },
            { stat: 'Zero pression', label: 'Si ce n est pas pertinent, nous vous le dirons' },
            { stat: '24 h', label: 'La plupart des demos sont planifiees sous un jour ouvrable' },
          ],
          ctaTitle: 'Voyez ce qu il vous manque',
          ctaDescription: 'Trente minutes pour regarder vos donnees et voir ce qui merite vraiment votre attention.',
          bookDemo: 'Reserver votre demo',
          viewPricing: 'Voir les tarifs',
        },
        pricing: {
          metadataTitle: 'Tarifs - Sundae',
          metadataDescription:
            'Tarifs simples et transparents pour Sundae Report, Core, Watchtower et les modules.',
          badge: 'Tarifs',
          title: 'Tarifs simples et transparents',
          description:
            'Commencez gratuitement avec Report. Passez à l intelligence en temps reel avec Core. Chaque formule inclut des credits Sundae Intelligence.',
          monthly: 'Mensuel',
          annual: 'Annuel',
          savePercent: 'Economisez 10 %',
          reportBadge: 'Sundae Report - Analyse historique et benchmarking',
          coreBadge: 'Sundae Core - Operations en temps reel et intelligence predictive',
          enterpriseBadge: 'Enterprise',
          enterpriseTitle: 'Tarification personnalisee pour les grandes operations',
          enterpriseDescription:
            'Pour les groupes multi-sites ayant besoin de white-label, SSO, SLA personnalises et support dedie. 50 000+ credits inclus.',
          addOnsTitle: 'Modules complementaires',
          addOnsDescription: 'Etendez votre offre avec des modules d intelligence specialises.',
          detailedPricingCalculator: 'Voir le calculateur de tarifs detaille',
          faqTitle: 'Questions frequentes',
          faqDescription: 'Des reponses claires. Sans petits caracteres.',
          ctaTitle: 'Pret à commencer ?',
          ctaDescription: 'Commencez gratuitement, evoluez quand vous etes pret. Aucune carte requise.',
          bookDemo: 'Reserver une demo',
          startFree: 'Commencer gratuitement',
        },
        faq: {
          metadataTitle: 'FAQ - Sundae',
          metadataDescription:
            'Questions frequentes sur Sundae - tarifs, integrations, securite des donnees, onboarding et tout ce que les operateurs doivent savoir avant de commencer.',
          badge: 'Questions frequentes',
          title: 'Tout ce qu il faut savoir',
          description:
            'Trouvez des reponses aux questions courantes sur Sundae, nos produits, nos tarifs et la maniere dont les operateurs prennent de meilleures decisions.',
          jumpToCategory: 'Aller à la categorie :',
          stillHaveQuestions: 'Vous avez encore des questions ?',
          helpDescription: 'Notre équipe est là pour vous aider. Réservez une demo, contactez les ventes ou commencez gratuitement.',
          startFree: 'Commencer gratuitement',
          seePricing: 'Voir les tarifs',
          bookDemo: 'Reserver une demo',
          contactUs: 'Nous contacter',
          emailSupportPrefix: 'Ou envoyez-nous un e-mail à :',
          categories: [
            'Demarrage',
            'Produits et niveaux',
            'Donnees et integration',
            'Modules',
            'Watchtower',
            'Tarifs et facturation',
            'Fonctionnalites et capacites',
            'Support et formation',
            'Securite et conformite',
            'Enterprise',
            'Questions comparatives',
            'Cas d usage specifiques',
          ],
        },
        modules: {
          metadataTitle: 'Modules - Sundae',
          badge: 'Modules specialises',
          title: 'Allez plus loin là où c est le plus important',
          description:
            'Ajoutez des modules specialises à Sundae Core pour obtenir une intelligence approfondie en main-d oeuvre, stock, achats, marketing et reservations.',
          mixAndMatch: 'Combinez selon vos priorites.',
          exploreAllModules: 'Explorer tous les modules',
          calculateModuleRoi: 'Calculer le ROI du module',
          whatAreModules: 'Que sont les modules Sundae ?',
          whatAreModulesDescription:
            'Les modules sont des extensions d intelligence specialisees qui approfondissent vos analyses dans des domaines operationnels précis.',
          fiveModules: 'Cinq modules specialises',
          chooseStack: 'Choisissez votre pile d intelligence',
          chooseStackDescription: 'Ajoutez un module ou les cinq. Construisez l intelligence dont votre operation a besoin.',
          coreCapabilities: 'Capacites principales :',
          roi: 'ROI',
          bestFor: 'Ideal pour :',
          faqTitle: 'Questions frequentes',
          faqDescription: 'Questions courantes sur les modules, la mise à niveau, le tarif et le deploiement.',
          ctaTitle: 'Pret à ajouter une intelligence specialisee ?',
          ctaDescription: 'Commencez par le module qui resout votre plus grand probleme.',
          bookDemo: 'Reserver une demo',
          contactSales: 'Contacter les ventes',
          pillars: [
            { title: 'Specialise, pas dispersé', description: 'Des fonctionnalites approfondies pensees pour chaque domaine operationnel.' },
            { title: 'Ajoutez ce dont vous avez besoin', description: 'Commencez par votre plus gros point de douleur et ajoutez des modules au fil des priorites.' },
            { title: 'Integre, pas en silos', description: 'Les modules partagent les donnees avec Core dans une plateforme unifiee.' },
          ],
        },
        integrations: {
          metadataTitle: 'Integrations - Sundae',
          badge: 'Integrations',
          title: 'Connectez tout. Unifiez vos donnees.',
          description:
            'Sundae s integre à plus de 30 systemes de restauration couvrant POS, main-d oeuvre, stock, reservations, livraison et plus encore.',
          process: [
            { step: '1', title: 'Connecter', description: 'Authentifiez vos plateformes via OAuth ou cle API - la plupart des integrations prennent moins de 5 minutes.' },
            { step: '2', title: 'Normaliser', description: 'Scout nettoie, mappe et unifie chaque source de donnees dans un schema coherent.' },
            { step: '3', title: 'Analyser', description: 'Les donnees unifiees alimentent tableaux de bord, alertes et recommandations intelligentes.' },
          ],
          domainsTitle: '12 domaines de donnees. Une vue unifiee.',
          domainsDescription:
            'POS, main-d oeuvre, stock, achats, reservations, livraison, marketing, experience client, CRM, comptabilite et resumes quotidiens - tout est connecte.',
          live: 'En ligne',
          upcoming: 'A venir',
          liveNow: 'En ligne - disponible maintenant',
          roadmap: 'A venir - sur notre feuille de route',
          roadmapDescription: 'Les integrations à venir sont en cours de developpement. Contactez-nous pour prioriser une integration specifique.',
          webhooksTitle: 'Webhooks et Public API',
          webhooksDescription: 'Construisez des integrations personnalisees avec les outils developpeur de Sundae.',
          customWebhooks: 'Webhooks personnalises',
          customWebhooksDescription:
            'Configurez des webhooks pour tout domaine de donnees hors POS et envoyez les donnees à Sundae depuis n importe quel systeme HTTP.',
          publicApi: 'Public API',
          publicApiDescription:
            'Utilisez l API Sundae pour recuperer des analyses structurees dans vos propres flux, outils et couches de reporting.',
          liveDomains: 'Disponible pour les 12 domaines de donnees',
          signatureVerification: 'Verification de signature HMAC-SHA256',
          testPayloads: 'Payloads de test et suivi des livraisons',
        },
        resources: {
          metadataTitle: 'Ressources - Sundae',
          badge: 'Ressources et outils',
          title: 'Ressources d intelligence decisionnelle',
          description:
            'Accedez à des guides, rapports et outils pour prendre des decisions plus intelligentes pour votre restaurant.',
          getStarted: 'Commencer avec Sundae',
          freeReport: 'Obtenir un rapport de benchmark gratuit',
          caseStudies: 'Etudes de cas',
          caseStudiesDescription:
            'Voyez comment les operateurs utilisent Sundae pour ameliorer la performance, les marges et la prise de decision.',
          caseStudiesNote: 'Exemples representatifs bases sur de vrais defis operationnels; noms de clients masques.',
          segment: 'Segment',
          challenge: 'Defi :',
          solution: 'Solution Sundae :',
          outcomes: 'Resultats :',
          exploreProducts: 'Explorez les produits utilises dans ces etudes de cas :',
          toolsTitle: 'Outils et calculateurs gratuits',
          toolsDescription:
            'Essayez les calculateurs gratuits de Sundae pour les couts de main-d oeuvre, les marges menu, la readiness benchmark et plus encore.',
          exploreTools: 'Explorer tous les outils',
          stayUpdated: 'Restez à jour',
          newsletterDescription:
            'Recevez les derniers insights du secteur, benchmarks et tendances de decision intelligence directement dans votre boite mail.',
          subscribe: 'S inscrire',
          privacyNote: 'Nous respectons votre confidentialite. Desabonnez-vous à tout moment.',
          ctaTitle: 'Pret à transformer votre restaurant ?',
          ctaDescription:
            'Rejoignez des milliers d operateurs qui utilisent Sundae pour prendre des decisions plus intelligentes et fondees sur les chiffres.',
          bookDemo: 'Reserver une demo',
          contactSales: 'Contacter les ventes',
        },
      },
    },
  },
  es: {
    metadata: {
      title: 'Sundae - Inteligencia de decision para restaurantes',
      description:
        'La plataforma de IA que convierte los datos del restaurante en accion al unificar POS, mano de obra, costos y operaciones.',
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
      signIn: 'Iniciar sesion',
      bookDemo: 'Reservar demo',
      comparePlans: 'Comparar planes →',
      startFree: 'Empezar gratis →',
      openMenu: 'Abrir menu',
      closeMenu: 'Cerrar menu',
      closeNavigation: 'Cerrar navegacion',
      mobileNavigation: 'Navegacion movil',
      pillars: [
        { name: 'Pulse', description: 'Monitor intradia de operaciones', href: '/product/pulse' },
        { name: 'Benchmarks', description: 'Inteligencia competitiva', href: '/benchmarking' },
        { name: 'Watchtower', description: 'Senales externas del mercado', href: '/product/watchtower' },
        { name: 'Insights', description: 'Modulos analiticos especializados', href: '/insights' },
        { name: 'Sundae Intelligence', description: 'Analitica conversacional con IA', href: '/intelligence' },
        { name: 'Foresight', description: 'Inteligencia predictiva y pronosticos', href: '/product/foresight' },
      ],
      plansList: [
        { name: 'Sundae Report', description: 'Analisis historico gratuito', href: '/report' },
        { name: 'Sundae Core', description: 'Operaciones en tiempo real', href: '/core' },
        { name: 'Sundae Crew', description: 'Sustrato operativo · personal, horarios, nomina', href: '/crew' },
      ],
      solutionsSegments: [
        { name: 'Restaurantes multilocal', href: '/solutions/multi-location-groups' },
        { name: 'Franquicias', href: '/solutions/franchises' },
        { name: 'Cocinas nube', href: '/solutions/cloud-kitchens' },
        { name: 'Grupos hospitality enterprise', href: '/solutions/hospitality-operators' },
      ],
      solutionsRoles: [
        { name: 'Lideres de operaciones', href: '/solutions/regional-managers' },
        { name: 'Equipos de finanzas y FP&A', href: '/solutions/finance-teams' },
        { name: 'Equipos de marketing', href: '/solutions/marketing-teams' },
        { name: 'Direccion y propietarios', href: '/solutions/c-suite-executives' },
        { name: 'Equipos de datos y tecnologia', href: '/solutions/technology-teams' },
        { name: 'Equipos de personas y RR. HH.', href: '/solutions/hr-teams' },
      ],
      resourcesList: [
        { name: 'Blog', href: '/blog' },
        { name: 'Documentacion', href: '/docs' },
        { name: 'Casos de estudio', href: '/resources' },
        { name: 'Preguntas frecuentes', href: '/faq' },
        { name: 'Herramientas y calculadoras gratis', href: '/tools' },
      ],
    },
    footer: {
      readyTitle: 'Listo para ver lo que te estas perdiendo?',
      readyDescription: 'Unete a operadores que pasaron de adivinar a saber.',
      bookDemo: 'Reservar demo',
      startFree: 'Empezar gratis con Report',
      brandDescription:
        'Inteligencia de decision para restaurantes. Entiende el rendimiento, anticipa lo que viene y actua con confianza.',
      global: 'Global',
      allCurrencies: 'Todas las monedas',
      sectionProduct: 'Producto',
      sectionSolutions: 'Soluciones',
      sectionResources: 'Recursos',
      sectionCompany: 'Empresa',
      pricing: 'Precios',
      privacy: 'Privacidad',
      terms: 'Terminos',
      copyrightSuffix: 'Todos los derechos reservados.',
      companyLinks: [
        { name: 'Acerca de', href: '/about' },
        { name: 'Carreras', href: '/careers' },
        { name: 'Contacto', href: '/contact' },
        { name: 'Seguridad', href: '/security' },
        { name: 'Integraciones', href: '/integrations' },
      ],
      extraResources: [
        { name: 'Primeros pasos', href: '/getting-started' },
      ],
    },
    home: {
      badge: 'Plataforma de inteligencia de decision',
      titleTop: 'Inteligencia de decision',
      titleBottom: 'para restaurantes',
      description:
        'Tus datos viven en 5 a 10 sistemas desconectados. Tu equipo decide por intuicion mientras el margen se fuga cada dia.',
      descriptionEmphasis: 'Esa es la concesion que Sundae elimina.',
      narrativeAnchor: 'Del retraso del reporting a la velocidad operativa.',
      startFree: 'Empezar gratis',
      bookDemo: 'Reservar demo',
      noCard: 'No se requiere tarjeta de credito',
      proofStats: [
        { number: '6', label: 'Capas de inteligencia' },
        { number: '30+', label: 'Modulos analiticos' },
        { number: '12', label: 'Dominios de datos unificados' },
        { number: '5 min', label: 'Refresco por turno' },
      ],
      problem: {
        eyebrow: 'EL PROBLEMA',
        heading: 'Las brechas que te cuestan dinero cada dia',
        description: 'Todos los grupos de restaurantes con los que trabajamos comparten los mismos puntos ciegos.',
        kpis: [
          { value: '12+', label: 'Fuentes de datos', supporting: 'Desconectadas en toda tu operacion', color: 'red' },
          { value: '72 h', label: 'Para cerrar libros', supporting: 'Mientras las fugas de margen se acumulan cada dia', color: 'amber' },
          { value: '0%', label: 'Contexto de mercado', supporting: 'No hay benchmarks de pares para tus KPI', color: 'red' },
          { value: '$50K+', label: 'Fuga anual', supporting: 'Por mermas, cortesias y ajustes', color: 'amber' },
        ],
      },
      platform: {
        eyebrow: '6 CAPAS · UNA VERDAD',
        heading: 'Seis capas. Una verdad.',
        description: 'Del turno en vivo al plan a largo plazo — una plataforma, seis capas que se hablan entre si.',
        countLabel: 'de 6',
        exploreModules: 'Explorar todos los modulos',
        learnMore: 'Saber mas',
        layers: [
          { name: 'Pulse', subtitle: 'Operaciones en tiempo real', description: 'Ritmo en vivo, objetivos adaptativos, rendimiento del personal, fugas — turno a turno.', href: '/product/pulse' },
          { name: 'Benchmarks', subtitle: 'Inteligencia competitiva', description: 'Benchmarks anonimos de pares en 30+ metricas. Sabe exactamente donde estas.', href: '/benchmarking' },
          { name: 'Watchtower', subtitle: 'Inteligencia de mercado', description: 'Competencia, clima, eventos — antes de que toquen tus numeros.', href: '/product/watchtower' },
          { name: 'Insights', subtitle: '30+ modulos analiticos', description: 'Ingresos, personal, inventario, marketing, delivery — cada uno con recomendaciones de IA.', href: '/insights' },
          { name: 'Sundae Intelligence', subtitle: 'IA conversacional', description: 'Preguntale cualquier cosa a tus datos. Respuestas en segundos en web, Slack o Teams.', href: '/intelligence' },
          { name: 'Foresight', subtitle: 'Inteligencia predictiva', description: 'Pronosticos 14–90 dias, escenarios hipoteticos, briefings ejecutivos autocorregibles.', href: '/product/foresight' },
        ],
      },
      modules: {
        eyebrow: 'MODULOS DE INTELIGENCIA',
        heading: 'Mas de 30 modulos en 12 dominios',
        description: 'Cada dimension del rendimiento del restaurante: analizada, comparada y accionable.',
        categories: [
          { name: 'Inteligencia de ingresos', count: '4 modulos' },
          { name: 'Inteligencia laboral', count: '5 modulos' },
          { name: 'Experiencia del cliente', count: '3 modulos' },
          { name: 'Inventario y desperdicio', count: '3 modulos' },
          { name: 'Compras', count: '3 modulos' },
          { name: 'Rendimiento de marketing', count: '3 modulos' },
          { name: 'Delivery y plataformas', count: '2 modulos' },
          { name: 'Reservas', count: '2 modulos' },
          { name: 'Aseguramiento de ingresos', count: '2 modulos' },
          { name: 'Inteligencia de beneficio', count: '3 modulos' },
          { name: 'CRM de clientes', count: '3 modulos' },
          { name: 'Cross-Intelligence', count: 'Motor de correlacion' },
        ],
      },
      personas: {
        eyebrow: 'LO QUE ESCUCHAMOS DE OPERADORES',
        heading: 'Cada rol. Una sola plataforma.',
        description: 'Equipos distintos, preguntas distintas. Una sola fuente de verdad.',
        roles: [
          { title: 'Lideres de operaciones', pain: 'No puedes estar en todos los restaurantes al mismo tiempo.', outcome: 'Ritmo en vivo y rendimiento del personal en cada local — sabe quien necesita ayuda ahora.', attribution: 'Patron entre operadores multilocal' },
          { title: 'Finanzas y FP&A', pain: '3 dias para cerrar libros? Eso es demasiado tiempo.', outcome: 'Margen en tiempo real, costo laboral por turno, variaciones ligadas a la causa raiz.', attribution: 'Patron en conversaciones con CFO' },
          { title: 'C-suite y propietarios', pain: 'Tu peor local no es visible hasta el jueves.', outcome: 'Vista de portafolio, briefings diarios con IA, senales de mercado — por cada marca.', attribution: 'Patron entre fundadores y CEOs' },
          { title: 'Datos y tecnologia', pain: '12 APIs. 5 formatos. Cero esquema unificado.', outcome: 'Pipelines limpios, metricas gobernadas, API publica, webhooks y RBAC listos.', attribution: 'Patron entre lideres de datos' },
        ],
      },
      howItWorks: {
        eyebrow: 'COMO FUNCIONA',
        heading: 'De los datos a la decision en cuatro pasos',
        steps: [
          { step: '01', title: 'Conectar', description: 'POS, personal, inventario, delivery — la mayoria de integraciones en menos de 5 minutos.' },
          { step: '02', title: 'Entender', description: 'La IA detecta anomalias y suma clima, eventos y senales de competencia.' },
          { step: '03', title: 'Decidir', description: 'Recomendaciones concretas y explicables — objetivos, staffing, menu, pricing.' },
          { step: '04', title: 'Mejorar', description: 'Cada decision alimenta el sistema. Los playbooks afinan, los pronosticos se precisan.' },
        ],
      },
      mockup: {
        frameLabel: 'Pulse — Ritmo de ventas',
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
        coachAlert: 'La tasa de upsell de James K. esta 14% por debajo del promedio del turno. Considera emparejarlo con Sarah para las proximas 2 mesas.',
      },
      closingTitle: 'Deja de operar con los numeros de ayer.',
      closingDescription: '30 minutos. Tus datos. Lo que Sundae cambiaria realmente para tu equipo.',
      pages: {
        signIn: {
          metadataTitle: 'Iniciar sesion - Sundae',
          metadataDescription:
            'Inicia sesion en Sundae - tu vista unificada del rendimiento, las operaciones y la inteligencia competitiva para restaurantes.',
          brandTitle: 'Inteligencia de decisiones para restaurantes',
          brandDescription:
            'Rendimiento, operaciones e inteligencia competitiva - en una sola plataforma.',
          trustPoints: [
            'Inteligencia operativa en tiempo real',
            'Benchmarking multisitio',
            'Señales de mercado competitivo',
          ],
          headingTitle: 'Inicia sesion en Sundae',
          headingDescription:
            'Tu vista unificada del rendimiento, las operaciones y la inteligencia competitiva.',
          ssoGoogle: 'Continuar con Google',
          ssoMicrosoft: 'Continuar con Microsoft',
          or: 'o',
          emailLabel: 'Correo electronico',
          emailPlaceholder: 'tu@empresa.com',
          passwordLabel: 'Contrasena',
          passwordPlaceholder: 'Introduce tu contrasena',
          rememberMe: 'Recordarme',
          forgotPassword: '¿Olvidaste tu contrasena?',
          signingIn: 'Iniciando sesion...',
          redirecting: 'Redirigiendo...',
          signInButton: 'Iniciar sesion',
          continueToApp: 'Continuar a la app de Sundae',
          noAccount: '¿No tienes una cuenta?',
          getStartedFree: 'Empieza gratis',
          signInMainAppDescription:
            'El inicio de sesion ocurre en la aplicacion principal de Sundae. Este sitio no almacena ni procesa tu contrasena.',
          signInMainAppBenefits: [
            'Accede al espacio de trabajo de tu organizacion',
            'Cambia entre ubicaciones y productos',
            'Gestiona el restablecimiento de contrasena y la recuperacion de cuenta',
          ],
          footerTerms: 'Terminos',
          footerPrivacy: 'Privacidad',
          footerSecurity: 'Seguridad',
          footerSupport: 'Soporte',
          emailRequired: 'El correo electronico es obligatorio',
          emailInvalid: 'Introduce una direccion de correo valida',
          passwordRequired: 'La contrasena es obligatoria',
          passwordMin: 'La contrasena debe tener al menos 6 caracteres',
          invalidCredentials: 'Correo electronico o contrasena invalidos',
          genericError: 'Algo salio mal. Intentalo de nuevo.',
        },
        demo: {
          metadataTitle: 'Reservar una demo',
          metadataDescription:
            'Vea Sundae en accion con sus propios datos de restaurante. Reserve una demo de 30 minutos centrada en sus cifras y en sus prioridades operativas.',
          badge: 'RESERVAR DEMO',
          title: '30 minutos. Tus datos. Respuestas reales.',
          description:
            'Conectaremos tu POS, mostraremos lo que significan realmente tus numeros y te dejaremos decidir si Sundae puede ahorrarte tiempo y dar mas claridad al equipo.',
          requestTitle: 'Solicita tu demo',
          requestDescription:
            'Cuentanos sobre tu operacion y adaptaremos la sesion a tus prioridades.',
          ctaLabel: 'Reservar una demo',
          defaultMessage:
            'Me interesa ver como Sundae puede ayudar a las operaciones de mi restaurante.',
          whatYoullSeeTitle: 'Lo que veras',
          whatYoullSeeDescription: 'Un recorrido enfocado en torno a tu operacion.',
          benefits: [
            {
              title: 'Tus datos, en vivo',
              description:
                'Conectamos tu POS y mostramos lo que realmente ocurre en tus ubicaciones - no una demo generica con datos de muestra.',
              details: [
                'Integracion POS en vivo',
                'Vista general multisitio',
                'Deteccion de anomalías en tiempo real',
                'Analisis de tendencias historicas',
              ],
            },
            {
              title: 'Tus puntos ciegos',
              description:
                'Sacaremos a la luz las brechas que no sabias que existian - fugas de ingresos, ineficiencias laborales y oportunidades perdidas en tus datos.',
              details: [
                'Patrones de fuga de ingresos',
                'Optimizacion de costos laborales',
                'Brechas de rendimiento del menu',
                'Anomalias operativas',
              ],
            },
            {
              title: 'Tus preguntas, respondidas',
              description:
                'Trae tus preguntas operativas mas dificiles. Te mostraremos exactamente como las responde Sundae - o te diremos que no puede.',
              details: [
                'Integracion con tu stack',
                'Precios segun tu escala',
                'Cronograma de implementacion',
                'Seguridad y cumplimiento de datos',
              ],
            },
          ],
          whyOperatorsTitle: 'Por que los operadores toman la llamada',
          stats: [
            { stat: '30 min', label: 'Demo enfocada - sin relleno ni humo' },
            { stat: 'Tus datos', label: 'Usamos tus numeros reales, no un entorno de prueba' },
            { stat: 'Sin presion', label: 'Si no encaja, te lo diremos' },
            { stat: '24 h', label: 'La mayoria de las demos se programan en un dia habil' },
          ],
          ctaTitle: 'Mira lo que te estas perdiendo',
          ctaDescription: 'Treinta minutos para revisar tus datos y ver que merece realmente la atencion de tu equipo.',
          bookDemo: 'Reservar tu demo',
          viewPricing: 'Ver precios',
        },
        pricing: {
          metadataTitle: 'Precios - Sundae',
          metadataDescription:
            'Precios simples y transparentes para Sundae Report, Core, Watchtower y los modulos.',
          badge: 'Precios',
          title: 'Precios simples y transparentes',
          description:
            'Empieza gratis con Report. Escala a inteligencia en tiempo real con Core. Cada plan incluye creditos de Sundae Intelligence.',
          monthly: 'Mensual',
          annual: 'Anual',
          savePercent: 'Ahorra 10%',
          reportBadge: 'Sundae Report - Analisis historico y benchmarking',
          coreBadge: 'Sundae Core - Operaciones en tiempo real e inteligencia predictiva',
          enterpriseBadge: 'Enterprise',
          enterpriseTitle: 'Precios personalizados para operaciones grandes',
          enterpriseDescription:
            'Para grupos multisitio que necesitan white-label, SSO, SLA personalizados y soporte dedicado. Incluye 50,000+ creditos de inteligencia.',
          addOnsTitle: 'Complementos',
          addOnsDescription: 'Amplia tu plan con modulos de inteligencia especializados.',
          detailedPricingCalculator: 'Ver calculadora de precios detallada',
          faqTitle: 'Preguntas frecuentes',
          faqDescription: 'Respuestas claras. Sin letra pequena.',
          ctaTitle: '¿Listo para empezar?',
          ctaDescription: 'Empieza gratis, mejora cuando estes listo. No se requiere tarjeta.',
          bookDemo: 'Reservar una demo',
          startFree: 'Empieza gratis',
        },
        faq: {
          metadataTitle: 'FAQ - Sundae',
          metadataDescription:
            'Preguntas frecuentes sobre Sundae - precios, integraciones, seguridad de datos, onboarding y todo lo que los operadores de restaurantes necesitan saber antes de empezar.',
          badge: 'Preguntas frecuentes',
          title: 'Todo lo que necesitas saber',
          description:
            'Encuentra respuestas a preguntas comunes sobre Sundae, nuestros productos, precios y como los operadores toman mejores decisiones.',
          jumpToCategory: 'Ir a categoria:',
          stillHaveQuestions: '¿Aun tienes preguntas?',
          helpDescription: 'Nuestro equipo esta aqui para ayudarte. Reserva una demo, contacta con ventas o empieza gratis.',
          startFree: 'Empieza gratis',
          seePricing: 'Ver precios',
          bookDemo: 'Reservar demo',
          contactUs: 'Contactanos',
          emailSupportPrefix: 'O escribenos a:',
          categories: [
            'Inicio',
            'Productos y niveles',
            'Datos e integracion',
            'Modulos',
            'Watchtower',
            'Precios y facturacion',
            'Funciones y capacidades',
            'Soporte y formacion',
            'Seguridad y cumplimiento',
            'Enterprise',
            'Preguntas comparativas',
            'Casos de uso especificos',
          ],
        },
        modules: {
          metadataTitle: 'Modulos - Sundae',
          badge: 'Modulos especializados',
          title: 'Ve mas profundo donde mas importa',
          description:
            'Anade modulos especializados a Sundae Core para obtener inteligencia operativa profunda en mano de obra, inventario, compras, marketing y reservas.',
          mixAndMatch: 'Combinalos segun tus prioridades.',
          exploreAllModules: 'Explorar todos los modulos',
          calculateModuleRoi: 'Calcular ROI del modulo',
          whatAreModules: '¿Que son los modulos Sundae?',
          whatAreModulesDescription:
            'Los modulos son extensiones de inteligencia especializadas que profundizan tus analisis en areas operativas concretas.',
          fiveModules: 'Cinco modulos especializados',
          chooseStack: 'Elige tu pila de inteligencia',
          chooseStackDescription: 'Anade un modulo o los cinco. Construye la inteligencia que necesita tu operacion.',
          coreCapabilities: 'Capacidades principales:',
          roi: 'ROI',
          bestFor: 'Ideal para:',
          faqTitle: 'Preguntas frecuentes',
          faqDescription: 'Preguntas comunes sobre modulos, actualizaciones, precios e implementacion.',
          ctaTitle: '¿Listo para anadir inteligencia especializada?',
          ctaDescription: 'Empieza con el modulo que resuelve tu mayor dolor.',
          bookDemo: 'Reservar una demo',
          contactSales: 'Contactar ventas',
          pillars: [
            { title: 'Especializado, no disperso', description: 'Funciones profundas creadas para cada area operativa.' },
            { title: 'Anade lo que necesitas', description: 'Empieza por tu mayor problema y anade modulos cuando cambien las prioridades.' },
            { title: 'Integrado, no aislado', description: 'Los modulos comparten datos con Core en una plataforma unificada.' },
          ],
        },
        integrations: {
          metadataTitle: 'Integraciones - Sundae',
          badge: 'Integraciones',
          title: 'Conecta todo. Unifica tus datos.',
          description:
            'Sundae se integra con mas de 30 sistemas de restauracion en POS, mano de obra, inventario, reservas, delivery y mas.',
          process: [
            { step: '1', title: 'Conectar', description: 'Autentica tus plataformas con OAuth o clave API - la mayoria de integraciones tardan menos de 5 minutos.' },
            { step: '2', title: 'Normalizar', description: 'Scout limpia, mapea y unifica cada fuente de datos en un esquema coherente.' },
            { step: '3', title: 'Analizar', description: 'Los datos unificados alimentan dashboards, alertas y recomendaciones inteligentes.' },
          ],
          domainsTitle: '12 dominios de datos. Una vista unificada.',
          domainsDescription:
            'POS, mano de obra, inventario, compras, reservas, delivery, marketing, experiencia del cliente, CRM, contabilidad y resúmenes diarios de ventas - todo conectado.',
          live: 'En vivo',
          upcoming: 'Próximamente',
          liveNow: 'En vivo - disponible ahora',
          roadmap: 'Próximamente - en nuestra hoja de ruta',
          roadmapDescription: 'Las integraciones futuras están en desarrollo activo. Escríbenos para priorizar una integración concreta.',
          webhooksTitle: 'Webhooks y Public API',
          webhooksDescription: 'Crea integraciones personalizadas con las herramientas de desarrollador de Sundae.',
          customWebhooks: 'Webhooks personalizados',
          customWebhooksDescription:
            'Configura webhooks para cualquier dominio de datos que no sea POS y envia datos a Sundae desde cualquier sistema HTTP.',
          publicApi: 'Public API',
          publicApiDescription:
            'Usa la API de Sundae para llevar analitica estructurada a tus propios flujos, herramientas y capas de reportes.',
          liveDomains: 'Disponible para los 12 dominios de datos',
          signatureVerification: 'Verificacion de firma HMAC-SHA256',
          testPayloads: 'Payloads de prueba y seguimiento de entregas',
        },
        resources: {
          metadataTitle: 'Recursos - Sundae',
          badge: 'Recursos y herramientas',
          title: 'Recursos de inteligencia de decisiones',
          description:
            'Accede a guias, informes y herramientas para tomar decisiones mas inteligentes para tu restaurante.',
          getStarted: 'Empezar con Sundae',
          freeReport: 'Obtener un informe benchmark gratis',
          caseStudies: 'Casos de estudio',
          caseStudiesDescription:
            'Ve como los operadores usan Sundae para mejorar rendimiento, margenes y toma de decisiones.',
          caseStudiesNote: 'Ejemplos representativos basados en retos operativos reales; nombres de clientes omitidos.',
          segment: 'Segmento',
          challenge: 'Reto:',
          solution: 'Solucion Sundae:',
          outcomes: 'Resultados:',
          exploreProducts: 'Explora los productos usados en estos casos de estudio:',
          toolsTitle: 'Herramientas y calculadoras gratis',
          toolsDescription:
            'Prueba las calculadoras gratis de Sundae para costes de mano de obra, margenes de menu, readiness benchmark y mas.',
          exploreTools: 'Explorar todas las herramientas',
          stayUpdated: 'Mantente actualizado',
          newsletterDescription:
            'Recibe los ultimos insights del sector, benchmarks y tendencias de decision intelligence directamente en tu email.',
          subscribe: 'Suscribirse',
          privacyNote: 'Respetamos tu privacidad. Puedes darte de baja en cualquier momento.',
          ctaTitle: '¿Listo para transformar tu restaurante?',
          ctaDescription:
            'Unete a miles de operadores que usan Sundae para tomar decisiones mas inteligentes y basadas en datos.',
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
      title: 'Sundae – Entscheidungsintelligenz für Restaurants',
      description:
        'Die KI-Plattform, die Restaurantdaten in konkrete Entscheidungen übersetzt: POS-, Personal-, Kosten- und Betriebsdaten vereinheitlichen, Leistung vergleichen und sofortige Insights erhalten.',
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
      title: 'Sundae – beslissingsintelligentie voor restaurants',
      description:
        'Het AI-platform dat restaurantdata omzet in actie: POS-, personeels-, kosten- en operationele data samenbrengen, prestaties benchmarken en direct inzicht krijgen.',
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
      title: 'Sundae – inteligência de decisão para restaurantes',
      description:
        'A plataforma de IA que transforma dados de restaurantes em ação: unifique POS, equipe, custos e operações para comparar desempenho e obter insights imediatos.',
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
      title: 'Sundae – रेस्टोरेंट्स के लिए निर्णय इंटेलिजेंस',
      description:
        'AI प्लेटफॉर्म जो रेस्टोरेंट डेटा को कार्रवाई में बदलता है: POS, श्रम, लागत और ऑपरेशनल डेटा को जोड़ें, प्रदर्शन की तुलना करें और तुरंत इनसाइट पाएं.',
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
      title: 'Sundae – ریستورانوں کے لیے فیصلہ سازی انٹیلیجنس',
      description:
        'AI پلیٹ فارم جو ریستوران کے ڈیٹا کو عمل میں بدلتا ہے: POS، عملہ، لاگت اور آپریشنل ڈیٹا کو یکجا کریں، کارکردگی کا موازنہ کریں اور فوری بصیرت حاصل کریں۔',
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
} satisfies Partial<Record<WebsiteLocale, DeepPartial<WebsiteMessagesBase>>>

const expandedLocaleOverridesByLocale =
  expandedLocaleMessageOverrides as Partial<Record<WebsiteLocale, DeepPartial<WebsiteMessagesBase>>>

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
