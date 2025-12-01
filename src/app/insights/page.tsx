'use client';

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";

export default function InsightsPage() {
  const signals: { icon: SundaeIconName; label: string }[] = [
    { icon: "forecasting", label: "Weather" },
    { icon: "schedule", label: "Local Events" },
    { icon: "restaurant", label: "Competitor Moves" },
    { icon: "delivery", label: "Traffic Shifts" },
    { icon: "growth", label: "Economic Indicators" },
    { icon: "multiLocation", label: "Tourism Trends" }
  ];

  const capabilities: { title: string; description: string; icon: SundaeIconName }[] = [
    {
      title: "External Signal Correlation",
      description: "Connect your performance data with weather, events, economic indicators, and market trends.",
      icon: "multiLocation"
    },
    {
      title: "Market & Competitor Benchmarks",
      description: "Understand how you stack up against similar restaurants in your region and segment.",
      icon: "benchmarking"
    },
    {
      title: "Risk & Opportunity Detection",
      description: "AI identifies emerging risks and untapped opportunities before they impact your bottom line.",
      icon: "marketing"
    },
    {
      title: "Always-On Monitoring",
      description: "Continuous analysis of internal and external signals, delivering insights as they emerge.",
      icon: "visibility"
    }
  ];

  const whoItsFor: { icon: SundaeIconName; title: string; description: string }[] = [
    {
      icon: "owners",
      title: "Ops Leaders",
      description: "Proactive signals before issues become crises"
    },
    {
      icon: "finance",
      title: "Finance & FP&A",
      description: "Context behind variance and forecasting accuracy"
    },
    {
      icon: "regional",
      title: "Regional Managers",
      description: "Market-aware decisions for each territory"
    }
  ];

  const howItWorks: { step: number; title: string; description: string; icon: SundaeIconName }[] = [
    {
      step: 1,
      title: "Internal data ingestion",
      description: "Sundae connects to your POS, labor, inventory, and operational systems.",
      icon: "data"
    },
    {
      step: 2,
      title: "External signal overlay",
      description: "We layer in weather, events, market trends, and economic indicators relevant to your locations.",
      icon: "integration"
    },
    {
      step: 3,
      title: "AI correlation → insights",
      description: "Our AI engine identifies patterns and correlations, delivering actionable insights automatically.",
      icon: "intelligence"
    }
  ];

  const exampleInsights = [
    {
      title: "Weather Impact on Sales",
      description: "Sales drop 18% during heavy rain at downtown locations. Historical pattern shows consistent correlation.",
      type: "External Correlation",
      priority: "Medium" as const,
      action: "Launch rainy-day delivery promotions and adjust staffing for downtown locations during forecasted rain.",
      applied: "3 locations",
      impact: "+AED 12K/month",
      icon: "🌧️"
    },
    {
      title: "Event-Driven Demand Spike",
      description: "Concert at nearby venue drives 35% increase in evening traffic. Pattern detected across 8 similar events.",
      type: "Opportunity",
      priority: "High" as const,
      action: "Increase staffing by 40% and stock high-margin items for next 3 scheduled concerts.",
      applied: "2 locations",
      impact: "+AED 28K/event",
      icon: "🎵"
    },
    {
      title: "Competitor Menu Change",
      description: "Competitor introduced lunch combo similar to yours at 15% lower price. Market share risk detected in 3 locations.",
      type: "Competitive Intelligence",
      priority: "High" as const,
      action: "Review pricing strategy and consider value-add differentiators for lunch service within 2 weeks.",
      applied: "3 locations",
      impact: "Risk: -AED 15K/month",
      icon: "⚠️"
    },
    {
      title: "Economic Indicator Alert",
      description: "Rising food costs correlate with 8% increase in your COGS over past 60 days. Margin compression risk identified.",
      type: "Predictive",
      priority: "Medium" as const,
      action: "Review menu pricing or portion sizes to maintain target margins.",
      applied: "All locations",
      impact: "Protect: AED 33K/month",
      icon: "💰"
    },
    {
      title: "Seasonal Pattern Detection",
      description: "Tourist season starts in 2 weeks. Historical data shows 45% increase in demand at waterfront locations.",
      type: "Predictive",
      priority: "Low" as const,
      action: "Increase inventory levels by 35% and schedule additional staff for Marina and Beach Road locations.",
      applied: "4 locations",
      impact: "+AED 85K/month",
      icon: "📈"
    },
    {
      title: "Local Market Shift",
      description: "New residential development increases lunch demand by 22%. Demographic shift creating expansion opportunity.",
      type: "Opportunity",
      priority: "Medium" as const,
      action: "Explore expansion or partnership opportunities in new development area.",
      applied: "1 territory",
      impact: "+AED 180K/year",
      icon: "🏗️"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-500' };
      case 'Medium':
        return { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-500' };
      case 'Low':
        return { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-500' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-500' };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <span>💡</span>
              <span>Sundae Insights</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              Your Data Paired With the Real World
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-600 mb-6 max-w-4xl mx-auto leading-relaxed"
            >
              Sundae Insights connects your internal performance data with real-world context — market trends, weather, events, and economic indicators — to uncover the <em>why</em> behind every metric.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-sm text-gray-500 mb-8 max-w-3xl mx-auto"
            >
              Part of Sundae, the first AI decision intelligence platform for restaurants and hospitality.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg text-gray-900 font-semibold mb-12 max-w-3xl mx-auto"
            >
              With Sundae Insights, you don't just view numbers — you see what's driving them and what to do next.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/demo">
                <Button variant="primary" size="lg" className="animate-pulse-glow">
                  Talk to Our Team
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                See Insight Examples
              </Button>
            </motion.div>
          </div>

          {/* Signals We Watch Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-16"
          >
            <p className="text-center text-sm font-semibold text-gray-700 mb-6 uppercase tracking-wide">
              Signals We Watch
            </p>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4 max-w-4xl mx-auto">
              {signals.map((signal, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.6 + (index * 0.05) }}
                  className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="w-10 h-10 mx-auto mb-2 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                    <SundaeIcon name={signal.icon} size="md" className="text-white" />
                  </div>
                  <p className="text-xs font-medium text-gray-700">{signal.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <p className="text-gray-600 mb-6">
              Trusted by leading restaurant groups across the Middle East and beyond
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">⚡</span>
                <span className="font-semibold">3x faster decisions</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">💰</span>
                <span className="font-semibold">$50K+ variance detected per site annually</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🎯</span>
                <span className="font-semibold">18% labor cost reduction</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Who It's For</h2>
            <p className="text-gray-600">Built for operators who need context, not just data</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whoItsFor.map((persona, index) => (
              <Card key={index} variant="elevated" className="text-center p-6">
                <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                  <SundaeIcon name={persona.icon} size="lg" className="text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{persona.title}</h3>
                <p className="text-sm text-gray-600">{persona.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Example Insights Section - MOVED UP */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Example Insights
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See the types of intelligence Sundae Insights delivers automatically
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exampleInsights.map((insight, index) => {
              const priorityColors = getPriorityColor(insight.priority);
              return (
                <Card 
                  key={index} 
                  variant="elevated" 
                  className={`hover:shadow-xl transition-shadow duration-300 border-l-4 ${priorityColors.border}`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-3xl">{insight.icon}</div>
                      <div className="flex flex-col gap-1">
                        <span className="px-2 py-1 text-xs font-semibold rounded bg-blue-100 text-blue-800">
                          {insight.type}
                        </span>
                        <span className={`px-2 py-1 text-xs font-semibold rounded ${priorityColors.bg} ${priorityColors.text}`}>
                          {insight.priority}
                        </span>
                      </div>
                    </div>
                    <CardTitle className="text-gray-900 mb-3 text-base">{insight.title}</CardTitle>
                    <CardDescription className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {insight.description}
                    </CardDescription>
                    <div className="pt-3 border-t border-gray-200 space-y-3">
                      <p className="text-sm text-gray-900">
                        <strong>Action:</strong> {insight.action}
                      </p>
                      <p className="text-xs text-gray-600">
                        Applied to: <span className="font-medium">{insight.applied}</span> • Est. impact: <span className="font-semibold text-green-700">{insight.impact}</span>
                      </p>
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Insights Capabilities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See beyond your four walls with intelligent context layering
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {capabilities.map((capability, index) => (
              <Card key={index} variant="elevated" className="hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                      <SundaeIcon name={capability.icon} size="lg" className="text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-gray-900 mb-2">{capability.title}</CardTitle>
                      <CardDescription className="text-gray-600">
                        {capability.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section - MOVED DOWN */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From data integration to decision-ready context
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {step.step}
                  </div>
                </div>
                <div className="w-12 h-12 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                  <SundaeIcon name={step.icon} size="lg" className="text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-deep-blue to-electric-blue text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            See the Story Behind Your Metrics
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Discover how Sundae Insights connects your data with the real world. Talk to our team to see it in action.
          </p>
          <Link href="/demo">
            <Button variant="primary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Talk to Our Team
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
