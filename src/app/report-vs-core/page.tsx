'use client';

import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { useCta } from "@/lib/cta";
import { REPORT_APP_URL, PRICING_URL } from "@/lib/urls";

export default function ReportVsCorePage() {
  const cta = useCta();

  const comparisonData = [
    {
      category: "Data Refresh",
      report: "Daily / Weekly / Monthly",
      reportDetail: "Perfect for strategic planning and historical analysis",
      core: "2-4 Hour Cycles",
      coreDetail: "Near real-time for operational decisions",
      icon: "speed" as SundaeIconName
    },
    {
      category: "Intelligence Dimensions",
      report: "1D + 2D + 4D (Limited)",
      reportDetail: "Full historical data, budget variance, basic predictions",
      core: "Full 4D (All Expanded)",
      coreDetail: "Real-time data + predictions + market context + recommendations",
      icon: "intelligence" as SundaeIconName
    },
    {
      category: "Data Sources",
      report: "POS Only",
      reportDetail: "Sales, revenue, covers from point-of-sale system",
      core: "POS + All Systems",
      coreDetail: "POS + Labor + Inventory + Marketing + Reservations + Purchasing",
      icon: "integration" as SundaeIconName
    },
    {
      category: "Primary Use Cases",
      report: "Strategic Analysis",
      reportDetail: "Historical trends, benchmarking, long-term planning",
      core: "Operational Decisions",
      coreDetail: "Real-time management, proactive alerts, daily operations",
      icon: "insights" as SundaeIconName
    },
    {
      category: "Best For",
      report: "1-5 Locations",
      reportDetail: "Proof of concept, testing Sundae, strategic analysis",
      core: "10+ Locations",
      coreDetail: "Operations requiring speed, multi-location portfolios",
      icon: "multiLocation" as SundaeIconName
    }
  ];

  const decisionTree = [
    {
      question: "Need operational speed?",
      yesAnswer: "Core",
      yesReason: "2-4 hour refresh for same-shift decisions",
      noAnswer: "Report",
      noReason: "Daily reports sufficient for strategic planning"
    },
    {
      question: "Need detailed POS insights + other systems?",
      yesAnswer: "Core",
      yesReason: "Integrates Labor, Inventory, Marketing, Reservations, Purchasing",
      noAnswer: "Report",
      noReason: "POS-only data meets your needs"
    },
    {
      question: "Managing 10+ locations?",
      yesAnswer: "Core",
      yesReason: "Multi-location coordination requires real-time visibility",
      noAnswer: "Report",
      noReason: "1-5 locations work well with historical analysis"
    },
    {
      question: "Want to test Sundae first?",
      yesAnswer: "Report",
      yesReason: "Start free with Report Lite, upgrade when ready",
      noAnswer: "Core",
      noReason: "Go real-time from day one"
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-[11px] font-semibold tracking-[0.14em] uppercase text-[var(--text-muted)] mb-4">PRODUCT COMPARISON</span>
            <h1 className="hero-h1 text-[var(--text-primary)] mb-6">
              Report vs Core: Pick Your Speed
            </h1>
            <p className="body-xl text-[var(--text-supporting)] mb-4 max-w-3xl mx-auto">
              Both deliver decision intelligence. Report gives you historical depth. Core gives you real-time operational speed. Choose based on how fast you need to act.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={PRICING_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="primary" size="lg">
                  See Exact Pricing
                </Button>
              </a>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => cta(REPORT_APP_URL, "start_free_from_comparison", { page: "/report-vs-core" })}
              >
                Start Free with Report
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Summary Cards */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)] border-b border-[var(--border-default)]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Report Summary */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card variant="elevated" className="h-full border-2 border-blue-200">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                      <SundaeIcon name="report" size="lg" className="text-[var(--text-primary)]" />
                    </div>
                    <CardTitle className="text-2xl text-[var(--text-primary)]">Sundae Report</CardTitle>
                  </div>
                  <CardDescription className="text-lg text-[var(--text-secondary)] font-semibold mb-4">
                    Historical analysis & strategic planning
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-semibold text-[var(--text-muted)] uppercase mb-2">Perfect when:</p>
                      <ul className="space-y-2 text-[var(--text-supporting)]">
                        <li>• Daily/weekly reports are sufficient</li>
                        <li>• You need historical trends & benchmarking</li>
                        <li>• Testing Sundae before committing</li>
                        <li>• Managing 1-5 locations</li>
                      </ul>
                    </div>
                    <div className="bg-[rgba(28,71,255,0.1)] rounded-lg p-4">
                      <p className="text-sm font-semibold text-blue-900 mb-1">Start Free Forever</p>
                      <p className="text-sm text-[#60A5FA]">Report Lite costs nothing. Prove the value, then upgrade.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Core Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card variant="elevated" className="h-full border-2 border-purple-200 bg-purple-50/30">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <SundaeIcon name="speed" size="lg" className="text-[var(--text-primary)]" />
                    </div>
                    <CardTitle className="text-2xl text-[var(--text-primary)]">Sundae Core</CardTitle>
                  </div>
                  <CardDescription className="text-lg text-[var(--text-secondary)] font-semibold mb-4">
                    Real-time operations & predictive intelligence
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-semibold text-[var(--text-muted)] uppercase mb-2">Perfect when:</p>
                      <ul className="space-y-2 text-[var(--text-supporting)]">
                        <li>• You need 2-4 hour refresh cycles</li>
                        <li>• Operational speed is critical</li>
                        <li>• Need system integrations (Labor, Inventory, etc.)</li>
                        <li>• Managing 10+ locations</li>
                      </ul>
                    </div>
                    <div className="bg-purple-100 rounded-lg p-4">
                      <p className="text-sm font-semibold text-purple-900 mb-1">Everything in Report, Plus More</p>
                      <p className="text-sm text-purple-700">All Report features + real-time speed + system integrations.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Detailed Side-by-Side Comparison */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">
              Side-by-Side Comparison
            </h2>
            <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">
              Key differences that matter for your decision
            </p>
          </div>

          <div className="space-y-6">
            {comparisonData.map((item, index) => (
              <motion.div
                key={item.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <Card variant="elevated" className="overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200">
                    {/* Category */}
                    <div className="p-6 bg-[var(--surface-faint)] flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <SundaeIcon name={item.icon} size="lg" className="text-[var(--text-primary)]" />
                      </div>
                      <div>
                        <h3 className="font-bold text-[var(--text-primary)] text-lg">{item.category}</h3>
                      </div>
                    </div>

                    {/* Report */}
                    <div className="p-6">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-3 h-3 bg-[rgba(28,71,255,0.1)]0 rounded-full"></div>
                        <p className="font-bold text-[var(--text-primary)]">Report</p>
                      </div>
                      <p className="text-lg font-semibold text-[#60A5FA] mb-2">{item.report}</p>
                      <p className="text-sm text-[var(--text-supporting)]">{item.reportDetail}</p>
                    </div>

                    {/* Core */}
                    <div className="p-6 bg-purple-50/50">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <p className="font-bold text-[var(--text-primary)]">Core</p>
                      </div>
                      <p className="text-lg font-semibold text-purple-600 mb-2">{item.core}</p>
                      <p className="text-sm text-[var(--text-supporting)]">{item.coreDetail}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pulse Features by Tier */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">
              Pulse Features by Tier
            </h2>
            <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">
              Pulse is the intraday operations monitor — available on Core tiers
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-[var(--border-default)]">
                  <th className="py-3 pr-4 text-sm font-semibold text-[var(--text-primary)]">Feature</th>
                  <th className="py-3 px-4 text-sm font-semibold text-[#60A5FA] text-center">Report (Free)</th>
                  <th className="py-3 pl-4 text-sm font-semibold text-purple-600 text-center">Core</th>
                </tr>
              </thead>
              <tbody className="text-sm text-[var(--text-secondary)]">
                {[
                  ["Historical sales reporting", "✓", "✓"],
                  ["Real-time sales pacing", "—", "✓"],
                  ["Basic targets (Manual, Auto)", "—", "✓"],
                  ["Adaptive Intelligence Targets", "—", "✓"],
                  ["Labor headcount tracking", "—", "✓"],
                  ["Labor Productivity Intelligence (SPLH, CPLH)", "—", "✓"],
                  ["Shift cost breakdown", "—", "✓"],
                  ["Server leaderboard (daily)", "—", "✓"],
                  ["Server leaderboard (hourly, by phase, with compare)", "—", "✓"],
                  ["Leakage monitoring", "—", "✓"],
                  ["AI Shift Coach", "—", "✓"],
                  ["Alerts & Playbooks", "—", "✓"],
                  ["Wallboard Mode", "—", "✓"],
                ].map(([feature, report, core], idx) => (
                  <tr key={idx} className="border-b border-[var(--border-default)]">
                    <td className="py-2.5 pr-4">{feature}</td>
                    <td className={`py-2.5 px-4 text-center ${report === "✓" ? "text-green-600 font-semibold" : "text-[var(--text-muted)]"}`}>{report}</td>
                    <td className={`py-2.5 pl-4 text-center ${core === "✓" ? "text-green-600 font-semibold" : "text-[var(--text-muted)]"}`}>{core}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Watchtower Features by Tier */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">
              Watchtower Features by Tier
            </h2>
            <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">
              External intelligence — available on Core tiers
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-[var(--border-default)]">
                  <th className="py-3 pr-4 text-sm font-semibold text-[var(--text-primary)]">Feature</th>
                  <th className="py-3 px-4 text-sm font-semibold text-[#60A5FA] text-center">Report (Free)</th>
                  <th className="py-3 pl-4 text-sm font-semibold text-purple-600 text-center">Core</th>
                </tr>
              </thead>
              <tbody className="text-sm text-[var(--text-secondary)]">
                {[
                  ["Basic market context", "Limited", "✓"],
                  ["Daily AI briefing", "—", "✓"],
                  ["Competitor tracking (up to 5)", "—", "✓"],
                  ["Competitor tracking (up to 10+)", "—", "✓ (tier-dependent)"],
                  ["Review sentiment analysis", "—", "✓"],
                  ["Local event discovery", "—", "✓"],
                  ["Event impact assessments", "—", "✓"],
                  ["Religious calendar intelligence", "—", "✓"],
                  ["Market landscape tracking", "—", "✓"],
                  ["Trend & macro signals", "—", "✓"],
                ].map(([feature, report, core], idx) => (
                  <tr key={idx} className="border-b border-[var(--border-default)]">
                    <td className="py-2.5 pr-4">{feature}</td>
                    <td className={`py-2.5 px-4 text-center ${report === "✓" || report === "Limited" ? (report === "Limited" ? "text-blue-500" : "text-green-600 font-semibold") : "text-[var(--text-muted)]"}`}>{report}</td>
                    <td className={`py-2.5 pl-4 text-center ${core?.includes("✓") ? "text-green-600 font-semibold" : "text-[var(--text-muted)]"}`}>{core}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Decision Tree */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">
              Decision Tree: Which Tier?
            </h2>
            <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">
              Answer these questions to find your tier
            </p>
          </div>

          <div className="space-y-6">
            {decisionTree.map((decision, index) => (
              <motion.div
                key={decision.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <Card variant="elevated">
                  <CardHeader>
                    <CardTitle className="text-xl text-[var(--text-primary)] mb-6">{decision.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Yes Path */}
                      <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-2xl">✓</span>
                          <p className="font-bold text-green-900">YES</p>
                        </div>
                        <p className="font-bold text-lg text-[var(--text-primary)] mb-2">→ {decision.yesAnswer}</p>
                        <p className="text-sm text-[var(--text-supporting)]">{decision.yesReason}</p>
                      </div>

                      {/* No Path */}
                      <div className="p-4 bg-[rgba(28,71,255,0.1)] rounded-lg border-2 border-blue-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-2xl">→</span>
                          <p className="font-bold text-blue-900">NO</p>
                        </div>
                        <p className="font-bold text-lg text-[var(--text-primary)] mb-2">→ {decision.noAnswer}</p>
                        <p className="text-sm text-[var(--text-supporting)]">{decision.noReason}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upgrade Path */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="section-h2 text-[var(--text-primary)] mb-6">
            Not Sure? Start with Report
          </h2>
          <p className="body-lg text-[var(--text-supporting)] mb-8 max-w-3xl mx-auto">
            Many operators start with Report (free forever with Report Lite) to prove the value, then upgrade to Core when they need operational speed. All historical data is preserved when you upgrade — seamless transition, zero data loss.
          </p>
          <div className="bg-[var(--navy-deep)] rounded-xl p-8 shadow-lg max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-[rgba(28,71,255,0.1)]0 rounded-full flex items-center justify-center mx-auto mb-2">
                  <SundaeIcon name="report" size="xl" className="text-[var(--text-primary)]" />
                </div>
                <p className="font-semibold text-[var(--text-primary)]">Report Lite</p>
                <p className="text-sm text-[var(--text-muted)]">Free Forever</p>
              </div>
              <div className="text-3xl text-[var(--text-muted)]">→</div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <SundaeIcon name="report" size="xl" className="text-[var(--text-primary)]" />
                </div>
                <p className="font-semibold text-[var(--text-primary)]">Report Plus/Pro</p>
                <p className="text-sm text-[var(--text-muted)]">Automated Analysis</p>
              </div>
              <div className="text-3xl text-[var(--text-muted)]">→</div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <SundaeIcon name="speed" size="xl" className="text-[var(--text-primary)]" />
                </div>
                <p className="font-semibold text-[var(--text-primary)]">Core</p>
                <p className="text-sm text-[var(--text-muted)]">Real-Time Intelligence</p>
              </div>
            </div>
            <p className="text-sm text-[var(--text-supporting)]">
              <strong>Seamless upgrades.</strong> Start free, upgrade when it makes sense, scale as you grow.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)] text-[var(--text-primary)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-h2 mb-6">
            See Pricing for Your Operation
          </h2>
          <p className="body-lg text-[var(--text-muted)] mb-10 max-w-3xl mx-auto">
            Interactive calculator shows costs for both tiers based on your location count.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 bg-[var(--navy-deep)]/5 rounded-xl border border-[var(--border-default)]">
              <h3 className="font-semibold text-[var(--text-primary)] mb-2">Calculate Pricing</h3>
              <p className="text-sm text-[var(--text-muted)] mb-4">Compare Report & Core costs</p>
              <a href={PRICING_URL} target="_blank" rel="noopener noreferrer" className="block">
                <Button variant="primary" size="md" className="w-full bg-[var(--navy-deep)] text-[var(--text-primary)] hover:bg-[var(--surface-subtle)]">
                  See Pricing &rarr;
                </Button>
              </a>
            </div>
            <div className="p-6 bg-[var(--navy-deep)]/5 rounded-xl border border-[var(--border-default)]">
              <h3 className="font-semibold text-[var(--text-primary)] mb-2">Start Free</h3>
              <p className="text-sm text-[var(--text-muted)] mb-4">Report Lite, no credit card</p>
              <Button
                variant="outline-light"
                size="md"
                className="w-full"
                onClick={() => cta(REPORT_APP_URL, "start_free_from_comparison_bottom", { page: "/report-vs-core" })}
              >
                Start Free &rarr;
              </Button>
            </div>
            <div className="p-6 bg-[var(--navy-deep)]/5 rounded-xl border border-[var(--border-default)]">
              <h3 className="font-semibold text-[var(--text-primary)] mb-2">Book a Demo</h3>
              <p className="text-sm text-[var(--text-muted)] mb-4">See both tiers live</p>
              <Button
                variant="outline-light"
                size="md"
                className="w-full"
                onClick={() => cta("/demo", "book_demo_from_comparison", { page: "/report-vs-core" })}
              >
                Book Demo &rarr;
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
