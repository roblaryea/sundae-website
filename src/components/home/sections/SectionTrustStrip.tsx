"use client";

import { FadeUp } from "@/components/ui/PageAnimations";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";
import { getGeneratedLocalCopy } from '@/lib/generatedLocalCopy'
import { generatedLocalCopy } from '@/generated-locales/components_home_sections_SectionTrustStrip'

type LocalizedCopy = {
  eyebrow: string;
  headline: string;
  items: { title: string; supporting: string }[];
};

const localizedCopy: Record<"en" | "ar" | "fr" | "es", LocalizedCopy> = {
  en: {
    eyebrow: "BUILT ENTERPRISE-GRADE",
    headline: "Audit-ready. API-first. From day one.",
    items: [
      { title: "RBAC", supporting: "Granular role permissions" },
      { title: "Audit Trails", supporting: "Every metric to source row" },
      { title: "Public API", supporting: "REST + webhooks" },
      { title: "99.4% Sync SLO", supporting: "On Core Pro tier" },
      { title: "Encrypted", supporting: "In transit & at rest" },
      { title: "Governed Schema", supporting: "500+ restaurant data models" },
    ],
  },
  ar: {
    eyebrow: "مبني بمعايير المؤسسات",
    headline: "جاهز للتدقيق. API أولاً. من اليوم الأول.",
    items: [
      { title: "RBAC", supporting: "صلاحيات أدوار دقيقة" },
      { title: "سجلات تدقيق", supporting: "كل مقياس إلى صف المصدر" },
      { title: "API عامة", supporting: "REST + webhooks" },
      { title: "SLO مزامنة 99.4%", supporting: "على طبقة Core Pro" },
      { title: "مشفّر", supporting: "أثناء النقل والتخزين" },
      { title: "مخطط محكوم", supporting: "أكثر من 500 نموذج بيانات مطعم" },
    ],
  },
  fr: {
    eyebrow: "GRADE ENTREPRISE",
    headline: "Audit-ready. API-first. Dès le premier jour.",
    items: [
      { title: "RBAC", supporting: "Permissions de rôle granulaires" },
      { title: "Pistes d'audit", supporting: "Chaque métrique à la source" },
      { title: "API publique", supporting: "REST + webhooks" },
      { title: "SLO sync 99,4%", supporting: "Sur le tier Core Pro" },
      { title: "Chiffré", supporting: "En transit & au repos" },
      { title: "Schéma gouverné", supporting: "500+ modèles de données restaurant" },
    ],
  },
  es: {
    eyebrow: "GRADO EMPRESARIAL",
    headline: "Listo para auditoría. API-first. Desde el día uno.",
    items: [
      { title: "RBAC", supporting: "Permisos de rol granulares" },
      { title: "Pistas de auditoría", supporting: "Cada métrica a la fuente" },
      { title: "API pública", supporting: "REST + webhooks" },
      { title: "SLO sync 99,4%", supporting: "En tier Core Pro" },
      { title: "Cifrado", supporting: "En tránsito y en reposo" },
      { title: "Esquema gobernado", supporting: "500+ modelos de datos de restaurante" },
    ],
  },
};

const icons: SundaeIconName[] = ["support", "report", "integration", "speed", "balance", "data"];

export function SectionTrustStrip() {
  const { locale } = useWebsiteI18n();
  const copy = localizedCopy[locale as keyof typeof localizedCopy] ?? getGeneratedLocalCopy(localizedCopy, generatedLocalCopy.localizedCopy, locale) ?? localizedCopy.en;

  return (
    <section aria-labelledby="trust-headline" className="relative py-14 px-4 sm:px-6 lg:px-8 border-y border-[var(--border-default)]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(28,71,255,0.03),transparent_70%)]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <FadeUp className="text-center mb-10">
          <p className="eyebrow mb-3">{copy.eyebrow}</p>
          <h3 id="trust-headline" className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] text-balance">
            {copy.headline}
          </h3>
        </FadeUp>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5 max-w-6xl mx-auto">
          {copy.items.map((item, i) => (
            <div key={item.title} className="text-center p-4 rounded-xl bg-white/[0.025] border border-[var(--border-default)] hover:border-[rgba(28,71,255,0.2)] transition-colors">
              <div className="inline-flex w-9 h-9 rounded-lg bg-[rgba(28,71,255,0.12)] border border-[rgba(28,71,255,0.2)] items-center justify-center mb-2.5">
                <SundaeIcon name={icons[i] ?? "data"} size="sm" className="text-[#60A5FA]" />
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
