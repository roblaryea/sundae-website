'use client';

import { BookDemoButton } from '@/components/ui/BookDemoButton';

import { Button } from '@/components/ui/Button';
import { useWebsiteI18n } from '@/components/i18n/LocaleProvider';
import { GuidanceClose, GuidanceHero, GuidanceReveal } from '@/components/support/GuidanceLayout';
import { SystemCloseActions } from '@/components/support/SystemPresentation';
import { getLocalizedPathname } from '@/lib/i18n';
import { getCommercialCopy } from '@/lib/pricing/commercialCopy';
import copyByLocale from '@/content/support-system.json';
import guidanceByLocale from '@/content/support-guidance.json';

export default function FourDIntelligencePage() {
  const { locale } = useWebsiteI18n();
  const copy = copyByLocale[locale as keyof typeof copyByLocale];
  const guidance = guidanceByLocale[locale as keyof typeof guidanceByLocale];
  const commercial = getCommercialCopy(locale);
  const local = (path: string) => getLocalizedPathname(path, locale);
  const dimensions = [
    { id: 'past', name: 'PAST', question: copy.d1q, body: copy.d1b },
    { id: 'plan', name: 'PLAN', question: copy.d2q, body: copy.d2b },
    { id: 'peers', name: 'PEERS', question: copy.d3q, body: copy.d3b },
    { id: 'predicted', name: 'PREDICTED', question: copy.d4q, body: copy.d4b },
  ];
  return (
    <div className="search-brand-page min-h-screen bg-[var(--navy-deep)]">
      <GuidanceHero label="4D Intelligence" lead={copy.dLead} emphasis={copy.dEm} description={copy.dBody} compactDescription>
        <BookDemoButton variant="cta" size="lg" href={local('/demo')} trackingLabel="four_d_hero_walkthrough" className="max-w-full whitespace-normal! text-start" />
        <Button variant="outline-light" size="lg" href={local('/core')} trackingLabel="four_d_explore_core" className="max-w-full whitespace-normal! text-start">{guidance.coreCta}</Button>
      </GuidanceHero>
      <section id="dimensions" data-four-d-model className="bg-[#F7F2E9] px-6 py-16 text-[#241D17] sm:px-8 lg:px-12 lg:py-24" aria-label="4D Intelligence">
        <ol className="mx-auto grid max-w-7xl divide-y divide-[#241D17]/20 border-y border-[#241D17]/20 lg:grid-cols-2 lg:divide-y-0">
          {dimensions.map((dimension, index) => (
            <li key={dimension.id} id={dimension.id} className={`min-w-0 scroll-mt-28 py-10 lg:py-14 ${index % 2 === 0 ? 'lg:border-e lg:pe-12' : 'lg:ps-12'} ${index < 2 ? 'lg:border-b lg:border-[#241D17]/20' : ''}`}>
              <GuidanceReveal>
                <p data-dimension-name className="font-display text-[clamp(2.2rem,4vw,4rem)] leading-none tracking-[-0.02em] text-[#845128]">{dimension.name}</p>
                <h2 className="mt-6 font-display text-2xl leading-tight sm:text-3xl">{dimension.question}</h2>
                <p className="mt-5 max-w-lg text-lg leading-relaxed text-[#241D17]/80">{dimension.body}</p>
              </GuidanceReveal>
            </li>
          ))}
        </ol>
        <GuidanceReveal className="mx-auto mt-12 max-w-7xl border-t border-[#241D17]/20 pt-8">
          <aside data-four-d-coverage aria-labelledby="four-d-coverage-title">
            <h2 id="four-d-coverage-title" className="font-display text-2xl text-[#845128]">{commercial.packageTitle}</h2>
            <div className="mt-5 grid gap-5 text-base leading-relaxed text-[#241D17]/80 lg:grid-cols-3 lg:gap-10">
              <p>{commercial.coreUsageNote}</p><p>{commercial.foresightCoverage}</p><p>{commercial.watchtowerEligibility}</p>
            </div>
            <Button href={`${local('/core')}#packages`} variant="outline-ink" trackingLabel="four_d_package_coverage" className="mt-6 max-w-full whitespace-normal! text-start">{commercial.comparePackages}<span aria-hidden="true" className="rtl:rotate-180">→</span></Button>
          </aside>
        </GuidanceReveal>
      </section>
      <section id="action-and-review" className="px-6 py-16 sm:px-8 lg:px-12 lg:py-24" aria-labelledby="action-and-review-title">
        <div className="mx-auto max-w-7xl">
          <GuidanceReveal><h2 id="action-and-review-title" className="mb-12 max-w-4xl font-display text-3xl leading-tight text-[var(--text-primary)] sm:text-5xl">{copy.dActionTitle}</h2></GuidanceReveal>
          <ol className="grid gap-8 border-t border-[var(--border-default)] pt-8 lg:grid-cols-3 lg:gap-12">
            {[copy.dAction1, copy.dAction2, copy.dAction3].map((action, index) => <li key={action}><GuidanceReveal><span aria-hidden="true" className="font-display text-4xl text-[var(--text-warm)]">{String(index + 1).padStart(2, '0')}</span><p className="mt-5 max-w-sm text-xl leading-relaxed text-[var(--text-primary)]">{action}</p></GuidanceReveal></li>)}
          </ol>
        </div>
      </section>
      <GuidanceClose title={copy.dCloseTitle} description={copy.dCloseBody}>
        <SystemCloseActions locale={locale} secondaryHref="/core" secondaryLabel={guidance.coreCta} prefix="four_d_close" />
      </GuidanceClose>
    </div>
  );
}
