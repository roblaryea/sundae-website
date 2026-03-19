'use client';

import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { MockupFrame, MockupKPI, MockupTable, MockupAlert } from "@/components/ui/MockupFrame";
import { PageHero, PageCTA, FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/PageAnimations";
import { useCta } from "@/lib/cta";
import { PRICING_URL } from "@/lib/urls";

// ─── Inline Mockups ─────────────────────────────────────────────────────────

function ForecastTimelineMockup() {
  return (
    <MockupFrame label="Unified Forecast Timeline — 30 Day">
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-2">
          <MockupKPI label="Forecast Rev" value="$248K" trend="+6.2%" trendUp />
          <MockupKPI label="Confidence" value="91%" color="#22C55E" />
          <MockupKPI label="Accuracy" value="96.2%" trend="MAPE 3.8%" trendUp color="#22C55E" />
        </div>
        <div className="relative h-24 bg-[var(--surface-faint)] rounded-lg overflow-hidden">
          <svg viewBox="0 0 200 70" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0,45 L15,42 L30,38 L45,35 L60,33 L75,30 L90,28 L105,25 L120,22 L135,20 L150,25 L165,28 L180,22 L200,20 L200,55 L180,48 L165,52 L150,50 L135,42 L120,45 L105,48 L90,50 L75,53 L60,55 L45,55 L30,57 L15,57 L0,60 Z" fill="rgba(28,71,255,0.1)" />
            <path d="M0,52 L15,50 L30,47 L45,44 L60,43 L75,41 L90,38" fill="none" stroke="#22C55E" strokeWidth="1.5" />
            <path d="M90,38 L105,36 L120,33 L135,30 L150,37 L165,40 L180,35 L200,30" fill="none" stroke="#1C47FF" strokeWidth="1.5" />
            <line x1="90" y1="0" x2="90" y2="70" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" strokeDasharray="2,2" />
            <text x="90" y="8" fill="rgba(255,255,255,0.35)" fontSize="4" textAnchor="middle">Today</text>
          </svg>
        </div>
        <div className="flex items-center gap-3 text-[9px] text-[var(--text-muted)]">
          <span className="flex items-center gap-1"><span className="w-3 h-0.5 rounded-full bg-[#22C55E]" /> Actual</span>
          <span className="flex items-center gap-1"><span className="w-3 h-0.5 rounded-full bg-[#1C47FF]" /> Forecast</span>
          <span className="flex items-center gap-1"><span className="w-3 h-1.5 rounded-sm bg-[rgba(28,71,255,0.1)]" /> 90% Band</span>
        </div>
      </div>
    </MockupFrame>
  );
}

function ScenarioComparisonMockup() {
  return (
    <MockupFrame label="What-If Scenario Builder">
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <MockupKPI label="Baseline Rev" value="$248K" color="#1C47FF" />
          <MockupKPI label="Scenario Rev" value="$271K" trend="+$23K" trendUp color="#22C55E" />
        </div>
        <div className="space-y-1.5">
          <div className="text-[10px] font-medium text-[var(--text-secondary)] mb-1">Scenario: +10% Pricing + Weekend Promo</div>
          {[
            { metric: "Revenue", baseline: "$248K", scenario: "$271K", delta: "+9.3%" },
            { metric: "Covers", baseline: "5,840", scenario: "5,420", delta: "-7.2%" },
            { metric: "Avg Check", baseline: "$42.50", scenario: "$50.00", delta: "+17.6%" },
            { metric: "Labor Cost %", baseline: "28.4%", scenario: "26.1%", delta: "-2.3pp" },
          ].map((row) => (
            <div key={row.metric} className="flex items-center justify-between p-1.5 bg-[var(--surface-faint)] rounded text-[9px]">
              <span className="text-[var(--text-muted)] w-20">{row.metric}</span>
              <span className="text-[var(--text-supporting)] font-mono w-14 text-right">{row.baseline}</span>
              <span className="text-[var(--text-secondary)] font-mono w-14 text-right">{row.scenario}</span>
              <span className={`font-mono w-12 text-right font-semibold ${row.delta.startsWith('+') ? 'text-green-400' : 'text-orange-400'}`}>{row.delta}</span>
            </div>
          ))}
        </div>
        <MockupAlert type="info">Cover decline offset by 17.6% check increase. Net revenue +$23K.</MockupAlert>
      </div>
    </MockupFrame>
  );
}

function AssumptionRegistryMockup() {
  return (
    <MockupFrame label="Assumption Registry">
      <div className="space-y-3">
        <MockupTable
          headers={["Assumption", "Source", "Impact", "Status"]}
          rows={[
            ["Weekend seasonality +18%", "Auto-detected", "High", "Active"],
            ["Lunch daypart: 35% of rev", "Historic", "High", "Active"],
            ["Staff capacity: 12 FOH", "Operator", "Med", "Override"],
            ["Local event: Mar 22 concert", "External", "Med", "New"],
            ["Food cost: +2.1% trend", "Auto-detected", "Low", "Active"],
          ]}
        />
        <div className="flex items-center gap-2">
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-green-500/15 text-green-400 font-medium">4 Auto-detected</span>
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-purple-500/15 text-purple-400 font-medium">1 Operator override</span>
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/15 text-cyan-400 font-medium">1 External signal</span>
        </div>
      </div>
    </MockupFrame>
  );
}

function DependencyGraphMockup() {
  return (
    <MockupFrame label="Cross-Module Dependency Graph">
      <div className="space-y-3">
        <div className="relative h-32 bg-[var(--surface-faint)] rounded-lg overflow-hidden p-3">
          {/* Simplified dependency graph */}
          <svg viewBox="0 0 200 90" className="w-full h-full">
            {/* Nodes */}
            <rect x="5" y="30" width="35" height="18" rx="4" fill="rgba(28,71,255,0.2)" stroke="#1C47FF" strokeWidth="0.5" />
            <text x="22" y="42" fill="#60A5FA" fontSize="5" textAnchor="middle" fontWeight="600">Revenue</text>

            <rect x="55" y="10" width="30" height="18" rx="4" fill="rgba(168,85,247,0.2)" stroke="#A855F7" strokeWidth="0.5" />
            <text x="70" y="22" fill="#C084FC" fontSize="5" textAnchor="middle" fontWeight="600">Labor</text>

            <rect x="55" y="52" width="35" height="18" rx="4" fill="rgba(34,197,94,0.2)" stroke="#22C55E" strokeWidth="0.5" />
            <text x="72" y="64" fill="#4ADE80" fontSize="5" textAnchor="middle" fontWeight="600">Inventory</text>

            <rect x="110" y="30" width="40" height="18" rx="4" fill="rgba(251,191,36,0.2)" stroke="#FBBF24" strokeWidth="0.5" />
            <text x="130" y="42" fill="#FCD34D" fontSize="5" textAnchor="middle" fontWeight="600">Purchasing</text>

            <rect x="160" y="30" width="30" height="18" rx="4" fill="rgba(14,165,233,0.2)" stroke="#0EA5E9" strokeWidth="0.5" />
            <text x="175" y="42" fill="#38BDF8" fontSize="5" textAnchor="middle" fontWeight="600">Profit</text>

            {/* Edges */}
            <line x1="40" y1="39" x2="55" y2="22" stroke="rgba(168,85,247,0.4)" strokeWidth="0.7" />
            <line x1="40" y1="39" x2="55" y2="58" stroke="rgba(34,197,94,0.4)" strokeWidth="0.7" />
            <line x1="85" y1="22" x2="160" y2="36" stroke="rgba(14,165,233,0.3)" strokeWidth="0.5" />
            <line x1="90" y1="61" x2="110" y2="42" stroke="rgba(251,191,36,0.4)" strokeWidth="0.7" />
            <line x1="150" y1="39" x2="160" y2="39" stroke="rgba(14,165,233,0.4)" strokeWidth="0.7" />

            {/* Strength labels */}
            <text x="46" y="28" fill="rgba(255,255,255,0.3)" fontSize="3.5">0.82</text>
            <text x="46" y="52" fill="rgba(255,255,255,0.3)" fontSize="3.5">0.71</text>
            <text x="100" y="50" fill="rgba(255,255,255,0.3)" fontSize="3.5">0.65</text>
          </svg>
        </div>
        <MockupAlert type="info">Revenue change cascades to labor in 2 days, purchasing in 5 days. 82% correlation strength.</MockupAlert>
      </div>
    </MockupFrame>
  );
}

function AccuracyTrendMockup() {
  return (
    <MockupFrame label="Forecast Accuracy Self-Correction">
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-2">
          <MockupKPI label="Rolling MAPE" value="3.8%" trend="↓ from 5.1%" trendUp color="#22C55E" />
          <MockupKPI label="Bias" value="-0.2%" color="#22C55E" />
          <MockupKPI label="Corrections" value="7" color="#A855F7" />
        </div>
        <div className="h-16 flex items-end gap-1">
          {[
            { w: 1, h: 82, c: "bg-green-500/60" },
            { w: 2, h: 78, c: "bg-green-500/60" },
            { w: 3, h: 70, c: "bg-green-500/50" },
            { w: 4, h: 65, c: "bg-yellow-500/50" },
            { w: 5, h: 60, c: "bg-yellow-500/50" },
            { w: 6, h: 72, c: "bg-green-500/50" },
            { w: 7, h: 80, c: "bg-green-500/60" },
            { w: 8, h: 85, c: "bg-green-500/60" },
            { w: 9, h: 88, c: "bg-green-500/70" },
            { w: 10, h: 90, c: "bg-green-500/70" },
            { w: 11, h: 92, c: "bg-green-500/80" },
            { w: 12, h: 96, c: "bg-green-500/80" },
          ].map((bar) => (
            <div key={bar.w} className="flex-1 flex flex-col items-center gap-0.5">
              <div className={`w-full rounded-sm ${bar.c}`} style={{ height: `${bar.h}%` }} />
              <span className="text-[7px] text-[var(--text-muted)]">W{bar.w}</span>
            </div>
          ))}
        </div>
        <div className="text-[9px] text-[var(--text-muted)]">Rolling 12-week accuracy trend · Self-correcting weekly</div>
      </div>
    </MockupFrame>
  );
}

function BriefingCardMockup() {
  return (
    <MockupFrame label="Executive Briefing — Weekly">
      <div className="space-y-3">
        <div className="p-3 rounded-lg bg-[rgba(28,71,255,0.06)] border border-[rgba(28,71,255,0.15)]">
          <div className="flex items-center gap-1.5 mb-2">
            <div className="w-5 h-5 rounded-full bg-[#1C47FF] flex items-center justify-center">
              <span className="text-[9px] text-white font-bold">S</span>
            </div>
            <span className="text-[10px] font-semibold text-[var(--text-secondary)]">Sundae Coach — Week of Mar 17</span>
          </div>
          <p className="text-[9px] text-[var(--text-supporting)] leading-relaxed mb-2">
            Revenue projected at $248K (+6.2% vs prior). Thursday carries 12% downside risk — 2 staff vacations overlap with a sold-out venue event next door. Weekend outlook strong: local food festival expected to drive +15% foot traffic.
          </p>
          <div className="space-y-1">
            <div className="text-[9px] font-semibold text-[var(--text-secondary)] mb-1">Action Items</div>
            {[
              { priority: "critical", action: "Call backup server for Thursday PM shift" },
              { priority: "high", action: "Pre-order +20% produce for weekend surge" },
              { priority: "medium", action: "Review brunch menu pricing — 8% below forecast check" },
            ].map((item) => (
              <div key={item.action} className="flex items-start gap-1.5 text-[9px]">
                <span className={`mt-0.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                  item.priority === 'critical' ? 'bg-red-400' :
                  item.priority === 'high' ? 'bg-orange-400' : 'bg-blue-400'
                }`} />
                <span className="text-[var(--text-supporting)]">{item.action}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2 rounded bg-green-500/10 border border-green-500/20">
            <div className="text-[8px] uppercase tracking-wider text-green-400 font-semibold mb-0.5">Opportunity</div>
            <div className="text-[9px] text-[var(--text-supporting)]">Food festival weekend: +$18K potential</div>
          </div>
          <div className="p-2 rounded bg-red-500/10 border border-red-500/20">
            <div className="text-[8px] uppercase tracking-wider text-red-400 font-semibold mb-0.5">Risk</div>
            <div className="text-[9px] text-[var(--text-supporting)]">Thursday staffing gap: -$4K exposure</div>
          </div>
        </div>
      </div>
    </MockupFrame>
  );
}

function ExternalSignalsMockup() {
  return (
    <MockupFrame label="External Signals Panel">
      <div className="space-y-2">
        {[
          { type: "Weather", signal: "Rain forecast Fri PM", impact: "-8%", confidence: "72%", icon: "🌧" },
          { type: "Event", signal: "Food festival Sat-Sun", impact: "+15%", confidence: "88%", icon: "📍" },
          { type: "Competitor", signal: "New burger joint opened 0.3mi", impact: "-3%", confidence: "45%", icon: "📊" },
          { type: "Holiday", signal: "St Patrick's Day Mon", impact: "+22%", confidence: "94%", icon: "📅" },
          { type: "Economic", signal: "CPI +0.3% MoM", impact: "-1%", confidence: "35%", icon: "📈" },
        ].map((signal) => (
          <div key={signal.signal} className="flex items-center gap-2 p-2 bg-[var(--surface-faint)] rounded-lg">
            <span className="text-xs">{signal.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-medium text-[var(--text-secondary)]">{signal.signal}</span>
                <span className={`text-[10px] font-bold ${signal.impact.startsWith('+') ? 'text-green-400' : 'text-orange-400'}`}>{signal.impact}</span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[8px] text-[var(--text-muted)]">{signal.type}</span>
                <div className="flex-1 h-0.5 bg-[var(--surface-subtle)] rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500/60 rounded-full" style={{ width: signal.confidence }} />
                </div>
                <span className="text-[8px] text-[var(--text-muted)]">{signal.confidence}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </MockupFrame>
  );
}

function MonteCarloMockup() {
  return (
    <MockupFrame label="Monte Carlo Risk Analysis">
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-2">
          <MockupKPI label="Best Case" value="$285K" color="#22C55E" />
          <MockupKPI label="Most Likely" value="$248K" color="#1C47FF" />
          <MockupKPI label="Worst Case" value="$218K" color="#FF5450" />
        </div>
        {/* Distribution curve */}
        <div className="relative h-16 bg-[var(--surface-faint)] rounded-lg overflow-hidden">
          <svg viewBox="0 0 200 50" className="w-full h-full" preserveAspectRatio="none">
            <path d="M10,48 C30,48 50,45 70,35 C90,20 100,8 110,8 C120,8 130,20 150,35 C170,45 180,48 200,48" fill="rgba(28,71,255,0.15)" stroke="#1C47FF" strokeWidth="1" />
            <line x1="110" y1="0" x2="110" y2="50" stroke="#1C47FF" strokeWidth="0.5" strokeDasharray="2,2" />
            <text x="110" y="47" fill="rgba(255,255,255,0.4)" fontSize="4" textAnchor="middle">$248K</text>
            <line x1="55" y1="0" x2="55" y2="50" stroke="#FF5450" strokeWidth="0.3" strokeDasharray="1,2" />
            <text x="55" y="47" fill="rgba(255,84,80,0.5)" fontSize="3.5" textAnchor="middle">P10</text>
            <line x1="165" y1="0" x2="165" y2="50" stroke="#22C55E" strokeWidth="0.3" strokeDasharray="1,2" />
            <text x="165" y="47" fill="rgba(34,197,94,0.5)" fontSize="3.5" textAnchor="middle">P90</text>
          </svg>
        </div>
        <div className="flex items-center gap-2 text-[9px] text-[var(--text-muted)]">
          <span>1,000 simulations</span>
          <span>·</span>
          <span>12% downside probability</span>
          <span>·</span>
          <span>Expected value: $251K</span>
        </div>
        <MockupAlert type="warning">12% probability of revenue below $230K. Primary driver: Thursday staffing risk.</MockupAlert>
      </div>
    </MockupFrame>
  );
}

// ─── Component Mockup Map ───────────────────────────────────────────────────
const mockupMap: Record<string, () => React.JSX.Element> = {
  "Unified Forecast Timeline": ForecastTimelineMockup,
  "What-If Scenario Builder": ScenarioComparisonMockup,
  "Assumption Registry": AssumptionRegistryMockup,
  "Cross-Module Dependencies": DependencyGraphMockup,
  "Accuracy Self-Correction": AccuracyTrendMockup,
  "Executive Briefing": BriefingCardMockup,
  "External Signal Integration": ExternalSignalsMockup,
  "Monte Carlo Risk Analysis": MonteCarloMockup,
};

// ─── Data ───────────────────────────────────────────────────────────────────

const components: {
  title: string;
  headline: string;
  description: string;
  capabilities: string[];
  icon: SundaeIconName;
  color: string;
}[] = [
  {
    title: "Unified Forecast Timeline",
    headline: "Revenue, Labor, Food Cost — One Forward-Looking View",
    description: "See the next 14, 30, or 90 days across 17 business metrics in a single timeline. Confidence bands shrink as Foresight learns your patterns. Actual values overlay forecast automatically — no manual reconciliation.",
    capabilities: [
      "17 metrics: revenue, covers, labor cost, food cost, profit, SPLH, RevPASH, and more",
      "Confidence bands that tighten as accuracy improves",
      "Actual vs forecast overlay — updated daily",
      "Granularity from 15-minute slots to monthly aggregates",
    ],
    icon: "forecasting",
    color: "from-cyan-500 to-blue-600",
  },
  {
    title: "What-If Scenario Builder",
    headline: "Test Decisions Before You Make Them",
    description: "Change any assumption — pricing, staffing, capacity, marketing spend — and see the cascading impact across revenue, covers, costs, and profit. Compare up to 5 scenarios side by side. No spreadsheet gymnastics.",
    capabilities: [
      "Adjust pricing, capacity, marketing, staffing, and cost assumptions",
      "Cascading impact across revenue, labor, food cost, and profit",
      "Side-by-side comparison of up to 5 scenarios",
      "Pre-built templates: pricing change, capacity expansion, seasonal prep",
    ],
    icon: "data",
    color: "from-purple-500 to-purple-600",
  },
  {
    title: "Assumption Registry",
    headline: "Every Forecast Assumption — Visible, Editable, Auditable",
    description: "Foresight auto-detects 11 categories of assumptions from your data: seasonality, day-of-week patterns, daypart mix, channel split, pricing trends, cost trajectories. Override any assumption. Track what changed and why.",
    capabilities: [
      "Auto-detected assumptions from historical patterns",
      "Operator overrides with audit trail",
      "External signal injection (weather, events, competitor activity)",
      "Impact weight scoring per assumption",
    ],
    icon: "insights",
    color: "from-emerald-500 to-teal-600",
  },
  {
    title: "Cross-Module Dependencies",
    headline: "Understand How One Change Ripples Across Your Business",
    description: "A revenue increase doesn't just mean more money — it drives labor demand, purchasing volume, inventory turnover, and profit margins. Foresight maps these cascading dependencies and quantifies them with correlation strength.",
    capabilities: [
      "Visual dependency graph across all operational modules",
      "Correlation strength scoring (0-1) between connected metrics",
      "Cascade timing: revenue change to labor in 2 days, purchasing in 5",
      "Integrated P&L forecast showing cross-module impact",
    ],
    icon: "architecture",
    color: "from-violet-500 to-purple-600",
  },
  {
    title: "Accuracy Self-Correction",
    headline: "The Forecast That Gets Smarter Every Week",
    description: "Foresight continuously measures its own accuracy and detects systematic bias — over-forecasting weekday lunch, under-forecasting holiday weekends. When bias is found, the model self-corrects. Rolling MAPE, RMSE, and bias direction tracked per metric.",
    capabilities: [
      "Rolling MAPE and RMSE tracked per metric",
      "Bias detection: direction, magnitude, and root cause",
      "Automatic self-correction when systematic bias is detected",
      "Correction log with before/after accuracy comparison",
    ],
    icon: "performance",
    color: "from-green-500 to-emerald-600",
  },
  {
    title: "Executive Briefing",
    headline: "Your Week Ahead — Summarized With Actions",
    description: "Every Monday at 6 AM, Foresight generates an executive briefing: forecast summary, key risks, opportunities, and prioritized action items. Powered by Sundae Coach narrative intelligence — not template fill-in-the-blanks.",
    capabilities: [
      "Weekly narrative briefing generated by Sundae Coach",
      "Prioritized action items: critical, high, medium",
      "Risk/opportunity identification with estimated financial impact",
      "Briefing history — track what was predicted vs what happened",
    ],
    icon: "intelligence",
    color: "from-blue-500 to-indigo-600",
  },
  {
    title: "External Signal Integration",
    headline: "Weather, Events, Competitors, Holidays — Quantified",
    description: "Foresight ingests external signals and estimates their revenue impact with confidence scores. A sold-out concert next door? +15% expected covers. Rain forecast for Friday? -8% on outdoor seating revenue. Every signal has a number.",
    capabilities: [
      "Weather impact models with hourly granularity",
      "Local event intelligence (concerts, sports, festivals)",
      "Competitor activity tracking (openings, promos, closures)",
      "Holiday and seasonal calendar with historical impact",
      "Economic indicators (CPI, consumer confidence)",
    ],
    icon: "watchtower",
    color: "from-amber-500 to-orange-600",
  },
  {
    title: "Monte Carlo Risk Analysis",
    headline: "1,000 Simulations. One Probability Distribution.",
    description: "Run Monte Carlo simulations against your forecast to quantify downside risk. See the probability distribution of outcomes, identify the scenarios that trigger worst-case revenue, and stress-test your assumptions before the week starts.",
    capabilities: [
      "1,000-iteration Monte Carlo simulation per forecast period",
      "P10/P50/P90 outcome ranges with probability distributions",
      "Risk factor decomposition: which assumptions drive variance",
      "Stress testing: worst-case and best-case scenario isolation",
    ],
    icon: "risk",
    color: "from-rose-500 to-pink-600",
  },
];

const pricingTiers: {
  tier: string;
  base: string;
  perLocation: string;
  description: string;
  highlighted?: boolean;
  enhancements: string[];
}[] = [
  {
    tier: "Core Lite",
    base: "$279",
    perLocation: "$27",
    description: "For single-unit operators getting started with predictive intelligence.",
    enhancements: [
      "15-minute data refresh cycles",
      "8,000 AI credits/mo",
      "2 years historical training data",
      "50 forecast queries/day",
    ],
  },
  {
    tier: "Core Pro",
    base: "$249",
    perLocation: "$24",
    description: "For multi-unit operators with the full intelligence stack.",
    highlighted: true,
    enhancements: [
      "5-minute data refresh — faster recalibration",
      "14,000 AI credits/mo — more simulations",
      "3 years historical data — deeper accuracy",
      "150 forecast queries/day",
      "Analyst & Strategist intelligence modes",
      "Native multi-POS support",
    ],
  },
  {
    tier: "Enterprise",
    base: "Custom",
    perLocation: "Custom",
    description: "Dedicated support, SLAs, white-label options, and custom integrations.",
    enhancements: [
      "Custom data refresh intervals",
      "Unlimited AI credits",
      "Full historical data access",
      "Unlimited forecast queries",
      "All intelligence modes",
      "Dedicated success manager",
    ],
  },
];

export default function ForesightPage() {
  const cta = useCta();

  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      {/* Hero */}
      <PageHero
        badge="Predictive Intelligence"
        title={<>Stop Reacting.<br />Start Anticipating.</>}
        description="Forward-looking forecasts for every metric that matters — revenue, labor, food cost, profit. Confidence bands that tighten over time, what-if scenarios you can test before committing, and weekly executive briefings that tell you where to act."
      >
        <p className="text-sm text-[var(--text-muted)] mb-8 max-w-2xl mx-auto">
          17 forecast metrics. 14–90 day horizons. Self-correcting accuracy. The sixth intelligence layer turns your historical patterns into forward-looking decisions.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="cta"
            size="lg"
            onClick={() => cta("/demo", "book_demo_foresight_hero", { page: "/product/foresight" })}
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
              Your P&L Tells You What Happened. Not What&apos;s Coming.
            </h2>
            <p className="body-lg text-[var(--text-supporting)] mb-8">
              By the time last month&apos;s numbers land, the damage is done. A bad week in labor, a missed pricing opportunity, an overstocked walk-in — all visible in hindsight, invisible in the moment. Foresight doesn&apos;t just look backward. It projects forward — with the same data you already have.
            </p>
          </FadeUp>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { stat: "91%", label: "Forecast accuracy — improving weekly through self-correction", icon: "performance" as SundaeIconName },
              { stat: "17", label: "Business metrics forecast simultaneously: revenue, labor, food cost, profit, and more", icon: "data" as SundaeIconName },
              { stat: "48h", label: "From POS connection to first actionable forecast", icon: "speed" as SundaeIconName },
            ].map((item) => (
              <StaggerItem key={item.label}>
                <Card variant="elevated" className="text-center p-6">
                  <CardContent>
                    <SundaeIcon name={item.icon} size="lg" className="text-cyan-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-[var(--text-primary)] mb-2">{item.stat}</div>
                    <p className="text-sm text-[var(--text-supporting)]">{item.label}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* How Foresight Works — 3-step */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[var(--text-muted)] mb-4">
              HOW IT WORKS
            </p>
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">
              Learn. Project. Correct. Repeat.
            </h2>
          </FadeUp>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Learns Your Patterns",
                description: "Foresight ingests your historical data and auto-detects 11 categories of assumptions — seasonality, daypart mix, channel split, pricing trends, staffing patterns. No manual configuration.",
                icon: "intelligence" as SundaeIconName,
              },
              {
                step: "02",
                title: "Projects Forward",
                description: "Generates forecasts for 17 metrics across 14–90 days with confidence bands. Layers in external signals — weather, local events, competitor activity — and maps cross-module dependencies.",
                icon: "forecasting" as SundaeIconName,
              },
              {
                step: "03",
                title: "Self-Corrects Weekly",
                description: "Compares forecast to actual. Detects systematic bias. Adjusts the model automatically. MAPE drops week over week. Your forecast gets sharper the longer you use it.",
                icon: "performance" as SundaeIconName,
              },
            ].map((step) => (
              <StaggerItem key={step.step}>
                <div className="text-center p-6 rounded-2xl bg-[var(--navy-deep)] border border-[var(--border-default)]">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <SundaeIcon name={step.icon} size="lg" className="text-white" />
                  </div>
                  <div className="text-xs font-mono text-cyan-400 mb-2">{step.step}</div>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">{step.title}</h3>
                  <p className="text-sm text-[var(--text-supporting)] leading-relaxed">{step.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Components */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[var(--text-muted)] mb-4">
              8 COMPONENTS
            </p>
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">
              Forecast. Simulate. Brief. Act.
            </h2>
            <p className="body-lg text-[var(--text-supporting)] max-w-3xl mx-auto">
              From unified forecast timelines to Monte Carlo risk analysis and executive briefings — every tool an operator needs to make forward-looking decisions.
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
                          <h3 className="text-2xl font-bold text-[var(--text-primary)]">{component.title}</h3>
                          <p className="text-sm text-[var(--text-muted)] font-medium">{component.headline}</p>
                        </div>
                      </div>
                      <p className="text-[var(--text-supporting)] leading-relaxed mb-6">
                        {component.description}
                      </p>
                      <div className="space-y-2 mb-4">
                        {component.capabilities.map((cap) => (
                          <div key={cap} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                            <span className="text-cyan-400 flex-shrink-0 mt-0.5">&#10003;</span>
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

      {/* Pricing */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="text-center mb-12">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">Add Foresight to Your Core Plan</h2>
            <p className="body-lg text-[var(--text-supporting)] max-w-3xl mx-auto">
              Every Foresight plan includes all 8 components. Your Core tier determines how fast, how deep, and how much you can run.
            </p>
          </FadeUp>

          {/* Unified feature list */}
          <FadeUp className="mb-12">
            <Card variant="elevated" className="p-6 sm:p-8">
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-cyan-400 mb-4">
                INCLUDED ON EVERY TIER
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5">
                {[
                  "Unified Forecast Timeline — 14 to 90 day horizons",
                  "17 forecast metrics across revenue, labor, cost, and profit",
                  "What-If Scenario Builder with 5 side-by-side comparisons",
                  "Assumption Registry — auto-detected and operator-overridable",
                  "Accuracy Self-Correction with rolling MAPE and bias detection",
                  "Monte Carlo Risk Analysis — 1,000 simulations per period",
                  "Cross-Module Dependency Graph with correlation scoring",
                  "Executive Briefings powered by Sundae Coach",
                  "External Signal Integration — weather, events, competitors",
                  "15-minute to monthly forecast granularity",
                  "API access for forecast data",
                ].map((f) => (
                  <div key={f} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                    <span className="text-cyan-400 flex-shrink-0 mt-0.5">&#10003;</span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </Card>
          </FadeUp>

          {/* Tier pricing cards */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {pricingTiers.map((tier) => (
              <StaggerItem key={tier.tier}>
                <Card variant="elevated" className={`relative overflow-hidden h-full ${tier.highlighted ? 'border border-cyan-500/40' : ''}`}>
                  {tier.highlighted && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-600" />
                  )}
                  <CardHeader>
                    <div className="flex items-center justify-between mb-1">
                      <CardTitle className="text-lg text-[var(--text-primary)]">{tier.tier}</CardTitle>
                      {tier.highlighted && (
                        <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400">
                          Recommended
                        </span>
                      )}
                    </div>
                    {tier.base !== "Custom" ? (
                      <div className="mt-2">
                        <span className="text-3xl font-bold text-[var(--text-primary)]">{tier.base}</span>
                        <span className="text-sm text-[var(--text-muted)]">/mo</span>
                        <span className="text-sm text-[var(--text-supporting)] ml-2">+ {tier.perLocation}/loc</span>
                      </div>
                    ) : (
                      <div className="mt-2">
                        <span className="text-3xl font-bold text-[var(--text-primary)]">Custom</span>
                      </div>
                    )}
                    {tier.base !== "Custom" && (
                      <p className="text-xs text-[var(--text-muted)] mt-1">$599 one-time setup · 3 locations included</p>
                    )}
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-[var(--text-supporting)] mb-4">{tier.description}</p>
                    <div className="pt-3 border-t border-[var(--border-default)]">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                        Your Core tier provides
                      </p>
                      <ul className="space-y-1.5">
                        {tier.enhancements.map((e) => (
                          <li key={e} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                            <span className={`flex-shrink-0 mt-0.5 ${tier.highlighted ? 'text-cyan-400' : 'text-[var(--text-muted)]'}`}>&#10003;</span>
                            <span>{e}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeUp className="text-center">
            <p className="text-sm text-[var(--text-muted)] max-w-2xl mx-auto">
              Foresight requires a Sundae Core plan. Additional locations billed per-location beyond the 3 included. See the{' '}
              <a href={PRICING_URL} className="text-cyan-400 hover:text-cyan-300 underline">pricing calculator</a>{' '}
              for a custom quote.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Who Foresight Is For */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="text-center mb-12">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">
              Built for Operators Who Plan Ahead
            </h2>
          </FadeUp>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "owners" as SundaeIconName,
                title: "Multi-Unit Operators",
                description: "Portfolio-level forecasts with per-location confidence bands. Know which locations need attention before the week starts.",
              },
              {
                icon: "finance" as SundaeIconName,
                title: "Finance & FP&A",
                description: "Replace spreadsheet forecasts with self-correcting models. Track forecast-to-actual variance automatically. Briefings ready for Monday morning.",
              },
              {
                icon: "regional" as SundaeIconName,
                title: "Operations Leaders",
                description: "Scenario-test staffing changes, pricing adjustments, and capacity decisions. See the P&L impact before you commit.",
              },
            ].map((persona) => (
              <StaggerItem key={persona.title}>
                <div className="text-center p-6 rounded-2xl bg-[var(--surface-faint)] border border-[var(--border-default)]">
                  <div className="w-11 h-11 mx-auto mb-3 bg-slate-900 rounded-lg flex items-center justify-center">
                    <SundaeIcon name={persona.icon} size="md" className="text-[var(--text-primary)]" />
                  </div>
                  <h3 className="font-semibold text-[var(--text-primary)] mb-2">{persona.title}</h3>
                  <p className="text-sm text-[var(--text-supporting)]">{persona.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <PageCTA
        title="See Your Next 30 Days — Before They Happen"
        description="A 15-minute walkthrough of the Forecast Timeline, Scenario Builder, and Executive Briefings. We'll use your actual data."
      >
        <Button
          variant="cta"
          size="lg"
          onClick={() => cta("/demo", "book_demo_foresight_cta", { page: "/product/foresight" })}
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
