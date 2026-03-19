'use client';

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { useCta } from "@/lib/cta";
import { REPORT_APP_URL, PRICING_URL } from "@/lib/urls";
import { PageHero, PageCTA, FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/PageAnimations";

export default function GettingStartedPage() {
  const cta = useCta();

  const steps = [
    {
      number: 1,
      title: "Start Free (Report Lite)",
      subtitle: "Prove the value. Pay nothing.",
      description: "Upload your POS data and get instant benchmarking. No credit card required. See where you stand against similar restaurants within minutes.",
      actions: [
        "Upload POS data (CSV format)",
        "Instant benchmark against peers",
        "Identify top 3 opportunities",
        "Build internal business case"
      ],
      timeline: "Instant",
      cta: "Start Free",
      ctaLink: "/report",
      icon: "report" as SundaeIconName,
      color: "from-blue-500 to-blue-600"
    },
    {
      number: 2,
      title: "Understand Your Baseline",
      subtitle: "See where you stand vs peers.",
      description: "Use Report Lite to understand your performance across 5 core metrics. Compare against restaurants like yours. Build the case for deeper intelligence.",
      actions: [
        "Benchmark sales per square foot",
        "Compare labor cost % to peers",
        "Identify margin opportunities",
        "Share insights with leadership"
      ],
      timeline: "1-2 weeks to build case",
      cta: "Learn About Report",
      ctaLink: "/report",
      icon: "benchmarking" as SundaeIconName,
      color: "from-purple-500 to-purple-600"
    },
    {
      number: 3,
      title: "Decide Upgrade Path",
      subtitle: "Report Plus/Pro or Core?",
      description: "Once you've proven the value with Report Lite, choose your upgrade path based on speed and depth needs.",
      actions: [
        "Need intelligent insights? \u2192 Report Plus/Pro",
        "Need operational speed? \u2192 Core",
        "Daily reports sufficient? \u2192 Report Plus/Pro",
        "10+ locations? \u2192 Core"
      ],
      timeline: "Report Plus/Pro: 1-2 days | Core: 1-2 weeks",
      cta: "Compare Options",
      ctaLink: "/report-vs-core",
      icon: "balance" as SundaeIconName,
      color: "from-green-500 to-green-600"
    },
    {
      number: 4,
      title: "Add Modules (Optional)",
      subtitle: "Go deeper where it matters most.",
      description: "Choose specialized modules based on your biggest operational pain points. Requires Core tier for real-time specialized intelligence.",
      actions: [
        "High labor cost? \u2192 Labor Intelligence",
        "High food cost/waste? \u2192 Inventory Intelligence",
        "Complex vendors? \u2192 Purchasing Intelligence",
        "Heavy marketing? \u2192 Marketing Intelligence",
        "Reservation-driven? \u2192 Reservations Intelligence"
      ],
      timeline: "1-2 weeks per module",
      cta: "Explore Modules",
      ctaLink: "/modules",
      icon: "network" as SundaeIconName,
      color: "from-orange-500 to-orange-600"
    },
    {
      number: 5,
      title: "Consider Watchtower (Optional)",
      subtitle: "Add external intelligence.",
      description: "See what's happening outside your four walls. Track competitors, predict demand from events, and understand market dynamics.",
      actions: [
        "Track up to 10 competitors per location",
        "Monitor pricing & promotions",
        "Predict demand from weather/events",
        "Strategic market intelligence"
      ],
      timeline: "1 week setup",
      cta: "Learn About Watchtower",
      ctaLink: "/product/watchtower",
      icon: "watchtower" as SundaeIconName,
      color: "from-indigo-500 to-indigo-600"
    },
    {
      number: 6,
      title: "Scale to Enterprise",
      subtitle: "100+ locations or custom needs.",
      description: "Custom refresh frequency, unlimited credits, white-label options, SSO, dedicated CSM, and 24/7 support with custom SLAs.",
      actions: [
        "Custom refresh frequency",
        "Unlimited credits & dashboards",
        "White-label & SSO",
        "Dedicated customer success manager",
        "24/7 support with custom SLAs"
      ],
      timeline: "2-4 weeks (custom implementation)",
      cta: "Contact Sales",
      ctaLink: "/contact",
      icon: "multiLocation" as SundaeIconName,
      color: "from-purple-500 to-pink-600"
    }
  ];

  const timelines = [
    { tier: "Report Lite", time: "Instant", description: "Upload CSV, get benchmark immediately" },
    { tier: "Report Plus/Pro", time: "1-2 Days", description: "Parsing setup & integration" },
    { tier: "Core Lite/Pro", time: "1-2 Weeks", description: "POS integration & real-time setup" },
    { tier: "Enterprise", time: "2-4 Weeks", description: "Custom implementation & training" }
  ];

  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      {/* Hero Section */}
      <PageHero
        badge="Getting Started Guide"
        title="Your Journey with Sundae"
        description="Six steps from free benchmarking to complete operational intelligence. Start small, scale at your pace."
      >
        <p className="body-lg text-[var(--text-muted)] mb-8 max-w-3xl mx-auto">
          Most operators start with Report Lite (free forever), prove the value, then expand. You control the timeline.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="primary"
            size="lg"
            onClick={() => cta(REPORT_APP_URL, "start_free_from_getting_started", { page: "/getting-started" })}
          >
            Start Free
          </Button>
          <a href={PRICING_URL} target="_blank" rel="noopener noreferrer">
            <Button variant="outline-light" size="lg">
              Calculate Your Path
            </Button>
          </a>
        </div>
      </PageHero>

      {/* 6-Step Journey */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">
              The Sundae Journey: 6 Steps
            </h2>
            <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">
              From free benchmarking to enterprise intelligence
            </p>
          </FadeUp>

          <div className="space-y-8">
            {steps.map((step, index) => (
              <FadeUp key={step.number} delay={index * 0.1}>
                <Card variant="elevated" className="overflow-hidden hover:shadow-2xl transition-all duration-300">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Step Number & Icon */}
                    <div className="lg:col-span-2 bg-[var(--surface-subtle)] p-6 flex flex-col items-center justify-center">
                      <div className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center text-white text-3xl font-bold mb-4 shadow-lg`}>
                        {step.number}
                      </div>
                      <div className={`w-14 h-14 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center`}>
                        <SundaeIcon name={step.icon} size="xl" className="text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-7 p-6">
                      <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">{step.title}</h3>
                      <p className="text-lg font-semibold text-[var(--text-supporting)] mb-4">{step.subtitle}</p>
                      <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">{step.description}</p>

                      <div className="bg-[var(--surface-faint)] rounded-lg p-4">
                        <p className="text-sm font-semibold text-[var(--text-muted)] uppercase mb-3">What You&apos;ll Do:</p>
                        <ul className="space-y-2">
                          {step.actions.map((action, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <span className="text-green-400 mt-0.5">&#10003;</span>
                              <span className="text-sm text-[var(--text-secondary)]">{action}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Timeline & CTA */}
                    <div className="lg:col-span-3 bg-[var(--surface-subtle)] p-6 flex flex-col justify-between">
                      <div>
                        <p className="text-xs font-semibold text-[var(--text-muted)] uppercase mb-2">Timeline</p>
                        <p className="text-lg font-bold text-[var(--text-primary)] mb-6">{step.timeline}</p>
                      </div>

                      {step.ctaLink.startsWith('http') ? (
                        <a href={step.ctaLink} target="_blank" rel="noopener noreferrer" className="block">
                          <Button variant="primary" size="lg" className="w-full">
                            {step.cta} &rarr;
                          </Button>
                        </a>
                      ) : (
                        <Button
                          variant="primary"
                          size="lg"
                          className="w-full"
                          onClick={() => cta(step.ctaLink, `step_${step.number}_cta`, { page: "/getting-started" })}
                        >
                          {step.cta} &rarr;
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Timelines */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">
              Implementation Timelines
            </h2>
            <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">
              How long does each tier take to implement?
            </p>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {timelines.map((timeline) => (
              <StaggerItem key={timeline.tier}>
                <Card variant="elevated" className="h-full text-center hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg text-[var(--text-primary)] mb-2">{timeline.tier}</CardTitle>
                    <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                      {timeline.time}
                    </div>
                    <CardDescription className="text-[var(--text-supporting)]">
                      {timeline.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeUp>
            <div className="mt-12 bg-[var(--surface-subtle)] border border-[var(--border-default)] rounded-xl p-8 text-center">
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">No Forced Timelines</h3>
              <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
                Start with Report Lite today. Upgrade to Report Plus/Pro next month. Add Core in Q3. Scale to Enterprise in Q4. You control the pace based on your priorities and budget.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Decision Framework */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">
              Common Journeys
            </h2>
            <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">
              How do operators typically progress through Sundae?
            </p>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Small Operator Journey */}
            <StaggerItem>
              <Card variant="elevated" className="hover:shadow-xl transition-all duration-300 h-full">
                <CardHeader>
                  <div className="w-12 h-12 bg-[#1C47FF] rounded-xl flex items-center justify-center mb-4">
                    <SundaeIcon name="labor" size="lg" className="text-white" />
                  </div>
                  <CardTitle className="text-xl text-[var(--text-primary)] mb-4">1-5 Location Operator</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
                      <p className="text-sm text-[var(--text-secondary)]">Start with Report Lite (free)</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-500/20 text-purple-400 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
                      <p className="text-sm text-[var(--text-secondary)]">Upgrade to Report Plus for deeper insights</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
                      <p className="text-sm text-[var(--text-secondary)]">Consider Core when scaling to 10+ locations</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>

            {/* Mid-Size Operator Journey */}
            <StaggerItem>
              <Card variant="elevated" className="hover:shadow-xl transition-all duration-300 h-full border border-purple-500/30">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-4">
                    <SundaeIcon name="multiLocation" size="lg" className="text-white" />
                  </div>
                  <CardTitle className="text-xl text-[var(--text-primary)] mb-4">10-50 Location Operator</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-500/20 text-purple-400 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
                      <p className="text-sm text-[var(--text-secondary)]">Start with Core Lite for real-time ops</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-orange-500/20 text-orange-400 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
                      <p className="text-sm text-[var(--text-secondary)]">Add 1-2 modules (Labor, Inventory)</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-indigo-500/20 text-indigo-400 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
                      <p className="text-sm text-[var(--text-secondary)]">Add Watchtower for market intelligence</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>

            {/* Enterprise Journey */}
            <StaggerItem>
              <Card variant="elevated" className="hover:shadow-xl transition-all duration-300 h-full">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-4">
                    <SundaeIcon name="growth" size="lg" className="text-white" />
                  </div>
                  <CardTitle className="text-xl text-[var(--text-primary)] mb-4">100+ Location Enterprise</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-500/20 text-purple-400 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
                      <p className="text-sm text-[var(--text-secondary)]">Start with Enterprise tier</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-pink-500/20 text-pink-400 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
                      <p className="text-sm text-[var(--text-secondary)]">Full module suite + Watchtower</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-500/20 text-purple-400 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
                      <p className="text-sm text-[var(--text-secondary)]">Custom integrations & white-label</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Final CTA */}
      <PageCTA
        title="Ready to Start Your Journey?"
        description="Begin with Report Lite (free forever) or calculate your custom path with the pricing calculator."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
          <div className="p-6 bg-[var(--surface-faint)] border border-[var(--border-default)] rounded-xl">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <SundaeIcon name="report" size="lg" className="text-white" />
            </div>
            <h3 className="font-semibold text-[var(--text-primary)] mb-2 text-center">Start Free</h3>
            <p className="text-sm text-[var(--text-supporting)] mb-4 text-center">Report Lite, no credit card</p>
            <Button
              variant="primary"
              size="md"
              className="w-full"
              onClick={() => cta(REPORT_APP_URL, "start_free_from_getting_started_bottom", { page: "/getting-started" })}
            >
              Start Free &rarr;
            </Button>
          </div>
          <div className="p-6 bg-[var(--surface-faint)] border border-[var(--border-default)] rounded-xl">
            <div className="w-12 h-12 bg-[#1C47FF] rounded-full flex items-center justify-center mx-auto mb-3">
              <SundaeIcon name="calculator" size="lg" className="text-white" />
            </div>
            <h3 className="font-semibold text-[var(--text-primary)] mb-2 text-center">Calculate Your Path</h3>
            <p className="text-sm text-[var(--text-supporting)] mb-4 text-center">Interactive pricing calculator</p>
            <a href={PRICING_URL} target="_blank" rel="noopener noreferrer" className="block">
              <Button variant="outline-light" size="md" className="w-full">
                Calculate Pricing &rarr;
              </Button>
            </a>
          </div>
          <div className="p-6 bg-[var(--surface-faint)] border border-[var(--border-default)] rounded-xl">
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <SundaeIcon name="conversation" size="lg" className="text-white" />
            </div>
            <h3 className="font-semibold text-[var(--text-primary)] mb-2 text-center">Talk to an Expert</h3>
            <p className="text-sm text-[var(--text-supporting)] mb-4 text-center">Custom recommendations</p>
            <Button
              variant="outline-light"
              size="md"
              className="w-full"
              onClick={() => cta("/demo", "book_demo_from_getting_started", { page: "/getting-started" })}
            >
              Book Demo &rarr;
            </Button>
          </div>
        </div>
      </PageCTA>
    </div>
  );
}
