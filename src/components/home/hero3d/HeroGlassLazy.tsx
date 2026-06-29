"use client";

/**
 * HeroGlassLazy — capability-gated, lazy mount for the photoreal 3D hero glass.
 *
 * The 3D scene (three + R3F + drei + postprocessing) is a heavy bundle, so it:
 *   - is code-split via next/dynamic (ssr:false) — never in the server bundle;
 *   - only mounts once the hero is in view (IntersectionObserver);
 *   - is skipped entirely for reduced-motion users or when WebGL is unavailable,
 *     falling back to the supplied `poster` (the existing SVG glass).
 *
 * The `poster` always renders underneath and is revealed until the canvas is
 * mounted + warmed, so first paint is instant and there's never a blank hole.
 */

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const HeroGlass3D = dynamic(() => import("./HeroGlass3D"), { ssr: false });

function webglAvailable(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const c = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl")));
  } catch {
    return false;
  }
}

export type HeroGlassLazyProps = {
  active: number | null;
  onHover: (i: number | null) => void;
  /** Reports the measured on-screen vertical fraction of each stratum (for the rail). */
  onLayout?: (fractions: number[]) => void;
  /** Rendered until/unless the 3D scene takes over (the SVG glass). */
  poster: React.ReactNode;
  className?: string;
};

export default function HeroGlassLazy({ active, onHover, onLayout, poster, className }: HeroGlassLazyProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  // null = undetermined (SSR / first paint) → show NOTHING (no old glass);
  // true = 3D path; false = reduced-motion / no-WebGL → SVG poster fallback.
  const [enabled, setEnabled] = useState<boolean | null>(null);
  const [inView, setInView] = useState(false);
  const [warm, setWarm] = useState(false); // canvas has had a beat to paint

  // Decide capability once on mount (client only).
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only capability gate; SSR must render the poster path
    setEnabled(!reduce && webglAvailable());
  }, []);

  // Mount the scene only when it scrolls into view.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || enabled !== true) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [enabled]);

  // Fade the poster out a beat after the canvas mounts (lets WebGL warm up).
  useEffect(() => {
    if (!inView) return;
    const id = window.setTimeout(() => setWarm(true), 420);
    return () => window.clearTimeout(id);
  }, [inView]);

  const showSvg = enabled === false; // reduced-motion / no-WebGL only
  const show3D = enabled === true && inView;

  return (
    <div ref={wrapRef} className={className} style={{ position: "relative" }}>
      {/* The old SVG glass is ONLY the reduced-motion / no-WebGL fallback now — it
          never flashes during the normal 3D load (undetermined state renders
          nothing; the section's warm wash shows through until the canvas fades in). */}
      {showSvg && <div className="absolute inset-0">{poster}</div>}

      {show3D && (
        <HeroGlass3D
          active={active}
          onHover={onHover}
          onLayout={onLayout}
          style={{ position: "absolute", inset: 0, opacity: warm ? 1 : 0, transition: "opacity 900ms ease" }}
        />
      )}
    </div>
  );
}
