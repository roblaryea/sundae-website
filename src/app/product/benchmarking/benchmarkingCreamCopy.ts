/**
 * Copy for the warm "cream relief" editorial band on the Benchmarking marketing page.
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
 * Glossary discipline: "30+ metrics" keeps the numeral. Punctuation: normal hyphen
 * "-" only - no em dashes, en dashes, ellipsis characters, or zero-width characters.
 * Arabic (ar) and Urdu (ur) are RTL; the copy is written natively and the layout
 * handles direction.
 */

export interface BenchmarkingCreamCopy {
  eyebrow: string;
  /** Big editorial belief. The emphasized phrase is wrapped in `*...*`. */
  statement: string;
  lede: string;
}

export const benchmarkingCreamCopy: Record<string, BenchmarkingCreamCopy> = {
  en: {
    eyebrow: 'KNOW WHERE YOU STAND',
    statement: 'Know where you stand - *against* the market, not a guess.',
    lede: 'Anonymous peer benchmarks across 30+ metrics, updated as the network grows.',
  },
  ar: {
    eyebrow: 'اعرف موقعك بدقة',
    statement: 'اعرف موقعك - *مقابل* السوق، لا مجرد تخمين.',
    lede: 'مقارنات نظراء مجهولة عبر أكثر من 30 مقياسًا، تتحدث مع نمو الشبكة.',
  },
  fr: {
    eyebrow: 'SACHEZ OU VOUS EN ETES',
    statement: 'Sachez ou vous en etes - *face* au marche, pas a une supposition.',
    lede: 'Benchmarks anonymes de pairs sur plus de 30 metriques, actualises avec la croissance du reseau.',
  },
  es: {
    eyebrow: 'SABE DONDE ESTAS',
    statement: 'Sabe donde estas - *frente* al mercado, no a una suposicion.',
    lede: 'Benchmarks anonimos de pares en mas de 30 metricas, actualizados a medida que crece la red.',
  },
  de: {
    eyebrow: 'WISSEN, WO SIE STEHEN',
    statement: 'Wissen Sie, wo Sie stehen - *gegen* den Markt, nicht gegen ein Bauchgefuhl.',
    lede: 'Anonyme Peer-Benchmarks uber 30+ Kennzahlen, aktualisiert mit dem Wachstum des Netzwerks.',
  },
  nl: {
    eyebrow: 'WEET WAAR JE STAAT',
    statement: 'Weet waar je staat - *tegenover* de markt, niet een gok.',
    lede: 'Anonieme peer-benchmarks over 30+ statistieken, bijgewerkt naarmate het netwerk groeit.',
  },
  pt: {
    eyebrow: 'SAIBA ONDE VOCE ESTA',
    statement: 'Saiba onde voce esta - *diante* do mercado, nao de um palpite.',
    lede: 'Benchmarks anonimos de pares em mais de 30 metricas, atualizados conforme a rede cresce.',
  },
  hi: {
    eyebrow: 'जानिए आप कहाँ खड़े हैं',
    statement: 'जानिए आप कहाँ खड़े हैं - *बाज़ार के सामने*, अंदाज़े से नहीं.',
    lede: '30+ मेट्रिक्स पर गुमनाम पीअर बेंचमार्क, नेटवर्क के बढ़ने के साथ अपडेट होते रहते हैं.',
  },
  ur: {
    eyebrow: 'جانیں آپ کہاں کھڑے ہیں',
    statement: 'جانیں آپ کہاں کھڑے ہیں - *مارکیٹ کے مقابل*، اندازے سے نہیں.',
    lede: '30+ میٹرکس پر گمنام پیئر بینچ مارک، نیٹ ورک کے بڑھنے کے ساتھ اپ ڈیٹ ہوتے رہتے ہیں.',
  },
  it: {
    eyebrow: 'SAPPI DOVE TI TROVI',
    statement: 'Sappi dove ti trovi - *rispetto* al mercato, non a un\'ipotesi.',
    lede: 'Benchmark anonimi tra pari su oltre 30 metriche, aggiornati man mano che la rete cresce.',
  },
  pl: {
    eyebrow: 'WIEDZ, GDZIE JESTES',
    statement: 'Wiedz, gdzie jestes - *wzgledem* rynku, nie domyslu.',
    lede: 'Anonimowe benchmarki branzowe na ponad 30 wskaznikach, aktualizowane wraz ze wzrostem sieci.',
  },
  tr: {
    eyebrow: 'NEREDE OLDUGUNU BIL',
    statement: 'Nerede oldugunu bil - tahmine degil, *piyasaya* gore.',
    lede: '30+ metrik genelinde anonim emsal kiyaslamalari, ag buyudukce guncellenir.',
  },
  'zh-Hans': {
    eyebrow: '看清自己的位置',
    statement: '看清自己的位置--*对标*市场，而非凭猜测。',
    lede: '覆盖 30+ 项指标的匿名同业对标，随网络扩大而更新。',
  },
  ja: {
    eyebrow: '自分の位置を知る',
    statement: '自分の立ち位置を知る--勘ではなく、*市場と*比べて。',
    lede: '30以上の指標にわたる匿名のピア比較。ネットワークの拡大とともに更新されます。',
  },
  ko: {
    eyebrow: '나의 위치를 알다',
    statement: '나의 위치를 알다 - 추측이 아니라, *시장과* 견주어.',
    lede: '30개 이상의 지표에 걸친 익명 동종 벤치마크, 네트워크가 커질수록 갱신됩니다.',
  },
  id: {
    eyebrow: 'KETAHUI POSISI ANDA',
    statement: 'Ketahui posisi Anda - *terhadap* pasar, bukan tebakan.',
    lede: 'Benchmark anonim antar-rekan di 30+ metrik, diperbarui seiring jaringan tumbuh.',
  },
  vi: {
    eyebrow: 'BIET MINH DANG O DAU',
    statement: 'Biet minh dang o dau - *so voi* thi truong, khong phai phong doan.',
    lede: 'Benchmark an danh giua cac don vi tren hon 30 chi so, cap nhat khi mang luoi lon len.',
  },
  ro: {
    eyebrow: 'AFLA UNDE TE SITUEZI',
    statement: 'Afla unde te situezi - *fata* de piata, nu fata de o presupunere.',
    lede: 'Benchmarkuri anonime intre colegi pe peste 30 de metrici, actualizate pe masura ce reteaua creste.',
  },
  sv: {
    eyebrow: 'VET VAR DU STAR',
    statement: 'Vet var du star - *mot* marknaden, inte en gissning.',
    lede: 'Anonyma jamforelser med likar over 30+ matvarden, uppdaterade nar natverket vaxer.',
  },
  bn: {
    eyebrow: 'জানুন আপনি কোথায়',
    statement: 'জানুন আপনি কোথায় - *বাজারের সাথে*, অনুমানে নয়.',
    lede: '30+ মেট্রিকজুড়ে বেনামি পিয়ার বেঞ্চমার্ক, নেটওয়ার্ক বাড়ার সাথে হালনাগাদ হয়.',
  },
  th: {
    eyebrow: 'รู้ว่าคุณอยู่ตรงไหน',
    statement: 'รู้ว่าคุณอยู่ตรงไหน - *เทียบกับ*ตลาด ไม่ใช่การเดา',
    lede: 'การเทียบเคียงกับเพื่อนร่วมวงการแบบไม่ระบุตัวตนกว่า 30 ตัวชี้วัด อัปเดตเมื่อเครือข่ายเติบโต',
  },
  ms: {
    eyebrow: 'TAHU DI MANA ANDA BERDIRI',
    statement: 'Tahu di mana anda berdiri - *berbanding* pasaran, bukan tekaan.',
    lede: 'Penanda aras rakan setara tanpa nama merentas 30+ metrik, dikemas kini apabila rangkaian berkembang.',
  },
};
