'use client';

import { Button } from "@/components/ui/Button";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { useCta } from "@/lib/cta";
import { REPORT_APP_URL } from "@/lib/urls";
import { PageHero, PageCTA, FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/PageAnimations";
import {
  MockupFrame,
  MockupKPI,
  MockupPaceBar,
  MockupBarChart,
  MockupTable,
  MockupAlert,
  MockupLiveDot,
  PulseDashboardMockup,
} from "@/components/ui/MockupFrame";

/* ─── Inline Mockup Compositions ─── */

function AdaptiveTargetsMockup() {
  return (
    <MockupFrame label="Pulse — Adaptive Targets" glow={false}>
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <MockupKPI label="Today's Target" value="$18,200" color="#1C47FF" />
          <MockupKPI label="Growth Modifier" value="+8%" trend="vs base" trendUp color="#22C55E" />
          <MockupKPI label="Confidence" value="94%" color="#22C55E" />
        </div>
        <MockupBarChart
          data={[
            { label: "Mon", value: 15200, color: "#1C47FF" },
            { label: "Tue", value: 16800, color: "#1C47FF" },
            { label: "Wed", value: 14900, color: "#FBBF24" },
            { label: "Thu", value: 17600, color: "#1C47FF" },
            { label: "Fri", value: 21400, color: "#22C55E" },
            { label: "Sat", value: 23100, color: "#22C55E" },
            { label: "Sun", value: 18900, color: "#1C47FF" },
          ]}
        />
        <MockupAlert type="info">
          Ramadan adjustment: −12% applied to weekday targets. Friday targets boosted +18% for iftar service.
        </MockupAlert>
      </div>
    </MockupFrame>
  );
}

function SalesPacingMockup() {
  return (
    <MockupFrame label="Pulse — Sales Pacing" glow={false}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <MockupLiveDot />
          <span className="text-[10px] text-[var(--text-muted)] font-mono">Tuesday, 7:42 PM</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <MockupKPI label="Actual" value="$14,280" trend="+12% vs target" trendUp color="#22C55E" />
          <MockupKPI label="Expected" value="$12,740" color="#1C47FF" />
          <MockupKPI label="Day Target" value="$18,200" color="#1C47FF" />
        </div>
        <MockupPaceBar label="Revenue Pace" current={14280} target={18200} unit="$" />
        <MockupPaceBar label="Covers Pace" current={287} target={340} />
        <MockupBarChart
          data={[
            { label: "11a", value: 1200 },
            { label: "12p", value: 2800 },
            { label: "1p", value: 3100 },
            { label: "2p", value: 1400 },
            { label: "5p", value: 2100 },
            { label: "6p", value: 2400 },
            { label: "7p", value: 1280 },
          ]}
        />
      </div>
    </MockupFrame>
  );
}

function LaborMockup() {
  return (
    <MockupFrame label="Pulse — Labor Productivity" glow={false}>
      <div className="space-y-4">
        <div className="grid grid-cols-4 gap-3">
          <MockupKPI label="SPLH" value="$62.40" trend="+8% vs avg" trendUp color="#22C55E" />
          <MockupKPI label="CPLH" value="4.2" color="#1C47FF" />
          <MockupKPI label="Labor %" value="28.1%" trend="Under 30%" trendUp color="#22C55E" />
          <MockupKPI label="Shift Cost" value="$1,840" color="#FBBF24" />
        </div>
        <MockupTable
          headers={["Role", "Staff", "Hours", "Cost", "SPLH"]}
          rows={[
            ["Servers", "4", "24h", "$720", "$79.50"],
            ["Kitchen", "3", "21h", "$630", "$54.30"],
            ["Bar", "2", "12h", "$360", "$71.20"],
            ["Host", "1", "8h", "$130", "—"],
          ]}
        />
      </div>
    </MockupFrame>
  );
}

function ServerPerformanceMockup() {
  return (
    <MockupFrame label="Pulse — Server Leaderboard" glow={false}>
      <div className="space-y-4">
        <MockupTable
          headers={["#", "Server", "Revenue", "Avg Check", "Upsell %", "Score"]}
          rows={[
            ["1", "Sarah M.", "$2,840", "$52.10", "32%", "94"],
            ["2", "Marcus J.", "$2,410", "$48.20", "28%", "87"],
            ["3", "Priya K.", "$2,180", "$51.40", "26%", "82"],
            ["4", "James K.", "$1,960", "$44.50", "18%", "68"],
          ]}
        />
        <MockupAlert type="coach">
          James K. upsell rate is 14pp below shift average. Consider pairing with Sarah for the next 2 tables.
        </MockupAlert>
      </div>
    </MockupFrame>
  );
}

function LeakageMockup() {
  return (
    <MockupFrame label="Pulse — Leakage Monitor" glow={false}>
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <MockupKPI label="Total Leakage" value="$2,630" color="#FF5450" />
          <MockupKPI label="Void Rate" value="3.2%" trend="+0.8% vs avg" trendUp={false} color="#FBBF24" />
          <MockupKPI label="Exceptions" value="14" color="#FF5450" />
        </div>
        <MockupTable
          headers={["Type", "Count", "Amount", "Server"]}
          rows={[
            ["Void after print", "6", "$840", "Multiple"],
            ["Unauthorized disc.", "4", "$620", "James K."],
            ["Price override", "3", "$480", "Marcus J."],
            ["Comp no approval", "1", "$690", "James K."],
          ]}
        />
        <MockupAlert type="critical">
          James K. has 5 exceptions this shift — 3x the team average. Review recommended.
        </MockupAlert>
      </div>
    </MockupFrame>
  );
}

function CoachMockup() {
  return (
    <MockupFrame label="Sundae Coach — Shift Signals" glow={false}>
      <div className="space-y-3">
        <MockupAlert type="coach">
          Revenue pace is 12% ahead of target. Maintain current staffing — do not cut early.
        </MockupAlert>
        <MockupAlert type="warning">
          Avg check dropped $4.20 in the last hour. Server James K. accounts for 60% of the decline. Upsell coaching needed.
        </MockupAlert>
        <MockupAlert type="critical">
          Void rate spiked to 3.2% (baseline: 1.8%). 4 voids in 45 min from terminal #3. Manager review recommended.
        </MockupAlert>
        <MockupAlert type="info">
          Saturday forecast: +22% covers based on local event (marathon). Pre-stock high-turnover items by Friday 4 PM.
        </MockupAlert>
      </div>
    </MockupFrame>
  );
}

function AlertsMockup() {
  return (
    <MockupFrame label="Pulse — Alerts & Playbooks" glow={false}>
      <div className="space-y-4">
        <MockupTable
          headers={["Alert", "Trigger", "Status", "Action"]}
          rows={[
            ["Revenue behind pace", ">15% gap at 2PM", "🔴 Active", "Push upsell protocol"],
            ["Labor cost spike", ">32% ratio", "🟡 Warning", "Review evening staffing"],
            ["Void anomaly", ">2x baseline", "🔴 Active", "Manager review"],
            ["Covers ahead", ">20% over plan", "🟢 Positive", "Prep backup stations"],
          ]}
        />
        <MockupAlert type="info">
          Playbook triggered: &quot;Upsell Protocol&quot; — auto-notified servers via Sundae Coach with top 3 margin items.
        </MockupAlert>
      </div>
    </MockupFrame>
  );
}

function ScorecardMockup() {
  return (
    <MockupFrame label="Pulse — Shift Scorecard" glow={false}>
      <div className="space-y-4">
        <div className="text-center">
          <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">Lunch Shift Summary</div>
          <div className="text-3xl font-bold font-mono text-[#22C55E] mt-1">A−</div>
          <div className="text-[11px] text-[var(--text-muted)]">Overall Shift Grade</div>
        </div>
        <div className="grid grid-cols-4 gap-3">
          <MockupKPI label="Revenue" value="$9,840" trend="+6%" trendUp />
          <MockupKPI label="Covers" value="187" trend="+12" trendUp color="#22C55E" />
          <MockupKPI label="Avg Check" value="$52.60" trend="+$1.40" trendUp color="#22C55E" />
          <MockupKPI label="Labor %" value="27.8%" trend="Under 30%" trendUp color="#22C55E" />
        </div>
        <MockupAlert type="coach">
          Highlights: Upsell rate hit 28% (best this month). Area to improve: Kitchen ticket time averaged 14 min (target: 12 min).
        </MockupAlert>
      </div>
    </MockupFrame>
  );
}

function LeaderboardMockup() {
  return (
    <MockupFrame label="Pulse — Portfolio Leaderboard" glow={false}>
      <div className="space-y-4">
        <MockupTable
          headers={["#", "Outlet", "Revenue", "vs Target", "Streak"]}
          rows={[
            ["1", "Downtown", "$14,280", "+12%", "🔥 5 days"],
            ["2", "Marina", "$11,940", "+4%", "🔥 3 days"],
            ["3", "Mall Branch", "$9,620", "−2%", "—"],
            ["4", "Airport", "$8,410", "−8%", "⚠ 2 days"],
          ]}
        />
        <MockupAlert type="warning">
          Airport is 8% behind target for 2 consecutive days. Top issue: low covers during 2-5 PM daypart (38% below plan).
        </MockupAlert>
      </div>
    </MockupFrame>
  );
}

function WallboardMockup() {
  return (
    <MockupFrame label="Pulse — Wallboard Mode (TV Display)" glow>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <MockupLiveDot />
          <span className="text-[10px] text-[var(--text-muted)] font-mono">Downtown — Auto-rotating</span>
        </div>
        <div className="grid grid-cols-4 gap-3">
          <MockupKPI label="Revenue" value="$14,280" trend="+12%" trendUp />
          <MockupKPI label="Covers" value="287" trend="+12" trendUp color="#22C55E" />
          <MockupKPI label="Avg Check" value="$49.50" color="#FBBF24" />
          <MockupKPI label="Labor %" value="28.4%" trend="On target" trendUp color="#22C55E" />
        </div>
        <MockupPaceBar label="Revenue Pace" current={14280} target={18200} unit="$" />
        <div className="text-center text-[10px] text-[var(--text-muted)]">
          Next outlet: Marina — rotating in 30s
        </div>
      </div>
    </MockupFrame>
  );
}

function ShiftCostMockup() {
  return (
    <MockupFrame label="Pulse — Shift Economics" glow={false}>
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <MockupKPI label="Shift Revenue" value="$9,840" color="#22C55E" />
          <MockupKPI label="Shift Cost" value="$2,760" color="#FF5450" />
          <MockupKPI label="Shift Margin" value="72%" color="#22C55E" />
        </div>
        <MockupTable
          headers={["Shift", "Staff", "Hours", "Cost", "Revenue", "Labor %"]}
          rows={[
            ["Morning", "4", "32h", "$960", "$3,200", "30.0%"],
            ["Lunch", "6", "36h", "$1,080", "$5,400", "20.0%"],
            ["Evening", "8", "40h", "$1,600", "$8,200", "19.5%"],
          ]}
        />
        <MockupAlert type="coach">
          Morning shift labor % is 10pp higher than evening. Consider reducing to 3 staff before 10:30 AM.
        </MockupAlert>
      </div>
    </MockupFrame>
  );
}

/* ─── Feature Blocks Data ─── */

const pulseFeatureBlocks: {
  title: string;
  headline: string;
  description: string;
  capabilities: string[];
  icon: SundaeIconName;
  mockup: React.ComponentType;
}[] = [
  {
    title: "Adaptive Intelligence Targets",
    headline: "Targets That Learn Your Business",
    description: "Pulse analyzes your sales history, detects anomalies, maps year-over-year patterns, and adjusts for calendar events like Ramadan, public holidays, and local seasonality — automatically. Set a growth ambition. The system calculates daily targets for every outlet.",
    capabilities: [
      "Year-over-year weekly target mapping",
      "Configurable growth modifiers",
      "Anomaly detection with one-click tagging",
      "Calendar event awareness (Ramadan, Eid, NYE)",
      "Trend shift detection with proactive alerts",
      "Forward target simulation and preview",
    ],
    icon: "intelligence",
    mockup: AdaptiveTargetsMockup,
  },
  {
    title: "Sales & Pace Tracking",
    headline: "Know Where You Stand — Every Hour",
    description: "Real-time sales pacing against your targets, broken down by daypart. Expected revenue by this point in the shift, the gap to target, recovery pace needed, and whether you're trending to beat or miss the day.",
    capabilities: [
      "Intraday pacing with configurable dayparts",
      "Real-time gap-to-target calculations",
      "Hourly revenue trend visualization",
      "Multi-outlet portfolio view with RAG status",
    ],
    icon: "chart",
    mockup: SalesPacingMockup,
  },
  {
    title: "Labor Productivity",
    headline: "From Headcount to Productivity",
    description: "Labor isn't just hours — it's output. Sales per Labor Hour, Covers per Labor Hour, and a composite Productivity Index — in real time. See which shifts are overstaffed, which generate the most revenue per hour, and what each shift actually costs.",
    capabilities: [
      "SPLH and CPLH in real time",
      "Labor Cost Ratio vs. target",
      "Per-shift cost with staff-level detail",
      "Productivity trend tracking over 14 days",
      "Configurable hourly rates by role",
    ],
    icon: "benchmarking",
    mockup: LaborMockup,
  },
  {
    title: "Server Performance",
    headline: "See Who's Driving Revenue",
    description: "A live leaderboard ranking servers by revenue, average check, covers, upsell rate, and a composite productivity score. Filter by hour, service phase, or comparison period. Use it for coaching, incentives, and staffing decisions.",
    capabilities: [
      "Filter by hour, phase, or custom range",
      "Compare vs. yesterday or 4-week average",
      "Composite productivity score (0–100)",
      "Individual server detail with charts",
      "Strengths and improvement areas auto-detected",
    ],
    icon: "multiLocation",
    mockup: ServerPerformanceMockup,
  },
  {
    title: "Leakage Monitoring",
    headline: "2–5% of Revenue Leaks Every Month",
    description: "Voids, discounts, comps, and refunds — tracked in real time against your baselines. Pulse flags when leakage rates spike, identifies the servers, items, and time windows involved, and alerts you before small issues become expensive patterns.",
    capabilities: [
      "Real-time void, discount, and comp tracking",
      "Server-level leakage attribution",
      "Spike detection against rolling baselines",
      "Automated alerts for anomalous patterns",
    ],
    icon: "cost",
    mockup: LeakageMockup,
  },
  {
    title: "Sundae Coach",
    headline: "Prioritized Actions, Not Dashboards",
    description: "Sundae Coach monitors all signals in real time and surfaces prioritized, actionable recommendations based on live data. Not generic tips — specific actions tied to what's happening on your floor right now.",
    capabilities: [
      "Real-time contextual recommendations",
      "Prioritized by revenue impact",
      "Based on live Pulse data",
      "Configurable playbooks per scenario",
    ],
    icon: "intelligence",
    mockup: CoachMockup,
  },
  {
    title: "Alerts & Playbooks",
    headline: "Automated Responses When It Matters",
    description: "Define thresholds. Get notified. Act fast. Automated response workflows triggered by exceptions — from void anomalies to labor cost spikes — with escalation paths built in.",
    capabilities: [
      "Custom threshold-based alert triggers",
      "Automated notification workflows",
      "Configurable playbooks per exception",
      "Real-time escalation paths",
    ],
    icon: "forecasting",
    mockup: AlertsMockup,
  },
  {
    title: "Shift Scorecard",
    headline: "End-of-Shift Performance Summary",
    description: "Every shift gets graded. Revenue, covers, average check, labor cost, leakage, and server highlights — summarized in one view. Share it with your team or review it the next morning.",
    capabilities: [
      "KPI summary across all outlets",
      "Shift grade with highlights and lowlights",
      "Improvement areas auto-detected",
      "Shareable shift report",
    ],
    icon: "report",
    mockup: ScorecardMockup,
  },
  {
    title: "Portfolio Leaderboard",
    headline: "Compare Every Outlet, Live",
    description: "Multi-outlet performance comparison with streak tracking and competitive ranking. See which outlets are on fire and which need attention — before end-of-day.",
    capabilities: [
      "Cross-outlet performance ranking",
      "Streak tracking and trend indicators",
      "Drill-down into individual outlet metrics",
      "At-risk outlet flagging",
    ],
    icon: "multiLocation",
    mockup: LeaderboardMockup,
  },
  {
    title: "Wallboard Mode",
    headline: "Put Pulse on the Big Screen",
    description: "A TV-optimized display designed for kitchen pass-throughs, manager offices, and staff areas. Auto-rotates through outlets, prioritizes at-risk locations, and gives the team a shared view of the shift.",
    capabilities: [
      "TV-optimized 16:9 display",
      "Auto-rotate across outlets",
      "Priority ordering (at-risk first)",
      "Configurable refresh rate and metrics",
    ],
    icon: "canvas",
    mockup: WallboardMockup,
  },
];

export default function PulsePage() {
  const cta = useCta();

  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      {/* Hero */}
      <PageHero
        badge="Pulse — Intraday Operations"
        title="$2K Lost Per Bad Shift. Pulse Catches It Live."
        description="Revenue pacing, labor cost, server performance, and leakage detection — updating every 5 minutes. Adaptive targets that learn your patterns, seasonality, and local events. Act before it costs you."
      >
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="cta"
            size="lg"
            onClick={() => cta("/demo", "book_demo_pulse_hero", { page: "/product/pulse" })}
          >
            Book a Demo
          </Button>
          <Button
            variant="outline-light"
            size="lg"
            href="#features"
          >
            See Pulse in Action
          </Button>
        </div>
        <p className="text-sm text-[var(--text-muted)] mt-4">
          Available on Sundae Core plans.
        </p>
      </PageHero>

      {/* Hero Mockup */}
      <section className="px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 pb-16">
        <div className="max-w-4xl mx-auto">
          <PulseDashboardMockup />
        </div>
      </section>

      {/* What Pulse Monitors — Quick Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-4xl mx-auto text-center">
          <FadeUp>
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">
              10 Capabilities. One Operational Nerve Center.
            </h2>
            <p className="body-lg text-[var(--text-supporting)] mb-12">
              Pulse monitors your operation in real time and coaches your team when things go off-track.
            </p>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {[
              { label: "Adaptive Targets", icon: "intelligence" as SundaeIconName },
              { label: "Sales Pacing", icon: "chart" as SundaeIconName },
              { label: "Labor Productivity", icon: "benchmarking" as SundaeIconName },
              { label: "Server Analytics", icon: "multiLocation" as SundaeIconName },
              { label: "Leakage Monitor", icon: "cost" as SundaeIconName },
              { label: "Sundae Coach", icon: "intelligence" as SundaeIconName },
              { label: "Alerts & Playbooks", icon: "forecasting" as SundaeIconName },
              { label: "Shift Scorecard", icon: "report" as SundaeIconName },
              { label: "Leaderboard", icon: "multiLocation" as SundaeIconName },
              { label: "Wallboard", icon: "canvas" as SundaeIconName },
            ].map((item) => (
              <StaggerItem key={item.label}>
                <div className="p-4 bg-[rgba(220,38,38,0.06)] rounded-xl text-center border border-[rgba(220,38,38,0.1)]">
                  <div className="w-10 h-10 mx-auto mb-2 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg flex items-center justify-center">
                    <SundaeIcon name={item.icon} size="md" className="text-white" />
                  </div>
                  <p className="text-sm font-medium text-[var(--text-secondary)]">{item.label}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Feature Blocks — Detailed */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <p className="eyebrow text-red-400 mb-4">DEEP DIVE</p>
              <h2 className="section-h2 text-[var(--text-primary)] mb-4">
                Every Feature, In Detail
              </h2>
            </div>
          </FadeUp>

          <div className="space-y-20">
            {pulseFeatureBlocks.map((block, index) => {
              const Mockup = block.mockup;
              return (
                <FadeUp key={block.title} delay={index * 0.03}>
                  <div className={`grid md:grid-cols-2 gap-10 items-center ${index % 2 === 1 ? 'md:grid-flow-dense' : ''}`}>
                    {/* Mockup */}
                    <div className={index % 2 === 1 ? 'md:col-start-2' : ''}>
                      <Mockup />
                    </div>

                    {/* Content */}
                    <div className={index % 2 === 1 ? 'md:col-start-1 md:row-start-1' : ''}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg flex items-center justify-center">
                          <SundaeIcon name={block.icon} size="md" className="text-white" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-red-400 uppercase tracking-wider">{block.title}</p>
                          <h3 className="text-xl font-bold text-[var(--text-primary)]">{block.headline}</h3>
                        </div>
                      </div>
                      <p className="text-[var(--text-supporting)] leading-relaxed mb-4">{block.description}</p>
                      <ul className="space-y-1.5">
                        {block.capabilities.map((cap) => (
                          <li key={cap} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                            <span className="text-red-400 mt-0.5 flex-shrink-0">&#10003;</span>
                            <span>{cap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* Deep Dive: Targets That Get Smarter */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="eyebrow text-red-400 mb-4">INTELLIGENCE THAT LEARNS</p>
                <h2 className="section-h2 text-[var(--text-primary)] mb-6">
                  Targets That Get Smarter Every Week
                </h2>
                <p className="body-lg text-[var(--text-supporting)]">
                  Most platforms make you set targets manually — or copy last week. Sundae&apos;s Adaptive Intelligence Engine scans your full sales history, detects anomalies and seasonality, maps calendar events to their actual revenue impact, and generates forward-looking targets that reflect your real business rhythm. Tag a one-off event and it&apos;s excluded. Tag a recurring event and the system adjusts next year, automatically.
                </p>
              </div>
              <div>
                <AdaptiveTargetsMockup />
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Deep Dive: Server Intelligence */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="md:order-2">
                <p className="eyebrow text-red-400 mb-4">SERVER INTELLIGENCE</p>
                <h2 className="section-h2 text-[var(--text-primary)] mb-6">
                  From Leaderboard to Coaching Tool
                </h2>
                <p className="body-lg text-[var(--text-supporting)]">
                  See who&apos;s driving your revenue and who needs support — in real time. Filter by hour, by service phase, or compare against last week. Every server gets a productivity score, an hourly breakdown, and auto-detected strengths and improvement areas. The best restaurants don&apos;t just track servers — they develop them.
                </p>
              </div>
              <div className="md:order-1">
                <ServerPerformanceMockup />
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Deep Dive: Shift Economics */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="eyebrow text-red-400 mb-4">SHIFT COSTING</p>
                <h2 className="section-h2 text-[var(--text-primary)] mb-6">
                  Know What Every Shift Costs
                </h2>
                <p className="body-lg text-[var(--text-supporting)]">
                  Your morning shift runs 4 staff for 8 hours. Your evening runs 8 for 5 hours. Which one is actually profitable? Pulse breaks down the cost of every shift — by role, by individual — and maps it against the revenue that shift generates. See your labor cost ratio by shift, identify overstaffing, and make smarter scheduling decisions.
                </p>
              </div>
              <div>
                <ShiftCostMockup />
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* CTA */}
      <PageCTA
        title="Stop Managing Shifts Blind"
        description="Pulse is on every Sundae Core plan. See what's happening now — not at end-of-day."
      >
        <Button
          variant="cta"
          size="lg"
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
      </PageCTA>
    </div>
  );
}
