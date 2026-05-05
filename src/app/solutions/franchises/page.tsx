import type { Metadata } from "next";
import { SolutionPageTemplate } from "@/components/redesign/solutions/SolutionPageTemplate";
import { franchises } from "@/components/redesign/solutions/content";

export const metadata: Metadata = {
  title: "Sundae for Franchise Operators",
  description:
    "Franchisee performance and brand consistency in one view — so the strongest franchisees become a template, not an exception.",
};

export default function Page() {
  return <SolutionPageTemplate data={franchises} />;
}
