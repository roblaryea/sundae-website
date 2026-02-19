'use client';

import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { useCta } from "@/lib/cta";
import { REPORT_APP_URL } from "@/lib/urls";
const pulseFeatureBlocks: { title: string; headline: string; description: string; capabilities: string[]; icon: SundaeIconName; screenshot?: string }[] = [
  {
    title: "Adaptive Intelligence Targets",
    headline: "Targets That Learn Your Business",
    description: "Stop guessing. Pulse\u2019s Adaptive Intelligence Engine analyzes your historical sales data, detects statistical anomalies, maps year-over-year patterns, and adjusts for calendar events like Ramadan, public holidays, and local seasonality \u2014 automatically. Set a growth ambition and the system calculates intelligent daily targets for every outlet.",
    capabilities: [
      "Year-over-year weekly target mapping",
      "Configurable growth modifiers",
      "Anomaly detection with one-click tagging",
      "Calendar event awareness (Ramadan, Eid, NYE, public holidays)",
      "Trend shift detection with proactive alerts",
      "Forward target simulation and preview"
    ],
    icon: "intelligence",
    screenshot: "/images/product/pulse_adaptive.png"
  },
  {
    title: "Sales & Pace Tracking",
    headline: "Know Where You Stand \u2014 Every Hour",
    description: "Real-time sales pacing against your targets, broken down by daypart. See expected revenue by this point in the shift, the gap to target, recovery pace needed, and whether you\u2019re trending to beat or miss the day.",
    capabilities: [
      "Intraday pacing with configurable daypart splits",
      "Real-time gap-to-target and recovery calculations",
      "Hourly revenue trend visualization",
      "Multi-outlet portfolio view with RAG status"
    ],
    icon: "chart",
    screenshot: "/images/product/pulse-sales-pacing.png"
  },
  {
    title: "Labor Productivity Intelligence",
    headline: "From Headcount to Productivity",
    description: "Labor isn\u2019t just about hours \u2014 it\u2019s about output. Pulse tracks Sales per Labor Hour, Covers per Labor Hour, and a composite Productivity Index in real time. See which shifts are overstaffed, which are generating the most revenue per hour, and what each shift actually costs \u2014 broken down to individual staff and role.",
    capabilities: [
      "Sales per Labor Hour (SPLH) and Covers per Labor Hour (CPLH)",
      "Real-time Labor Cost Ratio vs. target",
      "Per-shift cost breakdown with staff-level detail",
      "Productivity trend tracking over 14 days",
      "Configurable hourly rates by role"
    ],
    icon: "benchmarking",
    screenshot: "/images/product/pulse-labor.png"
  },
  {
    title: "Server Performance Analytics",
    headline: "See Who\u2019s Driving Your Revenue",
    description: "A live leaderboard that ranks servers by revenue, average check, covers, upsell rate, and a composite productivity score \u2014 with the ability to drill into any hour, any service phase, or any comparison period. Use it for coaching, incentives, and staffing decisions.",
    capabilities: [
      "Filter by hour, service phase, or custom time range",
      "Compare vs. yesterday, same day last week, or 4-week average",
      "Composite productivity score (0\u2013100)",
      "Individual server detail with charts and team comparison",
      "Strengths and improvement areas auto-detected"
    ],
    icon: "multiLocation",
    screenshot: "/images/product/pulse-leaderboard.png"
  },
  {
    title: "Leakage Monitoring",
    headline: "Catch Revenue Leaks in Real Time",
    description: "Voids, discounts, comps, and refunds \u2014 tracked in real time against your baselines. Pulse flags when leakage rates spike above normal, identifies the specific servers, items, and time windows involved, and alerts you before small issues become expensive patterns.",
    capabilities: [
      "Real-time void, discount, and comp tracking",
      "Server-level leakage attribution",
      "Spike detection against rolling baselines",
      "Automated alerts for anomalous leakage patterns"
    ],
    icon: "cost",
    screenshot: "/images/product/pulse-leakage.png"
  },
  {
    title: "AI Shift Coach",
    headline: "An AI Co-Pilot for Every Shift",
    description: "Pulse doesn\u2019t just show you data \u2014 it tells you what to do about it. The AI Coach monitors all signals in real time and surfaces prioritized, actionable recommendations based on live data, not generic tips.",
    capabilities: [
      "Real-time contextual recommendations",
      "Prioritized by revenue impact",
      "Based on live Pulse data, not generic tips",
      "Configurable playbooks per scenario"
    ],
    icon: "intelligence",
    screenshot: "/images/product/pulse-coach.png"
  },
  {
    title: "Wallboard Mode",
    headline: "Put Pulse on the Big Screen",
    description: "A dark-mode, TV-optimized display designed for kitchen pass-throughs, manager offices, and staff areas. Auto-rotates through outlets, prioritizes at-risk locations, and gives the team a shared, live view of how the shift is running.",
    capabilities: [
      "TV-optimized 16:9 dark mode display",
      "Auto-rotate across outlets",
      "Priority ordering (at-risk outlets first)",
      "Configurable refresh rate and metrics"
    ],
    icon: "canvas",
    screenshot: "/images/product/pulse-wallboard.png"
  }
];

export default function PulsePage() {
  const cta = useCta();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50/80 via-white to-orange-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Hero */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center space-x-2 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <SundaeIcon name="pulse" size="md" />
                <span>Pulse — Intraday Operations Monitor</span>
              </div>
              <h1 className="hero-h1 text-gray-900 dark:text-white mb-6">
                Your Shift Command Center
              </h1>
              <p className="body-xl text-gray-600 dark:text-slate-300 mb-6 max-w-xl">
                Sundae Pulse monitors every dimension of your shift in real time — sales pacing, labor productivity, server performance, leakage, and service speed — with AI-powered targets that adapt to your restaurant&apos;s unique patterns and seasonality.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => cta("/demo", "book_demo_pulse_hero", { page: "/product/pulse" })}
                >
                  Book a Demo
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => cta("/product/pulse#features", "see_pulse_in_action", { page: "/product/pulse" })}
                >
                  See Pulse in Action
                </Button>
              </div>
              <p className="text-sm text-gray-500 dark:text-slate-400">
                Available as a module on Core tiers. Also available on Report Pro with unlock.
              </p>
            </motion.div>

            <div>
              <BrowserFrame
                src="/images/product/pulse-sales-pacing.png"
                alt="Pulse — real-time sales pacing with adaptive AI targets"
                width={800}
                height={500}
                priority
                animate="slide-right"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What Pulse Monitors — Quick Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-h2 text-gray-900 dark:text-white mb-4">
            Everything You Need During the Shift
          </h2>
          <p className="body-lg text-gray-600 dark:text-gray-300 mb-12">
            Pulse monitors your operation in real time and coaches your team when things go off-track.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Sales Pacing", icon: "chart" as SundaeIconName },
              { label: "Adaptive Targets", icon: "intelligence" as SundaeIconName },
              { label: "Labor Productivity", icon: "benchmarking" as SundaeIconName },
              { label: "Server Analytics", icon: "multiLocation" as SundaeIconName },
              { label: "Leakage", icon: "cost" as SundaeIconName },
              { label: "AI Coach", icon: "intelligence" as SundaeIconName },
              { label: "Alerts & Playbooks", icon: "forecasting" as SundaeIconName },
              { label: "Wallboard", icon: "canvas" as SundaeIconName },
            ].map((item) => (
              <div key={item.label} className="p-4 bg-red-50/60 dark:bg-slate-800 rounded-xl text-center">
                <div className="w-10 h-10 mx-auto mb-2 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <SundaeIcon name={item.icon} size="md" className="text-white" />
                </div>
                <p className="text-sm font-medium text-gray-700 dark:text-slate-300">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Blocks — Detailed */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-red-50/30 dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 dark:text-white mb-4">
              Seven Capabilities. One Operational Nerve Center.
            </h2>
          </div>

          <div className="space-y-16">
            {pulseFeatureBlocks.map((block, index) => (
              <motion.div
                key={block.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`grid md:grid-cols-2 gap-8 items-center`}
              >
                <div className={index % 2 === 1 ? "md:order-2" : ""}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg flex items-center justify-center">
                      <SundaeIcon name={block.icon} size="md" className="text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-red-600 dark:text-red-400 uppercase tracking-wider">{block.title}</p>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{block.headline}</h3>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{block.description}</p>
                  <ul className="space-y-1.5">
                    {block.capabilities.map((cap) => (
                      <li key={cap} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <span className="text-red-500 mt-0.5 flex-shrink-0">&#10003;</span>
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {block.screenshot && (
                  <div className={index % 2 === 1 ? "md:order-1" : ""}>
                    <BrowserFrame
                      src={block.screenshot}
                      alt={`${block.headline}`}
                      width={700}
                      height={420}
                      animate={index % 2 === 0 ? "slide-right" : "slide-left"}
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* New Content Block: Targets That Get Smarter */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="eyebrow text-red-600 dark:text-red-400 mb-4">INTELLIGENCE THAT LEARNS</p>
              <h2 className="section-h2 text-gray-900 dark:text-white mb-6">
                Targets That Get Smarter Every Week
              </h2>
              <p className="body-lg text-gray-600 dark:text-gray-300">
                Most restaurant platforms make you set targets manually — or copy last week. Sundae&apos;s Adaptive Intelligence Engine scans your full sales history, detects anomalies and seasonality, maps calendar events like Ramadan and NYE to their actual revenue impact, and generates forward-looking targets that reflect your real business rhythm. Tag a one-off event and it&apos;s excluded. Tag a recurring event and the system adjusts for it next year, automatically.
              </p>
            </div>
            <div>
              <BrowserFrame
                src="/images/product/pulse_week_target.png"
                alt="Adaptive Intelligence Targets — forward-looking target simulation"
                width={700}
                height={420}
                animate="slide-right"
              />
            </div>
          </div>
        </div>
      </section>

      {/* New Content Block: Server Intelligence */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-red-50/30 dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="md:order-2">
              <p className="eyebrow text-red-600 dark:text-red-400 mb-4">SERVER INTELLIGENCE</p>
              <h2 className="section-h2 text-gray-900 dark:text-white mb-6">
                From Leaderboard to Coaching Tool
              </h2>
              <p className="body-lg text-gray-600 dark:text-gray-300">
                See who&apos;s driving your revenue and who needs support — in real time. Filter by hour, by service phase, or compare against last week. Every server gets a productivity score, an hourly breakdown, and auto-detected strengths and improvement areas. Use it for daily coaching, incentive programs, or shift planning. Because the best restaurants don&apos;t just track servers — they develop them.
              </p>
            </div>
            <div className="md:order-1">
              <BrowserFrame
                src="/images/product/pulse-leaderboard.png"
                alt="Server Performance Analytics — leaderboard with productivity scores"
                width={700}
                height={420}
                animate="slide-left"
              />
            </div>
          </div>
        </div>
      </section>

      {/* New Content Block: Shift Economics */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="eyebrow text-red-600 dark:text-red-400 mb-4">SHIFT COSTING</p>
              <h2 className="section-h2 text-gray-900 dark:text-white mb-6">
                Know What Every Shift Costs
              </h2>
              <p className="body-lg text-gray-600 dark:text-gray-300">
                Your morning shift runs 4 staff for 8 hours. Your evening runs 8 for 5 hours. But which one is actually profitable? Pulse breaks down the cost of every shift in your currency — by role, by individual — and maps it against the revenue that shift generates. See your labor cost ratio by shift, identify where you&apos;re overstaffed, and make smarter scheduling decisions.
              </p>
            </div>
            <div>
              <BrowserFrame
                src="/images/product/pulse-labor.png"
                alt="Shift Costing — per-shift cost breakdown with staff-level detail"
                width={700}
                height={420}
                animate="slide-right"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-standard px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-deep-blue to-electric-blue text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="section-h2 mb-6">
            Stop Managing Shifts Blind
          </h2>
          <p className="body-lg mb-8 opacity-90">
            Pulse is available on every Sundae Core plan. See what&apos;s happening now — not at end-of-day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-deep-blue hover:bg-gray-100"
              onClick={() => cta("/demo", "book_demo_pulse_cta", { page: "/product/pulse" })}
            >
              Book a Demo
            </Button>
            <Button
              variant="outline-light"
              size="lg"
              onClick={() => cta(REPORT_APP_URL, "start_free_pulse_cta", { page: "/product/pulse" })}
            >
              Start Free →
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
