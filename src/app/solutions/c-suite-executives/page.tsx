import type { Metadata } from "next";
import { SolutionPageTemplate } from "@/components/redesign/solutions/SolutionPageTemplate";
import { cSuite } from "@/components/redesign/solutions/content";

export const metadata: Metadata = {
  title: "Sundae for CEOs and Owners",
  description:
    "Daily AI briefings across every brand and location — portfolio truth in the morning, not at the weekly review.",
};

export default function Page() {
  return <SolutionPageTemplate data={cSuite} />;
}
