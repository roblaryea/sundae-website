'use client';

import { type ReactNode } from 'react';
import { motion } from 'framer-motion';

/**
 * Premium phone mockup frame for the Crew marketing pages. Crew's surfaces are
 * floor tools (scheduling, clock-in, payslips) used on a phone, so the product
 * proof lives in a device frame. Dark titanium bezel + dynamic island + a status
 * bar, with a soft warm glow and a gentle float-in. The screen content (a styled
 * mobile mock, in the PWA design language) is passed as children.
 */
export function PhoneFrame({
  children,
  time = '7:42',
  glow = true,
  screenBg = '#0F0B08',
  className = '',
}: {
  children: ReactNode;
  time?: string;
  glow?: boolean;
  /** Screen background — set to the implemented design's bg so the status bar blends. */
  screenBg?: string;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, rotateX: 6 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 1.5 }}
      viewport={{ once: true, margin: '120px' }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1200 }}
      className={`relative mx-auto w-[270px] sm:w-[300px] ${className}`}
    >
      {glow && (
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-10 -z-10"
          style={{
            background:
              'radial-gradient(ellipse 60% 55% at 50% 42%, rgba(255,92,77,0.22) 0%, rgba(233,162,74,0.08) 45%, transparent 72%)',
            filter: 'blur(18px)',
          }}
        />
      )}
      {/* Titanium bezel */}
      <div className="relative rounded-[2.6rem] border border-white/10 bg-gradient-to-b from-[#2a2622] to-[#15110d] p-2.5 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.08)]">
        {/* Screen */}
        <div className="relative overflow-hidden rounded-[2.1rem]" style={{ background: screenBg }}>
          {/* Status bar */}
          <div className="relative z-20 flex items-center justify-between px-5 pt-2.5 pb-1 text-[10px] font-semibold text-white/85">
            <span className="tabular-nums">{time}</span>
            {/* dynamic island */}
            <span className="absolute left-1/2 top-2 h-[18px] w-[64px] -translate-x-1/2 rounded-full bg-black" />
            <span className="flex items-center gap-1">
              <svg width="15" height="10" viewBox="0 0 16 11" fill="none" aria-hidden>
                <rect x="0" y="6" width="2.5" height="4" rx="0.6" fill="currentColor" />
                <rect x="4" y="4" width="2.5" height="6" rx="0.6" fill="currentColor" />
                <rect x="8" y="2" width="2.5" height="8" rx="0.6" fill="currentColor" />
                <rect x="12" y="0" width="2.5" height="10" rx="0.6" fill="currentColor" />
              </svg>
              <svg width="16" height="11" viewBox="0 0 18 13" fill="none" aria-hidden>
                <path d="M9 2.5c2.4 0 4.6.9 6.2 2.4l-1 1.1A7.2 7.2 0 0 0 9 4.1 7.2 7.2 0 0 0 3.8 6L2.8 4.9A9 9 0 0 1 9 2.5Z" fill="currentColor" />
                <path d="M9 6c1.4 0 2.7.5 3.6 1.5l-1 1.1A3.6 3.6 0 0 0 9 7.6c-1 0-2 .4-2.6 1L5.4 7.5A5 5 0 0 1 9 6Z" fill="currentColor" />
                <circle cx="9" cy="10.5" r="1.4" fill="currentColor" />
              </svg>
              <span className="ml-0.5 inline-flex h-[10px] w-[20px] items-center rounded-[3px] border border-white/55 px-[1.5px]">
                <span className="h-[6px] w-[13px] rounded-[1px] bg-white/85" />
              </span>
            </span>
          </div>
          {/* App content */}
          <div className="relative">{children}</div>
        </div>
      </div>
    </motion.div>
  );
}
