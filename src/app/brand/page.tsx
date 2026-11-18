import type { Metadata } from "next";
import { ApprovedWordmark } from "@/components/ui/ApprovedWordmark";
import { SUNDAE_WORDMARK } from "@/lib/brandAssets";
import { Button } from "@/components/ui/Button";
import { FadeUp } from "@/components/ui/PageAnimations";
import { ColorSwatches } from "./ColorSwatches";

export const metadata: Metadata = {
  title: "Brand Assets",
  description:
    "The approved Sundae Fraunces wordmarks, colors and typography. Download the original PNG artwork for light and dark backgrounds.",
  alternates: { canonical: "/brand" },
  openGraph: {
    title: "Sundae Brand Assets",
    description:
      "The approved Sundae Fraunces wordmarks, colors and typography, in one place.",
    url: "/brand",
  },
};

function DownloadChip({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      download
      className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-default)] bg-[var(--surface-subtle)] px-3.5 py-1.5 text-xs font-semibold text-[var(--text-secondary)] transition-colors duration-200 hover:border-[var(--border-hover)] hover:text-[var(--text-primary)]"
    >
      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M8 1v9m0 0L4.5 6.5M8 10l3.5-3.5M2 13h12"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {label}
    </a>
  );
}

const DOS = [
  "Use the supplied Fraunces PNG wordmark without changing its proportions.",
  "Choose the dark wordmark on light backgrounds and the white wordmark on dark backgrounds.",
  "Keep the clear space included in the original file.",
  "Write Sundae as ordinary text within sentences.",
];

const DONTS = [
  "Do not use retired symbols, layered-S marks or mark-plus-wordmark lockups.",
  "Do not redraw, retype, recolor, stretch or crop the lettering.",
  "Do not combine the wordmark with a separate mark.",
  "Do not rebuild the logo with a font or an image generator.",
];

export default function BrandPage() {
  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-mesh px-6 pt-32 pb-24 text-center">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex justify-center">
            <ApprovedWordmark className="h-20 w-80 max-w-full" />
          </div>
          <span className="eyebrow">Brand</span>
          <h1 className="hero-h1 mt-3 text-[var(--text-display)]">
            Sundae brand assets
          </h1>
          <p className="body-xl mx-auto mt-5 max-w-2xl text-[var(--text-supporting)]">
            The approved wordmark, colors and typography to represent Sundae
            consistently across your materials.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button href="/brand/sundae-brand-assets.zip" variant="cta" size="lg">
              Download approved wordmarks
            </Button>
            <Button href="#logo" variant="outline-light" size="lg">
              Browse the kit
            </Button>
          </div>
          <p className="mt-4 font-mono text-xs text-[var(--text-muted)]">
            sundae.io/brand
          </p>
        </div>
      </section>

      <section id="logo" className="px-4 py-20 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <FadeUp>
            <div className="mb-14 max-w-3xl">
              <span className="eyebrow">The approved logo</span>
              <h2 className="section-h2 mt-2 text-[var(--text-primary)]">One wordmark. Two backgrounds.</h2>
              <p className="body-lg mt-4 text-[var(--text-supporting)]">
                Use these original Fraunces PNGs. Earlier marks, reconstructed lettering
                and mark-plus-wordmark lockups are retired.
              </p>
            </div>
          </FadeUp>
          <div className="grid gap-10 md:grid-cols-2">
            <FadeUp>
              <div className="flex min-h-56 items-center justify-center rounded-2xl border border-[#d8cbbd] bg-[#FBF8F4] px-4">
                <ApprovedWordmark tone="ink" className="h-24 w-96 max-w-full" />
              </div>
              <h3 className="section-h4 mt-6 text-[var(--text-primary)]">Dark on light</h3>
              <p className="body-sm mb-4 mt-2 text-[var(--text-supporting)]">For white, cream and other very light backgrounds.</p>
              <DownloadChip href={SUNDAE_WORDMARK.ink} label="Download dark wordmark PNG" />
            </FadeUp>
            <FadeUp>
              <div className="flex min-h-56 items-center justify-center rounded-2xl border border-[#524536] bg-[#171210] px-4">
                <ApprovedWordmark tone="cream" className="h-24 w-96 max-w-full" />
              </div>
              <h3 className="section-h4 mt-6 text-[var(--text-primary)]">White on dark</h3>
              <p className="body-sm mb-4 mt-2 text-[var(--text-supporting)]">For espresso, navy and other dark backgrounds.</p>
              <DownloadChip href={SUNDAE_WORDMARK.cream} label="Download white wordmark PNG" />
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Colors ───────────────────────────────────────────────────────── */}
      <section className="border-t border-[var(--border-default)] bg-[var(--surface-faint)] px-4 py-20 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <FadeUp>
            <div className="mb-14 text-center">
              <span className="eyebrow">Color</span>
              <h2 className="section-h2 mt-2 text-[var(--text-primary)]">
                A warm, decisive palette
              </h2>
              <p className="body-lg mx-auto mt-3 max-w-2xl text-[var(--text-supporting)]">
                Cream, espresso and warm coral form the website palette.
              </p>
            </div>
          </FadeUp>
          <FadeUp>
            <ColorSwatches />
          </FadeUp>
        </div>
      </section>

      {/* ── Typography ───────────────────────────────────────────────────── */}
      <section className="px-4 py-20 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <FadeUp>
            <div className="mb-14 text-center">
              <span className="eyebrow">Type</span>
              <h2 className="section-h2 mt-2 text-[var(--text-primary)]">
                Fraunces &amp; Hanken Grotesk
              </h2>
              <p className="body-lg mx-auto mt-3 max-w-2xl text-[var(--text-supporting)]">
                A warm display serif for the signature register, a clean grotesque
                for everything operational.
              </p>
            </div>
          </FadeUp>
          <FadeUp>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-[var(--border-default)] bg-[var(--surface-faint)] p-8">
                <div className="mb-2 flex items-baseline justify-between">
                  <span className="eyebrow">Display</span>
                  <span className="font-mono text-xs text-[var(--text-muted)]">Fraunces</span>
                </div>
                <p
                  className="font-display leading-none text-[var(--text-display)]"
                  style={{ fontSize: 68, fontVariationSettings: "'opsz' 144, 'SOFT' 90, 'WONK' 1" }}
                >
                  Recover the profit
                </p>
                <p className="mt-4 font-display text-2xl text-[var(--text-secondary)]">
                  Aa Bb Cc - 0123456789
                </p>
                <p className="body-sm mt-4 text-[var(--text-muted)]">
                  Use Fraunces for editorial headings. For the logo itself, use the supplied PNG rather than retyping it.
                </p>
              </div>
              <div className="rounded-3xl border border-[var(--border-default)] bg-[var(--surface-faint)] p-8">
                <div className="mb-2 flex items-baseline justify-between">
                  <span className="eyebrow">Body</span>
                  <span className="font-mono text-xs text-[var(--text-muted)]">
                    Hanken Grotesk
                  </span>
                </div>
                <p className="font-sans text-3xl font-semibold leading-tight text-[var(--text-primary)]">
                  Run your operations on signal, not guesswork.
                </p>
                <p className="mt-4 font-sans text-base leading-relaxed text-[var(--text-secondary)]">
                  Every layer - POS, labor, inventory, guests - connected through one
                  decision intelligence platform. Aa Bb Cc - 0123456789.
                </p>
                <p className="body-sm mt-4 text-[var(--text-muted)]">
                  UI, body copy, and data labels (Geist Mono for tabular figures).
                </p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Usage ────────────────────────────────────────────────────────── */}
      <section className="px-4 py-20 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <FadeUp>
            <div className="mb-14 text-center">
              <span className="eyebrow">Usage</span>
              <h2 className="section-h2 mt-2 text-[var(--text-primary)]">
                Keep it consistent
              </h2>
            </div>
          </FadeUp>
          <FadeUp>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-[rgba(169,184,107,0.3)] bg-[rgba(169,184,107,0.06)] p-8">
                <h3 className="section-h4 mb-4 text-[var(--trust)]">Do</h3>
                <ul className="space-y-3">
                  {DOS.map((d) => (
                    <li key={d} className="flex gap-3 text-[var(--text-secondary)]">
                      <span className="mt-1 text-[var(--trust)]">✓</span>
                      <span className="body-base">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl border border-[rgba(255,92,77,0.28)] bg-[rgba(255,92,77,0.06)] p-8">
                <h3 className="section-h4 mb-4 text-[var(--warm-coral)]">Don’t</h3>
                <ul className="space-y-3">
                  {DONTS.map((d) => (
                    <li key={d} className="flex gap-3 text-[var(--text-secondary)]">
                      <span className="mt-1 text-[var(--warm-coral)]">✕</span>
                      <span className="body-base">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Closing ──────────────────────────────────────────────────────── */}
      <section className="border-t border-[var(--border-default)] px-4 py-20 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <FadeUp>
            <div className="mb-6 flex justify-center">
              <ApprovedWordmark className="h-16 w-64 max-w-full" />
            </div>
            <h2 className="section-h2 text-[var(--text-primary)]">
              Everything, in one link
            </h2>
            <p className="body-lg mx-auto mt-3 max-w-xl text-[var(--text-supporting)]">
              Bookmark <span className="font-mono text-[var(--text-secondary)]">sundae.io/brand</span>.
              Need another file format? Contact us for approved artwork.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="/brand/sundae-brand-assets.zip" variant="cta" size="lg">
                Download approved wordmarks
              </Button>
              <Button href="/contact" variant="outline-light" size="lg">
                Contact us
              </Button>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
