import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { PageHero, PageCTA, FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/PageAnimations";
import { PRICING_URL } from "@/lib/links";

export default function SundaeReportPage() {
  const benchmarkCategories: { name: string; metrics: string[]; icon: SundaeIconName; color: string }[] = [
    {
      name: "Sales Performance",
      metrics: ["Revenue per Square Foot", "Average Check Size", "Daily Transaction Count", "Peak Hour Analysis"],
      icon: "finance",
      color: "bg-green-500"
    },
    {
      name: "Labor Efficiency",
      metrics: ["Labor Cost %", "Sales per Labor Hour", "Staff Productivity", "Overtime Trends"],
      icon: "labor",
      color: "bg-blue-500"
    },
    {
      name: "Food Cost Management",
      metrics: ["Food Cost %", "Waste Percentage", "Inventory Turnover", "COGS Analysis"],
      icon: "decrease",
      color: "bg-orange-500"
    },
    {
      name: "Operational Metrics",
      metrics: ["Table Turn Time", "Order Accuracy", "Customer Satisfaction", "Speed of Service"],
      icon: "speed",
      color: "bg-purple-500"
    }
  ];

  const howItWorks: { step: number; title: string; description: string; icon: SundaeIconName }[] = [
    {
      step: 1,
      title: "Upload Your Data",
      description: "Securely connect your POS system or upload sales, labor, and cost data.",
      icon: "benchmarking"
    },
    {
      step: 2,
      title: "Instant Analysis",
      description: "Our engine compares your performance against similar restaurants automatically.",
      icon: "intelligence"
    },
    {
      step: 3,
      title: "Get Insights",
      description: "Receive actionable recommendations to improve your key metrics.",
      icon: "insights"
    }
  ];

  const sampleInsights = [
    {
      category: "Labor Cost Alert",
      insight: "Your labor cost is 8% above similar restaurants.",
      recommendation: "Consider optimizing staff scheduling during 2-4 PM.",
      impact: "Potential savings: $2,400/month"
    },
    {
      category: "Sales Opportunity",
      insight: "Weekday lunch revenue 15% below market average.",
      recommendation: "Target lunch promotions for office workers nearby.",
      impact: "Potential increase: $1,800/month"
    },
    {
      category: "Food Cost Variance",
      insight: "Food waste 3.2% higher than benchmark.",
      recommendation: "Implement portion control training.",
      impact: "Potential savings: $950/month"
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      {/* Hero */}
      <PageHero
        badge="Free Restaurant Benchmarking"
        title="Sundae Report"
        description="Get a free benchmarking report comparing your restaurant's performance against industry standards. See exactly where you stand and what to improve."
      >
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/demo">
            <Button variant="primary" size="lg">
              Generate Free Report
            </Button>
          </Link>
          <Link href="/product">
            <Button variant="outline-light" size="lg">
              Learn About Sundae Core
            </Button>
          </Link>
        </div>
      </PageHero>

      {/* Benchmark Categories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">
              See How You Compare
            </h2>
            <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">
              Benchmark your restaurant across key performance categories against similar businesses
            </p>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benchmarkCategories.map((category) => (
              <StaggerItem key={category.name}>
                <Card variant="elevated" className="hover:scale-105 transition-transform duration-300">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center`}>
                        <SundaeIcon name={category.icon} size="lg" className="text-white" />
                      </div>
                      <CardTitle className="text-[var(--text-primary)]">{category.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {category.metrics.map((metric, metricIndex) => (
                        <li key={metricIndex} className="text-sm text-[var(--text-supporting)] flex items-center">
                          <div className="w-2 h-2 bg-[var(--text-muted)] rounded-full mr-2"></div>
                          {metric}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">
              How It Works
            </h2>
            <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">
              Get your free benchmarking report in minutes, not days
            </p>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step) => (
              <StaggerItem key={step.step}>
                <Card variant="elevated" className="text-center">
                  <CardHeader>
                    <div className="w-16 h-16 bg-[var(--surface-subtle)] rounded-full flex items-center justify-center mx-auto mb-4">
                      <SundaeIcon name={step.icon} size="xl" className="text-white" />
                    </div>
                    <div className="text-sm text-[#60A5FA] font-medium mb-2">Step {step.step}</div>
                    <CardTitle className="text-[var(--text-primary)]">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-[var(--text-supporting)]">
                      {step.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Sample Insights */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">
              Sample Insights You&apos;ll Get
            </h2>
            <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">
              Real examples of actionable insights from our benchmarking reports
            </p>
          </FadeUp>

          <div className="space-y-6 max-w-4xl mx-auto">
            {sampleInsights.map((insight, index) => (
              <FadeUp key={index} delay={index * 0.1}>
                <Card variant="elevated">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <CardTitle className="text-[var(--text-primary)] text-lg">{insight.category}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm font-medium text-[var(--text-secondary)] mb-1">What we found:</div>
                        <p className="text-[var(--text-supporting)]">{insight.insight}</p>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-[var(--text-secondary)] mb-1">Recommendation:</div>
                        <p className="text-[var(--text-supporting)]">{insight.recommendation}</p>
                      </div>
                      <div className="bg-green-500/10 rounded-lg p-3">
                        <div className="text-sm font-medium text-green-400 mb-1">Potential Impact:</div>
                        <p className="text-green-400 font-medium">{insight.impact}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Why Free? */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-4xl mx-auto text-center">
          <FadeUp>
            <h2 className="section-h2 text-[var(--text-primary)] mb-6">
              Why Free?
            </h2>
            <p className="body-xl text-[var(--text-supporting)] mb-8">
              We believe every restaurant should understand how they&apos;re performing. Our free report gives you
              a taste of the decision intelligence that powers Sundae Core.
            </p>
          </FadeUp>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {[
              { title: "Identify Opportunities", desc: "Spot areas where you can improve immediately", icon: "marketing" as SundaeIconName },
              { title: "Benchmark Performance", desc: "See how you stack up against similar restaurants", icon: "benchmarking" as SundaeIconName },
              { title: "Get Actionable Insights", desc: "Receive specific recommendations to improve", icon: "intelligence" as SundaeIconName },
            ].map((item, index) => (
              <StaggerItem key={index}>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 bg-[var(--surface-subtle)] rounded-lg flex items-center justify-center">
                    <SundaeIcon name={item.icon} size="lg" className="text-white" />
                  </div>
                  <h3 className="font-semibold text-[var(--text-primary)] mb-2">{item.title}</h3>
                  <p className="text-sm text-[var(--text-supporting)]">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <PageCTA
        title="Ready to See Your Benchmarks?"
        description="Join thousands of restaurant operators who use Sundae Report to understand their performance. No credit card required, no obligations — just insights."
      >
        <Link href="/demo">
          <Button variant="primary" size="lg">
            Generate Free Report
          </Button>
        </Link>
        <a href={PRICING_URL}>
          <Button variant="outline-light" size="lg">
            View Full Pricing
          </Button>
        </a>
      </PageCTA>
    </div>
  );
}
