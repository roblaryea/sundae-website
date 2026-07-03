import type { Metadata } from "next";
import { RedesignComparison } from "./RedesignComparison";

/**
 * Isolated, NON-shipping preview that renders the "Curfs Consult" June-2026
 * design-direction proposal next to the current live brand, plus a "best of
 * both" synthesis and a logo lab.
 *
 * This route changes NOTHING global - it imports no global token, mutates no
 * theme. It exists only so the proposed direction can be judged as a true
 * side-by-side before any decision to adopt it. `noindex` so it never enters
 * search. Delete the `preview/redesign` folder to remove entirely.
 */
export const metadata: Metadata = {
  title: "Design Direction - Comparison (internal preview)",
  robots: { index: false, follow: false },
};

export default function RedesignComparisonPage() {
  return <RedesignComparison />;
}
