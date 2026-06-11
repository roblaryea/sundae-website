/**
 * Copy for the warm "cream relief" editorial band on the Foresight marketing page.
 *
 * Hand-authored native transcreation per locale - NOT literal word-for-word - so
 * each line reads the way an operator in that market would actually say it. Mirrors
 * the self-contained insightsCreamCopy.ts pattern: a locale-keyed map resolved at
 * render with an English fallback, kept out of the large per-locale i18n.ts trees.
 *
 * EMPHASIS MARKER: every `statement` carries exactly one `*...*` span. The renderer
 * (CreamBreak) splits on `*` and italicizes the wrapped phrase in warm-cherry. Each
 * locale MUST keep exactly one `*...*` pair around the equivalent emphasized phrase.
 *
 * Glossary discipline: the product name "Foresight" stays untranslated in every
 * locale. "14 to 90 day" is rendered as the natural numeric phrasing per language.
 *
 * Punctuation: normal hyphen "-" only - no em dashes, en dashes, ellipsis
 * characters, or zero-width characters. Arabic (ar) and Urdu (ur) are RTL; the
 * copy is written natively and the layout handles direction.
 */

export const foresightCreamCopy: Record<string, { eyebrow: string; statement: string; lede: string }> = {
  en: {
    eyebrow: 'PREDICTIVE INTELLIGENCE',
    statement: "Tomorrow's problems, surfaced *today*.",
    lede: '14 to 90 day forecasts and what-if scenarios that correct themselves as the data lands.',
  },
  ar: {
    eyebrow: 'الذكاء التنبؤي',
    statement: 'مشكلات الغد، تظهر *اليوم*.',
    lede: 'توقعات من 14 إلى 90 يوماً وسيناريوهات ماذا لو تصحح نفسها مع وصول البيانات.',
  },
  fr: {
    eyebrow: 'INTELLIGENCE PREDICTIVE',
    statement: "Les problemes de demain, reveles *aujourd'hui*.",
    lede: 'Des previsions de 14 a 90 jours et des scenarios qui se corrigent a mesure que les donnees arrivent.',
  },
  es: {
    eyebrow: 'INTELIGENCIA PREDICTIVA',
    statement: 'Los problemas de manana, visibles *hoy*.',
    lede: 'Previsiones de 14 a 90 dias y escenarios que se corrigen solos a medida que llegan los datos.',
  },
  de: {
    eyebrow: 'PROGNOSTISCHE INTELLIGENZ',
    statement: 'Die Probleme von morgen - sichtbar *heute*.',
    lede: 'Prognosen von 14 bis 90 Tagen und Was-waere-wenn-Szenarien, die sich mit den Daten selbst korrigieren.',
  },
  nl: {
    eyebrow: 'VOORSPELLENDE INTELLIGENTIE',
    statement: 'De problemen van morgen, *vandaag* al zichtbaar.',
    lede: 'Prognoses van 14 tot 90 dagen en wat-als-scenarios die zichzelf bijsturen zodra de data binnenkomt.',
  },
  pt: {
    eyebrow: 'INTELIGENCIA PREDITIVA',
    statement: 'Os problemas de amanha, revelados *hoje*.',
    lede: 'Previsoes de 14 a 90 dias e cenarios que se corrigem sozinhos a medida que os dados chegam.',
  },
  hi: {
    eyebrow: 'प्रेडिक्टिव इंटेलिजेंस',
    statement: 'कल की समस्याएं, *आज* ही सामने।',
    lede: '14 से 90 दिन के पूर्वानुमान और what-if परिदृश्य, जो डेटा आते ही खुद को सुधारते रहते हैं।',
  },
  ur: {
    eyebrow: 'پیش گوئی کرنے والی انٹیلیجنس',
    statement: 'کل کے مسائل، *آج* ہی سامنے۔',
    lede: '14 سے 90 دن کی پیش گوئیاں اور what-if منظرنامے، جو ڈیٹا آتے ہی خود کو درست کرتے رہتے ہیں۔',
  },
  it: {
    eyebrow: 'INTELLIGENCE PREDITTIVA',
    statement: 'I problemi di domani, in chiaro *oggi*.',
    lede: 'Previsioni da 14 a 90 giorni e scenari what-if che si correggono da soli man mano che arrivano i dati.',
  },
  pl: {
    eyebrow: 'INTELIGENCJA PREDYKCYJNA',
    statement: 'Problemy jutra, widoczne juz *dzis*.',
    lede: 'Prognozy od 14 do 90 dni i scenariusze what-if, ktore koryguja sie same w miare naplywu danych.',
  },
  tr: {
    eyebrow: 'ONGORUCU ZEKA',
    statement: 'Yarinin sorunlari, *bugun* goz onunde.',
    lede: '14 ila 90 gunluk tahminler ve veriler geldikce kendini duzelten senaryolar.',
  },
  'zh-Hans': {
    eyebrow: '预测情报',
    statement: '明天的问题，*今天*就浮现。',
    lede: '14 至 90 天的预测与假设推演，会随着数据到来不断自我校正。',
  },
  ja: {
    eyebrow: '予測インテリジェンス',
    statement: '明日の課題を、*今日*のうちに。',
    lede: '14日から90日先の予測と what-if シナリオが、データの到着とともに自ら補正します。',
  },
  ko: {
    eyebrow: '예측 인텔리전스',
    statement: '내일의 문제를 *오늘* 드러냅니다.',
    lede: '14일에서 90일 예측과 what-if 시나리오가 데이터가 쌓일수록 스스로 보정됩니다.',
  },
  id: {
    eyebrow: 'INTELIJEN PREDIKTIF',
    statement: 'Masalah esok hari, terlihat *hari ini*.',
    lede: 'Prakiraan 14 hingga 90 hari dan skenario what-if yang mengoreksi diri seiring datangnya data.',
  },
  vi: {
    eyebrow: 'TRI TUE DU BAO',
    statement: 'Van de cua ngay mai, hien ro *hom nay*.',
    lede: 'Du bao tu 14 den 90 ngay va kich ban what-if tu hieu chinh khi du lieu do ve.',
  },
  ro: {
    eyebrow: 'INTELIGENTA PREDICTIVA',
    statement: 'Problemele de maine, vizibile *astazi*.',
    lede: 'Prognoze de la 14 la 90 de zile si scenarii what-if care se corecteaza singure pe masura ce sosesc datele.',
  },
  sv: {
    eyebrow: 'PREDIKTIV INTELLIGENS',
    statement: 'Morgondagens problem, synliga *idag*.',
    lede: 'Prognoser pa 14 till 90 dagar och tankescenarier som rattar sig sjalva nar data kommer in.',
  },
  bn: {
    eyebrow: 'প্রেডিক্টিভ ইন্টেলিজেন্স',
    statement: 'আগামীকালের সমস্যা, *আজই* সামনে।',
    lede: '14 থেকে 90 দিনের পূর্বাভাস আর what-if পরিস্থিতি, যা ডেটা আসার সঙ্গে সঙ্গে নিজেকে শুধরে নেয়।',
  },
  th: {
    eyebrow: 'อินเทลลิเจนซ์เชิงคาดการณ์',
    statement: 'ปัญหาของวันพรุ่งนี้ เห็นได้ตั้งแต่ *วันนี้*',
    lede: 'พยากรณ์ 14 ถึง 90 วัน และสถานการณ์ what-if ที่ปรับแก้ตัวเองเมื่อข้อมูลทยอยเข้ามา',
  },
  ms: {
    eyebrow: 'PERISIKAN RAMALAN',
    statement: 'Masalah esok, terserlah *hari ini*.',
    lede: 'Ramalan 14 hingga 90 hari dan senario what-if yang membetulkan diri sendiri apabila data tiba.',
  },
};
