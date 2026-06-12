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
      'A restaurant runs on hundreds of decisions a day - on the floor, on the line, and in the middle of the rush. Every one of them deserves *the truth while it can still change the outcome.*',
    coda: 'That belief is the product. Everything Sundae does serves the next decision you’re about to make.',
  },
  ar: {
    eyebrow: 'ما نؤمن به',
    statement:
      'يُدار المطعم بمئات القرارات في اليوم - في الصالة، عند الممر، وفي عزّ الزحمة. كل قرار منها يستحق *الحقيقة ما دام بالإمكان تغيير النتيجة.*',
    coda: 'هذا الإيمان هو المنتج. كل ما يفعله Sundae يخدم القرار التالي الذي توشك على اتخاذه.',
  },
  fr: {
    eyebrow: 'Ce en quoi nous croyons',
    statement:
      'Un restaurant se mène à coups de centaines de décisions par jour - en salle, au passe, et en plein coup de feu. Chacune mérite *la vérité tant que le résultat peut encore changer.*',
    coda: "Cette conviction, c'est le produit. Tout ce que fait Sundae sert la prochaine décision que vous êtes sur le point de prendre.",
  },
  es: {
    eyebrow: 'En lo que creemos',
    statement:
      'Un restaurante se lleva a base de cientos de decisiones al día - en la sala, en el pase, y en plena hora punta. Cada una merece *la verdad mientras todavía puede cambiar el resultado.*',
    coda: 'Esa convicción es el producto. Todo lo que hace Sundae está al servicio de la próxima decisión que estás a punto de tomar.',
  },
  de: {
    eyebrow: 'Woran wir glauben',
    statement:
      'Ein Restaurant läuft auf Hunderten Entscheidungen am Tag - im Gastraum, am Pass, und mitten im größten Andrang. Jede davon verdient *die Wahrheit, solange sich das Ergebnis noch ändern lässt.*',
    coda: 'Diese Überzeugung ist das Produkt. Alles, was Sundae tut, dient der nächsten Entscheidung, die Sie gleich treffen.',
  },
  nl: {
    eyebrow: 'Waar wij in geloven',
    statement:
      'Een restaurant draait op honderden beslissingen per dag - in de zaak, op de pass, en midden in de drukte. Elk daarvan verdient *de waarheid, zolang u de uitkomst nog kunt bijsturen.*',
    coda: 'Die overtuiging ís het product. Alles wat Sundae doet, staat in dienst van de volgende beslissing die u op het punt staat te nemen.',
  },
  pt: {
    eyebrow: 'No que acreditamos',
    statement:
      'Um restaurante se conduz a centenas de decisões por dia - no salão, na expedição, e no auge do movimento. Cada uma merece *a verdade, enquanto ainda dá para mudar o resultado.*',
    coda: 'Essa convicção é o produto. Tudo o que o Sundae faz está a serviço da próxima decisão que você está prestes a tomar.',
  },
  hi: {
    eyebrow: 'हम क्या मानते हैं',
    statement:
      'एक रेस्तरां दिन में सैकड़ों फैसलों पर चलता है - फ्लोर पर, लाइन पर, और भीड़ के बीचों-बीच। उनमें से हर एक हकदार है *सच्चाई का, जब तक नतीजे को अब भी बदला जा सके।*',
    coda: 'यही यकीन प्रोडक्ट है। Sundae जो कुछ भी करता है, वह उस अगले फैसले के लिए है जो आप अभी लेने वाले हैं।',
  },
  ur: {
    eyebrow: 'ہم کس بات پر یقین رکھتے ہیں',
    statement:
      'ایک ریستوران دن میں سیکڑوں فیصلوں پر چلتا ہے - فلور پر، پاس پر، اور رش کے عین بیچ میں۔ اِن میں سے ہر ایک مستحق ہے *سچائی کا، جب تک نتیجے کو ابھی بدلا جا سکے۔*',
    coda: 'یہی یقین پروڈکٹ ہے۔ Sundae جو کچھ بھی کرتا ہے وہ اُس اگلے فیصلے کے لیے ہے جو آپ ابھی کرنے والے ہیں۔',
  },
  it: {
    eyebrow: 'In cosa crediamo',
    statement:
      'Un ristorante si manda avanti a centinaia di decisioni al giorno - in sala, al passe, e nel pieno del servizio. Ognuna merita *la verità, finché il risultato si può ancora cambiare.*',
    coda: "Quella convinzione è il prodotto. Tutto ciò che fa Sundae è al servizio della prossima decisione che stai per prendere.",
  },
  pl: {
    eyebrow: 'W co wierzymy',
    statement:
      'Restauracja działa na setkach decyzji dziennie - na sali, przy wydawce, i w samym środku natłoku. Każda z nich zasługuje na *prawdę, póki wynik można jeszcze zmienić.*',
    coda: 'To przekonanie jest produktem. Wszystko, co robi Sundae, służy kolejnej decyzji, którą masz właśnie podjąć.',
  },
  tr: {
    eyebrow: 'Neye inanıyoruz',
    statement:
      'Bir restoran günde yüzlerce kararla yürür - salonda, pasta, ve yoğunluğun tam ortasında. Her biri *gerçeği hak eder, üstelik sonucu hâlâ değiştirebilecekken.*',
    coda: 'Bu inanç, üründür. Sundae ne yapıyorsa, vermek üzere olduğunuz bir sonraki karar için yapıyor.',
  },
  'zh-Hans': {
    eyebrow: '我们的信念',
    statement:
      '一家餐厅，靠一天数百个决定运转--在餐厅里，在出餐线上，以及在最忙乱的时刻。每一个决定都配得上*趁还来得及改变结果时的那份真相。*',
    coda: '这个信念就是产品。Sundae 所做的一切，都服务于你即将做出的下一个决定。',
  },
  ja: {
    eyebrow: '私たちが信じること',
    statement:
      '店は、一日に何百もの判断で回っている--フロアで、パスで、そしてピークの真っただ中で。その一つひとつが*まだ結果を変えられるうちの、真実*に値する。',
    coda: 'その信念こそが製品です。Sundae が手がけるすべては、あなたがいま下そうとしている次の判断のためにあります。',
  },
  ko: {
    eyebrow: '우리가 믿는 것',
    statement:
      '레스토랑은 하루에 수백 번의 결정으로 돌아갑니다 - 홀에서, 패스에서, 그리고 가장 바쁜 순간 한가운데에서. 그 하나하나가 *아직 결과를 바꿀 수 있을 때의 진실*을 누릴 자격이 있습니다.',
    coda: '그 믿음이 곧 제품입니다. Sundae가 하는 모든 일은 당신이 지금 내리려는 다음 결정을 위한 것입니다.',
  },
  id: {
    eyebrow: 'Yang kami yakini',
    statement:
      'Sebuah restoran berjalan di atas ratusan keputusan sehari - di ruang makan, di pass, dan di tengah jam tersibuk. Setiap keputusan layak mendapat *kebenaran, selagi hasilnya masih bisa diubah.*',
    coda: 'Keyakinan itulah produknya. Semua yang dilakukan Sundae mengabdi pada keputusan berikutnya yang akan Anda ambil.',
  },
  vi: {
    eyebrow: 'Điều chúng tôi tin',
    statement:
      'Một nhà hàng vận hành bằng hàng trăm quyết định mỗi ngày - trên sàn, tại quầy ra món, và ngay giữa lúc cao điểm. Mỗi quyết định đều xứng đáng có *sự thật, khi vẫn còn kịp thay đổi kết quả.*',
    coda: 'Niềm tin đó chính là sản phẩm. Tất cả những gì Sundae làm đều phục vụ cho quyết định tiếp theo mà bạn sắp đưa ra.',
  },
  ro: {
    eyebrow: 'În ce credem',
    statement:
      'Un restaurant merge pe sute de decizii pe zi - în sală, la pass, și în toiul aglomerației. Fiecare merită *adevărul, cât încă mai poți schimba rezultatul.*',
    coda: 'Convingerea aceasta este produsul. Tot ce face Sundae este în slujba următoarei decizii pe care ești pe cale să o iei.',
  },
  sv: {
    eyebrow: 'Det vi tror på',
    statement:
      'En restaurang drivs av hundratals beslut om dagen - i matsalen, vid passet, och mitt i rusningen. Vart och ett av dem förtjänar *sanningen, medan utfallet fortfarande går att ändra.*',
    coda: 'Den övertygelsen är produkten. Allt Sundae gör står i tjänst för nästa beslut du står i begrepp att fatta.',
  },
  bn: {
    eyebrow: 'আমরা যা বিশ্বাস করি',
    statement:
      'একটি রেস্তোরাঁ চলে দিনে শত শত সিদ্ধান্তে - ফ্লোরে, লাইনে, এবং ভিড়ের ঠিক মাঝখানে। এর প্রতিটিই দাবি রাখে *সত্যের, যতক্ষণ ফলাফলটাকে এখনও বদলানো যায়।*',
    coda: 'এই বিশ্বাসটাই পণ্য। Sundae যা কিছু করে, তার সবটাই আপনি এখন যে পরবর্তী সিদ্ধান্তটি নিতে চলেছেন তার সেবায়।',
  },
  th: {
    eyebrow: 'สิ่งที่เราเชื่อ',
    statement:
      'ร้านอาหารขับเคลื่อนด้วยการตัดสินใจหลายร้อยครั้งต่อวัน - ในห้องอาหาร ที่หน้าจ่ายอาหาร และท่ามกลางช่วงที่วุ่นที่สุด ทุกการตัดสินใจสมควรได้รับ *ความจริง ในขณะที่ยังเปลี่ยนผลลัพธ์ได้ทัน*',
    coda: 'ความเชื่อนี้คือตัวผลิตภัณฑ์ ทุกสิ่งที่ Sundae ทำล้วนเพื่อรับใช้การตัดสินใจครั้งถัดไปที่คุณกำลังจะลงมือ',
  },
  ms: {
    eyebrow: 'Apa yang kami percaya',
    statement:
      'Sebuah restoran digerakkan oleh ratusan keputusan sehari - di ruang makan, di pass, dan di kemuncak kesibukan. Setiap satunya berhak mendapat *kebenaran, selagi hasilnya masih boleh diubah.*',
    coda: 'Keyakinan itulah produknya. Segala yang Sundae lakukan adalah demi keputusan seterusnya yang bakal anda buat.',
  },
};
