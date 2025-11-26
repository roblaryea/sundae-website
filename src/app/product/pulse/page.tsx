import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span>💓</span>
              <span>Anomaly Detection</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Pulse: AI-Powered
              <br />
              <span className="text-red-600">Anomaly Detection</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Never miss what's happening in your business. Pulse continuously monitors your data 
              and alerts you to unusual patterns, performance deviations, and opportunities before they impact your bottom line.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Catch What Others Miss
            </h2>
            <p className="text-xl text-gray-600">
              Pulse identifies anomalies that human analysis often overlooks
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} variant="elevated">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center text-white text-xl">
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

      {/* Anomaly Types Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Detect Every Type of Anomaly
            </h2>
            <p className="text-xl text-gray-600">
              From sales spikes to staffing issues, Pulse catches them all
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {anomalyTypes.map((category, index) => (
              <Card key={index} variant="elevated">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-gray-900">{category.category}</CardTitle>
                    <span className="text-sm bg-red-100 text-red-800 px-3 py-1 rounded-full">
                      {category.impact}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.examples.map((example, exampleIndex) => (
                      <li key={exampleIndex} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        <span className="text-gray-600 text-sm">{example}</span>
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
              How Pulse Works
            </h2>
            <p className="text-xl text-gray-600">
              Advanced AI that learns your business patterns
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Continuous Monitoring",
                description: "AI analyzes your data 24/7, learning normal patterns and seasonal variations",
                icon: "👁️"
              },
              {
                step: "2", 
                title: "Pattern Recognition",
                description: "Machine learning algorithms detect deviations from expected behavior",
                icon: "🧠"
              },
              {
                step: "3",
                title: "Smart Alerts",
                description: "Get notified immediately with context, severity, and recommended actions",
                icon: "📱"
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Alert Examples Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-50 to-orange-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Smart Alerts That Matter
            </h2>
            <p className="text-xl text-gray-600">
              Get notified about the anomalies that impact your business most
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
              <Card key={index} variant="default">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm px-3 py-1 rounded-full ${
                      alert.urgency === 'high' ? 'bg-red-100 text-red-800' :
                      alert.urgency === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {alert.type}
                    </span>
                  </div>
                  <CardTitle className="text-gray-900">{alert.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-3">{alert.description}</p>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs font-medium text-gray-700">Recommended Action:</p>
                    <p className="text-sm text-gray-900">{alert.action}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-600 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Never Miss a Beat
          </h2>
          <p className="text-xl mb-8 opacity-90">
            See how Pulse can monitor your restaurant operations 24/7 and alert you 
            to important changes before they impact your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
