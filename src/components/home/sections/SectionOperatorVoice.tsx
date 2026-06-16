'use client';

import { Fragment, type ReactNode } from 'react';
import { FadeUp } from '@/components/ui/PageAnimations';
import { EditorialImage } from '@/components/ui/EditorialImage';
import { useWebsiteI18n } from '@/components/i18n/LocaleProvider';
import { useCta } from '@/lib/cta';
import { operatorVoiceCopy } from './operatorVoiceCopy';

/**
 * Operator voice - the human-presence beat. Puts a real face on a page that is
 * otherwise product UI, and speaks in the operator's own voice about the problem
 * Sundae exists to solve.
 *
 * This is an honest second-person empathy statement, NOT a fabricated named
 * testimonial (attributed quotes wait for a named pilot - see operatorVoiceCopy
 * + the Section-7 composite-quote policy). The portrait + large pull-quote gives
 * it the premium "testimonial" form without inventing a customer.
 */

// Theme-aware coral: deepens to #C8392A in light mode so accent text stays crisp on white.
const coral = { color: 'var(--accent-warm)' } as const;

/** Split on the `*…*` emphasis marker → warm-coral span (shared convention). */
function renderQuote(quote: string): ReactNode {
  return quote.split(/\*([^*]+)\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} style={coral}>
        {part}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  );
}

export function SectionOperatorVoice() {
  const { locale } = useWebsiteI18n();
  const copy = operatorVoiceCopy[locale as keyof typeof operatorVoiceCopy] ?? operatorVoiceCopy.en;
  const cta = useCta();

  return (
    <section aria-label={copy.eyebrow} className="relative px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.85fr_1fr] lg:gap-16">
        {/* Portrait - a real person on the line. */}
        <FadeUp>
          <EditorialImage
            src="/images/editorial/service-warm.jpg"
            alt={copy.alt}
            ratio="aspect-[4/5]"
            overlay="blend"
            rounded="rounded-[24px]"
            parallax
          />
        </FadeUp>

        {/* The operator's reality, in their own voice. */}
        <FadeUp delay={0.1}>
          <div className="max-w-xl">
            <div className="mb-6 flex items-center gap-2.5">
              <span aria-hidden className="h-px w-7" style={{ background: 'var(--accent-warm)' }} />
              <span className="text-xs font-bold uppercase tracking-[0.18em]" style={coral}>
                {copy.eyebrow}
              </span>
            </div>

            {/* Oversized editorial quotation mark. */}
            <span
              aria-hidden
              className="font-display block text-6xl leading-[0.6] sm:text-7xl"
              style={{ color: 'var(--accent-warm)', opacity: 0.3 }}
            >
              &ldquo;
            </span>

            <blockquote className="font-display mt-1 text-2xl font-medium leading-[1.32] tracking-[-0.01em] text-[var(--text-primary)] text-balance sm:text-3xl lg:text-[2.1rem] lg:leading-[1.3]">
              {renderQuote(copy.quote)}
            </blockquote>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-[var(--text-supporting)] sm:text-lg">
              {copy.resolution}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
              <cite className="text-sm not-italic text-[var(--text-muted)]">- {copy.attribution}</cite>
              <button
                type="button"
                onClick={() => cta('/demo', 'operator_voice_see_how', { page: '/home', section: 'operator_voice' })}
                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent-warm)] transition-colors hover:text-[var(--text-primary)]"
              >
                {copy.cta}
                <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">
                  &rarr;
                </span>
              </button>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
