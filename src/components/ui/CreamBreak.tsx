'use client';

import { Fragment, type ReactNode } from 'react';
import { FadeUp } from '@/components/ui/PageAnimations';

/**
 * CreamBreak - a reusable warm "relief" band for inner pages.
 *
 * The homepage breaks its dark scroll with cream editorial sections (the volume
 * system - a light, warm breath between dense dark product sections). This is the
 * generic, copy-driven version for the rest of the site: drop one mid-page to
 * break the dark monotony and restate the page's promise in the warm voice.
 *
 * Self-contained ink-on-cream (theme-independent) so it reads as an intentional
 * warm zone in BOTH light and dark mode - exactly like the homepage relief.
 *
 * Copy is passed in (already localized by the caller). The `statement` may carry
 * a single `*...*` emphasis span, rendered in cherry-italic.
 */

const cherry = { color: 'var(--warm-cherry)' } as const;

function renderStatement(statement: string): ReactNode {
  return statement.split(/\*([^*]+)\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <em key={i} className="italic" style={cherry}>
        {part}
      </em>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  );
}

export interface CreamBreakProps {
  eyebrow: string;
  statement: string;
  lede?: string;
}

export function CreamBreak({ eyebrow, statement, lede }: CreamBreakProps) {
  return (
    <section
      aria-label={eyebrow}
      className="relative overflow-hidden py-24 sm:py-32"
      style={{ background: 'var(--cream)', color: 'var(--ink)' }}
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 45% at 50% 26%, rgba(233,162,74,0.18) 0%, transparent 65%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <FadeUp>
          <span
            className="mx-auto mb-7 block h-[3px] w-12 rounded-full"
            style={{ background: 'var(--warm-coral)' }}
          />
          <p
            className="mb-5 text-xs font-bold uppercase tracking-[0.2em] sm:text-sm"
            style={cherry}
          >
            {eyebrow}
          </p>
          <h2
            className="font-display mx-auto max-w-3xl text-3xl font-medium leading-[1.12] tracking-[-0.02em] sm:text-4xl lg:text-[3rem]"
            style={{ color: 'var(--ink)' }}
          >
            {renderStatement(statement)}
          </h2>
          {lede && (
            <p
              className="mx-auto mt-7 max-w-xl text-base leading-relaxed sm:text-lg"
              style={{ color: 'var(--ink-soft, rgba(26,20,15,0.64))' }}
            >
              {lede}
            </p>
          )}
        </FadeUp>
      </div>
    </section>
  );
}
