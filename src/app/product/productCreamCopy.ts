/**
 * Copy for the warm "cream relief" editorial band on the Product platform page.
 * One CreamBreak placed after the Report/Core tier cards and before the long dark
 * "Six Intelligence Layers" pillar run gives the page a warm breath in the dark
 * scroll (the homepage "volume system").
 *
 * Hand-authored native transcreation per locale - NOT literal word-for-word - so
 * each line reads the way an operator in that market would actually say it. Follows
 * the self-contained creamReliefCopy.ts / insightsCreamCopy.ts pattern: a
 * locale-keyed map resolved at render with an English fallback, kept out of the
 * large per-locale i18n.ts trees.
 *
 * EMPHASIS MARKER: every `statement` carries exactly one `*...*` span around "one"
 * (the emphasized word in the English source). The renderer splits on `*` and
 * italicizes the wrapped phrase. Each locale MUST keep exactly one `*...*` pair
 * around the equivalent emphasized phrase.
 *
 * Glossary discipline: the product names "Sundae", "Core", "AI" stay untranslated
 * in every locale.
 *
 * Punctuation: normal hyphen "-" only - no em dashes, en dashes, ellipsis
 * characters, or zero-width characters. Arabic (ar) and Urdu (ur) are RTL; the
 * copy is written natively and the layout handles direction.
 */

export interface ProductCreamCopy {
  eyebrow: string;
  /** Big editorial belief. The emphasized phrase is wrapped in `*...*`. */
  statement: string;
  lede: string;
}

export const productCreamCopy: Record<string, ProductCreamCopy> = {
  en: {
    eyebrow: 'SIX LAYERS, ONE TRUTH',
    statement: 'The whole operation in *one* decision surface.',
    lede: 'Real-time ops, benchmarks, market signals, deep analytics, AI, and forecasting - one stack that talks to itself.',
  },
  ar: {
    eyebrow: 'ست طبقات، حقيقة واحدة',
    statement: 'العملية بأكملها في سطح قرار *واحد.*',
    lede: 'عمليات لحظية، ومقارنات مرجعية، وإشارات سوق، وتحليلات عميقة، وذكاء اصطناعي، وتنبؤات - منظومة واحدة تتحدث مع نفسها.',
  },
  fr: {
    eyebrow: 'SIX COUCHES, UNE VÉRITÉ',
    statement: "Toute l'exploitation sur *une seule* surface de décision.",
    lede: "Opérations en temps réel, benchmarks, signaux de marché, analytique poussée, IA et prévisions - une seule pile qui se parle à elle-même.",
  },
  es: {
    eyebrow: 'SEIS CAPAS, UNA VERDAD',
    statement: 'Toda la operación en *una sola* superficie de decisión.',
    lede: 'Operaciones en tiempo real, benchmarks, señales de mercado, analítica profunda, IA y previsiones - un solo stack que se habla a sí mismo.',
  },
  de: {
    eyebrow: 'SECHS EBENEN, EINE WAHRHEIT',
    statement: 'Der gesamte Betrieb auf *einer* Entscheidungsoberfläche.',
    lede: 'Echtzeit-Betrieb, Benchmarks, Marktsignale, tiefe Analytik, AI und Prognosen - ein Stack, der mit sich selbst spricht.',
  },
  nl: {
    eyebrow: 'ZES LAGEN, ÉÉN WAARHEID',
    statement: 'De hele operatie op *één* beslisoppervlak.',
    lede: 'Realtime operatie, benchmarks, marktsignalen, diepe analyses, AI en forecasting - één stack die met zichzelf praat.',
  },
  pt: {
    eyebrow: 'SEIS CAMADAS, UMA VERDADE',
    statement: 'A operação inteira em *uma* superfície de decisão.',
    lede: 'Operações em tempo real, benchmarks, sinais de mercado, analytics profundo, IA e previsões - um único stack que conversa consigo mesmo.',
  },
  hi: {
    eyebrow: 'छह परतें, एक सच',
    statement: 'पूरा ऑपरेशन *एक* ही डिसीज़न सरफेस पर।',
    lede: 'रियल-टाइम ऑपरेशन, बेंचमार्क, मार्केट सिग्नल, गहरा एनालिटिक्स, AI और फोरकास्टिंग - एक ही स्टैक जो आपस में बात करता है।',
  },
  ur: {
    eyebrow: 'چھ تہیں، ایک سچ',
    statement: 'پورا آپریشن *ایک* ہی فیصلہ سطح پر۔',
    lede: 'ریئل ٹائم آپریشنز، بینچ مارک، مارکیٹ سگنل، گہرا اینالٹکس، AI اور فورکاسٹنگ - ایک ہی اسٹیک جو آپس میں بات کرتا ہے۔',
  },
  it: {
    eyebrow: 'SEI LIVELLI, UNA VERITÀ',
    statement: "L'intera operatività su *una* superficie decisionale.",
    lede: 'Operatività in tempo reale, benchmark, segnali di mercato, analisi approfondite, AI e previsioni - un unico stack che dialoga con se stesso.',
  },
  pl: {
    eyebrow: 'SZEŚĆ WARSTW, JEDNA PRAWDA',
    statement: 'Cała operacja na *jednej* powierzchni decyzyjnej.',
    lede: 'Operacje w czasie rzeczywistym, benchmarki, sygnały rynkowe, głęboka analityka, AI i prognozy - jeden stack, który rozmawia sam ze sobą.',
  },
  tr: {
    eyebrow: 'ALTI KATMAN, TEK GERÇEK',
    statement: 'Tüm operasyon *tek* bir karar yüzeyinde.',
    lede: 'Gerçek zamanlı operasyon, kıyaslamalar, pazar sinyalleri, derin analitik, AI ve tahminleme - kendi içinde konuşan tek bir yığın.',
  },
  'zh-Hans': {
    eyebrow: '六层一体，唯一真相',
    statement: '整个运营，尽在*一个*决策界面。',
    lede: '实时运营、对标、市场信号、深度分析、AI 与预测--一个彼此对话的技术栈。',
  },
  ja: {
    eyebrow: '六層、ひとつの真実',
    statement: '事業のすべてを、*ひとつ*の意思決定画面に。',
    lede: 'リアルタイム運用、ベンチマーク、市場シグナル、深い分析、AI、予測--互いに対話するひとつのスタック。',
  },
  ko: {
    eyebrow: '여섯 계층, 하나의 진실',
    statement: '운영 전체를 *하나의* 의사결정 화면에.',
    lede: '실시간 운영, 벤치마크, 시장 신호, 심층 분석, AI, 예측 - 서로 대화하는 하나의 스택.',
  },
  id: {
    eyebrow: 'ENAM LAPISAN, SATU KEBENARAN',
    statement: 'Seluruh operasi dalam *satu* permukaan keputusan.',
    lede: 'Operasi real-time, benchmark, sinyal pasar, analitik mendalam, AI, dan peramalan - satu tumpukan yang saling berbicara.',
  },
  vi: {
    eyebrow: 'SÁU LỚP, MỘT SỰ THẬT',
    statement: 'Toàn bộ vận hành trên *một* mặt phẳng quyết định.',
    lede: 'Vận hành thời gian thực, đối chuẩn, tín hiệu thị trường, phân tích chuyên sâu, AI và dự báo - một ngăn xếp tự trò chuyện với chính nó.',
  },
  ro: {
    eyebrow: 'ȘASE STRATURI, UN ADEVĂR',
    statement: 'Întreaga operațiune pe *o singură* suprafață de decizie.',
    lede: 'Operațiuni în timp real, benchmarkuri, semnale de piață, analitică profundă, AI și prognoză - un singur stack care vorbește cu sine.',
  },
  sv: {
    eyebrow: 'SEX LAGER, EN SANNING',
    statement: 'Hela verksamheten på *en* beslutsyta.',
    lede: 'Drift i realtid, benchmarks, marknadssignaler, djup analys, AI och prognoser - en stack som pratar med sig själv.',
  },
  bn: {
    eyebrow: 'ছয় স্তর, এক সত্য',
    statement: 'গোটা পরিচালনা *একটিই* সিদ্ধান্ত-পৃষ্ঠে।',
    lede: 'রিয়েল-টাইম অপারেশন, বেঞ্চমার্ক, বাজার সংকেত, গভীর অ্যানালিটিক্স, AI এবং পূর্বাভাস - একটিই স্ট্যাক যা নিজের সঙ্গে কথা বলে।',
  },
  th: {
    eyebrow: 'หกชั้น ความจริงเดียว',
    statement: 'ทั้งการดำเนินงานอยู่บนพื้นผิวการตัดสินใจ*เดียว*',
    lede: 'การดำเนินงานเรียลไทม์ การเทียบเกณฑ์ สัญญาณตลาด การวิเคราะห์เชิงลึก AI และการพยากรณ์ - สแตกเดียวที่คุยกันเองได้',
  },
  ms: {
    eyebrow: 'ENAM LAPISAN, SATU KEBENARAN',
    statement: 'Seluruh operasi dalam *satu* permukaan keputusan.',
    lede: 'Operasi masa nyata, penanda aras, isyarat pasaran, analitik mendalam, AI, dan ramalan - satu tindanan yang berbual sesama sendiri.',
  },
};
