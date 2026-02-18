import type { Metadata } from "next";
import HomeContent from "@/components/home/HomeContent";

export const metadata: Metadata = {
  title: "Decision Intelligence for Restaurants & Hospitality | Sundae",
  description:
    "Clear, contextual, AI-powered visibility into your entire restaurant operation. Unify POS, labor, cost, and operational data to benchmark performance and get instant insights.",
  openGraph: {
    title: "Sundae – Decision Intelligence for Restaurants",
    description:
      "One platform. Zero guesswork. Sundae analyzes performance, predicts what's coming, and tells your team exactly what to do next.",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 overflow-x-hidden">
      <HomeContent />
    </div>
  );
}
