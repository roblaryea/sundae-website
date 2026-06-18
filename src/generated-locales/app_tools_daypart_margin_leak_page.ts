// Generated website local copy overrides for src/app/tools/daypart-margin-leak/page.tsx.
// Do not edit by hand; regenerate from the English local copy source.
export const generatedLocalCopy = {
  "localizedCopy": {
    "fr": {
      "back": "Retour aux outils",
      "hero": {
        "badge": "INSIGHT-GRADE · INTELLIGENCE MAIN-D'ŒUVRE",
        "title": "Estimateur de fuite de marge par tranche horaire",
        "description": "Repérez la tranche horaire qui ronge votre marge à cause du sureffectif. La plupart des calculateurs de coût main-d'œuvre ne donnent qu'un seul % agrégé. Celui-ci découpe la journée en cinq fenêtres et met en lumière la pire d'entre elles - avec une action corrective précise et un impact annualisé."
      },
      "baseline": {
        "title": "Référence de l'établissement",
        "subtitle": "Par établissement, moyenne d'exploitation actuelle."
      },
      "fields": {
        "segment": "Segment",
        "currency": "Devise",
        "targetSuffix": "Cible {pct}%",
        "dailyRevenue": "Chiffre d'affaires quotidien / établissement",
        "hourlyLabor": "Coût horaire de la main-d'œuvre",
        "outletCount": "Nombre d'établissements"
      },
      "segments": {
        "qsr": "QSR / Restauration rapide",
        "fast_casual": "Fast-casual",
        "casual": "Restauration décontractée",
        "fine_dining": "Gastronomie",
        "hotel_fb": "F&B hôtelier",
        "cloud": "Cuisine virtuelle",
        "cafe_bakery": "Café / Boulangerie"
      },
      "breakdown": {
        "title": "Répartition par tranche horaire",
        "subtitle": "Part du chiffre d'affaires quotidien et effectif FTE actuel par fenêtre. Le % de chiffre d'affaires sur toutes les tranches devrait totaliser ~100."
      },
      "dayparts": {
        "morning": "Matin",
        "lunch": "Déjeuner",
        "afternoon": "Après-midi",
        "dinner": "Dîner",
        "lateNight": "Fin de soirée"
      },
      "placeholders": {
        "revPct": "% CA",
        "fte": "FTE"
      },
      "results": {
        "recoverableTitle": "Coût main-d'œuvre annuel récupérable · fourchette",
        "to": "à",
        "multiOutlet": "sur {outlets} établissements · point médian ≈ {mid}/an par établissement · sur {days} jours d'exploitation",
        "singleOutlet": "par établissement · {days} jours d'exploitation/an · facteur de récupération prudent appliqué",
        "assumes": "On suppose que {low}-{high}% du surcoût identifié est réalistement récupérable dès le premier trimestre - le reste correspond au socle de couverture que vous ne pouvez pas réduire sans casser le service."
      },
      "heatmap": {
        "title": "Carte thermique des fuites par tranche horaire",
        "perDay": "{amt}/jour récupérable"
      },
      "recommend": {
        "label": "Ce que Sundae examinerait en premier",
        "body": "{daypart} présente le plus grand écart par rapport à la cible {pct}% du segment {segment}. Une réduction de ~{fteHours} heures-FTE récupérerait environ {range}/sem par établissement - sous réserve d'une revue du socle de couverture.",
        "note": "En production, Sundae Pulse calibre la cible sur vos courbes de productivité historiques (pas une bande de segment figée), respecte les socles de couverture par établissement, et fait remonter le shift candidat avant le verrouillage de la paie."
      },
      "cta": "Voyez-le en direct sur vos données",
      "footnoteLabel": "Méthodologie (valeurs par défaut prudentes) :",
      "footnote": "Coût main-d'œuvre par tranche horaire = FTE × durée × salaire horaire. Cible = % main-d'œuvre propre au segment du chiffre d'affaires de la tranche (QSR 25% → gastronomie 36%). Surcoût identifié = actuel − cible. Seuls {low}-{high}% du surcoût identifié sont comptés comme réalistement récupérables - le reste est le socle de couverture ou une couverture incontournable. Annualisé sur {days} jours d'exploitation/an. Le résultat est une fourchette, jamais un chiffre optimiste unique. Sundae Pulse calibre sur vos courbes de productivité historiques par établissement et respecte les socles de couverture par shift - la version intégrée au produit est systématiquement plus fine et plus prudente que cet estimateur."
    },
    "es": {
      "back": "Volver a Herramientas",
      "hero": {
        "badge": "INSIGHT-GRADE · INTELIGENCIA DE PERSONAL",
        "title": "Estimador de fuga de margen por franja horaria",
        "description": "Encuentra la franja horaria que pierde margen por exceso de personal. La mayoría de calculadoras de coste laboral te dan un único % agregado. Esta divide el día en cinco ventanas y revela la peor de ellas - con una acción correctiva concreta e impacto anualizado."
      },
      "baseline": {
        "title": "Base del local",
        "subtitle": "Por local, promedio operativo actual."
      },
      "fields": {
        "segment": "Segmento",
        "currency": "Moneda",
        "targetSuffix": "Objetivo {pct}%",
        "dailyRevenue": "Ingresos diarios / local",
        "hourlyLabor": "Coste laboral por hora",
        "outletCount": "Número de locales"
      },
      "segments": {
        "qsr": "QSR / Comida rápida",
        "fast_casual": "Fast-casual",
        "casual": "Restauración informal",
        "fine_dining": "Alta cocina",
        "hotel_fb": "F&B hotelero",
        "cloud": "Cocina fantasma",
        "cafe_bakery": "Café / Panadería"
      },
      "breakdown": {
        "title": "Desglose por franja horaria",
        "subtitle": "Cuota de ingresos diarios y personal FTE actual por ventana. El % de ingresos en todas las franjas debería sumar ~100."
      },
      "dayparts": {
        "morning": "Mañana",
        "lunch": "Almuerzo",
        "afternoon": "Tarde",
        "dinner": "Cena",
        "lateNight": "Noche tardía"
      },
      "placeholders": {
        "revPct": "% Ing.",
        "fte": "FTE"
      },
      "results": {
        "recoverableTitle": "Coste laboral anual recuperable · rango",
        "to": "a",
        "multiOutlet": "en {outlets} locales · punto medio ≈ {mid}/año por local · sobre {days} días operativos",
        "singleOutlet": "por local · {days} días operativos/año · factor de recuperación conservador aplicado",
        "assumes": "Asume que del {low}-{high}% del sobregasto identificado es recuperable de forma realista en el primer trimestre - el resto es la base de cobertura que no puedes recortar sin romper el servicio."
      },
      "heatmap": {
        "title": "Mapa de calor de fugas por franja",
        "perDay": "{amt}/día recuperable"
      },
      "recommend": {
        "label": "Qué investigaría Sundae primero",
        "body": "{daypart} muestra la mayor brecha respecto al objetivo {pct}% del segmento {segment}. Un recorte de ~{fteHours} horas-FTE recuperaría unos {range}/sem por local - sujeto a una revisión de la base de cobertura.",
        "note": "En producción, Sundae Pulse calibra el objetivo según tus curvas históricas de productividad (no una banda de segmento fija), respeta las bases de cobertura por local y revela el turno candidato antes de que se cierre la nómina."
      },
      "cta": "Míralo en vivo con tus datos",
      "footnoteLabel": "Metodología (valores conservadores por defecto):",
      "footnote": "Coste laboral por franja = FTE × duración × salario por hora. Objetivo = % laboral propio del segmento sobre los ingresos de la franja (QSR 25% → alta cocina 36%). Sobregasto identificado = actual − objetivo. Solo el {low}-{high}% del sobregasto identificado se cuenta como recuperable de forma realista - el resto es base de cobertura o cobertura inevitable. Anualizado sobre {days} días operativos/año. El resultado es un rango, nunca una cifra optimista única. Sundae Pulse calibra según tus curvas históricas de productividad por local y respeta las bases de cobertura por turno - la versión integrada en el producto es sistemáticamente más afinada y conservadora que este estimador."
    },
    "de": {
      "back": "Zurück zu den Tools",
      "hero": {
        "badge": "INSIGHT-GRADE · PERSONAL-INTELLIGENZ",
        "title": "Margenverlust-Schätzer nach Tageszeit",
        "description": "Finden Sie die Tageszeit, in der Überbesetzung die Marge auffrisst. Die meisten Personalkosten-Rechner liefern nur einen aggregierten Gesamtwert in %. Dieser teilt den Tag in fünf Fenster auf und zeigt den größten Übeltäter - mit einer konkreten Korrekturmaßnahme und annualisiertem Effekt."
      },
      "baseline": {
        "title": "Standort-Basiswert",
        "subtitle": "Pro Standort, aktueller Betriebsdurchschnitt."
      },
      "fields": {
        "segment": "Segment",
        "currency": "Währung",
        "targetSuffix": "Ziel {pct}%",
        "dailyRevenue": "Tagesumsatz / Standort",
        "hourlyLabor": "Personalkosten pro Stunde",
        "outletCount": "Anzahl der Standorte"
      },
      "segments": {
        "qsr": "QSR / Fast Food",
        "fast_casual": "Fast-Casual",
        "casual": "Casual Dining",
        "fine_dining": "Fine Dining",
        "hotel_fb": "Hotel-F&B",
        "cloud": "Cloud-Küche",
        "cafe_bakery": "Café / Bäckerei"
      },
      "breakdown": {
        "title": "Aufschlüsselung nach Tageszeit",
        "subtitle": "Anteil am Tagesumsatz und aktuelle FTE-Besetzung pro Fenster. Der Umsatz-% über alle Tageszeiten sollte sich auf ~100 summieren."
      },
      "dayparts": {
        "morning": "Morgen",
        "lunch": "Mittag",
        "afternoon": "Nachmittag",
        "dinner": "Abend",
        "lateNight": "Spätabend"
      },
      "placeholders": {
        "revPct": "Umsatz-%",
        "fte": "FTE"
      },
      "results": {
        "recoverableTitle": "Rückgewinnbare jährliche Personalkosten · Spanne",
        "to": "bis",
        "multiOutlet": "über {outlets} Standorte · Mittelwert ≈ {mid}/Jahr pro Standort · über {days} Betriebstage",
        "singleOutlet": "pro Standort · {days} Betriebstage/Jahr · konservativer Rückgewinnungsfaktor angewandt",
        "assumes": "Annahme: {low}-{high}% der ermittelten Mehrausgaben sind im ersten Quartal realistisch rückgewinnbar - der Rest ist die Grundbesetzung zur Servicesicherung, die Sie nicht kürzen können, ohne die Abdeckung zu sprengen."
      },
      "heatmap": {
        "title": "Heatmap der Margenverluste nach Tageszeit",
        "perDay": "{amt}/Tag rückgewinnbar"
      },
      "recommend": {
        "label": "Was Sundae zuerst untersuchen würde",
        "body": "{daypart} weist die größte Lücke zum {pct}%-Ziel des Segments {segment} auf. Eine Kürzung von ~{fteHours} FTE-Stunden würde geschätzt {range}/Woche pro Standort zurückholen - vorbehaltlich einer Prüfung der Grundbesetzung.",
        "note": "In der Produktivumgebung kalibriert Sundae Pulse das Ziel anhand Ihrer historischen Produktivitätskurven (nicht anhand einer festen Segmentbandbreite), respektiert die Grundbesetzung pro Standort und meldet die infrage kommende Schicht, bevor die Lohnabrechnung gesperrt wird."
      },
      "cta": "Sehen Sie es live mit Ihren Daten",
      "footnoteLabel": "Methodik (konservative Standardwerte):",
      "footnote": "Personalkosten je Tageszeit = FTE × Dauer × Stundenlohn. Ziel = segmentspezifischer Personal-% am Umsatz der Tageszeit (QSR 25% → Fine Dining 36%). Ermittelte Mehrausgaben = aktuell − Ziel. Nur {low}-{high}% der ermittelten Mehrausgaben werden als realistisch rückgewinnbar gezählt - der Rest ist Grundbesetzung oder unvermeidbare Abdeckung. Annualisiert über {days} Betriebstage/Jahr. Das Ergebnis ist eine Spanne, niemals eine einzelne optimistische Zahl. Sundae Pulse kalibriert anhand Ihrer historischen Produktivitätskurven pro Standort und respektiert die Grundbesetzung pro Schicht - die Produktversion ist durchweg schärfer und konservativer als dieser Schätzer."
    },
    "nl": {
      "back": "Terug naar Tools",
      "hero": {
        "badge": "INSIGHT-GRADE · PERSONEELSINTELLIGENTIE",
        "title": "Margelek-schatter per dagdeel",
        "description": "Vind het dagdeel dat marge verliest door overbezetting. De meeste arbeidskostencalculators geven je één samengevoegd %. Deze splitst de dag in vijf vensters en legt de grootste boosdoener bloot - met een concrete corrigerende actie en geannualiseerde impact."
      },
      "baseline": {
        "title": "Vestigingsbasislijn",
        "subtitle": "Per vestiging, huidig bedrijfsgemiddelde."
      },
      "fields": {
        "segment": "Segment",
        "currency": "Valuta",
        "targetSuffix": "Doel {pct}%",
        "dailyRevenue": "Dagomzet / vestiging",
        "hourlyLabor": "Arbeidskosten per uur",
        "outletCount": "Aantal vestigingen"
      },
      "segments": {
        "qsr": "QSR / Fastfood",
        "fast_casual": "Fast-casual",
        "casual": "Casual dining",
        "fine_dining": "Fine dining",
        "hotel_fb": "Hotel-F&B",
        "cloud": "Cloud kitchen",
        "cafe_bakery": "Café / Bakkerij"
      },
      "breakdown": {
        "title": "Uitsplitsing per dagdeel",
        "subtitle": "Aandeel in de dagomzet en huidige FTE-bezetting per venster. De omzet-% over alle dagdelen moet optellen tot ~100."
      },
      "dayparts": {
        "morning": "Ochtend",
        "lunch": "Lunch",
        "afternoon": "Middag",
        "dinner": "Diner",
        "lateNight": "Late avond"
      },
      "placeholders": {
        "revPct": "Omzet-%",
        "fte": "FTE"
      },
      "results": {
        "recoverableTitle": "Terugvorderbare jaarlijkse arbeidskosten · bandbreedte",
        "to": "tot",
        "multiOutlet": "over {outlets} vestigingen · middelpunt ≈ {mid}/jaar per vestiging · over {days} bedrijfsdagen",
        "singleOutlet": "per vestiging · {days} bedrijfsdagen/jaar · conservatieve terugvorderingsfactor toegepast",
        "assumes": "Uitgangspunt: {low}-{high}% van de geïdentificeerde overbesteding is realistisch terugvorderbaar in het eerste kwartaal - de rest is basisbezetting voor de service die je niet kunt schrappen zonder de dekking te breken."
      },
      "heatmap": {
        "title": "Heatmap van margelekken per dagdeel",
        "perDay": "{amt}/dag terugvorderbaar"
      },
      "recommend": {
        "label": "Wat Sundae als eerste zou onderzoeken",
        "body": "{daypart} vertoont de grootste afstand tot het {pct}%-doel van het segment {segment}. Een vermindering van ~{fteHours} FTE-uren zou naar schatting {range}/wk per vestiging terughalen - onder voorbehoud van een toetsing van de basisbezetting.",
        "note": "In productie kalibreert Sundae Pulse het doel aan de hand van je historische productiviteitscurves (geen vaste segmentband), respecteert het de basisbezetting per vestiging en brengt het de kandidaat-shift naar voren voordat de loonadministratie wordt vergrendeld."
      },
      "cta": "Zie het live op jouw data",
      "footnoteLabel": "Methodiek (conservatieve standaardwaarden):",
      "footnote": "Arbeidskosten per dagdeel = FTE × duur × uurloon. Doel = segmentspecifiek arbeids-% van de dagdeelomzet (QSR 25% → fine dining 36%). Geïdentificeerde overbesteding = huidig − doel. Slechts {low}-{high}% van de geïdentificeerde overbesteding telt als realistisch terugvorderbaar - de rest is basisbezetting of onvermijdelijke dekking. Geannualiseerd over {days} bedrijfsdagen/jaar. De uitkomst is een bandbreedte, nooit één optimistisch cijfer. Sundae Pulse kalibreert aan de hand van je historische productiviteitscurves per vestiging en respecteert de basisbezetting per shift - de versie in het product is consequent scherper en conservatiever dan deze schatter."
    },
    "ar": {
      "back": "العودة إلى الأدوات",
      "hero": {
        "badge": "INSIGHT-GRADE · ذكاء القوى العاملة",
        "title": "مُقدِّر تسرّب الهامش حسب فترة اليوم",
        "description": "اكتشف فترة اليوم التي تستنزف الهامش بسبب فائض التوظيف. معظم حاسبات تكلفة العمالة تمنحك نسبة مئوية إجمالية واحدة فقط. هذه الأداة تقسّم اليوم إلى خمس نوافذ وتُبرز الأسوأ منها - مع إجراء تصحيحي محدد وأثر سنوي."
      },
      "baseline": {
        "title": "خط الأساس للفرع",
        "subtitle": "لكل فرع، المتوسط التشغيلي الحالي."
      },
      "fields": {
        "segment": "الشريحة",
        "currency": "العملة",
        "targetSuffix": "الهدف {pct}%",
        "dailyRevenue": "الإيراد اليومي / الفرع",
        "hourlyLabor": "تكلفة العمالة بالساعة",
        "outletCount": "عدد الفروع"
      },
      "segments": {
        "qsr": "QSR / الوجبات السريعة",
        "fast_casual": "سريع غير رسمي",
        "casual": "مطاعم غير رسمية",
        "fine_dining": "مطاعم راقية",
        "hotel_fb": "F&B الفندقي",
        "cloud": "مطبخ سحابي",
        "cafe_bakery": "مقهى / مخبز"
      },
      "breakdown": {
        "title": "تفصيل حسب فترة اليوم",
        "subtitle": "حصة الإيراد اليومي والتوظيف الحالي بوحدة FTE لكل نافذة. ينبغي أن يبلغ مجموع نسبة الإيراد عبر جميع فترات اليوم نحو ~100."
      },
      "dayparts": {
        "morning": "الصباح",
        "lunch": "الغداء",
        "afternoon": "بعد الظهر",
        "dinner": "العشاء",
        "lateNight": "آخر الليل"
      },
      "placeholders": {
        "revPct": "% الإيراد",
        "fte": "FTE"
      },
      "results": {
        "recoverableTitle": "تكلفة العمالة السنوية القابلة للاسترداد · النطاق",
        "to": "إلى",
        "multiOutlet": "عبر {outlets} فروع · النقطة الوسطى ≈ {mid}/سنة لكل فرع · على مدى {days} يوم تشغيلي",
        "singleOutlet": "لكل فرع · {days} يوم تشغيلي/سنة · مع تطبيق عامل استرداد متحفظ",
        "assumes": "نفترض أن {low}-{high}% من الإنفاق الزائد المُحدَّد قابل للاسترداد واقعياً في الربع الأول - والباقي هو التوظيف الأساسي للخدمة الذي لا يمكنك تقليصه دون الإخلال بالتغطية."
      },
      "heatmap": {
        "title": "خريطة حرارية لتسرّب الهامش حسب فترة اليوم",
        "perDay": "{amt}/يوم قابلة للاسترداد"
      },
      "recommend": {
        "label": "ما الذي ستتحقق منه Sundae أولاً",
        "body": "تُظهر {daypart} أكبر فجوة عن هدف {pct}% لشريحة {segment}. تقليص نحو ~{fteHours} ساعة-FTE سيستردّ نحو {range}/أسبوع لكل فرع - رهناً بمراجعة الحد الأدنى للتغطية.",
        "note": "في بيئة الإنتاج، تعاير Sundae Pulse الهدف وفق منحنيات الإنتاجية التاريخية الخاصة بك (وليس نطاق شريحة ثابت)، وتحترم الحدود الدنيا للتغطية لكل فرع، وتُبرز الوردية المرشّحة قبل قفل كشوف الرواتب."
      },
      "cta": "شاهدها مباشرةً على بياناتك",
      "footnoteLabel": "المنهجية (قيم افتراضية متحفظة):",
      "footnote": "تكلفة العمالة لفترة اليوم = FTE × المدة × الأجر بالساعة. الهدف = نسبة العمالة الخاصة بالشريحة من إيراد فترة اليوم (QSR 25% → المطاعم الراقية 36%). الإنفاق الزائد المُحدَّد = الحالي − الهدف. يُحتسب فقط {low}-{high}% من الإنفاق الزائد المُحدَّد كقابل للاسترداد واقعياً - والباقي توظيف أساسي للخدمة أو تغطية لا مفر منها. مُحتسب سنوياً على مدى {days} يوم تشغيلي/سنة. النتيجة نطاق، وليست رقماً متفائلاً واحداً. تعاير Sundae Pulse وفق منحنيات الإنتاجية التاريخية لكل فرع وتحترم الحدود الدنيا للتغطية لكل وردية - النسخة داخل المنتج أدق وأكثر تحفظاً باستمرار من هذا المُقدِّر."
    },
    "pt": {
      "back": "Voltar às Ferramentas",
      "hero": {
        "badge": "INSIGHT-GRADE · INTELIGÊNCIA DE PESSOAL",
        "title": "Estimador de vazamento de margem por período do dia",
        "description": "Encontre o período do dia que perde margem por excesso de pessoal. A maioria das calculadoras de custo de mão de obra dá apenas um % agregado. Esta divide o dia em cinco janelas e revela a pior delas - com uma ação corretiva específica e impacto anualizado."
      },
      "baseline": {
        "title": "Linha de base da unidade",
        "subtitle": "Por unidade, média operacional atual."
      },
      "fields": {
        "segment": "Segmento",
        "currency": "Moeda",
        "targetSuffix": "Meta {pct}%",
        "dailyRevenue": "Receita diária / unidade",
        "hourlyLabor": "Custo de mão de obra por hora",
        "outletCount": "Número de unidades"
      },
      "segments": {
        "qsr": "QSR / Fast food",
        "fast_casual": "Fast-casual",
        "casual": "Restauração informal",
        "fine_dining": "Alta gastronomia",
        "hotel_fb": "F&B hoteleiro",
        "cloud": "Cozinha virtual",
        "cafe_bakery": "Café / Padaria"
      },
      "breakdown": {
        "title": "Detalhamento por período do dia",
        "subtitle": "Participação na receita diária e quadro FTE atual por janela. O % de receita em todos os períodos deve somar ~100."
      },
      "dayparts": {
        "morning": "Manhã",
        "lunch": "Almoço",
        "afternoon": "Tarde",
        "dinner": "Jantar",
        "lateNight": "Madrugada"
      },
      "placeholders": {
        "revPct": "% Rec.",
        "fte": "FTE"
      },
      "results": {
        "recoverableTitle": "Custo anual de mão de obra recuperável · faixa",
        "to": "a",
        "multiOutlet": "em {outlets} unidades · ponto médio ≈ {mid}/ano por unidade · ao longo de {days} dias de operação",
        "singleOutlet": "por unidade · {days} dias de operação/ano · fator de recuperação conservador aplicado",
        "assumes": "Pressupõe que {low}-{high}% do excesso de gasto identificado é realisticamente recuperável no primeiro trimestre - o restante é o quadro mínimo de cobertura que você não pode cortar sem quebrar o atendimento."
      },
      "heatmap": {
        "title": "Mapa de calor de vazamento por período",
        "perDay": "{amt}/dia recuperável"
      },
      "recommend": {
        "label": "O que a Sundae investigaria primeiro",
        "body": "{daypart} apresenta a maior lacuna em relação à meta de {pct}% do segmento {segment}. Um corte de ~{fteHours} horas-FTE recuperaria cerca de {range}/sem por unidade - sujeito a uma revisão do quadro mínimo de cobertura.",
        "note": "Em produção, o Sundae Pulse calibra a meta com base nas suas curvas históricas de produtividade (não uma faixa fixa de segmento), respeita os quadros mínimos de cobertura por unidade e revela o turno candidato antes do fechamento da folha."
      },
      "cta": "Veja ao vivo com seus dados",
      "footnoteLabel": "Metodologia (padrões conservadores):",
      "footnote": "Custo de mão de obra por período = FTE × duração × salário por hora. Meta = % de mão de obra específico do segmento sobre a receita do período (QSR 25% → alta gastronomia 36%). Excesso de gasto identificado = atual − meta. Apenas {low}-{high}% do excesso identificado é contado como realisticamente recuperável - o restante é quadro mínimo de cobertura ou cobertura inevitável. Anualizado ao longo de {days} dias de operação/ano. O resultado é uma faixa, nunca um número otimista único. O Sundae Pulse calibra com base nas suas curvas históricas de produtividade por unidade e respeita os quadros mínimos de cobertura por turno - a versão dentro do produto é consistentemente mais afiada e conservadora do que este estimador."
    },
    "it": {
      "back": "Torna agli Strumenti",
      "hero": {
        "badge": "INSIGHT-GRADE · INTELLIGENCE DEL PERSONALE",
        "title": "Stimatore della perdita di margine per fascia oraria",
        "description": "Individua la fascia oraria che erode il margine per eccesso di personale. La maggior parte dei calcolatori del costo del lavoro fornisce un solo % aggregato. Questo divide la giornata in cinque finestre e mette in evidenza la peggiore - con un'azione correttiva specifica e un impatto annualizzato."
      },
      "baseline": {
        "title": "Riferimento del punto vendita",
        "subtitle": "Per punto vendita, media operativa attuale."
      },
      "fields": {
        "segment": "Segmento",
        "currency": "Valuta",
        "targetSuffix": "Obiettivo {pct}%",
        "dailyRevenue": "Ricavo giornaliero / punto vendita",
        "hourlyLabor": "Costo orario del lavoro",
        "outletCount": "Numero di punti vendita"
      },
      "segments": {
        "qsr": "QSR / Fast food",
        "fast_casual": "Fast-casual",
        "casual": "Ristorazione informale",
        "fine_dining": "Alta ristorazione",
        "hotel_fb": "F&B alberghiero",
        "cloud": "Cucina virtuale",
        "cafe_bakery": "Caffetteria / Panetteria"
      },
      "breakdown": {
        "title": "Ripartizione per fascia oraria",
        "subtitle": "Quota del ricavo giornaliero e organico FTE attuale per finestra. La % di ricavo su tutte le fasce dovrebbe sommare a ~100."
      },
      "dayparts": {
        "morning": "Mattina",
        "lunch": "Pranzo",
        "afternoon": "Pomeriggio",
        "dinner": "Cena",
        "lateNight": "Tarda serata"
      },
      "placeholders": {
        "revPct": "% Ric.",
        "fte": "FTE"
      },
      "results": {
        "recoverableTitle": "Costo del lavoro annuo recuperabile · intervallo",
        "to": "a",
        "multiOutlet": "su {outlets} punti vendita · punto medio ≈ {mid}/anno per punto vendita · su {days} giorni operativi",
        "singleOutlet": "per punto vendita · {days} giorni operativi/anno · applicato un fattore di recupero prudente",
        "assumes": "Si presume che il {low}-{high}% della spesa eccedente individuata sia realisticamente recuperabile nel primo trimestre - il resto è l'organico minimo di copertura che non puoi tagliare senza compromettere il servizio."
      },
      "heatmap": {
        "title": "Heatmap delle perdite per fascia oraria",
        "perDay": "{amt}/giorno recuperabile"
      },
      "recommend": {
        "label": "Cosa esaminerebbe per prima cosa Sundae",
        "body": "{daypart} mostra il divario maggiore rispetto all'obiettivo del {pct}% del segmento {segment}. Una riduzione di ~{fteHours} ore-FTE recupererebbe circa {range}/sett per punto vendita - in attesa di una verifica dell'organico minimo di copertura.",
        "note": "In produzione, Sundae Pulse calibra l'obiettivo sulle tue curve storiche di produttività (non una fascia di segmento fissa), rispetta gli organici minimi di copertura per punto vendita e mette in evidenza il turno candidato prima del blocco delle buste paga."
      },
      "cta": "Guardalo dal vivo sui tuoi dati",
      "footnoteLabel": "Metodologia (valori predefiniti prudenti):",
      "footnote": "Costo del lavoro per fascia = FTE × durata × salario orario. Obiettivo = % del lavoro specifico del segmento sul ricavo della fascia (QSR 25% → alta ristorazione 36%). Spesa eccedente individuata = attuale − obiettivo. Solo il {low}-{high}% della spesa eccedente individuata viene conteggiato come realisticamente recuperabile - il resto è organico minimo di copertura o copertura inevitabile. Annualizzato su {days} giorni operativi/anno. Il risultato è un intervallo, mai un singolo dato ottimistico. Sundae Pulse calibra sulle tue curve storiche di produttività per punto vendita e rispetta gli organici minimi di copertura per turno - la versione integrata nel prodotto è costantemente più precisa e prudente di questo stimatore."
    },
    "hi": {
      "back": "टूल्स पर वापस",
      "hero": {
        "badge": "INSIGHT-GRADE · श्रम इंटेलिजेंस",
        "title": "डेपार्ट मार्जिन लीक अनुमानक",
        "description": "वह डेपार्ट खोजें जहाँ ज़रूरत से ज़्यादा स्टाफ़ के कारण मार्जिन बह रहा है। ज़्यादातर श्रम-लागत कैलकुलेटर आपको सिर्फ़ एक कुल % देते हैं। यह दिन को पाँच विंडो में बाँटता है और सबसे बड़े दोषी को सामने लाता है - एक ठोस सुधारात्मक कार्रवाई और वार्षिक प्रभाव के साथ।"
      },
      "baseline": {
        "title": "आउटलेट बेसलाइन",
        "subtitle": "प्रति आउटलेट, वर्तमान परिचालन औसत।"
      },
      "fields": {
        "segment": "सेगमेंट",
        "currency": "मुद्रा",
        "targetSuffix": "{pct}% लक्ष्य",
        "dailyRevenue": "दैनिक राजस्व / आउटलेट",
        "hourlyLabor": "प्रति घंटा श्रम लागत",
        "outletCount": "आउटलेट संख्या"
      },
      "segments": {
        "qsr": "QSR / फ़ास्ट फ़ूड",
        "fast_casual": "फ़ास्ट-कैज़ुअल",
        "casual": "कैज़ुअल डाइनिंग",
        "fine_dining": "फ़ाइन डाइनिंग",
        "hotel_fb": "होटल F&B",
        "cloud": "क्लाउड किचन",
        "cafe_bakery": "कैफ़े / बेकरी"
      },
      "breakdown": {
        "title": "डेपार्ट विश्लेषण",
        "subtitle": "प्रति विंडो दैनिक राजस्व में हिस्सेदारी और वर्तमान FTE स्टाफ़िंग। सभी डेपार्ट में राजस्व % का योग ~100 होना चाहिए।"
      },
      "dayparts": {
        "morning": "सुबह",
        "lunch": "दोपहर का भोजन",
        "afternoon": "दोपहर बाद",
        "dinner": "रात का भोजन",
        "lateNight": "देर रात"
      },
      "placeholders": {
        "revPct": "राजस्व %",
        "fte": "FTE"
      },
      "results": {
        "recoverableTitle": "वसूली योग्य वार्षिक श्रम लागत · सीमा",
        "to": "से",
        "multiOutlet": "{outlets} आउटलेट पर · मध्य बिंदु ≈ {mid}/वर्ष प्रति आउटलेट · {days} परिचालन दिनों में",
        "singleOutlet": "प्रति आउटलेट · {days} परिचालन दिन/वर्ष · रूढ़िवादी वसूली कारक लागू",
        "assumes": "यह मानता है कि पहचाने गए अतिव्यय का {low}-{high}% पहली तिमाही में वास्तविक रूप से वसूली योग्य है - बाकी सेवा-आधार स्टाफ़िंग है जिसे आप कवरेज तोड़े बिना नहीं घटा सकते।"
      },
      "heatmap": {
        "title": "डेपार्ट लीक हीटमैप",
        "perDay": "{amt}/दिन वसूली योग्य"
      },
      "recommend": {
        "label": "Sundae सबसे पहले क्या जाँचेगा",
        "body": "{daypart} में {segment} सेगमेंट के {pct}% लक्ष्य से सबसे बड़ा अंतर दिखता है। ~{fteHours} FTE-घंटे की कटौती से प्रति आउटलेट अनुमानित {range}/सप्ताह वसूली होगी - कवरेज-आधार समीक्षा के अधीन।",
        "note": "प्रोडक्शन में, Sundae Pulse लक्ष्य को आपकी ऐतिहासिक उत्पादकता वक्रों के अनुसार कैलिब्रेट करता है (निश्चित सेगमेंट बैंड नहीं), प्रति-आउटलेट कवरेज आधार का सम्मान करता है, और पेरोल लॉक होने से पहले उम्मीदवार शिफ़्ट को सामने लाता है।"
      },
      "cta": "इसे अपने डेटा पर लाइव देखें",
      "footnoteLabel": "कार्यप्रणाली (रूढ़िवादी डिफ़ॉल्ट):",
      "footnote": "डेपार्ट श्रम लागत = FTE × अवधि × प्रति घंटा वेतन। लक्ष्य = डेपार्ट राजस्व का सेगमेंट-विशिष्ट श्रम % (QSR 25% → फ़ाइन डाइनिंग 36%)। पहचाना गया अतिव्यय = वर्तमान − लक्ष्य। पहचाने गए अतिव्यय का केवल {low}-{high}% ही वास्तविक रूप से वसूली योग्य गिना जाता है - बाकी सेवा-आधार स्टाफ़िंग या अपरिहार्य कवरेज है। {days} परिचालन दिन/वर्ष पर वार्षिकीकृत। आउटपुट एक सीमा है, कभी कोई एकल आशावादी आँकड़ा नहीं। Sundae Pulse प्रति-आउटलेट आपकी ऐतिहासिक उत्पादकता वक्रों के अनुसार कैलिब्रेट करता है और प्रति-शिफ़्ट कवरेज आधार का सम्मान करता है - उत्पाद के भीतर का संस्करण इस अनुमानक से लगातार अधिक पैना और रूढ़िवादी है।"
    },
    "pl": {
      "back": "Powrót do narzędzi",
      "hero": {
        "badge": "INSIGHT-GRADE · INTELIGENCJA KADROWA",
        "title": "Estymator wycieku marży wg pory dnia",
        "description": "Znajdź porę dnia, w której marża ucieka z powodu przerostu obsady. Większość kalkulatorów kosztów pracy podaje jeden zagregowany %. Ten dzieli dobę na pięć okien i ujawnia największego winowajcę - wraz z konkretnym działaniem naprawczym i wpływem w skali roku."
      },
      "baseline": {
        "title": "Punkt odniesienia lokalu",
        "subtitle": "Na lokal, bieżąca średnia operacyjna."
      },
      "fields": {
        "segment": "Segment",
        "currency": "Waluta",
        "targetSuffix": "Cel {pct}%",
        "dailyRevenue": "Dzienny przychód / lokal",
        "hourlyLabor": "Godzinowy koszt pracy",
        "outletCount": "Liczba lokali"
      },
      "segments": {
        "qsr": "QSR / Fast food",
        "fast_casual": "Fast-casual",
        "casual": "Gastronomia swobodna",
        "fine_dining": "Fine dining",
        "hotel_fb": "F&B hotelowe",
        "cloud": "Cloud kitchen",
        "cafe_bakery": "Kawiarnia / Piekarnia"
      },
      "breakdown": {
        "title": "Podział wg pory dnia",
        "subtitle": "Udział w dziennym przychodzie i bieżąca obsada FTE na okno. Suma % przychodu we wszystkich porach dnia powinna wynosić ~100."
      },
      "dayparts": {
        "morning": "Rano",
        "lunch": "Lunch",
        "afternoon": "Popołudnie",
        "dinner": "Kolacja",
        "lateNight": "Późny wieczór"
      },
      "placeholders": {
        "revPct": "% przych.",
        "fte": "FTE"
      },
      "results": {
        "recoverableTitle": "Możliwy do odzyskania roczny koszt pracy · zakres",
        "to": "do",
        "multiOutlet": "w {outlets} lokalach · punkt środkowy ≈ {mid}/rok na lokal · w ciągu {days} dni operacyjnych",
        "singleOutlet": "na lokal · {days} dni operacyjnych/rok · zastosowano ostrożny współczynnik odzysku",
        "assumes": "Zakłada, że {low}-{high}% zidentyfikowanego przekroczenia kosztów jest realistycznie możliwe do odzyskania w pierwszym kwartale - reszta to minimalna obsada serwisowa, której nie da się ściąć bez przerwania pokrycia."
      },
      "heatmap": {
        "title": "Mapa cieplna wycieków wg pory dnia",
        "perDay": "{amt}/dzień do odzyskania"
      },
      "recommend": {
        "label": "Co Sundae sprawdziłoby najpierw",
        "body": "{daypart} wykazuje największą lukę względem celu {pct}% dla segmentu {segment}. Redukcja o ~{fteHours} godzin-FTE odzyskałaby szacunkowo {range}/tydz. na lokal - po weryfikacji minimalnej obsady.",
        "note": "W środowisku produkcyjnym Sundae Pulse kalibruje cel względem Twoich historycznych krzywych produktywności (nie sztywnego pasma segmentu), respektuje minimalną obsadę na lokal i wskazuje kandydacką zmianę przed zablokowaniem listy płac."
      },
      "cta": "Zobacz to na żywo na swoich danych",
      "footnoteLabel": "Metodologia (ostrożne wartości domyślne):",
      "footnote": "Koszt pracy wg pory dnia = FTE × czas trwania × stawka godzinowa. Cel = właściwy dla segmentu % kosztów pracy w przychodzie pory dnia (QSR 25% → fine dining 36%). Zidentyfikowane przekroczenie = bieżące − cel. Tylko {low}-{high}% zidentyfikowanego przekroczenia liczy się jako realistycznie możliwe do odzyskania - reszta to minimalna obsada serwisowa lub nieuniknione pokrycie. W skali roku na {days} dni operacyjnych/rok. Wynik to zakres, nigdy pojedyncza optymistyczna liczba. Sundae Pulse kalibruje względem Twoich historycznych krzywych produktywności na lokal i respektuje minimalną obsadę na zmianę - wersja w produkcie jest konsekwentnie ostrzejsza i ostrożniejsza niż ten estymator."
    },
    "ur": {
      "back": "ٹولز پر واپس",
      "hero": {
        "badge": "INSIGHT-GRADE · لیبر انٹیلیجنس",
        "title": "ڈے پارٹ مارجن لیک تخمینہ کار",
        "description": "وہ ڈے پارٹ تلاش کریں جہاں ضرورت سے زیادہ عملے کے باعث مارجن بہہ رہا ہے۔ زیادہ تر لیبر لاگت کیلکولیٹر آپ کو صرف ایک مجموعی % دیتے ہیں۔ یہ دن کو پانچ کھڑکیوں میں تقسیم کرتا ہے اور سب سے بڑے قصوروار کو سامنے لاتا ہے - ایک مخصوص اصلاحی اقدام اور سالانہ اثر کے ساتھ۔"
      },
      "baseline": {
        "title": "آؤٹ لیٹ بنیادی لائن",
        "subtitle": "فی آؤٹ لیٹ، موجودہ آپریٹنگ اوسط۔"
      },
      "fields": {
        "segment": "سیگمنٹ",
        "currency": "کرنسی",
        "targetSuffix": "{pct}% ہدف",
        "dailyRevenue": "روزانہ آمدنی / آؤٹ لیٹ",
        "hourlyLabor": "فی گھنٹہ لیبر لاگت",
        "outletCount": "آؤٹ لیٹ کی تعداد"
      },
      "segments": {
        "qsr": "QSR / فاسٹ فوڈ",
        "fast_casual": "فاسٹ-کیژوئل",
        "casual": "کیژوئل ڈائننگ",
        "fine_dining": "فائن ڈائننگ",
        "hotel_fb": "ہوٹل F&B",
        "cloud": "کلاؤڈ کچن",
        "cafe_bakery": "کیفے / بیکری"
      },
      "breakdown": {
        "title": "ڈے پارٹ تفصیل",
        "subtitle": "فی کھڑکی روزانہ آمدنی میں حصہ اور موجودہ FTE عملہ۔ تمام ڈے پارٹس میں آمدنی % کا مجموعہ ~100 ہونا چاہیے۔"
      },
      "dayparts": {
        "morning": "صبح",
        "lunch": "دوپہر کا کھانا",
        "afternoon": "سہ پہر",
        "dinner": "رات کا کھانا",
        "lateNight": "رات گئے"
      },
      "placeholders": {
        "revPct": "آمدنی %",
        "fte": "FTE"
      },
      "results": {
        "recoverableTitle": "قابلِ وصولی سالانہ لیبر لاگت · حد",
        "to": "تا",
        "multiOutlet": "{outlets} آؤٹ لیٹس پر · درمیانی نقطہ ≈ {mid}/سال فی آؤٹ لیٹ · {days} آپریٹنگ دنوں میں",
        "singleOutlet": "فی آؤٹ لیٹ · {days} آپریٹنگ دن/سال · محتاط وصولی عنصر لاگو",
        "assumes": "فرض کیا جاتا ہے کہ شناخت شدہ زائد اخراجات کا {low}-{high}% پہلی سہ ماہی میں حقیقت پسندانہ طور پر قابلِ وصولی ہے - باقی سروس کی بنیادی عملہ بندی ہے جسے آپ کوریج توڑے بغیر کم نہیں کر سکتے۔"
      },
      "heatmap": {
        "title": "ڈے پارٹ لیک ہیٹ میپ",
        "perDay": "{amt}/دن قابلِ وصولی"
      },
      "recommend": {
        "label": "Sundae سب سے پہلے کیا جانچے گا",
        "body": "{daypart} میں {segment} سیگمنٹ کے {pct}% ہدف سے سب سے بڑا فرق نظر آتا ہے۔ ~{fteHours} FTE-گھنٹے کی کٹوتی سے فی آؤٹ لیٹ تخمیناً {range}/ہفتہ وصول ہوگا - کوریج-بنیاد جائزے سے مشروط۔",
        "note": "پروڈکشن میں، Sundae Pulse ہدف کو آپ کے تاریخی پیداواری منحنیوں کے مطابق کیلیبریٹ کرتا ہے (مقررہ سیگمنٹ بینڈ نہیں)، فی آؤٹ لیٹ کوریج بنیادوں کا احترام کرتا ہے، اور پے رول لاک ہونے سے پہلے امیدوار شفٹ سامنے لاتا ہے۔"
      },
      "cta": "اسے اپنے ڈیٹا پر لائیو دیکھیں",
      "footnoteLabel": "طریقہ کار (محتاط ڈیفالٹس):",
      "footnote": "ڈے پارٹ لیبر لاگت = FTE × دورانیہ × فی گھنٹہ اجرت۔ ہدف = ڈے پارٹ آمدنی کا سیگمنٹ-مخصوص لیبر % (QSR 25% → فائن ڈائننگ 36%)۔ شناخت شدہ زائد اخراجات = موجودہ − ہدف۔ شناخت شدہ زائد اخراجات کا صرف {low}-{high}% ہی حقیقت پسندانہ طور پر قابلِ وصولی شمار ہوتا ہے - باقی سروس کی بنیادی عملہ بندی یا ناگزیر کوریج ہے۔ {days} آپریٹنگ دن/سال پر سالانہ بنایا گیا۔ نتیجہ ایک حد ہے، کبھی کوئی واحد پُرامید عدد نہیں۔ Sundae Pulse فی آؤٹ لیٹ آپ کے تاریخی پیداواری منحنیوں کے مطابق کیلیبریٹ کرتا ہے اور فی شفٹ کوریج بنیادوں کا احترام کرتا ہے - پروڈکٹ کے اندر کا ورژن اس تخمینہ کار سے مستقل طور پر زیادہ تیز اور محتاط ہے۔"
    },
    "zh-Hans": {
      "back": "返回工具",
      "hero": {
        "badge": "INSIGHT-GRADE · 人力智能",
        "title": "时段毛利泄漏估算器",
        "description": "找出因人员超配而吞噬毛利的时段。多数人力成本计算器只给你一个汇总的 %。本工具将一天划分为五个时段，并揭示最严重的那一个 - 附带具体的纠正措施和年化影响。"
      },
      "baseline": {
        "title": "门店基线",
        "subtitle": "按门店计，当前运营平均值。"
      },
      "fields": {
        "segment": "业态",
        "currency": "货币",
        "targetSuffix": "目标 {pct}%",
        "dailyRevenue": "每日营收 / 门店",
        "hourlyLabor": "每小时人力成本",
        "outletCount": "门店数量"
      },
      "segments": {
        "qsr": "QSR / 快餐",
        "fast_casual": "快休闲",
        "casual": "休闲正餐",
        "fine_dining": "精致正餐",
        "hotel_fb": "酒店 F&B",
        "cloud": "云厨房",
        "cafe_bakery": "咖啡 / 烘焙"
      },
      "breakdown": {
        "title": "时段拆解",
        "subtitle": "每个时段在每日营收中的占比及当前 FTE 配置。各时段营收 % 之和应约为 ~100。"
      },
      "dayparts": {
        "morning": "早间",
        "lunch": "午餐",
        "afternoon": "午后",
        "dinner": "晚餐",
        "lateNight": "深夜"
      },
      "placeholders": {
        "revPct": "营收 %",
        "fte": "FTE"
      },
      "results": {
        "recoverableTitle": "可回收年度人力成本 · 区间",
        "to": "至",
        "multiOutlet": "覆盖 {outlets} 家门店 · 中值 ≈ 每店 {mid}/年 · 历经 {days} 个营业日",
        "singleOutlet": "每店 · {days} 个营业日/年 · 已采用保守回收系数",
        "assumes": "假设已识别超支的 {low}-{high}% 可在第一季度内现实地回收 - 其余为服务底线配置，削减将破坏覆盖。"
      },
      "heatmap": {
        "title": "时段泄漏热力图",
        "perDay": "每日可回收 {amt}"
      },
      "recommend": {
        "label": "Sundae 会优先排查什么",
        "body": "{daypart} 与 {segment} 业态的 {pct}% 目标差距最大。削减约 ~{fteHours} FTE-小时，预计每店每周可回收 {range} - 需先完成覆盖底线复核。",
        "note": "在生产环境中，Sundae Pulse 会依据你的历史生产力曲线校准目标（而非固定的业态区间），尊重每店的覆盖底线，并在工资锁定前浮现候选班次。"
      },
      "cta": "用你的数据实时查看",
      "footnoteLabel": "方法论（保守默认值）：",
      "footnote": "时段人力成本 = FTE × 时长 × 时薪。目标 = 该业态在时段营收中的人力 %（QSR 25% → 精致正餐 36%）。已识别超支 = 当前 − 目标。已识别超支中仅 {low}-{high}% 计为现实可回收 - 其余为服务底线配置或不可避免的覆盖。按 {days} 个营业日/年年化。输出为区间，绝非单一乐观数字。Sundae Pulse 依据你每店的历史生产力曲线校准，并尊重每个班次的覆盖底线 - 产品内版本始终比本估算器更精准、更保守。"
    },
    "ja": {
      "back": "ツールに戻る",
      "hero": {
        "badge": "INSIGHT-GRADE · 労務インテリジェンス",
        "title": "時間帯別マージン流出エスティメーター",
        "description": "過剰人員でマージンが流出している時間帯を見つけます。ほとんどの人件費計算ツールは集計された % を一つ示すだけです。本ツールは一日を5つの枠に分け、最悪の時間帯を浮かび上がらせます - 具体的な是正アクションと年換算インパクト付きで。"
      },
      "baseline": {
        "title": "店舗ベースライン",
        "subtitle": "店舗あたり、現在の運営平均。"
      },
      "fields": {
        "segment": "セグメント",
        "currency": "通貨",
        "targetSuffix": "目標 {pct}%",
        "dailyRevenue": "日次売上 / 店舗",
        "hourlyLabor": "時間あたり人件費",
        "outletCount": "店舗数"
      },
      "segments": {
        "qsr": "QSR / ファストフード",
        "fast_casual": "ファストカジュアル",
        "casual": "カジュアルダイニング",
        "fine_dining": "ファインダイニング",
        "hotel_fb": "ホテル F&B",
        "cloud": "クラウドキッチン",
        "cafe_bakery": "カフェ / ベーカリー"
      },
      "breakdown": {
        "title": "時間帯別内訳",
        "subtitle": "枠ごとの日次売上シェアと現在の FTE 配置。全時間帯の売上 % の合計は ~100 になるはずです。"
      },
      "dayparts": {
        "morning": "朝",
        "lunch": "ランチ",
        "afternoon": "午後",
        "dinner": "ディナー",
        "lateNight": "深夜"
      },
      "placeholders": {
        "revPct": "売上 %",
        "fte": "FTE"
      },
      "results": {
        "recoverableTitle": "回収可能な年間人件費 · レンジ",
        "to": "～",
        "multiOutlet": "{outlets} 店舗にわたって · 中央値 ≈ 1店舗あたり {mid}/年 · {days} 営業日にわたり",
        "singleOutlet": "店舗あたり · {days} 営業日/年 · 保守的な回収係数を適用",
        "assumes": "特定された過剰支出の {low}-{high}% が第1四半期に現実的に回収可能と想定しています - 残りはカバレッジを崩さずには削れないサービス基準の人員配置です。"
      },
      "heatmap": {
        "title": "時間帯別流出ヒートマップ",
        "perDay": "{amt}/日 回収可能"
      },
      "recommend": {
        "label": "Sundae が最初に調べること",
        "body": "{daypart} は {segment} セグメントの {pct}% 目標との差が最も大きくなっています。~{fteHours} FTE時間を削減すれば、1店舗あたり推定 {range}/週を回収できます - カバレッジ基準のレビューを前提とします。",
        "note": "本番環境では、Sundae Pulse は目標をあなたの過去の生産性カーブに合わせて調整し（固定のセグメント帯ではなく）、店舗ごとのカバレッジ基準を尊重し、給与確定前に候補シフトを浮かび上がらせます。"
      },
      "cta": "あなたのデータでライブにご覧ください",
      "footnoteLabel": "方法論（保守的なデフォルト値）：",
      "footnote": "時間帯別人件費 = FTE × 時間 × 時給。目標 = 時間帯売上に対するセグメント固有の人件費 %（QSR 25% → ファインダイニング 36%）。特定された過剰支出 = 現在 − 目標。特定された過剰支出のうち {low}-{high}% のみが現実的に回収可能としてカウントされます - 残りはサービス基準の人員配置または不可避なカバレッジです。{days} 営業日/年で年換算。出力はレンジであり、単一の楽観的な数値ではありません。Sundae Pulse は店舗ごとにあなたの過去の生産性カーブに合わせて調整し、シフトごとのカバレッジ基準を尊重します - 製品内のバージョンはこのエスティメーターより一貫してシャープかつ保守的です。"
    },
    "vi": {
      "back": "Quay lại Công cụ",
      "hero": {
        "badge": "INSIGHT-GRADE · TRÍ TUỆ NHÂN SỰ",
        "title": "Công cụ ước tính thất thoát biên theo khung giờ",
        "description": "Tìm khung giờ đang rò rỉ biên lợi nhuận do thừa nhân sự. Hầu hết các công cụ tính chi phí lao động chỉ cho bạn một con số % tổng hợp. Công cụ này chia ngày thành năm khung và làm nổi bật khung tệ nhất - kèm hành động khắc phục cụ thể và tác động quy năm."
      },
      "baseline": {
        "title": "Mốc cơ sở của cơ sở",
        "subtitle": "Theo từng cơ sở, mức trung bình vận hành hiện tại."
      },
      "fields": {
        "segment": "Phân khúc",
        "currency": "Tiền tệ",
        "targetSuffix": "Mục tiêu {pct}%",
        "dailyRevenue": "Doanh thu hằng ngày / cơ sở",
        "hourlyLabor": "Chi phí lao động theo giờ",
        "outletCount": "Số lượng cơ sở"
      },
      "segments": {
        "qsr": "QSR / Thức ăn nhanh",
        "fast_casual": "Fast-casual",
        "casual": "Ăn uống bình dân",
        "fine_dining": "Ẩm thực cao cấp",
        "hotel_fb": "F&B khách sạn",
        "cloud": "Bếp trên mây",
        "cafe_bakery": "Café / Tiệm bánh"
      },
      "breakdown": {
        "title": "Phân tích theo khung giờ",
        "subtitle": "Tỷ trọng doanh thu hằng ngày và mức bố trí FTE hiện tại theo từng khung. Tổng % doanh thu trên tất cả khung giờ nên đạt ~100."
      },
      "dayparts": {
        "morning": "Buổi sáng",
        "lunch": "Bữa trưa",
        "afternoon": "Buổi chiều",
        "dinner": "Bữa tối",
        "lateNight": "Đêm khuya"
      },
      "placeholders": {
        "revPct": "% DT",
        "fte": "FTE"
      },
      "results": {
        "recoverableTitle": "Chi phí lao động hằng năm có thể thu hồi · khoảng",
        "to": "đến",
        "multiOutlet": "trên {outlets} cơ sở · trung điểm ≈ {mid}/năm mỗi cơ sở · qua {days} ngày vận hành",
        "singleOutlet": "mỗi cơ sở · {days} ngày vận hành/năm · áp dụng hệ số thu hồi thận trọng",
        "assumes": "Giả định {low}-{high}% phần chi vượt được xác định là có thể thu hồi thực tế trong quý đầu - phần còn lại là mức nhân sự nền cho dịch vụ mà bạn không thể cắt mà không phá vỡ độ phủ."
      },
      "heatmap": {
        "title": "Bản đồ nhiệt thất thoát theo khung giờ",
        "perDay": "{amt}/ngày có thể thu hồi"
      },
      "recommend": {
        "label": "Điều Sundae sẽ điều tra trước tiên",
        "body": "{daypart} cho thấy khoảng cách lớn nhất so với mục tiêu {pct}% của phân khúc {segment}. Cắt giảm ~{fteHours} giờ-FTE sẽ thu hồi ước tính {range}/tuần mỗi cơ sở - tùy thuộc vào việc rà soát mức nhân sự nền.",
        "note": "Trong môi trường vận hành thực, Sundae Pulse hiệu chỉnh mục tiêu theo các đường cong năng suất lịch sử của bạn (không phải dải phân khúc cố định), tôn trọng mức nhân sự nền theo từng cơ sở và làm nổi bật ca ứng viên trước khi bảng lương bị khóa."
      },
      "cta": "Xem trực tiếp trên dữ liệu của bạn",
      "footnoteLabel": "Phương pháp luận (giá trị mặc định thận trọng):",
      "footnote": "Chi phí lao động theo khung giờ = FTE × thời lượng × lương theo giờ. Mục tiêu = % lao động đặc thù phân khúc trên doanh thu của khung giờ (QSR 25% → ẩm thực cao cấp 36%). Phần chi vượt được xác định = hiện tại − mục tiêu. Chỉ {low}-{high}% phần chi vượt được xác định được tính là có thể thu hồi thực tế - phần còn lại là nhân sự nền cho dịch vụ hoặc độ phủ không thể tránh. Quy năm trên {days} ngày vận hành/năm. Kết quả là một khoảng, không bao giờ là một con số lạc quan đơn lẻ. Sundae Pulse hiệu chỉnh theo các đường cong năng suất lịch sử của bạn cho từng cơ sở và tôn trọng mức nhân sự nền theo từng ca - phiên bản trong sản phẩm luôn sắc bén và thận trọng hơn công cụ ước tính này."
    },
    "tr": {
      "back": "Araçlara Dön",
      "hero": {
        "badge": "INSIGHT-GRADE · İŞGÜCÜ ZEKÂSI",
        "title": "Gün dilimi marj sızıntısı tahmincisi",
        "description": "Aşırı personel nedeniyle marjın sızdığı gün dilimini bulun. Çoğu işgücü maliyeti hesaplayıcısı size tek bir toplam % verir. Bu araç günü beş pencereye böler ve en kötüsünü açığa çıkarır - belirli bir düzeltici eylem ve yıllıklandırılmış etkiyle birlikte."
      },
      "baseline": {
        "title": "Şube temel değeri",
        "subtitle": "Şube başına, mevcut işletme ortalaması."
      },
      "fields": {
        "segment": "Segment",
        "currency": "Para birimi",
        "targetSuffix": "Hedef {pct}%",
        "dailyRevenue": "Günlük gelir / şube",
        "hourlyLabor": "Saatlik işgücü maliyeti",
        "outletCount": "Şube sayısı"
      },
      "segments": {
        "qsr": "QSR / Fast food",
        "fast_casual": "Fast-casual",
        "casual": "Rahat restoran",
        "fine_dining": "Üst düzey restoran",
        "hotel_fb": "Otel F&B",
        "cloud": "Bulut mutfak",
        "cafe_bakery": "Kafe / Fırın"
      },
      "breakdown": {
        "title": "Gün dilimi dökümü",
        "subtitle": "Her pencere için günlük gelir payı ve mevcut FTE kadrosu. Tüm gün dilimlerindeki gelir % toplamı ~100 olmalıdır."
      },
      "dayparts": {
        "morning": "Sabah",
        "lunch": "Öğle",
        "afternoon": "Öğleden sonra",
        "dinner": "Akşam yemeği",
        "lateNight": "Gece geç saat"
      },
      "placeholders": {
        "revPct": "Gelir %",
        "fte": "FTE"
      },
      "results": {
        "recoverableTitle": "Geri kazanılabilir yıllık işgücü maliyeti · aralık",
        "to": "ile",
        "multiOutlet": "{outlets} şube genelinde · orta nokta ≈ şube başına {mid}/yıl · {days} işletme günü boyunca",
        "singleOutlet": "şube başına · {days} işletme günü/yıl · ihtiyatlı geri kazanım faktörü uygulandı",
        "assumes": "Tespit edilen fazla harcamanın {low}-{high}% kısmının ilk çeyrekte gerçekçi olarak geri kazanılabilir olduğunu varsayar - geri kalanı, kapsamı bozmadan kısamayacağınız hizmet tabanı kadrosudur."
      },
      "heatmap": {
        "title": "Gün dilimi sızıntı ısı haritası",
        "perDay": "{amt}/gün geri kazanılabilir"
      },
      "recommend": {
        "label": "Sundae'nin önce inceleyeceği şey",
        "body": "{daypart}, {segment} segmentinin {pct}% hedefine en büyük açığı gösteriyor. ~{fteHours} FTE-saatlik bir kısıntı, şube başına tahmini {range}/hafta geri kazandırır - kapsam tabanı incelemesine tabidir.",
        "note": "Üretim ortamında Sundae Pulse, hedefi geçmiş verimlilik eğrilerinize göre kalibre eder (sabit bir segment bandına göre değil), şube başına kapsam tabanlarına saygı gösterir ve bordro kilitlenmeden önce aday vardiyayı öne çıkarır."
      },
      "cta": "Kendi verilerinizde canlı görün",
      "footnoteLabel": "Metodoloji (ihtiyatlı varsayılanlar):",
      "footnote": "Gün dilimi işgücü maliyeti = FTE × süre × saatlik ücret. Hedef = gün dilimi gelirinin segmente özgü işgücü % (QSR 25% → üst düzey restoran 36%). Tespit edilen fazla harcama = mevcut − hedef. Tespit edilen fazla harcamanın yalnızca {low}-{high}% kısmı gerçekçi olarak geri kazanılabilir sayılır - geri kalanı hizmet tabanı kadrosu veya kaçınılmaz kapsamdır. {days} işletme günü/yıl üzerinden yıllıklandırılmıştır. Çıktı bir aralıktır, asla tek bir iyimser rakam değildir. Sundae Pulse, şube başına geçmiş verimlilik eğrilerinize göre kalibre eder ve vardiya başına kapsam tabanlarına saygı gösterir - üründeki sürüm bu tahminciden sürekli olarak daha keskin ve daha ihtiyatlıdır."
    },
    "id": {
      "back": "Kembali ke Alat",
      "hero": {
        "badge": "INSIGHT-GRADE · INTELIJEN TENAGA KERJA",
        "title": "Estimator kebocoran margin per waktu hari",
        "description": "Temukan waktu hari yang menggerus margin akibat kelebihan staf. Sebagian besar kalkulator biaya tenaga kerja hanya memberi Anda satu % agregat. Alat ini membagi hari menjadi lima jendela dan menampilkan yang paling buruk - lengkap dengan tindakan korektif spesifik dan dampak tahunan."
      },
      "baseline": {
        "title": "Basis gerai",
        "subtitle": "Per gerai, rata-rata operasional saat ini."
      },
      "fields": {
        "segment": "Segmen",
        "currency": "Mata uang",
        "targetSuffix": "Target {pct}%",
        "dailyRevenue": "Pendapatan harian / gerai",
        "hourlyLabor": "Biaya tenaga kerja per jam",
        "outletCount": "Jumlah gerai"
      },
      "segments": {
        "qsr": "QSR / Makanan cepat saji",
        "fast_casual": "Fast-casual",
        "casual": "Santap santai",
        "fine_dining": "Santap mewah",
        "hotel_fb": "F&B hotel",
        "cloud": "Dapur cloud",
        "cafe_bakery": "Kafe / Toko roti"
      },
      "breakdown": {
        "title": "Rincian per waktu hari",
        "subtitle": "Porsi pendapatan harian dan penempatan FTE saat ini per jendela. Total % pendapatan di seluruh waktu hari harus mencapai ~100."
      },
      "dayparts": {
        "morning": "Pagi",
        "lunch": "Makan siang",
        "afternoon": "Sore",
        "dinner": "Makan malam",
        "lateNight": "Larut malam"
      },
      "placeholders": {
        "revPct": "% Pdpt.",
        "fte": "FTE"
      },
      "results": {
        "recoverableTitle": "Biaya tenaga kerja tahunan yang dapat dipulihkan · rentang",
        "to": "hingga",
        "multiOutlet": "di {outlets} gerai · titik tengah ≈ {mid}/thn per gerai · selama {days} hari operasional",
        "singleOutlet": "per gerai · {days} hari operasional/thn · faktor pemulihan konservatif diterapkan",
        "assumes": "Mengasumsikan {low}-{high}% dari pemborosan yang teridentifikasi realistis dapat dipulihkan pada kuartal pertama - sisanya adalah penempatan staf dasar layanan yang tidak bisa Anda pangkas tanpa merusak cakupan."
      },
      "heatmap": {
        "title": "Heatmap kebocoran per waktu hari",
        "perDay": "{amt}/hari dapat dipulihkan"
      },
      "recommend": {
        "label": "Apa yang akan diselidiki Sundae terlebih dahulu",
        "body": "{daypart} menunjukkan kesenjangan terbesar terhadap target {pct}% segmen {segment}. Pemangkasan sekitar ~{fteHours} jam-FTE akan memulihkan sekitar {range}/mgg per gerai - menunggu tinjauan tingkat cakupan dasar.",
        "note": "Dalam produksi, Sundae Pulse mengalibrasi target terhadap kurva produktivitas historis Anda (bukan pita segmen tetap), menghormati tingkat cakupan dasar per gerai, dan menampilkan shift kandidat sebelum penggajian dikunci."
      },
      "cta": "Lihat langsung pada data Anda",
      "footnoteLabel": "Metodologi (default konservatif):",
      "footnote": "Biaya tenaga kerja per waktu hari = FTE × durasi × upah per jam. Target = % tenaga kerja spesifik segmen terhadap pendapatan waktu hari (QSR 25% → santap mewah 36%). Pemborosan yang teridentifikasi = saat ini − target. Hanya {low}-{high}% dari pemborosan yang teridentifikasi dihitung sebagai realistis dapat dipulihkan - sisanya adalah penempatan staf dasar layanan atau cakupan yang tak terhindarkan. Ditahunkan selama {days} hari operasional/thn. Keluaran berupa rentang, bukan satu angka optimistis tunggal. Sundae Pulse mengalibrasi terhadap kurva produktivitas historis Anda per gerai dan menghormati tingkat cakupan dasar per shift - versi di dalam produk secara konsisten lebih tajam dan lebih konservatif daripada estimator ini."
    },
    "th": {
      "back": "กลับไปที่เครื่องมือ",
      "hero": {
        "badge": "INSIGHT-GRADE · ระบบอัจฉริยะด้านแรงงาน",
        "title": "เครื่องมือประเมินการรั่วไหลของมาร์จินตามช่วงเวลา",
        "description": "ค้นหาช่วงเวลาที่มาร์จินรั่วไหลจากการจัดคนเกินความจำเป็น เครื่องคำนวณต้นทุนแรงงานส่วนใหญ่ให้คุณแค่ % รวมตัวเดียว เครื่องมือนี้แบ่งวันออกเป็นห้าช่วงและเผยช่วงที่แย่ที่สุด - พร้อมการแก้ไขที่เจาะจงและผลกระทบรายปี"
      },
      "baseline": {
        "title": "ค่าฐานของสาขา",
        "subtitle": "ต่อสาขา ค่าเฉลี่ยการดำเนินงานปัจจุบัน"
      },
      "fields": {
        "segment": "เซกเมนต์",
        "currency": "สกุลเงิน",
        "targetSuffix": "เป้าหมาย {pct}%",
        "dailyRevenue": "รายได้ต่อวัน / สาขา",
        "hourlyLabor": "ต้นทุนแรงงานต่อชั่วโมง",
        "outletCount": "จำนวนสาขา"
      },
      "segments": {
        "qsr": "QSR / ฟาสต์ฟู้ด",
        "fast_casual": "ฟาสต์-แคชวล",
        "casual": "ร้านอาหารแบบสบายๆ",
        "fine_dining": "ไฟน์ไดนิ่ง",
        "hotel_fb": "F&B โรงแรม",
        "cloud": "คลาวด์คิตเชน",
        "cafe_bakery": "คาเฟ่ / เบเกอรี่"
      },
      "breakdown": {
        "title": "รายละเอียดตามช่วงเวลา",
        "subtitle": "สัดส่วนรายได้ต่อวันและการจัดคน FTE ปัจจุบันต่อช่วง ผลรวม % รายได้ของทุกช่วงเวลาควรอยู่ที่ราว ~100"
      },
      "dayparts": {
        "morning": "ช่วงเช้า",
        "lunch": "มื้อกลางวัน",
        "afternoon": "ช่วงบ่าย",
        "dinner": "มื้อค่ำ",
        "lateNight": "ดึก"
      },
      "placeholders": {
        "revPct": "% รายได้",
        "fte": "FTE"
      },
      "results": {
        "recoverableTitle": "ต้นทุนแรงงานรายปีที่กู้คืนได้ · ช่วง",
        "to": "ถึง",
        "multiOutlet": "ครอบคลุม {outlets} สาขา · จุดกึ่งกลาง ≈ {mid}/ปี ต่อสาขา · ตลอด {days} วันทำการ",
        "singleOutlet": "ต่อสาขา · {days} วันทำการ/ปี · ใช้ปัจจัยการกู้คืนแบบอนุรักษ์นิยม",
        "assumes": "สมมติว่า {low}-{high}% ของการใช้จ่ายเกินที่ระบุได้นั้นกู้คืนได้จริงในไตรมาสแรก - ส่วนที่เหลือคือการจัดคนขั้นพื้นฐานเพื่อบริการที่คุณตัดไม่ได้โดยไม่ทำให้การครอบคลุมพัง"
      },
      "heatmap": {
        "title": "ฮีตแมปการรั่วไหลตามช่วงเวลา",
        "perDay": "{amt}/วัน กู้คืนได้"
      },
      "recommend": {
        "label": "สิ่งที่ Sundae จะตรวจสอบเป็นอันดับแรก",
        "body": "{daypart} แสดงช่องว่างมากที่สุดเทียบกับเป้าหมาย {pct}% ของเซกเมนต์ {segment} การลดราว ~{fteHours} ชั่วโมง-FTE จะกู้คืนได้ประมาณ {range}/สัปดาห์ ต่อสาขา - ขึ้นอยู่กับการทบทวนขั้นพื้นฐานของการครอบคลุม",
        "note": "ในการใช้งานจริง Sundae Pulse จะปรับเทียบเป้าหมายกับเส้นโค้งผลิตภาพในอดีตของคุณ (ไม่ใช่แถบเซกเมนต์ที่ตายตัว) เคารพขั้นพื้นฐานของการครอบคลุมต่อสาขา และเผยกะที่เป็นตัวเลือกก่อนที่บัญชีเงินเดือนจะถูกล็อก"
      },
      "cta": "ดูแบบสดบนข้อมูลของคุณ",
      "footnoteLabel": "ระเบียบวิธี (ค่าเริ่มต้นแบบอนุรักษ์นิยม):",
      "footnote": "ต้นทุนแรงงานตามช่วงเวลา = FTE × ระยะเวลา × ค่าจ้างต่อชั่วโมง เป้าหมาย = % แรงงานเฉพาะเซกเมนต์ของรายได้ในช่วงเวลานั้น (QSR 25% → ไฟน์ไดนิ่ง 36%) การใช้จ่ายเกินที่ระบุได้ = ปัจจุบัน − เป้าหมาย เฉพาะ {low}-{high}% ของการใช้จ่ายเกินที่ระบุได้เท่านั้นที่นับเป็นกู้คืนได้จริง - ส่วนที่เหลือคือการจัดคนขั้นพื้นฐานเพื่อบริการหรือการครอบคลุมที่หลีกเลี่ยงไม่ได้ คิดเป็นรายปีตลอด {days} วันทำการ/ปี ผลลัพธ์เป็นช่วง ไม่ใช่ตัวเลขในแง่ดีตัวเดียว Sundae Pulse ปรับเทียบกับเส้นโค้งผลิตภาพในอดีตของคุณต่อสาขาและเคารพขั้นพื้นฐานของการครอบคลุมต่อกะ - เวอร์ชันในผลิตภัณฑ์คมชัดและอนุรักษ์นิยมกว่าเครื่องมือประเมินนี้อย่างสม่ำเสมอ"
    },
    "ko": {
      "back": "도구로 돌아가기",
      "hero": {
        "badge": "INSIGHT-GRADE · 인력 인텔리전스",
        "title": "시간대별 마진 누수 추정기",
        "description": "인력 과배치로 마진이 새어 나가는 시간대를 찾아냅니다. 대부분의 인건비 계산기는 집계된 % 하나만 제공합니다. 이 도구는 하루를 다섯 개 구간으로 나누고 가장 심각한 구간을 드러냅니다 - 구체적인 시정 조치와 연환산 영향과 함께."
      },
      "baseline": {
        "title": "매장 기준선",
        "subtitle": "매장당, 현재 운영 평균."
      },
      "fields": {
        "segment": "세그먼트",
        "currency": "통화",
        "targetSuffix": "목표 {pct}%",
        "dailyRevenue": "일일 매출 / 매장",
        "hourlyLabor": "시간당 인건비",
        "outletCount": "매장 수"
      },
      "segments": {
        "qsr": "QSR / 패스트푸드",
        "fast_casual": "패스트캐주얼",
        "casual": "캐주얼 다이닝",
        "fine_dining": "파인 다이닝",
        "hotel_fb": "호텔 F&B",
        "cloud": "클라우드 키친",
        "cafe_bakery": "카페 / 베이커리"
      },
      "breakdown": {
        "title": "시간대별 분석",
        "subtitle": "구간별 일일 매출 비중과 현재 FTE 배치. 모든 시간대의 매출 % 합계는 ~100이 되어야 합니다."
      },
      "dayparts": {
        "morning": "오전",
        "lunch": "점심",
        "afternoon": "오후",
        "dinner": "저녁",
        "lateNight": "심야"
      },
      "placeholders": {
        "revPct": "매출 %",
        "fte": "FTE"
      },
      "results": {
        "recoverableTitle": "회수 가능한 연간 인건비 · 범위",
        "to": "~",
        "multiOutlet": "{outlets}개 매장 전반 · 중간값 ≈ 매장당 {mid}/년 · {days} 영업일에 걸쳐",
        "singleOutlet": "매장당 · {days} 영업일/년 · 보수적 회수 계수 적용",
        "assumes": "식별된 초과 지출의 {low}-{high}%가 첫 분기에 현실적으로 회수 가능하다고 가정합니다 - 나머지는 커버리지를 깨지 않고는 줄일 수 없는 서비스 기준 배치입니다."
      },
      "heatmap": {
        "title": "시간대별 누수 히트맵",
        "perDay": "{amt}/일 회수 가능"
      },
      "recommend": {
        "label": "Sundae가 가장 먼저 살펴볼 것",
        "body": "{daypart}이(가) {segment} 세그먼트의 {pct}% 목표와 가장 큰 격차를 보입니다. 약 ~{fteHours} FTE-시간을 줄이면 매장당 주당 약 {range}을(를) 회수할 수 있습니다 - 커버리지 기준 검토를 전제로 합니다.",
        "note": "프로덕션 환경에서 Sundae Pulse는 고정된 세그먼트 대역이 아니라 귀사의 과거 생산성 곡선에 맞춰 목표를 보정하고, 매장별 커버리지 기준을 존중하며, 급여가 확정되기 전에 후보 시프트를 드러냅니다."
      },
      "cta": "귀사의 데이터로 실시간 확인하세요",
      "footnoteLabel": "방법론 (보수적 기본값):",
      "footnote": "시간대별 인건비 = FTE × 지속 시간 × 시급. 목표 = 시간대 매출 대비 세그먼트별 인건비 %(QSR 25% → 파인 다이닝 36%). 식별된 초과 지출 = 현재 − 목표. 식별된 초과 지출 중 {low}-{high}%만 현실적으로 회수 가능한 것으로 집계됩니다 - 나머지는 서비스 기준 배치 또는 불가피한 커버리지입니다. {days} 영업일/년 기준으로 연환산. 출력은 범위이며, 단일한 낙관적 수치가 아닙니다. Sundae Pulse는 매장별로 귀사의 과거 생산성 곡선에 맞춰 보정하고 시프트별 커버리지 기준을 존중합니다 - 제품 내 버전은 이 추정기보다 일관되게 더 날카롭고 보수적입니다."
    },
    "bn": {
      "back": "টুলে ফিরে যান",
      "hero": {
        "badge": "INSIGHT-GRADE · শ্রম ইন্টেলিজেন্স",
        "title": "ডেপার্ট মার্জিন লিক অনুমানক",
        "description": "অতিরিক্ত স্টাফিংয়ের কারণে যে ডেপার্টে মার্জিন বেরিয়ে যাচ্ছে তা খুঁজে বের করুন। বেশিরভাগ শ্রম-ব্যয় ক্যালকুলেটর আপনাকে কেবল একটি সমষ্টিগত % দেয়। এটি দিনটিকে পাঁচটি উইন্ডোতে ভাগ করে এবং সবচেয়ে খারাপটিকে সামনে আনে - একটি সুনির্দিষ্ট সংশোধনমূলক পদক্ষেপ এবং বার্ষিকীকৃত প্রভাব সহ।"
      },
      "baseline": {
        "title": "আউটলেট বেসলাইন",
        "subtitle": "প্রতি আউটলেট, বর্তমান পরিচালন গড়।"
      },
      "fields": {
        "segment": "সেগমেন্ট",
        "currency": "মুদ্রা",
        "targetSuffix": "{pct}% লক্ষ্য",
        "dailyRevenue": "দৈনিক আয় / আউটলেট",
        "hourlyLabor": "ঘণ্টাপ্রতি শ্রম ব্যয়",
        "outletCount": "আউটলেট সংখ্যা"
      },
      "segments": {
        "qsr": "QSR / ফাস্ট ফুড",
        "fast_casual": "ফাস্ট-ক্যাজুয়াল",
        "casual": "ক্যাজুয়াল ডাইনিং",
        "fine_dining": "ফাইন ডাইনিং",
        "hotel_fb": "হোটেল F&B",
        "cloud": "ক্লাউড কিচেন",
        "cafe_bakery": "ক্যাফে / বেকারি"
      },
      "breakdown": {
        "title": "ডেপার্ট বিশ্লেষণ",
        "subtitle": "প্রতি উইন্ডোতে দৈনিক আয়ের অংশ এবং বর্তমান FTE স্টাফিং। সমস্ত ডেপার্ট জুড়ে আয়ের % এর যোগফল ~100 হওয়া উচিত।"
      },
      "dayparts": {
        "morning": "সকাল",
        "lunch": "দুপুরের খাবার",
        "afternoon": "বিকেল",
        "dinner": "রাতের খাবার",
        "lateNight": "গভীর রাত"
      },
      "placeholders": {
        "revPct": "আয় %",
        "fte": "FTE"
      },
      "results": {
        "recoverableTitle": "পুনরুদ্ধারযোগ্য বার্ষিক শ্রম ব্যয় · পরিসর",
        "to": "থেকে",
        "multiOutlet": "{outlets}টি আউটলেট জুড়ে · মধ্যবিন্দু ≈ প্রতি আউটলেট {mid}/বছর · {days} পরিচালন দিন জুড়ে",
        "singleOutlet": "প্রতি আউটলেট · {days} পরিচালন দিন/বছর · রক্ষণশীল পুনরুদ্ধার গুণক প্রয়োগ করা হয়েছে",
        "assumes": "ধরে নেওয়া হয় যে শনাক্তকৃত অতিরিক্ত ব্যয়ের {low}-{high}% প্রথম ত্রৈমাসিকে বাস্তবসম্মতভাবে পুনরুদ্ধারযোগ্য - বাকিটা পরিষেবা-ভিত্তিক স্টাফিং যা কভারেজ না ভেঙে আপনি কমাতে পারবেন না।"
      },
      "heatmap": {
        "title": "ডেপার্ট লিক হিটম্যাপ",
        "perDay": "{amt}/দিন পুনরুদ্ধারযোগ্য"
      },
      "recommend": {
        "label": "Sundae প্রথমে কী তদন্ত করবে",
        "body": "{daypart} {segment} সেগমেন্টের {pct}% লক্ষ্যের সাথে সবচেয়ে বড় ব্যবধান দেখায়। ~{fteHours} FTE-ঘণ্টা ছাঁটাই করলে প্রতি আউটলেটে আনুমানিক {range}/সপ্তাহ পুনরুদ্ধার হবে - কভারেজ-ভিত্তি পর্যালোচনার সাপেক্ষে।",
        "note": "প্রোডাকশনে, Sundae Pulse লক্ষ্যটিকে আপনার ঐতিহাসিক উৎপাদনশীলতা বক্ররেখার বিপরীতে ক্যালিব্রেট করে (একটি নির্দিষ্ট সেগমেন্ট ব্যান্ড নয়), প্রতি-আউটলেট কভারেজ ভিত্তিকে সম্মান করে, এবং বেতন লক হওয়ার আগে প্রার্থী শিফটটি সামনে আনে।"
      },
      "cta": "আপনার ডেটায় এটি লাইভ দেখুন",
      "footnoteLabel": "পদ্ধতি (রক্ষণশীল ডিফল্ট):",
      "footnote": "ডেপার্ট শ্রম ব্যয় = FTE × সময়কাল × ঘণ্টাপ্রতি মজুরি। লক্ষ্য = ডেপার্ট আয়ের সেগমেন্ট-নির্দিষ্ট শ্রম % (QSR 25% → ফাইন ডাইনিং 36%)। শনাক্তকৃত অতিরিক্ত ব্যয় = বর্তমান − লক্ষ্য। শনাক্তকৃত অতিরিক্ত ব্যয়ের কেবল {low}-{high}% বাস্তবসম্মতভাবে পুনরুদ্ধারযোগ্য হিসেবে গণনা করা হয় - বাকিটা পরিষেবা-ভিত্তিক স্টাফিং বা অনিবার্য কভারেজ। {days} পরিচালন দিন/বছর ধরে বার্ষিকীকৃত। ফলাফল একটি পরিসর, কখনও কোনো একক আশাবাদী সংখ্যা নয়। Sundae Pulse প্রতি-আউটলেট আপনার ঐতিহাসিক উৎপাদনশীলতা বক্ররেখার বিপরীতে ক্যালিব্রেট করে এবং প্রতি-শিফট কভারেজ ভিত্তিকে সম্মান করে - পণ্যের মধ্যে সংস্করণটি এই অনুমানকের চেয়ে ধারাবাহিকভাবে আরও তীক্ষ্ণ এবং রক্ষণশীল।"
    },
    "ro": {
      "back": "Înapoi la Instrumente",
      "hero": {
        "badge": "INSIGHT-GRADE · INTELIGENȚĂ DE PERSONAL",
        "title": "Estimator al scurgerii de marjă pe interval orar",
        "description": "Găsiți intervalul orar care pierde marjă din cauza supraîncadrării cu personal. Majoritatea calculatoarelor de cost al muncii vă oferă un singur % agregat. Acesta împarte ziua în cinci ferestre și scoate la iveală cel mai grav interval - cu o acțiune corectivă specifică și un impact anualizat."
      },
      "baseline": {
        "title": "Referința locației",
        "subtitle": "Per locație, media operațională curentă."
      },
      "fields": {
        "segment": "Segment",
        "currency": "Monedă",
        "targetSuffix": "Țintă {pct}%",
        "dailyRevenue": "Venit zilnic / locație",
        "hourlyLabor": "Cost orar al muncii",
        "outletCount": "Număr de locații"
      },
      "segments": {
        "qsr": "QSR / Fast food",
        "fast_casual": "Fast-casual",
        "casual": "Restaurant casual",
        "fine_dining": "Fine dining",
        "hotel_fb": "F&B hotelier",
        "cloud": "Bucătărie cloud",
        "cafe_bakery": "Cafenea / Brutărie"
      },
      "breakdown": {
        "title": "Defalcare pe interval orar",
        "subtitle": "Ponderea în venitul zilnic și încadrarea FTE curentă pe fereastră. Suma % venitului pe toate intervalele ar trebui să fie ~100."
      },
      "dayparts": {
        "morning": "Dimineață",
        "lunch": "Prânz",
        "afternoon": "După-amiază",
        "dinner": "Cină",
        "lateNight": "Noaptea târziu"
      },
      "placeholders": {
        "revPct": "% venit",
        "fte": "FTE"
      },
      "results": {
        "recoverableTitle": "Cost anual al muncii recuperabil · interval",
        "to": "până la",
        "multiOutlet": "în {outlets} locații · punct median ≈ {mid}/an per locație · pe parcursul a {days} zile operaționale",
        "singleOutlet": "per locație · {days} zile operaționale/an · factor de recuperare prudent aplicat",
        "assumes": "Presupune că {low}-{high}% din supracheltuiala identificată este realist recuperabilă în primul trimestru - restul este personalul de bază pentru serviciu pe care nu îl puteți reduce fără a strica acoperirea."
      },
      "heatmap": {
        "title": "Hartă termică a scurgerilor pe interval orar",
        "perDay": "{amt}/zi recuperabil"
      },
      "recommend": {
        "label": "Ce ar investiga Sundae mai întâi",
        "body": "{daypart} prezintă cel mai mare decalaj față de ținta de {pct}% a segmentului {segment}. O reducere de ~{fteHours} ore-FTE ar recupera estimativ {range}/săpt per locație - în așteptarea unei revizuiri a personalului de bază.",
        "note": "În producție, Sundae Pulse calibrează ținta în funcție de curbele dvs. istorice de productivitate (nu o bandă fixă de segment), respectă nivelurile de bază de acoperire per locație și scoate în evidență tura candidată înainte de blocarea statelor de plată."
      },
      "cta": "Vedeți live pe datele dvs.",
      "footnoteLabel": "Metodologie (valori implicite prudente):",
      "footnote": "Cost al muncii pe interval orar = FTE × durată × salariu orar. Țintă = % al muncii specific segmentului din venitul intervalului (QSR 25% → fine dining 36%). Supracheltuială identificată = curent − țintă. Doar {low}-{high}% din supracheltuiala identificată este socotită ca realist recuperabilă - restul este personal de bază pentru serviciu sau acoperire inevitabilă. Anualizat pe {days} zile operaționale/an. Rezultatul este un interval, niciodată o singură cifră optimistă. Sundae Pulse calibrează în funcție de curbele dvs. istorice de productivitate per locație și respectă nivelurile de bază de acoperire per tură - versiunea din produs este în mod constant mai precisă și mai prudentă decât acest estimator."
    },
    "ms": {
      "back": "Kembali ke Alat",
      "hero": {
        "badge": "INSIGHT-GRADE · KEPINTARAN TENAGA KERJA",
        "title": "Penganggar kebocoran margin mengikut waktu hari",
        "description": "Cari waktu hari yang menghakis margin akibat lebihan kakitangan. Kebanyakan kalkulator kos buruh hanya memberikan anda satu % agregat. Alat ini membahagikan hari kepada lima tetingkap dan mendedahkan yang paling teruk - lengkap dengan tindakan pembetulan khusus dan kesan tahunan."
      },
      "baseline": {
        "title": "Garis dasar cawangan",
        "subtitle": "Setiap cawangan, purata operasi semasa."
      },
      "fields": {
        "segment": "Segmen",
        "currency": "Mata wang",
        "targetSuffix": "Sasaran {pct}%",
        "dailyRevenue": "Hasil harian / cawangan",
        "hourlyLabor": "Kos buruh sejam",
        "outletCount": "Bilangan cawangan"
      },
      "segments": {
        "qsr": "QSR / Makanan segera",
        "fast_casual": "Fast-casual",
        "casual": "Makan santai",
        "fine_dining": "Makan mewah",
        "hotel_fb": "F&B hotel",
        "cloud": "Dapur awan",
        "cafe_bakery": "Kafe / Bakeri"
      },
      "breakdown": {
        "title": "Pecahan mengikut waktu hari",
        "subtitle": "Bahagian hasil harian dan penempatan FTE semasa setiap tetingkap. Jumlah % hasil merentas semua waktu hari sepatutnya ~100."
      },
      "dayparts": {
        "morning": "Pagi",
        "lunch": "Makan tengah hari",
        "afternoon": "Petang",
        "dinner": "Makan malam",
        "lateNight": "Lewat malam"
      },
      "placeholders": {
        "revPct": "% Hasil",
        "fte": "FTE"
      },
      "results": {
        "recoverableTitle": "Kos buruh tahunan yang boleh dipulihkan · julat",
        "to": "hingga",
        "multiOutlet": "merentas {outlets} cawangan · titik tengah ≈ {mid}/thn setiap cawangan · sepanjang {days} hari operasi",
        "singleOutlet": "setiap cawangan · {days} hari operasi/thn · faktor pemulihan konservatif digunakan",
        "assumes": "Mengandaikan {low}-{high}% daripada perbelanjaan berlebihan yang dikenal pasti boleh dipulihkan secara realistik dalam suku pertama - selebihnya ialah penempatan kakitangan asas perkhidmatan yang tidak boleh anda pangkas tanpa memecahkan liputan."
      },
      "heatmap": {
        "title": "Peta haba kebocoran mengikut waktu hari",
        "perDay": "{amt}/hari boleh dipulihkan"
      },
      "recommend": {
        "label": "Apa yang akan disiasat oleh Sundae dahulu",
        "body": "{daypart} menunjukkan jurang terbesar berbanding sasaran {pct}% segmen {segment}. Pemangkasan sekitar ~{fteHours} jam-FTE akan memulihkan anggaran {range}/mgu setiap cawangan - tertakluk kepada semakan asas liputan.",
        "note": "Dalam pengeluaran, Sundae Pulse mengkalibrasi sasaran terhadap lengkung produktiviti sejarah anda (bukan jalur segmen tetap), menghormati asas liputan setiap cawangan, dan mendedahkan syif calon sebelum gaji dikunci."
      },
      "cta": "Lihat secara langsung pada data anda",
      "footnoteLabel": "Metodologi (lalai konservatif):",
      "footnote": "Kos buruh mengikut waktu hari = FTE × tempoh × upah sejam. Sasaran = % buruh khusus segmen daripada hasil waktu hari (QSR 25% → makan mewah 36%). Perbelanjaan berlebihan yang dikenal pasti = semasa − sasaran. Hanya {low}-{high}% daripada perbelanjaan berlebihan yang dikenal pasti dikira sebagai boleh dipulihkan secara realistik - selebihnya ialah penempatan kakitangan asas perkhidmatan atau liputan yang tidak dapat dielakkan. Ditahunkan sepanjang {days} hari operasi/thn. Output ialah julat, bukan satu angka optimistik tunggal. Sundae Pulse mengkalibrasi terhadap lengkung produktiviti sejarah anda setiap cawangan dan menghormati asas liputan setiap syif - versi dalam produk secara konsisten lebih tajam dan lebih konservatif daripada penganggar ini."
    },
    "sv": {
      "back": "Tillbaka till Verktyg",
      "hero": {
        "badge": "INSIGHT-GRADE · PERSONALINTELLIGENS",
        "title": "Marginalläckage-uppskattare per dagdel",
        "description": "Hitta den dagdel där marginalen blöder på grund av överbemanning. De flesta personalkostnadskalkylatorer ger dig en enda aggregerad %. Den här delar upp dagen i fem fönster och lyfter fram den värsta boven - med en specifik korrigerande åtgärd och årsuppräknad påverkan."
      },
      "baseline": {
        "title": "Enhetens baslinje",
        "subtitle": "Per enhet, nuvarande driftsgenomsnitt."
      },
      "fields": {
        "segment": "Segment",
        "currency": "Valuta",
        "targetSuffix": "Mål {pct}%",
        "dailyRevenue": "Daglig intäkt / enhet",
        "hourlyLabor": "Timkostnad för personal",
        "outletCount": "Antal enheter"
      },
      "segments": {
        "qsr": "QSR / Snabbmat",
        "fast_casual": "Fast-casual",
        "casual": "Avslappnad restaurang",
        "fine_dining": "Fine dining",
        "hotel_fb": "Hotell-F&B",
        "cloud": "Molnkök",
        "cafe_bakery": "Café / Bageri"
      },
      "breakdown": {
        "title": "Uppdelning per dagdel",
        "subtitle": "Andel av daglig intäkt och nuvarande FTE-bemanning per fönster. Intäkts-% över alla dagdelar bör summera till ~100."
      },
      "dayparts": {
        "morning": "Morgon",
        "lunch": "Lunch",
        "afternoon": "Eftermiddag",
        "dinner": "Middag",
        "lateNight": "Sen kväll"
      },
      "placeholders": {
        "revPct": "Intäkt %",
        "fte": "FTE"
      },
      "results": {
        "recoverableTitle": "Återvinningsbar årlig personalkostnad · intervall",
        "to": "till",
        "multiOutlet": "över {outlets} enheter · mittpunkt ≈ {mid}/år per enhet · över {days} driftdagar",
        "singleOutlet": "per enhet · {days} driftdagar/år · försiktig återvinningsfaktor tillämpad",
        "assumes": "Antar att {low}-{high}% av den identifierade överutgiften realistiskt går att återvinna under första kvartalet - resten är servicegrundbemanning som du inte kan skära ned utan att bryta täckningen."
      },
      "heatmap": {
        "title": "Värmekarta över läckage per dagdel",
        "perDay": "{amt}/dag återvinningsbart"
      },
      "recommend": {
        "label": "Vad Sundae skulle undersöka först",
        "body": "{daypart} visar det största gapet till {pct}%-målet för segmentet {segment}. En neddragning på ~{fteHours} FTE-timmar skulle återvinna uppskattningsvis {range}/v per enhet - i väntan på en granskning av grundbemanningen.",
        "note": "I produktion kalibrerar Sundae Pulse målet mot dina historiska produktivitetskurvor (inte ett fast segmentband), respekterar grundbemanningen per enhet och lyfter fram kandidatpasset innan lönen låses."
      },
      "cta": "Se det live på dina data",
      "footnoteLabel": "Metodik (försiktiga standardvärden):",
      "footnote": "Personalkostnad per dagdel = FTE × varaktighet × timlön. Mål = segmentspecifik personal-% av dagdelens intäkt (QSR 25% → fine dining 36%). Identifierad överutgift = nuvarande − mål. Endast {low}-{high}% av den identifierade överutgiften räknas som realistiskt återvinningsbar - resten är servicegrundbemanning eller oundviklig täckning. Årsuppräknat över {days} driftdagar/år. Resultatet är ett intervall, aldrig en enda optimistisk siffra. Sundae Pulse kalibrerar mot dina historiska produktivitetskurvor per enhet och respekterar grundbemanningen per pass - versionen i produkten är genomgående skarpare och mer försiktig än denna uppskattare."
    }
  }
};
