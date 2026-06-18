"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useSettledReducedMotion as useReducedMotion } from "@/lib/useSettledReducedMotion";

/**
 * HomeScrollSpine - the homepage's narrative wayfinding rail.
 *
 * A slim "glass" that fills with the hero's warm strata palette as you descend
 * the page: every chapter you pass adds liquid, so the whole homepage reads as
 * the opening glass filling up. It doubles as navigation - each node is a jump
 * link with a label, and the active chapter is always shown.
 *
 * Desktop only (a full rail is intrusive on phones); hidden until the reader
 * leaves the cinematic hero so that first screen stays clean. Fully degrades
 * for prefers-reduced-motion (no fill animation, instant jumps) and is a proper
 * <nav> with labelled, keyboard-reachable controls.
 */
export type HomeChapter = { id: string; label: string; color: string };

export function HomeScrollSpine({ chapters }: { chapters: HomeChapter[] }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const tickingRef = useRef(false);

  // Active chapter = the deepest one whose top has crossed the viewport middle
  // (deterministic where tall sections overlap), plus reveal the rail only once
  // the reader has left the full-screen cinematic hero. One rAF-throttled pass.
  useEffect(() => {
    const update = () => {
      const mid = window.innerHeight * 0.5;
      let idx = 0;
      chapters.forEach((c, i) => {
        const el = document.getElementById(c.id);
        if (el && el.getBoundingClientRect().top <= mid) idx = i;
      });
      setActive(idx);
      setVisible(window.scrollY > window.innerHeight * 0.55);
    };
    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(() => {
        update();
        tickingRef.current = false;
      });
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [chapters]);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  const fillPct = chapters.length > 1 ? (active / (chapters.length - 1)) * 100 : 0;

  return (
    <nav
      aria-label="Homepage chapters"
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 transition-opacity duration-500 lg:block"
      style={{ opacity: visible ? 1 : 0, pointerEvents: visible ? "auto" : "none" }}
    >
      <div className="relative flex flex-col items-center">
        {/* glass track + warm fill rising to the active chapter */}
        <div className="pointer-events-none absolute left-1/2 top-2 bottom-2 w-[3px] -translate-x-1/2 overflow-hidden rounded-full bg-[rgba(150,122,102,0.34)]">
          <motion.div
            className="absolute inset-x-0 top-0 rounded-full"
            style={{ background: "linear-gradient(180deg,#FF7E6F,#E9A24A 60%,#F6C66B)" }}
            initial={false}
            animate={{ height: `${fillPct}%` }}
            transition={{ duration: reduce ? 0 : 0.55, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        {chapters.map((c, i) => {
          const isActive = i === active;
          const passed = i <= active;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => go(c.id)}
              aria-current={isActive ? "true" : undefined}
              aria-label={c.label}
              className="group relative flex items-center py-3.5 focus:outline-none"
            >
              {/* label - always shown for the active chapter, on hover/focus otherwise */}
              <span
                className="absolute right-7 whitespace-nowrap rounded-md border border-[var(--border-default)] bg-[var(--navy-surface)]/90 px-2 py-1 text-[11px] font-medium text-[var(--text-secondary)] backdrop-blur transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
                style={{ opacity: isActive ? 1 : 0 }}
              >
                {c.label}
              </span>
              <span
                className="block rounded-full transition-all duration-300"
                style={{
                  width: isActive ? 13 : 9,
                  height: isActive ? 13 : 9,
                  background: passed ? c.color : "rgba(150,122,102,0.6)",
                  boxShadow: isActive ? `0 0 12px ${c.color}` : "none",
                  outline: isActive ? "2px solid rgba(251,248,244,0.18)" : "none",
                  outlineOffset: 2,
                }}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default HomeScrollSpine;
