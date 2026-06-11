/**
 * Copy for the warm "cream relief" editorial band on the Pulse product page.
 * One CreamBreak placed after the "10 Capabilities" quick grid and before the long
 * dark feature-block run gives the page a warm breath in the dark scroll (the
 * homepage "volume system").
 *
 * Hand-authored native transcreation per locale - NOT literal word-for-word - so
 * each line reads the way an operator in that market would actually say it. Follows
 * the self-contained creamReliefCopy.ts / insightsCreamCopy.ts pattern: a
 * locale-keyed map resolved at render with an English fallback, kept out of the
 * large per-locale i18n.ts trees.
 *
 * EMPHASIS MARKER: every `statement` carries exactly one `*...*` span around the
 * "while" idea (the emphasized word in the English source) - the promise that you
 * see the shift while you can still change it. The renderer splits on `*` and
 * italicizes the wrapped phrase. Each locale MUST keep exactly one `*...*` pair
 * around the equivalent emphasized phrase.
 *
 * Glossary discipline: the product name "Pulse" stays untranslated in every locale.
 *
 * Punctuation: normal hyphen "-" only - no em dashes, en dashes, ellipsis
 * characters, or zero-width characters. Arabic (ar) and Urdu (ur) are RTL; the
 * copy is written natively and the layout handles direction.
 */

export interface PulseCreamCopy {
  eyebrow: string;
  /** Big editorial belief. The emphasized phrase is wrapped in `*...*`. */
  statement: string;
  lede: string;
}

export const pulseCreamCopy: Record<string, PulseCreamCopy> = {
  en: {
    eyebrow: 'REAL-TIME OPERATIONS',
    statement: 'See the shift *while* you can still change it.',
    lede: 'Live pacing, adaptive targets, and leakage alerts - the moment they matter, not the morning after.',
  },
  ar: {
    eyebrow: 'عمليات في الوقت الفعلي',
    statement: 'شاهد الوردية *بينما* لا يزال بإمكانك تغييرها.',
    lede: 'وتيرة حية، وأهداف تكيفية، وتنبيهات تسرب - في اللحظة التي تهم، لا في صباح اليوم التالي.',
  },
  fr: {
    eyebrow: 'OPÉRATIONS EN TEMPS RÉEL',
    statement: "Voyez le service *pendant* que vous pouvez encore le changer.",
    lede: "Cadence en direct, objectifs adaptatifs et alertes de fuite - au moment où ça compte, pas le lendemain matin.",
  },
  es: {
    eyebrow: 'OPERACIONES EN TIEMPO REAL',
    statement: 'Ve el turno *mientras* aún puedes cambiarlo.',
    lede: 'Ritmo en vivo, objetivos adaptativos y alertas de fuga - en el momento que importa, no a la mañana siguiente.',
  },
  de: {
    eyebrow: 'OPERATIONS IN ECHTZEIT',
    statement: 'Sehen Sie die Schicht, *solange* Sie sie noch ändern können.',
    lede: 'Live-Pacing, adaptive Ziele und Leckage-Alarme - im Moment, in dem sie zählen, nicht am Morgen danach.',
  },
  nl: {
    eyebrow: 'REALTIME OPERATIE',
    statement: 'Zie de dienst *terwijl* je hem nog kunt bijsturen.',
    lede: 'Live pacing, adaptieve doelen en lekkage-alerts - op het moment dat het telt, niet de volgende ochtend.',
  },
  pt: {
    eyebrow: 'OPERAÇÕES EM TEMPO REAL',
    statement: 'Veja o turno *enquanto* ainda dá para mudá-lo.',
    lede: 'Ritmo ao vivo, metas adaptativas e alertas de vazamento - no momento que importa, não na manhã seguinte.',
  },
  hi: {
    eyebrow: 'रियल-टाइम ऑपरेशन',
    statement: 'शिफ्ट को *तब* देखें जब आप उसे अब भी बदल सकें।',
    lede: 'लाइव पेसिंग, अडैप्टिव टारगेट और लीकेज अलर्ट - ठीक उसी पल जब वे मायने रखते हैं, अगली सुबह नहीं।',
  },
  ur: {
    eyebrow: 'ریئل ٹائم آپریشنز',
    statement: 'شفٹ کو *اُس وقت* دیکھیں جب آپ اسے ابھی بدل سکتے ہیں۔',
    lede: 'لائیو پیسنگ، اڈاپٹیو اہداف اور لیکیج الرٹس - عین اُسی لمحے جب وہ اہم ہوں، اگلی صبح نہیں۔',
  },
  it: {
    eyebrow: 'OPERATIVITÀ IN TEMPO REALE',
    statement: 'Guarda il turno *mentre* puoi ancora cambiarlo.',
    lede: 'Ritmo dal vivo, obiettivi adattivi e avvisi di leakage - nel momento che conta, non la mattina dopo.',
  },
  pl: {
    eyebrow: 'OPERACJE W CZASIE RZECZYWISTYM',
    statement: 'Zobacz zmianę *wtedy*, gdy wciąż możesz ją zmienić.',
    lede: 'Tempo na żywo, adaptacyjne cele i alerty o wyciekach - w chwili, gdy mają znaczenie, a nie nazajutrz rano.',
  },
  tr: {
    eyebrow: 'GERÇEK ZAMANLI OPERASYON',
    statement: 'Vardiyayı, hâlâ değiştirebilecekken *o anda* görün.',
    lede: 'Canlı tempo, uyarlanabilir hedefler ve kaçak uyarıları - önemli oldukları anda, ertesi sabah değil.',
  },
  'zh-Hans': {
    eyebrow: '实时运营',
    statement: '在你*还能*改变之前，看清这个班次。',
    lede: '实时进度、自适应目标与流失预警--在它们要紧的当下，而不是第二天早上。',
  },
  ja: {
    eyebrow: 'リアルタイム運用',
    statement: 'まだ変えられる*うち*に、シフトを見る。',
    lede: 'ライブのペース、適応する目標、漏れのアラート--効く瞬間に。翌朝ではなく。',
  },
  ko: {
    eyebrow: '실시간 운영',
    statement: '아직 바꿀 수 있을 *때* 근무를 보세요.',
    lede: '실시간 페이싱, 적응형 목표, 누수 알림 - 다음 날 아침이 아니라, 바로 그 순간에.',
  },
  id: {
    eyebrow: 'OPERASI REAL-TIME',
    statement: 'Lihat shift *selagi* Anda masih bisa mengubahnya.',
    lede: 'Pacing langsung, target adaptif, dan peringatan kebocoran - pada saat yang menentukan, bukan keesokan paginya.',
  },
  vi: {
    eyebrow: 'VẬN HÀNH THỜI GIAN THỰC',
    statement: 'Nhìn thấy ca làm *khi* bạn vẫn còn xoay chuyển được.',
    lede: 'Nhịp độ trực tiếp, mục tiêu thích ứng và cảnh báo thất thoát - ngay lúc chúng quan trọng, không phải sáng hôm sau.',
  },
  ro: {
    eyebrow: 'OPERAȚIUNI ÎN TIMP REAL',
    statement: 'Vezi tura *cât* timp încă o poți schimba.',
    lede: 'Ritm în direct, ținte adaptive și alerte de pierderi - în clipa în care contează, nu a doua zi dimineața.',
  },
  sv: {
    eyebrow: 'DRIFT I REALTID',
    statement: 'Se passet *medan* du fortfarande kan ändra det.',
    lede: 'Tempo i realtid, adaptiva mål och läckagelarm - i stunden då de spelar roll, inte morgonen efter.',
  },
  bn: {
    eyebrow: 'রিয়েল-টাইম অপারেশন',
    statement: 'শিফট দেখুন *তখনই*, যখন আপনি তা এখনও বদলাতে পারেন।',
    lede: 'লাইভ পেসিং, অ্যাডাপটিভ টার্গেট আর লিকেজ সতর্কতা - ঠিক যে মুহূর্তে দরকার, পরের সকালে নয়।',
  },
  th: {
    eyebrow: 'ปฏิบัติการเรียลไทม์',
    statement: 'เห็นกะการทำงาน*ตอนที่*คุณยังเปลี่ยนมันได้',
    lede: 'จังหวะแบบสด เป้าหมายที่ปรับตัวได้ และการแจ้งเตือนการรั่วไหล - ในวินาทีที่สำคัญ ไม่ใช่เช้าวันรุ่งขึ้น',
  },
  ms: {
    eyebrow: 'OPERASI MASA NYATA',
    statement: 'Lihat syif *sementara* anda masih boleh mengubahnya.',
    lede: 'Rentak langsung, sasaran mudah suai, dan amaran kebocoran - pada saat ia penting, bukan keesokan pagi.',
  },
};
