'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface BrowserFrameProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  /** Animation on scroll: 'fade' (default), 'scale', 'slide-left', 'slide-right', 'none' */
  animate?: 'fade' | 'scale' | 'slide-left' | 'slide-right' | 'none';
  /** Optional label shown in the title bar (e.g. "Pulse — Live Operations") */
  label?: string;
  /** Optional URL shown right-aligned in the title bar */
  url?: string;
  /** Enable pulsing blue glow effect on the frame */
  glow?: boolean;
}

export function BrowserFrame({
  src,
  alt,
  width = 1200,
  height = 675,
  priority = false,
  className = '',
  animate = 'scale',
  label,
  url,
  glow = false,
}: BrowserFrameProps) {
  const variants = {
    fade: {
      initial: { opacity: 0, y: 24 },
      whileInView: { opacity: 1, y: 0 },
    },
    scale: {
      initial: { opacity: 0, scale: 0.96, y: 20 },
      whileInView: { opacity: 1, scale: 1, y: 0 },
    },
    'slide-left': {
      initial: { opacity: 0, x: -40 },
      whileInView: { opacity: 1, x: 0 },
    },
    'slide-right': {
      initial: { opacity: 0, x: 40 },
      whileInView: { opacity: 1, x: 0 },
    },
    none: {
      initial: {},
      whileInView: {},
    },
  };

  const v = variants[animate];

  return (
    <motion.div
      className={`rounded-xl overflow-hidden bg-[var(--navy)] border border-[var(--border-default)] ${
        glow
          ? 'shadow-[0_0_60px_rgba(28,71,255,0.2),0_0_120px_rgba(28,71,255,0.08)]'
          : 'shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)]'
      } ${className}`}
      initial={v.initial}
      whileInView={v.whileInView}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* macOS-style Title Bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-black/30 border-b border-[var(--border-default)]">
        {/* Traffic light dots */}
        <span className="w-[10px] h-[10px] rounded-full bg-[#FF5F57]" />
        <span className="w-[10px] h-[10px] rounded-full bg-[#FFBD2E]" />
        <span className="w-[10px] h-[10px] rounded-full bg-[#28C840]" />

        {/* Title bar label */}
        {label && (
          <span className="ml-3 text-[11px] text-[var(--text-muted)] font-medium truncate">
            {label}
          </span>
        )}

        {/* URL aligned right */}
        {url && (
          <span className="ml-auto text-[11px] text-[var(--text-faint)] font-mono truncate">
            {url}
          </span>
        )}

        {/* Address bar placeholder when no label/url */}
        {!label && !url && (
          <div className="flex-1 ml-3 h-[18px] rounded-md bg-[var(--surface-subtle)]/[0.06] max-w-[220px]" />
        )}
      </div>

      {/* Screenshot */}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-auto"
        priority={priority}
      />
    </motion.div>
  );
}
