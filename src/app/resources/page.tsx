'use client';

import { BookDemoButton } from '@/components/ui/BookDemoButton';

import Link from 'next/link';
import { WalkthroughTeaser } from '@/components/resources/WalkthroughTeaser';
import { Button } from '@/components/ui/Button';
import resourceHeading from '@/content/buyer-proof-labels/resources.json';
import { PageHero, PageCTA } from '@/components/ui/PageAnimations';
import { useWebsiteI18n } from '@/components/i18n/LocaleProvider';
import { getLocalizedPathname } from '@/lib/i18n';
import { getCustomerStories } from '@/content/customer-stories';
import resourceCopy from '@/content/buyer-clarity/resources.json';
import resultsCopy from '@/content/buyer-clarity/results.json';
import { trackCta } from '@/lib/cta';

export default function ResourcesPage() {
  const { locale, messages } = useWebsiteI18n();
  const labels = messages.pages.resources;
  const copy = resourceCopy[locale as keyof typeof resourceCopy];
  const results = resultsCopy[locale as keyof typeof resultsCopy];
  const local = (pathname: string) => getLocalizedPathname(pathname, locale);
  return (
    <div className="search-brand-page min-h-screen bg-[var(--navy-deep)]">
      <PageHero compactMobileTop badge={labels.badge} title={resourceHeading[locale as keyof typeof resourceHeading].title} description={copy.description}>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <BookDemoButton variant="cta" size="lg" href={local('/demo')} trackingLabel="resources_walkthrough_hero" />
          <Button variant="outline-light" size="lg" href={local('/results')} trackingLabel="resources_results_hero">{copy.secondaryCta}</Button>
        </div>
      </PageHero>
      <WalkthroughTeaser />
      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow mb-4">{labels.caseStudies}</p>
          <h2 className="section-h2 mb-5 max-w-3xl">{results.storiesTitle}</h2>
          <p className="body-lg mb-10 max-w-3xl text-[var(--text-supporting)]">{copy.storiesNote}</p>
          <ol className="divide-y divide-[var(--border-default)] border-y border-[var(--border-default)]">
            {getCustomerStories(locale).map(story => (
              <li key={story.id}>
                <Link href={`${local('/results')}#${story.id}`} onClick={() => trackCta('resources_story_detail', { destination: `${local('/results')}#${story.id}`, section: story.id })} className="group grid gap-5 py-9 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-warm)] md:grid-cols-[1fr_1.5fr_auto] md:items-center">
                  <p className="eyebrow text-[var(--text-muted)]">{story.segment}</p>
                  <div>
                    <h3 className="font-display mb-3 text-2xl text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent-warm)] sm:text-3xl">{story.challenge}</h3>
                    <p className="text-sm leading-relaxed text-[var(--text-supporting)]">{story.description}</p>
                  </div>
                  <span aria-hidden className="text-2xl text-[var(--accent-warm)]">→</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <PageCTA title={copy.guidesTitle} description={copy.guidesDescription}>
        <Button variant="cta" size="lg" href={local('/blog')} trackingLabel="resources_operator_guides">{copy.guidesCta}</Button>
      </PageCTA>
    </div>
  );
}
