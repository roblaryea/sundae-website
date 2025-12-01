'use client';

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useCta } from "@/lib/cta";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";

// Count-up animation hook
function useCountUp(end: number, duration: number = 2000, isInView: boolean = false) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number | null = null;
    const startValue = 0;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
      setCount(Math.floor(startValue + (end - startValue) * easeOutQuart));
      
      if (percentage < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [end, duration, isInView]);
  
  return count;
}

export default function Home() {
  const cta = useCta();
  const resultsRef = useRef(null);
  const challengesRef = useRef(null);
  const flowRef = useRef(null);
  const dimensionsRef = useRef(null);
  
  const resultsInView = useInView(resultsRef, { once: true, margin: "-100px" });
  const challengesInView = useInView(challengesRef, { once: true, margin: "-100px" });
  const flowInView = useInView(flowRef, { once: true, margin: "-100px" });
  const dimensionsInView = useInView(dimensionsRef, { once: true, margin: "-100px" });

  const coreProducts: { name: string; subtitle: string; description: string; icon: SundaeIconName; color: string; link: string }[] = [
    {
      name: "Sundae Report",
      subtitle: "Free benchmarking in minutes",
      description: "See exactly where you stand. Upload your data and get instant comparisons on sales, labor, COGS, and operations against similar restaurants in your market.",
      icon: "report",
      color: "from-blue-500 to-blue-600",
      link: "/report"
    },
    {
      name: "Sundae Nexus",
      subtitle: "Ask questions, get answers",
      description: "Skip the spreadsheets. Ask questions like 'Which locations grew fastest last weekend?' and get instant, AI-powered answers with context.",
      icon: "nexus",
      color: "from-purple-500 to-purple-600",
      link: "/nexus"
    },
    {
      name: "Sundae Insights",
      subtitle: "Context that explains the why",
      description: "Understand what's actually driving your numbers. Connect performance to weather, local events, and market shifts — automatically.",
      icon: "insights",
      color: "from-green-500 to-green-600",
      link: "/insights"
    },
    {
      name: "Sundae Canvas",
      subtitle: "Dashboards that work for everyone",
      description: "One source of truth. Clear dashboards for execs, ops, and finance — always current, always aligned, always actionable.",
      icon: "canvas",
      color: "from-orange-500 to-orange-600",
      link: "/canvas"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "COO",
      content: "Sundae's decision intelligence helped us identify a 15% labor cost variance across locations and take immediate action. The ROI was instant.",
      company: "85 locations"
    },
    {
      name: "Marcus Rodriguez", 
      role: "Regional Manager",
      content: "The benchmarking insights showed us our food cost was 8% above similar restaurants. We adjusted pricing and saved $50K in 3 months.",
      company: "32 locations"
    },
    {
      name: "Jennifer Kim",
      role: "CFO",
      content: "Finally, a platform that turns our data into actionable decisions. We reduced decision-making time from days to minutes.",
      company: "150+ locations"
    }
  ];

  const decisionInsights = [
    { title: "Labor Cost Reduction", value: 18, suffix: "%", trend: "down", description: "Average across all locations" },
    { title: "Decision Speed", value: 3, suffix: "x", trend: "up", description: "Faster operational decisions" },
    { title: "Cost Variance Detected", value: 50, suffix: "K+", prefix: "$", trend: "saved", description: "Per location annually" },
    { title: "ROI Timeline", value: 30, suffix: " days", trend: "up", description: "Time to positive ROI" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-x-hidden">
      {/* Enhanced Hero Section with 4D Messaging */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-blue-50/80 via-purple-50/30 to-blue-50/60">
        <div className="absolute inset-0 gradient-mesh opacity-10"></div>
        
        {/* Animated Floating Orb with Enhanced Glow */}
        <motion.div
          className="absolute top-20 right-20 lg:top-32 lg:right-32 z-10 hidden md:block"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: [0, -8, 0],
            x: [0, 4, 0]
          }}
          transition={{ 
            opacity: { duration: 0.8, delay: 0.3 },
            scale: { duration: 0.6, delay: 0.2 },
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            x: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <Image
              src="/logos/sundae-orb.png"
              alt="Sundae Orb"
              width={140}
              height={140}
              className="drop-shadow-2xl"
              priority
            />
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-2xl"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>

        <div className="max-w-7xl mx-auto text-center relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="hero-h1 text-gray-900 mb-6">
              See Your Business in 4D
            </h1>
            <p className="body-xl text-gray-600 mb-6 max-w-4xl mx-auto">
              Stop guessing. Start knowing. Sundae unifies your data, benchmarks your performance, predicts what's next, and tells you exactly what to do.
            </p>
            <p className="body-base text-gray-500 mb-8 max-w-3xl mx-auto">
              Powered by <span className="font-semibold text-blue-600">Report</span>, <span className="font-semibold text-purple-600">Nexus</span>, <span className="font-semibold text-green-600">Insights</span>, and <span className="font-semibold text-orange-600">Canvas</span> — the complete intelligence stack for restaurants.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="primary" 
                size="lg" 
                className="bg-electric-blue text-white hover:bg-deep-blue transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={() => cta("/report", "get_report_hero", { page: "/home" })}
              >
                Get Sundae Report (Free)
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-gray-900 text-gray-900 bg-white hover:bg-gray-900 hover:text-white transition-all duration-300"
                onClick={() => cta("/4d-intelligence", "learn_4d_hero", { page: "/home" })}
              >
                See How 4D Intelligence Works →
              </Button>
            </div>
          </motion.div>
        </div>
        
        {/* Modern Animated Insight Cards with Pill Style */}
        <motion.div 
          className="absolute top-24 left-10 hidden lg:block"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.div 
            className="glass rounded-2xl shadow-xl p-4 border border-white/20 backdrop-blur-sm"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Labor Cost Alert</div>
            <div className="text-xl font-bold text-critical">+12% vs Benchmark</div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="absolute top-48 right-24 hidden lg:block"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <motion.div 
            className="glass rounded-2xl shadow-xl p-4 border border-white/20 backdrop-blur-sm"
            animate={{ 
              y: [0, -10, 0],
              boxShadow: ['0 10px 30px rgba(59, 130, 246, 0.2)', '0 15px 40px rgba(59, 130, 246, 0.4)', '0 10px 30px rgba(59, 130, 246, 0.2)']
            }}
            transition={{ 
              y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 },
              boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <div className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Sales Trend</div>
            <div className="text-xl font-bold text-positive flex items-center">
              <span className="mr-2">↑</span>
              <span>8% This Week</span>
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="absolute bottom-32 left-1/4 hidden xl:block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <motion.div 
            className="inline-flex items-center space-x-2 bg-electric-blue/90 backdrop-blur-sm text-white px-4 py-2 rounded-full shadow-lg border border-white/20"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          >
            <span className="text-sm font-medium">Staffing Optimization</span>
            <span className="text-lg font-bold">-3 Hours Needed</span>
          </motion.div>
        </motion.div>
        
        {/* Enhanced floating background elements */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-electric-blue/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-lavender/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </section>

      {/* NEW: The 1D Problem Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 mb-4">
              You're Running Your Business in 1D
            </h2>
            <p className="body-xl text-gray-600 max-w-3xl mx-auto">
              Sales vs. last week. Labor vs. last month. That's how most operators work — reactive, inward-looking, and always a step behind.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Rearview Mirror Reporting",
                description: "Basic reports tell you what happened. They don't tell you why it happened, how you compare, or what to do next.",
                icon: "📉",
                color: "from-gray-500 to-gray-600"
              },
              {
                title: "Problems Found Too Late",
                description: "By month-end, the damage is done. No early warnings. No predictive signals. Just expensive surprises.",
                icon: "⏰",
                color: "from-red-500 to-red-600"
              },
              {
                title: "Zero Market Visibility",
                description: "You can't see competitor pricing, category trends, or demand shifts. You're making decisions in a vacuum.",
                icon: "🕶️",
                color: "from-orange-500 to-orange-600"
              }
            ].map((problem, index) => (
              <motion.div
                key={problem.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <Card variant="elevated" className="h-full hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start space-x-4 mb-3">
                      <div className={`w-12 h-12 bg-gradient-to-br ${problem.color} rounded-lg flex items-center justify-center text-white text-2xl flex-shrink-0 shadow-lg`}>
                        {problem.icon}
                      </div>
                      <CardTitle className="text-gray-900">{problem.title}</CardTitle>
                    </div>
                    <CardDescription className="text-gray-600 leading-relaxed">
                      {problem.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW: The 4D Intelligence Model */}
      <section ref={dimensionsRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 mb-4">
              The 4D Intelligence Model
            </h2>
            <p className="body-xl text-gray-600 max-w-3xl mx-auto">
              Four dimensions of intelligence. What happened. What should have happened. How you compare. What's coming next.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                dimension: "1D",
                title: "What Happened",
                description: "Your operational truth. Sales, labor, covers, voids, waste — unified from POS, payroll, and inventory systems.",
                icon: "📊",
                color: "from-blue-500 to-blue-600",
                textColor: "text-blue-600"
              },
              {
                dimension: "2D",
                title: "Plan vs. Actual",
                description: "Are you on track? Compare actuals against budgets, forecasts, and targets across every location.",
                icon: "🎯",
                color: "from-purple-500 to-purple-600",
                textColor: "text-purple-600"
              },
              {
                dimension: "3D",
                title: "Market Context",
                description: "How do you stack up? Performance vs. benchmarks, peer groups, competitor pricing, and category trends.",
                icon: "🗺️",
                color: "from-green-500 to-green-600",
                textColor: "text-green-600"
              },
              {
                dimension: "4D",
                title: "What's Next",
                description: "AI-powered foresight. Predictions, proactive alerts, recommendations, and action plans — before problems hit.",
                icon: "🚀",
                color: "from-orange-500 to-orange-600",
                textColor: "text-orange-600"
              }
            ].map((dim, index) => (
              <motion.div
                key={dim.dimension}
                initial={{ opacity: 0, y: 30 }}
                animate={dimensionsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.2 } }}
              >
                <Card variant="elevated" className="h-full hover:shadow-2xl transition-all duration-300 group">
                  <CardHeader>
                    <div className="text-center mb-4">
                      <div className={`inline-flex w-16 h-16 bg-gradient-to-br ${dim.color} rounded-full items-center justify-center text-white text-3xl mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        {dim.icon}
                      </div>
                      <div className={`text-3xl font-bold ${dim.textColor} mb-2`}>{dim.dimension}</div>
                      <CardTitle className="text-xl text-gray-900 mb-3">{dim.title}</CardTitle>
                    </div>
                    <CardDescription className="text-gray-600 leading-relaxed text-center">
                      {dim.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              variant="primary" 
              size="lg" 
              className="shadow-lg hover:shadow-xl"
              onClick={() => cta("/4d-intelligence", "explore_4d_model", { page: "/home", section: "4d-intelligence" })}
            >
              Explore the 4D Intelligence Model →
            </Button>
          </div>
        </div>
      </section>

      {/* How Sundae Plugs Into Your World */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 mb-4">
              Get Started in Three Steps
            </h2>
            <p className="body-xl text-gray-600 max-w-3xl mx-auto">
              From fragmented data to unified intelligence
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Connect Your Systems",
                description: "Plug in your POS, labor, payroll, inventory, budgets, and reservations. We integrate with 25+ platforms.",
                icon: "🔗",
                color: "from-blue-500 to-blue-600"
              },
              {
                step: "2",
                title: "We Handle the Rest",
                description: "Your data is cleaned, standardized, and enriched with benchmarks, market context, and competitive intelligence.",
                icon: "✨",
                color: "from-purple-500 to-purple-600"
              },
              {
                step: "3",
                title: "Start Making Better Decisions",
                description: "Access unified dashboards, ask questions in plain English, get proactive alerts, and act on AI recommendations.",
                icon: "🚀",
                color: "from-orange-500 to-orange-600"
              }
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <Card variant="elevated" className="h-full hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="text-center mb-4">
                      <div className={`inline-flex w-16 h-16 bg-gradient-to-br ${step.color} rounded-full items-center justify-center text-white text-3xl mb-3 shadow-lg`}>
                        {step.icon}
                      </div>
                      <div className="text-2xl font-bold text-gray-400 mb-2">Step {step.step}</div>
                      <CardTitle className="text-xl text-gray-900 mb-3">{step.title}</CardTitle>
                    </div>
                    <CardDescription className="text-gray-600 leading-relaxed text-center">
                      {step.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Proven Results with Count-Up Animation */}
      <section ref={resultsRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-4">
            <h2 className="section-h2 text-gray-900 mb-4">
              Real Results from Real Operators
            </h2>
            <p className="body-sm text-gray-500 mb-8">
              Based on results from multi-location restaurant groups
            </p>
            <p className="body-xl text-gray-600 max-w-3xl mx-auto">
              Operators using Sundae see measurable impact within 30 days
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
            {decisionInsights.map((insight, index) => {
              const count = useCountUp(insight.value, 2000, resultsInView);
              return (
                <motion.div 
                  key={insight.title} 
                  className="text-center p-6 bg-white rounded-xl hover:shadow-lg transition-shadow duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={resultsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {insight.prefix}{count}{insight.suffix}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{insight.title}</h3>
                  <p className="text-sm text-gray-600">{insight.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* NEW: One Platform, Four Core Products */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 mb-4">
              Everything You Need, One Platform
            </h2>
            <p className="body-xl text-gray-600 max-w-3xl mx-auto">
              Four products. One intelligence layer. Zero data silos.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {coreProducts.map((product, index) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group cursor-pointer"
                onClick={() => cta(product.link, `view_${product.name.toLowerCase().replace(/\s+/g, "_")}`, { page: "/home", section: "core-products" })}
              >
                <Card variant="elevated" className="h-full hover:shadow-2xl transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-start space-x-4 mb-4">
                        <div className={`w-14 h-14 bg-gradient-to-br ${product.color} rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                          <SundaeIcon name={product.icon} size="lg" className="text-white" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-xl text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                            {product.name}
                          </CardTitle>
                          <p className="text-sm text-gray-500 font-medium mt-1">{product.subtitle}</p>
                        </div>
                      </div>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        {product.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                        <span>See {product.name}</span>
                        <motion.span
                          className="ml-2"
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                          →
                        </motion.span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW: Watchtower Highlight */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-deep-blue to-electric-blue text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-6xl mb-6">👁️</div>
              <h2 className="text-4xl font-bold mb-6">
                Watchtower: See the Market Before It Moves
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Stop operating in a vacuum. Get real-time visibility into competitor pricing, category trends, and market shifts — before they impact your business.
              </p>
              
              <ul className="space-y-4 mb-8">
                {[
                  "Real-time competitor pricing and promotions",
                  "Territory and category benchmarks",
                  "Alerts when the market moves and you're exposed"
                ].map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="text-2xl">✓</span>
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                variant="secondary" 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100"
                onClick={() => cta("/product/watchtower", "learn_watchtower", { page: "/home", section: "watchtower-highlight" })}
              >
                Learn More About Watchtower
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="glass rounded-2xl p-8 backdrop-blur-sm border border-white/20">
                <div className="space-y-6">
                  {[
                    { label: "Competitor Pricing", value: "Real-time", trend: "↑" },
                    { label: "Market Share", value: "+2.3%", trend: "↑" },
                    { label: "Category Growth", value: "8.5%", trend: "↑" }
                  ].map((metric, index) => (
                    <div key={index} className="flex justify-between items-center p-4 bg-white/10 rounded-xl">
                      <div>
                        <div className="text-sm opacity-80">{metric.label}</div>
                        <div className="text-2xl font-bold">{metric.value}</div>
                      </div>
                      <div className="text-3xl">{metric.trend}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 mb-4">
              Trusted by Operators Who Demand More
            </h2>
            <p className="body-xl text-gray-600">
              Leaders who've moved from guessing to knowing
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.2 } }}
              >
                <Card variant="elevated" className="h-full hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <p className="text-gray-600 mb-6 italic leading-relaxed">
                      "{testimonial.content}"
                    </p>
                    <div className="border-t border-gray-200 pt-4">
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                      <p className="text-sm text-blue-600 font-medium">{testimonial.company}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Final CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-h2 text-gray-900 mb-6">
            Ready to See Your Business Clearly?
          </h2>
          <p className="body-xl text-gray-600 mb-8">
            Join operators who've moved from reactive reports to proactive intelligence. See past, plan, peers, and predictions — all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Button 
              variant="primary" 
              size="lg"
              onClick={() => cta("/demo", "book_demo_footer_cta", { page: "/home" })}
            >
              Book a Demo
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => cta("/pricing", "view_pricing_footer_cta", { page: "/home" })}
            >
              Explore Plans & Pricing
            </Button>
          </div>
          <p className="text-sm text-gray-500">
            Or{" "}
            <button 
              onClick={() => cta("/report", "get_report_footer_link", { page: "/home" })}
              className="text-blue-600 hover:text-blue-700 font-medium underline bg-transparent border-none cursor-pointer"
            >
              get your free benchmark report first →
            </button>
          </p>
        </div>
      </section>
    </div>
  );
}
