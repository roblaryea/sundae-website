import type { CSSProperties } from "react";

/**
 * The Sundae logotype - the rebrand's primary register: a clean Fraunces
 * wordmark set in the display face. Single source of truth so the navbar,
 * mobile drawer, footer, and auth screens all render one identical wordmark.
 *
 * Theme-aware color is supplied by the caller via `className`
 * (e.g. "text-[#FBF8F4] [html.light_&]:text-[#2A2320]"), and size via a
 * text-[..] utility, so the same component scales across surfaces.
 */
export function SundaeLogotype({
  className = "",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      aria-label="Sundae"
      className={`block select-none leading-none tracking-[-0.018em] ${className}`}
      style={{
        fontFamily: "var(--font-display)",
        fontWeight: 600,
        // Force the warm display cut + soft, slightly wonky letterforms at any
        // size so the wordmark reads as a crafted logotype, not a plain serif.
        fontOpticalSizing: "none",
        fontVariationSettings: "'opsz' 144, 'SOFT' 90, 'WONK' 1",
        ...style,
      }}
    >
      sundae
    </span>
  );
}
