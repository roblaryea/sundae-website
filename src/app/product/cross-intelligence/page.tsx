'use client';

import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { MockupFrame, MockupKPI, MockupBarChart, MockupTable, MockupAlert } from "@/components/ui/MockupFrame";
import { PageHero, PageCTA, FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/PageAnimations";
import { useCta } from "@/lib/cta";
import { PRICING_URL } from "@/lib/urls";

// ─── Inline Mockups ─────────────────────────────────────────────────────────

function MarketingTimelineMockup() {
  return (
    <MockupFrame label="Marketing Impact Timeline">
      <div className="space-y-3">
        <MockupKPI label="Campaign Spend" value="$12,400" trend="+18%" trendUp />
        <div className="h-20 flex items-end gap-1">
          {[35, 38, 42, 40, 55, 62, 68, 72, 65, 70, 78, 82].map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
              <div className="w-full rounded-sm bg-purple-500/60" style={{ height: `${h}%` }} />
              {i === 4 && <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 text-[10px] text-[var(--text-muted)]">
          <span className="w-2 h-2 rounded-full bg-purple-500/60" /> Revenue
          <span className="w-2 h-2 rounded-full bg-orange-400" /> Campaign Launch
        </div>
        <MockupAlert type="info">Revenue uplift detected 5 days post-campaign (+14%)</MockupAlert>
      </div>
    </MockupFrame>
  );
}

function CauseEffectMockup() {
  return (
    <MockupFrame label="Cause & Effect Analysis">
      <div className="space-y-3">
        <MockupAlert type="warning">Revenue dropped 8.2% vs. prior week</MockupAlert>
        <div className="space-y-2">
          {[
            { cause: "Server staffing reduced 15%", confidence: 87, impact: "-$3,200" },
            { cause: "Menu item #4 86'd at 7pm", confidence: 72, impact: "-$1,800" },
            { cause: "Weather: rain Fri-Sat", confidence: 64, impact: "-$1,100" },
          ].map((item) => (
            <div key={item.cause} className="p-2 bg-[var(--surface-faint)] rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-medium text-[var(--text-secondary)]">{item.cause}</span>
                <span className="text-[10px] text-red-400">{item.impact}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1 bg-[var(--surface-subtle)] rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: `${item.confidence}%` }} />
                </div>
                <span className="text-[9px] text-[var(--text-muted)]">{item.confidence}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MockupFrame>
  );
}

function CorrelationMatrixMockup() {
  const modules = ["Rev", "Labor", "Inv", "Mktg", "Wx"];
  const colors = [
    ["bg-purple-500", "bg-red-400", "bg-green-400", "bg-purple-400", "bg-yellow-400"],
    ["bg-red-400", "bg-purple-500", "bg-orange-400", "bg-blue-300", "bg-slate-400"],
    ["bg-green-400", "bg-orange-400", "bg-purple-500", "bg-slate-400", "bg-green-300"],
    ["bg-purple-400", "bg-blue-300", "bg-slate-400", "bg-purple-500", "bg-orange-300"],
    ["bg-yellow-400", "bg-slate-400", "bg-green-300", "bg-orange-300", "bg-purple-500"],
  ];
  return (
    <MockupFrame label="Correlation Matrix">
      <div className="space-y-2">
        <div className="grid gap-1" style={{ gridTemplateColumns: `40px repeat(${modules.length}, 1fr)` }}>
          <div />
          {modules.map((m) => (
            <div key={m} className="text-[8px] text-center text-[var(--text-muted)] font-medium">{m}</div>
          ))}
          {modules.map((row, ri) => (
            <>
              <div key={`label-${row}`} className="text-[8px] text-[var(--text-muted)] font-medium flex items-center">{row}</div>
              {colors[ri].map((color, ci) => (
                <div key={`${ri}-${ci}`} className={`h-6 rounded-sm ${color} ${ri === ci ? 'opacity-100' : 'opacity-50'}`} />
              ))}
            </>
          ))}
        </div>
        <div className="flex justify-between text-[9px] text-[var(--text-muted)]">
          <span>Strong negative</span>
          <span>Strong positive</span>
        </div>
      </div>
    </MockupFrame>
  );
}

function RevenueWaterfallMockup() {
  return (
    <MockupFrame label="Revenue Attribution Waterfall">
      <div className="space-y-2">
        <MockupKPI label="Net Revenue Change" value="+$18,400" trend="+7.2%" trendUp />
        <div className="flex items-end gap-2 h-24">
          {[
            { label: "Base", h: 60, color: "bg-slate-500" },
            { label: "Promo", h: 25, color: "bg-green-500" },
            { label: "Menu", h: 15, color: "bg-green-400" },
            { label: "Labor", h: -10, color: "bg-red-400" },
            { label: "Wx", h: -8, color: "bg-red-300" },
            { label: "Total", h: 72, color: "bg-purple-500" },
          ].map((bar) => (
            <div key={bar.label} className="flex-1 flex flex-col items-center gap-0.5">
              <div
                className={`w-full rounded-sm ${bar.color}`}
                style={{ height: `${Math.abs(bar.h)}%`, marginTop: bar.h < 0 ? 'auto' : undefined }}
              />
              <span className="text-[8px] text-[var(--text-muted)]">{bar.label}</span>
            </div>
          ))}
        </div>
      </div>
    </MockupFrame>
  );
}

function SpendRadarMockup() {
  return (
    <MockupFrame label="Spend Efficiency Radar">
      <div className="space-y-3">
        <div className="relative w-full aspect-square max-w-[160px] mx-auto">
          <div className="absolute inset-0 rounded-full border border-[var(--border-default)] opacity-30" />
          <div className="absolute inset-[15%] rounded-full border border-[var(--border-default)] opacity-30" />
          <div className="absolute inset-[30%] rounded-full border border-[var(--border-default)] opacity-30" />
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
            <polygon points="50,15 82,35 75,72 25,72 18,35" fill="rgba(168,85,247,0.2)" stroke="rgb(168,85,247)" strokeWidth="1" />
          </svg>
          {[
            { label: "Mktg", x: "50%", y: "5%" },
            { label: "Labor", x: "90%", y: "30%" },
            { label: "Inv", x: "80%", y: "75%" },
            { label: "Rent", x: "20%", y: "75%" },
            { label: "Tech", x: "5%", y: "30%" },
          ].map((axis) => (
            <span key={axis.label} className="absolute text-[8px] text-[var(--text-muted)] font-medium" style={{ left: axis.x, top: axis.y, transform: 'translate(-50%, -50%)' }}>
              {axis.label}
            </span>
          ))}
        </div>
        <MockupAlert type="info">Marketing ROI 2.3x above benchmark. Labor underperforming.</MockupAlert>
      </div>
    </MockupFrame>
  );
}

function CampaignPulseMockup() {
  return (
    <MockupFrame label="Campaign Pulse Monitor">
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <MockupKPI label="Campaign ROI" value="3.2x" trend="+12%" trendUp />
          <MockupKPI label="Rev Impact" value="+$8,600" trend="+9%" trendUp />
        </div>
        <MockupTable
          headers={["Campaign", "Spend", "Rev", "ROI"]}
          rows={[
            ["Weekend Brunch", "$1,200", "$4,800", "4.0x"],
            ["Happy Hour Push", "$800", "$2,100", "2.6x"],
            ["Loyalty Blast", "$600", "$1,700", "2.8x"],
          ]}
        />
        <MockupAlert type="warning">Happy Hour: labor cost spike detected (+22%)</MockupAlert>
      </div>
    </MockupFrame>
  );
}

function CannibalizationMockup() {
  return (
    <MockupFrame label="Cannibalization Detector">
      <div className="space-y-3">
        <MockupAlert type="critical">New item &apos;Truffle Burger&apos; cannibalizing &apos;Classic Burger&apos; (-34%)</MockupAlert>
        <div className="space-y-2">
          {[
            { item: "Classic Burger", before: 85, after: 56, change: -34 },
            { item: "Wagyu Slider", before: 42, after: 38, change: -10 },
            { item: "Chicken Sandwich", before: 64, after: 61, change: -5 },
          ].map((row) => (
            <div key={row.item} className="p-2 bg-[var(--surface-faint)] rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-medium text-[var(--text-secondary)]">{row.item}</span>
                <span className={`text-[10px] font-semibold ${row.change < -20 ? 'text-red-400' : 'text-orange-400'}`}>{row.change}%</span>
              </div>
              <div className="flex gap-1 h-2">
                <div className="bg-[var(--text-muted)] rounded-full opacity-30" style={{ width: `${row.before}%` }} />
                <div className="bg-purple-500 rounded-full" style={{ width: `${row.after}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 text-[9px] text-[var(--text-muted)]">
          <span className="w-2 h-0.5 rounded-full bg-[var(--text-muted)] opacity-30" /> Before
          <span className="w-2 h-0.5 rounded-full bg-purple-500" /> After
        </div>
      </div>
    </MockupFrame>
  );
}

function WhatChangedMockup() {
  return (
    <MockupFrame label="What Changed Engine">
      <div className="space-y-2">
        {[
          { metric: "Lunch Revenue", change: "+12%", cause: "New menu items + weather improvement", severity: "positive" as const },
          { metric: "Labor Cost %", change: "+3.1pp", cause: "Overtime: 2 staff no-shows Thursday", severity: "negative" as const },
          { metric: "Food Waste", change: "-18%", cause: "Par level adjustment took effect", severity: "positive" as const },
          { metric: "Avg Ticket", change: "-$2.40", cause: "Promo discount applied without cap", severity: "negative" as const },
        ].map((item) => (
          <div key={item.metric} className="flex items-start gap-2 p-2 bg-[var(--surface-faint)] rounded-lg">
            <div className={`w-1.5 h-1.5 mt-1.5 rounded-full flex-shrink-0 ${item.severity === 'positive' ? 'bg-green-400' : 'bg-red-400'}`} />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-semibold text-[var(--text-secondary)]">{item.metric}</span>
                <span className={`text-[10px] font-bold ${item.severity === 'positive' ? 'text-green-400' : 'text-red-400'}`}>{item.change}</span>
              </div>
              <span className="text-[9px] text-[var(--text-muted)]">{item.cause}</span>
            </div>
          </div>
        ))}
      </div>
    </MockupFrame>
  );
}

// ─── Component Mockup Map ───────────────────────────────────────────────────
const mockupMap: Record<string, () => React.JSX.Element> = {
  "Marketing Impact Timeline": MarketingTimelineMockup,
  "Cause & Effect Cards": CauseEffectMockup,
  "Correlation Matrix": CorrelationMatrixMockup,
  "Revenue Attribution Waterfall": RevenueWaterfallMockup,
  "Spend Efficiency Radar": SpendRadarMockup,
  "Campaign Pulse Monitor": CampaignPulseMockup,
  "Cannibalization Detector": CannibalizationMockup,
  "What Changed Engine": WhatChangedMockup,
};

// ─── Data ───────────────────────────────────────────────────────────────────

const components: {
  title: string;
  headline: string;
  description: string;
  capabilities: string[];
  icon: SundaeIconName;
  color: string;
  tier: 'base' | 'pro';
}[] = [
  {
    title: "Marketing Impact Timeline",
    headline: "See the Delayed Effects of Every Marketing Dollar",
    description: "Overlay marketing spend, campaigns, and promotions on your revenue timeline. Cross-Intelligence surfaces the 3–7 day lag between marketing actions and revenue impact that traditional dashboards miss entirely.",
    capabilities: [
      "Revenue + marketing spend overlay with adjustable lag windows",
      "Campaign ROI attribution with statistical confidence scores",
      "Promotion impact visualization across all locations",
      "Automated detection of delayed revenue responses",
    ],
    icon: "chart",
    color: "from-purple-500 to-purple-600",
    tier: 'base',
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
  },
  {
    title: "Revenue Attribution Waterfall",
    headline: "Attribute Revenue Changes to Specific Actions",
    description: "Stop guessing why revenue changed. The waterfall chart decomposes revenue movements into specific operational and marketing actions — showing exactly how much each factor contributed.",
    capabilities: [
      "Waterfall decomposition of revenue changes",
      "Attribution to marketing campaigns, menu changes, staffing shifts",
      "Location-by-location attribution comparison",
      "Period-over-period attribution trends",
    ],
    icon: "performance",
    color: "from-blue-500 to-indigo-600",
    tier: 'pro',
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
  },
  {
    title: "Cannibalization Detector",
    headline: "Detect When Promotions Steal From Your Own Sales",
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
  },
  {
    title: "What Changed Engine",
    headline: "Automatic Root Cause Analysis for Every Metric Movement",
    description: "When any metric moves significantly — up or down — the What Changed Engine identifies the most likely causes by analyzing changes across all connected data sources. No manual investigation required.",
    capabilities: [
      "Automated anomaly detection across all metrics",
      "Multi-factor root cause analysis",
      "Weekly digest of significant changes and their causes",
      "Custom alert rules for specific metric movements",
    ],
    icon: "search",
    color: "from-slate-500 to-slate-700",
    tier: 'base',
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
    <div className="min-h-screen bg-[var(--navy-deep)]">
      {/* Hero */}
      <PageHero
        badge="Auto-enabled with 3+ modules"
        title={<>Cross-Intelligence<br />Correlation Engine</>}
        description="The intelligence layer that connects everything. Surfaces hidden correlations between your data sources — marketing to revenue, labor to sales, inventory to waste — automatically."
      >
        <p className="text-sm text-[var(--text-muted)] mb-8 max-w-2xl mx-auto">
          Base features unlock free when you activate 3 or more intelligence modules. Upgrade to Pro for the full correlation engine with attribution, cannibalization detection, and API access.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="cta"
            size="lg"
            onClick={() => cta("/demo", "book_demo_cross_intel_hero", { page: "/product/cross-intelligence" })}
          >
            Book a Demo
          </Button>
          <Button variant="outline-light" size="lg" href={PRICING_URL}>
            See Pricing Calculator
          </Button>
        </div>
      </PageHero>

      {/* The Problem */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-4xl mx-auto text-center">
          <FadeUp>
            <h2 className="section-h2 text-[var(--text-primary)] mb-6">
              Your Modules Are Smart. Together, They&apos;re Brilliant.
            </h2>
            <p className="body-lg text-[var(--text-supporting)] mb-8">
              Every intelligence module gives you deep insight into one domain — labor, inventory, marketing, revenue. But the most valuable insights live in the <strong>connections between them</strong>. A marketing campaign that increased revenue but crushed labor efficiency. An inventory change that boosted margins but tanked guest satisfaction. Cross-Intelligence finds these connections automatically.
            </p>
          </FadeUp>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { stat: "3–7 days", label: "Average delay between marketing spend and revenue impact", icon: "time" as SundaeIconName },
              { stat: "23%", label: "Of promotions show measurable cannibalization of existing items", icon: "warning" as SundaeIconName },
              { stat: "5x", label: "More causal factors identified vs single-module analysis", icon: "increase" as SundaeIconName },
            ].map((item) => (
              <StaggerItem key={item.label}>
                <Card variant="elevated" className="text-center p-6">
                  <CardContent>
                    <SundaeIcon name={item.icon} size="lg" className="text-purple-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-[var(--text-primary)] mb-2">{item.stat}</div>
                    <p className="text-sm text-[var(--text-supporting)]">{item.label}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Components */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[var(--text-muted)] mb-4">
              8 COMPONENTS
            </p>
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">
              Every Connection, Surfaced
            </h2>
            <p className="body-lg text-[var(--text-supporting)] max-w-3xl mx-auto">
              From basic correlation alerts to full revenue attribution and cannibalization detection.
            </p>
          </FadeUp>

          <div className="space-y-16">
            {components.map((component, index) => {
              const MockupComponent = mockupMap[component.title];
              return (
                <FadeUp key={component.title} delay={index * 0.05}>
                  <div className={`grid md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'md:grid-flow-dense' : ''}`}>
                    {/* Mockup */}
                    <div className={index % 2 === 1 ? 'md:col-start-2' : ''}>
                      {MockupComponent && <MockupComponent />}
                    </div>

                    {/* Content */}
                    <div className={index % 2 === 1 ? 'md:col-start-1 md:row-start-1' : ''}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${component.color} rounded-xl flex items-center justify-center`}>
                          <SundaeIcon name={component.icon} size="lg" className="text-white" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-2xl font-bold text-[var(--text-primary)]">{component.title}</h3>
                            <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${component.tier === 'pro' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-purple-500/20 text-purple-400'}`}>
                              {component.tier === 'pro' ? 'Pro' : 'Base'}
                            </span>
                          </div>
                          <p className="text-sm text-[var(--text-muted)] font-medium">{component.headline}</p>
                        </div>
                      </div>
                      <p className="text-[var(--text-supporting)] leading-relaxed mb-6">
                        {component.description}
                      </p>
                      <div className="space-y-2 mb-4">
                        {component.capabilities.map((cap) => (
                          <div key={cap} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                            <span className="text-purple-400 flex-shrink-0 mt-0.5">✓</span>
                            <span>{cap}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* Base vs Pro */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-4xl mx-auto">
          <FadeUp className="text-center mb-12">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">Base vs Pro</h2>
            <p className="body-lg text-[var(--text-supporting)]">
              Base unlocks automatically. Pro unlocks the full engine.
            </p>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Base */}
            <StaggerItem>
              <Card variant="elevated" className="border border-purple-500/30">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <SundaeIcon name="insights" size="lg" className="text-purple-400" />
                    <div>
                      <CardTitle className="text-xl text-[var(--text-primary)]">Cross-Intelligence</CardTitle>
                      <p className="text-sm text-green-400 font-semibold">Free with 3+ modules</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {tierComparison.filter(f => f.base).map(f => (
                      <li key={f.feature} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                        <span className="text-purple-400">✓</span> {f.feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </StaggerItem>

            {/* Pro */}
            <StaggerItem>
              <Card variant="elevated" className="border border-cyan-500/30 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-cyan-500" />
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <SundaeIcon name="core" size="lg" className="text-cyan-400" />
                    <div>
                      <CardTitle className="text-xl text-[var(--text-primary)]">Cross-Intelligence Pro</CardTitle>
                      <p className="text-sm text-cyan-400 font-semibold">$199/mo + $19/location</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {tierComparison.map(f => (
                      <li key={f.feature} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                        <span className={f.pro ? "text-cyan-400" : "text-[var(--text-muted)]"}>
                          {f.pro ? "✓" : "—"}
                        </span>
                        {f.feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <PageCTA
        title="See Cross-Intelligence in Action"
        description="A 15-minute walkthrough of the Correlation Matrix, Cannibalization Detector, and Revenue Attribution Waterfall."
      >
        <Button
          variant="cta"
          size="lg"
          onClick={() => cta("/demo", "book_demo_cross_intel_cta", { page: "/product/cross-intelligence" })}
        >
          Book a Demo
        </Button>
        <Button variant="outline-light" size="lg" href={PRICING_URL}>
          See Pricing Calculator
        </Button>
      </PageCTA>
    </div>
  );
}
