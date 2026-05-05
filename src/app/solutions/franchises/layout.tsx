import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sundae for Franchise Operators — Performance and Brand Consistency in One View",
  description:
    "Franchisee performance and brand consistency in one view — so the strongest franchisees become a template, not an exception.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
