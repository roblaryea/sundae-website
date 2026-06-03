import type { WebsiteLocale } from "../i18n";
import { asiaDiagnosticOptionPacks } from "./optionPacksAsia";
import { europeDiagnosticOptionPacks } from "./optionPacksEurope";
import { indicDiagnosticOptionPacks } from "./optionPacksIndic";
import { QUESTIONS } from "./questions";

type DimensionId = "profile" | "crew" | "core" | "foresight" | "tech";

export type DiagnosticQuestionCopy = {
  prompt: string;
  helper?: string;
  placeholder?: string;
  options?: Record<string, string>;
};

export type DiagnosticCatalogCopy = {
  dimensions: Record<DimensionId, string>;
  navigation: {
    back: string;
    next: string;
    continue: string;
    finalStep: string;
    generate: string;
    optional: string;
  };
  capture: {
    title: string;
    helper: string;
    requiredNote: string;
    fields: {
      name: string;
      role: string;
      email: string;
      phone: string;
      country: string;
      company: string;
    };
    placeholders: {
      name: string;
      role: string;
      email: string;
      phone: string;
      country: string;
      company: string;
    };
  };
  roles: Record<string, string>;
  countries: Record<string, string>;
  questions: Record<string, DiagnosticQuestionCopy>;
};

const roleValues = [
  "CEO / Founder / Owner",
  "COO / Operations Director",
  "CFO / Finance Director",
  "Regional / Area Manager",
  "Franchise Owner",
  "Head of People / HR",
  "Head of Marketing",
  "Head of Technology / Data",
  "General Manager",
  "Consultant / Advisor",
  "Other",
] as const;

const countryValues = [
  "United Arab Emirates",
  "Saudi Arabia",
  "Qatar",
  "Kuwait",
  "Bahrain",
  "Oman",
  "Egypt",
  "United States",
  "Canada",
  "United Kingdom",
  "Netherlands",
  "Germany",
  "France",
  "Spain",
  "Italy",
  "Singapore",
  "Japan",
  "Australia",
  "India",
  "Mexico",
  "Brazil",
  "South Africa",
  "Other",
] as const;

const englishQuestions = Object.fromEntries(
  QUESTIONS.map((question) => [
    question.id,
    {
      prompt: question.prompt,
      helper: question.helper,
      placeholder: question.placeholder,
      options: question.options
        ? Object.fromEntries(question.options.map((option) => [option.value, option.label]))
        : undefined,
    },
  ]),
) as Record<string, DiagnosticQuestionCopy>;

const en: DiagnosticCatalogCopy = {
  dimensions: {
    profile: "Operation profile",
    crew: "Workforce",
    core: "Decision intelligence",
    foresight: "Foresight",
    tech: "Tech stack",
  },
  navigation: {
    back: "Back",
    next: "Next",
    continue: "Continue",
    finalStep: "Final step · Almost done",
    generate: "Generate my diagnostic",
    optional: "Optional",
  },
  capture: {
    title: "Where should we send your diagnostic?",
    helper:
      "Your personalized Sundae Operations Diagnostic is ready. We'll show it on the next screen and email a copy you can share with your team.",
    requiredNote:
      "Fields marked * are required. Your information is captured once here and reused across the diagnostic CTAs — no second forms to fill.",
    fields: {
      name: "Full name *",
      role: "Role / Title *",
      email: "Work email *",
      phone: "Phone (with country code) *",
      country: "Country *",
      company: "Company *",
    },
    placeholders: {
      name: "Full name",
      role: "Select your role...",
      email: "you@company.com",
      phone: "+971 50 123 4567",
      country: "Select country...",
      company: "Restaurant group / brand",
    },
  },
  roles: {
    "CEO / Founder / Owner": "CEO / Founder / Owner",
    "COO / Operations Director": "COO / Operations Director",
    "CFO / Finance Director": "CFO / Finance Director",
    "Regional / Area Manager": "Regional / Area Manager",
    "Franchise Owner": "Franchise Owner",
    "Head of People / HR": "Head of People / HR",
    "Head of Marketing": "Head of Marketing",
    "Head of Technology / Data": "Head of Technology / Data",
    "General Manager": "General Manager",
    "Consultant / Advisor": "Consultant / Advisor",
    Other: "Other",
  },
  countries: Object.fromEntries(countryValues.map((country) => [country, country])),
  questions: englishQuestions,
};

type LocaleOverrides = {
  dimensions: DiagnosticCatalogCopy["dimensions"];
  navigation: DiagnosticCatalogCopy["navigation"];
  capture: DiagnosticCatalogCopy["capture"];
  roles: Record<(typeof roleValues)[number], string>;
  countries: Record<(typeof countryValues)[number], string>;
  questionText: Record<string, Omit<DiagnosticQuestionCopy, "options">>;
  optionLabels?: Record<string, Record<string, string>>;
};

function defineLocale(overrides: LocaleOverrides): DiagnosticCatalogCopy {
  return {
    dimensions: overrides.dimensions,
    navigation: overrides.navigation,
    capture: overrides.capture,
    roles: overrides.roles,
    countries: overrides.countries,
    questions: Object.fromEntries(
      QUESTIONS.map((question) => {
        const baseOptions = question.options
          ? Object.fromEntries(question.options.map((option) => [option.value, option.label]))
          : undefined;
        const optionOverrides = overrides.optionLabels?.[question.id];

        return [
          question.id,
          {
            ...overrides.questionText[question.id],
            options: baseOptions ? { ...baseOptions, ...optionOverrides } : undefined,
          },
        ];
      }),
    ),
  };
}

const optionLabels = {
  ar: {
    common: {
      other: "أخرى",
      none: "لا شيء",
      unsure: "غير متأكد",
    },
    segment: {
      qsr: "مطاعم خدمة سريعة / وجبات سريعة",
      fast_casual: "مطاعم فاست كاجوال",
      casual: "مطاعم كاجوال",
      fine_dining: "مطاعم فاخرة",
      cloud: "مطبخ سحابي / مطبخ مظلم",
      hotel_fb: "مأكولات ومشروبات الفنادق",
      cafe_bakery: "مقهى / مخبز",
      bar_nightlife: "بار / حياة ليلية",
      catering: "تموين / فعاليات",
      ghost_brand: "علامة افتراضية",
      franchise: "امتياز / صاحب امتياز رئيسي",
    },
    outlets: {
      "1": "فرع واحد",
      "2_5": "2-5 فروع",
      "6_15": "6-15 فرعا",
      "16_50": "16-50 فرعا",
      "51_150": "51-150 فرعا",
      "150_plus": "أكثر من 150 فرعا",
    },
    avg_unit_volume: {
      under_500k: "أقل من 500 ألف دولار",
      "500k_1m": "500 ألف-1 مليون دولار",
      "1m_2m": "1-2 مليون دولار",
      "2m_4m": "2-4 ملايين دولار",
      "4m_7m": "4-7 ملايين دولار",
      "7m_plus": "أكثر من 7 ملايين دولار",
    },
    labor_pain: {
      overstaffing: "زيادة العمالة في الفترات الهادئة",
      no_show: "الغياب المفاجئ",
      ot_leakage: "تسرب العمل الإضافي",
      buddy_punching: "تسجيل حضور نيابة عن زميل / سرقة الوقت",
      payroll_errors: "أخطاء الرواتب",
      compliance: "الامتثال / القواعد النظامية",
      turnover: "الدوران الوظيفي / إعادة التدريب",
      none: "ليس أولوية اليوم",
    },
    kpis_measured: {
      labor_pct: "نسبة تكلفة العمالة",
      food_cost: "نسبة تكلفة الطعام",
      void_comp: "الإلغاءات / المجاملات",
      avg_check: "متوسط الفاتورة",
      upsell: "معدل البيع الإضافي",
      guest_retention: "احتفاظ الضيوف",
      ebitda: "EBITDA لكل فرع",
      forecast_acc: "دقة التوقعات",
      compset: "الموقع التنافسي",
    },
    ops_tools: {
      scheduling: "جدولة القوى العاملة",
      payroll: "مزود الرواتب",
      purchasing: "المشتريات / المخزون",
      delivery: "إدارة مجمعي التوصيل",
      reservations: "الحجوزات / إدارة الطاولات",
      crm: "CRM الضيوف / الولاء",
      bi: "أداة BI (Power BI / Tableau / Looker)",
    },
  },
  fr: {
    common: { other: "Autre", none: "Aucun", unsure: "Je ne sais pas" },
    segment: {
      qsr: "QSR / Restauration rapide",
      fast_casual: "Fast casual",
      casual: "Restauration décontractée",
      fine_dining: "Gastronomie",
      cloud: "Cloud kitchen / Dark kitchen",
      hotel_fb: "Restauration hôtelière",
      cafe_bakery: "Café / Boulangerie",
      bar_nightlife: "Bar / Vie nocturne",
      catering: "Traiteur / Événements",
      ghost_brand: "Marque virtuelle",
      franchise: "Franchise / Master franchisé",
    },
    outlets: {
      "1": "1 point de vente",
      "2_5": "2-5 points de vente",
      "6_15": "6-15 points de vente",
      "16_50": "16-50 points de vente",
      "51_150": "51-150 points de vente",
      "150_plus": "150+ points de vente",
    },
    avg_unit_volume: {
      under_500k: "Moins de 500 k$",
      "500k_1m": "500 k$-1 M$",
      "1m_2m": "1-2 M$",
      "2m_4m": "2-4 M$",
      "4m_7m": "4-7 M$",
      "7m_plus": "7 M$+",
    },
    labor_pain: {
      overstaffing: "Sureffectif sur les périodes calmes",
      no_show: "Absences / Désistements",
      ot_leakage: "Fuite d'heures supplémentaires",
      buddy_punching: "Pointage pour autrui / Vol de temps",
      payroll_errors: "Erreurs de paie",
      compliance: "Conformité / Règles légales",
      turnover: "Turnover / Reformation",
      none: "Pas une priorité aujourd'hui",
    },
    kpis_measured: {
      labor_pct: "% coût de main-d'oeuvre",
      food_cost: "% coût matière",
      void_comp: "Annulations / Offerts",
      avg_check: "Ticket moyen",
      upsell: "Upsell / Taux d'attache",
      guest_retention: "Rétention client",
      ebitda: "EBITDA par point de vente",
      forecast_acc: "Précision des prévisions",
      compset: "Position concurrentielle",
    },
    ops_tools: {
      scheduling: "Planification du personnel",
      payroll: "Prestataire de paie",
      purchasing: "Achats / Inventaire",
      delivery: "Gestion des agrégateurs de livraison",
      reservations: "Réservations / Gestion des tables",
      crm: "CRM client / Fidélité",
      bi: "Outil BI (Power BI / Tableau / Looker)",
    },
  },
} as const;

const sharedOptionLabelOverrides: Partial<Record<WebsiteLocale, Record<string, Record<string, string>>>> = {
  ar: {
    segment: optionLabels.ar.segment,
    outlets: optionLabels.ar.outlets,
    avg_unit_volume: optionLabels.ar.avg_unit_volume,
    region: {
      us: "الولايات المتحدة",
      canada: "كندا",
      uk: "المملكة المتحدة",
      ireland: "أيرلندا",
      europe_west: "أوروبا الغربية",
      europe_nord: "أوروبا الشمالية",
      europe_east: "أوروبا الشرقية",
      uae: "الإمارات العربية المتحدة",
      ksa: "المملكة العربية السعودية",
      qatar: "قطر",
      kuwait: "الكويت",
      bahrain: "البحرين",
      oman: "عُمان",
      egypt: "مصر",
      africa: "أفريقيا (أخرى)",
      sea: "جنوب شرق آسيا",
      india: "الهند",
      japan: "اليابان",
      korea: "كوريا",
      china_hk: "الصين / هونغ كونغ",
      anzac: "أستراليا / نيوزيلندا",
      mexico: "المكسيك",
      brazil: "البرازيل",
      latam_other: "أمريكا اللاتينية (أخرى)",
    },
    labor_pain: optionLabels.ar.labor_pain,
    kpis_measured: optionLabels.ar.kpis_measured,
    kpis_wished: {
      real_time_margin: "الهامش الفوري لكل وردية",
      daypart_leak: "تسرب العمالة حسب الفترة اليومية",
      labor_productivity: "إنتاجية العمالة الفورية (المبيعات لكل ساعة عمل)",
      live_labor_vs_demand: "العمالة مقابل الطلب لحظياً",
      overtime_leakage: "مخاطر وتسرب العمل الإضافي لحظياً",
      daypart_revpash: "RevPASH حسب الفترة اليومية",
      hourly_food_cost: "تباين تكلفة الطعام بالساعة",
      theoretical_actual: "تباين COGS النظري مقابل الفعلي",
      item_profitability: "ربحية كل صنف فعلياً",
      menu_engineering: "مصفوفة هندسة القائمة (Stars / Plowhorses / Puzzles / Dogs)",
      server_upsell: "معدل البيع الإضافي لكل موظف خدمة",
      cannibalization: "التآكل بين الأيام / القنوات",
      promo_roi: "عائد العروض الترويجية حسب القناة",
      delivery_margin: "هامش قناة التوصيل (أثر عمولات الطرف الثالث)",
      guest_ltv: "القيمة العمرية للضيف",
      cohort_retention: "منحنيات الاحتفاظ حسب الشريحة",
      noshow_prediction: "توقع عدم حضور الحجوزات",
      inventory_shrinkage: "انكماش المخزون حسب فئة الصنف",
      cash_variance: "تباين النقد والإيراد (كشف التسرب)",
      peer_benchmark: "مقارنة معيارية مجهولة مع نظراء",
      competitor_pricing: "تتبع أسعار المنافسين",
      forecast_per_outlet: "توقع يومي لكل فرع",
      scheduling_eff: "كفاءة الجدولة مقابل الطلب",
      decision_replay: "تقييم مغلق من القرار إلى النتيجة",
      cross_module: "رؤى ارتباط بين الوحدات",
      multi_brand_pnl: "P&L موحد متعدد العلامات",
      compliance_drift: "انحراف الامتثال / معايير العلامة",
      payroll_readiness: "جاهزية الرواتب لحظياً",
      speed_of_service: "سرعة الخدمة / أزمنة التذاكر حسب المحطة",
      food_waste: "تتبع هدر الطعام والتلف",
      gratuity_distribution: "توزيع البقشيش والامتثال",
      guest_sentiment: "مشاعر الضيوف / اتجاهات المراجعات",
    },
    ops_tools: optionLabels.ar.ops_tools,
    scheduling_tool: {
      manual: "يدوي / جداول بيانات",
      internal: "أداة داخلية / مخصصة",
      pos_built_in: "مدمج في POS",
      none: "لا يوجد نظام واضح",
      other: optionLabels.ar.common.other,
    },
    payroll_regions: {
      us: "الولايات المتحدة",
      canada: "كندا",
      uk: "المملكة المتحدة",
      eu: "الاتحاد الأوروبي",
      uae: "الإمارات",
      ksa: "السعودية",
      qatar: "قطر / البحرين / عُمان",
      other: "أخرى (اكتب أدناه)",
    },
    decision_data: {
      gut: "الحدس / الخبرة",
      spreadsheet: "جدول بيانات أعده محلل",
      pos_report: "تقرير POS قياسي",
      bi_dashboard: "لوحة BI (Power BI / Tableau / Looker / Domo)",
      in_house_data: "مستودع بيانات داخلي / استعلامات SQL",
      external: "استشاري / مستشار خارجي",
      ai_tool: "أداة AI (ChatGPT / Claude / Gemini)",
      industry_report: "تقرير قطاع / دراسة معيارية",
      board_packet: "ملف مجلس الإدارة / القيادة",
    },
    forecasting: {
      lyear_gut: "العام الماضي + التقدير الشخصي",
      spreadsheet: "نموذج جداول بيانات داخلي",
      pos_system: "مدمج في POS / نظام المحاسبة",
      bi_tool: "أداة BI بنموذج مخصص",
      ai_tool: "أداة AI / توقعات مخصصة",
      none: "لا نتنبأ رسميا",
    },
    scenario_wish: {
      new_location: "افتتاح موقع جديد",
      menu_change: "أثر تغيير القائمة / الأسعار",
      promo_impact: "أثر العرض / الخصم",
      staffing_model: "تغيير نموذج العمالة",
      season_event: "أثر الموسم / الفعالية",
      competitor: "دخول / خروج منافس",
      macro: "التضخم / قانون الأجور / تغيير ضريبي",
    },
    pos: { other: optionLabels.ar.common.other },
    timeline: {
      asap: "الآن - نقيم الخيارات بجدية",
      next_quarter: "الربع القادم",
      next_6_months: "خلال 6 أشهر",
      this_year: "قبل نهاية العام",
      exploring: "استكشاف فقط · بلا موعد محدد",
    },
    decision_lag: {
      minutes: "دقائق - نتحرك أثناء الوردية",
      hours: "ساعات - في اليوم نفسه",
      days: "أيام - دورة مراجعة أسبوعية",
      weeks: "أسابيع - دورة إغلاق شهرية",
      months: "أشهر - مراجعة ربع سنوية فقط",
    },
    budget_band: {
      under_10k: "أقل من 10 آلاف دولار",
      "10_25k": "10-25 ألف دولار",
      "25_50k": "25-50 ألف دولار",
      "50_100k": "50-100 ألف دولار",
      "100_250k": "100-250 ألف دولار",
      "250_500k": "250-500 ألف دولار",
      "500k_1m": "500 ألف-1 مليون دولار",
      "1m_plus": "أكثر من 1 مليون دولار",
      unsure: optionLabels.ar.common.unsure,
    },
    tech_headcount: {
      none: "لا أحد - لا يوجد شخص مخصص",
      fractional: "جزئي / مشترك مع وظائف أخرى",
      one: "شخص واحد",
      two_three: "2-3 أشخاص",
      four_eight: "4-8 أشخاص",
      nine_twenty: "9-20 شخصاً",
      twenty_plus: "أكثر من 20 شخصاً",
    },
  },
  fr: {
    segment: optionLabels.fr.segment,
    outlets: optionLabels.fr.outlets,
    avg_unit_volume: optionLabels.fr.avg_unit_volume,
    region: {
      us: "États-Unis",
      canada: "Canada",
      uk: "Royaume-Uni",
      ireland: "Irlande",
      europe_west: "Europe occidentale",
      europe_nord: "Europe du Nord",
      europe_east: "Europe de l'Est",
      uae: "Émirats arabes unis",
      ksa: "Arabie saoudite",
      qatar: "Qatar",
      kuwait: "Koweït",
      bahrain: "Bahreïn",
      oman: "Oman",
      egypt: "Égypte",
      africa: "Afrique (autre)",
      sea: "Asie du Sud-Est",
      india: "Inde",
      japan: "Japon",
      korea: "Corée",
      china_hk: "Chine / Hong Kong",
      anzac: "Australie / Nouvelle-Zélande",
      mexico: "Mexique",
      brazil: "Brésil",
      latam_other: "Amérique latine (autre)",
    },
    labor_pain: optionLabels.fr.labor_pain,
    kpis_measured: optionLabels.fr.kpis_measured,
    kpis_wished: {
      real_time_margin: "Marge en temps réel par service",
      daypart_leak: "Fuite de main-d'œuvre par tranche horaire",
      labor_productivity: "Productivité main-d'œuvre en temps réel (ventes par heure travaillée)",
      live_labor_vs_demand: "Main-d'œuvre vs demande en direct",
      overtime_leakage: "Risque et fuite d'heures supplémentaires en direct",
      daypart_revpash: "RevPASH par tranche horaire",
      hourly_food_cost: "Écart de coût matière par heure",
      theoretical_actual: "Écart COGS théorique vs réel",
      item_profitability: "Rentabilité réelle par article",
      menu_engineering: "Matrice d'ingénierie menu (Stars / Plowhorses / Puzzles / Dogs)",
      server_upsell: "Taux d'upsell par serveur",
      cannibalization: "Cannibalisation entre jours / canaux",
      promo_roi: "ROI promotionnel par canal",
      delivery_margin: "Marge par canal livraison (impact commission tiers)",
      guest_ltv: "Valeur vie client",
      cohort_retention: "Courbes de rétention par cohorte",
      noshow_prediction: "Prédiction des no-shows de réservation",
      inventory_shrinkage: "Démarque inventaire par catégorie",
      cash_variance: "Écart caisse et assurance revenu (détection de fuite)",
      peer_benchmark: "Benchmark anonyme de pairs",
      competitor_pricing: "Suivi des prix concurrents",
      forecast_per_outlet: "Prévision quotidienne par point de vente",
      scheduling_eff: "Efficacité planning vs demande",
      decision_replay: "Scoring en boucle fermée décision-résultat",
      cross_module: "Insights de corrélation entre modules",
      multi_brand_pnl: "P&L consolidé multi-marques",
      compliance_drift: "Dérive conformité / standard de marque",
      payroll_readiness: "Préparation paie en temps réel",
      speed_of_service: "Vitesse de service / temps ticket par poste",
      food_waste: "Suivi gaspillage et pertes alimentaires",
      gratuity_distribution: "Répartition des pourboires et conformité",
      guest_sentiment: "Sentiment client / tendance des avis",
    },
    ops_tools: optionLabels.fr.ops_tools,
    scheduling_tool: {
      manual: "Manuel / Tableurs",
      internal: "Outil interne / sur mesure",
      pos_built_in: "Intégré au POS",
      none: "Rien de systématique",
      other: optionLabels.fr.common.other,
    },
    payroll_regions: {
      us: "États-Unis",
      canada: "Canada",
      uk: "Royaume-Uni",
      eu: "Union européenne",
      uae: "EAU",
      ksa: "Arabie saoudite",
      qatar: "Qatar / Bahreïn / Oman",
      other: "Autre (écrire ci-dessous)",
    },
    decision_data: {
      gut: "Intuition / Expérience",
      spreadsheet: "Tableur préparé par un analyste",
      pos_report: "Rapport POS standard",
      bi_dashboard: "Tableau de bord BI (Power BI / Tableau / Looker / Domo)",
      in_house_data: "Entrepôt de données interne / Requêtes SQL",
      external: "Consultant / Conseiller externe",
      ai_tool: "Outil AI (ChatGPT / Claude / Gemini)",
      industry_report: "Rapport sectoriel / Étude benchmark",
      board_packet: "Dossier comité / direction",
    },
    forecasting: {
      lyear_gut: "Année précédente + intuition",
      spreadsheet: "Modèle tableur maintenu en interne",
      pos_system: "Intégré au POS / système comptable",
      bi_tool: "Outil BI avec modèle personnalisé",
      ai_tool: "Outil AI / prévision dédié",
      none: "Nous ne prévoyons pas formellement",
    },
    scenario_wish: {
      new_location: "Ouverture d'un nouveau site",
      menu_change: "Impact d'un changement menu / prix",
      promo_impact: "Impact promotion / remise",
      staffing_model: "Changement de modèle de staffing",
      season_event: "Impact saisonnier / événement",
      competitor: "Arrivée / départ d'un concurrent",
      macro: "Inflation / droit du travail / fiscalité",
    },
    pos: { other: optionLabels.fr.common.other },
    timeline: {
      asap: "Tout de suite - évaluation active",
      next_quarter: "Trimestre prochain",
      next_6_months: "Dans les 6 prochains mois",
      this_year: "Avant la fin de l'année",
      exploring: "Simple exploration · Pas de calendrier",
    },
    decision_lag: {
      minutes: "Minutes - réaction pendant le service",
      hours: "Heures - le jour même",
      days: "Jours - revue hebdomadaire",
      weeks: "Semaines - clôture mensuelle",
      months: "Mois - revue trimestrielle seulement",
    },
    budget_band: {
      under_10k: "Moins de 10 k$",
      "10_25k": "10-25 k$",
      "25_50k": "25-50 k$",
      "50_100k": "50-100 k$",
      "100_250k": "100-250 k$",
      "250_500k": "250-500 k$",
      "500k_1m": "500 k$-1 M$",
      "1m_plus": "1 M$+",
      unsure: optionLabels.fr.common.unsure,
    },
    tech_headcount: {
      none: "Personne - aucun rôle dédié",
      fractional: "Fractionné / partagé avec d'autres fonctions",
      one: "1 personne",
      two_three: "2-3 personnes",
      four_eight: "4-8 personnes",
      nine_twenty: "9-20 personnes",
      twenty_plus: "20+ personnes",
    },
  },
};

const localizedText: Record<WebsiteLocale, LocaleOverrides> = {
  en: {
    dimensions: en.dimensions,
    navigation: en.navigation,
    capture: en.capture,
    roles: en.roles as Record<(typeof roleValues)[number], string>,
    countries: en.countries as Record<(typeof countryValues)[number], string>,
    questionText: Object.fromEntries(
      QUESTIONS.map((question) => [
        question.id,
        {
          prompt: question.prompt,
          helper: question.helper,
          placeholder: question.placeholder,
        },
      ]),
    ),
  },
  ar: {
    dimensions: {
      profile: "ملف التشغيل",
      crew: "القوى العاملة",
      core: "ذكاء القرار",
      foresight: "الاستشراف",
      tech: "الحزمة التقنية",
    },
    navigation: {
      back: "رجوع",
      next: "التالي",
      continue: "متابعة",
      finalStep: "الخطوة الأخيرة · أوشكنا",
      generate: "أنشئ تشخيصي",
      optional: "اختياري",
    },
    capture: {
      title: "إلى أين نرسل التشخيص؟",
      helper: "تشخيص عمليات Sundae المخصص جاهز. سنعرضه في الشاشة التالية ونرسل نسخة يمكنك مشاركتها مع فريقك.",
      requiredNote: "الحقول المعلّمة بـ * مطلوبة. نجمع بياناتك مرة واحدة هنا ونستخدمها في دعوات التشخيص دون نماذج إضافية.",
      fields: {
        name: "الاسم الكامل *",
        role: "الدور / المسمى *",
        email: "البريد المهني *",
        phone: "الهاتف (مع رمز الدولة) *",
        country: "الدولة *",
        company: "الشركة *",
      },
      placeholders: {
        name: "الاسم الكامل",
        role: "اختر دورك...",
        email: "you@company.com",
        phone: "+971 50 123 4567",
        country: "اختر الدولة...",
        company: "مجموعة المطاعم / العلامة",
      },
    },
    roles: {
      "CEO / Founder / Owner": "الرئيس التنفيذي / المؤسس / المالك",
      "COO / Operations Director": "مدير العمليات / رئيس العمليات",
      "CFO / Finance Director": "المدير المالي / مدير المالية",
      "Regional / Area Manager": "مدير إقليمي / مدير منطقة",
      "Franchise Owner": "مالك امتياز",
      "Head of People / HR": "رئيس الموارد البشرية",
      "Head of Marketing": "رئيس التسويق",
      "Head of Technology / Data": "رئيس التقنية / البيانات",
      "General Manager": "مدير عام",
      "Consultant / Advisor": "استشاري / مستشار",
      Other: "أخرى",
    },
    countries: {
      "United Arab Emirates": "الإمارات العربية المتحدة",
      "Saudi Arabia": "المملكة العربية السعودية",
      Qatar: "قطر",
      Kuwait: "الكويت",
      Bahrain: "البحرين",
      Oman: "عُمان",
      Egypt: "مصر",
      "United States": "الولايات المتحدة",
      Canada: "كندا",
      "United Kingdom": "المملكة المتحدة",
      Netherlands: "هولندا",
      Germany: "ألمانيا",
      France: "فرنسا",
      Spain: "إسبانيا",
      Italy: "إيطاليا",
      Singapore: "سنغافورة",
      Japan: "اليابان",
      Australia: "أستراليا",
      India: "الهند",
      Mexico: "المكسيك",
      Brazil: "البرازيل",
      "South Africa": "جنوب أفريقيا",
      Other: "أخرى",
    },
    questionText: {
      segment: {
        prompt: "ما القطاعات التي تعملون فيها؟",
        helper: "اختر كل ما ينطبق - المجموعات متعددة المفاهيم يمكنها اختيار أكثر من قطاع. يؤثر القطاع في أولويات Sundae.",
      },
      outlets: { prompt: "كم فرعا تديرون؟" },
      avg_unit_volume: {
        prompt: "تقريبا، ما متوسط الإيراد السنوي لكل فرع (AUV)؟",
        helper: "اختياري - يحسن نطاقات التكلفة والتوفير وEBITDA في تقريرك. يمكنك التخطي إن فضلت عدم الإفصاح.",
      },
      region: {
        prompt: "أين تعملون؟",
        helper: "اختر كل المناطق - للمشغلين متعددي المناطق نربط جاهزية حزم الدول بكل منطقة.",
      },
      scheduling_tool: {
        prompt: "كيف تعدون الجداول اليوم؟",
        helper: "اختر كل ما ينطبق - كثير من المشغلين يستخدمون أنظمة متعددة عبر العلامات أو المناطق.",
      },
      labor_pain: { prompt: "أين يتسرب أكبر قدر من تكلفة العمالة؟", helper: "اختر كل ما ينطبق." },
      payroll_regions: {
        prompt: "ما الدول التي تمسها الرواتب؟",
        helper: "اختر كل ما ينطبق - يحدد حزم الدول الأكثر صلة.",
      },
      kpis_measured: { prompt: "ما مؤشرات الأداء التي تتابعونها فعليا اليوم؟", helper: "اختر كل ما ينطبق." },
      kpis_wished: {
        prompt: "ما مؤشرات الأداء التي تتمنون قياسها ولا تستطيعون اليوم؟",
        helper: "هذه هي الفجوة التي تغطيها Sundae - اختر بصراحة. تشمل حسابات Sundae الأصلية التي نادرا ما تتاح للمشغلين.",
      },
      decision_data: {
        prompt: "في آخر قرارات تشغيلية مهمة، ما مصادر البيانات التي استخدمتموها؟",
        helper: "اختر كل ما انطبق - نادرا ما يعتمد المشغلون على مصدر واحد في قرار مهم.",
      },
      forecasting: { prompt: "كيف تتوقعون الإيرادات؟" },
      scenario_wish: { prompt: "ما سيناريوهات ماذا لو التي تتمنون نمذجتها؟", helper: "اختر كل ما ينطبق." },
      blind_spot: {
        prompt: "ما أكبر نقطة عمياء لديكم اليوم؟",
        helper: "جملة واحدة تكفي. ستبرزها Sundae مباشرة في تقريرك.",
        placeholder: "مثال: \"لا أستطيع معرفة هل الأسبوع البطيء سببه منافس أم موسم.\"",
      },
      pos: { prompt: "ما أنظمة POS التي تستخدمونها؟", helper: "اختر كل ما ينطبق - المجموعات متعددة العلامات غالبا تستخدم أكثر من نظام." },
      ops_tools: { prompt: "ما أدوات التشغيل الأخرى التي تستخدمونها حاليا؟", helper: "اختر كل ما ينطبق." },
      priority: {
        prompt: "لو أمكنكم إصلاح شيء واحد خلال 90 يوما، ماذا سيكون؟",
        helper: "إجابتك تشكل خطة 30/60/90 يوما في التشخيص.",
        placeholder: "مثال: \"إلغاء تسرب العمل الإضافي عبر فروعنا الثمانية.\"",
      },
      timeline: {
        prompt: "متى تريدون تشغيل حزمة عمليات جديدة؟",
        helper: "يشكل إطار الاستعجال في التشخيص ويوجهكم إلى مسار Sundae المناسب.",
      },
      decision_lag: {
        prompt: "كم يستغرق اتخاذ قرار تشغيلي مهم اليوم؟",
        helper: "من الإشارة إلى الإجراء - يقيس التأخر الذي تضغطه Sundae.",
      },
      budget_band: {
        prompt: "ما استثماركم السنوي الحالي في تقنيات التشغيل؟ (برمجيات/SaaS فقط)",
        helper: "POS + التحليلات + الجدولة + الرواتب + اشتراكات BI. الإجابات تبقى خاصة. تكاليف الأشخاص في السؤال التالي.",
      },
      tech_headcount: {
        prompt: "كم شخصا داخليا يديرون تلك الحزمة التقنية؟",
        helper: "محللون، مطورو BI / Power BI، مهندسو بيانات، محللو عمليات - من يسحبون التقارير ويحافظون على اللوحات. غالبا 2-5 أضعاف تكلفة البرمجيات.",
      },
    },
    optionLabels: sharedOptionLabelOverrides.ar,
  },
  fr: {
    dimensions: {
      profile: "Profil opérationnel",
      crew: "Personnel",
      core: "Intelligence décisionnelle",
      foresight: "Prévision",
      tech: "Stack technique",
    },
    navigation: {
      back: "Retour",
      next: "Suivant",
      continue: "Continuer",
      finalStep: "Dernière étape · Presque fini",
      generate: "Générer mon diagnostic",
      optional: "Optionnel",
    },
    capture: {
      title: "Où devons-nous envoyer votre diagnostic ?",
      helper: "Votre diagnostic opérationnel Sundae personnalisé est prêt. Nous l'afficherons sur l'écran suivant et enverrons une copie partageable avec votre équipe.",
      requiredNote: "Les champs marqués * sont obligatoires. Vos informations sont saisies une seule fois ici et réutilisées dans les CTA du diagnostic, sans second formulaire.",
      fields: {
        name: "Nom complet *",
        role: "Rôle / Titre *",
        email: "Email professionnel *",
        phone: "Téléphone (avec indicatif) *",
        country: "Pays *",
        company: "Entreprise *",
      },
      placeholders: {
        name: "Nom complet",
        role: "Sélectionnez votre rôle...",
        email: "vous@entreprise.com",
        phone: "+971 50 123 4567",
        country: "Sélectionnez un pays...",
        company: "Groupe de restaurants / marque",
      },
    },
    roles: {
      "CEO / Founder / Owner": "CEO / Fondateur / Propriétaire",
      "COO / Operations Director": "COO / Directeur des opérations",
      "CFO / Finance Director": "CFO / Directeur financier",
      "Regional / Area Manager": "Directeur régional / de zone",
      "Franchise Owner": "Franchisé",
      "Head of People / HR": "Responsable RH",
      "Head of Marketing": "Responsable marketing",
      "Head of Technology / Data": "Responsable technologie / data",
      "General Manager": "Directeur général",
      "Consultant / Advisor": "Consultant / Conseiller",
      Other: "Autre",
    },
    countries: {
      "United Arab Emirates": "Émirats arabes unis",
      "Saudi Arabia": "Arabie saoudite",
      Qatar: "Qatar",
      Kuwait: "Koweït",
      Bahrain: "Bahreïn",
      Oman: "Oman",
      Egypt: "Égypte",
      "United States": "États-Unis",
      Canada: "Canada",
      "United Kingdom": "Royaume-Uni",
      Netherlands: "Pays-Bas",
      Germany: "Allemagne",
      France: "France",
      Spain: "Espagne",
      Italy: "Italie",
      Singapore: "Singapour",
      Japan: "Japon",
      Australia: "Australie",
      India: "Inde",
      Mexico: "Mexique",
      Brazil: "Brésil",
      "South Africa": "Afrique du Sud",
      Other: "Autre",
    },
    questionText: {
      segment: {
        prompt: "Quels segments exploitez-vous ?",
        helper: "Sélectionnez tout ce qui s'applique - les groupes multi-concepts peuvent choisir plusieurs segments. Le segment influence les priorités de Sundae.",
      },
      outlets: { prompt: "Combien de points de vente exploitez-vous ?" },
      avg_unit_volume: {
        prompt: "Environ, quel est votre revenu annuel moyen par point de vente (AUV) ?",
        helper: "Optionnel - affine les fourchettes de coûts, économies et EBITDA de votre rapport. Ignorez si vous préférez ne pas répondre.",
      },
      region: {
        prompt: "Où opérez-vous ?",
        helper: "Sélectionnez toutes les régions - les opérateurs multi-régions verront la préparation des packs pays pour chacune.",
      },
      scheduling_tool: {
        prompt: "Comment planifiez-vous les équipes aujourd'hui ?",
        helper: "Sélectionnez tout ce qui s'applique - beaucoup d'opérateurs utilisent plusieurs systèmes selon les marques ou régions.",
      },
      labor_pain: { prompt: "Où les coûts de main-d'oeuvre fuient-ils le plus ?", helper: "Sélectionnez tout ce qui s'applique." },
      payroll_regions: {
        prompt: "Quels pays sont concernés par la paie ?",
        helper: "Sélectionnez tout ce qui s'applique - cela détermine les packs pays pertinents.",
      },
      kpis_measured: { prompt: "Quels KPI suivez-vous activement aujourd'hui ?", helper: "Sélectionnez tout ce qui s'applique." },
      kpis_wished: {
        prompt: "Quels KPI aimeriez-vous mesurer mais ne pouvez pas aujourd'hui ?",
        helper: "C'est l'écart que Sundae comble - soyez honnête, sélection multiple. Inclut des calculs natifs Sundae rarement accessibles aux opérateurs.",
      },
      decision_data: {
        prompt: "Pour vos dernières grandes décisions opérationnelles, quelles sources de données avez-vous utilisées ?",
        helper: "Sélectionnez tout ce qui s'applique - les opérateurs utilisent rarement une seule source pour une décision importante.",
      },
      forecasting: { prompt: "Comment prévoyez-vous le chiffre d'affaires ?" },
      scenario_wish: { prompt: "Quels scénarios de simulation aimeriez-vous modéliser ?", helper: "Sélectionnez tout ce qui s'applique." },
      blind_spot: {
        prompt: "Quel est votre plus grand angle mort aujourd'hui ?",
        helper: "Une phrase suffit. Sundae l'affichera directement dans votre rapport.",
        placeholder: "ex. \"Je ne sais pas si une semaine lente vient d'un concurrent ou de la saison.\"",
      },
      pos: { prompt: "Quel(s) système(s) POS utilisez-vous ?", helper: "Sélectionnez tout ce qui s'applique - les groupes multi-marques en utilisent souvent plusieurs." },
      ops_tools: { prompt: "Quels autres outils opérationnels utilisez-vous actuellement ?", helper: "Sélectionnez tout ce qui s'applique." },
      priority: {
        prompt: "Si vous pouviez corriger une chose dans les 90 prochains jours, quelle serait-elle ?",
        helper: "Votre réponse façonne le plan 30/60/90 jours de votre diagnostic.",
        placeholder: "ex. \"Éliminer les fuites d'heures supplémentaires dans nos 8 points de vente.\"",
      },
      timeline: {
        prompt: "Quand voulez-vous être opérationnel avec une nouvelle stack operations ?",
        helper: "Oriente le niveau d'urgence du diagnostic et le bon parcours Sundae.",
      },
      decision_lag: {
        prompt: "Combien de temps faut-il aujourd'hui pour prendre une décision opérationnelle significative ?",
        helper: "Du signal à l'action - mesure le délai que Sundae réduit.",
      },
      budget_band: {
        prompt: "Quel est votre investissement annuel actuel en technologie ops ? (logiciels/SaaS uniquement)",
        helper: "POS + analytics + planification + paie + abonnements BI. Les réponses restent privées. Les coûts humains viennent à la question suivante.",
      },
      tech_headcount: {
        prompt: "Combien de personnes en interne font tourner cette stack technique ?",
        helper: "Analystes, développeurs BI / Power BI, data engineers, analystes ops - les personnes qui tirent les rapports et maintiennent les dashboards. Souvent 2-5x le coût logiciel.",
      },
    },
    optionLabels: sharedOptionLabelOverrides.fr,
  },
  get es() { return makeRomanceLocale("es"); },
  get de() { return makeRomanceLocale("de"); },
  get nl() { return makeRomanceLocale("nl"); },
  get pt() { return makeRomanceLocale("pt"); },
  get hi() { return makeIndicLocale("hi"); },
  get ur() { return makeIndicLocale("ur"); },
  get it() { return makeRomanceLocale("it"); },
  get pl() { return makeRomanceLocale("pl"); },
  get tr() { return makeRomanceLocale("tr"); },
  get "zh-Hans"() { return makeEastAsiaLocale("zh-Hans"); },
  get ja() { return makeEastAsiaLocale("ja"); },
  get ko() { return makeEastAsiaLocale("ko"); },
  get id() { return makeSoutheastAsiaLocale("id"); },
  get vi() { return makeSoutheastAsiaLocale("vi"); },
  get ro() { return makeRomanceLocale("ro"); },
  get sv() { return makeRomanceLocale("sv"); },
  get bn() { return makeIndicLocale("bn"); },
  get th() { return makeSoutheastAsiaLocale("th"); },
  get ms() { return makeSoutheastAsiaLocale("ms"); },
};

function makeRomanceLocale(locale: Exclude<WebsiteLocale, "en" | "ar" | "fr" | "hi" | "ur" | "zh-Hans" | "ja" | "ko" | "id" | "vi" | "bn" | "th" | "ms">): LocaleOverrides {
  const packs = {
    es: {
      dimensions: ["Perfil operativo", "Equipo", "Inteligencia de decisión", "Prospectiva", "Stack tecnológico"],
      nav: ["Atrás", "Siguiente", "Continuar", "Paso final · Casi listo", "Generar mi diagnóstico", "Opcional"],
      capture: ["¿Dónde debemos enviar tu diagnóstico?", "Tu diagnóstico operativo personalizado de Sundae está listo. Lo mostraremos en la siguiente pantalla y enviaremos una copia para compartir con tu equipo.", "Los campos marcados con * son obligatorios. Capturamos tus datos una sola vez y los reutilizamos en los CTA del diagnóstico, sin segundo formulario."],
      fields: ["Nombre completo *", "Rol / Cargo *", "Email de trabajo *", "Teléfono (con código de país) *", "País *", "Empresa *"],
      placeholders: ["Nombre completo", "Selecciona tu rol...", "tu@empresa.com", "+971 50 123 4567", "Selecciona país...", "Grupo de restaurantes / marca"],
      question: [
        "¿Qué segmentos operas?", "Selecciona todo lo que aplique. El segmento influye en lo que Sundae prioriza.",
        "¿Cuántos locales operas?",
        "Aproximadamente, ¿cuál es tu ingreso anual medio por local (AUV)?", "Opcional: afina los rangos de coste, ahorro y EBITDA del informe.",
        "¿Dónde operas?", "Selecciona todas las regiones; la preparación por país se asigna a cada una.",
        "¿Cómo haces la planificación hoy?", "Selecciona todo lo que aplique; muchos operadores usan varios sistemas.",
        "¿Dónde se filtra más el coste laboral?", "Selecciona todo lo que aplique.",
        "¿Qué países toca la nómina?", "Selecciona todo lo que aplique; define qué paquetes país son relevantes.",
        "¿Qué KPI sigues activamente hoy?", "Selecciona todo lo que aplique.",
        "¿Qué KPI quisieras medir pero hoy no puedes?", "Esta es la brecha que cubre Sundae. Sé honesto y elige varios.",
        "En las últimas decisiones operativas importantes, ¿qué fuentes de datos usaste?", "Selecciona todo lo que aplicó.",
        "¿Cómo pronosticas ingresos?",
        "¿Qué escenarios hipotéticos quisieras modelar?", "Selecciona todo lo que aplique.",
        "¿Cuál es tu mayor punto ciego hoy?", "Una frase basta. Sundae lo destacará directamente en tu informe.", "p. ej. \"No sé si una semana lenta se debe a un competidor o a la temporada.\"",
        "¿Qué sistema(s) POS usas?", "Selecciona todo lo que aplique; los grupos multimarca suelen usar varios.",
        "¿Qué otras herramientas operativas usas actualmente?", "Selecciona todo lo que aplique.",
        "Si pudieras arreglar una cosa en los próximos 90 días, ¿cuál sería?", "Tu respuesta da forma al plan 30/60/90 días de tu diagnóstico.", "p. ej. \"Eliminar fugas de horas extra en nuestros 8 locales.\"",
        "¿Cuándo quieres estar en vivo con una nueva stack operativa?", "Define la urgencia del diagnóstico y el recorrido Sundae adecuado.",
        "¿Cuánto tardas hoy en tomar una decisión operativa significativa?", "De señal a acción: mide el retraso que Sundae comprime.",
        "¿Cuál es tu inversión anual actual en tecnología ops? (solo software/SaaS)", "POS + analítica + planificación + nómina + suscripciones BI. Las respuestas son privadas.",
        "¿Cuántas personas internas gestionan esa stack tecnológica?", "Analistas, desarrolladores BI / Power BI, data engineers y analistas ops que mantienen informes y dashboards.",
      ],
      roles: ["CEO / Fundador / Propietario", "COO / Director de operaciones", "CFO / Director financiero", "Gerente regional / de área", "Propietario de franquicia", "Responsable de Personas / RR. HH.", "Responsable de marketing", "Responsable de tecnología / datos", "Gerente general", "Consultor / Asesor", "Otro"],
      other: "Otro",
    },
    de: {
      dimensions: ["Betriebsprofil", "Team", "Entscheidungsintelligenz", "Vorausschau", "Tech-Stack"],
      nav: ["Zurück", "Weiter", "Fortfahren", "Letzter Schritt · Fast fertig", "Diagnose erstellen", "Optional"],
      capture: ["Wohin sollen wir Ihre Diagnose senden?", "Ihre personalisierte Sundae Operations Diagnostic ist bereit. Wir zeigen sie auf dem nächsten Bildschirm und senden eine Kopie für Ihr Team.", "Mit * markierte Felder sind erforderlich. Ihre Daten werden hier einmal erfasst und für die Diagnose-CTAs wiederverwendet."],
      fields: ["Vollständiger Name *", "Rolle / Titel *", "Geschäftliche E-Mail *", "Telefon (mit Ländercode) *", "Land *", "Unternehmen *"],
      placeholders: ["Vollständiger Name", "Rolle auswählen...", "sie@unternehmen.com", "+971 50 123 4567", "Land auswählen...", "Restaurantgruppe / Marke"],
      question: ["Welche Segmente betreiben Sie?", "Wählen Sie alles aus, was zutrifft. Das Segment beeinflusst, was Sundae priorisiert.", "Wie viele Standorte betreiben Sie?", "Wie hoch ist ungefähr Ihr durchschnittlicher Jahresumsatz pro Standort (AUV)?", "Optional: schärft Kosten-, Einspar- und EBITDA-Spannen.", "Wo sind Sie tätig?", "Wählen Sie alle Regionen aus.", "Wie planen Sie heute Schichten?", "Wählen Sie alles aus; viele Betreiber nutzen mehrere Systeme.", "Wo verliert Arbeit am meisten Marge?", "Wählen Sie alles aus.", "Welche Länder betrifft die Lohnabrechnung?", "Wählen Sie alles aus; das bestimmt relevante Länderpakete.", "Welche KPIs verfolgen Sie heute aktiv?", "Wählen Sie alles aus.", "Welche KPIs möchten Sie messen, können es heute aber nicht?", "Das ist die Lücke, die Sundae schließt. Bitte ehrlich mehrfach auswählen.", "Welche Datenquellen nutzten Sie bei den letzten großen Betriebsentscheidungen?", "Wählen Sie alles aus.", "Wie prognostizieren Sie Umsatz?", "Welche Was-wäre-wenn-Szenarien möchten Sie modellieren?", "Wählen Sie alles aus.", "Was ist heute Ihr größter blinder Fleck?", "Ein Satz reicht. Sundae markiert ihn direkt im Bericht.", "z. B. \"Ich kann nicht erkennen, ob eine schwache Woche vom Wettbewerb oder von Saisonalität kommt.\"", "Welche POS-Systeme verwenden Sie?", "Wählen Sie alles aus; Multi-Brand-Gruppen nutzen oft mehrere.", "Welche weiteren Ops-Tools nutzen Sie aktuell?", "Wählen Sie alles aus.", "Wenn Sie in den nächsten 90 Tagen eine Sache lösen könnten, welche wäre es?", "Ihre Antwort prägt den 30/60/90-Tage-Plan.", "z. B. \"Überstundenverluste in unseren 8 Standorten eliminieren.\"", "Wann möchten Sie mit einem neuen Operations-Stack live sein?", "Prägt Dringlichkeit und den passenden Sundae-Weg.", "Wie lange dauert heute eine relevante operative Entscheidung?", "Vom Signal zur Aktion: misst die Verzögerung, die Sundae verkürzt.", "Wie hoch ist Ihre aktuelle jährliche Ops-Tech-Investition? (nur Software/SaaS)", "POS + Analytics + Planung + Payroll + BI-Abos. Antworten bleiben privat.", "Wie viele interne Personen betreiben diesen Tech-Stack?", "Analysten, BI / Power BI-Entwickler, Data Engineers und Ops-Analysten, die Berichte und Dashboards pflegen."],
      roles: ["CEO / Gründer / Eigentümer", "COO / Operations Director", "CFO / Finanzdirektor", "Regional- / Gebietsleiter", "Franchise-Inhaber", "Leitung People / HR", "Leitung Marketing", "Leitung Technologie / Daten", "General Manager", "Berater / Advisor", "Andere"],
      other: "Andere",
    },
    nl: {
      dimensions: ["Operationeel profiel", "Team", "Beslissingsintelligentie", "Vooruitblik", "Tech-stack"],
      nav: ["Terug", "Volgende", "Doorgaan", "Laatste stap · Bijna klaar", "Genereer mijn diagnose", "Optioneel"],
      capture: ["Waar moeten we je diagnose naartoe sturen?", "Je persoonlijke Sundae Operations Diagnostic staat klaar. We tonen hem op het volgende scherm en mailen een kopie voor je team.", "Velden met * zijn verplicht. Je gegevens worden hier één keer vastgelegd en hergebruikt voor de diagnose-CTA's."],
      fields: ["Volledige naam *", "Rol / Titel *", "Werk-e-mail *", "Telefoon (met landcode) *", "Land *", "Bedrijf *"],
      placeholders: ["Volledige naam", "Selecteer je rol...", "jij@bedrijf.com", "+971 50 123 4567", "Selecteer land...", "Restaurantgroep / merk"],
      question: ["Welke segmenten exploiteer je?", "Selecteer alles wat van toepassing is. Segment bepaalt wat Sundae prioriteert.", "Hoeveel vestigingen exploiteer je?", "Wat is ongeveer je gemiddelde jaaromzet per vestiging (AUV)?", "Optioneel: verfijnt kosten-, besparings- en EBITDA-bandbreedtes.", "Waar ben je actief?", "Selecteer alle regio's.", "Hoe plan je vandaag?", "Selecteer alles; veel operators gebruiken meerdere systemen.", "Waar lekt arbeidskosten het meest?", "Selecteer alles wat van toepassing is.", "Welke landen raakt payroll?", "Selecteer alles; bepaalt relevante landenpakketten.", "Welke KPI's volg je vandaag actief?", "Selecteer alles.", "Welke KPI's zou je willen meten maar kun je vandaag niet?", "Dit is de kloof die Sundae dicht. Wees eerlijk en kies meerdere.", "Welke databronnen gebruikte je bij de laatste grote operationele beslissingen?", "Selecteer alles.", "Hoe voorspel je omzet?", "Welke wat-als-scenario's wil je modelleren?", "Selecteer alles.", "Wat is vandaag je grootste blinde vlek?", "Eén zin is genoeg. Sundae markeert dit direct in je rapport.", "bijv. \"Ik zie niet of een trage week door concurrentie of seizoen komt.\"", "Welke POS-systemen gebruik je?", "Selecteer alles; multi-merk groepen gebruiken vaak meerdere.", "Welke andere ops-tools gebruik je nu?", "Selecteer alles.", "Als je in de komende 90 dagen één ding kon oplossen, wat zou dat zijn?", "Je antwoord vormt het 30/60/90-dagenplan.", "bijv. \"Overurenlekkage in onze 8 vestigingen elimineren.\"", "Wanneer wil je live zijn met een nieuwe operations-stack?", "Bepaalt urgentie en de juiste Sundae-route.", "Hoe lang duurt een betekenisvolle operationele beslissing vandaag?", "Van signaal naar actie: meet de vertraging die Sundae verkort.", "Wat is je huidige jaarlijkse ops-tech investering? (alleen software/SaaS)", "POS + analytics + planning + payroll + BI-abonnementen. Antwoorden blijven privé.", "Hoeveel interne mensen beheren die tech-stack?", "Analisten, BI / Power BI-ontwikkelaars, data engineers en ops-analisten die rapporten en dashboards onderhouden."],
      roles: ["CEO / Oprichter / Eigenaar", "COO / Operations Director", "CFO / Financieel directeur", "Regio- / Area manager", "Franchise-eigenaar", "Head of People / HR", "Head of Marketing", "Head of Technology / Data", "General Manager", "Consultant / Adviseur", "Overig"],
      other: "Overig",
    },
    pt: {
      dimensions: ["Perfil operacional", "Equipe", "Inteligência de decisão", "Previsão", "Stack tecnológica"],
      nav: ["Voltar", "Próximo", "Continuar", "Etapa final · Quase pronto", "Gerar meu diagnóstico", "Opcional"],
      capture: ["Para onde devemos enviar seu diagnóstico?", "Seu Diagnóstico Operacional Sundae personalizado está pronto. Vamos mostrá-lo na próxima tela e enviar uma cópia para sua equipe.", "Campos marcados com * são obrigatórios. Seus dados são capturados uma vez e reutilizados nos CTAs do diagnóstico."],
      fields: ["Nome completo *", "Função / Cargo *", "E-mail profissional *", "Telefone (com código do país) *", "País *", "Empresa *"],
      placeholders: ["Nome completo", "Selecione sua função...", "voce@empresa.com", "+971 50 123 4567", "Selecione o país...", "Grupo de restaurantes / marca"],
      question: ["Quais segmentos você opera?", "Selecione todos os aplicáveis. O segmento influencia o que a Sundae prioriza.", "Quantas unidades você opera?", "Qual é aproximadamente sua receita anual média por unidade (AUV)?", "Opcional: refina custos, economias e faixas de EBITDA.", "Onde você opera?", "Selecione todas as regiões.", "Como você monta escalas hoje?", "Selecione tudo; muitos operadores usam vários sistemas.", "Onde o custo de mão de obra vaza mais?", "Selecione todos os aplicáveis.", "Quais países a folha de pagamento envolve?", "Selecione todos; define os pacotes de país relevantes.", "Quais KPIs você acompanha ativamente hoje?", "Selecione todos.", "Quais KPIs você gostaria de medir mas ainda não consegue?", "Essa é a lacuna que a Sundae cobre. Seja honesto e selecione vários.", "Nas últimas decisões operacionais importantes, quais fontes de dados você usou?", "Selecione todos.", "Como você prevê receita?", "Quais cenários hipotéticos você gostaria de modelar?", "Selecione todos.", "Qual é seu maior ponto cego hoje?", "Uma frase basta. A Sundae destacará isso no relatório.", "ex. \"Não sei se uma semana fraca vem de concorrente ou sazonalidade.\"", "Quais sistemas POS você usa?", "Selecione todos; grupos multimarcas costumam usar vários.", "Quais outras ferramentas operacionais você usa hoje?", "Selecione todos.", "Se pudesse corrigir uma coisa nos próximos 90 dias, qual seria?", "Sua resposta molda o plano 30/60/90 dias.", "ex. \"Eliminar vazamento de horas extras nas nossas 8 unidades.\"", "Quando você quer estar ao vivo com uma nova stack operacional?", "Define urgência e a rota Sundae certa.", "Quanto tempo leva hoje para tomar uma decisão operacional relevante?", "Do sinal à ação: mede o atraso que a Sundae reduz.", "Qual é seu investimento anual atual em tecnologia ops? (somente software/SaaS)", "POS + analytics + escala + folha + assinaturas BI. Respostas ficam privadas.", "Quantas pessoas internas operam essa stack tecnológica?", "Analistas, desenvolvedores BI / Power BI, engenheiros de dados e analistas ops que mantêm relatórios e dashboards."],
      roles: ["CEO / Fundador / Proprietário", "COO / Diretor de Operações", "CFO / Diretor Financeiro", "Gerente regional / de área", "Dono de franquia", "Head de Pessoas / RH", "Head de Marketing", "Head de Tecnologia / Dados", "Gerente geral", "Consultor / Advisor", "Outro"],
      other: "Outro",
    },
    it: {
      dimensions: ["Profilo operativo", "Team", "Intelligenza decisionale", "Previsione", "Stack tecnologico"],
      nav: ["Indietro", "Avanti", "Continua", "Ultimo passo · Quasi finito", "Genera il mio diagnostic", "Opzionale"],
      capture: ["Dove dobbiamo inviare il diagnostic?", "Il tuo Sundae Operations Diagnostic personalizzato è pronto. Lo mostreremo nella schermata successiva e invieremo una copia al tuo team.", "I campi contrassegnati da * sono obbligatori. I dati vengono acquisiti una sola volta e riutilizzati nei CTA del diagnostic."],
      fields: ["Nome completo *", "Ruolo / Titolo *", "Email di lavoro *", "Telefono (con prefisso paese) *", "Paese *", "Azienda *"],
      placeholders: ["Nome completo", "Seleziona il ruolo...", "tu@azienda.com", "+971 50 123 4567", "Seleziona paese...", "Gruppo ristoranti / brand"],
      question: ["Quali segmenti gestisci?", "Seleziona tutto ciò che si applica. Il segmento influenza le priorità di Sundae.", "Quanti punti vendita gestisci?", "Qual è circa il ricavo annuo medio per punto vendita (AUV)?", "Opzionale: affina costi, risparmi e range EBITDA.", "Dove operate?", "Seleziona tutte le regioni.", "Come pianificate oggi?", "Seleziona tutto; molti operatori usano più sistemi.", "Dove perde di più il costo del lavoro?", "Seleziona tutto.", "Quali paesi tocca il payroll?", "Seleziona tutto; determina i country pack rilevanti.", "Quali KPI monitorate attivamente oggi?", "Seleziona tutto.", "Quali KPI vorresti misurare ma oggi non puoi?", "Questa è la lacuna che Sundae colma. Sii onesto e multi-seleziona.", "Nelle ultime decisioni operative importanti, quali fonti dati avete usato?", "Seleziona tutto.", "Come prevedete i ricavi?", "Quali scenari what-if vorresti modellare?", "Seleziona tutto.", "Qual è oggi il vostro più grande punto cieco?", "Basta una frase. Sundae lo evidenzierà nel report.", "es. \"Non capisco se una settimana lenta dipende da competitor o stagionalità.\"", "Quali sistemi POS usate?", "Seleziona tutto; i gruppi multi-brand spesso ne usano diversi.", "Quali altri strumenti ops usate oggi?", "Seleziona tutto.", "Se potessi risolvere una cosa nei prossimi 90 giorni, quale sarebbe?", "La risposta plasma il piano 30/60/90 giorni.", "es. \"Eliminare perdite di straordinari nei nostri 8 punti vendita.\"", "Quando volete andare live con un nuovo operations stack?", "Definisce urgenza e percorso Sundae corretto.", "Quanto tempo serve oggi per una decisione operativa significativa?", "Dal segnale all'azione: misura il ritardo che Sundae comprime.", "Qual è l'investimento annuo attuale in ops tech? (solo software/SaaS)", "POS + analytics + scheduling + payroll + abbonamenti BI. Risposte private.", "Quante persone interne gestiscono quello stack tecnologico?", "Analisti, sviluppatori BI / Power BI, data engineer e ops analyst che mantengono report e dashboard."],
      roles: ["CEO / Fondatore / Proprietario", "COO / Direttore Operations", "CFO / Direttore Finanziario", "Regional / Area Manager", "Franchise Owner", "Head of People / HR", "Head of Marketing", "Head of Technology / Data", "General Manager", "Consulente / Advisor", "Altro"],
      other: "Altro",
    },
    pl: {
      dimensions: ["Profil operacyjny", "Zespół", "Inteligencja decyzyjna", "Prognozowanie", "Stack technologiczny"],
      nav: ["Wstecz", "Dalej", "Kontynuuj", "Ostatni krok · Prawie gotowe", "Wygeneruj diagnozę", "Opcjonalne"],
      capture: ["Gdzie wysłać diagnozę?", "Twoja spersonalizowana Sundae Operations Diagnostic jest gotowa. Pokażemy ją na następnym ekranie i wyślemy kopię zespołowi.", "Pola oznaczone * są wymagane. Dane zbieramy tu raz i używamy w CTA diagnozy."],
      fields: ["Imię i nazwisko *", "Rola / stanowisko *", "Email służbowy *", "Telefon (z kodem kraju) *", "Kraj *", "Firma *"],
      placeholders: ["Imię i nazwisko", "Wybierz rolę...", "ty@firma.com", "+971 50 123 4567", "Wybierz kraj...", "Grupa restauracyjna / marka"],
      question: ["Jakie segmenty obsługujesz?", "Wybierz wszystkie pasujące. Segment wpływa na priorytety Sundae.", "Ile lokali prowadzisz?", "Jaki jest przybliżony średni roczny przychód na lokal (AUV)?", "Opcjonalnie: doprecyzowuje koszty, oszczędności i zakresy EBITDA.", "Gdzie działasz?", "Wybierz wszystkie regiony.", "Jak dziś tworzysz grafiki?", "Wybierz wszystko; wielu operatorów używa wielu systemów.", "Gdzie najbardziej wycieka koszt pracy?", "Wybierz wszystko.", "Jakich krajów dotyczy payroll?", "Wybierz wszystko; określa właściwe pakiety krajowe.", "Które KPI aktywnie śledzisz dziś?", "Wybierz wszystko.", "Które KPI chcesz mierzyć, ale dziś nie możesz?", "To luka, którą wypełnia Sundae. Wybierz szczerze wiele opcji.", "Jakich źródeł danych użyto przy ostatnich ważnych decyzjach operacyjnych?", "Wybierz wszystko.", "Jak prognozujesz przychody?", "Jakie scenariusze what-if chcesz modelować?", "Wybierz wszystko.", "Jaki jest dziś największy martwy punkt?", "Wystarczy jedno zdanie. Sundae wskaże je w raporcie.", "np. \"Nie wiem, czy słaby tydzień wynika z konkurencji czy sezonowości.\"", "Jakich systemów POS używasz?", "Wybierz wszystko; grupy multi-brand często używają wielu.", "Jakie inne narzędzia ops uruchamiasz obecnie?", "Wybierz wszystko.", "Gdyby można było naprawić jedną rzecz w 90 dni, co by to było?", "Odpowiedź kształtuje plan 30/60/90 dni.", "np. \"Wyeliminować wycieki nadgodzin w naszych 8 lokalach.\"", "Kiedy chcesz uruchomić nowy operations stack?", "Określa pilność i właściwą ścieżkę Sundae.", "Ile dziś trwa znacząca decyzja operacyjna?", "Od sygnału do działania: mierzy opóźnienie skracane przez Sundae.", "Jaka jest roczna inwestycja w ops tech? (tylko software/SaaS)", "POS + analityka + grafiki + payroll + BI. Odpowiedzi są prywatne.", "Ile osób wewnętrznie obsługuje ten stack?", "Analitycy, BI / Power BI developerzy, data engineerowie i analitycy ops utrzymujący raporty i dashboardy."],
      roles: ["CEO / Założyciel / Właściciel", "COO / Dyrektor operacyjny", "CFO / Dyrektor finansowy", "Menedżer regionalny / obszaru", "Właściciel franczyzy", "Head of People / HR", "Head of Marketingu", "Head of Technology / Data", "General Manager", "Konsultant / Doradca", "Inne"],
      other: "Inne",
    },
    tr: {
      dimensions: ["Operasyon profili", "Ekip", "Karar zekası", "Öngörü", "Teknoloji yığını"],
      nav: ["Geri", "İleri", "Devam", "Son adım · Neredeyse bitti", "Teşhisimi oluştur", "İsteğe bağlı"],
      capture: ["Teşhisinizi nereye gönderelim?", "Kişiselleştirilmiş Sundae Operations Diagnostic hazır. Sonraki ekranda gösterecek ve ekibinizle paylaşmanız için kopyasını e-posta ile göndereceğiz.", "* işaretli alanlar zorunludur. Bilgileriniz burada bir kez alınır ve teşhis CTA'larında yeniden kullanılır."],
      fields: ["Ad soyad *", "Rol / Unvan *", "İş e-postası *", "Telefon (ülke koduyla) *", "Ülke *", "Şirket *"],
      placeholders: ["Ad soyad", "Rolünüzü seçin...", "siz@sirket.com", "+971 50 123 4567", "Ülke seçin...", "Restoran grubu / marka"],
      question: ["Hangi segmentlerde faaliyet gösteriyorsunuz?", "Uygun olanların tümünü seçin. Segment, Sundae önceliklerini etkiler.", "Kaç şube işletiyorsunuz?", "Şube başına yaklaşık yıllık ortalama cironuz (AUV) nedir?", "İsteğe bağlı: maliyet, tasarruf ve EBITDA aralıklarını netleştirir.", "Nerelerde faaliyet gösteriyorsunuz?", "Tüm bölgeleri seçin.", "Bugün vardiya planını nasıl yapıyorsunuz?", "Uygun olanların tümünü seçin; birçok işletme birden çok sistem kullanır.", "İşgücü maliyeti en çok nerede sızıyor?", "Uygun olanların tümünü seçin.", "Bordro hangi ülkelere dokunuyor?", "Uygun olanların tümünü seçin; ilgili ülke paketlerini belirler.", "Bugün hangi KPI'ları aktif izliyorsunuz?", "Uygun olanların tümünü seçin.", "Hangi KPI'ları ölçmek isterdiniz ama bugün ölçemiyorsunuz?", "Sundae'nin kapattığı boşluk bu. Dürüstçe çoklu seçim yapın.", "Son büyük operasyon kararlarında hangi veri kaynaklarını kullandınız?", "Uygun olanların tümünü seçin.", "Geliri nasıl tahmin ediyorsunuz?", "Hangi what-if senaryolarını modellemek istersiniz?", "Uygun olanların tümünü seçin.", "Bugünkü en büyük kör noktanız ne?", "Bir cümle yeter. Sundae bunu raporda doğrudan işaretler.", "örn. \"Yavaş bir haftanın rakipten mi sezondan mı kaynaklandığını göremiyorum.\"", "Hangi POS sistemlerini kullanıyorsunuz?", "Uygun olanların tümünü seçin; çok markalı gruplar genelde birden çok kullanır.", "Şu anda başka hangi ops araçlarını çalıştırıyorsunuz?", "Uygun olanların tümünü seçin.", "Önümüzdeki 90 günde bir şeyi düzeltebilseydiniz ne olurdu?", "Yanıtınız 30/60/90 günlük planı şekillendirir.", "örn. \"8 şubemizde fazla mesai sızıntısını kaldırmak.\"", "Yeni bir operasyon yığınıyla ne zaman canlıya geçmek istiyorsunuz?", "Teşhiste aciliyeti ve doğru Sundae yolunu belirler.", "Bugün anlamlı bir operasyon kararı almak ne kadar sürüyor?", "Sinyalden aksiyona: Sundae'nin kısalttığı gecikmeyi ölçer.", "Mevcut yıllık ops teknoloji yatırımınız nedir? (yalnızca software/SaaS)", "POS + analitik + planlama + bordro + BI abonelikleri. Yanıtlar gizli kalır.", "Bu teknoloji yığınını içeride kaç kişi yürütüyor?", "Rapor çeken ve dashboard sürdüren analistler, BI / Power BI geliştiricileri, data engineer'lar ve ops analistleri."],
      roles: ["CEO / Kurucu / Sahip", "COO / Operasyon Direktörü", "CFO / Finans Direktörü", "Bölge / Alan Müdürü", "Franchise Sahibi", "İnsan ve İK Lideri", "Pazarlama Lideri", "Teknoloji / Veri Lideri", "Genel Müdür", "Danışman / Advisor", "Diğer"],
      other: "Diğer",
    },
    ro: {
      dimensions: ["Profil operațional", "Echipă", "Inteligență decizională", "Previziune", "Stack tehnologic"],
      nav: ["Înapoi", "Următorul", "Continuă", "Ultimul pas · Aproape gata", "Generează diagnosticul", "Opțional"],
      capture: ["Unde trimitem diagnosticul?", "Diagnosticul operațional Sundae personalizat este gata. Îl afișăm pe următorul ecran și trimitem o copie pentru echipa ta.", "Câmpurile marcate cu * sunt obligatorii. Datele sunt capturate o singură dată și reutilizate în CTA-urile diagnosticului."],
      fields: ["Nume complet *", "Rol / Titlu *", "Email de serviciu *", "Telefon (cu prefix țară) *", "Țară *", "Companie *"],
      placeholders: ["Nume complet", "Selectează rolul...", "tu@companie.com", "+971 50 123 4567", "Selectează țara...", "Grup de restaurante / brand"],
      question: ["Ce segmente operați?", "Selectați tot ce se aplică. Segmentul influențează prioritățile Sundae.", "Câte locații operați?", "Care este venitul anual mediu aproximativ per locație (AUV)?", "Opțional: rafinează costurile, economiile și intervalele EBITDA.", "Unde operați?", "Selectați toate regiunile.", "Cum faceți programarea azi?", "Selectați tot; mulți operatori folosesc sisteme multiple.", "Unde se pierde cel mai mult cost de muncă?", "Selectați tot ce se aplică.", "Ce țări atinge salarizarea?", "Selectați tot; determină pachetele de țară relevante.", "Ce KPI urmăriți activ azi?", "Selectați tot.", "Ce KPI ați vrea să măsurați, dar nu puteți azi?", "Aceasta este lacuna acoperită de Sundae. Alegeți sincer, multiplu.", "La ultimele decizii operaționale majore, ce surse de date ați folosit?", "Selectați tot.", "Cum prognozați veniturile?", "Ce scenarii what-if ați vrea să modelați?", "Selectați tot.", "Care este cel mai mare punct orb azi?", "O propoziție ajunge. Sundae îl va evidenția în raport.", "ex. \"Nu pot spune dacă o săptămână slabă e cauzată de competiție sau sezon.\"", "Ce sisteme POS folosiți?", "Selectați tot; grupurile multi-brand folosesc des mai multe.", "Ce alte instrumente ops folosiți acum?", "Selectați tot.", "Dacă ați putea rezolva un lucru în următoarele 90 de zile, care ar fi?", "Răspunsul modelează planul 30/60/90 zile.", "ex. \"Eliminarea scurgerilor de overtime în cele 8 locații.\"", "Când vreți să fiți live cu un nou operations stack?", "Definește urgența și ruta Sundae potrivită.", "Cât durează azi o decizie operațională semnificativă?", "De la semnal la acțiune: măsoară decalajul redus de Sundae.", "Care este investiția anuală actuală în ops tech? (doar software/SaaS)", "POS + analytics + programare + salarizare + abonamente BI. Răspunsurile rămân private.", "Câte persoane interne rulează acest stack tehnologic?", "Analiști, dezvoltatori BI / Power BI, data engineers și analiști ops care mențin rapoarte și dashboarduri."],
      roles: ["CEO / Fondator / Proprietar", "COO / Director operațiuni", "CFO / Director financiar", "Manager regional / zonal", "Proprietar franciză", "Head of People / HR", "Head of Marketing", "Head of Technology / Data", "General Manager", "Consultant / Advisor", "Altul"],
      other: "Altul",
    },
    sv: {
      dimensions: ["Driftsprofil", "Team", "Beslutsintelligens", "Framsyn", "Teknikstack"],
      nav: ["Tillbaka", "Nästa", "Fortsätt", "Sista steget · Nästan klart", "Generera min diagnos", "Valfritt"],
      capture: ["Vart ska vi skicka din diagnos?", "Din personliga Sundae Operations Diagnostic är klar. Vi visar den på nästa skärm och mejlar en kopia till ditt team.", "Fält markerade med * krävs. Informationen fångas en gång här och återanvänds i diagnostikens CTA:er."],
      fields: ["Fullständigt namn *", "Roll / Titel *", "Jobbmejl *", "Telefon (med landskod) *", "Land *", "Företag *"],
      placeholders: ["Fullständigt namn", "Välj din roll...", "du@foretag.com", "+971 50 123 4567", "Välj land...", "Restauranggrupp / varumärke"],
      question: ["Vilka segment driver ni?", "Välj allt som passar. Segmentet påverkar vad Sundae prioriterar.", "Hur många enheter driver ni?", "Ungefär, vad är er genomsnittliga årsomsättning per enhet (AUV)?", "Valfritt: skärper kostnads-, besparings- och EBITDA-intervall.", "Var är ni verksamma?", "Välj alla regioner.", "Hur schemalägger ni idag?", "Välj allt; många aktörer använder flera system.", "Var läcker arbetskostnaden mest?", "Välj allt som passar.", "Vilka länder berör payroll?", "Välj allt; avgör relevanta landspaket.", "Vilka KPI:er följer ni aktivt idag?", "Välj allt.", "Vilka KPI:er vill ni mäta men kan inte idag?", "Detta är gapet Sundae fyller. Var ärlig och välj flera.", "Vilka datakällor använde ni vid de senaste större driftbesluten?", "Välj allt.", "Hur prognostiserar ni intäkter?", "Vilka what-if-scenarier vill ni modellera?", "Välj allt.", "Vad är er största blinda fläck idag?", "En mening räcker. Sundae lyfter den direkt i rapporten.", "t.ex. \"Jag kan inte se om en långsam vecka beror på konkurrenter eller säsong.\"", "Vilka POS-system använder ni?", "Välj allt; multi-brand-grupper kör ofta flera.", "Vilka andra ops-verktyg använder ni idag?", "Välj allt.", "Om ni kunde fixa en sak de kommande 90 dagarna, vad vore det?", "Svaret formar 30/60/90-dagarsplanen.", "t.ex. \"Eliminera övertidsläckage i våra 8 enheter.\"", "När vill ni gå live med en ny operations-stack?", "Formar brådska och rätt Sundae-flöde.", "Hur lång tid tar ett meningsfullt driftbeslut idag?", "Från signal till handling: mäter fördröjningen Sundae kortar.", "Vad är er nuvarande årliga ops-tech-investering? (endast software/SaaS)", "POS + analytics + schemaläggning + payroll + BI-abonnemang. Svar hålls privata.", "Hur många interna personer driver den teknikstacken?", "Analytiker, BI / Power BI-utvecklare, data engineers och ops-analytiker som håller rapporter och dashboards igång."],
      roles: ["CEO / Grundare / Ägare", "COO / Operations Director", "CFO / Finansdirektör", "Regional / Area Manager", "Franchiseägare", "Head of People / HR", "Head of Marketing", "Head of Technology / Data", "General Manager", "Konsult / Rådgivare", "Annat"],
      other: "Annat",
    },
  }[locale];

  return fromPack(locale, packs);
}

function makeEastAsiaLocale(locale: "zh-Hans" | "ja" | "ko"): LocaleOverrides {
  const packs = {
    "zh-Hans": {
      dimensions: ["运营概况", "员工", "决策智能", "前瞻", "技术栈"],
      nav: ["返回", "下一步", "继续", "最后一步 · 快完成了", "生成我的诊断", "可选"],
      capture: ["诊断报告应发送到哪里？", "你的个性化 Sundae 运营诊断已准备好。我们将在下一屏展示，并通过邮件发送一份可与团队分享的副本。", "标有 * 的字段为必填。你的信息只在此收集一次，并复用于诊断 CTA。"],
      fields: ["姓名 *", "角色 / 职位 *", "工作邮箱 *", "电话（含国家代码） *", "国家 *", "公司 *"],
      placeholders: ["姓名", "选择你的角色...", "you@company.com", "+971 50 123 4567", "选择国家...", "餐饮集团 / 品牌"],
      question: ["你经营哪些业态？", "请选择所有适用项。业态会影响 Sundae 的优先级。", "你经营多少家门店？", "每家门店的平均年收入（AUV）大约是多少？", "可选：让成本、节省和 EBITDA 区间更准确。", "你在哪些地区运营？", "请选择所有地区。", "你们今天如何排班？", "请选择所有适用项；许多运营方跨品牌或地区使用多个系统。", "人工成本最常在哪里流失？", "请选择所有适用项。", "薪资涉及哪些国家？", "请选择所有适用项；这会影响相关国家包。", "你们今天主动跟踪哪些 KPI？", "请选择所有适用项。", "哪些 KPI 是你想衡量但今天无法衡量的？", "这正是 Sundae 填补的空白。请坦诚多选。", "最近的重要运营决策中，你用了哪些数据源？", "请选择所有适用项。", "你如何预测收入？", "你希望建模哪些假设情景？", "请选择所有适用项。", "你今天最大的盲点是什么？", "一句话即可。Sundae 会在报告中直接标出。", "例如：“我无法判断淡周是竞争对手导致还是季节性导致。”", "你使用哪些 POS 系统？", "请选择所有适用项；多品牌集团常常使用多个系统。", "你们目前还运行哪些运营工具？", "请选择所有适用项。", "如果未来 90 天只能修好一件事，会是什么？", "你的答案会塑造诊断中的 30/60/90 天计划。", "例如：“消除我们 8 家门店的加班流失。”", "你希望什么时候上线新的运营技术栈？", "影响诊断中的紧迫性和合适的 Sundae 路径。", "今天做出有意义的运营决策需要多久？", "从信号到行动：衡量 Sundae 将压缩的滞后。", "你目前每年在运营技术上的投入是多少？（仅软件/SaaS）", "POS + analytics + 排班 + 薪资 + BI 订阅。答案保持私密。", "内部有多少人负责运行这套技术栈？", "分析师、BI / Power BI 开发者、数据工程师、运营分析师等维护报告和仪表板的人。"],
      roles: ["CEO / 创始人 / 所有者", "COO / 运营总监", "CFO / 财务总监", "区域 / 片区经理", "加盟业主", "人力 / HR 负责人", "市场负责人", "技术 / 数据负责人", "总经理", "顾问 / Advisor", "其他"],
      other: "其他",
    },
    ja: {
      dimensions: ["運営プロフィール", "スタッフ", "意思決定インテリジェンス", "フォーサイト", "技術スタック"],
      nav: ["戻る", "次へ", "続ける", "最終ステップ · もう少し", "診断を生成", "任意"],
      capture: ["診断結果をどこに送りますか？", "パーソナライズされた Sundae Operations Diagnostic の準備ができました。次の画面で表示し、チーム共有用のコピーをメールします。", "* の項目は必須です。情報はここで一度だけ取得し、診断 CTA で再利用されます。"],
      fields: ["氏名 *", "役割 / 役職 *", "勤務先メール *", "電話（国番号付き） *", "国 *", "会社 *"],
      placeholders: ["氏名", "役割を選択...", "you@company.com", "+971 50 123 4567", "国を選択...", "レストラングループ / ブランド"],
      question: ["どの業態を運営していますか？", "該当するものをすべて選択してください。業態は Sundae の優先順位に影響します。", "何店舗を運営していますか？", "店舗あたりの平均年間売上（AUV）はおおよそいくらですか？", "任意：コスト、削減額、EBITDA のレンジをより精緻にします。", "どこで運営していますか？", "すべての地域を選択してください。", "現在どのようにシフトを組んでいますか？", "該当するものをすべて選択してください。複数システムを使う運営会社は多いです。", "人件費はどこで最も漏れていますか？", "該当するものをすべて選択してください。", "給与計算はどの国に関係しますか？", "該当するものをすべて選択してください。関連する国別パックに影響します。", "現在、どの KPI を積極的に追跡していますか？", "該当するものをすべて選択してください。", "測定したいが現在できていない KPI はどれですか？", "ここが Sundae が埋めるギャップです。正直に複数選択してください。", "直近の大きな運営判断で、どのデータソースを使いましたか？", "該当するものをすべて選択してください。", "売上をどのように予測していますか？", "どの What-if シナリオをモデル化したいですか？", "該当するものをすべて選択してください。", "現在の最大の盲点は何ですか？", "一文で十分です。Sundae がレポートで直接示します。", "例：「不調な週が競合の影響か季節要因か分からない。」", "どの POS システムを使っていますか？", "該当するものをすべて選択してください。マルチブランドでは複数利用が一般的です。", "現在ほかにどんな運営ツールを使っていますか？", "該当するものをすべて選択してください。", "今後 90 日で一つだけ直せるなら何ですか？", "回答は診断内の 30/60/90 日計画に反映されます。", "例：「8 店舗全体の残業漏れをなくす。」", "新しい運営スタックでいつ本稼働したいですか？", "診断の緊急度と適切な Sundae の進め方を形作ります。", "現在、意味のある運営判断にどれくらい時間がかかりますか？", "シグナルから行動まで：Sundae が短縮する遅れを測ります。", "現在の年間 Ops Tech 投資額はいくらですか？（software/SaaS のみ）", "POS + analytics + シフト + 給与 + BI サブスク。回答は非公開です。", "その技術スタックを社内で何人が運用していますか？", "レポートやダッシュボードを維持するアナリスト、BI / Power BI 開発者、データエンジニア、Ops アナリストです。"],
      roles: ["CEO / 創業者 / オーナー", "COO / オペレーション責任者", "CFO / 財務責任者", "地域 / エリアマネージャー", "フランチャイズオーナー", "People / HR 責任者", "マーケティング責任者", "技術 / データ責任者", "ゼネラルマネージャー", "コンサルタント / アドバイザー", "その他"],
      other: "その他",
    },
    ko: {
      dimensions: ["운영 프로필", "인력", "의사결정 인텔리전스", "예측", "기술 스택"],
      nav: ["뒤로", "다음", "계속", "마지막 단계 · 거의 완료", "진단 생성", "선택 사항"],
      capture: ["진단 결과를 어디로 보낼까요?", "맞춤형 Sundae Operations Diagnostic이 준비되었습니다. 다음 화면에 표시하고 팀과 공유할 수 있는 사본을 이메일로 보내드립니다.", "* 표시된 필드는 필수입니다. 정보는 여기서 한 번만 수집되며 진단 CTA에 재사용됩니다."],
      fields: ["이름 *", "역할 / 직함 *", "회사 이메일 *", "전화번호(국가 코드 포함) *", "국가 *", "회사 *"],
      placeholders: ["이름", "역할 선택...", "you@company.com", "+971 50 123 4567", "국가 선택...", "레스토랑 그룹 / 브랜드"],
      question: ["어떤 세그먼트를 운영하시나요?", "해당되는 항목을 모두 선택하세요. 세그먼트는 Sundae 우선순위에 영향을 줍니다.", "몇 개 매장을 운영하시나요?", "매장당 평균 연매출(AUV)은 대략 얼마인가요?", "선택 사항: 비용, 절감, EBITDA 범위를 더 정확하게 합니다.", "어디에서 운영하시나요?", "모든 지역을 선택하세요.", "현재 스케줄은 어떻게 짜나요?", "해당 항목을 모두 선택하세요. 여러 시스템을 쓰는 운영사가 많습니다.", "인건비 누수는 어디에서 가장 큽니까?", "해당 항목을 모두 선택하세요.", "급여는 어느 국가와 관련 있나요?", "해당 항목을 모두 선택하세요. 관련 국가팩을 결정합니다.", "현재 적극적으로 추적하는 KPI는 무엇인가요?", "해당 항목을 모두 선택하세요.", "측정하고 싶지만 현재 측정하지 못하는 KPI는 무엇인가요?", "Sundae가 메우는 간극입니다. 솔직하게 복수 선택하세요.", "최근 주요 운영 의사결정에서 어떤 데이터 소스를 사용했나요?", "해당 항목을 모두 선택하세요.", "매출을 어떻게 예측하시나요?", "어떤 what-if 시나리오를 모델링하고 싶나요?", "해당 항목을 모두 선택하세요.", "현재 가장 큰 사각지대는 무엇인가요?", "한 문장이면 충분합니다. Sundae가 보고서에 직접 표시합니다.", "예: \"느린 주가 경쟁사 때문인지 계절 때문인지 알 수 없다.\"", "어떤 POS 시스템을 사용하시나요?", "해당 항목을 모두 선택하세요. 멀티브랜드 그룹은 여러 시스템을 쓰는 경우가 많습니다.", "현재 다른 운영 도구는 무엇을 사용하나요?", "해당 항목을 모두 선택하세요.", "향후 90일 안에 하나를 고칠 수 있다면 무엇인가요?", "답변은 진단의 30/60/90일 계획을 만듭니다.", "예: \"8개 매장의 초과근무 누수를 제거한다.\"", "새 운영 스택으로 언제 라이브하고 싶나요?", "진단의 긴급도와 적절한 Sundae 경로를 정합니다.", "현재 의미 있는 운영 결정을 내리는 데 얼마나 걸리나요?", "신호에서 실행까지: Sundae가 줄일 지연을 측정합니다.", "현재 연간 ops tech 투자액은 얼마인가요? (software/SaaS만)", "POS + analytics + 스케줄링 + 급여 + BI 구독. 답변은 비공개입니다.", "그 기술 스택을 내부에서 몇 명이 운영하나요?", "보고서와 대시보드를 유지하는 분석가, BI / Power BI 개발자, 데이터 엔지니어, ops 분석가입니다."],
      roles: ["CEO / 창업자 / 오너", "COO / 운영 이사", "CFO / 재무 이사", "지역 / Area 매니저", "프랜차이즈 오너", "People / HR 책임자", "마케팅 책임자", "기술 / 데이터 책임자", "총괄 매니저", "컨설턴트 / 어드바이저", "기타"],
      other: "기타",
    },
  }[locale];

  return fromPack(locale, packs);
}

function makeIndicLocale(locale: "hi" | "ur" | "bn"): LocaleOverrides {
  const packs = {
    hi: {
      dimensions: ["ऑपरेशन प्रोफाइल", "वर्कफोर्स", "निर्णय इंटेलिजेंस", "फोरसाइट", "टेक स्टैक"],
      nav: ["पीछे", "अगला", "जारी रखें", "अंतिम चरण · लगभग पूरा", "मेरा डायग्नोस्टिक बनाएं", "वैकल्पिक"],
      capture: ["आपका डायग्नोस्टिक कहाँ भेजें?", "आपका पर्सनलाइज्ड Sundae Operations Diagnostic तैयार है। हम इसे अगले स्क्रीन पर दिखाएंगे और आपकी टीम के लिए कॉपी ईमेल करेंगे।", "* वाले फ़ील्ड अनिवार्य हैं। आपकी जानकारी यहां एक बार ली जाती है और diagnostic CTA में दोबारा उपयोग होती है।"],
      fields: ["पूरा नाम *", "भूमिका / पद *", "वर्क ईमेल *", "फोन (देश कोड सहित) *", "देश *", "कंपनी *"],
      placeholders: ["पूरा नाम", "अपनी भूमिका चुनें...", "you@company.com", "+971 50 123 4567", "देश चुनें...", "रेस्तरां समूह / ब्रांड"],
      question: ["आप किन सेगमेंट में काम करते हैं?", "जो लागू हों वे सभी चुनें। सेगमेंट Sundae की प्राथमिकताओं को प्रभावित करता है।", "आप कितने आउटलेट चलाते हैं?", "प्रति आउटलेट औसत वार्षिक राजस्व (AUV) लगभग कितना है?", "वैकल्पिक: रिपोर्ट में लागत, बचत और EBITDA रेंज को बेहतर करता है।", "आप कहाँ ऑपरेट करते हैं?", "सभी क्षेत्र चुनें।", "आज आप शेड्यूल कैसे बनाते हैं?", "जो लागू हों वे सभी चुनें; कई ऑपरेटर कई सिस्टम चलाते हैं।", "लेबर कॉस्ट सबसे ज्यादा कहाँ लीक होती है?", "जो लागू हों वे सभी चुनें।", "पेरोल किन देशों को छूता है?", "जो लागू हों वे सभी चुनें; इससे प्रासंगिक country packs तय होते हैं।", "आज आप कौन से KPI सक्रिय रूप से ट्रैक करते हैं?", "जो लागू हों वे सभी चुनें।", "कौन से KPI आप मापना चाहते हैं लेकिन आज नहीं माप पाते?", "यही गैप Sundae भरता है। ईमानदारी से मल्टी-सेलेक्ट करें।", "अंतिम बड़े ऑपरेशन निर्णयों में आपने कौन से डेटा स्रोत उपयोग किए?", "जो लागू हों वे सभी चुनें।", "आप revenue forecast कैसे करते हैं?", "कौन से what-if scenarios आप मॉडल करना चाहेंगे?", "जो लागू हों वे सभी चुनें।", "आज आपका सबसे बड़ा blind spot क्या है?", "एक वाक्य काफी है। Sundae इसे आपकी रिपोर्ट में सीधे फ्लैग करेगा।", "उदा. \"मैं नहीं बता पाता कि धीमा सप्ताह competitor-driven है या seasonal.\"", "आप कौन से POS सिस्टम इस्तेमाल करते हैं?", "जो लागू हों वे सभी चुनें; multi-brand groups अक्सर कई इस्तेमाल करते हैं।", "आज आप और कौन से ops tools चलाते हैं?", "जो लागू हों वे सभी चुनें।", "यदि अगले 90 दिनों में एक चीज ठीक कर सकें, तो वह क्या होगी?", "आपका उत्तर diagnostic में 30/60/90-day plan बनाता है।", "उदा. \"हमारे 8 outlets में overtime leakage खत्म करना.\"", "नई operations stack के साथ कब live होना चाहते हैं?", "Diagnostic में urgency और सही Sundae motion तय करता है।", "आज एक meaningful operational decision लेने में कितना समय लगता है?", "Signal से action तक: वह lag मापता है जिसे Sundae कम करता है।", "आपका वर्तमान annual ops tech investment क्या है? (केवल software/SaaS)", "POS + analytics + scheduling + payroll + BI subscriptions. जवाब निजी रहते हैं।", "उस tech stack को in-house कितने लोग चलाते हैं?", "Analysts, BI / Power BI developers, data engineers, ops analysts जो reports और dashboards संभालते हैं।"],
      roles: ["CEO / Founder / Owner", "COO / Operations Director", "CFO / Finance Director", "Regional / Area Manager", "Franchise Owner", "Head of People / HR", "Head of Marketing", "Head of Technology / Data", "General Manager", "Consultant / Advisor", "अन्य"],
      other: "अन्य",
    },
    ur: {
      dimensions: ["آپریشن پروفائل", "ورک فورس", "فیصلہ جاتی ذہانت", "فورسائٹ", "ٹیک اسٹیک"],
      nav: ["واپس", "اگلا", "جاری رکھیں", "آخری مرحلہ · تقریباً مکمل", "میرا diagnostic بنائیں", "اختیاری"],
      capture: ["آپ کا diagnostic کہاں بھیجیں؟", "آپ کا ذاتی Sundae Operations Diagnostic تیار ہے۔ ہم اسے اگلی اسکرین پر دکھائیں گے اور ٹیم کے لیے کاپی ای میل کریں گے۔", "* والے فیلڈز لازمی ہیں۔ معلومات یہاں ایک بار لی جاتی ہیں اور diagnostic CTA میں دوبارہ استعمال ہوتی ہیں۔"],
      fields: ["پورا نام *", "کردار / عہدہ *", "ورک ای میل *", "فون (ملکی کوڈ سمیت) *", "ملک *", "کمپنی *"],
      placeholders: ["پورا نام", "اپنا کردار منتخب کریں...", "you@company.com", "+971 50 123 4567", "ملک منتخب کریں...", "ریستوران گروپ / برانڈ"],
      question: ["آپ کن segments میں operate کرتے ہیں؟", "جو لاگو ہو سب منتخب کریں۔ Segment سے Sundae کی ترجیحات متاثر ہوتی ہیں۔", "آپ کتنے outlets چلاتے ہیں؟", "فی outlet اوسط سالانہ revenue (AUV) تقریباً کتنا ہے؟", "اختیاری: report میں cost, savings اور EBITDA ranges کو بہتر بناتا ہے۔", "آپ کہاں operate کرتے ہیں؟", "تمام regions منتخب کریں۔", "آج schedule کیسے بناتے ہیں؟", "جو لاگو ہو سب منتخب کریں؛ کئی operators متعدد systems استعمال کرتے ہیں۔", "Labor cost سب سے زیادہ کہاں leak ہوتی ہے؟", "جو لاگو ہو سب منتخب کریں۔", "Payroll کن countries کو touch کرتا ہے؟", "جو لاگو ہو سب منتخب کریں؛ relevant country packs طے ہوتے ہیں۔", "آج آپ کون سے KPIs actively track کرتے ہیں؟", "جو لاگو ہو سب منتخب کریں۔", "کون سے KPIs measure کرنا چاہتے ہیں مگر آج نہیں کر سکتے؟", "یہی gap Sundae fill کرتا ہے۔ ایمانداری سے multi-select کریں۔", "آخری بڑے operations decisions میں کون سے data sources استعمال کیے؟", "جو لاگو ہو سب منتخب کریں۔", "Revenue forecast کیسے کرتے ہیں؟", "کون سے what-if scenarios model کرنا چاہتے ہیں؟", "جو لاگو ہو سب منتخب کریں۔", "آج آپ کا سب سے بڑا blind spot کیا ہے؟", "ایک جملہ کافی ہے۔ Sundae اسے report میں براہ راست flag کرے گا۔", "مثلاً \"میں نہیں بتا سکتا کہ slow week competitor-driven ہے یا seasonal.\"",
        "آپ کون سے POS system(s) استعمال کرتے ہیں؟", "جو لاگو ہو سب منتخب کریں؛ multi-brand groups اکثر کئی systems چلاتے ہیں۔", "آج آپ اور کون سے ops tools چلاتے ہیں؟", "جو لاگو ہو سب منتخب کریں۔", "اگر اگلے 90 دن میں ایک چیز ٹھیک کر سکیں تو کیا ہوگی؟", "آپ کا جواب diagnostic میں 30/60/90-day plan بناتا ہے۔", "مثلاً \"ہمارے 8 outlets میں overtime leakage ختم کرنا.\"", "New operations stack کے ساتھ کب live ہونا چاہتے ہیں؟", "Diagnostic میں urgency اور درست Sundae motion بناتا ہے۔", "آج meaningful operational decision لینے میں کتنا وقت لگتا ہے؟", "Signal سے action تک: وہ lag جسے Sundae compress کرتا ہے۔", "Current annual ops tech investment کیا ہے؟ (صرف software/SaaS)", "POS + analytics + scheduling + payroll + BI subscriptions. جوابات private رہتے ہیں۔", "اس tech stack کو in-house کتنے لوگ چلاتے ہیں؟", "Analysts, BI / Power BI developers, data engineers, ops analysts جو reports اور dashboards maintain کرتے ہیں۔"],
      roles: ["CEO / Founder / Owner", "COO / Operations Director", "CFO / Finance Director", "Regional / Area Manager", "Franchise Owner", "Head of People / HR", "Head of Marketing", "Head of Technology / Data", "General Manager", "Consultant / Advisor", "دیگر"],
      other: "دیگر",
    },
    bn: {
      dimensions: ["অপারেশন প্রোফাইল", "কর্মী দল", "সিদ্ধান্ত বুদ্ধিমত্তা", "ফোরসাইট", "টেক স্ট্যাক"],
      nav: ["পিছনে", "পরবর্তী", "চালিয়ে যান", "শেষ ধাপ · প্রায় শেষ", "আমার ডায়াগনস্টিক তৈরি করুন", "ঐচ্ছিক"],
      capture: ["আপনার ডায়াগনস্টিক কোথায় পাঠাব?", "আপনার ব্যক্তিগত Sundae Operations Diagnostic প্রস্তুত। পরের স্ক্রিনে দেখাব এবং টিমে শেয়ারের জন্য একটি কপি ইমেইল করব।", "* চিহ্নিত ফিল্ড বাধ্যতামূলক। তথ্য এখানে একবার নেওয়া হয় এবং diagnostic CTA-তে পুনরায় ব্যবহৃত হয়।"],
      fields: ["পুরো নাম *", "ভূমিকা / পদবি *", "কাজের ইমেইল *", "ফোন (দেশ কোডসহ) *", "দেশ *", "কোম্পানি *"],
      placeholders: ["পুরো নাম", "ভূমিকা নির্বাচন করুন...", "you@company.com", "+971 50 123 4567", "দেশ নির্বাচন করুন...", "রেস্তোরাঁ গ্রুপ / ব্র্যান্ড"],
      question: ["আপনি কোন সেগমেন্টে অপারেট করেন?", "যা প্রযোজ্য সব নির্বাচন করুন। সেগমেন্ট Sundae-এর অগ্রাধিকার প্রভাবিত করে।", "আপনি কতটি আউটলেট চালান?", "প্রতি আউটলেটে গড় বার্ষিক রাজস্ব (AUV) আনুমানিক কত?", "ঐচ্ছিক: খরচ, সাশ্রয় ও EBITDA রেঞ্জ আরও ধারালো করে।", "আপনি কোথায় অপারেট করেন?", "সব অঞ্চল নির্বাচন করুন।", "আজ আপনি কীভাবে শিডিউল করেন?", "যা প্রযোজ্য সব নির্বাচন করুন; অনেক অপারেটর একাধিক সিস্টেম চালায়।", "লেবার কস্ট সবচেয়ে বেশি কোথায় লিক করে?", "যা প্রযোজ্য সব নির্বাচন করুন।", "পেরোল কোন দেশগুলো স্পর্শ করে?", "যা প্রযোজ্য সব নির্বাচন করুন; প্রাসঙ্গিক country packs নির্ধারণ করে।", "আজ কোন KPI সক্রিয়ভাবে ট্র্যাক করেন?", "যা প্রযোজ্য সব নির্বাচন করুন।", "কোন KPI মাপতে চান কিন্তু আজ পারেন না?", "এটাই Sundae পূরণ করে। সৎভাবে একাধিক নির্বাচন করুন।", "শেষ বড় অপারেশন সিদ্ধান্তে কোন ডেটা সোর্স ব্যবহার করেছিলেন?", "যা প্রযোজ্য সব নির্বাচন করুন।", "আপনি revenue কীভাবে forecast করেন?", "কোন what-if scenario মডেল করতে চান?", "যা প্রযোজ্য সব নির্বাচন করুন।", "আজ আপনার সবচেয়ে বড় blind spot কী?", "এক বাক্যই যথেষ্ট। Sundae রিপোর্টে সরাসরি দেখাবে।", "যেমন \"ধীর সপ্তাহটি competitor-driven নাকি seasonal বুঝতে পারি না।\"", "আপনি কোন POS system(s) ব্যবহার করেন?", "যা প্রযোজ্য সব নির্বাচন করুন; multi-brand groups প্রায়ই একাধিক ব্যবহার করে।", "বর্তমানে আর কোন ops tools চালান?", "যা প্রযোজ্য সব নির্বাচন করুন।", "আগামী ৯০ দিনে একটি জিনিস ঠিক করতে পারলে কী হবে?", "আপনার উত্তর diagnostic-এর 30/60/90-day plan তৈরি করে।", "যেমন \"আমাদের ৮ আউটলেটে overtime leakage দূর করা।\"", "নতুন operations stack নিয়ে কখন live হতে চান?", "Diagnostic-এর urgency এবং সঠিক Sundae motion তৈরি করে।", "আজ অর্থপূর্ণ operational decision নিতে কত সময় লাগে?", "Signal থেকে action: Sundae যে lag কমায় তা মাপে।", "বর্তমান annual ops tech investment কত? (শুধু software/SaaS)", "POS + analytics + scheduling + payroll + BI subscriptions. উত্তর private থাকে।", "এই tech stack in-house কতজন চালায়?", "Analysts, BI / Power BI developers, data engineers, ops analysts যারা reports ও dashboards রাখেন।"],
      roles: ["CEO / Founder / Owner", "COO / Operations Director", "CFO / Finance Director", "Regional / Area Manager", "Franchise Owner", "Head of People / HR", "Head of Marketing", "Head of Technology / Data", "General Manager", "Consultant / Advisor", "অন্যান্য"],
      other: "অন্যান্য",
    },
  }[locale];

  return fromPack(locale, packs);
}

function makeSoutheastAsiaLocale(locale: "id" | "vi" | "th" | "ms"): LocaleOverrides {
  const packs = {
    id: {
      dimensions: ["Profil operasional", "Tenaga kerja", "Intelijen keputusan", "Foresight", "Tech stack"],
      nav: ["Kembali", "Berikutnya", "Lanjut", "Langkah terakhir · Hampir selesai", "Buat diagnostik saya", "Opsional"],
      capture: ["Ke mana diagnostik Anda dikirim?", "Sundae Operations Diagnostic personal Anda siap. Kami tampilkan di layar berikut dan email salinan untuk tim Anda.", "Kolom bertanda * wajib. Informasi diambil sekali di sini dan dipakai ulang di CTA diagnostik."],
      fields: ["Nama lengkap *", "Peran / Jabatan *", "Email kerja *", "Telepon (dengan kode negara) *", "Negara *", "Perusahaan *"],
      placeholders: ["Nama lengkap", "Pilih peran Anda...", "anda@perusahaan.com", "+971 50 123 4567", "Pilih negara...", "Grup restoran / merek"],
      question: ["Segmen apa yang Anda operasikan?", "Pilih semua yang sesuai. Segmen memengaruhi prioritas Sundae.", "Berapa outlet yang Anda operasikan?", "Kira-kira berapa pendapatan tahunan rata-rata per outlet (AUV)?", "Opsional: memperjelas rentang biaya, penghematan, dan EBITDA.", "Di mana Anda beroperasi?", "Pilih semua wilayah.", "Bagaimana Anda menjadwalkan hari ini?", "Pilih semua; banyak operator memakai beberapa sistem.", "Di mana biaya tenaga kerja paling bocor?", "Pilih semua yang sesuai.", "Payroll menyentuh negara mana?", "Pilih semua; menentukan country pack yang relevan.", "KPI mana yang aktif Anda pantau hari ini?", "Pilih semua.", "KPI mana yang ingin Anda ukur tapi belum bisa hari ini?", "Inilah celah yang diisi Sundae. Jujur dan pilih beberapa.", "Pada keputusan operasi besar terakhir, sumber data apa yang digunakan?", "Pilih semua.", "Bagaimana Anda memproyeksikan pendapatan?", "Skenario what-if apa yang ingin Anda modelkan?", "Pilih semua.", "Apa blind spot terbesar Anda hari ini?", "Satu kalimat cukup. Sundae akan menandainya langsung di laporan.", "mis. \"Saya tidak tahu minggu lambat karena kompetitor atau musim.\"", "Sistem POS apa yang Anda gunakan?", "Pilih semua; grup multi-brand sering memakai beberapa.", "Tools ops lain apa yang saat ini Anda jalankan?", "Pilih semua.", "Jika bisa memperbaiki satu hal dalam 90 hari, apa itu?", "Jawaban Anda membentuk rencana 30/60/90 hari.", "mis. \"Menghapus kebocoran overtime di 8 outlet kami.\"", "Kapan ingin live dengan operations stack baru?", "Membentuk urgensi dan jalur Sundae yang tepat.", "Berapa lama membuat keputusan operasional bermakna hari ini?", "Dari sinyal ke aksi: mengukur lag yang dipangkas Sundae.", "Berapa investasi tahunan ops tech Anda saat ini? (software/SaaS saja)", "POS + analytics + scheduling + payroll + langganan BI. Jawaban tetap privat.", "Berapa orang internal menjalankan tech stack itu?", "Analis, developer BI / Power BI, data engineer, dan ops analyst yang menjaga laporan dan dashboard."],
      roles: ["CEO / Founder / Owner", "COO / Operations Director", "CFO / Finance Director", "Regional / Area Manager", "Pemilik franchise", "Head of People / HR", "Head of Marketing", "Head of Technology / Data", "General Manager", "Konsultan / Advisor", "Lainnya"],
      other: "Lainnya",
    },
    vi: {
      dimensions: ["Hồ sơ vận hành", "Nhân sự", "Trí tuệ quyết định", "Dự báo chiến lược", "Tech stack"],
      nav: ["Quay lại", "Tiếp", "Tiếp tục", "Bước cuối · Gần xong", "Tạo diagnostic của tôi", "Tùy chọn"],
      capture: ["Chúng tôi gửi diagnostic của bạn đến đâu?", "Sundae Operations Diagnostic cá nhân hóa đã sẵn sàng. Chúng tôi sẽ hiển thị ở màn hình tiếp theo và gửi bản sao cho đội ngũ.", "Các trường có * là bắt buộc. Thông tin chỉ thu một lần và dùng lại trong CTA diagnostic."],
      fields: ["Họ tên *", "Vai trò / Chức danh *", "Email công việc *", "Điện thoại (kèm mã quốc gia) *", "Quốc gia *", "Công ty *"],
      placeholders: ["Họ tên", "Chọn vai trò...", "ban@congty.com", "+971 50 123 4567", "Chọn quốc gia...", "Tập đoàn nhà hàng / thương hiệu"],
      question: ["Bạn vận hành những phân khúc nào?", "Chọn tất cả mục phù hợp. Phân khúc ảnh hưởng đến ưu tiên của Sundae.", "Bạn vận hành bao nhiêu cửa hàng?", "Doanh thu trung bình năm mỗi cửa hàng (AUV) khoảng bao nhiêu?", "Tùy chọn: làm rõ dải chi phí, tiết kiệm và EBITDA.", "Bạn vận hành ở đâu?", "Chọn tất cả khu vực.", "Hôm nay bạn xếp lịch thế nào?", "Chọn tất cả; nhiều operator dùng nhiều hệ thống.", "Chi phí lao động rò rỉ nhiều nhất ở đâu?", "Chọn tất cả mục phù hợp.", "Payroll liên quan quốc gia nào?", "Chọn tất cả; xác định country pack phù hợp.", "Bạn đang theo dõi KPI nào hôm nay?", "Chọn tất cả.", "KPI nào bạn muốn đo nhưng hiện chưa đo được?", "Đây là khoảng trống Sundae lấp đầy. Hãy chọn trung thực nhiều mục.", "Trong quyết định vận hành lớn gần nhất, bạn dùng nguồn dữ liệu nào?", "Chọn tất cả.", "Bạn dự báo doanh thu thế nào?", "Bạn muốn mô hình hóa kịch bản what-if nào?", "Chọn tất cả.", "Điểm mù lớn nhất của bạn hôm nay là gì?", "Một câu là đủ. Sundae sẽ nêu trực tiếp trong báo cáo.", "vd. \"Tôi không biết tuần chậm là do đối thủ hay mùa vụ.\"", "Bạn dùng hệ thống POS nào?", "Chọn tất cả; nhóm đa thương hiệu thường dùng nhiều hệ thống.", "Hiện bạn đang chạy công cụ ops nào khác?", "Chọn tất cả.", "Nếu sửa được một việc trong 90 ngày tới, đó là gì?", "Câu trả lời định hình kế hoạch 30/60/90 ngày.", "vd. \"Loại bỏ rò rỉ overtime trên 8 cửa hàng.\"", "Khi nào bạn muốn live với operations stack mới?", "Định hình độ khẩn cấp và lộ trình Sundae phù hợp.", "Hôm nay mất bao lâu để ra quyết định vận hành đáng kể?", "Từ tín hiệu đến hành động: đo độ trễ Sundae rút ngắn.", "Đầu tư ops tech hằng năm hiện tại là bao nhiêu? (chỉ software/SaaS)", "POS + analytics + scheduling + payroll + BI subscriptions. Câu trả lời được giữ riêng tư.", "Có bao nhiêu người nội bộ vận hành tech stack đó?", "Analyst, BI / Power BI developer, data engineer, ops analyst duy trì report và dashboard."],
      roles: ["CEO / Nhà sáng lập / Chủ sở hữu", "COO / Giám đốc vận hành", "CFO / Giám đốc tài chính", "Quản lý vùng / khu vực", "Chủ franchise", "Head of People / HR", "Head of Marketing", "Head of Technology / Data", "General Manager", "Consultant / Advisor", "Khác"],
      other: "Khác",
    },
    th: {
      dimensions: ["โปรไฟล์ปฏิบัติการ", "ทีมงาน", "ข่าวกรองการตัดสินใจ", "การมองล่วงหน้า", "เทคสแตก"],
      nav: ["กลับ", "ถัดไป", "ดำเนินการต่อ", "ขั้นตอนสุดท้าย · ใกล้เสร็จแล้ว", "สร้าง diagnostic ของฉัน", "ไม่บังคับ"],
      capture: ["ให้ส่ง diagnostic ไปที่ไหน?", "Sundae Operations Diagnostic แบบส่วนตัวของคุณพร้อมแล้ว เราจะแสดงในหน้าถัดไปและส่งสำเนาทางอีเมลให้ทีมคุณ.", "ช่องที่มี * จำเป็นต้องกรอก ข้อมูลจะถูกเก็บครั้งเดียวและใช้ซ้ำใน CTA ของ diagnostic."],
      fields: ["ชื่อเต็ม *", "บทบาท / ตำแหน่ง *", "อีเมลงาน *", "โทรศัพท์ (พร้อมรหัสประเทศ) *", "ประเทศ *", "บริษัท *"],
      placeholders: ["ชื่อเต็ม", "เลือกบทบาท...", "you@company.com", "+971 50 123 4567", "เลือกประเทศ...", "กลุ่มร้านอาหาร / แบรนด์"],
      question: ["คุณดำเนินธุรกิจในเซกเมนต์ใด?", "เลือกทั้งหมดที่เกี่ยวข้อง เซกเมนต์มีผลต่อสิ่งที่ Sundae ให้ความสำคัญ.", "คุณมีสาขากี่แห่ง?", "รายได้เฉลี่ยต่อสาขาต่อปี (AUV) ประมาณเท่าไร?", "ไม่บังคับ: ทำให้ช่วงต้นทุน การประหยัด และ EBITDA แม่นขึ้น.", "คุณดำเนินงานที่ไหน?", "เลือกทุกภูมิภาค.", "วันนี้คุณจัดตารางงานอย่างไร?", "เลือกทั้งหมด; ผู้ประกอบการจำนวนมากใช้หลายระบบ.", "ต้นทุนแรงงานรั่วไหลมากที่สุดตรงไหน?", "เลือกทั้งหมดที่เกี่ยวข้อง.", "Payroll เกี่ยวข้องกับประเทศใด?", "เลือกทั้งหมด; กำหนด country pack ที่เกี่ยวข้อง.", "วันนี้คุณติดตาม KPI ใดจริงจัง?", "เลือกทั้งหมด.", "KPI ใดที่อยากวัดแต่วันนี้ยังวัดไม่ได้?", "นี่คือช่องว่างที่ Sundae เติมเต็ม โปรดเลือกหลายข้ออย่างตรงไปตรงมา.", "การตัดสินใจปฏิบัติการครั้งสำคัญล่าสุดใช้แหล่งข้อมูลใด?", "เลือกทั้งหมด.", "คุณ forecast รายได้อย่างไร?", "อยากจำลอง what-if scenario ใด?", "เลือกทั้งหมด.", "blind spot ใหญ่ที่สุดวันนี้คืออะไร?", "หนึ่งประโยคก็พอ Sundae จะระบุไว้ในรายงาน.", "เช่น \"บอกไม่ได้ว่าสัปดาห์ที่ช้ามาจากคู่แข่งหรือฤดูกาล\"", "คุณใช้ระบบ POS ใด?", "เลือกทั้งหมด; กลุ่มหลายแบรนด์มักใช้หลายระบบ.", "ปัจจุบันใช้ ops tools อื่นใด?", "เลือกทั้งหมด.", "ถ้าแก้ได้หนึ่งเรื่องใน 90 วันข้างหน้า จะเป็นอะไร?", "คำตอบจะกำหนดแผน 30/60/90 วัน.", "เช่น \"กำจัด overtime leakage ใน 8 สาขา\"", "ต้องการ live ด้วย operations stack ใหม่เมื่อไร?", "กำหนดความเร่งด่วนและเส้นทาง Sundae ที่เหมาะสม.", "วันนี้ใช้เวลานานเท่าไรในการตัดสินใจปฏิบัติการที่สำคัญ?", "จากสัญญาณสู่การลงมือ: วัด lag ที่ Sundae ลดลง.", "การลงทุน ops tech ต่อปีปัจจุบันเท่าไร? (software/SaaS เท่านั้น)", "POS + analytics + scheduling + payroll + BI subscriptions. คำตอบเป็นส่วนตัว.", "มีคนภายในกี่คนดูแล tech stack นี้?", "Analysts, BI / Power BI developers, data engineers, ops analysts ที่ดูแล reports และ dashboards."],
      roles: ["CEO / Founder / Owner", "COO / Operations Director", "CFO / Finance Director", "Regional / Area Manager", "เจ้าของแฟรนไชส์", "Head of People / HR", "Head of Marketing", "Head of Technology / Data", "General Manager", "Consultant / Advisor", "อื่นๆ"],
      other: "อื่นๆ",
    },
    ms: {
      dimensions: ["Profil operasi", "Tenaga kerja", "Risikan keputusan", "Foresight", "Tech stack"],
      nav: ["Kembali", "Seterusnya", "Teruskan", "Langkah akhir · Hampir siap", "Jana diagnostik saya", "Pilihan"],
      capture: ["Ke mana kami perlu hantar diagnostik anda?", "Sundae Operations Diagnostic peribadi anda sudah sedia. Kami paparkan di skrin seterusnya dan e-mel salinan untuk pasukan anda.", "Medan bertanda * diperlukan. Maklumat diambil sekali di sini dan digunakan semula dalam CTA diagnostik."],
      fields: ["Nama penuh *", "Peranan / Jawatan *", "E-mel kerja *", "Telefon (dengan kod negara) *", "Negara *", "Syarikat *"],
      placeholders: ["Nama penuh", "Pilih peranan...", "anda@syarikat.com", "+971 50 123 4567", "Pilih negara...", "Kumpulan restoran / jenama"],
      question: ["Segmen apa yang anda kendalikan?", "Pilih semua yang berkenaan. Segmen mempengaruhi keutamaan Sundae.", "Berapa outlet anda kendalikan?", "Anggaran hasil tahunan purata setiap outlet (AUV) berapa?", "Pilihan: memperjelas julat kos, penjimatan dan EBITDA.", "Di mana anda beroperasi?", "Pilih semua rantau.", "Bagaimana anda jadualkan hari ini?", "Pilih semua; banyak operator guna beberapa sistem.", "Di mana kos buruh paling bocor?", "Pilih semua yang berkenaan.", "Payroll menyentuh negara mana?", "Pilih semua; menentukan country pack relevan.", "KPI mana yang anda pantau aktif hari ini?", "Pilih semua.", "KPI mana yang ingin diukur tetapi belum boleh hari ini?", "Ini jurang yang Sundae isi. Pilih beberapa dengan jujur.", "Dalam keputusan operasi besar terakhir, sumber data apa digunakan?", "Pilih semua.", "Bagaimana anda ramal hasil?", "Senario what-if apa ingin dimodelkan?", "Pilih semua.", "Apa blind spot terbesar hari ini?", "Satu ayat cukup. Sundae akan tandakan terus dalam laporan.", "cth. \"Saya tidak tahu minggu perlahan kerana pesaing atau musim.\"", "Sistem POS mana yang anda guna?", "Pilih semua; kumpulan multi-brand kerap guna beberapa.", "Ops tools lain apa sedang digunakan?", "Pilih semua.", "Jika boleh baiki satu perkara dalam 90 hari, apakah itu?", "Jawapan membentuk pelan 30/60/90 hari.", "cth. \"Hapuskan overtime leakage di 8 outlet kami.\"", "Bila mahu live dengan operations stack baharu?", "Membentuk urgensi dan laluan Sundae yang tepat.", "Berapa lama untuk keputusan operasi bermakna hari ini?", "Dari signal ke action: mengukur lag yang Sundae pendekkan.", "Pelaburan tahunan ops tech semasa berapa? (software/SaaS sahaja)", "POS + analytics + scheduling + payroll + BI subscriptions. Jawapan kekal peribadi.", "Berapa orang dalaman jalankan tech stack itu?", "Analysts, BI / Power BI developers, data engineers, ops analysts yang menjaga reports dan dashboards."],
      roles: ["CEO / Founder / Owner", "COO / Operations Director", "CFO / Finance Director", "Regional / Area Manager", "Pemilik francais", "Head of People / HR", "Head of Marketing", "Head of Technology / Data", "General Manager", "Consultant / Advisor", "Lain-lain"],
      other: "Lain-lain",
    },
  }[locale];

  return fromPack(locale, packs);
}

type LocalePack = {
  dimensions: string[];
  nav: string[];
  capture: string[];
  fields: string[];
  placeholders: string[];
  question: string[];
  roles: string[];
  other: string;
};

const countryRegionCodes: Record<(typeof countryValues)[number], string | null> = {
  "United Arab Emirates": "AE",
  "Saudi Arabia": "SA",
  Qatar: "QA",
  Kuwait: "KW",
  Bahrain: "BH",
  Oman: "OM",
  Egypt: "EG",
  "United States": "US",
  Canada: "CA",
  "United Kingdom": "GB",
  Netherlands: "NL",
  Germany: "DE",
  France: "FR",
  Spain: "ES",
  Italy: "IT",
  Singapore: "SG",
  Japan: "JP",
  Australia: "AU",
  India: "IN",
  Mexico: "MX",
  Brazil: "BR",
  "South Africa": "ZA",
  Other: null,
};

const regionCodes: Record<string, string | null> = {
  us: "US",
  canada: "CA",
  uk: "GB",
  ireland: "IE",
  uae: "AE",
  ksa: "SA",
  qatar: "QA",
  kuwait: "KW",
  bahrain: "BH",
  oman: "OM",
  egypt: "EG",
  india: "IN",
  japan: "JP",
  korea: "KR",
  mexico: "MX",
  brazil: "BR",
};

function getDisplayRegion(locale: WebsiteLocale, code: string): string {
  return new Intl.DisplayNames([locale], { type: "region" }).of(code) ?? code;
}

function buildCountryLabels(locale: WebsiteLocale, other: string): Record<(typeof countryValues)[number], string> {
  return Object.fromEntries(
    countryValues.map((country) => {
      const code = countryRegionCodes[country];
      return [country, code ? getDisplayRegion(locale, code) : other];
    }),
  ) as Record<(typeof countryValues)[number], string>;
}

const outletWords: Record<WebsiteLocale, { one: string; many: string; plus: string; under: string; unsure: string }> = {
  en: { one: "outlet", many: "outlets", plus: "+", under: "Under", unsure: "Not sure" },
  ar: { one: "فرع", many: "فروع", plus: "+", under: "أقل من", unsure: "غير متأكد" },
  fr: { one: "point de vente", many: "points de vente", plus: "+", under: "Moins de", unsure: "Je ne sais pas" },
  es: { one: "local", many: "locales", plus: "+", under: "Menos de", unsure: "No estoy seguro" },
  de: { one: "Standort", many: "Standorte", plus: "+", under: "Unter", unsure: "Nicht sicher" },
  nl: { one: "vestiging", many: "vestigingen", plus: "+", under: "Onder", unsure: "Niet zeker" },
  pt: { one: "unidade", many: "unidades", plus: "+", under: "Abaixo de", unsure: "Não tenho certeza" },
  hi: { one: "आउटलेट", many: "आउटलेट", plus: "+", under: "से कम", unsure: "पक्का नहीं" },
  ur: { one: "آؤٹ لیٹ", many: "آؤٹ لیٹس", plus: "+", under: "سے کم", unsure: "یقین نہیں" },
  it: { one: "punto vendita", many: "punti vendita", plus: "+", under: "Meno di", unsure: "Non so" },
  pl: { one: "lokal", many: "lokali", plus: "+", under: "Poniżej", unsure: "Nie wiem" },
  tr: { one: "şube", many: "şube", plus: "+", under: "Altında", unsure: "Emin değilim" },
  "zh-Hans": { one: "家门店", many: "家门店", plus: "+", under: "低于", unsure: "不确定" },
  ja: { one: "店舗", many: "店舗", plus: "+", under: "未満", unsure: "不明" },
  ko: { one: "매장", many: "매장", plus: "+", under: "미만", unsure: "잘 모르겠음" },
  id: { one: "outlet", many: "outlet", plus: "+", under: "Di bawah", unsure: "Tidak yakin" },
  vi: { one: "cửa hàng", many: "cửa hàng", plus: "+", under: "Dưới", unsure: "Không chắc" },
  ro: { one: "locație", many: "locații", plus: "+", under: "Sub", unsure: "Nu sunt sigur" },
  sv: { one: "enhet", many: "enheter", plus: "+", under: "Under", unsure: "Inte säker" },
  bn: { one: "আউটলেট", many: "আউটলেট", plus: "+", under: "এর কম", unsure: "নিশ্চিত নই" },
  th: { one: "สาขา", many: "สาขา", plus: "+", under: "ต่ำกว่า", unsure: "ไม่แน่ใจ" },
  ms: { one: "outlet", many: "outlet", plus: "+", under: "Bawah", unsure: "Tidak pasti" },
};

function makeOutletLabels(locale: WebsiteLocale): Record<string, string> {
  const words = outletWords[locale];
  return {
    "1": `1 ${words.one}`,
    "2_5": `2-5 ${words.many}`,
    "6_15": `6-15 ${words.many}`,
    "16_50": `16-50 ${words.many}`,
    "51_150": `51-150 ${words.many}`,
    "150_plus": `150${words.plus} ${words.many}`,
  };
}

function makeMoneyLabels(locale: WebsiteLocale, ranges: Record<string, string>): Record<string, string> {
  const words = outletWords[locale];
  return Object.fromEntries(
    Object.entries(ranges).map(([key, value]) => [
      key,
      key.startsWith("under_") ? `${words.under} ${value}` : value,
    ]),
  );
}

type OptionPack = {
  segment: string[];
  regionOther: string[];
  scheduling: string[];
  labor: string[];
  payroll: string[];
  kpisMeasured: string[];
  kpisWished: string[];
  decisionData: string[];
  forecasting: string[];
  scenarios: string[];
  opsTools: string[];
  timeline: string[];
  decisionLag: string[];
  headcount: string[];
};

const optionPacks: Partial<Record<WebsiteLocale, OptionPack>> = {
  es: {
    segment: ["QSR / Comida rápida", "Fast-casual", "Restaurante casual", "Alta cocina", "Cocina en la nube / Dark kitchen", "Hotel F&B", "Café / Panadería", "Bar / Vida nocturna", "Catering / Eventos", "Marca fantasma / virtual", "Franquicia / Master franquiciado"],
    regionOther: ["Europa occidental", "Europa nórdica", "Europa oriental", "África (otro)", "Sudeste Asiático", "China / Hong Kong", "Australia / Nueva Zelanda", "América Latina (otro)"],
    scheduling: ["Manual / Hojas de cálculo", "Herramienta interna / personalizada", "Integrado en POS", "Nada sistemático"],
    labor: ["Exceso de personal en horas lentas", "Ausencias / Bajas de última hora", "Fuga de horas extra", "Fichaje por compañeros / Robo de tiempo", "Errores de nómina", "Cumplimiento / Normativa", "Rotación / Recapacitación", "No es prioridad hoy"],
    payroll: ["Unión Europea", "Qatar / Baréin / Omán", "Otro (escribe abajo)"],
    kpisMeasured: ["% coste laboral", "% coste de alimentos", "Anulaciones / Invitaciones", "Ticket medio", "Upsell / Tasa de adjuntos", "Retención de clientes", "EBITDA por local", "Precisión del forecast", "Posición competitiva"],
    kpisWished: ["Margen en tiempo real por turno", "Fuga laboral por franja horaria", "Productividad laboral en tiempo real (ventas por hora laboral)", "Personal vs demanda en vivo (ritmo de staffing)", "Riesgo y fuga de horas extra en vivo", "RevPASH por franja (ingreso por asiento disponible hora)", "Variación de food cost por hora", "COGS teórico vs real", "Rentabilidad real por producto", "Matriz de ingeniería de menú (Estrellas / Caballos de batalla / Puzzles / Perros)", "Tasa de upsell por camarero", "Canibalización entre días / canales", "ROI de promociones por canal", "Margen por canal delivery (comisión de terceros)", "Valor de vida del cliente", "Curvas de retención por cohorte", "Predicción de no-show en reservas", "Merma de inventario por categoría", "Variación de caja e ingresos (detección de skim)", "Benchmark anónimo de pares", "Seguimiento de precios de competidores", "Forecast diario por local", "Eficiencia de scheduling vs demanda", "Puntuación cerrada decisión-resultado", "Insights de correlación entre módulos", "P&L consolidado multi-marca", "Deriva de cumplimiento / estándar de marca", "Preparación de nómina en tiempo real", "Velocidad de servicio / tiempos de ticket por estación", "Seguimiento de desperdicio y deterioro de alimentos", "Distribución de propinas y cumplimiento", "Sentimiento de clientes / tendencia de reseñas"],
    decisionData: ["Instinto / Experiencia", "Hoja de cálculo preparada por analista", "Reporte estándar POS", "Dashboard BI (Power BI / Tableau / Looker / Domo)", "Data warehouse interno / consultas SQL", "Consultor / asesor externo", "Herramienta AI (ChatGPT / Claude / Gemini)", "Reporte sectorial / estudio benchmark", "Paquete para consejo / liderazgo"],
    forecasting: ["Año pasado + intuición", "Modelo de hoja de cálculo interno", "Integrado en POS / contabilidad", "Herramienta BI con modelo personalizado", "Herramienta AI / forecasting dedicada", "No hacemos forecast formal"],
    scenarios: ["Abrir una nueva ubicación", "Impacto de cambio de menú / precios", "Impacto de promoción / descuento", "Cambio en modelo de staffing", "Impacto estacional / evento", "Entrada / salida de competidor", "Inflación / ley salarial / cambio fiscal"],
    opsTools: ["Scheduling de fuerza laboral", "Proveedor de nómina", "Compras / Inventario", "Gestor de agregadores delivery", "Reservas / Gestión de mesas", "CRM de clientes / Fidelización", "Herramienta BI (Power BI / Tableau / Looker)"],
    timeline: ["Ahora mismo - evaluando activamente", "Próximo trimestre", "Próximos 6 meses", "Antes de fin de año", "Solo explorando · Sin calendario"],
    decisionLag: ["Minutos - reaccionamos durante el turno", "Horas - el mismo día", "Días - ciclo semanal de revisión", "Semanas - cierre mensual", "Meses - solo revisión trimestral"],
    headcount: ["Nadie - no tenemos dedicados", "Fraccional / compartido con otras funciones", "1 persona", "2-3 personas", "4-8 personas", "9-20 personas", "20+ personas"],
  },
  de: {
    segment: ["QSR / Fast Food", "Fast Casual", "Casual Dining", "Fine Dining", "Cloud Kitchen / Dark Kitchen", "Hotel F&B", "Café / Bäckerei", "Bar / Nachtleben", "Catering / Events", "Ghost- / virtuelle Marke", "Franchise / Master-Franchisenehmer"],
    regionOther: ["Westeuropa", "Nordeuropa", "Osteuropa", "Afrika (andere)", "Südostasien", "China / Hongkong", "Australien / Neuseeland", "Lateinamerika (andere)"],
    scheduling: ["Manuell / Tabellen", "Internes / individuelles Tool", "In POS integriert", "Nichts Systematisches"],
    labor: ["Überbesetzung in ruhigen Zeitfenstern", "Nichterscheinen / kurzfristige Ausfälle", "Überstundenverluste", "Kollegenstempeln / Zeitdiebstahl", "Fehler in der Lohnabrechnung", "Compliance / gesetzliche Regeln", "Fluktuation / Nachschulung", "Heute kein Top-Thema"],
    payroll: ["Europäische Union", "Katar / Bahrain / Oman", "Andere (unten eintragen)"],
    kpisMeasured: ["Personalkosten %", "Wareneinsatz %", "Stornos / Gratisleistungen", "Durchschnittsbon", "Upsell / Attach Rate", "Gästeretention", "EBITDA pro Standort", "Prognosegenauigkeit", "Wettbewerbsposition"],
    kpisWished: ["Echtzeitmarge pro Schicht", "Personalkostenleck nach Tagesabschnitt", "Echtzeit-Arbeitsproduktivität (Umsatz pro Arbeitsstunde)", "Live-Personal vs Nachfrage", "Überstundenrisiko und -leck live", "RevPASH nach Tagesabschnitt", "Food-Cost-Abweichung pro Stunde", "Theoretische vs tatsächliche COGS-Abweichung", "Echte Profitabilität je Artikel", "Menü-Engineering-Matrix (Stars / Plowhorses / Puzzles / Dogs)", "Upsell-Rate je Servicekraft", "Kannibalisierung über Tage / Kanäle", "Promo-ROI nach Kanal", "Marge je Lieferkanal (Drittanbieterprovision)", "Customer Lifetime Value", "Kohorten-Retentionskurven", "No-show-Prognose für Reservierungen", "Inventurschwund nach Artikelkategorie", "Kassen- und Umsatzsicherungsabweichung", "Anonymer Peer-Benchmark", "Wettbewerberpreis-Tracking", "Tägliche Prognose pro Standort", "Planungseffizienz vs Nachfrage", "Closed-Loop-Scoring Entscheidung zu Ergebnis", "Korrelations-Insights über Module", "Konsolidierte Multi-Brand-P&L", "Compliance- / Markenstandard-Drift", "Echtzeit-Payroll-Readiness", "Servicegeschwindigkeit / Ticketzeiten je Station", "Tracking von Lebensmittelabfall und Verderb", "Trinkgeldverteilung und Compliance", "Gästestimmung / Review-Trends"],
    decisionData: ["Bauchgefühl / Erfahrung", "Vom Analysten gezogene Tabelle", "Standard-POS-Bericht", "BI-Dashboard (Power BI / Tableau / Looker / Domo)", "Internes Data Warehouse / SQL-Abfragen", "Externer Berater / Advisor", "AI-Tool (ChatGPT / Claude / Gemini)", "Branchenbericht / Benchmark-Studie", "Board- / Führungspaket"],
    forecasting: ["Vorjahr + Bauchgefühl", "Intern gepflegtes Tabellenmodell", "In POS / Buchhaltung integriert", "BI-Tool mit Custom-Modell", "Dediziertes AI- / Forecasting-Tool", "Wir forecasten nicht formal"],
    scenarios: ["Neuen Standort eröffnen", "Auswirkung von Menü- / Preisänderung", "Auswirkung von Promotion / Rabatt", "Änderung des Staffing-Modells", "Saison- / Eventauswirkung", "Markteintritt / Austritt eines Wettbewerbers", "Inflation / Lohngesetz / Steueränderung"],
    opsTools: ["Personaleinsatzplanung", "Payroll-Anbieter", "Einkauf / Inventar", "Manager für Lieferaggregatoren", "Reservierungen / Tischmanagement", "Gäste-CRM / Loyalty", "BI-Tool (Power BI / Tableau / Looker)"],
    timeline: ["Sofort - aktiv in Bewertung", "Nächstes Quartal", "Nächste 6 Monate", "Vor Jahresende", "Nur am Erkunden · Kein Zeitplan"],
    decisionLag: ["Minuten - wir reagieren in der Schicht", "Stunden - am selben Tag", "Tage - wöchentlicher Review-Zyklus", "Wochen - monatlicher Abschlusszyklus", "Monate - nur quartalsweise Review"],
    headcount: ["Niemand - keine dedizierte Person", "Teilweise / mit anderen Funktionen geteilt", "1 Person", "2-3 Personen", "4-8 Personen", "9-20 Personen", "20+ Personen"],
  },
};

function mapOptionPack(locale: WebsiteLocale, pack: LocalePack): Record<string, Record<string, string>> {
  if (locale === "hi" || locale === "ur" || locale === "bn") {
    return indicDiagnosticOptionPacks[locale];
  }

  if (locale === "zh-Hans" || locale === "ja" || locale === "ko" || locale === "id" || locale === "vi" || locale === "th" || locale === "ms") {
    return asiaDiagnosticOptionPacks[locale];
  }

  if (locale === "nl" || locale === "pt" || locale === "it" || locale === "pl" || locale === "tr" || locale === "ro" || locale === "sv") {
    return europeDiagnosticOptionPacks[locale];
  }

  const optionPack = optionPacks[locale];
  if (!optionPack) {
    return {
      scheduling_tool: { other: pack.other },
      payroll_regions: { other: pack.other },
      pos: { other: pack.other },
      budget_band: { unsure: outletWords[locale].unsure },
    };
  }

  const regionLabel = (value: string) => {
    const code = regionCodes[value];
    return code ? getDisplayRegion(locale, code) : value;
  };

  return {
    segment: mapValues(["qsr", "fast_casual", "casual", "fine_dining", "cloud", "hotel_fb", "cafe_bakery", "bar_nightlife", "catering", "ghost_brand", "franchise"], optionPack.segment),
    outlets: makeOutletLabels(locale),
    avg_unit_volume: makeMoneyLabels(locale, {
      under_500k: "$500K",
      "500k_1m": "$500K-1M",
      "1m_2m": "$1-2M",
      "2m_4m": "$2-4M",
      "4m_7m": "$4-7M",
      "7m_plus": "$7M+",
    }),
    region: {
      us: regionLabel("us"),
      canada: regionLabel("canada"),
      uk: regionLabel("uk"),
      ireland: regionLabel("ireland"),
      europe_west: optionPack.regionOther[0],
      europe_nord: optionPack.regionOther[1],
      europe_east: optionPack.regionOther[2],
      uae: regionLabel("uae"),
      ksa: regionLabel("ksa"),
      qatar: regionLabel("qatar"),
      kuwait: regionLabel("kuwait"),
      bahrain: regionLabel("bahrain"),
      oman: regionLabel("oman"),
      egypt: regionLabel("egypt"),
      africa: optionPack.regionOther[3],
      sea: optionPack.regionOther[4],
      india: regionLabel("india"),
      japan: regionLabel("japan"),
      korea: regionLabel("korea"),
      china_hk: optionPack.regionOther[5],
      anzac: optionPack.regionOther[6],
      mexico: regionLabel("mexico"),
      brazil: regionLabel("brazil"),
      latam_other: optionPack.regionOther[7],
    },
    scheduling_tool: {
      manual: optionPack.scheduling[0],
      internal: optionPack.scheduling[1],
      pos_built_in: optionPack.scheduling[2],
      none: optionPack.scheduling[3],
      other: pack.other,
    },
    labor_pain: mapValues(["overstaffing", "no_show", "ot_leakage", "buddy_punching", "payroll_errors", "compliance", "turnover", "none"], optionPack.labor),
    payroll_regions: {
      us: regionLabel("us"),
      canada: regionLabel("canada"),
      uk: regionLabel("uk"),
      eu: optionPack.payroll[0],
      uae: regionLabel("uae"),
      ksa: regionLabel("ksa"),
      qatar: optionPack.payroll[1],
      other: optionPack.payroll[2],
    },
    kpis_measured: mapValues(["labor_pct", "food_cost", "void_comp", "avg_check", "upsell", "guest_retention", "ebitda", "forecast_acc", "compset"], optionPack.kpisMeasured),
    kpis_wished: mapValues(["real_time_margin", "daypart_leak", "labor_productivity", "live_labor_vs_demand", "overtime_leakage", "daypart_revpash", "hourly_food_cost", "theoretical_actual", "item_profitability", "menu_engineering", "server_upsell", "cannibalization", "promo_roi", "delivery_margin", "guest_ltv", "cohort_retention", "noshow_prediction", "inventory_shrinkage", "cash_variance", "peer_benchmark", "competitor_pricing", "forecast_per_outlet", "scheduling_eff", "decision_replay", "cross_module", "multi_brand_pnl", "compliance_drift", "payroll_readiness", "speed_of_service", "food_waste", "gratuity_distribution", "guest_sentiment"], optionPack.kpisWished),
    decision_data: mapValues(["gut", "spreadsheet", "pos_report", "bi_dashboard", "in_house_data", "external", "ai_tool", "industry_report", "board_packet"], optionPack.decisionData),
    forecasting: mapValues(["lyear_gut", "spreadsheet", "pos_system", "bi_tool", "ai_tool", "none"], optionPack.forecasting),
    scenario_wish: mapValues(["new_location", "menu_change", "promo_impact", "staffing_model", "season_event", "competitor", "macro"], optionPack.scenarios),
    pos: { other: pack.other },
    ops_tools: mapValues(["scheduling", "payroll", "purchasing", "delivery", "reservations", "crm", "bi"], optionPack.opsTools),
    timeline: mapValues(["asap", "next_quarter", "next_6_months", "this_year", "exploring"], optionPack.timeline),
    decision_lag: mapValues(["minutes", "hours", "days", "weeks", "months"], optionPack.decisionLag),
    budget_band: {
      ...makeMoneyLabels(locale, {
        under_10k: "$10K",
        "10_25k": "$10-25K",
        "25_50k": "$25-50K",
        "50_100k": "$50-100K",
        "100_250k": "$100-250K",
        "250_500k": "$250-500K",
        "500k_1m": "$500K-1M",
        "1m_plus": "$1M+",
      }),
      unsure: outletWords[locale].unsure,
    },
    tech_headcount: mapValues(["none", "fractional", "one", "two_three", "four_eight", "nine_twenty", "twenty_plus"], optionPack.headcount),
  };
}

function mapValues(keys: string[], labels: string[]): Record<string, string> {
  return Object.fromEntries(keys.map((key, index) => [key, labels[index]]));
}

function fromPack(locale: WebsiteLocale, pack: LocalePack): LocaleOverrides {
  const questionText = {
    segment: { prompt: pack.question[0], helper: pack.question[1] },
    outlets: { prompt: pack.question[2] },
    avg_unit_volume: { prompt: pack.question[3], helper: pack.question[4] },
    region: { prompt: pack.question[5], helper: pack.question[6] },
    scheduling_tool: { prompt: pack.question[7], helper: pack.question[8] },
    labor_pain: { prompt: pack.question[9], helper: pack.question[10] },
    payroll_regions: { prompt: pack.question[11], helper: pack.question[12] },
    kpis_measured: { prompt: pack.question[13], helper: pack.question[14] },
    kpis_wished: { prompt: pack.question[15], helper: pack.question[16] },
    decision_data: { prompt: pack.question[17], helper: pack.question[18] },
    forecasting: { prompt: pack.question[19] },
    scenario_wish: { prompt: pack.question[20], helper: pack.question[21] },
    blind_spot: { prompt: pack.question[22], helper: pack.question[23], placeholder: pack.question[24] },
    pos: { prompt: pack.question[25], helper: pack.question[26] },
    ops_tools: { prompt: pack.question[27], helper: pack.question[28] },
    priority: { prompt: pack.question[29], helper: pack.question[30], placeholder: pack.question[31] },
    timeline: { prompt: pack.question[32], helper: pack.question[33] },
    decision_lag: { prompt: pack.question[34], helper: pack.question[35] },
    budget_band: { prompt: pack.question[36], helper: pack.question[37] },
    tech_headcount: { prompt: pack.question[38], helper: pack.question[39] },
  };

  return {
    dimensions: {
      profile: pack.dimensions[0],
      crew: pack.dimensions[1],
      core: pack.dimensions[2],
      foresight: pack.dimensions[3],
      tech: pack.dimensions[4],
    },
    navigation: {
      back: pack.nav[0],
      next: pack.nav[1],
      continue: pack.nav[2],
      finalStep: pack.nav[3],
      generate: pack.nav[4],
      optional: pack.nav[5],
    },
    capture: {
      title: pack.capture[0],
      helper: pack.capture[1],
      requiredNote: pack.capture[2],
      fields: {
        name: pack.fields[0],
        role: pack.fields[1],
        email: pack.fields[2],
        phone: pack.fields[3],
        country: pack.fields[4],
        company: pack.fields[5],
      },
      placeholders: {
        name: pack.placeholders[0],
        role: pack.placeholders[1],
        email: pack.placeholders[2],
        phone: pack.placeholders[3],
        country: pack.placeholders[4],
        company: pack.placeholders[5],
      },
    },
    roles: Object.fromEntries(roleValues.map((role, index) => [role, pack.roles[index]])) as Record<(typeof roleValues)[number], string>,
    countries: buildCountryLabels(locale, pack.other),
    questionText,
    optionLabels: mapOptionPack(locale, pack),
  };
}

export const diagnosticQuestionTranslations: Record<WebsiteLocale, DiagnosticCatalogCopy> = {
  en,
  ar: defineLocale(localizedText.ar),
  fr: defineLocale(localizedText.fr),
  es: defineLocale(localizedText.es),
  de: defineLocale(localizedText.de),
  nl: defineLocale(localizedText.nl),
  pt: defineLocale(localizedText.pt),
  hi: defineLocale(localizedText.hi),
  ur: defineLocale(localizedText.ur),
  it: defineLocale(localizedText.it),
  pl: defineLocale(localizedText.pl),
  tr: defineLocale(localizedText.tr),
  "zh-Hans": defineLocale(localizedText["zh-Hans"]),
  ja: defineLocale(localizedText.ja),
  ko: defineLocale(localizedText.ko),
  id: defineLocale(localizedText.id),
  vi: defineLocale(localizedText.vi),
  ro: defineLocale(localizedText.ro),
  sv: defineLocale(localizedText.sv),
  bn: defineLocale(localizedText.bn),
  th: defineLocale(localizedText.th),
  ms: defineLocale(localizedText.ms),
};

export function getDiagnosticCatalogCopy(locale: WebsiteLocale): DiagnosticCatalogCopy {
  return diagnosticQuestionTranslations[locale] ?? diagnosticQuestionTranslations.en;
}

export function getDiagnosticQuestionCopy(locale: WebsiteLocale, questionId: string): DiagnosticQuestionCopy | undefined {
  return getDiagnosticCatalogCopy(locale).questions[questionId] ?? diagnosticQuestionTranslations.en.questions[questionId];
}
