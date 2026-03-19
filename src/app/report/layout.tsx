import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sundae Report — Free Restaurant Benchmarking & POS Analytics",
  description:
    "Upload your POS data and get instant benchmarking against similar restaurants. Start free with Report Lite — no credit card required. See where you stand in minutes.",
};

export default function ReportLayout({ children }: { children: React.ReactNode }) {
  return children;
}
