/**
 * Copy for the warm "cream relief" editorial band on the Why Sundae page.
 *
 * Hand-authored native transcreation per locale - NOT literal word-for-word - so
 * each line reads the way an operator in that market would actually say it. Mirrors
 * the self-contained insightsCreamCopy.ts pattern: a locale-keyed map resolved at
 * render with an English fallback, kept out of the large per-locale i18n.ts trees.
 *
 * EMPHASIS MARKER: every `statement` carries exactly one `*...*` span around the
 * second "better" (the emphasized word in the English source: "Better decisions").
 * The renderer splits on `*` and italicizes the wrapped phrase. Each locale MUST
 * keep exactly one `*...*` pair around the equivalent emphasized phrase.
 *
 * Glossary discipline: the product name "Sundae" stays untranslated everywhere.
 *
 * Punctuation: normal hyphen "-" only - no em dashes, en dashes, ellipsis
 * characters, or zero-width characters. Arabic (ar) and Urdu (ur) are RTL; the
 * copy is written natively and the layout handles direction.
 */

export const whySundaeCreamCopy: Record<string, { eyebrow: string; statement: string; lede: string }> = {
  en: {
    eyebrow: 'THE DIFFERENCE',
    statement: 'Everyone detects. Only Sundae *measures* the recovery back.',
    lede: 'Not another reporting tool - the only loop that routes the fix to an owner and proves the margin came back.',
  },
  ar: {
    eyebrow: 'الفرق',
    statement: 'الجميع يكتشف المشكلة. وحده Sundae *يقيس* ما تمّ استرداده.',
    lede: 'ليست أداة تقارير أخرى - بل الحلقة الوحيدة التي تُسند الإصلاح إلى مسؤول وتُثبت عودة الهامش.',
  },
  fr: {
    eyebrow: 'LA DIFFÉRENCE',
    statement: 'Tout le monde détecte. Seul Sundae *mesure* la marge récupérée.',
    lede: "Pas un énième outil de reporting - la seule boucle qui confie le correctif à un responsable et prouve que la marge est revenue.",
  },
  es: {
    eyebrow: 'LA DIFERENCIA',
    statement: 'Todos detectan. Solo Sundae *mide* la recuperación.',
    lede: 'No es otra herramienta de reportes - es el único circuito que asigna la solución a un responsable y prueba que el margen volvió.',
  },
  de: {
    eyebrow: 'DER UNTERSCHIED',
    statement: 'Alle erkennen. Nur Sundae *misst* die zurückgewonnene Marge.',
    lede: 'Kein weiteres Reporting-Tool - der einzige Kreislauf, der die Lösung einem Verantwortlichen zuweist und beweist, dass die Marge zurück ist.',
  },
  nl: {
    eyebrow: 'HET VERSCHIL',
    statement: 'Iedereen detecteert. Alleen Sundae *meet* de teruggewonnen marge.',
    lede: 'Geen zoveelste rapportagetool - de enige loop die de oplossing aan een eigenaar toewijst en bewijst dat de marge terug is.',
  },
  pt: {
    eyebrow: 'A DIFERENÇA',
    statement: 'Todos detectam. Só o Sundae *mede* a margem recuperada.',
    lede: 'Não é mais uma ferramenta de relatórios - é o único ciclo que atribui a correção a um responsável e prova que a margem voltou.',
  },
  hi: {
    eyebrow: 'फर्क',
    statement: 'हर कोई पता लगाता है। सिर्फ Sundae ही रिकवरी को *मापता* है।',
    lede: 'एक और रिपोर्टिंग टूल नहीं - बल्कि इकलौता लूप जो समाधान को किसी जिम्मेदार को सौंपता है और साबित करता है कि मार्जिन वापस आया।',
  },
  ur: {
    eyebrow: 'فرق',
    statement: 'ہر کوئی پتہ لگاتا ہے۔ صرف Sundae ہی بحالی کو *ناپتا* ہے۔',
    lede: 'ایک اور رپورٹنگ ٹول نہیں - بلکہ واحد لوپ جو حل کو کسی ذمہ دار کے سپرد کرتا ہے اور ثابت کرتا ہے کہ مارجن واپس آیا۔',
  },
  it: {
    eyebrow: 'LA DIFFERENZA',
    statement: 'Tutti rilevano. Solo Sundae *misura* il margine recuperato.',
    lede: "Non l'ennesimo strumento di reportistica - l'unico ciclo che affida la correzione a un responsabile e dimostra che il margine è tornato.",
  },
  pl: {
    eyebrow: 'RÓŻNICA',
    statement: 'Wszyscy wykrywają. Tylko Sundae *mierzy* odzyskaną marżę.',
    lede: 'To nie kolejne narzędzie do raportów - jedyna pętla, która przydziela poprawkę właścicielowi i dowodzi, że marża wróciła.',
  },
  tr: {
    eyebrow: 'FARK',
    statement: 'Herkes tespit eder. Yalnızca Sundae geri kazanılanı *ölçer*.',
    lede: 'Bir raporlama aracı daha değil - düzeltmeyi bir sorumluya atayan ve marjın geri geldiğini kanıtlayan tek döngü.',
  },
  'zh-Hans': {
    eyebrow: '差别所在',
    statement: '人人都能发现问题，唯有 Sundae *衡量*追回的利润。',
    lede: '不是又一个报表工具--而是唯一把修复指派给责任人、并证明利润确实回来的闭环。',
  },
  ja: {
    eyebrow: '違い',
    statement: '検知は誰にでもできる。取り戻した利益を*測る*のは Sundae だけ。',
    lede: 'ただのレポートツールではなく--修正を担当者に割り当て、利益が戻ったことを証明する唯一のループです。',
  },
  ko: {
    eyebrow: '차이',
    statement: '감지는 누구나 한다. 되찾은 마진을 *측정하는* 건 Sundae뿐.',
    lede: '또 하나의 리포팅 도구가 아니라 - 수정 작업을 담당자에게 배정하고 마진이 돌아왔음을 증명하는 유일한 루프입니다.',
  },
  id: {
    eyebrow: 'PERBEDAANNYA',
    statement: 'Semua bisa mendeteksi. Hanya Sundae yang *mengukur* margin yang kembali.',
    lede: 'Bukan sekadar alat pelaporan lain - satu-satunya loop yang menugaskan perbaikan ke penanggung jawab dan membuktikan margin sudah kembali.',
  },
  vi: {
    eyebrow: 'SỰ KHÁC BIỆT',
    statement: 'Ai cũng phát hiện. Chỉ Sundae *đo* phần biên lợi nhuận thu về.',
    lede: 'Không phải thêm một công cụ báo cáo - mà là vòng lặp duy nhất giao việc khắc phục cho người phụ trách và chứng minh biên lợi nhuận đã trở lại.',
  },
  ro: {
    eyebrow: 'DIFERENȚA',
    statement: 'Toți detectează. Doar Sundae *măsoară* marja recuperată.',
    lede: 'Nu încă un instrument de raportare - singura buclă care atribuie corecția unui responsabil și dovedește că marja a revenit.',
  },
  sv: {
    eyebrow: 'SKILLNADEN',
    statement: 'Alla upptäcker. Bara Sundae *mäter* den återvunna marginalen.',
    lede: 'Inte ännu ett rapportverktyg - den enda loop som tilldelar åtgärden till en ansvarig och bevisar att marginalen kom tillbaka.',
  },
  bn: {
    eyebrow: 'পার্থক্য',
    statement: 'সবাই শনাক্ত করে। শুধু Sundae ফিরে আসা মার্জিন *মাপে*।',
    lede: 'আরেকটি রিপোর্টিং টুল নয় - বরং একমাত্র লুপ যা সমাধানের দায়িত্ব একজনকে দেয় এবং প্রমাণ করে মার্জিন ফিরে এসেছে।',
  },
  th: {
    eyebrow: 'ความต่าง',
    statement: 'ใคร ๆ ก็ตรวจจับได้ มีเพียง Sundae ที่*วัด*มาร์จิ้นที่ได้คืนมา',
    lede: 'ไม่ใช่เครื่องมือรายงานอีกตัว - แต่เป็นลูปเดียวที่มอบหมายการแก้ไขให้ผู้รับผิดชอบ และพิสูจน์ว่ามาร์จิ้นกลับคืนมาจริง',
  },
  ms: {
    eyebrow: 'PERBEZAANNYA',
    statement: 'Semua boleh mengesan. Hanya Sundae yang *mengukur* margin yang pulih.',
    lede: 'Bukan sekadar alat pelaporan lain - satu-satunya gelung yang menyerahkan pembetulan kepada penanggung jawab dan membuktikan margin telah kembali.',
  },
};
