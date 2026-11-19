'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

export function GuidanceReveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px 100px 0px' }}
      transition={{ duration: reducedMotion ? 0 : 0.45 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function GuidanceHero({ label, lead, emphasis, description, children }: {
  label: string; lead: string; emphasis: string; description: string; children: ReactNode;
}) {
  return (
    <section data-guidance-hero className="border-b border-[var(--border-default)] px-6 pb-14 pt-12 sm:px-8 sm:pb-20 lg:px-12 lg:pt-20">
      <div className="mx-auto max-w-7xl">
        <GuidanceReveal>
          <p className="eyebrow mb-7 text-[var(--text-warm)]">Sundae / {label}</p>
          <h1 className="max-w-6xl font-display text-[clamp(2.4rem,5.6vw,5.6rem)] leading-[1.06] tracking-[-0.025em] text-[var(--text-primary)]">
            <span className="block">{lead}{' '}</span>
            <span className="brand-emphasis block">{emphasis}</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-[var(--text-supporting)] sm:text-xl">{description}</p>
          <div className="mt-8 flex max-w-2xl flex-col items-start gap-3 sm:flex-row sm:flex-wrap">{children}</div>
        </GuidanceReveal>
      </div>
    </section>
  );
}

export function GuidanceClose({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <section data-guidance-close className="border-t border-[var(--border-default)] px-6 py-16 sm:px-8 lg:px-12 lg:py-24">
      <GuidanceReveal className="mx-auto max-w-7xl">
        <h2 className="max-w-4xl font-display text-4xl leading-tight text-[var(--text-warm)] sm:text-5xl">{title}</h2>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--text-supporting)]">{description}</p>
        <div className="mt-8">{children}</div>
      </GuidanceReveal>
    </section>
  );
}
