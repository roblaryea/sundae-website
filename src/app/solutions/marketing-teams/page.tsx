"use client";

import { SolutionPageTemplate } from "@/components/redesign/solutions/SolutionPageTemplate";
import { marketingTeams } from "@/components/redesign/solutions/content";

export default function Page() {
  return <SolutionPageTemplate data={marketingTeams} />;
}
