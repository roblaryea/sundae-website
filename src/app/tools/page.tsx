'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { SundaeIcon, type SundaeIconName } from '@/components/icons';
import { PageHero, PageCTA, FadeUp, StaggerContainer, StaggerItem } from '@/components/ui/PageAnimations';

export default function ToolsPage() {
  const tools: { title: string; description: string; icon: SundaeIconName; href: string; features: string[] }[] = [
    {
      title: 'Labor Cost % Calculator',
      description: 'Calculate your labor cost percentage and see if you\'re on target compared to industry standards.',
      icon: 'labor',
      href: '/tools/labor-cost',
      features: ['Labor cost %', 'Target benchmarks', 'Instant analysis']
    },
    {
      title: 'Labor Variance Analyzer',
      description: 'Compare actual labor costs against targets and get actionable insights on variance.',
      icon: 'labor',
      href: '/tools/labor-analyzer',
      features: ['Variance analysis', 'Target comparison', 'Recommendations']
    },
    {
      title: 'Menu Item Margin Calculator',
      description: 'Analyze menu item profitability with margin calculations and pricing recommendations.',
      icon: 'menu',
      href: '/tools/menu-margin',
      features: ['Gross profit', 'Margin %', 'Price optimization']
    },
    {
      title: 'Break-Even Covers Calculator',
      description: 'Calculate how many covers you need to break even based on fixed and variable costs.',
      icon: 'balance',
      href: '/tools/breakeven-covers',
      features: ['Break-even point', 'Contribution margin', 'Profitability insights']
    },
    {
      title: 'Benchmark Readiness Assessment',
      description: 'Evaluate your organization\'s readiness for data-driven benchmarking and performance tracking.',
      icon: 'document',
      href: '/tools/benchmark-readiness',
      features: ['Readiness score', 'Gap analysis', 'Action plan']
    },
    {
      title: 'Multi-Location Uplift Estimator',
      description: 'Calculate potential revenue impact of operational improvements across multiple locations.',
      icon: 'performance',
      href: '/tools/multi-location-uplift',
      features: ['Revenue projection', 'Per-location impact', 'Timeline estimate']
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      {/* Hero Section */}
      <PageHero
        badge="Free Tools"
        title="Restaurant Calculators & Assessments"
        description="Quick, free tools to analyze your restaurant's performance. No sign-up required."
      />

      {/* Tools Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tools.map((tool) => (
              <StaggerItem key={tool.title}>
                <Card variant="elevated" className="h-full hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-[var(--text-primary)] mb-4 shadow-lg">
                      <SundaeIcon name={tool.icon} size="xl" className="text-[var(--text-primary)]" />
                    </div>
                    <CardTitle className="text-2xl text-[var(--text-primary)] mb-3">
                      {tool.title}
                    </CardTitle>
                    <CardDescription className="text-[var(--text-supporting)] leading-relaxed mb-4">
                      {tool.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {tool.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center space-x-2 text-sm text-[var(--text-secondary)]">
                          <span className="text-green-500">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href={tool.href}>
                      <Button variant="primary" size="lg" className="w-full">
                        Open Tool
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <PageCTA
        title="Ready for Deeper Insights?"
        description="These calculators are just the start. See what Sundae can do with your full data."
      >
        <Button variant="cta" size="lg" href="/demo">Book a Demo</Button>
        <Button variant="outline-light" size="lg" href="/product">Explore Products</Button>
      </PageCTA>
    </div>
  );
}
