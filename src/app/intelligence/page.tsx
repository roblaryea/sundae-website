'use client';

import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { useCta } from "@/lib/cta";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { SIGNUP_URL } from "@/lib/urls";
import { IntelligenceChatMockup } from "@/components/ui/MockupFrame";
import { PageHero, PageCTA, FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/PageAnimations";

// ─── Four Conversation Modes ────────────────────────────────────────────────
const modes: { title: string; shortcut: string; description: string; icon: SundaeIconName; badge: string }[] = [
  {
    title: "Chat",
    shortcut: "⌘ 1",
    description: "Ask anything about your data. Get structured answers with interactive charts and KPI cards.",
    icon: "conversation",
    badge: "Default"
  },
  {
    title: "Analyst",
    shortcut: "⌘ 2",
    description: "Deep analysis with clarifying questions, confidence levels, and cross-referenced data sources.",
    icon: "insights",
    badge: "Deep Dive"
  },
  {
    title: "Monitor",
    shortcut: "⌘ 3",
    description: "Auto-refreshing KPI dashboard. 60-second cycles. Highlights anomalies exceeding 15% deviation.",
    icon: "pulse",
    badge: "Real-time"
  },
  {
    title: "Report",
    shortcut: "⌘ 4",
    description: "Stakeholder-ready reports with executive summary, key metrics, and recommendations.",
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
    description: "/compare, /report, /alert, /schedule, /export, /forecast, /benchmark, /explain, /share — each triggers an optimized intelligence prompt.",
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
    description: "No dashboards to configure. No reports to build. Ask a question, get a visual answer in seconds.",
    icon: "conversation"
  },
  {
    title: "Finds Problems Before You Do",
    description: "Continuously monitors revenue, orders, tickets, and menu performance — surfacing anomalies before they become expensive.",
    icon: "alerts"
  },
  {
    title: "Interactive Charts with Drill-Down",
    description: "Click any data point to explore deeper. Leave annotations for your team. Toggle chart types on the fly.",
    icon: "chart"
  },
  {
    title: "Scheduled Intelligence Delivery",
    description: "Daily, weekly, or monthly insights delivered via email, Slack, Telegram, Teams, or webhook.",
    icon: "schedule"
  },
  {
    title: "Connected to Everything",
    description: "Pulls from every connected source — POS, labor, inventory, reservations, delivery. Fully scoped per organization.",
    icon: "integration"
  },
  {
    title: "Decision Tracking",
    description: "Track what you did with each insight. Log actions taken, items monitored, or decisions dismissed.",
    icon: "success"
  }
];

export default function ChatWithDataPage() {
  const cta = useCta();

  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      {/* Hero */}
      <PageHero
        badge="Sundae Intelligence"
        title="Ask Your Data Anything. Get Answers in Seconds."
        description="Natural language questions, structured visual answers — powered by your POS, inventory, labor, and delivery data in real time."
      >
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="cta" size="lg" onClick={() => cta(SIGNUP_URL, "try_intelligence_hero", { page: "/intelligence" })}>
            Try It Free
          </Button>
          <Button variant="outline-light" size="lg" onClick={() => cta("/demo", "book_demo_intelligence", { page: "/intelligence" })}>
            Book a Demo
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 justify-center mt-4">
          {["Web App", "Telegram", "Slack", "Microsoft Teams", "Voice Input"].map((platform) => (
            <span key={platform} className="px-3 py-1.5 bg-[var(--navy-deep)]/10 border border-[var(--border-emphasis)] rounded-full text-xs font-medium text-[var(--text-secondary)]">
              {platform}
            </span>
          ))}
        </div>
      </PageHero>

      {/* Hero Mockup */}
      <section className="px-4 sm:px-6 lg:px-8 -mt-12 relative z-10 pb-16">
        <FadeUp delay={0.3}>
          <div className="max-w-5xl mx-auto">
            <IntelligenceChatMockup />
          </div>
        </FadeUp>
      </section>

      {/* Four Conversation Modes */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">
              Four Specialized Modes
            </h2>
            <p className="body-lg text-[var(--text-supporting)] max-w-2xl mx-auto">
              Each mode changes how intelligence is generated — from quick Q&amp;A to stakeholder-ready reports.
            </p>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {modes.map((mode) => (
              <StaggerItem key={mode.title}>
                <Card variant="elevated" className="h-full hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
                        <SundaeIcon name={mode.icon} size="md" className="text-white" />
                      </div>
                      <span className="text-[10px] font-mono bg-[var(--surface-subtle)] text-[var(--text-muted)] px-2 py-1 rounded">
                        {mode.shortcut}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-[var(--text-primary)]">{mode.title}</h3>
                      <span className="text-[10px] font-semibold uppercase tracking-wider bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full">
                        {mode.badge}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--text-supporting)] leading-relaxed">{mode.description}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Example Queries */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-4xl mx-auto text-center">
          <FadeUp>
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">
              Ask Anything About Your Business
            </h2>
            <p className="body-lg text-[var(--text-supporting)] mb-12">
              From quick checks to deep analysis — just type, speak, or use a slash command.
            </p>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "What was my best-selling item last Thursday?",
              "Compare labor costs across my downtown locations",
              "Why did revenue drop at Location 5 this week?",
              "Show me locations where labor cost exceeded 32%",
              "/forecast next week's revenue for all outlets",
              "/benchmark my RevPASH against nearby competitors"
            ].map((query) => (
              <StaggerItem
                key={query}
                className="bg-[var(--navy-deep)] rounded-xl p-4 text-left border border-[var(--border-default)]"
              >
                <p className="text-sm text-[var(--text-secondary)] font-mono">{query.startsWith('/') ? <><span className="text-blue-400 font-semibold">{query.split(' ')[0]}</span> {query.split(' ').slice(1).join(' ')}</> : <>&ldquo;{query}&rdquo;</>}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Smart Command Bar */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">
              Smart Command Bar
            </h2>
            <p className="body-lg text-[var(--text-supporting)] max-w-2xl mx-auto">
              Autocomplete, slash commands, voice input, @mentions, and file attachments.
            </p>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {commandFeatures.map((feature) => (
              <StaggerItem key={feature.title} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <SundaeIcon name={feature.icon} size="md" className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-[var(--text-primary)] mb-1">{feature.title}</h3>
                  <p className="text-sm text-[var(--text-supporting)] leading-relaxed">{feature.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Rich Response Cards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">
              Rich, Interactive Response Cards
            </h2>
            <p className="body-lg text-[var(--text-supporting)] max-w-2xl mx-auto">
              Structured, interactive cards — not plain text. Every response is visual and explorable.
            </p>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {responseCards.map((card) => (
              <StaggerItem key={card.title}>
                <Card variant="elevated" className="h-full hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mb-4">
                      <SundaeIcon name={card.icon} size="lg" className="text-white" />
                    </div>
                    <h3 className="font-bold text-[var(--text-primary)] mb-2">{card.title}</h3>
                    <p className="text-sm text-[var(--text-supporting)] leading-relaxed">{card.description}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Anomaly Detection */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeUp>
              <h2 className="section-h2 text-[var(--text-primary)] mb-4">
                Proactive Anomaly Detection
              </h2>
              <p className="body-lg text-[var(--text-supporting)] mb-6">
                Continuously scans your data for unusual patterns — surfacing issues before you even think to ask.
              </p>
              <div className="space-y-3">
                {anomalyTypes.map((anomaly) => (
                  <div key={anomaly} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 flex-shrink-0" />
                    <span className="text-sm text-[var(--text-secondary)]">{anomaly}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-[var(--text-muted)] mt-6">
                Anomalies appear as badge notifications, toast alerts, and smart suggestions on your welcome screen.
              </p>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="bg-[var(--surface-subtle)] rounded-2xl p-8 border border-[var(--border-default)]">
                <h3 className="font-bold text-[var(--text-primary)] mb-4">Smart Welcome Briefing</h3>
                <p className="text-sm text-[var(--text-supporting)] mb-4">
                  Every new session starts with a personalized briefing:
                </p>
                <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Time-based greeting with your name</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>3 live KPI cards — today&apos;s revenue, orders, and top item</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>4 smart suggestions prioritized by active anomalies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Data coverage indicator showing connected sources</span>
                  </li>
                </ul>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Sidebar & Collaboration */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">
              Organization &amp; Collaboration
            </h2>
            <p className="body-lg text-[var(--text-supporting)] max-w-2xl mx-auto">
              Pin, folder, schedule, and share — your intelligence workspace, organized your way.
            </p>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Thread Management", items: ["Pin important conversations", "Create folders and drag to organize", "Cross-folder collections", "Smart date grouping (Today, This Week, etc.)", "Search across all thread content"], icon: "insights" as SundaeIconName },
              { title: "Scheduled Reports", items: ["Daily, weekly, monthly, or custom cron", "Deliver via email, Slack, Telegram, Teams, webhook", "Toggle active/paused per schedule", "Run Now for instant delivery", "Execution tracking with failure alerts"], icon: "schedule" as SundaeIconName },
              { title: "Team Features", items: ["Share dialog with permission levels", "@Mention team members in queries", "Decision log (Action Taken / Monitoring / Dismissed)", "Context panel with SQL, sources, and latency", "Feedback per message (thumbs up/down)"], icon: "operators" as SundaeIconName },
            ].map((section) => (
              <StaggerItem key={section.title}>
                <Card variant="elevated" className="h-full">
                  <CardContent className="p-6">
                    <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center mb-4">
                      <SundaeIcon name={section.icon} size="md" className="text-white" />
                    </div>
                    <h3 className="font-bold text-[var(--text-primary)] mb-3">{section.title}</h3>
                    <ul className="space-y-2">
                      {section.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-[var(--text-supporting)]">
                          <span className="text-blue-400 mt-0.5 flex-shrink-0">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Key Differentiators */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">
              Why Sundae Intelligence Is Different
            </h2>
            <p className="body-lg text-[var(--text-supporting)] max-w-2xl mx-auto">
              Not another dashboard. A fundamentally different approach to decision intelligence.
            </p>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {differentiators.map((diff) => (
              <StaggerItem key={diff.title}>
                <Card variant="elevated" className="h-full hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mb-4">
                      <SundaeIcon name={diff.icon} size="lg" className="text-white" />
                    </div>
                    <h3 className="font-bold text-[var(--text-primary)] mb-2">{diff.title}</h3>
                    <p className="text-sm text-[var(--text-supporting)] leading-relaxed">{diff.description}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Accessibility & Platform */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-4xl mx-auto text-center">
          <FadeUp>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-8">
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
                <span key={feature} className="px-4 py-2 bg-[var(--surface-subtle)] border border-[var(--border-default)] rounded-full text-sm font-medium text-[var(--text-secondary)]">
                  {feature}
                </span>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* CTA */}
      <PageCTA
        title="Your Data Has Answers"
        description="Start a conversation with your restaurant data today."
      >
        <Button variant="cta" size="lg" href={SIGNUP_URL}>Try It Free</Button>
        <Button variant="outline-light" size="lg" href="/demo">Book a Demo</Button>
      </PageCTA>
    </div>
  );
}
