'use client';

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { useCta } from "@/lib/cta";
import { PRICING_URL } from "@/lib/urls";

const components: {
  title: string;
  headline: string;
  description: string;
  capabilities: string[];
  icon: SundaeIconName;
  color: string;
  tier: 'base' | 'pro';
  image: string;
}[] = [
  {
    title: "Marketing Impact Timeline",
    headline: "See the Delayed Effects of Every Marketing Dollar",
    description: "Overlay marketing spend, campaigns, and promotions on your revenue timeline. Cross-Intelligence surfaces the 3-7 day lag between marketing actions and revenue impact that traditional dashboards miss entirely.",
    capabilities: [
      "Revenue + marketing spend overlay with adjustable lag windows",
      "Campaign ROI attribution with statistical confidence scores",
      "Promotion impact visualization across all locations",
      "Automated detection of delayed revenue responses",
    ],
    icon: "chart",
    color: "from-purple-500 to-purple-600",
    tier: 'base',
    image: "/images/product/marketing_Impact.png",
  },
  {
    title: "Cause & Effect Cards",
    headline: "Auto-Generated Explanations for Every Metric Change",
    description: "When revenue drops or labor costs spike, Cross-Intelligence automatically generates cards explaining why — connecting changes across modules to surface the real root cause, not just the symptom.",
    capabilities: [
      "Automatic root cause identification across data sources",
      "Confidence scoring for each causal hypothesis",
      "Actionable recommendations with estimated impact",
      "Historical pattern matching for recurring causes",
    ],
    icon: "idea",
    color: "from-cyan-500 to-blue-600",
    tier: 'base',
    image: "/images/product/cause_effect.png",
  },
  {
    title: "Correlation Matrix",
    headline: "Full NxN View of How Everything Connects",
    description: "See the strength and direction of connections between every data source — revenue, labor, inventory, marketing, weather, events. Discover relationships you never knew existed and quantify the ones you suspected.",
    capabilities: [
      "Interactive NxN correlation heatmap across all modules",
      "Real-time correlation strength with statistical significance",
      "Drill-down from any cell to underlying data",
      "Time-lagged correlation analysis (find delayed effects)",
      "Custom correlation rules and thresholds",
    ],
    icon: "data",
    color: "from-violet-500 to-purple-600",
    tier: 'pro',
    image: "/images/product/correlation_matrix.png",
  },
  {
    title: "Revenue Attribution Waterfall",
    headline: "Attribute Revenue Changes to Specific Actions",
    description: "Stop guessing why revenue changed. The waterfall chart decomposes revenue movements into specific operational and marketing actions — showing exactly how much each factor contributed to the change.",
    capabilities: [
      "Waterfall decomposition of revenue changes",
      "Attribution to marketing campaigns, menu changes, staffing shifts",
      "Location-by-location attribution comparison",
      "Period-over-period attribution trends",
    ],
    icon: "performance",
    color: "from-blue-500 to-indigo-600",
    tier: 'pro',
    image: "/images/product/revenue_attribution.png",
  },
  {
    title: "Spend Efficiency Radar",
    headline: "Compare ROI Across Every Spending Category",
    description: "A multi-axis radar comparing the return on every dollar — marketing, labor, inventory, rent. See which spend categories are overweight or underweight relative to their revenue contribution.",
    capabilities: [
      "Multi-axis ROI radar across marketing, labor, inventory spend",
      "Benchmark efficiency against your own historical performance",
      "Location-level spend efficiency comparison",
      "Optimization suggestions based on efficiency gaps",
    ],
    icon: "balance",
    color: "from-emerald-500 to-teal-600",
    tier: 'pro',
    image: "/images/product/efficiency_radar.png",
  },
  {
    title: "Campaign Pulse Monitor",
    headline: "Real-Time Campaign Performance with Operational Context",
    description: "Go beyond marketing metrics. Campaign Pulse Monitor correlates campaign performance with operational reality — showing how campaigns affect not just revenue, but labor utilization, inventory turnover, and guest satisfaction.",
    capabilities: [
      "Real-time campaign performance dashboard",
      "Cross-module impact tracking (revenue + labor + inventory)",
      "A/B campaign comparison with statistical significance",
      "Automated campaign pause recommendations when ROI drops",
    ],
    icon: "pulse",
    color: "from-rose-500 to-pink-600",
    tier: 'pro',
    image: "/images/product/campaign_pulse.png",
  },
  {
    title: "Cannibalization Detector",
    headline: "Detect When Your Promotions Steal From Your Own Sales",
    description: "The most requested Cross-Intelligence feature. Automatically detects when a new menu item, promotion, or campaign is cannibalizing existing products — before it quietly erodes your margins.",
    capabilities: [
      "Automatic cannibalization detection for new items and promotions",
      "Menu item substitution pattern analysis",
      "Revenue displacement quantification with margin impact",
      "Alert when cannibalization exceeds configurable threshold",
      "Historical cannibalization patterns for seasonal items",
    ],
    icon: "warning",
    color: "from-amber-500 to-orange-600",
    tier: 'pro',
    image: "/images/product/cannibalization_detector.png",
  },
  {
    title: "What Changed Engine",
    headline: "Automatic Root Cause Analysis for Every Metric Movement",
    description: "No more manual investigation. When any metric moves significantly — up or down — the What Changed Engine automatically identifies the most likely causes by analyzing changes across all connected data sources.",
    capabilities: [
      "Automated anomaly detection across all metrics",
      "Multi-factor root cause analysis",
      "Weekly digest of significant changes and their causes",
      "Custom alert rules for specific metric movements",
    ],
    icon: "search",
    color: "from-slate-500 to-slate-700",
    tier: 'base',
    image: "/images/product/what_changed.png",
  },
];

const tierComparison = [
  { feature: "Marketing Impact Timeline (30-day)", base: true, pro: true },
  { feature: "Cause & Effect Cards", base: true, pro: true },
  { feature: "What Changed weekly digest", base: true, pro: true },
  { feature: "Basic correlation alerts", base: true, pro: true },
  { feature: "Full Correlation Matrix", base: false, pro: true },
  { feature: "Revenue Attribution Waterfall", base: false, pro: true },
  { feature: "Spend Efficiency Radar", base: false, pro: true },
  { feature: "Campaign Pulse Monitor", base: false, pro: true },
  { feature: "Cannibalization Detector", base: false, pro: true },
  { feature: "Unlimited timeline lookback", base: false, pro: true },
  { feature: "Custom alert rules & thresholds", base: false, pro: true },
  { feature: "API access for correlation data", base: false, pro: true },
  { feature: "Priority processing", base: false, pro: true },
];

export default function CrossIntelligencePage() {
  const cta = useCta();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/80 via-white to-cyan-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-6">
              <SundaeIcon name="crossIntelligence" size="sm" className="text-purple-600 dark:text-purple-400" />
              <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">Auto-enabled with 3+ modules</span>
            </div>
            <h1 className="hero-h1 text-gray-900 dark:text-white mb-6">
              Cross-Intelligence<br />Correlation Engine
            </h1>
            <p className="body-xl text-gray-600 dark:text-slate-300 mb-4 max-w-3xl mx-auto">
              The intelligence layer that connects everything. Surfaces hidden correlations between your data sources — marketing to revenue, labor to sales, inventory to waste — automatically.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Base features unlock free when you activate 3 or more intelligence modules. Upgrade to Pro for the full correlation engine with attribution, cannibalization detection, and API access.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="primary"
                size="lg"
                onClick={() => cta("/demo", "book_demo_cross_intel_hero", { page: "/product/cross-intelligence" })}
              >
                Book a Demo
              </Button>
              <a href={PRICING_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" size="lg">
                  See Pricing Calculator
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-h2 text-gray-900 dark:text-white mb-6">
            Your Modules Are Smart. Together, They're Brilliant.
          </h2>
          <p className="body-lg text-gray-600 dark:text-gray-300 mb-8">
            Every intelligence module gives you deep insight into one domain — labor, inventory, marketing, revenue. But the most valuable insights live in the <strong>connections between them</strong>. A marketing campaign that increased revenue but crushed labor efficiency. An inventory change that boosted margins but tanked guest satisfaction. Cross-Intelligence finds these connections automatically.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { stat: "3-7 days", label: "Average delay between marketing spend and revenue impact", icon: "time" as SundaeIconName },
              { stat: "23%", label: "Of promotions show measurable cannibalization of existing items", icon: "warning" as SundaeIconName },
              { stat: "5x", label: "More causal factors identified vs single-module analysis", icon: "increase" as SundaeIconName },
            ].map((item) => (
              <Card key={item.label} variant="elevated" className="text-center p-6">
                <CardContent>
                  <SundaeIcon name={item.icon} size="lg" className="text-purple-500 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{item.stat}</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Components */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-purple-50/30 dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-500 mb-4">
              8 COMPONENTS
            </p>
            <h2 className="section-h2 text-gray-900 dark:text-white mb-4">
              Every Connection, Surfaced
            </h2>
            <p className="body-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              From basic correlation alerts to full revenue attribution and cannibalization detection.
            </p>
          </div>

          <div className="space-y-16">
            {components.map((component, index) => (
              <motion.div
                key={component.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
              >
                <div className={`grid md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'md:grid-flow-dense' : ''}`}>
                  {/* Screenshot */}
                  <div className={index % 2 === 1 ? 'md:col-start-2' : ''}>
                    <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200/60 dark:border-slate-700">
                      <Image
                        src={component.image}
                        alt={`${component.title} screenshot`}
                        width={720}
                        height={450}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={index % 2 === 1 ? 'md:col-start-1 md:row-start-1' : ''}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${component.color} rounded-xl flex items-center justify-center`}>
                        <SundaeIcon name={component.icon} size="lg" className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{component.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{component.headline}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                      {component.description}
                    </p>
                    <div className="space-y-2 mb-4">
                      {component.capabilities.map((cap) => (
                        <div key={cap} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                          <span className="text-purple-500 flex-shrink-0 mt-0.5">&#10003;</span>
                          <span>{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Base vs Pro Comparison */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-h2 text-gray-900 dark:text-white mb-4">Base vs Pro</h2>
            <p className="body-lg text-gray-600 dark:text-gray-300">
              Base unlocks automatically. Pro unlocks the full engine.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Base */}
            <Card variant="elevated" className="border-2 border-purple-200 dark:border-purple-800">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <SundaeIcon name="crossIntelligence" size="lg" className="text-purple-500" />
                  <div>
                    <CardTitle className="text-xl text-gray-900 dark:text-white">Cross-Intelligence</CardTitle>
                    <p className="text-sm text-green-600 dark:text-green-400 font-semibold">Free with 3+ modules</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {tierComparison.filter(f => f.base).map(f => (
                    <li key={f.feature} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <span className="text-purple-500">&#10003;</span> {f.feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Pro */}
            <Card variant="elevated" className="border-2 border-cyan-200 dark:border-cyan-800 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-cyan-500" />
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <SundaeIcon name="core" size="lg" className="text-cyan-500" />
                  <div>
                    <CardTitle className="text-xl text-gray-900 dark:text-white">Cross-Intelligence Pro</CardTitle>
                    <p className="text-sm text-cyan-600 dark:text-cyan-400 font-semibold">$199/mo + $19/location</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {tierComparison.map(f => (
                    <li key={f.feature} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <span className={f.pro ? "text-cyan-500" : "text-gray-300"}>
                        {f.pro ? "✓" : "—"}
                      </span>
                      {f.feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-cyan-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-h2 mb-6">
            See Cross-Intelligence in Action
          </h2>
          <p className="body-lg mb-8 opacity-90">
            A 15-minute walkthrough of the Correlation Matrix, Cannibalization Detector, and Revenue Attribution Waterfall.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100"
              onClick={() => cta("/demo", "book_demo_cross_intel_cta", { page: "/product/cross-intelligence" })}
            >
              Book a Demo
            </Button>
            <a href={PRICING_URL} target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline-light"
                size="lg"
              >
                See Pricing Calculator
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
