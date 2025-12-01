'use client';

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, forwardRef } from "react";

export default function BenchmarkingPage() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const accordionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Auto-scroll to opened accordion
  useEffect(() => {
    if (openAccordion !== null && accordionRefs.current[openAccordion]) {
      accordionRefs.current[openAccordion]?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, [openAccordion]);

  const whoItsFor = [
    {
      icon: "👔",
      title: "Ops Leaders",
      description: "See where you stand vs the market"
    },
    {
      icon: "💼",
      title: "Finance & FP&A",
      description: "Benchmark costs and identify opportunities"
    },
    {
      icon: "📊",
      title: "Regional Managers",
      description: "Compare location performance objectively"
    }
  ];

  const benchmarkCategories = [
    {
      name: "Sales & Revenue Intelligence",
      description: "Track and benchmark the performance of your core sales engines",
      metrics: ["Net Sales Trend", "Revenue per Sq Ft / Table", "Average Check Size", "Channel Mix Performance", "Daypart Sales Analysis"],
      icon: "📊",
      color: "bg-blue-600",
      footer: "See how your sales stack up against similar restaurants."
    },
    {
      name: "Guest & Demand Patterns",
      description: "Understand guest flow and demand patterns across dayparts",
      metrics: ["Guest Count Trends", "Peak Hour Analysis", "Capacity Utilization", "Table Turn Performance", "Event & Weather Impact"],
      icon: "👥",
      color: "bg-purple-600",
      footer: "Understand when and why guests choose you — or your competitors."
    },
    {
      name: "Labor & Productivity Intelligence",
      description: "Optimize labor efficiency and identify productivity gaps",
      metrics: ["Labor Cost %", "Sales per Labor Hour", "Staff Productivity Score", "Overtime Exposure", "Staffing vs Demand Alignment"],
      icon: "⚡",
      color: "bg-orange-600",
      footer: "Identify efficiency gaps and overstaffed or understaffed periods."
    },
    {
      name: "COGS & Food Efficiency",
      description: "Identify hidden cost drivers and waste variance issues",
      metrics: ["Food Cost %", "Waste & Variance Tracking", "Inventory Turnover", "Menu Margin Analysis", "Category Cost Optimization"],
      icon: "🍽️",
      color: "bg-green-600",
      footer: "Spot leakage and uncover hidden cost drivers."
    },
    {
      name: "Operational Performance",
      description: "Measure operational efficiency against industry standards",
      metrics: ["Order Accuracy Rate", "Speed of Service", "Prep Efficiency", "Service Rhythm Analysis", "Front vs Back-of-House Metrics"],
      icon: "🎯",
      color: "bg-teal-600",
      footer: "Optimize the guest experience from kitchen to table."
    },
    {
      name: "Financial & Cost Structure",
      description: "Analyze cost structure and profitability vs market benchmarks",
      metrics: ["Rent Efficiency Ratio", "Utility Cost Impact", "Location Profitability", "Cost-to-Sales Analysis", "Overhead Optimization"],
      icon: "💰",
      color: "bg-indigo-600",
      footer: "See whether your cost structure is in line with the market."
    },
    {
      name: "Predictive Signals & AI Alerts",
      description: "Get proactive alerts before issues impact your bottom line",
      metrics: ["Sales Forecast Accuracy", "Labor Demand Prediction", "Anomaly Detection", "Risk Flag Identification", "Data Quality Monitoring"],
      icon: "🚨",
      color: "bg-red-600",
      footer: "Get proactive alerts before issues impact your P&L."
    },
    {
      name: "Benchmarking & Market Indices",
      description: "Track market position and competitive performance",
      metrics: ["Performance Rank vs Peers", "Segment Benchmark Comparison", "Market Trend Analysis", "Competitive Position Tracking", "Composite Performance Score"],
      icon: "📈",
      color: "bg-blue-700",
      footer: "See exactly where you stand in your local and segment market."
    }
  ];

  const previewResults = [
    {
      title: "Sales Trend vs Market",
      type: "Revenue Analysis",
      metric: "Revenue +12% vs peers",
      trend: "up",
      icon: "📈",
      color: "bg-green-500",
      description: "Above market average"
    },
    {
      title: "Labor Cost Variance",
      type: "Cost Analysis",
      metric: "Labor cost +8% vs benchmark",
      trend: "warning",
      icon: "⚠️",
      color: "bg-orange-500",
      description: "Above similar restaurants"
    },
    {
      title: "Daypart Underperformance",
      type: "Demand Analysis",
      metric: "Lunch revenue -15% vs market",
      trend: "down",
      icon: "📉",
      color: "bg-red-500",
      description: "Below lunch benchmarks"
    },
    {
      title: "Menu Margin Health",
      type: "Profitability Check",
      metric: "Food cost within 2% of target",
      trend: "good",
      icon: "✅",
      color: "bg-green-500",
      description: "On track with goals"
    }
  ];

  const sampleInsights = [
    {
      category: "Menu Margin Leak",
      severity: "High",
      tags: ["Cost", "Revenue"],
      title: "Menu items 12% below margin target",
      preview: "Your top-selling mains are underpriced vs benchmark and category margins.",
      whatWeFound: "Your top 5 menu items are generating 12% lower margins than similar restaurants in your segment.",
      whyItMatters: "This represents $3,200 in monthly profit leakage and indicates pricing or cost structure issues that directly impact your bottom line.",
      recommendation: "Review item pricing and negotiate better supplier rates for high-volume ingredients. Consider portion optimization for high-cost items.",
      impact: "Estimated savings: $3,200/month per location",
      benchmark: "12% below peer average",
      type: "warning" as const,
      color: "bg-orange-500"
    },
    {
      category: "Delivery Channel Overdependence",
      severity: "Medium",
      tags: ["Revenue", "Channel"],
      title: "65% revenue from delivery vs 45% market",
      preview: "Delivery accounts for 65% of revenue vs 45% market average, creating platform risk.",
      whatWeFound: "Delivery accounts for 65% of your revenue compared to 45% market average, creating platform risk and higher commission costs.",
      whyItMatters: "High delivery dependence increases commission costs and vulnerability to platform changes, while limiting direct customer relationships.",
      recommendation: "Develop dine-in experience improvements and direct ordering channels to balance revenue mix and reduce platform dependency.",
      impact: "Potential savings: $1,800/month",
      benchmark: "20% above market average",
      type: "warning" as const,
      color: "bg-blue-500"
    },
    {
      category: "Daypart Slowdown",
      severity: "Medium",
      tags: ["Demand", "Revenue"],
      title: "Afternoon sales 22% below lunch peak",
      preview: "Your 2-5 PM sales represent only 35% of lunch revenue vs 55% for similar restaurants.",
      whatWeFound: "Your 2-5 PM sales represent only 35% of lunch revenue vs 55% for similar restaurants, indicating missed afternoon revenue opportunities.",
      whyItMatters: "You're missing significant afternoon revenue opportunity that competitors are capturing, representing untapped profit potential.",
      recommendation: "Introduce afternoon promotions, happy hour specials, or target the after-work crowd with specific menu offerings and marketing.",
      impact: "Potential increase: $2,400/month",
      benchmark: "22% below peer performance",
      type: "opportunity" as const,
      color: "bg-blue-500"
    },
    {
      category: "Inventory Turnover Warning",
      severity: "High",
      tags: ["Cost", "Waste"],
      title: "Inventory turnover 18% slower than optimal",
      preview: "Your inventory is turning over every 21 days vs 17 days for top-performing restaurants.",
      whatWeFound: "Your inventory is turning over every 21 days vs 17 days for top-performing restaurants, leading to spoilage and quality issues.",
      whyItMatters: "Slow turnover leads to spoilage, quality issues, and tied-up capital in excess inventory that could be used for growth investments.",
      recommendation: "Implement just-in-time ordering and reduce safety stock for slow-moving items. Review ordering frequency and quantities.",
      impact: "Estimated savings: $1,500/month per location",
      benchmark: "18% below optimal rate",
      type: "warning" as const,
      color: "bg-red-500"
    },
    {
      category: "Guest Frequency Decline",
      severity: "Medium",
      tags: ["Demand", "Retention"],
      title: "Repeat guest visits down 15% vs last quarter",
      preview: "Your repeat customer rate has declined 15% while similar restaurants maintained stable frequency.",
      whatWeFound: "Your repeat customer rate has declined 15% while similar restaurants maintained stable frequency, indicating satisfaction issues.",
      whyItMatters: "Declining repeat visits indicate customer satisfaction issues or increased competition that threatens long-term revenue stability.",
      recommendation: "Implement loyalty programs and gather customer feedback to identify improvement areas. Focus on service quality and consistency.",
      impact: "Potential recovery: $3,100/month",
      benchmark: "15% below historical performance",
      type: "warning" as const,
      color: "bg-orange-500"
    },
    {
      category: "Speed of Service Gap",
      severity: "Low",
      tags: ["Operations", "Experience"],
      title: "Service speed 8% slower than competitors",
      preview: "Your average service time is 18 minutes vs 16.5 minutes for similar restaurants during peak hours.",
      whatWeFound: "Your average service time is 18 minutes vs 16.5 minutes for similar restaurants during peak hours, affecting customer satisfaction.",
      whyItMatters: "Slower service can lead to customer dissatisfaction and reduced table turnover during busy periods, impacting revenue potential.",
      recommendation: "Optimize kitchen workflow and consider kitchen display systems to improve coordination and reduce wait times.",
      impact: "Potential improvement: +2 tables/hour during peak",
      benchmark: "8% above competitor average",
      type: "opportunity" as const,
      color: "bg-green-500"
    },
    {
      category: "Weekend Staffing Misalignment",
      severity: "Medium",
      tags: ["Labor", "Efficiency"],
      title: "Weekend labor 12% above demand forecast",
      preview: "You're scheduling 12% more labor hours than predicted demand requires on weekends.",
      whatWeFound: "You're scheduling 12% more labor hours than predicted demand requires on weekends, leading to unnecessary labor costs.",
      whyItMatters: "Overstaffing increases labor costs without proportional revenue benefits during slower periods, directly impacting profitability.",
      recommendation: "Use demand forecasting to optimize weekend schedules and reduce unnecessary labor hours while maintaining service quality.",
      impact: "Estimated savings: $1,200/month",
      benchmark: "12% above forecasted demand",
      type: "warning" as const,
      color: "bg-orange-500"
    },
    {
      category: "Forecasted Sales Surge",
      severity: "Low",
      tags: ["Revenue", "Forecast"],
      title: "Predicted 25% sales increase next weekend",
      preview: "Our AI models predict a 25% sales surge due to local event and favorable weather conditions.",
      whatWeFound: "Our AI models predict a 25% sales surge due to local event and favorable weather conditions that will drive demand.",
      whyItMatters: "Being prepared for demand spikes ensures you can capitalize on revenue opportunities and avoid lost sales from stockouts.",
      recommendation: "Increase inventory and schedule additional staff for the predicted surge period to maximize revenue capture.",
      impact: "Potential increase: $4,500 for this event",
      benchmark: "25% above typical weekend",
      type: "opportunity" as const,
      color: "bg-green-500"
    },
    {
      category: "Predictive Labor Overrun",
      severity: "High",
      tags: ["Cost", "Forecast"],
      title: "Labor cost projected 15% over budget next week",
      preview: "Based on current scheduling, labor costs will exceed budget by 15% due to overtime and overstaffing.",
      whatWeFound: "Based on current scheduling, labor costs will exceed budget by 15% due to overtime and overstaffing that could be avoided.",
      whyItMatters: "Labor overruns directly impact profitability and indicate scheduling inefficiencies that compound over time.",
      recommendation: "Adjust schedules immediately, reduce overtime, and optimize shift patterns for next week to stay within budget.",
      impact: "Estimated savings: $2,100/week",
      benchmark: "15% above budgeted labor cost",
      type: "warning" as const,
      color: "bg-red-500"
    },
    {
      category: "High Waste Variance",
      severity: "High",
      tags: ["Cost", "Waste"],
      title: "Produce waste 28% above benchmark",
      preview: "Your produce waste is 28% higher than similar restaurants, primarily in lettuce, tomatoes, and herbs.",
      whatWeFound: "Your produce waste is 28% higher than similar restaurants, primarily in lettuce, tomatoes, and herbs, representing direct profit loss.",
      whyItMatters: "Excess waste represents direct profit loss and indicates inventory management issues that affect both cost and quality.",
      recommendation: "Implement better inventory rotation, reduce order quantities, and consider pre-portioned options for high-waste items.",
      impact: "Estimated savings: $950/month per location",
      benchmark: "28% above peer waste levels",
      type: "warning" as const,
      color: "bg-red-500"
    }
  ];

  const howItWorks = [
    {
      step: 1,
      title: "Upload Your Data",
      description: "Securely upload POS sales or export your data.",
      icon: "📊",
      subtext: "Takes less than 5 minutes"
    },
    {
      step: 2,
      title: "AI Benchmark Analysis",
      description: "Our engine compares your metrics against similar restaurants.",
      icon: "🤖",
      subtext: "Real-time processing"
    },
    {
      step: 3,
      title: "Get Actionable Insights",
      description: "Receive clear recommendations to improve key KPIs.",
      icon: "💡",
      subtext: "Instant results"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section - Conversion Focused */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <span>📊</span>
                <span>Sundae Report</span>
              </div>
              <h1 className="hero-h1 text-gray-900 mb-6">
                <span className="text-blue-600">Free</span> Benchmarking That Shows You Where You Really Stand
              </h1>
              <p className="body-xl text-gray-600 mb-4">
                See how your sales, labor, COGS, and operations compare to similar restaurants in your market. <span className="font-semibold">100% free. Results in minutes.</span>
              </p>
              <p className="text-sm text-gray-500 mb-8">
                Your first taste of Sundae — the AI decision intelligence platform built for restaurants.
              </p>
              
              {/* Email Form */}
              <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl border-2 border-blue-200 mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Work email
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="your.email@restaurant.com"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Link href="/demo">
                    <Button variant="primary" size="lg" className="w-full sm:w-auto whitespace-nowrap">
                      Get Free Report
                    </Button>
                  </Link>
                </div>
                <p className="text-xs text-gray-500 mt-3 leading-relaxed">
                  We'll send you a secure upload link and your benchmark report. Takes less than 5 minutes.
                </p>
              </div>

              <div className="flex items-center flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <span className="text-green-500">✔</span>
                  <span className="text-sm text-gray-600">No credit card required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-500">✔</span>
                  <span className="text-sm text-gray-600">Results in minutes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-500">✔</span>
                  <span className="text-sm text-gray-600">100% confidential</span>
                </div>
              </div>
            </div>
            
            {/* Simplified Visual Preview */}
            <div className="relative w-full max-w-full">
              <div className="bg-white rounded-2xl p-4 md:p-8 shadow-lg border border-gray-200 relative z-10 w-full">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">Here's a sample of the summary you'll receive</h3>
                <p className="text-sm text-gray-500 mb-6 text-center">Personalized to your restaurant's data</p>
                <div className="space-y-4">
                  {previewResults.map((result, index) => (
                    <div key={index} className="flex items-center justify-between p-3 md:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors min-w-0">
                      <div className="flex items-center space-x-3 flex-1">
                        <div className={`w-8 h-8 ${result.color} rounded-lg flex items-center justify-center text-white flex-shrink-0`}>
                          {result.icon}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">{result.type}</p>
                          <p className="font-medium text-gray-900 truncate">{result.title}</p>
                          <p className="text-sm text-gray-600">{result.description}</p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0 ml-4">
                        <p className="font-bold text-gray-900 text-sm">{result.metric}</p>
                        <div className={`text-xs px-2 py-1 rounded mt-1 ${result.trend === 'up' || result.trend === 'good' ? 'bg-green-100 text-green-800' : result.trend === 'warning' ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800'}`}>
                          {result.trend === 'up' || result.trend === 'good' ? 'Above Market' : result.trend === 'warning' ? 'Warning' : 'Below Market'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <p className="text-gray-600 mb-6">
              Trusted by operators who want the truth about their performance
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
                <span className="text-2xl">📊</span>
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
            <h2 className="section-h3 text-gray-900 mb-2">Built for Operators Who Need Answers</h2>
            <p className="text-gray-600">Know where you stand. Know what to fix.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whoItsFor.map((persona, index) => (
              <Card key={index} variant="elevated" className="text-center p-6">
                <div className="text-4xl mb-3">{persona.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{persona.title}</h3>
                <p className="text-sm text-gray-600">{persona.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* See How You Compare */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 mb-4">
              The Metrics That Actually Matter
            </h2>
            <p className="body-xl text-gray-600 max-w-3xl mx-auto">
              Compare your performance across 8 critical categories
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benchmarkCategories.map((category, index) => (
              <Card key={category.name} variant="elevated" className="hover:scale-105 transition-all duration-300 hover:shadow-lg group">
                <CardHeader>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center text-white text-xl group-hover:scale-110 transition-transform duration-300`}>
                      {category.icon}
                    </div>
                    <div>
                      <CardTitle className="text-gray-900 group-hover:text-blue-600 transition-colors duration-300 text-base">{category.name}</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {category.metrics.map((metric, metricIndex) => (
                      <li key={metricIndex} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-600 leading-relaxed">{metric}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-500 leading-relaxed">{category.footer}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Insights Accordions */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 mb-4">
              What Your Report Will Reveal
            </h2>
            <p className="body-xl text-gray-600 max-w-3xl mx-auto">
              Real insights, specific recommendations, measurable impact
            </p>
          </div>

          {/* Independent Accordion Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {/* Left Column - 5 items */}
            <div className="flex flex-col gap-6">
              {sampleInsights.slice(0, 5).map((insight, index) => (
                <AccordionInsight
                  key={`left-${index}`}
                  insight={insight}
                  isOpen={openAccordion === index}
                  onToggle={() => setOpenAccordion(openAccordion === index ? null : index)}
                  index={index}
                  ref={el => { accordionRefs.current[index] = el; }}
                />
              ))}
            </div>
            
            {/* Right Column - 5 items */}
            <div className="flex flex-col gap-6">
              {sampleInsights.slice(5, 10).map((insight, index) => (
                <AccordionInsight
                  key={`right-${index + 5}`}
                  insight={insight}
                  isOpen={openAccordion === index + 5}
                  onToggle={() => setOpenAccordion(openAccordion === index + 5 ? null : index + 5)}
                  index={index + 5}
                  ref={el => { accordionRefs.current[index + 5] = el; }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 mb-4">
              Three Steps. Five Minutes. Free.
            </h2>
            <p className="body-xl text-gray-600 max-w-3xl mx-auto">
              No sales call. No commitment. Just answers.
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
                <div className="text-3xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 mb-2">{step.description}</p>
                <p className="text-xs text-blue-600 font-medium">{step.subtext}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-deep-blue to-electric-blue text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-h2 mb-6">
            Ready to See Where You Stand?
          </h2>
          <p className="body-xl mb-8 opacity-90">
            Get your free benchmark report and see exactly how your restaurant compares. No strings attached.
          </p>
          <Link href="/demo">
            <Button variant="primary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Generate Free Report
            </Button>
          </Link>
          <div className="flex items-center justify-center flex-wrap gap-6 mt-8">
            <div className="flex items-center space-x-2">
              <span className="text-green-400">✔</span>
              <span className="text-sm opacity-90">No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-400">✔</span>
              <span className="text-sm opacity-90">Takes less than 5 minutes</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-400">✔</span>
              <span className="text-sm opacity-90">Results delivered instantly</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Accordion Insight Component
const AccordionInsight = forwardRef<HTMLDivElement, {
  insight: any;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}>(({ insight, isOpen, onToggle, index }, ref) => {
  return (
    <motion.div
      ref={ref}
      className="border border-gray-200 rounded-2xl overflow-hidden bg-white"
      initial={false}
      animate={isOpen ? "open" : "closed"}
    >
      {/* Summary Row */}
      <motion.button
        onClick={onToggle}
        className="w-full p-5 flex items-center justify-between hover:bg-gray-50 transition-all duration-150 cursor-pointer group"
        aria-expanded={isOpen}
        aria-controls={`insight-content-${index}`}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="flex items-center space-x-4 flex-1">
          <div className={`h-12 w-1 rounded-full ${insight.color} flex-shrink-0`} />
          
          <div className="text-left flex-1">
            <h3 className="font-semibold text-gray-900 group-hover:font-bold transition-all">
              {insight.title}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{insight.preview}</p>
            <p className="text-xs text-gray-400 mt-1">Click to view details</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 flex-shrink-0">
          <span className={`px-2 py-1 text-xs font-medium rounded ${insight.severity === 'High' ? 'bg-orange-100 text-orange-800' : insight.severity === 'Medium' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
            {insight.severity}
          </span>
          {insight.tags.map((tag: string, tagIndex: number) => (
            <span key={tagIndex} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded hidden sm:inline-block">
              {tag}
            </span>
          ))}
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-gray-400 group-hover:text-gray-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </div>
      </motion.button>

      {/* Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`insight-content-${index}`}
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { 
                opacity: 1, 
                height: "auto",
                transition: {
                  height: { duration: 0.3, ease: "easeInOut" },
                  opacity: { duration: 0.2, delay: 0.1 }
                }
              },
              collapsed: { 
                opacity: 0, 
                height: 0,
                transition: {
                  height: { duration: 0.3, ease: "easeInOut" },
                  opacity: { duration: 0.2 }
                }
              }
            }}
            className="overflow-hidden"
          >
            <motion.div 
              className="p-6 bg-white border-t border-gray-100"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">What we found</h4>
                  <p className="text-gray-700 leading-relaxed">{insight.whatWeFound}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Why it matters</h4>
                  <p className="text-gray-700 leading-relaxed">{insight.whyItMatters}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Recommendation</h4>
                  <p className="text-gray-700 leading-relaxed">{insight.recommendation}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-green-700 uppercase tracking-wide mb-1">Potential Impact</h4>
                  <p className="text-green-700 font-medium">{insight.impact}</p>
                  <p className="text-xs text-green-600 mt-1">{insight.benchmark}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

AccordionInsight.displayName = 'AccordionInsight';
