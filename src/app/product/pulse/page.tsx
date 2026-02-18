'use client';

import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { useCta } from "@/lib/cta";
import { REPORT_APP_URL } from "@/lib/urls";

const pulseModules: { name: string; description: string; icon: SundaeIconName; screenshot?: string }[] = [
  {
    name: "Sales & Pace",
    description: "Intraday sales pacing, KPIs, hourly trend visualization, and revenue tracking against targets.",
    icon: "chart",
    screenshot: "/images/product/pulse-sales-pacing.png"
  },
  {
    name: "Labor Live",
    description: "Intraday labor pacing, overtime risk tracking, break compliance, and cost-to-revenue ratios.",
    icon: "benchmarking",
    screenshot: "/images/product/pulse-labor.png"
  },
  {
    name: "Leakage Monitoring",
    description: "Real-time void, comp, and discount monitoring per shift. Catch revenue leakage before it adds up.",
    icon: "cost",
    screenshot: "/images/product/pulse-leakage.png"
  },
  {
    name: "AI Coach",
    description: "Shift-level coaching signals for Sales, Leakage, and Flow. Actionable recommendations in real time.",
    icon: "intelligence",
    screenshot: "/images/product/pulse-coach.png"
  },
  {
    name: "Alerts & Playbooks",
    description: "Automated response workflows triggered by exceptions. Define thresholds, get notified, act fast.",
    icon: "forecasting",
    screenshot: "/images/product/pulse-alerts.png"
  },
  {
    name: "Shift Scorecard",
    description: "End-of-shift summary with KPIs, highlights, and areas for improvement across every outlet.",
    icon: "report",
    screenshot: "/images/product/pulse-scorecard.png"
  },
  {
    name: "Portfolio Leaderboard",
    description: "Multi-outlet performance comparison with streak tracking and competitive ranking across locations.",
    icon: "multiLocation",
    screenshot: "/images/product/pulse-leaderboard.png"
  },
  {
    name: "Wallboard Mode",
    description: "Full-screen display optimized for kitchen or front-of-house screens. At-a-glance operational status.",
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
                <span>Pulse</span>
              </div>
              <h1 className="hero-h1 text-gray-900 dark:text-white mb-6">
                Intraday Operations Monitor
              </h1>
              <p className="body-xl text-gray-600 dark:text-slate-300 mb-6 max-w-xl">
                Live sales pacing, labor tracking, leakage detection, and AI coaching — shift by shift, outlet by outlet. Detect, act, and confirm within the shift.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Button
                  variant="primary"
                  size="lg"
                  href={REPORT_APP_URL}
                  onClick={() => cta(REPORT_APP_URL, "try_pulse_hero", { page: "/product/pulse" })}
                >
                  Try It Free
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => cta("/demo", "book_demo_pulse", { page: "/product/pulse" })}
                >
                  Book a Demo
                </Button>
              </div>
              <p className="text-sm text-gray-500 dark:text-slate-400">
                Included with Sundae Core. Real-time refresh cycles (2-4 hours).
              </p>
            </motion.div>

            <div>
              <BrowserFrame
                src="/images/product/pulse-sales-pacing.png"
                alt="Pulse — intraday sales pacing and operations monitor"
                width={800}
                height={500}
                priority
                animate="slide-right"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What Pulse Monitors */}
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
              { label: "Labor Cost", icon: "benchmarking" as SundaeIconName },
              { label: "Leakage", icon: "cost" as SundaeIconName },
              { label: "Service Speed", icon: "speed" as SundaeIconName },
              { label: "Menu Mix", icon: "insights" as SundaeIconName },
              { label: "Alerts", icon: "forecasting" as SundaeIconName },
              { label: "AI Coaching", icon: "intelligence" as SundaeIconName },
              { label: "Leaderboards", icon: "multiLocation" as SundaeIconName },
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

      {/* Pulse Modules — Detailed */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-red-50/30 dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 dark:text-white mb-4">
              Eight Modules. One Operational Nerve Center.
            </h2>
          </div>

          <div className="space-y-16">
            {pulseModules.map((mod, index) => (
              <motion.div
                key={mod.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`grid md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}
              >
                <div className={index % 2 === 1 ? "md:order-2" : ""}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg flex items-center justify-center">
                      <SundaeIcon name={mod.icon} size="md" className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{mod.name}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{mod.description}</p>
                </div>
                {mod.screenshot && (
                  <div className={index % 2 === 1 ? "md:order-1" : ""}>
                    <BrowserFrame
                      src={mod.screenshot}
                      alt={`${mod.name} — ${mod.description.slice(0, 60)}`}
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

      {/* CTA */}
      <section className="section-standard px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-deep-blue to-electric-blue text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="section-h2 mb-6">
            Stop Managing Shifts Blind
          </h2>
          <p className="body-lg mb-8 opacity-90">
            Pulse is included with every Sundae Core plan. See what's happening now — not at end-of-day.
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
