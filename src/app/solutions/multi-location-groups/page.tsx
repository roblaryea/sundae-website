import type { Metadata } from "next";
import { SolutionPageTemplate } from "@/components/redesign/solutions/SolutionPageTemplate";
import { multiLocation } from "@/components/redesign/solutions/content";

export const metadata: Metadata = {
  title: "Sundae for Multi-Location Operators",
  description:
    "One platform, every location, real-time — with cross-location patterns surfaced automatically and best-practice transfer that scales.",
};

export default function Page() {
  return <SolutionPageTemplate data={multiLocation} />;
}
