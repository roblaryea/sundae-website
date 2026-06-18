'use client';

import type { ReactNode } from 'react';
import Image from 'next/image';
import { FadeUp } from '@/components/ui/PageAnimations';
import { EditorialImage } from '@/components/ui/EditorialImage';
import { useSettledReducedMotion } from '@/lib/useSettledReducedMotion';

/**
 * Editorial split - a premium portrait image beside a text column.
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
  /**
   * Optional muted ambient video for the panel (a living restaurant moment).
   * When set, the panel is a looping video (poster + reduced-motion still
   * fallback, lazy via preload=none) instead of the static photo.
   */
  video?: { webm: string; mp4: string; poster: string };
}

const SPLIT_RATIO = 'aspect-[4/5] sm:aspect-[3/2] lg:aspect-[4/5]';

export function SectionEditorialSplit({
  src,
  light,
  alt,
  eyebrow,
  headline,
  sub,
  imageSide = 'left',
  video,
}: EditorialSplitProps) {
  const reduce = useSettledReducedMotion();
  return (
    <section aria-label={alt} className="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
        <FadeUp className={imageSide === 'right' ? 'lg:order-2' : ''}>
          {video ? (
            // Living video panel - same frame treatment as EditorialImage.
            <figure
              className={`group relative isolate overflow-hidden rounded-[24px] ${SPLIT_RATIO} border border-[var(--border-default)] shadow-2xl shadow-black/40 ring-1 ring-white/[0.06] [html.light_&]:shadow-black/[0.08] [html.light_&]:ring-black/[0.05]`}
            >
              {reduce ? (
                <Image src={video.poster} alt={alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
              ) : (
                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="none"
                  poster={video.poster}
                  aria-label={alt}
                >
                  <source src={video.webm} type="video/webm" />
                  <source src={video.mp4} type="video/mp4" />
                </video>
              )}
              {/* warm grade + edge-blend, mirroring EditorialImage's premium frame */}
              <div
                aria-hidden
                className="absolute inset-0 opacity-50 mix-blend-soft-light [html.light_&]:opacity-[0.22]"
                style={{ background: 'linear-gradient(120deg, rgba(233,162,74,0.55), rgba(255,92,77,0.34) 55%, transparent)' }}
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, color-mix(in srgb, var(--navy-deep) 28%, transparent) 0%, transparent 28%, transparent 74%, color-mix(in srgb, var(--navy-deep) 40%, transparent) 100%)',
                }}
              />
              <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[24px] ring-1 ring-inset ring-white/[0.08] [html.light_&]:ring-white/40" />
            </figure>
          ) : (
            <EditorialImage
              src={src}
              light={light}
              alt={alt}
              ratio={SPLIT_RATIO}
              overlay="blend"
              rounded="rounded-[24px]"
              parallax
            />
          )}
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
