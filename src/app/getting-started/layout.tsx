import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Getting Started",
  description:
    "Get up and running with Sundae in minutes. Start free with Report Lite, connect your POS data, and see instant benchmarking against restaurants like yours.",
};

export default function GettingStartedLayout({ children }: { children: React.ReactNode }) {
  return children;
}
