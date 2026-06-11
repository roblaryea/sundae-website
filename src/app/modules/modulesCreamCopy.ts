/**
 * Copy for the warm "cream relief" editorial band on the Modules marketing page.
 *
 * Hand-authored native transcreation per locale - NOT literal word-for-word - so
 * each line reads the way an operator in that market would actually say it. Mirrors
 * the self-contained insightsCreamCopy.ts pattern: a locale-keyed map resolved at
 * render with an English fallback, kept out of the large per-locale i18n.ts trees.
 *
 * EMPHASIS MARKER: every `statement` carries exactly one `*...*` span. The renderer
 * splits on `*` and italicizes the wrapped phrase. Each locale MUST keep exactly
 * one `*...*` pair around the equivalent emphasized phrase.
 *
 * Glossary discipline: the product name "Core" stays untranslated in every locale.
 * "Twelve" is rendered as the correct number word (or numeral where idiomatic).
 *
 * Punctuation: normal hyphen "-" only - no em dashes, en dashes, ellipsis
 * characters, or zero-width characters. Arabic (ar) and Urdu (ur) are RTL; the
 * copy is written natively and the layout handles direction.
 */

export interface ModulesCreamCopy {
  eyebrow: string;
  /** Big editorial belief. The emphasized phrase is wrapped in `*...*`. */
  statement: string;
  lede: string;
}

export const modulesCreamCopy: Record<string, ModulesCreamCopy> = {
  en: {
    eyebrow: 'BUILD YOUR STACK',
    statement: 'Add what you need, *when* you need it.',
    lede: 'Twelve analytics modules on your Core subscription - scale as you grow.',
  },
  ar: {
    eyebrow: 'ابنِ حزمتك',
    statement: 'أضف ما تحتاجه، *حين* تحتاجه.',
    lede: 'اثنتا عشرة وحدة تحليلية ضمن اشتراك Core - توسّع مع نموك.',
  },
  fr: {
    eyebrow: 'COMPOSEZ VOTRE STACK',
    statement: 'Ajoutez ce qu\'il vous faut, *quand* il vous le faut.',
    lede: 'Douze modules analytiques inclus dans votre abonnement Core - evoluez a votre rythme.',
  },
  es: {
    eyebrow: 'ARMA TU STACK',
    statement: 'Anade lo que necesitas, *cuando* lo necesitas.',
    lede: 'Doce modulos de analitica en tu suscripcion Core - escala a tu ritmo.',
  },
  de: {
    eyebrow: 'BAUEN SIE IHREN STACK',
    statement: 'Fugen Sie hinzu, was Sie brauchen - *wann* Sie es brauchen.',
    lede: 'Zwolf Analytik-Module in Ihrem Core-Abo - skalieren Sie mit dem Wachstum.',
  },
  nl: {
    eyebrow: 'BOUW JE STACK',
    statement: 'Voeg toe wat je nodig hebt, *wanneer* je het nodig hebt.',
    lede: 'Twaalf analytics-modules op je Core-abonnement - schaal mee terwijl je groeit.',
  },
  pt: {
    eyebrow: 'MONTE SEU STACK',
    statement: 'Adicione o que precisa, *quando* precisar.',
    lede: 'Doze modulos de analise na sua assinatura Core - escale conforme cresce.',
  },
  hi: {
    eyebrow: 'अपना स्टैक बनाइए',
    statement: 'जो चाहिए वो जोड़िए, *जब* चाहिए.',
    lede: 'आपके Core सब्सक्रिप्शन पर बारह एनालिटिक्स मॉड्यूल - बढ़ते जाइए, स्केल करते जाइए.',
  },
  ur: {
    eyebrow: 'اپنا اسٹیک بنائیں',
    statement: 'جو چاہیے وہ شامل کریں، *جب* چاہیے.',
    lede: 'آپ کے Core سبسکرپشن پر بارہ اینالیٹکس ماڈیولز - جیسے جیسے بڑھیں، اسکیل کریں.',
  },
  it: {
    eyebrow: 'COMPONI IL TUO STACK',
    statement: 'Aggiungi cio che ti serve, *quando* ti serve.',
    lede: 'Dodici moduli di analisi nel tuo abbonamento Core - cresci al tuo ritmo.',
  },
  pl: {
    eyebrow: 'ZBUDUJ SWOJ STACK',
    statement: 'Dodawaj to, czego potrzebujesz, *wtedy* gdy potrzebujesz.',
    lede: 'Dwanascie modulow analitycznych w abonamencie Core - skaluj w miare wzrostu.',
  },
  tr: {
    eyebrow: 'KENDI YIGININI KUR',
    statement: 'Neye ihtiyacin varsa, *ihtiyac duydugunda* ekle.',
    lede: 'Core aboneliginde on iki analitik modul - buyudukce olcekle.',
  },
  'zh-Hans': {
    eyebrow: '搭建你的组合',
    statement: '需要什么就加什么，*在你需要的时候*。',
    lede: '十二个分析模块，尽在 Core 订阅之中--随业务成长而扩展。',
  },
  ja: {
    eyebrow: 'スタックを組み上げる',
    statement: '必要なものを、*必要なときに*加える。',
    lede: 'Core 契約に12の分析モジュール--成長に合わせて広げていく。',
  },
  ko: {
    eyebrow: '나만의 스택 구성',
    statement: '필요한 것을, *필요할 때* 더하세요.',
    lede: 'Core 구독에 포함된 열두 개의 분석 모듈 - 성장에 맞춰 확장하세요.',
  },
  id: {
    eyebrow: 'SUSUN STACK ANDA',
    statement: 'Tambahkan yang Anda perlukan, *saat* diperlukan.',
    lede: 'Dua belas modul analitik di langganan Core - berkembang seiring pertumbuhan.',
  },
  vi: {
    eyebrow: 'XAY DUNG BO CONG CU',
    statement: 'Them thu ban can, *khi* ban can.',
    lede: 'Muoi hai module phan tich trong goi Core - mo rong khi ban lon manh.',
  },
  ro: {
    eyebrow: 'CONSTRUIESTE-TI STIVA',
    statement: 'Adauga ce ai nevoie, *atunci* cand ai nevoie.',
    lede: 'Douasprezece module de analiza in abonamentul Core - scaleaza pe masura ce cresti.',
  },
  sv: {
    eyebrow: 'BYGG DIN STACK',
    statement: 'Lagg till det du behover, *nar* du behover det.',
    lede: 'Tolv analysmoduler i din Core-prenumeration - skala i takt med att du vaxer.',
  },
  bn: {
    eyebrow: 'নিজের স্ট্যাক গড়ুন',
    statement: 'যা দরকার তা যোগ করুন, *যখন* দরকার.',
    lede: 'আপনার Core সাবস্ক্রিপশনে বারোটি অ্যানালিটিক্স মডিউল - বেড়ে ওঠার সাথে স্কেল করুন.',
  },
  th: {
    eyebrow: 'สร้างชุดเครื่องมือของคุณ',
    statement: 'เพิ่มสิ่งที่ต้องการ *เมื่อ*ต้องการ',
    lede: 'สิบสองโมดูลวิเคราะห์ในแพ็กเกจ Core - ขยายไปพร้อมการเติบโตของคุณ',
  },
  ms: {
    eyebrow: 'BINA STACK ANDA',
    statement: 'Tambah apa yang anda perlukan, *bila* anda memerlukannya.',
    lede: 'Dua belas modul analitik dalam langganan Core anda - skala seiring pertumbuhan.',
  },
};
