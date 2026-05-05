import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sundae for Finance & FP&A — Margin Variance, the Day It Happens",
  description:
    "See margin variance the day it happens — not at the next month-end review — with cause attribution across labor, food cost, voids, comps, and pricing.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
