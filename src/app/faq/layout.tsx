import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about Sundae — pricing, integrations, data security, onboarding, and everything else restaurant operators need to know before getting started.",
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return children;
}
