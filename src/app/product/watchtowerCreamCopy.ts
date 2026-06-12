/**
 * Copy for the warm "cream relief" editorial band on the Watchtower marketing page.
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
 * Glossary discipline: the product names "Watchtower" and "Foresight" stay
 * untranslated in every locale.
 *
 * Punctuation: normal hyphen "-" only - no em dashes, en dashes, ellipsis
 * characters, or zero-width characters. Arabic (ar) and Urdu (ur) are RTL; the
 * copy is written natively and the layout handles direction.
 */

export const watchtowerCreamCopy: Record<string, { eyebrow: string; statement: string; lede: string }> = {
  en: {
    eyebrow: 'MARKET INTELLIGENCE',
    statement: 'The market moves first. *You* move sooner.',
    lede: 'Competitors, weather, and events - tracked before they hit your numbers.',
  },
  ar: {
    eyebrow: 'ذكاء السوق',
    statement: 'السوق يتحرك أولاً. *أنت* تتحرك قبله.',
    lede: 'المنافسون والطقس والفعاليات - تُرصد قبل أن تصل إلى أرقامك.',
  },
  fr: {
    eyebrow: 'INTELLIGENCE DE MARCHE',
    statement: 'Le marche bouge en premier. *Vous*, plus tot.',
    lede: 'Concurrents, meteo et evenements - suivis avant qu ils ne touchent vos chiffres.',
  },
  es: {
    eyebrow: 'INTELIGENCIA DE MERCADO',
    statement: 'El mercado se mueve primero. *Tu*, antes.',
    lede: 'Competidores, clima y eventos - detectados antes de que lleguen a tus numeros.',
  },
  de: {
    eyebrow: 'MARKTINTELLIGENZ',
    statement: 'Der Markt zieht zuerst. *Sie* ziehen frueher.',
    lede: 'Wettbewerber, Wetter und Events - erfasst, bevor sie Ihre Zahlen treffen.',
  },
  nl: {
    eyebrow: 'MARKTINTELLIGENTIE',
    statement: 'De markt beweegt eerst. *U* beweegt eerder.',
    lede: 'Concurrenten, weer en evenementen - in beeld voordat ze je cijfers raken.',
  },
  pt: {
    eyebrow: 'INTELIGENCIA DE MERCADO',
    statement: 'O mercado se move primeiro. *Voce*, antes.',
    lede: 'Concorrentes, clima e eventos - monitorados antes de chegarem aos seus numeros.',
  },
  hi: {
    eyebrow: 'मार्केट इंटेलिजेंस',
    statement: 'बाज़ार पहले चलता है। *आप* उससे पहले चलें।',
    lede: 'प्रतिस्पर्धी, मौसम और इवेंट - आपके आंकड़ों तक पहुंचने से पहले ही ट्रैक।',
  },
  ur: {
    eyebrow: 'مارکیٹ انٹیلیجنس',
    statement: 'مارکیٹ پہلے حرکت کرتی ہے۔ *آپ* اُس سے پہلے حرکت کریں۔',
    lede: 'حریف، موسم اور ایونٹس - آپ کے اعداد و شمار تک پہنچنے سے پہلے ہی نظر میں۔',
  },
  it: {
    eyebrow: 'INTELLIGENCE DI MERCATO',
    statement: 'Il mercato si muove per primo. *Tu*, prima.',
    lede: 'Concorrenti, meteo ed eventi - intercettati prima che tocchino i tuoi numeri.',
  },
  pl: {
    eyebrow: 'ANALIZA RYNKU',
    statement: 'Rynek rusza pierwszy. *Ty* ruszasz wczesniej.',
    lede: 'Konkurenci, pogoda i wydarzenia - wychwytywane, zanim dotkna twoich wynikow.',
  },
  tr: {
    eyebrow: 'PAZAR ZEKASI',
    statement: 'Pazar once hareket eder. *Sen* daha erken.',
    lede: 'Rakipler, hava durumu ve etkinlikler - sayilariniza ulasmadan once izlenir.',
  },
  'zh-Hans': {
    eyebrow: '市场情报',
    statement: '市场先动一步。*你*，更早一步。',
    lede: '竞争对手、天气与活动--在影响你的数字之前就已掌握。',
  },
  ja: {
    eyebrow: 'マーケットインテリジェンス',
    statement: '市場は先に動く。*あなた*は、その前に動く。',
    lede: '競合、天候、イベント--数字に響く前に、すべて捉える。',
  },
  ko: {
    eyebrow: '마켓 인텔리전스',
    statement: '시장이 먼저 움직입니다. *당신*은 더 먼저 움직입니다.',
    lede: '경쟁사, 날씨, 이벤트 - 매출에 닿기 전에 미리 포착합니다.',
  },
  id: {
    eyebrow: 'INTELIJEN PASAR',
    statement: 'Pasar bergerak lebih dulu. *Anda* bergerak lebih awal.',
    lede: 'Kompetitor, cuaca, dan acara - terpantau sebelum menyentuh angka Anda.',
  },
  vi: {
    eyebrow: 'TRI TUE THI TRUONG',
    statement: 'Thi truong di truoc. *Ban* di som hon.',
    lede: 'Doi thu, thoi tiet va su kien - duoc theo doi truoc khi cham den con so cua ban.',
  },
  ro: {
    eyebrow: 'INTELIGENTA DE PIATA',
    statement: 'Piata se misca prima. *Tu* te misti mai devreme.',
    lede: 'Concurenti, vreme si evenimente - urmarite inainte sa iti atinga cifrele.',
  },
  sv: {
    eyebrow: 'MARKNADSINTELLIGENS',
    statement: 'Marknaden ror sig forst. *Du* ror dig tidigare.',
    lede: 'Konkurrenter, vader och evenemang - bevakade innan de traffar dina siffror.',
  },
  bn: {
    eyebrow: 'মার্কেট ইন্টেলিজেন্স',
    statement: 'বাজার আগে নড়ে। *আপনি* নড়ুন তারও আগে।',
    lede: 'প্রতিযোগী, আবহাওয়া আর ইভেন্ট - আপনার সংখ্যায় পৌঁছানোর আগেই নজরে।',
  },
  th: {
    eyebrow: 'อินเทลลิเจนซ์ตลาด',
    statement: 'ตลาดขยับก่อน *คุณ* ขยับก่อนหน้านั้น',
    lede: 'คู่แข่ง สภาพอากาศ และอีเวนต์ - ติดตามก่อนกระทบตัวเลขของคุณ',
  },
  ms: {
    eyebrow: 'PERISIKAN PASARAN',
    statement: 'Pasaran bergerak dahulu. *Anda* bergerak lebih awal.',
    lede: 'Pesaing, cuaca dan acara - dipantau sebelum menyentuh angka anda.',
  },
};
