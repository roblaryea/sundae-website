/**
 * Manifesto copy — the homepage "belief beat" that opens the page in the
 * USHG/category-leader register: a confident, copy-first statement of what
 * Sundae believes, before the product earns its place.
 *
 * Follows the SectionTrustStrip / editorialCopy localization pattern: a
 * locale-keyed map resolved at render with an English fallback, kept out of the
 * large per-locale i18n.ts trees so this self-contained editorial system
 * localizes without touching them (and never trips the qa:translation gate,
 * which validates only the `messages` tree).
 *
 * A single `*…*` span in `statement` renders in warm-coral italic (the same
 * emphasis-marker convention used by creamReliefCopy). Brand name "Sundae" and
 * "P&L" stay untranslated in every locale.
 */
export type ManifestoCopy = {
  eyebrow: string;
  /** One `*…*` span renders warm-coral italic. */
  statement: string;
  coda: string;
};

export const manifestoCopy: Record<'en' | 'ar' | 'fr' | 'es', ManifestoCopy> = {
  en: {
    eyebrow: 'What we believe',
    statement:
      'A restaurant is decided a hundred times a day — on the floor, on the line, in the middle of the rush. Every one of those calls deserves *the full truth of your business,* fast enough to act on.',
    coda: 'That belief is the whole product. Everything Sundae does is in service of the next decision you are about to make.',
  },
  ar: {
    eyebrow: 'ما نؤمن به',
    statement:
      'يُتَّخذ قرار المطعم مئة مرة في اليوم — في الصالة، عند الممر، في عزّ الزحمة. كل قرار منها يستحق *الحقيقة الكاملة عن عملك،* وبسرعة تكفي للتصرّف.',
    coda: 'هذا الإيمان هو المنتج كله. كل ما يفعله Sundae في خدمة القرار التالي الذي توشك على اتخاذه.',
  },
  fr: {
    eyebrow: 'Ce en quoi nous croyons',
    statement:
      'Un restaurant se décide cent fois par jour — en salle, au passe, en plein coup de feu. Chacune de ces décisions mérite *toute la vérité de votre activité,* assez vite pour agir.',
    coda: "Cette conviction, c'est tout le produit. Tout ce que fait Sundae sert la prochaine décision que vous êtes sur le point de prendre.",
  },
  es: {
    eyebrow: 'En lo que creemos',
    statement:
      'Un restaurante se decide cien veces al día — en la sala, en el pase, en plena hora punta. Cada una de esas decisiones merece *toda la verdad de tu negocio,* a tiempo para actuar.',
    coda: 'Esa convicción es todo el producto. Todo lo que hace Sundae está al servicio de la próxima decisión que estás a punto de tomar.',
  },
};
