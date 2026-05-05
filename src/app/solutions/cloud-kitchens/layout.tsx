import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sundae for Cloud Kitchen Operators — Real Margin per Brand, per Platform",
  description:
    "Real margin per virtual brand, per platform, per kitchen — with platform-health monitoring and commission, packaging, and refund reconciliation built in.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
