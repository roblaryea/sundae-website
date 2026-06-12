import type { WebsiteLocale } from '@/lib/i18n';

/**
 * Manifesto copy — the homepage "belief beat" that opens the page in the
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
      'A restaurant is decided a hundred times a day — on the floor, on the line, in the middle of the rush. Every one of those calls deserves *the full truth of your business,* fast enough to act on.',
    coda: 'That belief is the whole product. Everything Sundae does is in service of the next decision you are about to make.',
  },
  ar: {
    eyebrow: 'ما نؤمن به',
    statement:
      'يُتَّخذ قرار المطعم مئة مرة في اليوم — في الصالة، عند الممر، في عزّ الزحمة. كل قرار منها يستحق *الحقيقة الكاملة عن عملك،* وبسرعة تكفي للتصرّف.',
    coda: 'هذا الإيمان هو المنتج كله. كل ما يفعله Sundae في خدمة القرار التالي الذي توشك على اتخاذه.',
  },
  fr: {
    eyebrow: 'Ce en quoi nous croyons',
    statement:
      'Un restaurant se décide cent fois par jour — en salle, au passe, en plein coup de feu. Chacune de ces décisions mérite *toute la vérité de votre activité,* assez vite pour agir.',
    coda: "Cette conviction, c'est tout le produit. Tout ce que fait Sundae sert la prochaine décision que vous êtes sur le point de prendre.",
  },
  es: {
    eyebrow: 'En lo que creemos',
    statement:
      'Un restaurante se decide cien veces al día — en la sala, en el pase, en plena hora punta. Cada una de esas decisiones merece *toda la verdad de tu negocio,* a tiempo para actuar.',
    coda: 'Esa convicción es todo el producto. Todo lo que hace Sundae está al servicio de la próxima decisión que estás a punto de tomar.',
  },
  de: {
    eyebrow: 'Woran wir glauben',
    statement:
      'Ein Restaurant wird hundertmal am Tag entschieden — im Gastraum, am Pass, mitten im größten Andrang. Jede dieser Entscheidungen verdient *die ganze Wahrheit über Ihr Geschäft,* schnell genug, um zu handeln.',
    coda: 'Diese Überzeugung ist das ganze Produkt. Alles, was Sundae tut, dient der nächsten Entscheidung, die Sie gleich treffen.',
  },
  nl: {
    eyebrow: 'Waar wij in geloven',
    statement:
      'Een restaurant wordt honderd keer per dag beslist — in de zaak, op de pass, midden in de drukte. Elk van die beslissingen verdient *de volledige waarheid over uw zaak,* snel genoeg om naar te handelen.',
    coda: 'Die overtuiging ís het hele product. Alles wat Sundae doet, staat in dienst van de volgende beslissing die u op het punt staat te nemen.',
  },
  pt: {
    eyebrow: 'No que acreditamos',
    statement:
      'Um restaurante é decidido cem vezes por dia — no salão, na expedição, no auge do movimento. Cada uma dessas decisões merece *toda a verdade do seu negócio,* rápido o bastante para agir.',
    coda: 'Essa convicção é o produto inteiro. Tudo o que o Sundae faz está a serviço da próxima decisão que você está prestes a tomar.',
  },
  hi: {
    eyebrow: 'हम क्या मानते हैं',
    statement:
      'एक रेस्तरां दिन में सौ बार तय होता है — फ्लोर पर, लाइन पर, भीड़ के बीचों-बीच। उनमें से हर फैसला हकदार है *आपके कारोबार की पूरी सच्चाई का,* और इतनी तेज़ी से कि उस पर कदम उठाया जा सके।',
    coda: 'यही यकीन पूरा प्रोडक्ट है। Sundae जो कुछ भी करता है, वह उस अगले फैसले के लिए है जो आप अभी लेने वाले हैं।',
  },
  ur: {
    eyebrow: 'ہم کس بات پر یقین رکھتے ہیں',
    statement:
      'ایک ریستوران دن میں سو بار طے ہوتا ہے — فلور پر، پاس پر، رش کے عین بیچ میں۔ اِن میں سے ہر فیصلہ مستحق ہے *آپ کے کاروبار کی پوری سچائی کا،* اور اِتنی تیزی سے کہ اُس پر عمل کیا جا سکے۔',
    coda: 'یہی یقین پورا پروڈکٹ ہے۔ Sundae جو کچھ بھی کرتا ہے وہ اُس اگلے فیصلے کے لیے ہے جو آپ ابھی کرنے والے ہیں۔',
  },
  it: {
    eyebrow: 'In cosa crediamo',
    statement:
      'Un ristorante si decide cento volte al giorno — in sala, al passe, nel pieno del servizio. Ognuna di quelle scelte merita *tutta la verità del tuo locale,* abbastanza in fretta da poter agire.',
    coda: "Quella convinzione è l'intero prodotto. Tutto ciò che fa Sundae è al servizio della prossima decisione che stai per prendere.",
  },
  pl: {
    eyebrow: 'W co wierzymy',
    statement:
      'O restauracji decyduje się sto razy dziennie — na sali, przy wydawce, w samym środku natłoku. Każda z tych decyzji zasługuje na *całą prawdę o twoim biznesie,* na tyle szybko, by zdążyć zadziałać.',
    coda: 'To przekonanie jest całym produktem. Wszystko, co robi Sundae, służy kolejnej decyzji, którą masz właśnie podjąć.',
  },
  tr: {
    eyebrow: 'Neye inanıyoruz',
    statement:
      'Bir restoran günde yüz kez karara bağlanır — salonda, pasta, yoğunluğun tam ortasında. Bu kararların her biri *işinizin tüm gerçeğini* hak eder, üstelik harekete geçecek kadar hızlı.',
    coda: 'Bu inanç, ürünün tamamıdır. Sundae ne yapıyorsa, vermek üzere olduğunuz bir sonraki karar için yapıyor.',
  },
  'zh-Hans': {
    eyebrow: '我们的信念',
    statement:
      '一家餐厅，一天要做上百次决定——在餐厅里，在出餐线上，在最忙乱的时刻。每一个决定都配得上*你生意的全部真相，*而且要快到来得及付诸行动。',
    coda: '这个信念就是产品的全部。Sundae 所做的一切，都服务于你即将做出的下一个决定。',
  },
  ja: {
    eyebrow: '私たちが信じること',
    statement:
      '店の判断は、一日に百回下される——フロアで、パスで、ピークの真っただ中で。その一つひとつが*ビジネスのすべての真実*に値する。しかも、行動に移せるだけの速さで。',
    coda: 'その信念こそが製品のすべてです。Sundae が手がけるすべては、あなたがいま下そうとしている次の判断のためにあります。',
  },
  ko: {
    eyebrow: '우리가 믿는 것',
    statement:
      '레스토랑은 하루에 백 번 결정됩니다 — 홀에서, 패스에서, 가장 바쁜 순간 한가운데에서. 그 모든 판단은 *당신 비즈니스의 온전한 진실*을 누릴 자격이 있습니다. 그것도 행동에 옮길 만큼 빠르게.',
    coda: '그 믿음이 곧 제품 전부입니다. Sundae가 하는 모든 일은 당신이 지금 내리려는 다음 결정을 위한 것입니다.',
  },
  id: {
    eyebrow: 'Yang kami yakini',
    statement:
      'Sebuah restoran diputuskan seratus kali sehari — di ruang makan, di pass, di tengah jam tersibuk. Setiap keputusan itu layak mendapat *seluruh kebenaran bisnis Anda,* cukup cepat untuk ditindaklanjuti.',
    coda: 'Keyakinan itulah seluruh produknya. Semua yang dilakukan Sundae mengabdi pada keputusan berikutnya yang akan Anda ambil.',
  },
  vi: {
    eyebrow: 'Điều chúng tôi tin',
    statement:
      'Một nhà hàng được định đoạt cả trăm lần mỗi ngày — trên sàn, tại quầy ra món, ngay giữa lúc cao điểm. Mỗi quyết định ấy đều xứng đáng có *toàn bộ sự thật về việc kinh doanh của bạn,* đủ nhanh để kịp hành động.',
    coda: 'Niềm tin đó chính là toàn bộ sản phẩm. Tất cả những gì Sundae làm đều phục vụ cho quyết định tiếp theo mà bạn sắp đưa ra.',
  },
  ro: {
    eyebrow: 'În ce credem',
    statement:
      'Un restaurant se decide de o sută de ori pe zi — în sală, la pass, în toiul aglomerației. Fiecare dintre acele decizii merită *tot adevărul afacerii tale,* destul de repede cât să poți acționa.',
    coda: 'Convingerea aceasta este întregul produs. Tot ce face Sundae este în slujba următoarei decizii pe care ești pe cale să o iei.',
  },
  sv: {
    eyebrow: 'Det vi tror på',
    statement:
      'En restaurang avgörs hundra gånger om dagen — i matsalen, vid passet, mitt i rusningen. Var och en av de besluten förtjänar *hela sanningen om din verksamhet,* snabbt nog att hinna agera på.',
    coda: 'Den övertygelsen är hela produkten. Allt Sundae gör står i tjänst för nästa beslut du står i begrepp att fatta.',
  },
  bn: {
    eyebrow: 'আমরা যা বিশ্বাস করি',
    statement:
      'একটি রেস্তোরাঁ দিনে শতবার নির্ধারিত হয় — ফ্লোরে, লাইনে, ভিড়ের ঠিক মাঝখানে। সেই প্রতিটি সিদ্ধান্তই দাবি রাখে *আপনার ব্যবসার সম্পূর্ণ সত্যের,* আর তা এতটাই দ্রুত যাতে পদক্ষেপ নেওয়া যায়।',
    coda: 'এই বিশ্বাসটাই গোটা পণ্য। Sundae যা কিছু করে, তার সবটাই আপনি এখন যে পরবর্তী সিদ্ধান্তটি নিতে চলেছেন তার সেবায়।',
  },
  th: {
    eyebrow: 'สิ่งที่เราเชื่อ',
    statement:
      'ร้านอาหารถูกตัดสินเป็นร้อยครั้งต่อวัน — ในห้องอาหาร ที่หน้าจ่ายอาหาร ท่ามกลางช่วงที่วุ่นที่สุด ทุกการตัดสินใจเหล่านั้นสมควรได้รับ *ความจริงทั้งหมดของธุรกิจคุณ* และเร็วพอที่จะลงมือทำได้ทัน',
    coda: 'ความเชื่อนี้คือตัวผลิตภัณฑ์ทั้งหมด ทุกสิ่งที่ Sundae ทำล้วนเพื่อรับใช้การตัดสินใจครั้งถัดไปที่คุณกำลังจะลงมือ',
  },
  ms: {
    eyebrow: 'Apa yang kami percaya',
    statement:
      'Sebuah restoran diputuskan seratus kali sehari — di ruang makan, di pass, di kemuncak kesibukan. Setiap keputusan itu berhak mendapat *seluruh kebenaran perniagaan anda,* cukup pantas untuk ditindak.',
    coda: 'Keyakinan itulah keseluruhan produknya. Segala yang Sundae lakukan adalah demi keputusan seterusnya yang bakal anda buat.',
  },
};
