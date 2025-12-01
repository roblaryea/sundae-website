import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';

export default function WatchtowerPage() {
  const features = [
    {
      title: "Market Intelligence",
      description: "Real-time monitoring of competitor pricing, menu changes, and market trends",
      icon: "🏪"
    },
    {
      title: "Economic Indicators",
      description: "Track local economic factors that impact restaurant performance",
      icon: "📈"
    },
    {
      title: "Consumer Trends",
      description: "Monitor changing consumer preferences and dining behavior patterns",
      icon: "👥"
    },
    {
      title: "Competitive Analysis",
      description: "Benchmark your performance against similar restaurants in your market",
      icon: "⚖️"
    }
  ];

  const intelligenceTypes = [
    { 
      category: "Competitor Intelligence", 
      data: ["Menu pricing changes", "New location openings", "Promotional activities", "Customer reviews analysis"],
      frequency: "Daily updates"
    },
    { 
      category: "Market Conditions", 
      data: ["Local economic indicators", "Demographic shifts", "Real estate trends", "Tourism patterns"],
      frequency: "Weekly reports"
    },
    { 
      category: "Consumer Behavior", 
      data: ["Dining preference changes", "Delivery vs. dine-in trends", "Price sensitivity", "Seasonal patterns"],
      frequency: "Real-time tracking"
    },
    { 
      category: "Industry Trends", 
      data: ["Technology adoption", "Labor market changes", "Supply chain impacts", "Regulatory updates"],
      frequency: "Monthly insights"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span>🏰</span>
              <span>External Market Intelligence</span>
            </div>
            <h1 className="hero-h1 text-gray-900 mb-6">
              Know What's Happening
              <br />
              <span className="text-indigo-600">Outside Your Walls</span>
            </h1>
            <p className="body-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Competitors, market shifts, consumer trends. Watchtower watches it all so you can respond before it impacts your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo">
                <Button variant="primary" size="lg">
                  Explore Watchtower
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 mb-4">
              Context Changes Everything
            </h2>
            <p className="body-xl text-gray-600 dark:text-slate-300">
              Your numbers mean more when you know what's happening around you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} variant="elevated">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-xl">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-gray-900 dark:text-white">{feature.title}</CardTitle>
                  </div>
                  <CardDescription className="text-gray-600 dark:text-slate-300">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Intelligence Types Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 mb-4">
              What Watchtower Tracks
            </h2>
            <p className="body-xl text-gray-600 dark:text-slate-300">
              Competitors. Markets. Consumers. All in one view.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {intelligenceTypes.map((category, index) => (
              <Card key={index} variant="elevated">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-gray-900 dark:text-white">{category.category}</CardTitle>
                    <span className="text-sm bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full">
                      {category.frequency}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.data.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                        <span className="text-gray-600 text-sm">{item}</span>
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 mb-4">
              Intelligence, Automated
            </h2>
            <p className="body-xl text-gray-600 dark:text-slate-300">
              We gather and analyze. You get the insights that matter.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Data Collection",
                description: "Continuously gathers data from public sources, APIs, and proprietary databases",
                icon: "📡"
              },
              {
                step: "2", 
                title: "Intelligence Analysis",
                description: "AI processes and analyzes external data to identify relevant trends and patterns",
                icon: "🔍"
              },
              {
                step: "3",
                title: "Strategic Insights",
                description: "Receive actionable intelligence reports with recommendations for your business",
                icon: "📋"
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 dark:text-slate-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Insights Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 mb-4">
              Alerts That Matter
            </h2>
            <p className="body-xl text-gray-600 dark:text-slate-300">
              Real examples of intelligence that drives action
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                type: "Competitive Alert",
                title: "New Competitor Opening",
                description: "Italian restaurant opening 0.3 miles away in 2 weeks. Similar menu, 20% lower prices. Recommend: review pricing strategy and enhance marketing.",
                impact: "High",
                action: "Immediate response needed"
              },
              {
                type: "Market Opportunity", 
                title: "Delivery Trend Spike",
                description: "Delivery demand up 45% in your area vs. 12% industry average. Your market share: 8%. Opportunity to capture 15% more share.",
                impact: "Medium",
                action: "Increase delivery marketing"
              },
              {
                type: "Economic Indicator",
                title: "Local Employment Growth",
                description: "Tech company expansion adding 2,000 jobs within 3 miles. Average salary $85k. Predict 18% increase in lunch demand.",
                impact: "High",
                action: "Prepare for growth"
              }
            ].map((insight, index) => (
              <Card key={index} variant="default">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm px-3 py-1 rounded-full ${
                      insight.impact === 'High' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {insight.type}
                    </span>
                  </div>
                  <CardTitle className="text-gray-900 dark:text-white">{insight.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-3">{insight.description}</p>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs font-medium text-gray-700">Recommended Action:</p>
                    <p className="text-sm text-gray-900 dark:text-white">{insight.action}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-h2 text-gray-900 mb-6">
                Stay Ahead of the Market
              </h2>
              <p className="body-xl text-gray-600 mb-8">
                Know what your competitors are doing. Know what your market is doing. Act first.
              </p>
              
              <div className="space-y-4">
                {[
                  { benefit: "Real-time competitor monitoring", icon: "👁️" },
                  { benefit: "Market trend analysis", icon: "📊" },
                  { benefit: "Consumer behavior insights", icon: "👥" },
                  { benefit: "Economic impact assessment", icon: "💰" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                      {item.icon}
                    </div>
                    <span className="text-gray-900 font-medium">{item.benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">🏪</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Market Intelligence Dashboard</h3>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Competitor Price Index</span>
                    <span className="text-sm text-red-600">+5.2%</span>
                  </div>
                  <div className="h-16 bg-gradient-to-r from-indigo-200 to-purple-200 rounded"></div>
                </div>
                
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Market Share</span>
                    <span className="text-sm text-green-600">12.3%</span>
                  </div>
                  <div className="h-16 bg-gradient-to-r from-purple-200 to-indigo-200 rounded"></div>
                </div>
                
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Consumer Sentiment</span>
                    <span className="text-sm text-green-600">Positive</span>
                  </div>
                  <div className="h-16 bg-gradient-to-r from-purple-200 to-indigo-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-h2 mb-6">
            Ready for Market Intelligence?
          </h2>
          <p className="body-xl mb-8 opacity-90">
            See what's happening in your market. Book a Watchtower demo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo">
              <Button variant="primary" size="lg" className="bg-white text-indigo-600 hover:bg-gray-100">
                Book Watchtower Demo
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
