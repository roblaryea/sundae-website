'use client';

import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { BenchmarkDashboardMockup } from "@/components/ui/MockupFrame";
import { PageHero, PageCTA, FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/PageAnimations";
import { useCta } from "@/lib/cta";
import { REPORT_APP_URL, PRICING_URL, SIGNUP_URL } from "@/lib/urls";

export default function ReportProductPage() {
  const cta = useCta();

  const reportTiers = [
    {
      name: "Report Lite",
      badge: "Free Forever",
      subtitle: "Prove the Value. Pay Nothing.",
      description: "Upload a CSV. Get instant clarity. Perfect for testing Sundae or running a single location that needs foundational benchmarking.",
      features: [
        "Manual CSV upload",
        "Benchmark 5 core metrics",
        "400 intelligence credits/month",
        "90-day retention",
        "20 pre-built visuals",
        "Email support (72hr response)"
      ],
      bestFor: "Testing, proof of concept, single-location cafés",
      color: "from-purple-400 to-purple-600",
      cta: "Start Free",
      link: "/report"
    },
    {
      name: "Report Plus",
      badge: "Most Popular",
      subtitle: "Automated Parsing. Deeper Benchmarks.",
      description: "Sundae parses your PDFs, Excel files, and screenshots automatically. Advanced benchmarking and pattern detection for operators ready to go deeper.",
      features: [
        "Auto-parsed uploads (PDF, Excel, screenshots)",
        "Benchmark 15 metrics",
        "1,500 intelligence credits/month",
        "1-year retention",
        "50 comprehensive visuals",
        "Email + Chat support (24hr response)"
      ],
      bestFor: "Single-location upscale, small multi-location (2–5)",
      color: "from-purple-500 to-purple-600",
      cta: "See Report Plus",
      link: PRICING_URL
    },
    {
      name: "Report Pro",
      badge: "Maximum Intelligence",
      subtitle: "Full Automation. API Integration.",
      description: "Fully automated API integration. Maximum metrics, maximum retention, maximum intelligence. For groups scaling past 5 locations.",
      features: [
        "Fully automated API integration",
        "Benchmark 30 metrics",
        "4,000 intelligence credits/month",
        "2-year retention",
        "Up to 120 visuals",
        "Priority support (12hr response)"
      ],
      bestFor: "Multi-location groups (5–20), portfolio managers",
      color: "from-slate-700 to-slate-900",
      cta: "See Report Pro",
      link: PRICING_URL
    }
  ];

  const fourDimensions = [
    {
      dimension: "1D",
      title: "What Happened",
      status: "✓ Full",
      description: "Complete POS historical data. Sales, covers, revenue, transactions — unified from your point-of-sale system.",
      icon: "report" as SundaeIconName,
      color: "from-blue-500 to-blue-600"
    },
    {
      dimension: "2D",
      title: "Plan vs. Actual",
      status: "✓ Full",
      description: "Budget variance analysis, forecast vs actual comparisons, target tracking across locations.",
      icon: "marketing" as SundaeIconName,
      color: "from-purple-500 to-purple-600"
    },
    {
      dimension: "3D",
      title: "Market Context",
      status: "Limited",
      description: "Basic benchmarking against similar restaurants (5–30 metrics depending on tier). For expanded market intelligence, upgrade to Core.",
      icon: "multiLocation" as SundaeIconName,
      color: "from-green-500 to-green-600"
    },
    {
      dimension: "4D",
      title: "What's Next",
      status: "✓ Limited",
      description: "Pattern recognition, anomaly detection, basic recommendations. For expanded predictive intelligence, see Core.",
      icon: "growth" as SundaeIconName,
      color: "from-orange-500 to-orange-600"
    }
  ];

  const upgradeSignals = [
    {
      title: "Need Operational Speed",
      description: "Daily reports aren't fast enough — you need 2–4 hour refresh cycles to act during shifts.",
      icon: "speed" as SundaeIconName
    },
    {
      title: "Need Item-Level Detail",
      description: "Menu item-level analysis, daypart breakdowns, server performance tracking.",
      icon: "menu" as SundaeIconName
    },
    {
      title: "Want System Integrations",
      description: "Labor, Inventory, Marketing, Reservations, Purchasing — all operational systems in one place.",
      icon: "integration" as SundaeIconName
    },
    {
      title: "Scaling Past 10 Locations",
      description: "Coordination complexity increases. Real-time performance data matters for mid-shift intervention.",
      icon: "multiLocation" as SundaeIconName
    }
  ];

  const faqs = [
    {
      q: "Is Report Lite really free forever?",
      a: "Yes. No credit card required. No commitment. Fair-use policy applies for reasonable operational usage."
    },
    {
      q: "Can I upgrade tiers later?",
      a: "Absolutely. Move between Report Lite, Plus, and Pro anytime. All historical data is preserved."
    },
    {
      q: "How do I get my data into Sundae?",
      a: "Report Lite: Upload CSV files. Report Plus: Upload PDFs/Excel/screenshots (Sundae parses them). Report Pro: API integration (automated)."
    },
    {
      q: "How is Report different from Core?",
      a: "Report = historical analysis (daily/weekly summaries). Core = near real-time operations (2–4 hour refresh). Report is perfect for analyzing the past. Core adds operational speed, system integrations (Labor, Inventory, etc.), modules, and Watchtower external intelligence."
    },
    {
      q: "When should I upgrade from Report to Core?",
      a: "When you need operational speed (2–4 hour refresh), detailed POS insights, system integrations, modules for specialized intelligence, or Watchtower for external market intelligence."
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      {/* Hero */}
      <PageHero
        badge="Sundae Report"
        title={<>5 Metrics Benchmarked.<br />Zero Dollars Spent.</>}
        description="Upload your data. Instantly benchmark against restaurants like yours. Spot the margins you're leaving on the table — and build the case for what's next."
      >
        <p className="text-[var(--text-muted)] mb-8 max-w-3xl mx-auto body-lg">
          Free forever. No credit card. No commitment. Just clarity.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            variant="cta"
            size="lg"
            onClick={() => cta(SIGNUP_URL, "start_free_benchmark", { page: "/report-product" })}
          >
            Start Your Free Benchmark
          </Button>
          <Button variant="outline-light" size="lg" href={PRICING_URL}>
            See Pricing
          </Button>
        </div>
        <div className="max-w-4xl mx-auto">
          <BenchmarkDashboardMockup />
        </div>
      </PageHero>

      {/* What is Report */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="text-center mb-12">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">
              Your Historical Intelligence Layer
            </h2>
            <p className="body-lg text-[var(--text-supporting)] max-w-3xl mx-auto">
              Report is the foundation of decision intelligence for restaurants. Whether you&apos;re testing Sundae for the first time or running deep historical analysis across dozens of locations, Report gives you clarity on what happened, why it matters, and where you stand against the market.
            </p>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              { icon: "intelligence" as SundaeIconName, title: "Beyond Dashboards", text: "Not just numbers. What they mean, why they matter, and what to do about them." },
              { icon: "benchmarking" as SundaeIconName, title: "True Benchmarking", text: "Compare against restaurants like yours — by cuisine, size, and market — not generic industry averages." },
              { icon: "success" as SundaeIconName, title: "Zero Risk Entry", text: "Report Lite is free forever. Prove the value with your own data before you invest a dollar." },
            ].map((item) => (
              <StaggerItem key={item.title} className="text-center p-6 bg-[var(--surface-subtle)] rounded-xl">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <SundaeIcon name={item.icon} size="lg" className="text-white" />
                </div>
                <h3 className="font-semibold text-[var(--text-primary)] mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--text-supporting)]">{item.text}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Three Tiers */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[var(--text-muted)] mb-4">
              CHOOSE YOUR TIER
            </p>
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">
              Three Tiers. Every Stage.
            </h2>
            <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">
              Start free. Upgrade when it makes sense. Scale as you grow.
            </p>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reportTiers.map((tier) => (
              <StaggerItem key={tier.name} className="group">
                <Card variant="elevated" className="h-full hover:shadow-2xl transition-all duration-300 relative">
                  {tier.badge && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className={`px-4 py-1 bg-gradient-to-r ${tier.color} text-white text-xs font-semibold rounded-full shadow-lg`}>
                        {tier.badge}
                      </span>
                    </div>
                  )}
                  <CardHeader className="pt-8">
                    <CardTitle className="text-2xl text-[var(--text-primary)] mb-2">{tier.name}</CardTitle>
                    <p className="text-sm font-semibold text-[var(--text-secondary)] mb-3">{tier.subtitle}</p>
                    <CardDescription className="text-[var(--text-supporting)] leading-relaxed mb-6">
                      {tier.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <span className="text-green-500 mt-1">✓</span>
                          <span className="text-sm text-[var(--text-supporting)]">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-[var(--surface-faint)] rounded-lg mb-6">
                      <p className="text-xs font-semibold text-[var(--text-muted)] uppercase mb-1">Best for:</p>
                      <p className="text-sm text-[var(--text-secondary)]">{tier.bestFor}</p>
                    </div>
                    {tier.link.startsWith('http') ? (
                      <a href={tier.link} target="_blank" rel="noopener noreferrer" className="block">
                        <Button variant="primary" size="lg" className="w-full">
                          {tier.cta}
                        </Button>
                      </a>
                    ) : (
                      <Button
                        variant="primary"
                        size="lg"
                        className="w-full"
                        onClick={() => cta(tier.link, `explore_${tier.name.toLowerCase().replace(/\s+/g, '_')}`, { page: "/report-product" })}
                      >
                        {tier.cta}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 4D Intelligence Model */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">
              The 4D Intelligence Model (Report Tier)
            </h2>
            <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">
              Report delivers: <span className="font-semibold text-green-400">Full (1D + 2D)</span> + <span className="font-semibold text-blue-400">Limited (3D + 4D)</span>
            </p>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {fourDimensions.map((dim) => (
              <StaggerItem key={dim.dimension}>
                <Card variant="elevated" className="h-full hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="text-center mb-4">
                      <div className={`inline-flex w-16 h-16 bg-gradient-to-br ${dim.color} rounded-full items-center justify-center text-white mb-3 shadow-lg`}>
                        <SundaeIcon name={dim.icon} size="xl" className="text-white" />
                      </div>
                      <div className="text-3xl font-bold text-[var(--text-primary)] mb-1">{dim.dimension}</div>
                      <CardTitle className="text-lg text-[var(--text-primary)] mb-2">{dim.title}</CardTitle>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${dim.status.includes('Full') ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>
                        {dim.status}
                      </span>
                    </div>
                    <CardDescription className="text-[var(--text-supporting)] leading-relaxed text-center text-sm">
                      {dim.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* When to Upgrade */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">
              When to Move from Report to Core
            </h2>
            <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">
              Signs you&apos;re ready for real-time intelligence
            </p>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {upgradeSignals.map((signal) => (
              <StaggerItem key={signal.title}>
                <div className="flex items-start space-x-4 p-6 bg-[var(--navy-deep)] rounded-xl hover:shadow-md transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl flex items-center justify-center flex-shrink-0">
                    <SundaeIcon name={signal.icon} size="lg" className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--text-primary)] mb-2">{signal.title}</h3>
                    <p className="text-sm text-[var(--text-supporting)] leading-relaxed">{signal.description}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <div className="text-center">
            <Button
              variant="primary"
              size="lg"
              onClick={() => cta("/core", "explore_core_upgrade", { page: "/report-product" })}
            >
              Compare Report vs Core →
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-4xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">
              Frequently Asked Questions
            </h2>
          </FadeUp>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <FadeUp key={index} delay={index * 0.05}>
                <div className="p-6 bg-[var(--surface-faint)] rounded-xl">
                  <h3 className="font-semibold text-[var(--text-primary)] mb-3">{faq.q}</h3>
                  <p className="text-[var(--text-supporting)] leading-relaxed">{faq.a}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              onClick={() => cta("/faq", "see_more_faqs", { page: "/report-product" })}
            >
              See More FAQs →
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <PageCTA
        title="Start in Under Two Minutes"
        description="Upload your data, see your benchmark. That's it."
      >
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StaggerItem className="p-6 border border-[var(--border-default)] rounded-xl">
              <div className="w-10 h-10 mx-auto mb-3 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <SundaeIcon name="success" size="lg" className="text-white" />
              </div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-2 text-center">Start Free</h3>
              <p className="text-sm text-[var(--text-muted)] mb-4 text-center">Upload CSV, get instant benchmark</p>
              <Button
                variant="primary"
                size="md"
                className="w-full"
                onClick={() => cta(REPORT_APP_URL, "start_free_final_cta", { page: "/report-product" })}
              >
                Start Free →
              </Button>
            </StaggerItem>
            <StaggerItem className="p-6 border border-[var(--border-default)] rounded-xl">
              <div className="w-12 h-12 bg-[#1C47FF] rounded-full flex items-center justify-center mx-auto mb-3">
                <SundaeIcon name="chart" size="lg" className="text-white" />
              </div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-2 text-center">Explore Tiers</h3>
              <p className="text-sm text-[var(--text-muted)] mb-4 text-center">See Plus and Pro capabilities</p>
              <Button variant="outline" size="md" className="w-full" href={PRICING_URL}>
                Compare Tiers →
              </Button>
            </StaggerItem>
            <StaggerItem className="p-6 border border-[var(--border-default)] rounded-xl">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <SundaeIcon name="visibility" size="lg" className="text-white" />
              </div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-2 text-center">Book a Demo</h3>
              <p className="text-sm text-[var(--text-muted)] mb-4 text-center">See Report with your data</p>
              <Button
                variant="outline"
                size="md"
                className="w-full"
                onClick={() => cta("/demo", "book_demo_from_report", { page: "/report-product" })}
              >
                Book Demo →
              </Button>
            </StaggerItem>
          </StaggerContainer>
      </PageCTA>
    </div>
  );
}
