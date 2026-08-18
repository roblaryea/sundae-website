"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { PageHero, PageCTA, FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/PageAnimations";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";
import { localizeWebsiteHref } from "@/lib/i18n";
import { getRecoveryCopy } from "./recoveryCopy";

/**
 * Profit recovery - the closed loop, given its own destination.
 *
 * Built mobile-first: the loop is a single column of steps on a phone, where
 * the ordinal rail carries the sequence, and only widens to a two-column
 * reading layout from md up. Nothing here is a desktop grid squeezed down.
 */
export default function RecoveryPage() {
  const { locale } = useWebsiteI18n();
  const copy = getRecoveryCopy(locale);
  const href = (path: string) => localizeWebsiteHref(path, locale);

  return (
    <main>
      <PageHero
        badge={copy.badge}
        title={
          <>
            <span className="block">{copy.title}</span>
            <span className="block text-[var(--warm-coral)]">{copy.titleAccent}</span>
          </>
        }
        description={copy.description}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={href("/demo")}>
            <Button size="lg">{copy.ctaPrimary}</Button>
          </Link>
          <Link href={href("/core")}>
            <Button size="lg" variant="secondary">
              {copy.ctaSecondary}
            </Button>
          </Link>
        </div>
      </PageHero>

      {/* The loop. Ordinals earn their place: this is a real sequence. */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <FadeUp>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--warm-coral)]">
              {copy.stagesEyebrow}
            </p>
            <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[var(--text-primary)] text-balance">
              {copy.stagesTitle}
            </h2>
          </FadeUp>

          <StaggerContainer className="mt-10 sm:mt-14 flex flex-col">
            {copy.stages.map((s) => (
              <StaggerItem key={s.step}>
                <div className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-1 sm:gap-x-8 border-t border-[var(--border-default)] py-6 sm:py-8">
                  <span
                    aria-hidden="true"
                    className="font-mono text-sm tabular-nums text-[var(--warm-coral)] pt-1"
                  >
                    {s.step}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-lg sm:text-xl font-semibold text-[var(--text-primary)]">
                      {s.name}
                    </h3>
                    <p className="mt-2 text-sm sm:text-base leading-relaxed text-[var(--text-muted)] max-w-[68ch]">
                      {s.line}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* The limits. Stating them is the point, not a disclaimer. */}
      <section
        className="px-4 sm:px-6 lg:px-8 py-16 sm:py-24"
        style={{ background: "var(--surface-raised)" }}
      >
        <div className="mx-auto max-w-5xl">
          <FadeUp>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--warm-coral)]">
              {copy.honestyEyebrow}
            </p>
            <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[var(--text-primary)] text-balance">
              {copy.honestyTitle}
            </h2>
          </FadeUp>

          <StaggerContainer className="mt-10 grid gap-5 sm:gap-6 md:grid-cols-3">
            {copy.honesty.map((h) => (
              <StaggerItem key={h.title}>
                <div className="h-full rounded-xl border border-[var(--border-default)] bg-[var(--surface-default)] p-6">
                  <h3 className="text-base font-semibold text-[var(--text-primary)] text-balance">
                    {h.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{h.body}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <PageCTA title={copy.ctaTitle} description={copy.ctaDescription}>
        <Link href={href("/demo")}>
          <Button size="lg">{copy.ctaPrimary}</Button>
        </Link>
      </PageCTA>
    </main>
  );
}
