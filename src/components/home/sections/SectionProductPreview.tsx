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
 *
 * All user-facing copy is resolved per locale (productPreviewCopy) with an
 * English fallback; only the card identity (id / src / href) lives here.
 */

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, Maximize2, ChevronLeft, ChevronRight } from "lucide-react";
import { FadeUp } from "@/components/ui/PageAnimations";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";
import { productPreviewCopy, type ProductPreviewCardCopy } from "./productPreviewCopy";

type PreviewCardKey = "execSummary" | "pulseWallboard" | "foresightScenarios" | "intelligence";

type PreviewMeta = {
  id: string;
  copyKey: PreviewCardKey;
  src: string;
  productHref: string;
};

type PreviewItem = PreviewMeta & ProductPreviewCardCopy;

const PREVIEW_META: PreviewMeta[] = [
  {
    id: "exec-summary",
    copyKey: "execSummary",
    src: "/images/product/2026-fresh/insights-exec-summary.png",
    productHref: "/insights",
  },
  {
    id: "pulse-wallboard",
    copyKey: "pulseWallboard",
    src: "/images/product/2026-fresh/pulse-sales.png",
    productHref: "/product/pulse",
  },
  {
    id: "foresight-scenarios",
    copyKey: "foresightScenarios",
    src: "/images/product/2026-fresh/foresight-scenarios.png",
    productHref: "/product/foresight",
  },
  {
    id: "intelligence",
    copyKey: "intelligence",
    src: "/images/product/2026-fresh/intelligence.png",
    productHref: "/intelligence",
  },
];

export function SectionProductPreview() {
  const { locale } = useWebsiteI18n();
  const copy =
    productPreviewCopy[locale as keyof typeof productPreviewCopy] ?? productPreviewCopy.en;

  const preview: PreviewItem[] = PREVIEW_META.map((meta) => ({
    ...meta,
    ...copy.cards[meta.copyKey],
  }));

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const item = lightboxIndex !== null ? preview[lightboxIndex] : null;

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") setLightboxIndex((i) => (i === null ? null : (i + 1) % PREVIEW_META.length));
      if (e.key === "ArrowLeft") setLightboxIndex((i) => (i === null ? null : (i - 1 + PREVIEW_META.length) % PREVIEW_META.length));
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
          <p className="eyebrow mb-3">{copy.eyebrow}</p>
          <h2
            id="product-preview-headline"
            className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] text-balance mb-3"
          >
            {copy.headline}
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-supporting)] max-w-2xl mx-auto">
            {copy.sub}
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {preview.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="group rounded-2xl border border-[var(--border-default)] bg-[var(--navy-deep)] overflow-hidden hover:border-[var(--warm-coral)]/40 transition-colors"
            >
              <button
                onClick={() => setLightboxIndex(i)}
                className="relative aspect-[16/10] bg-black overflow-hidden w-full block cursor-zoom-in"
                aria-label={copy.openFullSize.replace("{caption}", p.caption)}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                />
                {/* warm grade — coheres the (blue) product UI with the warm site */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 mix-blend-soft-light opacity-30"
                  style={{ background: 'linear-gradient(135deg, rgba(233,162,74,0.5), rgba(255,92,77,0.26))' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy-deep)] via-transparent to-transparent opacity-60" />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-[var(--warm-coral)] text-white rounded-full p-3 shadow-2xl">
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
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--warm-coral)] hover:underline"
                >
                  {p.productLabel}
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-[var(--text-secondary)]">
          {copy.adaptsNote}
        </p>
        <p className="text-center text-xs text-[var(--text-muted)] mt-4 italic max-w-2xl mx-auto">
          {copy.footnoteLead}{" "}
          <Link href="/diagnostic" className="text-[var(--warm-coral)] hover:underline font-semibold not-italic">
            {copy.diagnosticLink}
          </Link>{" "}
          {copy.footnoteTail}
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
              aria-label={copy.closeLightbox}
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {PREVIEW_META.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((i) => (i === null ? null : (i - 1 + PREVIEW_META.length) % PREVIEW_META.length));
                  }}
                  className="absolute left-4 md:left-8 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label={copy.prevImage}
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((i) => (i === null ? null : (i + 1) % PREVIEW_META.length));
                  }}
                  className="absolute right-4 md:right-8 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label={copy.nextImage}
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
                    {copy.lightboxHint
                      .replace("{index}", String(lightboxIndex + 1))
                      .replace("{total}", String(PREVIEW_META.length))}
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
