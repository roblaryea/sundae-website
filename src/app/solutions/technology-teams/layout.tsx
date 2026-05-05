import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sundae for Tech and Data Leads — 12 Domains Unified, Out of the Box",
  description:
    "12 unified data domains, 179+ governed models, API access, webhooks, RBAC, and audit trails — without a six-week integration project per dashboard request.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
