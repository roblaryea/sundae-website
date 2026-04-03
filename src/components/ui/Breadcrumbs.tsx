'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SITE_URL } from '@/lib/urls';
import { useWebsiteI18n } from '@/components/i18n/LocaleProvider';
import { getLocalizedPathname, parseWebsiteLocaleFromPathname } from '@/lib/i18n';

const LABEL_MAP: Record<string, Record<string, string>> = {
  en: {
    product: 'Products',
    solutions: 'Solutions',
    report: 'Sundae Report',
    core: 'Sundae Core',
    watchtower: 'Watchtower',
    blog: 'Blog',
    company: 'Company',
    about: 'About',
    pricing: 'Pricing',
    security: 'Security',
    integrations: 'Integrations',
    contact: 'Contact',
    faq: 'FAQ',
    demo: 'Demo',
    modules: 'Modules',
    insights: 'Insights',
    resources: 'Resources',
    'sign-in': 'Sign in',
    signin: 'Sign in',
    'technology-teams': 'Technology Teams',
    'hr-teams': 'HR Teams',
    'operations-leaders': 'Operations Leaders',
    'finance-teams': 'Finance Teams',
    'franchise-operators': 'Franchise Operators',
    'independent-operators': 'Independent Operators',
    architecture: 'Architecture',
    scout: 'Scout',
    pulse: 'Pulse',
    forge: 'Forge',
    canvas: 'Canvas',
  },
  ar: {
    product: 'المنتجات',
    solutions: 'الحلول',
    report: 'Sundae Report',
    core: 'Sundae Core',
    watchtower: 'Watchtower',
    blog: 'المدونة',
    company: 'الشركة',
    about: 'حول',
    pricing: 'الأسعار',
    security: 'الأمان',
    integrations: 'التكاملات',
    contact: 'اتصل',
    faq: 'الأسئلة الشائعة',
    demo: 'عرض توضيحي',
    modules: 'الوحدات',
    insights: 'الرؤى',
    resources: 'الموارد',
    'sign-in': 'تسجيل الدخول',
    signin: 'تسجيل الدخول',
    architecture: 'البنية',
    scout: 'Scout',
    pulse: 'Pulse',
    forge: 'Forge',
    canvas: 'Canvas',
  },
  fr: {
    product: 'Produits',
    solutions: 'Solutions',
    report: 'Sundae Report',
    core: 'Sundae Core',
    watchtower: 'Watchtower',
    blog: 'Blog',
    company: 'Entreprise',
    about: 'A propos',
    pricing: 'Tarifs',
    security: 'Securite',
    integrations: 'Integrations',
    contact: 'Contact',
    faq: 'FAQ',
    demo: 'Demo',
    modules: 'Modules',
    insights: 'Insights',
    resources: 'Ressources',
    'sign-in': 'Connexion',
    signin: 'Connexion',
    architecture: 'Architecture',
    scout: 'Scout',
    pulse: 'Pulse',
    forge: 'Forge',
    canvas: 'Canvas',
  },
  es: {
    product: 'Productos',
    solutions: 'Soluciones',
    report: 'Sundae Report',
    core: 'Sundae Core',
    watchtower: 'Watchtower',
    blog: 'Blog',
    company: 'Empresa',
    about: 'Acerca de',
    pricing: 'Precios',
    security: 'Seguridad',
    integrations: 'Integraciones',
    contact: 'Contacto',
    faq: 'FAQ',
    demo: 'Demo',
    modules: 'Modulos',
    insights: 'Insights',
    resources: 'Recursos',
    'sign-in': 'Iniciar sesion',
    signin: 'Iniciar sesion',
    architecture: 'Arquitectura',
    scout: 'Scout',
    pulse: 'Pulse',
    forge: 'Forge',
    canvas: 'Canvas',
  },
};

function formatSegment(segment: string, locale: keyof typeof LABEL_MAP): string {
  return LABEL_MAP[locale][segment] || segment
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export function Breadcrumbs({ className = '' }: { className?: string }) {
  const pathname = usePathname();
  const { locale, messages } = useWebsiteI18n();
  const { pathname: unlocalizedPathname } = parseWebsiteLocaleFromPathname(pathname);

  // Don't render on homepage
  if (unlocalizedPathname === '/') return null;

  const segments = unlocalizedPathname.split('/').filter(Boolean);
  const crumbs = segments.map((seg, i) => ({
    label: formatSegment(seg, locale),
    href: getLocalizedPathname('/' + segments.slice(0, i + 1).join('/'), locale),
  }));
  const homeHref = getLocalizedPathname('/', locale);

  // JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: messages.layout.skipToContent ? (locale === 'ar' ? 'الرئيسية' : locale === 'fr' ? 'Accueil' : locale === 'es' ? 'Inicio' : 'Home') : 'Home', item: `${SITE_URL}${homeHref}` },
      ...crumbs.map((crumb, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: crumb.label,
        item: `${SITE_URL}${crumb.href}`,
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className={`text-sm ${className}`}>
        <ol className="flex items-center gap-1.5 flex-wrap">
          <li>
            <Link
              href={homeHref}
              className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            >
              {locale === 'ar' ? 'الرئيسية' : locale === 'fr' ? 'Accueil' : locale === 'es' ? 'Inicio' : 'Home'}
            </Link>
          </li>
          {crumbs.map((crumb, i) => {
            const isLast = i === crumbs.length - 1;
            return (
              <li key={crumb.href} className="flex items-center gap-1.5">
                <span className="text-[var(--text-muted)]" aria-hidden="true">/</span>
                {isLast ? (
                  <span className="text-[var(--text-primary)] font-medium" aria-current="page">
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    href={crumb.href}
                    className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    {crumb.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
