import type { WebsiteLocale } from '@/lib/i18n';

/**
 * Manifesto copy - the homepage "belief beat" that opens the page in the
 * USHG/category-leader register: a confident, copy-first statement of what
 * Sundae believes, before the product earns its place.
 *
 * Follows the SectionTrustStrip / editorialCopy localization pattern: a
 * locale-keyed map resolved at render with an English fallback, kept out of the
 * large per-locale i18n.ts trees so this self-contained editorial system
 * localizes without touching them (and never trips the qa:translation gate,
 * which validates only the `messages` tree).
 *
 * A single `*…*` span in `statement` renders in warm-coral italic (the same
 * emphasis-marker convention used by creamReliefCopy). Brand name "Sundae" and
 * "P&L" stay untranslated in every locale.
 *
 * Dash house-style (mirrors editorialCopy): Latin/Arabic/Indic/Thai scripts use
 * a spaced ASCII hyphen " - "; CJK (zh-Hans, ja) uses a double ASCII hyphen
 * "--" with no surrounding spaces. No em-dashes anywhere.
 */
export type ManifestoCopy = {
  eyebrow: string;
  /** One `*…*` span renders warm-coral italic. */
  statement: string;
  coda: string;
};

export const manifestoCopy: Record<WebsiteLocale, ManifestoCopy> = {
  en: {
    eyebrow: 'What we believe',
    statement:
      'Lost margin isn’t gone. It’s *recoverable.*',
    coda: 'Food-service doesn’t bleed profit in the month-end report. It bleeds in the moment - a section slows, labor drifts, a supplier creeps, covers fall behind. Sundae catches each leak, hands the fix to a named owner, and measures the margin back - so recovery is proven, not hoped for.',
  },
  ar: {
    eyebrow: 'ما نؤمن به',
    statement: 'الهامش الضائع لم يذهب. إنه *قابل للاسترداد.*',
    coda: 'خدمات الطعام لا تنزف الأرباح في تقرير آخر الشهر. بل تنزفها في اللحظة - قسم يتباطأ، عمالة تنحرف، مورّد يرفع أسعاره بهدوء، وطاولات تتأخر. تلتقط Sundae كل تسرّب، وتُسند الإصلاح إلى مسؤول بالاسم، وتقيس الهامش المستعاد - فالاسترداد مُثبَت لا مُتمنّى.',
  },
  fr: {
    eyebrow: 'Ce en quoi nous croyons',
    statement: "La marge perdue n'a pas disparu. Elle est *récupérable.*",
    coda: "La restauration ne perd pas sa marge dans le rapport de fin de mois. Elle la perd dans l'instant - une zone ralentit, la main-d'œuvre dérive, un fournisseur grignote, les couverts prennent du retard. Sundae repère chaque fuite, confie la correction à un responsable désigné et mesure la marge récupérée - la reprise est prouvée, pas espérée.",
  },
  es: {
    eyebrow: 'En lo que creemos',
    statement: 'El margen perdido no ha desaparecido. Es *recuperable.*',
    coda: 'La hostelería no pierde su margen en el informe de fin de mes. Lo pierde en el momento - una zona se ralentiza, el personal se desajusta, un proveedor sube sin avisar, los comensales se acumulan. Sundae detecta cada fuga, asigna la corrección a un responsable con nombre y mide el margen recuperado - la recuperación queda probada, no esperada.',
  },
  de: {
    eyebrow: 'Woran wir glauben',
    statement: 'Verlorene Marge ist nicht weg. Sie ist *rückgewinnbar.*',
    coda: 'Die Gastronomie verliert ihre Marge nicht im Monatsbericht. Sie verliert sie im Moment - eine Station wird langsamer, der Personaleinsatz driftet, ein Lieferant zieht leise an, die Gedecke geraten in Rückstand. Sundae erkennt jedes Leck, übergibt die Korrektur einer namentlich benannten Person und misst die zurückgeholte Marge - so ist die Erholung belegt, nicht erhofft.',
  },
  nl: {
    eyebrow: 'Waar wij in geloven',
    statement: 'Verloren marge is niet weg. Ze is *terug te halen.*',
    coda: 'De horeca verliest haar marge niet in het maandrapport. Ze verliest die in het moment - een sectie loopt vast, de personeelsinzet verschuift, een leverancier kruipt omhoog, de couverts raken achterop. Sundae vangt elk lek, geeft de correctie aan een aangewezen eigenaar en meet de teruggehaalde marge - zo is het herstel bewezen, niet gehoopt.',
  },
  pt: {
    eyebrow: 'No que acreditamos',
    statement: 'A margem perdida não desapareceu. Ela é *recuperável.*',
    coda: 'A restauração não perde a sua margem no relatório de fim de mês. Perde-a no momento - uma área desacelera, a equipa sai do ritmo, um fornecedor sobe sem avisar, os cobertos atrasam. A Sundae apanha cada fuga, entrega a correção a um responsável com nome e mede a margem recuperada - a recuperação fica provada, não esperada.',
  },
  hi: {
    eyebrow: 'हम क्या मानते हैं',
    statement: 'खोया हुआ मार्जिन गया नहीं। उसे अब भी *वापस पाया जा सकता है।*',
    coda: 'फ़ूड-सर्विस महीने के आख़िर की रिपोर्ट में मुनाफ़ा नहीं गँवाती। वह पल में गँवाती है - कोई सेक्शन धीमा पड़ता है, स्टाफ़ की तैनाती बिगड़ती है, कोई सप्लायर चुपके से दाम बढ़ाता है, मेहमान पिछड़ जाते हैं। Sundae हर रिसाव पकड़ती है, फ़िक्स को एक नामित ज़िम्मेदार को सौंपती है, और वापस आया मार्जिन मापती है - ताकि रिकवरी साबित हो, बस उम्मीद भर न रहे।',
  },
  ur: {
    eyebrow: 'ہم کس بات پر یقین رکھتے ہیں',
    statement: 'ضائع مارجن گیا نہیں۔ اسے اب بھی *واپس پایا جا سکتا ہے۔*',
    coda: 'فوڈ سروس مہینے کے آخر کی رپورٹ میں منافع نہیں گنواتی۔ وہ لمحے میں گنواتی ہے - کوئی سیکشن سست پڑتا ہے، عملے کی تعیناتی بگڑتی ہے، کوئی سپلائر خاموشی سے دام بڑھاتا ہے، مہمان پیچھے رہ جاتے ہیں۔ Sundae ہر رساؤ پکڑتی ہے، اصلاح کو ایک نامزد ذمہ دار کے سپرد کرتی ہے، اور واپس آیا مارجن ناپتی ہے - تاکہ ریکوری ثابت ہو، محض امید نہ رہے۔',
  },
  it: {
    eyebrow: 'In cosa crediamo',
    statement: 'Il margine perduto non è andato. È *recuperabile.*',
    coda: "La ristorazione non perde il suo margine nel report di fine mese. Lo perde nell'attimo - una zona rallenta, il personale perde il ritmo, un fornitore ritocca in silenzio, i coperti restano indietro. Sundae coglie ogni perdita, affida la correzione a un responsabile con nome e cognome e misura il margine recuperato - così il recupero è dimostrato, non solo sperato.",
  },
  pl: {
    eyebrow: 'W co wierzymy',
    statement: 'Utracona marża nie przepadła. Jest *do odzyskania.*',
    coda: 'Gastronomia nie traci marży w raporcie na koniec miesiąca. Traci ją w danej chwili - sektor zwalnia, obsada się rozjeżdża, dostawca po cichu podnosi ceny, kuwerty zostają w tyle. Sundae wychwytuje każdy wyciek, przekazuje korektę wskazanemu z nazwiska właścicielowi i mierzy odzyskaną marżę - odzysk jest udowodniony, nie tylko wyśniony.',
  },
  tr: {
    eyebrow: 'Neye inanıyoruz',
    statement: 'Kaybedilen marj yok olmadı. O *geri kazanılabilir.*',
    coda: 'Yeme-içme sektörü kârını ay sonu raporunda kaybetmez. Onu o anda kaybeder - bir bölge yavaşlar, ekip ritmini kaçırır, bir tedarikçi sessizce zam yapar, masalar geride kalır. Sundae her sızıntıyı yakalar, düzeltmeyi adı belli bir sorumluya verir ve geri kazanılan marjı ölçer - böylece toparlanma umut değil, kanıttır.',
  },
  'zh-Hans': {
    eyebrow: '我们的信念',
    statement: '失去的利润没有消失，它*可以追回。*',
    coda: '餐饮不是在月末报表里流失利润，而是在一个个瞬间里流失--一片区域慢了下来，人力开始漂移，供应商悄悄涨价，客流被甩在后面。Sundae 抓住每一处泄漏，把修复交到一位具名负责人手中，再把追回的利润测量出来--让恢复是被证明的，而不是被指望的。',
  },
  ja: {
    eyebrow: '私たちが信じること',
    statement: '失われた利益は、消えたわけではない。それは*取り戻せる。*',
    coda: '飲食店は、利益を月末の報告書で失うのではない。その一瞬一瞬で失っていく--あるセクションが滞り、人の配置がずれ、仕入先がじわりと値を上げ、客の流れが追いつかない。Sundae はその漏れを一つずつ捉え、名前のある担当者に是正を託し、取り戻した利益を測る--だから回復は、願望ではなく証明になる。',
  },
  ko: {
    eyebrow: '우리가 믿는 것',
    statement: '사라진 마진은 없어진 게 아닙니다. 그것은 *되찾을 수 있습니다.*',
    coda: '외식업은 이익을 월말 보고서에서 잃지 않습니다. 순간순간 잃어갑니다 - 한 구역이 느려지고, 인력 배치가 흐트러지고, 공급업체가 슬그머니 단가를 올리고, 손님이 밀립니다. Sundae는 새는 곳을 하나하나 잡아 지정된 담당자에게 수정을 맡기고, 되찾은 마진을 측정합니다 - 그래서 회복은 바람이 아니라 증명이 됩니다.',
  },
  id: {
    eyebrow: 'Yang kami yakini',
    statement: 'Margin yang hilang belum lenyap. Itu *bisa dipulihkan.*',
    coda: 'Layanan makanan tidak kehilangan margin di laporan akhir bulan. Ia kehilangannya di momen itu - satu area melambat, penempatan staf melenceng, satu pemasok diam-diam menaikkan harga, tamu menumpuk. Sundae menangkap setiap kebocoran, menyerahkan perbaikan ke penanggung jawab bernama, dan mengukur margin yang dipulihkan - jadi pemulihan itu terbukti, bukan sekadar diharapkan.',
  },
  vi: {
    eyebrow: 'Điều chúng tôi tin',
    statement: 'Biên lợi nhuận đã mất chưa biến mất. Nó *có thể thu hồi được.*',
    coda: 'Dịch vụ ăn uống không đánh mất lợi nhuận trong báo cáo cuối tháng. Nó đánh mất ngay trong từng khoảnh khắc - một khu chậm lại, nhân sự lệch nhịp, một nhà cung cấp âm thầm tăng giá, lượt khách tụt lại. Sundae bắt lấy từng chỗ rò rỉ, giao phần khắc phục cho một người phụ trách có tên và đo lại phần biên lợi nhuận thu hồi được - để sự phục hồi được chứng minh, chứ không chỉ trông mong.',
  },
  ro: {
    eyebrow: 'În ce credem',
    statement: 'Marja pierdută nu s-a dus. Este *recuperabilă.*',
    coda: 'HoReCa nu își pierde marja în raportul de la sfârșit de lună. O pierde în moment - o zonă încetinește, echipa se abate de la ritm, un furnizor crește pe tăcute, comenzile rămân în urmă. Sundae prinde fiecare scurgere, dă corecția unui responsabil cu nume și măsoară marja recuperată - astfel redresarea este dovedită, nu doar sperată.',
  },
  sv: {
    eyebrow: 'Det vi tror på',
    statement: 'Förlorad marginal är inte borta. Den är *återvinningsbar.*',
    coda: 'Restaurangbranschen tappar inte sin marginal i månadsrapporten. Den tappar den i ögonblicket - en sektion saktar ner, bemanningen glider, en leverantör kryper uppåt, gästerna hopar sig. Sundae fångar varje läcka, lämnar åtgärden till en namngiven ägare och mäter den återvunna marginalen - så att återhämtningen är bevisad, inte en förhoppning.',
  },
  bn: {
    eyebrow: 'আমরা যা বিশ্বাস করি',
    statement: 'হারানো মার্জিন হারিয়ে যায়নি। তা এখনও *ফিরে পাওয়া যায়।*',
    coda: 'ফুড সার্ভিস মাস-শেষের রিপোর্টে মুনাফা হারায় না। সে হারায় মুহূর্তে - কোনো সেকশন ধীর হয়, কর্মী বিন্যাস এলোমেলো হয়, কোনো সরবরাহকারী চুপিসারে দাম বাড়ায়, অতিথিরা পিছিয়ে পড়ে। Sundae প্রতিটি ছিদ্র ধরে, সংশোধনের ভার একজন নির্দিষ্ট দায়িত্বশীলের হাতে দেয়, আর ফিরে আসা মার্জিন মেপে দেখায় - যাতে পুনরুদ্ধার প্রমাণিত হয়, স্রেফ প্রত্যাশিত নয়।',
  },
  th: {
    eyebrow: 'สิ่งที่เราเชื่อ',
    statement: 'มาร์จินที่หายไปยังไม่สูญ มันยัง*กู้กลับมาได้*',
    coda: 'ธุรกิจบริการอาหารไม่ได้สูญกำไรในรายงานสิ้นเดือน แต่สูญไปในแต่ละช่วงเวลา - โซนหนึ่งเริ่มช้า การจัดคนเริ่มเพี้ยน ซัพพลายเออร์ค่อย ๆ ขยับราคาขึ้น ลูกค้าเริ่มตกค้าง Sundae จับทุกจุดรั่วไหล ส่งการแก้ไขให้ผู้รับผิดชอบที่ระบุชื่อ และวัดมาร์จินที่กู้กลับมาได้ - เพื่อให้การกู้คืนเป็นสิ่งที่พิสูจน์ได้ ไม่ใช่แค่ความหวัง',
  },
  ms: {
    eyebrow: 'Apa yang kami percaya',
    statement: 'Margin yang hilang belum lenyap. Ia *boleh dipulihkan.*',
    coda: 'Perkhidmatan makanan tidak kehilangan margin dalam laporan hujung bulan. Ia kehilangannya pada saat itu - satu kawasan perlahan, penempatan pekerja terpesong, seorang pembekal diam-diam menaikkan harga, tetamu tertangguh. Sundae menangkap setiap kebocoran, menyerahkan pembetulan kepada penanggung jawab bernama, dan mengukur margin yang dipulihkan - jadi pemulihan itu terbukti, bukan sekadar diharapkan.',
  },
};

/** Live "moments" + bridge for the manifesto cinematic redesign (en fallback). */
export type ManifestoMoments = { moments: [string, string, string]; bridge: string };
export const manifestoMoments: Partial<Record<WebsiteLocale, ManifestoMoments>> = {
  en: { moments: ['Covers falling behind', 'Labor crossing target', 'Table wait risk'], bridge: 'Then the signal arrives.' },
  ar: { moments: ['العملاء يتأخرون', 'تكلفة العمالة تتجاوز الحد', 'خطر انتظار الطاولة'], bridge: 'ثم تصل الإشارة.' },
  fr: { moments: ['Couverts en retard', 'Main-d\'œuvre hors cible', 'Risque d\'attente en salle'], bridge: 'Puis le signal arrive.' },
  es: { moments: ['Cubiertos atrasados', 'Personal sobre objetivo', 'Riesgo de espera en mesa'], bridge: 'Entonces llega la señal.' },
  de: { moments: ['Gedecke geraten in Rückstand', 'Personalkosten über Ziel', 'Risiko langer Tischwartezeit'], bridge: 'Dann kommt das Signal.' },
  nl: { moments: ['Couverts lopen achter', 'Loonkosten boven doel', 'Risico op wachttijd'], bridge: 'Dan komt het signaal.' },
  pt: { moments: ['Coberturas atrasadas', 'Mão de obra acima da meta', 'Risco de espera na mesa'], bridge: 'Então o sinal chega.' },
  it: { moments: ['Coperti in ritardo', 'Costo lavoro oltre soglia', 'Rischio attesa al tavolo'], bridge: 'Poi arriva il segnale.' },
  pl: { moments: ['Nakrycia w opóźnieniu', 'Koszt pracy ponad cel', 'Ryzyko czekania przy stoliku'], bridge: 'Wtedy pojawia się sygnał.' },
  ro: { moments: ['Acoperiri în întârziere', 'Cost forță de muncă peste țintă', 'Risc de așteptare la masă'], bridge: 'Apoi sosește semnalul.' },
  sv: { moments: ['Gäster halkar efter', 'Personalkostnad över mål', 'Risk för väntan vid bord'], bridge: 'Sedan kommer signalen.' },
  tr: { moments: ['Kuver hızı düşüyor', 'İşçilik hedefi aşıyor', 'Masa bekleme riski'], bridge: 'Sonra sinyal geliyor.' },
  id: { moments: ['Tamu mulai tertinggal', 'Biaya tenaga kerja lewat target', 'Risiko meja menunggu'], bridge: 'Lalu sinyal pun tiba.' },
  ms: { moments: ['Tetamu semakin tertinggal', 'Kos buruh lepasi sasaran', 'Risiko meja menunggu'], bridge: 'Kemudian isyarat pun tiba.' },
  vi: { moments: ['Lượt khách tụt lại', 'Chi phí nhân công vượt mức', 'Nguy cơ bàn chờ lâu'], bridge: 'Rồi tín hiệu xuất hiện.' },
  hi: { moments: ['मेहमान सेवा पिछड़ रही', 'श्रम लागत लक्ष्य पार', 'टेबल इंतज़ार का जोखिम'], bridge: 'तभी संकेत आता है।' },
  ur: { moments: ['مہمانوں کی رفتار سست', 'مزدوری لاگت حد سے تجاوز', 'میز انتظار کا خطرہ'], bridge: 'پھر اشارہ آ جاتا ہے۔' },
  bn: { moments: ['অতিথি সেবা পিছিয়ে', 'শ্রম ব্যয় লক্ষ্য ছাড়াল', 'টেবিল অপেক্ষার ঝুঁকি'], bridge: 'তখনই সংকেত আসে।' },
  th: { moments: ['ยอดลูกค้าตามไม่ทัน', 'ต้นทุนแรงงานเกินเป้า', 'เสี่ยงโต๊ะรอนาน'], bridge: 'แล้วสัญญาณก็มาถึง' },
  'zh-Hans': { moments: ['客流节奏落后', '人力成本超标', '餐桌等候风险'], bridge: '随后，信号出现。' },
  ja: { moments: ['客数が遅れ気味', '人件費が目標超過', 'テーブル待ちの兆候'], bridge: 'そのとき、シグナルが届く。' },
  ko: { moments: ['손님 응대 지연', '인건비 목표 초과', '테이블 대기 위험'], bridge: '그때 신호가 도착한다.' },
};
