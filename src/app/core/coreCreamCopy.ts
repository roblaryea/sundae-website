/**
 * Copy for the warm "cream relief" editorial band on the Core marketing page.
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
 * Glossary discipline: product names (Sundae, Core, Pulse) stay untranslated in
 * every locale.
 *
 * Punctuation: normal hyphen "-" only - no em dashes, en dashes, ellipsis
 * characters, or zero-width characters. Arabic (ar) and Urdu (ur) are RTL; the
 * copy is written natively and the layout handles direction.
 */

export interface CoreCreamCopy {
  eyebrow: string;
  /** Big editorial belief. The emphasized phrase is wrapped in `*...*`. */
  statement: string;
  lede: string;
}

export const coreCreamCopy: Record<string, CoreCreamCopy> = {
  en: {
    eyebrow: 'THE COMMAND CENTER',
    statement: 'One surface for the *whole* business.',
    lede: "Pulse, benchmarks, analytics, and AI - the operator's daily home.",
  },
  ar: {
    eyebrow: 'مركز القيادة',
    statement: 'سطح واحد لإدارة *العمل بأكمله*.',
    lede: 'Pulse والمقارنات المعيارية والتحليلات والذكاء الاصطناعي - مقرّ المشغّل اليومي.',
  },
  fr: {
    eyebrow: 'LE POSTE DE PILOTAGE',
    statement: 'Une seule surface pour *toute* votre activite.',
    lede: "Pulse, benchmarks, analytics et IA - le quotidien de l'exploitant en un seul endroit.",
  },
  es: {
    eyebrow: 'EL CENTRO DE MANDO',
    statement: 'Una sola pantalla para *todo* el negocio.',
    lede: 'Pulse, benchmarks, analitica e IA - la base diaria del operador.',
  },
  de: {
    eyebrow: 'DIE KOMMANDOZENTRALE',
    statement: 'Eine Oberflache fur das *ganze* Geschaft.',
    lede: 'Pulse, Benchmarks, Analytik und KI - die tagliche Basis des Betreibers.',
  },
  nl: {
    eyebrow: 'HET COMMANDOCENTRUM',
    statement: 'Een scherm voor de *hele* zaak.',
    lede: 'Pulse, benchmarks, analytics en AI - de dagelijkse basis van de operator.',
  },
  pt: {
    eyebrow: 'O CENTRO DE COMANDO',
    statement: 'Uma so tela para o negocio *inteiro*.',
    lede: 'Pulse, benchmarks, analise e IA - a base diaria do operador.',
  },
  hi: {
    eyebrow: 'कमांड सेंटर',
    statement: '*पूरे* कारोबार के लिए एक ही जगह.',
    lede: 'Pulse, बेंचमार्क, एनालिटिक्स और AI - ऑपरेटर का रोज़ का ठिकाना.',
  },
  ur: {
    eyebrow: 'کمانڈ سینٹر',
    statement: '*پورے* کاروبار کے لیے ایک ہی جگہ.',
    lede: 'Pulse، بینچ مارکس، اینالیٹکس اور AI - آپریٹر کا روزمرہ ٹھکانہ.',
  },
  it: {
    eyebrow: 'IL CENTRO DI COMANDO',
    statement: 'Una sola schermata per *tutta* l\'attivita.',
    lede: "Pulse, benchmark, analytics e IA - la base quotidiana dell'operatore.",
  },
  pl: {
    eyebrow: 'CENTRUM DOWODZENIA',
    statement: 'Jeden ekran dla *calego* biznesu.',
    lede: 'Pulse, benchmarki, analityka i AI - codzienna baza operatora.',
  },
  tr: {
    eyebrow: 'KOMUTA MERKEZI',
    statement: '*Tum* isletme icin tek bir ekran.',
    lede: 'Pulse, kiyaslamalar, analitik ve AI - operatorun gunluk us noktasi.',
  },
  'zh-Hans': {
    eyebrow: '指挥中心',
    statement: '*整个*生意，一个界面尽收。',
    lede: 'Pulse、对标、分析与 AI--运营者每天的起点。',
  },
  ja: {
    eyebrow: 'コマンドセンター',
    statement: '*事業のすべて*を、一つの画面で。',
    lede: 'Pulse、ベンチマーク、分析、AI--運営者が毎日帰ってくる場所。',
  },
  ko: {
    eyebrow: '커맨드 센터',
    statement: '*비즈니스 전체*를 한 화면에서.',
    lede: 'Pulse, 벤치마크, 분석, AI - 운영자가 매일 머무는 자리.',
  },
  id: {
    eyebrow: 'PUSAT KENDALI',
    statement: 'Satu layar untuk *seluruh* bisnis.',
    lede: 'Pulse, benchmark, analitik, dan AI - markas harian operator.',
  },
  vi: {
    eyebrow: 'TRUNG TAM DIEU HANH',
    statement: 'Mot man hinh cho *toan bo* hoat dong kinh doanh.',
    lede: 'Pulse, benchmark, phan tich va AI - noi nguoi van hanh bat dau moi ngay.',
  },
  ro: {
    eyebrow: 'CENTRUL DE COMANDA',
    statement: 'O singura interfata pentru *intreaga* afacere.',
    lede: 'Pulse, benchmarkuri, analiza si AI - baza zilnica a operatorului.',
  },
  sv: {
    eyebrow: 'KOMMANDOCENTRALEN',
    statement: 'En yta for *hela* verksamheten.',
    lede: 'Pulse, benchmarks, analys och AI - operatorens dagliga bas.',
  },
  bn: {
    eyebrow: 'কমান্ড সেন্টার',
    statement: '*গোটা* ব্যবসার জন্য একটিই পর্দা.',
    lede: 'Pulse, বেঞ্চমার্ক, অ্যানালিটিক্স আর AI - অপারেটরের প্রতিদিনের ঘাঁটি.',
  },
  th: {
    eyebrow: 'ศูนย์บัญชาการ',
    statement: 'หน้าจอเดียวสำหรับ*ทั้งธุรกิจ*',
    lede: 'Pulse เบนช์มาร์ก การวิเคราะห์ และ AI - ฐานประจำวันของผู้ดำเนินงาน',
  },
  ms: {
    eyebrow: 'PUSAT KAWALAN',
    statement: 'Satu skrin untuk *seluruh* perniagaan.',
    lede: 'Pulse, penanda aras, analitik dan AI - pangkalan harian operator.',
  },
};
