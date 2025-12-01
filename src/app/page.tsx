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
        
        {/* Animated Floating Orb with Enhanced Glow - Desktop only, far right */}
        <motion.div
          className="absolute top-24 right-8 xl:top-28 xl:right-16 2xl:right-24 z-10 hidden xl:block pointer-events-none"
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
            className="relative w-28 h-28 xl:w-32 xl:h-32"
          >
            <Image
              src="/logos/sundae-orb.png"
              alt="Sundae Orb"
              width={128}
              height={128}
              className="drop-shadow-2xl w-full h-full object-contain"
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
            <p className="text-sm font-medium text-blue-600 mb-4 tracking-wide">
              See every layer. Miss nothing.
            </p>
            <h1 className="hero-h1 text-gray-900 mb-6">
              Turn Restaurant Data into Decisions. Automatically.
            </h1>
            <p className="body-xl text-gray-600 mb-4 max-w-4xl mx-auto">
              Sundae is the AI-powered Decision Intelligence platform for multi-location restaurants.
            </p>
            <p className="body-lg text-gray-500 mb-8 max-w-3xl mx-auto">
              It connects your POS, labor, inventory, and demand data, spots what actually matters, and tells your teams exactly what to do next.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Button 
                variant="primary" 
                size="lg" 
                className="bg-electric-blue text-white hover:bg-deep-blue transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={() => cta("/demo", "book_demo_hero", { page: "/home" })}
              >
                Book a Demo
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-gray-900 text-gray-900 bg-white hover:bg-gray-900 hover:text-white transition-all duration-300"
                onClick={() => cta("/4d-intelligence", "learn_4d_hero", { page: "/home" })}
              >
                See How It Works →
              </Button>
            </div>
            <p className="text-sm text-gray-500">
              Already running reports?{" "}
              <button 
                onClick={() => cta("/report", "free_report_hero_link", { page: "/home" })}
                className="text-blue-600 hover:text-blue-700 font-medium underline bg-transparent border-none cursor-pointer"
              >
                Upload your data and get a free Sundae benchmark in minutes.
              </button>
            </p>
          </motion.div>
        </div>
        
        {/* Modern Animated Insight Cards - Desktop only, positioned to avoid text */}
        <motion.div 
          className="absolute top-20 left-4 xl:top-24 xl:left-8 2xl:left-12 hidden xl:block pointer-events-none"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.div 
            className="glass rounded-2xl shadow-xl p-3 border border-white/20 backdrop-blur-sm max-w-[180px]"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">Labor Cost Alert</div>
            <div className="text-lg font-bold text-critical">+12% vs Benchmark</div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="absolute top-56 right-4 xl:top-64 xl:right-8 2xl:right-12 hidden xl:block pointer-events-none"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <motion.div 
            className="glass rounded-2xl shadow-xl p-3 border border-white/20 backdrop-blur-sm max-w-[180px]"
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
            <div className="text-lg font-bold text-positive flex items-center">
              <span className="mr-2">↑</span>
              <span>8% This Week</span>
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="absolute bottom-24 left-8 xl:bottom-28 xl:left-12 hidden 2xl:block pointer-events-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <motion.div 
            className="inline-flex items-center space-x-2 bg-electric-blue/90 backdrop-blur-sm text-white px-3 py-2 rounded-full shadow-lg border border-white/20 max-w-[240px]"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          >
            <span className="text-sm font-medium">Staffing Optimization</span>
            <span className="text-base font-bold">-3 Hours</span>
          </motion.div>
        </motion.div>
        
        {/* Enhanced floating background elements */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-electric-blue/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-lavender/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </section>

      {/* Why Sundae. Why Now. Section */}
      <section aria-labelledby="why-sundae-heading" className="bg-slate-50 dark:bg-slate-900/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="text-center">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-500 mb-4">
              WHY SUNDAE, WHY NOW
            </p>
            <h2 id="why-sundae-heading" className="section-h2 text-gray-900 dark:text-white mb-4">
              Restaurant data is everywhere. Decisions aren't.
            </h2>
            <p className="body-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Most restaurant groups are drowning in reports and dashboards. Sundae turns raw POS, labor, and demand data into clear, prioritized actions your teams can actually use.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:gap-6 md:grid-cols-3">
            {/* Card 1: Signal, not noise */}
            <div className="rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 shadow-sm p-4 sm:p-5">
              <p className="text-sm font-semibold text-sky-600 dark:text-sky-400">Signal, not noise</p>
              <h3 className="mt-1 text-base font-semibold text-slate-900 dark:text-slate-50">From dashboards to decisions</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Sundae doesn't just surface KPIs. It explains what changed, why it changed, and what actions operators should take this week.
              </p>
            </div>

            {/* Card 2: Built with operators */}
            <div className="rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 shadow-sm p-4 sm:p-5">
              <p className="text-sm font-semibold text-sky-600 dark:text-sky-400">Built with operators</p>
              <h3 className="mt-1 text-base font-semibold text-slate-900 dark:text-slate-50">Designed around multi-location reality</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Connects POS, labor, inventory, and demand data across brands, concepts, and regions so leaders finally see the full picture.
              </p>
            </div>

            {/* Card 3: Beyond BI */}
            <div className="rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 shadow-sm p-4 sm:p-5">
              <p className="text-sm font-semibold text-sky-600 dark:text-sky-400">Beyond BI</p>
              <h3 className="mt-1 text-base font-semibold text-slate-900 dark:text-slate-50">AI that thinks like your best manager</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Our agents monitor your data 24/7, flag anomalies early, and recommend concrete steps — before issues hit your P&L.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What is Sundae? - Four Core Products */}
      <section aria-labelledby="what-is-sundae-heading" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-500 mb-4">
              WHAT IS SUNDAE?
            </p>
            <h2 id="what-is-sundae-heading" className="section-h2 text-gray-900 mb-4">
              One platform. Four core products.
            </h2>
            <p className="body-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to move from 1D reports to 4D intelligence — in one stack that operators, finance, and data teams can share.
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
                      <span>Learn more</span>
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

          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => cta("/product", "explore_products", { page: "/home", section: "core-products" })}
            >
              Explore the full product →
            </Button>
          </div>
        </div>
      </section>

      {/* Trust / Social Proof Section */}
      <section aria-labelledby="trust-heading" className="bg-white dark:bg-slate-950/90 border-y border-slate-100 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          {/* Top row: label + heading */}
          <div className="text-center">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-500 mb-4">
              TRUSTED BY MODERN RESTAURANT GROUPS
            </p>
            <h2 id="trust-heading" className="section-h2 text-gray-900 dark:text-white mb-4">
              Operators, finance leaders, and tech teams are rolling Sundae out together.
            </h2>
            <p className="body-base text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              From fast-growing concepts to global hospitality groups, Sundae is becoming the shared decision layer for operations, finance, and data teams.
            </p>
          </div>

          {/* Middle row: logos strip */}
          {/* TODO: Replace placeholder chips with actual customer logos when available */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {[
              'GLOBAL HOTEL GROUP',
              'MULTI-BRAND OPERATOR',
              'FRANCHISE PLATFORM',
              'EARLY ADOPTER (125+ SITES)',
            ].map(label => (
              <span
                key={label}
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold tracking-wide text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              >
                {label}
              </span>
            ))}
          </div>

          {/* Bottom row: testimonial + key metric */}
          <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            {/* Testimonial */}
            <div className="max-w-xl">
              <p className="text-base sm:text-lg font-medium text-slate-900 dark:text-slate-50 leading-relaxed">
                "Sundae surfaced a margin gap across our lunch dayparts in days. Our teams finally see where to take action, not just where numbers moved."
              </p>
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                Group CFO, multi-brand restaurant group (name confidential)
              </p>
            </div>

            {/* Metric */}
            <div className="md:text-right">
              <p className="text-3xl font-semibold text-sky-600 dark:text-sky-400">+9%</p>
              <p className="mt-1 text-xs font-semibold tracking-[0.18em] uppercase text-slate-500">
                Margin opportunity detected
              </p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Example of a real Sundae insight surfaced during early rollouts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The 4D Intelligence Model */}
      <section ref={dimensionsRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 mb-4">
              The 4D Intelligence Model
            </h2>
            <p className="body-xl text-gray-600 max-w-3xl mx-auto">
              Four dimensions of Decision Intelligence. What happened. What should have happened. How you compare. What's coming next.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {([
              {
                dimension: "1D",
                title: "What Happened",
                description: "Your operational truth. Sales, labor, covers, voids, waste — unified from POS, payroll, and inventory systems.",
                icon: "benchmarking" as SundaeIconName,
                color: "from-blue-500 to-blue-600",
                textColor: "text-blue-600"
              },
              {
                dimension: "2D",
                title: "Plan vs. Actual",
                description: "Are you on track? Compare actuals against budgets, forecasts, and targets across every location.",
                icon: "marketing" as SundaeIconName,
                color: "from-purple-500 to-purple-600",
                textColor: "text-purple-600"
              },
              {
                dimension: "3D",
                title: "Market Context",
                description: "How do you stack up? Performance vs. benchmarks, peer groups, competitor pricing, and category trends.",
                icon: "multiLocation" as SundaeIconName,
                color: "from-green-500 to-green-600",
                textColor: "text-green-600"
              },
              {
                dimension: "4D",
                title: "What's Next",
                description: "AI-powered foresight. Predictions, proactive alerts, recommendations, and action plans — before problems hit.",
                icon: "growth" as SundaeIconName,
                color: "from-orange-500 to-orange-600",
                textColor: "text-orange-600"
              }
            ]).map((dim, index) => (
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
                      <div className={`inline-flex w-16 h-16 bg-gradient-to-br ${dim.color} rounded-full items-center justify-center text-white mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <SundaeIcon name={dim.icon} size="xl" className="text-white" />
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

      {/* How Sundae Works - 4 Steps */}
      <section aria-labelledby="how-it-works-heading" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-500 mb-4">
              HOW IT WORKS
            </p>
            <h2 id="how-it-works-heading" className="section-h2 text-gray-900 mb-4">
              From raw data to recommended actions in four steps.
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {([
              {
                step: "1",
                title: "Connect",
                subtitle: "Data unification",
                description: "Plug in POS, workforce, inventory, and external data. Sundae cleans and unifies it behind the scenes.",
                icon: "integration" as SundaeIconName,
                color: "from-blue-500 to-blue-600"
              },
              {
                step: "2",
                title: "Understand",
                subtitle: "Patterns & anomalies",
                description: "AI agents scan performance, spot outliers, and separate normal noise from issues that actually matter.",
                icon: "insights" as SundaeIconName,
                color: "from-purple-500 to-purple-600"
              },
              {
                step: "3",
                title: "Decide",
                subtitle: "Recommendations & playbooks",
                description: "Sundae suggests specific actions — from staffing changes to menu tweaks — with explainable logic.",
                icon: "aiOs" as SundaeIconName,
                color: "from-green-500 to-green-600"
              },
              {
                step: "4",
                title: "Improve",
                subtitle: "Feedback & learning",
                description: "Every decision and outcome makes Sundae smarter, so your playbooks and benchmarks keep getting better.",
                icon: "growth" as SundaeIconName,
                color: "from-orange-500 to-orange-600"
              }
            ]).map((step, index) => (
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
                      <div className={`inline-flex w-14 h-14 bg-gradient-to-br ${step.color} rounded-full items-center justify-center text-white mb-3 shadow-lg`}>
                        <SundaeIcon name={step.icon} size="lg" className="text-white" />
                      </div>
                      <div className="text-lg font-bold text-gray-400 mb-1">Step {step.step}</div>
                      <CardTitle className="text-lg text-gray-900 mb-1">{step.title}</CardTitle>
                      <p className="text-sm text-gray-500 font-medium">{step.subtitle}</p>
                    </div>
                    <CardDescription className="text-gray-600 leading-relaxed text-center text-sm">
                      {step.description}
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
              onClick={() => cta("/demo", "see_sundae_action", { page: "/home", section: "how-it-works" })}
            >
              See Sundae in action →
            </Button>
          </div>
        </div>
      </section>

      {/* Who Sundae is For */}
      <section aria-labelledby="who-its-for-heading" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-500 mb-4">
              BUILT FOR MODERN RESTAURANT TEAMS
            </p>
            <h2 id="who-its-for-heading" className="section-h2 text-gray-900 mb-4">
              One platform. Different views for every team.
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {([
              {
                title: "Operations leaders",
                description: "See which locations need help this week — and why — without digging through 20 reports.",
                icon: "multiLocation" as SundaeIconName,
                color: "from-blue-500 to-blue-600"
              },
              {
                title: "Finance & FP&A",
                description: "Understand the story behind every variance and model the impact of decisions before you roll them out.",
                icon: "marketing" as SundaeIconName,
                color: "from-purple-500 to-purple-600"
              },
              {
                title: "C-suite & owners",
                description: "Get a simple, unified view of performance across brands, geographies, and partners.",
                icon: "growth" as SundaeIconName,
                color: "from-green-500 to-green-600"
              },
              {
                title: "Data & technology teams",
                description: "Keep clean pipelines, governance, and an opinionated metrics layer — without becoming the bottleneck.",
                icon: "integration" as SundaeIconName,
                color: "from-orange-500 to-orange-600"
              }
            ]).map((audience, index) => (
              <motion.div
                key={audience.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <div className="flex items-start space-x-4 p-5 bg-white rounded-2xl border border-slate-200/70 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className={`w-12 h-12 bg-gradient-to-br ${audience.color} rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-lg`}>
                    <SundaeIcon name={audience.icon} size="lg" className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{audience.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{audience.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Tools Section */}
      <section aria-labelledby="free-tools-heading" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-500 mb-4">
              FREE TOOLS FOR OPERATORS
            </p>
            <h2 id="free-tools-heading" className="section-h2 text-gray-900 mb-4">
              Start with calculators. Grow into the full platform.
            </h2>
            <p className="body-lg text-gray-600 max-w-3xl mx-auto">
              Not ready for a full rollout? Use Sundae's free tools to stress-test your margins and labor plan first.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {([
              { name: "Labor Cost Calculator", link: "/tools/labor-cost", icon: "benchmarking" as SundaeIconName },
              { name: "Menu Margin Analyzer", link: "/tools/menu-margin", icon: "insights" as SundaeIconName },
              { name: "Break-even Covers", link: "/tools/breakeven-covers", icon: "growth" as SundaeIconName }
            ]).map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="cursor-pointer"
                onClick={() => cta(tool.link, `view_tool_${tool.name.toLowerCase().replace(/\s+/g, "_")}`, { page: "/home", section: "free-tools" })}
              >
                <div className="flex items-center space-x-3 p-4 bg-slate-50 rounded-xl border border-slate-200/70 hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-300">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white shadow">
                    <SundaeIcon name={tool.icon} size="md" className="text-white" />
                  </div>
                  <span className="font-medium text-gray-900">{tool.name}</span>
                  <span className="ml-auto text-blue-600">→</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => cta("/tools", "browse_all_tools", { page: "/home", section: "free-tools" })}
            >
              Browse all tools →
            </Button>
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

      {/* Watchtower Highlight */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-deep-blue to-electric-blue text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <SundaeIcon name="watchtower" size="xl" className="text-white" />
              </div>
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

      {/* Final CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-h2 text-gray-900 mb-6">
            Ready to see your restaurant the way your best operator does?
          </h2>
          <p className="body-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Bring your POS and labor data to a 30-minute session. We'll show you exactly where Sundae can surface margin and efficiency opportunities — or point you to quick wins you can implement today.
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
              onClick={() => cta("/report", "get_report_footer_cta", { page: "/home" })}
            >
              Get a Free Sundae Report →
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
