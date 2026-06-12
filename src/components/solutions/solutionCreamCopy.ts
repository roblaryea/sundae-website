/**
 * Copy for the warm "cream relief" editorial band shared by every /solutions/*
 * persona page. One CreamBreak placed in SolutionPageLayout (after the hero,
 * before the long dark Problems -> How -> Outcomes card run) gives all 10 pages
 * the same warm breath in the dark scroll (the homepage "volume system").
 *
 * Hand-authored native transcreation per locale - NOT literal word-for-word - so
 * each line reads the way an operator in that market would actually say it. Follows
 * the self-contained creamReliefCopy.ts / insightsCreamCopy.ts pattern: a
 * locale-keyed map resolved at render with an English fallback, kept out of the
 * large per-locale i18n.ts trees.
 *
 * EMPHASIS MARKER: every `statement` carries exactly one `*...*` span around the
 * "not a generic dashboard" idea (the emphasized phrase in the English source).
 * The renderer splits on `*` and italicizes the wrapped phrase. Each locale MUST
 * keep exactly one `*...*` pair around the equivalent emphasized phrase.
 *
 * Glossary discipline: the product name "Sundae" stays untranslated in every
 * locale. "dashboard" is rendered with each market's native word.
 *
 * Punctuation: normal hyphen "-" only - no em dashes, en dashes, ellipsis
 * characters, or zero-width characters. Arabic (ar) and Urdu (ur) are RTL; the
 * copy is written natively and the layout handles direction.
 */

export interface SolutionCreamCopy {
  eyebrow: string;
  /** Big editorial belief. The emphasized phrase is wrapped in `*...*`. */
  statement: string;
  lede: string;
}

export const solutionCreamCopy: Record<string, SolutionCreamCopy> = {
  en: {
    eyebrow: 'BUILT FOR YOUR ROLE',
    statement: 'A decision surface shaped to your role - *not* a generic dashboard.',
    lede: 'Everyone sees the same truth, framed for the calls they actually make.',
  },
  ar: {
    eyebrow: 'مصمم لدورك',
    statement: 'سطح قرار مصمم على مقاس دورك - *لا* لوحة معلومات عامة.',
    lede: 'الجميع يرى الحقيقة نفسها، معروضة بما يناسب القرارات التي يتخذها فعلاً.',
  },
  fr: {
    eyebrow: 'PENSÉ POUR VOTRE RÔLE',
    statement: "Une surface de décision taillée pour votre rôle - *pas* un tableau de bord générique.",
    lede: 'Chacun voit la même vérité, cadrée pour les décisions qu il prend vraiment.',
  },
  es: {
    eyebrow: 'HECHO PARA TU ROL',
    statement: 'Una superficie de decisión a la medida de tu rol - *no* un panel genérico.',
    lede: 'Todos ven la misma verdad, planteada para las decisiones que de verdad toman.',
  },
  de: {
    eyebrow: 'AUF IHRE ROLLE ZUGESCHNITTEN',
    statement: 'Eine Entscheidungsoberfläche, zugeschnitten auf Ihre Rolle - *kein* generisches Dashboard.',
    lede: 'Alle sehen dieselbe Wahrheit, zugeschnitten auf die Entscheidungen, die sie wirklich treffen.',
  },
  nl: {
    eyebrow: 'GEMAAKT VOOR JOUW ROL',
    statement: 'Een beslisoppervlak op maat van jouw rol - *geen* generiek dashboard.',
    lede: 'Iedereen ziet dezelfde waarheid, toegesneden op de keuzes die ze echt maken.',
  },
  pt: {
    eyebrow: 'FEITO PARA O SEU PAPEL',
    statement: 'Uma superfície de decisão moldada ao seu papel - *não* um painel genérico.',
    lede: 'Todos veem a mesma verdade, enquadrada para as decisões que de fato tomam.',
  },
  hi: {
    eyebrow: 'आपकी भूमिका के लिए बना',
    statement: 'आपकी भूमिका के हिसाब से बना एक डिसीज़न सरफेस - कोई आम डैशबोर्ड *नहीं।*',
    lede: 'हर किसी को एक ही सच दिखता है, उन्हीं फैसलों के हिसाब से जो वे सचमुच लेते हैं।',
  },
  ur: {
    eyebrow: 'آپ کے کردار کے لیے بنایا گیا',
    statement: 'آپ کے کردار کے مطابق بنایا گیا فیصلہ سطح - کوئی عام ڈیش بورڈ *نہیں۔*',
    lede: 'سب کو وہی ایک سچ دکھتا ہے، اُنہی فیصلوں کے مطابق جو وہ واقعی کرتے ہیں۔',
  },
  it: {
    eyebrow: 'PENSATO PER IL TUO RUOLO',
    statement: 'Una superficie decisionale su misura per il tuo ruolo - *non* una dashboard generica.',
    lede: 'Tutti vedono la stessa verità, calibrata sulle decisioni che prendono davvero.',
  },
  pl: {
    eyebrow: 'STWORZONE DLA TWOJEJ ROLI',
    statement: 'Powierzchnia decyzyjna skrojona pod twoją rolę - *nie* ogólny pulpit.',
    lede: 'Każdy widzi tę samą prawdę, ujętą pod decyzje, które naprawdę podejmuje.',
  },
  tr: {
    eyebrow: 'ROLÜNÜZE GÖRE TASARLANDI',
    statement: 'Rolünüze göre biçimlenmiş bir karar yüzeyi - genel bir gösterge paneli *değil.*',
    lede: 'Herkes aynı gerçeği görür, gerçekten verdikleri kararlara göre çerçevelenmiş olarak.',
  },
  'zh-Hans': {
    eyebrow: '为你的岗位而建',
    statement: '一个为你的岗位量身打造的决策界面--*而非*千篇一律的仪表盘。',
    lede: '人人看到同一份事实，只是按各自真正要做的决定来呈现。',
  },
  ja: {
    eyebrow: 'あなたの役割のために',
    statement: 'あなたの役割に合わせた意思決定の画面--ありきたりのダッシュボードでは*ない。*',
    lede: '全員が同じ事実を見る。ただし、その人が実際に下す判断に合わせて。',
  },
  ko: {
    eyebrow: '당신의 역할에 맞춰',
    statement: '당신의 역할에 맞춰진 의사결정 화면 - 흔한 대시보드가 *아닙니다.*',
    lede: '모두가 같은 진실을 봅니다. 다만 각자가 실제로 내리는 결정에 맞춰서.',
  },
  id: {
    eyebrow: 'DIBUAT UNTUK PERAN ANDA',
    statement: 'Permukaan keputusan yang dibentuk untuk peran Anda - *bukan* dasbor generik.',
    lede: 'Semua melihat kebenaran yang sama, dibingkai untuk keputusan yang benar-benar mereka ambil.',
  },
  vi: {
    eyebrow: 'XÂY CHO ĐÚNG VAI TRÒ CỦA BẠN',
    statement: 'Một mặt phẳng quyết định được tạo riêng cho vai trò của bạn - *không* phải một bảng số liệu chung chung.',
    lede: 'Mọi người thấy cùng một sự thật, được trình bày cho đúng những quyết định họ thực sự đưa ra.',
  },
  ro: {
    eyebrow: 'CONSTRUIT PENTRU ROLUL TĂU',
    statement: 'O suprafață de decizie croită pe rolul tău - *nu* un panou generic.',
    lede: 'Toți văd același adevăr, încadrat pentru deciziile pe care chiar le iau.',
  },
  sv: {
    eyebrow: 'BYGGD FÖR DIN ROLL',
    statement: 'En beslutsyta formad efter din roll - *inte* en generisk instrumentpanel.',
    lede: 'Alla ser samma sanning, formad efter de beslut de faktiskt fattar.',
  },
  bn: {
    eyebrow: 'আপনার ভূমিকার জন্য তৈরি',
    statement: 'আপনার ভূমিকার মাপে গড়া একটি সিদ্ধান্ত-পৃষ্ঠ - কোনো গতানুগতিক ড্যাশবোর্ড *নয়।*',
    lede: 'সবাই একই সত্য দেখে, শুধু সেই সিদ্ধান্তগুলোর মাপে যা তারা সত্যিই নেয়।',
  },
  th: {
    eyebrow: 'สร้างมาเพื่อบทบาทของคุณ',
    statement: 'พื้นผิวการตัดสินใจที่ปั้นมาเพื่อบทบาทของคุณ - *ไม่ใช่* แดชบอร์ดสำเร็จรูปทั่วไป',
    lede: 'ทุกคนเห็นความจริงเดียวกัน เพียงแต่จัดวางให้ตรงกับการตัดสินใจที่เขาต้องทำจริง',
  },
  ms: {
    eyebrow: 'DIBINA UNTUK PERANAN ANDA',
    statement: 'Satu permukaan keputusan yang dibentuk untuk peranan anda - *bukan* papan pemuka generik.',
    lede: 'Semua melihat kebenaran yang sama, dirangka untuk keputusan yang benar-benar mereka buat.',
  },
};
