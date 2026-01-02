'use client';

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useCta } from "@/lib/cta";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { HEADLINES, CTA_LABELS, VALUE_PROPS } from "@/lib/copy";

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

  const coreProducts: { name: string; subtitle: string; description: string; icon: SundaeIconName; cardClass: string; badge: string; badgeClass: string; link: string }[] = [
    {
      name: "Sundae Report",
      subtitle: "Historical Analysis & Benchmarking",
      description: "Start free. Upload your operational data and instantly see where you stand. Compare performance, identify margin opportunities, understand historical patterns. Perfect for testing Sundae and single-location operators.",
      icon: "report",
      cardClass: "card--report",
      badge: "FREE FOREVER",
      badgeClass: "badge--free",
      link: "/report"
    },
    {
      name: "Sundae Core",
      subtitle: "Real-Time Operations & Predictive Intelligence",
      description: "For operators who need to act, not just analyze. Near real-time intelligence with predictive alerts. Know what's happening now, understand why, get recommended actions before problems escalate.",
      icon: "core",
      cardClass: "card--core",
      badge: "MOST POPULAR",
      badgeClass: "badge--popular",
      link: "/core"
    },
    {
      name: "Watchtower",
      subtitle: "External Intelligence",
      description: "See outside your four walls. Real-time visibility into competitor activity, local events, and market shifts. Monitor competitors, predict demand changes, never be caught off guard.",
      icon: "watchtower",
      cardClass: "card--watchtower",
      badge: "ADD-ON",
      badgeClass: "badge--addon",
      link: "/watchtower"
    }
  ];

  const testimonials = [
    {
      name: "",
      role: "Multi-location restaurant group",
      content: "We saved $2,400/month by switching to Sundae from our previous analytics platform, and gained critical competitive intelligence through Watchtower. When our main competitor reduced prices by 15% during peak season, we were alerted within hours and adjusted our pricing strategy — retaining an estimated $5,000 in monthly revenue that would have been lost.",
      company: "Middle East"
    },
    {
      name: "", 
      role: "Group CFO",
      content: "Sundae surfaced a margin gap across our lunch dayparts in days. Our teams finally see where to take action, not just where numbers moved. The labor optimization recommendations alone paid for the platform in the first quarter.",
      company: "Multi-brand operator"
    },
    {
      name: "",
      role: "Operations Director",
      content: "For the first time, we can see exactly where to intervene — from menu performance to delivery profitability. Sundae turned our raw data into decisions my team could act on immediately. The predictive alerts have prevented several costly overstaffing situations.",
      company: "30+ locations"
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
            <div className="flex justify-center mb-6">
              <div
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-gradient-to-r from-[#F25929] via-[#D200FF] to-[#0373FF] text-xs sm:text-sm md:text-base font-semibold text-white shadow-lg shadow-sky-500/25 transition-transform duration-300 hover:scale-[1.02]"
              >
                <span className="inline-block h-2 w-2 rounded-full bg-white/90" />
                <span>See Every Layer. Miss Nothing.</span>
              </div>
            </div>
            <h1 className="hero-h1 text-gray-900 mb-6">
              Decision Intelligence for Restaurants & Hospitality Operations
            </h1>
            <p className="body-xl text-gray-600 dark:text-slate-300 leading-relaxed mb-4 max-w-4xl mx-auto">
              Clear, contextual, AI-powered visibility into your entire operation — instantly.
            </p>
            <p className="body-lg text-gray-500 mb-8 max-w-3xl mx-auto">
              One platform. Zero guesswork. Sundae analyzes performance, predicts what's coming, and tells your team exactly what to do next.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6 mb-6">
              <a href="/report" onClick={() => cta("/report", "start_free_report_hero", { page: "/home" })} className="btn-primary btn-lg">
                Start Free with Sundae Report
              </a>
              <a href="https://pricing.sundae.io" target="_blank" rel="noopener noreferrer" className="btn-secondary btn-lg">
                See Your Custom Pricing
              </a>
            </div>
            <p className="text-sm text-gray-500">
              Already running reports?{" "}
              <button 
                onClick={() => cta("/report", "free_benchmark_hero_link", { page: "/home" })}
                className="text-blue-600 hover:text-blue-700 font-medium underline bg-transparent border-none cursor-pointer"
              >
                Upload your data and get instant benchmarking — free, no commitment required.
              </button>
            </p>
          </motion.div>
        </div>
        
        {/* Subtle floating background elements */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-electric-blue/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-lavender/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </section>

      {/* Sub-Hero / Value Proposition */}
      <section aria-labelledby="value-prop-heading" className="bg-slate-50 dark:bg-slate-900/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="text-center">
            <h2 id="value-prop-heading" className="section-h2 text-gray-900 dark:text-white mb-4">
              Your Restaurant, Finally Understandable
            </h2>
            <p className="body-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A single source of truth for everything that matters — operations, sales, costs, labour, inventory, guest behaviour, and brand health. Built for leaders who want clarity, not dashboards.
            </p>
          </div>
        </div>
      </section>

      {/* Why Sundae Section */}
      <section aria-labelledby="why-sundae-heading" className="bg-white dark:bg-slate-950/90">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="text-center mb-8">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-500 mb-4">
              WHY SUNDAE
            </p>
            <h2 id="why-sundae-heading" className="section-h2 text-gray-900 dark:text-white">
              Why Sundae
            </h2>
          </div>

          <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
            {/* Card 1: Clarity */}
            <div className="rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70 shadow-sm p-4 sm:p-5">
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50">Clarity You Can Feel</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Not charts. Not noise. Just the truth of your business, distilled into direction.
              </p>
            </div>

            {/* Card 2: AI-Native */}
            <div className="rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70 shadow-sm p-4 sm:p-5">
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50">AI-Native From Day One</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Built to think like an operator — not a spreadsheet.
              </p>
            </div>

            {/* Card 3: Unified */}
            <div className="rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70 shadow-sm p-4 sm:p-5">
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50">One Platform for the Whole Restaurant</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                No more scattered systems. No more blind spots.
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
              Three Intelligence Layers. One Decision Platform.
            </h2>
            <p className="body-xl text-gray-600 max-w-3xl mx-auto">
              Choose the intelligence you need. Add what makes sense. Scale as you grow.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 card-grid">
            {coreProducts.map((product, index) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="group cursor-pointer"
                onClick={() => cta(product.link, `view_${product.name.toLowerCase().replace(/\s+/g, "_")}`, { page: "/home", section: "core-products" })}
              >
                <div className={`card ${product.cardClass} h-full`}>
                  <div className="mb-4">
                    <div className="product-icon">
                      <SundaeIcon name={product.icon} size="xl" className="text-white" />
                    </div>
                    <span className={`badge ${product.badgeClass} inline-block mb-3`}>
                      {product.badge}
                    </span>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 font-medium mb-4">{product.subtitle}</p>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {product.description}
                    </p>
                    <a href={product.link} className="btn-link" onClick={(e) => e.stopPropagation()}>
                      Learn more
                    </a>
                  </div>
                </div>
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

      {/* Modules Section */}
      <section aria-labelledby="modules-heading" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-500 mb-4">
              SPECIALIZED MODULES
            </p>
            <h2 id="modules-heading" className="section-h2 text-gray-900 mb-4">
              Specialized Modules for Deeper Intelligence
            </h2>
            <p className="body-xl text-gray-600 max-w-3xl mx-auto">
              Go beyond core analytics. Add focused modules for your specific challenges. Each module integrates seamlessly with Report or Core.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {([
              { name: "Labor Intelligence", description: "Schedule optimization, overtime reduction, demand forecasting", icon: "labor" as SundaeIconName },
              { name: "Inventory Intelligence", description: "Waste tracking, par levels, cost recipes", icon: "inventory" as SundaeIconName },
              { name: "Purchasing Intelligence", description: "Vendor comparison, contracts, supply chain", icon: "purchasing" as SundaeIconName },
              { name: "Marketing Intelligence", description: "Campaign ROI, CAC tracking, channel attribution", icon: "marketing" as SundaeIconName },
              { name: "Reservations Intelligence", description: "Table optimization, no-shows, waitlist management", icon: "reservations" as SundaeIconName }
            ]).map((module, index) => (
              <motion.div
                key={module.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <div className="flex items-start space-x-4 p-5 bg-white rounded-xl border border-slate-200/70 shadow-sm hover:shadow-md transition-all duration-300 h-full">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-lg">
                    <SundaeIcon name={module.icon} size="lg" className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{module.name}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{module.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="primary" 
                size="lg"
                onClick={() => cta("/modules", "explore_modules", { page: "/home", section: "modules" })}
              >
                Explore All Modules
              </Button>
              <a href="https://pricing.sundae.io" target="_blank" rel="noopener noreferrer">
                <Button 
                  variant="outline" 
                  size="lg"
                >
                  See Module Pricing
                </Button>
              </a>
            </div>
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
                icon: "data" as SundaeIconName,
                color: "from-blue-500 to-blue-600",
                textColor: "text-blue-600"
              },
              {
                dimension: "2D",
                title: "Plan vs. Actual",
                description: "Are you on track? Compare actuals against budgets, forecasts, and targets across every location.",
                icon: "benchmarking" as SundaeIconName,
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
                icon: "forecasting" as SundaeIconName,
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
                icon: "operators" as SundaeIconName,
                color: "from-blue-500 to-blue-600"
              },
              {
                title: "Finance & FP&A",
                description: "Understand the story behind every variance and model the impact of decisions before you roll them out.",
                icon: "finance" as SundaeIconName,
                color: "from-purple-500 to-purple-600"
              },
              {
                title: "C-suite & owners",
                description: "Get a simple, unified view of performance across brands, geographies, and partners.",
                icon: "owners" as SundaeIconName,
                color: "from-green-500 to-green-600"
              },
              {
                title: "Data & technology teams",
                description: "Keep clean pipelines, governance, and an opinionated metrics layer — without becoming the bottleneck.",
                icon: "technology" as SundaeIconName,
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
              Trusted by Operators Who Run the Region
            </h2>
            <p className="body-xl text-gray-600">
              Leaders across Dubai, Abu Dhabi, and the GCC who've moved from guessing to knowing.
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
            See Sundae in action →
          </h2>
          <p className="body-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            A 15-minute walkthrough that changes how you run your business.
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
