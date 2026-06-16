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
    eyebrow: 'The problem we obsess over',
    quote:
      'You can feel the night turning by 7:15 - the covers, the pace, the table that’s been sitting too long. *But the numbers that prove it usually arrive the next morning.*',
    resolution:
      'Sundae closes that gap. The signal you need arrives while the shift is still yours to change - not buried in tomorrow’s report.',
    attribution: 'What we hear on every floor we build for',
    cta: 'See how it works',
    alt: 'A server attending guests in a warmly lit dining room during evening service',
  },
  ar: {
    eyebrow: 'المشكلة التي تشغلنا',
    quote:
      'تشعر بأن الليلة تتبدّل عند السابعة وربع - الضيوف، الإيقاع، الطاولة التي طال جلوسها أكثر من اللازم. *لكن الأرقام التي تُثبت ذلك عادةً ما تصل في صباح اليوم التالي.*',
    resolution:
      'يسدّ Sundae هذه الفجوة. تصلك الإشارة التي تحتاجها والوردية لا تزال قابلة للإنقاذ - لا مدفونةً في تقرير الغد.',
    attribution: 'ما نسمعه في كل صالة نبني لأجلها',
    cta: 'شاهد كيف يعمل',
    alt: 'نادل يعتني بالضيوف في صالة طعام دافئة الإضاءة أثناء خدمة المساء',
  },
  fr: {
    eyebrow: 'Le problème qui nous obsède',
    quote:
      "Vous sentez la soirée basculer dès 19 h 15 - les couverts, la cadence, la table qui s'éternise un peu trop. *Mais les chiffres qui le confirment n'arrivent en général que le lendemain matin.*",
    resolution:
      "Sundae comble cet écart. Le signal dont vous avez besoin arrive tant que le service peut encore être sauvé - pas enfoui dans le rapport du lendemain.",
    attribution: 'Ce que nous entendons dans chaque salle pour laquelle nous concevons',
    cta: 'Voir comment ça marche',
    alt: "Un serveur s’occupant des convives dans une salle à la lumière chaleureuse pendant le service du soir",
  },
  es: {
    eyebrow: 'El problema que nos obsesiona',
    quote:
      'Sientes que la noche cambia a las 7:15 - los comensales, el ritmo, la mesa que lleva sentada demasiado tiempo. *Pero los números que lo confirman suelen llegar a la mañana siguiente.*',
    resolution:
      'Sundae cierra esa brecha. La señal que necesitas llega cuando todavía puedes cambiar el turno - no enterrada en el informe de mañana.',
    attribution: 'Lo que escuchamos en cada sala para la que construimos',
    cta: 'Ver cómo funciona',
    alt: 'Un camarero atendiendo a los comensales en una sala de luz cálida durante el servicio de la noche',
  },
  de: {
    eyebrow: 'Das Problem, das uns nicht loslässt',
    quote:
      'Sie spüren schon um 19:15 Uhr, wie der Abend kippt - die Gedecke, das Tempo, der Tisch, der schon zu lange sitzt. *Doch die Zahlen, die es belegen, kommen meist erst am nächsten Morgen.*',
    resolution:
      'Sundae schließt diese Lücke. Das Signal, das Sie brauchen, kommt, solange die Schicht noch zu drehen ist - nicht vergraben im Bericht von morgen.',
    attribution: 'Was wir in jedem Gastraum hören, für den wir bauen',
    cta: 'So funktioniert es',
    alt: 'Ein Kellner kümmert sich um die Gäste in einem warm beleuchteten Gastraum während des Abendservice',
  },
  nl: {
    eyebrow: 'Het probleem waar wij van wakker liggen',
    quote:
      'U voelt de avond al om 19.15 uur kantelen - de gasten, het tempo, de tafel die al te lang blijft zitten. *Maar de cijfers die het bewijzen komen meestal pas de volgende ochtend.*',
    resolution:
      'Sundae dicht dat gat. Het signaal dat u nodig hebt komt terwijl u de dienst nog kunt bijsturen - niet begraven in het rapport van morgen.',
    attribution: 'Wat we horen op elke vloer waarvoor we bouwen',
    cta: 'Zie hoe het werkt',
    alt: 'Een ober bedient gasten in een warm verlichte eetzaal tijdens de avondservice',
  },
  pt: {
    eyebrow: 'O problema que nos obceca',
    quote:
      'Você sente a noite virar lá pelas 19h15 - os clientes, o ritmo, a mesa que está sentada tempo demais. *Mas os números que comprovam isso costumam chegar só na manhã seguinte.*',
    resolution:
      'O Sundae fecha essa lacuna. O sinal de que você precisa chega enquanto o turno ainda é seu para mudar - não enterrado no relatório de amanhã.',
    attribution: 'O que ouvimos em cada salão para o qual construímos',
    cta: 'Veja como funciona',
    alt: 'Um garçom atendendo os clientes em um salão de luz acolhedora durante o serviço da noite',
  },
  hi: {
    eyebrow: 'वह समस्या जो हमें चैन नहीं लेने देती',
    quote:
      'शाम 7:15 तक ही आप महसूस कर लेते हैं कि रात किस ओर मुड़ रही है - मेहमान, रफ्तार, वह मेज़ जो बहुत देर से बैठी है। *पर जो आँकड़े इसे साबित करते हैं, वे आमतौर पर अगली सुबह ही हाथ लगते हैं।*',
    resolution:
      'Sundae इस फासले को पाट देता है। जिस संकेत की आपको ज़रूरत है वह तभी आ जाता है जब शिफ्ट अब भी आपके हाथ में होती है - कल की रिपोर्ट में दबा हुआ नहीं।',
    attribution: 'हर उस फ्लोर पर जो हम बनाते हैं, हमें यही सुनने को मिलता है',
    cta: 'देखें यह कैसे काम करता है',
    alt: 'शाम की सर्विस के दौरान गर्म रोशनी से भरे डाइनिंग हॉल में मेहमानों की सेवा करता वेटर',
  },
  ur: {
    eyebrow: 'وہ مسئلہ جو ہمیں چین نہیں لینے دیتا',
    quote:
      'شام 7:15 تک ہی آپ محسوس کر لیتے ہیں کہ رات کس طرف مڑ رہی ہے - مہمان، رفتار، وہ میز جو بہت دیر سے بیٹھی ہے۔ *مگر جو اعداد و شمار اِسے ثابت کرتے ہیں، وہ عموماً اگلی صبح ہی ہاتھ آتے ہیں۔*',
    resolution:
      'Sundae اِس خلا کو پُر کر دیتا ہے۔ جس اشارے کی آپ کو ضرورت ہے وہ اُسی وقت آ جاتا ہے جب شفٹ ابھی آپ کے ہاتھ میں ہوتی ہے - کل کی رپورٹ میں دبا ہوا نہیں۔',
    attribution: 'ہر اُس فلور پر جس کے لیے ہم بناتے ہیں، ہمیں یہی سننے کو ملتا ہے',
    cta: 'دیکھیں یہ کیسے کام کرتا ہے',
    alt: 'شام کی سروس کے دوران گرم روشنی والے ڈائننگ ہال میں مہمانوں کی خدمت کرتا ویٹر',
  },
  it: {
    eyebrow: "Il problema che ci ossessiona",
    quote:
      "Senti la serata cambiare già alle 19:15 - i coperti, il ritmo, il tavolo che resta seduto troppo a lungo. *Ma i numeri che lo dimostrano di solito arrivano solo la mattina dopo.*",
    resolution:
      "Sundae colma questo divario. Il segnale che ti serve arriva quando il servizio è ancora tuo da cambiare - non sepolto nel report di domani.",
    attribution: 'Quello che sentiamo in ogni sala per cui costruiamo',
    cta: 'Scopri come funziona',
    alt: 'Un cameriere che si occupa degli ospiti in una sala dalla luce calda durante il servizio serale',
  },
  pl: {
    eyebrow: 'Problem, który nie daje nam spokoju',
    quote:
      'Już o 19:15 czujesz, jak wieczór się przechyla - goście, tempo, stolik, który siedzi za długo. *Ale liczby, które to potwierdzają, zwykle docierają dopiero następnego ranka.*',
    resolution:
      'Sundae domyka tę lukę. Sygnał, którego potrzebujesz, przychodzi, póki zmianę wciąż możesz odmienić - a nie pogrzebany w jutrzejszym raporcie.',
    attribution: 'To, co słyszymy na każdej sali, dla której budujemy',
    cta: 'Zobacz, jak to działa',
    alt: 'Kelner obsługujący gości w ciepło oświetlonej sali podczas wieczornego serwisu',
  },
  tr: {
    eyebrow: 'Bizi rahat bırakmayan sorun',
    quote:
      'Akşamın nasıl döndüğünü daha 19.15’te hissedersiniz - misafirler, tempo, fazla uzun oturan masa. *Ama bunu kanıtlayan rakamlar genellikle ancak ertesi sabah elinize geçer.*',
    resolution:
      'Sundae bu boşluğu kapatır. İhtiyacınız olan sinyal, vardiya hâlâ sizin elinizdeyken gelir - yarının raporuna gömülü değil.',
    attribution: 'İçin tasarladığımız her salonda duyduğumuz şey',
    cta: 'Nasıl çalıştığını görün',
    alt: 'Akşam servisi sırasında sıcak ışıklı bir salonda misafirlerle ilgilenen bir garson',
  },
  'zh-Hans': {
    eyebrow: '我们念念不忘的难题',
    quote:
      '七点一刻，你就能感觉到这一夜在往哪儿走--客人、节奏、那张坐得太久的桌子。*可证明这一切的数字，往往要到第二天早上才送到你手里。*',
    resolution:
      'Sundae 填平了这道鸿沟。你需要的信号在班次还来得及调整时就送到--而不是埋在明天的报表里。',
    attribution: '在我们服务的每一家餐厅，我们听到的都是这句话',
    cta: '看看它如何运作',
    alt: '晚市服务期间，一位服务员在暖光的餐厅里招呼着客人',
  },
  ja: {
    eyebrow: '私たちがこだわり続ける課題',
    quote:
      '夜の流れがどう変わるかは、19時15分にはもう感じ取れます--客数、ペース、長く居すぎているあのテーブル。*けれど、それを裏づける数字が手元に届くのは、たいてい翌朝になってからです。*',
    resolution:
      'Sundae はそのギャップを埋めます。必要なシグナルは、まだそのシフトを変えられるうちに届く--明日のレポートに埋もれてしまうのではなく。',
    attribution: '私たちがつくるすべての現場で耳にする声',
    cta: '仕組みを見る',
    alt: '夜の営業中、温かな灯りのダイニングで客をもてなすホールスタッフ',
  },
  ko: {
    eyebrow: '우리가 끈질기게 파고드는 문제',
    quote:
      '저녁 7시 15분이면 오늘 밤이 어디로 흘러가는지 벌써 느껴집니다 - 손님 수, 흐름, 너무 오래 앉아 있는 저 테이블. *하지만 그것을 증명할 숫자는 보통 다음 날 아침에야 손에 들어옵니다.*',
    resolution:
      'Sundae는 그 간극을 메웁니다. 필요한 신호가 아직 근무를 바꿀 수 있을 때 도착합니다 - 내일 보고서에 묻혀 버리는 게 아니라.',
    attribution: '우리가 만드는 모든 매장에서 듣는 이야기',
    cta: '어떻게 작동하는지 보기',
    alt: '저녁 영업 중 따뜻한 조명의 홀에서 손님을 응대하는 서버',
  },
  id: {
    eyebrow: 'Masalah yang terus kami pikirkan',
    quote:
      'Pukul 7.15 malam Anda sudah bisa merasakan ke mana malam ini bergerak - jumlah tamu, tempo, meja yang terlalu lama terisi. *Tapi angka yang membuktikannya biasanya baru tiba keesokan paginya.*',
    resolution:
      'Sundae menutup jurang itu. Sinyal yang Anda butuhkan tiba selagi shift masih bisa Anda ubah - bukan terkubur dalam laporan esok hari.',
    attribution: 'Yang kami dengar di setiap ruang yang kami bangun untuknya',
    cta: 'Lihat cara kerjanya',
    alt: 'Seorang pramusaji melayani tamu di ruang makan berpencahayaan hangat saat layanan malam',
  },
  vi: {
    eyebrow: 'Bài toán chúng tôi đau đáu',
    quote:
      'Mới 7 giờ 15 tối bạn đã cảm nhận được buổi tối đang ngả về đâu - lượt khách, nhịp độ, cái bàn ngồi quá lâu. *Nhưng những con số chứng minh điều đó thường mãi đến sáng hôm sau mới tới tay bạn.*',
    resolution:
      'Sundae khép lại khoảng cách ấy. Tín hiệu bạn cần đến khi ca làm vẫn còn trong tay bạn để thay đổi - chứ không nằm vùi trong báo cáo ngày mai.',
    attribution: 'Điều chúng tôi nghe thấy ở mọi sàn phục vụ mà chúng tôi xây dựng cho',
    cta: 'Xem cách hoạt động',
    alt: 'Một nhân viên phục vụ chăm sóc khách trong phòng ăn ấm áp ánh đèn vào giờ phục vụ buổi tối',
  },
  ro: {
    eyebrow: 'Problema care ne dă bătăi de cap',
    quote:
      'Simți încotro o ia seara încă de la 19:15 - clienții, ritmul, masa care stă prea mult. *Dar cifrele care o dovedesc ajung de obicei abia a doua zi dimineața.*',
    resolution:
      'Sundae acoperă acest gol. Semnalul de care ai nevoie ajunge cât tura încă e a ta de schimbat - nu îngropat în raportul de mâine.',
    attribution: 'Ce auzim în fiecare sală pentru care construim',
    cta: 'Vezi cum funcționează',
    alt: 'Un ospătar având grijă de oaspeți într-o sală cu lumină caldă în timpul serviciului de seară',
  },
  sv: {
    eyebrow: 'Problemet vi inte släpper',
    quote:
      'Du känner redan vid 19:15 vart kvällen är på väg - gästerna, tempot, bordet som sitter för länge. *Men siffrorna som bevisar det landar oftast först nästa morgon.*',
    resolution:
      'Sundae sluter det gapet. Signalen du behöver kommer medan passet fortfarande är ditt att ändra - inte begravd i morgondagens rapport.',
    attribution: 'Det vi hör i varje matsal vi bygger för',
    cta: 'Se hur det fungerar',
    alt: 'En servitör tar hand om gästerna i en varmt upplyst matsal under kvällsserveringen',
  },
  bn: {
    eyebrow: 'যে সমস্যা আমাদের ছাড়ে না',
    quote:
      'সন্ধ্যা ৭টা ১৫-তেই আপনি টের পান রাতটা কোন দিকে গড়াচ্ছে - অতিথির সংখ্যা, গতি, যে টেবিলটা অনেকক্ষণ ধরে বসে আছে। *কিন্তু যে সংখ্যাগুলো তা প্রমাণ করে, সেগুলো সাধারণত হাতে আসে পরদিন সকালে।*',
    resolution:
      'Sundae সেই ফাঁকটা ভরে দেয়। যে সংকেতটা আপনার দরকার তা তখনই আসে যখন শিফটটা বদলানো এখনও আপনার হাতে - আগামীকালের রিপোর্টে চাপা পড়ে নয়।',
    attribution: 'আমরা যে প্রতিটি ফ্লোরের জন্য তৈরি করি, সেখানেই আমরা এটা শুনি',
    cta: 'দেখুন কীভাবে কাজ করে',
    alt: 'সন্ধ্যার পরিবেশনের সময় উষ্ণ আলোয় ভরা ডাইনিং হলে অতিথিদের সেবা করছেন একজন ওয়েটার',
  },
  th: {
    eyebrow: 'ปัญหาที่เราหมกมุ่นอยู่กับมัน',
    quote:
      'แค่หนึ่งทุ่มสิบห้าคุณก็สัมผัสได้แล้วว่าค่ำคืนนี้กำลังไปทางไหน - จำนวนลูกค้า จังหวะ โต๊ะที่นั่งนานเกินไป *แต่ตัวเลขที่พิสูจน์เรื่องนี้มักมาถึงมือคุณในเช้าวันรุ่งขึ้น*',
    resolution:
      'Sundae อุดช่องว่างนั้น สัญญาณที่คุณต้องการมาถึงในขณะที่กะนั้นยังเปลี่ยนแปลงได้ - ไม่ใช่ถูกฝังอยู่ในรายงานของพรุ่งนี้',
    attribution: 'สิ่งที่เราได้ยินในทุกพื้นที่บริการที่เราสร้างให้',
    cta: 'ดูว่าทำงานอย่างไร',
    alt: 'พนักงานเสิร์ฟกำลังดูแลลูกค้าในห้องอาหารที่มีแสงไฟอบอุ่นระหว่างบริการมื้อค่ำ',
  },
  ms: {
    eyebrow: 'Masalah yang sentiasa kami fikirkan',
    quote:
      'Pada pukul 7.15 malam pun anda sudah dapat merasai ke mana malam ini menuju - tetamu, rentak, meja yang duduk terlalu lama. *Tetapi angka yang membuktikannya biasanya hanya sampai pada pagi esoknya.*',
    resolution:
      'Sundae merapatkan jurang itu. Isyarat yang anda perlukan tiba selagi syif itu masih boleh anda ubah - bukan terbenam dalam laporan esok hari.',
    attribution: 'Apa yang kami dengar di setiap ruang yang kami bina untuknya',
    cta: 'Lihat cara ia berfungsi',
    alt: 'Seorang pelayan melayani tetamu di ruang makan bercahaya hangat semasa servis malam',
  },
};
