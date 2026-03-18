import type { Metadata } from "next";
import HomeContent from "@/components/home/HomeContent";

export const metadata: Metadata = {
 title: "Sundae — Decision Intelligence for Restaurants | Real-Time Ops, Market Intelligence & AI Targets",
 description:
 "The AI platform that turns restaurant data into action. Real-time sales pacing, adaptive targets, labor productivity, competitor tracking, event intelligence, and AI coaching — unified for restaurants and hospitality.",
 openGraph: {
 title: "Sundae — Decision Intelligence for Restaurants",
 description:
 "Real-time sales pacing, adaptive targets, labor productivity, competitor tracking, event intelligence, and AI coaching — unified for restaurants and hospitality.",
 },
};

export default function Home() {
 return (
 <div className="min-h-screen bg-white overflow-x-hidden">
 <HomeContent />
 </div>
 );
}
