import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sundae Core — Unified Restaurant Analytics & Decision Intelligence",
  description:
    "Interactive dashboards, cross-module analytics, and AI-powered insights that unify POS, labor, inventory, and marketing data into one operating layer for restaurants.",
};

export default function CanvasLayout({ children }: { children: React.ReactNode }) {
  return children;
}
