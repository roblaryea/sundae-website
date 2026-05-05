import type { Metadata } from "next";
import { SolutionPageTemplate } from "@/components/redesign/solutions/SolutionPageTemplate";
import { cloudKitchens } from "@/components/redesign/solutions/content";

export const metadata: Metadata = {
  title: "Sundae for Cloud Kitchen Operators",
  description:
    "Real margin per virtual brand, per platform, per kitchen — with platform-health monitoring built in.",
};

export default function Page() {
  return <SolutionPageTemplate data={cloudKitchens} />;
}
