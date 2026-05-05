import type { Metadata } from "next";
import { SolutionPageTemplate } from "@/components/redesign/solutions/SolutionPageTemplate";
import { marketingTeams } from "@/components/redesign/solutions/content";

export const metadata: Metadata = {
  title: "Sundae for Marketing Leads",
  description:
    "Tie campaign spend to covers, average check, and net margin within 24 hours of activation — re-allocate while the campaign is still running.",
};

export default function Page() {
  return <SolutionPageTemplate data={marketingTeams} />;
}
