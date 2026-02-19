'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { motion } from 'framer-motion';
import { SundaeIcon, type SundaeIconName } from '@/components/icons';

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-graphite-black dark:via-gray-900 dark:to-deep-blue/10">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center space-x-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <SundaeIcon name="forge" size="md" />
              <span>Free Tools</span>
            </div>
            <h1 className="hero-h1 text-gray-900 dark:text-white mb-6">
              Free Calculators for
              <br />
              <span className="text-gradient">Smarter Operations</span>
            </h1>
            <p className="body-xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto">
              Quick answers on labor, margins, and performance. No signup required.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <Card variant="elevated" className="h-full hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-electric-blue to-deep-blue rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg">
                      <SundaeIcon name={tool.icon} size="xl" className="text-white" />
                    </div>
                    <CardTitle className="text-2xl text-gray-900 dark:text-white mb-3">
                      {tool.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                      {tool.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {tool.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-deep-blue to-electric-blue text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-h2 mb-6">
            Need the Full Picture?
          </h2>
          <p className="body-xl mb-8 opacity-90">
            These tools scratch the surface. Sundae gives you real-time intelligence across every location.
          </p>
          <Link href="/demo">
            <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              See Sundae Platform
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
