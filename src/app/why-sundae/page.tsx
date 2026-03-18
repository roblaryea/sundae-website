"use client";

import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { PageHero, PageCTA, FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/PageAnimations";

const differentiators: { title: string; description: string; icon: SundaeIconName; color: string }[] = [
 {
 title: "12-Domain Data Ingestion",
 description: "POS, labor, inventory, purchasing, reservations, delivery, marketing, guest experience, CRM, accounting \u2014 all unified automatically. No more 5-10 disconnected systems.",
 icon: "integration",
 color: "bg-blue-600"
 },
 {
 title: "4D Intelligence Model",
 description: "Go beyond reporting. See what happened, how it compares to plan, where you stand in the market, and what to do next. Four dimensions of every decision.",
 icon: "intelligence",
 color: "bg-purple-600"
 },
 {
 title: "Real-Time Operations via Pulse",
 description: "A shift is a perishable asset. Pulse gives you intraday sales pacing, labor productivity, leakage detection, and AI coaching \u2014 before the shift is over.",
 icon: "speed",
 color: "bg-green-600"
 },
 {
 title: "External Intelligence via Watchtower",
 description: "A new competitor opened 2 blocks away. Weather is tanking Friday covers. A concert just got announced. You\u2019ll know before it hits your numbers.",
 icon: "watchtower",
 color: "bg-red-600"
 },
 {
 title: "Conversational Access",
 description: "Talk to your data like you\u2019d talk to your best analyst. Natural language queries via web, Telegram, Slack, or Microsoft Teams \u2014 answers in seconds, not days.",
 icon: "forge",
 color: "bg-orange-600"
 },
 {
 title: "Built for Multi-Location Operators",
 description: "Multi-tenant architecture with RBAC, portfolio leaderboards, cross-location benchmarking, multi-currency support, and region-level drill-downs.",
 icon: "multiLocation",
 color: "bg-teal-600"
 }
];

const problems = [
 {
 problem: "12 Data Sources. Zero Unified Intelligence.",
 current: "Your POS says one thing. Your labor system says another. Your inventory platform doesn\u2019t talk to either. You\u2019re making million-dollar decisions on fragmented data spread across 5\u201310 disconnected systems.",
 solution: "Sundae\u2019s Integrations Hub connects 12 data domains into a single intelligence layer \u2014 automatically cleaned, normalized, and unified.",
 impact: "One source of truth across every location",
 stat: "12",
 statLabel: "domains unified"
 },
 {
 problem: "Your P&L Arrives Weeks After the Damage Is Done.",
 current: "By the time your weekly report lands, the labor overrun already hit payroll. The $2K margin leak on Tuesday lunch already happened. You\u2019re managing yesterday\u2019s problems with last week\u2019s data.",
 solution: "Pulse monitors operations intraday with 5-minute refresh cycles, real-time alerts, AI coaching, and automated playbooks that act in the moment.",
 impact: "Shift from reactive to proactive management",
 stat: "5 min",
 statLabel: "refresh cycle"
 },
 {
 problem: "Is Your 31% Food Cost Good or Bad? You Have No Idea.",
 current: "You know your numbers. But you don\u2019t know if they\u2019re good. Without competitor context, market signals, and anonymous peer benchmarks, you\u2019re optimizing in the dark.",
 solution: "Watchtower and Benchmarks add market context to every operational decision \u2014 competitor moves, weather impact, local events, anonymous peer data.",
 impact: "Decisions informed by internal and external signals",
 stat: "250+",
 statLabel: "locations benchmarked"
 }
];

const comparisonColumns = [
 {
 title: "Traditional BI",
 items: ["Historical reporting", "Manual data pulls", "Siloed metrics", "Reactive management"],
 icon: "warning" as SundaeIconName,
 highlight: false,
 },
 {
 title: "Generic Analytics",
 items: ["Multi-source dashboards", "Scheduled reports", "Basic alerting", "No industry context"],
 icon: "sync" as SundaeIconName,
 highlight: false,
 },
 {
 title: "Sundae",
 items: ["4D Intelligence Model", "Real-time Pulse monitoring", "Market context via Watchtower", "AI-powered recommendations"],
 icon: "speed" as SundaeIconName,
 highlight: true,
 },
];

export default function WhySundaePage() {
 return (
 <div className="min-h-screen bg-white">
 {/* Hero Section */}
 <PageHero
 badge="Why Sundae"
 title="The Intelligence Layer Restaurants Never Had"
 description="Restaurant operators make million-dollar decisions by gut feel because their data lives in disconnected silos. We built the platform that changes that."
 />

 {/* Three Biggest Problems Section */}
 <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
 <div className="max-w-7xl mx-auto">
 <FadeUp className="text-center mb-16">
 <p className="eyebrow text-blue-600 mb-4">THE PROBLEM</p>
 <h2 className="section-h2 text-slate-900 mb-4">
 Three gaps costing you money every day
 </h2>
 <p className="body-xl text-slate-600 max-w-3xl mx-auto">
 Every restaurant group we&apos;ve worked with faces the same three challenges.
 </p>
 </FadeUp>

 <div className="space-y-8">
 {problems.map((item, index) => (
 <FadeUp key={item.problem} delay={index * 0.1}>
 <div className="bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden">
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
 {/* Pain side */}
 <div className="lg:col-span-5 p-8 bg-red-50/50 border-b lg:border-b-0 lg:border-r border-red-100/50">
 <div className="text-xs font-semibold uppercase tracking-wider text-red-500 mb-3">The Problem</div>
 <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug">{item.problem}</h3>
 <p className="text-sm text-slate-600 leading-relaxed">{item.current}</p>
 </div>

 {/* Stat center */}
 <div className="lg:col-span-2 flex items-center justify-center p-6 bg-white">
 <div className="text-center">
 <div className="text-3xl font-bold text-accent-gradient">{item.stat}</div>
 <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">{item.statLabel}</div>
 </div>
 </div>

 {/* Solution side */}
 <div className="lg:col-span-5 p-8 bg-green-50/30 border-t lg:border-t-0 lg:border-l border-green-100/50">
 <div className="text-xs font-semibold uppercase tracking-wider text-green-600 mb-3">Sundae Solution</div>
 <p className="text-sm text-slate-700 leading-relaxed mb-4">{item.solution}</p>
 <div className="flex items-center gap-2 text-sm font-medium text-green-700">
 <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xs">&#10003;</span>
 {item.impact}
 </div>
 </div>
 </div>
 </div>
 </FadeUp>
 ))}
 </div>
 </div>
 </section>

 {/* Differentiators Section */}
 <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
 <div className="max-w-7xl mx-auto">
 <FadeUp className="text-center mb-16">
 <p className="eyebrow text-blue-600 mb-4">DIFFERENTIATORS</p>
 <h2 className="section-h2 text-slate-900 mb-4">
 What makes Sundae different
 </h2>
 <p className="body-xl text-slate-600 max-w-3xl mx-auto">
 Six capabilities that no other platform combines.
 </p>
 </FadeUp>

 <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
 {differentiators.map((item) => (
 <StaggerItem key={item.title}>
 <Card variant="elevated" className="h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
 <CardHeader>
 <div className="flex items-center space-x-4">
 <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center text-white shadow-sm`}>
 <SundaeIcon name={item.icon} size="lg" className="text-white" />
 </div>
 <CardTitle className="text-slate-900 text-lg">{item.title}</CardTitle>
 </div>
 </CardHeader>
 <CardContent>
 <CardDescription className="text-slate-600 leading-relaxed">
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
 <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-950 text-white">
 <div className="max-w-7xl mx-auto text-center">
 <FadeUp>
 <p className="eyebrow text-blue-400 mb-4">COMPARISON</p>
 <h2 className="section-h2 mb-4">
 Beyond traditional dashboards
 </h2>
 <p className="body-xl mb-16 max-w-3xl mx-auto text-white/60">
 Most platforms show you what happened. We show you what&apos;s happening, what it means, and what to do about it.
 </p>
 </FadeUp>

 <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
 {comparisonColumns.map((section) => (
 <StaggerItem key={section.title}>
 <div className={`rounded-2xl p-8 text-center h-full ${
 section.highlight
 ? "bg-blue-600/20 border border-blue-500/30 ring-1 ring-blue-500/20"
 : "bg-white/[0.04] border border-white/[0.08]"
 }`}>
 <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5 ${
 section.highlight ? "bg-blue-500/30" : "bg-white/10"
 }`}>
 <SundaeIcon name={section.icon} size="xl" className="text-white" />
 </div>
 <h3 className={`font-bold text-lg mb-6 ${section.highlight ? "text-blue-200" : "text-white/80"}`}>{section.title}</h3>
 <ul className="space-y-3 text-left">
 {section.items.map((item, idx) => (
 <li key={idx} className="flex items-start gap-3 text-sm">
 <span className={`mt-0.5 ${section.highlight ? "text-blue-400" : "text-white/30"}`}>
 {section.highlight ? "\u2713" : "\u2022"}
 </span>
 <span className={section.highlight ? "text-white/90" : "text-white/50"}>{item}</span>
 </li>
 ))}
 </ul>
 {section.highlight && (
 <div className="mt-6 pt-4 border-t border-blue-500/20">
 <p className="text-xs font-semibold text-blue-300 uppercase tracking-wider">No one owns the full stack. Until now.</p>
 </div>
 )}
 </div>
 </StaggerItem>
 ))}
 </StaggerContainer>
 </div>
 </section>

 {/* Who It's For */}
 <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
 <div className="max-w-7xl mx-auto">
 <FadeUp className="text-center mb-16">
 <p className="eyebrow text-blue-600 mb-4">BUILT FOR</p>
 <h2 className="section-h2 text-slate-900 mb-4">
 Built for every role in the organization
 </h2>
 </FadeUp>

 <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
 {([
 {
 title: "Operations Leaders",
 pain: "You can\u2019t be in every restaurant at once.",
 description: "Real-time visibility into every location via Pulse and Portfolio \u2014 know who needs help before they ask.",
 icon: "multiLocation" as SundaeIconName,
 color: "bg-blue-600"
 },
 {
 title: "Finance & FP&A",
 pain: "3 days to close the books? That\u2019s 3 days too many.",
 description: "Real-time margin intelligence, shift-level labor costs, and variance analysis connected to root causes.",
 icon: "benchmarking" as SundaeIconName,
 color: "bg-green-600"
 },
 {
 title: "C-Suite & Owners",
 pain: "Your worst-performing outlet is invisible until Thursday.",
 description: "Portfolio dashboards, AI daily briefings, competitive intelligence, and strategic decision views.",
 icon: "intelligence" as SundaeIconName,
 color: "bg-purple-600"
 },
 {
 title: "Technology Teams",
 pain: "12 vendor APIs. 5 data formats. Zero unified schema.",
 description: "Public API, webhooks, 12-domain integrations, governed metrics, and RBAC controls out of the box.",
 icon: "integration" as SundaeIconName,
 color: "bg-orange-600"
 }
 ]).map((role) => (
 <StaggerItem key={role.title}>
 <Card variant="elevated" className="h-full">
 <CardHeader>
 <div className="text-center">
 <div className={`w-14 h-14 ${role.color} rounded-full flex items-center justify-center text-white mx-auto mb-4 shadow-sm`}>
 <SundaeIcon name={role.icon} size="lg" className="text-white" />
 </div>
 <CardTitle className="text-slate-900 text-lg mb-2">{role.title}</CardTitle>
 <p className="text-sm font-medium text-slate-500 italic">&ldquo;{role.pain}&rdquo;</p>
 </div>
 </CardHeader>
 <CardContent>
 <p className="text-sm text-slate-600 text-center leading-relaxed">{role.description}</p>
 </CardContent>
 </Card>
 </StaggerItem>
 ))}
 </StaggerContainer>
 </div>
 </section>

 {/* CTA Section */}
 <PageCTA
 title="Stop running your restaurant on gut feel."
 description="30 minutes with your data. Real insights. No pitch deck."
 >
 <Button variant="cta" size="lg" href="/demo">Book a Demo</Button>
 <Button variant="outline-light" size="lg" href="/product">Explore Products</Button>
 </PageCTA>
 </div>
 );
}
