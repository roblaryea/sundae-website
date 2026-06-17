"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Like framer-motion's useReducedMotion, but returns `false` during SSR and the
 * first client render, then settles to the real preference after mount.
 *
 * Why: useReducedMotion() is always false on the server (no media query) but can
 * be true on a reduced-motion client. Components that branch on it during render
 * - swapping element structure, `initial`, or inline style - then produce server
 * HTML that doesn't match the first client render, which React reports as a
 * hydration mismatch and recovers from by regenerating the whole tree. Deferring
 * the preference to after hydration keeps the first render identical on both
 * sides; reduced-motion users settle to the static path one frame later.
 */
export function useSettledReducedMotion(): boolean {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);
  return mounted ? Boolean(reduced) : false;
}
