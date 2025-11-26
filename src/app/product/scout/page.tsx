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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span>🔍</span>
              <span>Integration Specialist</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Scout: Universal Data
              <br />
              <span className="text-blue-600">Integration Engine</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Connect every system in your restaurant stack. Scout integrates 25+ data sources 
              into one unified intelligence layer, eliminating data silos and manual reporting.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Connect Everything. Miss Nothing.
            </h2>
            <p className="text-xl text-gray-600">
              Scout eliminates data silos by connecting all your restaurant systems
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} variant="elevated">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xl">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-gray-900">{feature.title}</CardTitle>
                  </div>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Categories Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Pre-built Integrations
            </h2>
            <p className="text-xl text-gray-600">
              Connect to the systems you already use in minutes, not months
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {integrations.map((category, index) => (
              <Card key={index} variant="default">
                <CardHeader>
                  <CardTitle className="text-gray-900">{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.systems.map((system, systemIndex) => (
                      <li key={systemIndex} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-gray-600 text-sm">{system}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How Scout Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple setup, powerful results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Connect Your Systems",
                description: "Use our pre-built connectors or custom APIs to link your existing restaurant technology stack",
                icon: "🔌"
              },
              {
                step: "2", 
                title: "Data Normalization",
                description: "Scout automatically cleans, standardizes, and enriches data from all connected sources",
                icon: "🔄"
              },
              {
                step: "3",
                title: "Unified Intelligence",
                description: "Access real-time insights and analytics across all your systems in one dashboard",
                icon: "📊"
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Unify Your Data?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            See how Scout can connect your restaurant systems and unlock new insights 
            in our personalized demo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
