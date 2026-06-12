/**
 * Copy for the warm "cream relief" editorial band on the Sundae Intelligence page.
 *
 * Hand-authored native transcreation per locale - NOT literal word-for-word - so
 * each line reads the way an operator in that market would actually say it. Mirrors
 * the self-contained insightsCreamCopy.ts pattern: a locale-keyed map resolved at
 * render with an English fallback, kept out of the large per-locale i18n.ts trees.
 *
 * EMPHASIS MARKER: every `statement` carries exactly one `*...*` span around the
 * "decide" verb (the emphasized word in the English source). The renderer splits on
 * `*` and italicizes the wrapped phrase. Each locale MUST keep exactly one `*...*`
 * pair around the equivalent emphasized phrase.
 *
 * Glossary discipline: the product/channel names "Slack" and "Teams" stay
 * untranslated everywhere.
 *
 * Punctuation: normal hyphen "-" only - no em dashes, en dashes, ellipsis
 * characters, or zero-width characters. Arabic (ar) and Urdu (ur) are RTL; the
 * copy is written natively and the layout handles direction.
 */

export const intelligenceCreamCopy: Record<string, { eyebrow: string; statement: string; lede: string }> = {
  en: {
    eyebrow: 'CONVERSATIONAL AI',
    statement: 'Ask in plain English. *Decide* in seconds.',
    lede: 'Your data, answered on web, Slack, or Teams - grounded in your real numbers.',
  },
  ar: {
    eyebrow: 'ذكاء اصطناعي حواري',
    statement: 'اسأل بلغة بسيطة. و*قرّر* خلال ثوانٍ.',
    lede: 'بياناتك، تُجاب على الويب أو Slack أو Teams - مستندة إلى أرقامك الحقيقية.',
  },
  fr: {
    eyebrow: 'IA CONVERSATIONNELLE',
    statement: 'Demandez en langage simple. *Décidez* en quelques secondes.',
    lede: 'Vos données, répondues sur le web, Slack ou Teams - ancrées dans vos vrais chiffres.',
  },
  es: {
    eyebrow: 'IA CONVERSACIONAL',
    statement: 'Pregunta en lenguaje natural. *Decide* en segundos.',
    lede: 'Tus datos, respondidos en web, Slack o Teams - basados en tus cifras reales.',
  },
  de: {
    eyebrow: 'KONVERSATIONELLE KI',
    statement: 'Frag in klarer Sprache. *Entscheide* in Sekunden.',
    lede: 'Deine Daten, beantwortet im Web, Slack oder Teams - belegt mit deinen echten Zahlen.',
  },
  nl: {
    eyebrow: 'CONVERSATIONELE AI',
    statement: 'Vraag in gewone taal. *Beslis* in seconden.',
    lede: 'Je data, beantwoord op web, Slack of Teams - gebaseerd op je echte cijfers.',
  },
  pt: {
    eyebrow: 'IA CONVERSACIONAL',
    statement: 'Pergunte em linguagem natural. *Decida* em segundos.',
    lede: 'Seus dados, respondidos na web, no Slack ou no Teams - apoiados nos seus números reais.',
  },
  hi: {
    eyebrow: 'संवादी AI',
    statement: 'आसान भाषा में पूछें। सेकंडों में *फैसला* करें।',
    lede: 'आपका डेटा, वेब, Slack या Teams पर जवाब - आपके असली आँकड़ों पर आधारित।',
  },
  ur: {
    eyebrow: 'گفتگو پر مبنی AI',
    statement: 'سادہ زبان میں پوچھیں۔ سیکنڈوں میں *فیصلہ* کریں۔',
    lede: 'آپ کا ڈیٹا، ویب، Slack یا Teams پر جواب - آپ کے اصل اعداد و شمار پر مبنی۔',
  },
  it: {
    eyebrow: 'IA CONVERSAZIONALE',
    statement: 'Chiedi in linguaggio naturale. *Decidi* in pochi secondi.',
    lede: 'I tuoi dati, con risposte su web, Slack o Teams - basate sui tuoi numeri reali.',
  },
  pl: {
    eyebrow: 'KONWERSACYJNA SI',
    statement: 'Pytaj zwykłym językiem. *Decyduj* w kilka sekund.',
    lede: 'Twoje dane, z odpowiedziami w sieci, na Slacku lub Teams - oparte na realnych liczbach.',
  },
  tr: {
    eyebrow: 'SOHBET TABANLI YAPAY ZEKÂ',
    statement: 'Sade bir dille sor. Saniyeler içinde *karar ver*.',
    lede: 'Verileriniz, web, Slack veya Teams üzerinde yanıtlanır - gerçek rakamlarınıza dayalı.',
  },
  'zh-Hans': {
    eyebrow: '对话式 AI',
    statement: '用日常语言提问，几秒内*做出决定*。',
    lede: '你的数据，在网页、Slack 或 Teams 上得到回答，全部基于你的真实数字。',
  },
  ja: {
    eyebrow: '対話型 AI',
    statement: '普通の言葉で尋ね、数秒で*決断する*。',
    lede: 'あなたのデータに、ウェブ・Slack・Teams で回答。すべて実際の数字に基づきます。',
  },
  ko: {
    eyebrow: '대화형 AI',
    statement: '평범한 말로 묻고, 몇 초 만에 *결정하세요*.',
    lede: '당신의 데이터를 웹, Slack, Teams에서 답해드립니다 - 실제 숫자에 근거해서.',
  },
  id: {
    eyebrow: 'AI PERCAKAPAN',
    statement: 'Tanya dengan bahasa biasa. *Putuskan* dalam hitungan detik.',
    lede: 'Data Anda, dijawab di web, Slack, atau Teams - berdasar angka nyata Anda.',
  },
  vi: {
    eyebrow: 'AI HỘI THOẠI',
    statement: 'Hỏi bằng ngôn ngữ thường ngày. *Quyết định* trong vài giây.',
    lede: 'Dữ liệu của bạn, được trả lời trên web, Slack hay Teams - dựa trên số liệu thật của bạn.',
  },
  ro: {
    eyebrow: 'IA CONVERSAȚIONALĂ',
    statement: 'Întreabă în limbaj simplu. *Decide* în câteva secunde.',
    lede: 'Datele tale, cu răspunsuri pe web, Slack sau Teams - bazate pe cifrele tale reale.',
  },
  sv: {
    eyebrow: 'KONVERSATIONS-AI',
    statement: 'Fråga på vanligt språk. *Besluta* på sekunder.',
    lede: 'Dina data, besvarade på webben, Slack eller Teams - grundade i dina riktiga siffror.',
  },
  bn: {
    eyebrow: 'কথোপকথনমূলক AI',
    statement: 'সহজ ভাষায় জিজ্ঞাসা করুন। সেকেন্ডে *সিদ্ধান্ত* নিন।',
    lede: 'আপনার ডেটা, ওয়েব, Slack বা Teams-এ উত্তর - আপনার প্রকৃত সংখ্যার ভিত্তিতে।',
  },
  th: {
    eyebrow: 'AI สนทนา',
    statement: 'ถามด้วยภาษาง่าย ๆ แล้ว*ตัดสินใจ*ในไม่กี่วินาที',
    lede: 'ข้อมูลของคุณ ตอบได้บนเว็บ Slack หรือ Teams - อิงจากตัวเลขจริงของคุณ',
  },
  ms: {
    eyebrow: 'AI PERBUALAN',
    statement: 'Tanya dalam bahasa biasa. *Putuskan* dalam beberapa saat.',
    lede: 'Data anda, dijawab di web, Slack atau Teams - berdasarkan angka sebenar anda.',
  },
};
