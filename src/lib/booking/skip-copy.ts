import type { BookingLocale } from './locales';

export const bookingSkipCopy = {
  en: 'Skip to main content', ar: 'انتقل إلى المحتوى الرئيسي', fr: 'Aller au contenu principal', es: 'Ir al contenido principal',
  de: 'Zum Hauptinhalt springen', nl: 'Naar hoofdinhoud springen', pt: 'Ir para o conteúdo principal', hi: 'मुख्य सामग्री पर जाएँ', ur: 'مرکزی مواد پر جائیں',
  it: 'Vai al contenuto principale', pl: 'Przejdź do głównej treści', tr: 'Ana içeriğe geç', 'zh-Hans': '跳到主要内容',
  ja: 'メインコンテンツへ移動', ko: '주요 콘텐츠로 건너뛰기', id: 'Lewati ke konten utama', vi: 'Chuyển đến nội dung chính', ro: 'Sari la conținutul principal',
  sv: 'Hoppa till huvudinnehåll', bn: 'মূল কনটেন্টে যান', th: 'ข้ามไปยังเนื้อหาหลัก', ms: 'Langkau ke kandungan utama',
  pap: 'Bai na e contenido principal', az: 'Əsas məzmuna keçin', ru: 'Перейти к основному содержимому',
} satisfies Record<BookingLocale, string>;
