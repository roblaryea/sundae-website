import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';

export default function ScoutPage() {
  const features = [
    {
      title: "Universal API Integration",
      description: "Connect to 25+ restaurant systems including POS, HRIS, payroll, inventory, and market data sources",
      icon: "🔗"
    },
    {
      title: "Real-time Data Sync",
      description: "Continuous synchronization ensures your intelligence layer always has the latest data",
      icon: "⚡"
    },
    {
      title: "Data Quality Assurance",
      description: "Automated validation and cleansing to ensure accuracy and consistency across all sources",
      icon: "✅"
    },
    {
      title: "Scalable Architecture",
      description: "Handles enterprise-scale data volumes with sub-second response times",
      icon: "📈"
    }
  ];

  const integrations = [
    { category: "POS Systems", systems: ["Toast", "Square", "Resy", "OpenTable", "SevenRooms"] },
    { category: "HR & Payroll", systems: ["ADP", "Paychex", "Gusto", "BambooHR", "Workday"] },
    { category: "Inventory", systems: ["MarketMan", "BlueCart", "OrderGrid", "ChefHero"] },
    { category: "Market Data", systems: ["Technomic", "NPD", "GuestXM", "Black Box"] }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-graphite-black dark:via-slate-900 dark:to-slate-900">
      {/* Hero Section */}
      <section className="py-20 pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium">
              <span className="text-xl">🔍</span>
              <span>Integration Specialist</span>
            </div>
            <h1 className="hero-h1 text-gray-900 dark:text-white">
              Scout: Universal Data
              <br />
              <span className="text-blue-600 dark:text-electric-blue">Integration Engine</span>
            </h1>
            <p className="body-xl text-gray-600 dark:text-slate-300 max-w-3xl mx-auto">
              Connect every system in your restaurant stack. Scout integrates 25+ data sources 
              into one unified intelligence layer, eliminating data silos and manual reporting.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/demo">
                <Button variant="primary" size="lg">
                  See Scout in Action
                </Button>
              </Link>
              <Link href="/architecture">
                <Button variant="outline" size="lg">
                  View Architecture
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="section-h2 text-gray-900 dark:text-white">
              Connect Everything. Miss Nothing.
            </h2>
            <p className="body-lg text-gray-600 dark:text-slate-300 max-w-3xl mx-auto">
              Scout eliminates data silos by connecting all your restaurant systems
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="rounded-2xl border border-gray-200 dark:border-slate-800 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-md transition">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-slate-300">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Categories Section */}
      <section className="py-20 bg-gray-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="section-h2 text-gray-900 dark:text-white">
              Pre-built Integrations
            </h2>
            <p className="body-lg text-gray-600 dark:text-slate-300 max-w-3xl mx-auto">
              Connect to the systems you already use in minutes, not months
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {integrations.map((category, index) => (
              <div key={index} className="rounded-2xl border border-gray-200 dark:border-slate-800 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-md transition">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{category.category}</h3>
                <ul className="space-y-3">
                  {category.systems.map((system, systemIndex) => (
                    <li key={systemIndex} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-600 dark:bg-electric-blue rounded-full"></div>
                      <span className="text-gray-600 dark:text-slate-300 text-sm">{system}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="section-h2 text-gray-900 dark:text-white">
              How Scout Works
            </h2>
            <p className="body-lg text-gray-600 dark:text-slate-300 max-w-3xl mx-auto">
              Simple setup, powerful results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Connect Your Systems",
                description: "Use our pre-built connectors or custom APIs to link your existing restaurant technology stack"
              },
              {
                step: "2", 
                title: "Data Normalization",
                description: "Scout automatically cleans, standardizes, and enriches data from all connected sources"
              },
              {
                step: "3",
                title: "Unified Intelligence",
                description: "Access real-time insights and analytics across all your systems in one dashboard"
              }
            ].map((step, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="h-16 w-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{step.title}</h3>
                <p className="text-gray-600 dark:text-slate-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="section-h2 text-white">
            Ready to Unify Your Data?
          </h2>
          <p className="body-xl text-white/90 max-w-2xl mx-auto">
            See how Scout can connect your restaurant systems and unlock new insights 
            in our personalized demo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/demo">
              <Button variant="primary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Book Scout Demo
              </Button>
            </Link>
            <Link href="/product">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                View All Modules
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
