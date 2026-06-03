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
}: ThemedShotProps) {
  return (
    <>
      <Image
        src={dark}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className={`block [html.light_&]:hidden ${className}`}
      />
      <Image
        src={light}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        aria-hidden
        className={`hidden [html.light_&]:block ${className}`}
      />
    </>
  );
}
