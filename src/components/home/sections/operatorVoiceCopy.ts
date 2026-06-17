import type { WebsiteLocale } from '@/lib/i18n';

/**
 * Operator-voice copy - the homepage's human-presence beat.
 *
 * Premium hospitality sites (USHG, the best Squarespace restaurant templates)
 * lead with PEOPLE, not product spectacle. Sundae's product sections are UI +
 * copy; this section puts a real face on the page and speaks in the operator's
 * own voice about the problem we obsess over.
 *
 * IMPORTANT - this is deliberately NOT a fabricated named testimonial. Per the
 * standing product decision, attributed operator quotes wait for a named pilot
 * who agrees to attribution (see the homepage Section-7 composite-quote policy).
 * Until then this is an honest second-person empathy beat ("what we hear on
 * every floor"), which reads premium without inventing a customer.
 *
 * Same localization pattern as manifestoCopy/SectionTrustStrip: locale-keyed map
 * with an English fallback, outside the validated `messages` tree. A single
 * `*…*` span in `quote` renders warm-coral.
 */
export type OperatorVoiceCopy = {
  eyebrow: string;
  /** One `*…*` span renders in warm-coral. */
  quote: string;
  resolution: string;
  attribution: string;
  cta: string;
  /** Alt text for the portrait. */
  alt: string;
};

export const operatorVoiceCopy: Record<WebsiteLocale, OperatorVoiceCopy> = {
  en: {
    eyebrow: 'Instinct, backed by evidence',
    quote:
      'You can feel the night turning by 7:15 - the covers, the pace, the table that’s been sitting too long. *The best operators trust that instinct. Sundae hands it the numbers, live.*',
    resolution:
      'Every read you have about the floor — confirmed or corrected the moment it matters — so you’re acting on evidence, not just a hunch.',
    attribution: 'What we hear on every floor we build for',
    cta: 'See how it works',
    alt: 'A server attending guests in a warmly lit dining room during evening service',
  },
  ar: {
    eyebrow: 'حدس، تسنده الأرقام',
    quote:
      'تشعر بأن الليلة تتبدّل عند السابعة وربع - الضيوف، الإيقاع، الطاولة التي طال جلوسها أكثر من اللازم. *أفضل المشغّلين يثقون بهذا الحدس. وSundae يمنحه الأرقام، لحظةً بلحظة.*',
    resolution:
      'كل قراءة لديك عن الصالة — تُؤكَّد أو تُصحَّح في اللحظة التي تهمّ — لتتصرّف بناءً على دليل، لا مجرّد حدس.',
    attribution: 'ما نسمعه في كل صالة نبني لأجلها',
    cta: 'شاهد كيف يعمل',
    alt: 'نادل يعتني بالضيوف في صالة طعام دافئة الإضاءة أثناء خدمة المساء',
  },
  fr: {
    eyebrow: "L'instinct, prouvé par les chiffres",
    quote:
      "Vous sentez la soirée basculer dès 19 h 15 - les couverts, la cadence, la table qui s'éternise un peu trop. *Les meilleurs opérateurs se fient à cet instinct. Sundae lui donne les chiffres, en direct.*",
    resolution:
      "Chaque intuition que vous avez sur la salle — confirmée ou corrigée au moment qui compte — pour agir sur des preuves, pas sur un simple pressentiment.",
    attribution: 'Ce que nous entendons dans chaque salle pour laquelle nous concevons',
    cta: 'Voir comment ça marche',
    alt: "Un serveur s’occupant des convives dans une salle à la lumière chaleureuse pendant le service du soir",
  },
  es: {
    eyebrow: 'Instinto, respaldado por datos',
    quote:
      'Sientes que la noche cambia a las 7:15 - los comensales, el ritmo, la mesa que lleva sentada demasiado tiempo. *Los mejores operadores confían en ese instinto. Sundae le da los números, en vivo.*',
    resolution:
      'Cada lectura que tienes de la sala — confirmada o corregida en el momento que importa — para que actúes con evidencia, no solo con una corazonada.',
    attribution: 'Lo que escuchamos en cada sala para la que construimos',
    cta: 'Ver cómo funciona',
    alt: 'Un camarero atendiendo a los comensales en una sala de luz cálida durante el servicio de la noche',
  },
  de: {
    eyebrow: 'Bauchgefühl, mit Zahlen belegt',
    quote:
      'Sie spüren schon um 19:15 Uhr, wie der Abend kippt - die Gedecke, das Tempo, der Tisch, der schon zu lange sitzt. *Die besten Betreiber vertrauen diesem Bauchgefühl. Sundae liefert ihm die Zahlen, live.*',
    resolution:
      'Jede Einschätzung, die Sie zum Gastraum haben — bestätigt oder korrigiert im entscheidenden Moment — damit Sie auf Fakten handeln, nicht auf ein Bauchgefühl.',
    attribution: 'Was wir in jedem Gastraum hören, für den wir bauen',
    cta: 'So funktioniert es',
    alt: 'Ein Kellner kümmert sich um die Gäste in einem warm beleuchteten Gastraum während des Abendservice',
  },
  nl: {
    eyebrow: 'Gevoel, gestaafd met cijfers',
    quote:
      'U voelt de avond al om 19.15 uur kantelen - de gasten, het tempo, de tafel die al te lang blijft zitten. *De beste operators vertrouwen op dat gevoel. Sundae geeft het de cijfers, live.*',
    resolution:
      'Elke inschatting die u van de zaal hebt — bevestigd of bijgesteld op het moment dat het telt — zodat u handelt op bewijs, niet op onderbuikgevoel.',
    attribution: 'Wat we horen op elke vloer waarvoor we bouwen',
    cta: 'Zie hoe het werkt',
    alt: 'Een ober bedient gasten in een warm verlichte eetzaal tijdens de avondservice',
  },
  pt: {
    eyebrow: 'Instinto, comprovado por números',
    quote:
      'Você sente a noite virar lá pelas 19h15 - os clientes, o ritmo, a mesa que está sentada tempo demais. *Os melhores operadores confiam nesse instinto. O Sundae lhe dá os números, ao vivo.*',
    resolution:
      'Cada leitura que você tem do salão — confirmada ou corrigida no momento que importa — para agir com base em evidências, não só num palpite.',
    attribution: 'O que ouvimos em cada salão para o qual construímos',
    cta: 'Veja como funciona',
    alt: 'Um garçom atendendo os clientes em um salão de luz acolhedora durante o serviço da noite',
  },
  hi: {
    eyebrow: 'सहज समझ, आँकड़ों से पुष्ट',
    quote:
      'शाम 7:15 तक ही आप महसूस कर लेते हैं कि रात किस ओर मुड़ रही है - मेहमान, रफ्तार, वह मेज़ जो बहुत देर से बैठी है। *बेहतरीन ऑपरेटर इस सहज समझ पर भरोसा करते हैं। Sundae उसे आँकड़े देता है, लाइव।*',
    resolution:
      'फ्लोर को लेकर आपकी हर समझ — ठीक उसी पल पुष्ट या दुरुस्त, जब वह मायने रखती है — ताकि आप अनुमान पर नहीं, सबूत पर कदम उठाएँ।',
    attribution: 'हर उस फ्लोर पर जो हम बनाते हैं, हमें यही सुनने को मिलता है',
    cta: 'देखें यह कैसे काम करता है',
    alt: 'शाम की सर्विस के दौरान गर्म रोशनी से भरे डाइनिंग हॉल में मेहमानों की सेवा करता वेटर',
  },
  ur: {
    eyebrow: 'حسِّ، اعداد سے ثابت',
    quote:
      'شام 7:15 تک ہی آپ محسوس کر لیتے ہیں کہ رات کس طرف مڑ رہی ہے - مہمان، رفتار، وہ میز جو بہت دیر سے بیٹھی ہے۔ *بہترین آپریٹرز اِسی حِس پر بھروسا کرتے ہیں۔ Sundae اُسے اعداد دیتا ہے، لائیو۔*',
    resolution:
      'فلور کے بارے میں آپ کی ہر پرکھ — عین اُسی لمحے تصدیق یا درستی، جب وہ اہم ہو — تاکہ آپ اندازے پر نہیں، ثبوت پر عمل کریں۔',
    attribution: 'ہر اُس فلور پر جس کے لیے ہم بناتے ہیں، ہمیں یہی سننے کو ملتا ہے',
    cta: 'دیکھیں یہ کیسے کام کرتا ہے',
    alt: 'شام کی سروس کے دوران گرم روشنی والے ڈائننگ ہال میں مہمانوں کی خدمت کرتا ویٹر',
  },
  it: {
    eyebrow: "L'istinto, confermato dai numeri",
    quote:
      "Senti la serata cambiare già alle 19:15 - i coperti, il ritmo, il tavolo che resta seduto troppo a lungo. *I migliori operatori si fidano di quell'istinto. Sundae gli dà i numeri, in diretta.*",
    resolution:
      "Ogni lettura che hai della sala — confermata o corretta nel momento che conta — così agisci sui dati, non solo su una sensazione.",
    attribution: 'Quello che sentiamo in ogni sala per cui costruiamo',
    cta: 'Scopri come funziona',
    alt: 'Un cameriere che si occupa degli ospiti in una sala dalla luce calda durante il servizio serale',
  },
  pl: {
    eyebrow: 'Instynkt poparty liczbami',
    quote:
      'Już o 19:15 czujesz, jak wieczór się przechyla - goście, tempo, stolik, który siedzi za długo. *Najlepsi operatorzy ufają temu instynktowi. Sundae daje mu liczby, na żywo.*',
    resolution:
      'Każde twoje wyczucie sali — potwierdzone lub skorygowane w decydującym momencie — byś działał na dowodach, nie na przeczuciu.',
    attribution: 'To, co słyszymy na każdej sali, dla której budujemy',
    cta: 'Zobacz, jak to działa',
    alt: 'Kelner obsługujący gości w ciepło oświetlonej sali podczas wieczornego serwisu',
  },
  tr: {
    eyebrow: 'Sezgi, rakamlarla desteklenir',
    quote:
      'Akşamın nasıl döndüğünü daha 19.15’te hissedersiniz - misafirler, tempo, fazla uzun oturan masa. *En iyi işletmeciler bu sezgiye güvenir. Sundae ona rakamları canlı olarak verir.*',
    resolution:
      'Salona dair her sezginiz — önemli olduğu anda doğrulanır ya da düzeltilir — böylece sezgiyle değil, kanıtla hareket edersiniz.',
    attribution: 'İçin tasarladığımız her salonda duyduğumuz şey',
    cta: 'Nasıl çalıştığını görün',
    alt: 'Akşam servisi sırasında sıcak ışıklı bir salonda misafirlerle ilgilenen bir garson',
  },
  'zh-Hans': {
    eyebrow: '直觉，有数据撑腰',
    quote:
      '七点一刻，你就能感觉到这一夜在往哪儿走--客人、节奏、那张坐得太久的桌子。*最出色的经营者相信这种直觉。Sundae 实时为它配上数字。*',
    resolution:
      '你对前厅的每一个判断，都在关键时刻被印证或修正——让你凭证据行动，而不只是凭直觉。',
    attribution: '在我们服务的每一家餐厅，我们听到的都是这句话',
    cta: '看看它如何运作',
    alt: '晚市服务期间，一位服务员在暖光的餐厅里招呼着客人',
  },
  ja: {
    eyebrow: '勘を、数字で裏づける',
    quote:
      '夜の流れがどう変わるかは、19時15分にはもう感じ取れます--客数、ペース、長く居すぎているあのテーブル。*優れた経営者はその勘を信じます。Sundae はそこへ数字を、リアルタイムで添えます。*',
    resolution:
      '客席についてのあなたの読みは、肝心な瞬間に裏づけられ、あるいは正される——だから勘ではなく、根拠で動ける。',
    attribution: '私たちがつくるすべての現場で耳にする声',
    cta: '仕組みを見る',
    alt: '夜の営業中、温かな灯りのダイニングで客をもてなすホールスタッフ',
  },
  ko: {
    eyebrow: '직감을 숫자로 뒷받침',
    quote:
      '저녁 7시 15분이면 오늘 밤이 어디로 흘러가는지 벌써 느껴집니다 - 손님 수, 흐름, 너무 오래 앉아 있는 저 테이블. *뛰어난 운영자는 그 직감을 믿습니다. Sundae가 거기에 숫자를 실시간으로 더합니다.*',
    resolution:
      '홀에 대한 당신의 모든 판단이 결정적인 순간에 확인되거나 바로잡힙니다 — 그래서 직감이 아니라 근거로 움직이게 됩니다.',
    attribution: '우리가 만드는 모든 매장에서 듣는 이야기',
    cta: '어떻게 작동하는지 보기',
    alt: '저녁 영업 중 따뜻한 조명의 홀에서 손님을 응대하는 서버',
  },
  id: {
    eyebrow: 'Insting, didukung angka',
    quote:
      'Pukul 7.15 malam Anda sudah bisa merasakan ke mana malam ini bergerak - jumlah tamu, tempo, meja yang terlalu lama terisi. *Operator terbaik percaya pada insting itu. Sundae memberinya angka, secara langsung.*',
    resolution:
      'Setiap penilaian Anda tentang ruang makan — dikonfirmasi atau dikoreksi pada saat yang menentukan — agar Anda bertindak atas bukti, bukan sekadar firasat.',
    attribution: 'Yang kami dengar di setiap ruang yang kami bangun untuknya',
    cta: 'Lihat cara kerjanya',
    alt: 'Seorang pramusaji melayani tamu di ruang makan berpencahayaan hangat saat layanan malam',
  },
  vi: {
    eyebrow: 'Trực giác, được số liệu chứng thực',
    quote:
      'Mới 7 giờ 15 tối bạn đã cảm nhận được buổi tối đang ngả về đâu - lượt khách, nhịp độ, cái bàn ngồi quá lâu. *Những nhà điều hành giỏi nhất tin vào trực giác đó. Sundae trao cho nó những con số, theo thời gian thực.*',
    resolution:
      'Mọi cảm nhận của bạn về khu phục vụ — được xác nhận hoặc điều chỉnh đúng lúc quan trọng — để bạn hành động dựa trên bằng chứng, không chỉ là linh cảm.',
    attribution: 'Điều chúng tôi nghe thấy ở mọi sàn phục vụ mà chúng tôi xây dựng cho',
    cta: 'Xem cách hoạt động',
    alt: 'Một nhân viên phục vụ chăm sóc khách trong phòng ăn ấm áp ánh đèn vào giờ phục vụ buổi tối',
  },
  ro: {
    eyebrow: 'Instinctul, confirmat de cifre',
    quote:
      'Simți încotro o ia seara încă de la 19:15 - clienții, ritmul, masa care stă prea mult. *Cei mai buni operatori se încred în acel instinct. Sundae îi dă cifrele, în timp real.*',
    resolution:
      'Fiecare impresie pe care o ai despre sală — confirmată sau corectată în momentul care contează — ca să acționezi pe dovezi, nu doar pe o intuiție.',
    attribution: 'Ce auzim în fiecare sală pentru care construim',
    cta: 'Vezi cum funcționează',
    alt: 'Un ospătar având grijă de oaspeți într-o sală cu lumină caldă în timpul serviciului de seară',
  },
  sv: {
    eyebrow: 'Magkänsla, styrkt av siffror',
    quote:
      'Du känner redan vid 19:15 vart kvällen är på väg - gästerna, tempot, bordet som sitter för länge. *De bästa operatörerna litar på den magkänslan. Sundae ger den siffrorna, live.*',
    resolution:
      'Varje känsla du har om matsalen — bekräftad eller korrigerad i det ögonblick det gäller — så att du agerar på fakta, inte bara en aning.',
    attribution: 'Det vi hör i varje matsal vi bygger för',
    cta: 'Se hur det fungerar',
    alt: 'En servitör tar hand om gästerna i en varmt upplyst matsal under kvällsserveringen',
  },
  bn: {
    eyebrow: 'সহজাত বোধ, সংখ্যায় সমর্থিত',
    quote:
      'সন্ধ্যা ৭টা ১৫-তেই আপনি টের পান রাতটা কোন দিকে গড়াচ্ছে - অতিথির সংখ্যা, গতি, যে টেবিলটা অনেকক্ষণ ধরে বসে আছে। *সেরা অপারেটররা সেই সহজাত বোধে আস্থা রাখেন। Sundae তাতে সংখ্যা জোগায়, লাইভ।*',
    resolution:
      'ফ্লোর নিয়ে আপনার প্রতিটি ধারণা — ঠিক যে মুহূর্তে তা জরুরি, তখনই নিশ্চিত বা সংশোধিত — যাতে আপনি অনুমান নয়, প্রমাণের ভিত্তিতে পদক্ষেপ নেন।',
    attribution: 'আমরা যে প্রতিটি ফ্লোরের জন্য তৈরি করি, সেখানেই আমরা এটা শুনি',
    cta: 'দেখুন কীভাবে কাজ করে',
    alt: 'সন্ধ্যার পরিবেশনের সময় উষ্ণ আলোয় ভরা ডাইনিং হলে অতিথিদের সেবা করছেন একজন ওয়েটার',
  },
  th: {
    eyebrow: 'สัญชาตญาณ ที่มีตัวเลขหนุนหลัง',
    quote:
      'แค่หนึ่งทุ่มสิบห้าคุณก็สัมผัสได้แล้วว่าค่ำคืนนี้กำลังไปทางไหน - จำนวนลูกค้า จังหวะ โต๊ะที่นั่งนานเกินไป *ผู้บริหารร้านที่เก่งที่สุดเชื่อสัญชาตญาณนั้น Sundae เติมตัวเลขให้แบบเรียลไทม์*',
    resolution:
      'ทุกความรู้สึกที่คุณมีต่อหน้าร้าน ได้รับการยืนยันหรือแก้ไขในจังหวะที่สำคัญ เพื่อให้คุณตัดสินใจด้วยหลักฐาน ไม่ใช่แค่ลางสังหรณ์',
    attribution: 'สิ่งที่เราได้ยินในทุกพื้นที่บริการที่เราสร้างให้',
    cta: 'ดูว่าทำงานอย่างไร',
    alt: 'พนักงานเสิร์ฟกำลังดูแลลูกค้าในห้องอาหารที่มีแสงไฟอบอุ่นระหว่างบริการมื้อค่ำ',
  },
  ms: {
    eyebrow: 'Naluri, disokong angka',
    quote:
      'Pada pukul 7.15 malam pun anda sudah dapat merasai ke mana malam ini menuju - tetamu, rentak, meja yang duduk terlalu lama. *Operator terbaik mempercayai naluri itu. Sundae memberinya angka, secara langsung.*',
    resolution:
      'Setiap bacaan anda tentang ruang makan — disahkan atau diperbetulkan pada saat yang penting — supaya anda bertindak atas bukti, bukan sekadar gerak hati.',
    attribution: 'Apa yang kami dengar di setiap ruang yang kami bina untuknya',
    cta: 'Lihat cara ia berfungsi',
    alt: 'Seorang pelayan melayani tetamu di ruang makan bercahaya hangat semasa servis malam',
  },
};
