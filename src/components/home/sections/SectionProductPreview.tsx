"use client";

/**
 * Slim 4-card product preview for the homepage.
 *
 * Replaces the full 18-card persona-filtered gallery (now reserved for
 * product + solutions pages) per Option B from the marketing review:
 * "thin teaser on homepage + full galleries on product/solutions pages".
 *
 * Picks the 4 highest-impact product surfaces — Executive Summary,
 * Pulse Wallboard, Foresight Scenarios, Sundae Intelligence — each
 * deep-linking to its product page where the prospect can see the full
 * gallery of that area.
 *
 * Click any card → lightbox showing the full screenshot at viewable
 * resolution. Same lightbox UX as the full gallery.
 */

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, Maximize2, ChevronLeft, ChevronRight } from "lucide-react";
import { FadeUp } from "@/components/ui/PageAnimations";

type PreviewItem = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  whatYouSee: string;
  productHref: string;
  productLabel: string;
};

const PREVIEW: PreviewItem[] = [
  {
    id: "exec-summary",
    src: "/images/product/2026-fresh/insights-exec-summary.png",
    alt: "Executive Summary — KPIs, alerts, and health scores across every module",
    caption: "Executive Summary",
    whatYouSee:
      "Bird's-eye view: 78/100 health, 10 open alerts, Revenue 93 / Labor 100 / Inventory 73 scorecards. \"Food cost variance at 19.2% exceeds 5% critical threshold.\"",
    productHref: "/insights",
    productLabel: "See full Insights gallery →",
  },
  {
    id: "pulse-wallboard",
    src: "/images/product/2026-fresh/pulse-wallboard.png",
    alt: "Pulse — live shift wallboard with target gap",
    caption: "Pulse — Live Wallboard",
    whatYouSee:
      "Actual AED 10,300 vs Target AED 28,000. \"Need AED 9,133.21/hr to hit target.\" 37% progress with outlet selector + behind status indicator.",
    productHref: "/product/pulse",
    productLabel: "See full Pulse gallery →",
  },
  {
    id: "foresight-scenarios",
    src: "/images/product/2026-fresh/foresight-scenarios.png",
    alt: "Foresight Scenarios — scenario library with 10 quick-start templates",
    caption: "Foresight — Scenarios",
    whatYouSee:
      "5 scenarios saved, 10 quick-start templates (5% Price, 10% Labor Reduction, Marketing Push, Peak Season, Capacity Expansion). Sidebar: PREDICT / MODEL / TRUST / DECIDE.",
    productHref: "/product/foresight",
    productLabel: "See full Foresight gallery →",
  },
  {
    id: "intelligence",
    src: "/images/product/2026-fresh/intelligence.png",
    alt: "Sundae Intelligence — conversational decision interface",
    caption: "Sundae Intelligence",
    whatYouSee:
      "AED 96,555 today's revenue, 379 orders, \"New York Strip (40 sold).\" Threads sidebar with Collections + suggested questions. Conversational decision intelligence.",
    productHref: "/intelligence",
    productLabel: "See full Intelligence gallery →",
  },
];

export function SectionProductPreview() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const item = lightboxIndex !== null ? PREVIEW[lightboxIndex] : null;

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") setLightboxIndex((i) => (i === null ? null : (i + 1) % PREVIEW.length));
      if (e.key === "ArrowLeft") setLightboxIndex((i) => (i === null ? null : (i - 1 + PREVIEW.length) % PREVIEW.length));
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex]);

  return (
    <section
      aria-labelledby="product-preview-headline"
      className="relative py-20 px-4 sm:px-6 lg:px-8 border-y border-[var(--border-default)] bg-[var(--surface-faint)]"
    >
      <div className="max-w-7xl mx-auto">
        <FadeUp className="text-center mb-10">
          <p className="eyebrow mb-3">SEE THE PRODUCT</p>
          <h2
            id="product-preview-headline"
            className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] text-balance mb-3"
          >
            This is what your team actually sees.
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-supporting)] max-w-2xl mx-auto">
            Four surfaces from across the platform. Click any to enlarge —
            then explore the full gallery on each product page.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {PREVIEW.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="group rounded-2xl border border-[var(--border-default)] bg-[var(--navy-deep)] overflow-hidden hover:border-[var(--electric-blue)]/40 transition-colors"
            >
              <button
                onClick={() => setLightboxIndex(i)}
                className="relative aspect-[16/10] bg-black overflow-hidden w-full block cursor-zoom-in"
                aria-label={`Open ${p.caption} at full size`}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy-deep)] via-transparent to-transparent opacity-60" />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-[var(--electric-blue)] text-white rounded-full p-3 shadow-2xl">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                </div>
              </button>
              <div className="p-5">
                <h3 className="text-base font-bold text-[var(--text-primary)] mb-2">{p.caption}</h3>
                <p className="text-xs text-[var(--text-supporting)] leading-relaxed mb-3 min-h-[3em]">
                  {p.whatYouSee}
                </p>
                <Link
                  href={p.productHref}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--electric-blue)] hover:underline"
                >
                  {p.productLabel}
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-xs text-[var(--text-muted)] mt-10 italic max-w-2xl mx-auto">
          Live in-product surfaces. Synthetic data shown for illustration.{" "}
          <Link href="/diagnostic" className="text-[var(--electric-blue)] hover:underline font-semibold not-italic">
            Take the Operations Diagnostic
          </Link>{" "}
          to see what your view would look like.
        </p>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {item && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {PREVIEW.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((i) => (i === null ? null : (i - 1 + PREVIEW.length) % PREVIEW.length));
                  }}
                  className="absolute left-4 md:left-8 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((i) => (i === null ? null : (i + 1) % PREVIEW.length));
                  }}
                  className="absolute right-4 md:right-8 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </>
            )}

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-6xl w-full max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative flex-1 min-h-0 bg-black rounded-xl overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={1600}
                  height={1000}
                  className="w-full h-auto max-h-[80vh] object-contain"
                  priority
                />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-lg font-bold text-white mb-1">{item.caption}</h3>
                <p className="text-sm text-white/70 max-w-2xl mx-auto">{item.whatYouSee}</p>
                {lightboxIndex !== null && (
                  <p className="text-[10px] text-white/40 mt-3 uppercase tracking-wider">
                    {lightboxIndex + 1} / {PREVIEW.length} · Esc to close · ← → to navigate
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
