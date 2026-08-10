import type { SundaeIconName } from '@/components/icons';
import type { RequiredEnglishLocalizedRecord, WebsiteLocale } from '@/lib/i18n';
import { getGeneratedLocalCopy } from '@/lib/generatedLocalCopy'
import { generatedLocalCopy } from '@/generated-locales/content_faqContent'
import { CORE_PACKAGES, usd } from '@/lib/pricing/priceBook'

/**
 * AI credit wallets, rendered from the v1.7 price book so the FAQ can never
 * quote a wallet size the catalogue no longer carries.
 */
const AI_WALLET_LINES = CORE_PACKAGES.map(
  (pkg) => `**${pkg.name}:** ${pkg.aiCreditWallet.toLocaleString('en-US')}`,
).join('\n')

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

const localizedFaqSections: RequiredEnglishLocalizedRecord<FaqSectionTemplate[]> = {
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
            'You have two options:\n\n1. **See Your Pricing** - Use the interactive pricing calculator at pricing.sundae.io to size a Core package against your location count.\n\n2. **Book a Demo** - Schedule a 15-minute walkthrough with our team to see Sundae running against your data.',
        },
        {
          title: 'Is there a free tier?',
          content:
            'No. Every Sundae package is paid, priced from your first location. What we do offer is a working session against your own numbers before you commit, so you can see the return before you sign anything.',
        },
        {
          title: "What's the difference between the Core packages?",
          content:
            '**Core Foundation** - the operating baseline: one decision substrate over POS, labor, cost and operations.\n\n**Core Margin** - depth on cost and leakage: theoretical vs. actual usage, waste, shrinkage, voids and comps, item-level contribution.\n\n**Core Growth** - depth on demand: guest cohorts and lifetime value, promo attribution by channel, delivery margin after commission.\n\n**Core Performance** - multi-brand and multi-region consolidation, cross-module correlation, governed access with audit trails.\n\nAll four carry the same eleven domain modules. What changes is how deep each one goes.',
        },
        {
          title: 'Do I need a long-term contract?',
          content:
            'No. Every package is available month to month and you can cancel without penalty. Annual and 2-year commitments exist because they cost less - 10% and 15% off - not because they are required.',
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
            '**Four main products:**\n\n1. **Sundae Core** (Foundation / Margin / Growth / Performance) - the decision substrate, carrying all eleven domain modules\n2. **Foresight & Action** - forecasting, scenario modelling, and the approve-in-the-loop action layer\n3. **Sundae Crew** - the workforce substrate: scheduling, time and attendance, payroll readiness, HR and people intelligence\n4. **Watchtower** - external market intelligence, scoped alongside your Core package\n\n**Plus:** concept SKUs for the operating models your group runs - franchise, hotel F&B, cloud kitchen, catering, production, rental commissary.',
        },
        {
          title: 'Which Core package should I choose?',
          content:
            '**Core Foundation if:**\n• You are consolidating off spreadsheets and disconnected dashboards\n• You want one operating picture before you go deeper\n\n**Core Margin if:**\n• Food cost, waste, voids or comps are where your margin is going\n• You need item-level contribution, not just sales mix\n\n**Core Growth if:**\n• Repeat revenue and channel mix are the constraint\n• You need guest cohorts, promo attribution and delivery margin\n\n**Core Performance if:**\n• You run several brands or several markets\n• You need consolidation, cross-module correlation and governed access',
        },
        {
          title: 'Can I upgrade or downgrade later?',
          content:
            'Yes. You can move between tiers at any time. Historical data is preserved and there are no penalties for changing plans.',
        },
        {
          title: "What's the 4D Intelligence Model?",
          content:
            "Sundae's framework for decision intelligence:\n\n**1D: What Happened** - Sales, labor, and cost truth\n**2D: Plan vs Actual** - Budget and forecast variance\n**3D: Market Context** - Benchmarks, peers, and competitors\n**4D: What's Next** - Predictions and recommendations\n\nEvery Core package covers all four. The package sets how deep each dimension goes.",
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
            '**For every Core package:**\n• POS system via API\n• Labor or workforce system\n• Inventory system\n• Marketing platforms\n• Reservations system\n\nPOS alone is enough to get value on day one. The rest deepen the picture as you connect them.',
        },
        {
          title: 'How do I get my data into Sundae?',
          content:
            'Through API connections to your POS and the rest of your operating stack. Where a system has no API, Sundae accepts structured file drops and smart-parsed uploads - PDF, Excel, screenshots - that you review before processing.',
        },
        {
          title: 'What POS systems do you integrate with?',
          content:
            "Sundae currently supports **4 POS platforms** with live adapters: Oracle MICROS Simphony, Square, Toast, and Clover. We also support **direct database connectors** for PostgreSQL and SQL Server / Azure SQL when a POS system exposes database access.\n\nBeyond POS, Sundae's **12-domain integration engine** connects to 250+ vendors across labor, inventory, reservations, delivery, marketing, guest experience, CRM, and accounting.\n\nIf you do not see your system listed, Enterprise tier can include custom integration work and webhook-based ingestion.",
        },
        {
          title: 'Can I use Sundae with multiple POS systems?',
          content:
            'Yes. Sundae connects across mixed POS estates and normalizes the data for apples-to-apples comparison. Core Performance adds consolidation across brands and regions on top of that.',
        },
        {
          title: 'How long does implementation take?',
          content:
            'Most groups are live in 1-2 weeks. Larger multi-brand or multi-region rollouts run 2-4 weeks depending on scope.\n\nImplementation is a one-off fee, charged once at the highest class in your selection - from self-service at no cost up to a scoped Class D engagement.',
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
            'They are not optional and they are not separate purchases. All eleven domain modules ship with every Core package.\n\nWhat you choose is the package, and the package sets how deep each module goes.',
        },
        {
          title: 'Can I buy a single module?',
          content:
            'No. The eleven domain modules are components of a Core package, not standalone products, and there is no per-module price. Choosing a package is how you get all of them.',
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
            'Yes. Watchtower works best when its market signals are layered onto live operating data, which is what a Core package provides. It is scoped and quoted alongside your package rather than sold on its own.',
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
            `Pricing depends on:\n• Which Core package\n• Number of locations\n• Whether Foresight & Action, Crew or concept SKUs are included\n\nCore packages are priced from a first-location anchor plus a marginal rate for each additional location, and that rate steps down as you grow. Core Foundation starts at ${usd(CORE_PACKAGES[0].firstUnitMonthly)} for your first location.\n\nFor precise pricing, use pricing.sundae.io.`,
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
            `Intelligence credits power questions, analyses, and recommendations. Every Core package carries a monthly wallet:\n\n${AI_WALLET_LINES}\n\nIf you run through it, you can top up on any package.`,
        },
        {
          title: 'How much historical access do I get?',
          content:
            'Every Core package keeps your full connected history with multi-year retention. Enterprise agreements can extend that with custom retention terms.',
        },
        {
          title: 'How often does data refresh?',
          content:
            'Core refreshes through the shift rather than at end of day, so Pulse and the domain modules move while you can still act on them. Exact cadence depends on what your connected systems expose.',
        },
        {
          title: 'Do I get custom dashboards?',
          content:
            'Yes. Every Core package includes custom dashboards on top of the prebuilt views that ship with each domain module.',
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
            'Every Core package includes email, chat and phone support. Enterprise agreements add 24/7 cover, contractual response times and a dedicated customer success lead.',
        },
        {
          title: 'Do you provide training?',
          content:
            'Yes. Training is part of implementation, which is a one-off fee charged once at the highest class in your selection - self-service documentation at no cost, guided sessions and structured enablement at the higher classes.',
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
            '**POS reports:** One system, limited context, manual interpretation\n\n**Sundae Core:** POS analysis plus benchmarks, recommendations and pattern detection, across labor, cost and guest in one operating picture\n\n**Foresight & Action:** the forward view on top - forecasts, scenarios, and the layer that acts on what they surface',
        },
        {
          title: 'How is Sundae different from Excel?',
          content:
            '**Excel:** Manual entry, static analysis, no shared intelligence layer\n\n**Sundae:** Automated ingestion, structured benchmarking, live dashboards, and recommendations that reduce manual analysis time every week',
        },
        {
          title: 'How much can I save versus legacy analytics tools?',
          content:
            'Operators often report materially lower total cost because a Core package already contains all eleven domain modules, instead of stacking per-module and per-location fees. The exact difference depends on your current tool mix and operating footprint.',
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
            'Yes. A single location carries the package anchor and nothing more, and it gets the same eleven modules a fifty-location group gets. The location bands only start to matter when you add sites.',
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
    {
      id: 'crew',
      icon: 'hr',
      faqs: [
        {
          title: 'What is Sundae Crew?',
          content:
            'Sundae Crew is the operational suite that runs your people: scheduling, time and attendance, payroll readiness, HR records, and workforce analytics. Every shift planned, hour clocked, and record filed becomes signal that flows back into your decision intelligence - so operations and insight share one system.',
        },
        {
          title: 'What can Crew do?',
          content:
            '**Five connected modules:**\n\n1. **Scheduling** - Demand-aware shift planning with eligibility checks and an AI builder\n2. **Time & Attendance** - Clock-in/out, geofencing, break attestation, and timesheet approvals\n3. **Payroll** - Multi-region payroll readiness and statutory exports (readiness and export, not a tax engine)\n4. **People & HR** - Hire-to-retire employee records and documents\n5. **People Intelligence** - Workforce analytics, no-show risk, and labor-cost trends',
        },
        {
          title: 'Which regions does Crew payroll support?',
          content:
            'Crew payroll readiness and statutory exports currently cover the **GCC** (UAE, KSA, Qatar, Bahrain, Oman, Kuwait), the **United States** (federal plus all states), **Canada**, the **United Kingdom**, and the **European Union** (all 27 member states). Latin America and APAC are on the roadmap. Crew prepares and exports payroll - it is not a tax engine, and statutory rules come from versioned country packs.',
        },
        {
          title: 'Do I need Core to use Crew?',
          content:
            'No. Crew can run on its own as your operational system, or alongside Core so its signal feeds Labor Intelligence, Pulse, and Foresight. You can also bring your own HR or payroll provider - Crew is optional by design.',
        },
        {
          title: 'How much does Crew cost?',
          content:
            '**Crew modules (monthly, org license + per location):**\n\n- **Scheduling** - $179 + $39/location\n- **Time & Attendance** - $99 + $19/location\n- **Payroll** - $129 + $29/location\n- **People & HR (Operations)** - $399 + $79/location\n- **People Intelligence** - $249 + $39/location\n\nBundles bring the suite together at a lower combined rate. Use pricing.sundae.io for exact plan math.',
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
            'أمامك خياران:\n\n1. **اعرف سعرك** - استخدم حاسبة الأسعار على pricing.sundae.io لتحديد باقة Core المناسبة لعدد مواقعك.\n\n2. **احجز عرضًا** - جلسة 15 دقيقة مع فريقنا لرؤية Sundae يعمل على بياناتك.',
        },
        {
          title: 'هل توجد باقة مجانية؟',
          content:
            'لا. كل باقات Sundae مدفوعة وتُسعَّر بدءًا من موقعك الأول. ما نقدمه هو جلسة عمل على أرقامك قبل الالتزام، لترى العائد قبل أن توقّع.',
        },
        {
          title: 'ما الفرق بين باقات Core؟',
          content:
            '**Core Foundation** - الأساس التشغيلي: ركيزة قرار واحدة فوق نقاط البيع والعمالة والتكلفة والعمليات.\n\n**Core Margin** - عمق في التكلفة والتسرب: النظري مقابل الفعلي، والهدر، والفاقد، والإلغاءات والمجانيات، ومساهمة كل صنف.\n\n**Core Growth** - عمق في الطلب: شرائح الضيوف وقيمتهم مدى الحياة، وإسناد العروض حسب القناة، وهامش التوصيل بعد العمولة.\n\n**Core Performance** - التجميع متعدد العلامات والمناطق، والترابط بين الوحدات، ووصول محوكم بسجل تدقيق.\n\nالأربع جميعًا تضم الوحدات الإحدى عشرة نفسها، والفرق في عمق كل وحدة.',
        },
        {
          title: 'هل أحتاج إلى عقد طويل الأجل؟',
          content:
            'لا. كل باقة متاحة شهريًا ويمكنك الإلغاء دون غرامة. الالتزام السنوي ولمدة سنتين موجود لأنه أقل تكلفة - خصم 10% و15% - لا لأنه إلزامي.',
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
            '**أربعة منتجات رئيسية:**\n\n1. **Sundae Core** (Foundation / Margin / Growth / Performance) - ركيزة القرار، وتضم الوحدات الإحدى عشرة كلها\n2. **Foresight & Action** - التوقعات ونمذجة السيناريوهات وطبقة التنفيذ باعتماد بشري\n3. **Sundae Crew** - الركيزة التشغيلية للقوى العاملة: الجداول والحضور وجاهزية الرواتب والموارد البشرية\n4. **Watchtower** - ذكاء السوق الخارجي، يُحدَّد ويُسعَّر مع باقة Core\n\n**إضافة إلى:** مفاهيم تشغيلية لنماذج العمل التي تديرها مجموعتك - الامتياز، والفنادق، والمطابخ السحابية، والتموين، والإنتاج، والمطابخ المؤجرة.',
        },
        {
          title: 'أي باقة Core أختار؟',
          content:
            '**Core Foundation إذا:**\n• كنت تنتقل من الجداول ولوحات المعلومات المتفرقة\n• أردت صورة تشغيلية واحدة قبل التعمق\n\n**Core Margin إذا:**\n• كان هامشك يذهب إلى تكلفة الطعام والهدر والإلغاءات والمجانيات\n• احتجت مساهمة كل صنف لا مجرد مزيج المبيعات\n\n**Core Growth إذا:**\n• كان الإيراد المتكرر ومزيج القنوات هو القيد\n• احتجت شرائح الضيوف وإسناد العروض وهامش التوصيل\n\n**Core Performance إذا:**\n• كنت تدير عدة علامات أو عدة أسواق\n• احتجت التجميع والترابط بين الوحدات والوصول المحوكم',
        },
        {
          title: 'هل يمكنني الترقية أو التخفيض لاحقًا؟',
          content:
            'نعم. يمكنك الانتقال بين الطبقات في أي وقت مع الحفاظ على بياناتك التاريخية، ولا توجد غرامات عند تغيير الخطة.',
        },
        {
          title: 'ما هو نموذج الذكاء رباعي الأبعاد 4D؟',
          content:
            'إطار Sundae لذكاء القرار:\n\n**1D: ماذا حدث** - حقيقة المبيعات والعمالة والتكلفة\n**2D: الخطة مقابل الفعلي** - انحراف الموازنة والتوقع\n**3D: سياق السوق** - المقارنات والأقران والمنافسون\n**4D: ما القادم** - التنبؤات والتوصيات\n\nكل باقة Core تغطي الأبعاد الأربعة، والباقة تحدد عمق كل بُعد.',
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
            '**لكل باقة Core:**\n• نظام نقاط البيع عبر API\n• نظام العمالة\n• نظام المخزون\n• منصات التسويق\n• نظام الحجوزات\n\nنقاط البيع وحدها تكفي لتحقيق قيمة من اليوم الأول، وما تبقى يعمّق الصورة كلما ربطته.',
        },
        {
          title: 'كيف أوصل بياناتي إلى Sundae؟',
          content:
            'عبر اتصالات API بنقاط البيع وبقية منظومتك التشغيلية. وحين لا يوفر نظام واجهة API، يقبل Sundae ملفات منظمة ورفعًا ذكيًا - PDF وExcel ولقطات الشاشة - تراجعها قبل المعالجة.',
        },
        {
          title: 'ما أنظمة POS التي تتكاملون معها؟',
          content:
            'يدعم Sundae حاليًا **4 منصات POS مباشرة**: Oracle MICROS Simphony وSquare وToast وClover. كما ندعم **موصلات قواعد البيانات المباشرة** لـ PostgreSQL وSQL Server / Azure SQL عندما يتيح النظام ذلك.\n\nإلى جانب POS، يربط محرك التكامل ذو **12 مجالًا** أكثر من 30 مزودًا عبر العمالة والمخزون والحجوزات والتوصيل والتسويق وتجربة الضيف وCRM والمحاسبة.\n\nإذا لم تجد نظامك، يمكن لطبقة Enterprise أن تشمل تكاملًا مخصصًا أو إدخالًا عبر webhooks.',
        },
        {
          title: 'هل يمكنني استخدام أكثر من نظام POS؟',
          content:
            'نعم. يتصل Sundae بأنظمة POS المختلطة ويوحّد البيانات للمقارنة العادلة، وتضيف Core Performance فوق ذلك التجميع عبر العلامات والمناطق.',
        },
        {
          title: 'كم يستغرق التنفيذ؟',
          content:
            'معظم المجموعات تعمل خلال أسبوع إلى أسبوعين. أما عمليات النشر الأكبر متعددة العلامات أو المناطق فتستغرق من أسبوعين إلى أربعة حسب النطاق.\n\nالتنفيذ رسوم لمرة واحدة، تُحتسب بأعلى فئة في اختيارك - من الخدمة الذاتية بلا تكلفة إلى ارتباط من الفئة D يُحدَّد نطاقه.',
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
            'ليست اختيارية وليست عمليات شراء منفصلة. الوحدات الإحدى عشرة تُشحن مع كل باقة Core.\n\nما تختاره هو الباقة، والباقة تحدد عمق كل وحدة.',
        },
        {
          title: 'هل يمكنني شراء وحدة واحدة؟',
          content:
            'لا. الوحدات الإحدى عشرة مكوّنات داخل باقة Core وليست منتجات مستقلة، ولا يوجد سعر لكل وحدة. اختيار الباقة هو طريقة الحصول عليها جميعًا.',
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
            'نعم. يعمل Watchtower بأفضل صورة حين تُركَّب إشاراته السوقية فوق بيانات تشغيل حية، وهو ما توفره باقة Core. ويُحدَّد ويُسعَّر مع باقتك لا كمنتج مستقل.',
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
            `يعتمد السعر على:\n• أي باقة Core\n• عدد المواقع\n• ما إذا كانت Foresight & Action أو Crew أو المفاهيم مشمولة\n\nتُسعَّر باقات Core بسعر أساسي للموقع الأول ثم سعر حدّي لكل موقع إضافي، وينخفض هذا السعر كلما نميت. تبدأ Core Foundation من ${usd(CORE_PACKAGES[0].firstUnitMonthly)} لموقعك الأول.\n\nللسعر الدقيق استخدم pricing.sundae.io.`,
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
            `تشغّل أرصدة الذكاء الأسئلة والتحليلات والتوصيات. وكل باقة Core تحمل رصيدًا شهريًا:\n\n${AI_WALLET_LINES}\n\nوإذا استنفدته يمكنك شراء رصيد إضافي على أي باقة.`,
        },
        {
          title: 'كم مدة الوصول إلى البيانات التاريخية؟',
          content:
            'كل باقة Core تحتفظ بتاريخك المتصل كاملًا مع احتفاظ لعدة سنوات. ويمكن لاتفاقيات Enterprise تمديد ذلك بشروط احتفاظ مخصصة.',
        },
        {
          title: 'كم مرة يتم تحديث البيانات؟',
          content:
            'يتحدث Core أثناء الوردية لا في نهاية اليوم، فتتحرك Pulse والوحدات بينما لا يزال بإمكانك التصرف. والوتيرة الدقيقة تعتمد على ما تتيحه أنظمتك المتصلة.',
        },
        {
          title: 'هل أحصل على لوحات معلومات مخصصة؟',
          content:
            'نعم. كل باقة Core تشمل لوحات مخصصة فوق العروض الجاهزة التي تأتي مع كل وحدة.',
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
            'كل باقة Core تشمل الدعم عبر البريد والدردشة والهاتف. وتضيف اتفاقيات Enterprise تغطية 24/7 وأزمنة استجابة تعاقدية ومسؤول نجاح عملاء مخصص.',
        },
        {
          title: 'هل توفرون تدريبًا؟',
          content:
            'نعم. التدريب جزء من التنفيذ، وهو رسوم لمرة واحدة تُحتسب بأعلى فئة في اختيارك - توثيق ذاتي بلا تكلفة، وجلسات موجهة وتمكين منظّم في الفئات الأعلى.',
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
            '**تقارير نقاط البيع:** نظام واحد، وسياق محدود، وتفسير يدوي\n\n**Sundae Core:** تحليل نقاط البيع مع المقارنات المرجعية والتوصيات وكشف الأنماط، عبر العمالة والتكلفة والضيف في صورة تشغيلية واحدة\n\n**Foresight & Action:** النظرة المستقبلية فوق ذلك - التوقعات والسيناريوهات والطبقة التي تنفّذ ما تكشفه',
        },
        {
          title: 'كيف يختلف Sundae عن Excel؟',
          content:
            '**Excel:** إدخال يدوي وتحليل ثابت ولا توجد طبقة ذكاء مشتركة\n\n**Sundae:** إدخال آلي، ومقارنة منظمة، ولوحات حية، وتوصيات تقلل وقت التحليل اليدوي أسبوعيًا',
        },
        {
          title: 'كم يمكنني أن أوفر مقارنة بالمنصات التقليدية؟',
          content:
            'كثيرًا ما يذكر المشغلون تكلفة إجمالية أقل بوضوح، لأن باقة Core تحتوي أصلًا على الوحدات الإحدى عشرة بدل تراكم رسوم لكل وحدة ولكل موقع. والفرق الدقيق يعتمد على مزيج أدواتك الحالي وحجم عملياتك.',
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
            'نعم. الموقع الواحد يحمل سعر الباقة الأساسي فقط، ويحصل على الوحدات الإحدى عشرة نفسها التي تحصل عليها مجموعة من خمسين موقعًا. وشرائح المواقع لا تصبح مهمة إلا حين تضيف مواقع.',
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
    {
      id: 'crew',
      icon: 'hr',
      faqs: [
        {
          title: 'ما هو Sundae Crew؟',
          content:
            'Sundae Crew هو المنظومة التشغيلية التي تدير فريقك: الجداول والحضور والانصراف وجاهزية الرواتب وسجلات الموارد البشرية وتحليلات القوى العاملة. كل وردية تُخطَّط وكل ساعة تُسجَّل وكل سجل يُحفَظ يتحول إلى إشارة تعود لتغذي ذكاء القرار لديك - فتتشارك العمليات والرؤى نظامًا واحدًا.',
        },
        {
          title: 'ماذا يستطيع Crew أن يفعل؟',
          content:
            '**خمس وحدات مترابطة:**\n\n1. **الجداول** - تخطيط الورديات وفق الطلب مع التحقق من الأهلية ومنشئ مدعوم بالذكاء الاصطناعي\n2. **الحضور والانصراف** - تسجيل الدخول والخروج والسياج الجغرافي وإقرار فترات الراحة واعتماد كشوف الأوقات\n3. **الرواتب** - جاهزية رواتب متعددة المناطق وتصدير قانوني (جاهزية وتصدير، وليس محرك ضرائب)\n4. **People & HR** - سجلات ووثائق الموظفين من التعيين حتى نهاية الخدمة\n5. **People Intelligence** - تحليلات القوى العاملة ومخاطر الغياب واتجاهات تكلفة العمالة',
        },
        {
          title: 'أي المناطق يدعمها نظام رواتب Crew؟',
          content:
            'تغطي جاهزية رواتب Crew والتصدير القانوني حاليًا **GCC** (UAE وKSA وQatar وBahrain وOman وKuwait) و**United States** (الفيدرالي وجميع الولايات) و**Canada** و**United Kingdom** و**European Union** (جميع الدول الأعضاء الـ 27). أما أمريكا اللاتينية وAPAC فهما على خارطة الطريق. يقوم Crew بإعداد الرواتب وتصديرها - وهو ليس محرك ضرائب، والقواعد القانونية تأتي من حزم قُطرية مُصدَّرة بإصدارات.',
        },
        {
          title: 'هل أحتاج إلى Core لاستخدام Crew؟',
          content:
            'لا. يمكن أن يعمل Crew بمفرده كنظامك التشغيلي، أو جنبًا إلى جنب مع Core لتغذي إشاراته Labor Intelligence وPulse وForesight. كما يمكنك إحضار مزود الموارد البشرية أو الرواتب الخاص بك - فـ Crew اختياري بحكم تصميمه.',
        },
        {
          title: 'كم تكلفة Crew؟',
          content:
            '**وحدات Crew (شهريًا، ترخيص مؤسسة + لكل موقع):**\n\n- **Scheduling** - $179 + $39/location\n- **Time & Attendance** - $99 + $19/location\n- **Payroll** - $129 + $29/location\n- **People & HR (Operations)** - $399 + $79/location\n- **People Intelligence** - $249 + $39/location\n\nتجمع الباقات المنظومة معًا بسعر إجمالي أقل. استخدم pricing.sundae.io للحساب الدقيق للخطة.',
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
            'Vous avez deux options :\n\n1. **Voir votre tarif** - Utilisez le calculateur sur pricing.sundae.io pour dimensionner une offre Core sur votre nombre de sites.\n\n2. **Reserver une demo** - 15 minutes avec notre equipe pour voir Sundae tourner sur vos donnees.',
        },
        {
          title: 'Existe-t-il une offre gratuite ?',
          content:
            'Non. Toutes les offres Sundae sont payantes et tarifees a partir de votre premier site. En revanche, nous faisons une session de travail sur vos propres chiffres avant tout engagement, pour que vous voyiez le retour avant de signer.',
        },
        {
          title: 'Quelle est la difference entre les offres Core ?',
          content:
            '**Core Foundation** - le socle operationnel : une seule base de decision sur le POS, la main-d oeuvre, les couts et l exploitation.\n\n**Core Margin** - profondeur sur les couts et les pertes : theorique contre reel, gaspillage, demarque, annulations et offerts, contribution par article.\n\n**Core Growth** - profondeur sur la demande : cohortes clients et valeur vie, attribution des promos par canal, marge livraison apres commission.\n\n**Core Performance** - consolidation multi-marques et multi-regions, correlation inter-modules, acces gouverne avec pistes d audit.\n\nLes quatre embarquent les memes onze modules metier. Ce qui change, c est la profondeur de chacun.',
        },
        {
          title: 'Dois-je signer un contrat long terme ?',
          content:
            'Non. Chaque offre est disponible au mois et resiliable sans penalite. Les engagements annuel et 2 ans existent parce qu ils coutent moins cher - 10 % et 15 % de remise - pas parce qu ils sont obligatoires.',
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
            '**Quatre produits principaux :**\n\n1. **Sundae Core** (Foundation / Margin / Growth / Performance) - la base de decision, qui embarque les onze modules metier\n2. **Foresight & Action** - previsions, modelisation de scenarios et couche d action validee par un humain\n3. **Sundae Crew** - le socle RH : plannings, temps et presence, preparation de la paie, dossiers et analytics people\n4. **Watchtower** - intelligence de marche externe, chiffree en meme temps que votre offre Core\n\n**Plus :** des concepts pour les modeles d exploitation de votre groupe - franchise, hotellerie F&B, cuisine virtuelle, traiteur, production, commissary en location.',
        },
        {
          title: 'Quelle offre Core choisir ?',
          content:
            '**Core Foundation si :**\n• Vous quittez les tableurs et les dashboards eparpilles\n• Vous voulez une seule image d exploitation avant d aller plus loin\n\n**Core Margin si :**\n• Votre marge part dans le cout matiere, le gaspillage, les annulations et les offerts\n• Vous avez besoin de la contribution par article, pas seulement du mix de ventes\n\n**Core Growth si :**\n• Le revenu recurrent et le mix de canaux sont la contrainte\n• Vous avez besoin des cohortes clients, de l attribution promo et de la marge livraison\n\n**Core Performance si :**\n• Vous exploitez plusieurs marques ou plusieurs marches\n• Vous avez besoin de consolidation, de correlation inter-modules et d acces gouverne',
        },
        {
          title: 'Puis-je changer de niveau plus tard ?',
          content:
            'Oui. Vous pouvez monter ou descendre de niveau à tout moment. Les données historiques sont conservées et il n’y a pas de pénalité de changement.',
        },
        {
          title: 'Qu’est-ce que le modèle 4D Intelligence ?',
          content:
            'Le cadre de decision Sundae :\n\n**1D : Ce qui s est passe** - la verite ventes, main-d oeuvre et couts\n**2D : Plan contre reel** - ecarts budget et prevision\n**3D : Contexte marche** - benchmarks, pairs et concurrents\n**4D : Ce qui arrive** - predictions et recommandations\n\nChaque offre Core couvre les quatre. L offre fixe la profondeur de chaque dimension.',
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
            '**Pour toute offre Core :**\n• Le POS via API\n• Le systeme de gestion du personnel\n• Le systeme d inventaire\n• Les plateformes marketing\n• Le systeme de reservations\n\nLe POS seul suffit pour avoir de la valeur des le premier jour. Le reste approfondit l image a mesure que vous connectez.',
        },
        {
          title: 'Comment importer mes données dans Sundae ?',
          content:
            'Via des connexions API a votre POS et au reste de votre pile operationnelle. Quand un systeme n a pas d API, Sundae accepte des depots de fichiers structures et des imports intelligents - PDF, Excel, captures - que vous validez avant traitement.',
        },
        {
          title: 'Quels POS sont pris en charge ?',
          content:
            'Sundae prend actuellement en charge **4 plateformes POS en direct** : Oracle MICROS Simphony, Square, Toast et Clover. Nous proposons aussi des **connecteurs base de données** pour PostgreSQL et SQL Server / Azure SQL lorsque le POS expose cet accès.\n\nAu-delà du POS, notre moteur d’intégration à **12 domaines** connecte plus de 30 fournisseurs pour la main-d’œuvre, l’inventaire, les réservations, la livraison, le marketing, l’expérience client, le CRM et la comptabilité.\n\nSi votre système n’apparaît pas, Enterprise peut inclure un travail d’intégration sur mesure ou des webhooks.',
        },
        {
          title: 'Puis-je utiliser plusieurs POS ?',
          content:
            'Oui. Sundae se connecte a des parcs POS heterogenes et normalise les donnees pour une comparaison a perimetre egal. Core Performance ajoute par-dessus la consolidation entre marques et regions.',
        },
        {
          title: 'Combien de temps prend le déploiement ?',
          content:
            'La plupart des groupes sont en production en 1 a 2 semaines. Les deploiements multi-marques ou multi-regions plus larges prennent 2 a 4 semaines selon le perimetre.\n\nLa mise en oeuvre est un frais unique, facture une fois a la classe la plus elevee de votre selection - du self-service gratuit jusqu a un engagement de classe D chiffre.',
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
            'Ils ne sont ni optionnels ni vendus separement. Les onze modules metier sont livres avec chaque offre Core.\n\nCe que vous choisissez, c est l offre, et l offre fixe la profondeur de chaque module.',
        },
        {
          title: 'Puis-je acheter un seul module ?',
          content:
            'Non. Les onze modules metier sont des composants d une offre Core, pas des produits autonomes, et il n existe pas de prix par module. Choisir une offre, c est les obtenir tous.',
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
            'Oui. Watchtower fonctionne mieux quand ses signaux de marche sont poses sur des donnees d exploitation en direct, ce que fournit une offre Core. Il est chiffre en meme temps que votre offre plutot que vendu seul.',
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
            `Le tarif depend de :\n• L offre Core retenue\n• Le nombre de sites\n• L inclusion ou non de Foresight & Action, de Crew ou des concepts\n\nLes offres Core sont tarifees a partir d un prix d ancrage sur le premier site, puis d un tarif marginal par site additionnel qui baisse a mesure que vous grandissez. Core Foundation demarre a ${usd(CORE_PACKAGES[0].firstUnitMonthly)} pour votre premier site.\n\nPour un chiffrage precis, utilisez pricing.sundae.io.`,
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
            `Les credits d intelligence alimentent les questions, les analyses et les recommandations. Chaque offre Core embarque un portefeuille mensuel :\n\n${AI_WALLET_LINES}\n\nSi vous l epuisez, vous pouvez le recharger sur n importe quelle offre.`,
        },
        {
          title: 'Quel historique est disponible ?',
          content:
            'Chaque offre Core conserve tout votre historique connecte avec une retention pluriannuelle. Les accords Enterprise peuvent l etendre avec des durees sur mesure.',
        },
        {
          title: 'À quelle fréquence les données sont-elles rafraîchies ?',
          content:
            'Core se rafraichit pendant le service et non en fin de journee, si bien que Pulse et les modules bougent tant que vous pouvez encore agir. La cadence exacte depend de ce que vos systemes connectes exposent.',
        },
        {
          title: 'Ai-je accès à des tableaux de bord personnalisés ?',
          content:
            'Oui. Chaque offre Core inclut des tableaux de bord personnalises en plus des vues prefabriquees livrees avec chaque module metier.',
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
            'Chaque offre Core inclut le support e-mail, chat et telephone. Les accords Enterprise ajoutent une couverture 24/7, des delais de reponse contractuels et un referent Customer Success dedie.',
        },
        {
          title: 'Proposez-vous de la formation ?',
          content:
            'Oui. La formation fait partie de la mise en oeuvre, un frais unique facture a la classe la plus elevee de votre selection - documentation en self-service gratuite, sessions guidees et programme structure aux classes superieures.',
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
            '**Rapports POS :** un seul systeme, contexte limite, interpretation manuelle\n\n**Sundae Core :** l analyse POS plus les benchmarks, les recommandations et la detection de motifs, sur la main-d oeuvre, les couts et le client dans une seule image d exploitation\n\n**Foresight & Action :** la vue avant par-dessus - previsions, scenarios, et la couche qui agit sur ce qu ils revelent',
        },
        {
          title: 'Quelle différence avec Excel ?',
          content:
            '**Excel :** saisie manuelle, analyse statique, pas de couche d’intelligence partagée\n\n**Sundae :** ingestion automatisée, benchmarking structuré, dashboards vivants et recommandations qui réduisent le temps d’analyse manuelle chaque semaine',
        },
        {
          title: 'Combien puis-je économiser face aux outils historiques ?',
          content:
            'Les exploitants constatent souvent un cout total nettement inferieur, parce qu une offre Core contient deja les onze modules metier au lieu d empiler des frais par module et par site. L ecart exact depend de votre pile actuelle et de votre perimetre.',
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
            'Oui. Un site unique porte le prix d ancrage de l offre et rien de plus, et il obtient les memes onze modules qu un groupe de cinquante sites. Les tranches de sites ne comptent qu a partir du moment ou vous ajoutez des sites.',
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
    {
      id: 'crew',
      icon: 'hr',
      faqs: [
        {
          title: 'Qu’est-ce que Sundae Crew ?',
          content:
            'Sundae Crew est la suite opérationnelle qui pilote vos équipes : planning, gestion des temps et présences, préparation de la paie, dossiers RH et analytique des effectifs. Chaque shift planifié, chaque heure pointée et chaque dossier enregistré devient un signal qui remonte vers votre intelligence décisionnelle - opérations et insight partagent ainsi un même système.',
        },
        {
          title: 'Que peut faire Crew ?',
          content:
            '**Cinq modules connectés :**\n\n1. **Scheduling** - planification des shifts pilotée par la demande, avec contrôle d’éligibilité et un générateur IA\n2. **Time & Attendance** - pointage entrée/sortie, géorepérage, attestation des pauses et validation des feuilles de temps\n3. **Payroll** - préparation de paie multi-régions et exports réglementaires (préparation et export, pas un moteur fiscal)\n4. **People & HR** - dossiers et documents des salariés, de l’embauche au départ\n5. **People Intelligence** - analytique des effectifs, risque de no-show et tendances du coût de la main-d’œuvre',
        },
        {
          title: 'Quelles régions la paie Crew prend-elle en charge ?',
          content:
            'La préparation de paie et les exports réglementaires de Crew couvrent aujourd’hui le **GCC** (UAE, KSA, Qatar, Bahrain, Oman, Kuwait), les **United States** (fédéral et tous les États), le **Canada**, le **United Kingdom** et l’**European Union** (les 27 États membres). L’Amérique latine et l’APAC sont sur la feuille de route. Crew prépare et exporte la paie - ce n’est pas un moteur fiscal, et les règles réglementaires proviennent de country packs versionnés.',
        },
        {
          title: 'Ai-je besoin de Core pour utiliser Crew ?',
          content:
            'Non. Crew peut fonctionner seul comme votre système opérationnel, ou aux côtés de Core pour que son signal alimente Labor Intelligence, Pulse et Foresight. Vous pouvez aussi apporter votre propre outil RH ou de paie - Crew est optionnel par conception.',
        },
        {
          title: 'Combien coûte Crew ?',
          content:
            '**Modules Crew (mensuel, licence organisation + par site) :**\n\n- **Scheduling** - $179 + $39/location\n- **Time & Attendance** - $99 + $19/location\n- **Payroll** - $129 + $29/location\n- **People & HR (Operations)** - $399 + $79/location\n- **People Intelligence** - $249 + $39/location\n\nDes bundles réunissent la suite à un tarif combiné plus avantageux. Utilisez pricing.sundae.io pour le calcul exact.',
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
            'Tienes dos opciones:\n\n1. **Ver tu precio** - Usa la calculadora en pricing.sundae.io para dimensionar un paquete Core segun tu numero de locales.\n\n2. **Reservar una demo** - 15 minutos con nuestro equipo para ver Sundae funcionando con tus datos.',
        },
        {
          title: '¿Hay un plan gratuito?',
          content:
            'No. Todos los paquetes de Sundae son de pago y se tarifican desde tu primer local. Lo que si hacemos es una sesion de trabajo con tus propios numeros antes de comprometerte, para que veas el retorno antes de firmar.',
        },
        {
          title: '¿En que se diferencian los paquetes Core?',
          content:
            '**Core Foundation** - la base operativa: un unico sustrato de decision sobre POS, personal, costes y operacion.\n\n**Core Margin** - profundidad en coste y fuga: teorico frente a real, merma, desperdicio, anulaciones e invitaciones, contribucion por articulo.\n\n**Core Growth** - profundidad en demanda: cohortes de clientes y valor de vida, atribucion de promociones por canal, margen de delivery tras comision.\n\n**Core Performance** - consolidacion multimarca y multirregion, correlacion entre modulos, acceso gobernado con auditoria.\n\nLos cuatro llevan los mismos once modulos de dominio. Lo que cambia es cuanto profundiza cada uno.',
        },
        {
          title: '¿Necesito un contrato a largo plazo?',
          content:
            'No. Cada paquete esta disponible mes a mes y puedes cancelar sin penalizacion. Los compromisos anual y de 2 anos existen porque cuestan menos - 10% y 15% de descuento - no porque sean obligatorios.',
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
            '**Cuatro productos principales:**\n\n1. **Sundae Core** (Foundation / Margin / Growth / Performance) - el sustrato de decision, que lleva los once modulos de dominio\n2. **Foresight & Action** - previsiones, modelado de escenarios y la capa de accion con aprobacion humana\n3. **Sundae Crew** - el sustrato de personal: horarios, control horario, preparacion de nominas, RR. HH. y people intelligence\n4. **Watchtower** - inteligencia de mercado externa, dimensionada junto a tu paquete Core\n\n**Ademas:** conceptos para los modelos operativos de tu grupo - franquicia, hotel F&B, cocina en la nube, catering, produccion y comisariato en alquiler.',
        },
        {
          title: '¿Que paquete Core elijo?',
          content:
            '**Core Foundation si:**\n• Estas saliendo de hojas de calculo y paneles sueltos\n• Quieres una sola imagen operativa antes de profundizar\n\n**Core Margin si:**\n• Tu margen se va en coste de comida, merma, anulaciones o invitaciones\n• Necesitas contribucion por articulo, no solo mix de ventas\n\n**Core Growth si:**\n• El ingreso recurrente y el mix de canales son la restriccion\n• Necesitas cohortes de clientes, atribucion de promociones y margen de delivery\n\n**Core Performance si:**\n• Operas varias marcas o varios mercados\n• Necesitas consolidacion, correlacion entre modulos y acceso gobernado',
        },
        {
          title: '¿Puedo subir o bajar de plan después?',
          content:
            'Sí. Puedes cambiar de nivel en cualquier momento. Los datos históricos se conservan y no hay penalizaciones por cambiar de plan.',
        },
        {
          title: '¿Qué es el modelo 4D Intelligence?',
          content:
            'El marco de decision de Sundae:\n\n**1D: Que paso** - la verdad de ventas, personal y coste\n**2D: Plan frente a real** - desviacion de presupuesto y prevision\n**3D: Contexto de mercado** - benchmarks, pares y competidores\n**4D: Que viene** - predicciones y recomendaciones\n\nCada paquete Core cubre las cuatro. El paquete marca cuanto profundiza cada dimension.',
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
            '**Para cualquier paquete Core:**\n• POS via API\n• Sistema de personal\n• Sistema de inventario\n• Plataformas de marketing\n• Sistema de reservas\n\nSolo con el POS ya obtienes valor el primer dia. El resto profundiza la imagen segun lo vas conectando.',
        },
        {
          title: '¿Cómo meto mis datos en Sundae?',
          content:
            'Mediante conexiones API a tu POS y al resto de tu pila operativa. Cuando un sistema no tiene API, Sundae acepta ficheros estructurados y cargas inteligentes - PDF, Excel, capturas - que revisas antes de procesar.',
        },
        {
          title: '¿Qué sistemas POS integráis?',
          content:
            'Sundae soporta actualmente **4 plataformas POS en directo**: Oracle MICROS Simphony, Square, Toast y Clover. También ofrecemos **conectores de base de datos** para PostgreSQL y SQL Server / Azure SQL cuando el POS expone ese acceso.\n\nAdemás del POS, el motor de integración de **12 dominios** conecta más de 30 proveedores en mano de obra, inventario, reservas, delivery, marketing, experiencia de cliente, CRM y contabilidad.\n\nSi tu sistema no aparece, Enterprise puede incluir integración a medida o ingestión vía webhooks.',
        },
        {
          title: '¿Puedo usar varios POS?',
          content:
            'Si. Sundae se conecta a parques POS mixtos y normaliza los datos para comparar con el mismo criterio. Core Performance anade encima la consolidacion entre marcas y regiones.',
        },
        {
          title: '¿Cuánto tarda la implementación?',
          content:
            'La mayoria de los grupos estan en produccion en 1 o 2 semanas. Los despliegues multimarca o multirregion mas grandes llevan de 2 a 4 semanas segun el alcance.\n\nLa implantacion es una cuota unica, cobrada una sola vez por la clase mas alta de tu seleccion: desde autoservicio sin coste hasta un compromiso de clase D dimensionado.',
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
            'No son opcionales ni compras separadas. Los once modulos de dominio vienen con cada paquete Core.\n\nLo que eliges es el paquete, y el paquete marca cuanto profundiza cada modulo.',
        },
        {
          title: '¿Puedo comprar un solo modulo?',
          content:
            'No. Los once modulos de dominio son componentes de un paquete Core, no productos independientes, y no hay precio por modulo. Elegir un paquete es como los obtienes todos.',
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
            'Si. Watchtower funciona mejor cuando sus senales de mercado se superponen a datos operativos en vivo, que es lo que aporta un paquete Core. Se dimensiona y cotiza junto a tu paquete, no por separado.',
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
            `El precio depende de:\n• Que paquete Core\n• El numero de locales\n• Si incluyes Foresight & Action, Crew o conceptos\n\nLos paquetes Core se tarifican desde un precio ancla en el primer local mas una tarifa marginal por cada local adicional, que baja segun creces. Core Foundation empieza en ${usd(CORE_PACKAGES[0].firstUnitMonthly)} para tu primer local.\n\nPara un precio exacto, usa pricing.sundae.io.`,
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
            `Los creditos de inteligencia alimentan preguntas, analisis y recomendaciones. Cada paquete Core lleva una bolsa mensual:\n\n${AI_WALLET_LINES}\n\nSi te la acabas, puedes recargar en cualquier paquete.`,
        },
        {
          title: '¿Cuánto histórico tendré disponible?',
          content:
            'Cada paquete Core conserva todo tu historico conectado con retencion de varios anos. Los acuerdos Enterprise pueden ampliarlo con plazos a medida.',
        },
        {
          title: '¿Con qué frecuencia se actualizan los datos?',
          content:
            'Core se actualiza durante el turno y no al cierre del dia, de modo que Pulse y los modulos se mueven mientras aun puedes actuar. La cadencia exacta depende de lo que expongan tus sistemas conectados.',
        },
        {
          title: '¿Tendré dashboards personalizados?',
          content:
            'Si. Cada paquete Core incluye paneles personalizados ademas de las vistas predefinidas que vienen con cada modulo de dominio.',
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
            'Cada paquete Core incluye soporte por email, chat y telefono. Los acuerdos Enterprise anaden cobertura 24/7, tiempos de respuesta contractuales y un responsable de Customer Success dedicado.',
        },
        {
          title: '¿Ofrecéis formación?',
          content:
            'Si. La formacion forma parte de la implantacion, una cuota unica cobrada por la clase mas alta de tu seleccion: documentacion de autoservicio sin coste, sesiones guiadas y habilitacion estructurada en las clases superiores.',
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
            '**Informes del POS:** un solo sistema, contexto limitado, interpretacion manual\n\n**Sundae Core:** analisis del POS mas benchmarks, recomendaciones y deteccion de patrones, sobre personal, coste y cliente en una sola imagen operativa\n\n**Foresight & Action:** la vista hacia delante encima: previsiones, escenarios y la capa que actua sobre lo que revelan',
        },
        {
          title: '¿En qué se diferencia Sundae de Excel?',
          content:
            '**Excel:** entrada manual, análisis estático y sin capa compartida de inteligencia\n\n**Sundae:** ingestión automatizada, benchmarking estructurado, dashboards vivos y recomendaciones que reducen horas de análisis manual cada semana',
        },
        {
          title: '¿Cuánto puedo ahorrar frente a plataformas antiguas?',
          content:
            'Los operadores suelen reportar un coste total bastante menor, porque un paquete Core ya contiene los once modulos de dominio en vez de acumular tarifas por modulo y por local. La diferencia exacta depende de tu mezcla de herramientas actual y de tu tamano.',
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
            'Si. Un solo local lleva el precio ancla del paquete y nada mas, y obtiene los mismos once modulos que un grupo de cincuenta. Los tramos de locales solo empiezan a importar cuando anades sitios.',
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
    {
      id: 'crew',
      icon: 'hr',
      faqs: [
        {
          title: '¿Qué es Sundae Crew?',
          content:
            'Sundae Crew es la suite operativa que gestiona a tu personal: horarios, control de tiempo y asistencia, preparación de nóminas, expedientes de RR. HH. y analítica de plantilla. Cada turno planificado, cada hora fichada y cada expediente registrado se convierte en una señal que vuelve a alimentar tu inteligencia de decisión, de modo que operaciones e insight comparten un mismo sistema.',
        },
        {
          title: '¿Qué puede hacer Crew?',
          content:
            '**Cinco módulos conectados:**\n\n1. **Scheduling** - planificación de turnos en función de la demanda, con control de elegibilidad y un generador con IA\n2. **Time & Attendance** - fichaje de entrada/salida, geovallado, atestación de descansos y aprobación de partes de horas\n3. **Payroll** - preparación de nóminas multirregión y exports legales (preparación y export, no un motor fiscal)\n4. **People & HR** - expedientes y documentos de empleados, desde la contratación hasta la baja\n5. **People Intelligence** - analítica de plantilla, riesgo de no-show y tendencias del coste laboral',
        },
        {
          title: '¿Qué regiones cubren las nóminas de Crew?',
          content:
            'La preparación de nóminas y los exports legales de Crew cubren hoy el **GCC** (UAE, KSA, Qatar, Bahrain, Oman, Kuwait), los **United States** (federal y todos los estados), **Canada**, el **United Kingdom** y la **European Union** (los 27 Estados miembros). América Latina y APAC están en el roadmap. Crew prepara y exporta las nóminas - no es un motor fiscal, y las reglas legales provienen de country packs versionados.',
        },
        {
          title: '¿Necesito Core para usar Crew?',
          content:
            'No. Crew puede funcionar por sí solo como tu sistema operativo, o junto a Core para que su señal alimente Labor Intelligence, Pulse y Foresight. También puedes traer tu propio proveedor de RR. HH. o de nóminas: Crew es opcional por diseño.',
        },
        {
          title: '¿Cuánto cuesta Crew?',
          content:
            '**Módulos de Crew (mensual, licencia de organización + por local):**\n\n- **Scheduling** - $179 + $39/location\n- **Time & Attendance** - $99 + $19/location\n- **Payroll** - $129 + $29/location\n- **People & HR (Operations)** - $399 + $79/location\n- **People Intelligence** - $249 + $39/location\n\nLos bundles reúnen la suite a un precio combinado más bajo. Usa pricing.sundae.io para el cálculo exacto.',
        },
      ],
    },
  ],
};

export function getLocalizedFaqSections(
  locale: WebsiteLocale,
  categoryTitles: readonly string[],
): LocalizedFaqSection[] {
  const sections = localizedFaqSections[locale as keyof typeof localizedFaqSections] ?? getGeneratedLocalCopy(localizedFaqSections, generatedLocalCopy.localizedFaqSections, locale) ?? localizedFaqSections.en;

  return sections.map((section, index) => ({
    ...section,
    title: categoryTitles[index] ?? localizedFaqSections.en[index]?.id ?? section.id,
  }));
}
