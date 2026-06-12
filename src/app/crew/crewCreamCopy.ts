/**
 * Copy for the warm "cream relief" editorial band on the Crew marketing page.
 *
 * Hand-authored native transcreation per locale - NOT literal word-for-word - so
 * each line reads the way an operator in that market would actually say it. Mirrors
 * the self-contained insightsCreamCopy.ts pattern: a locale-keyed map resolved at
 * render with an English fallback, kept out of the large per-locale i18n.ts trees.
 *
 * EMPHASIS MARKER: every `statement` carries exactly one `*...*` span. The renderer
 * splits on `*` and italicizes the wrapped phrase. Each locale MUST keep exactly
 * one `*...*` pair around the equivalent emphasized phrase.
 *
 * Glossary discipline: product names (Sundae, Crew) stay untranslated in every
 * locale. The "people side" idiom is transcreated, not translated literally.
 *
 * Punctuation: normal hyphen "-" only - no em dashes, en dashes, ellipsis
 * characters, or zero-width characters. Arabic (ar) and Urdu (ur) are RTL; the
 * copy is written natively and the layout handles direction.
 */

export interface CrewCreamCopy {
  eyebrow: string;
  /** Big editorial belief. The emphasized phrase is wrapped in `*...*`. */
  statement: string;
  lede: string;
}

export const crewCreamCopy: Record<string, CrewCreamCopy> = {
  en: {
    eyebrow: 'THE PEOPLE SIDE',
    statement: 'Run the people side *without* the spreadsheet sprawl.',
    lede: 'Scheduling, time, payroll readiness, and HR - feeding the same intelligence.',
  },
  ar: {
    eyebrow: 'جانب الموظفين',
    statement: 'أدِر شؤون الموظفين *دون* فوضى الجداول.',
    lede: 'الجدولة والوقت وجاهزية الرواتب والموارد البشرية - تغذي الذكاء نفسه.',
  },
  fr: {
    eyebrow: 'LE COTE HUMAIN',
    statement: 'Pilotez vos equipes *sans* la jungle des tableurs.',
    lede: 'Planification, temps, preparation paie et RH - au service de la meme intelligence.',
  },
  es: {
    eyebrow: 'EL LADO HUMANO',
    statement: 'Gestiona a tu gente *sin* el caos de las hojas de calculo.',
    lede: 'Horarios, tiempo, preparacion de nomina y RR.HH. - alimentando la misma inteligencia.',
  },
  de: {
    eyebrow: 'DIE MENSCHLICHE SEITE',
    statement: 'Fuhren Sie Ihr Team *ohne* den Tabellen-Wildwuchs.',
    lede: 'Planung, Zeit, Lohnabrechnung und HR - alles speist dieselbe Intelligenz.',
  },
  nl: {
    eyebrow: 'DE MENSELIJKE KANT',
    statement: 'Stuur je mensen aan *zonder* de spreadsheetchaos.',
    lede: 'Roosters, tijd, salarisgereedheid en HR - voeden dezelfde intelligentie.',
  },
  pt: {
    eyebrow: 'O LADO HUMANO',
    statement: 'Gerencie a sua equipe *sem* a bagunca das planilhas.',
    lede: 'Escala, ponto, prontidao de folha e RH - alimentando a mesma inteligencia.',
  },
  hi: {
    eyebrow: 'लोगों का पहलू',
    statement: 'टीम संभालिए, *बिना* स्प्रेडशीट के झंझट के.',
    lede: 'शेड्यूलिंग, टाइम, पेरोल तैयारी और HR - सब एक ही इंटेलिजेंस को फीड करते हैं.',
  },
  ur: {
    eyebrow: 'لوگوں کا پہلو',
    statement: 'اپنی ٹیم چلائیں، *بغیر* اسپریڈ شیٹ کی الجھن کے.',
    lede: 'شیڈولنگ، ٹائم، پے رول کی تیاری اور HR - سب ایک ہی انٹیلیجنس کو فیڈ کرتے ہیں.',
  },
  it: {
    eyebrow: 'IL LATO UMANO',
    statement: 'Gestisci le persone *senza* il caos dei fogli di calcolo.',
    lede: 'Turni, presenze, paghe pronte e HR - alimentano la stessa intelligenza.',
  },
  pl: {
    eyebrow: 'STRONA LUDZKA',
    statement: 'Zarzadzaj zespolem *bez* gaszczu arkuszy.',
    lede: 'Grafiki, czas, gotowosc plac i HR - zasilaja te sama inteligencje.',
  },
  tr: {
    eyebrow: 'INSAN TARAFI',
    statement: 'Ekibinizi *tablolarin* karmasasi olmadan yonetin.',
    lede: 'Vardiya, mesai, bordro hazirligi ve IK - hepsi ayni zekayi besler.',
  },
  'zh-Hans': {
    eyebrow: '人的那一面',
    statement: '管好团队，*告别*表格的泥潭。',
    lede: '排班、考勤、薪资就绪与人力资源--全都汇入同一套智能。',
  },
  ja: {
    eyebrow: '人にまつわるすべて',
    statement: 'チーム運営を、*表計算の山*から解き放つ。',
    lede: 'シフト、勤怠、給与準備、人事--すべてが同じインテリジェンスへ。',
  },
  ko: {
    eyebrow: '사람의 영역',
    statement: '스프레드시트 *없이* 인력을 운영하세요.',
    lede: '근무 편성, 근태, 급여 준비, 인사 - 모두 같은 인텔리전스로 모입니다.',
  },
  id: {
    eyebrow: 'SISI MANUSIA',
    statement: 'Kelola tim *tanpa* tumpukan spreadsheet.',
    lede: 'Penjadwalan, absensi, kesiapan payroll, dan HR - menyuplai intelijen yang sama.',
  },
  vi: {
    eyebrow: 'PHIA CON NGUOI',
    statement: 'Quan ly nhan su *ma khong* roi vao mo bang tinh.',
    lede: 'Xep ca, cham cong, san sang bang luong va nhan su - cung nuoi mot tri tue.',
  },
  ro: {
    eyebrow: 'PARTEA UMANA',
    statement: 'Conduce-ti oamenii *fara* haosul foilor de calcul.',
    lede: 'Programare, pontaj, pregatire salarizare si HR - alimenteaza aceeasi inteligenta.',
  },
  sv: {
    eyebrow: 'DEN MANSKLIGA SIDAN',
    statement: 'Styr ditt folk *utan* kalkylarkskaoset.',
    lede: 'Schema, tid, loneberedskap och HR - matar samma intelligens.',
  },
  bn: {
    eyebrow: 'মানুষের দিকটা',
    statement: 'দলকে চালান, স্প্রেডশিটের ঝামেলা *ছাড়াই*.',
    lede: 'শিডিউলিং, টাইম, পেরোল প্রস্তুতি আর HR - সবই একই ইন্টেলিজেন্সে মেশে.',
  },
  th: {
    eyebrow: 'ด้านของคน',
    statement: 'บริหารทีมงาน *โดยไม่ต้อง*จมกับสเปรดชีต',
    lede: 'จัดกะ ลงเวลา ความพร้อมเงินเดือน และ HR - ป้อนเข้าสู่อินเทลลิเจนซ์เดียวกัน',
  },
  ms: {
    eyebrow: 'SISI MANUSIA',
    statement: 'Urus pasukan anda *tanpa* kekusutan hamparan.',
    lede: 'Penjadualan, masa, kesediaan gaji dan HR - menyuap perisikan yang sama.',
  },
};
