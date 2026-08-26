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
      headline: 'Find the profit your restaurant is leaking.',
      sub: 'Not another dashboard to check. Sundae reads every shift, cover, and line item - finds where the margin leaks, routes the fix to an owner, and measures it back.',
      alt: 'A chef finishing a plated dish on the kitchen pass during service',
    },
    band2: {
      eyebrow: 'Built for the front-line, not only the boardroom',
      headline: 'Your team is already moving fast. Sundae moves with them.',
      sub: 'Live pacing, labor, and exceptions across every outlet - so the fix you make at 7pm is owned, executed, and measured back by close.',
      alt: 'A chef working the line on the kitchen pass during service',
    },
    closer: {
      eyebrow: 'Your floor, your call',
      headlineLead: "The best operators don't have more hours.",
      headlineEmphasis: 'They recover more margin.',
      sub: 'Sundae finds the profit you’re leaking and proves the recovery - across every outlet, every shift.',
      alt: 'A host attending to guests in a warmly lit dining room',
    },
  },
  ar: {
    band1: {
      eyebrow: 'من ممر التقديم إلى P&L',
      headline: 'اكتشف الربح الذي يتسرّب من مطعمك.',
      sub: 'ليست لوحة معلومات أخرى لمراجعتها. Sundae يقرأ كل وردية وكل ضيف وكل بند - يكتشف أين يتسرّب الهامش، ويُسند المعالجة إلى مسؤول، ثم يقيس ما استُعيد.',
      alt: 'طاهٍ يُنهي إعداد طبق عند ممر التقديم أثناء الخدمة',
    },
    band2: {
      eyebrow: 'صُمم لخط الخدمة الأمامي، لا لغرفة الاجتماعات وحدها',
      headline: 'فريقك يتحرك بسرعة بالفعل. Sundae يتحرك معه.',
      sub: 'إيقاع حي وعمالة واستثناءات عبر كل فرع - ليكون الإجراء الذي تتخذه في السابعة مساءً مُسنَداً إلى مسؤول، ومنفّذاً، ومقيساً عند الإغلاق.',
      alt: 'طاهٍ يعمل على خط المطبخ، عند ممر التقديم أثناء الخدمة',
    },
    closer: {
      eyebrow: 'صالتك، وقرارك',
      headlineLead: 'أفضل المشغّلين لا يملكون ساعات أكثر.',
      headlineEmphasis: 'بل يستعيدون هامشاً أكبر.',
      sub: 'يكتشف Sundae الربح الذي يتسرّب منك ويُثبت ما استُعيد - عبر كل فرع، وفي كل وردية.',
      alt: 'مضيف يستقبل الضيوف في صالة طعام ذات إضاءة دافئة',
    },
  },
  fr: {
    band1: {
      eyebrow: 'Du passe au P&L',
      headline: 'Trouvez le profit que votre restaurant laisse fuir.',
      sub: "Pas un tableau de bord de plus à consulter. Sundae lit chaque service, chaque couvert et chaque ligne de compte - repère où la marge fuit, confie la correction à un responsable et en mesure le retour.",
      alt: 'Un chef dressant une assiette au passe pendant le service',
    },
    band2: {
      eyebrow: "Pensé pour le terrain, pas seulement pour le conseil d'administration",
      headline: 'Votre équipe avance déjà vite. Sundae avance avec elle.',
      sub: "Cadence en direct, main-d'œuvre et anomalies sur chaque point de vente - pour que la correction décidée à 19 h soit prise en charge, exécutée et mesurée avant la fermeture.",
      alt: 'Un chef au coup de feu, au passe pendant le service',
    },
    closer: {
      eyebrow: 'Votre salle, votre décision',
      headlineLead: "Les meilleurs opérateurs n'ont pas plus d'heures.",
      headlineEmphasis: 'Ils récupèrent plus de marge.',
      sub: 'Sundae trouve le profit qui vous échappe et prouve la marge récupérée - sur chaque point de vente, à chaque service.',
      alt: "Un maître d'hôtel accueillant des convives dans une salle à l'éclairage chaleureux",
    },
  },
  es: {
    band1: {
      eyebrow: 'Del pase al P&L',
      headline: 'Descubre el beneficio que tu restaurante deja escapar.',
      sub: 'No es otro panel que revisar. Sundae lee cada turno, cada comensal y cada partida - detecta dónde se escapa el margen, asigna la solución a un responsable y mide lo recuperado.',
      alt: 'Un chef terminando un plato en el pase durante el servicio',
    },
    band2: {
      eyebrow: 'Hecho para la primera línea, no solo para la sala de juntas',
      headline: 'Tu equipo ya se mueve rápido. Sundae se mueve con él.',
      sub: 'Ritmo en vivo, personal y excepciones en cada local - para que la solución que aplicas a las 7 de la tarde sea asumida, ejecutada y medida al cierre.',
      alt: 'Un chef trabajando en la cocina, en el pase durante el servicio',
    },
    closer: {
      eyebrow: 'Tu sala, tu decisión',
      headlineLead: 'Los mejores operadores no tienen más horas.',
      headlineEmphasis: 'Recuperan más margen.',
      sub: 'Sundae descubre el beneficio que se te escapa y demuestra lo recuperado - en cada local y en cada turno.',
      alt: 'Un anfitrión atendiendo a los comensales en un comedor de luz cálida',
    },
  },
  de: {
    band1: {
      eyebrow: 'Vom Pass zur P&L',
      headline: 'Finden Sie den Gewinn, der Ihrem Restaurant entgeht.',
      sub: 'Kein weiteres Dashboard zum Durchsehen. Sundae liest jede Schicht, jedes Gedeck und jede Position - findet, wo die Marge versickert, übergibt die Korrektur an einen Verantwortlichen und misst, was zurückkommt.',
      alt: 'Ein Koch richtet am Pass während des Service einen Teller an',
    },
    band2: {
      eyebrow: 'Für die Front gemacht, nicht nur für den Sitzungssaal',
      headline: 'Ihr Team ist längst in Bewegung. Sundae bewegt sich mit.',
      sub: 'Live-Tempo, Personal und Ausnahmen über jeden Standort - damit die Korrektur um 19 Uhr verantwortet, umgesetzt und bis zum Feierabend nachgemessen wird.',
      alt: 'Ein Koch arbeitet an der Linie, am Pass während des Service',
    },
    closer: {
      eyebrow: 'Ihr Gastraum, Ihre Entscheidung',
      headlineLead: 'Die besten Betreiber haben nicht mehr Stunden.',
      headlineEmphasis: 'Sie holen mehr Marge zurück.',
      sub: 'Sundae findet den Gewinn, der Ihnen entgeht, und belegt, was zurückgeholt wurde - über jeden Standort, in jeder Schicht.',
      alt: 'Ein Gastgeber kümmert sich um Gäste in einem warm beleuchteten Gastraum',
    },
  },
  nl: {
    band1: {
      eyebrow: 'Van de pass naar de P&L',
      headline: 'Vind de winst die uw restaurant weglekt.',
      sub: 'Niet weer een dashboard om te checken. Sundae leest elke dienst, elke gast en elke regel - vindt waar de marge weglekt, wijst de oplossing toe aan een verantwoordelijke en meet wat er terugkomt.',
      alt: 'Een chef maakt een gerecht af op de pass tijdens de service',
    },
    band2: {
      eyebrow: 'Gemaakt voor de werkvloer, niet alleen voor de bestuurskamer',
      headline: 'Uw team beweegt al snel. Sundae beweegt mee.',
      sub: 'Live tempo, personeel en uitzonderingen over elke vestiging - zodat de oplossing die u om 19.00 uur kiest wordt toegewezen, uitgevoerd en bij sluitingstijd nagemeten.',
      alt: 'Een chef werkt aan de lijn, op de pass tijdens de service',
    },
    closer: {
      eyebrow: 'Uw zaak, uw beslissing',
      headlineLead: 'De beste operators hebben niet meer uren.',
      headlineEmphasis: 'Ze halen meer marge terug.',
      sub: 'Sundae vindt de winst die u weglekt en bewijst wat er is teruggehaald - over elke vestiging, in elke dienst.',
      alt: 'Een gastheer ontvangt gasten in een warm verlichte eetzaal',
    },
  },
  pt: {
    band1: {
      eyebrow: 'Da expedição ao P&L',
      headline: 'Encontre o lucro que o seu restaurante está deixando escapar.',
      sub: 'Não é mais um painel para conferir. O Sundae lê cada turno, cada cliente e cada item - encontra onde a margem escapa, encaminha a correção a um responsável e mede o que é recuperado.',
      alt: 'Um chef finalizando um prato na expedição durante o serviço',
    },
    band2: {
      eyebrow: 'Feito para a linha de frente, não só para a diretoria',
      headline: 'Sua equipe já está em ritmo acelerado. Sundae acompanha.',
      sub: 'Ritmo ao vivo, mão de obra e exceções em cada unidade - para que a correção que você faz às 19h seja assumida, executada e medida até o fechamento.',
      alt: 'Um chef trabalhando na praça, na expedição durante o serviço',
    },
    closer: {
      eyebrow: 'Seu salão, sua decisão',
      headlineLead: 'Os melhores operadores não têm mais horas.',
      headlineEmphasis: 'Recuperam mais margem.',
      sub: 'O Sundae encontra o lucro que escapa de você e comprova o que foi recuperado - em cada unidade, em cada turno.',
      alt: 'Um anfitrião recebendo clientes em um salão com iluminação acolhedora',
    },
  },
  hi: {
    band1: {
      eyebrow: 'पास से P&L तक',
      headline: 'वह मुनाफ़ा खोजें जो आपके रेस्तरां से रिस रहा है।',
      sub: 'देखने के लिए एक और डैशबोर्ड नहीं। Sundae हर शिफ्ट, हर मेहमान और हर मद को पढ़ता है - पता लगाता है कि मार्जिन कहाँ रिस रहा है, समाधान को एक ज़िम्मेदार व्यक्ति को सौंपता है, और जो वापस मिला उसे मापता है।',
      alt: 'सर्विस के दौरान पास पर एक व्यंजन को अंतिम रूप देता शेफ',
    },
    band2: {
      eyebrow: 'फ्रंट-लाइन के लिए बना, सिर्फ़ बोर्डरूम के लिए नहीं',
      headline: 'आपकी टीम पहले से तेज़ चल रही है। Sundae उनके साथ चलता है।',
      sub: 'हर आउटलेट पर लाइव रफ्तार, स्टाफ और अपवाद - ताकि शाम 7 बजे आप जो समाधान करें उसे एक ज़िम्मेदार को सौंपा जाए, लागू किया जाए, और बंद होने तक मापा जाए।',
      alt: 'सर्विस के दौरान रसोई की लाइन पर, पास पर काम करता शेफ',
    },
    closer: {
      eyebrow: 'आपका फ्लोर, आपका फैसला',
      headlineLead: 'बेहतरीन ऑपरेटरों के पास ज़्यादा घंटे नहीं होते।',
      headlineEmphasis: 'वे ज़्यादा मार्जिन वापस पाते हैं।',
      sub: 'Sundae वह मुनाफ़ा खोजता है जो आपसे रिस रहा है और वापस पाई गई रकम को साबित करता है - हर आउटलेट पर, हर शिफ्ट में।',
      alt: 'गर्म रोशनी वाले डाइनिंग रूम में मेहमानों की आवभगत करता मेज़बान',
    },
  },
  ur: {
    band1: {
      eyebrow: 'پاس سے P&L تک',
      headline: 'وہ منافع تلاش کریں جو آپ کے ریستوران سے رِس رہا ہے۔',
      sub: 'دیکھنے کے لیے ایک اور ڈیش بورڈ نہیں۔ Sundae ہر شفٹ، ہر مہمان اور ہر مدّ کو پڑھتا ہے - یہ جانتا ہے کہ مارجن کہاں رِس رہا ہے، اصلاح کسی ذمہ دار کے سپرد کرتا ہے، اور جو واپس ملا اُسے ناپتا ہے۔',
      alt: 'سروس کے دوران پاس پر ایک ڈش کو حتمی شکل دیتا شیف',
    },
    band2: {
      eyebrow: 'فرنٹ لائن کے لیے بنایا گیا، صرف بورڈ روم کے لیے نہیں',
      headline: 'آپ کی ٹیم پہلے ہی تیزی سے کام کر رہی ہے۔ Sundae اُن کے ساتھ چلتا ہے۔',
      sub: 'ہر آؤٹ لیٹ پر لائیو رفتار، عملہ اور استثناءات - تاکہ شام 7 بجے آپ جو اصلاح کریں اُسے کسی ذمہ دار کے سپرد کیا جائے، نافذ کیا جائے، اور بندش تک ناپا جائے۔',
      alt: 'سروس کے دوران کچن لائن پر، پاس پر کام کرتا شیف',
    },
    closer: {
      eyebrow: 'آپ کا فلور، آپ کا فیصلہ',
      headlineLead: 'بہترین آپریٹرز کے پاس زیادہ گھنٹے نہیں ہوتے۔',
      headlineEmphasis: 'وہ زیادہ مارجن واپس حاصل کرتے ہیں۔',
      sub: 'Sundae وہ منافع تلاش کرتا ہے جو آپ سے رِس رہا ہے اور واپس حاصل کی گئی رقم کو ثابت کرتا ہے - ہر آؤٹ لیٹ پر، ہر شفٹ میں۔',
      alt: 'گرم روشنی والے ڈائننگ روم میں مہمانوں کی خدمت کرتا میزبان',
    },
  },
  it: {
    band1: {
      eyebrow: 'Dal passe al P&L',
      headline: 'Trova il profitto che il tuo ristorante lascia sfuggire.',
      sub: "Non l'ennesima dashboard da controllare. Sundae legge ogni turno, ogni coperto e ogni voce - trova dove si disperde il margine, affida la correzione a un responsabile e ne misura il recupero.",
      alt: 'Uno chef che completa un piatto al passe durante il servizio',
    },
    band2: {
      eyebrow: 'Fatto per la prima linea, non solo per la sala riunioni',
      headline: 'Il tuo team si muove già in fretta. Sundae si muove con lui.',
      sub: 'Ritmo in tempo reale, personale ed eccezioni in ogni punto vendita - così la correzione che fai alle 19 venga presa in carico, eseguita e misurata entro la chiusura.',
      alt: 'Uno chef al lavoro sulla linea, al passe durante il servizio',
    },
    closer: {
      eyebrow: 'La tua sala, la tua decisione',
      headlineLead: 'I migliori operatori non hanno più ore.',
      headlineEmphasis: 'Recuperano più margine.',
      sub: 'Sundae trova il profitto che ti sfugge e dimostra il margine recuperato - in ogni punto vendita, in ogni turno.',
      alt: "Un maître che accoglie gli ospiti in una sala dall'illuminazione calda",
    },
  },
  pl: {
    band1: {
      eyebrow: 'Od wydawki do P&L',
      headline: 'Znajdź zysk, który wycieka z twojej restauracji.',
      sub: 'Nie kolejny pulpit do sprawdzania. Sundae czyta każdą zmianę, każdego gościa i każdą pozycję - znajduje, gdzie wycieka marża, przekazuje naprawę odpowiedzialnej osobie i mierzy, ile wróciło.',
      alt: 'Kucharz kończy danie na wydawce podczas serwisu',
    },
    band2: {
      eyebrow: 'Stworzone dla pierwszej linii, nie tylko dla sali zarządu',
      headline: 'Twój zespół już działa szybko. Sundae nadąża za nim.',
      sub: 'Tempo na żywo, obsada i wyjątki w każdym lokalu - żeby naprawa, którą wdrażasz o 19, została przypisana, wykonana i zmierzona przed zamknięciem.',
      alt: 'Kucharz pracuje na linii, przy wydawce podczas serwisu',
    },
    closer: {
      eyebrow: 'Twoja sala, twoja decyzja',
      headlineLead: 'Najlepsi operatorzy nie mają więcej godzin.',
      headlineEmphasis: 'Odzyskują większą marżę.',
      sub: 'Sundae znajduje zysk, który ci ucieka, i dowodzi, ile udało się odzyskać - w każdym lokalu, na każdej zmianie.',
      alt: 'Gospodarz obsługujący gości w ciepło oświetlonej sali',
    },
  },
  tr: {
    band1: {
      eyebrow: "Mutfak pasından P&L'ye",
      headline: 'Restoranınızın sızdırdığı kârı bulun.',
      sub: 'Kontrol edilecek bir gösterge paneli daha değil. Sundae her vardiyayı, her misafiri ve her kalemi okur - marjın nereden sızdığını bulur, düzeltmeyi bir sorumluya yönlendirir ve geri kazanılanı ölçer.',
      alt: 'Servis sırasında pasta bir tabağı tamamlayan şef',
    },
    band2: {
      eyebrow: 'Yalnızca toplantı odası için değil, sahanın ön saflarına göre tasarlandı',
      headline: 'Ekibiniz zaten hızlı hareket ediyor. Sundae onunla birlikte hareket eder.',
      sub: "Her şubede canlı tempo, iş gücü ve istisnalar - böylece akşam 19.00'da yaptığınız düzeltme sahiplenilir, uygulanır ve kapanışa kadar ölçülür.",
      alt: 'Servis sırasında mutfak hattında, pasta çalışan şef',
    },
    closer: {
      eyebrow: 'Sizin salonunuz, sizin kararınız',
      headlineLead: 'En iyi işletmecilerin daha fazla saati yoktur.',
      headlineEmphasis: 'Daha fazla marj geri kazanırlar.',
      sub: 'Sundae sızdırdığınız kârı bulur ve geri kazanılan marjı kanıtlar - her şubede, her vardiyada.',
      alt: 'Sıcak ışıklı bir yemek salonunda misafirleri ağırlayan bir ev sahibi',
    },
  },
  'zh-Hans': {
    band1: {
      eyebrow: '从出菜口到 P&L',
      headline: '找出你的餐厅正在流失的利润。',
      sub: '不是又一个要查看的仪表盘。Sundae 读取每一个班次、每一位客人、每一笔条目--找出利润在哪里流失，把修复交给指定负责人，并度量追回了多少。',
      alt: '服务期间，厨师在出菜口完成摆盘',
    },
    band2: {
      eyebrow: '为一线而造，不只为会议室',
      headline: '你的团队早已快速运转。Sundae 与他们同步。',
      sub: '每一家门店的实时节奏、人力与异常一览无余--让你晚上七点做出的修复有人负责、得到执行，并在打烊前完成度量。',
      alt: '服务期间，厨师在出餐线的出菜口忙碌',
    },
    closer: {
      eyebrow: '你的餐厅，你做主',
      headlineLead: '最优秀的经营者并没有更多时间，',
      headlineEmphasis: '他们只是追回了更多利润。',
      sub: 'Sundae 找出你正在流失的利润，并验证追回的成效--覆盖每一家门店，贯穿每一个班次。',
      alt: '在暖光餐厅中招待客人的迎宾',
    },
  },
  ja: {
    band1: {
      eyebrow: 'パスからP&Lまで',
      headline: 'あなたの店から漏れている利益を見つけ出す。',
      sub: '確認すべきダッシュボードがまた増えるわけではありません。Sundae はすべてのシフト、すべての客数、すべての明細を読み取り--利益がどこで漏れているかを突き止め、対処を担当者に割り当て、取り戻した分を測定します。',
      alt: 'サービス中、パスで一皿を仕上げるシェフ',
    },
    band2: {
      eyebrow: '会議室だけでなく、現場の最前線のために',
      headline: 'あなたのチームはすでに速く動いている。Sundae はそれに合わせて動く。',
      sub: '全店舗のリアルタイムなペース、人員、例外を把握--夜7時に打つ対処に担当者がつき、実行され、閉店までに測定されます。',
      alt: 'サービス中、厨房のラインのパスで働くシェフ',
    },
    closer: {
      eyebrow: 'あなたのフロア、あなたの判断',
      headlineLead: '優れた経営者に、時間が多いわけではありません。',
      headlineEmphasis: '取り戻す利益が多いのです。',
      sub: 'Sundae は漏れている利益を見つけ、取り戻した成果を証明します--全店舗で、すべてのシフトで。',
      alt: '暖かな照明のダイニングで客をもてなすホスト',
    },
  },
  ko: {
    band1: {
      eyebrow: '패스에서 P&L까지',
      headline: '당신의 레스토랑에서 새어 나가는 이익을 찾아내세요.',
      sub: '확인해야 할 대시보드가 하나 더 느는 게 아닙니다. Sundae는 모든 근무, 모든 손님, 모든 항목을 읽어내고 - 마진이 어디서 새는지 짚어내며, 해결을 담당자에게 배정하고, 되찾은 금액을 측정합니다.',
      alt: '서비스 중 패스에서 요리를 마무리하는 셰프',
    },
    band2: {
      eyebrow: '회의실만이 아니라 현장 최전선을 위해',
      headline: '당신의 팀은 이미 빠르게 움직입니다. Sundae는 그 속도에 맞춰 함께 움직입니다.',
      sub: '모든 매장의 실시간 페이스, 인력, 예외 상황까지 - 저녁 7시에 내리는 해결에 담당자가 정해지고, 실행되며, 마감까지 측정됩니다.',
      alt: '서비스 중 주방 라인의 패스에서 일하는 셰프',
    },
    closer: {
      eyebrow: '당신의 매장, 당신의 결정',
      headlineLead: '최고의 운영자에게 시간이 더 많은 건 아닙니다.',
      headlineEmphasis: '더 많은 마진을 되찾을 뿐입니다.',
      sub: 'Sundae는 새어 나가는 이익을 찾아내고 되찾은 성과를 증명합니다 - 모든 매장에서, 모든 근무마다.',
      alt: '따뜻한 조명의 다이닝룸에서 손님을 맞이하는 호스트',
    },
  },
  id: {
    band1: {
      eyebrow: 'Dari pass hingga P&L',
      headline: 'Temukan laba yang bocor dari restoran Anda.',
      sub: 'Bukan satu dasbor lagi untuk dicek. Sundae membaca setiap shift, setiap tamu, dan setiap item - menemukan di mana margin bocor, mengarahkan perbaikan ke seorang penanggung jawab, dan mengukur yang berhasil dipulihkan.',
      alt: 'Seorang koki menyelesaikan hidangan di pass saat layanan berlangsung',
    },
    band2: {
      eyebrow: 'Dibuat untuk garda depan, bukan hanya ruang rapat',
      headline: 'Tim Anda sudah bergerak cepat. Sundae bergerak bersama mereka.',
      sub: 'Tempo langsung, tenaga kerja, dan pengecualian di setiap outlet - agar perbaikan yang Anda lakukan pukul 7 malam ditugaskan ke pemilik, dijalankan, dan diukur sebelum tutup.',
      alt: 'Seorang koki bekerja di lini dapur, di pass saat layanan',
    },
    closer: {
      eyebrow: 'Ruang Anda, keputusan Anda',
      headlineLead: 'Operator terbaik tidak punya lebih banyak waktu.',
      headlineEmphasis: 'Mereka memulihkan lebih banyak margin.',
      sub: 'Sundae menemukan laba yang bocor dari Anda dan membuktikan pemulihannya - di setiap outlet, di setiap shift.',
      alt: 'Seorang pramutamu menyambut tamu di ruang makan berpencahayaan hangat',
    },
  },
  vi: {
    band1: {
      eyebrow: 'Từ quầy ra món đến P&L',
      headline: 'Tìm ra khoản lợi nhuận đang thất thoát khỏi nhà hàng của bạn.',
      sub: 'Không phải thêm một bảng điều khiển để kiểm tra. Sundae đọc từng ca, từng lượt khách và từng khoản mục - tìm ra nơi biên lợi nhuận đang rò rỉ, giao việc khắc phục cho một người chịu trách nhiệm, và đo lại phần đã thu về.',
      alt: 'Một đầu bếp hoàn thiện món ăn tại quầy ra món trong giờ phục vụ',
    },
    band2: {
      eyebrow: 'Tạo ra cho tuyến đầu, không chỉ cho phòng họp',
      headline: 'Đội ngũ của bạn vốn đã chạy rất nhanh. Sundae chạy cùng họ.',
      sub: 'Nhịp độ trực tiếp, nhân sự và ngoại lệ trên mọi chi nhánh - để cách khắc phục bạn đưa ra lúc 7 giờ tối có người phụ trách, được thực thi và đo lại trước giờ đóng cửa.',
      alt: 'Một đầu bếp làm việc trên dây chuyền bếp, tại quầy ra món trong giờ phục vụ',
    },
    closer: {
      eyebrow: 'Sàn của bạn, quyết định của bạn',
      headlineLead: 'Những nhà điều hành giỏi nhất không có nhiều giờ hơn.',
      headlineEmphasis: 'Họ thu về nhiều biên lợi nhuận hơn.',
      sub: 'Sundae tìm ra khoản lợi nhuận đang thất thoát khỏi bạn và chứng minh phần đã thu về - trên mọi chi nhánh, trong mọi ca làm.',
      alt: 'Một người tiếp đón đang phục vụ khách trong phòng ăn ấm áp ánh đèn',
    },
  },
  ro: {
    band1: {
      eyebrow: 'De la pass la P&L',
      headline: 'Găsește profitul care se scurge din restaurantul tău.',
      sub: 'Nu încă un panou de verificat. Sundae citește fiecare tură, fiecare client și fiecare poziție - găsește unde se scurge marja, direcționează remedierea către un responsabil și măsoară cât s-a recuperat.',
      alt: 'Un bucătar finalizează un preparat la pass în timpul serviciului',
    },
    band2: {
      eyebrow: 'Făcut pentru prima linie, nu doar pentru sala de consiliu',
      headline: 'Echipa ta se mișcă deja repede. Sundae se mișcă odată cu ea.',
      sub: 'Ritm în timp real, personal și excepții în fiecare locație - astfel încât remedierea pe care o faci la 19:00 să fie preluată, executată și măsurată până la închidere.',
      alt: 'Un bucătar lucrând la linie, la pass în timpul serviciului',
    },
    closer: {
      eyebrow: 'Sala ta, decizia ta',
      headlineLead: 'Cei mai buni operatori nu au mai multe ore.',
      headlineEmphasis: 'Recuperează mai multă marjă.',
      sub: 'Sundae găsește profitul care îți scapă și dovedește cât s-a recuperat - în fiecare locație, în fiecare tură.',
      alt: 'O gazdă care se ocupă de oaspeți într-o sală cu lumină caldă',
    },
  },
  sv: {
    band1: {
      eyebrow: 'Från passet till P&L',
      headline: 'Hitta vinsten som läcker ut ur din restaurang.',
      sub: 'Inte ännu en instrumentpanel att kolla. Sundae läser varje skift, varje gäst och varje rad - hittar var marginalen läcker, tilldelar åtgärden en ansvarig och mäter hur mycket som kommer tillbaka.',
      alt: 'En kock gör färdigt en tallrik vid passet under serveringen',
    },
    band2: {
      eyebrow: 'Byggt för frontlinjen, inte bara för styrelserummet',
      headline: 'Ditt team rör sig redan snabbt. Sundae rör sig med dem.',
      sub: 'Live-tempo, bemanning och avvikelser för varje enhet - så att åtgärden du gör klockan 19 tilldelas en ägare, genomförs och mäts upp innan stängning.',
      alt: 'En kock arbetar vid linjen, vid passet under serveringen',
    },
    closer: {
      eyebrow: 'Din matsal, ditt beslut',
      headlineLead: 'De bästa operatörerna har inte fler timmar.',
      headlineEmphasis: 'De tar tillbaka mer marginal.',
      sub: 'Sundae hittar vinsten som läcker ifrån dig och bevisar hur mycket som tagits tillbaka - för varje enhet, i varje skift.',
      alt: 'En värd tar hand om gäster i en varmt upplyst matsal',
    },
  },
  bn: {
    band1: {
      eyebrow: 'পাস থেকে P&L পর্যন্ত',
      headline: 'আপনার রেস্তোরাঁ থেকে যে মুনাফা বেরিয়ে যাচ্ছে তা খুঁজে বের করুন।',
      sub: 'দেখার জন্য আরেকটি ড্যাশবোর্ড নয়। Sundae প্রতিটি শিফট, প্রতিটি অতিথি এবং প্রতিটি আইটেম পড়ে - খুঁজে বের করে মার্জিন কোথায় বেরিয়ে যাচ্ছে, সমাধানটি একজন দায়িত্বপ্রাপ্ত ব্যক্তির হাতে তুলে দেয়, আর যা ফিরে এল তা মেপে দেখায়।',
      alt: 'পরিবেশনের সময় পাসে একটি প্লেট সাজিয়ে শেষ করছেন একজন শেফ',
    },
    band2: {
      eyebrow: 'ফ্রন্টলাইনের জন্য তৈরি, শুধু বোর্ডরুমের জন্য নয়',
      headline: 'আপনার দল ইতিমধ্যেই দ্রুত এগোচ্ছে। Sundae তাদের সঙ্গেই এগোয়।',
      sub: 'প্রতিটি আউটলেটে সরাসরি গতি, জনবল ও ব্যতিক্রম - যাতে সন্ধ্যা ৭টায় আপনার নেওয়া সমাধান একজন দায়িত্বপ্রাপ্তকে দেওয়া হয়, বাস্তবায়িত হয়, আর বন্ধের আগেই মাপা হয়।',
      alt: 'পরিবেশনের সময় রান্নাঘরের লাইনে, পাসে কাজ করছেন একজন শেফ',
    },
    closer: {
      eyebrow: 'আপনার ফ্লোর, আপনার সিদ্ধান্ত',
      headlineLead: 'সেরা পরিচালকদের হাতে বেশি সময় থাকে না।',
      headlineEmphasis: 'তাঁরা বেশি মার্জিন ফিরে পান।',
      sub: 'Sundae আপনার হাত থেকে বেরিয়ে যাওয়া মুনাফা খুঁজে বের করে এবং যা ফিরে এল তা প্রমাণ করে - প্রতিটি আউটলেটে, প্রতিটি শিফটে।',
      alt: 'উষ্ণ আলোয় সজ্জিত ডাইনিং রুমে অতিথিদের আপ্যায়ন করছেন একজন হোস্ট',
    },
  },
  th: {
    band1: {
      eyebrow: 'จากหน้าจ่ายอาหารถึง P&L',
      headline: 'ค้นหากำไรที่ร้านของคุณกำลังรั่วไหลออกไป',
      sub: 'ไม่ใช่แดชบอร์ดอีกอันที่ต้องคอยดู Sundae อ่านทุกกะ ทุกลูกค้า และทุกรายการ - ค้นหาว่ามาร์จินรั่วไหลตรงไหน มอบหมายการแก้ไขให้ผู้รับผิดชอบ แล้ววัดผลที่กู้คืนกลับมา',
      alt: 'เชฟกำลังจัดจานให้เสร็จที่หน้าจ่ายอาหารระหว่างการให้บริการ',
    },
    band2: {
      eyebrow: 'สร้างมาเพื่อแนวหน้า ไม่ใช่แค่ห้องประชุมผู้บริหาร',
      headline: 'ทีมของคุณเคลื่อนไหวเร็วอยู่แล้ว Sundae เคลื่อนไหวไปพร้อมกับพวกเขา',
      sub: 'จังหวะแบบเรียลไทม์ กำลังคน และข้อยกเว้นในทุกสาขา - เพื่อให้การแก้ไขที่คุณทำตอนหนึ่งทุ่มมีผู้รับผิดชอบ ได้ลงมือทำ และวัดผลได้ก่อนปิดร้าน',
      alt: 'เชฟกำลังทำงานที่ไลน์ครัว ที่หน้าจ่ายอาหารระหว่างการให้บริการ',
    },
    closer: {
      eyebrow: 'พื้นที่ของคุณ การตัดสินใจของคุณ',
      headlineLead: 'ผู้บริหารที่เก่งที่สุดไม่ได้มีเวลามากกว่า',
      headlineEmphasis: 'พวกเขากู้มาร์จินกลับคืนได้มากกว่า',
      sub: 'Sundae ค้นหากำไรที่กำลังรั่วไหลจากคุณ และพิสูจน์ผลที่กู้คืนได้ - ในทุกสาขา ทุกกะ',
      alt: 'พนักงานต้อนรับกำลังดูแลแขกในห้องอาหารที่มีแสงไฟอบอุ่น',
    },
  },
  ms: {
    band1: {
      eyebrow: 'Dari pass ke P&L',
      headline: 'Cari keuntungan yang bocor daripada restoran anda.',
      sub: 'Bukan satu lagi papan pemuka untuk disemak. Sundae membaca setiap syif, setiap tetamu dan setiap butiran - mencari di mana margin bocor, menyerahkan pembetulan kepada seorang penanggungjawab, dan mengukur jumlah yang dipulihkan.',
      alt: 'Seorang cef menyiapkan hidangan di pass semasa servis',
    },
    band2: {
      eyebrow: 'Dibina untuk barisan hadapan, bukan hanya bilik mesyuarat',
      headline: 'Pasukan anda sudah pun bergerak pantas. Sundae bergerak bersama mereka.',
      sub: 'Rentak langsung, tenaga kerja dan pengecualian di setiap cawangan - supaya pembetulan yang anda buat pada pukul 7 malam ditugaskan kepada pemilik, dilaksanakan, dan diukur sebelum tutup.',
      alt: 'Seorang cef bekerja di barisan dapur, di pass semasa servis',
    },
    closer: {
      eyebrow: 'Ruang anda, keputusan anda',
      headlineLead: 'Pengendali terbaik tidak mempunyai lebih banyak masa.',
      headlineEmphasis: 'Mereka memulihkan lebih banyak margin.',
      sub: 'Sundae mencari keuntungan yang bocor daripada anda dan membuktikan jumlah yang dipulihkan - di setiap cawangan, di setiap syif.',
      alt: 'Seorang hos melayan tetamu di ruang makan yang bercahaya hangat',
    },
  },
};
