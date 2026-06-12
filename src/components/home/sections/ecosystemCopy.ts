import type { WebsiteLocale } from '@/lib/i18n';

/**
 * Ecosystem-strip copy - the homepage's quiet external-credibility beat.
 *
 * USHG signals authority with restrained third-party badges (Michelin, James
 * Beard). Sundae's honest analog is the stack it plugs into. This strip names
 * ONLY the Live POS integrations (the source of truth is /integrations) and
 * labels everything else explicitly as roadmap - no overstating "Upcoming"
 * connectors as if they shipped.
 *
 * POS_SYSTEMS is intentionally NOT localized (product/brand wordmarks are
 * constant across locales). Same locale-keyed-with-en-fallback pattern as the
 * other self-contained homepage copy maps.
 */
export type EcosystemCopy = {
  eyebrow: string;
  liveLabel: string;
  roadmapLabel: string;
  /** Category labels for the not-yet-live ecosystem, honestly framed as roadmap. */
  roadmap: string[];
};

/** Live POS connectors, verbatim from the /integrations source of truth (status: "Live"). */
export const POS_SYSTEMS = ['Oracle Simphony', 'Square', 'Toast', 'Clover'] as const;

export const ecosystemCopy: Record<WebsiteLocale, EcosystemCopy> = {
  en: {
    eyebrow: 'Sits on top of the systems you already run',
    liveLabel: 'Live POS sync, today',
    roadmapLabel: 'Expanding across your full stack',
    roadmap: ['Labor', 'Inventory', 'Delivery', 'Reservations', 'Marketing', 'Finance'],
  },
  ar: {
    eyebrow: 'يعمل فوق الأنظمة التي تستخدمها أصلاً',
    liveLabel: 'مزامنة نقاط البيع مباشرةً، اليوم',
    roadmapLabel: 'يتوسّع ليشمل منظومتك بالكامل',
    roadmap: ['العمالة', 'المخزون', 'التوصيل', 'الحجوزات', 'التسويق', 'المالية'],
  },
  fr: {
    eyebrow: 'Se branche sur les systèmes que vous utilisez déjà',
    liveLabel: 'Sync caisse en direct, aujourd’hui',
    roadmapLabel: 'S’étend à toute votre stack',
    roadmap: ['Personnel', 'Stocks', 'Livraison', 'Réservations', 'Marketing', 'Finance'],
  },
  es: {
    eyebrow: 'Se conecta con los sistemas que ya usas',
    liveLabel: 'Sync de TPV en vivo, hoy',
    roadmapLabel: 'Ampliándose a todo tu stack',
    roadmap: ['Personal', 'Inventario', 'Delivery', 'Reservas', 'Marketing', 'Finanzas'],
  },
  de: {
    eyebrow: 'Setzt auf den Systemen auf, die Sie ohnehin nutzen',
    liveLabel: 'Live-POS-Sync, schon heute',
    roadmapLabel: 'Wächst über Ihren gesamten Stack',
    roadmap: ['Personal', 'Warenbestand', 'Lieferung', 'Reservierungen', 'Marketing', 'Finanzen'],
  },
  nl: {
    eyebrow: 'Draait boven op de systemen die u al gebruikt',
    liveLabel: 'Live POS-sync, vandaag al',
    roadmapLabel: 'Breidt uit over uw hele stack',
    roadmap: ['Personeel', 'Voorraad', 'Bezorging', 'Reserveringen', 'Marketing', 'Financiën'],
  },
  pt: {
    eyebrow: 'Funciona sobre os sistemas que você já usa',
    liveLabel: 'Sync de PDV ao vivo, hoje',
    roadmapLabel: 'Expandindo por toda a sua stack',
    roadmap: ['Pessoal', 'Estoque', 'Delivery', 'Reservas', 'Marketing', 'Finanças'],
  },
  hi: {
    eyebrow: 'उन्हीं सिस्टम पर चलता है जो आप पहले से इस्तेमाल करते हैं',
    liveLabel: 'लाइव POS सिंक, आज ही',
    roadmapLabel: 'आपके पूरे स्टैक तक विस्तार',
    roadmap: ['स्टाफ', 'इन्वेंट्री', 'डिलीवरी', 'आरक्षण', 'मार्केटिंग', 'वित्त'],
  },
  ur: {
    eyebrow: 'اُنہی سسٹمز پر کام کرتا ہے جو آپ پہلے سے استعمال کرتے ہیں',
    liveLabel: 'لائیو POS سِنک، آج ہی',
    roadmapLabel: 'آپ کے پورے اسٹیک تک پھیلتا ہوا',
    roadmap: ['عملہ', 'انوینٹری', 'ڈیلیوری', 'بکنگ', 'مارکیٹنگ', 'مالیات'],
  },
  it: {
    eyebrow: 'Si appoggia ai sistemi che usi già',
    liveLabel: 'Sync POS in tempo reale, da oggi',
    roadmapLabel: 'Si estende a tutto il tuo stack',
    roadmap: ['Personale', 'Magazzino', 'Delivery', 'Prenotazioni', 'Marketing', 'Finanza'],
  },
  pl: {
    eyebrow: 'Działa na systemach, których już używasz',
    liveLabel: 'Synchronizacja POS na żywo, już dziś',
    roadmapLabel: 'Rozszerza się na cały twój stack',
    roadmap: ['Personel', 'Magazyn', 'Dostawa', 'Rezerwacje', 'Marketing', 'Finanse'],
  },
  tr: {
    eyebrow: 'Zaten kullandığınız sistemlerin üzerinde çalışır',
    liveLabel: 'Canlı POS senkronu, bugünden',
    roadmapLabel: 'Tüm stack’inize doğru genişliyor',
    roadmap: ['Personel', 'Envanter', 'Teslimat', 'Rezervasyon', 'Pazarlama', 'Finans'],
  },
  'zh-Hans': {
    eyebrow: '运行于你已在使用的系统之上',
    liveLabel: 'POS 实时同步，现已上线',
    roadmapLabel: '正向你的整个技术栈延伸',
    roadmap: ['人力', '库存', '配送', '预订', '营销', '财务'],
  },
  ja: {
    eyebrow: 'すでにお使いのシステムの上で動く',
    liveLabel: 'POSのリアルタイム連携、本日から',
    roadmapLabel: 'スタック全体へと拡張中',
    roadmap: ['人員', '在庫', 'デリバリー', '予約', 'マーケティング', '財務'],
  },
  ko: {
    eyebrow: '이미 쓰고 있는 시스템 위에서 작동합니다',
    liveLabel: '실시간 POS 동기화, 지금 바로',
    roadmapLabel: '전체 스택으로 확장 중',
    roadmap: ['인력', '재고', '배달', '예약', '마케팅', '재무'],
  },
  id: {
    eyebrow: 'Berjalan di atas sistem yang sudah Anda pakai',
    liveLabel: 'Sync POS langsung, mulai hari ini',
    roadmapLabel: 'Meluas ke seluruh stack Anda',
    roadmap: ['Tenaga Kerja', 'Inventaris', 'Pengiriman', 'Reservasi', 'Pemasaran', 'Keuangan'],
  },
  vi: {
    eyebrow: 'Chạy trên chính những hệ thống bạn đang dùng',
    liveLabel: 'Đồng bộ POS trực tiếp, ngay hôm nay',
    roadmapLabel: 'Mở rộng trên toàn bộ stack của bạn',
    roadmap: ['Nhân sự', 'Kho', 'Giao hàng', 'Đặt bàn', 'Marketing', 'Tài chính'],
  },
  ro: {
    eyebrow: 'Funcționează peste sistemele pe care deja le folosești',
    liveLabel: 'Sync POS în timp real, de azi',
    roadmapLabel: 'Se extinde pe tot stack-ul tău',
    roadmap: ['Personal', 'Stocuri', 'Livrare', 'Rezervări', 'Marketing', 'Finanțe'],
  },
  sv: {
    eyebrow: 'Ligger ovanpå systemen du redan kör',
    liveLabel: 'Live POS-synk, redan idag',
    roadmapLabel: 'Växer över hela din stack',
    roadmap: ['Personal', 'Lager', 'Leverans', 'Bokningar', 'Marknadsföring', 'Ekonomi'],
  },
  bn: {
    eyebrow: 'আপনি যে সিস্টেমগুলো ইতিমধ্যেই ব্যবহার করেন, তার উপরেই চলে',
    liveLabel: 'লাইভ POS সিঙ্ক, আজই',
    roadmapLabel: 'আপনার পুরো স্ট্যাক জুড়ে বিস্তৃত হচ্ছে',
    roadmap: ['জনবল', 'ইনভেন্টরি', 'ডেলিভারি', 'রিজার্ভেশন', 'মার্কেটিং', 'অর্থ'],
  },
  th: {
    eyebrow: 'ทำงานบนระบบที่คุณใช้อยู่แล้ว',
    liveLabel: 'ซิงก์ POS แบบเรียลไทม์ ใช้ได้แล้ววันนี้',
    roadmapLabel: 'ขยายครอบคลุมทั้งสแตกของคุณ',
    roadmap: ['กำลังคน', 'สินค้าคงคลัง', 'การจัดส่ง', 'การจอง', 'การตลาด', 'การเงิน'],
  },
  ms: {
    eyebrow: 'Berjalan di atas sistem yang anda sudah gunakan',
    liveLabel: 'Sync POS langsung, mulai hari ini',
    roadmapLabel: 'Berkembang merentas seluruh stack anda',
    roadmap: ['Tenaga Kerja', 'Inventori', 'Penghantaran', 'Tempahan', 'Pemasaran', 'Kewangan'],
  },
};
