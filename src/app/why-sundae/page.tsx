import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { PageHero, PageCTA, FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/PageAnimations";

const differentiators: { title: string; description: string; icon: SundaeIconName; color: string }[] = [
 {
 title: "12-Domain Data Ingestion",
 description: "POS, labor, inventory, purchasing, reservations, delivery, marketing, guest experience, CRM, accounting \u2014 all unified. No more disconnected systems.",
 icon: "integration",
 color: "bg-[#1C47FF]"
 },
 {
 title: "4D Intelligence Model",
 description: "What happened. How it compares to plan. Where you stand in the market. What to do next. Four dimensions of every decision.",
 icon: "intelligence",
 color: "bg-purple-600"
 },
 {
 title: "Real-Time Operations via Pulse",
 description: "Intraday sales pacing, labor productivity, leakage detection, and coaching \u2014 before the shift is over.",
 icon: "speed",
 color: "bg-green-600"
 },
 {
 title: "External Intelligence via Watchtower",
 description: "New competitor? Weather tanking covers? Concert announced? You\u2019ll know before it hits your numbers.",
 icon: "watchtower",
 color: "bg-red-600"
 },
 {
 title: "Conversational Access",
 description: "Natural language queries via web, Telegram, Slack, or Teams \u2014 answers in seconds, not days.",
 icon: "forge",
 color: "bg-orange-600"
 },
 {
 title: "Built for Multi-Location Operators",
 description: "Multi-tenant RBAC, portfolio leaderboards, cross-location benchmarking, multi-currency, and region-level drill-downs.",
 icon: "multiLocation",
 color: "bg-teal-600"
 }
];

const problems = [
 {
 problem: "12 Data Sources. Zero Unified Intelligence.",
 current: "POS says one thing. Labor says another. Inventory doesn\u2019t talk to either. Million-dollar decisions on data spread across 5\u201310 systems.",
 solution: "12 data domains into one intelligence layer \u2014 automatically cleaned, normalized, and unified.",
 impact: "One source of truth across every location",
 stat: "12",
 statLabel: "domains unified"
 },
 {
 problem: "Your P&L Arrives Weeks After the Damage Is Done.",
 current: "The labor overrun already hit payroll. The margin leak already happened. You\u2019re managing yesterday\u2019s problems with last week\u2019s data.",
 solution: "Pulse monitors operations intraday with 5-minute refresh, real-time alerts, and coaching that acts in the moment.",
 impact: "Shift from reactive to proactive management",
 stat: "5 min",
 statLabel: "refresh cycle"
 },
 {
 problem: "Is Your 31% Food Cost Good or Bad? You Have No Idea.",
 current: "You know your numbers. But without competitor context and market signals, you\u2019re optimizing in the dark.",
 solution: "Watchtower and Benchmarks add market context \u2014 competitor moves, weather impact, events, anonymous peer data.",
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
 title: "Generic Dashboards",
 items: ["Multi-source dashboards", "Scheduled reports", "Basic alerting", "No industry context"],
 icon: "sync" as SundaeIconName,
 highlight: false,
 },
 {
 title: "Sundae",
 items: ["4D Intelligence Model", "Real-time Pulse monitoring", "Market context via Watchtower", "Intelligent recommendations"],
 icon: "speed" as SundaeIconName,
 highlight: true,
 },
];

export default function WhySundaePage() {
 return (
 <div className="min-h-screen bg-[var(--navy-deep)]">
 {/* Hero Section */}
 <PageHero
 badge="Why Sundae"
 title="The Intelligence Layer Restaurants Never Had"
 description="Your data lives in disconnected silos. Your team makes million-dollar decisions by gut feel. We built the platform that changes that."
 />

 {/* Three Biggest Problems Section */}
 <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
 <div className="max-w-7xl mx-auto">
 <FadeUp className="text-center mb-16">
 <p className="eyebrow text-[#60A5FA] mb-4">THE PROBLEM</p>
 <h2 className="section-h2 text-[var(--text-primary)] mb-4">
 Three gaps costing you money every day
 </h2>
 <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">
 Every restaurant group we&apos;ve worked with faces the same three challenges.
 </p>
 </FadeUp>

 <div className="space-y-8">
 {problems.map((item, index) => (
 <FadeUp key={item.problem} delay={index * 0.1}>
 <div className="bg-[var(--surface-faint)] rounded-2xl border border-[var(--border-default)] overflow-hidden">
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
 {/* Pain side */}
 <div className="lg:col-span-5 p-8 bg-red-500/10 border-b lg:border-b-0 lg:border-r border-red-500/20">
 <div className="text-xs font-semibold uppercase tracking-wider text-red-400 mb-3">The Problem</div>
 <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3 leading-snug">{item.problem}</h3>
 <p className="text-sm text-[var(--text-supporting)] leading-relaxed">{item.current}</p>
 </div>

 {/* Stat center */}
 <div className="lg:col-span-2 flex items-center justify-center p-6 bg-[var(--navy-deep)]">
 <div className="text-center">
 <div className="text-3xl font-bold text-accent-gradient">{item.stat}</div>
 <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider mt-1">{item.statLabel}</div>
 </div>
 </div>

 {/* Solution side */}
 <div className="lg:col-span-5 p-8 bg-green-500/10 border-t lg:border-t-0 lg:border-l border-green-500/20">
 <div className="text-xs font-semibold uppercase tracking-wider text-green-400 mb-3">Sundae Solution</div>
 <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">{item.solution}</p>
 <div className="flex items-center gap-2 text-sm font-medium text-green-400">
 <span className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 text-xs">&#10003;</span>
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
 <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
 <div className="max-w-7xl mx-auto">
 <FadeUp className="text-center mb-16">
 <p className="eyebrow text-[#60A5FA] mb-4">DIFFERENTIATORS</p>
 <h2 className="section-h2 text-[var(--text-primary)] mb-4">
 What makes Sundae different
 </h2>
 <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">
 Six capabilities that no other platform combines.
 </p>
 </FadeUp>

 <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
 {differentiators.map((item) => (
 <StaggerItem key={item.title}>
 <Card variant="elevated" className="h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
 <CardHeader>
 <div className="flex items-center space-x-4">
 <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center shadow-none`}>
 <SundaeIcon name={item.icon} size="lg" className="text-white" />
 </div>
 <CardTitle className="text-[var(--text-primary)] text-lg">{item.title}</CardTitle>
 </div>
 </CardHeader>
 <CardContent>
 <CardDescription className="text-[var(--text-supporting)] leading-relaxed">
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
 <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)] text-[var(--text-primary)]">
 <div className="max-w-7xl mx-auto text-center">
 <FadeUp>
 <p className="eyebrow text-blue-400 mb-4">COMPARISON</p>
 <h2 className="section-h2 mb-4">
 Beyond traditional dashboards
 </h2>
 <p className="body-xl mb-16 max-w-3xl mx-auto text-[var(--text-supporting)]">
 Most platforms show you what happened. We show you what&apos;s happening, what it means, and what to do about it.
 </p>
 </FadeUp>

 <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
 {comparisonColumns.map((section) => (
 <StaggerItem key={section.title}>
 <div className={`rounded-2xl p-8 text-center h-full ${
 section.highlight
 ? "bg-[#1C47FF]/20 border border-blue-500/30 ring-1 ring-blue-500/20"
 : "bg-[var(--surface-faint)] border border-[var(--border-default)]"
 }`}>
 <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5 ${
 section.highlight ? "bg-[#1C47FF]/30" : "bg-[var(--surface-subtle)]"
 }`}>
 <SundaeIcon name={section.icon} size="xl" className={section.highlight ? "text-blue-300" : "text-[var(--text-muted)]"} />
 </div>
 <h3 className={`font-bold text-lg mb-6 ${section.highlight ? "text-blue-200" : "text-[var(--text-secondary)]"}`}>{section.title}</h3>
 <ul className="space-y-3 text-left">
 {section.items.map((item, idx) => (
 <li key={idx} className="flex items-start gap-3 text-sm">
 <span className={`mt-0.5 ${section.highlight ? "text-blue-400" : "text-[var(--text-muted)]"}`}>
 {section.highlight ? "\u2713" : "\u2022"}
 </span>
 <span className={section.highlight ? "text-white/90" : "text-[var(--text-muted)]"}>{item}</span>
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
 <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
 <div className="max-w-7xl mx-auto">
 <FadeUp className="text-center mb-16">
 <p className="eyebrow text-[#60A5FA] mb-4">BUILT FOR</p>
 <h2 className="section-h2 text-[var(--text-primary)] mb-4">
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
 color: "bg-[#1C47FF]"
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
 description: "Portfolio dashboards, daily briefings, competitive intelligence, and strategic decision views.",
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
 <div className={`w-14 h-14 ${role.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-none`}>
 <SundaeIcon name={role.icon} size="lg" className="text-white" />
 </div>
 <CardTitle className="text-[var(--text-primary)] text-lg mb-2">{role.title}</CardTitle>
 <p className="text-sm font-medium text-[var(--text-muted)] italic">&ldquo;{role.pain}&rdquo;</p>
 </div>
 </CardHeader>
 <CardContent>
 <p className="text-sm text-[var(--text-supporting)] text-center leading-relaxed">{role.description}</p>
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
