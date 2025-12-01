import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function PulsePage() {
  const features = [
    {
      title: "Real-time Anomaly Detection",
      description: "AI continuously monitors your data and alerts you to unusual patterns or performance deviations",
      icon: "🚨"
    },
    {
      title: "Predictive Alerts",
      description: "Get notified before problems impact your business with early warning systems",
      icon: "⚠️"
    },
    {
      title: "Root Cause Analysis",
      description: "Understand why anomalies occur with automated investigation and suggested actions",
      icon: "🔍"
    },
    {
      title: "Smart Thresholds",
      description: "Dynamic baselines that adapt to your business patterns and seasonal variations",
      icon: "📊"
    }
  ];

  const anomalyTypes = [
    { 
      category: "Sales Anomalies", 
      examples: ["Unexpected sales drops", "Unusual peak hours", "Menu item performance shifts", "Payment irregularities"],
      impact: "Revenue protection"
    },
    { 
      category: "Operational Anomalies", 
      examples: ["Labor cost spikes", "Inventory discrepancies", "Service time deviations", "Waste increases"],
      impact: "Cost control"
    },
    { 
      category: "Market Anomalies", 
      examples: ["Competitor price changes", "Market demand shifts", "Seasonal pattern breaks", "External events"],
      impact: "Competitive advantage"
    },
    { 
      category: "Staffing Anomalies", 
      examples: ["Attendance patterns", "Performance drops", "Training gaps", "Turnover signals"],
      impact: "Workforce optimization"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50 dark:from-graphite-black dark:via-slate-900 dark:to-slate-900">
      {/* Hero Section */}
      <section className="py-20 pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center space-x-2 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 px-4 py-2 rounded-full text-sm font-medium">
              <span className="text-xl">💓</span>
              <span>Anomaly Detection</span>
            </div>
            <h1 className="hero-h1 text-gray-900 dark:text-white">
              Know Before
              <br />
              <span className="text-red-600 dark:text-red-400">It Becomes a Problem</span>
            </h1>
            <p className="body-xl text-gray-600 dark:text-slate-300 max-w-3xl mx-auto">
              Pulse watches your data 24/7 and alerts you the moment something looks off. Sales dips, labor spikes, inventory issues — caught early, fixed fast.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/demo">
                <Button variant="primary" size="lg">
                  See Pulse in Action
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
              Early Detection. Fast Resolution.
            </h2>
            <p className="body-lg text-gray-600 dark:text-slate-300 max-w-3xl mx-auto">
              The issues you'd find at month-end? Pulse catches them on day one.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="rounded-2xl border border-gray-200 dark:border-slate-800 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-md transition">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center text-white text-2xl flex-shrink-0">
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

      {/* Anomaly Types Section */}
      <section className="py-20 bg-gray-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="section-h2 text-gray-900 dark:text-white">
              Every Anomaly. Every Category.
            </h2>
            <p className="body-lg text-gray-600 dark:text-slate-300 max-w-3xl mx-auto">
              Sales, labor, inventory, market — Pulse monitors all of it
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {anomalyTypes.map((category, index) => (
              <div key={index} className="rounded-2xl border border-gray-200 dark:border-slate-800 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-md transition">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{category.category}</h3>
                  <span className="text-sm bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 px-3 py-1 rounded-full">
                    {category.impact}
                  </span>
                </div>
                <ul className="space-y-3">
                  {category.examples.map((example, exampleIndex) => (
                    <li key={exampleIndex} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-red-600 dark:bg-red-400 rounded-full"></div>
                      <span className="text-gray-600 dark:text-slate-300 text-sm">{example}</span>
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
              Always Watching. Always Learning.
            </h2>
            <p className="body-lg text-gray-600 dark:text-slate-300 max-w-3xl mx-auto">
              AI that adapts to your patterns and knows when something's wrong
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Continuous Monitoring",
                description: "AI analyzes your data 24/7, learning normal patterns and seasonal variations"
              },
              {
                step: "2", 
                title: "Pattern Recognition",
                description: "Machine learning algorithms detect deviations from expected behavior"
              },
              {
                step: "3",
                title: "Smart Alerts",
                description: "Get notified immediately with context, severity, and recommended actions"
              }
            ].map((step, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="h-16 w-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{step.title}</h3>
                <p className="text-gray-600 dark:text-slate-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Alert Examples Section */}
      <section className="py-20 bg-gradient-to-r from-red-50 to-orange-50 dark:from-slate-800/50 dark:to-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="section-h2 text-gray-900 dark:text-white">
              Alerts That Drive Action
            </h2>
            <p className="body-lg text-gray-600 dark:text-slate-300 max-w-3xl mx-auto">
              Not noise. Real issues with clear next steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                type: "Critical Alert",
                title: "Sales Drop Detected",
                description: "Location #3 showing 23% below expected sales for this time period",
                action: "Investigate immediately",
                urgency: "high"
              },
              {
                type: "Warning Alert", 
                title: "Labor Cost Spike",
                description: "Labor costs trending 15% above baseline for the past 3 days",
                action: "Review scheduling",
                urgency: "medium"
              },
              {
                type: "Opportunity Alert",
                title: "Menu Item Trending",
                description: "New menu item showing 40% higher demand than forecasted",
                action: "Increase inventory",
                urgency: "low"
              }
            ].map((alert, index) => (
              <div key={index} className="rounded-2xl border border-gray-200 dark:border-slate-800 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-md transition">
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-sm px-3 py-1 rounded-full ${
                    alert.urgency === 'high' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' :
                    alert.urgency === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300' :
                    'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                  }`}>
                    {alert.type}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{alert.title}</h3>
                <p className="text-gray-600 dark:text-slate-300 text-sm mb-4">{alert.description}</p>
                <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-3">
                  <p className="text-xs font-medium text-gray-700 dark:text-slate-400">Recommended Action:</p>
                  <p className="text-sm text-gray-900 dark:text-white">{alert.action}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-orange-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="section-h2 text-white">
            Ready for Proactive Operations?
          </h2>
          <p className="body-xl text-white/90 max-w-2xl mx-auto">
            See how Pulse catches problems before they cost you money.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/demo">
              <Button variant="primary" size="lg" className="bg-white text-red-600 hover:bg-gray-100">
                Book Pulse Demo
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
