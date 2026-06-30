// Localized labels for the Crew module-page soft pricing line. The price NUMBER
// stays in USD ($) everywhere — only the surrounding labels are transcreated:
//   from        — "From" (precedes the base price)
//   perMonth    — the per-month suffix on the base price (e.g. "/mo", "/mois", "/月")
//   perLocation — "per location/site/branch" suffix on the per-location price
//   cta         — "See full pricing" link to the pricing micro-site
// ar & ur are RTL; the strings read naturally and the layout handles direction.
// Keys mirror the locale set in crewNavLocales.ts (22 total).
export const crewPricingLocales: Record<
  string,
  { from: string; perMonth: string; perLocation: string; cta: string }
> = {
  en: { from: 'From', perMonth: '/mo', perLocation: '/location', cta: 'See full pricing' },
  ar: { from: 'ابتداءً من', perMonth: '/شهر', perLocation: '/فرع', cta: 'عرض الأسعار الكاملة' },
  fr: { from: 'À partir de', perMonth: '/mois', perLocation: '/site', cta: 'Voir tous les tarifs' },
  es: { from: 'Desde', perMonth: '/mes', perLocation: '/local', cta: 'Ver precios completos' },
  de: { from: 'Ab', perMonth: '/Monat', perLocation: '/Standort', cta: 'Alle Preise ansehen' },
  nl: { from: 'Vanaf', perMonth: '/mnd', perLocation: '/locatie', cta: 'Bekijk alle prijzen' },
  pt: { from: 'A partir de', perMonth: '/mês', perLocation: '/local', cta: 'Ver preços completos' },
  hi: { from: 'से शुरू', perMonth: '/माह', perLocation: '/स्थान', cta: 'पूरी कीमत देखें' },
  ur: { from: 'سے شروع', perMonth: '/ماہ', perLocation: '/مقام', cta: 'مکمل قیمتیں دیکھیں' },
  it: { from: 'Da', perMonth: '/mese', perLocation: '/sede', cta: 'Vedi tutti i prezzi' },
  pl: { from: 'Od', perMonth: '/mies.', perLocation: '/lokal', cta: 'Zobacz pełny cennik' },
  tr: { from: 'Başlangıç', perMonth: '/ay', perLocation: '/şube', cta: 'Tüm fiyatları gör' },
  'zh-Hans': { from: '起价', perMonth: '/月', perLocation: '/门店', cta: '查看完整价格' },
  ja: { from: '月額', perMonth: '/月', perLocation: '/拠点', cta: '料金の詳細を見る' },
  ko: { from: '월', perMonth: '/월', perLocation: '/지점', cta: '전체 요금 보기' },
  id: { from: 'Mulai dari', perMonth: '/bln', perLocation: '/lokasi', cta: 'Lihat harga lengkap' },
  vi: { from: 'Từ', perMonth: '/tháng', perLocation: '/địa điểm', cta: 'Xem bảng giá đầy đủ' },
  ro: { from: 'De la', perMonth: '/lună', perLocation: '/locație', cta: 'Vezi prețurile complete' },
  sv: { from: 'Från', perMonth: '/mån', perLocation: '/plats', cta: 'Se alla priser' },
  bn: { from: 'থেকে শুরু', perMonth: '/মাস', perLocation: '/শাখা', cta: 'সম্পূর্ণ মূল্য দেখুন' },
  th: { from: 'เริ่มต้น', perMonth: '/เดือน', perLocation: '/สาขา', cta: 'ดูราคาทั้งหมด' },
  ms: { from: 'Dari', perMonth: '/bln', perLocation: '/lokasi', cta: 'Lihat harga penuh' },
};
