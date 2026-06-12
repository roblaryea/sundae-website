'use client';

import { Fragment, type ReactNode } from 'react';
import { FadeUp } from '@/components/ui/PageAnimations';
import { useWebsiteI18n } from '@/components/i18n/LocaleProvider';
import { manifestoCopy } from './manifestoCopy';

/**
 * Manifesto — the "belief beat" that opens the page after the hero.
 *
 * The category-leader move (USHG: "Extending Enlightened Hospitality is at the
 * heart of everything we do"): state what you believe, large and copy-first,
 * before the product earns its place. Deliberately type-led with generous air —
 * no product UI, no imagery, so it reads as conviction, not a feature.
 */

const coral = { color: 'var(--warm-coral)' } as const;

/** Split on the `*…*` emphasis marker → warm-coral italic span (shared convention). */
function renderStatement(statement: string): ReactNode {
  return statement.split(/\*([^*]+)\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <em key={i} className="not-italic font-medium" style={coral}>
        {part}
      </em>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  );
}

export function SectionManifesto() {
  const { locale } = useWebsiteI18n();
  const copy = manifestoCopy[locale as keyof typeof manifestoCopy] ?? manifestoCopy.en;

  return (
    <section
      aria-label={copy.eyebrow}
      className="relative overflow-hidden border-y border-[var(--border-default)] py-24 sm:py-32"
    >
      {/* Quiet warm radial — same family as the hero glow, dialed back so the type leads. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 32%, rgba(255,92,77,0.07) 0%, transparent 62%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <FadeUp>
          <span
            aria-hidden
            className="mx-auto mb-8 block h-px w-12"
            style={{ background: 'var(--warm-coral)' }}
          />
          <p className="mb-7 text-xs font-bold uppercase tracking-[0.22em] sm:text-sm" style={coral}>
            {copy.eyebrow}
          </p>
          <p className="font-display text-[1.65rem] font-medium leading-[1.22] tracking-[-0.02em] text-[var(--text-primary)] text-balance sm:text-3xl lg:text-[2.75rem] lg:leading-[1.18]">
            {renderStatement(copy.statement)}
          </p>
          <p className="mx-auto mt-9 max-w-2xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
            {copy.coda}
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
