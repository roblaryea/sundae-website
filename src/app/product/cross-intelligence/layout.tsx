import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cross-Intelligence — AI That Connects Every Part of Your Restaurant",
  description:
    "Sundae Cross-Intelligence links revenue, labor, marketing, and inventory signals to surface hidden correlations and actionable recommendations across your entire operation.",
};

export default function CrossIntelligenceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
