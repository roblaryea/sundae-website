import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Sundae for every role and every restaurant shape — operations, finance, marketing, c-suite, technology, HR, multi-location, franchises, cloud kitchens, and hospitality groups.",
};

export default function SolutionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
