'use client';

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { motion, useInView, useReducedMotion, MotionConfig } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useCta } from "@/lib/cta";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { SIGNUP_URL } from "@/lib/urls";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { ElegantShape } from "@/components/ui/ElegantShape";

/* ─── Count-up hook ────────────────────────────────────────────── */

function useCountUp(end: number, duration: number = 2000, isInView: boolean = false) {
 const [count, setCount] = useState(0);

 useEffect(() => {
 if (!isInView) return;
 let startTime: number | null = null;

 const animate = (timestamp: number) => {
 if (!startTime) startTime = timestamp;
 const progress = timestamp - startTime;
 const percentage = Math.min(progress / duration, 1);
 const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
 setCount(Math.floor(end * easeOutQuart));
 if (percentage < 1) requestAnimationFrame(animate);
 };

 requestAnimationFrame(animate);
 }, [end, duration, isInView]);

 return count;
}

/* ─── Stat Card ────────────────────────────────────────────────── */

function StatCard({ insight, index, isInView, prefersReducedMotion }: {
 insight: { title: string; value: number; suffix: string; prefix?: string; description: string };
 index: number; isInView: boolean; prefersReducedMotion: boolean;
}) {
 const count = useCountUp(insight.value, prefersReducedMotion ? 0 : 2000, isInView);
 return (
 <motion.div
 className="relative text-center p-8 rounded-2xl border border-slate-200/60 bg-white"
 initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
 animate={isInView ? { opacity: 1, y: 0 } : {}}
 transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, delay: index * 0.1 }}
 >
 <div className="text-3xl sm:text-4xl font-bold text-accent-gradient mb-2 whitespace-nowrap tracking-tight">
 {insight.prefix}{count}{insight.suffix}
 </div>
 <h3 className="font-semibold text-slate-900 text-sm sm:text-base mb-1">{insight.title}</h3>
 <p className="text-xs text-slate-500 leading-relaxed">{insight.description}</p>
 </motion.div>
 );
}

/* ─── Data ─────────────────────────────────────────────────────── */

const painPoints = [
 {
 pain: "12 data sources. Zero unified intelligence.",
 detail: "Your POS says one thing. Your labor system says another. Your inventory platform doesn\u2019t talk to either. You\u2019re making million-dollar decisions on fragmented data.",
 solution: "Sundae\u2019s Integrations Hub unifies POS, labor, inventory, delivery, reservations, and 7 more domains into a single intelligence layer.",
 icon: "integration" as SundaeIconName,
 },
 {
 pain: "Your P&L arrives weeks after the damage is done.",
 detail: "By the time your weekly report lands, the labor overrun already hit payroll. The margin leak already happened. You\u2019re managing yesterday\u2019s problems.",
 solution: "Pulse monitors every shift in real-time \u2014 sales pacing, labor productivity, leakage, server performance \u2014 with AI coaching that acts in the moment.",
 icon: "pulse" as SundaeIconName,
 },
 {
 pain: "Is your 31% food cost good or bad? You have no idea.",
 detail: "You know your numbers. But without competitor context, market signals, and event intelligence, you\u2019re optimizing in the dark.",
 solution: "Watchtower and Benchmarks add market context to every operational decision \u2014 competitor moves, weather impact, local events, anonymous peer data.",
 icon: "watchtower" as SundaeIconName,
 },
];

const productPillars: {
 name: string; subtitle: string; description: string; icon: SundaeIconName;
 screenshot: string; screenshotAlt: string; accent: string; link: string;
}[] = [
 {
 name: "Pulse",
 subtitle: "Real-Time Operations",
 description: "A shift is a perishable asset. Pulse gives you live sales pacing, adaptive AI targets, server performance, and leakage detection \u2014 shift by shift, outlet by outlet.",
 icon: "pulse",
 screenshot: "/images/product/pulse-scorecard.png",
 screenshotAlt: "Pulse shift scorecard showing revenue, covers, top items, and server performance",
 accent: "from-violet-500 to-blue-600",
 link: "/product/pulse"
 },
 {
 name: "Benchmarks",
 subtitle: "Competitive Intelligence",
 description: "Stop guessing. Start knowing. Anonymous peer benchmarks for RevPASH, check size, labor productivity, and more \u2014 know exactly where you stand.",
 icon: "benchmarking",
 screenshot: "/images/product/benchmark-overview.png",
 screenshotAlt: "Benchmark dashboard with RevPASH Index, competitive comparison, and market insights",
 accent: "from-blue-500 to-cyan-500",
 link: "/benchmarking"
 },
 {
 name: "Watchtower",
 subtitle: "Market Intelligence",
 description: "A new competitor opened 2 blocks away \u2014 you found out on Instagram. Watchtower gives you AI briefings, competitor monitoring, weather impact, and event intelligence.",
 icon: "watchtower",
 screenshot: "/images/product/watchtower.png",
 screenshotAlt: "Watchtower command center with weather impact, events, and competitor tracking",
 accent: "from-rose-500 to-orange-500",
 link: "/product/watchtower"
 },
 {
 name: "Insights",
 subtitle: "30+ Intelligence Modules",
 description: "Deep-dive analytics across revenue, labor, inventory, purchasing, marketing, reservations, delivery, and guest experience \u2014 each with AI-generated recommendations.",
 icon: "insights",
 screenshot: "/images/product/core-insights-hub.png",
 screenshotAlt: "Insights hub showing intelligence modules for revenue, labor, inventory, and more",
 accent: "from-emerald-500 to-teal-500",
 link: "/insights"
 },
 {
 name: "Sundae Intelligence",
 subtitle: "Conversational AI",
 description: "Ask your data anything. Get answers in seconds. Available in Chat, Monitor, and Briefing modes \u2014 on web, Slack, Teams, or Telegram.",
 icon: "conversation",
 screenshot: "/images/product/chat-with-data.png",
 screenshotAlt: "Sundae Intelligence conversational analytics interface",
 accent: "from-indigo-500 to-purple-600",
 link: "/intelligence"
 }
];

const decisionInsights = [
 { title: "Variance Detected", value: 50, suffix: "K+", prefix: "$", description: "In the first 30 days of deployment" },
 { title: "Faster Decisions", value: 3, suffix: "x", description: "From weekly reports to real-time" },
 { title: "Labor Cost Savings", value: 18, suffix: "%", description: "Through shift-level optimization" },
 { title: "Time to ROI", value: 30, suffix: " days", description: "Typical for multi-location groups" }
];

const personas: {
 title: string; pain: string; outcome: string; icon: SundaeIconName; color: string;
}[] = [
 {
 title: "Operations Leaders",
 pain: "You can\u2019t be in every restaurant at once.",
 outcome: "Live pacing, labor productivity, and server performance across every outlet. Know which location needs help right now \u2014 and why.",
 icon: "operators",
 color: "from-blue-500 to-blue-600",
 },
 {
 title: "Finance & FP&A",
 pain: "You shouldn\u2019t need 3 days to close the books on last month.",
 outcome: "Real-time margin intelligence, shift-level labor costs by role, and variance analysis that connects to root causes \u2014 not just numbers.",
 icon: "finance",
 color: "from-violet-500 to-violet-600",
 },
 {
 title: "C-Suite & Owners",
 pain: "Your best manager recovers a slow shift. Your worst manager watches it happen.",
 outcome: "Portfolio-level dashboards, AI-synthesized daily briefings, competitive intelligence, and market positioning across every brand and geography.",
 icon: "owners",
 color: "from-emerald-500 to-emerald-600",
 },
 {
 title: "Data & Technology",
 pain: "12 vendor APIs, 5 data formats, zero unified schema.",
 outcome: "Clean data pipelines, governed metrics, public API, webhooks, and an opinionated intelligence layer that actually makes sense of the chaos.",
 icon: "technology",
 color: "from-amber-500 to-orange-500",
 },
];

/* ─── Component ────────────────────────────────────────────────── */

export default function HomeContent() {
 const cta = useCta();
 const prefersReducedMotion = useReducedMotion() ?? false;
 const resultsRef = useRef(null);
 const resultsInView = useInView(resultsRef, { once: true, margin: "-100px" });

 return (
 <MotionConfig reducedMotion="user">
 <>
 {/* ════════════════════════════════════════════════
 HERO — Category-defining
 ════════════════════════════════════════════════ */}
 <section className="relative min-h-[90vh] flex flex-col justify-center pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-slate-950">
 {/* Ambient gradient wash */}
 <div className="absolute inset-0 bg-gradient-to-br from-blue-900/[0.06] via-transparent to-violet-500/[0.04] blur-3xl" />

 {/* Subtle grid overlay */}
 <div
 className="absolute inset-0 opacity-[0.03]"
 style={{
 backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
 backgroundSize: '60px 60px',
 }}
 />

 {/* Animated floating shapes */}
 <div className="absolute inset-0 overflow-hidden">
 <ElegantShape
 delay={0.3}
 width={600}
 height={140}
 rotate={12}
 gradient="from-blue-400/[0.07]"
 className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
 />
 <ElegantShape
 delay={0.5}
 width={500}
 height={120}
 rotate={-15}
 gradient="from-violet-400/[0.07]"
 className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
 />
 <ElegantShape
 delay={0.4}
 width={300}
 height={80}
 rotate={-8}
 gradient="from-blue-300/[0.06]"
 className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
 />
 <ElegantShape
 delay={0.6}
 width={200}
 height={60}
 rotate={20}
 gradient="from-slate-300/[0.05]"
 className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
 />
 </div>

 <div className="max-w-5xl mx-auto text-center relative z-20">
 {/* Eyebrow */}
 <motion.div
 initial={{ opacity: 0, y: 30 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
 className="flex justify-center mb-8"
 >
 <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide uppercase bg-blue-500/[0.08] border border-blue-400/[0.15] text-blue-300/80">
 <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
 Decision Intelligence Platform
 </span>
 </motion.div>

 {/* Headline */}
 <motion.div
 initial={{ opacity: 0, y: 30 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 1, delay: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
 >
 <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl mx-auto">
 <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
 Decision Intelligence
 </span>
 <br />
 <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-white to-blue-300">
 for Restaurants
 </span>
 </h1>
 </motion.div>

 {/* Tagline — pain-driven */}
 <motion.div
 initial={{ opacity: 0, y: 30 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 1, delay: 0.9, ease: [0.25, 0.4, 0.25, 1] }}
 >
 <p className="text-lg sm:text-xl text-white/50 leading-relaxed mb-10 max-w-2xl mx-auto">
 Your data lives in 5&ndash;10 disconnected systems. Your team makes million-dollar decisions by gut feel.
 <span className="text-white/80 font-medium"> Sundae fixes that.</span>
 </p>
 </motion.div>

 {/* CTAs */}
 <motion.div
 className="flex flex-col sm:flex-row gap-3 justify-center mb-4"
 initial={{ opacity: 0, y: 30 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 1, delay: 1.1, ease: [0.25, 0.4, 0.25, 1] }}
 >
 <Button
 variant="primary"
 size="lg"
 className="bg-white text-slate-900 hover:bg-slate-100"
 href={SIGNUP_URL}
 onClick={() => cta(SIGNUP_URL, "start_free_hero", { page: "/home" })}
 >
 Start Free
 </Button>
 <Button
 variant="outline-light"
 size="lg"
 onClick={() => cta("/demo", "book_demo_hero", { page: "/home" })}
 >
 Book a Demo
 </Button>
 </motion.div>
 <motion.p
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 transition={{ duration: 0.6, delay: 1.3 }}
 className="text-xs text-white/30"
 >
 No credit card required
 </motion.p>
 </div>

 {/* Hero Product Screenshot */}
 <motion.div
 className="max-w-5xl mx-auto mt-16 relative z-20 px-4"
 initial={{ opacity: 0, y: 40 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.8, delay: 1.0 }}
 style={{ perspective: '1200px' }}
 >
 {/* Glow behind frame */}
 <div className="absolute -inset-x-10 bottom-0 h-48 bg-gradient-to-t from-blue-500/[0.08] via-blue-500/[0.06] to-transparent blur-2xl pointer-events-none rounded-full" />

 <motion.div
 initial={{ rotateX: 8, scale: 0.95, opacity: 0 }}
 animate={{ rotateX: 1.5, scale: 1, opacity: 1 }}
 transition={{ duration: 1.2, delay: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
 className="shadow-2xl shadow-black/40 rounded-xl relative border border-white/[0.06]"
 >
 <BrowserFrame
 src="/images/product/pulse-sales-pacing.png"
 alt="Sundae Pulse — real-time sales pacing, adaptive targets, and gap analysis"
 priority
 animate="none"
 />
 </motion.div>
 </motion.div>

 {/* Proof Bar — concrete numbers, not placeholders */}
 <motion.div
 className="max-w-4xl mx-auto mt-16 relative z-20"
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 transition={{ duration: 0.6, delay: 1.4 }}
 >
 <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
 {[
 { number: "250+", label: "Locations piloting" },
 { number: "22", label: "Intelligence modules" },
 { number: "12", label: "Data domains unified" },
 { number: "5 min", label: "Shift refresh cycle" },
 ].map(item => (
 <div key={item.label} className="text-center">
 <div className="text-lg sm:text-xl font-bold text-white/70 tabular-nums">{item.number}</div>
 <div className="text-[10px] sm:text-xs text-white/30 uppercase tracking-wider font-medium">{item.label}</div>
 </div>
 ))}
 </div>
 </motion.div>

 {/* Bottom gradient fade to white */}
 <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none z-30" />
 </section>

 {/* ════════════════════════════════════════════════
 THE PROBLEM — Pain-first narrative
 ════════════════════════════════════════════════ */}
 <section aria-labelledby="problem-heading" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
 <div className="max-w-6xl mx-auto">
 <div className="text-center mb-16">
 <p className="eyebrow text-blue-600 mb-4">THE PROBLEM</p>
 <h2 id="problem-heading" className="section-h2 text-slate-900 mb-5">
 Three gaps costing you money every day
 </h2>
 <p className="body-lg text-slate-500 max-w-2xl mx-auto">
 Every restaurant group we work with faces the same challenges.
 </p>
 </div>

 <div className="space-y-6">
 {painPoints.map((item, index) => (
 <motion.div
 key={item.pain}
 initial={{ opacity: 0, y: 24 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "-60px" }}
 transition={{ duration: 0.5, delay: index * 0.1 }}
 className="group"
 >
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-100 hover:border-slate-200 transition-colors">
 {/* Pain */}
 <div className="lg:col-span-5">
 <div className="flex items-start gap-4">
 <div className="w-11 h-11 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
 <SundaeIcon name={item.icon} size="md" className="text-red-500" />
 </div>
 <div>
 <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug">{item.pain}</h3>
 <p className="text-sm text-slate-500 leading-relaxed">{item.detail}</p>
 </div>
 </div>
 </div>

 {/* Arrow */}
 <div className="lg:col-span-2 flex justify-center">
 <div className="hidden lg:flex items-center gap-2">
 <div className="h-px w-8 bg-slate-300" />
 <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold shadow-sm">
 &rarr;
 </div>
 <div className="h-px w-8 bg-slate-300" />
 </div>
 <div className="lg:hidden flex justify-center py-2">
 <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm rotate-90">
 &rarr;
 </div>
 </div>
 </div>

 {/* Solution */}
 <div className="lg:col-span-5">
 <p className="text-sm font-medium text-slate-700 leading-relaxed">{item.solution}</p>
 </div>
 </div>
 </motion.div>
 ))}
 </div>
 </div>
 </section>

 {/* ════════════════════════════════════════════════
 FIVE PILLARS
 ════════════════════════════════════════════════ */}
 <section aria-labelledby="platform-heading" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50/80">
 <div className="max-w-7xl mx-auto">
 <div className="text-center mb-20">
 <p className="eyebrow text-blue-600 mb-4">PLATFORM</p>
 <h2 id="platform-heading" className="section-h2 text-slate-900 mb-5">
 Five layers. One truth.
 </h2>
 <p className="body-lg text-slate-500 max-w-2xl mx-auto">
 Everything a restaurant group needs to understand, predict, and act &mdash; from real-time shifts to long-range strategy.
 </p>
 </div>

 {/* Top row: 3 pillars */}
 <motion.div
 className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6"
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, margin: "-80px" }}
 variants={{
 hidden: {},
 visible: { transition: { staggerChildren: 0.1 } },
 }}
 >
 {productPillars.slice(0, 3).map((pillar) => (
 <PillarCard key={pillar.name} pillar={pillar} cta={cta} />
 ))}
 </motion.div>

 {/* Bottom row: 2 pillars */}
 <motion.div
 className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, margin: "-80px" }}
 variants={{
 hidden: {},
 visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
 }}
 >
 {productPillars.slice(3).map((pillar) => (
 <PillarCard key={pillar.name} pillar={pillar} cta={cta} />
 ))}
 </motion.div>

 <div className="text-center mt-14">
 <Button
 variant="outline"
 size="lg"
 onClick={() => cta("/insights", "explore_modules", { page: "/home", section: "product-pillars" })}
 >
 Explore all modules
 </Button>
 </div>
 </div>
 </section>

 {/* ════════════════════════════════════════════════
 PULSE SPOTLIGHT — Sharpened copy
 ════════════════════════════════════════════════ */}
 <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
 <div className="max-w-6xl mx-auto">
 <div className="grid md:grid-cols-2 gap-16 items-center">
 <motion.div
 initial={{ opacity: 0, x: -16 }}
 whileInView={{ opacity: 1, x: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6 }}
 >
 <p className="eyebrow text-blue-600 mb-4">SPOTLIGHT</p>
 <h2 className="section-h2 text-slate-900 mb-4">
 A shift is a perishable asset.
 </h2>
 <p className="body-xl text-slate-500 mb-2">Once it&apos;s over, the revenue is gone.</p>
 <p className="body-lg text-slate-500 mb-8">
 Pulse doesn&apos;t just report &mdash; it learns your patterns, adjusts for seasonality, and sets adaptive AI targets that reflect your real business rhythm. Sales pacing, labor productivity, server leaderboards, leakage detection, and AI coaching &mdash; every shift, every outlet.
 </p>

 <motion.div
 className="grid grid-cols-2 gap-x-6 gap-y-3 mb-10"
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true }}
 variants={{
 hidden: {},
 visible: { transition: { staggerChildren: 0.04 } },
 }}
 >
 {[
 "Adaptive AI Targets",
 "Sales & Pace Tracking",
 "Labor Productivity",
 "Server Performance",
 "Leakage Monitoring",
 "AI Shift Coach",
 "Alerts & Playbooks",
 "Shift Scorecard",
 "Portfolio Leaderboard",
 "Wallboard Mode"
 ].map((feature) => (
 <motion.div
 key={feature}
 variants={{
 hidden: { opacity: 0, x: -6 },
 visible: { opacity: 1, x: 0 },
 }}
 className="flex items-center gap-2.5 text-sm text-slate-600"
 >
 <span className="flex-shrink-0 h-1.5 w-1.5 rounded-full bg-blue-500" />
 <span>{feature}</span>
 </motion.div>
 ))}
 </motion.div>

 <Button
 variant="primary"
 size="lg"
 onClick={() => cta("/product/pulse", "explore_pulse_home", { page: "/home", section: "pulse-spotlight" })}
 >
 Explore Pulse
 </Button>
 </motion.div>

 <div>
 <BrowserFrame
 src="/images/product/pulse-wallboard.png"
 alt="Pulse Wallboard — dark-mode real-time operations display showing live sales, targets, and pacing"
 width={800}
 height={500}
 animate="slide-right"
 />
 </div>
 </div>
 </div>
 </section>

 {/* ════════════════════════════════════════════════
 HOW IT WORKS
 ════════════════════════════════════════════════ */}
 <section aria-labelledby="how-it-works-heading" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50/80">
 <div className="max-w-6xl mx-auto">
 <div className="text-center mb-20">
 <p className="eyebrow text-blue-600 mb-4">HOW IT WORKS</p>
 <h2 id="how-it-works-heading" className="section-h2 text-slate-900 mb-5">
 From data to decisions in four steps
 </h2>
 </div>

 <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
 <div className="hidden lg:block absolute top-[52px] left-[calc(12.5%+28px)] right-[calc(12.5%+28px)] h-px bg-gradient-to-r from-slate-200 via-blue-300 to-slate-200 z-0" />

 {([
 {
 step: "01",
 title: "Connect",
 description: "Plug in POS, labor, inventory, and delivery data. Most integrations take under 5 minutes. Sundae cleans and unifies everything automatically.",
 icon: "integration" as SundaeIconName,
 color: "from-blue-500 to-blue-600"
 },
 {
 step: "02",
 title: "Understand",
 description: "AI agents surface anomalies, detect seasonality, and layer in external signals \u2014 weather, events, competitors \u2014 to separate noise from signal.",
 icon: "insights" as SundaeIconName,
 color: "from-violet-500 to-violet-600"
 },
 {
 step: "03",
 title: "Decide",
 description: "Receive specific recommendations \u2014 adaptive targets, staffing changes, menu adjustments \u2014 with explainable logic grounded in your data.",
 icon: "aiOs" as SundaeIconName,
 color: "from-emerald-500 to-emerald-600"
 },
 {
 step: "04",
 title: "Improve",
 description: "Every decision and outcome feeds the system. Playbooks get sharper. Benchmarks get more precise. Your operation compounds.",
 icon: "growth" as SundaeIconName,
 color: "from-amber-500 to-orange-500"
 }
 ]).map((step, index) => (
 <motion.div
 key={step.step}
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5, delay: index * 0.1 }}
 viewport={{ once: true, margin: "-80px" }}
 >
 <div className="text-center">
 <div className={`relative z-10 inline-flex w-12 h-12 bg-gradient-to-br ${step.color} rounded-xl items-center justify-center text-white mb-5 shadow-lg`}>
 <SundaeIcon name={step.icon} size="md" className="text-white" />
 </div>
 <div className="text-xs font-mono text-slate-400 mb-2 tracking-wider">{step.step}</div>
 <h3 className="text-lg font-semibold text-slate-900 mb-3">{step.title}</h3>
 <p className="text-sm text-slate-500 leading-relaxed">
 {step.description}
 </p>
 </div>
 </motion.div>
 ))}
 </div>
 </div>
 </section>

 {/* ════════════════════════════════════════════════
 WHO IT'S FOR — Persona-specific pain hooks
 ════════════════════════════════════════════════ */}
 <section aria-labelledby="who-its-for-heading" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
 <div className="max-w-6xl mx-auto">
 <div className="text-center mb-16">
 <p className="eyebrow text-blue-600 mb-4">BUILT FOR</p>
 <h2 id="who-its-for-heading" className="section-h2 text-slate-900 mb-5">
 Every role. One platform.
 </h2>
 <p className="body-lg text-slate-500 max-w-2xl mx-auto">
 Sundae speaks the language of your entire team &mdash; from shift managers to the C-suite.
 </p>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
 {personas.map((persona, index) => (
 <motion.div
 key={persona.title}
 initial={{ opacity: 0, y: 16 }}
 whileInView={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5, delay: index * 0.08 }}
 viewport={{ once: true, margin: "-80px" }}
 >
 <div className="group h-full flex flex-col p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-slate-200 transition-all duration-300">
 <div className="flex items-center gap-4 mb-4">
 <div className={`w-11 h-11 bg-gradient-to-br ${persona.color} rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-sm`}>
 <SundaeIcon name={persona.icon} size="md" className="text-white" />
 </div>
 <h3 className="font-semibold text-slate-900 text-base">{persona.title}</h3>
 </div>

 <p className="text-base font-semibold text-slate-800 mb-3 leading-snug italic">
 &ldquo;{persona.pain}&rdquo;
 </p>
 <p className="text-sm text-slate-500 leading-relaxed">{persona.outcome}</p>
 </div>
 </motion.div>
 ))}
 </div>
 </div>
 </section>

 {/* ════════════════════════════════════════════════
 RESULTS & SOCIAL PROOF — Specific numbers
 ════════════════════════════════════════════════ */}
 <section ref={resultsRef} aria-labelledby="results-heading" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50/80">
 <div className="max-w-6xl mx-auto">
 <div className="text-center mb-16">
 <p className="eyebrow text-blue-600 mb-4">RESULTS</p>
 <h2 id="results-heading" className="section-h2 text-slate-900 mb-5">
 Operators see impact fast
 </h2>
 <p className="body-sm text-slate-400">
 Based on multi-location restaurant groups during early deployments
 </p>
 </div>

 <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
 {decisionInsights.map((insight, index) => (
 <StatCard key={insight.title} insight={insight} index={index} isInView={resultsInView} prefersReducedMotion={prefersReducedMotion} />
 ))}
 </div>

 <motion.div
 initial={{ opacity: 0, y: 16 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.5 }}
 className="max-w-3xl mx-auto"
 >
 <div className="relative bg-white rounded-2xl p-8 sm:p-10 border border-slate-200/60 shadow-sm">
 <div className="absolute top-6 left-8 text-5xl font-serif text-slate-200 leading-none select-none">&ldquo;</div>
 <p className="relative text-base sm:text-lg font-medium text-slate-700 leading-relaxed mb-6 pl-4">
 Sundae surfaced a margin gap across our lunch dayparts in the first week. The labor optimization recommendations alone paid for the platform in the first quarter. Our teams finally see where to take action &mdash; not just where numbers moved.
 </p>
 <div className="flex items-center justify-between pl-4">
 <div>
 <p className="text-sm font-semibold text-slate-800">Group CFO</p>
 <p className="text-xs text-slate-400">Multi-brand restaurant group, 40+ locations</p>
 </div>
 <div className="text-right">
 <p className="text-2xl font-bold text-accent-gradient">+9%</p>
 <p className="text-xs text-slate-400">Margin opportunity detected</p>
 </div>
 </div>
 </div>
 </motion.div>
 </div>
 </section>

 {/* ════════════════════════════════════════════════
 INTEGRATIONS
 ════════════════════════════════════════════════ */}
 <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
 <div className="max-w-6xl mx-auto">
 <div className="grid md:grid-cols-2 gap-16 items-center">
 <div>
 <BrowserFrame
 src="/images/product/core-integrations.png"
 alt="Sundae integrations hub showing 12-domain vendor connections"
 width={800}
 height={500}
 animate="slide-left"
 />
 </div>

 <motion.div
 initial={{ opacity: 0, x: 16 }}
 whileInView={{ opacity: 1, x: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6 }}
 >
 <p className="eyebrow text-blue-600 mb-4">INTEGRATIONS</p>
 <h2 className="section-h2 text-slate-900 mb-6">
 Connects to what you already run
 </h2>
 <p className="body-lg text-slate-500 mb-8">
 12 data domains unified into one intelligence layer. No rip-and-replace &mdash; Sundae sits on top of your existing stack.
 </p>

 <motion.div
 className="flex flex-wrap gap-2 mb-8"
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true }}
 variants={{
 hidden: {},
 visible: { transition: { staggerChildren: 0.03 } },
 }}
 >
 {["POS", "Labor", "Inventory", "Delivery", "Reservations", "Marketing", "Guest Experience", "Accounting", "Purchasing", "Flow", "CRM"].map((domain) => (
 <motion.span
 key={domain}
 variants={{
 hidden: { opacity: 0, scale: 0.9 },
 visible: { opacity: 1, scale: 1 },
 }}
 className="px-3 py-1.5 bg-slate-50 border border-slate-200/80 rounded-full text-xs font-medium text-slate-500"
 >
 {domain}
 </motion.span>
 ))}
 </motion.div>

 <Button
 variant="outline"
 size="sm"
 onClick={() => cta("/integrations", "view_integrations", { page: "/home", section: "integrations" })}
 >
 View all integrations
 </Button>
 </motion.div>
 </div>
 </div>
 </section>

 {/* ════════════════════════════════════════════════
 FINAL CTA
 ════════════════════════════════════════════════ */}
 <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-slate-950 text-white overflow-hidden">
 {/* Top gradient from white */}
 <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white to-transparent z-10" />

 {/* Ambient shapes */}
 <ElegantShape
 delay={0}
 width={400}
 height={100}
 rotate={-12}
 gradient="from-blue-400/[0.05]"
 className="left-[-8%] top-[20%]"
 />
 <ElegantShape
 delay={0.2}
 width={300}
 height={80}
 rotate={15}
 gradient="from-violet-400/[0.04]"
 className="right-[-5%] bottom-[10%]"
 />

 <div className="max-w-3xl mx-auto text-center relative z-10">
 <h2 className="section-h2 mb-4 text-white">
 Stop running your restaurant on gut feel.
 </h2>
 <p className="body-lg mb-10 text-slate-300 max-w-xl mx-auto">
 30 minutes with your data. Real insights. No pitch deck.
 </p>
 <div className="flex flex-col sm:flex-row gap-4 justify-center">
 <Button
 variant="primary"
 size="lg"
 onClick={() => cta("/demo", "book_demo_footer_cta", { page: "/home" })}
 >
 Book a Demo
 </Button>
 <Button
 variant="outline-light"
 size="lg"
 onClick={() => cta(SIGNUP_URL, "get_report_footer_cta", { page: "/home" })}
 >
 Start Free
 </Button>
 </div>
 </div>
 </section>
 </>
 </MotionConfig>
 );
}

/* ─── Pillar Card Component ────────────────────────────────────── */

function PillarCard({ pillar, cta }: {
 pillar: typeof productPillars[number];
 cta: ReturnType<typeof useCta>;
}) {
 return (
 <motion.div
 variants={{
 hidden: { opacity: 0, y: 20 },
 visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
 }}
 className="group cursor-pointer"
 role="button"
 tabIndex={0}
 onClick={() => cta(pillar.link, `view_${pillar.name.toLowerCase().replace(/\s+/g, "_")}`, { page: "/home", section: "product-pillars" })}
 onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); cta(pillar.link, `view_${pillar.name.toLowerCase().replace(/\s+/g, "_")}`, { page: "/home", section: "product-pillars" }); } }}
 >
 <Card variant="elevated" className="h-full hover:shadow-lg transition-all duration-300 overflow-hidden border-slate-200/60">
 <div className="relative h-48 overflow-hidden bg-slate-100">
 <Image
 src={pillar.screenshot}
 alt={pillar.screenshotAlt}
 fill
 className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/20 to-transparent" />
 </div>

 <CardContent className="p-6">
 <div className="flex items-center gap-3 mb-3">
 <div className={`w-9 h-9 bg-gradient-to-br ${pillar.accent} rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm`}>
 <SundaeIcon name={pillar.icon} size="sm" className="text-white" />
 </div>
 <div>
 <h3 className="text-base font-semibold text-slate-900 leading-tight">{pillar.name}</h3>
 <p className="text-xs text-slate-400 font-medium">{pillar.subtitle}</p>
 </div>
 </div>

 <p className="text-sm text-slate-500 leading-relaxed mb-4">
 {pillar.description}
 </p>

 <span className="text-sm font-medium text-blue-600 group-hover:text-blue-700 transition-colors">
 Learn more <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
 </span>
 </CardContent>
 </Card>
 </motion.div>
 );
}
