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
    statement: 'Better information. *Better* decisions. Every shift.',
    lede: 'Not another reporting tool - the layer that tells you what to do next.',
  },
  ar: {
    eyebrow: 'الفرق',
    statement: 'معلومات أفضل. قرارات *أفضل*. في كل وردية.',
    lede: 'ليست أداة تقارير أخرى - بل الطبقة التي تخبرك بما تفعله تاليًا.',
  },
  fr: {
    eyebrow: 'LA DIFFÉRENCE',
    statement: 'De meilleures informations. De *meilleures* décisions. À chaque service.',
    lede: "Pas un énième outil de reporting - la couche qui vous dit quoi faire ensuite.",
  },
  es: {
    eyebrow: 'LA DIFERENCIA',
    statement: 'Mejor información. *Mejores* decisiones. En cada turno.',
    lede: 'No es otra herramienta de reportes - es la capa que te dice qué hacer ahora.',
  },
  de: {
    eyebrow: 'DER UNTERSCHIED',
    statement: 'Bessere Informationen. *Bessere* Entscheidungen. In jeder Schicht.',
    lede: 'Kein weiteres Reporting-Tool - die Schicht, die dir sagt, was als Nächstes zu tun ist.',
  },
  nl: {
    eyebrow: 'HET VERSCHIL',
    statement: 'Betere informatie. *Betere* beslissingen. Elke dienst.',
    lede: 'Geen zoveelste rapportagetool - de laag die je vertelt wat je nu moet doen.',
  },
  pt: {
    eyebrow: 'A DIFERENÇA',
    statement: 'Melhor informação. *Melhores* decisões. Em cada turno.',
    lede: 'Não é mais uma ferramenta de relatórios - é a camada que diz o que fazer a seguir.',
  },
  hi: {
    eyebrow: 'फर्क',
    statement: 'बेहतर जानकारी। *बेहतर* फैसले। हर शिफ्ट।',
    lede: 'एक और रिपोर्टिंग टूल नहीं - वह परत जो बताती है कि आगे क्या करना है।',
  },
  ur: {
    eyebrow: 'فرق',
    statement: 'بہتر معلومات۔ *بہتر* فیصلے۔ ہر شفٹ میں۔',
    lede: 'ایک اور رپورٹنگ ٹول نہیں - بلکہ وہ پرت جو بتاتی ہے کہ آگے کیا کرنا ہے۔',
  },
  it: {
    eyebrow: 'LA DIFFERENZA',
    statement: 'Informazioni migliori. Decisioni *migliori*. A ogni turno.',
    lede: "Non l'ennesimo strumento di reportistica - lo strato che ti dice cosa fare adesso.",
  },
  pl: {
    eyebrow: 'RÓŻNICA',
    statement: 'Lepsze informacje. *Lepsze* decyzje. Na każdej zmianie.',
    lede: 'To nie kolejne narzędzie do raportów - to warstwa, która mówi, co zrobić dalej.',
  },
  tr: {
    eyebrow: 'FARK',
    statement: 'Daha iyi bilgi. *Daha iyi* kararlar. Her vardiyada.',
    lede: 'Bir raporlama aracı daha değil - bir sonraki adımı söyleyen katman.',
  },
  'zh-Hans': {
    eyebrow: '差别所在',
    statement: '更好的信息，*更好*的决策，每一个班次。',
    lede: '不是又一个报表工具，而是告诉你下一步该做什么的那一层。',
  },
  ja: {
    eyebrow: '違い',
    statement: 'より良い情報。*より良い*決断。どのシフトでも。',
    lede: 'ただのレポートツールではなく、次に何をすべきかを示すレイヤーです。',
  },
  ko: {
    eyebrow: '차이',
    statement: '더 나은 정보. *더 나은* 결정. 모든 근무마다.',
    lede: '또 하나의 리포팅 도구가 아니라, 다음에 무엇을 할지 알려주는 레이어입니다.',
  },
  id: {
    eyebrow: 'PERBEDAANNYA',
    statement: 'Informasi lebih baik. Keputusan *lebih baik*. Setiap shift.',
    lede: 'Bukan sekadar alat pelaporan lain - lapisan yang memberi tahu apa langkah berikutnya.',
  },
  vi: {
    eyebrow: 'SỰ KHÁC BIỆT',
    statement: 'Thông tin tốt hơn. Quyết định *tốt hơn*. Mỗi ca làm.',
    lede: 'Không phải thêm một công cụ báo cáo - mà là lớp cho bạn biết phải làm gì tiếp theo.',
  },
  ro: {
    eyebrow: 'DIFERENȚA',
    statement: 'Informații mai bune. Decizii *mai bune*. La fiecare tură.',
    lede: 'Nu încă un instrument de raportare - stratul care îți spune ce să faci în continuare.',
  },
  sv: {
    eyebrow: 'SKILLNADEN',
    statement: 'Bättre information. *Bättre* beslut. Varje skift.',
    lede: 'Inte ännu ett rapportverktyg - lagret som talar om vad du ska göra härnäst.',
  },
  bn: {
    eyebrow: 'পার্থক্য',
    statement: 'ভালো তথ্য। *ভালো* সিদ্ধান্ত। প্রতিটি শিফটে।',
    lede: 'আরেকটি রিপোর্টিং টুল নয় - বরং সেই স্তর যা বলে দেয় এরপর কী করতে হবে।',
  },
  th: {
    eyebrow: 'ความต่าง',
    statement: 'ข้อมูลที่ดีกว่า การตัดสินใจที่*ดีกว่า* ทุกกะการทำงาน',
    lede: 'ไม่ใช่เครื่องมือรายงานอีกตัว - แต่เป็นชั้นที่บอกคุณว่าต้องทำอะไรต่อ',
  },
  ms: {
    eyebrow: 'PERBEZAANNYA',
    statement: 'Maklumat lebih baik. Keputusan *lebih baik*. Setiap syif.',
    lede: 'Bukan sekadar alat pelaporan lain - lapisan yang memberitahu langkah anda seterusnya.',
  },
};
