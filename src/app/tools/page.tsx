'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { motion } from 'framer-motion';

export default function ToolsPage() {
  const tools = [
    {
      title: 'Labor Cost % Calculator',
      description: 'Calculate your labor cost percentage and see if you\'re on target compared to industry standards.',
      icon: '👥',
      href: '/tools/labor-cost',
      features: ['Labor cost %', 'Target benchmarks', 'Instant analysis']
    },
    {
      title: 'Labor Variance Analyzer',
      description: 'Compare actual labor costs against targets and get actionable insights on variance.',
      icon: '👥',
      href: '/tools/labor-analyzer',
      features: ['Variance analysis', 'Target comparison', 'Recommendations']
    },
    {
      title: 'Menu Item Margin Calculator',
      description: 'Analyze menu item profitability with margin calculations and pricing recommendations.',
      icon: '📊',
      href: '/tools/menu-margin',
      features: ['Gross profit', 'Margin %', 'Price optimization']
    },
    {
      title: 'Break-Even Covers Calculator',
      description: 'Calculate how many covers you need to break even based on fixed and variable costs.',
      icon: '⚖️',
      href: '/tools/breakeven-covers',
      features: ['Break-even point', 'Contribution margin', 'Profitability insights']
    },
    {
      title: 'Benchmark Readiness Assessment',
      description: 'Evaluate your organization\'s readiness for data-driven benchmarking and performance tracking.',
      icon: '📋',
      href: '/tools/benchmark-readiness',
      features: ['Readiness score', 'Gap analysis', 'Action plan']
    },
    {
      title: 'Multi-Location Uplift Estimator',
      description: 'Calculate potential revenue impact of operational improvements across multiple locations.',
      icon: '📈',
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
              <span>🛠️</span>
              <span>Free Tools</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Restaurant Calculators & Tools
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto">
              Quick calculators to help you make faster, data-backed decisions on labor, menu pricing, and performance.
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
                    <div className="w-16 h-16 bg-gradient-to-br from-electric-blue to-deep-blue rounded-2xl flex items-center justify-center text-white text-3xl mb-4 shadow-lg">
                      {tool.icon}
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
          <h2 className="text-4xl font-bold mb-6">
            Want More Advanced Analytics?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            These free tools are just the beginning. Sundae's full platform provides real-time intelligence across all your locations.
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
