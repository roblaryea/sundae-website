/**
 * Operator-voice copy — the homepage's human-presence beat.
 *
 * Premium hospitality sites (USHG, the best Squarespace restaurant templates)
 * lead with PEOPLE, not product spectacle. Sundae's product sections are UI +
 * copy; this section puts a real face on the page and speaks in the operator's
 * own voice about the problem we obsess over.
 *
 * IMPORTANT — this is deliberately NOT a fabricated named testimonial. Per the
 * standing product decision, attributed operator quotes wait for a named pilot
 * who agrees to attribution (see the homepage Section-7 composite-quote policy).
 * Until then this is an honest second-person empathy beat ("what we hear on
 * every floor"), which reads premium without inventing a customer.
 *
 * Same localization pattern as manifestoCopy/SectionTrustStrip: locale-keyed map
 * with an English fallback, outside the validated `messages` tree. A single
 * `*…*` span in `quote` renders warm-coral.
 */
export type OperatorVoiceCopy = {
  eyebrow: string;
  /** One `*…*` span renders in warm-coral. */
  quote: string;
  resolution: string;
  attribution: string;
  cta: string;
  /** Alt text for the portrait. */
  alt: string;
};

export const operatorVoiceCopy: Record<'en' | 'ar' | 'fr' | 'es', OperatorVoiceCopy> = {
  en: {
    eyebrow: 'The problem we obsess over',
    quote:
      'You can feel the night turning by 7:15 — the covers, the pace, the table that is sitting too long. *The numbers that prove it only land at 11 the next morning.*',
    resolution:
      'Sundae closes that gap. The read you need arrives while the shift is still yours to change — not buried in tomorrow’s report.',
    attribution: 'What we hear on every floor we build for',
    cta: 'See how it works',
    alt: 'A head chef working with focus on the kitchen pass during evening service',
  },
  ar: {
    eyebrow: 'المشكلة التي تشغلنا',
    quote:
      'تشعر بأن الليلة تتبدّل عند السابعة وربع — الضيوف، الإيقاع، الطاولة التي طال جلوسها. *أما الأرقام التي تُثبت ذلك فلا تصل إلا في الحادية عشرة من صباح اليوم التالي.*',
    resolution:
      'يسدّ Sundae هذه الفجوة. تصلك القراءة التي تحتاجها والوردية لا تزال قابلة للإنقاذ — لا مدفونةً في تقرير الغد.',
    attribution: 'ما نسمعه في كل صالة نبني لأجلها',
    cta: 'شاهد كيف يعمل',
    alt: 'رئيس طهاة يعمل بتركيز عند ممر التقديم أثناء خدمة المساء',
  },
  fr: {
    eyebrow: 'Le problème qui nous obsède',
    quote:
      "Vous sentez la soirée basculer dès 19 h 15 — les couverts, la cadence, la table qui s'éternise. *Les chiffres qui le confirment n'arrivent qu'à 11 h le lendemain.*",
    resolution:
      "Sundae comble cet écart. L'information dont vous avez besoin arrive tant que le service peut encore être sauvé — pas enfouie dans le rapport du lendemain.",
    attribution: 'Ce que nous entendons dans chaque salle pour laquelle nous concevons',
    cta: 'Voir comment ça marche',
    alt: 'Un chef de cuisine concentré au passe pendant le service du soir',
  },
  es: {
    eyebrow: 'El problema que nos obsesiona',
    quote:
      'Sientes que la noche cambia a las 7:15 — los comensales, el ritmo, la mesa que lleva demasiado tiempo. *Los números que lo confirman recién llegan a las 11 de la mañana siguiente.*',
    resolution:
      'Sundae cierra esa brecha. La lectura que necesitas llega cuando todavía puedes cambiar el turno — no enterrada en el informe de mañana.',
    attribution: 'Lo que escuchamos en cada sala para la que construimos',
    cta: 'Ver cómo funciona',
    alt: 'Un chef ejecutivo trabajando con concentración en el pase durante el servicio de la noche',
  },
};
