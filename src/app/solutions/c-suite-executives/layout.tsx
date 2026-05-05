import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sundae for CEOs and Owners — Daily AI Briefings Across the Portfolio",
  description:
    "Daily AI briefings across every brand and location. Portfolio truth in the morning, not at the weekly review — with peer benchmarks and market context built in.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
