'use client';

import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { MockupFrame, MockupKPI, MockupBarChart, MockupTable, MockupAlert } from "@/components/ui/MockupFrame";
import { PageHero, PageCTA, FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/PageAnimations";
import { useCta } from "@/lib/cta";
import { REPORT_APP_URL } from "@/lib/urls";

const benchmarkMetrics: { name: string; description: string; icon: SundaeIconName }[] = [
  {
    name: "RevPASH Index",
    description: "Revenue Per Available Seat Hour — the gold standard for restaurant space efficiency.",
    icon: "chart"
  },
  {
    name: "Seat Occupancy",
    description: "How effectively you fill your seats compared to similar restaurants in your market.",
    icon: "restaurant"
  },
  {
    name: "Average Check Size",
    description: "Per-guest spend compared to your competitive set, with trend analysis over time.",
    icon: "finance"
  },
  {
    name: "Revenue Indexes",
    description: "Multi-dimensional revenue comparison across locations, dayparts, and time periods.",
    icon: "growth"
  },
  {
    name: "Compset Comparisons",
    description: "Anonymized peer benchmarks from restaurants of similar size, cuisine, and market.",
    icon: "multiLocation"
  },
  {
    name: "Priority Insights",
    description: "Auto-generated analysis highlighting where you outperform and where to improve.",
    icon: "intelligence"
  }
];

export default function BenchmarkingPage() {
  const cta = useCta();

  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      {/* Hero */}
      <PageHero
        badge="Competitive Intelligence"
        title="Stop Guessing. Start Knowing."
        description="Compare against anonymized peer data — RevPASH Index, seat occupancy, average check, and revenue indexes — with insights that tell you exactly where you stand."
      >
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="cta" size="lg" href={REPORT_APP_URL} onClick={() => cta(REPORT_APP_URL, "try_benchmarks_hero", { page: "/benchmarking" })}>
            Try Free Benchmarks
          </Button>
          <Button variant="outline-light" size="lg" onClick={() => cta("/demo", "book_demo_benchmarks", { page: "/benchmarking" })}>
            Book a Demo
          </Button>
        </div>
      </PageHero>

      {/* How Benchmarking Works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="text-center mb-12">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">
              How Sundae Benchmarks Work
            </h2>
            <p className="body-lg text-[var(--text-supporting)] max-w-3xl mx-auto">
              Upload your data. Get instant comparisons against restaurants like yours.
            </p>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Upload Your Data", description: "CSV, PDF, Excel, or connect your POS directly. Normalized automatically." },
              { step: "2", title: "Match Your Compset", description: "Matched against anonymized peers by cuisine, size, market, and service model." },
              { step: "3", title: "Get Insights", description: "See where you outperform, where you lag, and what to do about it." }
            ].map((item) => (
              <StaggerItem key={item.step}>
                <div className="text-center p-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">{item.title}</h3>
                  <p className="text-sm text-[var(--text-supporting)]">{item.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Benchmark Metrics */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">
              What You Can Benchmark
            </h2>
            <p className="body-lg text-[var(--text-supporting)]">
              30+ metrics across performance, efficiency, and market position.
            </p>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benchmarkMetrics.map((metric) => (
              <StaggerItem key={metric.name}>
                <Card variant="elevated" className="h-full hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
                      <SundaeIcon name={metric.icon} size="lg" className="text-white" />
                    </div>
                    <h3 className="font-bold text-[var(--text-primary)] mb-2">{metric.name}</h3>
                    <p className="text-sm text-[var(--text-supporting)] leading-relaxed">{metric.description}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Forecast Mockup — replacing BrowserFrame */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeUp>
              <h2 className="section-h2 text-[var(--text-primary)] mb-4">
                Revenue Forecasting
              </h2>
              <p className="body-lg text-[var(--text-supporting)] mb-6">
                Revenue forecasting using your trends and market data to project future performance.
              </p>
              <ul className="space-y-3">
                {["14-30 day revenue projections", "Seasonal pattern recognition", "Market-adjusted forecasts", "Confidence intervals"].map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                    <span className="text-green-500">&#10003;</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </FadeUp>
            <FadeUp delay={0.2}>
              <MockupFrame label="Benchmarks — Revenue Forecast" glow>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-2">
                    <MockupKPI label="Projected Rev" value="$142K" trend="+8%" trendUp />
                    <MockupKPI label="Confidence" value="87%" trend="High" />
                    <MockupKPI label="vs Compset" value="+12%" trend="Above" trendUp />
                  </div>
                  <MockupBarChart
                    data={[
                      { label: "Wk 1", value: 72, color: "bg-blue-500" },
                      { label: "Wk 2", value: 78, color: "bg-blue-500" },
                      { label: "Wk 3", value: 65, color: "bg-blue-400/60" },
                      { label: "Wk 4", value: 82, color: "bg-blue-400/60" },
                    ]}
                  />
                  <MockupTable
                    headers={["Period", "Forecast", "Actual", "Variance"]}
                    rows={[
                      ["This Week", "$34.2K", "$35.1K", "+2.6%"],
                      ["Next Week", "$36.8K", "—", "—"],
                      ["Wk 3", "$31.4K", "—", "—"],
                    ]}
                  />
                  <MockupAlert type="coach">Revenue trending 8% above compset average. Weekend dinner is your strongest daypart — consider extending Friday hours.</MockupAlert>
                </div>
              </MockupFrame>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-5xl mx-auto text-center">
          <FadeUp>
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">
              Available Across All Tiers
            </h2>
            <p className="body-lg text-[var(--text-supporting)] mb-12">
              Start benchmarking for free with Report Lite. Unlock deeper intelligence as you grow.
            </p>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StaggerItem>
              <div className="bg-[var(--navy-deep)] rounded-xl p-6 border border-[var(--border-default)]">
                <div className="text-sm font-semibold text-green-500 mb-2">FREE</div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">Report Lite</h3>
                <p className="text-sm text-[var(--text-supporting)]">5 core metrics. CSV upload. 90-day retention.</p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="bg-[var(--navy-deep)] rounded-xl p-6 border-2 border-blue-500 shadow-md">
                <div className="text-sm font-semibold text-[#60A5FA] mb-2">POPULAR</div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">Report Plus</h3>
                <p className="text-sm text-[var(--text-supporting)]">15 metrics. Auto-parsed uploads. 1-year retention.</p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="bg-[var(--navy-deep)] rounded-xl p-6 border border-[var(--border-default)]">
                <div className="text-sm font-semibold text-purple-400 mb-2">FULL POWER</div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">Report Pro / Core</h3>
                <p className="text-sm text-[var(--text-supporting)]">30+ metrics. API integration. Multi-year retention.</p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <PageCTA
        title="See Where You Stand"
        description="Upload your data and get your first benchmark in minutes. Free, no credit card required."
      >
        <Button
          variant="cta"
          size="lg"
          className="bg-[var(--navy-deep)] text-[var(--text-primary)] hover:bg-[var(--surface-subtle)]"
          onClick={() => cta(REPORT_APP_URL, "start_free_benchmarks_cta", { page: "/benchmarking" })}
        >
          Start Free Benchmark
        </Button>
        <Button
          variant="outline-light"
          size="lg"
          onClick={() => cta("/demo", "book_demo_benchmarks_cta", { page: "/benchmarking" })}
        >
          Book a Demo
        </Button>
      </PageCTA>
    </div>
  );
}
