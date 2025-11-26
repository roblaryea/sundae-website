import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';

export default function CanvasPage() {
  const features = [
    {
      title: "Interactive Dashboards",
      description: "Drag-and-drop interface to create custom visualizations that tell your data story",
      icon: "📊"
    },
    {
      title: "Real-time Updates",
      description: "Live data streaming ensures your visualizations always show the latest metrics",
      icon: "⚡"
    },
    {
      title: "Multi-location Views",
      description: "Compare performance across locations with unified dashboards and drill-down capabilities",
      icon: "🗺️"
    },
    {
      title: "Predictive Visualizations",
      description: "AI-powered trend lines and forecasting to see what's coming before it happens",
      icon: "🔮"
    }
  ];

  const visualizationTypes = [
    { type: "Performance Metrics", examples: ["Sales Trends", "Labor Costs", "Guest Count", "Table Turn"] },
    { type: "Operational KPIs", examples: ["Food Cost %", "Labor Efficiency", "Waste Tracking", "Speed of Service"] },
    { type: "Market Intelligence", examples: ["Competitor Analysis", "Market Share", "Price Benchmarking", "Trend Analysis"] },
    { type: "Predictive Analytics", examples: ["Demand Forecasting", "Staffing Optimization", "Inventory Planning", "Revenue Prediction"] }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span>🎨</span>
              <span>Visualization Intelligence</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Canvas: Data
              <br />
              <span className="text-purple-600">Visualization Intelligence</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Transform complex restaurant data into beautiful, interactive visualizations. 
              Canvas helps you see patterns, trends, and opportunities that numbers alone can't reveal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo">
                <Button variant="primary" size="lg">
                  Explore Canvas
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
              See Your Data Differently
            </h2>
            <p className="text-xl text-gray-600">
              Canvas turns raw data into actionable visual insights
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} variant="elevated">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center text-white text-xl">
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

      {/* Visualization Types Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Built for Restaurant Data
            </h2>
            <p className="text-xl text-gray-600">
              Pre-configured visualizations for every aspect of restaurant operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {visualizationTypes.map((category, index) => (
              <Card key={index} variant="elevated">
                <CardHeader>
                  <CardTitle className="text-gray-900">{category.type}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {category.examples.map((example, exampleIndex) => (
                      <div key={exampleIndex} className="flex items-center space-x-2 p-2 bg-purple-50 rounded-lg">
                        <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                        <span className="text-gray-700 text-sm font-medium">{example}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Interactive Demo
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                See how Canvas transforms your restaurant data into beautiful, 
                interactive visualizations that drive better decisions.
              </p>
              
              <div className="space-y-4">
                {[
                  { feature: "Drag-and-drop dashboard builder", icon: "🎯" },
                  { feature: "Real-time data updates", icon: "⚡" },
                  { feature: "Multi-location comparisons", icon: "📍" },
                  { feature: "AI-powered insights", icon: "🤖" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                      {item.icon}
                    </div>
                    <span className="text-gray-900 font-medium">{item.feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">📊</div>
                <h3 className="text-2xl font-bold text-gray-900">Live Dashboard Preview</h3>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Daily Sales</span>
                    <span className="text-sm text-green-600">+12%</span>
                  </div>
                  <div className="h-16 bg-gradient-to-r from-purple-200 to-blue-200 rounded"></div>
                </div>
                
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Labor Cost %</span>
                    <span className="text-sm text-red-600">-3.2%</span>
                  </div>
                  <div className="h-16 bg-gradient-to-r from-blue-200 to-purple-200 rounded"></div>
                </div>
                
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Guest Count</span>
                    <span className="text-sm text-green-600">+8.5%</span>
                  </div>
                  <div className="h-16 bg-gradient-to-r from-blue-200 to-purple-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Visualize Your Data?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            See how Canvas can transform your restaurant analytics with beautiful, 
            interactive visualizations in our personalized demo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo">
              <Button variant="primary" size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                Book Canvas Demo
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
