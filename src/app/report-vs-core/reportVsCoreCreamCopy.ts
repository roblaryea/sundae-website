/**
 * Copy for the warm "cream relief" editorial band on the Report vs Core page.
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
 * Glossary discipline: the product names "Report" and "Core" stay untranslated in
 * every locale. Punctuation: normal hyphen "-" only - no em dashes, en dashes,
 * ellipsis characters, or zero-width characters. Arabic (ar) and Urdu (ur) are RTL;
 * the copy is written natively and the layout handles direction.
 */

export interface ReportVsCoreCreamCopy {
  eyebrow: string;
  /** Big editorial belief. The emphasized phrase is wrapped in `*...*`. */
  statement: string;
  lede: string;
}

export const reportVsCoreCreamCopy: Record<string, ReportVsCoreCreamCopy> = {
  en: {
    eyebrow: 'REPORT VS CORE',
    statement: 'From reporting *to* deciding.',
    lede: 'Report shows you what happened. Core tells you what to do next.',
  },
  ar: {
    eyebrow: 'Report مقابل Core',
    statement: 'من التقارير *إلى* القرار.',
    lede: 'Report يريك ما حدث. وCore يخبرك بما يجب فعله تاليًا.',
  },
  fr: {
    eyebrow: 'REPORT VS CORE',
    statement: 'Du reporting *a* la decision.',
    lede: 'Report vous montre ce qui s\'est passe. Core vous dit quoi faire ensuite.',
  },
  es: {
    eyebrow: 'REPORT VS CORE',
    statement: 'Del reporte *a* la decision.',
    lede: 'Report te muestra que paso. Core te dice que hacer despues.',
  },
  de: {
    eyebrow: 'REPORT VS CORE',
    statement: 'Vom Berichten *zum* Entscheiden.',
    lede: 'Report zeigt, was passiert ist. Core sagt, was als Nachstes zu tun ist.',
  },
  nl: {
    eyebrow: 'REPORT VS CORE',
    statement: 'Van rapporteren *naar* beslissen.',
    lede: 'Report laat zien wat er gebeurd is. Core vertelt je wat je nu moet doen.',
  },
  pt: {
    eyebrow: 'REPORT VS CORE',
    statement: 'Do relatorio *a* decisao.',
    lede: 'Report mostra o que aconteceu. Core diz o que fazer a seguir.',
  },
  hi: {
    eyebrow: 'REPORT बनाम CORE',
    statement: 'रिपोर्टिंग *से* फैसले तक.',
    lede: 'Report बताता है क्या हुआ. Core बताता है अब क्या करना है.',
  },
  ur: {
    eyebrow: 'REPORT بمقابلہ CORE',
    statement: 'رپورٹنگ *سے* فیصلے تک.',
    lede: 'Report بتاتا ہے کیا ہوا. Core بتاتا ہے اب کیا کرنا ہے.',
  },
  it: {
    eyebrow: 'REPORT VS CORE',
    statement: 'Dal reporting *alla* decisione.',
    lede: 'Report ti mostra cosa e successo. Core ti dice cosa fare adesso.',
  },
  pl: {
    eyebrow: 'REPORT VS CORE',
    statement: 'Od raportowania *do* decyzji.',
    lede: 'Report pokazuje, co sie stalo. Core mowi, co zrobic dalej.',
  },
  tr: {
    eyebrow: 'REPORT VS CORE',
    statement: 'Raporlamadan *karara*.',
    lede: 'Report ne oldugunu gosterir. Core ise siradaki adimi soyler.',
  },
  'zh-Hans': {
    eyebrow: 'REPORT 对比 CORE',
    statement: '从报告*走向*决策。',
    lede: 'Report 告诉你发生了什么，Core 告诉你下一步该做什么。',
  },
  ja: {
    eyebrow: 'REPORT と CORE',
    statement: 'レポートから、*決断*へ。',
    lede: 'Report は何が起きたかを示す。Core は次に何をすべきかを示す。',
  },
  ko: {
    eyebrow: 'REPORT vs CORE',
    statement: '보고에서 *결정*으로.',
    lede: 'Report는 무슨 일이 있었는지 보여줍니다. Core는 다음에 무엇을 할지 알려줍니다.',
  },
  id: {
    eyebrow: 'REPORT VS CORE',
    statement: 'Dari pelaporan *ke* keputusan.',
    lede: 'Report menunjukkan apa yang terjadi. Core memberi tahu langkah berikutnya.',
  },
  vi: {
    eyebrow: 'REPORT VS CORE',
    statement: 'Tu bao cao *den* quyet dinh.',
    lede: 'Report cho ban thay dieu da xay ra. Core cho ban biet buoc tiep theo.',
  },
  ro: {
    eyebrow: 'REPORT VS CORE',
    statement: 'De la raportare *la* decizie.',
    lede: 'Report iti arata ce s-a intamplat. Core iti spune ce sa faci in continuare.',
  },
  sv: {
    eyebrow: 'REPORT VS CORE',
    statement: 'Fran rapportering *till* beslut.',
    lede: 'Report visar vad som hant. Core sager vad du ska gora harnast.',
  },
  bn: {
    eyebrow: 'REPORT বনাম CORE',
    statement: 'রিপোর্টিং *থেকে* সিদ্ধান্তে.',
    lede: 'Report দেখায় কী ঘটেছে. Core বলে এরপর কী করতে হবে.',
  },
  th: {
    eyebrow: 'REPORT เทียบกับ CORE',
    statement: 'จากการรายงาน *สู่* การตัดสินใจ',
    lede: 'Report บอกว่าเกิดอะไรขึ้น Core บอกว่าควรทำอะไรต่อ',
  },
  ms: {
    eyebrow: 'REPORT VS CORE',
    statement: 'Daripada pelaporan *kepada* keputusan.',
    lede: 'Report menunjukkan apa yang berlaku. Core memberitahu langkah seterusnya.',
  },
};
