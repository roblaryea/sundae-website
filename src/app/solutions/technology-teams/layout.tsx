import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sundae for Tech and Data Leads - 12 Domains Unified, Out of the Box",
  description:
    "One governed operating picture across food-service systems, with public API, webhooks, RBAC, audit trails and evidence that stays attached to every recovery decision.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
