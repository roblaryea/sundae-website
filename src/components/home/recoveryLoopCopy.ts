// Copy for the homepage hero-1 recovery-loop signature (RecoveryLoop.tsx).
// Owned by the design pass; the four stage verbs + loop title are the closed-loop
// spine vocabulary. recoveredThisWeek / measuredVsBaseline mirror the strings the
// second hero (heroDashboardCopy) already ships, so both heroes read the same.
// House style: plain spaced hyphen, no em-dashes; product terms stay literal.
//
// currency + amount drive the localized recovered figure. The amount is an
// ILLUSTRATIVE, rounded weekly figure per market (a demo value, like the second
// hero's Pulse strip - never a claimed customer result), formatted natively via
// Intl.NumberFormat(locale, { style: "currency", currency }). Mapping language ->
// currency is a best-effort default for the marketing hero; a copy/market review
// can adjust any pairing.

export type RecoveryLoopCopy = {
  loopTitle: string;
  stages: [string, string, string, string]; // Detect, Decide, Execute, Measure
  recoveredThisWeek: string;
  measuredVsBaseline: string;
  currency: string; // ISO 4217
  amount: number; // illustrative weekly recovered figure, in `currency`
};

export const recoveryLoopCopy: Record<string, RecoveryLoopCopy> = {
  en: { loopTitle: "The recovery loop", stages: ["Detect", "Decide", "Execute", "Measure"], recoveredThisWeek: "Recovered this week", measuredVsBaseline: "measured vs baseline", currency: "USD", amount: 5120 },
  ar: { loopTitle: "حلقة الاستعادة", stages: ["اكتشِف", "قرِّر", "نفِّذ", "قِس"], recoveredThisWeek: "المُسترَد هذا الأسبوع", measuredVsBaseline: "مقيس مقابل خط الأساس", currency: "AED", amount: 18800 },
  fr: { loopTitle: "La boucle de récupération", stages: ["Détecter", "Décider", "Exécuter", "Mesurer"], recoveredThisWeek: "Récupéré cette semaine", measuredVsBaseline: "mesuré vs référence", currency: "EUR", amount: 4800 },
  es: { loopTitle: "El ciclo de recuperación", stages: ["Detectar", "Decidir", "Ejecutar", "Medir"], recoveredThisWeek: "Recuperado esta semana", measuredVsBaseline: "medido vs referencia", currency: "EUR", amount: 4800 },
  de: { loopTitle: "Der Recovery-Kreislauf", stages: ["Erkennen", "Entscheiden", "Umsetzen", "Messen"], recoveredThisWeek: "Diese Woche zurückgeholt", measuredVsBaseline: "gemessen vs Basiswert", currency: "EUR", amount: 4800 },
  nl: { loopTitle: "De recovery-loop", stages: ["Signaleren", "Beslissen", "Uitvoeren", "Meten"], recoveredThisWeek: "Deze week teruggewonnen", measuredVsBaseline: "gemeten vs referentie", currency: "EUR", amount: 4800 },
  pt: { loopTitle: "O ciclo de recuperação", stages: ["Detetar", "Decidir", "Executar", "Medir"], recoveredThisWeek: "Recuperado esta semana", measuredVsBaseline: "medido vs referência", currency: "EUR", amount: 4800 },
  it: { loopTitle: "Il ciclo di recupero", stages: ["Rilevare", "Decidere", "Eseguire", "Misurare"], recoveredThisWeek: "Recuperato questa settimana", measuredVsBaseline: "misurato vs riferimento", currency: "EUR", amount: 4800 },
  pl: { loopTitle: "Pętla odzyskiwania", stages: ["Wykryj", "Zdecyduj", "Wykonaj", "Zmierz"], recoveredThisWeek: "Odzyskane w tym tygodniu", measuredVsBaseline: "zmierzone vs poziom bazowy", currency: "PLN", amount: 20500 },
  ro: { loopTitle: "Bucla de recuperare", stages: ["Detectează", "Decide", "Execută", "Măsoară"], recoveredThisWeek: "Recuperat săptămâna aceasta", measuredVsBaseline: "măsurat vs referință", currency: "RON", amount: 23800 },
  sv: { loopTitle: "Återvinningsloopen", stages: ["Upptäck", "Besluta", "Genomför", "Mät"], recoveredThisWeek: "Återvunnet denna vecka", measuredVsBaseline: "mätt mot baslinje", currency: "SEK", amount: 54000 },
  tr: { loopTitle: "Kurtarma döngüsü", stages: ["Tespit et", "Karar ver", "Uygula", "Ölç"], recoveredThisWeek: "Bu hafta geri kazanılan", measuredVsBaseline: "referansa göre ölçüldü", currency: "TRY", amount: 168000 },
  id: { loopTitle: "Lingkar pemulihan", stages: ["Deteksi", "Putuskan", "Jalankan", "Ukur"], recoveredThisWeek: "Dipulihkan minggu ini", measuredVsBaseline: "diukur vs garis dasar", currency: "IDR", amount: 82000000 },
  ms: { loopTitle: "Gelung pemulihan", stages: ["Kesan", "Putuskan", "Laksana", "Ukur"], recoveredThisWeek: "Dipulihkan minggu ini", measuredVsBaseline: "diukur vs garis dasar", currency: "MYR", amount: 24000 },
  vi: { loopTitle: "Vòng phục hồi", stages: ["Phát hiện", "Quyết định", "Thực thi", "Đo lường"], recoveredThisWeek: "Thu hồi tuần này", measuredVsBaseline: "đo so với mốc chuẩn", currency: "VND", amount: 128000000 },
  hi: { loopTitle: "रिकवरी लूप", stages: ["पहचानें", "तय करें", "अमल करें", "मापें"], recoveredThisWeek: "इस हफ्ते वसूली", measuredVsBaseline: "बेसलाइन के मुकाबले मापी गई", currency: "INR", amount: 428000 },
  ur: { loopTitle: "ریکوری لوپ", stages: ["شناخت کریں", "فیصلہ کریں", "نافذ کریں", "پیمائش کریں"], recoveredThisWeek: "اس ہفتے بحال", measuredVsBaseline: "بنیادی سطح کے مقابلے ماپا گیا", currency: "PKR", amount: 1420000 },
  bn: { loopTitle: "রিকভারি লুপ", stages: ["শনাক্ত করুন", "সিদ্ধান্ত নিন", "কার্যকর করুন", "পরিমাপ করুন"], recoveredThisWeek: "এই সপ্তাহে পুনরুদ্ধার", measuredVsBaseline: "বেসলাইনের বিপরীতে পরিমাপ", currency: "BDT", amount: 610000 },
  th: { loopTitle: "วงจรการกู้คืน", stages: ["ตรวจจับ", "ตัดสินใจ", "ดำเนินการ", "วัดผล"], recoveredThisWeek: "กู้คืนสัปดาห์นี้", measuredVsBaseline: "วัดเทียบกับค่าฐาน", currency: "THB", amount: 184000 },
  "zh-Hans": { loopTitle: "回收闭环", stages: ["发现", "决策", "执行", "计量"], recoveredThisWeek: "本周挽回", measuredVsBaseline: "对比基线实测", currency: "CNY", amount: 37000 },
  ja: { loopTitle: "リカバリーループ", stages: ["検知", "判断", "実行", "計測"], recoveredThisWeek: "今週の回収", measuredVsBaseline: "基準比で計測", currency: "JPY", amount: 760000 },
  ko: { loopTitle: "리커버리 루프", stages: ["감지", "결정", "실행", "측정"], recoveredThisWeek: "이번 주 회수", measuredVsBaseline: "기준선 대비 측정", currency: "KRW", amount: 6900000 },
};
