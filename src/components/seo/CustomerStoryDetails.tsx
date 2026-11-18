'use client';

import { useWebsiteI18n } from '@/components/i18n/LocaleProvider';
import { getCustomerStories } from '@/content/customer-stories';
import resultsCopy from '@/content/buyer-clarity/results.json';

/** One source powers Resources previews and these complete story sections. */
export function CustomerStoryDetails() {
  const { locale, messages } = useWebsiteI18n();
  const copy = resultsCopy[locale as keyof typeof resultsCopy];
  const labels = messages.pages.resources;
  return (
    <div className="mx-auto max-w-6xl divide-y divide-[var(--border-default)] px-4 sm:px-6 lg:px-8">
      {getCustomerStories(locale).map(story => (
        <article key={story.id} id={story.id} className="scroll-mt-28 py-14 sm:py-20">
          <p className="eyebrow mb-4 text-[var(--accent-warm)]">{story.segment}</p>
          <h3 className="font-display mb-8 max-w-3xl text-3xl leading-tight text-[var(--text-primary)] sm:text-4xl">{story.challenge}</h3>
          <div className="grid gap-9 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div>
              <p className="body-lg mb-8 text-[var(--text-supporting)]">{story.description}</p>
              <p className="eyebrow mb-4">{labels.solution}</p>
              <ul className="space-y-3 text-[var(--text-supporting)]">
                {story.solution.map(item => <li key={item} className="flex gap-3"><span aria-hidden className="text-[var(--accent-warm)]">·</span><span>{item}</span></li>)}
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-5">{copy.outcomesLabel}</p>
              <dl className="divide-y divide-[var(--border-default)]">
                {story.outcomes.map(outcome => (
                  <div key={outcome.metric} className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1 py-4 first:pt-0">
                    <dt className="max-w-[18rem] text-sm text-[var(--text-supporting)]">{outcome.metric}</dt>
                    <dd className="font-display text-3xl text-[var(--text-warm)]">{outcome.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <aside className="mt-9 border-s-2 border-[var(--accent-warm)] ps-5 text-sm leading-relaxed text-[var(--text-supporting)]">
            <p className="mb-2 font-semibold text-[var(--text-primary)]">{copy.evidenceLabel}</p>
            <p className="max-w-4xl">{copy.evidenceNote}</p>
          </aside>
        </article>
      ))}
    </div>
  );
}
