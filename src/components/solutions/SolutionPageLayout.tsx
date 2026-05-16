"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { motion, MotionConfig } from "framer-motion";
import { REPORT_APP_URL } from "@/lib/urls";
import { Button } from "@/components/ui/Button";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/PageAnimations";
import { ElegantShape } from "@/components/ui/ElegantShape";

export type SolutionCopy = {
  badge: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  problemsEyebrow?: string;
  problemsTitle: string;
  problemsDescription: string;
  challenges: { title: string; description: string; icon: SundaeIconName }[];
  howTitle: string;
  howDescription: string;
  howSundaeHelps: { title: string; description: string; product: string; icon: SundaeIconName }[];
  outcomesTitle: string;
  outcomesDescription: string;
  outcomes: { title: string; description: string; icon: SundaeIconName }[];
  ctaTitle: string;
  ctaDescription: string;
  ctaButton: string;
};

interface Props {
  copy: SolutionCopy;
  mockup: ReactNode;
  primaryCtaHref?: string;
  secondaryCtaHref?: string;
  ctaButtonHref?: string;
}

/**
 * Shared visual layout for /solutions/* persona pages.
 *
 * The copy lives per-page so each page remains a discrete file (Option B
 * discipline). Only the visual frame — gradient hero, ElegantShape floats,
 * mockup column, three content sections, closing CTA — is shared, so the
 * persona pages stay visually consistent without per-page JSX drift.
 */
export function SolutionPageLayout({
  copy,
  mockup,
  primaryCtaHref = "/demo",
  secondaryCtaHref = REPORT_APP_URL,
  ctaButtonHref = "/demo",
}: Props) {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[var(--navy-deep)] overflow-x-hidden">
        {/* ════════════════════════════════════════════════
            HERO
        ════════════════════════════════════════════════ */}
        <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(28,71,255,0.10),transparent_60%)]" />
          <div className="absolute inset-0 bg-grid-texture" />
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <ElegantShape delay={0.3} width={600} height={140} rotate={12} gradient="from-white/[0.03]" className="left-[-10%] top-[15%]" />
            <ElegantShape delay={0.5} width={500} height={120} rotate={-15} gradient="from-white/[0.02]" className="right-[-5%] top-[60%]" />
            <ElegantShape delay={0.4} width={300} height={80} rotate={-8} gradient="from-white/[0.025]" className="left-[5%] bottom-[10%]" />
          </div>
          <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-10 lg:gap-12 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="mb-6">
                <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide uppercase bg-[rgba(28,71,255,0.12)] border border-[rgba(28,71,255,0.2)] text-[#60A5FA]">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#60A5FA] animate-pulse" />
                  {copy.badge}
                </span>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }} className="hero-h1 mb-6 text-balance">
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">{copy.titleLine1}</span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#60A5FA] via-white to-[#93C5FD]">{copy.titleLine2}</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }} className="body-xl max-w-xl mb-8">
                {copy.description}
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }} className="flex flex-col sm:flex-row gap-3">
                <Link href={primaryCtaHref}><Button variant="primary" size="lg">{copy.primaryCta}</Button></Link>
                <a href={secondaryCtaHref}><Button variant="outline-light" size="lg">{copy.secondaryCta}</Button></a>
              </motion.div>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }} className="lg:pl-4" style={{ perspective: "1200px" }}>
              <motion.div initial={{ rotateX: 6 }} animate={{ rotateX: 1.5 }} transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}>
                {mockup}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            PROBLEMS
        ════════════════════════════════════════════════ */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,84,80,0.04),transparent_60%)]" />
          <div className="relative z-10 max-w-7xl mx-auto">
            <FadeUp className="text-center mb-14">
              <p className="eyebrow mb-4">{copy.problemsEyebrow ?? "THE PROBLEM"}</p>
              <h2 className="section-h2 text-[var(--text-primary)] mb-4">{copy.problemsTitle}</h2>
              <p className="body-lg text-[var(--text-supporting)] max-w-2xl mx-auto">{copy.problemsDescription}</p>
            </FadeUp>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {copy.challenges.map((c, i) => (
                <StaggerItem key={i}>
                  <div className="group h-full p-6 rounded-2xl bg-white/[0.03] border border-[var(--border-default)] hover:bg-[var(--surface-hover)] hover:border-[rgba(255,84,80,0.25)] transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#FF5450] to-[#F59E0B] flex items-center justify-center flex-shrink-0 shadow-lg">
                        <SundaeIcon name={c.icon} size="md" className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2 leading-snug">{c.title}</h3>
                        <p className="text-sm text-[var(--text-muted)] leading-relaxed">{c.description}</p>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            HOW SUNDAE HELPS
        ════════════════════════════════════════════════ */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-mesh" />
          <div className="relative z-10 max-w-7xl mx-auto">
            <FadeUp className="text-center mb-14">
              <p className="eyebrow mb-4">HOW SUNDAE HELPS</p>
              <h2 className="section-h2 text-[var(--text-primary)] mb-4">{copy.howTitle}</h2>
              <p className="body-lg text-[var(--text-supporting)] max-w-2xl mx-auto">{copy.howDescription}</p>
            </FadeUp>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {copy.howSundaeHelps.map((h, i) => (
                <StaggerItem key={i}>
                  <div className="group h-full p-6 rounded-2xl bg-white/[0.03] border border-[var(--border-default)] hover:bg-[var(--surface-hover)] hover:border-[rgba(28,71,255,0.25)] hover:shadow-[0_0_30px_rgba(28,71,255,0.08)] transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#1C47FF] to-[#3B82F6] flex items-center justify-center flex-shrink-0 shadow-lg">
                        <SundaeIcon name={h.icon} size="md" className="text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-[10px] uppercase tracking-wider text-[#60A5FA] font-bold mb-1.5">{h.product}</div>
                        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2 leading-snug">{h.title}</h3>
                        <p className="text-sm text-[var(--text-muted)] leading-relaxed">{h.description}</p>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            OUTCOMES
        ════════════════════════════════════════════════ */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,197,94,0.05),transparent_60%)]" />
          <div className="relative z-10 max-w-7xl mx-auto">
            <FadeUp className="text-center mb-14">
              <p className="eyebrow mb-4">WHAT CHANGES</p>
              <h2 className="section-h2 text-[var(--text-primary)] mb-4">{copy.outcomesTitle}</h2>
              <p className="body-lg text-[var(--text-supporting)] max-w-2xl mx-auto">{copy.outcomesDescription}</p>
            </FadeUp>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {copy.outcomes.map((o, i) => (
                <StaggerItem key={i}>
                  <div className="group h-full p-6 rounded-2xl bg-white/[0.03] border border-[var(--border-default)] hover:bg-[var(--surface-hover)] hover:border-[rgba(34,197,94,0.25)] hover:shadow-[0_0_30px_rgba(34,197,94,0.06)] transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#22C55E] to-[#16A34A] flex items-center justify-center flex-shrink-0 shadow-lg">
                        <SundaeIcon name={o.icon} size="md" className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2 leading-snug">{o.title}</h3>
                        <p className="text-sm text-[var(--text-muted)] leading-relaxed">{o.description}</p>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            CLOSING CTA
        ════════════════════════════════════════════════ */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-grad-deep">
          <div className="absolute inset-0 bg-grid-texture" />
          <ElegantShape delay={0} width={400} height={100} rotate={-12} gradient="from-white/[0.03]" className="left-[-8%] top-[20%]" />
          <ElegantShape delay={0.2} width={300} height={80} rotate={15} gradient="from-white/[0.02]" className="right-[-5%] bottom-[10%]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(28,71,255,0.06),transparent_70%)]" />
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <FadeUp>
              <h2 className="section-h2 mb-4">{copy.ctaTitle}</h2>
              <p className="body-lg mb-10 max-w-xl mx-auto">{copy.ctaDescription}</p>
              <Link href={ctaButtonHref}><Button variant="cta" size="lg">{copy.ctaButton}</Button></Link>
            </FadeUp>
          </div>
        </section>
      </div>
    </MotionConfig>
  );
}
