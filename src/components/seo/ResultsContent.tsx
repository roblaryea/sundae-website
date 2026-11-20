'use client';

import { BookDemoButton } from '@/components/ui/BookDemoButton';

import { Button } from '@/components/ui/Button';
import { PageHero, PageCTA } from '@/components/ui/PageAnimations';
import { useWebsiteI18n } from '@/components/i18n/LocaleProvider';
import { NativeWorkflowProof } from '@/components/seo/NativeWorkflowProof';
import { CustomerStoryDetails } from '@/components/seo/CustomerStoryDetails';
import { getLocalizedPathname } from '@/lib/i18n';
import resultsCopy from '@/content/buyer-clarity/results.json';
import openingCopy from '@/content/operator-openings.json';

export function ResultsContent() {
  const { locale } = useWebsiteI18n();
  const copy = resultsCopy[locale as keyof typeof resultsCopy];
  const local = (pathname: string) => getLocalizedPathname(pathname, locale);
  return (
    <div className="search-brand-page min-h-screen bg-[var(--navy-deep)]">
      <PageHero badge={copy.eyebrow} title={copy.title} description={copy.description} compactMobileTop>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <BookDemoButton variant="cta" size="lg" href={local('/demo')} trackingLabel="results_walkthrough_hero" />
          <Button variant="outline-light" size="lg" href="#crew-workflows" trackingLabel="results_workflows_hero">{copy.secondaryCta}</Button>
        </div>
      </PageHero>
      <section id="crew-workflows" className="scroll-mt-28 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="section-h2 mb-5 max-w-3xl">{copy.workflowTitle}</h2>
          <p className="body-lg max-w-3xl text-[var(--text-supporting)]">{copy.workflowDescription}</p>
        </div>
      </section>
      <NativeWorkflowProof locale={locale} view="tasks" />
      <NativeWorkflowProof locale={locale} view="logbook" />
      <NativeWorkflowProof locale={locale} view="tips" />
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-7 border-y border-[var(--border-default)] py-10 lg:flex-row lg:items-center">
          <div className="max-w-3xl">
            <h2 className="font-display mb-4 text-3xl text-[var(--text-primary)]">Sundae Core</h2>
            <p className="body-lg text-[var(--text-supporting)]">{openingCopy[locale as keyof typeof openingCopy].coreDescription}</p>
          </div>
          <Button variant="outline-light" href={local('/core')} trackingLabel="results_explore_core">Sundae Core →</Button>
        </div>
      </section>
      <section className="px-4 pt-12 sm:px-6 lg:px-8" aria-labelledby="customer-stories">
        <div className="mx-auto max-w-6xl">
          <h2 id="customer-stories" className="section-h2 mb-5 max-w-3xl">{copy.storiesTitle}</h2>
          <p className="body-lg max-w-3xl text-[var(--text-supporting)]">{copy.storiesDescription}</p>
        </div>
      </section>
      <CustomerStoryDetails />
      <PageCTA title={copy.ctaTitle} description={copy.ctaDescription}>
        <BookDemoButton variant="cta" size="lg" href={local('/demo')} trackingLabel="results_walkthrough_closing" />
      </PageCTA>
    </div>
  );
}
