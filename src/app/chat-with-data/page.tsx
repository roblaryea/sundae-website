'use client';

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { useCta } from "@/lib/cta";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { SIGNUP_URL } from "@/lib/urls";

// ─── Four Conversation Modes ────────────────────────────────────────────────
const modes: { title: string; shortcut: string; description: string; icon: SundaeIconName; badge: string }[] = [
  {
    title: "Chat",
    shortcut: "\u2318 1",
    description: "Freeform Q&A — ask anything about your data and get structured, visual answers with interactive charts and KPI cards.",
    icon: "conversation",
    badge: "Default"
  },
  {
    title: "Analyst",
    shortcut: "\u2318 2",
    description: "Deep analysis mode — asks clarifying questions, provides confidence levels, and cross-references multiple data sources.",
    icon: "insights",
    badge: "Deep Dive"
  },
  {
    title: "Monitor",
    shortcut: "\u2318 3",
    description: "Real-time KPI dashboard that auto-refreshes every 60 seconds and highlights anomalies exceeding 15% deviation.",
    icon: "pulse",
    badge: "Real-time"
  },
  {
    title: "Report",
    shortcut: "\u2318 4",
    description: "Stakeholder-ready reports — executive summary, key metrics, trends, and recommendations in narrative form.",
    icon: "document",
    badge: "Executive"
  }
];

// ─── Smart Command Bar Features ─────────────────────────────────────────────
const commandFeatures: { title: string; description: string; icon: SundaeIconName }[] = [
  {
    title: "Smart Autocomplete",
    description: "Suggests recent queries, metric names, and data fields as you type — powered by your connected data sources.",
    icon: "search"
  },
  {
    title: "9 Slash Commands",
    description: "/compare, /report, /alert, /schedule, /export, /forecast, /benchmark, /explain, /share — each triggers an optimized AI prompt.",
    icon: "speed"
  },
  {
    title: "Voice Input & Wake Word",
    description: "Click the mic to dictate queries, or enable \"Hey Sundae\" always-listening mode for hands-free operation.",
    icon: "device"
  },
  {
    title: "File Attachments",
    description: "Attach CSV, Excel, images, or screenshots — ask questions about uploaded data with inline preview and parsing.",
    icon: "data"
  }
];

// ─── Rich Response Cards ────────────────────────────────────────────────────
const responseCards: { title: string; description: string; icon: SundaeIconName }[] = [
  {
    title: "KPI Cards",
    description: "Single metrics with value, period-over-period change, 7-day sparklines, and segment breakdown charts.",
    icon: "chart"
  },
  {
    title: "Interactive Charts",
    description: "Bar, line, area, pie, and scatter — with type switching, click drill-down, annotations, fullscreen, and CSV export.",
    icon: "dashboard"
  },
  {
    title: "Analysis Cards",
    description: "Structured insights with sentiment tagging (positive/negative/neutral) and supporting data evidence.",
    icon: "insights"
  },
  {
    title: "Comparison Cards",
    description: "Side-by-side metric comparisons across locations, time periods, or menu categories with variance highlighting.",
    icon: "benchmarking"
  }
];

// ─── Anomaly Types ──────────────────────────────────────────────────────────
const anomalyTypes = [
  "Revenue anomaly (vs. 30-day average)",
  "Order count spikes or drops",
  "Average ticket size shifts",
  "Off-hours activity detection",
  "Top-selling item changes",
  "Payment method shifts"
];

// ─── Key Differentiators ────────────────────────────────────────────────────
const differentiators: { title: string; description: string; icon: SundaeIconName }[] = [
  {
    title: "Conversational, Not Dashboard-Based",
    description: "No pre-built dashboards to configure. Ask questions in natural language and get visual, structured answers.",
    icon: "conversation"
  },
  {
    title: "Proactive Anomaly Detection",
    description: "The system finds problems before you ask — monitoring revenue, orders, tickets, and menu item performance continuously.",
    icon: "alerts"
  },
  {
    title: "Interactive Charts with Drill-Down",
    description: "Click any data point to explore deeper. Leave annotations for your team. Toggle chart types on the fly.",
    icon: "chart"
  },
  {
    title: "Scheduled Intelligence Delivery",
    description: "Automated insights delivered daily, weekly, or monthly — via in-app, email, Slack, Telegram, Teams, or webhook.",
    icon: "schedule"
  },
  {
    title: "Multi-Source, Multi-Tenant",
    description: "Connects to PostgreSQL, MySQL, SQL Server, and Snowflake. Fully scoped per organization with schema discovery.",
    icon: "integration"
  },
  {
    title: "Decision Tracking",
    description: "Not just insights — track what you did with them. Log actions taken, items monitored, or decisions dismissed.",
    icon: "success"
  }
];

export default function ChatWithDataPage() {
  const cta = useCta();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/80 via-white to-purple-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Hero */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-500 mb-4">
                AI-POWERED DECISION INTELLIGENCE
              </p>
              <h1 className="hero-h1 text-gray-900 dark:text-white mb-6">
                Sundae Intelligence
              </h1>
              <p className="body-xl text-gray-600 dark:text-slate-300 mb-3 max-w-xl">
                A conversational BI engine built into the Sundae platform. Ask questions in natural language, get structured visual answers — powered by your POS, inventory, HR, and delivery data.
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 max-w-xl">
                Think &ldquo;ChatGPT for your restaurant data&rdquo; — but deeply integrated with your operational systems.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Button
                  variant="primary"
                  size="lg"
                  href={SIGNUP_URL}
                  onClick={() => cta(SIGNUP_URL, "try_intelligence_hero", { page: "/chat-with-data" })}
                >
                  Try It Free
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => cta("/demo", "book_demo_intelligence", { page: "/chat-with-data" })}
                >
                  Book a Demo
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Web App", "Telegram", "Slack", "Microsoft Teams", "Voice Input"].map((platform) => (
                  <span key={platform} className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-xs font-medium text-slate-600 dark:text-slate-300">
                    {platform}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="rounded-xl overflow-hidden shadow-2xl border border-slate-200/60 dark:border-slate-700">
                <Image
                  src="/images/product/chat-with-data.png"
                  alt="Sundae Intelligence — conversational analytics interface with interactive charts and KPI cards"
                  width={800}
                  height={500}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Four Conversation Modes */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 dark:text-white mb-4">
              Four Specialized Modes
            </h2>
            <p className="body-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Each mode changes how the AI thinks and responds — from quick Q&A to stakeholder-ready reports.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {modes.map((mode, index) => (
              <motion.div
                key={mode.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card variant="elevated" className="h-full hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-electric-blue to-deep-blue rounded-lg flex items-center justify-center">
                        <SundaeIcon name={mode.icon} size="md" className="text-white" />
                      </div>
                      <span className="text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-1 rounded">
                        {mode.shortcut}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-gray-900 dark:text-white">{mode.title}</h3>
                      <span className="text-[10px] font-semibold uppercase tracking-wider bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full">
                        {mode.badge}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{mode.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Example Queries */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-h2 text-gray-900 dark:text-white mb-4">
            Ask Anything About Your Business
          </h2>
          <p className="body-lg text-gray-600 dark:text-gray-300 mb-12">
            From quick checks to deep analysis — just type, speak, or use a slash command.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "What was my best-selling item last Thursday?",
              "Compare labor costs across my downtown locations",
              "Why did revenue drop at Location 5 this week?",
              "Show me locations where labor cost exceeded 32%",
              "/forecast next week's revenue for all outlets",
              "/benchmark my RevPASH against nearby competitors"
            ].map((query, index) => (
              <motion.div
                key={query}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white dark:bg-slate-800 rounded-xl p-4 text-left border border-slate-200/70 dark:border-slate-700"
              >
                <p className="text-sm text-gray-700 dark:text-gray-300 font-mono">{query.startsWith('/') ? <><span className="text-blue-500 font-semibold">{query.split(' ')[0]}</span> {query.split(' ').slice(1).join(' ')}</> : <>&ldquo;{query}&rdquo;</>}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Smart Command Bar */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 dark:text-white mb-4">
              Smart Command Bar
            </h2>
            <p className="body-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Far more than a text box — with autocomplete, slash commands, voice input, @mentions, and file attachments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {commandFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <SundaeIcon name={feature.icon} size="md" className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Rich Response Cards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 dark:text-white mb-4">
              Rich, Interactive Response Cards
            </h2>
            <p className="body-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              The AI returns structured, interactive cards — not plain text. Every response is visual, actionable, and explorable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {responseCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card variant="elevated" className="h-full hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mb-4">
                      <SundaeIcon name={card.icon} size="lg" className="text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">{card.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{card.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Anomaly Detection */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="section-h2 text-gray-900 dark:text-white mb-4">
                Proactive Anomaly Detection
              </h2>
              <p className="body-lg text-gray-600 dark:text-gray-300 mb-6">
                The system continuously scans your data for unusual patterns — surfacing issues before you even think to ask.
              </p>
              <div className="space-y-3">
                {anomalyTypes.map((anomaly, index) => (
                  <motion.div
                    key={anomaly}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-2 h-2 rounded-full bg-orange-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{anomaly}</span>
                  </motion.div>
                ))}
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-6">
                Anomalies appear as badge notifications, toast alerts, and smart suggestions on your welcome screen.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30 rounded-2xl p-8 border border-orange-200/50 dark:border-orange-800/30"
            >
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Smart Welcome Briefing</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Every new session starts with a personalized briefing:
              </p>
              <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">&#10003;</span>
                  <span>Time-based greeting with your name</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">&#10003;</span>
                  <span>3 live KPI cards — today&apos;s revenue, orders, and top item</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">&#10003;</span>
                  <span>4 smart suggestions prioritized by active anomalies</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">&#10003;</span>
                  <span>Data coverage indicator showing connected sources</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sidebar & Collaboration */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 dark:text-white mb-4">
              Organization & Collaboration
            </h2>
            <p className="body-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Pin, folder, schedule, and share — your intelligence workspace, organized your way.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Thread Management", items: ["Pin important conversations", "Create folders and drag to organize", "Cross-folder collections", "Smart date grouping (Today, This Week, etc.)", "Search across all thread content"], icon: "insights" as SundaeIconName },
              { title: "Scheduled Reports", items: ["Daily, weekly, monthly, or custom cron", "Deliver via email, Slack, Telegram, Teams, webhook", "Toggle active/paused per schedule", "Run Now for instant delivery", "Execution tracking with failure alerts"], icon: "schedule" as SundaeIconName },
              { title: "Team Features", items: ["Share dialog with permission levels", "@Mention team members in queries", "Decision log (Action Taken / Monitoring / Dismissed)", "Context panel with SQL, sources, and latency", "Feedback per message (thumbs up/down)"], icon: "operators" as SundaeIconName },
            ].map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card variant="elevated" className="h-full">
                  <CardContent className="p-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-electric-blue to-deep-blue rounded-lg flex items-center justify-center mb-4">
                      <SundaeIcon name={section.icon} size="md" className="text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-3">{section.title}</h3>
                    <ul className="space-y-2">
                      {section.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <span className="text-blue-500 mt-0.5 flex-shrink-0">&#10003;</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Differentiators */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 dark:text-white mb-4">
              Why Sundae Intelligence Is Different
            </h2>
            <p className="body-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Not another dashboard tool. A fundamentally different approach to restaurant intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {differentiators.map((diff, index) => (
              <motion.div
                key={diff.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card variant="elevated" className="h-full hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-electric-blue to-deep-blue rounded-xl flex items-center justify-center mb-4">
                      <SundaeIcon name={diff.icon} size="lg" className="text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">{diff.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{diff.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Accessibility & Platform */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-8">
            Built for Every Market
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "RTL / Arabic Support",
              "Full Keyboard Shortcuts",
              "Dark Mode",
              "Mobile Responsive",
              "ARIA Accessible",
              "Real-time Streaming",
              "4 Database Connectors",
              "Multi-Tenant Isolation"
            ].map((feature) => (
              <span key={feature} className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-sm font-medium text-slate-700 dark:text-slate-300">
                {feature}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-deep-blue to-electric-blue text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-h2 mb-6">
            Stop Digging Through Dashboards
          </h2>
          <p className="body-lg mb-8 opacity-90">
            Sundae Intelligence is available across all Sundae tiers. Unlock the full suite with Intelligence Pro for unlimited queries, all four modes, and priority AI capacity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
              onClick={() => cta("/demo", "book_demo_intelligence_cta", { page: "/chat-with-data" })}
            >
              Book a Demo
            </Button>
            <Button
              variant="outline-light"
              size="lg"
              onClick={() => cta(SIGNUP_URL, "start_free_intelligence_cta", { page: "/chat-with-data" })}
            >
              Start Free
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
