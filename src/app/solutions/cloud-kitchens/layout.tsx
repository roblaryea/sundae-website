import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cloud Kitchen Software for Margin & Operations",
  description:
    "Cloud kitchen software for real margin by virtual brand, delivery platform, and kitchen, with commission, packaging, refund, and operating-performance intelligence.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
