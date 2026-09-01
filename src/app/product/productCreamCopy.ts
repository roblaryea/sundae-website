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
    statement: 'The whole operation in *one* closed loop.',
    lede: 'Detect, decide, execute, measure, learn - six layers that do more than report the business; they recover margin and prove it.',
  },
  ar: {
    eyebrow: 'ست طبقات، حقيقة واحدة',
    statement: 'العملية بأكملها في حلقة مغلقة *واحدة.*',
    lede: 'اكتشِف، قرِّر، نفِّذ، قِس، تعلَّم - ست طبقات لا تكتفي بعرض تقارير عن عملك؛ بل تستعيد الهامش وتُثبته.',
  },
  fr: {
    eyebrow: 'SIX COUCHES, UNE VÉRITÉ',
    statement: "Toute l'exploitation dans *une seule* boucle fermée.",
    lede: "Détecter, décider, exécuter, mesurer, apprendre - six couches qui font bien plus que rapporter l'activité ; elles récupèrent la marge et le prouvent.",
  },
  es: {
    eyebrow: 'SEIS CAPAS, UNA VERDAD',
    statement: 'Toda la operación en *un solo* circuito cerrado.',
    lede: 'Detectar, decidir, ejecutar, medir, aprender - seis capas que hacen más que reportar el negocio; recuperan margen y lo demuestran.',
  },
  de: {
    eyebrow: 'SECHS EBENEN, EINE WAHRHEIT',
    statement: 'Der gesamte Betrieb in *einem* geschlossenen Kreislauf.',
    lede: 'Erkennen, entscheiden, umsetzen, messen, lernen - sechs Ebenen, die mehr tun als berichten; sie holen Marge zurück und beweisen es.',
  },
  nl: {
    eyebrow: 'ZES LAGEN, ÉÉN WAARHEID',
    statement: 'De hele operatie in *één* gesloten loop.',
    lede: 'Detecteren, beslissen, uitvoeren, meten, leren - zes lagen die meer doen dan rapporteren; ze winnen marge terug en bewijzen het.',
  },
  pt: {
    eyebrow: 'SEIS CAMADAS, UMA VERDADE',
    statement: 'A operação inteira em *um* ciclo fechado.',
    lede: 'Detectar, decidir, executar, medir, aprender - seis camadas que fazem mais do que relatar o negócio; recuperam margem e provam isso.',
  },
  hi: {
    eyebrow: 'छह परतें, एक सच',
    statement: 'पूरा ऑपरेशन *एक* ही बंद लूप में।',
    lede: 'पता लगाओ, तय करो, अमल करो, मापो, सीखो - छह परतें जो सिर्फ रिपोर्ट नहीं करतीं; वे मार्जिन वापस लाती हैं और साबित करती हैं।',
  },
  ur: {
    eyebrow: 'چھ تہیں، ایک سچ',
    statement: 'پورا آپریشن *ایک* ہی بند لوپ میں۔',
    lede: 'پتہ لگائیں، فیصلہ کریں، عمل کریں، ناپیں، سیکھیں - چھ تہیں جو محض رپورٹ نہیں دیتیں؛ بلکہ مارجن واپس لاتی ہیں اور اسے ثابت کرتی ہیں۔',
  },
  it: {
    eyebrow: 'SEI LIVELLI, UNA VERITÀ',
    statement: "L'intera operatività in *un* unico ciclo chiuso.",
    lede: "Rilevare, decidere, eseguire, misurare, apprendere - sei livelli che fanno più che rendicontare l'attività; recuperano margine e lo dimostrano.",
  },
  pl: {
    eyebrow: 'SZEŚĆ WARSTW, JEDNA PRAWDA',
    statement: 'Cała operacja w *jednej* zamkniętej pętli.',
    lede: 'Wykryj, zdecyduj, wykonaj, zmierz, ucz się - sześć warstw, które robią więcej niż raportowanie; odzyskują marżę i to udowadniają.',
  },
  tr: {
    eyebrow: 'ALTI KATMAN, TEK GERÇEK',
    statement: 'Tüm operasyon *tek* bir kapalı döngüde.',
    lede: 'Tespit et, karar ver, uygula, ölç, öğren - raporlamaktan fazlasını yapan altı katman; marjı geri kazanır ve kanıtlar.',
  },
  'zh-Hans': {
    eyebrow: '六层一体，唯一真相',
    statement: '整个运营，尽在*一个*闭环之中。',
    lede: '发现、决策、执行、衡量、学习--六个层次不止是汇报业务，更把利润追回并加以验证。',
  },
  ja: {
    eyebrow: '六層、ひとつの真実',
    statement: '事業のすべてを、*ひとつ*の閉じたループに。',
    lede: '検知し、判断し、実行し、測定し、学ぶ--事業を報告するだけでなく、利益を取り戻し、それを証明する六つの層。',
  },
  ko: {
    eyebrow: '여섯 계층, 하나의 진실',
    statement: '운영 전체를 *하나의* 닫힌 루프에.',
    lede: '감지, 결정, 실행, 측정, 학습 - 사업을 보고하는 데 그치지 않고 마진을 되찾아 증명하는 여섯 계층.',
  },
  id: {
    eyebrow: 'ENAM LAPISAN, SATU KEBENARAN',
    statement: 'Seluruh operasi dalam *satu* loop tertutup.',
    lede: 'Deteksi, putuskan, jalankan, ukur, pelajari - enam lapisan yang lebih dari sekadar melaporkan bisnis; memulihkan margin dan membuktikannya.',
  },
  vi: {
    eyebrow: 'SÁU LỚP, MỘT SỰ THẬT',
    statement: 'Toàn bộ vận hành trong *một* vòng lặp khép kín.',
    lede: 'Phát hiện, quyết định, thực thi, đo lường, học hỏi - sáu lớp làm được nhiều hơn báo cáo; chúng thu hồi biên lợi nhuận và chứng minh điều đó.',
  },
  ro: {
    eyebrow: 'ȘASE STRATURI, UN ADEVĂR',
    statement: 'Întreaga operațiune într-*o singură* buclă închisă.',
    lede: 'Detectează, decide, execută, măsoară, învață - șase straturi care fac mai mult decât să raporteze; recuperează marja și o dovedesc.',
  },
  sv: {
    eyebrow: 'SEX LAGER, EN SANNING',
    statement: 'Hela verksamheten i *en* sluten loop.',
    lede: 'Upptäck, besluta, genomför, mät, lär - sex lager som gör mer än att rapportera; de vinner tillbaka marginal och bevisar det.',
  },
  bn: {
    eyebrow: 'ছয় স্তর, এক সত্য',
    statement: 'গোটা পরিচালনা *একটিই* বদ্ধ লুপে।',
    lede: 'শনাক্ত করো, সিদ্ধান্ত নাও, কার্যকর করো, মাপো, শেখো - ছয়টি স্তর যা কেবল ব্যবসার রিপোর্ট দেয় না; বরং মার্জিন ফিরিয়ে আনে ও তা প্রমাণ করে।',
  },
  th: {
    eyebrow: 'หกชั้น ความจริงเดียว',
    statement: 'ทั้งการดำเนินงานอยู่ในลูปปิด*เดียว*',
    lede: 'ตรวจจับ ตัดสินใจ ลงมือ วัดผล เรียนรู้ - หกชั้นที่ทำมากกว่าการรายงานธุรกิจ แต่กู้มาร์จิ้นคืนมาและพิสูจน์ได้',
  },
  ms: {
    eyebrow: 'ENAM LAPISAN, SATU KEBENARAN',
    statement: 'Seluruh operasi dalam *satu* gelung tertutup.',
    lede: 'Kesan, putuskan, laksanakan, ukur, pelajari - enam lapisan yang lebih daripada sekadar melaporkan perniagaan; memulihkan margin dan membuktikannya.',
  },
};

/**
 * Second warm band, placed between the third and fourth intelligence layer.
 * The six-pillar run is long enough that a single relief band before it is not
 * enough - the eye needs a breath at the midpoint too.
 */
export const productCreamMidCopy: Record<string, ProductCreamCopy> = {
  en: {
    eyebrow: 'HALFWAY DOWN THE STACK',
    statement: 'Three layers read the shift. Three read the *market* and what comes next.',
    lede: 'Pulse, Benchmarks and Watchtower tell you where you stand right now. Insights, Ask Sundae and Foresight tell you what to do about it.',
  },
  ar: {
    eyebrow: 'في منتصف المنظومة',
    statement: 'ثلاث طبقات تقرأ الوردية. وثلاث تقرأ *السوق* وما هو قادم.',
    lede: 'Pulse وBenchmarks وWatchtower تخبرك أين تقف الآن. وInsights وAsk Sundae وForesight تخبرك بما تفعله حيال ذلك.',
  },
  fr: {
    eyebrow: 'A MI-CHEMIN DE LA PILE',
    statement: 'Trois couches lisent le service. Trois lisent le *marche* et ce qui vient.',
    lede: "Pulse, Benchmarks et Watchtower vous disent ou vous en etes maintenant. Insights, Ask Sundae et Foresight vous disent quoi en faire.",
  },
  es: {
    eyebrow: 'A MITAD DE LA PILA',
    statement: 'Tres capas leen el turno. Tres leen el *mercado* y lo que viene.',
    lede: 'Pulse, Benchmarks y Watchtower te dicen donde estas ahora. Insights, Ask Sundae y Foresight te dicen que hacer al respecto.',
  },
};
