import React from 'react';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { SundaeIcon, type SundaeIconName } from '@/components/icons';
import { COMPANY } from '@/lib/company';
import { resolveWebsiteLocale, type WebsiteLocale } from '@/lib/i18n';

const companyAddressLines = [
  COMPANY.address.line1,
  COMPANY.address.line2,
  `${COMPANY.address.city}, ${COMPANY.address.state} ${COMPANY.address.zip}`,
  COMPANY.address.country,
];

type SectionGroup = {
  title?: string;
  paragraphs?: string[];
  bullets?: string[];
  subsections?: SectionGroup[];
};

type SectionCopy = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  subsections?: SectionGroup[];
};

type ContactCard = {
  title: string;
  value: string[] | string;
  icon: SundaeIconName;
  href?: string;
};

type PrivacyCopy = {
  badge: string;
  title: string;
  lastUpdatedLabel: string;
  noticeTitle: string;
  noticeBody: string;
  sections: SectionCopy[];
  contactHeading: string;
  contactDescription: string;
  cards: ContactCard[];
  buttons: {
    secondary: string;
    primary: string;
  };
};

const localizedPrivacyCopy: Record<Exclude<WebsiteLocale, 'en'>, PrivacyCopy> = {
  ar: {
    badge: 'الخصوصية',
    title: 'سياسة الخصوصية',
    lastUpdatedLabel: 'آخر تحديث: 3 مارس 2026',
    noticeTitle: 'خصوصيتك مهمة',
    noticeBody:
      'نلتزم بحماية معلوماتك الشخصية وبالشفافية بشأن كيفية جمع بياناتك واستخدامها ومشاركتها.',
    sections: [
      {
        title: '1. المقدمة',
        paragraphs: [
          'Sundae Technologies Inc.، وهي شركة مسجلة في ديلاوير بالولايات المتحدة وتعمل تحت اسم "Sundae" وتدير النطاقات sundae.io و sundaetech.ai و sundaetech.io و sundaetechnologies.com، تلتزم بحماية خصوصيتك وأمن معلوماتك الشخصية. وقد تقدم Sundae Technologies Inc. الخدمات مباشرة أو عبر الشركات التابعة أو الموزعين المعتمدين أو الشركاء الإقليميين.',
          'تشرح هذه السياسة كيف نجمع المعلومات ونستخدمها ونفصح عنها ونحميها عندما تقوم بما يلي:',
          'باستخدامك للخدمات، فإنك توافق على جمع معلوماتك واستخدامها وفقًا لهذه السياسة. وإذا لم توافق، فيجب عليك عدم استخدام الخدمات.',
          'يجب قراءة سياسة الخصوصية هذه مع شروط الخدمة الخاصة بنا، والتي توضح العلاقة التعاقدية بينك وبين Sundae وتعرّف مفاهيم مثل Customer Data و Aggregated Data و Benchmark Data.',
        ],
        bullets: [
          'زيارة مواقعنا الإلكترونية أو استخدامها.',
          'استخدام منصة ذكاء القرار المدعومة بالذكاء الاصطناعي ومنتجاتنا ذات الصلة، بما في ذلك Sundae Report.',
          'التفاعل معنا فيما يتصل بهذه الخدمات (ويشار إليها مجتمعة بـ "الخدمات").',
        ],
      },
      {
        title: '2. المعلومات التي نجمعها',
        paragraphs: ['نجمع أنواعًا مختلفة من المعلومات بحسب كيفية تفاعلك معنا والأجزاء من الخدمات التي تستخدمها.'],
        subsections: [
          {
            title: '2.1 المعلومات التي تقدمها لنا',
            paragraphs: [
              'نجمع المعلومات التي تقدمها لنا طوعًا، على سبيل المثال عندما تقوم بما يلي:',
            ],
            bullets: [
              'إنشاء حساب أو التسجيل في خدماتنا.',
              'إكمال عملية الإعداد أو التكامل.',
              'التواصل معنا مباشرة أو طلب الدعم.',
              'المشاركة في الاستطلاعات أو العروض الترويجية أو الفعاليات.',
              'تقديم الملاحظات أو الشهادات أو الرد على أبحاث المنتج.',
              'ربط خدمات الطرف الثالث، مثل أنظمة POS أو الموارد البشرية أو الرواتب أو المحاسبة أو CRM، بمنصتنا.',
            ],
          },
          {
            title: '2.2 بيانات المطاعم والأعمال (Customer Data)',
            paragraphs: [
              'في إطار خدماتنا للمطاعم وأعمال الضيافة، نجمع ونعالج بيانات الأعمال والعمليات التي تقدمها أنت أو مؤسستك أو تربطها بالمنصة ("Customer Data").',
              'وقد تتضمن هذه البيانات، دون حصر:',
            ],
            bullets: [
              'بيانات المبيعات والمعاملات من أنظمة POS، مثل الأصناف المباعة ومبالغ المعاملات والأطُر الزمنية وطرق الدفع والخصومات والعروض الترويجية.',
              'المقاييس التشغيلية مثل covers ودوران الطاولات والإشغال ومتوسط الفاتورة وأوقات الخدمة.',
              'بيانات المخزون وسلسلة الإمداد مثل مستويات المخزون وبيانات الطلبات وتكلفة البضائع المباعة.',
              'بيانات الموظفين والقوى العاملة مثل الجداول الزمنية والأدوار ومقاييس الأداء والمعرفات المجهولة؛ وننصحك بعدم تحميل أي بيانات شخصية حساسة غير ضرورية.',
              'البيانات المالية والمحاسبية مثل الإيرادات ومؤشرات P&L العامة.',
              'بيانات تفاعل العملاء مثل الملاحظات والتقييمات والمراجعات وسلوك الولاء، متى قدّمتها أنت أو تم تكاملها بواسطة فريقك.',
            ],
          },
          {
            title: '2.3 المعلومات المجمعة تلقائيًا',
            paragraphs: [
              'عند الوصول إلى الخدمات أو استخدامها، نجمع تلقائيًا بعض المعلومات عن جهازك واستخدامك ("Usage Data")، مثل:',
            ],
            bullets: [
              'معلومات الجهاز: عنوان IP ونوع المتصفح ونوع الجهاز ونظام التشغيل.',
              'بيانات الاستخدام: الصفحات أو الشاشات التي تم عرضها، والميزات المستخدمة، وتاريخ ووقت الزيارة، ومدة الاستخدام، والنقرات والتفاعلات.',
              'بيانات السجل: سجلات الوصول وتقارير الأخطاء وبيانات الأداء والتشخيص.',
              'معلومات تقريبية عن الموقع: المستمدة من عنوان IP أو إعدادات الجهاز، حيث يسمح القانون ويقتضي الأمر موافقتك.',
              'ملفات تعريف الارتباط والتقنيات المماثلة: المعرفات ومعلومات الجلسة والتفضيلات، كما هو موضح في القسم 9.',
            ],
          },
        ],
      },
      {
        title: '3. كيف نستخدم معلوماتك',
        paragraphs: ['نستخدم المعلومات التي نجمعها للأغراض التالية:'],
        bullets: [
          'تقديم الخدمات وتشغيلها: إعداد الحسابات وإدارتها، وتقديم لوحات المعلومات والتحليلات والرؤى المدعومة بالذكاء الاصطناعي، والتكامل مع أنظمة POS والأنظمة الأخرى.',
          'معالجة بياناتك وتحليلها: توليد التقارير ومؤشرات الأداء والتنبيهات والتوصيات من Customer Data، وإنشاء تحليلات المقارنة والbenchmarking بما في ذلك Sundae Report باستخدام Aggregated Data و Benchmark Data.',
          'تحسين الخدمات وتطويرها: مراقبة الأداء وأنماط الاستخدام، واستكشاف الأخطاء وإصلاحها، وتحسين الميزات، وتدريب نماذجنا وضبطها باستخدام بيانات مجمعة لا تحدد الأفراد أو نشاطك التجاري.',
          'تخصيص تجربتك: تذكر الإعدادات والتفضيلات، وتكييف المحتوى والميزات والاتصالات مع سياقك.',
          'التواصل معك: إرسال الإشعارات التشغيلية والتحديثات والتنبيهات الأمنية، والرد على طلباتك واستفساراتك، وتقديم دعم الإعداد ونجاح العميل، وإرسال معلومات عن الميزات والعروض والفعاليات الجديدة، مع إمكانية إلغاء الاشتراك في التسويق في أي وقت.',
          'ضمان الأمن ومنع سوء الاستخدام: اكتشاف الاحتيال والإساءة والحوادث الأمنية والتحقيق فيها ومنعها، وإنفاذ شروط الخدمة وسياساتنا الأخرى.',
          'الامتثال للالتزامات القانونية: الرد على الطلبات القانونية والإجراءات الرسمية، والاحتفاظ بالسجلات كما يقتضيه القانون، والامتثال لمتطلبات حماية البيانات والضرائب والمتطلبات التنظيمية الأخرى.',
        ],
        subsections: [
          {
            title: 'الأساس القانوني',
            paragraphs: [
              'بالنسبة للمستخدمين في المنطقة الاقتصادية الأوروبية/المملكة المتحدة أو غيرها من المناطق التي تتطلب أساسًا قانونيًا، نعتمد عادةً على:',
            ],
            bullets: [
              'تنفيذ العقد لتقديم الخدمات ودعمها.',
              'المصلحة المشروعة لتحسين الخدمات وتأمينها وإجراء التحليلات والتواصل معك بشأن الميزات ذات الصلة.',
              'الموافقة على بعض اتصالات التسويق وملفات تعريف الارتباط، وعند الحاجة لبعض أشكال المعالجة.',
              'الالتزامات القانونية عندما نحتاج إلى الاحتفاظ بالبيانات أو الكشف عنها.',
            ],
          },
        ],
      },
      {
        title: '4. مشاركة المعلومات والإفصاح عنها',
        paragraphs: ['لا نبيع معلوماتك الشخصية إلى أطراف ثالثة. وقد نشاركها في الحالات التالية:'],
        subsections: [
          {
            title: '4.1 بموافقتك أو بتوجيه منك',
            paragraphs: [
              'قد نشارك معلوماتك عندما توافق صراحةً على ذلك أو توجهنا للقيام به، على سبيل المثال عندما:',
            ],
            bullets: [
              'تسمح لنا بالاتصال بخدمات الطرف الثالث أو ربطها، مثل POS أو الموارد البشرية أو المحاسبة أو التكاملات الأخرى.',
              'تشارك تقارير أو مخرجات محددة مع أطراف ثالثة مثل الشركاء التجاريين أو المستشارين.',
            ],
          },
          {
            title: '4.2 مزودو الخدمات (المعالجون)',
            paragraphs: [
              'نعتمد على مزودي خدمات خارجيين موثوقين يقدمون خدمات نيابةً عنا، مثل الاستضافة السحابية والبنية التحتية، وتخزين البيانات والنسخ الاحتياطي، ومعالجة المدفوعات، وأدوات الدعم والاتصال، والتحليلات والتسجيل والمراقبة، وخدمات الأمن ومنع الاحتيال.',
              'هؤلاء المزودون ملزمون تعاقديًا باستخدام المعلومات فقط لتقديم الخدمات لنا وحمايتها بتدابير تقنية وتنظيمية مناسبة.',
              'وفي بعض المناطق، تقدم Sundae اشتراكات تجارية عبر موزعين وشركاء إقليميين معتمدين. وعند الاشتراك عبر موزع معتمد، قد يعمل ذلك الموزع كمعالج بيانات لأغراض إدارية وفوترة ودعم أولي محدودة، وتظل الالتزامات المنصوص عليها في هذه السياسة أوفر حماية.',
            ],
          },
          {
            title: '4.3 البيانات المجمعة وبيانات المقارنة',
            paragraphs: [
              'قد نشارك Aggregated Data و Benchmark Data المستمدة من Customer Data و Usage Data في شكل لا يعرّف بك أو بأي فرد. وقد يشمل ذلك تقارير القطاع، والمعايير المجهولة، ورؤى الأداء عبر القطاعات أو المناطق الجغرافية.',
            ],
          },
          {
            title: '4.4 المتطلبات القانونية وحماية الحقوق',
            paragraphs: ['قد نفصح عن معلوماتك إذا اعتقدنا أن ذلك ضروري من أجل:'],
            bullets: [
              'الامتثال للقانون أو اللوائح أو الإجراءات القانونية أو الطلبات الحكومية.',
              'حماية حقوق Sundae أو مستخدمينا أو الجمهور أو ممتلكاتهم أو سلامتهم.',
              'إنفاذ اتفاقياتنا، بما في ذلك شروط الخدمة.',
              'كشف الاحتيال أو المشكلات الأمنية أو التقنية ومنعها أو معالجتها.',
            ],
          },
          {
            title: '4.5 عمليات نقل الأعمال',
            paragraphs: [
              'إذا كانت Sundae Technologies Inc. أو أي من الشركات التابعة لها طرفًا في اندماج أو استحواذ أو تمويل أو إعادة هيكلة أو بيع لكل أو جزء من أعمالها أو أصولها، فقد تُنقل معلوماتك كجزء من تلك الصفقة. وسنتخذ خطوات معقولة لضمان التزام الجهة المستلمة بهذه السياسة أو بسياسة مشابهة إلى حد كبير، وسنخطرك متى كان القانون يتطلب ذلك.',
            ],
          },
        ],
      },
      {
        title: '5. أمن البيانات',
        paragraphs: [
          'نطبق تدابير أمنية تقنية وتنظيمية مناسبة لحماية معلوماتك من الوصول غير المصرح به أو التعديل أو الإفصاح أو الإتلاف. وتشمل هذه التدابير تشفير البيانات أثناء النقل وعند التخزين، والتخزين والنسخ الاحتياطي الآمن، وضوابط الوصول وآليات المصادقة، والتقييمات والمراقبة الأمنية المنتظمة، وتدريب الموظفين على ممارسات حماية البيانات، وإجراءات الاستجابة للحوادث والإشعار بالاختراق.',
          'ومع ذلك، لا توجد تدابير أمنية كاملة أو منيعة تمامًا، ولا يمكننا ضمان الأمن المطلق لمعلوماتك.',
        ],
      },
      {
        title: '6. الاحتفاظ بالبيانات',
        paragraphs: [
          'نحتفظ بمعلوماتك طالما كان ذلك ضروريًا بشكل معقول من أجل تقديم الخدمات ودعمها، وتحقيق الأغراض الموضحة في هذه السياسة، والامتثال لالتزاماتنا القانونية والتنظيمية، وتسوية النزاعات وإنفاذ اتفاقياتنا، والاحتفاظ بالسجلات التجارية والمالية المناسبة.',
          'وعند إغلاق حسابك، سنحذف معلوماتك الشخصية أو نجعلها مجهولة الهوية خلال فترة معقولة، عادةً خلال 90 يومًا، إلا إذا كان الاحتفاظ بها ضروريًا للامتثال القانوني أو لأغراض منع الاحتيال أو سجلات الحوادث الأمنية أو النزاعات المحتملة أو النسخ الاحتياطية الدورية.',
          'وقد نحتفظ بـ Aggregated Data و Benchmark Data المجهولة بحيث لا تحددك ولا تحدد مطعمك أو أي فرد، ويمكن استخدامها إلى أجل غير مسمى لأغراض تجارية مشروعة مثل المقارنة المرجعية وتحسين المنتج وتدريب النماذج والتحليلات والبحث وتحليل السوق، وذلك وفقًا للترخيص الممنوح في شروط الخدمة. ولا تخضع هذه البيانات لطلبات الحذف.',
        ],
      },
      {
        title: '7. حقوقك وخياراتك',
        paragraphs: [
          'اعتمادًا على موقعك والقانون الواجب التطبيق، قد تتمتع ببعض أو كل الحقوق التالية فيما يتعلق بمعلوماتك الشخصية:',
          'لممارسة هذه الحقوق، يرجى التواصل معنا على privacy@sundae.io. وسنرد وفقًا لقوانين حماية البيانات المعمول بها وقد نحتاج إلى التحقق من هويتك قبل تنفيذ الطلب.',
          'وقد يكون لديك أيضًا الحق في تقديم شكوى إلى سلطة حماية البيانات المحلية لديك. ونشجعك على التواصل معنا أولًا حتى نتمكن من محاولة حل مخاوفك.',
        ],
        bullets: [
          'الاطلاع: طلب نسخة من المعلومات الشخصية التي نحتفظ بها عنك.',
          'التصحيح: طلب تصحيح أو تحديث المعلومات غير الدقيقة أو غير الكاملة.',
          'الحذف: طلب حذف معلوماتك الشخصية مع مراعاة بعض الاستثناءات.',
          'التقييد: طلب تقييد معالجة معلوماتك في ظروف معينة.',
          'قابلية النقل: طلب نسخة منظمة ومستخدمة على نطاق واسع ومقروءة آليًا من معلومات معينة وطلب نقلها إلى جهة تحكم أخرى حيثما كان ذلك ممكنًا تقنيًا.',
          'الاعتراض: الاعتراض على بعض المعالجات القائمة على مصالحنا المشروعة، بما في ذلك التنميط.',
          'التسويق: إلغاء الاشتراك في الرسائل التسويقية المباشرة في أي وقت، مثل استخدام رابط "إلغاء الاشتراك" في رسائل البريد الإلكتروني.',
        ],
      },
      {
        title: '8. عمليات نقل البيانات الدولية',
        paragraphs: [
          'يقع المقر الرئيسي لـ Sundae في الولايات المتحدة، وقد نعالج المعلومات في الولايات المتحدة وفي بلدان أخرى نعمل فيها نحن أو مزودو الخدمة لدينا. وهذا يعني أن معلوماتك قد تُنقل وتُخزن وتُعالج خارج بلد إقامتك، بما في ذلك بلدان قد لا توفر نفس مستوى الحماية الذي توفره ولايتك القضائية.',
          'وعند اشتراط القانون، نطبق ضمانات مناسبة لعمليات النقل عبر الحدود، مثل البنود التعاقدية القياسية، أو الاعتماد على قرارات الملاءمة حيثما كانت متاحة، أو غيرها من آليات النقل المشروعة المسموح بها بموجب قوانين حماية البيانات.',
          'يمكنك التواصل معنا للحصول على مزيد من المعلومات حول الضمانات التي نستخدمها لعمليات النقل الدولية ذات الصلة بك.',
        ],
      },
      {
        title: '9. ملفات تعريف الارتباط وتقنيات التتبع',
        paragraphs: [
          'نستخدم ملفات تعريف الارتباط وتقنيات التتبع المماثلة، مثل إشارات الويب والبكسلات، لجمع وتخزين بعض المعلومات عند استخدامك لخدماتنا.',
          'وقد تكون ملفات تعريف الارتباط أساسية لتشغيل الموقع والمصادقة والأمان، أو تحليلية لفهم كيفية استخدام الخدمات وتحسينها، أو تفضيلية لتذكر الإعدادات والاختيارات، أو تسويقية لتقديم محتوى ملائم وقياس فعالية الحملات.',
          'يمكنك التحكم في ملفات تعريف الارتباط من خلال إعدادات المتصفح، وقد تسمح بعض الولايات القضائية أو تتطلب إدارة التفضيلات عبر لافتة موافقة مخصصة. وإذا عطلت بعض ملفات تعريف الارتباط، فقد لا تعمل بعض ميزات الخدمات بشكل صحيح.',
        ],
      },
      {
        title: '10. الروابط والخدمات التابعة لأطراف ثالثة',
        paragraphs: [
          'قد تحتوي خدماتنا على روابط إلى مواقع أو خدمات تابعة لأطراف ثالثة لا تملكها Sundae أو تتحكم بها. ولسنا مسؤولين عن ممارسات الخصوصية الخاصة بتلك الأطراف.',
          'ننصحك بمراجعة سياسات الخصوصية لأي خدمات طرف ثالث تصل إليها عبر منصتنا. وتسري هذه السياسة فقط على المعلومات التي تجمعها Sundae.',
        ],
      },
      {
        title: '11. خصوصية الأطفال',
        paragraphs: [
          'خدماتنا ليست موجهة للأطفال دون سن 13 عامًا. ولا نجمع عمدًا معلومات شخصية من الأطفال دون هذا السن. وإذا كنت أحد الوالدين أو الوصاة وتعتقد أن طفلك قد زودنا بمعلومات شخصية، فيرجى الاتصال بنا فورًا.',
          'إذا علمنا أننا جمعنا معلومات شخصية من طفل دون 13 عامًا دون التحقق من موافقة الوالدين، فسنتخذ خطوات لإزالة تلك المعلومات من خوادمنا.',
        ],
      },
      {
        title: '12. معلومات خاصة بالمناطق',
        subsections: [
          {
            title: '12.1 حقوق الخصوصية في كاليفورنيا (CCPA/CPRA)',
            paragraphs: [
              'إذا كنت مقيمًا في كاليفورنيا، فقد تتمتع بحقوق إضافية بموجب California Consumer Privacy Act، بصيغته المعدلة بواسطة CPRA، بما في ذلك الحق في معرفة فئات المعلومات الشخصية التي نجمعها وأغراض استخدامها، والحق في معرفة ما إذا كانت المعلومات تُباع أو تُشارك، والحق في الوصول إلى معلوماتك الشخصية وطلب حذفها في بعض الحالات، والحق في إلغاء الاشتراك في بعض "المبيعات" أو "المشاركة" إن كانت تنطبق، والحق في عدم التمييز عند ممارسة حقوقك.',
              'لا تبيع Sundae المعلومات الشخصية بالمعنى المعتاد في CCPA. ولممارسة حقوقك في كاليفورنيا، يمكنك مراسلتنا على privacy@sundae.io.',
            ],
          },
          {
            title: '12.2 المنطقة الاقتصادية الأوروبية/المملكة المتحدة – GDPR',
            paragraphs: [
              'إذا كنت في المنطقة الاقتصادية الأوروبية أو المملكة المتحدة، فإن GDPR و UK GDPR يمنحانك الحقوق الموضحة في القسم 7، ويتطلبان منا توضيح الأسس القانونية للمعالجة، وقد لخّصناها في القسم 3: العقد والمصالح المشروعة والموافقة والالتزامات القانونية.',
              'وإذا كنت تعتقد أن معالجتنا لمعلوماتك الشخصية تنتهك القانون المعمول به، فلديك الحق في تقديم شكوى إلى سلطة الرقابة المحلية لديك. ومع ذلك، نأمل أن تمنحنا فرصة لمعالجة مخاوفك أولًا.',
            ],
          },
          {
            title: '12.3 الإمارات العربية المتحدة، بما في ذلك DIFC و ADGM',
            paragraphs: [
              'إذا كنت موجودًا في الإمارات العربية المتحدة، بما في ذلك Dubai International Financial Centre (DIFC) أو Abu Dhabi Global Market (ADGM)، فإن الأحكام الإضافية التالية تنطبق عليك.',
            ],
            subsections: [
              {
                title: 'القانون الواجب التطبيق',
                paragraphs: [
                  'تتم معالجة معلوماتك الشخصية وفقًا لـ UAE Federal Decree-Law No. 45/2021، ولـ DIFC Data Protection Law No. 5 of 2020، ولـ ADGM Data Protection Regulations 2021 حسب الاقتضاء.',
                ],
              },
              {
                title: 'جهة التحكم والمعالج',
                paragraphs: [
                  'تعمل Sundae Technologies Inc. كجهة التحكم الرئيسية في المنصة. وعندما تدخل في اشتراك تجاري عبر Ambia Global Technologies Ltd، وهو موزعنا المعتمد في DIFC، تعمل Ambia كمعالج بيانات للبيانات الإدارية وبيانات الدعم المحدودة، بينما تعمل Sundae Technologies Inc. كمعالج فرعي للاستضافة وتشغيل المنصة والتحليلات. وتُوضح الأدوار والمسؤوليات بمزيد من التفصيل في اتفاقية معالجة البيانات المرفقة بأي اشتراك مؤسسي.',
                ],
              },
              {
                title: 'حقوقك',
                paragraphs: [
                  'قد تتمتع، وفقًا لقوانين حماية البيانات الإماراتية، بالحقوق التالية مع مراعاة بعض الشروط والاستثناءات: الوصول إلى البيانات الشخصية التي نحتفظ بها عنك، وطلب تصحيح البيانات غير الدقيقة أو غير الكاملة، وطلب حذف البيانات أو إتلافها عندما لا تعود ضرورية للغرض الذي جُمعت من أجله، وطلب تقييد المعالجة في بعض الظروف، والحق في نقل البيانات حيثما كان ذلك ممكنًا تقنيًا، والاعتراض على المعالجة القائمة على مصالحنا المشروعة، وسحب الموافقة عندما تستند المعالجة إلى موافقتك.',
                ],
              },
              {
                title: 'عمليات النقل عبر الحدود',
                paragraphs: [
                  'قد تُنقل معلوماتك الشخصية إلى الولايات المتحدة وبلدان أخرى نعمل فيها نحن أو مزودو الخدمة لدينا. وعند حدوث تلك التحويلات من الإمارات أو DIFC أو ADGM، نطبق الضمانات المناسبة التي يقتضيها القانون، بما في ذلك الحماية التعاقدية والتدابير التقنية لحماية بياناتك أثناء النقل وعند التخزين.',
                ],
              },
              {
                title: 'الشكاوى',
                paragraphs: [
                  'إذا كنت تعتقد أننا لم نلتزم بحقوقك في حماية البيانات، يمكنك تقديم شكوى إلى UAE Data Office، أو Commissioner of Data Protection في DIFC، أو الجهة المختصة في ADGM. ومع ذلك، نقدر دائمًا فرصة معالجة مخاوفك مباشرة أولًا على privacy@sundae.io.',
                ],
              },
            ],
          },
        ],
      },
      {
        title: '13. التغييرات على سياسة الخصوصية هذه',
        paragraphs: [
          'قد نقوم بتحديث هذه السياسة من وقت لآخر لتعكس التغييرات في ممارساتنا أو تقنياتنا أو المتطلبات القانونية أو لأسباب تشغيلية أخرى.',
          'وعند إجراء تغييرات جوهرية، سنتخذ خطوات معقولة لإخطارك، مثل نشر السياسة المحدثة على هذه الصفحة و/أو إرسال إشعار داخل الخدمات أو عبر البريد الإلكتروني.',
          'يشير تاريخ "آخر تحديث" في أعلى هذه السياسة إلى آخر مرة تم فيها تعديلها. ويعني استمرارك في استخدام الخدمات بعد سريان أي تغييرات أنك تقبل السياسة المحدثة.',
        ],
      },
      {
        title: '14. اتصل بنا',
        paragraphs: [
          'إذا كانت لديك أي أسئلة حول سياسة الخصوصية هذه أو ممارساتنا المتعلقة بالخصوصية، فيرجى التواصل معنا.',
          'سنتخذ خطوات معقولة للرد عليك خلال الإطار الزمني الذي يقتضيه القانون المعمول به.',
        ],
      },
    ],
    contactHeading: 'أسئلة حول خصوصيتك؟',
    contactDescription:
      'إذا كانت لديك أي أسئلة أو مخاوف بشأن سياسة الخصوصية هذه، فلا تتردد في التواصل معنا.',
    cards: [
      { title: 'راسلنا', value: COMPANY.privacyEmail, icon: 'support', href: `mailto:${COMPANY.privacyEmail}` },
      { title: 'اتصل بنا', value: '+971 (4) 501-7308', icon: 'support', href: 'tel:+97145017308' },
      { title: 'زورنا', value: companyAddressLines, icon: 'multiLocation' },
    ],
    buttons: {
      secondary: 'شروط الخدمة',
      primary: 'تواصل مع فريق الخصوصية',
    },
  },
  fr: {
    badge: 'Confidentialite',
    title: 'Politique de confidentialite',
    lastUpdatedLabel: 'Derniere mise a jour : 3 mars 2026',
    noticeTitle: 'Votre confidentialite compte',
    noticeBody:
      'Nous nous engageons a proteger vos informations personnelles et a etre transparents sur la facon dont nous collectons, utilisons et partageons vos donnees.',
    sections: [
      {
        title: '1. Introduction',
        paragraphs: [
          'Sundae Technologies Inc., societe constituee dans le Delaware, aux Etats-Unis, exploitant les domaines sundae.io, sundaetech.ai, sundaetech.io et sundaetechnologies.com ("Sundae", "nous", "notre" ou "nos"), s engage a proteger votre vie privee et la securite de vos informations personnelles. Sundae Technologies Inc. peut fournir ses services directement ou via des societes affiliees, des revendeurs autorises ou des partenaires regionaux.',
          'La presente Politique de confidentialite explique comment nous collectons, utilisons, divulguons et protégeons vos informations lorsque vous :',
          'En utilisant les Services, vous acceptez la collecte et l utilisation de vos informations conformement a cette Politique de confidentialite. Si vous ne l acceptez pas, vous ne devez pas utiliser les Services.',
          'Cette Politique de confidentialite doit etre lue conjointement avec nos Conditions d utilisation, qui décrivent la relation contractuelle entre vous et Sundae et definissent des notions comme Customer Data, Aggregated Data et Benchmark Data.',
        ],
        bullets: [
          'Visitez ou utilisez nos sites web.',
          'Utilisez notre plateforme de decision intelligence basee sur l IA et nos produits associes, y compris Sundae Report.',
          'Interagissez avec nous dans le cadre de ces services (ensemble, les "Services").',
        ],
      },
      {
        title: '2. Informations que nous collectons',
        paragraphs: ['Nous collectons differents types d informations selon la facon dont vous interagissez avec nous et les parties des Services que vous utilisez.'],
        subsections: [
          {
            title: '2.1 Informations que vous nous fournissez',
            paragraphs: ['Nous collectons les informations que vous nous fournissez volontairement, par exemple lorsque vous :'],
            bullets: [
              'creéz un compte ou vous inscrivez a nos Services ;',
              'terminez un processus d onboarding ou d integration ;',
              'nous contactez directement ou demandez de l assistance ;',
              'participez a des sondages, promotions ou evenements ;',
              'fournissez des retours, temoignages ou repondez a une recherche produit ;',
              'reliez des services tiers (POS, RH, paie, comptabilite ou CRM) a notre plateforme.',
            ],
          },
          {
            title: '2.2 Donnees de restaurant et d entreprise (Customer Data)',
            paragraphs: [
              'Dans le cadre de nos Services pour les restaurants et les entreprises de l hotellerie/restauration, nous collectons et traitons des donnees operationnelles et metier que vous ou votre organisation fournissez ou connectez a la plateforme ("Customer Data").',
              'Ces donnees peuvent inclure, sans s y limiter :',
            ],
            bullets: [
              'les donnees de ventes et de transactions issues des systemes POS, telles que les articles vendus, montants des transactions, horodatages, moyens de paiement, remises et promotions ;',
              'les indicateurs operationnels comme les couverts, rotations de tables, taux d occupation, panier moyen et temps de service ;',
              'les donnees d inventaire et de supply chain comme les niveaux de stock, les commandes et le cout des marchandises vendues ;',
              'les donnees des employes et des equipes, comme les plannings, les roles, les indicateurs de performance et les identifiants anonymises ; nous vous recommandons de ne pas telecharger de donnees personnelles sensibles inutiles ;',
              'les donnees financieres et comptables comme les revenus et les indicateurs P&L globaux ;',
              'les donnees d interaction client comme les retours, notes, avis et comportements de fidelite, lorsque vous les fournissez ou les integrez.',
            ],
          },
          {
            title: '2.3 Informations collectees automatiquement',
            paragraphs: [
              'Lorsque vous accedez aux Services ou les utilisez, nous collectons automatiquement certaines informations sur votre appareil et votre utilisation ("Usage Data"), notamment :',
            ],
            bullets: [
              'les informations sur l appareil : adresse IP, type de navigateur, type d appareil et systeme d exploitation ;',
              'les donnees d utilisation : pages ou ecrans consultes, fonctionnalites utilisees, date et heure de visite, temps passe, clics et interactions ;',
              'les donnees de journal : journaux d acces, rapports d erreur, donnees de performance et de diagnostic ;',
              'les informations de localisation approximative derivees de votre adresse IP ou des parametres de l appareil, lorsque la loi le permet et avec votre consentement si necessaire ;',
              'les cookies et technologies similaires : identifiants, informations de session et preferences, comme explique a la section 9.',
            ],
          },
        ],
      },
      {
        title: '3. Comment nous utilisons vos informations',
        paragraphs: ['Nous utilisons les informations que nous collectons pour les finalites suivantes :'],
        bullets: [
          'Fournir et exploiter les Services : creation et gestion de comptes, tableaux de bord, analyses et insights IA, integration avec vos systemes POS et autres.',
          'Traiter et analyser vos donnees : generation de rapports, KPI, alertes et recommandations a partir des Customer Data, ainsi que creation d analyses comparatives et de benchmarking, y compris Sundae Report, a partir des Aggregated Data et Benchmark Data.',
          'Ameliorer et developper les Services : suivi des performances et des usages, debogage, depannage, enrichissement des fonctionnalites et entrainement de nos modeles avec des donnees agrgeges qui n identifient ni des personnes ni votre entreprise.',
          'Personnaliser votre experience : memoriser vos parametres et preferences et adapter le contenu, les fonctionnalites et les communications a votre contexte.',
          'Communiquer avec vous : envoi d annonces de service, de mises a jour et d alertes de securite, reponse a vos demandes, support onboarding et customer success, ainsi que communications sur les nouvelles fonctionnalites, offres et evenements, avec possibilite de se desinscrire du marketing a tout moment.',
          'Garantir la securite et prevenir les abus : detection, enquete et prevention de la fraude, des abus et des incidents de securite, et application de nos Conditions d utilisation et autres politiques.',
          'Respecter les obligations legales : reponse aux demandes et procedures legales, conservation des registres requis par la loi, et respect des obligations de protection des donnees, fiscales et reglementaires.',
        ],
        subsections: [
          {
            title: 'Base legale',
            paragraphs: [
              'Pour les utilisateurs de l EEE/Royaume-Uni ou d autres regions exigeant une base legale, nous nous appuyons generalement sur :',
            ],
            bullets: [
              'l execution d un contrat pour fournir et soutenir les Services ;',
              'les interets legitimes pour ameliorer et securiser les Services, effectuer des analyses et communiquer avec vous au sujet de fonctionnalites pertinentes ;',
              'le consentement pour certaines communications marketing, certains cookies et, lorsque la loi l exige, pour certains traitements ;',
              'les obligations legales lorsque nous devons conserver ou divulguer des donnees.',
            ],
          },
        ],
      },
      {
        title: '4. Partage et divulgation des informations',
        paragraphs: ['Nous ne vendons pas vos informations personnelles a des tiers. Nous pouvons cependant les partager dans les cas suivants :'],
        subsections: [
          {
            title: '4.1 Avec votre consentement ou a votre demande',
            paragraphs: ['Nous pouvons partager vos informations lorsque vous y consentez expressement ou nous le demandez, par exemple lorsque vous :'],
            bullets: [
              'nous autorisez a nous connecter a des services tiers ou a des integrations (POS, RH, comptabilite ou autres) ;',
              'partagez des rapports ou resultats specifiques avec des tiers, tels que des partenaires ou des conseillers.',
            ],
          },
          {
            title: '4.2 Prestataires de services (sous-traitants)',
            paragraphs: [
              'Nous faisons appel a des prestataires tiers de confiance pour des services tels que l hebergement cloud, l infrastructure, le stockage et la sauvegarde, le traitement des paiements, les outils de support et de communication, les analyses et la surveillance, ainsi que les services de securite et de prevention de la fraude.',
              'Ces prestataires sont contractuellement tenus d utiliser les informations uniquement pour nous fournir des services et de les proteger avec des mesures techniques et organisationnelles appropriees.',
              'Dans certaines regions, Sundae fournit des abonnements commerciaux via des revendeurs et partenaires regionaux autorises. Lorsque vous souscrivez via un revendeur autorise, celui-ci peut agir comme sous-traitant pour des besoins administratifs, de facturation et de support initial limites, avec des obligations au moins aussi protectrices que celles de cette Politique.',
            ],
          },
          {
            title: '4.3 Donnees agregees et donnees de benchmarking',
            paragraphs: [
              'Nous pouvons partager des Aggregated Data et Benchmark Data issues des Customer Data et Usage Data sous une forme qui ne vous identifie pas, ni aucune personne. Cela peut inclure des rapports sectoriels, des benchmarks anonymises et des indicateurs de performance par segment ou par zone geographique.',
            ],
          },
          {
            title: '4.4 Exigences legales et protection des droits',
            paragraphs: ['Nous pouvons divulguer vos informations si nous estimons que cela est necessaire pour :'],
            bullets: [
              'respecter la loi, la reglementation, une procedure judiciaire ou une demande gouvernementale ;',
              'proteger les droits, les biens ou la securite de Sundae, de nos utilisateurs ou du public ;',
              'faire respecter nos accords, y compris les Conditions d utilisation ;',
              'detecter, prevenir ou traiter la fraude, les incidents de securite ou les problemes techniques.',
            ],
          },
          {
            title: '4.5 Transferts d entreprise',
            paragraphs: [
              'Si Sundae Technologies Inc. ou l une de ses filiales est impliquee dans une fusion, une acquisition, un financement, une restructuration ou la vente de tout ou partie de ses activites ou actifs, vos informations peuvent etre transferees dans le cadre de cette operation. Nous prendrons des mesures raisonnables pour que le destinataire respecte cette Politique ou une politique sensiblement equivalente, et nous vous informerons lorsque la loi l exige.',
            ],
          },
        ],
      },
      {
        title: '5. Securite des donnees',
        paragraphs: [
          'Nous mettons en place des mesures de securite techniques et organisationnelles appropriees pour proteger vos informations contre tout acces, alteration, divulgation ou destruction non autorises. Ces mesures comprennent le chiffrement des donnees en transit et au repos, des procedures de stockage et de sauvegarde securisees, des controles d acces et des mecanismes d authentification, des evaluations et une surveillance de securite regulieres, la formation des employes aux bonnes pratiques de protection des donnees, ainsi que des procedures de reponse aux incidents et de notification des violations.',
          'Malgre nos efforts, aucune mesure de securite n est parfaite ou infaillible. Nous ne pouvons pas garantir la securite absolue de vos informations.',
        ],
      },
      {
        title: '6. Conservation des donnees',
        paragraphs: [
          'Nous conservons vos informations aussi longtemps que raisonnablement necessaire pour fournir et soutenir les Services, remplir les finalites decrites dans cette Politique, respecter nos obligations legales et reglementaires, resoudre les litiges, faire respecter nos accords et tenir des registres commerciaux et financiers appropries.',
          'Lorsque vous fermez votre compte, nous supprimons ou anonymisons vos informations personnelles dans un delai raisonnable, generalement sous 90 jours, sauf si la conservation est necessaire pour des obligations legales, la prevention de la fraude, des journaux d incidents de securite, des litiges potentiels ou les sauvegardes periodiques.',
          'Les Aggregated Data et Benchmark Data anonymises, ne vous identifiant ni vous ni votre ou vos restaurants, ni aucune personne, et ne pouvant raisonnablement etre reidentifies, peuvent etre conserves et utilises indefiniment par Sundae a des fins commerciales legitimes, notamment le benchmarking, l amelioration produit, l entrainement de modeles, les analyses, la recherche et l analyse de marche, conformement a la licence accordee dans nos Conditions d utilisation. Ces donnees ne font pas l objet de demandes de suppression.',
        ],
      },
      {
        title: '7. Vos droits et vos choix',
        paragraphs: [
          'Selon votre localisation et le droit applicable, vous pouvez disposer de tout ou partie des droits suivants concernant vos informations personnelles :',
          'Pour exercer ces droits, contactez-nous a privacy@sundae.io. Nous repondrons conformement aux lois applicables sur la protection des donnees et pourrons devoir verifier votre identite avant de traiter votre demande.',
          'Vous pouvez egalement avoir le droit de deposer une plainte aupres de votre autorite locale de protection des donnees. Nous vous encourageons a nous contacter d abord afin que nous puissions tenter de resoudre votre demande.',
        ],
        bullets: [
          'Acces : obtenir une copie des informations personnelles que nous detenons a votre sujet.',
          'Rectification : demander la correction ou la mise a jour d informations inexactes ou incomplètes.',
          'Suppression : demander la suppression de vos informations personnelles, sous reserve de certaines exceptions.',
          'Restriction : demander la limitation du traitement dans certaines circonstances.',
          'Portabilite : obtenir une copie structuree, couramment utilisee et lisible par machine de certaines informations et demander leur transfert a un autre responsable lorsque cela est techniquement possible.',
          'Opposition : vous opposer a certains traitements fondes sur nos interets legitimes, y compris le profilage.',
          'Marketing : vous desinscrire a tout moment des communications marketing directes, par exemple via le lien de desinscription dans nos emails.',
        ],
      },
      {
        title: '8. Transferts internationaux de donnees',
        paragraphs: [
          'Sundae a son siege aux Etats-Unis et peut traiter des informations aux Etats-Unis et dans d autres pays ou nous ou nos prestataires operons. Vos informations peuvent donc etre transferees, stockees et traitees hors de votre pays de residence, y compris dans des pays qui ne fournissent pas le meme niveau de protection que votre juridiction.',
          'Lorsque la loi l exige, nous mettons en place des garanties appropriees pour les transferts transfrontaliers, telles que des clauses contractuelles standard, le recours a des decisions d adequation lorsqu elles existent, ou d autres mecanismes de transfert licites autorises par les lois sur la protection des donnees.',
          'Vous pouvez nous contacter pour obtenir plus d informations sur les garanties utilisees pour les transferts internationaux vous concernant.',
        ],
      },
      {
        title: '9. Cookies et technologies de suivi',
        paragraphs: [
          'Nous utilisons des cookies et technologies de suivi similaires, tels que les balises web et les pixels, pour collecter et stocker certaines informations lorsque vous utilisez nos Services.',
          'Les cookies peuvent etre essentiels au fonctionnement du site, a l authentification et a la securite, analytiques pour comprendre l usage des Services et les ameliorer, de preference pour memoriser vos parametres, ou marketing pour diffuser du contenu pertinent et mesurer l efficacite des campagnes.',
          'Vous pouvez controler les cookies via les parametres de votre navigateur, et certaines juridictions peuvent exiger ou autoriser la gestion des preferences via une banniere de consentement dediee. Si vous desactivez certains cookies, certaines fonctionnalites des Services peuvent ne pas fonctionner correctement.',
        ],
      },
      {
        title: '10. Liens et services tiers',
        paragraphs: [
          'Nos Services peuvent contenir des liens vers des sites ou services tiers qui ne sont ni detenus ni controles par Sundae. Nous ne sommes pas responsables des pratiques de confidentialite de ces tiers.',
          'Nous vous recommandons de consulter les politiques de confidentialite des services tiers auxquels vous accedez via notre plateforme. Cette Politique s applique uniquement aux informations collectees par Sundae.',
        ],
      },
      {
        title: '11. Confidentialite des enfants',
        paragraphs: [
          'Nos Services ne sont pas destines aux enfants de moins de 13 ans. Nous ne collectons pas sciemment d informations personnelles aupres d enfants de moins de 13 ans. Si vous etes parent ou tuteur et pensez que votre enfant nous a fourni des informations personnelles, veuillez nous contacter immediatement.',
          'Si nous apprenons que nous avons collecte des informations personnelles aupres d un enfant de moins de 13 ans sans verification du consentement parental, nous prendrons des mesures pour supprimer ces informations de nos serveurs.',
        ],
      },
      {
        title: '12. Informations specifiques aux regions',
        subsections: [
          {
            title: '12.1 Droits de confidentialite en Californie (CCPA/CPRA)',
            paragraphs: [
              'Si vous residez en Californie, vous pouvez disposer de droits supplementaires au titre du California Consumer Privacy Act, tel que modifie par le CPRA, notamment le droit de connaitre les categories de donnees personnelles collectees et leurs finalites, le droit de savoir si des informations sont vendues ou partagees, le droit d acceder a vos informations personnelles et d en demander la suppression dans certains cas, le droit de vous opposer a certaines "ventes" ou "partages" lorsqu ils sont applicables, et le droit de ne pas subir de discrimination pour l exercice de vos droits.',
              'Sundae ne vend pas d informations personnelles au sens general du CCPA. Pour exercer vos droits en Californie, vous pouvez nous contacter a privacy@sundae.io.',
            ],
          },
          {
            title: '12.2 EEE/Royaume-Uni - GDPR',
            paragraphs: [
              'Si vous vous trouvez dans l EEE ou au Royaume-Uni, le GDPR et le UK GDPR vous donnent les droits decrits a la section 7 et nous obligent a exposer nos bases legales, que nous avons resumees a la section 3 : contrat, interets legitimes, consentement et obligations legales.',
              'Si vous estimez que notre traitement de vos informations personnelles enfreint le droit applicable, vous avez le droit de deposer une plainte aupres de votre autorite de controle locale. Nous apprecierions toutefois la possibilite de traiter d abord vos inquietudes.',
            ],
          },
          {
            title: '12.3 Emirats arabes unis, y compris le DIFC et l ADGM',
            paragraphs: [
              'Si vous vous trouvez aux Emirats arabes unis, y compris au Dubai International Financial Centre (DIFC) ou a l Abu Dhabi Global Market (ADGM), les dispositions supplementaires suivantes s appliquent.',
            ],
            subsections: [
              {
                title: 'Droit applicable',
                paragraphs: [
                  'Vos informations personnelles sont traitees conformement au UAE Federal Decree-Law No. 45/2021, au DIFC Data Protection Law No. 5 of 2020 et aux ADGM Data Protection Regulations 2021, selon le cas.',
                ],
              },
              {
                title: 'Responsable et sous-traitant',
                paragraphs: [
                  'Sundae Technologies Inc. agit comme responsable principal de la plateforme. Lorsque vous souscrivez via Ambia Global Technologies Ltd, notre revendeur autorise au DIFC, Ambia agit comme sous-traitant pour les metadonnees administratives et de support limitees, tandis que Sundae Technologies Inc. agit comme sous-traitant ultérieur pour l hebergement, les operations de plateforme et les analyses. Les roles et responsabilites sont detailles dans l accord de traitement des donnees qui accompagne tout contrat enterprise.',
                ],
              },
              {
                title: 'Vos droits',
                paragraphs: [
                  'En vertu du droit applicable des Emirats arabes unis, vous pouvez disposer des droits suivants, sous reserve de certaines conditions et exceptions : acces aux donnees personnelles que nous detenons a votre sujet, rectification des donnees inexactes ou incompletes, suppression ou destruction lorsque les donnees ne sont plus necessaires, restriction du traitement dans certaines circonstances, portabilite lorsque cela est techniquement possible, opposition au traitement fonde sur nos interets legitimes, et retrait du consentement lorsque le traitement est fonde sur celui-ci.',
                ],
              },
              {
                title: 'Transferts transfrontaliers',
                paragraphs: [
                  'Vos informations personnelles peuvent etre transferees vers les Etats-Unis et d autres pays ou Sundae ou ses prestataires operent. Lorsque ces transferts ont lieu depuis les Emirats, le DIFC ou l ADGM, nous appliquons les garanties appropriees requises par la loi, y compris des protections contractuelles et des mesures techniques pour proteger vos donnees pendant le transfert et au repos.',
                ],
              },
              {
                title: 'Plaintes',
                paragraphs: [
                  'Si vous estimez que nous n avons pas respecte vos droits en matiere de protection des donnees, vous pouvez deposer une plainte aupres du UAE Data Office, du Commissioner of Data Protection du DIFC ou de l autorite competente de l ADGM. Nous apprecierions toutefois la possibilite de traiter directement vos inquietudes au prealable a privacy@sundae.io.',
                ],
              },
            ],
          },
        ],
      },
      {
        title: '13. Modifications de cette politique de confidentialite',
        paragraphs: [
          'Nous pouvons mettre a jour cette politique de temps a autre pour refleter l evolution de nos pratiques, technologies, exigences legales ou autres raisons operationnelles.',
          'Lors de changements importants, nous prendrons des mesures raisonnables pour vous en informer, par exemple en publiant la politique mise a jour sur cette page et/ou en vous envoyant une notification dans les Services ou par email.',
          'La date "Derniere mise a jour" en haut de cette politique indique sa derniere revision. Votre utilisation continue des Services apres l entree en vigueur des modifications vaut acceptation de la politique mise a jour.',
        ],
      },
      {
        title: '14. Nous contacter',
        paragraphs: [
          'Si vous avez des questions au sujet de cette Politique de confidentialite ou de nos pratiques, veuillez nous contacter.',
          'Nous prendrons des mesures raisonnables pour vous repondre dans les delais prevus par le droit applicable.',
        ],
      },
    ],
    contactHeading: 'Questions sur votre confidentialite ?',
    contactDescription:
      'Si vous avez des questions ou des inquietudes au sujet de cette Politique de confidentialite, n hesitez pas a nous contacter.',
    cards: [
      { title: 'Nous ecrire', value: COMPANY.privacyEmail, icon: 'support', href: `mailto:${COMPANY.privacyEmail}` },
      { title: 'Nous appeler', value: '+971 (4) 501-7308', icon: 'support', href: 'tel:+97145017308' },
      { title: 'Nous rendre visite', value: companyAddressLines, icon: 'multiLocation' },
    ],
    buttons: {
      secondary: "Conditions d utilisation",
      primary: "Contacter l equipe confidentialite",
    },
  },
  es: {
    badge: 'Privacidad',
    title: 'Politica de privacidad',
    lastUpdatedLabel: 'Ultima actualizacion: 3 de marzo de 2026',
    noticeTitle: 'Tu privacidad importa',
    noticeBody:
      'Nos comprometemos a proteger tu informacion personal y a ser transparentes sobre como recopilamos, usamos y compartimos tus datos.',
    sections: [
      {
        title: '1. Introduccion',
        paragraphs: [
          'Sundae Technologies Inc., sociedad constituida en Delaware, Estados Unidos, que opera bajo el nombre "Sundae" y administra los dominios sundae.io, sundaetech.ai, sundaetech.io y sundaetechnologies.com, se compromete a proteger tu privacidad y la seguridad de tu informacion personal. Sundae Technologies Inc. puede prestar servicios directamente o a traves de afiliados, revendedores autorizados o socios regionales.',
          'Esta Politica de privacidad explica como recopilamos, usamos, divulgamos y protegemos tu informacion cuando:',
          'Al utilizar los Servicios, aceptas la recopilacion y el uso de tu informacion de acuerdo con esta Politica de privacidad. Si no estas de acuerdo, no debes usar los Servicios.',
          'Esta Politica de privacidad debe leerse junto con nuestros Terminos de servicio, que describen la relacion contractual entre tu y Sundae y definen conceptos como Customer Data, Aggregated Data y Benchmark Data.',
        ],
        bullets: [
          'Visitas o utilizas nuestros sitios web.',
          'Utilizas nuestra plataforma de inteligencia de decisiones impulsada por IA y productos relacionados, incluido Sundae Report.',
          'Interactuas con nosotros en relacion con esos servicios (conjuntamente, los "Servicios").',
        ],
      },
      {
        title: '2. Informacion que recopilamos',
        paragraphs: ['Recopilamos distintos tipos de informacion segun como interactues con nosotros y que partes de los Servicios utilices.'],
        subsections: [
          {
            title: '2.1 Informacion que nos proporcionas',
            paragraphs: ['Recopilamos la informacion que nos proporcionas de forma voluntaria, por ejemplo cuando:'],
            bullets: [
              'creas una cuenta o te registras en nuestros Servicios;',
              'completas un proceso de onboarding o integracion;',
              'te comunicas directamente con nosotros o solicitas soporte;',
              'participas en encuestas, promociones o eventos;',
              'proporcionas comentarios, testimonios o respondes a investigaciones de producto;',
              'conectas servicios de terceros (POS, RR. HH., nomina, contabilidad o CRM) a nuestra plataforma.',
            ],
          },
          {
            title: '2.2 Datos de restaurante y negocio (Customer Data)',
            paragraphs: [
              'Como parte de nuestros Servicios para restaurantes y negocios de hosteleria, recopilamos y procesamos datos operativos y de negocio que tu o tu organizacion proporcionais o conectais a la plataforma ("Customer Data").',
              'Esto puede incluir, entre otros:',
            ],
            bullets: [
              'datos de ventas y transacciones de sistemas POS, como articulos vendidos, importes, marcas de tiempo, metodos de pago, descuentos y promociones;',
              'metricas operativas como covers, rotacion de mesas, ocupacion, ticket medio y tiempos de servicio;',
              'datos de inventario y cadena de suministro como niveles de stock, pedidos y coste de mercancias vendidas;',
              'datos de empleados y fuerza laboral como turnos, roles, metricas de rendimiento e identificadores anonimizados; recomendamos no cargar datos personales sensibles innecesarios;',
              'datos financieros y contables como ingresos y metricas generales de P&L;',
              'datos de interaccion con clientes como comentarios, valoraciones, reseñas y comportamiento de fidelidad, cuando los proporciones o los integres.',
            ],
          },
          {
            title: '2.3 Informacion recopilada automaticamente',
            paragraphs: [
              'Cuando accedes o utilizas los Servicios, recopilamos automaticamente cierta informacion sobre tu dispositivo y uso ("Usage Data"), como:',
            ],
            bullets: [
              'informacion del dispositivo: direccion IP, tipo de navegador, tipo de dispositivo y sistema operativo;',
              'datos de uso: paginas o pantallas vistas, funciones usadas, fecha y hora de visita, tiempo invertido, clics e interacciones;',
              'datos de registro: logs de acceso, informes de error y datos de rendimiento y diagnostico;',
              'informacion de ubicacion aproximada derivada de tu direccion IP o configuracion del dispositivo, cuando la ley lo permita y con tu consentimiento si es necesario;',
              'cookies y tecnologias similares: identificadores, informacion de sesion y preferencias, como se describe en la seccion 9.',
            ],
          },
        ],
      },
      {
        title: '3. Como usamos tu informacion',
        paragraphs: ['Usamos la informacion que recopilamos para los siguientes fines:'],
        bullets: [
          'Proporcionar y operar los Servicios: configuracion y gestion de cuentas, cuadros de mando, analiticas e insights impulsados por IA, e integracion con tus sistemas POS y otros sistemas.',
          'Procesar y analizar tus datos: generar informes, KPI, alertas y recomendaciones a partir de Customer Data, asi como crear analiticas comparativas y de benchmarking, incluido Sundae Report, usando Aggregated Data y Benchmark Data.',
          'Mejorar y desarrollar los Servicios: supervisar el rendimiento y los patrones de uso, depurar y resolver incidencias, mejorar funciones y entrenar nuestros modelos con datos agregados que no identifiquen a personas ni a tu negocio.',
          'Personalizar tu experiencia: recordar tus ajustes y preferencias y adaptar el contenido, las funciones y las comunicaciones a tu contexto.',
          'Comunicarnos contigo: enviar anuncios de servicio, actualizaciones y alertas de seguridad, responder a tus solicitudes, brindar soporte de onboarding y customer success, y enviarte informacion sobre nuevas funciones, ofertas y eventos, con la opcion de darte de baja del marketing en cualquier momento.',
          'Garantizar la seguridad y prevenir abusos: detectar, investigar y prevenir fraude, abusos e incidentes de seguridad, y hacer cumplir nuestros Terminos de servicio y otras politicas.',
          'Cumplir obligaciones legales: responder a solicitudes y procesos legales, mantener registros segun lo requiera la ley y cumplir con requisitos de proteccion de datos, fiscales y regulatorios.',
        ],
        subsections: [
          {
            title: 'Base juridica',
            paragraphs: [
              'Para usuarios en el EEE/Reino Unido u otras regiones que requieran una base juridica, solemos apoyarnos en:',
            ],
            bullets: [
              'la ejecucion de un contrato para proporcionar y dar soporte a los Servicios;',
              'los intereses legitimos para mejorar y proteger los Servicios, realizar analiticas y comunicarnos contigo sobre funciones relevantes;',
              'el consentimiento para determinadas comunicaciones de marketing, cookies y, cuando sea necesario, para tratamientos especificos;',
              'las obligaciones legales cuando debamos conservar o divulgar datos.',
            ],
          },
        ],
      },
      {
        title: '4. Intercambio y divulgacion de informacion',
        paragraphs: ['No vendemos tu informacion personal a terceros. Podemos compartirla en las siguientes circunstancias:'],
        subsections: [
          {
            title: '4.1 Con tu consentimiento o por tu indicacion',
            paragraphs: ['Podemos compartir tu informacion cuando lo consientas expresamente o nos indiques que lo hagamos, por ejemplo cuando:'],
            bullets: [
              'nos autorizas a conectarnos con servicios o integraciones de terceros, como POS, RR. HH., contabilidad u otras;',
              'compartes informes o resultados concretos con terceros, como socios o asesores.',
            ],
          },
          {
            title: '4.2 Proveedores de servicios (encargados)',
            paragraphs: [
              'Trabajamos con proveedores terceros de confianza para servicios como alojamiento en la nube, infraestructura, almacenamiento y copias de seguridad, procesamiento de pagos, herramientas de soporte y comunicacion, analitica y monitorizacion, y seguridad y prevencion de fraude.',
              'Estos proveedores estan contractualmente obligados a usar la informacion solo para prestarnos servicios y a protegerla con medidas tecnicas y organizativas adecuadas.',
              'En algunas regiones, Sundae ofrece suscripciones comerciales a traves de revendedores y socios regionales autorizados. Cuando contratas a traves de un revendedor autorizado, ese revendedor puede actuar como encargado de datos para fines administrativos, de facturacion y soporte inicial limitados, con obligaciones al menos tan protectoras como las descritas en esta politica.',
            ],
          },
          {
            title: '4.3 Datos agregados y datos de benchmarking',
            paragraphs: [
              'Podemos compartir Aggregated Data y Benchmark Data derivados de Customer Data y Usage Data en una forma que no te identifique a ti ni a ninguna persona. Esto puede incluir informes sectoriales, benchmarks anonimizados e informacion de rendimiento por segmento o geografia.',
            ],
          },
          {
            title: '4.4 Requisitos legales y proteccion de derechos',
            paragraphs: ['Podemos divulgar tu informacion si consideramos que es necesario para:'],
            bullets: [
              'cumplir con la ley, la regulacion, un proceso legal o una solicitud gubernamental;',
              'proteger los derechos, la propiedad o la seguridad de Sundae, nuestros usuarios o el publico;',
              'hacer cumplir nuestros acuerdos, incluidos los Terminos de servicio;',
              'detectar, prevenir o abordar fraude, incidentes de seguridad o problemas tecnicos.',
            ],
          },
          {
            title: '4.5 Transferencias de negocio',
            paragraphs: [
              'Si Sundae Technologies Inc. o cualquiera de sus afiliadas participa en una fusion, adquisicion, financiacion, reorganizacion o venta de la totalidad o parte de su negocio o activos, tu informacion puede transferirse como parte de esa operacion. Tomaremos medidas razonables para que el destinatario cumpla esta Politica o una politica sustancialmente similar, y te notificaremos cuando la ley lo requiera.',
            ],
          },
        ],
      },
      {
        title: '5. Seguridad de los datos',
        paragraphs: [
          'Implementamos medidas de seguridad tecnicas y organizativas apropiadas para proteger tu informacion frente al acceso, alteracion, divulgacion o destruccion no autorizados. Estas medidas incluyen cifrado de datos en transito y en reposo, almacenamiento y copias de seguridad seguras, controles de acceso y mecanismos de autenticacion, evaluaciones y monitorizacion de seguridad regulares, formacion del personal en proteccion de datos y procedimientos de respuesta a incidentes y notificacion de brechas.',
          'Aun asi, ninguna medida de seguridad es perfecta o impenetrable. No podemos garantizar la seguridad absoluta de tu informacion.',
        ],
      },
      {
        title: '6. Conservacion de datos',
        paragraphs: [
          'Conservamos tu informacion durante el tiempo razonablemente necesario para prestar y dar soporte a los Servicios, cumplir los fines descritos en esta Politica, cumplir obligaciones legales y regulatorias, resolver disputas, hacer cumplir nuestros acuerdos y mantener registros comerciales y financieros adecuados.',
          'Cuando cierras tu cuenta, eliminaremos o anonimizaremos tu informacion personal en un plazo razonable, normalmente dentro de 90 dias, salvo que la conservacion sea necesaria por obligaciones legales, prevencion de fraude, registros de incidentes de seguridad, disputas potenciales o copias de seguridad periodicas.',
          'Los Aggregated Data y Benchmark Data anonimizados de forma que no te identifiquen a ti ni a tu(s) restaurante(s) ni a ninguna persona, y que no puedan reidentificarse razonablemente, pueden conservarse y utilizarse indefinidamente por Sundae para fines comerciales legitimos, incluidos benchmarking, mejora de producto, entrenamiento de modelos, analitica, investigacion y analisis de mercado, de acuerdo con la licencia concedida en nuestros Terminos de servicio. Estos datos no estan sujetos a solicitudes de eliminacion.',
        ],
      },
      {
        title: '7. Tus derechos y opciones',
        paragraphs: [
          'Dependiendo de tu ubicacion y de la ley aplicable, puedes tener algunos o todos los siguientes derechos sobre tu informacion personal:',
          'Para ejercer estos derechos, contacta con nosotros en privacy@sundae.io. Responderemos conforme a las leyes de proteccion de datos aplicables y es posible que necesitemos verificar tu identidad antes de atender tu solicitud.',
          'Tambien puedes tener derecho a presentar una reclamacion ante tu autoridad local de proteccion de datos. Te animamos a contactarnos primero para que podamos intentar resolver tus inquietudes.',
        ],
        bullets: [
          'Acceso: solicitar una copia de la informacion personal que tenemos sobre ti.',
          'Rectificacion: solicitar que corrijamos o actualicemos informacion inexacta o incompleta.',
          'Eliminacion: solicitar que eliminemos tu informacion personal, sujeto a ciertas excepciones.',
          'Restriccion: solicitar que limitemos el tratamiento de tu informacion en determinadas circunstancias.',
          'Portabilidad: solicitar una copia estructurada, de uso comun y lectura mecanica de cierta informacion y pedir que la transfiramos a otro responsable cuando sea tecnicamente posible.',
          'Oposicion: oponerte a ciertos tratamientos basados en nuestros intereses legitimos, incluido el perfilado.',
          'Marketing: darte de baja en cualquier momento de las comunicaciones de marketing directo, por ejemplo mediante el enlace "cancelar suscripcion" de nuestros correos.',
        ],
      },
      {
        title: '8. Transferencias internacionales de datos',
        paragraphs: [
          'Sundae tiene su sede en Estados Unidos y puede procesar informacion en Estados Unidos y en otros paises donde operamos nosotros o nuestros proveedores. Esto significa que tu informacion puede transferirse, almacenarse y procesarse fuera de tu pais de residencia, incluso en paises que no ofrezcan el mismo nivel de proteccion que tu jurisdiccion.',
          'Cuando la ley lo exija, aplicamos salvaguardas adecuadas para las transferencias transfronterizas, como clausulas contractuales tipo, la confianza en decisiones de adecuacion cuando existan, u otros mecanismos licitos de transferencia permitidos por la normativa de proteccion de datos.',
          'Puedes contactarnos para obtener mas informacion sobre las salvaguardas que utilizamos para transferencias internacionales que te afecten.',
        ],
      },
      {
        title: '9. Cookies y tecnologias de seguimiento',
        paragraphs: [
          'Utilizamos cookies y tecnologias de seguimiento similares, como web beacons y pixels, para recopilar y almacenar cierta informacion cuando usas nuestros Servicios.',
          'Las cookies pueden ser esenciales para el funcionamiento del sitio, la autenticacion y la seguridad; analiticas para entender como se usan los Servicios y mejorarlos; de preferencias para recordar tus ajustes; o de marketing para mostrar contenido relevante y medir la eficacia de las campañas.',
          'Puedes controlar las cookies desde la configuracion de tu navegador, y algunas jurisdicciones pueden exigir o permitir la gestion de preferencias mediante una barra de consentimiento dedicada. Si desactivas ciertas cookies, algunas funciones de los Servicios pueden no funcionar correctamente.',
        ],
      },
      {
        title: '10. Enlaces y servicios de terceros',
        paragraphs: [
          'Nuestros Servicios pueden contener enlaces a sitios o servicios de terceros que no son propiedad ni estan controlados por Sundae. No somos responsables de las practicas de privacidad de esos terceros.',
          'Te recomendamos revisar las politicas de privacidad de los servicios de terceros a los que accedas a traves de nuestra plataforma. Esta Politica solo se aplica a la informacion recopilada por Sundae.',
        ],
      },
      {
        title: '11. Privacidad de los menores',
        paragraphs: [
          'Nuestros Servicios no estan destinados a menores de 13 anos. No recopilamos conscientemente informacion personal de menores de 13 anos. Si eres padre, madre o tutor y crees que tu hijo nos ha proporcionado informacion personal, contactanos de inmediato.',
          'Si llegamos a saber que hemos recopilado informacion personal de un menor de 13 anos sin verificar el consentimiento paterno, tomaremos medidas para eliminar esa informacion de nuestros servidores.',
        ],
      },
      {
        title: '12. Informacion especifica por region',
        subsections: [
          {
            title: '12.1 Derechos de privacidad en California (CCPA/CPRA)',
            paragraphs: [
              'Si resides en California, puedes tener derechos adicionales bajo la California Consumer Privacy Act, modificada por la CPRA, incluido el derecho a saber que categorias de informacion personal recopilamos y para que la usamos, el derecho a saber si la informacion se vende o comparte, el derecho a acceder y en algunos casos solicitar la eliminacion de tu informacion personal, el derecho a oponerte a ciertas "ventas" o "comparticiones" cuando procedan y el derecho a no sufrir discriminacion por ejercer tus derechos de privacidad.',
              'Sundae no vende informacion personal en el sentido general de la CCPA. Para ejercer tus derechos de California, puedes escribirnos a privacy@sundae.io.',
            ],
          },
          {
            title: '12.2 EEE/Reino Unido - GDPR',
            paragraphs: [
              'Si te encuentras en el EEE o en el Reino Unido, el GDPR y el UK GDPR te conceden los derechos descritos en la seccion 7 y nos obligan a explicar nuestras bases legales, que hemos resumido en la seccion 3: contrato, intereses legitimos, consentimiento y obligaciones legales.',
              'Si consideras que nuestro tratamiento de tu informacion personal infringe la ley aplicable, tienes derecho a presentar una reclamacion ante tu autoridad supervisora local. No obstante, agradeceriamos la oportunidad de atender primero tus inquietudes.',
            ],
          },
          {
            title: '12.3 Emiratos Arabes Unidos, incluido DIFC y ADGM',
            paragraphs: [
              'Si te encuentras en los Emiratos Arabes Unidos, incluido Dubai International Financial Centre (DIFC) o Abu Dhabi Global Market (ADGM), se aplican las siguientes disposiciones adicionales.',
            ],
            subsections: [
              {
                title: 'Ley aplicable',
                paragraphs: [
                  'Tu informacion personal se trata conforme al UAE Federal Decree-Law No. 45/2021, al DIFC Data Protection Law No. 5 of 2020 y a los ADGM Data Protection Regulations 2021, segun corresponda.',
                ],
              },
              {
                title: 'Responsable y encargado',
                paragraphs: [
                  'Sundae Technologies Inc. actua como responsable principal de la plataforma. Cuando contratas a traves de Ambia Global Technologies Ltd, nuestro revendedor autorizado en DIFC, Ambia actua como encargado de datos para metadatos administrativos y de soporte limitados, mientras que Sundae Technologies Inc. actua como subencargado para alojamiento, operacion de plataforma y analitica. Los roles y responsabilidades se describen con mas detalle en el Acuerdo de Tratamiento de Datos que forma parte de cualquier suscripcion enterprise.',
                ],
              },
              {
                title: 'Tus derechos',
                paragraphs: [
                  'Bajo la normativa aplicable de proteccion de datos de los EAU, puedes tener los siguientes derechos, sujetos a determinadas condiciones y excepciones: acceso a los datos personales que tenemos sobre ti, rectificacion de datos inexactos o incompletos, eliminacion o destruccion cuando los datos ya no sean necesarios para el fin para el que se recopilaron, restriccion del tratamiento en ciertas circunstancias, portabilidad cuando sea tecnicamente viable, oposicion al tratamiento basado en nuestros intereses legitimos y retiro del consentimiento cuando el tratamiento se base en este.',
                ],
              },
              {
                title: 'Transferencias transfronterizas',
                paragraphs: [
                  'Tu informacion personal puede transferirse a Estados Unidos y a otros paises donde operen Sundae o sus proveedores. Cuando estas transferencias se produzcan desde los EAU, DIFC o ADGM, aplicamos las salvaguardas adecuadas exigidas por la ley, incluidas protecciones contractuales y medidas tecnicas para proteger tus datos en transito y en reposo.',
                ],
              },
              {
                title: 'Reclamaciones',
                paragraphs: [
                  'Si consideras que no hemos cumplido tus derechos de proteccion de datos, puedes presentar una reclamacion ante el UAE Data Office, el Commissioner of Data Protection de DIFC o la autoridad competente de ADGM. Aun asi, agradecemos la oportunidad de atender primero tus inquietudes directamente en privacy@sundae.io.',
                ],
              },
            ],
          },
        ],
      },
      {
        title: '13. Cambios a esta Politica de privacidad',
        paragraphs: [
          'Podemos actualizar esta Politica de privacidad de vez en cuando para reflejar cambios en nuestras practicas, tecnologias, requisitos legales o por otros motivos operativos.',
          'Cuando realicemos cambios materiales, tomaremos medidas razonables para avisarte, por ejemplo publicando la Politica actualizada en esta pagina y/o enviando un aviso dentro de los Servicios o por correo electronico.',
          'La fecha "Ultima actualizacion" en la parte superior de esta Politica indica cuando se reviso por ultima vez. Tu uso continuado de los Servicios despues de que los cambios entren en vigor significara tu aceptacion de la Politica actualizada.',
        ],
      },
      {
        title: '14. Contacto',
        paragraphs: [
          'Si tienes preguntas sobre esta Politica de privacidad o sobre nuestras practicas de privacidad, contactanos.',
          'Tomaremos medidas razonables para responderte dentro de los plazos exigidos por la ley aplicable.',
        ],
      },
    ],
    contactHeading: '¿Preguntas sobre tu privacidad?',
    contactDescription:
      'Si tienes preguntas o inquietudes sobre esta Politica de privacidad, no dudes en contactarnos.',
    cards: [
      { title: 'Escribenos', value: COMPANY.privacyEmail, icon: 'support', href: `mailto:${COMPANY.privacyEmail}` },
      { title: 'Llamanos', value: '+971 (4) 501-7308', icon: 'support', href: 'tel:+97145017308' },
      { title: 'Visitanos', value: companyAddressLines, icon: 'multiLocation' },
    ],
    buttons: {
      secondary: 'Terminos del servicio',
      primary: 'Contactar al equipo de privacidad',
    },
  },
};

function renderSectionBody(section: SectionCopy) {
  return (
    <>
      {section.paragraphs?.map((paragraph) => (
        <p key={paragraph} className="text-[var(--text-secondary)] mb-4">
          {paragraph}
        </p>
      ))}
      {section.bullets ? (
        <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-2">
          {section.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      ) : null}
      {section.subsections?.map((subsection) => (
        <div key={subsection.title} className="mt-6">
          {subsection.title ? (
            <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">{subsection.title}</h3>
          ) : null}
          {subsection.paragraphs?.map((paragraph) => (
            <p key={paragraph} className="text-[var(--text-secondary)] mb-4">
              {paragraph}
            </p>
          ))}
          {subsection.bullets ? (
            <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-2">
              {subsection.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          ) : null}
        </div>
      ))}
    </>
  );
}

function LocalizedPrivacyPage({ copy }: { copy: PrivacyCopy }) {
  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <SundaeIcon name="owners" size="md" />
              <span>{copy.badge}</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-[var(--text-primary)] mb-6">
              {copy.title}
            </h1>
            <p className="text-xl text-[var(--text-supporting)] max-w-3xl mx-auto">
              {copy.lastUpdatedLabel}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <div className="bg-[rgba(28,71,255,0.1)] border-l-4 border-blue-400 p-6 mb-8">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-[#60A5FA]">
                    <strong>{copy.noticeTitle}:</strong> {copy.noticeBody}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              {copy.sections.map((section) => (
                <section key={section.title}>
                  <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">{section.title}</h2>
                  {renderSectionBody(section)}
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-6">{copy.contactHeading}</h2>
          <p className="text-xl text-[var(--text-supporting)] mb-8">{copy.contactDescription}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {copy.cards.map((card) => (
              <Card key={card.title} variant="elevated">
                <CardContent className="p-6 text-center">
                  <div className="w-10 h-10 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                    <SundaeIcon name={card.icon} size="lg" className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">{card.title}</h3>
                  {Array.isArray(card.value) ? (
                    <p className="text-[var(--text-supporting)] text-sm">
                      {card.value.map((line, index) => (
                        <React.Fragment key={line}>
                          {index > 0 ? <br /> : null}
                          {line}
                        </React.Fragment>
                      ))}
                    </p>
                  ) : (
                    <a href={card.href ?? '#'} className="text-[#60A5FA] hover:underline">
                      {card.value}
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/terms">
              <Button variant="outline-light">{copy.buttons.secondary}</Button>
            </Link>
            <Link href="/demo">
              <Button variant="primary">{copy.buttons.primary}</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default async function PrivacyPage() {
  const cookieStore = await cookies();
  const locale = resolveWebsiteLocale(cookieStore);
  const lastUpdated = "March 3, 2026";

  if (locale !== 'en') {
    return <LocalizedPrivacyPage copy={localizedPrivacyCopy[locale]} />;
  }

  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <SundaeIcon name="owners" size="md" />
              <span>Privacy</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-[var(--text-primary)] mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-[var(--text-supporting)] max-w-3xl mx-auto">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <div className="bg-[rgba(28,71,255,0.1)] border-l-4 border-blue-400 p-6 mb-8">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
+                  </svg>
+                </div>
+                <div className="ml-3">
+                  <p className="text-sm text-[#60A5FA]">
+                    <strong>Your Privacy Matters:</strong> We're committed to protecting your personal information and being transparent about how we collect, use, and share your data.
+                  </p>
+                </div>
+              </div>
+            </div>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">1. Introduction</h2>
                <p className="text-[var(--text-secondary)] mb-4">
                  <strong>Sundae Technologies Inc.</strong>, a company incorporated in Delaware, United States, trading as &ldquo;Sundae&rdquo; and operating the domains sundae.io, sundaetech.ai, sundaetech.io, and sundaetechnologies.com (&ldquo;Sundae&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), is committed to protecting your privacy and ensuring the security of your personal information. Sundae Technologies Inc. may provide services directly or through authorized affiliates, resellers, or regional partners.
                </p>
                <p className="text-[var(--text-secondary)] mb-4">
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you:
                </p>
                <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-2">
                  <li>Visit or use our websites,</li>
                  <li>Use our AI-powered decision-intelligence platform and related products (including Sundae Report), and</li>
                  <li>Interact with us in connection with those services (together, the "Services").</li>
                </ul>
                <p className="text-[var(--text-secondary)] mt-4 mb-4">
                  By using the Services, you agree to the collection and use of your information in accordance with this Privacy Policy. If you do not agree, you should not use the Services.
                </p>
                <p className="text-[var(--text-secondary)]">
                  This Privacy Policy should be read together with our Terms of Service, which describe the contractual relationship between you and Sundae and define concepts such as Customer Data, Aggregated Data, and Benchmark Data.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">2. Information We Collect</h2>
                <p className="text-[var(--text-secondary)] mb-4">
                  We collect different types of information depending on how you interact with us and which parts of the Services you use.
                </p>
                
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">2.1 Information You Provide to Us</h3>
                <p className="text-[var(--text-secondary)] mb-4">
                  We collect information that you voluntarily provide to us, for example when you:
                </p>
                <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-2">
                  <li>Create an account or register for our Services</li>
                  <li>Complete an onboarding or integration process</li>
                  <li>Contact us directly or request customer support</li>
                  <li>Participate in surveys, promotions, or events</li>
                  <li>Provide feedback, testimonials, or respond to product research</li>
                  <li>Connect third-party services (such as POS, HR, payroll, accounting, or CRM systems) to our platform</li>
                </ul>
                <p className="text-[var(--text-secondary)] mt-4">
                  This information may include:
                </p>
                <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-2">
                  <li><strong>Contact details:</strong> name, email address, phone number</li>
                  <li><strong>Professional details:</strong> company name, job title, role, industry segment</li>
                  <li><strong>Account details:</strong> username, password, preferences, communication settings</li>
                  <li><strong>Communications:</strong> messages you send us, feedback, support requests</li>
                  <li>Any other information you choose to provide.</li>
                </ul>

                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3 mt-6">2.2 Restaurant and Business Data (Customer Data)</h3>
                <p className="text-[var(--text-secondary)] mb-4">
                  As part of our Services for restaurants and hospitality businesses, we collect and process business and operational data that you or your organization provide or connect to the platform ("Customer Data").
                </p>
                <p className="text-[var(--text-secondary)] mb-4">
                  This may include, without limitation:
                </p>
                <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-2">
                  <li>Sales and transaction data from POS systems (e.g., items sold, transaction amounts, timestamps, payment methods, discounts, promotions)</li>
                  <li>Operational metrics (e.g., covers, table turns, occupancy, average check, service times)</li>
                  <li>Inventory and supply chain data (e.g., stock levels, ordering data, cost of goods sold)</li>
                  <li>Employee and workforce data (e.g., shift schedules, roles, performance metrics, anonymized identifiers; we advise you not to upload unnecessary sensitive personal data)</li>
                  <li>Financial and accounting data (e.g., revenue figures, high-level P&L metrics)</li>
                  <li>Customer interaction data (e.g., feedback, ratings, reviews, loyalty behavior, where provided or integrated by you).</li>
                </ul>
                <p className="text-[var(--text-secondary)] mt-4">
                  Much of this data will relate to your business, but some may contain personal information about your employees, contractors, or customers. Where you provide such data, you are responsible for ensuring that you have an appropriate legal basis to do so and that any required notices have been given.
                </p>

                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3 mt-6">2.3 Automatically Collected Information</h3>
                <p className="text-[var(--text-secondary)] mb-4">
                  When you access or use the Services, we automatically collect certain information about your device and usage ("Usage Data"), such as:
                </p>
                <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-2">
                  <li><strong>Device information:</strong> IP address, browser type, device type, operating system</li>
                  <li><strong>Usage data:</strong> pages or screens viewed, features used, time and date of visits, time spent, clicks and interactions</li>
                  <li><strong>Log data:</strong> access logs, error reports, performance and diagnostic data</li>
                  <li><strong>Approximate location information:</strong> derived from your IP address or device settings (where permitted by law and with your consent where required)</li>
                  <li><strong>Cookies and similar technologies:</strong> identifiers, session information, and preferences (see Section 9 below).</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">3. How We Use Your Information</h2>
                <p className="text-[var(--text-secondary)] mb-4">
                  We use the information we collect for the following purposes:
                </p>
                <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-2">
                  <li><strong>To provide and operate the Services</strong><br />Setting up and managing accounts<br />Providing dashboards, analytics, and AI-powered insights<br />Integrating with your POS and other systems</li>
                  <li><strong>To process and analyze your data</strong><br />Processing Customer Data to generate reports, KPIs, alerts, and recommendations<br />Creating comparative and benchmarking analytics (including Sundae Report) using Aggregated Data and Benchmark Data</li>
                  <li><strong>To improve and develop the Services</strong><br />Monitoring performance and usage patterns<br />Debugging, troubleshooting, and enhancing features<br />Training and tuning our models using Aggregated Data that does not identify individuals or your business</li>
                  <li><strong>To personalize your experience</strong><br />Remembering your settings and preferences<br />Tailoring content, features, and communications to your context</li>
                  <li><strong>To communicate with you</strong><br />Sending service-related announcements, updates, and security alerts<br />Responding to your requests and inquiries<br />Providing onboarding and customer success support<br />Sending you information about new features, offers, and events (you can opt out of marketing at any time)</li>
                  <li><strong>To ensure security and prevent misuse</strong><br />Detecting, investigating, and preventing fraud, abuse, and security incidents<br />Enforcing our Terms of Service and other policies</li>
                  <li><strong>To comply with legal obligations</strong><br />Responding to lawful requests and legal processes<br />Maintaining records as required by law<br />Complying with data protection, tax, and other regulatory requirements</li>
                </ul>
                <p className="text-[var(--text-secondary)] mt-4">
                  For users in the EEA/UK or other regions requiring a lawful basis, we generally rely on:
                </p>
                <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-2">
                  <li>Performance of a contract (to provide and support the Services),</li>
                  <li>Legitimate interests (to improve and secure the Services, perform analytics, and communicate with you about relevant features),</li>
                  <li>Consent (for certain marketing communications, cookies, and where required for specific processing), and</li>
                  <li>Legal obligations (where we must retain or disclose data).</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">4. Information Sharing and Disclosure</h2>
                <p className="text-[var(--text-secondary)] mb-4">
                  We do not sell your personal information to third parties.
                </p>
                <p className="text-[var(--text-secondary)] mb-4">
                  We may share your information in the following circumstances:
                </p>
                
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">4.1 With Your Consent or Direction</h3>
                <p className="text-[var(--text-secondary)] mb-4">
                  We may share your information when you explicitly consent to it or direct us to do so, for example when:
                </p>
                <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-2">
                  <li>You authorize us to connect with third-party services (POS, HR, accounting, or other integrations), or</li>
                  <li>You share specific reports or outputs with third parties (e.g., business partners, advisors).</li>
                </ul>

                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">4.2 Service Providers (Processors)</h3>
                <p className="text-[var(--text-secondary)] mb-4">
                  We use trusted third-party service providers who perform services on our behalf, such as:
                </p>
                <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-2">
                  <li>Cloud hosting and infrastructure</li>
                  <li>Data storage and backup</li>
                  <li>Payment processing</li>
                  <li>Customer support and communication tooling</li>
                  <li>Analytics, logging, and monitoring</li>
                  <li>Security and fraud prevention services</li>
                </ul>
                <p className="text-[var(--text-secondary)] mt-4">
                  These providers are contractually obligated to:
                </p>
                <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-2">
                  <li>Use the information only to provide services to us, and</li>
                  <li>Protect your information with appropriate technical and organizational measures.</li>
                </ul>
                <p className="text-[var(--text-secondary)] mt-4">
                  In certain territories, Sundae provides commercial subscriptions through authorised resellers and regional partners. Where you subscribe through an authorised reseller (such as Ambia Global Technologies Ltd in the DIFC, Dubai), that reseller may act as a data processor for limited administrative, billing, and first-line support purposes. Each authorised reseller is bound by data processing obligations at least as protective as those described in this Privacy Policy. Your reseller subscription agreement (including any Data Processing Addendum) provides further detail on the roles and responsibilities of each party.
                </p>

                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3 mt-6">4.3 Aggregated and Benchmark Data</h3>
                <p className="text-[var(--text-secondary)] mb-4">
                  We may share Aggregated Data and Benchmark Data derived from Customer Data and Usage Data in a form that does not identify you or any individual. This may include industry reports, anonymized benchmarks, and performance insights across segments or geographies.
                </p>

                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3 mt-6">4.4 Legal Requirements and Protection of Rights</h3>
                <p className="text-[var(--text-secondary)] mb-4">
                  We may disclose your information if we believe it is necessary to:
                </p>
                <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-2">
                  <li>Comply with applicable law, regulation, legal process, or governmental request</li>
                  <li>Protect the rights, property, or safety of Sundae, our users, or the public</li>
                  <li>Enforce our agreements, including the Terms of Service</li>
                  <li>Detect, prevent, or address fraud, security, or technical issues</li>
                </ul>

                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3 mt-6">4.5 Business Transfers</h3>
                <p className="text-[var(--text-secondary)]">
                  If Sundae Technologies Inc. or any of its affiliates is involved in a merger, acquisition, financing, reorganization, or sale of all or part of its business or assets, your information may be transferred as part of that transaction. We will take reasonable steps to ensure that the recipient honors this Privacy Policy or a substantially similar policy and, where required by law, we will notify you of such changes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">5. Data Security</h2>
                <p className="text-[var(--text-secondary)] mb-4">
                  We implement appropriate technical and organizational security measures to protect your information against unauthorized access, alteration, disclosure, or destruction. These measures include:
                </p>
                <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-2">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Secure data storage and backup procedures</li>
                  <li>Access controls and authentication mechanisms</li>
                  <li>Regular security assessments and monitoring</li>
                  <li>Employee training on data protection practices</li>
                  <li>Incident response and breach notification procedures</li>
                </ul>
                <p className="text-[var(--text-secondary)] mt-4">
                  Despite our efforts, no security measures are perfect or impenetrable. We cannot guarantee the absolute security of your information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">6. Data Retention</h2>
                <p className="text-[var(--text-secondary)] mb-4">
                  We retain your information for as long as reasonably necessary to:
                </p>
                <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-2">
                  <li>Provide and support the Services</li>
                  <li>Fulfill the purposes described in this Privacy Policy</li>
                  <li>Comply with our legal and regulatory obligations</li>
                  <li>Resolve disputes and enforce our agreements</li>
                  <li>Maintain appropriate business and financial records</li>
                </ul>
                <p className="text-[var(--text-secondary)] mt-4 mb-4">
                  When you close your account, we will delete or anonymize your personal information within a reasonable period (typically within 90 days), except where retention is necessary for:
                </p>
                <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-2">
                  <li>Compliance with legal or regulatory obligations</li>
                  <li>Fraud prevention and security incident logs</li>
                  <li>Pending or potential disputes</li>
                  <li>Backup and disaster recovery (where data will be securely stored and then deleted in line with our retention cycles)</li>
                </ul>
                <p className="text-[var(--text-secondary)] mt-4">
                  Aggregated Data and Benchmark Data that has been anonymised such that it does not identify you, your restaurant(s), or any individual, and cannot reasonably be re-identified, may be retained and used by Sundae indefinitely for legitimate business purposes, including benchmarking, product improvement, model training, analytics, research, and market analysis, in accordance with the licence granted in our Terms of Service (Section 13.4). This data is not subject to deletion requests.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">7. Your Rights and Choices</h2>
                <p className="text-[var(--text-secondary)] mb-4">
                  Depending on your location and applicable law, you may have some or all of the following rights regarding your personal information:
                </p>
                <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-2">
                  <li><strong>Access:</strong> Request a copy of the personal information we hold about you.</li>
                  <li><strong>Correction:</strong> Request that we correct or update inaccurate or incomplete information.</li>
                  <li><strong>Deletion:</strong> Request that we delete your personal information, subject to certain exceptions.</li>
                  <li><strong>Restriction:</strong> Request that we restrict our processing of your information in certain circumstances.</li>
                  <li><strong>Portability:</strong> Request a structured, commonly used, machine-readable copy of certain information and request that we transfer it to another controller where technically feasible.</li>
                  <li><strong>Objection:</strong> Object to certain processing based on our legitimate interests, including profiling.</li>
                  <li><strong>Marketing:</strong> Opt out of direct marketing communications at any time (for example, via the "unsubscribe" link in our emails).</li>
                </ul>
                <p className="text-[var(--text-secondary)] mt-4 mb-4">
                  To exercise these rights, please contact us at <a href="mailto:privacy@sundae.io" className="text-[#60A5FA] hover:underline">privacy@sundae.io</a>. We will respond in accordance with applicable data protection laws and may need to verify your identity before fulfilling your request.
                </p>
                <p className="text-[var(--text-secondary)]">
                  You may also have the right to lodge a complaint with your local data protection authority. We encourage you to contact us first so we can attempt to resolve your concerns.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">8. International Data Transfers</h2>
                <p className="text-[var(--text-secondary)] mb-4">
                  Sundae is headquartered in the United States and may process information in the US and in other countries where we or our service providers operate. This means your information may be transferred to, stored, and processed outside your country of residence, including in countries that may not provide the same level of data protection as your home jurisdiction.
                </p>
                <p className="text-[var(--text-secondary)] mb-4">
                  Where required by law (for example, for users in the European Economic Area (EEA), United Kingdom, or other regions with data transfer restrictions), we implement appropriate safeguards for cross-border transfers, such as:
                </p>
                <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-2">
                  <li>Standard Contractual Clauses approved by the European Commission or other competent authorities;</li>
                  <li>Reliance on adequacy decisions where available; and/or</li>
                  <li>Other lawful transfer mechanisms permitted under applicable data protection laws.</li>
                </ul>
                <p className="text-[var(--text-secondary)] mt-4">
                  You can contact us for more information about the safeguards we use for international transfers relevant to you.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">9. Cookies and Tracking Technologies</h2>
                <p className="text-[var(--text-secondary)] mb-4">
                  We use cookies and similar tracking technologies (such as web beacons and pixels) to collect and store certain information when you use our Services.
                </p>
                <p className="text-[var(--text-secondary)] mb-4">
                  Cookies may be:
                </p>
                <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-2">
                  <li><strong>Essential cookies:</strong> Required for core site functionality, authentication, and security.</li>
                  <li><strong>Analytics cookies:</strong> Helping us understand how the Services are used so we can improve them.</li>
                  <li><strong>Preference cookies:</strong> Remembering your settings and choices.</li>
                  <li><strong>Marketing cookies:</strong> Used to deliver relevant content and measure the effectiveness of campaigns.</li>
                </ul>
                <p className="text-[var(--text-secondary)] mt-4">
                  You can control cookies through your browser settings, and some jurisdictions may require or allow you to manage cookie preferences via a dedicated consent banner. If you choose to disable certain cookies, some features of the Services may not function properly.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">10. Third-Party Links and Services</h2>
                <p className="text-[var(--text-secondary)] mb-4">
                  Our Services may contain links to third-party websites or services that are not owned or controlled by Sundae. We are not responsible for the privacy practices of these third parties.
                </p>
                <p className="text-[var(--text-secondary)]">
                  We recommend that you review the privacy policies of any third-party services you access through our platform. This Privacy Policy applies only to information collected by Sundae.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">11. Children's Privacy</h2>
                <p className="text-[var(--text-secondary)] mb-4">
                  Our Services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
                </p>
                <p className="text-[var(--text-secondary)]">
                  If we become aware that we have collected personal information from children under 13 without verification of parental consent, we will take steps to remove that information from our servers.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">12. Region-Specific Information</h2>
                
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">12.1 California Privacy Rights (CCPA/CPRA)</h3>
                <p className="text-[var(--text-secondary)] mb-4">
                  If you are a California resident, you may have additional rights under the California Consumer Privacy Act (CCPA), as amended by the CPRA, including:
                </p>
                <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-2">
                  <li>The right to know the categories of personal information collected and the purposes for which it is used;</li>
                  <li>The right to know whether personal information is sold or shared;</li>
                  <li>The right to access and, in some cases, request deletion of your personal information;</li>
                  <li>The right to opt out of certain "sales" or "sharing" of personal information (where applicable);</li>
                  <li>The right to non-discrimination for exercising your privacy rights.</li>
                </ul>
                <p className="text-[var(--text-secondary)] mt-4">
                  Sundae does not sell personal information as that term is generally defined under the CCPA. To exercise your California rights, you may contact us at <a href="mailto:privacy@sundae.io" className="text-[#60A5FA] hover:underline">privacy@sundae.io</a>.
                </p>

                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3 mt-6">12.2 EEA/UK – GDPR</h3>
                <p className="text-[var(--text-secondary)] mb-4">
                  If you are in the EEA or UK, the General Data Protection Regulation (GDPR) and UK GDPR give you the rights described in Section 7, and require us to describe our lawful bases for processing, which we have summarized in Section 3 (contract, legitimate interests, consent, legal obligations).
                </p>
                <p className="text-[var(--text-secondary)]">
                  If you believe our processing of your personal information infringes applicable law, you have the right to lodge a complaint with your local supervisory authority. We would, however, appreciate the chance to deal with your concerns first.
                </p>

                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3 mt-6">12.3 United Arab Emirates (including DIFC and ADGM)</h3>
                <p className="text-[var(--text-secondary)] mb-4">
                  If you are located in the United Arab Emirates, including the Dubai International Financial Centre (DIFC) or Abu Dhabi Global Market (ADGM), the following additional provisions apply to you:
                </p>

                <h4 className="text-lg font-semibold text-[var(--text-primary)] mb-2">Applicable Law</h4>
                <p className="text-[var(--text-secondary)] mb-4">
                  Your personal information is processed in accordance with:
                </p>
                <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-2 mb-4">
                  <li>UAE Federal Decree-Law No. 45/2021 on the Protection of Personal Data, as amended, and its implementing regulations (for users in mainland UAE);</li>
                  <li>DIFC Data Protection Law No. 5 of 2020, as amended (for users whose data is processed by entities established in the DIFC); and/or</li>
                  <li>ADGM Data Protection Regulations 2021, as applicable.</li>
                </ul>

                <h4 className="text-lg font-semibold text-[var(--text-primary)] mb-2">Data Controller and Processor</h4>
                <p className="text-[var(--text-secondary)] mb-4">
                  Sundae Technologies Inc. acts as the primary data controller for the Platform. Where you enter into a commercial subscription through Ambia Global Technologies Ltd (our authorised reseller in the DIFC), Ambia acts as a data processor for limited administrative and support metadata, and Sundae Technologies Inc. acts as a sub-processor for hosting, platform operations, and analytics. The roles and responsibilities are described in detail in the Data Processing Addendum that forms part of any enterprise subscription agreement.
                </p>

                <h4 className="text-lg font-semibold text-[var(--text-primary)] mb-2">Your Rights</h4>
                <p className="text-[var(--text-secondary)] mb-4">
                  Under applicable UAE data protection law, you may have the following rights (subject to certain conditions and exceptions):
                </p>
                <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-2 mb-4">
                  <li>The right to access personal data we hold about you;</li>
                  <li>The right to request correction of inaccurate or incomplete personal data;</li>
                  <li>The right to request deletion or destruction of personal data where it is no longer necessary for the purpose for which it was collected;</li>
                  <li>The right to request restriction of processing in certain circumstances;</li>
                  <li>The right to data portability (to receive your personal data in a structured, commonly used format) where technically feasible;</li>
                  <li>The right to object to processing based on our legitimate interests; and</li>
                  <li>The right to withdraw consent where processing is based on your consent.</li>
                </ul>

                <h4 className="text-lg font-semibold text-[var(--text-primary)] mb-2">Cross-Border Transfers</h4>
                <p className="text-[var(--text-secondary)] mb-4">
                  Your personal information may be transferred to and processed in the United States and other countries where Sundae or its service providers operate. Where such transfers occur from the UAE, DIFC, or ADGM, we implement appropriate safeguards as required by applicable law, including contractual protections (such as Standard Contractual Clauses or equivalent mechanisms recognised under UAE law) and technical measures to protect your data in transit and at rest.
                </p>

                <h4 className="text-lg font-semibold text-[var(--text-primary)] mb-2">Complaints</h4>
                <p className="text-[var(--text-secondary)] mb-4">
                  If you believe that we have not complied with your data protection rights, you may lodge a complaint with:
                </p>
                <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-2 mb-4">
                  <li>The UAE Data Office (for mainland UAE matters);</li>
                  <li>The Commissioner of Data Protection, DIFC (for DIFC matters); or</li>
                  <li>The relevant ADGM authority (for ADGM matters).</li>
                </ul>
                <p className="text-[var(--text-secondary)]">
                  We would, however, appreciate the opportunity to address your concerns directly first. Please contact us at <a href="mailto:privacy@sundae.io" className="text-[#60A5FA] hover:underline">privacy@sundae.io</a>.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">13. Changes to This Privacy Policy</h2>
                <p className="text-[var(--text-secondary)] mb-4">
                  We may update this Privacy Policy from time to time to reflect changes in our practices, technologies, legal requirements, or for other operational reasons.
                </p>
                <p className="text-[var(--text-secondary)] mb-4">
                  When we make material changes, we will take reasonable steps to notify you, such as by:
                </p>
                <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-2">
                  <li>Posting the updated Privacy Policy on this page, and/or</li>
                  <li>Providing notice within the Services or by email.</li>
                </ul>
                <p className="text-[var(--text-secondary)] mt-4">
                  The "Last updated" date at the top of this Privacy Policy indicates when it was last revised. Your continued use of the Services after any changes become effective will signify your acceptance of the updated Privacy Policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">14. Contact Us</h2>
                <p className="text-[var(--text-secondary)] mb-4">
                  If you have any questions about this Privacy Policy or our privacy practices, please contact us:
                </p>
                <div className="bg-[var(--surface-faint)] p-4 rounded-lg">
                  <p className="text-[var(--text-secondary)]">
                    <strong>Sundae Technologies Inc.</strong><br />
                    1007 N Orange St, 4th Floor, Suite 1382<br />
                    Wilmington, DE 19801, United States<br />
                    Email: <a href="mailto:privacy@sundae.io" className="text-[#60A5FA] hover:underline">privacy@sundae.io</a>
                  </p>
                </div>
                <p className="text-[var(--text-secondary)] mt-4">
                  If you contact us with a privacy request or concern, we will take reasonable steps to respond within the timeframes required by applicable law.
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-6">
            Questions About Your Privacy?
          </h2>
          <p className="text-xl text-[var(--text-supporting)] mb-8">
            If you have any questions or concerns about this Privacy Policy, please don't hesitate to contact us.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <Card variant="elevated">
              <CardContent className="p-6 text-center">
                <div className="w-10 h-10 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center"><SundaeIcon name="support" size="lg" className="text-white" /></div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">Email Us</h3>
                <a href="mailto:privacy@sundae.io" className="text-[#60A5FA] hover:underline">
                  privacy@sundae.io
                </a>
              </CardContent>
            </Card>
            
            <Card variant="elevated">
              <CardContent className="p-6 text-center">
                <div className="w-10 h-10 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center"><SundaeIcon name="support" size="lg" className="text-white" /></div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">Call Us</h3>
                <a href="tel:+97145017308" className="text-[#60A5FA] hover:underline">
                  +971 (4) 501-7308
                </a>
              </CardContent>
            </Card>
            
            <Card variant="elevated">
              <CardContent className="p-6 text-center">
                <div className="w-10 h-10 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center"><SundaeIcon name="multiLocation" size="lg" className="text-white" /></div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">Visit Us</h3>
                <p className="text-[var(--text-supporting)] text-sm">
                  1007 N Orange St<br />
                  4th Floor, Suite 1382<br />
                  Wilmington, DE 19801<br />
                  United States
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/terms">
              <Button variant="outline-light">
                Terms of Service
              </Button>
            </Link>
            <Link href="/demo">
              <Button variant="primary">
                Contact Privacy Team
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
