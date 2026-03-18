"use client";

import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { PageHero, PageCTA, FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/PageAnimations";

const differentiators: { title: string; description: string; icon: SundaeIconName; color: string }[] = [
 {
 title: "12-Domain Data Ingestion",
 description: "POS, labor, inventory, purchasing, reservations, delivery, marketing, guest experience, CRM, accounting — all unified automatically.",
 icon: "integration",
 color: "bg-blue-600"
 },
 {
 title: "4D Intelligence Model",
 description: "Go beyond reporting. See what happened, how it compares to plan, where you stand in the market, and what to do next.",
 icon: "intelligence",
 color: "bg-purple-600"
 },
 {
 title: "Real-Time Operations via Pulse",
 description: "Intraday monitoring of sales pace, labor, leakage, service speed, stockouts, and menu intelligence — with AI coaching.",
 icon: "speed",
 color: "bg-green-600"
 },
 {
 title: "External Intelligence via Watchtower",
 description: "Track competitor pricing, weather impact on revenue, local events, and receive AI-generated daily and weekly briefings.",
 icon: "watchtower",
 color: "bg-red-600"
 },
 {
 title: "Conversational Access",
 description: "Ask questions in natural language via Sundae Intelligence — on web, Telegram, Slack, or Microsoft Teams.",
 icon: "forge",
 color: "bg-orange-600"
 },
 {
 title: "Built for Multi-Location Operators",
 description: "Multi-tenant architecture with RBAC, portfolio leaderboards, cross-location benchmarking, and multi-currency support.",
 icon: "multiLocation",
 color: "bg-teal-600"
 }
];

const problems = [
 {
 problem: "Fragmented Operational Data",
 current: "Your POS says one thing. Your labor system says another. Your inventory platform doesn't talk to either. You're running a business on 5-10 disconnected systems.",
 solution: "Sundae's Integrations Hub connects 12 data domains into a single intelligence layer",
 impact: "One source of truth across every location"
 },
 {
 problem: "Reactive Decision-Making",
 current: "By the time your weekly report lands, the labor overrun already hit payroll. The margin leak already happened. You're managing yesterday's problems.",
 solution: "Pulse monitors operations intraday with real-time alerts, AI coaching, and automated playbooks",
 impact: "Shift from reactive to proactive management"
 },
 {
 problem: "No Market Context",
 current: "You know your numbers. But you don't know if they're good. Without competitor context, market signals, and event intelligence, you're optimizing in the dark.",
 solution: "Watchtower and Benchmarks add market context to every operational decision",
 impact: "Decisions informed by internal and external signals"
 }
];

export default function WhySundaePage() {
 return (
 <div className="min-h-screen bg-white">
 {/* Hero Section */}
 <PageHero
 badge="Why Sundae"
 title="The Intelligence Layer Restaurants Never Had"
 description="See why leading restaurant groups choose Sundae for decision intelligence — unified data, 4D insights, and real-time operational visibility."
 />

 {/* Three Biggest Problems Section */}
 <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
 <div className="max-w-7xl mx-auto">
 <FadeUp className="text-center mb-16">
 <h2 className="section-h2 text-slate-900 mb-4">
 The Three Gaps Costing You Money
 </h2>
 <p className="body-xl text-slate-600 max-w-3xl mx-auto">
 Every restaurant group we&apos;ve worked with faces the same three challenges
 </p>
 </FadeUp>

 <div className="space-y-12">
 {problems.map((item, index) => (
 <FadeUp key={item.problem} delay={index * 0.1}>
 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
 <div className={`lg:col-span-1 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-3'}`}>
 <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg shadow-sm">
 <h3 className="text-lg font-semibold text-red-900 mb-3">{item.problem}</h3>
 <p className="text-red-700 text-sm mb-4">{item.current}</p>
 <div className="text-xs text-red-600 font-medium">THE PROBLEM</div>
 </div>
 </div>

 <div className="lg:col-span-1 lg:order-2">
 <div className="text-center">
 <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
 &rarr;
 </div>
 <h4 className="font-semibold text-slate-900 mb-2">Sundae Solution</h4>
 <p className="text-slate-600 text-sm">{item.solution}</p>
 </div>
 </div>

 <div className={`lg:col-span-1 ${index % 2 === 0 ? 'lg:order-3' : 'lg:order-1'}`}>
 <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg shadow-sm">
 <h3 className="text-lg font-semibold text-green-900 mb-3">Result</h3>
 <p className="text-green-700 text-sm mb-4">{item.impact}</p>
 <div className="text-xs text-green-600 font-medium">THE OUTCOME</div>
 </div>
 </div>
 </div>
 </FadeUp>
 ))}
 </div>
 </div>
 </section>

 {/* Differentiators Section */}
 <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
 <div className="max-w-7xl mx-auto">
 <FadeUp className="text-center mb-16">
 <h2 className="section-h2 text-slate-900 mb-4">
 What Makes Sundae Different
 </h2>
 <p className="body-xl text-slate-600 max-w-3xl mx-auto">
 Six capabilities that no other platform combines
 </p>
 </FadeUp>

 <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
 {differentiators.map((item) => (
 <StaggerItem key={item.title}>
 <Card variant="elevated" className="hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
 <CardHeader>
 <div className="flex items-center space-x-4">
 <div className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center text-white`}>
 <SundaeIcon name={item.icon} size="lg" className="text-white" />
 </div>
 <CardTitle className="text-slate-900 text-lg">{item.title}</CardTitle>
 </div>
 </CardHeader>
 <CardContent>
 <CardDescription className="text-slate-600">
 {item.description}
 </CardDescription>
 </CardContent>
 </Card>
 </StaggerItem>
 ))}
 </StaggerContainer>
 </div>
 </section>

 {/* How It Compares */}
 <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950 text-white">
 <div className="max-w-7xl mx-auto text-center">
 <FadeUp>
 <h2 className="section-h2 mb-8">
 Beyond Traditional Dashboards
 </h2>
 <p className="body-xl mb-12 max-w-3xl mx-auto opacity-90">
 Most platforms show you what happened. We show you what&apos;s happening, what it means, and what to do about it.
 </p>
 </FadeUp>

 <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
 {([
 {
 title: "Traditional BI",
 items: ["Historical reporting", "Manual data pulls", "Siloed metrics", "Reactive management"],
 icon: "warning" as SundaeIconName
 },
 {
 title: "Generic Analytics",
 items: ["Multi-source dashboards", "Scheduled reports", "Basic alerting", "No industry context"],
 icon: "sync" as SundaeIconName
 },
 {
 title: "Sundae",
 items: ["4D Intelligence Model", "Real-time Pulse monitoring", "Market context via Watchtower", "AI-powered recommendations"],
 icon: "speed" as SundaeIconName
 }
 ]).map((section) => (
 <StaggerItem key={section.title}>
 <div className="text-center">
 <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
 <SundaeIcon name={section.icon} size="xl" className="text-white" />
 </div>
 <h3 className="font-semibold text-lg mb-4">{section.title}</h3>
 <ul className="space-y-2">
 {section.items.map((item, idx) => (
 <li key={idx} className="text-sm opacity-90">{item}</li>
 ))}
 </ul>
 </div>
 </StaggerItem>
 ))}
 </StaggerContainer>
 </div>
 </section>

 {/* Who It's For */}
 <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
 <div className="max-w-7xl mx-auto">
 <FadeUp className="text-center mb-16">
 <h2 className="section-h2 text-slate-900 mb-4">
 Built for Every Role in the Organization
 </h2>
 </FadeUp>

 <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
 {([
 {
 title: "Operations Leaders",
 description: "Real-time visibility into every location via Pulse and Portfolio",
 icon: "multiLocation" as SundaeIconName,
 color: "bg-blue-600"
 },
 {
 title: "Finance & FP&A",
 description: "Benchmarking, forecasting, and margin intelligence across the group",
 icon: "benchmarking" as SundaeIconName,
 color: "bg-green-600"
 },
 {
 title: "C-Suite & Owners",
 description: "Portfolio-level dashboards, AI briefs, and strategic decision views",
 icon: "intelligence" as SundaeIconName,
 color: "bg-purple-600"
 },
 {
 title: "Technology Teams",
 description: "Public API, webhooks, 12-domain integrations, and RBAC controls",
 icon: "integration" as SundaeIconName,
 color: "bg-orange-600"
 }
 ]).map((role) => (
 <StaggerItem key={role.title}>
 <Card variant="elevated">
 <CardHeader>
 <div className="text-center">
 <div className={`w-14 h-14 ${role.color} rounded-full flex items-center justify-center text-white mx-auto mb-4`}>
 <SundaeIcon name={role.icon} size="lg" className="text-white" />
 </div>
 <CardTitle className="text-slate-900 text-lg">{role.title}</CardTitle>
 </div>
 </CardHeader>
 <CardContent>
 <p className="text-sm text-slate-600 text-center">{role.description}</p>
 </CardContent>
 </Card>
 </StaggerItem>
 ))}
 </StaggerContainer>
 </div>
 </section>

 {/* CTA Section */}
 <PageCTA
 title="See Sundae in Action"
 description="30 minutes with your data. Real insights. No pitch deck."
 >
 <Button variant="cta" size="lg" href="/demo">Book a Demo</Button>
 <Button variant="outline-light" size="lg" href="/product">Explore Products</Button>
 </PageCTA>
 </div>
 );
}
