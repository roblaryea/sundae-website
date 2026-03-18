"use client";

import { motion } from "framer-motion";
import { ElegantShape } from "./ElegantShape";

// Reusable fade-up section with scroll trigger
export function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Stagger container for child animations
export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.1,
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Child item for stagger containers
export function StaggerItem({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Premium dark hero section with floating shapes — for inner pages
export function PageHero({
  badge,
  title,
  description,
  children,
}: {
  badge?: string;
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative bg-slate-950 overflow-hidden">
      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.2}
          width={300}
          height={80}
          rotate={12}
          gradient="from-white/[0.06]"
          className="left-[-10%] top-[15%]"
        />
        <ElegantShape
          delay={0.4}
          width={220}
          height={60}
          rotate={-15}
          gradient="from-white/[0.04]"
          className="right-[-5%] top-[25%]"
        />
        <ElegantShape
          delay={0.6}
          width={160}
          height={50}
          rotate={20}
          gradient="from-white/[0.05]"
          className="left-[15%] bottom-[20%]"
        />
      </div>

      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(100,116,139,0.12),transparent_70%)]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-20 text-center">
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/10 text-white/70 border border-white/10 backdrop-blur-sm">
              {badge}
            </span>
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-6 text-lg sm:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed"
        >
          {description}
        </motion.p>

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-8"
          >
            {children}
          </motion.div>
        )}
      </div>

      {/* Bottom gradient fade to white */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}

// Dark CTA section with floating shapes — for page bottoms
export function PageCTA({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="relative bg-slate-950 overflow-hidden">
      {/* Top gradient fade from white */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white to-transparent z-10" />

      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={250}
          height={70}
          rotate={-10}
          gradient="from-white/[0.05]"
          className="right-[-8%] top-[20%]"
        />
        <ElegantShape
          delay={0.5}
          width={180}
          height={50}
          rotate={15}
          gradient="from-white/[0.04]"
          className="left-[-5%] bottom-[25%]"
        />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(100,116,139,0.1),transparent_70%)]" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-24 text-center">
        <FadeUp>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {title}
          </h2>
          <p className="mt-4 text-lg text-white/60 max-w-xl mx-auto">
            {description}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            {children}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
