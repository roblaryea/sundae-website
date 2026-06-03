'use client';

import type { ReactNode } from 'react';
import { FadeUp } from '@/components/ui/PageAnimations';
import { EditorialImage } from '@/components/ui/EditorialImage';

/**
 * Humanized editorial band — a full-bleed, brand-graded restaurant frame that
 * breathes real-world warmth into a page that is otherwise product UI + copy.
 * Answers the reviewer note "a restaurant product with zero restaurant photos."
 *
 * Prop-driven so the homepage can place a few distinct moments (the pass after the
 * hero, the brigade mid-page, the floor before the closing CTA) from one component.
 *
 * NOTE: copy is passed inline in English pending sign-off on the visual direction;
 * it gets lifted into `messages.home` + localized across all 22 locales once approved.
 */
export interface EditorialBandProps {
  src: string;
  /** Optional light-theme twin (mode-matched imagery, zero-flash swap). */
  light?: string;
  alt: string;
  eyebrow: string;
  /** ReactNode so headlines can embed the <SundaeWordmark/> where Sundae is the subject. */
  headline: ReactNode;
  sub?: string;
  /** Tailwind aspect utility. Default a wide cinematic band. */
  ratio?: string;
  /** Eager-load (above-the-fold only). */
  priority?: boolean;
  /** Section vertical padding. Default roomy. */
  padded?: boolean;
}

export function SectionEditorialBand({
  src,
  light,
  alt,
  eyebrow,
  headline,
  sub,
  ratio = 'aspect-[16/10] sm:aspect-[2/1] lg:aspect-[21/9]',
  priority = false,
  padded = true,
}: EditorialBandProps) {
  return (
    <section aria-label={alt} className={`relative px-4 sm:px-6 lg:px-8 ${padded ? 'py-16 sm:py-20' : 'py-8 sm:py-10'}`}>
      <div className="max-w-6xl mx-auto">
        <FadeUp>
          <EditorialImage
            src={src}
            light={light}
            alt={alt}
            ratio={ratio}
            overlay="text"
            rounded="rounded-[24px]"
            priority={priority}
          >
            <div className="max-w-2xl">
              {/* Legible premium kicker — white copy + a blue accent rule.
                  NOT the global `.eyebrow` class, which forces electric-blue text
                  that disappears over photography. */}
              <div className="mb-3.5 flex items-center gap-2.5">
                <span className="h-px w-7 bg-[var(--electric-blue)]" />
                <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-white/90 [text-shadow:0_1px_8px_rgba(0,0,0,0.5)]">
                  {eyebrow}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-[2.6rem] font-bold tracking-tight leading-[1.12] text-white text-balance [text-shadow:0_2px_18px_rgba(0,0,0,0.45)]">
                {headline}
              </h2>
              {sub && (
                <p className="mt-4 max-w-xl text-sm sm:text-base text-white/80 leading-relaxed [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]">
                  {sub}
                </p>
              )}
            </div>
          </EditorialImage>
        </FadeUp>
      </div>
    </section>
  );
}
