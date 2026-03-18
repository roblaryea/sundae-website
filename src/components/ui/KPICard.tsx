"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface KPICardProps {
  value: string;
  label: string;
  supporting?: string;
  color?: "blue" | "green" | "amber" | "red" | "purple" | "white";
  className?: string;
  animate?: boolean;
}

const colorMap = {
  blue: "text-[#1C47FF]",
  green: "text-[#22C55E]",
  amber: "text-[#FBBF24]",
  red: "text-[#FF5450]",
  purple: "text-[#A855F7]",
  white: "text-[var(--text-primary)]",
};

export function KPICard({
  value,
  label,
  supporting,
  color = "blue",
  className = "",
  animate = true,
}: KPICardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(animate ? "" : value);

  useEffect(() => {
    if (!animate || prefersReducedMotion || !isInView) {
      setDisplayValue(value);
      return;
    }

    // Extract numeric part for count-up
    const numericMatch = value.match(/[\d,.]+/);
    if (!numericMatch) {
      setDisplayValue(value);
      return;
    }

    const numStr = numericMatch[0];
    const num = parseFloat(numStr.replace(/,/g, ""));
    const prefix = value.slice(0, value.indexOf(numStr));
    const suffix = value.slice(value.indexOf(numStr) + numStr.length);
    const hasDecimal = numStr.includes(".");
    const decimalPlaces = hasDecimal ? numStr.split(".")[1].length : 0;
    const hasCommas = numStr.includes(",");

    const duration = 1200;
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = num * eased;

      let formatted = hasDecimal
        ? current.toFixed(decimalPlaces)
        : Math.round(current).toString();

      if (hasCommas) {
        const parts = formatted.split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        formatted = parts.join(".");
      }

      setDisplayValue(`${prefix}${formatted}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [isInView, value, animate, prefersReducedMotion]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`text-center ${className}`}
    >
      <div className={`kpi-number ${colorMap[color]}`}>
        {displayValue}
      </div>
      <div className="kpi-label mt-2">{label}</div>
      {supporting && (
        <div className="kpi-supporting mt-1">{supporting}</div>
      )}
    </motion.div>
  );
}
