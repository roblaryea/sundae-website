import type { Metadata } from "next";
import { SolutionPageTemplate } from "@/components/redesign/solutions/SolutionPageTemplate";
import { techTeams } from "@/components/redesign/solutions/content";

export const metadata: Metadata = {
  title: "Sundae for Tech and Data Leads",
  description:
    "12 unified data domains, 179+ governed models, public API, webhooks, RBAC, and audit trails — out of the box.",
};

export default function Page() {
  return <SolutionPageTemplate data={techTeams} />;
}
