import type { WebsiteLocale } from '@/lib/i18n';

/**
 * Copy for the homepage slim 4-card product preview (SectionProductPreview).
 *
 * Hand-authored native transcreation per locale - NOT literal word-for-word - so
 * each line reads the way an operator in that market would actually say it. Follows
 * the editorialCopy.ts pattern: a self-contained locale-keyed map resolved at render
 * with an English fallback, kept out of the large per-locale i18n.ts trees.
 *
 * Glossary discipline (mirrors scripts/qa-translation-quality.mjs): the product
 * surface names "Pulse", "Foresight", "Insights", "Sundae Intelligence", "POS", and
 * the role abbreviation "GM" stay untranslated in every locale. The card identity
 * (`id`, `src`, `href`) is NOT part of this copy map - only the human-readable text.
 *
 * Restaurant terms of art - "cover" (a guest served), "daypart", "the shift",
 * "food cost" - are rendered with each market's native vocabulary, not calqued.
 */

export type ProductPreviewCardCopy = {
  /** alt text on the screenshot (accessibility). */
  alt: string;
  caption: string;
  whatYouSee: string;
  /** Deep-link label; keeps the product name untranslated for the wordmark/glossary. */
  productLabel: string;
};

export type ProductPreviewCopy = {
  eyebrow: string;
  headline: string;
  sub: string;
  cards: {
    execSummary: ProductPreviewCardCopy;
    pulseWallboard: ProductPreviewCardCopy;
    foresightScenarios: ProductPreviewCardCopy;
    intelligence: ProductPreviewCardCopy;
  };
  /** "every view adapts to the role" note under the grid. */
  adaptsNote: string;
  /** italic footnote lead-in (before the diagnostic link). */
  footnoteLead: string;
  /** the Operations Diagnostic link text. */
  diagnosticLink: string;
  /** italic footnote tail (after the diagnostic link). */
  footnoteTail: string;
  /** lightbox a11y + nav labels. */
  openFullSize: string;
  closeLightbox: string;
  prevImage: string;
  nextImage: string;
  /** lightbox footer hint; {index}/{total} are interpolated. */
  lightboxHint: string;
};

export const productPreviewCopy: Record<WebsiteLocale, ProductPreviewCopy> = {
  en: {
    eyebrow: 'SEE THE PRODUCT',
    headline: 'This is what your team actually sees.',
    sub: 'Four surfaces from across the platform. Click any to enlarge - then explore the full gallery on each product page.',
    cards: {
      execSummary: {
        alt: 'Executive Summary - KPIs, alerts, and health scores across every module',
        caption: 'Executive Summary',
        whatYouSee:
          "One health score across every module surfaces the one thing that needs you today - here, food-cost variance running well above where it should be - so nothing important hides in a report until it's too late.",
        productLabel: 'See full Insights gallery →',
      },
      pulseWallboard: {
        alt: 'Pulse - live sales pacing against target',
        caption: 'Pulse - Live Pacing',
        whatYouSee:
          'The live shift at a glance - sales against target for every outlet - with exactly what it takes to close the gap before close: the per-hour pace each location needs for the rest of service.',
        productLabel: 'See full Pulse gallery →',
      },
      foresightScenarios: {
        alt: 'Foresight Scenarios - scenario library with 10 quick-start templates',
        caption: 'Foresight - Scenarios',
        whatYouSee:
          'Model the decision before you commit to it. Start from a template - a 5% price move, a 10% labor cut, a marketing push - and see the impact on revenue and margin before any of it is real.',
        productLabel: 'See full Foresight gallery →',
      },
      intelligence: {
        alt: 'Sundae Intelligence - conversational decision interface',
        caption: 'Sundae Intelligence',
        whatYouSee:
          'Ask your business anything in plain English. Questions like "what drove last night\'s revenue?" come back with the answer, the numbers behind it, and the sources - a conversation, not a dashboard.',
        productLabel: 'See full Intelligence gallery →',
      },
    },
    adaptsNote:
      "And these aren't fixed - every view adapts to the role and the way your team works, so a CEO, a GM, and a finance lead each see exactly what matters to them.",
    footnoteLead: 'Live in-product surfaces. Synthetic data shown for illustration.',
    diagnosticLink: 'Take the Operations Diagnostic',
    footnoteTail: 'to see what your view would look like.',
    openFullSize: 'Open {caption} at full size',
    closeLightbox: 'Close lightbox',
    prevImage: 'Previous image',
    nextImage: 'Next image',
    lightboxHint: '{index} / {total} · Esc to close · ← → to navigate',
  },
  ar: {
    eyebrow: 'شاهد المنتج',
    headline: 'هذا ما يراه فريقك فعلاً.',
    sub: 'أربع شاشات من مختلف أنحاء المنصة. انقر أيًّا منها لتكبيرها - ثم استكشف المعرض الكامل في صفحة كل منتج.',
    cards: {
      execSummary: {
        alt: 'الملخص التنفيذي - مؤشرات الأداء والتنبيهات ودرجات السلامة عبر كل وحدة',
        caption: 'الملخص التنفيذي',
        whatYouSee:
          'درجة سلامة واحدة عبر كل وحدة تُبرز الأمر الوحيد الذي يحتاج إليك اليوم - هنا، تباين تكلفة الطعام يتجاوز بكثير ما ينبغي - فلا يختبئ شيء مهم في تقرير حتى يفوت الأوان.',
        productLabel: 'شاهد معرض Insights الكامل ←',
      },
      pulseWallboard: {
        alt: 'Pulse - إيقاع المبيعات الحي مقابل الهدف',
        caption: 'Pulse - الإيقاع الحي',
        whatYouSee:
          'الوردية الجارية بلمحة - المبيعات مقابل الهدف لكل فرع - مع ما يلزم تمامًا لسدّ الفجوة قبل الإغلاق: المعدّل بالساعة الذي يحتاجه كل موقع لبقية الخدمة.',
        productLabel: 'شاهد معرض Pulse الكامل ←',
      },
      foresightScenarios: {
        alt: 'سيناريوهات Foresight - مكتبة سيناريوهات تضم 10 قوالب جاهزة للبدء السريع',
        caption: 'Foresight - السيناريوهات',
        whatYouSee:
          'انمذج القرار قبل أن تلتزم به. ابدأ من قالب - تغيير سعر بنسبة 5%، خفض عمالة بنسبة 10%، حملة تسويقية - وشاهد الأثر على الإيرادات والهامش قبل أن يصبح أي منها واقعًا.',
        productLabel: 'شاهد معرض Foresight الكامل ←',
      },
      intelligence: {
        alt: 'Sundae Intelligence - واجهة قرار حوارية',
        caption: 'Sundae Intelligence',
        whatYouSee:
          'اسأل عملك أي شيء بلغة بسيطة. أسئلة مثل «ما الذي حرّك إيرادات الليلة الماضية؟» تأتيك بالإجابة والأرقام التي تستند إليها والمصادر - محادثة، لا لوحة معلومات.',
        productLabel: 'شاهد معرض Intelligence الكامل ←',
      },
    },
    adaptsNote:
      'وهذه ليست ثابتة - كل عرض يتكيّف مع الدور ومع طريقة عمل فريقك، فيرى الرئيس التنفيذي وGM ومسؤول المالية كلٌّ منهم ما يهمّه تحديدًا.',
    footnoteLead: 'شاشات حية داخل المنتج. البيانات المعروضة اصطناعية لأغراض التوضيح.',
    diagnosticLink: 'أجرِ تشخيص العمليات',
    footnoteTail: 'لترى كيف سيبدو عرضك أنت.',
    openFullSize: 'افتح {caption} بالحجم الكامل',
    closeLightbox: 'إغلاق العارض',
    prevImage: 'الصورة السابقة',
    nextImage: 'الصورة التالية',
    lightboxHint: '{index} / {total} · Esc للإغلاق · ← → للتنقل',
  },
  fr: {
    eyebrow: 'VOIR LE PRODUIT',
    headline: "Voici ce que votre équipe voit vraiment.",
    sub: 'Quatre écrans issus de la plateforme. Cliquez sur l\'un d\'eux pour l\'agrandir - puis explorez la galerie complète sur chaque page produit.',
    cards: {
      execSummary: {
        alt: 'Synthèse de direction - KPI, alertes et indices de santé sur chaque module',
        caption: 'Synthèse de direction',
        whatYouSee:
          "Un seul indice de santé sur tous les modules fait remonter la seule chose qui vous concerne aujourd'hui - ici, un écart de coût matière bien au-dessus de la cible - pour que rien d'important ne se cache dans un rapport jusqu'à ce qu'il soit trop tard.",
        productLabel: 'Voir toute la galerie Insights →',
      },
      pulseWallboard: {
        alt: 'Pulse - cadence des ventes en direct par rapport à l\'objectif',
        caption: 'Pulse - Cadence en direct',
        whatYouSee:
          "Le service en cours d'un coup d'œil - ventes contre objectif pour chaque point de vente - avec exactement ce qu'il faut pour combler l'écart avant la fermeture : la cadence horaire dont chaque site a besoin pour le reste du service.",
        productLabel: 'Voir toute la galerie Pulse →',
      },
      foresightScenarios: {
        alt: 'Scénarios Foresight - bibliothèque de scénarios avec 10 modèles de démarrage rapide',
        caption: 'Foresight - Scénarios',
        whatYouSee:
          "Modélisez la décision avant de vous y engager. Partez d'un modèle - une hausse de prix de 5 %, une coupe de main-d'œuvre de 10 %, une opération marketing - et voyez l'impact sur le chiffre d'affaires et la marge avant que rien ne soit réel.",
        productLabel: 'Voir toute la galerie Foresight →',
      },
      intelligence: {
        alt: 'Sundae Intelligence - interface de décision conversationnelle',
        caption: 'Sundae Intelligence',
        whatYouSee:
          "Posez n'importe quelle question sur votre activité, en langage courant. Des questions comme « qu'est-ce qui a porté le chiffre d'hier soir ? » reviennent avec la réponse, les chiffres derrière et les sources - une conversation, pas un tableau de bord.",
        productLabel: 'Voir toute la galerie Intelligence →',
      },
    },
    adaptsNote:
      "Et rien n'est figé - chaque vue s'adapte au rôle et à la façon dont votre équipe travaille, si bien qu'un PDG, un GM et un responsable financier voient chacun exactement ce qui compte pour lui.",
    footnoteLead: 'Écrans réels du produit. Données synthétiques présentées à titre d\'illustration.',
    diagnosticLink: 'Faites le Diagnostic des opérations',
    footnoteTail: 'pour voir à quoi ressemblerait votre vue.',
    openFullSize: 'Ouvrir {caption} en taille réelle',
    closeLightbox: 'Fermer la visionneuse',
    prevImage: 'Image précédente',
    nextImage: 'Image suivante',
    lightboxHint: '{index} / {total} · Échap pour fermer · ← → pour naviguer',
  },
  es: {
    eyebrow: 'CONOCE EL PRODUCTO',
    headline: 'Esto es lo que tu equipo ve de verdad.',
    sub: 'Cuatro pantallas de toda la plataforma. Haz clic en cualquiera para ampliarla - y luego explora la galería completa en cada página de producto.',
    cards: {
      execSummary: {
        alt: 'Resumen ejecutivo - KPIs, alertas y puntajes de salud en cada módulo',
        caption: 'Resumen ejecutivo',
        whatYouSee:
          'Un solo puntaje de salud en todos los módulos hace aflorar lo único que hoy te necesita - aquí, una variación de costo de comida muy por encima de donde debería estar - para que nada importante se esconda en un informe hasta que sea tarde.',
        productLabel: 'Ver galería completa de Insights →',
      },
      pulseWallboard: {
        alt: 'Pulse - ritmo de ventas en vivo frente al objetivo',
        caption: 'Pulse - Ritmo en vivo',
        whatYouSee:
          'El turno en vivo de un vistazo - ventas frente al objetivo en cada local - con justo lo que hace falta para cerrar la brecha antes del cierre: el ritmo por hora que cada local necesita para el resto del servicio.',
        productLabel: 'Ver galería completa de Pulse →',
      },
      foresightScenarios: {
        alt: 'Escenarios de Foresight - biblioteca de escenarios con 10 plantillas de inicio rápido',
        caption: 'Foresight - Escenarios',
        whatYouSee:
          'Modela la decisión antes de comprometerte. Empieza con una plantilla - una subida de precio del 5%, un recorte de personal del 10%, un impulso de marketing - y ve el impacto en ingresos y margen antes de que nada sea real.',
        productLabel: 'Ver galería completa de Foresight →',
      },
      intelligence: {
        alt: 'Sundae Intelligence - interfaz de decisión conversacional',
        caption: 'Sundae Intelligence',
        whatYouSee:
          'Pregúntale a tu negocio lo que quieras, en lenguaje natural. Preguntas como «¿qué impulsó los ingresos de anoche?» vuelven con la respuesta, los números detrás y las fuentes - una conversación, no un panel.',
        productLabel: 'Ver galería completa de Intelligence →',
      },
    },
    adaptsNote:
      'Y nada de esto es fijo - cada vista se adapta al rol y a la forma de trabajar de tu equipo, así que un CEO, un GM y un responsable de finanzas ven cada uno justo lo que les importa.',
    footnoteLead: 'Pantallas reales del producto. Datos sintéticos mostrados a modo de ilustración.',
    diagnosticLink: 'Haz el Diagnóstico de Operaciones',
    footnoteTail: 'para ver cómo se vería tu vista.',
    openFullSize: 'Abrir {caption} a tamaño completo',
    closeLightbox: 'Cerrar visor',
    prevImage: 'Imagen anterior',
    nextImage: 'Imagen siguiente',
    lightboxHint: '{index} / {total} · Esc para cerrar · ← → para navegar',
  },
  de: {
    eyebrow: 'DAS PRODUKT ANSEHEN',
    headline: 'Das sieht Ihr Team tatsächlich.',
    sub: 'Vier Ansichten aus der gesamten Plattform. Klicken Sie eine an, um sie zu vergrößern - und sehen Sie dann die volle Galerie auf jeder Produktseite.',
    cards: {
      execSummary: {
        alt: 'Executive Summary - KPIs, Warnungen und Health-Scores über jedes Modul',
        caption: 'Executive Summary',
        whatYouSee:
          'Ein Health-Score über alle Module hebt das Eine hervor, das Sie heute braucht - hier eine Wareneinsatz-Abweichung deutlich über dem Soll - damit nichts Wichtiges in einem Bericht versteckt bleibt, bis es zu spät ist.',
        productLabel: 'Komplette Insights-Galerie ansehen →',
      },
      pulseWallboard: {
        alt: 'Pulse - Live-Verkaufstempo gegen das Ziel',
        caption: 'Pulse - Live-Tempo',
        whatYouSee:
          'Die laufende Schicht auf einen Blick - Umsatz gegen Ziel für jeden Standort - mit genau dem, was nötig ist, um die Lücke bis zum Feierabend zu schließen: das Stundentempo, das jeder Standort für den Rest des Service braucht.',
        productLabel: 'Komplette Pulse-Galerie ansehen →',
      },
      foresightScenarios: {
        alt: 'Foresight-Szenarien - Szenariobibliothek mit 10 Schnellstart-Vorlagen',
        caption: 'Foresight - Szenarien',
        whatYouSee:
          'Modellieren Sie die Entscheidung, bevor Sie sich festlegen. Starten Sie mit einer Vorlage - 5 % Preisänderung, 10 % weniger Personal, eine Marketingaktion - und sehen Sie die Wirkung auf Umsatz und Marge, bevor irgendetwas real wird.',
        productLabel: 'Komplette Foresight-Galerie ansehen →',
      },
      intelligence: {
        alt: 'Sundae Intelligence - dialogbasierte Entscheidungsoberfläche',
        caption: 'Sundae Intelligence',
        whatYouSee:
          'Fragen Sie Ihr Geschäft alles, in normaler Sprache. Fragen wie „Was hat den Umsatz von gestern Abend getrieben?“ kommen mit der Antwort, den Zahlen dahinter und den Quellen zurück - ein Gespräch, kein Dashboard.',
        productLabel: 'Komplette Intelligence-Galerie ansehen →',
      },
    },
    adaptsNote:
      'Und nichts davon ist starr - jede Ansicht passt sich der Rolle und der Arbeitsweise Ihres Teams an, sodass ein CEO, ein GM und eine Finanzleitung jeweils genau das sehen, was für sie zählt.',
    footnoteLead: 'Echte Produktansichten. Synthetische Daten zur Veranschaulichung.',
    diagnosticLink: 'Machen Sie das Operations-Diagnostic',
    footnoteTail: 'um zu sehen, wie Ihre Ansicht aussehen würde.',
    openFullSize: '{caption} in voller Größe öffnen',
    closeLightbox: 'Lightbox schließen',
    prevImage: 'Vorheriges Bild',
    nextImage: 'Nächstes Bild',
    lightboxHint: '{index} / {total} · Esc zum Schließen · ← → zum Navigieren',
  },
  nl: {
    eyebrow: 'BEKIJK HET PRODUCT',
    headline: 'Dit is wat uw team echt ziet.',
    sub: 'Vier schermen uit het hele platform. Klik er een aan om te vergroten - en bekijk daarna de volledige galerij op elke productpagina.',
    cards: {
      execSummary: {
        alt: 'Executive Summary - KPI\'s, signalen en gezondheidsscores over elke module',
        caption: 'Executive Summary',
        whatYouSee:
          'Eén gezondheidsscore over alle modules brengt het ene ding naar boven dat u vandaag nodig heeft - hier een wareneinsatz-afwijking ver boven de norm - zodat niets belangrijks zich in een rapport verstopt tot het te laat is.',
        productLabel: 'Bekijk de volledige Insights-galerij →',
      },
      pulseWallboard: {
        alt: 'Pulse - live verkooptempo tegen het doel',
        caption: 'Pulse - Live tempo',
        whatYouSee:
          'De lopende dienst in één oogopslag - omzet tegen doel voor elke vestiging - met precies wat nodig is om het gat voor sluitingstijd te dichten: het uurtempo dat elke locatie nodig heeft voor de rest van de service.',
        productLabel: 'Bekijk de volledige Pulse-galerij →',
      },
      foresightScenarios: {
        alt: 'Foresight-scenario\'s - scenariobibliotheek met 10 snelstartsjablonen',
        caption: 'Foresight - Scenario\'s',
        whatYouSee:
          'Model de beslissing voordat u zich vastlegt. Begin met een sjabloon - 5% prijswijziging, 10% minder personeel, een marketingactie - en zie de impact op omzet en marge nog voordat iets echt is.',
        productLabel: 'Bekijk de volledige Foresight-galerij →',
      },
      intelligence: {
        alt: 'Sundae Intelligence - conversationele beslisinterface',
        caption: 'Sundae Intelligence',
        whatYouSee:
          'Vraag uw zaak alles, in gewone taal. Vragen als "wat dreef de omzet van gisteravond?" komen terug met het antwoord, de cijfers erachter en de bronnen - een gesprek, geen dashboard.',
        productLabel: 'Bekijk de volledige Intelligence-galerij →',
      },
    },
    adaptsNote:
      'En niets ligt vast - elke weergave past zich aan de rol en de werkwijze van uw team aan, zodat een CEO, een GM en een finance-lead elk precies zien wat voor hen telt.',
    footnoteLead: 'Echte schermen uit het product. Synthetische data getoond ter illustratie.',
    diagnosticLink: 'Doe de Operations Diagnostic',
    footnoteTail: 'om te zien hoe uw weergave eruit zou zien.',
    openFullSize: '{caption} op volledige grootte openen',
    closeLightbox: 'Lightbox sluiten',
    prevImage: 'Vorige afbeelding',
    nextImage: 'Volgende afbeelding',
    lightboxHint: '{index} / {total} · Esc om te sluiten · ← → om te navigeren',
  },
  pt: {
    eyebrow: 'VEJA O PRODUTO',
    headline: 'É isto que a sua equipe realmente vê.',
    sub: 'Quatro telas de toda a plataforma. Clique em qualquer uma para ampliar - depois explore a galeria completa em cada página de produto.',
    cards: {
      execSummary: {
        alt: 'Resumo executivo - KPIs, alertas e índices de saúde em cada módulo',
        caption: 'Resumo executivo',
        whatYouSee:
          'Um único índice de saúde em todos os módulos traz à tona a única coisa que precisa de você hoje - aqui, uma variação de custo de comida bem acima do que deveria - para que nada importante se esconda em um relatório até ser tarde.',
        productLabel: 'Ver galeria completa de Insights →',
      },
      pulseWallboard: {
        alt: 'Pulse - ritmo de vendas ao vivo contra a meta',
        caption: 'Pulse - Ritmo ao vivo',
        whatYouSee:
          'O turno ao vivo num relance - vendas contra a meta em cada unidade - com exatamente o que falta para fechar a lacuna antes do fechamento: o ritmo por hora que cada local precisa no restante do serviço.',
        productLabel: 'Ver galeria completa de Pulse →',
      },
      foresightScenarios: {
        alt: 'Cenários do Foresight - biblioteca de cenários com 10 modelos de início rápido',
        caption: 'Foresight - Cenários',
        whatYouSee:
          'Modele a decisão antes de assumi-la. Comece por um modelo - alta de preço de 5%, corte de pessoal de 10%, uma ação de marketing - e veja o impacto na receita e na margem antes de qualquer coisa virar real.',
        productLabel: 'Ver galeria completa de Foresight →',
      },
      intelligence: {
        alt: 'Sundae Intelligence - interface de decisão conversacional',
        caption: 'Sundae Intelligence',
        whatYouSee:
          'Pergunte qualquer coisa ao seu negócio, em linguagem simples. Perguntas como "o que puxou a receita de ontem à noite?" voltam com a resposta, os números por trás e as fontes - uma conversa, não um painel.',
        productLabel: 'Ver galeria completa de Intelligence →',
      },
    },
    adaptsNote:
      'E nada disso é fixo - cada visão se adapta ao papel e ao jeito como sua equipe trabalha, então um CEO, um GM e um líder de finanças veem, cada um, exatamente o que importa para eles.',
    footnoteLead: 'Telas reais do produto. Dados sintéticos mostrados para ilustração.',
    diagnosticLink: 'Faça o Diagnóstico de Operações',
    footnoteTail: 'para ver como ficaria a sua visão.',
    openFullSize: 'Abrir {caption} em tamanho real',
    closeLightbox: 'Fechar visualizador',
    prevImage: 'Imagem anterior',
    nextImage: 'Próxima imagem',
    lightboxHint: '{index} / {total} · Esc para fechar · ← → para navegar',
  },
  hi: {
    eyebrow: 'प्रोडक्ट देखें',
    headline: 'आपकी टीम असल में यही देखती है।',
    sub: 'पूरे प्लेटफ़ॉर्म से चार स्क्रीन। किसी को भी बड़ा करने के लिए क्लिक करें - फिर हर प्रोडक्ट पेज पर पूरी गैलरी देखें।',
    cards: {
      execSummary: {
        alt: 'एग्ज़ीक्यूटिव समरी - हर मॉड्यूल में KPI, अलर्ट और हेल्थ स्कोर',
        caption: 'एग्ज़ीक्यूटिव समरी',
        whatYouSee:
          'हर मॉड्यूल पर एक ही हेल्थ स्कोर वह एक बात सामने ले आता है जिसे आज आपकी ज़रूरत है - यहाँ, फ़ूड-कॉस्ट का अंतर तय सीमा से कहीं ऊपर - ताकि कोई ज़रूरी बात किसी रिपोर्ट में तब तक न छिपी रहे जब तक देर न हो जाए।',
        productLabel: 'पूरी Insights गैलरी देखें →',
      },
      pulseWallboard: {
        alt: 'Pulse - टारगेट के मुकाबले लाइव सेल्स रफ्तार',
        caption: 'Pulse - लाइव रफ्तार',
        whatYouSee:
          'चालू शिफ्ट एक नज़र में - हर आउटलेट पर टारगेट के मुकाबले सेल्स - और बंद होने से पहले अंतर पाटने के लिए ठीक-ठीक क्या चाहिए: बाकी सर्विस के लिए हर लोकेशन को कितनी प्रति-घंटा रफ्तार चाहिए।',
        productLabel: 'पूरी Pulse गैलरी देखें →',
      },
      foresightScenarios: {
        alt: 'Foresight सिनेरियो - 10 क्विक-स्टार्ट टेम्पलेट वाली सिनेरियो लाइब्रेरी',
        caption: 'Foresight - सिनेरियो',
        whatYouSee:
          'फैसला करने से पहले उसका मॉडल बनाएं। किसी टेम्पलेट से शुरू करें - 5% दाम बढ़ोतरी, 10% स्टाफ कटौती, एक मार्केटिंग पुश - और कुछ भी असल होने से पहले रेवेन्यू और मार्जिन पर असर देखें।',
        productLabel: 'पूरी Foresight गैलरी देखें →',
      },
      intelligence: {
        alt: 'Sundae Intelligence - संवादात्मक निर्णय इंटरफ़ेस',
        caption: 'Sundae Intelligence',
        whatYouSee:
          'अपने कारोबार से सरल भाषा में कुछ भी पूछें। "कल रात के रेवेन्यू की वजह क्या थी?" जैसे सवालों का जवाब आँकड़ों और स्रोतों समेत मिलता है - एक बातचीत, कोई डैशबोर्ड नहीं।',
        productLabel: 'पूरी Intelligence गैलरी देखें →',
      },
    },
    adaptsNote:
      'और ये तय नहीं हैं - हर व्यू भूमिका और आपकी टीम के काम करने के तरीके के मुताबिक ढल जाता है, ताकि CEO, GM और फाइनेंस लीड - हर किसी को ठीक वही दिखे जो उसके लिए मायने रखता है।',
    footnoteLead: 'प्रोडक्ट के भीतर की लाइव स्क्रीन। दिखाने के लिए कृत्रिम डेटा का इस्तेमाल।',
    diagnosticLink: 'ऑपरेशंस डायग्नॉस्टिक लें',
    footnoteTail: 'और देखें कि आपका व्यू कैसा दिखेगा।',
    openFullSize: '{caption} को पूरे आकार में खोलें',
    closeLightbox: 'लाइटबॉक्स बंद करें',
    prevImage: 'पिछली तस्वीर',
    nextImage: 'अगली तस्वीर',
    lightboxHint: '{index} / {total} · बंद करने के लिए Esc · नेविगेट के लिए ← →',
  },
  ur: {
    eyebrow: 'پروڈکٹ دیکھیں',
    headline: 'آپ کی ٹیم اصل میں یہی دیکھتی ہے۔',
    sub: 'پورے پلیٹ فارم سے چار اسکرینیں۔ کسی کو بھی بڑا کرنے کے لیے کلک کریں - پھر ہر پروڈکٹ پیج پر مکمل گیلری دیکھیں۔',
    cards: {
      execSummary: {
        alt: 'ایگزیکٹو سمری - ہر ماڈیول میں KPI، الرٹس اور ہیلتھ اسکور',
        caption: 'ایگزیکٹو سمری',
        whatYouSee:
          'ہر ماڈیول پر ایک ہی ہیلتھ اسکور وہ ایک چیز سامنے لاتا ہے جسے آج آپ کی ضرورت ہے - یہاں، فوڈ کاسٹ کا فرق مقررہ حد سے کہیں اوپر - تاکہ کوئی اہم بات کسی رپورٹ میں اُس وقت تک نہ چھپی رہے جب تک دیر نہ ہو جائے۔',
        productLabel: 'مکمل Insights گیلری دیکھیں ←',
      },
      pulseWallboard: {
        alt: 'Pulse - ہدف کے مقابلے لائیو سیلز رفتار',
        caption: 'Pulse - لائیو رفتار',
        whatYouSee:
          'جاری شفٹ ایک نظر میں - ہر آؤٹ لیٹ پر ہدف کے مقابلے سیلز - اور بندش سے پہلے فرق پاٹنے کے لیے بالکل کیا درکار ہے: باقی سروس کے لیے ہر مقام کو فی گھنٹہ کتنی رفتار چاہیے۔',
        productLabel: 'مکمل Pulse گیلری دیکھیں ←',
      },
      foresightScenarios: {
        alt: 'Foresight منظرنامے - 10 کوئک اسٹارٹ ٹیمپلیٹس والی منظرنامہ لائبریری',
        caption: 'Foresight - منظرنامے',
        whatYouSee:
          'فیصلہ کرنے سے پہلے اس کا ماڈل بنائیں۔ کسی ٹیمپلیٹ سے شروع کریں - 5% قیمت میں اضافہ، 10% عملے میں کمی، ایک مارکیٹنگ مہم - اور کسی چیز کے حقیقی ہونے سے پہلے آمدنی اور مارجن پر اثر دیکھیں۔',
        productLabel: 'مکمل Foresight گیلری دیکھیں ←',
      },
      intelligence: {
        alt: 'Sundae Intelligence - مکالماتی فیصلہ انٹرفیس',
        caption: 'Sundae Intelligence',
        whatYouSee:
          'اپنے کاروبار سے سادہ زبان میں کچھ بھی پوچھیں۔ "کل رات کی آمدنی کس چیز نے بڑھائی؟" جیسے سوالوں کا جواب اعداد اور ذرائع سمیت ملتا ہے - ایک گفتگو، کوئی ڈیش بورڈ نہیں۔',
        productLabel: 'مکمل Intelligence گیلری دیکھیں ←',
      },
    },
    adaptsNote:
      'اور یہ طے شدہ نہیں ہیں - ہر ویو کردار اور آپ کی ٹیم کے کام کرنے کے انداز کے مطابق ڈھل جاتا ہے، تاکہ CEO، GM اور فنانس لیڈ - ہر کسی کو ٹھیک وہی نظر آئے جو اُس کے لیے اہم ہے۔',
    footnoteLead: 'پروڈکٹ کے اندر کی لائیو اسکرینیں۔ دکھانے کے لیے مصنوعی ڈیٹا استعمال کیا گیا ہے۔',
    diagnosticLink: 'آپریشنز ڈائگنوسٹک لیں',
    footnoteTail: 'اور دیکھیں کہ آپ کا ویو کیسا دکھے گا۔',
    openFullSize: '{caption} کو پورے سائز میں کھولیں',
    closeLightbox: 'لائٹ باکس بند کریں',
    prevImage: 'پچھلی تصویر',
    nextImage: 'اگلی تصویر',
    lightboxHint: '{index} / {total} · بند کرنے کے لیے Esc · نیویگیٹ کے لیے ← →',
  },
  it: {
    eyebrow: 'GUARDA IL PRODOTTO',
    headline: 'Questo è ciò che il tuo team vede davvero.',
    sub: 'Quattro schermate da tutta la piattaforma. Clicca su una qualsiasi per ingrandirla - poi esplora la galleria completa su ogni pagina prodotto.',
    cards: {
      execSummary: {
        alt: 'Sintesi direzionale - KPI, avvisi e indici di salute su ogni modulo',
        caption: 'Sintesi direzionale',
        whatYouSee:
          'Un solo indice di salute su tutti i moduli fa emergere la sola cosa che oggi ti riguarda - qui, uno scostamento del food cost ben oltre il dovuto - così nulla di importante resta nascosto in un report finché non è troppo tardi.',
        productLabel: 'Vedi la galleria Insights completa →',
      },
      pulseWallboard: {
        alt: 'Pulse - ritmo delle vendite in tempo reale rispetto al target',
        caption: 'Pulse - Ritmo in diretta',
        whatYouSee:
          'Il turno in corso a colpo d\'occhio - vendite rispetto al target per ogni punto vendita - con esattamente ciò che serve per colmare il divario prima della chiusura: il ritmo orario di cui ogni sede ha bisogno per il resto del servizio.',
        productLabel: 'Vedi la galleria Pulse completa →',
      },
      foresightScenarios: {
        alt: 'Scenari Foresight - libreria di scenari con 10 modelli pronti all\'uso',
        caption: 'Foresight - Scenari',
        whatYouSee:
          'Modella la decisione prima di impegnarti. Parti da un modello - un aumento di prezzo del 5%, un taglio del personale del 10%, una spinta di marketing - e vedi l\'impatto su ricavi e margine prima che diventi reale.',
        productLabel: 'Vedi la galleria Foresight completa →',
      },
      intelligence: {
        alt: 'Sundae Intelligence - interfaccia decisionale conversazionale',
        caption: 'Sundae Intelligence',
        whatYouSee:
          'Chiedi al tuo locale qualsiasi cosa, in linguaggio naturale. Domande come «cosa ha trainato i ricavi di ieri sera?» tornano con la risposta, i numeri dietro e le fonti - una conversazione, non una dashboard.',
        productLabel: 'Vedi la galleria Intelligence completa →',
      },
    },
    adaptsNote:
      'E nulla di tutto questo è fisso - ogni vista si adatta al ruolo e al modo in cui lavora il tuo team, così un CEO, un GM e un responsabile finance vedono ciascuno esattamente ciò che conta per loro.',
    footnoteLead: 'Schermate reali del prodotto. Dati sintetici mostrati a scopo illustrativo.',
    diagnosticLink: 'Fai la Diagnosi delle Operazioni',
    footnoteTail: 'per vedere come apparirebbe la tua vista.',
    openFullSize: 'Apri {caption} a dimensione intera',
    closeLightbox: 'Chiudi visualizzatore',
    prevImage: 'Immagine precedente',
    nextImage: 'Immagine successiva',
    lightboxHint: '{index} / {total} · Esc per chiudere · ← → per navigare',
  },
  pl: {
    eyebrow: 'ZOBACZ PRODUKT',
    headline: 'To właśnie naprawdę widzi twój zespół.',
    sub: 'Cztery ekrany z całej platformy. Kliknij dowolny, aby powiększyć - a potem obejrzyj pełną galerię na każdej stronie produktu.',
    cards: {
      execSummary: {
        alt: 'Podsumowanie zarządcze - KPI, alerty i wskaźniki kondycji w każdym module',
        caption: 'Podsumowanie zarządcze',
        whatYouSee:
          'Jeden wskaźnik kondycji dla wszystkich modułów wydobywa tę jedną rzecz, która dziś cię potrzebuje - tutaj odchylenie food cost znacznie powyżej normy - tak by nic ważnego nie kryło się w raporcie, aż będzie za późno.',
        productLabel: 'Zobacz pełną galerię Insights →',
      },
      pulseWallboard: {
        alt: 'Pulse - tempo sprzedaży na żywo względem celu',
        caption: 'Pulse - Tempo na żywo',
        whatYouSee:
          'Trwająca zmiana w skrócie - sprzedaż względem celu dla każdego lokalu - z dokładnie tym, czego trzeba, by domknąć lukę przed zamknięciem: tempo na godzinę, którego każda lokalizacja potrzebuje do końca serwisu.',
        productLabel: 'Zobacz pełną galerię Pulse →',
      },
      foresightScenarios: {
        alt: 'Scenariusze Foresight - biblioteka scenariuszy z 10 szablonami szybkiego startu',
        caption: 'Foresight - Scenariusze',
        whatYouSee:
          'Zamodeluj decyzję, zanim się na nią zdecydujesz. Zacznij od szablonu - podwyżka ceny o 5%, cięcie obsady o 10%, akcja marketingowa - i zobacz wpływ na przychód i marżę, zanim cokolwiek stanie się realne.',
        productLabel: 'Zobacz pełną galerię Foresight →',
      },
      intelligence: {
        alt: 'Sundae Intelligence - konwersacyjny interfejs decyzyjny',
        caption: 'Sundae Intelligence',
        whatYouSee:
          'Zapytaj swój biznes o cokolwiek, zwykłym językiem. Pytania w stylu „co napędziło wczorajszy przychód?" wracają z odpowiedzią, liczbami za nią i źródłami - rozmowa, nie pulpit.',
        productLabel: 'Zobacz pełną galerię Intelligence →',
      },
    },
    adaptsNote:
      'I nic z tego nie jest sztywne - każdy widok dopasowuje się do roli i sposobu pracy zespołu, więc CEO, GM i szef finansów - każdy widzi dokładnie to, co dla niego ważne.',
    footnoteLead: 'Prawdziwe ekrany produktu. Dane syntetyczne pokazane dla ilustracji.',
    diagnosticLink: 'Wykonaj Diagnostykę Operacji',
    footnoteTail: 'aby zobaczyć, jak wyglądałby twój widok.',
    openFullSize: 'Otwórz {caption} w pełnym rozmiarze',
    closeLightbox: 'Zamknij podgląd',
    prevImage: 'Poprzedni obraz',
    nextImage: 'Następny obraz',
    lightboxHint: '{index} / {total} · Esc, aby zamknąć · ← → aby nawigować',
  },
  tr: {
    eyebrow: 'ÜRÜNÜ GÖRÜN',
    headline: 'Ekibinizin gerçekte gördüğü şey budur.',
    sub: 'Platformun her yerinden dört ekran. Büyütmek için herhangi birine tıklayın - sonra her ürün sayfasındaki tam galeriyi keşfedin.',
    cards: {
      execSummary: {
        alt: 'Yönetici Özeti - her modülde KPI\'lar, uyarılar ve sağlık skorları',
        caption: 'Yönetici Özeti',
        whatYouSee:
          'Tüm modüllerde tek bir sağlık skoru, bugün size ihtiyaç duyan o tek şeyi öne çıkarır - burada, olması gerekenin çok üzerinde seyreden gıda maliyeti sapması - böylece önemli hiçbir şey iş işten geçene dek bir raporda saklı kalmaz.',
        productLabel: 'Tüm Insights galerisini gör →',
      },
      pulseWallboard: {
        alt: 'Pulse - hedefe karşı canlı satış temposu',
        caption: 'Pulse - Canlı Tempo',
        whatYouSee:
          'Devam eden vardiya bir bakışta - her şube için hedefe karşı satış - ve kapanıştan önce farkı kapatmak için tam olarak ne gerektiği: her lokasyonun servisin geri kalanı için ihtiyaç duyduğu saatlik tempo.',
        productLabel: 'Tüm Pulse galerisini gör →',
      },
      foresightScenarios: {
        alt: 'Foresight Senaryoları - 10 hızlı başlangıç şablonlu senaryo kitaplığı',
        caption: 'Foresight - Senaryolar',
        whatYouSee:
          'Karara bağlanmadan önce onu modelleyin. Bir şablonla başlayın - %5 fiyat artışı, %10 personel kesintisi, bir pazarlama hamlesi - ve hiçbiri gerçek olmadan gelir ile marj üzerindeki etkiyi görün.',
        productLabel: 'Tüm Foresight galerisini gör →',
      },
      intelligence: {
        alt: 'Sundae Intelligence - sohbet tabanlı karar arayüzü',
        caption: 'Sundae Intelligence',
        whatYouSee:
          'İşletmenize sade bir dille her şeyi sorun. "Dün geceki geliri ne yükseltti?" gibi sorular yanıtla, ardındaki sayılarla ve kaynaklarla geri döner - bir sohbet, bir gösterge paneli değil.',
        productLabel: 'Tüm Intelligence galerisini gör →',
      },
    },
    adaptsNote:
      'Ve bunların hiçbiri sabit değil - her görünüm role ve ekibinizin çalışma biçimine uyum sağlar, böylece bir CEO, bir GM ve bir finans lideri her biri tam olarak kendisi için önemli olanı görür.',
    footnoteLead: 'Ürün içindeki canlı ekranlar. Gösterim amaçlı sentetik veri kullanılmıştır.',
    diagnosticLink: 'Operasyon Tanılamasını yapın',
    footnoteTail: 've kendi görünümünüzün nasıl olacağını görün.',
    openFullSize: '{caption} öğesini tam boyutta aç',
    closeLightbox: 'Işık kutusunu kapat',
    prevImage: 'Önceki görsel',
    nextImage: 'Sonraki görsel',
    lightboxHint: '{index} / {total} · Kapatmak için Esc · Gezinmek için ← →',
  },
  'zh-Hans': {
    eyebrow: '看看产品',
    headline: '这就是你的团队真正看到的画面。',
    sub: '来自整个平台的四块界面。点击任意一块即可放大--再到各产品页查看完整图库。',
    cards: {
      execSummary: {
        alt: '执行摘要--覆盖每个模块的 KPI、预警与健康评分',
        caption: '执行摘要',
        whatYouSee:
          '覆盖所有模块的单一健康评分，会把今天最需要你关注的那件事顶到眼前--这里是食材成本偏差远超应有水平--这样重要的事就不会一直藏在报表里，直到为时已晚。',
        productLabel: '查看完整 Insights 图库 →',
      },
      pulseWallboard: {
        alt: 'Pulse--实时销售节奏对比目标',
        caption: 'Pulse--实时节奏',
        whatYouSee:
          '一眼看清正在进行的班次--每家门店的销售对比目标--并精确告诉你打烊前补足差距需要什么：每个门店在剩余营业时间内所需的每小时节奏。',
        productLabel: '查看完整 Pulse 图库 →',
      },
      foresightScenarios: {
        alt: 'Foresight 情景--含 10 个快速启动模板的情景库',
        caption: 'Foresight--情景',
        whatYouSee:
          '在做出决定之前先把它建模。从模板开始--调价 5%、人力削减 10%、一次营销推广--在一切尚未成真之前，就看清它对营收和利润率的影响。',
        productLabel: '查看完整 Foresight 图库 →',
      },
      intelligence: {
        alt: 'Sundae Intelligence--对话式决策界面',
        caption: 'Sundae Intelligence',
        whatYouSee:
          '用大白话问你的生意任何问题。像「昨晚营收是什么带动的？」这样的问题，会连同答案、背后的数字和数据来源一并返回--是一场对话，而不是一块仪表盘。',
        productLabel: '查看完整 Intelligence 图库 →',
      },
    },
    adaptsNote:
      '而且这些都不是固定的--每个视图都会随角色和你团队的工作方式而调整，让 CEO、GM 和财务负责人各自只看到对自己重要的内容。',
    footnoteLead: '产品内的真实界面。所示为合成数据，仅供示意。',
    diagnosticLink: '做一次运营诊断',
    footnoteTail: '看看属于你的视图会是什么样。',
    openFullSize: '以全尺寸打开{caption}',
    closeLightbox: '关闭灯箱',
    prevImage: '上一张',
    nextImage: '下一张',
    lightboxHint: '{index} / {total} · 按 Esc 关闭 · ← → 切换',
  },
  ja: {
    eyebrow: 'プロダクトを見る',
    headline: 'これが、あなたのチームが実際に見る画面です。',
    sub: 'プラットフォーム全体から4つの画面。クリックで拡大し、各プロダクトページで全ギャラリーをご覧ください。',
    cards: {
      execSummary: {
        alt: 'エグゼクティブサマリー--全モジュールのKPI、アラート、ヘルススコア',
        caption: 'エグゼクティブサマリー',
        whatYouSee:
          '全モジュールを通じた単一のヘルススコアが、今日あなたを必要とする唯一のことを浮かび上がらせます--ここでは、あるべき水準を大きく上回る原価率の差異--大事なことがレポートの中に隠れ、手遅れになることがありません。',
        productLabel: 'Insights の全ギャラリーを見る →',
      },
      pulseWallboard: {
        alt: 'Pulse--目標に対するリアルタイムの売上ペース',
        caption: 'Pulse--リアルタイムのペース',
        whatYouSee:
          '進行中のシフトをひと目で--店舗ごとの目標に対する売上--そして閉店までに差を埋めるために何が必要かを正確に：残りの営業時間で各店舗に必要な1時間あたりのペース。',
        productLabel: 'Pulse の全ギャラリーを見る →',
      },
      foresightScenarios: {
        alt: 'Foresight シナリオ--10のクイックスタートテンプレートを備えたシナリオライブラリ',
        caption: 'Foresight--シナリオ',
        whatYouSee:
          '決める前に、その決断をモデル化。テンプレートから始めましょう--5%の値上げ、10%の人件費削減、販促施策--どれもが現実になる前に、売上と利益率への影響を確かめられます。',
        productLabel: 'Foresight の全ギャラリーを見る →',
      },
      intelligence: {
        alt: 'Sundae Intelligence--対話型の意思決定インターフェース',
        caption: 'Sundae Intelligence',
        whatYouSee:
          'ふだんの言葉で、ビジネスに何でも尋ねられます。「昨夜の売上を押し上げたのは何か？」といった問いに、答えと、その根拠の数字と、出典がそろって返ってきます--ダッシュボードではなく、会話です。',
        productLabel: 'Intelligence の全ギャラリーを見る →',
      },
    },
    adaptsNote:
      'しかもこれらは固定ではありません--どのビューも役割とチームの働き方に合わせて変わるので、CEO、GM、財務責任者がそれぞれ、自分にとって大切なものだけを見られます。',
    footnoteLead: '実際のプロダクト画面です。表示データは説明用の合成データです。',
    diagnosticLink: 'オペレーション診断を受ける',
    footnoteTail: 'と、あなた向けのビューがどう見えるか分かります。',
    openFullSize: '{caption} をフルサイズで開く',
    closeLightbox: 'ライトボックスを閉じる',
    prevImage: '前の画像',
    nextImage: '次の画像',
    lightboxHint: '{index} / {total} · Esc で閉じる · ← → で移動',
  },
  ko: {
    eyebrow: '제품 살펴보기',
    headline: '당신의 팀이 실제로 보는 화면입니다.',
    sub: '플랫폼 곳곳의 네 가지 화면. 아무거나 클릭하면 확대되고, 각 제품 페이지에서 전체 갤러리를 볼 수 있습니다.',
    cards: {
      execSummary: {
        alt: '경영 요약 - 모든 모듈의 KPI, 알림, 헬스 스코어',
        caption: '경영 요약',
        whatYouSee:
          '모든 모듈을 아우르는 하나의 헬스 스코어가 오늘 당신이 봐야 할 단 하나를 끌어올립니다 - 여기서는 마땅한 수준을 크게 웃도는 식자재 원가 편차 - 그래서 중요한 일이 너무 늦을 때까지 보고서 속에 숨지 않습니다.',
        productLabel: '전체 Insights 갤러리 보기 →',
      },
      pulseWallboard: {
        alt: 'Pulse - 목표 대비 실시간 매출 페이스',
        caption: 'Pulse - 실시간 페이스',
        whatYouSee:
          '진행 중인 근무를 한눈에 - 매장별 목표 대비 매출 - 그리고 마감 전에 격차를 메우는 데 정확히 무엇이 필요한지: 남은 영업 시간 동안 각 매장이 필요로 하는 시간당 페이스.',
        productLabel: '전체 Pulse 갤러리 보기 →',
      },
      foresightScenarios: {
        alt: 'Foresight 시나리오 - 10개의 퀵스타트 템플릿을 갖춘 시나리오 라이브러리',
        caption: 'Foresight - 시나리오',
        whatYouSee:
          '결정에 발을 들이기 전에 먼저 모델링하세요. 템플릿에서 시작 - 5% 가격 인상, 10% 인건비 절감, 마케팅 푸시 - 그 어떤 것도 현실이 되기 전에 매출과 마진에 미칠 영향을 확인하세요.',
        productLabel: '전체 Foresight 갤러리 보기 →',
      },
      intelligence: {
        alt: 'Sundae Intelligence - 대화형 의사결정 인터페이스',
        caption: 'Sundae Intelligence',
        whatYouSee:
          '일상 언어로 비즈니스에 무엇이든 물어보세요. "어젯밤 매출을 끌어올린 건 무엇인가?" 같은 질문에 답과, 그 뒤의 숫자와, 출처가 함께 돌아옵니다 - 대시보드가 아니라 대화입니다.',
        productLabel: '전체 Intelligence 갤러리 보기 →',
      },
    },
    adaptsNote:
      '게다가 이것들은 고정돼 있지 않습니다 - 모든 화면이 역할과 팀의 일하는 방식에 맞춰 바뀌어, CEO와 GM, 재무 리드가 각자 자신에게 중요한 것만 정확히 봅니다.',
    footnoteLead: '제품 내 실제 화면입니다. 표시된 데이터는 설명용 합성 데이터입니다.',
    diagnosticLink: '운영 진단 받기',
    footnoteTail: '를 통해 당신의 화면이 어떻게 보일지 확인하세요.',
    openFullSize: '{caption}을(를) 전체 크기로 열기',
    closeLightbox: '라이트박스 닫기',
    prevImage: '이전 이미지',
    nextImage: '다음 이미지',
    lightboxHint: '{index} / {total} · Esc로 닫기 · ← → 로 이동',
  },
  id: {
    eyebrow: 'LIHAT PRODUKNYA',
    headline: 'Inilah yang benar-benar dilihat tim Anda.',
    sub: 'Empat tampilan dari seluruh platform. Klik salah satu untuk memperbesar - lalu jelajahi galeri lengkap di setiap halaman produk.',
    cards: {
      execSummary: {
        alt: 'Ringkasan Eksekutif - KPI, peringatan, dan skor kesehatan di setiap modul',
        caption: 'Ringkasan Eksekutif',
        whatYouSee:
          'Satu skor kesehatan di seluruh modul memunculkan satu hal yang membutuhkan Anda hari ini - di sini, selisih food cost yang jauh di atas semestinya - sehingga tak ada hal penting yang tersembunyi dalam laporan sampai terlambat.',
        productLabel: 'Lihat galeri Insights lengkap →',
      },
      pulseWallboard: {
        alt: 'Pulse - tempo penjualan langsung terhadap target',
        caption: 'Pulse - Tempo Langsung',
        whatYouSee:
          'Shift berjalan dalam sekejap - penjualan terhadap target untuk setiap outlet - dengan tepat apa yang dibutuhkan untuk menutup selisih sebelum tutup: tempo per jam yang diperlukan tiap lokasi untuk sisa layanan.',
        productLabel: 'Lihat galeri Pulse lengkap →',
      },
      foresightScenarios: {
        alt: 'Skenario Foresight - pustaka skenario dengan 10 templat mulai cepat',
        caption: 'Foresight - Skenario',
        whatYouSee:
          'Modelkan keputusan sebelum Anda mengambilnya. Mulai dari templat - kenaikan harga 5%, pemangkasan tenaga kerja 10%, dorongan marketing - dan lihat dampaknya pada pendapatan dan margin sebelum semuanya nyata.',
        productLabel: 'Lihat galeri Foresight lengkap →',
      },
      intelligence: {
        alt: 'Sundae Intelligence - antarmuka keputusan percakapan',
        caption: 'Sundae Intelligence',
        whatYouSee:
          'Tanyakan apa saja pada bisnis Anda dengan bahasa sehari-hari. Pertanyaan seperti "apa yang mendorong pendapatan tadi malam?" kembali dengan jawaban, angka di baliknya, dan sumbernya - sebuah percakapan, bukan dasbor.',
        productLabel: 'Lihat galeri Intelligence lengkap →',
      },
    },
    adaptsNote:
      'Dan semua ini tidak kaku - setiap tampilan menyesuaikan dengan peran dan cara kerja tim Anda, jadi seorang CEO, seorang GM, dan pemimpin finance masing-masing melihat persis apa yang penting bagi mereka.',
    footnoteLead: 'Tampilan langsung dalam produk. Data sintetis ditampilkan sebagai ilustrasi.',
    diagnosticLink: 'Ikuti Diagnostik Operasi',
    footnoteTail: 'untuk melihat seperti apa tampilan Anda nanti.',
    openFullSize: 'Buka {caption} dalam ukuran penuh',
    closeLightbox: 'Tutup lightbox',
    prevImage: 'Gambar sebelumnya',
    nextImage: 'Gambar berikutnya',
    lightboxHint: '{index} / {total} · Esc untuk menutup · ← → untuk menavigasi',
  },
  vi: {
    eyebrow: 'XEM SẢN PHẨM',
    headline: 'Đây là những gì đội của bạn thực sự nhìn thấy.',
    sub: 'Bốn màn hình từ khắp nền tảng. Nhấp vào bất kỳ màn hình nào để phóng to - rồi khám phá thư viện đầy đủ trên từng trang sản phẩm.',
    cards: {
      execSummary: {
        alt: 'Tóm tắt điều hành - KPI, cảnh báo và điểm sức khỏe trên mọi mô-đun',
        caption: 'Tóm tắt điều hành',
        whatYouSee:
          'Một điểm sức khỏe duy nhất trên mọi mô-đun làm nổi bật điều duy nhất cần đến bạn hôm nay - ở đây là chênh lệch chi phí thực phẩm vượt xa mức đáng có - để không điều quan trọng nào ẩn trong báo cáo cho đến khi quá muộn.',
        productLabel: 'Xem toàn bộ thư viện Insights →',
      },
      pulseWallboard: {
        alt: 'Pulse - nhịp doanh thu trực tiếp so với mục tiêu',
        caption: 'Pulse - Nhịp trực tiếp',
        whatYouSee:
          'Ca làm đang diễn ra trong nháy mắt - doanh thu so với mục tiêu cho từng chi nhánh - cùng chính xác những gì cần để khép lại khoảng cách trước giờ đóng cửa: nhịp mỗi giờ mà từng địa điểm cần cho phần còn lại của ca.',
        productLabel: 'Xem toàn bộ thư viện Pulse →',
      },
      foresightScenarios: {
        alt: 'Kịch bản Foresight - thư viện kịch bản với 10 mẫu khởi đầu nhanh',
        caption: 'Foresight - Kịch bản',
        whatYouSee:
          'Mô phỏng quyết định trước khi bạn cam kết với nó. Bắt đầu từ một mẫu - tăng giá 5%, cắt nhân sự 10%, một đợt đẩy marketing - và thấy tác động lên doanh thu và biên lợi nhuận trước khi bất cứ điều gì thành thật.',
        productLabel: 'Xem toàn bộ thư viện Foresight →',
      },
      intelligence: {
        alt: 'Sundae Intelligence - giao diện ra quyết định bằng hội thoại',
        caption: 'Sundae Intelligence',
        whatYouSee:
          'Hỏi việc kinh doanh của bạn bất cứ điều gì, bằng ngôn ngữ đời thường. Những câu như "điều gì kéo doanh thu tối qua?" trả về kèm câu trả lời, những con số phía sau và nguồn - một cuộc trò chuyện, không phải bảng số liệu.',
        productLabel: 'Xem toàn bộ thư viện Intelligence →',
      },
    },
    adaptsNote:
      'Và những thứ này không cố định - mỗi khung nhìn thích ứng với vai trò và cách đội của bạn làm việc, nên một CEO, một GM và một trưởng bộ phận tài chính, mỗi người thấy đúng điều quan trọng với mình.',
    footnoteLead: 'Màn hình thật trong sản phẩm. Dữ liệu mô phỏng được hiển thị để minh họa.',
    diagnosticLink: 'Làm Chẩn đoán Vận hành',
    footnoteTail: 'để xem khung nhìn của bạn trông thế nào.',
    openFullSize: 'Mở {caption} ở kích thước đầy đủ',
    closeLightbox: 'Đóng hộp xem ảnh',
    prevImage: 'Ảnh trước',
    nextImage: 'Ảnh tiếp theo',
    lightboxHint: '{index} / {total} · Esc để đóng · ← → để điều hướng',
  },
  ro: {
    eyebrow: 'VEZI PRODUSUL',
    headline: 'Asta vede de fapt echipa ta.',
    sub: 'Patru ecrane din toată platforma. Apasă pe oricare pentru a-l mări - apoi explorează galeria completă pe fiecare pagină de produs.',
    cards: {
      execSummary: {
        alt: 'Rezumat executiv - KPI, alerte și scoruri de sănătate pe fiecare modul',
        caption: 'Rezumat executiv',
        whatYouSee:
          'Un singur scor de sănătate pe toate modulele scoate la suprafață singurul lucru care are nevoie de tine azi - aici, o abatere a costului alimentelor mult peste cât ar trebui - așa că nimic important nu se ascunde într-un raport până e prea târziu.',
        productLabel: 'Vezi galeria Insights completă →',
      },
      pulseWallboard: {
        alt: 'Pulse - ritmul vânzărilor în timp real față de țintă',
        caption: 'Pulse - Ritm în direct',
        whatYouSee:
          'Tura în desfășurare dintr-o privire - vânzări față de țintă pentru fiecare locație - cu exact ce e nevoie pentru a închide diferența înainte de închidere: ritmul pe oră de care are nevoie fiecare locație pentru restul serviciului.',
        productLabel: 'Vezi galeria Pulse completă →',
      },
      foresightScenarios: {
        alt: 'Scenarii Foresight - bibliotecă de scenarii cu 10 șabloane de pornire rapidă',
        caption: 'Foresight - Scenarii',
        whatYouSee:
          'Modelează decizia înainte să te angajezi în ea. Pornește de la un șablon - o creștere de preț de 5%, o reducere de personal de 10%, un impuls de marketing - și vezi impactul asupra veniturilor și marjei înainte ca ceva să devină real.',
        productLabel: 'Vezi galeria Foresight completă →',
      },
      intelligence: {
        alt: 'Sundae Intelligence - interfață de decizie conversațională',
        caption: 'Sundae Intelligence',
        whatYouSee:
          'Întreabă-ți afacerea orice, în limbaj obișnuit. Întrebări precum „ce a dus veniturile de aseară?" revin cu răspunsul, cifrele din spate și sursele - o conversație, nu un panou.',
        productLabel: 'Vezi galeria Intelligence completă →',
      },
    },
    adaptsNote:
      'Și nimic din toate astea nu e fix - fiecare vedere se adaptează rolului și modului în care lucrează echipa ta, așa că un CEO, un GM și un responsabil financiar văd fiecare exact ce contează pentru ei.',
    footnoteLead: 'Ecrane reale din produs. Date sintetice afișate cu scop ilustrativ.',
    diagnosticLink: 'Fă Diagnosticul Operațional',
    footnoteTail: 'ca să vezi cum ar arăta vederea ta.',
    openFullSize: 'Deschide {caption} la dimensiune completă',
    closeLightbox: 'Închide vizualizatorul',
    prevImage: 'Imaginea anterioară',
    nextImage: 'Imaginea următoare',
    lightboxHint: '{index} / {total} · Esc pentru a închide · ← → pentru a naviga',
  },
  sv: {
    eyebrow: 'SE PRODUKTEN',
    headline: 'Det här är vad ditt team faktiskt ser.',
    sub: 'Fyra vyer från hela plattformen. Klicka på en för att förstora - utforska sedan hela galleriet på varje produktsida.',
    cards: {
      execSummary: {
        alt: 'Ledningssammanfattning - KPI:er, varningar och hälsopoäng över varje modul',
        caption: 'Ledningssammanfattning',
        whatYouSee:
          'En enda hälsopoäng över alla moduler lyfter fram den enda sak som behöver dig idag - här en råvarukostnadsavvikelse långt över det den borde vara - så att inget viktigt göms i en rapport tills det är för sent.',
        productLabel: 'Se hela Insights-galleriet →',
      },
      pulseWallboard: {
        alt: 'Pulse - försäljningstempo i realtid mot mål',
        caption: 'Pulse - Live-tempo',
        whatYouSee:
          'Det pågående passet med en blick - försäljning mot mål för varje enhet - med exakt vad som krävs för att täppa till gapet före stängning: timtempot varje plats behöver för resten av serveringen.',
        productLabel: 'Se hela Pulse-galleriet →',
      },
      foresightScenarios: {
        alt: 'Foresight-scenarier - scenariobibliotek med 10 snabbstartsmallar',
        caption: 'Foresight - Scenarier',
        whatYouSee:
          'Modellera beslutet innan du binder dig vid det. Börja från en mall - en prishöjning på 5 %, en personalnedskärning på 10 %, en marknadssatsning - och se effekten på intäkter och marginal innan något blivit verkligt.',
        productLabel: 'Se hela Foresight-galleriet →',
      },
      intelligence: {
        alt: 'Sundae Intelligence - konversationellt beslutsgränssnitt',
        caption: 'Sundae Intelligence',
        whatYouSee:
          'Fråga din verksamhet vad som helst, på vanligt språk. Frågor som "vad drev gårdagskvällens intäkter?" kommer tillbaka med svaret, siffrorna bakom och källorna - ett samtal, inte en instrumentpanel.',
        productLabel: 'Se hela Intelligence-galleriet →',
      },
    },
    adaptsNote:
      'Och inget av detta är fast - varje vy anpassar sig efter rollen och hur ditt team arbetar, så att en VD, en GM och en ekonomiansvarig var och en ser precis det som spelar roll för dem.',
    footnoteLead: 'Verkliga produktvyer. Syntetiska data visas i illustrationssyfte.',
    diagnosticLink: 'Gör Verksamhetsdiagnosen',
    footnoteTail: 'för att se hur din vy skulle se ut.',
    openFullSize: 'Öppna {caption} i full storlek',
    closeLightbox: 'Stäng ljusbox',
    prevImage: 'Föregående bild',
    nextImage: 'Nästa bild',
    lightboxHint: '{index} / {total} · Esc för att stänga · ← → för att navigera',
  },
  bn: {
    eyebrow: 'প্রোডাক্ট দেখুন',
    headline: 'আপনার দল আসলে এটাই দেখে।',
    sub: 'পুরো প্ল্যাটফর্ম থেকে চারটি স্ক্রিন। যেকোনোটিতে ক্লিক করে বড় করুন - তারপর প্রতিটি প্রোডাক্ট পেজে পুরো গ্যালারি দেখুন।',
    cards: {
      execSummary: {
        alt: 'এক্সিকিউটিভ সামারি - প্রতিটি মডিউলে KPI, সতর্কতা ও হেলথ স্কোর',
        caption: 'এক্সিকিউটিভ সামারি',
        whatYouSee:
          'সব মডিউল জুড়ে একটিই হেলথ স্কোর আজ আপনার যা প্রয়োজন সেই একটি জিনিসকে সামনে আনে - এখানে, ফুড-কস্টের তারতম্য যতটা হওয়া উচিত তার চেয়ে অনেক বেশি - যাতে কোনো জরুরি বিষয় দেরি হওয়ার আগ পর্যন্ত কোনো রিপোর্টে লুকিয়ে না থাকে।',
        productLabel: 'পুরো Insights গ্যালারি দেখুন →',
      },
      pulseWallboard: {
        alt: 'Pulse - লক্ষ্যমাত্রার বিপরীতে সরাসরি বিক্রির গতি',
        caption: 'Pulse - সরাসরি গতি',
        whatYouSee:
          'চলমান শিফট এক নজরে - প্রতিটি আউটলেটে লক্ষ্যমাত্রার বিপরীতে বিক্রি - আর বন্ধের আগে ব্যবধান মেটাতে ঠিক কী লাগবে: বাকি পরিবেশনের জন্য প্রতিটি লোকেশনের প্রতি-ঘণ্টা যে গতি দরকার।',
        productLabel: 'পুরো Pulse গ্যালারি দেখুন →',
      },
      foresightScenarios: {
        alt: 'Foresight সিনারিও - ১০টি কুইক-স্টার্ট টেমপ্লেটসহ সিনারিও লাইব্রেরি',
        caption: 'Foresight - সিনারিও',
        whatYouSee:
          'সিদ্ধান্তে যাওয়ার আগে সেটির মডেল করুন। একটি টেমপ্লেট থেকে শুরু করুন - ৫% দাম বৃদ্ধি, ১০% জনবল হ্রাস, একটি মার্কেটিং পুশ - আর কিছু বাস্তব হওয়ার আগেই রাজস্ব ও মার্জিনে প্রভাব দেখুন।',
        productLabel: 'পুরো Foresight গ্যালারি দেখুন →',
      },
      intelligence: {
        alt: 'Sundae Intelligence - কথোপকথনমূলক সিদ্ধান্ত ইন্টারফেস',
        caption: 'Sundae Intelligence',
        whatYouSee:
          'সহজ ভাষায় আপনার ব্যবসাকে যা খুশি জিজ্ঞেস করুন। "গতকাল রাতের রাজস্ব কীসে বাড়ল?" এমন প্রশ্নের উত্তর, পেছনের সংখ্যা ও সূত্রসহ ফিরে আসে - একটি কথোপকথন, কোনো ড্যাশবোর্ড নয়।',
        productLabel: 'পুরো Intelligence গ্যালারি দেখুন →',
      },
    },
    adaptsNote:
      'আর এগুলো নির্দিষ্ট নয় - প্রতিটি ভিউ ভূমিকা ও আপনার দলের কাজের ধরন অনুযায়ী বদলে যায়, যাতে একজন CEO, একজন GM ও একজন ফাইন্যান্স লিড - প্রত্যেকে ঠিক তা-ই দেখেন যা তাঁর কাছে গুরুত্বপূর্ণ।',
    footnoteLead: 'প্রোডাক্টের ভেতরের সরাসরি স্ক্রিন। দেখানোর জন্য কৃত্রিম ডেটা ব্যবহার করা হয়েছে।',
    diagnosticLink: 'অপারেশনস ডায়াগনস্টিক নিন',
    footnoteTail: 'এবং দেখুন আপনার ভিউ কেমন দেখাবে।',
    openFullSize: '{caption} পূর্ণ আকারে খুলুন',
    closeLightbox: 'লাইটবক্স বন্ধ করুন',
    prevImage: 'আগের ছবি',
    nextImage: 'পরের ছবি',
    lightboxHint: '{index} / {total} · বন্ধ করতে Esc · নেভিগেট করতে ← →',
  },
  th: {
    eyebrow: 'ดูตัวผลิตภัณฑ์',
    headline: 'นี่คือสิ่งที่ทีมของคุณเห็นจริง ๆ',
    sub: 'สี่หน้าจอจากทั่วทั้งแพลตฟอร์ม คลิกที่ใดก็ได้เพื่อขยาย - แล้วสำรวจแกลเลอรีเต็มในแต่ละหน้าผลิตภัณฑ์',
    cards: {
      execSummary: {
        alt: 'สรุปสำหรับผู้บริหาร - KPI การแจ้งเตือน และคะแนนสุขภาพในทุกโมดูล',
        caption: 'สรุปสำหรับผู้บริหาร',
        whatYouSee:
          'คะแนนสุขภาพเดียวครอบคลุมทุกโมดูล ดึงเรื่องเดียวที่ต้องการคุณวันนี้ขึ้นมา - ตรงนี้คือส่วนต่างต้นทุนอาหารที่สูงกว่าที่ควรอยู่มาก - เพื่อไม่ให้เรื่องสำคัญซ่อนอยู่ในรายงานจนสายเกินไป',
        productLabel: 'ดูแกลเลอรี Insights ทั้งหมด →',
      },
      pulseWallboard: {
        alt: 'Pulse - จังหวะยอดขายแบบเรียลไทม์เทียบกับเป้า',
        caption: 'Pulse - จังหวะเรียลไทม์',
        whatYouSee:
          'กะที่กำลังดำเนินอยู่ในพริบตา - ยอดขายเทียบกับเป้าของทุกสาขา - พร้อมบอกชัดว่าต้องใช้อะไรเพื่อปิดช่องว่างก่อนปิดร้าน: จังหวะต่อชั่วโมงที่แต่ละสาขาต้องการสำหรับช่วงบริการที่เหลือ',
        productLabel: 'ดูแกลเลอรี Pulse ทั้งหมด →',
      },
      foresightScenarios: {
        alt: 'สถานการณ์ Foresight - คลังสถานการณ์พร้อมเทมเพลตเริ่มต้นเร็ว 10 แบบ',
        caption: 'Foresight - สถานการณ์',
        whatYouSee:
          'จำลองการตัดสินใจก่อนลงมือจริง เริ่มจากเทมเพลต - ขึ้นราคา 5% ลดแรงงาน 10% หรือดันการตลาด - แล้วดูผลต่อรายได้และมาร์จินก่อนที่อะไรจะเกิดขึ้นจริง',
        productLabel: 'ดูแกลเลอรี Foresight ทั้งหมด →',
      },
      intelligence: {
        alt: 'Sundae Intelligence - อินเทอร์เฟซตัดสินใจแบบสนทนา',
        caption: 'Sundae Intelligence',
        whatYouSee:
          'ถามธุรกิจของคุณได้ทุกเรื่องเป็นภาษาคนทั่วไป คำถามอย่าง "เมื่อคืนอะไรดันยอดขาย?" จะตอบกลับพร้อมคำตอบ ตัวเลขเบื้องหลัง และแหล่งที่มา - เป็นบทสนทนา ไม่ใช่แดชบอร์ด',
        productLabel: 'ดูแกลเลอรี Intelligence ทั้งหมด →',
      },
    },
    adaptsNote:
      'และสิ่งเหล่านี้ไม่ได้ตายตัว - ทุกมุมมองปรับตามบทบาทและวิธีการทำงานของทีมคุณ ดังนั้น CEO, GM และหัวหน้าฝ่ายการเงิน ต่างเห็นสิ่งที่สำคัญต่อตนเองพอดี',
    footnoteLead: 'หน้าจอจริงภายในผลิตภัณฑ์ ข้อมูลที่แสดงเป็นข้อมูลสังเคราะห์เพื่อการอธิบาย',
    diagnosticLink: 'ทำแบบวินิจฉัยการดำเนินงาน',
    footnoteTail: 'เพื่อดูว่ามุมมองของคุณจะเป็นอย่างไร',
    openFullSize: 'เปิด {caption} แบบเต็มขนาด',
    closeLightbox: 'ปิดไลต์บ็อกซ์',
    prevImage: 'ภาพก่อนหน้า',
    nextImage: 'ภาพถัดไป',
    lightboxHint: '{index} / {total} · กด Esc เพื่อปิด · ← → เพื่อเลื่อน',
  },
  ms: {
    eyebrow: 'LIHAT PRODUK',
    headline: 'Inilah yang benar-benar dilihat pasukan anda.',
    sub: 'Empat paparan dari seluruh platform. Klik mana-mana untuk membesarkan - kemudian terokai galeri penuh di setiap halaman produk.',
    cards: {
      execSummary: {
        alt: 'Ringkasan Eksekutif - KPI, amaran dan skor kesihatan merentas setiap modul',
        caption: 'Ringkasan Eksekutif',
        whatYouSee:
          'Satu skor kesihatan merentas setiap modul mengetengahkan satu perkara yang memerlukan anda hari ini - di sini, varians kos makanan jauh melebihi yang sepatutnya - supaya tiada perkara penting tersembunyi dalam laporan sehingga sudah terlambat.',
        productLabel: 'Lihat galeri Insights penuh →',
      },
      pulseWallboard: {
        alt: 'Pulse - rentak jualan langsung berbanding sasaran',
        caption: 'Pulse - Rentak Langsung',
        whatYouSee:
          'Syif yang sedang berjalan secara sepintas lalu - jualan berbanding sasaran bagi setiap cawangan - dengan tepat apa yang diperlukan untuk menutup jurang sebelum tutup: rentak sejam yang diperlukan setiap lokasi untuk baki servis.',
        productLabel: 'Lihat galeri Pulse penuh →',
      },
      foresightScenarios: {
        alt: 'Senario Foresight - pustaka senario dengan 10 templat mula pantas',
        caption: 'Foresight - Senario',
        whatYouSee:
          'Modelkan keputusan sebelum anda melaksanakannya. Mula daripada templat - kenaikan harga 5%, pemotongan tenaga kerja 10%, satu dorongan pemasaran - dan lihat kesannya pada hasil dan margin sebelum apa-apa menjadi nyata.',
        productLabel: 'Lihat galeri Foresight penuh →',
      },
      intelligence: {
        alt: 'Sundae Intelligence - antara muka keputusan perbualan',
        caption: 'Sundae Intelligence',
        whatYouSee:
          'Tanya perniagaan anda apa-apa sahaja dalam bahasa biasa. Soalan seperti "apa yang mendorong hasil malam tadi?" kembali dengan jawapan, angka di sebaliknya dan sumbernya - satu perbualan, bukan papan pemuka.',
        productLabel: 'Lihat galeri Intelligence penuh →',
      },
    },
    adaptsNote:
      'Dan semua ini tidak tetap - setiap paparan menyesuaikan diri dengan peranan dan cara pasukan anda bekerja, jadi seorang CEO, seorang GM dan ketua kewangan masing-masing melihat tepat apa yang penting bagi mereka.',
    footnoteLead: 'Paparan langsung dalam produk. Data sintetik ditunjukkan sebagai ilustrasi.',
    diagnosticLink: 'Ambil Diagnostik Operasi',
    footnoteTail: 'untuk melihat rupa paparan anda nanti.',
    openFullSize: 'Buka {caption} pada saiz penuh',
    closeLightbox: 'Tutup lightbox',
    prevImage: 'Imej sebelumnya',
    nextImage: 'Imej seterusnya',
    lightboxHint: '{index} / {total} · Esc untuk tutup · ← → untuk navigasi',
  },
};
