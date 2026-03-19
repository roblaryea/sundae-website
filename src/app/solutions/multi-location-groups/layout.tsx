import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Multi-Location Restaurant Groups — Unified Intelligence Across Every Site",
  description:
    "Sundae gives multi-location restaurant operators a single view of performance across all sites — benchmark locations, spot outliers, and standardize what works.",
};

export default function MultiLocationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
