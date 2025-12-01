"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";

// Counter animation component
function AnimatedCounter({ end, duration = 2, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const startValue = 0;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      
      const easeOutQuad = (t: number) => t * (2 - t);
      const currentCount = Math.floor(startValue + (end - startValue) * easeOutQuad(progress));
      
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

// Fade up animation component
function FadeUpSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function AboutPage() {
  const leadership = [
    {
      name: "Robert Laryea",
      role: "Founder & CEO",
      location: "Dubai",
      image: "/team/robert-laryea.jpg",
      bullets: [
        "20+ years leading consulting and global transformation programs",
        "Deep F&B operator experience — saw fragmented restaurant data pain first-hand",
        "Scaled restaurant concepts from zero to $10M+ annual revenue",
        "Founded Sundae to unify data, market context, and AI into one restaurant operating layer"
      ]
    },
    {
      name: "Daanish Siddiqui",
      role: "Chief Growth Officer",
      location: "Dubai",
      image: "/team/daanish-siddiqui.jpg",
      bullets: [
        "18+ years turning ideas into $100M+ businesses",
        "Expert in product, marketing, and go-to-market execution",
        "5x founder with 2 successful exits",
        "Specialist in 0→1 category creation and PLG-driven growth"
      ]
    },
    {
      name: "Alissa Parabani",
      role: "Head of Product",
      location: "Toronto",
      image: "/team/alissa-parabani.jpg",
      bullets: [
        "Former Walmart Canada systems engineer",
        "Translates operator needs into measurable product ROI",
        "Takes concepts from idea to live product in record time",
        "Track record: 3 product lines launched, all profitable within 18 months"
      ]
    },
    {
      name: "Naveed Nadir",
      role: "Head of Technology",
      location: "Toronto",
      image: "/team/naveed-nadir.jpg",
      bullets: [
        "Built enterprise SaaS platforms handling 10M+ daily transactions",
        "Seasoned engineer across automotive and enterprise SaaS",
        "Expert in building secure, compliant systems at global scale",
        "World-class SaaS infrastructure and reliability leadership"
      ]
    }
  ];

  const milestones = [
    {
      year: "2025",
      title: "Sundae Founded",
      description: "Created to solve fragmented restaurant data challenges through unified data and AI-powered intelligence."
    },
    {
      year: "2025",
      title: "First POC Clients",
      description: "Partnered with 35-brand and multi-country restaurant groups to unify data, benchmark performance, and deploy core intelligence modules."
    },
    {
      year: "2026",
      title: "GCC Expansion",
      description: "Launched across UAE, KSA, and Qatar with enterprise hospitality clients adopting the Sundae Intelligence Stack for group-wide deployment."
    },
    {
      year: "2026",
      title: "Category Leadership",
      description: "Defined the Restaurant Decision Intelligence category globally — standardizing how operators analyze data, drive performance, and make decisions."
    },
    {
      year: "2026",
      title: "Global Intelligence Platform",
      description: "Expansion across Asia & Europe. Launching Sundae Enterprise Intelligence for multi-country brands and large-scale operators."
    }
  ];

  const values: { title: string; description: string; icon: SundaeIconName }[] = [
    {
      title: "Operators First",
      description: "Every feature is designed by people who've managed restaurants, not just built software. We solve real problems because we've lived them.",
      icon: "owners"
    },
    {
      title: "Data Intelligence First",
      description: "Unified data and AI insights create better operational decisions. We turn fragmented systems into one intelligent layer.",
      icon: "insights"
    },
    {
      title: "Real-Time Decisions",
      description: "Instant intelligence should guide every operational move. No more waiting for weekly reports or relying on gut feelings.",
      icon: "speed"
    },
    {
      title: "Raise the Standard",
      description: "We're committed to elevating restaurant decision intelligence globally — setting a new benchmark for the industry.",
      icon: "growth"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-white via-pure-white to-blue-50 dark:from-graphite-black dark:via-gray-900 dark:to-deep-blue/10">
      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <FadeUpSection>
            <h1 className="hero-h1 text-gray-900 dark:text-white mb-8">
              We're Building the Future of{" "}
              <span className="text-gradient">Restaurant Intelligence</span>
            </h1>
          </FadeUpSection>
          
          <FadeUpSection delay={0.1}>
            <p className="body-xl text-gray-700 dark:text-gray-300 mb-10 max-w-4xl mx-auto">
              One intelligence layer. Every data source. Decisions that drive growth.
            </p>
          </FadeUpSection>

          <FadeUpSection delay={0.2}>
            <Link href="/demo">
              <Button variant="primary" size="lg" className="text-base px-8 py-4 shadow-lg hover:shadow-xl transition-all">
                See Sundae in Action
              </Button>
            </Link>
          </FadeUpSection>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeUpSection>
              <div>
                <h2 className="section-h2 text-gray-900 dark:text-white mb-8">
                  Our Mission
                </h2>
                <p className="body-xl text-gray-700 dark:text-gray-300 mb-10">
                  Turn fragmented data into a single source of truth. Replace guesswork with intelligence. Help operators grow faster.
                </p>
                
                <div className="space-y-6">
                  <motion.div 
                    className="flex items-start space-x-4"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-8 h-8 bg-electric-blue rounded-full flex items-center justify-center text-white text-sm font-bold mt-1 flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white text-lg mb-1">Unify Every Data Source</h4>
                      <p className="text-gray-600 dark:text-gray-400 leading-[1.65]">Break down silos between POS, labor, inventory, and financial systems into one intelligent layer.</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-start space-x-4"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-8 h-8 bg-electric-blue rounded-full flex items-center justify-center text-white text-sm font-bold mt-1 flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white text-lg mb-1">Benchmark Every Location</h4>
                      <p className="text-gray-600 dark:text-gray-400 leading-[1.65]">Compare performance against similar restaurants and industry standards in real-time.</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-start space-x-4"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-8 h-8 bg-electric-blue rounded-full flex items-center justify-center text-white text-sm font-bold mt-1 flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white text-lg mb-1">Act with Confidence</h4>
                      <p className="text-gray-600 dark:text-gray-400 leading-[1.65]">Get AI-powered insights and recommendations to improve revenue, reduce costs, and scale faster.</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </FadeUpSection>
            
            <FadeUpSection delay={0.1}>
              <div className="bg-gradient-to-br from-electric-blue/10 to-lavender/20 dark:from-deep-blue/20 dark:to-electric-blue/10 rounded-3xl p-10 shadow-xl">
                <div className="text-center mb-8">
                  <div className="text-6xl mb-6">🎯</div>
                  <h3 className="section-h3 text-gray-900 dark:text-white mb-4">Our Vision</h3>
                  <p className="body-lg text-gray-700 dark:text-gray-300">
                    To redefine how restaurants operate worldwide — with real-time intelligence that replaces guesswork with clarity and transforms data into an operational advantage.
                  </p>
                </div>
                
                <div className="grid grid-cols-3 gap-6 mt-8">
                  <motion.div 
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-3xl font-bold text-electric-blue mb-2">
                      <AnimatedCounter end={1} suffix="M+" />
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Crew Members</div>
                  </motion.div>
                  <motion.div 
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-3xl font-bold text-lavender mb-2">
                      <AnimatedCounter end={10} suffix="K+" />
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Restaurants</div>
                  </motion.div>
                  <motion.div 
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-3xl font-bold text-positive mb-2">
                      <AnimatedCounter end={50} suffix="+" />
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Countries</div>
                  </motion.div>
                </div>
              </div>
            </FadeUpSection>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-deep-blue/5">
        <div className="max-w-7xl mx-auto">
          <FadeUpSection>
            <div className="text-center mb-16">
              <h2 className="section-h2 text-gray-900 dark:text-white mb-4">
                Built by Operators. For Operators.
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
                60+ years of combined experience across restaurants, technology, and data.
              </p>
            </div>
          </FadeUpSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {leadership.map((member, index) => (
              <FadeUpSection key={member.name} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={128}
                      height={128}
                      loading="lazy"
                      className="w-full h-full rounded-full object-cover border-4 border-electric-blue/20"
                    />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-xl mb-1">{member.name}</h3>
                  <p className="text-electric-blue dark:text-electric-blue font-semibold text-sm mb-1">{member.role}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">{member.location}</p>
                  <ul className="text-left space-y-3">
                    {member.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-400">
                        <span className="text-electric-blue mt-1 flex-shrink-0">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </FadeUpSection>
            ))}
          </div>

          {/* Team Strengths */}
          <FadeUpSection delay={0.4}>
            <Card variant="elevated" className="bg-gradient-to-r from-electric-blue/10 to-deep-blue/10 dark:from-electric-blue/20 dark:to-deep-blue/20 border-2 border-electric-blue/20">
              <CardContent className="p-8">
                <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-6">Team Strengths</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-electric-blue rounded-xl flex items-center justify-center text-white flex-shrink-0">
                      <SundaeIcon name="benchmarking" size="lg" className="text-white" />
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 font-medium">60+ years combined experience across restaurants, tech & data</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-electric-blue rounded-xl flex items-center justify-center text-white flex-shrink-0">
                      <SundaeIcon name="multiLocation" size="lg" className="text-white" />
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 font-medium">Dubai + Toronto global presence</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-electric-blue rounded-xl flex items-center justify-center text-white flex-shrink-0">
                      <SundaeIcon name="growth" size="lg" className="text-white" />
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 font-medium">Multiple successful exits and scale-ups</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeUpSection>
        </div>
      </section>

      {/* Company Story Section - Horizontal Timeline */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <FadeUpSection>
            <div className="text-center mb-16">
              <h2 className="section-h2 text-gray-900 dark:text-white mb-6">
                The Sundae Journey
              </h2>
              <p className="body-xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto">
                From pain point to platform. From one market to global reach.
              </p>
            </div>
          </FadeUpSection>

          {/* Desktop: Grid Layout */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-8 relative">
            {/* Connecting Line */}
            <div className="absolute top-12 left-0 right-0 h-1 bg-gradient-to-r from-electric-blue via-deep-blue to-electric-blue" style={{ top: '48px' }} />
            
            {milestones.slice(0, 4).map((milestone, index) => (
              <FadeUpSection key={`${milestone.year}-${index}`} delay={index * 0.1}>
                <div className="relative">
                  {/* Node */}
                  <motion.div
                    className="w-24 h-24 bg-gradient-to-br from-electric-blue to-deep-blue rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg mx-auto mb-6 relative z-10 border-4 border-white dark:border-gray-900"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {milestone.year}
                  </motion.div>
                  
                  {/* Content */}
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{milestone.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{milestone.description}</p>
                  </div>
                </div>
              </FadeUpSection>
            ))}
          </div>

          {/* Mobile: Horizontal Scroll */}
          <div className="lg:hidden">
            <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {milestones.map((milestone, index) => (
                <motion.div
                  key={`${milestone.year}-${index}`}
                  className="flex-shrink-0 w-80 snap-center"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card variant="elevated" className="h-full p-6 dark:bg-gray-800">
                    <div className="w-20 h-20 bg-gradient-to-br from-electric-blue to-deep-blue rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg mb-4">
                      {milestone.year}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{milestone.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{milestone.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">← Swipe to explore →</p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-deep-blue/5">
        <div className="max-w-7xl mx-auto">
          <FadeUpSection>
            <div className="text-center mb-16">
              <h2 className="section-h2 text-gray-900 dark:text-white mb-6">
                What We Stand For
              </h2>
              <p className="body-xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto">
                Principles that shape every product decision we make
              </p>
            </div>
          </FadeUpSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <FadeUpSection key={value.title} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card variant="elevated" className="text-center h-full p-8">
                    <CardHeader>
                      <motion.div 
                        className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-electric-blue to-deep-blue rounded-xl flex items-center justify-center"
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <SundaeIcon name={value.icon} size="xl" className="text-white" />
                      </motion.div>
                      <CardTitle className="text-gray-900 dark:text-white text-xl mb-4">{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-600 dark:text-gray-400 leading-[1.65]">
                        {value.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              </FadeUpSection>
            ))}
          </div>
        </div>
      </section>

      {/* Global Presence Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <FadeUpSection>
            <div className="text-center mb-16">
              <h2 className="section-h2 text-gray-900 dark:text-white mb-6">
                Where We Operate
              </h2>
              <p className="body-xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto">
                3 continents. Expanding rapidly into the world's biggest hospitality markets.
              </p>
            </div>
          </FadeUpSection>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {[
              { region: "Middle East", countries: "UAE, KSA, Qatar", icon: "🌍", color: "bg-positive" },
              { region: "North America", countries: "USA, Canada", icon: "🌎", color: "bg-electric-blue" },
              { region: "Europe", countries: "UK, Germany, France", icon: "🌍", color: "bg-lavender" },
              { region: "Asia Pacific", countries: "Australia, Singapore", icon: "🌏", color: "bg-coral" }
            ].map((region, index) => (
              <FadeUpSection key={region.region} delay={index * 0.1}>
                <motion.div 
                  className="text-center"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    className={`w-20 h-20 ${region.color} rounded-2xl flex items-center justify-center text-white text-3xl mx-auto mb-6 shadow-lg`}
                    animate={{ 
                      scale: [1, 1.1, 1],
                      boxShadow: [
                        "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                        "0 20px 40px -10px rgba(28, 71, 255, 0.4)",
                        "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                      ]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {region.icon}
                  </motion.div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">{region.region}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{region.countries}</p>
                </motion.div>
              </FadeUpSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-deep-blue via-electric-blue to-deep-blue dark:from-deep-blue dark:via-electric-blue dark:to-deep-blue relative overflow-hidden">
        {/* Animated background effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <FadeUpSection>
            <h2 className="section-h2 text-white mb-8">
              Join Us
            </h2>
            <p className="body-xl text-white mb-12 font-medium">
              Restaurant group? Partner? Builder? Let's transform the industry together.
            </p>
          </FadeUpSection>
          
          <FadeUpSection delay={0.1}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/demo">
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="bg-white text-electric-blue hover:bg-gray-100 font-semibold px-8 py-4 text-base shadow-xl hover:shadow-2xl transition-all"
                >
                  Partner with Sundae
                </Button>
              </Link>
              <Link href="/careers">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-white text-white hover:bg-white hover:text-electric-blue font-semibold px-8 py-4 text-base shadow-xl hover:shadow-2xl transition-all"
                >
                  Join Our Team
                </Button>
              </Link>
            </div>
          </FadeUpSection>
        </div>
      </section>
    </div>
  );
}
