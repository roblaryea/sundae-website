/**
 * Copy for the warm "cream relief" editorial band on the Pricing page.
 *
 * Hand-authored native transcreation per locale - NOT literal word-for-word - so
 * each line reads the way an operator in that market would actually say it. Mirrors
 * the self-contained insightsCreamCopy.ts pattern: a locale-keyed map resolved at
 * render with an English fallback, kept out of the large per-locale i18n.ts trees.
 *
 * EMPHASIS MARKER: every `statement` carries exactly one `*...*` span around the
 * "scale" verb (the emphasized word in the English source). The renderer splits on
 * `*` and italicizes the wrapped phrase. Each locale MUST keep exactly one `*...*`
 * pair around the equivalent emphasized phrase.
 *
 * Glossary discipline: the product names "Core" and "Sundae" stay untranslated.
 *
 * Punctuation: normal hyphen "-" only - no em dashes, en dashes, ellipsis
 * characters, or zero-width characters. Arabic (ar) and Urdu (ur) are RTL; the
 * copy is written natively and the layout handles direction.
 */

export const pricingCreamCopy: Record<string, { eyebrow: string; statement: string; lede: string }> = {
  en: {
    eyebrow: 'START WHERE IT MATTERS',
    statement: 'Start with what matters. *Scale* when you are ready.',
    lede: 'Add the modules your operation needs. Every module available on Core tiers.',
  },
  ar: {
    eyebrow: 'ابدأ من حيث يهم',
    statement: 'ابدأ بما يهم. *وتوسّع* حين تكون مستعدًا.',
    lede: 'أضف الوحدات التي تحتاجها عملياتك. كل الوحدات متاحة ضمن خطط Core.',
  },
  fr: {
    eyebrow: 'COMMENCEZ LÀ OÙ ÇA COMPTE',
    statement: "Commencez par l'essentiel. *Évoluez* quand vous êtes prêt.",
    lede: 'Ajoutez les modules dont votre activité a besoin. Tous disponibles sur les offres Core.',
  },
  es: {
    eyebrow: 'EMPIEZA POR LO QUE IMPORTA',
    statement: 'Empieza por lo que importa. *Escala* cuando estés listo.',
    lede: 'Añade los módulos que tu operación necesita. Todos disponibles en los planes Core.',
  },
  de: {
    eyebrow: 'STARTEN, WO ES ZÄHLT',
    statement: 'Mit dem Wesentlichen starten. *Skalieren*, wenn du bereit bist.',
    lede: 'Ergänze die Module, die dein Betrieb braucht. Alle verfügbar in den Core-Tarifen.',
  },
  nl: {
    eyebrow: 'BEGIN WAAR HET ERTOE DOET',
    statement: 'Begin met wat telt. *Schaal op* wanneer je er klaar voor bent.',
    lede: 'Voeg de modules toe die je operatie nodig heeft. Allemaal beschikbaar op de Core-pakketten.',
  },
  pt: {
    eyebrow: 'COMECE PELO QUE IMPORTA',
    statement: 'Comece pelo que importa. *Escale* quando estiver pronto.',
    lede: 'Adicione os módulos que sua operação precisa. Todos disponíveis nos planos Core.',
  },
  hi: {
    eyebrow: 'वहीं से शुरू करें जो मायने रखता है',
    statement: 'जो मायने रखता है, वहीं से शुरू करें। तैयार होने पर *विस्तार* करें।',
    lede: 'अपने ऑपरेशन के लिए ज़रूरी मॉड्यूल जोड़ें। हर मॉड्यूल Core प्लान पर उपलब्ध है।',
  },
  ur: {
    eyebrow: 'وہیں سے شروع کریں جو اہم ہے',
    statement: 'جو اہم ہے وہیں سے شروع کریں۔ تیار ہونے پر *وسعت* دیں۔',
    lede: 'اپنے آپریشن کے لیے ضروری ماڈیولز شامل کریں۔ ہر ماڈیول Core پلانز پر دستیاب ہے۔',
  },
  it: {
    eyebrow: "INIZIA DA CIÒ CHE CONTA",
    statement: "Inizia da ciò che conta. *Cresci* quando sei pronto.",
    lede: "Aggiungi i moduli di cui la tua attività ha bisogno. Tutti disponibili sui piani Core.",
  },
  pl: {
    eyebrow: 'ZACZNIJ TAM, GDZIE TO WAŻNE',
    statement: 'Zacznij od tego, co ważne. *Skaluj*, gdy będziesz gotów.',
    lede: 'Dodaj moduły, których potrzebuje Twoja operacja. Wszystkie dostępne w planach Core.',
  },
  tr: {
    eyebrow: 'ÖNEMLİ OLANDAN BAŞLAYIN',
    statement: 'Önemli olandan başlayın. Hazır olduğunuzda *büyüyün*.',
    lede: 'Operasyonunuzun ihtiyaç duyduğu modülleri ekleyin. Hepsi Core paketlerinde mevcut.',
  },
  'zh-Hans': {
    eyebrow: '从要紧处开始',
    statement: '从要紧处开始，时机成熟再*扩展*。',
    lede: '按运营所需添加模块。每个模块都可在 Core 套餐中启用。',
  },
  ja: {
    eyebrow: '大切なところから始める',
    statement: '大切なことから始め、準備ができたら*広げる*。',
    lede: '運営に必要なモジュールを追加。すべて Core プランで利用できます。',
  },
  ko: {
    eyebrow: '중요한 것부터 시작하세요',
    statement: '중요한 것부터 시작하고, 준비되면 *확장*하세요.',
    lede: '운영에 필요한 모듈을 더하세요. 모든 모듈은 Core 요금제에서 사용할 수 있습니다.',
  },
  id: {
    eyebrow: 'MULAI DARI YANG PENTING',
    statement: 'Mulai dari yang penting. *Skalakan* saat Anda siap.',
    lede: 'Tambahkan modul yang dibutuhkan operasi Anda. Semua tersedia di paket Core.',
  },
  vi: {
    eyebrow: 'BẮT ĐẦU TỪ ĐIỀU QUAN TRỌNG',
    statement: 'Bắt đầu từ điều quan trọng. *Mở rộng* khi bạn sẵn sàng.',
    lede: 'Thêm những module mà hoạt động của bạn cần. Tất cả đều có trên các gói Core.',
  },
  ro: {
    eyebrow: 'ÎNCEPE DE UNDE CONTEAZĂ',
    statement: 'Începe cu ce contează. *Scalează* când ești pregătit.',
    lede: 'Adaugă modulele de care are nevoie operațiunea ta. Toate disponibile pe planurile Core.',
  },
  sv: {
    eyebrow: 'BÖRJA DÄR DET SPELAR ROLL',
    statement: 'Börja med det som spelar roll. *Skala* när du är redo.',
    lede: 'Lägg till modulerna din verksamhet behöver. Alla finns i Core-paketen.',
  },
  bn: {
    eyebrow: 'যেখানে গুরুত্বপূর্ণ সেখান থেকে শুরু করুন',
    statement: 'যা জরুরি তা দিয়ে শুরু করুন। প্রস্তুত হলে *প্রসারিত* করুন।',
    lede: 'আপনার পরিচালনার প্রয়োজনীয় মডিউল যোগ করুন। প্রতিটি মডিউল Core প্ল্যানে উপলব্ধ।',
  },
  th: {
    eyebrow: 'เริ่มจากสิ่งที่สำคัญ',
    statement: 'เริ่มจากสิ่งที่สำคัญ แล้ว*ขยาย*เมื่อพร้อม',
    lede: 'เพิ่มโมดูลที่การดำเนินงานของคุณต้องการ ทุกโมดูลใช้ได้บนแพ็กเกจ Core',
  },
  ms: {
    eyebrow: 'MULAKAN DARI YANG PENTING',
    statement: 'Mulakan dengan yang penting. *Kembangkan* apabila anda bersedia.',
    lede: 'Tambah modul yang diperlukan operasi anda. Semua tersedia pada pakej Core.',
  },
};
