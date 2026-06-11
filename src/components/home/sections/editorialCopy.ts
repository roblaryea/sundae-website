import type { WebsiteLocale } from '@/lib/i18n';

/**
 * Editorial-band copy for the homepage's humanized photography moments
 * (two cinematic bands + one closer split). Hand-authored, native transcreation
 * per locale - NOT literal word-for-word - so each line reads the way an operator
 * in that market would actually say it.
 *
 * Follows the SectionProof localization pattern: a locale-keyed map resolved at
 * render with an English fallback, kept out of the large per-locale i18n.ts trees
 * so this self-contained editorial system localizes without touching them.
 *
 * Glossary discipline (mirrors scripts/qa-translation-quality.mjs): the brand name
 * "Sundae" and the financial term "P&L" stay untranslated in every locale. The
 * band2 headline deliberately keeps the literal token "Sundae" so <SundaeWordmark>
 * can swap it inline via withWordmark() in the same place across all languages.
 *
 * Restaurant terms of art used in the source - "the pass" (the kitchen counter
 * where plated dishes are handed off), "the line" (the cooking line / service
 * floor, contrasted with the boardroom), "cover" (a guest served) - are rendered
 * with each market's native kitchen vocabulary, not calqued.
 */
export type EditorialCopy = {
  band1: { eyebrow: string; headline: string; sub: string; alt: string };
  /** headline keeps a literal "Sundae" for the inline wordmark swap. */
  band2: { eyebrow: string; headline: string; sub: string; alt: string };
  closer: {
    eyebrow: string;
    headlineLead: string;
    headlineEmphasis: string;
    sub: string;
    alt: string;
  };
};

export const editorialCopy: Record<WebsiteLocale, EditorialCopy> = {
  en: {
    band1: {
      eyebrow: 'From the pass to the P&L',
      headline: 'The intelligence layer for the restaurant you actually run.',
      sub: 'Not another dashboard to check. Sundae reads every shift, cover, and line item - and tells you the next right move while it still matters.',
      alt: 'A chef finishing a plated dish on the kitchen pass during service',
    },
    band2: {
      eyebrow: 'Built for the front-line, not only the boardroom',
      headline: 'Your team is already moving fast. Sundae moves with them.',
      sub: 'Live pacing, labor, and exceptions across every outlet - so the call you make at 7pm is the right one, not the one you second-guess at midnight.',
      alt: 'A chef working the line on the kitchen pass during service',
    },
    closer: {
      eyebrow: 'Your floor, your call',
      headlineLead: "The best operators don't have more hours.",
      headlineEmphasis: 'They have better information.',
      sub: 'Sundae gives you the read on your business that great instincts deserve - across every outlet, in real time.',
      alt: 'A host attending to guests in a warmly lit dining room',
    },
  },
  ar: {
    band1: {
      eyebrow: 'من ممر التقديم إلى P&L',
      headline: 'طبقة الذكاء للمطعم الذي تديره فعلاً.',
      sub: 'ليست لوحة معلومات أخرى لمراجعتها. Sundae يقرأ كل وردية وكل ضيف وكل بند - ويخبرك بالخطوة الصحيحة التالية وهي ما تزال مجدية.',
      alt: 'طاهٍ يُنهي إعداد طبق عند ممر التقديم أثناء الخدمة',
    },
    band2: {
      eyebrow: 'صُمم لخط الخدمة الأمامي، لا لغرفة الاجتماعات وحدها',
      headline: 'فريقك يتحرك بسرعة بالفعل. Sundae يتحرك معه.',
      sub: 'إيقاع حي وعمالة واستثناءات عبر كل فرع - ليكون القرار الذي تتخذه في السابعة مساءً هو الصحيح، لا الذي تشكك فيه عند منتصف الليل.',
      alt: 'طاهٍ يعمل على خط المطبخ، عند ممر التقديم أثناء الخدمة',
    },
    closer: {
      eyebrow: 'صالتك، وقرارك',
      headlineLead: 'أفضل المشغّلين لا يملكون ساعات أكثر.',
      headlineEmphasis: 'بل يملكون معلومات أفضل.',
      sub: 'يمنحك Sundae قراءةً لأعمالك يستحقها حدسك الممتاز - عبر كل فرع، وفي الوقت الحقيقي.',
      alt: 'مضيف يستقبل الضيوف في صالة طعام ذات إضاءة دافئة',
    },
  },
  fr: {
    band1: {
      eyebrow: 'Du passe au P&L',
      headline: "La couche d'intelligence du restaurant que vous dirigez vraiment.",
      sub: "Pas un tableau de bord de plus à consulter. Sundae lit chaque service, chaque couvert et chaque ligne de compte - et vous indique le bon geste suivant tant qu'il compte encore.",
      alt: 'Un chef dressant une assiette au passe pendant le service',
    },
    band2: {
      eyebrow: "Pensé pour le terrain, pas seulement pour le conseil d'administration",
      headline: 'Votre équipe avance déjà vite. Sundae avance avec elle.',
      sub: "Cadence en direct, main-d'œuvre et anomalies sur chaque point de vente - pour que la décision prise à 19 h soit la bonne, pas celle que vous remettez en question à minuit.",
      alt: 'Un chef au coup de feu, au passe pendant le service',
    },
    closer: {
      eyebrow: 'Votre salle, votre décision',
      headlineLead: "Les meilleurs opérateurs n'ont pas plus d'heures.",
      headlineEmphasis: 'Ils ont de meilleures informations.',
      sub: "Sundae vous donne la lecture de votre activité que votre instinct mérite - sur chaque point de vente, en temps réel.",
      alt: "Un maître d'hôtel accueillant des convives dans une salle à l'éclairage chaleureux",
    },
  },
  es: {
    band1: {
      eyebrow: 'Del pase al P&L',
      headline: 'La capa de inteligencia del restaurante que de verdad gestionas.',
      sub: 'No es otro panel que revisar. Sundae lee cada turno, cada comensal y cada partida - y te dice el siguiente movimiento acertado mientras aún importa.',
      alt: 'Un chef terminando un plato en el pase durante el servicio',
    },
    band2: {
      eyebrow: 'Hecho para la primera línea, no solo para la sala de juntas',
      headline: 'Tu equipo ya se mueve rápido. Sundae se mueve con él.',
      sub: 'Ritmo en vivo, personal y excepciones en cada local - para que la decisión que tomas a las 7 de la tarde sea la correcta, no la que cuestionas a medianoche.',
      alt: 'Un chef trabajando en la cocina, en el pase durante el servicio',
    },
    closer: {
      eyebrow: 'Tu sala, tu decisión',
      headlineLead: 'Los mejores operadores no tienen más horas.',
      headlineEmphasis: 'Tienen mejor información.',
      sub: 'Sundae te da la lectura de tu negocio que tu instinto merece - en cada local y en tiempo real.',
      alt: 'Un anfitrión atendiendo a los comensales en un comedor de luz cálida',
    },
  },
  de: {
    band1: {
      eyebrow: 'Vom Pass zur P&L',
      headline: 'Die Intelligenzschicht für das Restaurant, das Sie wirklich führen.',
      sub: 'Kein weiteres Dashboard zum Durchsehen. Sundae liest jede Schicht, jedes Gedeck und jede Position - und nennt Ihnen den nächsten richtigen Schritt, solange er noch zählt.',
      alt: 'Ein Koch richtet am Pass während des Service einen Teller an',
    },
    band2: {
      eyebrow: 'Für die Front gemacht, nicht nur für den Sitzungssaal',
      headline: 'Ihr Team ist längst in Bewegung. Sundae bewegt sich mit.',
      sub: 'Live-Tempo, Personal und Ausnahmen über jeden Standort - damit die Entscheidung um 19 Uhr die richtige ist und nicht die, die Sie um Mitternacht infrage stellen.',
      alt: 'Ein Koch arbeitet an der Linie, am Pass während des Service',
    },
    closer: {
      eyebrow: 'Ihr Gastraum, Ihre Entscheidung',
      headlineLead: 'Die besten Betreiber haben nicht mehr Stunden.',
      headlineEmphasis: 'Sie haben bessere Informationen.',
      sub: 'Sundae gibt Ihnen das Gespür für Ihr Geschäft, das gute Instinkte verdienen - über jeden Standort, in Echtzeit.',
      alt: 'Ein Gastgeber kümmert sich um Gäste in einem warm beleuchteten Gastraum',
    },
  },
  nl: {
    band1: {
      eyebrow: 'Van de pass naar de P&L',
      headline: 'De intelligentielaag voor het restaurant dat u écht runt.',
      sub: 'Niet weer een dashboard om te checken. Sundae leest elke dienst, elke gast en elke regel - en wijst u de juiste volgende stap terwijl die er nog toe doet.',
      alt: 'Een chef maakt een gerecht af op de pass tijdens de service',
    },
    band2: {
      eyebrow: 'Gemaakt voor de werkvloer, niet alleen voor de bestuurskamer',
      headline: 'Uw team beweegt al snel. Sundae beweegt mee.',
      sub: 'Live tempo, personeel en uitzonderingen over elke vestiging - zodat de beslissing die u om 19.00 uur neemt de juiste is, niet die u om middernacht in twijfel trekt.',
      alt: 'Een chef werkt aan de lijn, op de pass tijdens de service',
    },
    closer: {
      eyebrow: 'Uw zaak, uw beslissing',
      headlineLead: 'De beste operators hebben niet meer uren.',
      headlineEmphasis: 'Ze hebben betere informatie.',
      sub: 'Sundae geeft u het inzicht in uw zaak dat goede intuïtie verdient - over elke vestiging, in realtime.',
      alt: 'Een gastheer ontvangt gasten in een warm verlichte eetzaal',
    },
  },
  pt: {
    band1: {
      eyebrow: 'Da expedição ao P&L',
      headline: 'A camada de inteligência do restaurante que você realmente comanda.',
      sub: 'Não é mais um painel para conferir. O Sundae lê cada turno, cada cliente e cada item - e mostra o próximo passo certo enquanto ele ainda importa.',
      alt: 'Um chef finalizando um prato na expedição durante o serviço',
    },
    band2: {
      eyebrow: 'Feito para a linha de frente, não só para a diretoria',
      headline: 'Sua equipe já está em ritmo acelerado. Sundae acompanha.',
      sub: 'Ritmo ao vivo, mão de obra e exceções em cada unidade - para que a decisão que você toma às 19h seja a certa, não aquela que você questiona à meia-noite.',
      alt: 'Um chef trabalhando na praça, na expedição durante o serviço',
    },
    closer: {
      eyebrow: 'Seu salão, sua decisão',
      headlineLead: 'Os melhores operadores não têm mais horas.',
      headlineEmphasis: 'Têm informações melhores.',
      sub: 'O Sundae te dá a leitura do seu negócio que o bom instinto merece - em cada unidade, em tempo real.',
      alt: 'Um anfitrião recebendo clientes em um salão com iluminação acolhedora',
    },
  },
  hi: {
    band1: {
      eyebrow: 'पास से P&L तक',
      headline: 'उस रेस्तरां के लिए इंटेलिजेंस लेयर, जिसे आप सचमुच चलाते हैं।',
      sub: 'देखने के लिए एक और डैशबोर्ड नहीं। Sundae हर शिफ्ट, हर मेहमान और हर मद को पढ़ता है - और जब तक वक्त है, तभी अगला सही कदम बता देता है।',
      alt: 'सर्विस के दौरान पास पर एक व्यंजन को अंतिम रूप देता शेफ',
    },
    band2: {
      eyebrow: 'फ्रंट-लाइन के लिए बना, सिर्फ़ बोर्डरूम के लिए नहीं',
      headline: 'आपकी टीम पहले से तेज़ चल रही है। Sundae उनके साथ चलता है।',
      sub: 'हर आउटलेट पर लाइव रफ्तार, स्टाफ और अपवाद - ताकि शाम 7 बजे आप जो फैसला लें वही सही हो, वह नहीं जिस पर आधी रात को आप दोबारा सोचें।',
      alt: 'सर्विस के दौरान रसोई की लाइन पर, पास पर काम करता शेफ',
    },
    closer: {
      eyebrow: 'आपका फ्लोर, आपका फैसला',
      headlineLead: 'बेहतरीन ऑपरेटरों के पास ज़्यादा घंटे नहीं होते।',
      headlineEmphasis: 'उनके पास बेहतर जानकारी होती है।',
      sub: 'Sundae आपको आपके कारोबार की वह समझ देता है जिसके आपकी बेहतरीन समझ-बूझ हकदार है - हर आउटलेट पर, रियल-टाइम में।',
      alt: 'गर्म रोशनी वाले डाइनिंग रूम में मेहमानों की आवभगत करता मेज़बान',
    },
  },
  ur: {
    band1: {
      eyebrow: 'پاس سے P&L تک',
      headline: 'اُس ریستوران کے لیے انٹیلی جنس پرت جسے آپ واقعی چلاتے ہیں۔',
      sub: 'دیکھنے کے لیے ایک اور ڈیش بورڈ نہیں۔ Sundae ہر شفٹ، ہر مہمان اور ہر مدّ کو پڑھتا ہے - اور جب تک وقت ہے، اگلا درست قدم بتا دیتا ہے۔',
      alt: 'سروس کے دوران پاس پر ایک ڈش کو حتمی شکل دیتا شیف',
    },
    band2: {
      eyebrow: 'فرنٹ لائن کے لیے بنایا گیا، صرف بورڈ روم کے لیے نہیں',
      headline: 'آپ کی ٹیم پہلے ہی تیزی سے کام کر رہی ہے۔ Sundae اُن کے ساتھ چلتا ہے۔',
      sub: 'ہر آؤٹ لیٹ پر لائیو رفتار، عملہ اور استثناءات - تاکہ شام 7 بجے آپ جو فیصلہ کریں وہی درست ہو، نہ کہ وہ جس پر آدھی رات کو آپ شک کریں۔',
      alt: 'سروس کے دوران کچن لائن پر، پاس پر کام کرتا شیف',
    },
    closer: {
      eyebrow: 'آپ کا فلور، آپ کا فیصلہ',
      headlineLead: 'بہترین آپریٹرز کے پاس زیادہ گھنٹے نہیں ہوتے۔',
      headlineEmphasis: 'اُن کے پاس بہتر معلومات ہوتی ہیں۔',
      sub: 'Sundae آپ کو آپ کے کاروبار کی وہ سمجھ دیتا ہے جس کا آپ کی عمدہ جبلت حق رکھتی ہے - ہر آؤٹ لیٹ پر، حقیقی وقت میں۔',
      alt: 'گرم روشنی والے ڈائننگ روم میں مہمانوں کی خدمت کرتا میزبان',
    },
  },
  it: {
    band1: {
      eyebrow: 'Dal passe al P&L',
      headline: "Lo strato d'intelligenza per il ristorante che gestisci davvero.",
      sub: "Non l'ennesima dashboard da controllare. Sundae legge ogni turno, ogni coperto e ogni voce - e ti indica la prossima mossa giusta finché conta ancora.",
      alt: 'Uno chef che completa un piatto al passe durante il servizio',
    },
    band2: {
      eyebrow: 'Fatto per la prima linea, non solo per la sala riunioni',
      headline: 'Il tuo team si muove già in fretta. Sundae si muove con lui.',
      sub: 'Ritmo in tempo reale, personale ed eccezioni in ogni punto vendita - così la decisione che prendi alle 19 è quella giusta, non quella che metti in dubbio a mezzanotte.',
      alt: 'Uno chef al lavoro sulla linea, al passe durante il servizio',
    },
    closer: {
      eyebrow: 'La tua sala, la tua decisione',
      headlineLead: 'I migliori operatori non hanno più ore.',
      headlineEmphasis: 'Hanno informazioni migliori.',
      sub: 'Sundae ti dà la lettura del tuo locale che il buon istinto merita - in ogni punto vendita, in tempo reale.',
      alt: "Un maître che accoglie gli ospiti in una sala dall'illuminazione calda",
    },
  },
  pl: {
    band1: {
      eyebrow: 'Od wydawki do P&L',
      headline: 'Warstwa inteligencji dla restauracji, którą naprawdę prowadzisz.',
      sub: 'Nie kolejny pulpit do sprawdzania. Sundae czyta każdą zmianę, każdego gościa i każdą pozycję - i podpowiada kolejny właściwy ruch, póki jeszcze ma znaczenie.',
      alt: 'Kucharz kończy danie na wydawce podczas serwisu',
    },
    band2: {
      eyebrow: 'Stworzone dla pierwszej linii, nie tylko dla sali zarządu',
      headline: 'Twój zespół już działa szybko. Sundae nadąża za nim.',
      sub: 'Tempo na żywo, obsada i wyjątki w każdym lokalu - żeby decyzja, którą podejmujesz o 19, była tą właściwą, a nie tą, którą kwestionujesz o północy.',
      alt: 'Kucharz pracuje na linii, przy wydawce podczas serwisu',
    },
    closer: {
      eyebrow: 'Twoja sala, twoja decyzja',
      headlineLead: 'Najlepsi operatorzy nie mają więcej godzin.',
      headlineEmphasis: 'Mają lepsze informacje.',
      sub: 'Sundae daje ci taki obraz biznesu, na jaki zasługuje dobry instynkt - w każdym lokalu, w czasie rzeczywistym.',
      alt: 'Gospodarz obsługujący gości w ciepło oświetlonej sali',
    },
  },
  tr: {
    band1: {
      eyebrow: "Mutfak pasından P&L'ye",
      headline: 'Gerçekten işlettiğiniz restoran için zekâ katmanı.',
      sub: 'Kontrol edilecek bir gösterge paneli daha değil. Sundae her vardiyayı, her misafiri ve her kalemi okur - ve daha önemliyken bir sonraki doğru hamleyi söyler.',
      alt: 'Servis sırasında pasta bir tabağı tamamlayan şef',
    },
    band2: {
      eyebrow: 'Yalnızca toplantı odası için değil, sahanın ön saflarına göre tasarlandı',
      headline: 'Ekibiniz zaten hızlı hareket ediyor. Sundae onunla birlikte hareket eder.',
      sub: "Her şubede canlı tempo, iş gücü ve istisnalar - böylece akşam 19.00'da verdiğiniz karar doğru olanı olur, gece yarısı sorguladığınız değil.",
      alt: 'Servis sırasında mutfak hattında, pasta çalışan şef',
    },
    closer: {
      eyebrow: 'Sizin salonunuz, sizin kararınız',
      headlineLead: 'En iyi işletmecilerin daha fazla saati yoktur.',
      headlineEmphasis: 'Daha iyi bilgileri vardır.',
      sub: 'Sundae, iyi sezgilerin hak ettiği işletme okumasını size verir - her şubede, gerçek zamanlı.',
      alt: 'Sıcak ışıklı bir yemek salonunda misafirleri ağırlayan bir ev sahibi',
    },
  },
  'zh-Hans': {
    band1: {
      eyebrow: '从出菜口到 P&L',
      headline: '为你真正在经营的餐厅打造的智能层。',
      sub: '不是又一个要查看的仪表盘。Sundae 读取每一个班次、每一位客人、每一笔条目--并在还来得及时告诉你下一步该怎么走。',
      alt: '服务期间，厨师在出菜口完成摆盘',
    },
    band2: {
      eyebrow: '为一线而造，不只为会议室',
      headline: '你的团队早已快速运转。Sundae 与他们同步。',
      sub: '每一家门店的实时节奏、人力与异常一览无余--让你晚上七点做的决定就是对的那个，而不是半夜还在怀疑的那个。',
      alt: '服务期间，厨师在出餐线的出菜口忙碌',
    },
    closer: {
      eyebrow: '你的餐厅，你做主',
      headlineLead: '最优秀的经营者并没有更多时间，',
      headlineEmphasis: '他们只是掌握了更好的信息。',
      sub: 'Sundae 让你对生意的洞察配得上你出色的直觉--覆盖每一家门店，实时呈现。',
      alt: '在暖光餐厅中招待客人的迎宾',
    },
  },
  ja: {
    band1: {
      eyebrow: 'パスからP&Lまで',
      headline: 'あなたが実際に切り盛りする店のためのインテリジェンス層。',
      sub: '確認すべきダッシュボードがまた増えるわけではありません。Sundae はすべてのシフト、すべての客数、すべての明細を読み取り--まだ間に合ううちに次の最善手を教えます。',
      alt: 'サービス中、パスで一皿を仕上げるシェフ',
    },
    band2: {
      eyebrow: '会議室だけでなく、現場の最前線のために',
      headline: 'あなたのチームはすでに速く動いている。Sundae はそれに合わせて動く。',
      sub: '全店舗のリアルタイムなペース、人員、例外を把握--夜7時に下す判断が正しいものになり、深夜に迷い直すことはありません。',
      alt: 'サービス中、厨房のラインのパスで働くシェフ',
    },
    closer: {
      eyebrow: 'あなたのフロア、あなたの判断',
      headlineLead: '優れた経営者に、時間が多いわけではありません。',
      headlineEmphasis: 'より良い情報を持っているのです。',
      sub: 'Sundae は、優れた勘にふさわしいビジネスの読みを届けます--全店舗で、リアルタイムに。',
      alt: '暖かな照明のダイニングで客をもてなすホスト',
    },
  },
  ko: {
    band1: {
      eyebrow: '패스에서 P&L까지',
      headline: '당신이 실제로 운영하는 레스토랑을 위한 인텔리전스 레이어.',
      sub: '확인해야 할 대시보드가 하나 더 느는 게 아닙니다. Sundae는 모든 근무, 모든 손님, 모든 항목을 읽어내고--아직 늦지 않았을 때 다음 최선의 수를 알려줍니다.',
      alt: '서비스 중 패스에서 요리를 마무리하는 셰프',
    },
    band2: {
      eyebrow: '회의실만이 아니라 현장 최전선을 위해',
      headline: '당신의 팀은 이미 빠르게 움직입니다. Sundae는 그 속도에 맞춰 함께 움직입니다.',
      sub: '모든 매장의 실시간 페이스, 인력, 예외 상황까지--저녁 7시에 내리는 결정이 옳은 결정이 되고, 자정에 다시 의심하는 결정이 되지 않도록.',
      alt: '서비스 중 주방 라인의 패스에서 일하는 셰프',
    },
    closer: {
      eyebrow: '당신의 매장, 당신의 결정',
      headlineLead: '최고의 운영자에게 시간이 더 많은 건 아닙니다.',
      headlineEmphasis: '더 나은 정보를 가졌을 뿐입니다.',
      sub: 'Sundae는 뛰어난 직감에 걸맞은 비즈니스 통찰을 전합니다--모든 매장에서, 실시간으로.',
      alt: '따뜻한 조명의 다이닝룸에서 손님을 맞이하는 호스트',
    },
  },
  id: {
    band1: {
      eyebrow: 'Dari pass hingga P&L',
      headline: 'Lapisan intelijen untuk restoran yang benar-benar Anda jalankan.',
      sub: 'Bukan satu dasbor lagi untuk dicek. Sundae membaca setiap shift, setiap tamu, dan setiap item - lalu memberi tahu langkah tepat berikutnya selagi masih berarti.',
      alt: 'Seorang koki menyelesaikan hidangan di pass saat layanan berlangsung',
    },
    band2: {
      eyebrow: 'Dibuat untuk garda depan, bukan hanya ruang rapat',
      headline: 'Tim Anda sudah bergerak cepat. Sundae bergerak bersama mereka.',
      sub: 'Tempo langsung, tenaga kerja, dan pengecualian di setiap outlet - agar keputusan yang Anda ambil pukul 7 malam adalah yang tepat, bukan yang Anda ragukan tengah malam.',
      alt: 'Seorang koki bekerja di lini dapur, di pass saat layanan',
    },
    closer: {
      eyebrow: 'Ruang Anda, keputusan Anda',
      headlineLead: 'Operator terbaik tidak punya lebih banyak waktu.',
      headlineEmphasis: 'Mereka punya informasi yang lebih baik.',
      sub: 'Sundae memberi Anda pembacaan bisnis yang layak bagi insting hebat - di setiap outlet, secara real-time.',
      alt: 'Seorang pramutamu menyambut tamu di ruang makan berpencahayaan hangat',
    },
  },
  vi: {
    band1: {
      eyebrow: 'Từ quầy ra món đến P&L',
      headline: 'Lớp trí tuệ cho nhà hàng mà bạn thực sự vận hành.',
      sub: 'Không phải thêm một bảng điều khiển để kiểm tra. Sundae đọc từng ca, từng lượt khách và từng khoản mục - rồi mách bạn nước đi đúng tiếp theo khi nó còn kịp.',
      alt: 'Một đầu bếp hoàn thiện món ăn tại quầy ra món trong giờ phục vụ',
    },
    band2: {
      eyebrow: 'Tạo ra cho tuyến đầu, không chỉ cho phòng họp',
      headline: 'Đội ngũ của bạn vốn đã chạy rất nhanh. Sundae chạy cùng họ.',
      sub: 'Nhịp độ trực tiếp, nhân sự và ngoại lệ trên mọi chi nhánh - để quyết định bạn đưa ra lúc 7 giờ tối là quyết định đúng, không phải điều bạn hoài nghi lúc nửa đêm.',
      alt: 'Một đầu bếp làm việc trên dây chuyền bếp, tại quầy ra món trong giờ phục vụ',
    },
    closer: {
      eyebrow: 'Sàn của bạn, quyết định của bạn',
      headlineLead: 'Những nhà điều hành giỏi nhất không có nhiều giờ hơn.',
      headlineEmphasis: 'Họ có thông tin tốt hơn.',
      sub: 'Sundae mang đến cho bạn cách đọc hiểu công việc kinh doanh xứng đáng với trực giác nhạy bén - trên mọi chi nhánh, theo thời gian thực.',
      alt: 'Một người tiếp đón đang phục vụ khách trong phòng ăn ấm áp ánh đèn',
    },
  },
  ro: {
    band1: {
      eyebrow: 'De la pass la P&L',
      headline: 'Stratul de inteligență pentru restaurantul pe care chiar îl conduci.',
      sub: 'Nu încă un panou de verificat. Sundae citește fiecare tură, fiecare client și fiecare poziție - și îți spune următoarea mișcare corectă cât încă mai contează.',
      alt: 'Un bucătar finalizează un preparat la pass în timpul serviciului',
    },
    band2: {
      eyebrow: 'Făcut pentru prima linie, nu doar pentru sala de consiliu',
      headline: 'Echipa ta se mișcă deja repede. Sundae se mișcă odată cu ea.',
      sub: 'Ritm în timp real, personal și excepții în fiecare locație - astfel încât decizia pe care o iei la 19:00 să fie cea corectă, nu cea pe care o pui la îndoială la miezul nopții.',
      alt: 'Un bucătar lucrând la linie, la pass în timpul serviciului',
    },
    closer: {
      eyebrow: 'Sala ta, decizia ta',
      headlineLead: 'Cei mai buni operatori nu au mai multe ore.',
      headlineEmphasis: 'Au informații mai bune.',
      sub: 'Sundae îți oferă citirea afacerii pe care instinctul bun o merită - în fiecare locație, în timp real.',
      alt: 'O gazdă care se ocupă de oaspeți într-o sală cu lumină caldă',
    },
  },
  sv: {
    band1: {
      eyebrow: 'Från passet till P&L',
      headline: 'Intelligenslagret för restaurangen du faktiskt driver.',
      sub: 'Inte ännu en instrumentpanel att kolla. Sundae läser varje skift, varje gäst och varje rad - och säger nästa rätta drag medan det fortfarande spelar roll.',
      alt: 'En kock gör färdigt en tallrik vid passet under serveringen',
    },
    band2: {
      eyebrow: 'Byggt för frontlinjen, inte bara för styrelserummet',
      headline: 'Ditt team rör sig redan snabbt. Sundae rör sig med dem.',
      sub: 'Live-tempo, bemanning och avvikelser för varje enhet - så att beslutet du tar klockan 19 är det rätta, inte det du tvivlar på vid midnatt.',
      alt: 'En kock arbetar vid linjen, vid passet under serveringen',
    },
    closer: {
      eyebrow: 'Din matsal, ditt beslut',
      headlineLead: 'De bästa operatörerna har inte fler timmar.',
      headlineEmphasis: 'De har bättre information.',
      sub: 'Sundae ger dig läsningen av din verksamhet som god intuition förtjänar - för varje enhet, i realtid.',
      alt: 'En värd tar hand om gäster i en varmt upplyst matsal',
    },
  },
  bn: {
    band1: {
      eyebrow: 'পাস থেকে P&L পর্যন্ত',
      headline: 'আপনি যে রেস্তোরাঁটি সত্যিই চালান, তার জন্য ইন্টেলিজেন্স স্তর।',
      sub: 'দেখার জন্য আরেকটি ড্যাশবোর্ড নয়। Sundae প্রতিটি শিফট, প্রতিটি অতিথি এবং প্রতিটি আইটেম পড়ে - আর সময় থাকতেই পরের সঠিক পদক্ষেপটি বলে দেয়।',
      alt: 'পরিবেশনের সময় পাসে একটি প্লেট সাজিয়ে শেষ করছেন একজন শেফ',
    },
    band2: {
      eyebrow: 'ফ্রন্টলাইনের জন্য তৈরি, শুধু বোর্ডরুমের জন্য নয়',
      headline: 'আপনার দল ইতিমধ্যেই দ্রুত এগোচ্ছে। Sundae তাদের সঙ্গেই এগোয়।',
      sub: 'প্রতিটি আউটলেটে সরাসরি গতি, জনবল ও ব্যতিক্রম - যাতে সন্ধ্যা ৭টায় নেওয়া সিদ্ধান্তটি সঠিক হয়, মধ্যরাতে যেটি নিয়ে আপনি দ্বিধায় পড়েন সেটি নয়।',
      alt: 'পরিবেশনের সময় রান্নাঘরের লাইনে, পাসে কাজ করছেন একজন শেফ',
    },
    closer: {
      eyebrow: 'আপনার ফ্লোর, আপনার সিদ্ধান্ত',
      headlineLead: 'সেরা পরিচালকদের হাতে বেশি সময় থাকে না।',
      headlineEmphasis: 'তাদের কাছে ভালো তথ্য থাকে।',
      sub: 'Sundae আপনাকে আপনার ব্যবসার সেই পাঠ দেয় যা প্রখর সহজাত বোধের যোগ্য - প্রতিটি আউটলেটে, রিয়েল-টাইমে।',
      alt: 'উষ্ণ আলোয় সজ্জিত ডাইনিং রুমে অতিথিদের আপ্যায়ন করছেন একজন হোস্ট',
    },
  },
  th: {
    band1: {
      eyebrow: 'จากหน้าจ่ายอาหารถึง P&L',
      headline: 'เลเยอร์อัจฉริยะสำหรับร้านอาหารที่คุณบริหารจริง',
      sub: 'ไม่ใช่แดชบอร์ดอีกอันที่ต้องคอยดู Sundae อ่านทุกกะ ทุกลูกค้า และทุกรายการ - แล้วบอกคุณว่าก้าวต่อไปที่ถูกต้องคืออะไร ในขณะที่ยังทันการณ์',
      alt: 'เชฟกำลังจัดจานให้เสร็จที่หน้าจ่ายอาหารระหว่างการให้บริการ',
    },
    band2: {
      eyebrow: 'สร้างมาเพื่อแนวหน้า ไม่ใช่แค่ห้องประชุมผู้บริหาร',
      headline: 'ทีมของคุณเคลื่อนไหวเร็วอยู่แล้ว Sundae เคลื่อนไหวไปพร้อมกับพวกเขา',
      sub: 'จังหวะแบบเรียลไทม์ กำลังคน และข้อยกเว้นในทุกสาขา - เพื่อให้การตัดสินใจที่คุณทำตอนหนึ่งทุ่มเป็นการตัดสินใจที่ถูกต้อง ไม่ใช่สิ่งที่คุณมานั่งกังขาตอนเที่ยงคืน',
      alt: 'เชฟกำลังทำงานที่ไลน์ครัว ที่หน้าจ่ายอาหารระหว่างการให้บริการ',
    },
    closer: {
      eyebrow: 'พื้นที่ของคุณ การตัดสินใจของคุณ',
      headlineLead: 'ผู้บริหารที่เก่งที่สุดไม่ได้มีเวลามากกว่า',
      headlineEmphasis: 'พวกเขามีข้อมูลที่ดีกว่า',
      sub: 'Sundae มอบการอ่านธุรกิจของคุณในแบบที่สัญชาตญาณอันยอดเยี่ยมสมควรได้รับ - ในทุกสาขา แบบเรียลไทม์',
      alt: 'พนักงานต้อนรับกำลังดูแลแขกในห้องอาหารที่มีแสงไฟอบอุ่น',
    },
  },
  ms: {
    band1: {
      eyebrow: 'Dari pass ke P&L',
      headline: 'Lapisan kecerdasan untuk restoran yang benar-benar anda kendalikan.',
      sub: 'Bukan satu lagi papan pemuka untuk disemak. Sundae membaca setiap syif, setiap tetamu dan setiap butiran - lalu memberitahu anda langkah betul seterusnya selagi ia masih penting.',
      alt: 'Seorang cef menyiapkan hidangan di pass semasa servis',
    },
    band2: {
      eyebrow: 'Dibina untuk barisan hadapan, bukan hanya bilik mesyuarat',
      headline: 'Pasukan anda sudah pun bergerak pantas. Sundae bergerak bersama mereka.',
      sub: 'Rentak langsung, tenaga kerja dan pengecualian di setiap cawangan - supaya keputusan yang anda buat pada pukul 7 malam adalah yang betul, bukan yang anda ragui pada tengah malam.',
      alt: 'Seorang cef bekerja di barisan dapur, di pass semasa servis',
    },
    closer: {
      eyebrow: 'Ruang anda, keputusan anda',
      headlineLead: 'Pengendali terbaik tidak mempunyai lebih banyak masa.',
      headlineEmphasis: 'Mereka mempunyai maklumat yang lebih baik.',
      sub: 'Sundae memberi anda bacaan perniagaan yang setimpal dengan naluri hebat - di setiap cawangan, secara masa nyata.',
      alt: 'Seorang hos melayan tetamu di ruang makan yang bercahaya hangat',
    },
  },
};
