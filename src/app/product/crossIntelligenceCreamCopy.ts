/**
 * Copy for the warm "cream relief" editorial band on the Cross-Intelligence page.
 *
 * Hand-authored native transcreation per locale - NOT literal word-for-word - so
 * each line reads the way an operator in that market would actually say it. Mirrors
 * the self-contained insightsCreamCopy.ts pattern: a locale-keyed map resolved at
 * render with an English fallback, kept out of the large per-locale i18n.ts trees.
 *
 * EMPHASIS MARKER: every `statement` carries exactly one `*...*` span. The renderer
 * (CreamBreak) splits on `*` and italicizes the wrapped phrase in warm-cherry. Each
 * locale MUST keep exactly one `*...*` pair around the equivalent emphasized phrase.
 *
 * Punctuation: normal hyphen "-" only - no em dashes, en dashes, ellipsis
 * characters, or zero-width characters. Arabic (ar) and Urdu (ur) are RTL; the
 * copy is written natively and the layout handles direction.
 */

export const crossIntelligenceCreamCopy: Record<string, { eyebrow: string; statement: string; lede: string }> = {
  en: {
    eyebrow: 'CONNECTED SIGNALS',
    statement: 'Every signal, *connected* across the operation.',
    lede: 'Labor, sales, inventory, and guests - correlated so you see cause, not just symptoms.',
  },
  ar: {
    eyebrow: 'إشارات مترابطة',
    statement: 'كل إشارة، *مترابطة* عبر العملية بأكملها.',
    lede: 'العمالة والمبيعات والمخزون والضيوف - مترابطة لترى السبب، لا الأعراض فقط.',
  },
  fr: {
    eyebrow: 'SIGNAUX CONNECTES',
    statement: 'Chaque signal, *relie* a toute votre operation.',
    lede: 'Main-d oeuvre, ventes, stock et clients - correles pour voir la cause, pas seulement les symptomes.',
  },
  es: {
    eyebrow: 'SENALES CONECTADAS',
    statement: 'Cada senal, *conectada* en toda la operacion.',
    lede: 'Personal, ventas, inventario y clientes - correlacionados para ver la causa, no solo los sintomas.',
  },
  de: {
    eyebrow: 'VERBUNDENE SIGNALE',
    statement: 'Jedes Signal, *verbunden* im gesamten Betrieb.',
    lede: 'Personal, Umsatz, Bestand und Gaeste - korreliert, damit Sie die Ursache sehen, nicht nur die Symptome.',
  },
  nl: {
    eyebrow: 'VERBONDEN SIGNALEN',
    statement: 'Elk signaal, *verbonden* door de hele operatie.',
    lede: 'Personeel, omzet, voorraad en gasten - gecorreleerd zodat je de oorzaak ziet, niet alleen de symptomen.',
  },
  pt: {
    eyebrow: 'SINAIS CONECTADOS',
    statement: 'Cada sinal, *conectado* em toda a operacao.',
    lede: 'Equipe, vendas, estoque e clientes - correlacionados para voce ver a causa, nao so os sintomas.',
  },
  hi: {
    eyebrow: 'जुड़े हुए संकेत',
    statement: 'हर संकेत, पूरे ऑपरेशन में *आपस में जुड़ा*।',
    lede: 'श्रम, बिक्री, इन्वेंट्री और मेहमान - इस तरह सहसंबंधित कि आप कारण देखें, सिर्फ़ लक्षण नहीं।',
  },
  ur: {
    eyebrow: 'منسلک سگنلز',
    statement: 'ہر سگنل، پورے آپریشن میں *آپس میں جڑا ہوا*۔',
    lede: 'محنت، فروخت، انوینٹری اور مہمان - یوں مربوط کہ آپ سبب دیکھیں، صرف علامات نہیں۔',
  },
  it: {
    eyebrow: 'SEGNALI CONNESSI',
    statement: 'Ogni segnale, *collegato* in tutta l operativita.',
    lede: 'Personale, vendite, magazzino e ospiti - correlati per vedere la causa, non solo i sintomi.',
  },
  pl: {
    eyebrow: 'POLACZONE SYGNALY',
    statement: 'Kazdy sygnal, *polaczony* w calej operacji.',
    lede: 'Personel, sprzedaz, zapasy i goscie - skorelowane, by widziec przyczyne, a nie tylko objawy.',
  },
  tr: {
    eyebrow: 'BAGLI SINYALLER',
    statement: 'Her sinyal, tum operasyon boyunca *baglantili*.',
    lede: 'Personel, satis, stok ve misafirler - sebebi gormeniz icin iliskilendirilir, sadece belirtileri degil.',
  },
  'zh-Hans': {
    eyebrow: '关联信号',
    statement: '每一个信号，在整个运营中*彼此相连*。',
    lede: '人力、销售、库存与顾客--相互关联，让你看见成因，而非只看症状。',
  },
  ja: {
    eyebrow: 'つながるシグナル',
    statement: 'すべてのシグナルが、現場全体で*つながる*。',
    lede: '人件費、売上、在庫、来店客--相関づけることで、症状ではなく原因が見えます。',
  },
  ko: {
    eyebrow: '연결된 신호',
    statement: '모든 신호가 운영 전반에서 *서로 연결*됩니다.',
    lede: '인력, 매출, 재고, 고객 - 상관관계로 묶어 증상이 아닌 원인을 보여줍니다.',
  },
  id: {
    eyebrow: 'SINYAL TERHUBUNG',
    statement: 'Setiap sinyal, *terhubung* di seluruh operasi.',
    lede: 'Tenaga kerja, penjualan, inventaris, dan tamu - dikorelasikan agar Anda melihat penyebab, bukan sekadar gejala.',
  },
  vi: {
    eyebrow: 'TIN HIEU KET NOI',
    statement: 'Moi tin hieu, *ket noi* xuyen suot van hanh.',
    lede: 'Nhan su, doanh thu, ton kho va khach - duoc tuong quan de ban thay nguyen nhan, khong chi trieu chung.',
  },
  ro: {
    eyebrow: 'SEMNALE CONECTATE',
    statement: 'Fiecare semnal, *conectat* in toata operatiunea.',
    lede: 'Personal, vanzari, stoc si oaspeti - corelate ca sa vezi cauza, nu doar simptomele.',
  },
  sv: {
    eyebrow: 'KOPPLADE SIGNALER',
    statement: 'Varje signal, *kopplad* genom hela verksamheten.',
    lede: 'Personal, forsaljning, lager och gaster - korrelerade sa att du ser orsaken, inte bara symtomen.',
  },
  bn: {
    eyebrow: 'সংযুক্ত সংকেত',
    statement: 'প্রতিটি সংকেত, পুরো পরিচালনায় *পরস্পর সংযুক্ত*।',
    lede: 'শ্রম, বিক্রি, ইনভেন্টরি আর অতিথি - এমনভাবে সম্পর্কিত যে আপনি কারণ দেখেন, কেবল লক্ষণ নয়।',
  },
  th: {
    eyebrow: 'สัญญาณที่เชื่อมโยง',
    statement: 'ทุกสัญญาณ *เชื่อมโยงกัน* ทั่วทั้งการดำเนินงาน',
    lede: 'แรงงาน ยอดขาย สต็อก และลูกค้า - เชื่อมโยงกันให้คุณเห็นสาเหตุ ไม่ใช่แค่อาการ',
  },
  ms: {
    eyebrow: 'ISYARAT BERHUBUNG',
    statement: 'Setiap isyarat, *berhubung* di seluruh operasi.',
    lede: 'Tenaga kerja, jualan, inventori dan tetamu - dikaitkan supaya anda nampak punca, bukan sekadar gejala.',
  },
};
