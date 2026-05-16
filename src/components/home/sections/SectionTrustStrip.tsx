"use client";

import { FadeUp } from "@/components/ui/PageAnimations";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";

/**
 * Section — Built Enterprise-Grade trust strip.
 *
 * Conversion job: signal enterprise-readiness without claiming
 * compliance certifications that aren't verified.
 *
 * Items are limited to capabilities already referenced elsewhere on the
 * site (RBAC, audit trails, public API, webhooks, governed schema, sync
 * SLO from the IntegrationsHubMockup). When SOC 2 / GDPR / SSO are
 * verified, swap in here.
 */

const items: Array<{ icon: SundaeIconName; title: string; supporting: string }> = [
  { icon: "support", title: "RBAC", supporting: "Granular role permissions" },
  { icon: "report", title: "Audit Trails", supporting: "Every metric to source row" },
  { icon: "integration", title: "Public API", supporting: "REST + webhooks" },
  { icon: "speed", title: "99.4% Sync SLO", supporting: "On Core Pro tier" },
  { icon: "balance", title: "Encrypted", supporting: "In transit & at rest" },
  { icon: "data", title: "Governed Schema", supporting: "179+ restaurant data models" },
];

export function SectionTrustStrip() {
  return (
    <section aria-labelledby="trust-headline" className="relative py-14 px-4 sm:px-6 lg:px-8 border-y border-[var(--border-default)]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(28,71,255,0.03),transparent_70%)]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <FadeUp className="text-center mb-10">
          <p className="eyebrow mb-3">BUILT ENTERPRISE-GRADE</p>
          <h3 id="trust-headline" className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] text-balance">
            Audit-ready. API-first. From day one.
          </h3>
        </FadeUp>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5 max-w-6xl mx-auto">
          {items.map((item) => (
            <div
              key={item.title}
              className="text-center p-4 rounded-xl bg-white/[0.025] border border-[var(--border-default)] hover:border-[rgba(28,71,255,0.2)] transition-colors"
            >
              <div className="inline-flex w-9 h-9 rounded-lg bg-[rgba(28,71,255,0.12)] border border-[rgba(28,71,255,0.2)] items-center justify-center mb-2.5">
                <SundaeIcon name={item.icon} size="sm" className="text-[#60A5FA]" />
              </div>
              <div className="text-sm font-bold text-[var(--text-primary)] mb-1 leading-tight">{item.title}</div>
              <div className="text-[11px] text-[var(--text-muted)] leading-snug">{item.supporting}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
