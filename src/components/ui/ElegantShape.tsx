"use client";

import { motion } from "framer-motion";

/**
 * Decorative floating shape used in hero/section backgrounds.
 *
 * Theme-aware: the gradient stops and inner glow read from CSS variables
 * defined in `tokens.css` (`--shape-tint-from`, `--shape-tint-glow`) so the
 * shapes stay visible in both dark and light mode.
 *
 * The `gradient` prop is retained for backward-compatibility — it's used to
 * extract a strength hint (`from-white/[0.0X]` → opacity X) so heavier or
 * lighter callers still differentiate. The colour itself is always token-driven.
 */
function strengthFromLegacy(g: string | undefined): number {
  if (!g) return 0.03;
  const match = g.match(/\[(0?\.\d+)\]/);
  return match ? parseFloat(match[1]) : 0.03;
}

export function ElegantShape({
  className = "",
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.03]",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  const strength = strengthFromLegacy(gradient);
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={`absolute ${className}`}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          style={{
            background: `linear-gradient(to right, color-mix(in srgb, var(--shape-tint) ${strength * 100}%, transparent), transparent)`,
          }}
          className="absolute inset-0 rounded-full backdrop-blur-[2px] border border-[var(--border-default)] shadow-[0_8px_32px_0_var(--shape-glow)] after:absolute after:inset-0 after:rounded-full after:bg-[radial-gradient(circle_at_50%_50%,var(--shape-glow-inner),transparent_70%)]"
        />
      </motion.div>
    </motion.div>
  );
}
