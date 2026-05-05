import type { Metadata } from "next";
import { SolutionPageTemplate } from "@/components/redesign/solutions/SolutionPageTemplate";
import { hospitalityGroups } from "@/components/redesign/solutions/content";

export const metadata: Metadata = {
  title: "Sundae for Hospitality Operators",
  description:
    "F&B, rooms, events, and catering in one decision view — with adaptive targets per service type.",
};

export default function Page() {
  return <SolutionPageTemplate data={hospitalityGroups} />;
}
