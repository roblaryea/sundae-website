/**
 * Copy for the warm "cream relief" editorial band on the About page.
 *
 * Hand-authored native transcreation per locale - NOT literal word-for-word - so
 * each line reads the way an operator in that market would actually say it. Mirrors
 * the self-contained insightsCreamCopy.ts pattern: a locale-keyed map resolved at
 * render with an English fallback, kept out of the large per-locale i18n.ts trees.
 *
 * EMPHASIS MARKER: every `statement` carries exactly one `*...*` span around the
 * contrast phrase (the "not only" in the English source). The renderer splits on
 * `*` and italicizes the wrapped phrase. Each locale MUST keep exactly one `*...*`
 * pair.
 *
 * Glossary discipline: the product name "Sundae" stays untranslated everywhere.
 *
 * Punctuation: normal hyphen "-" only - no em dashes, en dashes, ellipsis
 * characters, or zero-width characters. Arabic (ar) and Urdu (ur) are RTL; the
 * copy is written natively and the layout handles direction.
 */

export const aboutCreamCopy: Record<string, { eyebrow: string; statement: string; lede: string }> = {
  en: {
    eyebrow: 'WHY WE BUILT SUNDAE',
    statement: 'Restaurants deserve decisions, *not only* dashboards.',
    lede: 'We turn the data you already generate into the next right move - for every role.',
  },
  ar: {
    eyebrow: 'لماذا بنينا Sundae',
    statement: 'المطاعم تستحق قرارات، *لا مجرد* لوحات معلومات.',
    lede: 'نحوّل البيانات التي تنتجها أصلاً إلى الخطوة الصحيحة التالية - لكل دور.',
  },
  fr: {
    eyebrow: 'POURQUOI NOUS AVONS CRÉÉ SUNDAE',
    statement: 'Les restaurants méritent des décisions, *pas seulement* des tableaux de bord.',
    lede: "Nous transformons les données que vous générez déjà en la prochaine bonne décision - pour chaque rôle.",
  },
  es: {
    eyebrow: 'POR QUÉ CREAMOS SUNDAE',
    statement: 'Los restaurantes merecen decisiones, *no solo* paneles.',
    lede: 'Convertimos los datos que ya generas en el próximo paso correcto - para cada rol.',
  },
  de: {
    eyebrow: 'WARUM WIR SUNDAE GEBAUT HABEN',
    statement: 'Restaurants verdienen Entscheidungen, *nicht nur* Dashboards.',
    lede: 'Wir machen aus den Daten, die ohnehin entstehen, den nächsten richtigen Schritt - für jede Rolle.',
  },
  nl: {
    eyebrow: 'WAAROM WE SUNDAE BOUWDEN',
    statement: 'Restaurants verdienen beslissingen, *niet alleen* dashboards.',
    lede: 'We maken van de data die je toch al genereert de volgende juiste stap - voor elke rol.',
  },
  pt: {
    eyebrow: 'POR QUE CRIAMOS A SUNDAE',
    statement: 'Restaurantes merecem decisões, *não só* painéis.',
    lede: 'Transformamos os dados que você já gera no próximo passo certo - para cada função.',
  },
  hi: {
    eyebrow: 'हमने Sundae क्यों बनाया',
    statement: 'रेस्तराँ सिर्फ डैशबोर्ड नहीं, *फैसले* के हकदार हैं।',
    lede: 'जो डेटा आप पहले से बना रहे हैं, उसे हम हर भूमिका के लिए अगले सही कदम में बदल देते हैं।',
  },
  ur: {
    eyebrow: 'ہم نے Sundae کیوں بنایا',
    statement: 'ریستوران صرف ڈیش بورڈ نہیں، *فیصلوں* کے حق دار ہیں۔',
    lede: 'جو ڈیٹا آپ پہلے سے بنا رہے ہیں، اسے ہم ہر کردار کے لیے اگلے درست قدم میں بدل دیتے ہیں۔',
  },
  it: {
    eyebrow: 'PERCHÉ ABBIAMO CREATO SUNDAE',
    statement: 'I ristoranti meritano decisioni, *non solo* cruscotti.',
    lede: 'Trasformiamo i dati che già generi nella prossima mossa giusta - per ogni ruolo.',
  },
  pl: {
    eyebrow: 'DLACZEGO STWORZYLIŚMY SUNDAE',
    statement: 'Restauracje zasługują na decyzje, a *nie tylko* pulpity.',
    lede: 'Dane, które już generujesz, zamieniamy w kolejny właściwy krok - dla każdej roli.',
  },
  tr: {
    eyebrow: 'SUNDAE\'Yİ NEDEN KURDUK',
    statement: 'Restoranlar yalnızca gösterge panelleri değil, *karar* hak ediyor.',
    lede: 'Zaten ürettiğiniz veriyi her rol için bir sonraki doğru adıma dönüştürüyoruz.',
  },
  'zh-Hans': {
    eyebrow: '我们为何打造 Sundae',
    statement: '餐厅需要的是决策，*不只是*仪表盘。',
    lede: '我们把你本就在产生的数据，化为每个岗位的下一步正确行动。',
  },
  ja: {
    eyebrow: 'なぜ Sundae をつくったのか',
    statement: 'レストランに必要なのはダッシュボードだけでなく、*決断*だ。',
    lede: 'すでに生まれているデータを、あらゆる役割にとっての次の正しい一手に変えます。',
  },
  ko: {
    eyebrow: '우리가 Sundae를 만든 이유',
    statement: '레스토랑에 필요한 건 대시보드*만이 아니라* 결정입니다.',
    lede: '이미 만들어지는 데이터를 모든 역할을 위한 다음 올바른 행동으로 바꿉니다.',
  },
  id: {
    eyebrow: 'MENGAPA KAMI MEMBANGUN SUNDAE',
    statement: 'Restoran layak mendapat keputusan, *bukan sekadar* dasbor.',
    lede: 'Kami mengubah data yang sudah Anda hasilkan menjadi langkah benar berikutnya - untuk setiap peran.',
  },
  vi: {
    eyebrow: 'VÌ SAO CHÚNG TÔI TẠO RA SUNDAE',
    statement: 'Nhà hàng xứng đáng có quyết định, *chứ không chỉ* là bảng số liệu.',
    lede: 'Chúng tôi biến dữ liệu bạn vốn đã tạo ra thành bước đi đúng tiếp theo - cho mọi vai trò.',
  },
  ro: {
    eyebrow: 'DE CE AM CONSTRUIT SUNDAE',
    statement: 'Restaurantele merită decizii, *nu doar* panouri.',
    lede: 'Transformăm datele pe care deja le generezi în următoarea mișcare corectă - pentru fiecare rol.',
  },
  sv: {
    eyebrow: 'VARFÖR VI BYGGDE SUNDAE',
    statement: 'Restauranger förtjänar beslut, *inte bara* instrumentpaneler.',
    lede: 'Vi gör datan du redan skapar till nästa rätta steg - för varje roll.',
  },
  bn: {
    eyebrow: 'আমরা কেন Sundae তৈরি করেছি',
    statement: 'রেস্তোরাঁর প্রাপ্য সিদ্ধান্ত, শুধু ড্যাশবোর্ড *নয়*।',
    lede: 'আপনি যে ডেটা এমনিতেই তৈরি করছেন, তাকে আমরা প্রতিটি ভূমিকার জন্য পরবর্তী সঠিক পদক্ষেপে রূপ দিই।',
  },
  th: {
    eyebrow: 'ทำไมเราจึงสร้าง Sundae',
    statement: 'ร้านอาหารสมควรได้การตัดสินใจ *ไม่ใช่แค่* แดชบอร์ด',
    lede: 'เราเปลี่ยนข้อมูลที่คุณสร้างอยู่แล้วให้เป็นก้าวต่อไปที่ถูกต้อง - สำหรับทุกบทบาท',
  },
  ms: {
    eyebrow: 'MENGAPA KAMI MEMBINA SUNDAE',
    statement: 'Restoran berhak mendapat keputusan, *bukan sekadar* papan pemuka.',
    lede: 'Kami mengubah data yang sudah anda hasilkan menjadi langkah betul seterusnya - untuk setiap peranan.',
  },
};
