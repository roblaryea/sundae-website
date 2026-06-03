'use client';

import { FadeUp } from '@/components/ui/PageAnimations';
import { EditorialImage } from '@/components/ui/EditorialImage';

/**
 * Humanized editorial band — the first real-world breath on the homepage.
 *
 * The page above this is product UI + category framing; the reviewer's note was
 * "a restaurant product with zero restaurant photos." This band answers that:
 * a single premium, documentary kitchen frame, brand-graded so it blends into
 * the page in both themes, carrying one operator-truth line.
 *
 * NOTE: copy is inline English pending sign-off on the visual direction; it gets
 * lifted into `messages.home` + localized once the direction is approved.
 */
export function SectionEditorialBand() {
  return (
    <section aria-label="The restaurant you actually run" className="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="max-w-6xl mx-auto">
        <FadeUp>
          <EditorialImage
            src="/images/editorial/plating.jpg"
            alt="A chef plating a dish on the kitchen pass during service"
            ratio="aspect-[16/10] sm:aspect-[2/1] lg:aspect-[21/9]"
            overlay="text"
            rounded="rounded-[24px]"
            priority
          >
            <div className="max-w-2xl">
              <div className="eyebrow mb-3 text-white/80 [html.light_&]:text-white/90">
                From the pass to the P&amp;L
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-[2.6rem] font-bold tracking-tight leading-[1.1] text-white text-balance">
                The intelligence layer for the restaurant you actually run.
              </h2>
              <p className="mt-4 max-w-xl text-sm sm:text-base text-white/75 leading-relaxed">
                Not another dashboard to check. Sundae reads every shift, cover, and line
                item — and tells you the next right move while it still matters.
              </p>
            </div>
          </EditorialImage>
        </FadeUp>
      </div>
    </section>
  );
}
