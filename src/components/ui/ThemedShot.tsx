'use client';

import Image from 'next/image';

interface ThemedShotProps {
  /** Dark-theme screenshot (the site default — eager-loaded) */
  dark: string;
  /** Light-theme screenshot (lazy — only fetched if the visitor flips to light) */
  light: string;
  alt: string;
  width?: number;
  height?: number;
  /** Eager-load the dark image for above-the-fold heroes (LCP). Default false. */
  priority?: boolean;
  /** Classes applied to BOTH <Image> layers (sizing, rounding, etc.) */
  className?: string;
  /** Wrap in a rounded, theme-aware bordered frame with shadow (hero chrome). */
  framed?: boolean;
  /** Use next/image fill mode (parent must be position:relative). Ignores width/height. */
  fill?: boolean;
  /** sizes attribute, for fill mode responsive loading. */
  sizes?: string;
}

/**
 * Theme-aware screenshot. Renders both the dark and light captures and swaps
 * them purely in CSS off the `html.light` class that ThemeProvider toggles —
 * so there is zero hydration flash and no JS race on theme change.
 *
 * Loading strategy: dark (site default) loads first; light is `loading="lazy"`
 * and starts hidden via `display:none`, so its bytes are only fetched once the
 * visitor actually switches to light mode. Default dark visitors never pay for
 * the light twin.
 *
 * Usage:
 *   <ThemedShot
 *     dark="/images/product/2026-fresh/intelligence-dark.png"
 *     light="/images/product/2026-fresh/intelligence.png"
 *     alt="Sundae Intelligence — ask your data anything in plain English"
 *     width={1600} height={1000} priority
 *   />
 */
export function ThemedShot({
  dark,
  light,
  alt,
  width = 1600,
  height = 1000,
  priority = false,
  className = '',
  framed = false,
  fill = false,
  sizes,
}: ThemedShotProps) {
  const imgClass = framed ? 'w-full h-auto' : className;
  const dims = fill ? { fill: true as const, sizes } : { width, height };
  const inner = (
    <>
      <Image
        src={dark}
        alt={alt}
        {...dims}
        priority={priority}
        className={`block [html.light_&]:hidden ${imgClass}`}
      />
      <Image
        src={light}
        alt={alt}
        {...dims}
        loading="lazy"
        aria-hidden
        className={`hidden [html.light_&]:block ${imgClass}`}
      />
    </>
  );

  if (!framed) return inner;

  return (
    <div
      className={`rounded-2xl overflow-hidden bg-[var(--navy-surface)] border border-[var(--warm-coral)]/20 [html.light_&]:border-[var(--warm-coral)]/30 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7),0_0_50px_-12px_rgba(255,92,77,0.18)] [html.light_&]:shadow-[0_30px_60px_-24px_rgba(194,65,12,0.28)] ring-1 ring-white/5 [html.light_&]:ring-black/5 ${className}`}
    >
      {/* warm browser chrome — frames the (blue) product UI as "the app", on-brand */}
      <div className="flex items-center gap-1.5 h-8 px-3.5 bg-[var(--navy-surface)] border-b border-[var(--border-default)]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5C4D]/85" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#E9A24A]/85" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#F6C66B]/75" />
      </div>
      <div className="relative">
        {inner}
        {/* subtle warm grade so the product screenshot coheres with the warm site */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 mix-blend-soft-light opacity-30 [html.light_&]:opacity-[0.18]"
          style={{ background: 'linear-gradient(135deg, rgba(233,162,74,0.5) 0%, rgba(255,92,77,0.28) 100%)' }}
        />
      </div>
    </div>
  );
}
