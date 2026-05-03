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

type TermsCopy = {
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

const localizedTermsCopy: Record<Exclude<WebsiteLocale, 'en'>, TermsCopy> = {
  ar: {
    badge: 'القانونية',
    title: 'شروط الخدمة',
    lastUpdatedLabel: 'آخر تحديث: 3 مارس 2026',
    noticeTitle: 'مهم',
    noticeBody:
      'بمجرد وصولك إلى خدمات Sundae أو استخدامها، فإنك توافق على الالتزام بهذه الشروط. يرجى قراءتها بعناية.',
    sections: [
      {
        title: '1. المقدمة وقبول الشروط',
        paragraphs: [
          'تحكم شروط الخدمة هذه ("الشروط") وصولك إلى مواقع Sundae وتطبيقاتها ومنصاتها ومنتجاتها ذات الصلة واستخدامها (ويشار إليها مجتمعةً باسم "الخدمات")، بما في ذلك وحدة القياس والتحليلات Sundae Report.',
          'تشكل هذه الشروط اتفاقًا ملزمًا قانونًا بين Sundae Technologies Inc.، وهي شركة مؤسسة في ولاية ديلاوير بالولايات المتحدة وتعمل باسم "Sundae" وتدير النطاقات sundae.io وsundaetech.ai وsundaetech.io وsundaetechnologies.com، وبين الكيان أو الفرد الذي يقبل هذه الشروط ("العميل" أو "أنت" أو "لك"). وقد تقدم Sundae Technologies Inc. خدماتها مباشرةً أو من خلال الشركات التابعة أو الموزعين المعتمدين أو الشركاء الإقليميين.',
          'من خلال الوصول إلى الخدمات أو استخدامها، أو بالنقر على "أوافق" أو عبارة مماثلة، فإنك توافق نيابةً عن نفسك، وعند الاقتضاء، نيابةً عن الجهة التي تمثلها، على الالتزام بهذه الشروط. إذا كنت لا تقبل هذه الشروط، فلا يجوز لك الوصول إلى الخدمات أو استخدامها.',
          'إذا كنت تقبل هذه الشروط نيابةً عن شركة أو كيان قانوني آخر، فإنك تقر وتضمن أنك مخوّل بإلزام ذلك الكيان، وفي هذه الحالة تشير كلمة "أنت" و"لك" إلى ذلك الكيان.',
          'في بعض المناطق، تُباع الاشتراكات التجارية وتُدار من خلال موزعين وشركاء إقليميين معتمدين، مثل Ambia Global Technologies Ltd في مركز دبي المالي العالمي (DIFC)، دبي. وعندما يكون هناك اتفاق اشتراك مستقل مع موزع معتمد، يحكم ذلك الاتفاق الشروط التجارية للاشتراك، بينما تظل هذه الشروط حاكمة لاستخدام المنصة وحقوق الملكية الفكرية والبيانات والاستخدام المقبول. وفي حال التعارض، تسري هذه الشروط على مسائل استخدام المنصة أو الملكية الفكرية أو البيانات، ويسري اتفاق الموزع على المسائل التجارية.',
        ],
      },
      {
        title: '2. التعريفات',
        paragraphs: ['لأغراض هذه الشروط:'],
        bullets: [
          'تعني "Sundae" و"نحن" و"لنا" و"خاصتنا" شركة Sundae Technologies Inc. مع الشركات التابعة لها التي تدير النطاقات sundae.io وsundaetech.ai وsundaetech.io وsundaetechnologies.com.',
          'تعني "الخدمات" منصات Sundae المعتمدة على الذكاء الاصطناعي لاتخاذ القرار وإدارة القوى العاملة والمنتجات ذات الصلة، بما في ذلك Sundae Report ولوحات المعلومات وواجهات البرمجة والتكاملات وتطبيقات الهاتف المحمول/سطح المكتب والموقع الإلكتروني.',
          'تعني "Sundae Report" وحدة القياس المعياري لاتخاذ القرار للمطاعم التابعة لـ Sundae، والتي تقوم بتجميع البيانات التشغيلية وإخفاء هويتها لتقديم رؤى مقارنة حول الأداء.',
          'تعني "Customer Data" معلوماتك الشخصية، بما في ذلك بيانات أنظمة نقاط البيع (POS)، التي تقوم أنت أو المستخدمون لديك بإرسالها أو تحميلها إلى الخدمات.',
          'تعني "Usage Data" البيانات التقنية وبيانات السجل و/أو البيانات الوصفية المتعلقة بكيفية وصولك أنت ومستخدميك إلى الخدمات واستخدامهم لها.',
          'تعني "Aggregated Data" البيانات الناتجة عن تجميع و/أو إخفاء هوية Customer Data و/أو Usage Data على نحو لا يعرّف بك أو بأي شخص طبيعي ولا يمكن إعادة التعرف عليه بشكل معقول.',
          'تعني "Benchmark Data" البيانات المجمعة المستخدمة لإنشاء مقاييس مقارنة ومعايير قطاعية متاحة لك من خلال الخدمات، بما في ذلك Sundae Report.',
          'تعني "Subscription Form" أي مستند طلب أو تدفق اشتراك أو سجل مكافئ، سواء كان عبر الإنترنت أو خارجه، يحدد خطة اشتراكك والرسوم والشروط التجارية.',
        ],
      },
      {
        title: '3. وصف الخدمات',
        paragraphs: [
          'توفر Sundae حلول ذكاء قرار مدعومة بالذكاء الاصطناعي، موجهة أساسًا إلى المطاعم وشركات الضيافة. وقد تشمل خدماتنا، من دون حصر:',
          'يجوز لنا إضافة الميزات أو الوحدات أو تعديلها أو إيقافها من وقت لآخر، وذلك وفقًا لما يرد في القسم 12.',
        ],
        bullets: [
          'منصة تكامل بيانات وتحليلات',
          'رؤى وتوصيات وأتمتة مدعومة بالذكاء الاصطناعي',
          'القياس المعياري وتحليلات الأداء، بما في ذلك Sundae Report',
          'نظام ذكاء اصطناعي متعدد الوكلاء لعمليات المطاعم',
          'المراقبة اللحظية والتنبيهات واكتشاف الشذوذ',
          'لوحات معلومات وتقارير مخصصة',
          'واجهات برمجة وتكاملات مع أنظمة الجهات الخارجية، مثل أنظمة POS والموارد البشرية والمحاسبة',
        ],
      },
      {
        title: '4. الأهلية وإنشاء الحساب',
        subsections: [
          {
            title: '4.1 الأهلية',
            paragraphs: [
              'لا يجوز لك استخدام الخدمات إلا إذا كنت تبلغ 18 عامًا على الأقل وتمتلك الأهلية القانونية لإبرام عقد ملزم بموجب القانون المعمول به.',
            ],
          },
          {
            title: '4.2 إنشاء الحساب',
            paragraphs: [
              'للوصول إلى العديد من ميزات الخدمات، يجب عليك إنشاء حساب وتقديم معلومات دقيقة وحديثة وكاملة، مع الالتزام بتحديثها.',
              'إذا أنشأت حسابًا نيابةً عن شركة، فإنك تقر بأنك مخوّل بذلك.',
            ],
          },
          {
            title: '4.3 أمان الحساب',
            paragraphs: [
              'أنت مسؤول عن الحفاظ على سرية بيانات اعتماد تسجيل الدخول الخاصة بك وعن جميع الأنشطة التي تتم تحت حسابك.',
            ],
            bullets: [
              'عدم مشاركة كلمة المرور أو الحساب مع أي شخص غير مخوّل.',
              'إخطارنا فورًا بأي استخدام غير مصرح به لحسابك أو بأي خرق أمني.',
            ],
          },
        ],
      },
      {
        title: '5. الاستخدام المسموح والاستخدام المقبول',
        paragraphs: [
          'يجوز لك استخدام الخدمات فقط لأغراض عملك الداخلية وبما يتوافق مع هذه الشروط وجميع القوانين واللوائح المعمول بها. ولا يجوز لك:',
          'يجوز لنا، وفقًا لتقديرنا المطلق، تعليق الوصول إلى الخدمات أو إنهاؤه بسبب مخالفة هذا القسم.',
        ],
        bullets: [
          'استخدام الخدمات لأي غرض غير مشروع أو احتيالي أو مسيء؛',
          'التدخل في الخدمات أو الخوادم أو تعطيلها، أو تجاوز تدابير الأمان؛',
          'محاولة الوصول غير المصرح به إلى أي جزء من الخدمات أو الأنظمة ذات الصلة؛',
          'تحميل أو إرسال فيروسات أو برمجيات خبيثة أو أي رمز ضار آخر؛',
          'استخدام الخدمات لتطوير منتج منافس أو تقديمه، أو لإجراء تحليل تنافسي خارج نطاق القياس الداخلي المشروع؛',
          'عكس الهندسة أو فك التجميع أو التفكيك أو محاولة استنباط الشيفرة المصدرية أو النماذج الأساسية، إلا بالقدر المحدود المسموح به بموجب القانون المعمول به؛',
          'استخلاص البيانات أو جمعها أو تنزيلها بكميات كبيرة من الخدمات باستخدام أدوات آلية من دون إذن كتابي منا؛',
          'محاولة إعادة التعرف على أي بيانات مجمعة أو Benchmark Data أو كشف هويتها.',
        ],
      },
      {
        title: '6. Customer Data وUsage Data والخصوصية',
        subsections: [
          {
            title: '6.1 ملكية Customer Data',
            paragraphs: ['تحتفظ بجميع الحقوق والملكية والمصلحة في Customer Data الخاصة بك، مع مراعاة التراخيص التي تمنحها لـ Sundae بموجب هذه الشروط.'],
          },
          {
            title: '6.2 الترخيص على Customer Data',
            paragraphs: [
              'عند إرسال أو تحميل Customer Data إلى الخدمات، تمنح Sundae ترخيصًا غير حصري وعالميًا وخاليًا من حقوق الامتياز لاستخدام Customer Data وتخزينها واستضافتها ونسخها ومعالجتها وتحليلها ونقلها وعرضها فقط بغرض تقديم الخدمات وصيانتها ودعمها، ولمنع المشكلات المتعلقة بالخدمة أو الأمان أو المشكلات التقنية أو معالجتها.',
              'وبالنسبة إلى Sundae Report، فإنك تمنح أيضًا الحقوق الإضافية المتعلقة بـ Aggregated Data وBenchmark Data الموضحة في القسم 13.',
            ],
          },
          {
            title: '6.3 Usage Data وAggregated Data وBenchmark Data',
            paragraphs: [
              'يجوز لـ Sundae إنشاء Usage Data بشأن استخدامك للخدمات ودمج Customer Data وUsage Data لإنشاء Aggregated Data وBenchmark Data، والتي يجوز استخدامها لتشغيل الخدمات وتحسينها وتطويرها، ولأغراض القياس المعياري والتحليلات والبحث، ونشر رؤى قطاعية بصيغة مجمعة ومجهولة الهوية.',
              'تمتلك Sundae وحدها جميع الحقوق في Aggregated Data وBenchmark Data، بشرط ألا تحدد هذه البيانات هوية أي شخص أو نشاطك التجاري.',
            ],
          },
          {
            title: '6.4 سياسة الخصوصية',
            paragraphs: ['يخضع استخدامك للخدمات أيضًا لسياسة الخصوصية الخاصة بنا، والتي تُدمج في هذه الشروط بالإحالة.'],
          },
          {
            title: '6.5 أمن البيانات',
            paragraphs: [
              'نطبق تدابير تقنية وتنظيمية معيارية في الصناعة لحماية Customer Data، بما في ذلك التشفير أثناء النقل وفي حالة التخزين، وضوابط الوصول، والمراقبة. ومع ذلك، لا توجد طريقة نقل أو تخزين آمنة بنسبة 100%، ولا يمكننا ضمان أمن مطلق.',
            ],
          },
        ],
      },
      {
        title: '7. إقرارات المستخدم والتزاماته',
        paragraphs: [
          'أنت تقر وتضمن ما يلي:',
          'أنت مسؤول عن تهيئة الخدمات واستخدامها بما يتوافق مع القانون المعمول به.',
        ],
        bullets: [
          'أن لديك جميع الحقوق والموافقات والأذونات اللازمة لتحميل Customer Data ومشاركتها عبر الخدمات؛',
          'أن Customer Data واستخدامك للخدمات لا ينتهكان ولن ينتهكا أي قانون معمول به أو حقوق أي طرف ثالث، بما في ذلك قوانين الخصوصية والعمل وحماية البيانات؛',
          'أنك لن تحمل أي بيانات شخصية حساسة إلا إذا سمح القانون المعمول به وسياسة الخصوصية الخاصة بنا بذلك صراحةً؛',
          'أن كل Customer Data تقدمها لأغراض التحليلات والقياس المعياري دقيقة وكاملة وحديثة، على حد علمك واعتقادك.',
        ],
      },
      {
        title: '8. الملكية الفكرية',
        paragraphs: [
          'الخدمات ومحتواها الأصلي وميزاتها ووظائفها مملوكة لـ Sundae ومحميّة بموجب قوانين حقوق النشر والعلامات التجارية وبراءات الاختراع والأسرار التجارية وغيرها من قوانين الملكية الفكرية الدولية.',
          'تحتفظ Sundae بجميع الحقوق والملكية والمصلحة في الخدمات، بما في ذلك جميع حقوق الملكية الفكرية ذات الصلة. ولا يجوز لك إزالة أو تغيير أو إخفاء أي إشعارات ملكية في الخدمات.',
        ],
      },
      {
        title: '9. ترخيص استخدام الخدمات',
        paragraphs: [
          'بشرط امتثالك لهذه الشروط ولـ Subscription Forms المعمول بها، تمنحك Sundae ترخيصًا محدودًا وغير حصري وغير قابل للتحويل وغير قابل للترخيص من الباطن للوصول إلى الخدمات واستخدامها طوال مدة اشتراكك ولأغراض عملك الداخلية فقط.',
          'ولا يجوز لك إعادة بيع الخدمات أو إعادة توزيعها أو وضع علامتك التجارية الخاصة عليها أو تقديمها للغير كخدمة مستقلة، إلا بموجب اتفاق كتابي منا.',
        ],
      },
      {
        title: '10. الرسوم والفوترة والضرائب',
        subsections: [
          {
            title: '10.1 الرسوم',
            paragraphs: [
              'بعض أجزاء الخدمات مجانية؛ بينما يتطلب بعضها الآخر دفع رسوم اشتراك أو رسوم استخدام وفقًا لـ Subscription Form أو صفحة التسعير المعمول بها. وما لم يُذكر خلاف ذلك، تُعرض جميع الرسوم بالدولار الأمريكي. وأنت مسؤول عن سداد جميع الرسوم والضرائب المعمول بها.',
            ],
          },
          {
            title: '10.2 الفوترة والتجديد',
            paragraphs: [
              'ما لم يُنص على خلاف ذلك، تُفوتر الاشتراكات مقدمًا على أساس شهري أو سنوي، وتتجدد تلقائيًا في نهاية كل فترة فوترة بالأسعار السارية، ما لم يتم الإلغاء قبل التجديد.',
            ],
          },
          {
            title: '10.3 الإلغاء والاسترداد',
            paragraphs: [
              'يمكنك إلغاء اشتراكك في أي وقت من إعدادات حسابك أو من خلال التواصل معنا. ويسري الإلغاء في نهاية دورة الفوترة الحالية. ولا تُسترد الرسوم إلا إذا نصّنا على ذلك صراحةً وبشكل كتابي.',
            ],
          },
          {
            title: '10.4 التأخر في السداد والتعليق',
            paragraphs: [
              'إذا لم تدفع الرسوم عند استحقاقها، يجوز لنا تعليق وصولك إلى الخدمات أو تقييده إلى أن نتلقى السداد.',
            ],
          },
          {
            title: '10.5 الضرائب',
            paragraphs: [
              'لا تشمل الرسوم أي ضرائب أو رسوم أو أعباء مماثلة قد تنطبق. وأنت مسؤول عن جميع هذه المبالغ، باستثناء الضرائب المستندة إلى صافي دخل Sundae.',
            ],
          },
        ],
      },
      {
        title: '11. الملاحظات',
        paragraphs: [
          'إذا قدمت لنا اقتراحات أو أفكارًا أو ملاحظات بشأن الخدمات ("Feedback")، فإنك تمنح Sundae ترخيصًا عالميًا ودائمًا وغير قابل للإلغاء وخاليًا من حقوق الامتياز لاستخدام تلك الملاحظات ونسخها وتعديلها وإنشاء أعمال مشتقة منها واستغلالها بأي طريقة أخرى لأي غرض، من دون أي التزام أو تعويض لك.',
        ],
      },
      {
        title: '12. توافر الخدمة والتغييرات والميزات التجريبية',
        paragraphs: [
          'نهدف إلى إبقاء الخدمات متاحة بشكل متواصل، لكننا لا نضمن تشغيلًا متواصلًا أو خاليًا من الأخطاء.',
          'تُقدَّم الميزات التجريبية أو السابقة للإطلاق "كما هي" من دون أي ضمانات، ويجوز سحبها في أي وقت.',
        ],
        bullets: [
          'يجوز لنا تعديل الميزات أو إيقافها.',
          'يجوز لنا إطلاق وحدات أو خطط جديدة.',
          'يجوز لنا إتاحة وصول مبكر أو ميزات تجريبية قد تكون غير مستقرة أو تجريبية.',
        ],
      },
      {
        title: '13. شروط إضافية خاصة بـ Sundae Report',
        paragraphs: [
          'ينطبق هذا القسم تحديدًا على استخدامك لـ Sundae Report ويكمّل باقي هذه الشروط. وفي حال التعارض، يَسري هذا القسم على Sundae Report.',
        ],
        subsections: [
          {
            title: '13.1 وصف الخدمة',
            paragraphs: [
              'Sundae Report هي منصة ذكاء قرار وقياس معياري للمطاعم، تتيح مقارنة مقاييس الأداء مع أقران مجهولين الهوية من خلال تجميع وتحليل بيانات POS والبيانات التشغيلية.',
            ],
          },
          {
            title: '13.2 تقديم البيانات',
            paragraphs: [
              'تلتزم بتقديم بيانات POS وبيانات تشغيلية دقيقة وكاملة عن طريق تحميل الملفات أو ربط أنظمة POS والأنظمة ذات الصلة بـ Sundae Report.',
            ],
            bullets: [
              'قد تشمل التحميلات المبيعات، والإيرادات، والعناصر المباعة، والعملاء، والمعاملات الموقّتة، وطرق الدفع، والخصومات، والعروض الترويجية، وغيرها من المقاييس التشغيلية.',
            ],
          },
          {
            title: '13.3 إخفاء الهوية والتجميع',
            paragraphs: [
              'قبل إدراج بياناتك في Benchmark Data ومشاركتها كجزء من نتائج القياس المعياري، نقوم بإخفاء هويتها وتجميعها لإزالة المعرّفات المباشرة لمطعمك، مثل الاسم أو العنوان الدقيق أو بيانات الملكية أو أسماء الموظفين.',
              'نطبق حدودًا معقولة لحجم المجموعة وتقنيات أخرى للحد من خطر إعادة التعرف؛ ولتجنب الشك، فإن Aggregated Data وBenchmark Data المجهولة الهوية وفقًا لهذا القسم لا تُعد بيانات شخصية ولا Customer Data لأغراض هذه الشروط.',
            ],
          },
          {
            title: '13.4 الترخيص على البيانات المجهولة والمجمعة',
            paragraphs: [
              'عند تحميل البيانات إلى Sundae Report، تمنح Sundae ترخيصًا عالميًا ودائمًا وغير قابل للإلغاء وخاليًا من حقوق الامتياز لاستخدام بياناتك ومعالجتها وإخفاء هويتها وتجميعها وتحليلها وعرضها بغرض تشغيل Sundae Report وتقديم خدمات القياس المعياري والتحليلات.',
              'ويشمل هذا الترخيص إنشاء أعمال مشتقة من Aggregated Data وBenchmark Data واستخدامها بصيغة مجمعة لتحسين المنصة والبحث والتحليلات وتحليل السوق. ويسري هذا الترخيص بعد إنهاء حسابك فيما يخص البيانات التي تم إنشاؤها بالفعل.',
            ],
          },
          {
            title: '13.5 ترخيص استخدام Sundae Report',
            paragraphs: [
              'بشرط امتثالك لهذه الشروط وسداد الرسوم المعمول بها، تمنحك Sundae ترخيصًا محدودًا وغير حصري وغير قابل للتحويل للوصول إلى Sundae Report واستخدامه، واستخدام نتائجه المعيارية للتحليلات الداخلية واتخاذ قرارات العمل.',
            ],
          },
          {
            title: '13.6 القيود',
            paragraphs: [
              'إضافةً إلى القيود العامة الواردة في القسم 5، لا يجوز لك إعادة بيع أو إعادة توزيع أو ترخيص الوصول من الباطن إلى Sundae Report أو Benchmark Data الخاصة به لأي طرف ثالث، باستثناء مشاركة التقارير داخليًا؛ أو محاولة عكس إخفاء هوية Benchmark Data أو Aggregated Data لتحديد هوية مطاعم أو مشاركين آخرين؛ أو استخدام Benchmark Data لإنشاء خدمة منافسة أو تدريبها من دون موافقتنا الكتابية المسبقة.',
            ],
          },
        ],
      },
      {
        title: '14. السرية',
        paragraphs: [
          'قد يتلقى كل طرف معلومات سرية وغير علنية من الطرف الآخر ("المعلومات السرية")، بما في ذلك Customer Data وخطط المنتجات والأسعار وخطط الأعمال وأي معلومات مميزة أو معقولة الفهم على أنها سرية.',
          'يستخدم الطرف المتلقي المعلومات السرية فقط بالقدر اللازم للوفاء بالتزاماته، ويحميها بدرجة عناية معقولة على الأقل.',
          'ولا تشمل المعلومات السرية المعلومات التي أصبحت عامة من دون خرق، أو التي جرى تلقيها من طرف ثالث من دون التزام بالسرية، أو التي جرى تطويرها بشكل مستقل، أو التي يجب الإفصاح عنها بموجب القانون.',
          'ولا تُعد Aggregated Data وBenchmark Data التي لا تحدد هويتك معلوماتك السرية.',
        ],
      },
      {
        title: '15. إخلاء المسؤولية',
        paragraphs: [
          'تُقدَّم الخدمات، بما في ذلك Sundae Report وBenchmark Data وجميع المخرجات التي يولدها الذكاء الاصطناعي، "كما هي" و"حسب التوافر"، من دون أي ضمانات من أي نوع، صريحة كانت أم ضمنية.',
          'إلى أقصى حد يسمح به القانون، تتنصل Sundae صراحةً من جميع الضمانات، بما في ذلك الضمانات الضمنية الخاصة بقابلية التسويق والملاءمة لغرض معين وعدم الانتهاك، وكذلك أي ضمان بأن الخدمات ستكون غير منقطعة أو في الوقت المناسب أو آمنة أو خالية من الأخطاء.',
          'كما أننا لا نضمن دقة أو اكتمال أو موثوقية التحليلات أو Benchmark Data أو الرؤى التي يولدها الذكاء الاصطناعي، ولا نضمن أن النتائج ستلبي توقعاتك أو تحقق أي نتيجة تجارية محددة.',
          'أنت وحدك المسؤول عن تفسير أي نتائج أو رؤى أو توصيات أو قرارات ناتجة عن الخدمات واتخاذ الإجراءات بناءً عليها، بما في ذلك قرارات التسعير أو التوظيف أو المخزون أو قائمة الطعام أو التسويق أو غيرها من القرارات التشغيلية أو الاستراتيجية. وقد صُممت الخدمات لدعم اتخاذ القرار البشري، لا لاستبداله.',
        ],
      },
      {
        title: '16. التعويض',
        paragraphs: [
          'توافق على تعويض Sundae، والدفاع عنها، وحمايتها من أي ضرر يلحق بها، وكذلك مسؤوليها ومديريها وموظفيها ووكلائها وشركاتها التابعة، من أي مطالبات أو أضرار أو خسائر أو التزامات أو تكاليف أو نفقات، بما في ذلك أتعاب المحامين المعقولة، الناشئة عن استخدامك للخدمات أو Customer Data الخاصة بك أو مخالفتك لهذه الشروط أو انتهاكك حقوق الغير.',
        ],
      },
      {
        title: '17. تحديد المسؤولية',
        paragraphs: [
          'إلى أقصى حد يسمح به القانون المعمول به، لا تتحمل Sundae ولا الشركات التابعة لها ولا مسؤولوها ولا موظفوها ولا وكلاؤها ولا موردوها ولا المرخصون لها مسؤولية أي أضرار غير مباشرة أو عرضية أو خاصة أو تبعية أو عقابية، بما في ذلك فقدان الأرباح أو فقدان البيانات أو الاستخدام أو السمعة التجارية أو أي خسائر غير ملموسة أخرى تنشأ عن استخدام الخدمات أو عدم القدرة على استخدامها.',
          'ولا تتجاوز المسؤولية التراكمية القصوى لـ Sundae الناشئة عن هذه الشروط أكبر المبلغين التاليين: المبالغ التي دفعتها لـ Sundae مقابل الخدمات خلال الاثني عشر (12) شهرًا السابقة للحدث الذي أدى إلى المطالبة، أو مائة دولار أمريكي (US$100).',
          'قد لا تسمح بعض الولايات القضائية باستثناءات أو حدود معينة، وفي تلك الحالات تقتصر مسؤوليتنا على الحد الأقصى المسموح به قانونًا.',
        ],
      },
      {
        title: '18. المدة والإنهاء',
        subsections: [
          {
            title: '18.1 المدة',
            paragraphs: ['تسري هذه الشروط عند أول وصول لك إلى الخدمات أو استخدامها، أو عند قبولك لها، وتظل نافذة حتى إنهائها.'],
          },
          {
            title: '18.2 الإنهاء من جانبك',
            paragraphs: [
              'يمكنك إنهاء حسابك والتوقف عن استخدام الخدمات في أي وقت من خلال إعدادات الحساب أو بالتواصل معنا. ولا تُسترد الرسوم المدفوعة مقدمًا إلا إذا نصّنا على ذلك كتابيًا.',
              'يمكنك طلب حذف Customer Data القابلة للتعريف عن طريق الكتابة إلى legal@sundae.io خلال ستين (60) يومًا من الإنهاء. وتقر بأن Customer Data تأتي من أنظمتك التشغيلية الخاصة وأن لديك وصولًا مستقلًا إليها في جميع الأوقات. وستبذل Sundae جهودًا معقولة لحذف Customer Data القابلة للتعريف خلال تسعين (90) يومًا من الطلب الصحيح، إلا عندما يكون الاحتفاظ بها مطلوبًا بموجب القانون أو لتسوية النزاعات أو لأغراض النسخ الاحتياطي الروتيني. ولا تخضع Aggregated Data وBenchmark Data غير القابلة للتعرف على الهوية لطلبات الحذف، ويجوز الاحتفاظ بها إلى أجل غير مسمى وفقًا للقسم 13.4.',
            ],
          },
          {
            title: '18.3 الإنهاء أو التعليق من جانب Sundae',
            paragraphs: [
              'يجوز لنا تعليق وصولك إلى الخدمات أو إنهاؤه، كليًا أو جزئيًا، على الفور ومن دون إشعار مسبق إذا خالفت هذه الشروط، أو لم تدفع الرسوم، أو ألزمنا القانون بذلك، أو إذا كان الاستمرار في تقديم الخدمات ينطوي على خطر مادي على Sundae.',
            ],
          },
          {
            title: '18.4 أثر الإنهاء',
            paragraphs: [
              'عند إنهاء الاتفاق، يتوقف فورًا حقك في الوصول إلى الخدمات واستخدامها. وتظل الأحكام التي ينبغي أن تبقى نافذة بحكم طبيعتها سارية، بما في ذلك، من دون حصر، الأقسام 6.3 و8-11 و13.4 و14-22. ويجوز الاحتفاظ بـ Aggregated Data وBenchmark Data التي سبق إنشاؤها واستخدامها وفقًا لهذه الشروط.',
            ],
          },
        ],
      },
      {
        title: '19. القانون الحاكم وتسوية النزاعات',
        paragraphs: [
          'تخضع هذه الشروط وأي نزاع أو مطالبة تنشأ عنها أو تتعلق بموضوعها أو تكوينها، وتُفسّر وفقًا لقوانين ولاية ديلاوير، الولايات المتحدة، من دون اعتبار لقواعد تنازع القوانين فيها.',
          'ويوافق الطرفان بشكل لا رجعة فيه على أن تكون للمحاكم الولائية والفيدرالية الواقعة في ديلاوير الولاية القضائية الحصرية للفصل في أي نزاع أو مطالبة تنشأ عن هذه الشروط أو تتعلق بها.',
        ],
      },
      {
        title: '20. التعديلات على الشروط',
        paragraphs: [
          'يجوز لنا تعديل هذه الشروط من وقت لآخر. وإذا أجرينا تغييرات جوهرية، فسنخطرك بذلك، على سبيل المثال عبر البريد الإلكتروني أو إشعار داخل التطبيق أو تحديث تاريخ "آخر تحديث".',
          'إذا واصلت الوصول إلى الخدمات أو استخدامها بعد دخول الشروط المحدّثة حيز النفاذ، فأنت توافق على الالتزام بالنسخة المعدلة. وإذا لم توافق، فيجب عليك التوقف عن استخدام الخدمات.',
        ],
      },
      {
        title: '21. التنازل عن الحقوق',
        paragraphs: [
          'لا يجوز لك التنازل عن هذه الشروط أو نقلها، بحكم القانون أو بأي وسيلة أخرى، من دون موافقتنا الكتابية المسبقة. ويجوز لنا التنازل عن هذه الشروط، كليًا أو جزئيًا، من دون موافقتك لصالح شركة تابعة أو في إطار اندماج أو استحواذ أو إعادة تنظيم للشركة أو بيع الأصول.',
        ],
      },
      {
        title: '22. أحكام متنوعة',
        bullets: [
          'الاتفاق الكامل: تشكل هذه الشروط، إلى جانب سياسة الخصوصية وأي Subscription Form معمول به، الاتفاق الكامل بينك وبين Sundae فيما يتعلق بالخدمات، وتحل محل أي اتفاق سابق أو معاصر.',
          'قابلية الفصل: إذا اعتُبر أي حكم غير صالح أو غير قابل للتنفيذ، فسيتم تطبيقه إلى أقصى حد يسمح به القانون، وتظل بقية الأحكام نافذة بالكامل.',
          'عدم التنازل: عدم ممارستنا لأي حق أو عدم إنفاذنا لأي حكم لا يُعد تنازلًا عن ذلك الحق أو الحكم.',
          'العلاقة بين الطرفين: يعمل الطرفان كمقاولين مستقلين. ولا ينشئ أي شيء وارد هنا شراكة أو مشروعًا مشتركًا أو وكالة أو علاقة عمل.',
          'الإشعارات: يجوز لنا إرسال الإشعارات إليك عبر البريد الإلكتروني إلى العنوان المرتبط بحسابك أو من خلال إشعارات داخل التطبيق. ويمكنك إرسال الإشعارات القانونية إلينا على العنوان الموضح أدناه.',
          'العناوين: ترد عناوين الأقسام للتيسير فقط ولا تؤثر في تفسير الشروط.',
        ],
      },
      {
        title: '23. التواصل',
        paragraphs: [
          'إذا كانت لديك أسئلة حول هذه الشروط أو حول الخدمات، فتواصل معنا.',
        ],
      },
    ],
    contactHeading: 'أسئلة حول هذه الشروط؟',
    contactDescription:
      'إذا كانت لديك أي أسئلة أو مخاوف بشأن شروط الخدمة هذه، فلا تتردد في التواصل معنا.',
    cards: [
      { title: 'راسلنا', value: COMPANY.legalEmail, icon: 'support', href: `mailto:${COMPANY.legalEmail}` },
      { title: 'اتصل بنا', value: '+971 (4) 501-7308', icon: 'support', href: 'tel:+97145017308' },
      { title: 'زورنا', value: companyAddressLines, icon: 'multiLocation' },
    ],
    buttons: {
      secondary: 'سياسة الخصوصية',
      primary: 'تواصل مع الفريق القانوني',
    },
  },
  fr: {
    badge: 'Juridique',
    title: "Conditions d'utilisation",
    lastUpdatedLabel: 'Dernière mise à jour : 3 mars 2026',
    noticeTitle: 'Important',
    noticeBody:
      "En accédant aux services Sundae ou en les utilisant, vous acceptez d'être lié par ces Conditions d'utilisation. Veuillez les lire attentivement.",
    sections: [
      {
        title: "1. Introduction et acceptation des conditions",
        paragraphs: [
          "Les présentes Conditions d'utilisation (les \"Conditions\") régissent votre accès aux sites web, applications, plateformes et produits associés de Sundae, ainsi que leur utilisation (collectivement, les \"Services\"), y compris le module de benchmarking et d'analyse Sundae Report.",
          "Les présentes Conditions constituent un accord juridiquement contraignant entre Sundae Technologies Inc., société constituée dans l'État du Delaware, aux États-Unis, exerçant sous le nom \"Sundae\" et exploitant les domaines sundae.io, sundaetech.ai, sundaetech.io et sundaetechnologies.com, et l'entité ou la personne qui accepte les présentes Conditions (le \"Client\", \"vous\" ou \"votre\"). Sundae Technologies Inc. peut fournir les Services directement ou par l'intermédiaire de sociétés affiliées, de revendeurs autorisés ou de partenaires régionaux.",
          "En accédant aux Services ou en les utilisant, ou en cliquant sur \"J'accepte\" ou une mention similaire, vous acceptez, en votre nom propre et, le cas échéant, au nom de l'entité que vous représentez, d'être lié par les présentes Conditions. Si vous n'acceptez pas ces Conditions, vous ne devez pas accéder aux Services ni les utiliser.",
          "Si vous acceptez ces Conditions au nom d'une société ou d'une autre entité juridique, vous déclarez et garantissez que vous avez le pouvoir de lier cette entité, auquel cas les termes \"vous\" et \"votre\" désignent cette entité.",
          "Dans certaines régions, les abonnements commerciaux sont vendus et administrés par des revendeurs et partenaires régionaux autorisés, tels qu'Ambia Global Technologies Ltd dans le DIFC, à Dubaï. Lorsqu'un accord d'abonnement distinct est conclu avec un revendeur autorisé, cet accord régit les conditions commerciales de votre abonnement, tandis que les présentes Conditions continuent de régir votre utilisation de la Plateforme, la propriété intellectuelle, les données et l'utilisation acceptable. En cas de conflit, les présentes Conditions prévalent pour les questions relatives à l'utilisation de la plateforme, à la propriété intellectuelle ou aux données, et l'accord de revendeur prévaut pour les questions commerciales.",
        ],
      },
      {
        title: '2. Définitions',
        paragraphs: ["Aux fins des présentes Conditions :"],
        bullets: [
          '"Sundae", "nous", "notre" et "nos" désignent Sundae Technologies Inc., ainsi que ses sociétés affiliées, qui exploitent les domaines sundae.io, sundaetech.ai, sundaetech.io et sundaetechnologies.com.',
          '"Services" désigne les plateformes Sundae d’intelligence décisionnelle et de gestion des équipes, fondées sur l’IA, ainsi que les produits associés, notamment Sundae Report, les tableaux de bord, les API, les intégrations, les applications mobiles et de bureau, et le site web.',
          '"Sundae Report" désigne le module de benchmarking d’intelligence décisionnelle de Sundae pour les restaurants, qui agrège et anonymise les données opérationnelles afin de fournir des comparaisons de performance.',
          '"Customer Data" désigne vos informations personnelles, y compris les données POS, que vous ou vos utilisateurs soumettez ou téléchargez dans les Services.',
          '"Usage Data" désigne les données techniques, de journalisation et/ou les métadonnées relatives à la manière dont vous et vos utilisateurs accédez aux Services et les utilisez.',
          '"Aggregated Data" désigne les données résultant de l’agrégation et/ou de l’anonymisation de Customer Data et/ou de Usage Data de manière à ne pas vous identifier ni identifier une personne physique, et à ne pas pouvoir être raisonnablement réidentifiées.',
          '"Benchmark Data" désigne les Aggregated Data utilisées pour générer des indicateurs comparatifs et des références sectorielles mises à votre disposition via les Services, y compris Sundae Report.',
          '"Subscription Form" désigne tout document de commande, parcours d’inscription ou enregistrement équivalent, en ligne ou hors ligne, précisant votre formule d’abonnement, les frais et les conditions commerciales.',
        ],
      },
      {
        title: '3. Description des Services',
        paragraphs: [
          "Sundae fournit des solutions d'intelligence décisionnelle basées sur l'IA, principalement destinées aux restaurants et aux entreprises du secteur de l'hôtellerie-restauration. Nos Services peuvent inclure, sans s'y limiter :",
          "Nous pouvons ajouter, modifier ou interrompre des fonctionnalités ou des modules à tout moment, comme indiqué à la section 12.",
        ],
        bullets: [
          'une plateforme d’intégration de données et d’analyse ;',
          'des informations, recommandations et automatisations alimentées par l’IA ;',
          'le benchmarking et l’analyse des performances, y compris Sundae Report ;',
          'un système d’IA multi-agents pour les opérations de restaurant ;',
          'la surveillance en temps réel, les alertes et la détection d’anomalies ;',
          'des tableaux de bord et des rapports personnalisés ;',
          'des API et des intégrations avec des systèmes tiers, par exemple les systèmes POS, RH et comptables.',
        ],
      },
      {
        title: "4. Éligibilité et création de compte",
        subsections: [
          {
            title: "4.1 Éligibilité",
            paragraphs: [
              "Vous ne pouvez utiliser les Services que si vous avez au moins 18 ans et que vous avez la capacité juridique de conclure un contrat contraignant en vertu du droit applicable.",
            ],
          },
          {
            title: "4.2 Création de compte",
            paragraphs: [
              "Pour accéder à de nombreuses fonctionnalités des Services, vous devez créer un compte et fournir des informations exactes, à jour et complètes, en vous engageant à les maintenir à jour.",
              "Si vous créez un compte au nom d'une entreprise, vous déclarez être autorisé à le faire.",
            ],
          },
          {
            title: "4.3 Sécurité du compte",
            paragraphs: [
              "Vous êtes responsable de la confidentialité de vos identifiants de connexion et de toutes les activités effectuées sous votre compte.",
            ],
            bullets: [
              "Ne pas partager votre mot de passe ni votre compte avec une personne non autorisée.",
              "Nous informer immédiatement de toute utilisation non autorisée de votre compte ou de toute faille de sécurité.",
            ],
          },
        ],
      },
      {
        title: "5. Utilisation autorisée et utilisation acceptable",
        paragraphs: [
          "Vous ne pouvez utiliser les Services qu'aux seules fins internes de votre activité et conformément aux présentes Conditions et à l'ensemble des lois et règlements applicables. Vous vous interdisez de :",
          "Nous pouvons, à notre seule discrétion, suspendre ou résilier l'accès en cas de violation de la présente section.",
        ],
        bullets: [
          "utiliser les Services à des fins illégales, frauduleuses ou abusives ;",
          "interférer avec les Services ou les serveurs, les perturber ou contourner les mesures de sécurité ;",
          "tenter d'obtenir un accès non autorisé à toute partie des Services ou aux systèmes associés ;",
          "télécharger ou transmettre des virus, logiciels malveillants ou tout autre code nuisible ;",
          "utiliser les Services pour développer ou proposer un produit concurrent ou pour une analyse concurrentielle en dehors d’un benchmarking interne légitime ;",
          "procéder à de l’ingénierie inverse, décompiler, désassembler ou tenter de dériver le code source ou les modèles sous-jacents, sauf dans la mesure limitée autorisée par le droit applicable ;",
          "extraire, collecter ou télécharger en masse des données des Services au moyen d’outils automatisés sans notre autorisation écrite ;",
          "tenter de réidentifier ou de désanonymiser des Aggregated Data ou des Benchmark Data.",
        ],
      },
      {
        title: "6. Customer Data, Usage Data et confidentialité",
        subsections: [
          {
            title: "6.1 Propriété des Customer Data",
            paragraphs: [
              "Vous conservez l'intégralité des droits, titres et intérêts sur vos Customer Data, sous réserve des licences que vous accordez à Sundae dans les présentes Conditions.",
            ],
          },
          {
            title: "6.2 Licence sur les Customer Data",
            paragraphs: [
              "En soumettant ou en téléchargeant des Customer Data dans les Services, vous accordez à Sundae une licence non exclusive, mondiale et libre de redevance lui permettant d'utiliser, stocker, héberger, copier, traiter, analyser, transmettre et afficher les Customer Data uniquement pour fournir, maintenir et soutenir les Services, et pour prévenir ou résoudre des problèmes de service, de sécurité ou techniques.",
              "Pour Sundae Report, vous accordez en outre les droits supplémentaires sur les Aggregated Data et les Benchmark Data décrits à la section 13.",
            ],
          },
          {
            title: "6.3 Usage Data, Aggregated Data et Benchmark Data",
            paragraphs: [
              "Sundae peut générer des Usage Data relatives à votre utilisation des Services et combiner des Customer Data et des Usage Data pour créer des Aggregated Data et des Benchmark Data, qui peuvent être utilisées pour exploiter, améliorer et développer les Services, pour le benchmarking, l'analyse et la recherche, ainsi que pour publier des analyses sectorielles sous forme agrégée et anonymisée.",
              "Sundae détient exclusivement tous les droits sur les Aggregated Data et les Benchmark Data, à condition que ces données n'identifient aucune personne ni votre entreprise.",
            ],
          },
          {
            title: "6.4 Politique de confidentialité",
            paragraphs: [
              "Votre utilisation des Services est également régie par notre Politique de confidentialité, incorporée par référence aux présentes Conditions.",
            ],
          },
          {
            title: "6.5 Sécurité des données",
            paragraphs: [
              "Nous appliquons des mesures techniques et organisationnelles conformes aux standards du secteur pour protéger les Customer Data, notamment le chiffrement en transit et au repos, les contrôles d'accès et la surveillance. Toutefois, aucune méthode de transmission ou de stockage n'est sûre à 100 %, et nous ne pouvons garantir une sécurité absolue.",
            ],
          },
        ],
      },
      {
        title: "7. Déclarations et obligations de l'utilisateur",
        paragraphs: [
          "Vous déclarez et garantissez que :",
          "Vous êtes responsable de la configuration et de l'utilisation des Services conformément au droit applicable.",
        ],
        bullets: [
          "vous disposez de tous les droits, consentements et autorisations nécessaires pour télécharger et partager des Customer Data via les Services ;",
          "vos Customer Data et votre utilisation des Services ne violent et ne violeront aucune loi applicable ni aucun droit de tiers, y compris les lois relatives à la confidentialité, au travail et à la protection des données ;",
          "vous ne téléchargerez pas de données personnelles sensibles, sauf si le droit applicable et notre Politique de confidentialité l'autorisent expressément ;",
          "toutes les Customer Data que vous fournissez à des fins d'analyse et de benchmarking sont, à votre connaissance, exactes, complètes et à jour.",
        ],
      },
      {
        title: "8. Propriété intellectuelle",
        paragraphs: [
          "Les Services, ainsi que leur contenu original, leurs caractéristiques et leurs fonctionnalités, sont la propriété de Sundae et sont protégés par les lois internationales relatives au droit d'auteur, aux marques, aux brevets, aux secrets commerciaux et à d'autres règles de propriété intellectuelle.",
          "Sundae conserve l'intégralité des droits, titres et intérêts sur les Services, y compris tous les droits de propriété intellectuelle associés. Vous ne pouvez ni supprimer, ni modifier, ni masquer les mentions de propriété figurant sur les Services.",
        ],
      },
      {
        title: "9. Licence d'utilisation des Services",
        paragraphs: [
          "Sous réserve de votre respect des présentes Conditions et des Subscription Forms applicables, Sundae vous accorde une licence limitée, non exclusive, incessible et non sous-licenciable pour accéder aux Services et les utiliser pendant la durée de votre abonnement et uniquement à des fins internes professionnelles.",
          "Vous ne pouvez pas revendre, redistribuer, mettre en marque blanche ou proposer les Services, ou leurs résultats, à des tiers comme un service autonome, sauf accord écrit de notre part.",
        ],
      },
      {
        title: "10. Frais, facturation et taxes",
        subsections: [
          {
            title: "10.1 Frais",
            paragraphs: [
              "Certaines parties des Services sont gratuites ; d'autres nécessitent le paiement de frais d'abonnement ou d'utilisation conformément au Subscription Form ou à la page tarifaire applicable. Sauf indication contraire, tous les frais sont exprimés en dollars américains. Vous êtes responsable du paiement de tous les frais et des taxes applicables.",
            ],
          },
          {
            title: "10.2 Facturation et renouvellement",
            paragraphs: [
              "Sauf indication contraire, les abonnements sont facturés d'avance sur une base mensuelle ou annuelle et se renouvellent automatiquement à la fin de chaque période de facturation aux tarifs alors en vigueur, sauf résiliation avant renouvellement.",
            ],
          },
          {
            title: "10.3 Résiliation et remboursements",
            paragraphs: [
              "Vous pouvez résilier votre abonnement à tout moment depuis les paramètres de votre compte ou en nous contactant. La résiliation prend effet à la fin du cycle de facturation en cours. Les frais ne sont pas remboursables sauf disposition écrite expresse contraire.",
            ],
          },
          {
            title: "10.4 Retards de paiement et suspension",
            paragraphs: [
              "Si vous ne payez pas les frais à l'échéance, nous pouvons suspendre ou limiter votre accès aux Services jusqu'au paiement intégral.",
            ],
          },
          {
            title: "10.5 Taxes",
            paragraphs: [
              "Les frais n'incluent pas les taxes, droits ou charges similaires applicables. Vous êtes responsable de tous ces montants, à l'exception des taxes fondées sur le revenu net de Sundae.",
            ],
          },
        ],
      },
      {
        title: "11. Retours",
        paragraphs: [
          "Si vous nous fournissez des suggestions, idées ou retours concernant les Services (\"Feedback\"), vous accordez à Sundae une licence mondiale, perpétuelle, irrévocable et libre de redevance pour utiliser, copier, modifier, créer des œuvres dérivées et exploiter de toute autre manière ces retours à toute fin, sans obligation ni compensation à votre égard.",
        ],
      },
      {
        title: "12. Disponibilité du service, modifications et fonctionnalités bêta",
        paragraphs: [
          "Notre objectif est de maintenir les Services disponibles en continu, mais nous ne garantissons pas un fonctionnement ininterrompu ou exempt d'erreurs.",
          "Les fonctionnalités bêta ou de pré-lancement sont fournies \"en l'état\", sans garantie, et peuvent être retirées à tout moment.",
        ],
        bullets: [
          "Nous pouvons modifier ou supprimer des fonctionnalités.",
          "Nous pouvons lancer de nouveaux modules ou plans.",
          "Nous pouvons proposer un accès anticipé ou des fonctionnalités bêta susceptibles d'être instables ou expérimentales.",
        ],
      },
      {
        title: "13. Conditions supplémentaires relatives à Sundae Report",
        paragraphs: [
          "La présente section s'applique spécifiquement à votre utilisation de Sundae Report et complète le reste des présentes Conditions. En cas de conflit, la présente section prévaut pour Sundae Report.",
        ],
        subsections: [
          {
            title: "13.1 Description du service",
            paragraphs: [
              "Sundae Report est une plateforme de benchmarking et d'intelligence décisionnelle pour les restaurants, permettant de comparer des indicateurs de performance à ceux de pairs anonymisés grâce à l'agrégation et à l'analyse de données POS et opérationnelles.",
            ],
          },
          {
            title: "13.2 Fourniture des données",
            paragraphs: [
              "Vous vous engagez à fournir des données POS et opérationnelles exactes et complètes en téléchargeant des fichiers ou en connectant vos systèmes POS et systèmes connexes à Sundae Report.",
            ],
            bullets: [
              "Les chargements peuvent inclure les ventes, le chiffre d'affaires, les articles vendus, les clients, les transactions horodatées, les modes de paiement, les remises et les promotions, ainsi que d'autres indicateurs opérationnels.",
            ],
          },
          {
            title: "13.3 Anonymisation et agrégation",
            paragraphs: [
              "Avant d'inclure vos données dans les Benchmark Data et de les partager dans les résultats de benchmarking, nous les anonymisons et les agrégeons afin d'en supprimer les identifiants directs de votre restaurant, tels que le nom, l'adresse exacte, les données de propriété ou les noms des employés.",
              "Nous appliquons des seuils raisonnables de taille de groupe et d'autres techniques pour réduire le risque de réidentification ; pour éviter toute ambiguïté, les Aggregated Data et Benchmark Data anonymisées conformément à la présente section ne constituent ni des données personnelles ni des Customer Data au sens des présentes Conditions.",
            ],
          },
          {
            title: "13.4 Licence sur les données anonymisées et agrégées",
            paragraphs: [
              "En téléchargeant des données dans Sundae Report, vous accordez à Sundae une licence mondiale, perpétuelle, irrévocable et libre de redevance pour utiliser, traiter, anonymiser, agréger, analyser et afficher vos données afin d'exploiter Sundae Report et de fournir des services de benchmarking et d'analyse.",
              "Cette licence inclut la création d'œuvres dérivées à partir des Aggregated Data et des Benchmark Data ainsi que leur utilisation sous forme agrégée pour l'amélioration de la plateforme, la recherche, l'analyse et l'étude de marché. La licence subsiste après la résiliation de votre compte pour les données déjà créées.",
            ],
          },
          {
            title: "13.5 Licence d'utilisation de Sundae Report",
            paragraphs: [
              "Sous réserve de votre respect des présentes Conditions et du paiement des frais applicables, Sundae vous accorde une licence limitée, non exclusive et incessible pour accéder à Sundae Report et l'utiliser, ainsi que ses résultats de benchmarking, à des fins d'analyse interne et de prise de décision commerciale.",
            ],
          },
          {
            title: "13.6 Restrictions",
            paragraphs: [
              "En plus des restrictions générales de la section 5, vous ne pouvez pas revendre, redistribuer ni sous-licencier l'accès à Sundae Report ou à ses Benchmark Data à des tiers, sauf pour partager des rapports en interne ; tenter d'inverser l'anonymisation des Benchmark Data ou des Aggregated Data afin d'identifier d'autres restaurants ou participants ; ni utiliser les Benchmark Data pour créer ou entraîner un service concurrent sans notre consentement écrit préalable.",
            ],
          },
        ],
      },
      {
        title: "14. Confidentialité",
        paragraphs: [
          "Chaque partie peut recevoir des informations confidentielles et non publiques de l'autre partie (les \"Informations Confidentielles\"), notamment des Customer Data, des feuilles de route produits, des tarifs, des plans d'affaires et toute information marquée comme confidentielle ou raisonnablement comprise comme telle.",
          "La partie destinataire n'utilise les Informations Confidentielles que dans la mesure nécessaire à l'exécution de ses obligations et les protège avec au moins un soin raisonnable.",
          "Les Informations Confidentielles ne comprennent pas les informations qui sont publiques sans violation, reçues d'un tiers sans obligation de confidentialité, développées indépendamment ou devant être divulguées par la loi.",
          "Les Aggregated Data et Benchmark Data qui ne vous identifient pas ne constituent pas vos Informations Confidentielles.",
        ],
      },
      {
        title: "15. Clauses de non-garantie",
        paragraphs: [
          "LES SERVICES, Y COMPRIS SUNDAE REPORT, LES BENCHMARK DATA ET TOUS LES RÉSULTATS GÉNÉRÉS PAR L'IA, SONT FOURNIS \"EN L'ÉTAT\" ET \"SELON DISPONIBILITÉ\", SANS GARANTIE D'AUCUNE SORTE, EXPRESSE OU IMPLICITE.",
          "DANS LA MESURE MAXIMALE AUTORISÉE PAR LA LOI, SUNDAE DÉCLINE EXPRESSÉMENT TOUTE GARANTIE, Y COMPRIS LES GARANTIES IMPLICITES DE QUALITÉ MARCHANDE, D'ADÉQUATION À UN USAGE PARTICULIER ET DE NON-CONTREFAÇON, AINSI QUE TOUTE GARANTIE SELON LAQUELLE LES SERVICES SERONT ININTERROMPUS, PONCTUELS, SÉCURISÉS OU EXEMPTS D'ERREURS.",
          "Nous ne garantissons pas non plus l'exactitude, l'exhaustivité ou la fiabilité des analyses, des Benchmark Data ou des informations générées par l'IA, ni que les résultats répondront à vos attentes ou produiront un résultat commercial spécifique.",
          "Vous êtes seul responsable de l'interprétation et de l'utilisation des résultats, informations, recommandations ou décisions issus des Services, y compris les décisions relatives aux prix, au personnel, aux stocks, au menu, au marketing ou à toute autre décision opérationnelle ou stratégique. Les Services sont conçus pour soutenir la décision humaine, et non pour la remplacer.",
        ],
      },
      {
        title: "16. Indemnisation",
        paragraphs: [
          "Vous acceptez d'indemniser, de défendre et de dégager de toute responsabilité Sundae ainsi que ses dirigeants, administrateurs, employés, agents et sociétés affiliées à l'égard de toute réclamation, dommage, perte, responsabilité, coût ou dépense, y compris les honoraires d'avocat raisonnables, résultant de votre utilisation des Services, de vos Customer Data, de votre violation des présentes Conditions ou de la violation des droits de tiers.",
        ],
      },
      {
        title: "17. Limitation de responsabilité",
        paragraphs: [
          "Dans la mesure maximale autorisée par le droit applicable, Sundae et ses sociétés affiliées, dirigeants, employés, agents, fournisseurs et concédants de licence ne seront pas responsables des dommages indirects, accessoires, spéciaux, consécutifs ou punitifs, y compris la perte de bénéfices, la perte de données, d'utilisation, de clientèle ou d'autres pertes immatérielles découlant de l'utilisation ou de l'impossibilité d'utiliser les Services.",
          "La responsabilité globale maximale de Sundae découlant des présentes Conditions n'excédera pas le montant le plus élevé entre les sommes que vous avez payées à Sundae pour les Services au cours des douze (12) mois précédant l'événement ayant donné lieu à la réclamation, ou cent dollars américains (US$100).",
          "Certaines juridictions n'autorisent pas certaines exclusions ou limitations, et dans ce cas notre responsabilité sera limitée au maximum permis par la loi.",
        ],
      },
      {
        title: "18. Durée et résiliation",
        subsections: [
          {
            title: "18.1 Durée",
            paragraphs: [
              "Les présentes Conditions prennent effet lorsque vous accédez aux Services ou les utilisez pour la première fois, ou lorsque vous les acceptez, et demeurent en vigueur jusqu'à leur résiliation.",
            ],
          },
          {
            title: "18.2 Résiliation par vous",
            paragraphs: [
              "Vous pouvez résilier votre compte et cesser d'utiliser les Services à tout moment via les paramètres de votre compte ou en nous contactant. Les frais payés d'avance ne sont pas remboursables sauf indication écrite contraire.",
              "Vous pouvez demander la suppression des Customer Data identifiables en écrivant à legal@sundae.io dans les soixante (60) jours suivant la résiliation. Vous comprenez que les Customer Data proviennent de vos propres systèmes opérationnels et que vous y conservez un accès indépendant à tout moment. Sundae fera des efforts raisonnables pour supprimer les Customer Data identifiables dans les quatre-vingt-dix (90) jours suivant une demande valide, sauf lorsque leur conservation est nécessaire en vertu de la loi, pour résoudre des litiges ou pour des sauvegardes de routine. Les Aggregated Data et Benchmark Data non identifiables ne sont pas soumises aux demandes de suppression et peuvent être conservées indéfiniment conformément à la section 13.4.",
            ],
          },
          {
            title: "18.3 Résiliation ou suspension par Sundae",
            paragraphs: [
              "Nous pouvons suspendre ou résilier votre accès aux Services, en tout ou partie, immédiatement et sans préavis si vous violez les présentes Conditions, ne payez pas les frais, si la loi nous y oblige ou si la poursuite de la fourniture des Services présente un risque matériel pour Sundae.",
            ],
          },
          {
            title: "18.4 Effets de la résiliation",
            paragraphs: [
              "À la résiliation du contrat, votre droit d'accéder aux Services et de les utiliser cesse immédiatement. Les sections qui, par leur nature, doivent survivre resteront en vigueur, y compris, sans limitation, les sections 6.3, 8 à 11, 13.4 et 14 à 22. Les Aggregated Data et Benchmark Data déjà créées peuvent être conservées et utilisées conformément aux présentes Conditions.",
            ],
          },
        ],
      },
      {
        title: "19. Droit applicable et règlement des litiges",
        paragraphs: [
          "Les présentes Conditions, ainsi que tout litige ou toute réclamation en découlant ou s'y rapportant, seront régis et interprétés conformément aux lois de l'État du Delaware, aux États-Unis, sans égard à ses règles de conflit de lois.",
          "Les parties conviennent irrévocablement que les tribunaux d'État et fédéraux situés dans le Delaware auront compétence exclusive pour connaître de tout litige ou réclamation découlant des présentes Conditions ou s'y rapportant.",
        ],
      },
      {
        title: "20. Modifications des Conditions",
        paragraphs: [
          "Nous pouvons modifier les présentes Conditions de temps à autre. Si nous apportons des modifications substantielles, nous vous en informerons, par exemple par e-mail, notification dans l'application ou en mettant à jour la date de \"Dernière mise à jour\".",
          "Si vous continuez à accéder aux Services ou à les utiliser une fois les Conditions mises à jour entrées en vigueur, vous acceptez d'être lié par la version révisée. Si vous n'êtes pas d'accord, vous devez cesser d'utiliser les Services.",
        ],
      },
      {
        title: "21. Cession",
        paragraphs: [
          "Vous ne pouvez céder ni transférer les présentes Conditions, de plein droit ou autrement, sans notre consentement écrit préalable. Nous pouvons céder les présentes Conditions, en tout ou partie, sans votre consentement, à une société affiliée ou dans le cadre d'une fusion, acquisition, réorganisation de société ou vente d'actifs.",
        ],
      },
      {
        title: "22. Dispositions diverses",
        bullets: [
          "Accord complet : les présentes Conditions, ainsi que la Politique de confidentialité et tout Subscription Form applicable, constituent l'intégralité de l'accord entre vous et Sundae concernant les Services et remplacent tout accord antérieur ou concomitant.",
          "Divisibilité : si une disposition est jugée invalide ou inapplicable, elle sera exécutée dans la mesure maximale permise et le reste demeurera pleinement en vigueur.",
          "Absence de renonciation : notre défaut d'exercer un droit ou de faire appliquer une disposition ne constitue pas une renonciation à ce droit ou à cette disposition.",
          "Relation entre les parties : les parties agissent en qualité de cocontractants indépendants. Aucune disposition des présentes ne crée de partenariat, coentreprise, mandat ni relation de travail.",
          "Notifications : nous pouvons vous envoyer des notifications par e-mail à l'adresse associée à votre compte ou via des notifications dans l'application. Vous pouvez nous envoyer des notifications juridiques à l'adresse indiquée ci-dessous.",
          "Titres : les titres des sections sont fournis à titre indicatif uniquement et n'affectent pas l'interprétation des Conditions.",
        ],
      },
      {
        title: "23. Contact",
        paragraphs: [
          "Si vous avez des questions sur les présentes Conditions ou sur les Services, contactez-nous.",
        ],
      },
    ],
    contactHeading: "Questions sur ces conditions ?",
    contactDescription:
      "Si vous avez des questions ou des inquiétudes au sujet de ces Conditions d'utilisation, n'hésitez pas à nous contacter.",
    cards: [
      { title: 'Nous écrire', value: COMPANY.legalEmail, icon: 'support', href: `mailto:${COMPANY.legalEmail}` },
      { title: 'Nous appeler', value: '+971 (4) 501-7308', icon: 'support', href: 'tel:+97145017308' },
      { title: 'Nous rendre visite', value: companyAddressLines, icon: 'multiLocation' },
    ],
    buttons: {
      secondary: 'Politique de confidentialité',
      primary: "Contacter l'équipe juridique",
    },
  },
  es: {
    badge: 'Legal',
    title: 'Terminos de servicio',
    lastUpdatedLabel: 'Ultima actualizacion: 3 de marzo de 2026',
    noticeTitle: 'Importante',
    noticeBody:
      'Al acceder o utilizar los servicios de Sundae, aceptas quedar vinculado por estos Terminos de servicio. Leelos con atencion.',
    sections: [
      {
        title: '1. Introduccion y aceptacion de los terminos',
        paragraphs: [
          'Estos Terminos de servicio ("Terminos") regulan tu acceso y uso de los sitios web, aplicaciones, plataformas y productos relacionados de Sundae (conjuntamente, los "Servicios"), incluido el modulo de benchmarking y analitica Sundae Report.',
          'Estos Terminos constituyen un acuerdo legalmente vinculante entre Sundae Technologies Inc., sociedad constituida en Delaware, Estados Unidos, que opera bajo el nombre "Sundae" y administra los dominios sundae.io, sundaetech.ai, sundaetech.io y sundaetechnologies.com, y la entidad o persona que acepta estos Terminos ("Cliente", "tu" o "tuyo"). Sundae Technologies Inc. puede prestar servicios directamente o a traves de afiliados, revendedores autorizados o socios regionales.',
          'Al acceder o utilizar los Servicios, o al pulsar "Acepto" o una expresion similar, aceptas quedar vinculado por estos Terminos en nombre propio y, cuando corresponda, de la entidad a la que representas. Si no aceptas estos Terminos, no debes acceder ni usar los Servicios.',
          'Si aceptas estos Terminos en nombre de una empresa u otra entidad legal, declaras y garantizas que tienes autoridad para obligarla, y en ese caso "tu" y "tuyo" se refieren a dicha entidad.',
          'En determinadas regiones, las suscripciones comerciales se venden y administran a traves de revendedores y socios regionales autorizados, como Ambia Global Technologies Ltd en el DIFC, Dubai. Cuando exista un acuerdo de suscripcion independiente con un revendedor autorizado, ese acuerdo regira las condiciones comerciales de la suscripcion, mientras que estos Terminos seguiran rigiendo el uso de la Plataforma, la propiedad intelectual, los datos y el uso aceptable. En caso de conflicto, prevaleceran estos Terminos en materia de uso de la plataforma, IP o datos, y el acuerdo de revendedor en materia comercial.',
        ],
      },
      {
        title: '2. Definiciones',
        paragraphs: ['A efectos de estos Terminos:'],
        bullets: [
          '"Sundae", "nosotros", "nos" y "nuestro" significan Sundae Technologies Inc., con sus afiliadas, que operan los dominios sundae.io, sundaetech.ai, sundaetech.io y sundaetechnologies.com.',
          '"Servicios" significa las plataformas de inteligencia de decisiones y de gestion de equipos impulsadas por IA de Sundae, incluidos Sundae Report, cuadros de mando, APIs, integraciones, aplicaciones moviles y de escritorio, y el sitio web.',
          '"Sundae Report" significa el modulo de benchmarking de inteligencia de decisiones para restaurantes que agrega y anonimiza datos operativos para ofrecer comparativas de rendimiento.',
          '"Customer Data" significa la informacion personal y los datos POS que tu o tus usuarios envian o cargan en los Servicios.',
          '"Usage Data" significa los datos tecnicos, de registro o metadatos sobre como tu y tus usuarios acceden y usan los Servicios.',
          '"Aggregated Data" significa datos resultantes de la agregacion o anonimizacion de Customer Data y/o Usage Data de forma que no identifiquen a ninguna persona ni puedan reidentificarse razonablemente.',
          '"Benchmark Data" significa Aggregated Data usada para generar metricas comparativas y benchmarks sectoriales disponibles a traves de los Servicios, incluido Sundae Report.',
          '"Subscription Form" significa cualquier documento de pedido, flujo de alta u otro registro equivalente que especifique tu plan, tarifas y condiciones comerciales.',
        ],
      },
      {
        title: '3. Descripcion de los Servicios',
        paragraphs: [
          'Sundae ofrece soluciones de inteligencia de decisiones impulsadas por IA, principalmente para restaurantes y negocios de hosteleria. Los Servicios pueden incluir, entre otros, una plataforma de integracion y analitica de datos, insights y automatizacion impulsados por IA, benchmarking y analitica de rendimiento, un sistema multiagente para operaciones de restaurante, monitorizacion en tiempo real, alertas y deteccion de anomalías, cuadros de mando y reportes personalizados, y APIs e integraciones con sistemas de terceros.',
          'Podemos agregar, modificar o retirar funciones o modulos en cualquier momento, segun se indica en la seccion 12.',
        ],
      },
      {
        title: '4. Elegibilidad y registro de cuenta',
        subsections: [
          {
            title: '4.1 Elegibilidad',
            paragraphs: [
              'Solo puedes usar los Servicios si tienes al menos 18 anos y capacidad legal para celebrar un contrato vinculante conforme a la ley aplicable.',
            ],
          },
          {
            title: '4.2 Creacion de cuenta',
            paragraphs: [
              'Para acceder a muchas funciones de los Servicios, debes crear una cuenta y proporcionar informacion exacta, actual y completa, manteniendola actualizada.',
              'Si creas una cuenta en nombre de una empresa, declaras que estas autorizado para hacerlo.',
            ],
          },
          {
            title: '4.3 Seguridad de la cuenta',
            paragraphs: [
              'Eres responsable de mantener la confidencialidad de tus credenciales de acceso y de todas las actividades que ocurran en tu cuenta.',
            ],
            bullets: [
              'No compartir tu contrasena ni tu cuenta con personas no autorizadas.',
              'Notificarnos de inmediato cualquier uso no autorizado de tu cuenta o cualquier brecha de seguridad.',
            ],
          },
        ],
      },
      {
        title: '5. Uso permitido y uso aceptable',
        paragraphs: [
          'Solo puedes utilizar los Servicios para fines internos de tu negocio y de conformidad con estos Terminos y con la ley aplicable. No debes:',
          'Podemos suspender o terminar el acceso por incumplimiento de esta seccion, a nuestra entera discrecion.',
        ],
        bullets: [
          'usar los Servicios con fines ilicitos, fraudulentos o abusivos;',
          'interferir o interrumpir los Servicios o los servidores, ni eludir medidas de seguridad;',
          'intentar acceder sin autorizacion a cualquier parte de los Servicios o sistemas relacionados;',
          'cargar o transmitir virus, malware u otro codigo danino;',
          'usar los Servicios para desarrollar u ofrecer un producto competidor o para analisis competitivo fuera del benchmarking interno legitimo;',
          'aplicar ingenieria inversa, descompilar, desensamblar o intentar derivar el codigo fuente o los modelos subyacentes, salvo en la medida limitada permitida por la ley aplicable;',
          'extraer, recolectar o descargar datos de forma masiva mediante herramientas automatizadas sin nuestro permiso por escrito;',
          'intentar reidentificar o desanonimizar Aggregated Data o Benchmark Data.',
        ],
      },
      {
        title: '6. Customer Data, Usage Data y privacidad',
        subsections: [
          {
            title: '6.1 Propiedad de Customer Data',
            paragraphs: ['Conservas todos los derechos, titularidad e interes sobre tu Customer Data, sujeto a las licencias que concedes a Sundae en estos Terminos.'],
          },
          {
            title: '6.2 Licencia sobre Customer Data',
            paragraphs: [
              'Al enviar o cargar Customer Data en los Servicios, concedas a Sundae una licencia no exclusiva, mundial y libre de regalias para usar, almacenar, alojar, copiar, procesar, analizar, transmitir y mostrar Customer Data solo para prestar, mantener y dar soporte a los Servicios, y para prevenir o resolver problemas de servicio, seguridad o tecnicos.',
              'Para Sundae Report, concedas ademas los derechos adicionales sobre Aggregated Data y Benchmark Data descritos en la seccion 13.',
            ],
          },
          {
            title: '6.3 Usage Data, Aggregated Data y Benchmark Data',
            paragraphs: [
              'Sundae puede generar Usage Data sobre tu uso de los Servicios y combinar Customer Data y Usage Data para crear Aggregated Data y Benchmark Data, que pueden usarse para operar, mejorar y desarrollar los Servicios, para benchmarking, analitica e investigacion, y para publicar insights sectoriales en forma agregada y anonima.',
              'Sundae es titular exclusivo de todos los derechos sobre Aggregated Data y Benchmark Data, siempre que esos datos no identifiquen a ninguna persona ni a tu negocio.',
            ],
          },
          {
            title: '6.4 Politica de privacidad',
            paragraphs: ['Tu uso de los Servicios tambien se rige por nuestra Politica de privacidad, incorporada a estos Terminos por referencia.'],
          },
          {
            title: '6.5 Seguridad de los datos',
            paragraphs: [
              'Aplicamos medidas tecnicas y organizativas estandar del sector para proteger Customer Data, incluido el cifrado en transito y en reposo, controles de acceso y monitorizacion. No obstante, ningun metodo de transmision o almacenamiento es 100% seguro y no podemos garantizar una seguridad absoluta.',
            ],
          },
        ],
      },
      {
        title: '7. Responsabilidades y declaraciones del usuario',
        paragraphs: [
          'Declaras y garantizas que:',
          'Eres responsable de configurar y usar los Servicios de forma coherente con la ley aplicable.',
        ],
        bullets: [
          'tienes todos los derechos, consentimientos y permisos necesarios para cargar y compartir Customer Data a traves de los Servicios;',
          'tu Customer Data y tu uso de los Servicios no infringen ni infringiran ninguna ley aplicable ni derechos de terceros, incluidas las leyes de privacidad, empleo y proteccion de datos;',
          'no cargaras datos personales sensibles salvo que la ley aplicable y nuestra Politica de privacidad lo permitan expresamente;',
          'todo Customer Data que proporciones para analitica y benchmarking es, segun tu leal saber y entender, exacto, completo y actualizado.',
        ],
      },
      {
        title: '8. Propiedad intelectual',
        paragraphs: [
          'Los Servicios y su contenido, funciones y funcionalidad originales son propiedad de Sundae y estan protegidos por leyes internacionales de copyright, marcas, patentes, secretos comerciales y otras normas de propiedad intelectual.',
          'Sundae conserva todos los derechos, titularidad e interes sobre los Servicios, incluidos todos los derechos de propiedad intelectual relacionados. No puedes eliminar, alterar ni ocultar avisos de propiedad de los Servicios.',
        ],
      },
      {
        title: '9. Licencia de uso de los Servicios',
        paragraphs: [
          'Sujeto a tu cumplimiento de estos Terminos y de los Subscription Forms aplicables, Sundae te concede una licencia limitada, no exclusiva, intransferible y sin derecho a sublicencia para acceder y usar los Servicios durante tu periodo de suscripcion y solo para fines internos de negocio.',
          'No puedes revender, redistribuir, white-label ni ofrecer los Servicios o sus resultados a terceros como servicio independiente, salvo acuerdo escrito de nuestra parte.',
        ],
      },
      {
        title: '10. Tarifas, facturacion e impuestos',
        subsections: [
          {
            title: '10.1 Tarifas',
            paragraphs: [
              'Algunas partes de los Servicios son gratuitas; otras requieren pago de tarifas de suscripcion o de uso segun el Subscription Form o la pagina de precios aplicable. Salvo que se indique lo contrario, todas las tarifas se expresan en dolares estadounidenses. Eres responsable de pagar todas las tarifas y los impuestos aplicables.',
            ],
          },
          {
            title: '10.2 Facturacion y renovacion',
            paragraphs: [
              'Salvo indicacion en contrario, las suscripciones se facturan por adelantado de forma mensual o anual y se renuevan automaticamente al final de cada periodo de facturacion a las tarifas vigentes, salvo cancelacion previa a la renovacion.',
            ],
          },
          {
            title: '10.3 Cancelaciones y reembolsos',
            paragraphs: [
              'Puedes cancelar tu suscripcion en cualquier momento desde la configuracion de tu cuenta o contactandonos. La cancelacion surte efecto al final del ciclo de facturacion en curso. Las tarifas no son reembolsables salvo que se indique expresamente por escrito.',
            ],
          },
          {
            title: '10.4 Pagos tardios y suspension',
            paragraphs: [
              'Si no pagas las tarifas cuando correspondan, podemos suspender o limitar tu acceso a los Servicios hasta recibir el pago.',
            ],
          },
          {
            title: '10.5 Impuestos',
            paragraphs: [
              'Las tarifas no incluyen impuestos, tasas o cargos similares aplicables. Tu eres responsable de todos esos importes, excluidos los impuestos basados en el ingreso neto de Sundae.',
            ],
          },
        ],
      },
      {
        title: '11. Comentarios',
        paragraphs: [
          'Si nos proporcionas sugerencias, ideas o comentarios sobre los Servicios ("Feedback"), concedes a Sundae una licencia mundial, perpetua, irrevocable y libre de regalias para usar, copiar, modificar, crear obras derivadas y explotar de cualquier otra forma ese Feedback para cualquier proposito, sin obligacion ni compensacion alguna hacia ti.',
        ],
      },
      {
        title: '12. Disponibilidad del servicio, cambios y funciones beta',
        paragraphs: [
          'Nuestro objetivo es mantener los Servicios disponibles de forma continua, pero no garantizamos una operacion ininterrumpida o libre de errores.',
          'Las funciones beta o de pre-lanzamiento se proporcionan "tal cual", sin garantias, y pueden retirarse en cualquier momento.',
        ],
        bullets: [
          'Podemos modificar o retirar funciones.',
          'Podemos lanzar nuevos modulos o planes.',
          'Podemos ofrecer acceso anticipado o funciones beta que pueden ser inestables o experimentales.',
        ],
      },
      {
        title: '13. Terminos adicionales para Sundae Report',
        paragraphs: [
          'Esta seccion se aplica especificamente a tu uso de Sundae Report y complementa el resto de estos Terminos. En caso de conflicto, esta seccion prevalece para Sundae Report.',
        ],
        subsections: [
          {
            title: '13.1 Descripcion del servicio',
            paragraphs: [
              'Sundae Report es una plataforma de inteligencia de decisiones y benchmarking para restaurantes que permite comparar metricas de rendimiento con peers anonimizados mediante la agregacion y analisis de datos POS y operativos.',
            ],
          },
          {
            title: '13.2 Aportacion de datos',
            paragraphs: [
              'Te comprometes a proporcionar datos POS y operativos exactos y completos cargando archivos o conectando tus sistemas POS y relacionados a Sundae Report.',
            ],
            bullets: [
              'Las cargas pueden incluir ventas, ingresos, articulos vendidos, clientes, transacciones con marca temporal, metodos de pago, descuentos y promociones, entre otras metricas operativas.',
            ],
          },
          {
            title: '13.3 Anonimizacion y agregacion',
            paragraphs: [
              'Antes de incluir tus datos en Benchmark Data y compartirlos como parte de los resultados de benchmarking, los anonimizamos y agregamos para eliminar identificadores directos de tu restaurante, como nombre, direccion exacta, datos de propiedad o nombres de empleados.',
              'Aplicamos umbrales razonables de tamano de grupo y otras tecnicas para reducir el riesgo de reidentificacion; por claridad, los Aggregated Data y Benchmark Data anonimizados conforme a esta seccion no constituyen datos personales ni Customer Data a efectos de estos Terminos.',
            ],
          },
          {
            title: '13.4 Licencia sobre datos anonimizados y agregados',
            paragraphs: [
              'Al cargar datos en Sundae Report, concedes a Sundae una licencia mundial, perpetua, irrevocable y libre de regalias para usar, procesar, anonimizar, agregar, analizar y mostrar tus datos con el fin de operar Sundae Report y ofrecer servicios de benchmarking y analitica.',
              'Esta licencia incluye la creacion de obras derivadas a partir de Aggregated Data y Benchmark Data y su uso en forma agregada para mejoras de la plataforma, investigacion, analitica y analisis de mercado. La licencia sobrevive a la terminacion de tu cuenta respecto de los datos ya creados.',
            ],
          },
          {
            title: '13.5 Licencia de uso de Sundae Report',
            paragraphs: [
              'Sujeto a tu cumplimiento de estos Terminos y al pago de las tarifas aplicables, Sundae te concede una licencia limitada, no exclusiva e intransferible para acceder y usar Sundae Report y sus resultados de benchmarking para analitica interna y toma de decisiones de negocio.',
            ],
          },
          {
            title: '13.6 Restricciones',
            paragraphs: [
              'Ademas de las restricciones generales de la seccion 5, no puedes revender, redistribuir ni sublicenciar el acceso a Sundae Report o a sus Benchmark Data a terceros, salvo para compartir informes internamente; intentar revertir la anonimizacion de Benchmark Data o Aggregated Data para identificar a otros restaurantes o participantes; ni usar Benchmark Data para crear o entrenar un servicio competidor sin nuestro consentimiento previo por escrito.',
            ],
          },
        ],
      },
      {
        title: '14. Confidencialidad',
        paragraphs: [
          'Cada parte puede recibir informacion confidencial y no publica de la otra ("Informacion Confidencial"), incluida Customer Data, hojas de ruta de producto, precios, planes de negocio y cualquier informacion marcada o razonablemente entendida como confidencial.',
          'La parte receptora usara la Informacion Confidencial solo en la medida necesaria para cumplir sus obligaciones y la protegera con, al menos, un cuidado razonable.',
          'La Informacion Confidencial no incluye informacion que sea publica sin incumplimiento, recibida de un tercero sin obligacion de confidencialidad, desarrollada independientemente o que deba divulgarse por ley.',
          'Aggregated Data y Benchmark Data que no te identifiquen no constituyen tu Informacion Confidencial.',
        ],
      },
      {
        title: '15. Exenciones de responsabilidad',
        paragraphs: [
          'LOS SERVICIOS, INCLUIDOS SUNDAE REPORT, BENCHMARK DATA Y TODOS LOS RESULTADOS GENERADOS POR IA, SE PROPORCIONAN "TAL CUAL" Y "SEGUN DISPONIBILIDAD", SIN GARANTIAS DE NINGUN TIPO, YA SEAN EXPRESAS O IMPLICITAS.',
          'EN LA MAXIMA MEDIDA PERMITIDA POR LA LEY, SUNDAE RENUNCIA EXPRESAMENTE A TODAS LAS GARANTIAS, INCLUIDAS LAS GARANTIAS IMPLICITAS DE COMERCIABILIDAD, IDONEIDAD PARA UN PROPOSITO PARTICULAR Y NO INFRACCION, ASI COMO CUALQUIER GARANTIA DE QUE LOS SERVICIOS SERAN ININTERRUMPIDOS, PUNTUALES, SEGUROS O LIBRES DE ERRORES.',
          'TAMPOCO GARANTIZAMOS LA EXACTITUD, COMPLETITUD O FIABILIDAD DE LAS ANALITICAS, LOS BENCHMARK DATA O LOS INSIGHTS GENERADOS POR IA, NI QUE LOS RESULTADOS CUMPLIRAN TUS EXPECTATIVAS O PRODUCIRAN UN RESULTADO COMERCIAL CONCRETO.',
          'Tu eres el unico responsable de interpretar y actuar sobre cualquier resultado, insight, recomendacion o decision derivada de los Servicios, incluidas decisiones de precios, personal, inventario, menu, marketing u otras decisiones operativas o estrategicas. Los Servicios estan disenados para apoyar la toma de decisiones humana, no para sustituirla.',
        ],
      },
      {
        title: '16. Indemnizacion',
        paragraphs: [
          'Aceptas indemnizar, defender y mantener indemne a Sundae y a sus directivos, consejeros, empleados, agentes y afiliadas frente a cualquier reclamacion, dano, perdida, responsabilidad, coste o gasto, incluidos honorarios razonables de abogados, derivados de tu uso de los Servicios, de tu Customer Data, de tu incumplimiento de estos Terminos o de la infraccion de derechos de terceros.',
        ],
      },
      {
        title: '17. Limitacion de responsabilidad',
        paragraphs: [
          'En la maxima medida permitida por la ley aplicable, Sundae y sus afiliadas, directivos, empleados, agentes, proveedores y licenciantes no seran responsables de danos indirectos, incidentales, especiales, consecuenciales o punitivos, incluidos lucro cesante, perdida de datos, uso, fondo de comercio u otras perdidas intangibles derivadas del uso o imposibilidad de usar los Servicios.',
          'La responsabilidad agregada maxima de Sundae derivada de estos Terminos no excedera el mayor de los siguientes importes: las cantidades que hayas pagado a Sundae por los Servicios en los doce (12) meses anteriores al hecho que dio lugar a la reclamacion, o cien dolares estadounidenses (US$100).',
          'Algunas jurisdicciones no permiten ciertas exclusiones o limitaciones, y en esos casos nuestra responsabilidad se limitara al maximo permitido por la ley.',
        ],
      },
      {
        title: '18. Vigencia y terminacion',
        subsections: [
          {
            title: '18.1 Vigencia',
            paragraphs: ['Estos Terminos entran en vigor cuando accedes o usas por primera vez los Servicios o cuando los aceptas, y permanecen vigentes hasta su terminacion.'],
          },
          {
            title: '18.2 Terminacion por tu parte',
            paragraphs: [
              'Puedes terminar tu cuenta y dejar de usar los Servicios en cualquier momento mediante la configuracion de tu cuenta o contactandonos. Las tarifas pagadas por adelantado no son reembolsables salvo que se indique por escrito.',
              'Puedes solicitar la eliminacion de Customer Data identificable escribiendo a legal@sundae.io dentro de los sesenta (60) dias posteriores a la terminacion. Entiendes que Customer Data proviene de tus propios sistemas operativos y que conservas acceso independiente a esos datos en todo momento. Sundae hara esfuerzos razonables para eliminar Customer Data identificable dentro de los noventa (90) dias posteriores a una solicitud valida, salvo cuando la conservacion sea necesaria por ley, para resolver disputas o por copias de seguridad rutinarias. Aggregated Data y Benchmark Data no identificables no estan sujetos a solicitudes de eliminacion y pueden conservarse indefinidamente de acuerdo con la seccion 13.4.',
            ],
          },
          {
            title: '18.3 Terminacion o suspension por parte de Sundae',
            paragraphs: [
              'Podemos suspender o terminar tu acceso a los Servicios, total o parcialmente, de inmediato y sin previo aviso si incumples estos Terminos, no pagas las tarifas, la ley nos obliga o si continuar prestando los Servicios supone un riesgo material para Sundae.',
            ],
          },
          {
            title: '18.4 Efecto de la terminacion',
            paragraphs: [
              'Al terminar el contrato, tu derecho a acceder y usar los Servicios cesara de inmediato. Las secciones que por su naturaleza deban sobrevivir permaneceran vigentes, incluyendo, sin limitacion, las secciones 6.3, 8-11, 13.4 y 14-22. Los Aggregated Data y Benchmark Data ya creados pueden conservarse y usarse conforme a estos Terminos.',
            ],
          },
        ],
      },
      {
        title: '19. Ley aplicable y resolucion de disputas',
        paragraphs: [
          'Estos Terminos y cualquier disputa o reclamacion derivada de ellos o relacionada con su objeto o formacion se regiran e interpretaran conforme a las leyes del Estado de Delaware, Estados Unidos, sin tener en cuenta sus normas de conflicto de leyes.',
          'Las partes acuerdan irrevocablemente que los tribunales estatales y federales situados en Delaware tendran jurisdiccion exclusiva para resolver cualquier disputa o reclamacion derivada de estos Terminos o relacionada con ellos.',
        ],
      },
      {
        title: '20. Cambios en los Terminos',
        paragraphs: [
          'Podemos modificar estos Terminos de vez en cuando. Si realizamos cambios materiales, te notificaremos, por ejemplo por correo electronico, aviso dentro de la aplicacion o actualizando la fecha de "Ultima actualizacion".',
          'Si continuas accediendo o usando los Servicios una vez que los Terminos actualizados entren en vigor, aceptas quedar vinculado por la version revisada. Si no estas de acuerdo, debes dejar de usar los Servicios.',
        ],
      },
      {
        title: '21. Cesion',
        paragraphs: [
          'No puedes ceder ni transferir estos Terminos, por efecto de la ley o de otro modo, sin nuestro consentimiento previo por escrito. Podemos ceder estos Terminos, total o parcialmente, sin tu consentimiento a una afiliada o en relacion con una fusion, adquisicion, reorganizacion societaria o venta de activos.',
        ],
      },
      {
        title: '22. Disposiciones varias',
        bullets: [
          'Acuerdo completo: estos Terminos, junto con la Politica de privacidad y cualquier Subscription Form aplicable, constituyen el acuerdo completo entre tu y Sundae respecto de los Servicios y sustituyen cualquier acuerdo previo o contemporaneo.',
          'Separabilidad: si alguna disposicion se considera invalida o inaplicable, se ejecutara en la maxima medida permitida y el resto seguira plenamente vigente.',
          'No renuncia: el hecho de que no hagamos valer algun derecho o disposicion no constituye renuncia a ese derecho o disposicion.',
          'Relacion de las partes: las partes actuan como contratistas independientes. Nada de lo aqui dispuesto crea una sociedad, joint venture, agencia ni relacion laboral.',
          'Avisos: podemos enviarte avisos por correo electronico a la direccion asociada a tu cuenta o mediante notificaciones dentro de la aplicacion. Puedes enviarnos avisos legales a la direccion indicada abajo.',
          'Titulos: los titulos de las secciones se incluyen solo por conveniencia y no afectan a la interpretacion de los Terminos.',
        ],
      },
      {
        title: '23. Contacto',
        paragraphs: [
          'Si tienes preguntas sobre estos Terminos o sobre los Servicios, contactanos.',
        ],
      },
    ],
    contactHeading: '¿Preguntas sobre estos terminos?',
    contactDescription:
      'Si tienes preguntas o inquietudes sobre estos Terminos de servicio, no dudes en contactarnos.',
    cards: [
      { title: 'Escribenos', value: COMPANY.legalEmail, icon: 'support', href: `mailto:${COMPANY.legalEmail}` },
      { title: 'Llamanos', value: '+971 (4) 501-7308', icon: 'support', href: 'tel:+97145017308' },
      { title: 'Visitanos', value: companyAddressLines, icon: 'multiLocation' },
    ],
    buttons: {
      secondary: 'Politica de privacidad',
      primary: 'Contactar al equipo legal',
    },
  },
};

export default async function TermsPage() {
  const cookieStore = await cookies();
  const locale = resolveWebsiteLocale(cookieStore);
  const lastUpdated = "March 3, 2026";

  if (locale !== 'en') {
    return <LocalizedTermsPage copy={localizedTermsCopy[locale]} />;
  }

  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <SundaeIcon name="document" size="md" />
              <span>Legal</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-[var(--text-primary)] mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-[var(--text-supporting)] max-w-3xl mx-auto">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <div className="bg-amber-500/10 border-l-4 border-amber-500/50 p-6 mb-8 rounded-r-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-amber-300">
                    <strong>Important:</strong> By accessing or using Sundae's services, you agree to be bound by these Terms of Service. Please read them carefully.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">1. Introduction & Acceptance of Terms</h2>
                <p className="text-[var(--text-secondary)] mb-4">
                  These Terms of Service (the "Terms") govern your access to and use of the Sundae websites, applications, platforms, and related products (collectively, the "Services"), including the Sundae Report benchmarking and analytics module.
                </p>
                <p className="text-[var(--text-secondary)] mb-4">
                  These Terms form a legally binding agreement between <strong>Sundae Technologies Inc.</strong>, a company incorporated in Delaware, United States, trading as &ldquo;Sundae&rdquo; and operating the domains sundae.io, sundaetech.ai, sundaetech.io, and sundaetechnologies.com (referred to as &ldquo;<strong>Sundae</strong>&rdquo;, &ldquo;<strong>we</strong>&rdquo;, &ldquo;<strong>us</strong>&rdquo;, or &ldquo;<strong>our</strong>&rdquo;), and the entity or individual accepting these Terms (the &ldquo;<strong>Customer</strong>&rdquo;, &ldquo;<strong>you</strong>&rdquo;, or &ldquo;<strong>your</strong>&rdquo;). Sundae Technologies Inc. may provide services directly or through authorized affiliates, resellers, or regional partners.
                </p>
                <p className="text-[var(--text-secondary)] mb-4">
                  By accessing or using the Services, or by clicking "I Agree" (or similar), you agree on behalf of yourself and, if applicable, the entity you represent, to be bound by these Terms. If you do not accept these Terms you must not access or use these Services.
                </p>
                <p className="text-[var(--text-secondary)] mb-4">
                  If you are accepting these Terms on behalf of a company or other legal entity, you represent and warrant that you have authority to bind that entity, in which case "<strong>you</strong>" and "<strong>your</strong>" refer to that entity.
                </p>
                <p className="text-[var(--text-secondary)] mb-4">
                  These Terms apply to all visitors, users, and others who access or use the Services.
                </p>
                <p className="text-[var(--text-secondary)]">
                  <strong>Enterprise and Commercial Subscriptions.</strong> In certain territories, commercial subscriptions to the Services are sold and administered through authorised resellers and regional partners (such as Ambia Global Technologies Ltd in the DIFC, Dubai). Where you enter into a separate subscription agreement with an authorised reseller, that agreement governs the commercial terms of your subscription (including fees, billing, and local support), and these Terms continue to govern your use of the Platform, intellectual property rights, data rights, and acceptable use. In the event of a conflict between your reseller subscription agreement and these Terms on matters of platform usage, IP, or data rights, these Terms shall prevail; on commercial matters (fees, billing, term), the reseller agreement shall prevail.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">2. Definitions</h2>
                <p className="text-[var(--text-secondary)] mb-4">For purposes of these Terms:</p>
                <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-3">
                  <li>
                    <strong>&ldquo;Sundae,&rdquo;</strong> <strong>&ldquo;we,&rdquo;</strong> <strong>&ldquo;us,&rdquo;</strong> <strong>&ldquo;our&rdquo;</strong> means Sundae Technologies Inc., a company incorporated in Delaware, United States, together with its affiliates, operating the domains sundae.io, sundaetech.ai, sundaetech.io, and sundaetechnologies.com.
                  </li>
                  <li>
                    <strong>"Services"</strong> means Sundae's AI-powered decision-intelligence and workforce platforms and related products, including Sundae Report, dashboards, APIs, integrations, mobile/desktop apps and website.
                  </li>
                  <li>
                    <strong>"Sundae Report"</strong> means Sundae's restaurant decision-intelligence benchmarking module that aggregates and anonymizes operational data to provide comparative performance insights.
                  </li>
                  <li>
                    <strong>"Customer Data"</strong> means your personal information (including POS data) you or your users submit or upload into the Services.
                  </li>
                  <li>
                    <strong>"Usage Data"</strong> means technical, log, and/or metadata about how you and your users access and use the Services.
                  </li>
                  <li>
                    <strong>"Aggregated Data"</strong> means data resulting from the aggregation and/or anonymization of Customer Data and/or Usage Data such that it does not identify you or any natural person and cannot reasonably be re-identified.
                  </li>
                  <li>
                    <strong>"Benchmark Data"</strong> means Aggregated Data used to generate comparative metrics and industry benchmarks made available to you through the Services (including Sundae Report).
                  </li>
                  <li>
                    <strong>"Subscription Form"</strong> means any online or offline ordering document, sign-up flow, or similar record specifying your subscription plan, fees, and commercial terms.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">3. Description of Services</h2>
                <p className="text-[var(--text-secondary)] mb-4">
                  Sundae provides AI-powered decision-intelligence solutions primarily for restaurants and hospitality businesses. Our Services may include, without limitation:
                </p>
                <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-2">
                  <li>Data integration and analytics platform</li>
                  <li>AI-powered insights, recommendations, and automation</li>
                  <li>Benchmarking and performance analytics (including Sundae Report)</li>
                  <li>Multi-agent AI system for restaurant operations</li>
                  <li>Real-time monitoring, alerts, and anomaly detection</li>
                  <li>Custom dashboards and reporting</li>
                  <li>APIs and integrations with third-party systems (e.g., POS, HR, accounting)</li>
                </ul>
                <p className="text-[var(--text-secondary)] mt-4">
                  We may add, modify, or discontinue features or modules from time to time (see Section 12).
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">4. Eligibility & Account Registration</h2>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">4.1 Eligibility</h3>
                <p className="text-[var(--text-secondary)] mb-4">
                  You may use the Services only if you (a) are at least 18 years old; and (b) have the legal capacity to enter into a binding contract under applicable law.
                </p>
                
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">4.2 Account Creation</h3>
                <p className="text-[var(--text-secondary)] mb-4">
                  To access many features of the Services, you must create an account and provide accurate, current, and complete information. You agree to keep this information up to date.
                </p>
                <p className="text-[var(--text-secondary)] mb-4">
                  If you create an account on behalf of a business, you represent that you are authorized to do so.
                </p>
                
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">4.3 Account Security</h3>
                <p className="text-[var(--text-secondary)] mb-4">
                  You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account. You agree to:
                </p>
                <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-2">
                  <li>Not share your password or account with any unauthorized person, and</li>
                  <li>Notify us immediately of any unauthorized use of your account or security breach.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">5. Permitted Use & Acceptable Use</h2>
                <p className="text-[var(--text-secondary)] mb-4">
                  You may use the Services only for your internal business purposes and in compliance with these Terms and all applicable laws and regulations. You agree not to:
                </p>
                <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-2">
                  <li>Use the Services for any unlawful, fraudulent, or abusive purpose.</li>
                  <li>Interfere with or disrupt the Services or servers, or bypass security measures.</li>
                  <li>Attempt to gain unauthorized access to any portion of the Services or related systems.</li>
                  <li>Upload or transmit viruses, malware, or other harmful code.</li>
                  <li>Use the Services to develop or offer a competing product or for competitive analysis other than legitimate internal benchmarking.</li>
                  <li>Reverse engineer, decompile, disassemble, or otherwise attempt to derive the source code or underlying models, except to the limited extent permitted by applicable law.</li>
                  <li>Scrape, harvest, or bulk-download data from the Services via automated tools without our written permission.</li>
                  <li>Attempt to re-identify or de-anonymize any Aggregated Data or Benchmark Data (see Sundae Report terms in Section 13).</li>
                </ul>
                <p className="text-[var(--text-secondary)] mt-4">
                  We may, in our sole discretion, suspend or terminate access for violations of this Section (see Section 18).
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">6. Customer Data, Usage Data & Privacy</h2>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">6.1 Ownership of Customer Data</h3>
                <p className="text-[var(--text-secondary)] mb-4">
                  You retain all rights, title, and interest in and to your Customer Data, subject to the licenses you grant to Sundae under these Terms.
                </p>
                
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">6.2 License to Customer Data</h3>
                <p className="text-[var(--text-secondary)] mb-4">
                  By submitting or uploading Customer Data to the Services, you grant Sundae a non-exclusive, worldwide, royalty-free license to use, store, host, copy, process, analyze, transmit, and display the Customer Data solely:
                </p>
                <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-2">
                  <li>To provide, maintain, and support the Services (including AI-powered features), and</li>
                  <li>To prevent or address service, security, or technical issues.</li>
                </ul>
                <p className="text-[var(--text-secondary)] mt-4">
                  For Sundae Report, you grant additional rights in respect of Aggregated Data and Benchmark Data as set out in Section 13.
                </p>
                
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">6.3 Usage Data, Aggregated Data & Benchmark Data</h3>
                <p className="text-[var(--text-secondary)] mb-4">
                  Sundae may generate Usage Data regarding your use of the Services. We may combine Customer Data and Usage Data to create Aggregated Data and Benchmark Data, which we may use:
                </p>
                <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-2">
                  <li>To operate, improve, and develop the Services</li>
                  <li>For benchmarking, analytics, and research</li>
                  <li>To publish industry insights in aggregated and anonymized form</li>
                </ul>
                <p className="text-[var(--text-secondary)] mt-4">
                  Sundae exclusively owns all rights, title, and interest in Aggregated Data and Benchmark Data, provided that such data does not identify you or any individual.
                </p>
                
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">6.4 Privacy Policy</h3>
                <p className="text-[var(--text-secondary)] mb-4">
                  Your use of the Services is also governed by our Privacy Policy, which explains how we collect, use, and disclose information about you. The Privacy Policy is incorporated into these Terms by reference.
                </p>
                
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">6.5 Data Security</h3>
                <p className="text-[var(--text-secondary)] mb-4">
                  We implement industry-standard technical and organizational measures to protect Customer Data, including encryption in transit and at rest, access controls, and monitoring. However, no method of transmission or storage is 100% secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">7. User Responsibilities & Representations</h2>
                <p className="text-[var(--text-secondary)] mb-4">
                  You represent and warrant that:
                </p>
                <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-2">
                  <li>You have all necessary rights, consents, and permissions to upload and share Customer Data through the Services.</li>
                  <li>Your Customer Data and use of the Services do not and will not violate any applicable law or third-party rights (including privacy, employment, and data protection laws).</li>
                  <li>You will not upload to the Services any sensitive personal data except as expressly allowed under applicable law and our Privacy Policy.</li>
                  <li>All Customer Data you provide for analytics and benchmarking is, to the best of your knowledge, accurate, complete, and current.</li>
                </ul>
                <p className="text-[var(--text-secondary)] mt-4">
                  You are responsible for configuring and using the Services in a manner that complies with applicable law.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">8. Intellectual Property</h2>
                <p className="text-[var(--text-secondary)] mb-4">
                  The Services and their original content, features, and functionality are owned by Sundae and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
                </p>
                <p className="text-[var(--text-secondary)]">
                  Sundae retains all rights, title, and interest in and to the Services, including all related intellectual property rights. You may not remove, alter, or obscure any proprietary notices from the Services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">9. License to Use the Services</h2>
                <p className="text-[var(--text-secondary)] mb-4">
                  Subject to your compliance with these Terms and applicable Order Forms, Sundae grants you a limited, non-exclusive, non-transferable, non-sublicensable license to access and use the Services during your subscription term for your internal business purposes only.
                </p>
                <p className="text-[var(--text-secondary)]">
                  You may not resell, redistribute, white-label, or provide the Services or outputs to third parties as a stand-alone service, unless we agree in writing.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">10. Fees, Billing & Taxes</h2>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">10.1 Fees</h3>
                <p className="text-[var(--text-secondary)] mb-4">
                  Some parts of the Services are provided free of charge; others require payment of subscription or usage-based fees as described in the applicable Order Form or pricing page. All fees are quoted in U.S. dollars unless otherwise specified. You are responsible for paying all fees and applicable taxes.
                </p>

                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">10.2 Billing & Renewal</h3>
                <p className="text-[var(--text-secondary)] mb-4">
                  Unless otherwise specified, subscriptions are billed in advance on a monthly or annual basis and automatically renew at the end of each billing period at the then-current rates, unless you cancel prior to renewal.
                </p>

                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">10.3 Cancellations & Refunds</h3>
                <p className="text-[var(--text-secondary)] mb-4">
                  You may cancel your subscription at any time via your account settings or by contacting us. Cancellation takes effect at the end of the current billing cycle. Fees are non-refundable unless otherwise expressly stated in writing.
                </p>

                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">10.4 Late Payments & Suspension</h3>
                <p className="text-[var(--text-secondary)] mb-4">
                  If you fail to pay fees when due, we may suspend or limit your access to the Services until payment is received.
                </p>

                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">10.5 Taxes</h3>
                <p className="text-[var(--text-secondary)]">
                  Fees are exclusive of any applicable taxes, duties, or similar charges. You are responsible for all such amounts (excluding taxes based on Sundae's net income).
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">11. Feedback</h2>
                <p className="text-[var(--text-secondary)]">
                  If you provide suggestions, ideas, or feedback about the Services ("Feedback"), you grant Sundae a worldwide, perpetual, irrevocable, royalty-free license to use, copy, modify, create derivative works of, and otherwise exploit such Feedback for any purpose, without any obligation or compensation to you.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">12. Service Availability, Changes & Beta Features</h2>
                <p className="text-[var(--text-secondary)] mb-4">
                  We aim to make the Services available on an ongoing basis but do not guarantee uninterrupted or error-free operation.
                </p>
                <p className="text-[var(--text-secondary)] mb-4">
                  We may:
                </p>
                <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-2">
                  <li>Modify or discontinue features,</li>
                  <li>Launch new modules or plans, or</li>
                  <li>Provide early access or beta features that may be unstable or experimental.</li>
                </ul>
                <p className="text-[var(--text-secondary)] mt-4">
                  Any beta or pre-release features are provided "as is" without warranties and may be discontinued at any time.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">13. Additional Terms for Sundae Report</h2>
                <p className="text-[var(--text-secondary)] mb-4">
                  This Section applies specifically to your use of Sundae Report and supplements the other sections of these Terms. In case of conflict, this Section prevails for Sundae Report.
                </p>

                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">13.1 Service Description (Sundae Report)</h3>
                <p className="text-[var(--text-secondary)] mb-4">
                  Sundae Report is a restaurant decision-intelligence and benchmarking platform that enables restaurants and food service establishments to compare their performance metrics against anonymized industry peers through the aggregation and analysis of POS and operational data.
                </p>

                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">13.2 Data Provision</h3>
                <p className="text-[var(--text-secondary)] mb-4">
                  You agree to provide accurate and complete POS and operational data by:
                </p>
                <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-2">
                  <li>Uploading data files; and/or</li>
                  <li>Connecting your POS and related systems to Sundae Report.</li>
                </ul>
                <p className="text-[var(--text-secondary)] mt-4">
                  This data may include, without limitation: sales transactions, revenue figures, item-level sales, customer counts, time-stamped transaction data, payment methods, discounts and promotions, and other operational metrics.
                </p>

                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">13.3 Anonymization & Aggregation</h3>
                <p className="text-[var(--text-secondary)] mb-4">
                  Before your data is included in Benchmark Data and shared as part of benchmarking outputs:
                </p>
                <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-2">
                  <li>We anonymize and aggregate the data to remove direct identifiers of your restaurant (e.g., name, precise address, ownership details, employee names).</li>
                  <li>We apply reasonable thresholds for peer-group sizes and other techniques intended to reduce the risk of re-identification.</li>
                </ul>
                <p className="text-[var(--text-secondary)] mt-4">
                  You acknowledge that no anonymization method is perfect, but we will use commercially reasonable efforts to ensure that individual restaurants cannot be identified from the Benchmark Data. Sundae applies reasonable minimum thresholds for peer-group sizes and other statistical techniques intended to reduce the risk of re-identification to a level where re-identification cannot reasonably be achieved by any person. For the avoidance of doubt, Aggregated Data and Benchmark Data that has been anonymised in accordance with this Section does not constitute personal data or Customer Data for the purposes of these Terms.
                </p>

                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">13.4 License to Anonymized & Aggregated Data</h3>
                <p className="text-[var(--text-secondary)] mb-4">
                  By uploading data to Sundae Report, you grant Sundae a worldwide, perpetual, irrevocable, royalty-free license to:
                </p>
                <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-2">
                  <li>Use, process, anonymize, aggregate, analyze, and display your data for the purposes of operating Sundae Report and providing benchmarking and analytics services; and</li>
                  <li>Create derivative works from anonymized and Aggregated Data, including Benchmark Data, and use such data and derivatives in aggregated form for platform improvement, research, analytics, and market analysis.</li>
                </ul>
                <p className="text-[var(--text-secondary)] mt-4">
                  This license survives termination of your account with respect to Aggregated Data and Benchmark Data already created.
                </p>

                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">13.5 License to Use Sundae Report</h3>
                <p className="text-[var(--text-secondary)] mb-4">
                  Subject to your compliance with these Terms and payment of applicable fees, Sundae grants you a limited, non-exclusive, non-transferable license to access and use Sundae Report and the benchmarking outputs for your internal business analytics and decision-making.
                </p>

                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">13.6 Restrictions (Sundae Report)</h3>
                <p className="text-[var(--text-secondary)] mb-4">
                  In addition to the general restrictions in Section 5, you agree that you will not:
                </p>
                <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-2">
                  <li>Resell, redistribute, or sublicense access to Sundae Report or its Benchmark Data to any third party, except to share reports internally within your organization.</li>
                  <li>Attempt to reverse-engineer or de-anonymize any Benchmark Data or Aggregated Data to identify other restaurants or participants.</li>
                  <li>Use Benchmark Data to create or train a competing benchmarking or analytics service without our prior written consent.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">14. Confidentiality</h2>
                <p className="text-[var(--text-secondary)] mb-4">
                  Each party may receive non-public, confidential information of the other party ("Confidential Information"). Confidential Information includes Customer Data, product roadmaps, pricing, business plans, and any information marked or reasonably understood to be confidential.
                </p>
                <p className="text-[var(--text-secondary)] mb-4">
                  The receiving party will:
                </p>
                <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-2">
                  <li>Use Confidential Information only as necessary to perform its obligations under these Terms; and</li>
                  <li>Protect Confidential Information using at least reasonable care.</li>
                </ul>
                <p className="text-[var(--text-secondary)] mt-4">
                  Confidential Information does not include information that is (a) publicly available without breach; (b) received from a third party without confidentiality obligation; (c) independently developed; or (d) required to be disclosed by law (with reasonable notice if legally permitted).
                </p>
                <p className="text-[var(--text-secondary)] mt-4">
                  Aggregated Data and Benchmark Data that do not identify you are not your Confidential Information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">15. Disclaimers</h2>
                <p className="text-[var(--text-secondary)] mb-4">
                  THE SERVICES (INCLUDING SUNDAE REPORT, BENCHMARK DATA, AND ALL AI-GENERATED OUTPUTS) ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED.
                </p>
                <p className="text-[var(--text-secondary)] mb-4">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, SUNDAE EXPRESSLY DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO:
                </p>
                <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-2">
                  <li>IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT;</li>
                  <li>ANY WARRANTY THAT THE SERVICES WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE;</li>
                  <li>ANY WARRANTY AS TO THE ACCURACY, COMPLETENESS, OR RELIABILITY OF ANALYTICS, BENCHMARK DATA, OR AI-GENERATED INSIGHTS; OR</li>
                  <li>THAT THE RESULTS OF USING THE SERVICES WILL MEET YOUR EXPECTATIONS OR PRODUCE ANY PARTICULAR BUSINESS OUTCOME.</li>
                </ul>
                <p className="text-[var(--text-secondary)] mt-4">
                  You are solely responsible for how you interpret and act upon any outputs, insights, recommendations, or decisions derived from the Services, including without limitation pricing decisions, staffing levels, inventory actions, menu engineering changes, marketing spend allocation, or any other operational or strategic decisions. The Services are designed to inform and support human decision-making, not to replace it. Sundae does not guarantee that acting on any output or recommendation will produce any particular business outcome, and shall not be liable for any loss or damage arising from your reliance on such outputs.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">16. Indemnification</h2>
                <p className="text-[var(--text-secondary)]">
                  You agree to indemnify, defend, and hold harmless Sundae and its officers, directors, employees, agents, and affiliates from and against any claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys' fees) arising out of or relating to:
                </p>
                <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-2 mt-4">
                  <li>Your use of the Services;</li>
                  <li>Your Customer Data (including allegations that it infringes a third party's rights or violates law);</li>
                  <li>Your breach of these Terms; or</li>
                  <li>Your violation of any third-party rights.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">17. Limitation of Liability</h2>
                <p className="text-[var(--text-secondary)] mb-4">
                  TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL SUNDAE OR ITS AFFILIATES, OFFICERS, EMPLOYEES, AGENTS, SUPPLIERS, OR LICENSORS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF (OR INABILITY TO USE) THE SERVICES.
                </p>
                <p className="text-[var(--text-secondary)] mt-4">
                  IN NO EVENT SHALL SUNDAE'S AGGREGATE LIABILITY ARISING OUT OF OR RELATED TO THESE TERMS EXCEED THE GREATER OF:
                </p>
                <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-2 mt-4">
                  <li>THE AMOUNTS YOU PAID TO SUNDAE FOR THE SERVICES IN THE TWELVE (12) MONTHS PRECEDING THE EVENT GIVING RISE TO THE CLAIM, OR</li>
                  <li>ONE HUNDRED U.S. DOLLARS (US$100).</li>
                </ul>
                <p className="text-[var(--text-secondary)] mt-4">
                  Some jurisdictions do not allow certain exclusions or limitations of liability; in such cases, our liability will be limited to the maximum extent permitted by law.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">18. Term & Termination</h2>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">18.1 Term</h3>
                <p className="text-[var(--text-secondary)] mb-4">
                  These Terms take effect when you first access or use the Services or agree to them, and continue until terminated as described below.
                </p>
                
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">18.2 Termination by You</h3>
                <p className="text-[var(--text-secondary)] mb-4">
                  You may terminate your account and stop using the Services at any time through your account settings or by contacting us. Any prepaid fees are non-refundable unless otherwise stated in writing.
                </p>
                <p className="text-[var(--text-secondary)] mb-4">
                  You may request deletion of identifiable Customer Data by contacting us at <a href="mailto:legal@sundae.io" className="text-[#60A5FA] hover:underline">legal@sundae.io</a> within sixty (60) days of termination. You acknowledge that Customer Data is sourced from your own operational systems (POS, ERP, delivery platforms, etc.) and that you retain independent access to such data through those systems at all times. Sundae will use reasonable efforts to delete identifiable Customer Data within ninety (90) days of a valid deletion request, except where retention is required by law, necessary for dispute resolution, or still resides in customer-controlled or provider-managed backup systems outside Sundae's direct deletion control. For the avoidance of doubt, Aggregated Data and Benchmark Data that does not identify you or any individual is not subject to deletion requests and may be retained and used by Sundae indefinitely in accordance with Section 13.4.
                </p>
                
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">18.3 Termination or Suspension by Sundae</h3>
                <p className="text-[var(--text-secondary)] mb-4">
                  We may suspend or terminate your access to the Services, in whole or in part, immediately and without prior notice if:
                </p>
                <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-2">
                  <li>You breach these Terms;</li>
                  <li>You fail to pay fees when due;</li>
                  <li>We are required to do so by law; or</li>
                  <li>Continuing to provide the Services would create material risk for Sundae.</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">18.4 Effect of Termination</h3>
                <p className="text-[var(--text-secondary)] mb-4">
                  Upon termination:
                </p>
                <ul className="list-disc pl-6 text-[var(--text-secondary)] space-y-2">
                  <li>Your right to access and use the Services will immediately cease.</li>
                  <li>Sections which by their nature should survive (including, without limitation, Sections 6.3, 8–11, 13.4, 14–18, 20–22) will survive.</li>
                  <li>Aggregated Data and Benchmark Data previously created may be retained and used in accordance with these Terms.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">19. Governing Law & Dispute Resolution</h2>
                <p className="text-[var(--text-secondary)] mb-4">
                  These Terms and any dispute or claim arising out of or in connection with them or their subject matter or formation (including non-contractual disputes or claims) shall be governed by and construed in accordance with the laws of the State of Delaware, United States, without regard to its conflict of law provisions.
                </p>
                <p className="text-[var(--text-secondary)]">
                  The parties irrevocably agree that the state and federal courts located in the State of Delaware shall have exclusive jurisdiction to settle any dispute or claim arising out of or in connection with these Terms or their subject matter or formation.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">20. Changes to Terms</h2>
                <p className="text-[var(--text-secondary)] mb-4">
                  We may modify these Terms from time to time. If we make material changes, we will provide notice (for example, by email, in-app notification, or by updating the "Last Updated" date).
                </p>
                <p className="text-[var(--text-secondary)]">
                  By continuing to access or use the Services after the updated Terms become effective, you agree to be bound by the revised Terms. If you do not agree, you must stop using the Services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">21. Assignment</h2>
                <p className="text-[var(--text-secondary)]">
                  You may not assign or transfer these Terms, by operation of law or otherwise, without our prior written consent. We may assign these Terms (in whole or part) without your consent to an affiliate, or in connection with a merger, acquisition, corporate reorganization, or sale of assets.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">22. Miscellaneous</h2>
                <ul className="space-y-4">
                  <li>
                    <p className="text-[var(--text-secondary)]">
                      <strong>Entire Agreement.</strong> These Terms (together with the Privacy Policy and any applicable Order Forms) constitute the entire agreement between you and Sundae regarding the Services and supersede all prior or contemporaneous agreements.
                    </p>
                  </li>
                  <li>
                    <p className="text-[var(--text-secondary)]">
                      <strong>Severability.</strong> If any provision of these Terms is held invalid or unenforceable, that provision will be enforced to the maximum extent permissible, and the remaining provisions will remain in full force and effect.
                    </p>
                  </li>
                  <li>
                    <p className="text-[var(--text-secondary)]">
                      <strong>No Waiver.</strong> Our failure to enforce any right or provision of these Terms is not a waiver of that right or provision.
                    </p>
                  </li>
                  <li>
                    <p className="text-[var(--text-secondary)]">
                      <strong>Relationship of Parties.</strong> The parties are independent contractors. Nothing in these Terms creates a partnership, joint venture, agency, or employment relationship.
                    </p>
                  </li>
                  <li>
                    <p className="text-[var(--text-secondary)]">
                      <strong>Notices.</strong> We may send notices to you by email to the address associated with your account or via in-app notifications. You may send legal notices to us at the address below.
                    </p>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">23. Contact Us</h2>
                <p className="text-[var(--text-secondary)] mb-4">
                  If you have any questions about these Terms or the Services, please contact:
                </p>
                <div className="bg-[var(--surface-faint)] p-4 rounded-lg">
                  <p className="text-[var(--text-secondary)]">
                    <strong>Sundae Technologies Inc.</strong><br />
                    1007 N Orange St, 4th Floor, Suite 1382<br />
                    Wilmington, DE 19801, United States<br />
                    Email: <a href="mailto:legal@sundae.io" className="text-[#60A5FA] hover:underline">legal@sundae.io</a>
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-6">
            Questions About These Terms?
          </h2>
          <p className="text-xl text-[var(--text-supporting)] mb-8">
            If you have any questions or concerns about these Terms of Service, please don't hesitate to contact us.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <Card variant="elevated">
              <CardContent className="p-6 text-center">
                <div className="w-10 h-10 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center"><SundaeIcon name="support" size="lg" className="text-white" /></div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">Email Us</h3>
                <a href="mailto:legal@sundae.io" className="text-[#60A5FA] hover:underline">
                  legal@sundae.io
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
            <Link href="/privacy">
              <Button variant="outline-light">
                Privacy Policy
              </Button>
            </Link>
            <Link href="/demo">
              <Button variant="primary">
                Contact Legal Team
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function renderTermsSectionBody(section: SectionCopy) {
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

function LocalizedTermsPage({ copy }: { copy: TermsCopy }) {
  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <SundaeIcon name="document" size="md" />
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
            <div className="bg-amber-500/10 border-l-4 border-amber-500/50 p-6 mb-8 rounded-r-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-amber-300">
                    <strong>{copy.noticeTitle}:</strong> {copy.noticeBody}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              {copy.sections.map((section) => (
                <section key={section.title}>
                  <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">{section.title}</h2>
                  {renderTermsSectionBody(section)}
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
            <Link href="/privacy">
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
