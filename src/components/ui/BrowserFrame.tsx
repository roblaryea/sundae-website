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
}

export function BrowserFrame({
  src,
  alt,
  width = 1200,
  height = 675,
  priority = false,
  className = '',
  animate = 'scale',
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
      className={`rounded-2xl overflow-hidden bg-slate-900 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] ring-1 ring-white/10 ${className}`}
      initial={v.initial}
      whileInView={v.whileInView}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Browser Chrome Bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/80 border-b border-white/5">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
        <div className="flex-1 ml-2 h-5 rounded-md bg-slate-700/60 max-w-[220px]" />
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
