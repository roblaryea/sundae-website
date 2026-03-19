import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { SundaeIcon, type SundaeIconName } from '@/components/icons';
import { PageHero, PageCTA, FadeUp, StaggerContainer, StaggerItem } from '@/components/ui/PageAnimations';

export default function CanvasPage() {
  const features: { title: string; description: string; icon: SundaeIconName }[] = [
    {
      title: "Interactive Dashboards",
      description: "Drag-and-drop interface to create custom visualizations that tell your data story.",
      icon: "benchmarking"
    },
    {
      title: "Natural Language Dashboard Builder",
      description: "Describe what you want to see in plain English. Sundae Coach builds it for you instantly.",
      icon: "aiOs"
    },
    {
      title: "Real-Time Updates",
      description: "Live data streaming ensures your visualizations always show the latest metrics.",
      icon: "speed"
    },
    {
      title: "Multi-Location Views",
      description: "Compare performance across locations with unified dashboards and drill-down capabilities.",
      icon: "multiLocation"
    },
    {
      title: "Predictive Visualizations",
      description: "Trend lines and forecasting to see what&apos;s coming before it happens.",
      icon: "forecasting"
    }
  ];

  const visualizationTypes = [
    { type: "Performance Metrics", examples: ["Sales Trends", "Labor Costs", "Guest Count", "Table Turn"] },
    { type: "Operational KPIs", examples: ["Food Cost %", "Labor Efficiency", "Waste Tracking", "Speed of Service"] },
    { type: "Market Intelligence", examples: ["Competitor Analysis", "Market Share", "Price Benchmarking", "Trend Analysis"] },
    { type: "Predictive Intelligence", examples: ["Demand Forecasting", "Staffing Optimization", "Inventory Planning", "Revenue Prediction"] }
  ];

  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      {/* Hero */}
      <PageHero
        badge="Canvas — Visualization Engine"
        title={<>Dashboards That<br />Actually Get Used</>}
        description="One source of truth for every team. Canvas delivers live dashboards for execs, ops, and finance — always current, always aligned."
      >
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/demo">
            <Button variant="primary" size="lg">
              Explore Canvas
            </Button>
          </Link>
          <Link href="/architecture">
            <Button variant="outline-light" size="lg">
              View Architecture
            </Button>
          </Link>
        </div>
      </PageHero>

      {/* Key Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">
              Built for How Teams Actually Work
            </h2>
            <p className="body-xl text-[var(--text-supporting)]">
              Real-time data. Clear visuals. No waiting for reports.
            </p>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <StaggerItem key={index}>
                <Card variant="elevated">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                        <SundaeIcon name={feature.icon} size="lg" className="text-white" />
                      </div>
                      <CardTitle className="text-[var(--text-primary)]">{feature.title}</CardTitle>
                    </div>
                    <CardDescription className="text-[var(--text-supporting)]">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Visualization Types */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">
              Ready-Made Views for Every Role
            </h2>
            <p className="body-xl text-[var(--text-supporting)]">
              Pre-built dashboards for operations, finance, and executive oversight
            </p>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {visualizationTypes.map((category, index) => (
              <StaggerItem key={index}>
                <Card variant="elevated">
                  <CardHeader>
                    <CardTitle className="text-[var(--text-primary)]">{category.type}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      {category.examples.map((example, exampleIndex) => (
                        <div key={exampleIndex} className="flex items-center space-x-2 p-2 bg-purple-500/10 rounded-lg">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span className="text-[var(--text-secondary)] text-sm font-medium">{example}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeUp>
              <h2 className="section-h2 text-[var(--text-primary)] mb-6">
                See It in Action
              </h2>
              <p className="body-xl text-[var(--text-supporting)] mb-8">
                Live data. Clear insights. Decisions made faster.
              </p>

              <div className="space-y-4">
                {[
                  { feature: "Drag-and-drop dashboard builder", icon: "marketing" as SundaeIconName },
                  { feature: "Natural language: 'Show me labor cost by location'", icon: "aiOs" as SundaeIconName },
                  { feature: "Real-time data updates", icon: "speed" as SundaeIconName },
                  { feature: "Multi-location comparisons", icon: "multiLocation" as SundaeIconName },
                  { feature: "Intelligent insights & recommendations", icon: "intelligence" as SundaeIconName }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                      <SundaeIcon name={item.icon} size="sm" className="text-purple-400" />
                    </div>
                    <span className="text-[var(--text-primary)] font-medium">{item.feature}</span>
                  </div>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="bg-[var(--surface-faint)] rounded-2xl p-8 border border-[var(--border-default)]">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                    <SundaeIcon name="canvas" size="xl" className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--text-primary)]">Live Dashboard Preview</h3>
                </div>

                <div className="space-y-4">
                  <div className="bg-[var(--navy-deep)] rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-[var(--text-secondary)]">Daily Sales</span>
                      <span className="text-sm text-green-500">+12%</span>
                    </div>
                    <div className="h-16 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded"></div>
                  </div>

                  <div className="bg-[var(--navy-deep)] rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-[var(--text-secondary)]">Labor Cost %</span>
                      <span className="text-sm text-red-400">-3.2%</span>
                    </div>
                    <div className="h-16 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded"></div>
                  </div>

                  <div className="bg-[var(--navy-deep)] rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-[var(--text-secondary)]">Guest Count</span>
                      <span className="text-sm text-green-500">+8.5%</span>
                    </div>
                    <div className="h-16 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded"></div>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* CTA */}
      <PageCTA
        title="Ready for Dashboards That Work?"
        description="See your data unified. Book a Canvas demo today."
      >
        <Link href="/demo">
          <Button variant="primary" size="lg">
            Book Canvas Demo
          </Button>
        </Link>
        <Link href="/product">
          <Button variant="outline-light" size="lg">
            View All Modules
          </Button>
        </Link>
      </PageCTA>
    </div>
  );
}
