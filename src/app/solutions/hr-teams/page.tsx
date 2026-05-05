import type { Metadata } from "next";
import { SolutionPageTemplate } from "@/components/redesign/solutions/SolutionPageTemplate";
import { hrTeams } from "@/components/redesign/solutions/content";

export const metadata: Metadata = {
  title: "Sundae for HR and People Leads",
  description:
    "Live labor% by location, server productivity, and overtime risk — by shift, not by month.",
};

export default function Page() {
  return <SolutionPageTemplate data={hrTeams} />;
}
