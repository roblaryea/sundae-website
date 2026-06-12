"use client";

/**
 * Premium loading state shown while the AI gateway is generating the
 * diagnostic. ~8-15s of wait time, so we show a multi-step progress
 * narrative that makes it feel deliberate, not slow.
 */

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import type { WebsiteLocale } from '@/lib/i18n';
import { getDiagnosticCopy } from '@/lib/diagnostic/i18n';

interface DiagnosticGeneratingProps {
  name: string;
  locale: WebsiteLocale;
}

const STEP_TIMINGS = [
  { id: 'read', durationMs: 1800 },
  { id: 'leaks', durationMs: 3000 },
  { id: 'stack', durationMs: 3000 },
  { id: 'plan', durationMs: 3000 },
  { id: 'polish', durationMs: 2200 },
];

export function DiagnosticGenerating({ name, locale }: DiagnosticGeneratingProps) {
  const copy = getDiagnosticCopy(locale);
  const steps = STEP_TIMINGS.map((step, index) => ({
    ...step,
    label: copy.generating.steps[index] ?? step.id,
  }));
  const [activeStep, setActiveStep] = useState(0);
  const firstName = name.split(' ')[0] || 'there';

  useEffect(() => {
    let cumulative = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];
    STEP_TIMINGS.forEach((step, i) => {
      cumulative += step.durationMs;
      const t = setTimeout(() => setActiveStep(i + 1), cumulative);
      timers.push(t);
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--navy-deep)] pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex items-center">
      <div className="max-w-2xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--warm-coral)]/12 border border-[var(--warm-coral)]/30 mb-6">
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="w-3.5 h-3.5 text-[var(--warm-coral)]" />
            </motion.span>
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--warm-coral)]">
              {copy.generating.eyebrow}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-3 text-balance">
            {copy.generating.title(firstName)}
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-supporting)]">
            {copy.generating.body}
          </p>
        </motion.div>

        {/* Progress steps */}
        <div className="rounded-2xl bg-white/[0.02] border border-[var(--border-default)] p-6 md:p-8">
          <ul className="space-y-3">
            <AnimatePresence>
              {steps.map((step, i) => {
                const status = i < activeStep ? 'done' : i === activeStep ? 'active' : 'pending';
                return (
                  <motion.li
                    key={step.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      {status === 'done' && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      )}
                      {status === 'active' && (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-[var(--warm-coral)] border-t-transparent rounded-full"
                        />
                      )}
                      {status === 'pending' && (
                        <div className="w-5 h-5 border-2 border-[var(--border-default)] rounded-full" />
                      )}
                    </div>
                    <span
                      className={`text-sm ${
                        status === 'done'
                          ? 'text-[var(--text-supporting)] line-through opacity-60'
                          : status === 'active'
                            ? 'text-[var(--text-primary)] font-semibold'
                            : 'text-[var(--text-muted)]'
                      }`}
                    >
                      {step.label}
                    </span>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>
        </div>

        <p className="text-center text-[11px] text-[var(--text-muted)] mt-6 italic">
          {copy.generating.footer}
        </p>
      </div>
    </div>
  );
}
