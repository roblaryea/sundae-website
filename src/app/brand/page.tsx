import type { Metadata } from "next";
import Image from "next/image";
import { SundaeMark } from "@/components/ui/SundaeMark";
import { SundaeLogotype } from "@/components/ui/SundaeLogotype";
import { Button } from "@/components/ui/Button";
import { FadeUp } from "@/components/ui/PageAnimations";
import { ColorSwatches } from "./ColorSwatches";

export const metadata: Metadata = {
  title: "Brand Assets",
  description:
    "The Sundae brand kit - mark, wordmark, lock-up, colors, and typography, with downloadable logo files. One link for partners, press, and OEMs.",
  alternates: { canonical: "/brand" },
  openGraph: {
    title: "Sundae Brand Assets",
    description:
      "The Sundae brand kit - mark, wordmark, colors, and type, in one place.",
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

const BANNERS = [
  { src: "/brand/banners/linkedin-1128x191.png", label: "LinkedIn", dim: "1128×191", w: 1128, h: 191 },
  { src: "/brand/banners/x-1500x500.png", label: "X / Twitter", dim: "1500×500", w: 1500, h: 500 },
  { src: "/brand/banners/facebook-1640x624.png", label: "Facebook", dim: "1640×624", w: 1640, h: 624 },
  { src: "/brand/banners/youtube-2048x1152.png", label: "YouTube", dim: "2048×1152", w: 2048, h: 1152 },
];

const DOS = [
  "Use the coral-S mark with the Fraunces “sundae” wordmark.",
  "Keep clear space around the lock-up - at least the height of the mark’s cherry.",
  "Place the dark-tile mark on light or dark; it’s built to read on both.",
  "Set “sundae” in Fraunces (display cut) whenever it’s used as a logo.",
];

const DONTS = [
  "Don’t use the retired blue orb “e” icon or the blue “sundae” wordmark.",
  "Don’t recolor, rotate, stretch, or add shadows/effects to the mark.",
  "Don’t swap a wordmark image into running text - “Sundae” stays plain text mid-sentence.",
  "Don’t rebuild the mark; use these files so every surface matches.",
];

export default function BrandPage() {
  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-mesh px-6 pt-32 pb-24 text-center">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex justify-center">
            <SundaeMark size={76} />
          </div>
          <span className="eyebrow">Brand</span>
          <h1 className="hero-h1 mt-3 text-[var(--text-display)]">
            Sundae brand assets
          </h1>
          <p className="body-xl mx-auto mt-5 max-w-2xl text-[var(--text-supporting)]">
            The mark, wordmark, colors, and type - everything you need to
            represent Sundae correctly, in one place.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button href="/brand/sundae-brand-assets.zip" variant="cta" size="lg">
              Download all assets
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

      {/* ── Logo ─────────────────────────────────────────────────────────── */}
      <section id="logo" className="px-4 py-20 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <FadeUp>
            <div className="mb-14 text-center">
              <span className="eyebrow">Logo</span>
              <h2 className="section-h2 mt-2 text-[var(--text-primary)]">
                Mark, wordmark, lock-up
              </h2>
              <p className="body-lg mx-auto mt-3 max-w-2xl text-[var(--text-supporting)]">
                The coral layered-S - the business as strata, topped by the cherry
                (the signal) - beside “sundae” in Fraunces.
              </p>
            </div>
          </FadeUp>

          <FadeUp>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Mark */}
              <div className="rounded-3xl border border-[var(--border-default)] bg-[var(--surface-faint)] p-6">
                <div className="mb-5 flex h-44 items-center justify-center rounded-2xl bg-[var(--navy)]">
                  <SundaeMark size={104} />
                </div>
                <h3 className="section-h4 text-[var(--text-primary)]">The mark</h3>
                <p className="body-sm mt-1 mb-4 text-[var(--text-muted)]">
                  App icon, favicon, avatar. Dark-tile, rounded square.
                </p>
                <div className="flex flex-wrap gap-2">
                  <DownloadChip href="/brand/logo/sundae-mark.svg" label="SVG" />
                  <DownloadChip href="/brand/logo/sundae-mark-512.png" label="PNG 512" />
                  <DownloadChip href="/brand/logo/sundae-mark-1024.png" label="PNG 1024" />
                </div>
              </div>

              {/* Wordmark */}
              <div className="rounded-3xl border border-[var(--border-default)] bg-[var(--surface-faint)] p-6">
                <div className="mb-5 flex h-44 items-center justify-center rounded-2xl bg-[var(--navy)]">
                  <SundaeLogotype className="text-[var(--text-display)] text-[52px]" />
                </div>
                <h3 className="section-h4 text-[var(--text-primary)]">The wordmark</h3>
                <p className="body-sm mt-1 mb-4 text-[var(--text-muted)]">
                  “sundae” in Fraunces (display cut). Cream on dark, espresso on light.
                </p>
                <div className="flex flex-wrap gap-2">
                  <DownloadChip href="/brand/logo/sundae-wordmark-light.png" label="PNG light" />
                  <DownloadChip href="/brand/logo/sundae-wordmark-dark.png" label="PNG dark" />
                </div>
              </div>

              {/* Lock-up */}
              <div className="rounded-3xl border border-[var(--border-default)] bg-[var(--surface-faint)] p-6">
                <div className="mb-5 flex h-44 items-center justify-center gap-4 rounded-2xl bg-[var(--navy)]">
                  <SundaeMark size={60} />
                  <SundaeLogotype className="text-[var(--text-display)] text-[46px]" />
                </div>
                <h3 className="section-h4 text-[var(--text-primary)]">The lock-up</h3>
                <p className="body-sm mt-1 mb-4 text-[var(--text-muted)]">
                  Mark + wordmark together. The default header / footer signature.
                </p>
                <div className="flex flex-wrap gap-2">
                  <DownloadChip href="/brand/logo/sundae-lockup-light.png" label="PNG light" />
                  <DownloadChip href="/brand/logo/sundae-lockup-dark.png" label="PNG dark" />
                </div>
              </div>
            </div>
          </FadeUp>

          {/* Mark on light - proof it reads both ways */}
          <FadeUp>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex items-center justify-center gap-4 rounded-3xl border border-[var(--border-default)] bg-[var(--navy)] p-10">
                <SundaeMark size={52} />
                <SundaeLogotype className="text-[var(--text-display)] text-[40px]" />
              </div>
              <div className="flex items-center justify-center gap-4 rounded-3xl border border-[var(--cream-edge)] bg-[var(--cream)] p-10">
                <SundaeMark size={52} />
                <SundaeLogotype className="text-[#1A140F] text-[40px]" />
              </div>
            </div>
          </FadeUp>
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
                Cream to clay through coral - the same strata that fill the mark.
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
                  See every layer
                </p>
                <p className="mt-4 font-display text-2xl text-[var(--text-secondary)]">
                  Aa Bb Cc - 0123456789
                </p>
                <p className="body-sm mt-4 text-[var(--text-muted)]">
                  Headings + the wordmark. The wordmark locks the display cut:
                  <span className="font-mono text-[var(--text-supporting)]">
                    {" "}opsz 144, SOFT 90, WONK 1
                  </span>
                  .
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

      {/* ── Social banners ───────────────────────────────────────────────── */}
      <section className="border-t border-[var(--border-default)] bg-[var(--surface-faint)] px-4 py-20 sm:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <FadeUp>
            <div className="mb-14 text-center">
              <span className="eyebrow">Social</span>
              <h2 className="section-h2 mt-2 text-[var(--text-primary)]">
                Channel banners
              </h2>
              <p className="body-lg mx-auto mt-3 max-w-2xl text-[var(--text-supporting)]">
                Sized and safe-area-checked for each platform.
              </p>
            </div>
          </FadeUp>
          <FadeUp>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {BANNERS.map((b) => (
                <div
                  key={b.src}
                  className="overflow-hidden rounded-3xl border border-[var(--border-default)] bg-[var(--navy)]"
                >
                  <Image
                    src={b.src}
                    width={b.w}
                    height={b.h}
                    alt={`Sundae ${b.label} banner`}
                    className="h-auto w-full"
                  />
                  <div className="flex items-center justify-between px-5 py-4">
                    <div>
                      <p className="font-display text-lg text-[var(--text-primary)]">
                        {b.label}
                      </p>
                      <p className="font-mono text-xs text-[var(--text-muted)]">
                        {b.dim}
                      </p>
                    </div>
                    <DownloadChip href={b.src} label="PNG" />
                  </div>
                </div>
              ))}
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
              <SundaeMark size={56} />
            </div>
            <h2 className="section-h2 text-[var(--text-primary)]">
              Everything, in one link
            </h2>
            <p className="body-lg mx-auto mt-3 max-w-xl text-[var(--text-supporting)]">
              Bookmark <span className="font-mono text-[var(--text-secondary)]">sundae.io/brand</span>.
              Need a format that isn’t here, or a co-branded lock-up? Reach out.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="/brand/sundae-brand-assets.zip" variant="cta" size="lg">
                Download all assets
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
