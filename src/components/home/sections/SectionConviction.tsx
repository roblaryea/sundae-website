'use client';

import { Fragment, type ReactNode } from 'react';
import { FadeUp } from '@/components/ui/PageAnimations';

/**
 * SectionConviction - a reusable "belief beat" (the USHG copy-first move),
 * generalized from the homepage SectionManifesto so every top route can open
 * with conviction before its feature volume.
 *
 * Presentational on purpose: copy is passed in (already locale-resolved by the
 * route), so it carries no i18n coupling and never touches the qa:translation
 * gate. A single `*...*` span in `statement` renders in theme-aware warm coral
 * (--accent-warm: bright on dark, deeper on light).
 */

export type ConvictionCopy = {
  eyebrow: string;
  /** One `*...*` span renders warm-coral. */
  statement: string;
  coda?: string;
};

const coral = { color: 'var(--accent-warm)' } as const;

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

export function SectionConviction({
  eyebrow,
  statement,
  coda,
  align = 'center',
}: ConvictionCopy & { align?: 'center' | 'left' }) {
  const centered = align === 'center';
  return (
    <section
      aria-label={eyebrow}
      className="relative overflow-hidden border-y border-[var(--border-default)] py-20 sm:py-28"
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 32%, rgba(255,92,77,0.07) 0%, transparent 62%)',
        }}
      />
      <div
        className={`relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 ${
          centered ? 'text-center' : 'text-left'
        }`}
      >
        <FadeUp>
          <span
            aria-hidden
            className={`mb-7 block h-px w-12 ${centered ? 'mx-auto' : ''}`}
            style={{ background: 'var(--accent-warm)' }}
          />
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.22em] sm:text-sm" style={coral}>
            {eyebrow}
          </p>
          <p className="font-display text-[1.6rem] font-medium leading-[1.22] tracking-[-0.02em] text-[var(--text-primary)] text-balance sm:text-3xl lg:text-[2.6rem] lg:leading-[1.18]">
            {renderStatement(statement)}
          </p>
          {coda && (
            <p
              className={`mt-8 max-w-2xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg ${
                centered ? 'mx-auto' : ''
              }`}
            >
              {coda}
            </p>
          )}
        </FadeUp>
      </div>
    </section>
  );
}
