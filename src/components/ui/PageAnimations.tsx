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
    <section className="relative overflow-hidden bg-mesh">
      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.2}
          width={300}
          height={80}
          rotate={12}
          gradient="from-white/[0.03]"
          className="left-[-10%] top-[15%]"
        />
        <ElegantShape
          delay={0.4}
          width={220}
          height={60}
          rotate={-15}
          gradient="from-white/[0.02]"
          className="right-[-5%] top-[25%]"
        />
        <ElegantShape
          delay={0.6}
          width={160}
          height={50}
          rotate={20}
          gradient="from-white/[0.025]"
          className="left-[15%] bottom-[20%]"
        />
      </div>

      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(28,71,255,0.08),transparent_70%)]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-20 text-center">
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-[rgba(28,71,255,0.15)] text-[#60A5FA] border border-[rgba(28,71,255,0.2)]">
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
          className="mt-6 hero-h1"
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
          className="mt-6 body-xl max-w-2xl mx-auto"
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
    <section className="relative overflow-hidden bg-grad-deep">
      {/* Grid texture */}
      <div className="absolute inset-0 bg-grid-texture" />

      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={250}
          height={70}
          rotate={-10}
          gradient="from-white/[0.03]"
          className="right-[-8%] top-[20%]"
        />
        <ElegantShape
          delay={0.5}
          width={180}
          height={50}
          rotate={15}
          gradient="from-white/[0.02]"
          className="left-[-5%] bottom-[25%]"
        />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(28,71,255,0.06),transparent_70%)]" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-24 text-center">
        <FadeUp>
          <h2 className="section-h2">
            {title}
          </h2>
          <p className="mt-4 body-lg max-w-xl mx-auto">
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
