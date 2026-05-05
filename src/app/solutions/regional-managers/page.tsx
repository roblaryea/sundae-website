import type { Metadata } from "next";
import { SolutionPageTemplate } from "@/components/redesign/solutions/SolutionPageTemplate";
import { operationsLeaders } from "@/components/redesign/solutions/content";

export const metadata: Metadata = {
  title: "Sundae for Operations Leaders",
  description:
    "Live shift visibility across every location, with the market context teams need to act before the shift is over.",
};

export default function Page() {
  return <SolutionPageTemplate data={operationsLeaders} />;
}
