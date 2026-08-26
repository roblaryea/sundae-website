// Copy for the homepage hero-1 recovery-loop signature (RecoveryLoop.tsx).
// Owned by the design pass; the four stage verbs + loop title are the closed-loop
// spine vocabulary. recoveredThisWeek / measuredVsBaseline mirror the strings the
// second hero (heroDashboardCopy) already ships, so both heroes read the same.
// House style: plain spaced hyphen, no em-dashes; product terms stay literal.


export type RecoveryLoopCopy = {
  loopTitle: string;
  stages: [string, string, string, string]; // Detect, Decide, Execute, Measure
  recoveredThisWeek: string;
  measuredVsBaseline: string;
};

export const recoveryLoopCopy: Record<string, RecoveryLoopCopy> = {
  en: { loopTitle: "The recovery loop", stages: ["Detect", "Decide", "Execute", "Measure"], recoveredThisWeek: "Recovered this week", measuredVsBaseline: "measured vs baseline" },
  ar: { loopTitle: "حلقة الاستعادة", stages: ["اكتشِف", "قرِّر", "نفِّذ", "قِس"], recoveredThisWeek: "المُسترَد هذا الأسبوع", measuredVsBaseline: "مقيس مقابل خط الأساس" },
  fr: { loopTitle: "La boucle de récupération", stages: ["Détecter", "Décider", "Exécuter", "Mesurer"], recoveredThisWeek: "Récupéré cette semaine", measuredVsBaseline: "mesuré vs référence" },
  es: { loopTitle: "El ciclo de recuperación", stages: ["Detectar", "Decidir", "Ejecutar", "Medir"], recoveredThisWeek: "Recuperado esta semana", measuredVsBaseline: "medido vs referencia" },
  de: { loopTitle: "Der Recovery-Kreislauf", stages: ["Erkennen", "Entscheiden", "Umsetzen", "Messen"], recoveredThisWeek: "Diese Woche zurückgeholt", measuredVsBaseline: "gemessen vs Basiswert" },
  nl: { loopTitle: "De recovery-loop", stages: ["Signaleren", "Beslissen", "Uitvoeren", "Meten"], recoveredThisWeek: "Deze week teruggewonnen", measuredVsBaseline: "gemeten vs referentie" },
  pt: { loopTitle: "O ciclo de recuperação", stages: ["Detetar", "Decidir", "Executar", "Medir"], recoveredThisWeek: "Recuperado esta semana", measuredVsBaseline: "medido vs referência" },
  it: { loopTitle: "Il ciclo di recupero", stages: ["Rilevare", "Decidere", "Eseguire", "Misurare"], recoveredThisWeek: "Recuperato questa settimana", measuredVsBaseline: "misurato vs riferimento" },
  pl: { loopTitle: "Pętla odzyskiwania", stages: ["Wykryj", "Zdecyduj", "Wykonaj", "Zmierz"], recoveredThisWeek: "Odzyskane w tym tygodniu", measuredVsBaseline: "zmierzone vs poziom bazowy" },
  ro: { loopTitle: "Bucla de recuperare", stages: ["Detectează", "Decide", "Execută", "Măsoară"], recoveredThisWeek: "Recuperat săptămâna aceasta", measuredVsBaseline: "măsurat vs referință" },
  sv: { loopTitle: "Återvinningsloopen", stages: ["Upptäck", "Besluta", "Genomför", "Mät"], recoveredThisWeek: "Återvunnet denna vecka", measuredVsBaseline: "mätt mot baslinje" },
  tr: { loopTitle: "Kurtarma döngüsü", stages: ["Tespit et", "Karar ver", "Uygula", "Ölç"], recoveredThisWeek: "Bu hafta geri kazanılan", measuredVsBaseline: "referansa göre ölçüldü" },
  id: { loopTitle: "Lingkar pemulihan", stages: ["Deteksi", "Putuskan", "Jalankan", "Ukur"], recoveredThisWeek: "Dipulihkan minggu ini", measuredVsBaseline: "diukur vs garis dasar" },
  ms: { loopTitle: "Gelung pemulihan", stages: ["Kesan", "Putuskan", "Laksana", "Ukur"], recoveredThisWeek: "Dipulihkan minggu ini", measuredVsBaseline: "diukur vs garis dasar" },
  vi: { loopTitle: "Vòng phục hồi", stages: ["Phát hiện", "Quyết định", "Thực thi", "Đo lường"], recoveredThisWeek: "Thu hồi tuần này", measuredVsBaseline: "đo so với mốc chuẩn" },
  hi: { loopTitle: "रिकवरी लूप", stages: ["पहचानें", "तय करें", "अमल करें", "मापें"], recoveredThisWeek: "इस हफ्ते वसूली", measuredVsBaseline: "बेसलाइन के मुकाबले मापी गई" },
  ur: { loopTitle: "ریکوری لوپ", stages: ["شناخت کریں", "فیصلہ کریں", "نافذ کریں", "پیمائش کریں"], recoveredThisWeek: "اس ہفتے بحال", measuredVsBaseline: "بنیادی سطح کے مقابلے ماپا گیا" },
  bn: { loopTitle: "রিকভারি লুপ", stages: ["শনাক্ত করুন", "সিদ্ধান্ত নিন", "কার্যকর করুন", "পরিমাপ করুন"], recoveredThisWeek: "এই সপ্তাহে পুনরুদ্ধার", measuredVsBaseline: "বেসলাইনের বিপরীতে পরিমাপ" },
  th: { loopTitle: "วงจรการกู้คืน", stages: ["ตรวจจับ", "ตัดสินใจ", "ดำเนินการ", "วัดผล"], recoveredThisWeek: "กู้คืนสัปดาห์นี้", measuredVsBaseline: "วัดเทียบกับค่าฐาน" },
  "zh-Hans": { loopTitle: "回收闭环", stages: ["发现", "决策", "执行", "计量"], recoveredThisWeek: "本周挽回", measuredVsBaseline: "对比基线实测" },
  ja: { loopTitle: "リカバリーループ", stages: ["検知", "判断", "実行", "計測"], recoveredThisWeek: "今週の回収", measuredVsBaseline: "基準比で計測" },
  ko: { loopTitle: "리커버리 루프", stages: ["감지", "결정", "실행", "측정"], recoveredThisWeek: "이번 주 회수", measuredVsBaseline: "기준선 대비 측정" },
};
