// Localized labels for the Crew module-page soft pricing line. The price NUMBER
// stays in USD ($) everywhere — only the surrounding labels are transcreated:
//   from        — "From" (precedes the monthly price)
//   perMonth    — the per-month suffix on the price (e.g. "/mo", "/mois", "/月")
//   cta         — "See full pricing" link to the pricing micro-site
// There is no perLocation label: Crew SKUs are FLAT monthly under price book
// v1.7, so a per-location suffix would render the retired v1.6 mechanic.
// ar & ur are RTL; the strings read naturally and the layout handles direction.
// Keys mirror the locale set in crewNavLocales.ts (22 total).
export const crewPricingLocales: Record<
  string,
  { from: string; perMonth: string; cta: string }
> = {
  en: { from: 'From', perMonth: '/mo', cta: 'See full pricing' },
  ar: { from: 'ابتداءً من', perMonth: '/شهر', cta: 'عرض الأسعار الكاملة' },
  fr: { from: 'À partir de', perMonth: '/mois', cta: 'Voir tous les tarifs' },
  es: { from: 'Desde', perMonth: '/mes', cta: 'Ver precios completos' },
  de: { from: 'Ab', perMonth: '/Monat', cta: 'Alle Preise ansehen' },
  nl: { from: 'Vanaf', perMonth: '/mnd', cta: 'Bekijk alle prijzen' },
  pt: { from: 'A partir de', perMonth: '/mês', cta: 'Ver preços completos' },
  hi: { from: 'से शुरू', perMonth: '/माह', cta: 'पूरी कीमत देखें' },
  ur: { from: 'سے شروع', perMonth: '/ماہ', cta: 'مکمل قیمتیں دیکھیں' },
  it: { from: 'Da', perMonth: '/mese', cta: 'Vedi tutti i prezzi' },
  pl: { from: 'Od', perMonth: '/mies.', cta: 'Zobacz pełny cennik' },
  tr: { from: 'Başlangıç', perMonth: '/ay', cta: 'Tüm fiyatları gör' },
  'zh-Hans': { from: '起价', perMonth: '/月', cta: '查看完整价格' },
  ja: { from: '月額', perMonth: '/月', cta: '料金の詳細を見る' },
  ko: { from: '월', perMonth: '/월', cta: '전체 요금 보기' },
  id: { from: 'Mulai dari', perMonth: '/bln', cta: 'Lihat harga lengkap' },
  vi: { from: 'Từ', perMonth: '/tháng', cta: 'Xem bảng giá đầy đủ' },
  ro: { from: 'De la', perMonth: '/lună', cta: 'Vezi prețurile complete' },
  sv: { from: 'Från', perMonth: '/mån', cta: 'Se alla priser' },
  bn: { from: 'থেকে শুরু', perMonth: '/মাস', cta: 'সম্পূর্ণ মূল্য দেখুন' },
  th: { from: 'เริ่มต้น', perMonth: '/เดือน', cta: 'ดูราคาทั้งหมด' },
  ms: { from: 'Dari', perMonth: '/bln', cta: 'Lihat harga penuh' },
};
