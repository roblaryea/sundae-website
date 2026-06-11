/**
 * Copy for the warm "cream relief" editorial band on the Sundae Report marketing page.
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
 * Glossary discipline: the product name "Sundae Report" stays untranslated in every
 * locale.
 *
 * Punctuation: normal hyphen "-" only - no em dashes, en dashes, ellipsis
 * characters, or zero-width characters. Arabic (ar) and Urdu (ur) are RTL; the
 * copy is written natively and the layout handles direction.
 */

export const sundaeReportCreamCopy: Record<string, { eyebrow: string; statement: string; lede: string }> = {
  en: {
    eyebrow: 'THE FOUNDATION',
    statement: 'Your numbers, finally speaking the *same* language.',
    lede: 'Every location, daypart, and tender - normalized into one honest picture.',
  },
  ar: {
    eyebrow: 'الأساس',
    statement: 'أرقامك، تتحدث أخيراً *اللغة نفسها*.',
    lede: 'كل موقع وفترة ووسيلة دفع - موحّدة في صورة واحدة صادقة.',
  },
  fr: {
    eyebrow: 'LA FONDATION',
    statement: 'Vos chiffres parlent enfin le *meme* langage.',
    lede: 'Chaque site, chaque creneau et chaque mode de paiement - reunis dans une seule image honnete.',
  },
  es: {
    eyebrow: 'LA BASE',
    statement: 'Tus numeros, por fin hablando el *mismo* idioma.',
    lede: 'Cada local, franja y forma de pago - unificados en una sola imagen honesta.',
  },
  de: {
    eyebrow: 'DAS FUNDAMENT',
    statement: 'Ihre Zahlen sprechen endlich *dieselbe* Sprache.',
    lede: 'Jeder Standort, jede Tageszeit und jede Zahlart - vereint in einem ehrlichen Gesamtbild.',
  },
  nl: {
    eyebrow: 'HET FUNDAMENT',
    statement: 'Je cijfers spreken eindelijk *dezelfde* taal.',
    lede: 'Elke locatie, elk dagdeel en elke betaalwijze - samengebracht in een eerlijk beeld.',
  },
  pt: {
    eyebrow: 'A BASE',
    statement: 'Seus numeros, finalmente falando a *mesma* lingua.',
    lede: 'Cada local, periodo e forma de pagamento - reunidos em uma so imagem honesta.',
  },
  hi: {
    eyebrow: 'नींव',
    statement: 'आपके आंकड़े, आखिरकार *एक ही* भाषा बोलते हुए।',
    lede: 'हर लोकेशन, हर समय-खंड और हर पेमेंट - एक ईमानदार तस्वीर में सामान्यीकृत।',
  },
  ur: {
    eyebrow: 'بنیاد',
    statement: 'آپ کے اعداد و شمار، آخرکار *ایک ہی* زبان بولتے ہوئے۔',
    lede: 'ہر مقام، ہر وقت اور ہر ادائیگی - ایک سچی تصویر میں یکجا۔',
  },
  it: {
    eyebrow: 'LE FONDAMENTA',
    statement: 'I tuoi numeri parlano finalmente la *stessa* lingua.',
    lede: 'Ogni sede, fascia oraria e metodo di pagamento - riuniti in un unico quadro onesto.',
  },
  pl: {
    eyebrow: 'FUNDAMENT',
    statement: 'Twoje liczby wreszcie mowia *tym samym* jezykiem.',
    lede: 'Kazda lokalizacja, pora dnia i forma platnosci - zebrane w jeden uczciwy obraz.',
  },
  tr: {
    eyebrow: 'TEMEL',
    statement: 'Rakamlariniz nihayet *ayni* dili konusuyor.',
    lede: 'Her sube, her zaman dilimi ve her odeme turu - tek bir durust tabloda birlesiyor.',
  },
  'zh-Hans': {
    eyebrow: '根基',
    statement: '你的数字，终于说着*同一种*语言。',
    lede: '每个门店、每个时段、每种支付方式--归整为一幅诚实的全景。',
  },
  ja: {
    eyebrow: '土台',
    statement: 'あなたの数字が、ようやく*同じ*言葉で語り出す。',
    lede: 'すべての店舗、時間帯、決済手段を--一枚の正直な全体像へ整えます。',
  },
  ko: {
    eyebrow: '기반',
    statement: '당신의 숫자가 마침내 *같은* 언어로 말합니다.',
    lede: '모든 매장, 시간대, 결제 수단을 - 하나의 정직한 그림으로 정규화합니다.',
  },
  id: {
    eyebrow: 'FONDASI',
    statement: 'Angka Anda, akhirnya berbicara dalam bahasa yang *sama*.',
    lede: 'Setiap lokasi, sesi waktu, dan metode pembayaran - disatukan dalam satu gambaran yang jujur.',
  },
  vi: {
    eyebrow: 'NEN TANG',
    statement: 'Cac con so cua ban, cuoi cung noi cung *mot* ngon ngu.',
    lede: 'Moi dia diem, khung gio va hinh thuc thanh toan - gop thanh mot buc tranh trung thuc.',
  },
  ro: {
    eyebrow: 'FUNDAMENTUL',
    statement: 'Cifrele tale vorbesc in sfarsit *aceeasi* limba.',
    lede: 'Fiecare locatie, interval si metoda de plata - reunite intr-o singura imagine onesta.',
  },
  sv: {
    eyebrow: 'GRUNDEN',
    statement: 'Dina siffror talar antligen *samma* sprak.',
    lede: 'Varje plats, tidpunkt och betalsatt - samlat i en arlig helhetsbild.',
  },
  bn: {
    eyebrow: 'ভিত্তি',
    statement: 'আপনার সংখ্যাগুলো অবশেষে *একই* ভাষায় কথা বলছে।',
    lede: 'প্রতিটি লোকেশন, সময়পর্ব আর পেমেন্ট - এক সৎ ছবিতে একীভূত।',
  },
  th: {
    eyebrow: 'รากฐาน',
    statement: 'ตัวเลขของคุณ พูดภาษา*เดียวกัน*เสียที',
    lede: 'ทุกสาขา ทุกช่วงเวลา และทุกวิธีชำระเงิน - หลอมรวมเป็นภาพเดียวที่ซื่อตรง',
  },
  ms: {
    eyebrow: 'ASAS',
    statement: 'Angka anda, akhirnya bertutur dalam bahasa yang *sama*.',
    lede: 'Setiap lokasi, sesi masa dan kaedah bayaran - disatukan dalam satu gambaran yang jujur.',
  },
};
