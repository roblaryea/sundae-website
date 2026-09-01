import type { Metadata } from "next";
import { LightHome } from "./LightHome";

/**
 * Isolated, NON-shipping light-FIRST design exploration. Demonstrates a light
 * theme designed as its own system (warm paper, layered shadows for depth,
 * surface tints + hairlines for atmosphere, full-saturation accents, a
 * light-reimagined hero) rather than the current dimmed-dark light mode.
 * `noindex`. Touches nothing global or live.
 */
export const metadata: Metadata = {
  title: "Light-first - design exploration (internal preview)",
  robots: { index: false, follow: false },
};

export default function LightPreviewPage() {
  return <LightHome />;
}
