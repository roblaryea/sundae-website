import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sundae Pulse — Real-Time Intraday Operations Monitor for Restaurants",
  description:
    "Live sales pacing with adaptive AI targets, labor productivity tracking, server performance analytics, leakage monitoring, and AI shift coaching. The command center for every shift.",
  openGraph: {
    title: "Sundae Pulse — Real-Time Intraday Operations Monitor",
    description:
      "Live sales pacing with adaptive AI targets, labor productivity tracking, server performance analytics, leakage monitoring, and AI shift coaching.",
  },
};

export default function PulseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
