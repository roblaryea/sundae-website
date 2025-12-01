'use client';

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";

export default function ResourcesPage() {
  const caseStudies: { segment: string; challenge: string; description: string; solution: string[]; outcomes: { metric: string; value: string }[]; icon: SundaeIconName; color: string }[] = [
    {
      segment: "Multi-Brand Restaurant Group · GCC",
      challenge: "Labor Cost Variance",
      description: "35-location restaurant group struggled with 18% labor cost variance across locations with no visibility into root causes or scheduling efficiency.",
      solution: ["Sundae Canvas for real-time labor dashboards", "Sundae Insights for turnover and scheduling alerts", "Sundae Report for labor benchmarking"],
      outcomes: [
        { metric: "Labor cost reduction", value: "5%" },
        { metric: "Scheduling efficiency", value: "+12%" },
        { metric: "Decision speed", value: "3x faster" }
      ],
      icon: "franchise",
      color: "bg-blue-600"
    },
    {
      segment: "Global Franchise · 150+ Locations",
      challenge: "Menu Pricing & Margin Erosion",
      description: "International franchise operator facing 8% food cost variance across regions with delayed insights on pricing effectiveness and discount abuse.",
      solution: ["Sundae Nexus for instant pricing analysis", "Sundae Canvas for margin tracking", "Sundae Report for category benchmarks"],
      outcomes: [
        { metric: "Margin improvement", value: "+3.2%" },
        { metric: "Discount abuse detected", value: "Early" },
        { metric: "Pricing decisions", value: "Real-time" }
      ],
      icon: "multiLocation",
      color: "bg-green-600"
    },
    {
      segment: "Cloud Kitchen Operator · Multi-City",
      challenge: "Operational Blind Spots",
      description: "Fast-growing cloud kitchen network with fragmented data across 8 delivery platforms, unable to unify performance metrics or detect vendor issues.",
      solution: ["Sundae Scout for data integration", "Sundae Insights for delivery performance tracking", "Sundae Canvas for unified dashboards"],
      outcomes: [
        { metric: "Data unification", value: "8 platforms" },
        { metric: "Issue detection", value: "48hrs faster" },
        { metric: "Revenue optimization", value: "+6%" }
      ],
      icon: "kitchen",
      color: "bg-orange-600"
    },
    {
      segment: "Enterprise Hospitality Group · Regional",
      challenge: "Market Positioning",
      description: "Hospitality operator with limited visibility into competitor pricing, category trends, and market share across 22 locations in competitive markets.",
      solution: ["Sundae Watchtower for market intelligence", "Sundae Report for competitive benchmarking", "Sundae Nexus for market analysis"],
      outcomes: [
        { metric: "Market share growth", value: "+2.3%" },
        { metric: "Competitive response time", value: "Days → Hours" },
        { metric: "Pricing optimization", value: "+4%" }
      ],
      icon: "benchmarking",
      color: "bg-purple-600"
    }
  ];

  const tools: { name: string; description: string; icon: SundaeIconName; link: string }[] = [
    {
      name: "Labor Cost % Calculator",
      description: "Calculate your labor cost percentage and see if you're on target compared to industry standards.",
      icon: "labor",
      link: "/tools/labor-cost"
    },
    {
      name: "Menu Item Margin Calculator",
      description: "Analyze menu item profitability with margin calculations and pricing recommendations.",
      icon: "menu",
      link: "/tools/menu-margin"
    },
    {
      name: "Break-Even Covers Calculator",
      description: "Calculate how many covers you need to break even based on fixed and variable costs.",
      icon: "balance",
      link: "/tools/breakeven-covers"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span>📚</span>
            <span>Resources & Tools</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Restaurant Intelligence Resources
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto">
            Access guides, reports, and tools to help you make smarter decisions for your restaurant business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo">
              <Button variant="primary" size="lg">
                Get Started with Sundae
              </Button>
            </Link>
            <Link href="/report">
              <Button variant="outline" size="lg">
                Get Free Benchmark Report
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Case Studies
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              See how operators use Sundae to improve performance, margins, and decision-making
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              Representative examples based on real operator challenges; specific client names omitted.
            </p>
          </div>

          <div className="space-y-12">
            {caseStudies.map((study, index) => (
              <Card key={index} variant="elevated" className="hover:shadow-2xl transition-all duration-300 dark:bg-gray-800">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-3 gap-8">
                    {/* Left: Challenge */}
                    <div>
                      <div className="flex items-center space-x-3 mb-4">
                        <div className={`w-12 h-12 ${study.color} rounded-lg flex items-center justify-center text-white`}>
                          <SundaeIcon name={study.icon} size="lg" className="text-white" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase">Segment</div>
                          <div className="font-semibold text-gray-900 dark:text-white">{study.segment}</div>
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Challenge:</div>
                        <div className="text-lg font-bold text-gray-900 dark:text-white mb-2">{study.challenge}</div>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{study.description}</p>
                      </div>
                    </div>

                    {/* Middle: Solution */}
                    <div>
                      <div className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">Sundae Solution:</div>
                      <ul className="space-y-2">
                        {study.solution.map((item, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <span className="text-blue-600 mt-1">•</span>
                            <span className="text-gray-700 dark:text-gray-300">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Right: Outcomes */}
                    <div>
                      <div className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">Outcomes:</div>
                      <div className="space-y-3">
                        {study.outcomes.map((outcome, idx) => (
                          <div key={idx} className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                            <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">{outcome.value}</div>
                            <div className="text-sm text-gray-700 dark:text-gray-300">{outcome.metric}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Links to Products */}
          <div className="mt-16 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-6">Explore the products used in these case studies:</p>
            <div className="flex flex-wrap gap-4 justify-center">
              {[
                { name: "Sundae Report", href: "/report" },
                { name: "Sundae Nexus", href: "/nexus" },
                { name: "Sundae Insights", href: "/insights" },
                { name: "Sundae Canvas", href: "/canvas" }
              ].map((product) => (
                <Link key={product.name} href={product.href}>
                  <Button variant="outline" size="sm">
                    {product.name} →
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section - CTA to dedicated tools page */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-4xl mb-6">🛠️</div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Free Tools & Calculators
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Try Sundae's free calculators for labor costs, menu margins, benchmark readiness, and more.
          </p>
          <Link href="/tools">
            <Button variant="primary" size="lg">
              Explore All Tools →
            </Button>
          </Link>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-deep-blue to-electric-blue text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Stay Updated
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Get the latest restaurant industry insights, benchmarks, and decision intelligence trends delivered to your inbox.
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Subscribe
              </Button>
            </div>
            <p className="text-xs opacity-75 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Restaurant?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of restaurant operators who use Sundae to make smarter, data-driven decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo">
              <Button variant="primary" size="lg">
                Book a Demo
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
