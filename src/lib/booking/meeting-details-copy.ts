import type { BookingLocale } from './locales';

export const meetingDetailsCopy = {
  en: 'Meeting details', ar: 'تفاصيل الاجتماع', fr: 'Détails du rendez-vous', es: 'Detalles de la reunión',
  de: 'Termindetails', nl: 'Gespreksdetails', pt: 'Detalhes da reunião', hi: 'बैठक का विवरण', ur: 'ملاقات کی تفصیلات',
  it: 'Dettagli dell’incontro', pl: 'Szczegóły spotkania', tr: 'Görüşme ayrıntıları', 'zh-Hans': '会议详情',
  ja: '通話の詳細', ko: '통화 상세 정보', id: 'Detail pertemuan', vi: 'Chi tiết cuộc hẹn', ro: 'Detaliile întâlnirii',
  sv: 'Samtalsdetaljer', bn: 'বৈঠকের বিবরণ', th: 'รายละเอียดนัดหมาย', ms: 'Butiran pertemuan',
  pap: 'Detaye di e reunion', az: 'Görüşün təfərrüatları', ru: 'Подробности встречи',
} satisfies Record<BookingLocale, string>;
