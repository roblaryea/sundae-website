"use client";

import Image from "next/image";
import { SundaeIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { PageHero, PageCTA, FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/PageAnimations";

const integrationCategories = [
 {
 category: "Point of Sale (POS)",
 icon: "restaurant" as const,
 status: "Live" as const,
 systems: [
 "Oracle MICROS Simphony",
 "Square",
 "Toast",
 "Clover",
 "PostgreSQL (Direct DB)",
 "SQL Server / Azure SQL (Direct DB)",
 ],
 },
 {
 category: "Labor & Scheduling",
 icon: "labor" as const,
 status: "Upcoming" as const,
 systems: [
 "7shifts",
 "HotSchedules (Fourth)",
 "Deputy",
 ],
 },
 {
 category: "Inventory & Availability",
 icon: "inventory" as const,
 status: "Upcoming" as const,
 systems: [
 "MarketMan",
 "Craftable",
 "BinWise",
 ],
 },
 {
 category: "Purchasing & Procurement",
 icon: "purchasing" as const,
 status: "Upcoming" as const,
 systems: [
 "MarketMan",
 ],
 },
 {
 category: "Delivery & 3PD",
 icon: "speed" as const,
 status: "Upcoming" as const,
 systems: [
 "Deliverect",
 "Uber Eats",
 "DoorDash",
 "Talabat",
 ],
 },
 {
 category: "Reservations & Guest Flow",
 icon: "reservations" as const,
 status: "Upcoming" as const,
 systems: [
 "SevenRooms",
 "OpenTable",
 "Resy",
 "Tock",
 ],
 },
 {
 category: "Marketing & Campaigns",
 icon: "marketing" as const,
 status: "Upcoming" as const,
 systems: [
 "Meta (Facebook / Instagram)",
 "Google Ads",
 "Mailchimp",
 ],
 },
 {
 category: "Guest Experience & Feedback",
 icon: "conversation" as const,
 status: "Upcoming" as const,
 systems: [
 "Google Reviews",
 "Yelp",
 "Zendesk",
 ],
 },
 {
 category: "Guest CRM",
 icon: "operators" as const,
 status: "Upcoming" as const,
 systems: [
 "SevenRooms",
 "Toast",
 "Olo",
 ],
 },
 {
 category: "Accounting & Finance",
 icon: "finance" as const,
 status: "Upcoming" as const,
 systems: [
 "QuickBooks",
 "Xero",
 "Sage",
 "FreshBooks",
 ],
 },
];

export default function IntegrationsPage() {
 return (
 <div className="min-h-screen bg-white">
 {/* Hero */}
 <PageHero
 badge="Integrations"
 title="Connect Everything. Unify Your Data."
 description="Sundae integrates with 30+ restaurant systems across POS, labor, inventory, reservations, delivery, and more."
 />

 {/* How It Works */}
 <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-100">
 <div className="max-w-5xl mx-auto">
 <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
 {[
 {
 step: "1",
 title: "Connect",
 description: "Authenticate your platforms with OAuth or API key — most integrations take under 5 minutes.",
 },
 {
 step: "2",
 title: "Normalize",
 description: "Scout, our data layer, cleans, maps, and unifies every data source into a consistent schema.",
 },
 {
 step: "3",
 title: "Analyze",
 description: "Unified data flows into dashboards, alerts, and AI recommendations — no manual exports needed.",
 },
 ].map((item) => (
 <StaggerItem key={item.step}>
 <div className="p-6">
 <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg mx-auto mb-4">
 {item.step}
 </div>
 <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
 <p className="text-sm text-slate-600">{item.description}</p>
 </div>
 </StaggerItem>
 ))}
 </StaggerContainer>
 </div>
 </section>

 {/* Integration Categories */}
 <section className="py-20 px-4 sm:px-6 lg:px-8">
 <div className="max-w-6xl mx-auto">
 <FadeUp className="text-center mb-16">
 <h2 className="section-h2 text-slate-900 mb-4">
 12 Data Domains. One Unified View.
 </h2>
 <p className="body-lg text-slate-600 max-w-2xl mx-auto">
 POS, labor, inventory, purchasing, reservations, delivery, marketing, guest experience, CRM, accounting, and daily sales summaries — all connected.
 </p>
 </FadeUp>

 <div className="space-y-12">
 {integrationCategories.map((cat) => (
 <FadeUp key={cat.category}>
 <div className="flex items-center gap-3 mb-6">
 <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow">
 <SundaeIcon name={cat.icon} size="md" className="text-white" />
 </div>
 <h3 className="text-xl font-semibold text-slate-900">
 {cat.category}
 </h3>
 <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
 cat.status === "Live"
 ? "bg-green-100 text-green-700"
 : "bg-amber-100 text-amber-700"
 }`}>
 {cat.status}
 </span>
 </div>
 <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
 {cat.systems.map((system) => (
 <StaggerItem key={system}>
 <div
 className="px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700 text-center hover:border-blue-300 transition-colors"
 >
 {system}
 </div>
 </StaggerItem>
 ))}
 </StaggerContainer>
 </FadeUp>
 ))}
 </div>

 <div className="mt-12 p-6 bg-slate-50 rounded-xl border border-slate-200 text-center">
 <div className="flex items-center justify-center gap-6 mb-3">
 <div className="flex items-center gap-2">
 <span className="w-3 h-3 rounded-full bg-green-500" />
 <span className="text-sm font-medium text-slate-700">Live — available now</span>
 </div>
 <div className="flex items-center gap-2">
 <span className="w-3 h-3 rounded-full bg-amber-500" />
 <span className="text-sm font-medium text-slate-700">Upcoming — on our roadmap</span>
 </div>
 </div>
 <p className="text-xs text-slate-500">
 Upcoming integrations are actively in development. Timelines may vary. Contact us to request priority for a specific integration.
 </p>
 </div>
 </div>
 </section>

 {/* Webhooks & Public API */}
 <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
 <div className="max-w-5xl mx-auto">
 <FadeUp className="text-center mb-12">
 <h2 className="section-h2 text-slate-900 mb-4">
 Webhooks & Public API
 </h2>
 <p className="body-lg text-slate-600 max-w-3xl mx-auto">
 Build custom integrations with Sundae&apos;s developer tools.
 </p>
 </FadeUp>

 <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
 <StaggerItem>
 <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
 <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
 <SundaeIcon name="integration" size="lg" className="text-white" />
 </div>
 <h3 className="text-xl font-semibold text-slate-900 mb-3">Custom Webhooks</h3>
 <p className="text-slate-600 text-sm mb-4">
 Configure webhooks for any non-POS data domain. Push data into Sundae from any system with HTTP support.
 </p>
 <ul className="space-y-2 text-sm text-slate-600">
 <li className="flex items-start space-x-2">
 <span className="text-green-500 mt-0.5">&#10003;</span>
 <span>HMAC-SHA256 signature verification</span>
 </li>
 <li className="flex items-start space-x-2">
 <span className="text-green-500 mt-0.5">&#10003;</span>
 <span>Test payloads and delivery tracking</span>
 </li>
 <li className="flex items-start space-x-2">
 <span className="text-green-500 mt-0.5">&#10003;</span>
 <span>Available for all 12 data domains</span>
 </li>
 </ul>
 </div>
 </StaggerItem>

 <StaggerItem>
 <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
 <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
 <SundaeIcon name="data" size="lg" className="text-white" />
 </div>
 <h3 className="text-xl font-semibold text-slate-900 mb-3">Public API v1</h3>
 <p className="text-slate-600 text-sm mb-4">
 Read-only API endpoints authenticated with API keys. Access your Sundae data programmatically.
 </p>
 <ul className="space-y-2 text-sm text-slate-600">
 <li className="flex items-start space-x-2">
 <span className="text-green-500 mt-0.5">&#10003;</span>
 <span>Sales summary and exception endpoints</span>
 </li>
 <li className="flex items-start space-x-2">
 <span className="text-green-500 mt-0.5">&#10003;</span>
 <span>Pulse status and alert data</span>
 </li>
 <li className="flex items-start space-x-2">
 <span className="text-green-500 mt-0.5">&#10003;</span>
 <span>Configurable rate limits and scoped API keys</span>
 </li>
 </ul>
 </div>
 </StaggerItem>
 </StaggerContainer>
 </div>
 </section>

 {/* Missing Integration CTA → PageCTA */}
 <PageCTA
 title="Ready to Connect Your Systems?"
 description="Book a demo and see how Sundae unifies your data in minutes."
 >
 <Button variant="cta" size="lg" href="/demo">Book a Demo</Button>
 <Button variant="outline-light" size="lg" href="/product">Explore Products</Button>
 </PageCTA>
 </div>
 );
}
