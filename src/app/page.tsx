'use client';

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

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
  const resultsRef = useRef(null);
  const challengesRef = useRef(null);
  const flowRef = useRef(null);
  
  const resultsInView = useInView(resultsRef, { once: true, margin: "-100px" });
  const challengesInView = useInView(challengesRef, { once: true, margin: "-100px" });
  const flowInView = useInView(flowRef, { once: true, margin: "-100px" });

  const coreProducts = [
    {
      name: "Sundae Report",
      subtitle: "Free restaurant benchmarking",
      description: "Upload your data once and see where you stand on sales, labour, COGS, and operations vs similar restaurants in your region.",
      icon: "📊",
      color: "from-blue-500 to-blue-600",
      link: "/report"
    },
    {
      name: "Sundae Nexus",
      subtitle: "Conversational business intelligence",
      description: "Ask plain-English questions like 'Which outlets grew the fastest last weekend?' and get instant answers with charts and AI-generated context.",
      icon: "🚀",
      color: "from-purple-500 to-purple-600",
      link: "/nexus"
    },
    {
      name: "Sundae Insights",
      subtitle: "Real-world context and signals",
      description: "Connect your performance data to weather, events, and market trends so you can see what's driving each change in your numbers.",
      icon: "💡",
      color: "from-green-500 to-green-600",
      link: "/insights"
    },
    {
      name: "Sundae Canvas",
      subtitle: "Live dashboards for every team",
      description: "Turn complex datasets into clear dashboards for execs, operations, and finance — automatically updated as new data flows in.",
      icon: "📈",
      color: "from-orange-500 to-orange-600",
      link: "/canvas"
    }
  ];

  const intelligenceCapabilities = [
    {
      name: "Unified Data Intelligence",
      description: "Connect POS, labor, cost, and performance data into one intelligent layer across all locations",
      icon: "🔗",
      color: "bg-deep-blue"
    },
    {
      name: "Real-time AI Insights", 
      description: "Get instant alerts and recommendations when metrics deviate from benchmarks or targets",
      icon: "⚡",
      color: "bg-electric-blue"
    },
    {
      name: "Benchmarking Engine",
      description: "Compare performance against similar restaurants in your region and segment",
      icon: "📊",
      color: "bg-lavender"
    },
    {
      name: "Predictive Signals",
      description: "Anticipate issues before they impact your bottom line with AI forecasting and pattern detection",
      icon: "🔮",
      color: "bg-coral"
    },
    {
      name: "Multi-unit Visibility",
      description: "Enterprise-grade dashboards for portfolio-wide decision making across all your locations",
      icon: "🏢",
      color: "bg-aqua"
    },
    {
      name: "Anomaly Detection",
      description: "Automatically identify unusual patterns in sales, labor, and costs across dayparts and locations",
      icon: "🚨",
      color: "bg-warning"
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Enhanced Hero Section */}
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
              Decision Intelligence for Restaurants
            </h1>
            <p className="body-xl text-gray-600 mb-6 max-w-4xl mx-auto">
              The AI platform that turns data into action — unify data, benchmark performance, and get instant insights.
            </p>
            <p className="body-base text-gray-500 mb-8 max-w-3xl mx-auto">
              Powered by <span className="font-semibold text-blue-600">Sundae Report</span>, <span className="font-semibold text-purple-600">Nexus</span>, <span className="font-semibold text-green-600">Insights</span>, and <span className="font-semibold text-orange-600">Canvas</span> — the decision intelligence stack for restaurants and hospitality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/report">
                <Button variant="primary" size="lg" className="bg-electric-blue text-white hover:bg-deep-blue transition-all duration-300 shadow-lg hover:shadow-xl">
                  Get Sundae Report (Free)
                </Button>
              </Link>
              <Link href="/demo">
                <Button variant="outline" size="lg" className="border-2 border-gray-900 text-gray-900 bg-white hover:bg-gray-900 hover:text-white transition-all duration-300">
                  Book a Demo
                </Button>
              </Link>
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

      {/* Proven Results with Count-Up Animation */}
      <section ref={resultsRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-4">
            <h2 className="section-h2 text-gray-900 mb-4">
              Proven Decision Intelligence Results
            </h2>
            <p className="body-sm text-gray-500 mb-8">
              Based on results from multi-location restaurant groups using Sundae
            </p>
            <p className="body-xl text-gray-600 max-w-3xl mx-auto">
              See how restaurants achieve measurable improvements with Sundae's decision intelligence platform
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
            {decisionInsights.map((insight, index) => {
              const count = useCountUp(insight.value, 2000, resultsInView);
              return (
                <motion.div 
                  key={insight.title} 
                  className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl hover:shadow-lg transition-shadow duration-300"
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 mb-4">
              One Platform, Four Core Products
            </h2>
            <p className="body-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to move from raw data to confident decisions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {coreProducts.map((product, index) => (
              <Link key={product.name} href={product.link}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="group"
                >
                  <Card variant="elevated" className="h-full hover:shadow-2xl transition-all duration-300 cursor-pointer">
                    <CardHeader>
                      <div className="flex items-start space-x-4 mb-4">
                        <div className={`w-14 h-14 bg-gradient-to-br ${product.color} rounded-xl flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                          {product.icon}
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
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sundae Intelligence Capabilities (Moved from Core Modules) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 mb-4">
              Sundae Intelligence Capabilities
            </h2>
            <p className="body-xl text-gray-600 max-w-3xl mx-auto">
              Under the hood, Sundae combines six powerful capabilities to deliver decision intelligence across your restaurants
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {intelligenceCapabilities.map((capability, index) => (
              <motion.div
                key={capability.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <Card variant="elevated" className="h-full hover:shadow-xl transition-all duration-300 group">
                  <CardHeader>
                    <div className="flex items-center space-x-4 mb-3">
                      <div className={`w-12 h-12 ${capability.color} rounded-lg flex items-center justify-center text-white text-xl group-hover:scale-110 transition-transform duration-300`}>
                        {capability.icon}
                      </div>
                      <CardTitle className="text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                        {capability.name}
                      </CardTitle>
                    </div>
                    <CardDescription className="text-gray-600 leading-relaxed">
                      {capability.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-blue-600 font-medium group-hover:text-blue-700 transition-colors flex items-center">
                      <span>Learn more</span>
                      <span className="ml-1">→</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Three Critical Challenges with Staggered Animations */}
      <section ref={challengesRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-deep-blue to-electric-blue text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 mb-4">
              Three Critical Challenges We Solve
            </h2>
            <p className="body-xl opacity-90 max-w-3xl mx-auto">
              Data fragmentation, missed opportunities, and slow decision-making in restaurant operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                problem: "Data Fragmentation",
                solution: "POS, labor, inventory, and financial data scattered across systems — Sundae unifies them into one intelligence layer.",
                icon: "🔗",
                result: "360° visibility across all operational data"
              },
              {
                problem: "Missed Revenue Opportunities",
                solution: "Hidden patterns in sales, pricing, and customer behavior that cost restaurants thousands monthly.",
                icon: "💰",
                result: "$50K+ additional revenue per location annually"
              },
              {
                problem: "Slow Decision-Making",
                solution: "Waiting for weekly reports while problems grow — get instant alerts and actionable recommendations.",
                icon: "⚡",
                result: "From days to minutes for critical decisions"
              }
            ].map((item, index) => (
              <motion.div 
                key={item.problem} 
                className="text-center group"
                initial={{ opacity: 0, y: 30 }}
                animate={challengesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl mx-auto mb-4 group-hover:bg-white/30 transition-colors duration-300">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-lg mb-3">{item.problem}</h3>
                <p className="text-sm opacity-90 mb-3 leading-relaxed">{item.solution}</p>
                <div className="bg-white/10 rounded-lg p-3 group-hover:bg-white/20 transition-colors duration-300">
                  <p className="text-xs font-medium">{item.result}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* From Data to Decisions with Horizontal Flow */}
      <section ref={flowRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-4">
            <h2 className="section-h2 text-gray-900 mb-4">
              From Data to Decisions in Real-Time
            </h2>
            <p className="body-lg text-gray-500 max-w-2xl mx-auto mb-8">
              How Sundae transforms raw restaurant data into decision-ready intelligence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connection lines on desktop */}
            <div className="hidden md:block absolute top-10 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-orange-200 z-0" style={{ width: '75%', marginLeft: '12.5%' }}></div>
            
            {[
              {
                step: "1",
                title: "Data Integration",
                description: "Connect POS, labor, inventory, and financial data into one intelligent layer.",
                icon: "🔗",
                color: "from-blue-500 to-blue-600"
              },
              {
                step: "2", 
                title: "AI Analysis",
                description: "Machine learning algorithms identify patterns and anomalies in real-time.",
                icon: "🤖",
                color: "from-purple-500 to-purple-600"
              },
              {
                step: "3",
                title: "Benchmarking",
                description: "Compare performance against similar restaurants and industry standards.",
                icon: "📊",
                color: "from-green-500 to-green-600"
              },
              {
                step: "4",
                title: "Actionable Insights",
                description: "Get specific recommendations to improve revenue and reduce costs.",
                icon: "💡",
                color: "from-orange-500 to-orange-600"
              }
            ].map((step, index) => (
              <motion.div 
                key={step.title} 
                className="text-center group relative z-10"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={flowInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <div className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg relative`}>
                  {step.icon}
                  {index < 3 && (
                    <motion.div 
                      className="hidden md:block absolute -right-12 top-1/2 transform -translate-y-1/2 text-gray-300"
                      initial={{ opacity: 0, x: -10 }}
                      animate={flowInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
                    >
                      →
                    </motion.div>
                  )}
                </div>
                <div className="text-2xl font-bold text-gray-400 mb-2">{step.step}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 mb-4">
              Trusted by Hospitality Leaders
            </h2>
            <p className="body-xl text-gray-600">
              See how operators achieve measurable decision intelligence improvements
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-h2 text-gray-900 mb-6">
            Ready to Transform Your Restaurant Operations?
          </h2>
          <p className="body-xl text-gray-600 mb-8">
            Join leading restaurant groups already using Sundae to unify data, 
            benchmark performance, and make smarter decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Link href="/pricing">
              <Button variant="primary" size="lg">
                Explore Plans & Pricing
              </Button>
            </Link>
            <Link href="/demo">
              <Button variant="outline" size="lg">
                Book a Demo
              </Button>
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Or{" "}
            <Link href="/report" className="text-blue-600 hover:text-blue-700 font-medium underline">
              get your free benchmark report first →
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
