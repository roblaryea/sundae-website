'use client';

import type { ReactNode } from 'react';
import { FadeUp } from '@/components/ui/PageAnimations';
import { EditorialImage } from '@/components/ui/EditorialImage';

/**
 * Editorial split — a premium portrait image beside a text column.
 *
 * The counterpart to <SectionEditorialBand>: bands are wide/landscape with copy
 * overlaid; splits are for PORTRAIT photography (which crops badly in a wide band)
 * and keep the copy on the page background, so it inherits theme-aware text colors
 * instead of white-on-photo. Together they give the page rhythm variety.
 */
export interface EditorialSplitProps {
  src: string;
  light?: string;
  alt: string;
  eyebrow: string;
  headline: ReactNode;
  sub?: string;
  /** Side the image sits on at lg+. Default 'left'. */
  imageSide?: 'left' | 'right';
}

export function SectionEditorialSplit({
  src,
  light,
  alt,
  eyebrow,
  headline,
  sub,
  imageSide = 'left',
}: EditorialSplitProps) {
  return (
    <section aria-label={alt} className="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
        <FadeUp className={imageSide === 'right' ? 'lg:order-2' : ''}>
          <EditorialImage
            src={src}
            light={light}
            alt={alt}
            ratio="aspect-[4/5] sm:aspect-[3/2] lg:aspect-[4/5]"
            overlay="blend"
            rounded="rounded-[24px]"
          />
        </FadeUp>
        <FadeUp className={imageSide === 'right' ? 'lg:order-1' : ''}>
          <div className="max-w-xl">
            <div className="eyebrow mb-4">{eyebrow}</div>
            <h2 className="section-h2 text-balance mb-5">{headline}</h2>
            {sub && <p className="body-lg max-w-lg">{sub}</p>}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
