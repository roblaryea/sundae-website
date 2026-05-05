import type { Metadata } from "next";
import { SolutionPageTemplate } from "@/components/redesign/solutions/SolutionPageTemplate";
import { financeTeams } from "@/components/redesign/solutions/content";

export const metadata: Metadata = {
  title: "Sundae for Finance & FP&A",
  description:
    "Margin variance the day it happens — not at the next month-end review — with cause attribution across labor, food cost, and pricing.",
};

export default function Page() {
  return <SolutionPageTemplate data={financeTeams} />;
}
