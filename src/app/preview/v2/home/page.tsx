import type { Metadata } from "next";
import { Hero } from "@/components/redesign/v2/Hero";
import { SectionPersonaSwitcher } from "@/components/redesign/v2/SectionPersonaSwitcher";
import { SectionSpeedQualityCost } from "@/components/redesign/v2/SectionSpeedQualityCost";
import { SectionOldWaySundaeWay } from "@/components/redesign/v2/SectionOldWaySundaeWay";
import { SectionThreeMoats } from "@/components/redesign/v2/SectionThreeMoats";
import { Section4DScene } from "@/components/redesign/v2/Section4DScene";
import { SectionProof } from "@/components/redesign/v2/SectionProof";
// Section 8 (SectionCTA) intentionally removed — closing CTA is now anchored
// in the global Footer pre-CTA so the homepage doesn't double up two
// competing CTA blocks at the bottom. Footer headline updated to
// "Stop running your restaurants on yesterday's numbers."

/**
 * Isolated preview route for the homepage redesign (homepage-spec-v1.1).
 *
 * Section order matches spec §0 page structure (NOT the build order — build
 * order in Appendix B was an implementation-risk sequence, page order is the
 * narrative the buyer reads top-to-bottom).
 *
 * `noindex` so the preview never enters search results. The live homepage at
 * `/` is untouched. When the page is approved end-to-end, this content moves
 * to `/` (replacing src/components/home/HomeContent.tsx) in a follow-up.
 *
 * Safe fallbacks active (per user direction):
 *   §1 Hero       — 3-stat proof strip, 250+ omitted (CLM-004 NEEDS VALIDATION)
 *   §5 Moats      — generic BI language, no Power BI/Tableau (CLM-203 awaiting Legal)
 *   §7 Proof      — capability stats only, no logos, no quote (CLM-901/902 deferred)
 *   §3 SQC        — 30s answers softened to "answers in seconds"
 *   §6 4D Scene   — visibly labeled as illustrative
 */
export const metadata: Metadata = {
  title: "Sundae — Homepage Redesign Preview (v2)",
  description:
    "Internal redesign preview for the Sundae homepage. Not the live experience.",
  robots: { index: false, follow: false },
};

export default function PreviewV2HomePage() {
  return (
    <main>
      <Hero />
      <SectionPersonaSwitcher />
      <SectionSpeedQualityCost />
      <SectionOldWaySundaeWay />
      <SectionThreeMoats />
      <Section4DScene />
      <SectionProof />
      {/* Closing CTA is anchored in the global Footer pre-CTA. */}
    </main>
  );
}
