'use client';

import { Button } from '@/components/ui/Button';
import { PageHero } from '@/components/ui/PageAnimations';
import { useWebsiteI18n } from '@/components/i18n/LocaleProvider';
import { getLocalizedPathname } from '@/lib/i18n';
import copyByLocale from '@/content/buyer-clarity/docs.json';
import sharedCopy from '@/content/buyer-clarity/shared.json';

export default function DocumentationPage() {
  const { locale, messages } = useWebsiteI18n();
  const copy = copyByLocale[locale as keyof typeof copyByLocale];
  const shared = sharedCopy[locale as keyof typeof sharedCopy];
  const local = (pathname: string) => getLocalizedPathname(pathname, locale);
  const guides = [
    { title: copy.currentCoreTitle, description: copy.currentCoreDescription, href: '/getting-started', product: 'Sundae Core' },
    { title: copy.currentCrewTitle, description: copy.currentCrewDescription, href: '/crew', product: 'Sundae Crew' },
  ];
  return (
    <div className="search-brand-page min-h-screen bg-[var(--navy-deep)]">
      <PageHero compactMobileTop badge="Sundae" title={copy.ctaTitle} description={copy.ctaDescription}>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Button variant="cta" size="lg" href={local('/demo')} trackingLabel="docs_walkthrough">{messages.navbar.bookDemo}</Button>
          <Button variant="outline-light" size="lg" href={local('/results')} trackingLabel="docs_results">{shared.resultsLabel}</Button>
        </div>
      </PageHero>
      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl divide-y divide-[var(--border-default)] border-y border-[var(--border-default)]">
          {guides.map(guide => (
            <article key={guide.product} className="grid items-start gap-6 py-12 md:grid-cols-[1fr_1.1fr_auto] md:gap-10">
              <div>
                <p className="eyebrow mb-4 text-[var(--accent-warm)]">{guide.product}</p>
                <h2 className="font-display text-3xl leading-tight text-[var(--text-primary)]">{guide.title}</h2>
              </div>
              <p className="body-lg text-[var(--text-supporting)]">{guide.description}</p>
              <Button variant="outline-light" href={local(guide.href)} trackingLabel="docs_product_guidance" trackingMetadata={{ destination: guide.href }}>{guide.product} →</Button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
