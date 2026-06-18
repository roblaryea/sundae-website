'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useSettledReducedMotion } from '@/lib/useSettledReducedMotion';

type Overlay = 'blend' | 'text' | 'duotone' | 'none';

interface EditorialImageProps {
  /** Primary image (used in both themes unless `light` is supplied). */
  src: string;
  /**
   * Optional light-theme twin. When set, this image is shown under `html.light`
   * and `src` is treated as the dark-theme image - mirroring <ThemedShot> so each
   * mode gets premium, mode-matched imagery with zero hydration flash.
   */
  light?: string;
  alt: string;
  /** Tailwind aspect ratio utility, e.g. "aspect-[16/9]". Default "aspect-[16/10]". */
  ratio?: string;
  /**
   * Brand treatment:
   *  - "blend"   (default) edge-blend scrim so the image melts into the page bg in both themes.
   *  - "text"    stronger bottom scrim for legible overlaid copy.
   *  - "duotone" subtle navy/blue brand wash for cohesion on busy frames.
   *  - "none"    raw image inside the frame.
   */
  overlay?: Overlay;
  /** Eager-load for above-the-fold placements (LCP). Default false. */
  priority?: boolean;
  /** Rounding utility. Default "rounded-[20px]". */
  rounded?: string;
  /** Add a faint film grain for an editorial, less-synthetic finish. Default true. */
  grain?: boolean;
  /** Lift on hover (premium motion). Default true. */
  hover?: boolean;
  /** Subtle scroll-linked vertical parallax on the photo (cinematic, opt-in). Default false. Auto-disabled under prefers-reduced-motion. */
  parallax?: boolean;
  /** CSS object-position for the photo (e.g. "center 70%") - bias the crop on extreme aspect ratios. */
  objectPosition?: string;
  /** Extra classes on the outer frame. */
  className?: string;
  /** Overlaid content (kicker / quote), rendered above the scrim. */
  children?: React.ReactNode;
  sizes?: string;
}

/**
 * Premium editorial photography wrapper for the marketing site.
 *
 * The treatment is deliberately restrained - real restaurant imagery should read
 * as natural and premium, not as heavily-filtered stock. Two jobs:
 *   1. Blend: a gradient built from `var(--navy-deep)` (which flips white↔navy per
 *      theme) feathers the image edges into the page background, so a photo never
 *      sits as a hard rectangle on either light or dark.
 *   2. Cohere: a whisper of warm-coral brand wash + optional grain ties the
 *      photography to the product UI without dulling it.
 *
 * Theme behaviour matches <ThemedShot>: swaps are pure CSS off `html.light`, so
 * dark and light each keep their own first-class look with no flash and no JS race.
 */
/**
 * Scroll-linked parallax wrapper. Isolated into its own component so the
 * `useScroll` hook only ever mounts for images that actually opt into parallax
 * (`parallax`), never for the many static editorial images - which keeps
 * framer's scroll-offset tracking (and its console warning) scoped to the few
 * places that need it.
 */
function ParallaxPhoto({
  targetRef,
  children,
}: {
  targetRef: React.RefObject<HTMLElement | null>;
  children: React.ReactNode;
}) {
  // The wrapper structure is identical regardless of motion preference (so SSR
  // and the first client render always match); only the drift is gated, settling
  // to a static photo after mount for reduced-motion users.
  const reduce = useSettledReducedMotion();
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  });
  // Photo drifts slightly against the scroll for a subtle cinematic parallax.
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-7%', '7%']);
  return (
    <motion.div className="absolute inset-x-0 -top-[9%] h-[118%]" style={{ y }}>
      {children}
    </motion.div>
  );
}

export function EditorialImage({
  src,
  light,
  alt,
  ratio = 'aspect-[16/10]',
  overlay = 'blend',
  priority = false,
  rounded = 'rounded-[20px]',
  grain = true,
  hover = true,
  parallax = false,
  objectPosition,
  className = '',
  children,
  sizes = '(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1200px',
}: EditorialImageProps) {
  const figureRef = useRef<HTMLElement>(null);
  // Structure stays stable across motion preferences; ParallaxPhoto gates the
  // drift itself (avoids a reduced-motion SSR/client structural mismatch).
  const useParallax = parallax;

  const photography = (
    <>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        loading={priority ? undefined : 'lazy'}
        sizes={sizes}
        style={objectPosition ? { objectPosition } : undefined}
        className={`object-cover ${light ? 'block [html.light_&]:hidden' : ''} ${
          hover ? 'transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]' : ''
        }`}
      />
      {light && (
        <Image
          src={light}
          alt={alt}
          fill
          aria-hidden
          loading="lazy"
          sizes={sizes}
          className={`object-cover hidden [html.light_&]:block ${
            hover ? 'transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]' : ''
          }`}
        />
      )}
    </>
  );

  return (
    <figure
      ref={figureRef}
      className={`group relative isolate overflow-hidden ${rounded} ${ratio} border border-[var(--border-default)] ring-1 ring-white/[0.06] [html.light_&]:ring-black/[0.05] shadow-2xl shadow-black/40 [html.light_&]:shadow-black/[0.08] ${className}`}
    >
      {/* Photography ---------------------------------------------------- */}
      {useParallax ? (
        // Oversized + overflowing so the scroll-driven drift never reveals an edge.
        <ParallaxPhoto targetRef={figureRef}>{photography}</ParallaxPhoto>
      ) : (
        photography
      )}

      {/* Brand wash - warm caramel→coral grade for cohesion ------------- */}
      {overlay !== 'none' && (
        <div
          aria-hidden
          className="absolute inset-0 mix-blend-soft-light opacity-[0.5] [html.light_&]:opacity-[0.22]"
          style={{
            background:
              'linear-gradient(120deg, rgba(233,162,74,0.55) 0%, rgba(255,92,77,0.34) 55%, transparent 100%)',
          }}
        />
      )}

      {/* Edge-blend - feather into the page bg (var flips per theme).
          Kept light so the photograph stays the subject, not the scrim. ---- */}
      {overlay === 'blend' && (
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, color-mix(in srgb, var(--navy-deep) 30%, transparent) 0%, transparent 30%, transparent 72%, color-mix(in srgb, var(--navy-deep) 42%, transparent) 100%)',
          }}
        />
      )}

      {/* Text scrim - FIXED dark gradient (theme-independent) so white overlaid
          copy stays legible in BOTH modes. Must not use var(--navy-deep): that
          flips to white in light mode and erased the white headline. A photo is
          a photo in either theme, so the legibility scrim is always dark. */}
      {overlay === 'text' && (
        <>
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(6,10,18,0.30) 0%, rgba(6,10,18,0.04) 30%, rgba(6,10,18,0.58) 64%, rgba(6,10,18,0.90) 100%)',
            }}
          />
          {/* gentle left-side wash so bottom-left copy holds on busy frames */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(90deg, rgba(6,10,18,0.55) 0%, rgba(6,10,18,0.12) 42%, transparent 70%)',
            }}
          />
        </>
      )}

      {/* Duotone - stronger brand wash for cohesion on busy frames ------ */}
      {overlay === 'duotone' && (
        <div
          aria-hidden
          className="absolute inset-0 mix-blend-multiply opacity-30 [html.light_&]:opacity-[0.12]"
          style={{
            background:
              'linear-gradient(135deg, rgba(13,21,32,0.55) 0%, rgba(28,71,255,0.30) 100%)',
          }}
        />
      )}

      {/* Film grain - subtle, editorial, kills the synthetic-stock feel - */}
      {grain && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06] [html.light_&]:opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: '160px 160px',
          }}
        />
      )}

      {/* Hairline inner sheen for a glassy, premium edge ---------------- */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 ${rounded} ring-1 ring-inset ring-white/[0.08] [html.light_&]:ring-white/40`}
      />

      {children && (
        <figcaption className="absolute inset-0 z-10 flex flex-col justify-end p-6 sm:p-8 lg:p-10">
          {children}
        </figcaption>
      )}
    </figure>
  );
}
