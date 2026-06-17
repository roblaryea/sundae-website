import type { WebsiteLocale } from '@/lib/i18n';

/**
 * Ecosystem-strip copy - the homepage's quiet external-credibility beat.
 *
 * USHG signals authority with restrained third-party badges (Michelin, James
 * Beard). Sundae's honest analog is the stack it plugs into. Every connector
 * named here is LIVE today (source of truth: /integrations, all status "Live")
 * across ten operational domains - so the strip shows breadth, not a roadmap.
 *
 * CONNECTORS is intentionally NOT localized (product/brand wordmarks are
 * constant across locales). Same locale-keyed-with-en-fallback pattern as the
 * other self-contained homepage copy maps.
 */
export type EcosystemCopy = {
  eyebrow: string;
  /** Small "live" pill text above the connector marquee. */
  liveLabel: string;
  /** Line under the marquee framing the breadth - all live, present tense. */
  stackLabel: string;
  /** Operational domains the live connectors span. */
  domains: string[];
};

/**
 * Live connector wordmarks, verbatim from the /integrations source of truth
 * (every category is status "Live"). Ordered for a balanced visual mix across
 * the two marquee rows; brand names are locale-invariant.
 */
export const CONNECTORS = [
  'Oracle MICROS Simphony',
  'Square',
  'Toast',
  'Clover',
  '7shifts',
  'HotSchedules',
  'Deputy',
  'MarketMan',
  'Craftable',
  'BinWise',
  'Deliverect',
  'Uber Eats',
  'DoorDash',
  'Talabat',
  'SevenRooms',
  'OpenTable',
  'Resy',
  'Tock',
  'Meta',
  'Google Ads',
  'Mailchimp',
  'Google Reviews',
  'Yelp',
  'Zendesk',
  'Olo',
  'QuickBooks',
  'Xero',
  'Sage',
  'FreshBooks',
] as const;

export const ecosystemCopy: Record<WebsiteLocale, EcosystemCopy> = {
  en: {
    eyebrow: 'Sits on top of the systems you already run',
    liveLabel: 'Live and syncing today',
    stackLabel: 'Connected across your full operational stack',
    domains: ['Labor', 'Inventory', 'Delivery', 'Reservations', 'Marketing', 'Finance'],
  },
  ar: {
    eyebrow: 'يعمل فوق الأنظمة التي تستخدمها أصلاً',
    liveLabel: 'متصل ويتزامن اليوم',
    stackLabel: 'متصل عبر منظومتك التشغيلية بالكامل',
    domains: ['العمالة', 'المخزون', 'التوصيل', 'الحجوزات', 'التسويق', 'المالية'],
  },
  fr: {
    eyebrow: 'Se branche sur les systèmes que vous utilisez déjà',
    liveLabel: 'En direct et synchronisé, aujourd’hui',
    stackLabel: 'Connecté à toute votre stack opérationnelle',
    domains: ['Personnel', 'Stocks', 'Livraison', 'Réservations', 'Marketing', 'Finance'],
  },
  es: {
    eyebrow: 'Se conecta con los sistemas que ya usas',
    liveLabel: 'En vivo y sincronizando hoy',
    stackLabel: 'Conectado en todo tu stack operativo',
    domains: ['Personal', 'Inventario', 'Delivery', 'Reservas', 'Marketing', 'Finanzas'],
  },
  de: {
    eyebrow: 'Setzt auf den Systemen auf, die Sie ohnehin nutzen',
    liveLabel: 'Live und synchron, schon heute',
    stackLabel: 'Verbunden über Ihren gesamten operativen Stack',
    domains: ['Personal', 'Warenbestand', 'Lieferung', 'Reservierungen', 'Marketing', 'Finanzen'],
  },
  nl: {
    eyebrow: 'Draait boven op de systemen die u al gebruikt',
    liveLabel: 'Live en synchroon, vandaag al',
    stackLabel: 'Verbonden met uw hele operationele stack',
    domains: ['Personeel', 'Voorraad', 'Bezorging', 'Reserveringen', 'Marketing', 'Financiën'],
  },
  pt: {
    eyebrow: 'Funciona sobre os sistemas que você já usa',
    liveLabel: 'Ao vivo e sincronizando hoje',
    stackLabel: 'Conectado em toda a sua stack operacional',
    domains: ['Pessoal', 'Estoque', 'Delivery', 'Reservas', 'Marketing', 'Finanças'],
  },
  hi: {
    eyebrow: 'उन्हीं सिस्टम पर चलता है जो आप पहले से इस्तेमाल करते हैं',
    liveLabel: 'लाइव और सिंक, आज ही',
    stackLabel: 'आपके पूरे ऑपरेशनल स्टैक से जुड़ा',
    domains: ['स्टाफ', 'इन्वेंट्री', 'डिलीवरी', 'आरक्षण', 'मार्केटिंग', 'वित्त'],
  },
  ur: {
    eyebrow: 'اُنہی سسٹمز پر کام کرتا ہے جو آپ پہلے سے استعمال کرتے ہیں',
    liveLabel: 'لائیو اور سِنک، آج ہی',
    stackLabel: 'آپ کے پورے آپریشنل اسٹیک سے منسلک',
    domains: ['عملہ', 'انوینٹری', 'ڈیلیوری', 'بکنگ', 'مارکیٹنگ', 'مالیات'],
  },
  it: {
    eyebrow: 'Si appoggia ai sistemi che usi già',
    liveLabel: 'Live e in sync, da oggi',
    stackLabel: 'Connesso a tutto il tuo stack operativo',
    domains: ['Personale', 'Magazzino', 'Delivery', 'Prenotazioni', 'Marketing', 'Finanza'],
  },
  pl: {
    eyebrow: 'Działa na systemach, których już używasz',
    liveLabel: 'Na żywo i w synchronizacji, już dziś',
    stackLabel: 'Połączony z całym stosem operacyjnym',
    domains: ['Personel', 'Magazyn', 'Dostawa', 'Rezerwacje', 'Marketing', 'Finanse'],
  },
  tr: {
    eyebrow: 'Zaten kullandığınız sistemlerin üzerinde çalışır',
    liveLabel: 'Canlı ve senkron, bugünden',
    stackLabel: 'Tüm operasyonel stack’inize bağlı',
    domains: ['Personel', 'Envanter', 'Teslimat', 'Rezervasyon', 'Pazarlama', 'Finans'],
  },
  'zh-Hans': {
    eyebrow: '运行于你已在使用的系统之上',
    liveLabel: '实时同步，现已上线',
    stackLabel: '贯通你的整个运营技术栈',
    domains: ['人力', '库存', '配送', '预订', '营销', '财务'],
  },
  ja: {
    eyebrow: 'すでにお使いのシステムの上で動く',
    liveLabel: 'リアルタイム連携、本日から',
    stackLabel: '運用スタック全体に接続済み',
    domains: ['人員', '在庫', 'デリバリー', '予約', 'マーケティング', '財務'],
  },
  ko: {
    eyebrow: '이미 쓰고 있는 시스템 위에서 작동합니다',
    liveLabel: '실시간 동기화, 지금 바로',
    stackLabel: '전체 운영 스택에 연결됨',
    domains: ['인력', '재고', '배달', '예약', '마케팅', '재무'],
  },
  id: {
    eyebrow: 'Berjalan di atas sistem yang sudah Anda pakai',
    liveLabel: 'Live dan tersinkron, mulai hari ini',
    stackLabel: 'Terhubung di seluruh stack operasional Anda',
    domains: ['Tenaga Kerja', 'Inventaris', 'Pengiriman', 'Reservasi', 'Pemasaran', 'Keuangan'],
  },
  vi: {
    eyebrow: 'Chạy trên chính những hệ thống bạn đang dùng',
    liveLabel: 'Trực tiếp và đồng bộ, ngay hôm nay',
    stackLabel: 'Kết nối trên toàn bộ stack vận hành của bạn',
    domains: ['Nhân sự', 'Kho', 'Giao hàng', 'Đặt bàn', 'Marketing', 'Tài chính'],
  },
  ro: {
    eyebrow: 'Funcționează peste sistemele pe care deja le folosești',
    liveLabel: 'Live și sincronizat, de azi',
    stackLabel: 'Conectat pe tot stack-ul tău operațional',
    domains: ['Personal', 'Stocuri', 'Livrare', 'Rezervări', 'Marketing', 'Finanțe'],
  },
  sv: {
    eyebrow: 'Ligger ovanpå systemen du redan kör',
    liveLabel: 'Live och synkat, redan idag',
    stackLabel: 'Anslutet över hela din operativa stack',
    domains: ['Personal', 'Lager', 'Leverans', 'Bokningar', 'Marknadsföring', 'Ekonomi'],
  },
  bn: {
    eyebrow: 'আপনি যে সিস্টেমগুলো ইতিমধ্যেই ব্যবহার করেন, তার উপরেই চলে',
    liveLabel: 'লাইভ ও সিঙ্কড, আজই',
    stackLabel: 'আপনার পুরো অপারেশনাল স্ট্যাক জুড়ে সংযুক্ত',
    domains: ['জনবল', 'ইনভেন্টরি', 'ডেলিভারি', 'রিজার্ভেশন', 'মার্কেটিং', 'অর্থ'],
  },
  th: {
    eyebrow: 'ทำงานบนระบบที่คุณใช้อยู่แล้ว',
    liveLabel: 'เชื่อมต่อและซิงก์แล้ววันนี้',
    stackLabel: 'เชื่อมต่อทั่วทั้งสแตกปฏิบัติการของคุณ',
    domains: ['กำลังคน', 'สินค้าคงคลัง', 'การจัดส่ง', 'การจอง', 'การตลาด', 'การเงิน'],
  },
  ms: {
    eyebrow: 'Berjalan di atas sistem yang anda sudah gunakan',
    liveLabel: 'Langsung dan tersegerak, mulai hari ini',
    stackLabel: 'Terhubung merentas seluruh stack operasi anda',
    domains: ['Tenaga Kerja', 'Inventori', 'Penghantaran', 'Tempahan', 'Pemasaran', 'Kewangan'],
  },
};
