import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sundae Watchtower — External Intelligence Engine for Restaurants",
  description:
    "AI-powered daily briefings, named competitor tracking, local event impact analysis, and market trend intelligence. The outside world, contextualized for your restaurant.",
  openGraph: {
    title: "Sundae Watchtower — External Intelligence Engine for Restaurants",
    description:
      "AI-powered daily briefings, named competitor tracking, local event impact analysis, and market trend intelligence.",
  },
};

export default function WatchtowerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
