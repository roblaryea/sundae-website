/**
 * Ecosystem-strip copy — the homepage's quiet external-credibility beat.
 *
 * USHG signals authority with restrained third-party badges (Michelin, James
 * Beard). Sundae's honest analog is the stack it plugs into. This strip names
 * ONLY the Live POS integrations (the source of truth is /integrations) and
 * labels everything else explicitly as roadmap — no overstating "Upcoming"
 * connectors as if they shipped.
 *
 * POS_SYSTEMS is intentionally NOT localized (product/brand wordmarks are
 * constant across locales). Same locale-keyed-with-en-fallback pattern as the
 * other self-contained homepage copy maps.
 */
export type EcosystemCopy = {
  eyebrow: string;
  liveLabel: string;
  roadmapLabel: string;
  /** Category labels for the not-yet-live ecosystem, honestly framed as roadmap. */
  roadmap: string[];
};

/** Live POS connectors, verbatim from the /integrations source of truth (status: "Live"). */
export const POS_SYSTEMS = ['Oracle Simphony', 'Square', 'Toast', 'Clover'] as const;

export const ecosystemCopy: Record<'en' | 'ar' | 'fr' | 'es', EcosystemCopy> = {
  en: {
    eyebrow: 'Sits on top of the systems you already run',
    liveLabel: 'Live POS sync, today',
    roadmapLabel: 'Expanding across your full stack',
    roadmap: ['Labor', 'Inventory', 'Delivery', 'Reservations', 'Marketing', 'Finance'],
  },
  ar: {
    eyebrow: 'يعمل فوق الأنظمة التي تستخدمها أصلاً',
    liveLabel: 'مزامنة نقاط البيع مباشرةً، اليوم',
    roadmapLabel: 'يتوسّع ليشمل منظومتك بالكامل',
    roadmap: ['العمالة', 'المخزون', 'التوصيل', 'الحجوزات', 'التسويق', 'المالية'],
  },
  fr: {
    eyebrow: 'Se branche sur les systèmes que vous utilisez déjà',
    liveLabel: 'Sync caisse en direct, aujourd’hui',
    roadmapLabel: 'S’étend à toute votre stack',
    roadmap: ['Personnel', 'Stocks', 'Livraison', 'Réservations', 'Marketing', 'Finance'],
  },
  es: {
    eyebrow: 'Se conecta con los sistemas que ya usas',
    liveLabel: 'Sync de TPV en vivo, hoy',
    roadmapLabel: 'Ampliándose a todo tu stack',
    roadmap: ['Personal', 'Inventario', 'Delivery', 'Reservas', 'Marketing', 'Finanzas'],
  },
};
