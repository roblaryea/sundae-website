'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Accordion } from '@/components/ui/Accordion';
import { SundaeIcon, type SundaeIconName } from '@/components/icons';
import { PRICING_URL, SIGNUP_URL } from '@/lib/urls';
import { PageHero, FadeUp, StaggerContainer, StaggerItem, PageCTA } from '@/components/ui/PageAnimations';

type Tier = {
  name: string;
  badge?: string;
  badgeClass?: string;
  basePrice: string;
  perLocation: string;
  aiCredits: string;
  description: string;
  features: string[];
  cta: string;
  ctaLink: string;
  highlight?: boolean;
};

const reportTiers: Tier[] = [
  {
    name: "Report Lite",
    badge: "FREE FOREVER",
    badgeClass: "bg-green-100 text-green-800",
    basePrice: "$0",
    perLocation: "$0",
    aiCredits: "250",
    description: "Upload your POS data and get instant benchmarking. No credit card required.",
    features: [
      "Manual CSV upload",
      "5 core performance metrics",
      "Anonymous peer benchmarking",
      "90-day historical access",
      "Email support (72-hour response)"
    ],
    cta: "Start Free",
    ctaLink: "/report"
  },
  {
    name: "Report Plus",
    badge: "POPULAR",
    badgeClass: "bg-orange-100 text-orange-800",
    basePrice: "$79",
    perLocation: "$39",
    aiCredits: "1,200",
    description: "AI-parsed data ingestion with deeper analysis and monthly intelligence summaries.",
    features: [
      "AI-parsed uploads (PDF, Excel, screenshots)",
      "~30 comprehensive visuals",
      "Monthly intelligence summaries",
      "Comparable period views (WoW/MoM/YoY)",
      "1-year historical access",
      "Email + Chat support (24-hour response)"
    ],
    cta: "Get Started",
    ctaLink: "/demo",
    highlight: true
  },
  {
    name: "Report Pro",
    basePrice: "$159",
    perLocation: "$59",
    aiCredits: "3,500",
    description: "Automated daily ingestion with advanced AI insights and team collaboration.",
    features: [
      "Daily automated data sync",
      "~80 comprehensive visuals",
      "Weekly intelligence summaries",
      "Shareable charts + team collaboration",
      "2-year historical access",
      "Priority support (12-hour response)"
    ],
    cta: "Get Started",
    ctaLink: "/demo"
  }
];

const coreTiers: Tier[] = [
  {
    name: "Core Lite",
    basePrice: "$279",
    perLocation: "$79",
    aiCredits: "8,000",
    description: "Real-time operational intelligence with 15-minute data refresh cycles.",
    features: [
      "Everything in Report Pro",
      "15-minute data refresh",
      "POS API integration",
      "Pulse intraday monitoring",
      "Smart alerts & anomaly detection",
      "Sundae Intelligence (Chat + Monitor)",
      "Watchtower external intelligence",
      "Chat support (4-hour response)"
    ],
    cta: "Get Started",
    ctaLink: "/demo"
  },
  {
    name: "Core Pro",
    badge: "MOST POPULAR",
    badgeClass: "bg-blue-100 text-blue-800",
    basePrice: "$449",
    perLocation: "$89",
    aiCredits: "14,000",
    description: "Full intelligence stack with 5-minute refresh, multi-POS support, and advanced modules.",
    features: [
      "Everything in Core Lite",
      "5-minute data refresh",
      "Multi-POS support across locations",
      "AI playbooks & automated workflows",
      "Sundae Intelligence (all modes)",
      "Benchmarks & market intelligence",
      "Watchtower external intelligence",
      "Priority phone support (2-hour response)"
    ],
    cta: "Get Started",
    ctaLink: "/demo",
    highlight: true
  }
];

function PricingCard({ tier, annual }: { tier: Tier; annual: boolean }) {
  const baseNum = parseInt(tier.basePrice.replace(/\$|,/g, ''));
  const locNum = parseInt(tier.perLocation.replace(/\$|,/g, ''));
  const displayBase = baseNum === 0 ? "$0" : annual ? `$${Math.round(baseNum * 0.9)}` : tier.basePrice;
  const displayLoc = locNum === 0 ? "$0" : annual ? `$${Math.round(locNum * 0.9)}` : tier.perLocation;

  return (
    <Card className={`h-full ${tier.highlight ? 'border-2 border-slate-900 shadow-2xl' : 'border border-slate-200 shadow-lg'} hover:shadow-xl transition-all`}>
      <CardHeader className="pb-4">
        {tier.badge && (
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-3 w-fit ${tier.badgeClass}`}>
            {tier.badge}
          </div>
        )}
        <CardTitle className="text-xl text-slate-900 mb-2">{tier.name}</CardTitle>
        <div className="mb-3">
          <span className="text-4xl font-bold text-slate-900">{displayBase}</span>
          {baseNum > 0 && <span className="text-slate-500 text-sm">/month</span>}
        </div>
        {locNum > 0 && (
          <p className="text-sm text-slate-600">
            + {displayLoc}/location/month
          </p>
        )}
        <CardDescription className="text-slate-600 mt-3 text-sm">
          {tier.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="mb-4 pb-4 border-b border-slate-100">
          <p className="text-xs text-slate-500">
            {tier.aiCredits} AI credits/month
          </p>
        </div>
        <ul className="space-y-2.5 mb-6">
          {tier.features.map((feature, index) => (
            <li key={index} className="flex items-start space-x-2.5">
              <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-slate-700">{feature}</span>
            </li>
          ))}
        </ul>
        <Link href={tier.ctaLink}>
          <Button
            variant={tier.highlight ? "primary" : "outline"}
            size="lg"
            className="w-full"
          >
            {tier.cta}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <PageHero
        badge="Pricing"
        title="Simple, Transparent Pricing"
        description="Start free with Report. Scale to real-time intelligence with Core. Every plan includes Sundae Intelligence AI credits."
      >
        {/* Billing Toggle */}
        <div className="flex items-center justify-center space-x-4">
          <span className={`text-sm font-medium ${!annual ? 'text-white' : 'text-white/50'}`}>Monthly</span>
          <button
            onClick={() => setAnnual(!annual)}
            className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors ${annual ? 'bg-white' : 'bg-white/30'}`}
          >
            <span className={`inline-block h-5 w-5 transform rounded-full bg-slate-950 shadow-sm transition-transform ${annual ? 'translate-x-8' : 'translate-x-1'}`} />
          </button>
          <span className={`text-sm font-medium ${annual ? 'text-white' : 'text-white/50'}`}>
            Annual <span className="text-green-400 font-semibold">(Save 10%)</span>
          </span>
        </div>
      </PageHero>

      {/* Sundae Report Tiers */}
      <section className="pb-16 pt-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 px-5 py-2 rounded-full text-sm font-semibold">
                <SundaeIcon name="report" size="md" />
                <span>Sundae Report — Historical Analysis & Benchmarking</span>
              </div>
            </div>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {reportTiers.map((tier) => (
              <StaggerItem key={tier.name}>
                <PricingCard tier={tier} annual={annual} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Sundae Core Tiers */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-5 py-2 rounded-full text-sm font-semibold">
                <SundaeIcon name="core" size="md" />
                <span>Sundae Core — Real-Time Operations & Predictive Intelligence</span>
              </div>
            </div>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {coreTiers.map((tier) => (
              <StaggerItem key={tier.name}>
                <PricingCard tier={tier} annual={annual} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Enterprise */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <FadeUp>
            <Card className="border-2 border-slate-900 shadow-2xl bg-gradient-to-br from-white to-blue-50/30">
              <CardContent className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="inline-flex items-center space-x-2 bg-slate-900/10 text-slate-900 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                      <SundaeIcon name="franchise" size="md" />
                      <span>Enterprise</span>
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-4">
                      Custom Pricing for Large Operations
                    </h3>
                    <p className="text-slate-600 mb-6">
                      For multi-location groups that need white-label, SSO, custom SLAs, and dedicated support. 50,000+ AI credits included.
                    </p>
                    <Link href="/demo">
                      <Button variant="primary" size="lg" className="px-8">
                        Contact Sales
                      </Button>
                    </Link>
                  </div>
                  <div>
                    <ul className="space-y-3">
                      {[
                        "Everything in Core Pro",
                        "Custom data refresh (real-time available)",
                        "Multi-brand rollups & cross-region benchmarking",
                        "SSO/SAML integration",
                        "White-label & partner solutions",
                        "Role-based access with audit trails",
                        "Dedicated Customer Success Manager",
                        "24/7 support with contractual SLAs",
                        "Custom historical access (5+ years)",
                        "Unlimited AI credits & custom dashboards"
                      ].map((feature, index) => (
                        <li key={index} className="flex items-start space-x-2.5">
                          <svg className="w-4 h-4 text-slate-900 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm text-slate-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeUp>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="text-center mb-10">
              <h2 className="section-h2 text-slate-900 mb-4">Add-Ons</h2>
              <p className="body-lg text-slate-700 max-w-3xl mx-auto">
                Extend your plan with specialized intelligence modules
              </p>
            </div>
          </FadeUp>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {([
              {
                name: "Watchtower",
                description: "External intelligence — competitor tracking, weather impact, event calendar, and AI briefings.",
                note: "Requires Core tier",
                icon: "watchtower" as SundaeIconName,
                color: "from-red-500 to-red-600"
              },
              {
                name: "Specialized Modules",
                description: "12 specialized modules including Revenue, Labor, Inventory, Purchasing, Marketing, Reservations, Profit, Revenue Assurance, Delivery, Guest Experience, Guest CRM, and Cross-Intelligence.",
                note: "Requires Core tier. Priced per module.",
                icon: "data" as SundaeIconName,
                color: "from-purple-500 to-purple-600"
              },
              {
                name: "Cross-Intelligence",
                description: "Auto-unlocking correlation engine that surfaces hidden connections across modules. Base free at 3+ modules; Pro adds full attribution & cannibalization detection.",
                note: "Requires Core tier with 3+ modules. Pro: $199/mo + $19/loc",
                icon: "crossIntelligence" as SundaeIconName,
                color: "from-purple-500 to-cyan-600"
              },
              {
                name: "AI Credit Top-Ups",
                description: "Need more AI-powered queries? Purchase additional AI credits as add-ons to any plan.",
                note: "Available on all tiers",
                icon: "intelligence" as SundaeIconName,
                color: "from-blue-500 to-blue-600"
              }
            ]).map((addon, index) => (
              <StaggerItem key={index}>
                <Card variant="elevated" className="h-full hover:shadow-xl transition-all">
                  <CardHeader>
                    <div className={`w-12 h-12 bg-gradient-to-br ${addon.color} rounded-lg flex items-center justify-center mb-4`}>
                      <SundaeIcon name={addon.icon} size="lg" className="text-white" />
                    </div>
                    <CardTitle className="text-lg text-slate-900 mb-2">{addon.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 mb-3">{addon.description}</p>
                    <p className="text-xs text-slate-500 font-medium">{addon.note}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeUp delay={0.3}>
            <div className="text-center mt-8">
              <a href={PRICING_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg">
                  See Detailed Pricing Calculator
                </Button>
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <FadeUp>
            <div className="text-center mb-12">
              <h2 className="section-h2 text-slate-900 mb-4">
                Common Questions
              </h2>
              <p className="body-lg text-slate-700">
                Clear answers. No fine print.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.15}>
            <Accordion
              items={[
                {
                  title: "What happens after the free period?",
                  content: "Report Lite is free forever — no trial, no expiration. When you're ready for more, upgrade to any paid tier. No lock-in, cancel anytime."
                },
                {
                  title: "How do you count a location?",
                  content: "A location is one physical restaurant address. Multiple brands under the same roof still count as one location."
                },
                {
                  title: "What's the difference between Report and Core?",
                  content: "Report analyzes historical POS data you upload — great for understanding what happened. Core connects via API for near real-time intelligence with Pulse monitoring, alerts, playbooks, and predictive AI — built for operators who need to act now."
                },
                {
                  title: "Do you support multi-brand and multi-location groups?",
                  content: "Yes. Core Pro handles multi-POS environments, and Enterprise adds cross-brand rollups, regional benchmarking, RBAC, and governance features."
                },
                {
                  title: "Is there a discount for annual billing?",
                  content: "Yes — save 10% with annual billing on all paid tiers. Toggle the billing switch above to see annual pricing."
                },
                {
                  title: "Is my data private and secure?",
                  content: "Your data stays yours. We secure data in transit and at rest using industry-standard protections, enforce strict access controls, and use anonymized, aggregated benchmarking where applicable. Enterprise includes SOC 2 Type II compliance."
                },
                {
                  title: "Can I change plans later?",
                  content: "Absolutely. Many teams start with Report and upgrade as they scale. Switching plans is straightforward — all historical data is preserved."
                }
              ]}
              defaultOpenIndex={0}
            />
          </FadeUp>
        </div>
      </section>

      {/* CTA Section */}
      <PageCTA
        title="Ready to Get Started?"
        description="Start free, upgrade when you're ready. No credit card required."
      >
        <Link href="/demo">
          <Button
            variant="primary"
            size="lg"
            className="bg-white text-slate-900 hover:bg-slate-100"
          >
            Book a Demo
          </Button>
        </Link>
        <Link href={SIGNUP_URL}>
          <Button
            variant="outline-light"
            size="lg"
          >
            Start Free
          </Button>
        </Link>
      </PageCTA>
    </div>
  );
}
