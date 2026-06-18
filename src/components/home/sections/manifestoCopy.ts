import type { WebsiteLocale } from '@/lib/i18n';

/**
 * Manifesto copy - the homepage "belief beat" that opens the page in the
 * USHG/category-leader register: a confident, copy-first statement of what
 * Sundae believes, before the product earns its place.
 *
 * Follows the SectionTrustStrip / editorialCopy localization pattern: a
 * locale-keyed map resolved at render with an English fallback, kept out of the
 * large per-locale i18n.ts trees so this self-contained editorial system
 * localizes without touching them (and never trips the qa:translation gate,
 * which validates only the `messages` tree).
 *
 * A single `*…*` span in `statement` renders in warm-coral italic (the same
 * emphasis-marker convention used by creamReliefCopy). Brand name "Sundae" and
 * "P&L" stay untranslated in every locale.
 *
 * Dash house-style (mirrors editorialCopy): Latin/Arabic/Indic/Thai scripts use
 * a spaced ASCII hyphen " - "; CJK (zh-Hans, ja) uses a double ASCII hyphen
 * "--" with no surrounding spaces. No em-dashes anywhere.
 */
export type ManifestoCopy = {
  eyebrow: string;
  /** One `*…*` span renders warm-coral italic. */
  statement: string;
  coda: string;
};

export const manifestoCopy: Record<WebsiteLocale, ManifestoCopy> = {
  en: {
    eyebrow: 'What we believe',
    statement:
      'The best decisions happen *while the shift is still alive.*',
    coda: 'Restaurants don’t fail in reports. They slip in moments - a section slows, labor drifts, covers fall behind, a table waits too long. Sundae exists to catch those moments while there’s still time to change the outcome.',
  },
  ar: {
    eyebrow: 'ما نؤمن به',
    statement: 'أفضل القرارات تُتَّخذ *والخدمة ما زالت قائمة.*',
    coda: 'المطاعم لا تفشل في التقارير. بل تتعثّر في اللحظات: قسم يتباطأ، عمالة تنحرف عن مسارها، طاولات تتأخر، وزبون ينتظر أكثر من اللازم. وُجِدت Sundae لتلتقط تلك اللحظات بينما لا يزال هناك وقت لتغيير النتيجة.',
  },
  fr: {
    eyebrow: 'Ce en quoi nous croyons',
    statement: 'Les meilleures décisions se prennent *pendant que le service est encore vivant.*',
    coda: "Les restaurants n'échouent pas dans les rapports. Ils dérapent dans les instants - une zone ralentit, le personnel se décale, les couverts prennent du retard, une table attend trop longtemps. Sundae existe pour saisir ces instants tant qu'il est encore temps de changer l'issue.",
  },
  es: {
    eyebrow: 'En lo que creemos',
    statement: 'Las mejores decisiones ocurren *mientras el turno sigue vivo.*',
    coda: 'Los restaurantes no fracasan en los informes. Se les escapa el control en los momentos: una zona se ralentiza, el personal se desajusta, los comensales se acumulan, una mesa espera demasiado. Sundae existe para atrapar esos momentos cuando todavía hay tiempo de cambiar el desenlace.',
  },
  de: {
    eyebrow: 'Woran wir glauben',
    statement: 'Die besten Entscheidungen fallen, *solange der Service noch läuft.*',
    coda: 'Restaurants scheitern nicht in Reports. Sie geraten in einzelnen Momenten ins Rutschen: eine Station wird langsamer, der Personaleinsatz verschiebt sich, die Gedecke geraten in Rückstand, ein Tisch wartet zu lange. Sundae ist da, um diese Momente zu erfassen, solange noch Zeit bleibt, den Ausgang zu ändern.',
  },
  nl: {
    eyebrow: 'Waar wij in geloven',
    statement: 'De beste beslissingen vallen *terwijl de service nog leeft.*',
    coda: 'Restaurants gaan niet onderuit in rapporten. Ze glippen weg in momenten: een sectie loopt vast, de personeelsinzet schuift, de couverts raken achterop, een tafel wacht te lang. Sundae bestaat om die momenten te grijpen terwijl er nog tijd is om de afloop te veranderen.',
  },
  pt: {
    eyebrow: 'No que acreditamos',
    statement: 'As melhores decisões acontecem *enquanto o turno ainda está vivo.*',
    coda: 'Os restaurantes não falham nos relatórios. Eles escorregam nos momentos: uma área desacelera, a equipa sai do ritmo, os cobertos atrasam, uma mesa espera tempo demais. A Sundae existe para apanhar esses momentos enquanto ainda há tempo de mudar o desfecho.',
  },
  hi: {
    eyebrow: 'हम क्या मानते हैं',
    statement: 'सबसे अच्छे फ़ैसले तभी होते हैं *जब शिफ़्ट अभी ज़िंदा हो.*',
    coda: 'रेस्तराँ रिपोर्ट में नहीं डूबते। वे पलों में फिसलते हैं: कोई सेक्शन धीमा पड़ता है, स्टाफ़ की तैनाती बिगड़ती है, मेहमान पिछड़ जाते हैं, कोई टेबल बहुत देर तक इंतज़ार करती है। Sundae इसी लिए है कि उन पलों को तब पकड़े जब नतीजा बदलने का समय अभी बाक़ी हो।',
  },
  ur: {
    eyebrow: 'ہم کس بات پر یقین رکھتے ہیں',
    statement: 'بہترین فیصلے تب ہوتے ہیں *جب شفٹ ابھی زندہ ہو۔*',
    coda: 'ریستوران رپورٹوں میں ناکام نہیں ہوتے۔ وہ لمحوں میں پھسلتے ہیں: کوئی سیکشن سست پڑ جاتا ہے، عملہ بے ترتیب ہو جاتا ہے، مہمان پیچھے رہ جاتے ہیں، کوئی میز بہت دیر انتظار کرتی ہے۔ Sundae اسی لیے ہے کہ ان لمحوں کو تب تھام لے جب نتیجہ بدلنے کا وقت ابھی باقی ہو۔',
  },
  it: {
    eyebrow: 'In cosa crediamo',
    statement: 'Le decisioni migliori si prendono *mentre il servizio è ancora vivo.*',
    coda: "I ristoranti non falliscono nei report. Scivolano negli attimi - una zona rallenta, il personale perde il ritmo, i coperti restano indietro, un tavolo aspetta troppo a lungo. Sundae esiste per cogliere quegli attimi finché c'è ancora tempo di cambiare l'esito.",
  },
  pl: {
    eyebrow: 'W co wierzymy',
    statement: 'Najlepsze decyzje zapadają *kiedy zmiana wciąż trwa.*',
    coda: 'Restauracje nie upadają w raportach. Wymykają się w pojedynczych chwilach: sektor zwalnia, obsada się rozjeżdża, kuwerty zostają w tyle, stolik czeka za długo. Sundae istnieje po to, by uchwycić te chwile, póki jest jeszcze czas, by zmienić wynik.',
  },
  tr: {
    eyebrow: 'Neye inanıyoruz',
    statement: 'En iyi kararlar *servis hâlâ canlıyken* alınır.',
    coda: 'Restoranlar raporlarda batmaz. Anların içinde kayıp gider: bir bölge yavaşlar, ekip ritmini kaçırır, masalar geride kalır, bir masa fazlaca bekletilir. Sundae, sonucu değiştirmeye hâlâ vakit varken o anları yakalamak için var.',
  },
  'zh-Hans': {
    eyebrow: '我们的信念',
    statement: '最好的决策，发生在 *这一班还活着的时候。*',
    coda: '餐厅不是败在报表里，而是在一个个瞬间里悄悄滑落：一片区域慢了下来，人手开始错位，客流被甩在后面，一桌客人等得太久。Sundae 的存在，就是为了在还来得及改变结局的时候，抓住这些瞬间。',
  },
  ja: {
    eyebrow: '私たちが信じること',
    statement: '最良の判断は *シフトがまだ生きているうちに* 下される。',
    coda: '店は報告書の中で潰れるのではない。一瞬一瞬の中で取りこぼしていく：あるセクションが滞り、人の配置がずれ、客の流れが追いつかず、ひとつのテーブルが待たされすぎる。Sundae は、まだ結果を変えられるうちにその一瞬をつかむために存在する。',
  },
  ko: {
    eyebrow: '우리가 믿는 것',
    statement: '최고의 결정은 *근무가 아직 살아 있을 때* 내려진다.',
    coda: '식당은 보고서에서 무너지지 않는다. 순간순간 미끄러질 뿐이다: 한 구역이 느려지고, 인력 배치가 어긋나고, 손님이 밀리고, 한 테이블이 너무 오래 기다린다. Sundae는 결과를 바꿀 시간이 아직 남아 있을 때 그 순간을 붙잡기 위해 존재한다.',
  },
  id: {
    eyebrow: 'Yang kami yakini',
    statement: 'Keputusan terbaik diambil *saat shift masih hidup.*',
    coda: 'Restoran tidak gagal di laporan. Mereka tergelincir di momen-momen kecil: satu area melambat, penempatan staf melenceng, tamu menumpuk, satu meja menunggu terlalu lama. Sundae hadir untuk menangkap momen-momen itu selagi masih ada waktu mengubah hasilnya.',
  },
  vi: {
    eyebrow: 'Điều chúng tôi tin',
    statement: 'Những quyết định tốt nhất được đưa ra *khi ca làm vẫn còn đang sống.*',
    coda: 'Nhà hàng không sụp đổ trong báo cáo. Họ tuột dốc trong từng khoảnh khắc: một khu chậm lại, nhân sự lệch nhịp, khách dồn ứ, một bàn chờ quá lâu. Sundae tồn tại để bắt lấy những khoảnh khắc đó khi vẫn còn kịp thay đổi kết cục.',
  },
  ro: {
    eyebrow: 'În ce credem',
    statement: 'Cele mai bune decizii se iau *cât timp tura este încă vie.*',
    coda: 'Restaurantele nu eșuează în rapoarte. Alunecă în momente: o zonă încetinește, echipa se abate de la ritm, comenzile rămân în urmă, o masă așteaptă prea mult. Sundae există ca să prindă aceste momente cât mai e timp să schimbi deznodământul.',
  },
  sv: {
    eyebrow: 'Det vi tror på',
    statement: 'De bästa besluten fattas *medan passet fortfarande lever.*',
    coda: 'Restauranger faller inte i rapporterna. De glider undan i ögonblicken: en sektion saktar ner, bemanningen glider iväg, gästerna hopar sig, ett bord får vänta för länge. Sundae finns för att fånga de ögonblicken medan det ännu finns tid att ändra utgången.',
  },
  bn: {
    eyebrow: 'আমরা যা বিশ্বাস করি',
    statement: 'সেরা সিদ্ধান্তগুলো হয় *যখন শিফট তখনও জীবন্ত.*',
    coda: 'রেস্তোরাঁ রিপোর্টে ব্যর্থ হয় না। তারা ফসকে যায় মুহূর্তে: কোনো সেকশন ধীর হয়ে পড়ে, কর্মী বিন্যাস এলোমেলো হয়, অতিথিরা পিছিয়ে পড়ে, কোনো টেবিল বড্ড বেশি অপেক্ষা করে। Sundae আছে সেই মুহূর্তগুলো ধরতে, যখন ফলাফল বদলানোর সময় এখনও বাকি।',
  },
  th: {
    eyebrow: 'สิ่งที่เราเชื่อ',
    statement: 'การตัดสินใจที่ดีที่สุดเกิดขึ้น *ขณะที่กะยังมีชีวิตอยู่*',
    coda: 'ร้านอาหารไม่ได้ล้มในรายงาน แต่พลาดไปในแต่ละช่วงเวลา: โซนหนึ่งเริ่มช้า การจัดคนเริ่มเพี้ยน ลูกค้าเริ่มตกค้าง โต๊ะหนึ่งรอนานเกินไป Sundae มีอยู่เพื่อคว้าช่วงเวลาเหล่านั้นไว้ ในขณะที่ยังมีเวลาพอจะเปลี่ยนผลลัพธ์',
  },
  ms: {
    eyebrow: 'Apa yang kami percaya',
    statement: 'Keputusan terbaik berlaku *semasa syif masih hidup.*',
    coda: 'Restoran tidak gagal dalam laporan. Ia tergelincir dalam saat-saat kecil: satu kawasan perlahan, tenaga kerja terpesong, tetamu tertangguh, satu meja menunggu terlalu lama. Sundae wujud untuk menangkap saat-saat itu selagi masih ada masa untuk mengubah keputusannya.',
  },
};

/** Live "moments" + bridge for the manifesto cinematic redesign (en fallback). */
export type ManifestoMoments = { moments: [string, string, string]; bridge: string };
export const manifestoMoments: Partial<Record<WebsiteLocale, ManifestoMoments>> = {
  en: { moments: ['Covers falling behind', 'Labor crossing target', 'Table wait risk'], bridge: 'Then the signal arrives.' },
  ar: { moments: ['العملاء يتأخرون', 'تكلفة العمالة تتجاوز الحد', 'خطر انتظار الطاولة'], bridge: 'ثم تصل الإشارة.' },
  fr: { moments: ['Couverts en retard', 'Main-d\'œuvre hors cible', 'Risque d\'attente en salle'], bridge: 'Puis le signal arrive.' },
  es: { moments: ['Cubiertos atrasados', 'Personal sobre objetivo', 'Riesgo de espera en mesa'], bridge: 'Entonces llega la señal.' },
  de: { moments: ['Gedecke geraten in Rückstand', 'Personalkosten über Ziel', 'Risiko langer Tischwartezeit'], bridge: 'Dann kommt das Signal.' },
  nl: { moments: ['Couverts lopen achter', 'Loonkosten boven doel', 'Risico op wachttijd'], bridge: 'Dan komt het signaal.' },
  pt: { moments: ['Coberturas atrasadas', 'Mão de obra acima da meta', 'Risco de espera na mesa'], bridge: 'Então o sinal chega.' },
  it: { moments: ['Coperti in ritardo', 'Costo lavoro oltre soglia', 'Rischio attesa al tavolo'], bridge: 'Poi arriva il segnale.' },
  pl: { moments: ['Nakrycia w opóźnieniu', 'Koszt pracy ponad cel', 'Ryzyko czekania przy stoliku'], bridge: 'Wtedy pojawia się sygnał.' },
  ro: { moments: ['Acoperiri în întârziere', 'Cost forță de muncă peste țintă', 'Risc de așteptare la masă'], bridge: 'Apoi sosește semnalul.' },
  sv: { moments: ['Gäster halkar efter', 'Personalkostnad över mål', 'Risk för väntan vid bord'], bridge: 'Sedan kommer signalen.' },
  tr: { moments: ['Kuver hızı düşüyor', 'İşçilik hedefi aşıyor', 'Masa bekleme riski'], bridge: 'Sonra sinyal geliyor.' },
  id: { moments: ['Tamu mulai tertinggal', 'Biaya tenaga kerja lewat target', 'Risiko meja menunggu'], bridge: 'Lalu sinyal pun tiba.' },
  ms: { moments: ['Tetamu semakin tertinggal', 'Kos buruh lepasi sasaran', 'Risiko meja menunggu'], bridge: 'Kemudian isyarat pun tiba.' },
  vi: { moments: ['Lượt khách tụt lại', 'Chi phí nhân công vượt mức', 'Nguy cơ bàn chờ lâu'], bridge: 'Rồi tín hiệu xuất hiện.' },
  hi: { moments: ['मेहमान सेवा पिछड़ रही', 'श्रम लागत लक्ष्य पार', 'टेबल इंतज़ार का जोखिम'], bridge: 'तभी संकेत आता है।' },
  ur: { moments: ['مہمانوں کی رفتار سست', 'مزدوری لاگت حد سے تجاوز', 'میز انتظار کا خطرہ'], bridge: 'پھر اشارہ آ جاتا ہے۔' },
  bn: { moments: ['অতিথি সেবা পিছিয়ে', 'শ্রম ব্যয় লক্ষ্য ছাড়াল', 'টেবিল অপেক্ষার ঝুঁকি'], bridge: 'তখনই সংকেত আসে।' },
  th: { moments: ['ยอดลูกค้าตามไม่ทัน', 'ต้นทุนแรงงานเกินเป้า', 'เสี่ยงโต๊ะรอนาน'], bridge: 'แล้วสัญญาณก็มาถึง' },
  'zh-Hans': { moments: ['客流节奏落后', '人力成本超标', '餐桌等候风险'], bridge: '随后，信号出现。' },
  ja: { moments: ['客数が遅れ気味', '人件費が目標超過', 'テーブル待ちの兆候'], bridge: 'そのとき、シグナルが届く。' },
  ko: { moments: ['손님 응대 지연', '인건비 목표 초과', '테이블 대기 위험'], bridge: '그때 신호가 도착한다.' },
};
