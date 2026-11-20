'use client';

import { BookDemoButton } from '@/components/ui/BookDemoButton';

import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import resourceCopy from '@/content/buyer-clarity/resources.json';
import { useWebsiteI18n } from '@/components/i18n/LocaleProvider';
import { GuidanceClose, GuidanceHero, GuidanceReveal } from '@/components/support/GuidanceLayout';
import { getLocalizedPathname } from '@/lib/i18n';
import { buildPricingSimulatorUrl } from '@/lib/pricingNavigation';
import { getCommercialCopy } from '@/lib/pricing/commercialCopy';
import { trackCta } from '@/lib/cta';
import { appendCampaign } from '@/lib/campaign';
import guidanceByLocale from '@/content/support-guidance.json';
import onboardingByLocale from '@/content/buyer-depth/onboarding.json';
import proofByLocale from '@/content/workflow-proof.json';
import tasks from '../../../public/images/product/native-2026-11-16/tasks.png';

export default function GettingStartedPage() {
  const { locale } = useWebsiteI18n();
  const walkthrough = resourceCopy[locale as keyof typeof resourceCopy].primaryCta;
  const copy = guidanceByLocale[locale as keyof typeof guidanceByLocale];
  const onboarding = onboardingByLocale[locale as keyof typeof onboardingByLocale];
  const proof = proofByLocale[locale as keyof typeof proofByLocale];
  const commercial = getCommercialCopy(locale);
  const local = (path: string) => getLocalizedPathname(path, locale);
  const simulator = buildPricingSimulatorUrl(locale);
  const stepLinks = [
    { href: local('/demo'), label: walkthrough },
    { href: simulator, label: commercial.viewEstimate },
    { href: local('/integrations'), label: copy.connectionsTitle },
  ];
  const choices = [
    { title: 'Sundae Core', description: copy.coreBody, href: '/core', cta: copy.coreCta },
    { title: 'Sundae Crew', description: copy.crewBody, href: '/crew', cta: copy.crewCta },
    { title: 'Core + Crew', description: copy.bothBody, href: '/product', cta: copy.platformCta },
  ];

  return (
    <div className="search-brand-page min-h-screen bg-[var(--navy-deep)]">
      <GuidanceHero label={copy.startLabel} lead={copy.startLead} emphasis={copy.startEmphasis} description={copy.startBody}>
        <BookDemoButton variant="cta" size="lg" href={local('/demo')} trackingLabel="book_demo_from_getting_started" className="max-w-full whitespace-normal! text-start" />
        <Button variant="outline-light" size="lg" href={simulator} trackingLabel="pricing_from_getting_started" className="max-w-full whitespace-normal! text-start">{commercial.viewEstimate}</Button>
      </GuidanceHero>

      <section id="journey" className="px-6 py-16 sm:px-8 lg:px-12 lg:py-24" aria-labelledby="journey-title">
        <div className="mx-auto max-w-7xl">
          <GuidanceReveal className="mb-12 max-w-3xl">
            <h2 id="journey-title" className="font-display text-3xl leading-tight text-[var(--text-primary)] sm:text-5xl">{copy.sequenceTitle}</h2>
            <p className="mt-5 text-lg leading-relaxed text-[var(--text-supporting)]">{onboarding.journeyDescription}</p>
          </GuidanceReveal>
          <ol className="border-t border-[var(--border-default)]">
            {onboarding.steps.map((step, index) => (
              <li key={step.title} id={`step-${index + 1}`} className="scroll-mt-28 border-b border-[var(--border-default)] py-10 sm:py-12">
                <GuidanceReveal>
                  <div className="grid gap-6 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-8 lg:grid-cols-[4rem_minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
                    <span aria-hidden="true" className="font-display text-5xl leading-none text-[var(--text-warm)]">{String(index + 1).padStart(2, '0')}</span>
                    <div className="min-w-0">
                      <h3 className="max-w-lg font-display text-2xl leading-tight text-[var(--text-primary)] sm:text-3xl">{step.title}</h3>
                      <p className="mt-4 max-w-lg text-base leading-relaxed text-[var(--text-muted)]">{step.subtitle}</p>
                    </div>
                    <div className="min-w-0 sm:col-start-2 lg:col-start-auto">
                      <p className="text-lg leading-relaxed text-[var(--text-supporting)]">{step.description}</p>
                      <ul className="mt-6 space-y-3 border-s border-[var(--border-emphasis)] ps-5 text-base leading-relaxed text-[var(--text-supporting)]">
                        {step.actions.map(action => <li key={action}>{action}</li>)}
                      </ul>
                      {stepLinks[index] && <a href={stepLinks[index].href} onClick={event => { event.currentTarget.href = appendCampaign(stepLinks[index].href); trackCta(`step_${index + 1}_cta`, { page: '/getting-started' }); }} className="brand-action-link mt-5 inline-flex min-h-11 items-center gap-3 font-semibold underline underline-offset-4">{stepLinks[index].label} <span aria-hidden="true" className="rtl:rotate-180">→</span></a>}
                    </div>
                  </div>
                  {index === 3 && (
                    <figure data-native-proof="tasks" className="mt-10 min-w-0 lg:ms-28">
                      <p className="eyebrow mb-4 text-[var(--text-warm)]">{proof.eyebrow}</p>
                      <p className="mb-5 font-display text-xl text-[var(--text-primary)]">{proof.tasks}</p>
                      <div className="brand-proof-frame overflow-x-auto rounded-lg border bg-[#FAF7F2]" dir="ltr" tabIndex={0} role="region" aria-label={proof.tasks}>
                        <Image src={tasks} alt={proof.tasks} sizes="(max-width: 1024px) 900px, 1152px" className="h-auto w-full min-w-[900px] lg:min-w-0" />
                      </div>
                      <figcaption className="mt-5 flex flex-col items-start gap-4 text-sm leading-relaxed text-[var(--text-supporting)] sm:flex-row sm:justify-between">
                        <p className="max-w-2xl">{proof.disclosure}</p>
                        <a href="/images/product/native-2026-11-16/tasks.png" target="_blank" rel="noreferrer" className="brand-action-link inline-flex min-h-11 shrink-0 items-center font-semibold underline underline-offset-4">{proof.openImage} ↗</a>
                      </figcaption>
                    </figure>
                  )}
                </GuidanceReveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="starting-point" className="bg-[#F7F2E9] px-6 py-16 text-[#241D17] sm:px-8 lg:px-12 lg:py-24" aria-labelledby="starting-point-title">
        <div className="mx-auto max-w-7xl">
          <GuidanceReveal><h2 id="starting-point-title" className="max-w-4xl font-display text-4xl leading-tight sm:text-5xl">{copy.choiceTitle}</h2></GuidanceReveal>
          <div className="mt-12 grid divide-y divide-[#241D17]/20 border-y border-[#241D17]/20 lg:grid-cols-3 lg:divide-x lg:divide-y-0 rtl:lg:divide-x-reverse">
            {choices.map(choice => (
              <GuidanceReveal key={choice.title} className="flex flex-col items-start py-8 lg:px-8 lg:first:ps-0 lg:last:pe-0 lg:py-10">
                <h3 className="font-display text-3xl">{choice.title}</h3>
                <p className="mb-7 mt-5 max-w-sm flex-1 text-lg leading-relaxed text-[#241D17]/80">{choice.description}</p>
                <Button href={local(choice.href)} variant="outline-ink" trackingLabel="getting_started_product_choice" trackingMetadata={{ destination: choice.href }} className="max-w-full whitespace-normal! text-start">{choice.cta} →</Button>
              </GuidanceReveal>
            ))}
          </div>
          <GuidanceReveal className="mt-12 grid gap-5 border-t border-[#241D17]/20 pt-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
            <h3 className="font-display text-2xl text-[#845128]">{copy.implementationTitle}</h3>
            <div>
              <p className="max-w-2xl text-lg leading-relaxed text-[#241D17]/80">{commercial.setup}</p>
              <Button href={simulator} variant="outline-ink" trackingLabel="implementation_estimate_from_getting_started" className="mt-6 max-w-full whitespace-normal! text-start">{commercial.viewEstimate} →</Button>
            </div>
          </GuidanceReveal>
        </div>
      </section>

      <GuidanceClose title={copy.closeTitle} description={copy.closeBody}>
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:gap-10">
          <div className="max-w-md">
            <BookDemoButton variant="cta" size="lg" href={local('/demo')} trackingLabel="getting_started_close_walkthrough" className="max-w-full whitespace-normal! text-start" />
            <p className="mt-4 text-sm leading-relaxed text-[var(--text-muted)]">{commercial.sampleWalkthrough}</p>
          </div>
          <a href={local('/diagnostic')} onClick={event => { event.currentTarget.href = appendCampaign(local('/diagnostic')); trackCta('final_card_from_getting_started', { page: '/getting-started' }); }} className="brand-action-link inline-flex min-h-14 items-center gap-3 font-semibold underline underline-offset-4">{copy.diagnosticCta} <span aria-hidden="true" className="rtl:rotate-180">→</span></a>
        </div>
      </GuidanceClose>
    </div>
  );
}
