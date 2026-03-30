import type { SundaeIconName } from '@/components/icons';
import type { WebsiteLocale } from '@/lib/i18n';

export type FaqItem = {
  title: string;
  content: string;
};

type FaqSectionTemplate = {
  id: string;
  icon: SundaeIconName;
  faqs: FaqItem[];
};

export type LocalizedFaqSection = FaqSectionTemplate & {
  title: string;
};

const localizedFaqSections: Record<WebsiteLocale, FaqSectionTemplate[]> = {
  en: [
    {
      id: 'getting-started',
      icon: 'growth',
      faqs: [
        {
          title: 'What is Sundae?',
          content:
            'Sundae is a decision intelligence platform for restaurants and hospitality teams. It pulls scattered operating data into one place so leaders can see what happened, what is changing, and where to act next.',
        },
        {
          title: 'How do I get started?',
          content:
            'You have three options:\n\n1. **Start Free** - Sign up for Report Lite (free forever) and upload your operational data to see instant benchmarking. No credit card required.\n\n2. **See Your Pricing** - Use our interactive pricing calculator at pricing.sundae.io to see exact pricing for your operation.\n\n3. **Book a Demo** - Schedule a 15-minute walkthrough with our team to see Sundae in action with your data.',
        },
        {
          title: 'Is there really a free tier?',
          content:
            'Yes. Report Lite is free forever. Upload your POS data and get instant benchmarking against 5 core metrics. Fair-use policy applies for reasonable operational usage.',
        },
        {
          title: "What's the difference between Report and Core?",
          content:
            '**Report Tier** = Historical analysis (POS data)\n• Upload POS data daily, weekly, or monthly\n• Analyze what happened\n• Benchmark against peers\n• Best for a single location or proof of concept\n\n**Core Tier** = Real-time operations (POS + all systems)\n• 2-4 hour refresh cycles\n• Integrates POS + labor + inventory + marketing + reservations\n• See what is happening now\n• Get predictive alerts\n• Best for multi-location operators\n\nKey difference: Report = POS only. Core = POS plus the rest of your stack.',
        },
        {
          title: 'Do I need a long-term contract?',
          content:
            'No. Report and Core tiers are month to month. Cancel anytime without penalty. Enterprise deployments typically use annual agreements with custom terms.',
        },
      ],
    },
    {
      id: 'products-tiers',
      icon: 'data',
      faqs: [
        {
          title: 'What products does Sundae offer?',
          content:
            '**Three main products:**\n\n1. **Sundae Report** (Lite / Plus / Pro) - Historical analysis and benchmarking\n2. **Sundae Core** (Lite / Pro / Enterprise) - Real-time operations and predictive intelligence\n3. **Watchtower** (Competitive / Event / Market) - External market intelligence\n\n**Plus:**\n\n4. **Modules** - Labor, Inventory, Purchasing, Marketing, and Reservations intelligence.',
        },
        {
          title: 'Which tier should I choose?',
          content:
            '**Start with Report Lite if:**\n• You are testing Sundae\n• You run 1-2 locations\n• Daily or weekly reporting is enough\n\n**Upgrade to Report Plus or Pro if:**\n• You need deeper historical intelligence\n• Daily reporting is still enough\n\n**Choose Core Lite or Pro if:**\n• You run 10+ locations\n• You need operational speed\n• Real-time budget tracking matters\n\n**Choose Enterprise if:**\n• You have 100+ locations\n• You need SSO or white-label capabilities\n• You require dedicated support and custom terms',
        },
        {
          title: 'Can I upgrade or downgrade later?',
          content:
            'Yes. You can move between tiers at any time. Historical data is preserved and there are no penalties for changing plans.',
        },
        {
          title: "What's the 4D Intelligence Model?",
          content:
            "Sundae's framework for decision intelligence:\n\n**1D: What Happened** - Sales, labor, and cost truth\n**2D: Plan vs Actual** - Budget and forecast variance\n**3D: Market Context** - Benchmarks, peers, and competitors\n**4D: What's Next** - Predictions and recommendations\n\n**Report:** Full 1D and 2D plus limited 3D and 4D\n**Core:** Full access across all 4 dimensions",
        },
      ],
    },
    {
      id: 'data-integration',
      icon: 'integration',
      faqs: [
        {
          title: 'What data does Sundae need?',
          content:
            '**Minimum for Report Lite:**\n• POS sales data (CSV export)\n\n**For Core:**\n• POS system via API\n• Labor or workforce system\n• Inventory system\n• Marketing platforms\n• Reservations system\n\nReport is built around POS uploads. Core is where you connect the broader operating stack.',
        },
        {
          title: 'How do I get my data into Sundae?',
          content:
            '**Report Lite:** Manual CSV upload\n\n**Report Plus:** Upload PDFs, Excel files, or screenshots. Sundae extracts the data and you review it before processing.\n\n**Report Pro and Core:** Automated ingestion through API connections',
        },
        {
          title: 'What POS systems do you integrate with?',
          content:
            "Sundae currently supports **4 POS platforms** with live adapters: Oracle MICROS Simphony, Square, Toast, and Clover. We also support **direct database connectors** for PostgreSQL and SQL Server / Azure SQL when a POS system exposes database access.\n\nBeyond POS, Sundae's **12-domain integration engine** connects to 30+ vendors across labor, inventory, reservations, delivery, marketing, guest experience, CRM, and accounting.\n\nIf you do not see your system listed, Enterprise tier can include custom integration work and webhook-based ingestion.",
        },
        {
          title: 'Can I use Sundae with multiple POS systems?',
          content:
            '**Core Lite:** Best when all locations use one POS\n\n**Core Pro and Enterprise:** Yes. Different POS systems across locations are supported, and Sundae normalizes the data for apples-to-apples comparison.\n\n**Report:** Any POS works because uploads are manual.',
        },
        {
          title: 'How long does implementation take?',
          content:
            '**Report Lite:** Immediate after upload\n**Report Plus / Pro:** 1-2 days\n**Core Lite / Pro:** 1-2 weeks\n**Enterprise:** 2-4 weeks depending on scope',
        },
        {
          title: 'What happens to my data if I cancel?',
          content:
            'Historical data stays available for export. If you return later, your prior data can still be restored according to your plan and retention terms.',
        },
      ],
    },
    {
      id: 'modules',
      icon: 'network',
      faqs: [
        {
          title: 'What are modules?',
          content:
            'Modules are specialized intelligence add-ons for Core:\n\n1. **Labor Intelligence** - Scheduling, productivity, and overtime\n2. **Inventory Intelligence** - Waste, par levels, and stock visibility\n3. **Purchasing Intelligence** - Vendor comparison and contract leverage\n4. **Marketing Intelligence** - ROI, CAC, and channel performance\n5. **Reservations Intelligence** - No-show prediction and table optimization\n\nModules require Core because they depend on live, connected operating data.',
        },
        {
          title: 'Do I need modules?',
          content:
            'No. Modules are optional. Add them when you want deeper coverage in a specific operating area.\n\n**Path:**\n• On Report -> upgrade to Core first\n• On Core -> add modules whenever the need is clear',
        },
        {
          title: 'Do I need Core for modules?',
          content:
            'Yes. Modules require Core Lite, Core Pro, or Enterprise.\n\nThey rely on live connections to labor, inventory, marketing, reservations, and other systems that Report does not connect directly.',
        },
        {
          title: 'Can I add multiple modules?',
          content:
            'Yes. Mix and match any of the five modules. There is no requirement to buy all of them together.',
        },
        {
          title: 'Which module should I choose first?',
          content:
            'Start with the biggest operating pain point:\n\n• High labor cost -> Labor Intelligence\n• Waste or stock issues -> Inventory Intelligence\n• Weak vendor leverage -> Purchasing Intelligence\n• Unclear marketing ROI -> Marketing Intelligence\n• Reservation no-shows -> Reservations Intelligence',
        },
        {
          title: 'How does module pricing work?',
          content:
            'Each module includes an organization license that covers the first 5 locations, plus additional location pricing beyond that threshold.\n\nExample: 8 locations with Labor Intelligence = 1 org license + 3 additional locations.\n\nUse pricing.sundae.io for exact plan math.',
        },
      ],
    },
    {
      id: 'watchtower',
      icon: 'watchtower',
      faqs: [
        {
          title: 'What is Watchtower?',
          content:
            'Watchtower is the external side of Sundae. It helps teams understand what is happening beyond the four walls:\n\n1. **Competitive Intelligence** - Track up to 10 competitors per location\n2. **Event Intelligence** - Weather, holidays, and local events\n3. **Market Intelligence** - Category trends and economic indicators',
        },
        {
          title: 'Do I need Watchtower?',
          content:
            'It is optional, but high leverage if:\n• You operate in competitive markets\n• Competitor pricing affects demand\n• Weather or events shift traffic\n• You are planning expansion or trade-area moves',
        },
        {
          title: 'How many competitors can I track?',
          content:
            'Up to 10 competitors per location. Each location can track a different competitor set.\n\nExample: 5 locations = up to 50 competitors monitored.',
        },
        {
          title: 'Can I use only one Watchtower component?',
          content:
            'Yes. You can buy Competitive Intelligence, Event Intelligence, or Market Intelligence individually, or combine them.',
        },
        {
          title: 'Does Watchtower require Core?',
          content:
            'Yes. Watchtower works best when its market signals are layered directly onto live operating data, which is what Core provides.\n\nIf you only need uploaded historical POS analysis, Report is enough. If you want market context tied to day-to-day operations, move to Core.',
        },
      ],
    },
    {
      id: 'pricing-billing',
      icon: 'cost',
      faqs: [
        {
          title: 'How much does Sundae cost?',
          content:
            'Pricing depends on:\n• Report vs Core\n• Number of locations\n• Modules selected\n• Whether Watchtower is included\n\n**Report Lite:** Free forever\n\nFor precise pricing, use pricing.sundae.io.',
        },
        {
          title: 'Are there setup fees?',
          content:
            'No. Sundae does not charge separate setup fees for standard onboarding and integration.',
        },
        {
          title: 'What currencies do you accept?',
          content:
            'Major billing currencies are supported, and pricing can be presented in the currency that best matches your operation.',
        },
        {
          title: 'Is there an annual discount?',
          content:
            'Yes. Annual prepayment typically reduces total cost compared to month-to-month billing. The exact discount depends on plan and scope.',
        },
        {
          title: 'What payment methods do you accept?',
          content:
            '• Credit card\n• ACH or bank transfer\n• Wire transfer for larger accounts\n• Purchase orders for approved Enterprise customers',
        },
      ],
    },
    {
      id: 'features',
      icon: 'speed',
      faqs: [
        {
          title: 'How do intelligence credits work?',
          content:
            'Intelligence credits power questions, analyses, and recommendations.\n\n**Report Lite:** 250 base + 80 per location\n**Report Plus:** 1,200 base + 300 per location\n**Report Pro:** 3,500 base + 800 per location\n**Core Lite:** 8,000 base + 1,600 per location\n**Core Pro:** 14,000 base + 2,800 per location\n**Enterprise:** 50,000+ base + custom allocation',
        },
        {
          title: 'How much historical access do I get?',
          content:
            '**Report Lite:** 90 days\n**Report Plus:** 1 year\n**Report Pro:** 2 years\n**Core Lite:** 2 years\n**Core Pro:** 3 years\n**Enterprise:** 5+ years or custom retention',
        },
        {
          title: 'How often does data refresh?',
          content:
            '**Report Lite:** Manual uploads\n**Report Plus:** Manual or smart-parsed on demand\n**Report Pro:** Daily automated refresh\n**Core Lite:** Every 4 hours\n**Core Pro:** Every 2 hours\n**Enterprise:** Custom cadence, including real time when scoped',
        },
        {
          title: 'Do I get custom dashboards?',
          content:
            '**Report tiers:** Prebuilt dashboards\n**Core Lite:** Up to 30 custom dashboards\n**Core Pro:** Up to 75 custom dashboards\n**Enterprise:** Unlimited custom dashboards',
        },
      ],
    },
    {
      id: 'support',
      icon: 'conversation',
      faqs: [
        {
          title: 'What support do I get?',
          content:
            '**Report Lite:** Email support\n**Report Plus:** Email and chat\n**Report Pro:** Priority support\n**Core Lite:** Email, chat, and phone\n**Core Pro:** Faster priority phone support\n**Enterprise:** 24/7 support plus a dedicated customer success lead',
        },
        {
          title: 'Do you provide training?',
          content:
            'Yes.\n\n**Report:** Self-service onboarding and documentation\n**Core Lite:** Guided training sessions\n**Core Pro:** Custom training program\n**Enterprise:** Structured onboarding and enablement',
        },
        {
          title: 'What time zones do you support?',
          content:
            'Sundae supports global teams across major time zones, and support coverage is aligned to the geography and support level in your plan.',
        },
      ],
    },
    {
      id: 'security',
      icon: 'quality',
      faqs: [
        {
          title: 'Is my data secure?',
          content:
            'Yes. Sundae uses enterprise-grade controls:\n• AES-256 encryption at rest\n• TLS encryption in transit\n• Role-based access controls\n• Regular security reviews\n• GDPR-aligned handling\n• Additional security controls for Enterprise customers',
        },
        {
          title: 'Can I control who sees which data?',
          content:
            'Yes. Role management supports admin, manager, and viewer permissions, with custom role patterns available for more complex Enterprise needs.',
        },
        {
          title: 'Do you offer SSO?',
          content:
            'Yes. SSO and SAML are available for Enterprise deployments.',
        },
      ],
    },
    {
      id: 'enterprise',
      icon: 'franchise',
      faqs: [
        {
          title: 'What makes Enterprise different?',
          content:
            'Enterprise adds:\n• White-label options\n• Dedicated support and success coverage\n• Contractual SLAs\n• SSO / SAML\n• Security and compliance support\n• Custom machine learning and data workflows\n• Higher credit allocations\n• Extended retention',
        },
        {
          title: 'Do I need 100+ locations for Enterprise?',
          content:
            'No. Enterprise is also the right tier when your requirements are driven by SSO, compliance, white-label needs, custom terms, or complex operational structure.',
        },
        {
          title: 'How do I get Enterprise pricing?',
          content:
            'Enterprise pricing is scoped around features, location count, data requirements, security expectations, and support model. Contact sales for a custom quote.',
        },
      ],
    },
    {
      id: 'comparisons',
      icon: 'balance',
      faqs: [
        {
          title: 'How is Sundae different from POS reporting?',
          content:
            '**POS reports:** One system, limited context, manual interpretation\n\n**Sundae Report:** POS analysis plus benchmarks, recommendations, and pattern detection\n\n**Sundae Core:** Everything in Report plus unified data from labor, inventory, marketing, reservations, and other systems with faster refresh',
        },
        {
          title: 'How is Sundae different from Excel?',
          content:
            '**Excel:** Manual entry, static analysis, no shared intelligence layer\n\n**Sundae:** Automated ingestion, structured benchmarking, live dashboards, and recommendations that reduce manual analysis time every week',
        },
        {
          title: 'How much can I save versus legacy analytics tools?',
          content:
            'Operators often report materially lower total cost because Sundae uses tier-based pricing instead of stacking per-module and per-location fees. The exact savings depend on your current tool mix and operating scope.',
        },
      ],
    },
    {
      id: 'use-cases',
      icon: 'search',
      faqs: [
        {
          title: 'I only have one location. Is Sundae still a fit?',
          content:
            'Yes. Start with Report Lite for free benchmarking, then move into deeper Report tiers or Core if your operation needs more speed and intelligence.',
        },
        {
          title: "I'm a franchise platform. Can Sundae help?",
          content:
            'Yes. Sundae can support:\n• Franchisor visibility across the network\n• Franchisee-specific access controls\n• White-label reporting\n• Benchmarking across the system\n• Territory and expansion analysis',
        },
        {
          title: 'I run cloud kitchens. Does Sundae work for delivery-first operations?',
          content:
            'Yes. Sundae connects delivery platforms and supports analytics for virtual brands, channel performance, labor efficiency, and attribution across delivery-heavy operations.',
        },
        {
          title: "We're planning to expand. Can Sundae help?",
          content:
            'Yes. Watchtower and market intelligence can support trade-area analysis, saturation review, competitor movement tracking, and prioritization of underserved territories.',
        },
      ],
    },
  ],
  ar: [
    {
      id: 'getting-started',
      icon: 'growth',
      faqs: [
        {
          title: 'ما هو Sundae؟',
          content:
            'Sundae منصة ذكاء قرار للمطاعم وفرق الضيافة. تجمع البيانات التشغيلية المتفرقة في مكان واحد حتى يتمكن القادة من فهم ما حدث وما الذي يتغير وأين يجب التدخل بعد ذلك.',
        },
        {
          title: 'كيف أبدأ؟',
          content:
            'لديك ثلاثة خيارات:\n\n1. **ابدأ مجانًا** - سجّل في Report Lite وارفع بيانات التشغيل لتحصل على مقارنة مرجعية فورية. لا حاجة لبطاقة ائتمان.\n\n2. **اعرف سعرك** - استخدم حاسبة التسعير التفاعلية في pricing.sundae.io لمعرفة السعر المناسب لعمليتك.\n\n3. **احجز عرضًا** - احجز جولة قصيرة مع الفريق لرؤية Sundae باستخدام بياناتك.',
        },
        {
          title: 'هل توجد باقة مجانية فعلًا؟',
          content:
            'نعم. Report Lite مجاني دائمًا. ارفع بيانات نقطة البيع لتحصل على مقارنة فورية عبر 5 مؤشرات أساسية. تطبق سياسة استخدام عادل على الاستخدام التشغيلي المعقول.',
        },
        {
          title: 'ما الفرق بين Report و Core؟',
          content:
            '**طبقة Report** = تحليل تاريخي لبيانات POS\n• رفع يومي أو أسبوعي أو شهري\n• فهم ما حدث\n• المقارنة مع النظراء\n• مناسبة للموقع الواحد أو لإثبات الجدوى\n\n**طبقة Core** = عمليات لحظية عبر جميع الأنظمة\n• تحديث كل 2-4 ساعات\n• يربط POS والعمالة والمخزون والتسويق والحجوزات\n• يوضح ما يحدث الآن\n• يوفر تنبيهات تنبؤية\n• مناسب للمشغلين متعددي المواقع\n\nالفرق الأساسي: Report لبيانات POS فقط، بينما Core يضيف بقية منظومتك التشغيلية.',
        },
        {
          title: 'هل أحتاج إلى عقد طويل الأجل؟',
          content:
            'لا. باقات Report وCore شهرية ويمكن إلغاؤها في أي وقت دون غرامة. أما حالات Enterprise فعادةً ما تستخدم اتفاقيات سنوية بشروط مخصصة.',
        },
      ],
    },
    {
      id: 'products-tiers',
      icon: 'data',
      faqs: [
        {
          title: 'ما المنتجات التي يقدمها Sundae؟',
          content:
            '**ثلاثة منتجات رئيسية:**\n\n1. **Sundae Report** (Lite / Plus / Pro) - تحليل تاريخي ومقارنة مرجعية\n2. **Sundae Core** (Lite / Pro / Enterprise) - عمليات فورية وذكاء تنبؤي\n3. **Watchtower** - ذكاء سوق خارجي\n\n**بالإضافة إلى ذلك:**\n\n4. **الوحدات** - ذكاء متخصص للعمالة والمخزون والمشتريات والتسويق والحجوزات.',
        },
        {
          title: 'أي طبقة تناسبني؟',
          content:
            '**ابدأ مع Report Lite إذا:**\n• كنت تختبر Sundae\n• لديك 1-2 موقع\n• تكفيك تقارير يومية أو أسبوعية\n\n**انتقل إلى Report Plus أو Pro إذا:**\n• كنت تحتاج تحليلًا تاريخيًا أعمق\n• ولا تزال السرعة اللحظية غير ضرورية\n\n**اختر Core Lite أو Pro إذا:**\n• لديك 10 مواقع أو أكثر\n• تحتاج سرعة تشغيلية أعلى\n• وتحتاج تتبعًا حيًا للميزانية والهوامش\n\n**اختر Enterprise إذا:**\n• لديك 100+ موقع\n• تحتاج SSO أو white-label\n• أو تحتاج دعمًا وشروطًا مخصصة',
        },
        {
          title: 'هل يمكنني الترقية أو التخفيض لاحقًا؟',
          content:
            'نعم. يمكنك الانتقال بين الطبقات في أي وقت مع الحفاظ على بياناتك التاريخية، ولا توجد غرامات عند تغيير الخطة.',
        },
        {
          title: 'ما هو نموذج الذكاء رباعي الأبعاد 4D؟',
          content:
            'هذا هو إطار Sundae لفهم القرار:\n\n**1D: ماذا حدث** - المبيعات والعمالة والتكلفة\n**2D: الخطة مقابل الواقع** - الميزانية والتوقعات مقابل النتائج\n**3D: سياق السوق** - المعايير المرجعية والنظراء والمنافسون\n**4D: ماذا بعد** - التوقعات والتوصيات\n\n**Report:** يغطي 1D و2D بالكامل مع جزء محدود من 3D و4D\n**Core:** يغطي الأبعاد الأربعة بالكامل',
        },
      ],
    },
    {
      id: 'data-integration',
      icon: 'integration',
      faqs: [
        {
          title: 'ما البيانات التي يحتاجها Sundae؟',
          content:
            '**الحد الأدنى لـ Report Lite:**\n• بيانات مبيعات POS بصيغة CSV\n\n**لـ Core:**\n• نظام POS عبر API\n• نظام العمالة أو الجداول\n• نظام المخزون\n• منصات التسويق\n• نظام الحجوزات\n\nReport مبني حول رفع بيانات POS. أما Core فهو الطبقة التي تربط بقية أنظمتك التشغيلية.',
        },
        {
          title: 'كيف أوصل بياناتي إلى Sundae؟',
          content:
            '**Report Lite:** رفع CSV يدويًا\n\n**Report Plus:** رفع PDF أو Excel أو لقطات شاشة، ويستخرج Sundae البيانات ثم تراجعها قبل المعالجة.\n\n**Report Pro وCore:** ربط تلقائي عبر واجهات API',
        },
        {
          title: 'ما أنظمة POS التي تتكاملون معها؟',
          content:
            'يدعم Sundae حاليًا **4 منصات POS مباشرة**: Oracle MICROS Simphony وSquare وToast وClover. كما ندعم **موصلات قواعد البيانات المباشرة** لـ PostgreSQL وSQL Server / Azure SQL عندما يتيح النظام ذلك.\n\nإلى جانب POS، يربط محرك التكامل ذو **12 مجالًا** أكثر من 30 مزودًا عبر العمالة والمخزون والحجوزات والتوصيل والتسويق وتجربة الضيف وCRM والمحاسبة.\n\nإذا لم تجد نظامك، يمكن لطبقة Enterprise أن تشمل تكاملًا مخصصًا أو إدخالًا عبر webhooks.',
        },
        {
          title: 'هل يمكنني استخدام أكثر من نظام POS؟',
          content:
            '**Core Lite:** الأنسب عندما تستخدم كل المواقع النظام نفسه\n\n**Core Pro وEnterprise:** نعم. يمكن دعم أنظمة POS مختلفة عبر المواقع، ويقوم Sundae بتوحيد البيانات للمقارنة العادلة.\n\n**Report:** يعمل مع أي POS لأن الرفع يدوي.',
        },
        {
          title: 'كم يستغرق التنفيذ؟',
          content:
            '**Report Lite:** فوري بعد الرفع\n**Report Plus / Pro:** من يوم إلى يومين\n**Core Lite / Pro:** من أسبوع إلى أسبوعين\n**Enterprise:** من أسبوعين إلى أربعة أسابيع حسب النطاق',
        },
        {
          title: 'ماذا يحدث لبياناتي إذا ألغيت الاشتراك؟',
          content:
            'تبقى البيانات التاريخية قابلة للتصدير، ويمكن استعادتها لاحقًا عند العودة وفقًا للخطة وسياسة الاحتفاظ بالبيانات.',
        },
      ],
    },
    {
      id: 'modules',
      icon: 'network',
      faqs: [
        {
          title: 'ما هي الوحدات؟',
          content:
            'الوحدات هي إضافات ذكاء متخصصة تعمل فوق Core:\n\n1. **ذكاء العمالة** - الجداول والإنتاجية والعمل الإضافي\n2. **ذكاء المخزون** - الهدر وحدود الطلب والرؤية المخزنية\n3. **ذكاء المشتريات** - مقارنة الموردين وشروط العقود\n4. **ذكاء التسويق** - العائد وCAC وأداء القنوات\n5. **ذكاء الحجوزات** - التنبؤ بعدم الحضور وتحسين الطاولات\n\nتتطلب الوحدات Core لأنها تعتمد على بيانات تشغيلية حية ومتصلة.',
        },
        {
          title: 'هل أحتاج إلى الوحدات؟',
          content:
            'ليس بالضرورة. الوحدات اختيارية، وتضيفها عندما تحتاج عمقًا أكبر في مجال تشغيلي محدد.\n\n**المسار:**\n• إذا كنت على Report -> انتقل أولًا إلى Core\n• إذا كنت على Core -> أضف الوحدات عند وضوح الحاجة',
        },
        {
          title: 'هل أحتاج إلى Core لاستخدام الوحدات؟',
          content:
            'نعم. الوحدات تتطلب Core Lite أو Core Pro أو Enterprise لأنها تعتمد على ربط مباشر لأنظمة العمالة والمخزون والتسويق والحجوزات وغيرها.',
        },
        {
          title: 'هل يمكنني إضافة أكثر من وحدة؟',
          content:
            'نعم. يمكنك الجمع بين أي عدد من الوحدات الخمس، ولا يوجد إلزام بشراء المجموعة كاملة.',
        },
        {
          title: 'أي وحدة أبدأ بها؟',
          content:
            'ابدأ بأكبر نقطة ألم تشغيلية لديك:\n\n• تكلفة عمالة مرتفعة -> ذكاء العمالة\n• هدر أو مشاكل مخزون -> ذكاء المخزون\n• ضعف في شروط الموردين -> ذكاء المشتريات\n• عائد تسويقي غير واضح -> ذكاء التسويق\n• غياب متكرر للحجوزات -> ذكاء الحجوزات',
        },
        {
          title: 'كيف يعمل تسعير الوحدات؟',
          content:
            'كل وحدة تشمل ترخيصًا على مستوى المؤسسة يغطي أول 5 مواقع، ثم تسعيرًا إضافيًا للمواقع التي تتجاوز ذلك.\n\nمثال: 8 مواقع مع ذكاء العمالة = ترخيص مؤسسة + 3 مواقع إضافية.\n\nللتسعير الدقيق استخدم pricing.sundae.io.',
        },
      ],
    },
    {
      id: 'watchtower',
      icon: 'watchtower',
      faqs: [
        {
          title: 'ما هو Watchtower؟',
          content:
            'Watchtower هو الطبقة الخارجية في Sundae، ويساعد الفرق على فهم ما يحدث خارج جدران المطعم:\n\n1. **الذكاء التنافسي** - تتبع حتى 10 منافسين لكل موقع\n2. **ذكاء الأحداث** - الطقس والعطل والفعاليات المحلية\n3. **ذكاء السوق** - اتجاهات الفئات والمؤشرات الاقتصادية',
        },
        {
          title: 'هل أحتاج إلى Watchtower؟',
          content:
            'هو اختياري، لكنه عالي الأثر إذا:\n• كنت تعمل في أسواق تنافسية\n• كان تسعير المنافسين يؤثر في الطلب\n• كانت الأحداث أو الأحوال الجوية تغير الحركة\n• كنت تخطط للتوسع أو تحليل المناطق',
        },
        {
          title: 'كم منافسًا يمكنني تتبعه؟',
          content:
            'حتى 10 منافسين لكل موقع، ويمكن لكل موقع أن يتابع مجموعة مختلفة من المنافسين.\n\nمثال: 5 مواقع = حتى 50 منافسًا تتم متابعتهم.',
        },
        {
          title: 'هل يمكنني شراء جزء واحد فقط من Watchtower؟',
          content:
            'نعم. يمكنك شراء الذكاء التنافسي أو ذكاء الأحداث أو ذكاء السوق بشكل منفصل، أو جمعها معًا.',
        },
        {
          title: 'هل يتطلب Watchtower طبقة Core؟',
          content:
            'نعم. يعمل Watchtower بأفضل صورة عندما توضع إشارات السوق فوق بيانات التشغيل الحية، وهذا ما توفره Core.\n\nإذا كنت تحتاج فقط إلى تحليل تاريخي لبيانات POS، فقد يكفيك Report. أما إذا كنت تريد ربط السياق الخارجي بالعمليات اليومية، فانتقل إلى Core.',
        },
      ],
    },
    {
      id: 'pricing-billing',
      icon: 'cost',
      faqs: [
        {
          title: 'كم تكلفة Sundae؟',
          content:
            'يعتمد التسعير على:\n• Report أم Core\n• عدد المواقع\n• الوحدات المختارة\n• هل تمت إضافة Watchtower أم لا\n\n**Report Lite:** مجاني دائمًا\n\nولمعرفة السعر الدقيق استخدم pricing.sundae.io.',
        },
        {
          title: 'هل توجد رسوم إعداد؟',
          content:
            'لا. لا يفرض Sundae رسوم إعداد منفصلة لعمليات التهيئة والربط القياسية.',
        },
        {
          title: 'ما العملات التي تقبلونها؟',
          content:
            'ندعم العملات الرئيسية ويمكن عرض الفوترة بالعملة الأنسب لعمليتك.',
        },
        {
          title: 'هل يوجد خصم سنوي؟',
          content:
            'نعم. الدفع السنوي يقلل التكلفة الإجمالية عادةً مقارنة بالدفع الشهري. ويعتمد الخصم الدقيق على الخطة والنطاق.',
        },
        {
          title: 'ما وسائل الدفع المقبولة؟',
          content:
            '• بطاقات الائتمان\n• التحويل البنكي أو ACH\n• الحوالات للحسابات الأكبر\n• أوامر الشراء لعملاء Enterprise المعتمدين',
        },
      ],
    },
    {
      id: 'features',
      icon: 'speed',
      faqs: [
        {
          title: 'كيف تعمل أرصدة الذكاء؟',
          content:
            'تُستخدم أرصدة الذكاء في الأسئلة والتحليلات والتوصيات.\n\n**Report Lite:** 250 أساسي + 80 لكل موقع\n**Report Plus:** 1,200 أساسي + 300 لكل موقع\n**Report Pro:** 3,500 أساسي + 800 لكل موقع\n**Core Lite:** 8,000 أساسي + 1,600 لكل موقع\n**Core Pro:** 14,000 أساسي + 2,800 لكل موقع\n**Enterprise:** 50,000+ أساسي + تخصيص مخصص',
        },
        {
          title: 'كم مدة الوصول إلى البيانات التاريخية؟',
          content:
            '**Report Lite:** 90 يومًا\n**Report Plus:** سنة واحدة\n**Report Pro:** سنتان\n**Core Lite:** سنتان\n**Core Pro:** 3 سنوات\n**Enterprise:** 5 سنوات أو حسب التخصيص',
        },
        {
          title: 'كم مرة يتم تحديث البيانات؟',
          content:
            '**Report Lite:** رفع يدوي\n**Report Plus:** يدوي أو استخراج ذكي عند الطلب\n**Report Pro:** تحديث يومي تلقائي\n**Core Lite:** كل 4 ساعات\n**Core Pro:** كل ساعتين\n**Enterprise:** وتيرة مخصصة، بما في ذلك الوقت الحقيقي عند الحاجة',
        },
        {
          title: 'هل أحصل على لوحات معلومات مخصصة؟',
          content:
            '**طبقات Report:** لوحات جاهزة فقط\n**Core Lite:** حتى 30 لوحة مخصصة\n**Core Pro:** حتى 75 لوحة مخصصة\n**Enterprise:** لوحات مخصصة غير محدودة',
        },
      ],
    },
    {
      id: 'support',
      icon: 'conversation',
      faqs: [
        {
          title: 'ما نوع الدعم الذي أحصل عليه؟',
          content:
            '**Report Lite:** دعم عبر البريد الإلكتروني\n**Report Plus:** بريد إلكتروني ودردشة\n**Report Pro:** دعم أولوية\n**Core Lite:** بريد ودردشة وهاتف\n**Core Pro:** دعم هاتفي أسرع\n**Enterprise:** دعم 24/7 مع مسؤول نجاح عملاء مخصص',
        },
        {
          title: 'هل توفرون تدريبًا؟',
          content:
            'نعم.\n\n**Report:** إعداد ذاتي ووثائق\n**Core Lite:** جلسات تدريب موجهة\n**Core Pro:** برنامج تدريب مخصص\n**Enterprise:** إعداد وتمكين منظم للفريق',
        },
        {
          title: 'ما المناطق الزمنية التي تدعمونها؟',
          content:
            'يدعم Sundae الفرق العالمية عبر المناطق الزمنية الرئيسية، ويتم مواءمة التغطية الداعمة مع الجغرافيا ومستوى الدعم في خطتك.',
        },
      ],
    },
    {
      id: 'security',
      icon: 'quality',
      faqs: [
        {
          title: 'هل بياناتي آمنة؟',
          content:
            'نعم. يستخدم Sundae ضوابط على مستوى المؤسسات:\n• تشفير AES-256 أثناء التخزين\n• تشفير TLS أثناء النقل\n• صلاحيات قائمة على الأدوار\n• مراجعات أمنية دورية\n• معالجة متوافقة مع GDPR\n• ضوابط إضافية لعملاء Enterprise',
        },
        {
          title: 'هل يمكنني التحكم في من يرى أي بيانات؟',
          content:
            'نعم. يدعم النظام أدوار admin وmanager وviewer، مع أنماط صلاحيات مخصصة لاحتياجات Enterprise الأكثر تعقيدًا.',
        },
        {
          title: 'هل توفرون SSO؟',
          content:
            'نعم. يتوفر SSO وSAML لعمليات نشر Enterprise.',
        },
      ],
    },
    {
      id: 'enterprise',
      icon: 'franchise',
      faqs: [
        {
          title: 'ما الذي يميز Enterprise؟',
          content:
            'تضيف طبقة Enterprise ما يلي:\n• خيارات white-label\n• دعم ونجاح عملاء مخصص\n• اتفاقيات SLA تعاقدية\n• SSO / SAML\n• دعم أمني وامتثالي\n• نماذج تعلم آلي وتدفقات بيانات مخصصة\n• أرصدة أعلى\n• فترات احتفاظ ممتدة',
        },
        {
          title: 'هل أحتاج إلى 100+ موقع لاستخدام Enterprise؟',
          content:
            'لا. قد تكون Enterprise مناسبة أيضًا عندما تقودك متطلبات SSO أو الامتثال أو white-label أو الشروط التعاقدية أو التعقيد التشغيلي إلى هذه الطبقة، حتى مع عدد مواقع أقل.',
        },
        {
          title: 'كيف أحصل على تسعير Enterprise؟',
          content:
            'يتم تحديد سعر Enterprise حسب الميزات وعدد المواقع ومتطلبات البيانات وتوقعات الأمن ونموذج الدعم. تواصل مع فريق المبيعات للحصول على عرض مخصص.',
        },
      ],
    },
    {
      id: 'comparisons',
      icon: 'balance',
      faqs: [
        {
          title: 'كيف يختلف Sundae عن تقارير POS؟',
          content:
            '**تقارير POS:** نظام واحد، سياق محدود، وتفسير يدوي\n\n**Sundae Report:** تحليل POS مع معايير مرجعية وتوصيات واكتشاف أنماط\n\n**Sundae Core:** كل ما في Report بالإضافة إلى توحيد بيانات العمالة والمخزون والتسويق والحجوزات وغيرها مع تحديث أسرع',
        },
        {
          title: 'كيف يختلف Sundae عن Excel؟',
          content:
            '**Excel:** إدخال يدوي وتحليل ثابت ولا توجد طبقة ذكاء مشتركة\n\n**Sundae:** إدخال آلي، ومقارنة منظمة، ولوحات حية، وتوصيات تقلل وقت التحليل اليدوي أسبوعيًا',
        },
        {
          title: 'كم يمكنني أن أوفر مقارنة بالمنصات التقليدية؟',
          content:
            'يذكر كثير من المشغلين انخفاضًا ملموسًا في التكلفة الإجمالية لأن Sundae يعتمد تسعيرًا طبقيًا بدلًا من رسوم متراكبة لكل وحدة ولكل موقع. أما مقدار التوفير الدقيق فيعتمد على الأدوات الحالية ونطاق التشغيل لديك.',
        },
      ],
    },
    {
      id: 'use-cases',
      icon: 'search',
      faqs: [
        {
          title: 'لدي موقع واحد فقط. هل يناسبني Sundae؟',
          content:
            'نعم. ابدأ مع Report Lite للمقارنة المرجعية المجانية، ثم انتقل إلى طبقات Report الأعلى أو Core إذا احتجت سرعة أكبر وذكاء أعمق.',
        },
        {
          title: 'أنا منصة امتياز. هل يمكن أن يساعدني Sundae؟',
          content:
            'نعم. يستطيع Sundae دعم:\n• رؤية المانح عبر شبكة الامتياز\n• صلاحيات منفصلة لكل صاحب امتياز\n• تقارير white-label\n• مقارنة مرجعية عبر الشبكة\n• تحليل المناطق والتوسع',
        },
        {
          title: 'أدير مطابخ سحابية. هل يعمل Sundae مع العمليات المعتمدة على التوصيل؟',
          content:
            'نعم. يتكامل Sundae مع منصات التوصيل ويدعم تحليلات العلامات الافتراضية وأداء القنوات وكفاءة العمالة والإسناد في العمليات المعتمدة على التوصيل.',
        },
        {
          title: 'نحن نخطط للتوسع. هل يمكن أن يساعدنا Sundae؟',
          content:
            'نعم. يمكن لـ Watchtower وذكاء السوق دعم تحليل مناطق الخدمة ومراجعة التشبع ومتابعة تحركات المنافسين وترتيب الأولوية للمناطق غير المخدومة بالشكل الكافي.',
        },
      ],
    },
  ],
  fr: [
    {
      id: 'getting-started',
      icon: 'growth',
      faqs: [
        {
          title: 'Qu’est-ce que Sundae ?',
          content:
            'Sundae est une plateforme d’intelligence décisionnelle pour la restauration et l’hospitality. Elle rassemble les données opérationnelles dispersées afin que les équipes comprennent ce qui s’est passé, ce qui change et où agir ensuite.',
        },
        {
          title: 'Comment démarrer ?',
          content:
            'Vous avez trois options :\n\n1. **Commencer gratuitement** - Inscrivez-vous à Report Lite et importez vos données pour obtenir un benchmark immédiat. Aucune carte bancaire.\n\n2. **Voir votre tarif** - Utilisez le calculateur sur pricing.sundae.io pour estimer votre coût réel.\n\n3. **Réserver une démo** - Planifiez une courte session avec notre équipe pour voir Sundae avec vos propres données.',
        },
        {
          title: 'Existe-t-il vraiment une offre gratuite ?',
          content:
            'Oui. Report Lite est gratuit de façon permanente. Importez vos données POS et obtenez un benchmark immédiat sur 5 indicateurs clés. Une politique d’usage raisonnable s’applique.',
        },
        {
          title: 'Quelle est la différence entre Report et Core ?',
          content:
            '**Report** = analyse historique des données POS\n• Import quotidien, hebdomadaire ou mensuel\n• Comprendre ce qui s’est passé\n• Se comparer aux pairs\n• Idéal pour un site unique ou un pilote\n\n**Core** = opérations en temps quasi réel\n• Rafraîchissement toutes les 2 à 4 heures\n• Connecte POS, main-d’œuvre, inventaire, marketing et réservations\n• Montre ce qui se passe maintenant\n• Déclenche des alertes prédictives\n• Idéal pour les groupes multi-sites\n\nEn bref : Report = POS uniquement. Core = POS + le reste de votre stack.',
        },
        {
          title: 'Dois-je signer un contrat long terme ?',
          content:
            'Non. Les offres Report et Core sont mensuelles et résiliables à tout moment. Les déploiements Enterprise passent en général sur des accords annuels personnalisés.',
        },
      ],
    },
    {
      id: 'products-tiers',
      icon: 'data',
      faqs: [
        {
          title: 'Quels produits propose Sundae ?',
          content:
            '**Trois produits principaux :**\n\n1. **Sundae Report** (Lite / Plus / Pro) - analyse historique et benchmarking\n2. **Sundae Core** (Lite / Pro / Enterprise) - opérations temps réel et intelligence prédictive\n3. **Watchtower** - intelligence de marché externe\n\n**En plus :**\n\n4. **Modules** - intelligence spécialisée pour la main-d’œuvre, l’inventaire, les achats, le marketing et les réservations.',
        },
        {
          title: 'Quel niveau me convient ?',
          content:
            '**Commencez avec Report Lite si :**\n• vous testez Sundae\n• vous gérez 1 à 2 sites\n• un reporting quotidien ou hebdomadaire suffit\n\n**Passez à Report Plus ou Pro si :**\n• vous voulez plus de profondeur historique\n• sans besoin critique de temps réel\n\n**Choisissez Core Lite ou Pro si :**\n• vous avez 10 sites ou plus\n• vous avez besoin de vitesse opérationnelle\n• le suivi budgétaire en continu compte vraiment\n\n**Choisissez Enterprise si :**\n• vous avez 100+ sites\n• vous avez besoin de SSO ou de white-label\n• vous exigez un accompagnement et des conditions dédiées',
        },
        {
          title: 'Puis-je changer de niveau plus tard ?',
          content:
            'Oui. Vous pouvez monter ou descendre de niveau à tout moment. Les données historiques sont conservées et il n’y a pas de pénalité de changement.',
        },
        {
          title: 'Qu’est-ce que le modèle 4D Intelligence ?',
          content:
            'Le cadre de Sundae pour la décision :\n\n**1D : Ce qui s’est passé** - ventes, main-d’œuvre, coûts\n**2D : Plan vs réel** - budget et forecast versus résultats\n**3D : Contexte marché** - benchmarks, pairs, concurrents\n**4D : La suite** - prévisions et recommandations\n\n**Report :** couverture complète de 1D et 2D, partielle sur 3D et 4D\n**Core :** couverture complète des 4 dimensions',
        },
      ],
    },
    {
      id: 'data-integration',
      icon: 'integration',
      faqs: [
        {
          title: 'Quelles données faut-il fournir ?',
          content:
            '**Minimum pour Report Lite :**\n• données de ventes POS au format CSV\n\n**Pour Core :**\n• POS via API\n• système de main-d’œuvre\n• système d’inventaire\n• plateformes marketing\n• système de réservations\n\nReport est centré sur le POS. Core connecte le reste de votre environnement opérationnel.',
        },
        {
          title: 'Comment importer mes données dans Sundae ?',
          content:
            '**Report Lite :** import CSV manuel\n\n**Report Plus :** import PDF, Excel ou captures d’écran, puis validation avant traitement.\n\n**Report Pro et Core :** ingestion automatisée via API',
        },
        {
          title: 'Quels POS sont pris en charge ?',
          content:
            'Sundae prend actuellement en charge **4 plateformes POS en direct** : Oracle MICROS Simphony, Square, Toast et Clover. Nous proposons aussi des **connecteurs base de données** pour PostgreSQL et SQL Server / Azure SQL lorsque le POS expose cet accès.\n\nAu-delà du POS, notre moteur d’intégration à **12 domaines** connecte plus de 30 fournisseurs pour la main-d’œuvre, l’inventaire, les réservations, la livraison, le marketing, l’expérience client, le CRM et la comptabilité.\n\nSi votre système n’apparaît pas, Enterprise peut inclure un travail d’intégration sur mesure ou des webhooks.',
        },
        {
          title: 'Puis-je utiliser plusieurs POS ?',
          content:
            '**Core Lite :** le plus simple si tous les sites utilisent le même POS\n\n**Core Pro et Enterprise :** oui. Des POS différents par site sont pris en charge, et Sundae normalise les données pour comparer proprement.\n\n**Report :** fonctionne avec tout POS grâce aux imports manuels.',
        },
        {
          title: 'Combien de temps prend le déploiement ?',
          content:
            '**Report Lite :** immédiat après import\n**Report Plus / Pro :** 1 à 2 jours\n**Core Lite / Pro :** 1 à 2 semaines\n**Enterprise :** 2 à 4 semaines selon le périmètre',
        },
        {
          title: 'Que deviennent mes données si je résilie ?',
          content:
            'Les données historiques restent exportables et peuvent être restaurées plus tard selon votre plan et vos règles de rétention.',
        },
      ],
    },
    {
      id: 'modules',
      icon: 'network',
      faqs: [
        {
          title: 'Que sont les modules ?',
          content:
            'Les modules sont des compléments spécialisés pour Core :\n\n1. **Labor Intelligence** - planning, productivité, heures supplémentaires\n2. **Inventory Intelligence** - pertes, niveaux de stock, visibilité inventaire\n3. **Purchasing Intelligence** - comparaison fournisseurs et leviers contractuels\n4. **Marketing Intelligence** - ROI, CAC, performance des canaux\n5. **Reservations Intelligence** - prévision des no-shows et optimisation des tables\n\nLes modules demandent Core car ils reposent sur des données vivantes et connectées.',
        },
        {
          title: 'Ai-je besoin des modules ?',
          content:
            'Pas forcément. Les modules sont optionnels et s’ajoutent quand vous voulez plus de profondeur sur un domaine précis.\n\n**Chemin recommandé :**\n• si vous êtes sur Report -> passez d’abord sur Core\n• si vous êtes déjà sur Core -> ajoutez les modules selon vos priorités',
        },
        {
          title: 'Faut-il Core pour utiliser les modules ?',
          content:
            'Oui. Les modules nécessitent Core Lite, Core Pro ou Enterprise, car ils dépendent de connexions directes vers la main-d’œuvre, l’inventaire, le marketing, les réservations et d’autres systèmes.',
        },
        {
          title: 'Puis-je ajouter plusieurs modules ?',
          content:
            'Oui. Vous pouvez combiner n’importe lesquels des cinq modules, sans obligation de tout acheter.',
        },
        {
          title: 'Par quel module commencer ?',
          content:
            'Commencez par la douleur opérationnelle la plus coûteuse :\n\n• coût de main-d’œuvre trop élevé -> Labor Intelligence\n• pertes ou problèmes de stock -> Inventory Intelligence\n• manque de levier fournisseurs -> Purchasing Intelligence\n• ROI marketing flou -> Marketing Intelligence\n• no-shows de réservations -> Reservations Intelligence',
        },
        {
          title: 'Comment fonctionne la tarification des modules ?',
          content:
            'Chaque module inclut une licence organisation couvrant les 5 premiers sites, puis une tarification additionnelle au-delà.\n\nExemple : 8 sites avec Labor Intelligence = 1 licence organisation + 3 sites supplémentaires.\n\nPour le calcul exact, utilisez pricing.sundae.io.',
        },
      ],
    },
    {
      id: 'watchtower',
      icon: 'watchtower',
      faqs: [
        {
          title: 'Qu’est-ce que Watchtower ?',
          content:
            'Watchtower représente la couche externe de Sundae et aide les équipes à comprendre ce qui se passe au-delà des quatre murs :\n\n1. **Competitive Intelligence** - jusqu’à 10 concurrents suivis par site\n2. **Event Intelligence** - météo, jours fériés, événements locaux\n3. **Market Intelligence** - tendances de catégorie et indicateurs économiques',
        },
        {
          title: 'Ai-je besoin de Watchtower ?',
          content:
            'Ce n’est pas obligatoire, mais c’est très utile si :\n• vous opérez sur des marchés très concurrentiels\n• les prix des concurrents influencent votre demande\n• météo et événements changent fortement votre trafic\n• vous préparez une expansion ou une analyse de zone',
        },
        {
          title: 'Combien de concurrents puis-je suivre ?',
          content:
            'Jusqu’à 10 concurrents par site, avec une liste différente selon chaque site.\n\nExemple : 5 sites = jusqu’à 50 concurrents suivis.',
        },
        {
          title: 'Puis-je acheter un seul composant de Watchtower ?',
          content:
            'Oui. Vous pouvez prendre Competitive Intelligence, Event Intelligence ou Market Intelligence séparément, ou les combiner.',
        },
        {
          title: 'Watchtower nécessite-t-il Core ?',
          content:
            'Oui. Watchtower prend tout son sens quand ses signaux marché sont lus avec vos données opérationnelles en direct, ce que fournit Core.\n\nSi vous n’avez besoin que d’une analyse historique du POS, Report peut suffire. Si vous voulez relier le contexte externe à l’opérationnel quotidien, passez sur Core.',
        },
      ],
    },
    {
      id: 'pricing-billing',
      icon: 'cost',
      faqs: [
        {
          title: 'Combien coûte Sundae ?',
          content:
            'Le prix dépend de :\n• Report ou Core\n• nombre de sites\n• modules choisis\n• présence ou non de Watchtower\n\n**Report Lite :** gratuit\n\nPour un calcul précis, utilisez pricing.sundae.io.',
        },
        {
          title: 'Y a-t-il des frais de mise en place ?',
          content:
            'Non. Sundae ne facture pas de frais d’installation séparés pour l’onboarding et l’intégration standard.',
        },
        {
          title: 'Quelles devises acceptez-vous ?',
          content:
            'Les principales devises de facturation sont prises en charge et la présentation tarifaire peut être adaptée à votre zone d’activité.',
        },
        {
          title: 'Y a-t-il une remise annuelle ?',
          content:
            'Oui. Le prépaiement annuel réduit en général le coût total par rapport au mensuel. Le niveau exact dépend du plan et du périmètre.',
        },
        {
          title: 'Quels moyens de paiement acceptez-vous ?',
          content:
            '• carte bancaire\n• virement / ACH\n• virement international pour les comptes plus larges\n• bons de commande pour les clients Enterprise approuvés',
        },
      ],
    },
    {
      id: 'features',
      icon: 'speed',
      faqs: [
        {
          title: 'Comment fonctionnent les crédits d’intelligence ?',
          content:
            'Les crédits d’intelligence alimentent les questions, analyses et recommandations.\n\n**Report Lite :** 250 de base + 80 par site\n**Report Plus :** 1 200 de base + 300 par site\n**Report Pro :** 3 500 de base + 800 par site\n**Core Lite :** 8 000 de base + 1 600 par site\n**Core Pro :** 14 000 de base + 2 800 par site\n**Enterprise :** 50 000+ de base + allocation personnalisée',
        },
        {
          title: 'Quel historique est disponible ?',
          content:
            '**Report Lite :** 90 jours\n**Report Plus :** 1 an\n**Report Pro :** 2 ans\n**Core Lite :** 2 ans\n**Core Pro :** 3 ans\n**Enterprise :** 5 ans et plus, ou rétention personnalisée',
        },
        {
          title: 'À quelle fréquence les données sont-elles rafraîchies ?',
          content:
            '**Report Lite :** imports manuels\n**Report Plus :** manuel ou parsing intelligent à la demande\n**Report Pro :** quotidien\n**Core Lite :** toutes les 4 heures\n**Core Pro :** toutes les 2 heures\n**Enterprise :** cadence personnalisée, y compris temps réel si nécessaire',
        },
        {
          title: 'Ai-je accès à des tableaux de bord personnalisés ?',
          content:
            '**Report :** tableaux prédéfinis uniquement\n**Core Lite :** jusqu’à 30 dashboards personnalisés\n**Core Pro :** jusqu’à 75 dashboards personnalisés\n**Enterprise :** dashboards personnalisés illimités',
        },
      ],
    },
    {
      id: 'support',
      icon: 'conversation',
      faqs: [
        {
          title: 'Quel support est inclus ?',
          content:
            '**Report Lite :** support email\n**Report Plus :** email et chat\n**Report Pro :** support prioritaire\n**Core Lite :** email, chat et téléphone\n**Core Pro :** assistance téléphonique prioritaire plus rapide\n**Enterprise :** support 24/7 avec référent customer success dédié',
        },
        {
          title: 'Proposez-vous de la formation ?',
          content:
            'Oui.\n\n**Report :** onboarding autonome et documentation\n**Core Lite :** sessions guidées\n**Core Pro :** programme de formation sur mesure\n**Enterprise :** onboarding structuré et enablement',
        },
        {
          title: 'Quels fuseaux horaires couvrez-vous ?',
          content:
            'Sundae accompagne les équipes mondiales sur les principaux fuseaux horaires, avec une couverture support alignée sur votre géographie et votre niveau de plan.',
        },
      ],
    },
    {
      id: 'security',
      icon: 'quality',
      faqs: [
        {
          title: 'Mes données sont-elles sécurisées ?',
          content:
            'Oui. Sundae applique des contrôles de niveau entreprise :\n• chiffrement AES-256 au repos\n• chiffrement TLS en transit\n• gestion des accès par rôles\n• revues de sécurité régulières\n• traitement aligné GDPR\n• contrôles supplémentaires pour Enterprise',
        },
        {
          title: 'Puis-je contrôler qui voit quelles données ?',
          content:
            'Oui. La gestion des rôles couvre les profils admin, manager et viewer, avec des schémas personnalisés pour les besoins Enterprise plus complexes.',
        },
        {
          title: 'Proposez-vous le SSO ?',
          content:
            'Oui. Le SSO et le SAML sont disponibles pour les déploiements Enterprise.',
        },
      ],
    },
    {
      id: 'enterprise',
      icon: 'franchise',
      faqs: [
        {
          title: 'Qu’apporte Enterprise ?',
          content:
            'Enterprise ajoute :\n• options white-label\n• accompagnement et support dédiés\n• SLA contractuels\n• SSO / SAML\n• support sécurité et conformité\n• workflows data et modèles ML sur mesure\n• allocations de crédits plus élevées\n• rétention étendue',
        },
        {
          title: 'Faut-il 100+ sites pour passer en Enterprise ?',
          content:
            'Non. Enterprise est aussi pertinent quand vos besoins sont tirés par le SSO, la conformité, le white-label, les engagements contractuels ou une structure opérationnelle complexe.',
        },
        {
          title: 'Comment obtenir un prix Enterprise ?',
          content:
            'Le prix Enterprise dépend des fonctionnalités, du nombre de sites, des exigences data, des attentes sécurité et du modèle de support. Contactez l’équipe commerciale pour un devis sur mesure.',
        },
      ],
    },
    {
      id: 'comparisons',
      icon: 'balance',
      faqs: [
        {
          title: 'Quelle différence avec les rapports POS ?',
          content:
            '**Rapports POS :** un seul système, peu de contexte, lecture manuelle\n\n**Sundae Report :** analyse POS avec benchmarks, recommandations et détection de patterns\n\n**Sundae Core :** tout Report + unification des données main-d’œuvre, inventaire, marketing, réservations, etc. avec rafraîchissement plus rapide',
        },
        {
          title: 'Quelle différence avec Excel ?',
          content:
            '**Excel :** saisie manuelle, analyse statique, pas de couche d’intelligence partagée\n\n**Sundae :** ingestion automatisée, benchmarking structuré, dashboards vivants et recommandations qui réduisent le temps d’analyse manuelle chaque semaine',
        },
        {
          title: 'Combien puis-je économiser face aux outils historiques ?',
          content:
            'Beaucoup d’opérateurs constatent une baisse nette du coût total, car Sundae applique une tarification par niveau plutôt qu’une accumulation de frais par module et par site. L’économie exacte dépend de vos outils actuels et de votre périmètre.',
        },
      ],
    },
    {
      id: 'use-cases',
      icon: 'search',
      faqs: [
        {
          title: 'Je n’ai qu’un seul site. Sundae est-il adapté ?',
          content:
            'Oui. Commencez avec Report Lite pour le benchmarking gratuit, puis passez à des niveaux Report supérieurs ou à Core si vous avez besoin de plus de vitesse et d’intelligence.',
        },
        {
          title: 'Je gère une plateforme de franchise. Sundae peut-il aider ?',
          content:
            'Oui. Sundae peut supporter :\n• une visibilité franchiseur sur tout le réseau\n• des droits d’accès séparés pour chaque franchisé\n• du reporting white-label\n• du benchmarking transversal\n• de l’analyse de territoire et d’expansion',
        },
        {
          title: 'Je pilote des cloud kitchens. Sundae fonctionne-t-il pour le delivery-first ?',
          content:
            'Oui. Sundae se connecte aux plateformes de livraison et fournit des analyses sur les marques virtuelles, la performance des canaux, l’efficacité main-d’œuvre et l’attribution dans les opérations orientées delivery.',
        },
        {
          title: 'Nous préparons une expansion. Sundae peut-il nous aider ?',
          content:
            'Oui. Watchtower et l’intelligence marché peuvent soutenir l’analyse de zone, la lecture de saturation, le suivi des mouvements concurrents et la priorisation des territoires sous-servis.',
        },
      ],
    },
  ],
  es: [
    {
      id: 'getting-started',
      icon: 'growth',
      faqs: [
        {
          title: '¿Qué es Sundae?',
          content:
            'Sundae es una plataforma de inteligencia de decisión para restaurantes y equipos de hospitality. Reúne datos operativos dispersos para que el equipo entienda qué pasó, qué está cambiando y dónde actuar después.',
        },
        {
          title: '¿Cómo empiezo?',
          content:
            'Tienes tres opciones:\n\n1. **Empezar gratis** - Regístrate en Report Lite y sube tus datos operativos para obtener benchmarking inmediato. Sin tarjeta.\n\n2. **Ver tu precio** - Usa la calculadora en pricing.sundae.io para ver el precio real de tu operación.\n\n3. **Reservar una demo** - Agenda una sesión breve con nuestro equipo para ver Sundae con tus propios datos.',
        },
        {
          title: '¿De verdad existe un plan gratuito?',
          content:
            'Sí. Report Lite es gratis para siempre. Sube tus datos de POS y obtén benchmarking instantáneo en 5 métricas clave. Se aplica una política de uso razonable.',
        },
        {
          title: '¿Cuál es la diferencia entre Report y Core?',
          content:
            '**Report** = análisis histórico de datos POS\n• Carga diaria, semanal o mensual\n• Entender qué pasó\n• Compararte con tus pares\n• Ideal para una sola ubicación o una prueba inicial\n\n**Core** = operaciones casi en tiempo real\n• Actualización cada 2-4 horas\n• Conecta POS, mano de obra, inventario, marketing y reservas\n• Muestra qué está pasando ahora\n• Activa alertas predictivas\n• Ideal para operadores con varias ubicaciones\n\nEn resumen: Report = solo POS. Core = POS más el resto de tu stack.',
        },
        {
          title: '¿Necesito un contrato a largo plazo?',
          content:
            'No. Los planes Report y Core son mensuales y puedes cancelarlos cuando quieras. Los despliegues Enterprise suelen usar acuerdos anuales con términos personalizados.',
        },
      ],
    },
    {
      id: 'products-tiers',
      icon: 'data',
      faqs: [
        {
          title: '¿Qué productos ofrece Sundae?',
          content:
            '**Tres productos principales:**\n\n1. **Sundae Report** (Lite / Plus / Pro) - análisis histórico y benchmarking\n2. **Sundae Core** (Lite / Pro / Enterprise) - operaciones en tiempo real e inteligencia predictiva\n3. **Watchtower** - inteligencia de mercado externa\n\n**Además:**\n\n4. **Módulos** - inteligencia especializada para mano de obra, inventario, compras, marketing y reservas.',
        },
        {
          title: '¿Qué nivel debería elegir?',
          content:
            '**Empieza con Report Lite si:**\n• estás probando Sundae\n• gestionas 1-2 locales\n• te basta con reporting diario o semanal\n\n**Pasa a Report Plus o Pro si:**\n• necesitas más profundidad histórica\n• pero aún no necesitas velocidad operativa en vivo\n\n**Elige Core Lite o Pro si:**\n• tienes 10 o más locales\n• necesitas velocidad operativa\n• el seguimiento presupuestario en vivo importa\n\n**Elige Enterprise si:**\n• tienes 100+ locales\n• necesitas SSO o white-label\n• exiges soporte y condiciones dedicadas',
        },
        {
          title: '¿Puedo subir o bajar de plan después?',
          content:
            'Sí. Puedes cambiar de nivel en cualquier momento. Los datos históricos se conservan y no hay penalizaciones por cambiar de plan.',
        },
        {
          title: '¿Qué es el modelo 4D Intelligence?',
          content:
            'Es el marco de Sundae para la toma de decisiones:\n\n**1D: Qué pasó** - ventas, mano de obra y costes\n**2D: Plan vs real** - presupuesto y forecast frente al resultado\n**3D: Contexto de mercado** - benchmarks, pares y competidores\n**4D: Qué viene** - predicciones y recomendaciones\n\n**Report:** cubre por completo 1D y 2D y parcialmente 3D y 4D\n**Core:** cubre las 4 dimensiones por completo',
        },
      ],
    },
    {
      id: 'data-integration',
      icon: 'integration',
      faqs: [
        {
          title: '¿Qué datos necesita Sundae?',
          content:
            '**Mínimo para Report Lite:**\n• datos de ventas POS en CSV\n\n**Para Core:**\n• POS vía API\n• sistema de mano de obra\n• sistema de inventario\n• plataformas de marketing\n• sistema de reservas\n\nReport se centra en el POS. Core conecta el resto de tu entorno operativo.',
        },
        {
          title: '¿Cómo meto mis datos en Sundae?',
          content:
            '**Report Lite:** carga manual de CSV\n\n**Report Plus:** carga PDF, Excel o capturas; Sundae extrae la información y tú la revisas antes de procesarla.\n\n**Report Pro y Core:** ingestión automática vía API',
        },
        {
          title: '¿Qué sistemas POS integráis?',
          content:
            'Sundae soporta actualmente **4 plataformas POS en directo**: Oracle MICROS Simphony, Square, Toast y Clover. También ofrecemos **conectores de base de datos** para PostgreSQL y SQL Server / Azure SQL cuando el POS expone ese acceso.\n\nAdemás del POS, el motor de integración de **12 dominios** conecta más de 30 proveedores en mano de obra, inventario, reservas, delivery, marketing, experiencia de cliente, CRM y contabilidad.\n\nSi tu sistema no aparece, Enterprise puede incluir integración a medida o ingestión vía webhooks.',
        },
        {
          title: '¿Puedo usar varios POS?',
          content:
            '**Core Lite:** es más simple cuando todos los locales usan el mismo POS\n\n**Core Pro y Enterprise:** sí. Se admiten POS diferentes por local y Sundae normaliza los datos para compararlos correctamente.\n\n**Report:** funciona con cualquier POS porque la carga es manual.',
        },
        {
          title: '¿Cuánto tarda la implementación?',
          content:
            '**Report Lite:** inmediata tras la carga\n**Report Plus / Pro:** 1-2 días\n**Core Lite / Pro:** 1-2 semanas\n**Enterprise:** 2-4 semanas según el alcance',
        },
        {
          title: '¿Qué pasa con mis datos si cancelo?',
          content:
            'Los datos históricos siguen siendo exportables y pueden recuperarse más adelante según tu plan y tus reglas de retención.',
        },
      ],
    },
    {
      id: 'modules',
      icon: 'network',
      faqs: [
        {
          title: '¿Qué son los módulos?',
          content:
            'Los módulos son complementos especializados sobre Core:\n\n1. **Labor Intelligence** - horarios, productividad y horas extra\n2. **Inventory Intelligence** - mermas, niveles y visibilidad de stock\n3. **Purchasing Intelligence** - comparación de proveedores y palanca contractual\n4. **Marketing Intelligence** - ROI, CAC y rendimiento de canales\n5. **Reservations Intelligence** - predicción de no-shows y optimización de mesas\n\nLos módulos requieren Core porque dependen de datos operativos vivos y conectados.',
        },
        {
          title: '¿Necesito los módulos?',
          content:
            'No necesariamente. Son opcionales y se añaden cuando necesitas más profundidad en un área operativa concreta.\n\n**Ruta recomendada:**\n• si estás en Report -> pasa primero a Core\n• si ya estás en Core -> añade módulos según tus prioridades',
        },
        {
          title: '¿Necesito Core para usar módulos?',
          content:
            'Sí. Los módulos requieren Core Lite, Core Pro o Enterprise porque dependen de conexiones directas con mano de obra, inventario, marketing, reservas y otros sistemas.',
        },
        {
          title: '¿Puedo añadir varios módulos?',
          content:
            'Sí. Puedes combinar cualquiera de los cinco módulos sin necesidad de contratar todos.',
        },
        {
          title: '¿Con qué módulo debería empezar?',
          content:
            'Empieza por el mayor dolor operativo:\n\n• coste laboral alto -> Labor Intelligence\n• mermas o problemas de stock -> Inventory Intelligence\n• poca palanca con proveedores -> Purchasing Intelligence\n• ROI de marketing poco claro -> Marketing Intelligence\n• no-shows de reservas -> Reservations Intelligence',
        },
        {
          title: '¿Cómo funciona el precio de los módulos?',
          content:
            'Cada módulo incluye una licencia de organización que cubre los primeros 5 locales, más un coste adicional por cada local extra.\n\nEjemplo: 8 locales con Labor Intelligence = 1 licencia + 3 locales adicionales.\n\nPara el cálculo exacto, usa pricing.sundae.io.',
        },
      ],
    },
    {
      id: 'watchtower',
      icon: 'watchtower',
      faqs: [
        {
          title: '¿Qué es Watchtower?',
          content:
            'Watchtower es la capa externa de Sundae y ayuda a entender qué ocurre fuera de las cuatro paredes:\n\n1. **Competitive Intelligence** - hasta 10 competidores por local\n2. **Event Intelligence** - clima, festivos y eventos locales\n3. **Market Intelligence** - tendencias de categoría e indicadores económicos',
        },
        {
          title: '¿Necesito Watchtower?',
          content:
            'No es obligatorio, pero tiene mucho valor si:\n• operas en mercados muy competitivos\n• los precios de la competencia afectan la demanda\n• el clima o los eventos cambian mucho el tráfico\n• estás planificando expansión o análisis territorial',
        },
        {
          title: '¿Cuántos competidores puedo seguir?',
          content:
            'Hasta 10 competidores por local, con una lista distinta para cada uno.\n\nEjemplo: 5 locales = hasta 50 competidores monitorizados.',
        },
        {
          title: '¿Puedo comprar solo una parte de Watchtower?',
          content:
            'Sí. Puedes contratar Competitive Intelligence, Event Intelligence o Market Intelligence por separado, o combinarlos.',
        },
        {
          title: '¿Watchtower requiere Core?',
          content:
            'Sí. Watchtower tiene más sentido cuando sus señales externas se leen junto con datos operativos en vivo, y eso es precisamente lo que aporta Core.\n\nSi solo necesitas análisis histórico de POS, Report puede bastar. Si quieres contexto de mercado conectado al día a día, pasa a Core.',
        },
      ],
    },
    {
      id: 'pricing-billing',
      icon: 'cost',
      faqs: [
        {
          title: '¿Cuánto cuesta Sundae?',
          content:
            'El precio depende de:\n• Report o Core\n• número de locales\n• módulos elegidos\n• si añades Watchtower o no\n\n**Report Lite:** gratis\n\nPara una cifra precisa, usa pricing.sundae.io.',
        },
        {
          title: '¿Hay costes de setup?',
          content:
            'No. Sundae no cobra una tarifa independiente de implantación para el onboarding y la integración estándar.',
        },
        {
          title: '¿Qué monedas aceptáis?',
          content:
            'Se admiten las principales monedas de facturación y la presentación de precios puede adaptarse a la divisa más útil para tu operación.',
        },
        {
          title: '¿Hay descuento anual?',
          content:
            'Sí. El prepago anual suele reducir el coste total frente al pago mensual. El descuento exacto depende del plan y del alcance.',
        },
        {
          title: '¿Qué métodos de pago aceptáis?',
          content:
            '• tarjeta\n• transferencia / ACH\n• transferencia bancaria internacional para cuentas grandes\n• órdenes de compra para clientes Enterprise aprobados',
        },
      ],
    },
    {
      id: 'features',
      icon: 'speed',
      faqs: [
        {
          title: '¿Cómo funcionan los créditos de inteligencia?',
          content:
            'Los créditos de inteligencia alimentan preguntas, análisis y recomendaciones.\n\n**Report Lite:** 250 base + 80 por local\n**Report Plus:** 1.200 base + 300 por local\n**Report Pro:** 3.500 base + 800 por local\n**Core Lite:** 8.000 base + 1.600 por local\n**Core Pro:** 14.000 base + 2.800 por local\n**Enterprise:** 50.000+ base + asignación personalizada',
        },
        {
          title: '¿Cuánto histórico tendré disponible?',
          content:
            '**Report Lite:** 90 días\n**Report Plus:** 1 año\n**Report Pro:** 2 años\n**Core Lite:** 2 años\n**Core Pro:** 3 años\n**Enterprise:** 5+ años o retención personalizada',
        },
        {
          title: '¿Con qué frecuencia se actualizan los datos?',
          content:
            '**Report Lite:** cargas manuales\n**Report Plus:** manual o parsing inteligente bajo demanda\n**Report Pro:** diario\n**Core Lite:** cada 4 horas\n**Core Pro:** cada 2 horas\n**Enterprise:** frecuencia personalizada, incluido tiempo real cuando aplica',
        },
        {
          title: '¿Tendré dashboards personalizados?',
          content:
            '**Report:** solo dashboards predefinidos\n**Core Lite:** hasta 30 dashboards personalizados\n**Core Pro:** hasta 75 dashboards personalizados\n**Enterprise:** dashboards personalizados ilimitados',
        },
      ],
    },
    {
      id: 'support',
      icon: 'conversation',
      faqs: [
        {
          title: '¿Qué soporte incluye el plan?',
          content:
            '**Report Lite:** soporte por email\n**Report Plus:** email y chat\n**Report Pro:** soporte prioritario\n**Core Lite:** email, chat y teléfono\n**Core Pro:** soporte telefónico prioritario más rápido\n**Enterprise:** soporte 24/7 con responsable de customer success dedicado',
        },
        {
          title: '¿Ofrecéis formación?',
          content:
            'Sí.\n\n**Report:** onboarding autoservicio y documentación\n**Core Lite:** sesiones guiadas\n**Core Pro:** programa de formación a medida\n**Enterprise:** onboarding estructurado y enablement',
        },
        {
          title: '¿Qué husos horarios cubrís?',
          content:
            'Sundae acompaña a equipos globales en los principales husos horarios, con cobertura alineada con tu geografía y con el nivel de soporte del plan.',
        },
      ],
    },
    {
      id: 'security',
      icon: 'quality',
      faqs: [
        {
          title: '¿Mis datos están seguros?',
          content:
            'Sí. Sundae aplica controles de nivel enterprise:\n• cifrado AES-256 en reposo\n• cifrado TLS en tránsito\n• gestión de accesos por roles\n• revisiones periódicas de seguridad\n• tratamiento alineado con GDPR\n• controles adicionales para Enterprise',
        },
        {
          title: '¿Puedo controlar quién ve qué datos?',
          content:
            'Sí. La gestión de roles cubre perfiles admin, manager y viewer, con esquemas personalizados para necesidades Enterprise más complejas.',
        },
        {
          title: '¿Ofrecéis SSO?',
          content:
            'Sí. SSO y SAML están disponibles para despliegues Enterprise.',
        },
      ],
    },
    {
      id: 'enterprise',
      icon: 'franchise',
      faqs: [
        {
          title: '¿Qué añade Enterprise?',
          content:
            'Enterprise añade:\n• opciones white-label\n• soporte y success dedicados\n• SLAs contractuales\n• SSO / SAML\n• soporte de seguridad y compliance\n• workflows de datos y modelos ML personalizados\n• más créditos\n• retención ampliada',
        },
        {
          title: '¿Necesito 100+ locales para Enterprise?',
          content:
            'No. Enterprise también encaja cuando tus necesidades vienen marcadas por SSO, compliance, white-label, términos contractuales o una estructura operativa compleja.',
        },
        {
          title: '¿Cómo consigo precio Enterprise?',
          content:
            'El precio Enterprise depende de funcionalidades, número de locales, requisitos de datos, expectativas de seguridad y modelo de soporte. Habla con ventas para una propuesta a medida.',
        },
      ],
    },
    {
      id: 'comparisons',
      icon: 'balance',
      faqs: [
        {
          title: '¿En qué se diferencia Sundae de los informes POS?',
          content:
            '**Informes POS:** un solo sistema, poco contexto, lectura manual\n\n**Sundae Report:** análisis POS con benchmarks, recomendaciones y detección de patrones\n\n**Sundae Core:** todo lo anterior más unificación de mano de obra, inventario, marketing, reservas y otros sistemas con refresco más rápido',
        },
        {
          title: '¿En qué se diferencia Sundae de Excel?',
          content:
            '**Excel:** entrada manual, análisis estático y sin capa compartida de inteligencia\n\n**Sundae:** ingestión automatizada, benchmarking estructurado, dashboards vivos y recomendaciones que reducen horas de análisis manual cada semana',
        },
        {
          title: '¿Cuánto puedo ahorrar frente a plataformas antiguas?',
          content:
            'Muchos operadores ven una reducción clara del coste total porque Sundae usa pricing por niveles en vez de acumular tarifas por módulo y por local. El ahorro exacto depende de tu stack actual y de tu alcance operativo.',
        },
      ],
    },
    {
      id: 'use-cases',
      icon: 'search',
      faqs: [
        {
          title: 'Solo tengo un local. ¿Sundae sigue teniendo sentido?',
          content:
            'Sí. Empieza con Report Lite para benchmarking gratuito y pasa a niveles superiores de Report o a Core si necesitas más velocidad e inteligencia.',
        },
        {
          title: 'Gestiono una plataforma de franquicia. ¿Sundae puede ayudar?',
          content:
            'Sí. Sundae puede cubrir:\n• visibilidad del franquiciador sobre toda la red\n• accesos separados por franquiciado\n• reporting white-label\n• benchmarking transversal\n• análisis territorial y de expansión',
        },
        {
          title: 'Opero cloud kitchens. ¿Funciona Sundae para delivery-first?',
          content:
            'Sí. Sundae se conecta a plataformas de delivery y ofrece analítica para marcas virtuales, rendimiento de canales, eficiencia laboral y atribución en operaciones centradas en delivery.',
        },
        {
          title: 'Estamos planeando expandirnos. ¿Sundae puede ayudar?',
          content:
            'Sí. Watchtower y la inteligencia de mercado pueden apoyar análisis de zonas, revisión de saturación, seguimiento de movimientos de competidores y priorización de territorios desatendidos.',
        },
      ],
    },
  ],
};

export function getLocalizedFaqSections(
  locale: WebsiteLocale,
  categoryTitles: readonly string[],
): LocalizedFaqSection[] {
  const sections = localizedFaqSections[locale] ?? localizedFaqSections.en;

  return sections.map((section, index) => ({
    ...section,
    title: categoryTitles[index] ?? localizedFaqSections.en[index]?.id ?? section.id,
  }));
}
