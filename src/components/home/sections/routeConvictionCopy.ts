import type { WebsiteLocale } from '@/lib/i18n';
import type { ConvictionCopy } from './SectionConviction';

/**
 * Per-route "belief beat" copy - the USHG copy-first conviction that opens each
 * top route, mirroring the homepage manifesto. Fully localized across all 22
 * website locales (Record<WebsiteLocale, ...> so tsc enforces completeness),
 * resolved at render with an English fallback; never touches the qa:translation
 * gate (self-contained, outside the `messages` tree).
 *
 * One `*...*` span per statement renders in warm coral. Dash house-style: spaced
 * ASCII hyphen " - ", no em-dashes.
 */

type RouteConviction = Record<WebsiteLocale, ConvictionCopy>;

export const pricingConviction: RouteConviction = {
  en: {
    eyebrow: "What you're really buying",
    statement:
      "You're not buying dashboards by the seat. You're buying *the decision you'd have missed* - and the hours you stop losing to the report that landed too late.",
    coda: 'Start free on the data you already have. Add intelligence as it earns its place.',
  },
  ar: {
    eyebrow: 'ما الذي تشتريه فعلاً',
    statement:
      'أنت لا تشتري لوحات معلومات بحسب المقعد. أنت تشتري *القرار الذي كان سيفوتك* - والساعات التي تتوقف عن خسارتها للتقرير الذي وصل متأخراً.',
    coda: 'ابدأ مجاناً بالبيانات التي بحوزتك أصلاً. أضف الذكاء حين يثبت جدارته بمكانه.',
  },
  fr: {
    eyebrow: 'Ce que vous achetez vraiment',
    statement:
      "Vous n'achetez pas des tableaux de bord au siège. Vous achetez *la décision que vous auriez manquée* - et les heures que vous cessez de perdre à cause du rapport arrivé trop tard.",
    coda: "Commencez gratuitement avec les données que vous avez déjà. Ajoutez l'intelligence à mesure qu'elle gagne sa place.",
  },
  es: {
    eyebrow: 'Lo que de verdad estás comprando',
    statement:
      'No estás comprando paneles por puesto. Estás comprando *la decisión que se te habría escapado* - y las horas que dejas de perder por el informe que llegó demasiado tarde.',
    coda: 'Empieza gratis con los datos que ya tienes. Añade inteligencia a medida que se gana su sitio.',
  },
  de: {
    eyebrow: 'Was Sie wirklich kaufen',
    statement:
      'Sie kaufen keine Dashboards pro Platz. Sie kaufen *die Entscheidung, die Ihnen sonst entgangen wäre* - und die Stunden, die Sie nicht mehr an den zu spät gelieferten Report verlieren.',
    coda: 'Starten Sie kostenlos mit den Daten, die Sie schon haben. Fügen Sie Intelligenz hinzu, sobald sie sich ihren Platz verdient.',
  },
  nl: {
    eyebrow: 'Wat u echt koopt',
    statement:
      'U koopt geen dashboards per stoel. U koopt *de beslissing die u anders gemist had* - en de uren die u niet langer verliest aan het rapport dat te laat binnenkwam.',
    coda: 'Begin gratis met de data die u al heeft. Voeg intelligentie toe zodra die haar plek verdient.',
  },
  pt: {
    eyebrow: 'O que você está mesmo comprando',
    statement:
      'Você não está comprando painéis por assento. Você está comprando *a decisão que teria deixado escapar* - e as horas que para de perder com o relatório que chegou tarde demais.',
    coda: 'Comece de graça com os dados que você já tem. Adicione inteligência à medida que ela conquista o seu lugar.',
  },
  hi: {
    eyebrow: 'आप असल में क्या खरीद रहे हैं',
    statement:
      'आप सीट के हिसाब से डैशबोर्ड नहीं खरीद रहे। आप खरीद रहे हैं *वह फैसला जो आपसे छूट जाता* - और वे घंटे जो अब आप उस रिपोर्ट में नहीं गँवाते जो बहुत देर से आई।',
    coda: 'जो डेटा आपके पास पहले से है, उसी पर मुफ्त शुरू करें। इंटेलिजेंस तब जोड़ें जब वह अपनी जगह कमा ले।',
  },
  ur: {
    eyebrow: 'آپ دراصل کیا خرید رہے ہیں',
    statement:
      'آپ سیٹ کے حساب سے ڈیش بورڈ نہیں خرید رہے۔ آپ خرید رہے ہیں *وہ فیصلہ جو آپ سے رہ جاتا* - اور وہ گھنٹے جو اب آپ اُس رپورٹ میں نہیں گنواتے جو بہت دیر سے آئی۔',
    coda: 'جو ڈیٹا آپ کے پاس پہلے سے ہے، اُسی پر مفت آغاز کریں۔ ذہانت تب شامل کریں جب وہ اپنی جگہ کما لے۔',
  },
  it: {
    eyebrow: 'Cosa stai comprando davvero',
    statement:
      "Non stai comprando dashboard a postazione. Stai comprando *la decisione che ti saresti perso* - e le ore che smetti di perdere per il report arrivato troppo tardi.",
    coda: 'Inizia gratis con i dati che hai già. Aggiungi intelligenza man mano che si guadagna il suo posto.',
  },
  pl: {
    eyebrow: 'Co naprawdę kupujesz',
    statement:
      'Nie kupujesz pulpitów na stanowisko. Kupujesz *decyzję, którą inaczej byś przegapił* - i godziny, których przestajesz tracić na raport, który dotarł za późno.',
    coda: 'Zacznij za darmo na danych, które już masz. Dodawaj inteligencję, gdy zasłuży na swoje miejsce.',
  },
  tr: {
    eyebrow: 'Aslında ne satın alıyorsunuz',
    statement:
      'Koltuk başına panolar satın almıyorsunuz. *Kaçıracağınız o kararı* satın alıyorsunuz - ve çok geç gelen rapora artık kaybetmediğiniz saatleri.',
    coda: 'Zaten elinizdeki veriyle ücretsiz başlayın. Zekâyı, yerini hak ettikçe ekleyin.',
  },
  'zh-Hans': {
    eyebrow: '你真正买的是什么',
    statement:
      '你买的不是按席位计费的仪表盘。你买的是*那个你本会错过的决定*--以及不再因报表来得太迟而白白流失的时间。',
    coda: '用你手头已有的数据免费起步。当智能赢得它的位置时，再把它加上。',
  },
  ja: {
    eyebrow: 'あなたが本当に買うもの',
    statement:
      '席ごとのダッシュボードを買うのではありません。買うのは*見逃していたはずのその判断*--そして、遅れて届くレポートにもう奪われずに済む時間です。',
    coda: 'いま手元にあるデータから無料で始めましょう。インテリジェンスは、その価値が証明された分だけ加えていけます。',
  },
  ko: {
    eyebrow: '당신이 정말로 사는 것',
    statement:
      '좌석 단위로 대시보드를 사는 게 아닙니다. 당신이 사는 것은 *놓쳤을 그 결정* - 그리고 너무 늦게 도착한 리포트에 더는 빼앗기지 않는 시간입니다.',
    coda: '이미 가진 데이터로 무료로 시작하세요. 인텔리전스는 제 몫을 증명할 때마다 더하면 됩니다.',
  },
  id: {
    eyebrow: 'Yang sebenarnya Anda beli',
    statement:
      'Anda tidak membeli dasbor per kursi. Anda membeli *keputusan yang tadinya akan terlewat* - dan jam-jam yang tak lagi hilang gara-gara laporan yang datang terlambat.',
    coda: 'Mulai gratis dengan data yang sudah Anda miliki. Tambahkan kecerdasan begitu ia membuktikan tempatnya.',
  },
  vi: {
    eyebrow: 'Thứ bạn thật sự mua',
    statement:
      'Bạn không mua các bảng điều khiển tính theo chỗ ngồi. Bạn mua *quyết định lẽ ra bạn đã bỏ lỡ* - và những giờ bạn thôi đánh mất vì bản báo cáo đến quá trễ.',
    coda: 'Bắt đầu miễn phí với dữ liệu bạn đã có. Thêm trí tuệ khi nó xứng đáng với chỗ đứng của mình.',
  },
  ro: {
    eyebrow: 'Ce cumperi de fapt',
    statement:
      'Nu cumperi tablouri de bord pe scaun. Cumperi *decizia pe care ai fi ratat-o* - și orele pe care nu le mai pierzi din cauza raportului care a sosit prea târziu.',
    coda: 'Începe gratuit cu datele pe care le ai deja. Adaugă inteligență pe măsură ce își câștigă locul.',
  },
  sv: {
    eyebrow: 'Vad du egentligen köper',
    statement:
      'Du köper inte instrumentpaneler per plats. Du köper *beslutet du annars hade missat* - och timmarna du slutar förlora till rapporten som kom för sent.',
    coda: 'Börja gratis med datan du redan har. Lägg till intelligens när den förtjänar sin plats.',
  },
  bn: {
    eyebrow: 'আপনি আসলে কী কিনছেন',
    statement:
      'আপনি আসন-পিছু ড্যাশবোর্ড কিনছেন না। আপনি কিনছেন *যে সিদ্ধান্তটি আপনার হাতছাড়া হয়ে যেত* - আর যে ঘণ্টাগুলো আপনি আর হারাচ্ছেন না সেই রিপোর্টের পেছনে যা এসেছিল বড্ড দেরিতে।',
    coda: 'যে ডেটা আপনার কাছে আগে থেকেই আছে, তার উপরই বিনামূল্যে শুরু করুন। ইন্টেলিজেন্স ততটুকুই যোগ করুন যতটা সে তার জায়গা অর্জন করে।',
  },
  th: {
    eyebrow: 'สิ่งที่คุณกำลังซื้อจริง ๆ',
    statement:
      'คุณไม่ได้ซื้อแดชบอร์ดเป็นรายที่นั่ง คุณกำลังซื้อ *การตัดสินใจที่คุณคงพลาดไป* - และชั่วโมงที่คุณเลิกเสียไปกับรายงานที่มาถึงช้าเกินไป',
    coda: 'เริ่มฟรีด้วยข้อมูลที่คุณมีอยู่แล้ว แล้วค่อยเพิ่มความฉลาดเมื่อมันพิสูจน์คุณค่าของตัวเอง',
  },
  ms: {
    eyebrow: 'Apa yang anda beli sebenarnya',
    statement:
      'Anda tidak membeli papan pemuka mengikut tempat duduk. Anda membeli *keputusan yang anda mungkin terlepas* - dan jam yang anda berhenti rugi kepada laporan yang tiba terlalu lewat.',
    coda: 'Mulakan percuma dengan data yang anda sudah ada. Tambah kecerdasan apabila ia layak mendapat tempatnya.',
  },
};

export const foresightConviction: RouteConviction = {
  en: {
    eyebrow: 'Why we forecast',
    statement:
      'A forecast is worthless if it only tells you what already happened. We build the one that *changes what you do next* - the staffing, the order, the table you overbook tonight.',
    coda: 'Foresight turns next week into something you can act on today.',
  },
  ar: {
    eyebrow: 'لماذا نتنبأ',
    statement:
      'لا قيمة لتوقّع يكتفي بإخبارك بما حدث فعلاً. نحن نبني التوقّع الذي *يغيّر ما ستفعله بعد ذلك* - عدد الموظفين، الطلبية، والطاولة التي تحجزها مرتين الليلة.',
    coda: 'يحوّل Foresight الأسبوع المقبل إلى شيء يمكنك التحرّك بناءً عليه اليوم.',
  },
  fr: {
    eyebrow: 'Pourquoi nous prévoyons',
    statement:
      'Une prévision ne vaut rien si elle se contente de raconter ce qui est déjà arrivé. Nous bâtissons celle qui *change ce que vous ferez ensuite* - les effectifs, la commande, la table que vous surbookez ce soir.',
    coda: "Foresight transforme la semaine prochaine en quelque chose sur quoi vous pouvez agir dès aujourd'hui.",
  },
  es: {
    eyebrow: 'Por qué pronosticamos',
    statement:
      'Un pronóstico no vale nada si solo te cuenta lo que ya pasó. Nosotros construimos el que *cambia lo que harás a continuación* - la plantilla, el pedido, la mesa que sobrevendes esta noche.',
    coda: 'Foresight convierte la semana que viene en algo sobre lo que puedes actuar hoy.',
  },
  de: {
    eyebrow: 'Warum wir prognostizieren',
    statement:
      'Eine Prognose ist wertlos, wenn sie Ihnen nur erzählt, was schon passiert ist. Wir bauen die, die *ändert, was Sie als Nächstes tun* - die Besetzung, die Bestellung, den Tisch, den Sie heute Abend überbuchen.',
    coda: 'Foresight macht aus der nächsten Woche etwas, auf das Sie schon heute reagieren können.',
  },
  nl: {
    eyebrow: 'Waarom wij voorspellen',
    statement:
      'Een voorspelling is waardeloos als ze u alleen vertelt wat al gebeurd is. Wij bouwen die ene die *verandert wat u hierna doet* - de bezetting, de bestelling, de tafel die u vanavond overboekt.',
    coda: 'Foresight maakt van volgende week iets waarop u vandaag al kunt handelen.',
  },
  pt: {
    eyebrow: 'Por que prevemos',
    statement:
      'Uma previsão não vale nada se só conta o que já aconteceu. Nós construímos aquela que *muda o que você faz a seguir* - a escala, o pedido, a mesa que você overbooka hoje à noite.',
    coda: 'O Foresight transforma a próxima semana em algo sobre o qual você pode agir hoje.',
  },
  hi: {
    eyebrow: 'हम पूर्वानुमान क्यों लगाते हैं',
    statement:
      'पूर्वानुमान बेकार है अगर वह सिर्फ यह बताए कि क्या हो चुका। हम वह बनाते हैं जो *बदल दे कि आप आगे क्या करते हैं* - स्टाफिंग, ऑर्डर, और वह टेबल जिसे आप आज रात ओवरबुक करते हैं।',
    coda: 'Foresight अगले हफ्ते को ऐसी चीज़ में बदल देता है जिस पर आप आज ही कदम उठा सकें।',
  },
  ur: {
    eyebrow: 'ہم پیش گوئی کیوں کرتے ہیں',
    statement:
      'پیش گوئی بے کار ہے اگر وہ صرف یہ بتائے کہ کیا ہو چکا۔ ہم وہ بناتے ہیں جو *بدل دے کہ آپ آگے کیا کرتے ہیں* - عملے کی تعداد، آرڈر، اور وہ میز جسے آپ آج رات اوور بُک کرتے ہیں۔',
    coda: 'Foresight اگلے ہفتے کو ایسی چیز میں بدل دیتا ہے جس پر آپ آج ہی عمل کر سکیں۔',
  },
  it: {
    eyebrow: 'Perché facciamo previsioni',
    statement:
      'Una previsione non vale niente se ti dice solo ciò che è già successo. Noi costruiamo quella che *cambia ciò che farai dopo* - il personale, l’ordine, il tavolo che stasera vai in overbooking.',
    coda: 'Foresight trasforma la prossima settimana in qualcosa su cui puoi agire già oggi.',
  },
  pl: {
    eyebrow: 'Dlaczego prognozujemy',
    statement:
      'Prognoza jest bezwartościowa, jeśli mówi tylko o tym, co już się wydarzyło. My budujemy tę, która *zmienia to, co zrobisz dalej* - obsadę, zamówienie, stolik, który dziś wieczorem nadrezerwujesz.',
    coda: 'Foresight zamienia przyszły tydzień w coś, na co możesz zareagować już dziś.',
  },
  tr: {
    eyebrow: 'Neden tahmin yapıyoruz',
    statement:
      'Bir tahmin yalnızca olup biteni anlatıyorsa hiçbir işe yaramaz. Biz *sıradaki adımınızı değiştiren* tahmini kuruyoruz - personeli, siparişi, bu gece fazladan rezerve ettiğiniz masayı.',
    coda: 'Foresight gelecek haftayı bugün üzerine hareket edebileceğiniz bir şeye dönüştürür.',
  },
  'zh-Hans': {
    eyebrow: '我们为何做预测',
    statement:
      '如果预测只告诉你已经发生的事，那它毫无价值。我们做的是那种*改变你下一步动作*的预测--排班、进货、以及今晚你超额预订的那张桌。',
    coda: 'Foresight 把下周变成你今天就能着手应对的事。',
  },
  ja: {
    eyebrow: 'なぜ予測するのか',
    statement:
      '予測が、すでに起きたことを告げるだけなら何の価値もありません。私たちがつくるのは*次の一手を変える*予測です--人員配置、発注、そして今夜あえてオーバーブッキングする一卓。',
    coda: 'Foresight は来週を、今日のうちに手を打てるものに変えます。',
  },
  ko: {
    eyebrow: '우리가 예측하는 이유',
    statement:
      '예측이 이미 벌어진 일만 알려준다면 아무 쓸모가 없습니다. 우리는 *다음 행동을 바꾸는* 예측을 만듭니다 - 인력 배치, 발주, 그리고 오늘 밤 오버부킹하는 그 테이블.',
    coda: 'Foresight는 다음 주를 오늘 당장 움직일 수 있는 것으로 바꿉니다.',
  },
  id: {
    eyebrow: 'Mengapa kami meramalkan',
    statement:
      'Ramalan tak ada artinya jika hanya menceritakan apa yang sudah terjadi. Kami membangun ramalan yang *mengubah langkah Anda berikutnya* - jumlah staf, pesanan, dan meja yang Anda overbook malam ini.',
    coda: 'Foresight mengubah pekan depan menjadi sesuatu yang bisa Anda tindak lanjuti hari ini.',
  },
  vi: {
    eyebrow: 'Vì sao chúng tôi dự báo',
    statement:
      'Một dự báo vô giá trị nếu nó chỉ kể lại điều đã xảy ra. Chúng tôi xây dựng dự báo *thay đổi việc bạn làm tiếp theo* - bố trí nhân sự, đơn đặt hàng, và chiếc bàn bạn nhận quá chỗ tối nay.',
    coda: 'Foresight biến tuần tới thành điều bạn có thể hành động ngay hôm nay.',
  },
  ro: {
    eyebrow: 'De ce facem prognoze',
    statement:
      'O prognoză nu valorează nimic dacă îți spune doar ce s-a întâmplat deja. Noi o construim pe aceea care *schimbă ce faci în continuare* - personalul, comanda, masa pe care o suprarezervi în seara asta.',
    coda: 'Foresight transformă săptămâna viitoare în ceva pe care poți acționa chiar de azi.',
  },
  sv: {
    eyebrow: 'Varför vi prognostiserar',
    statement:
      'En prognos är värdelös om den bara berättar vad som redan hänt. Vi bygger den som *ändrar vad du gör härnäst* - bemanningen, beställningen, bordet du överbokar i kväll.',
    coda: 'Foresight gör nästa vecka till något du kan agera på redan i dag.',
  },
  bn: {
    eyebrow: 'কেন আমরা পূর্বাভাস দিই',
    statement:
      'যে পূর্বাভাস কেবল বলে কী ঘটে গেছে, তা মূল্যহীন। আমরা সেটিই গড়ি যা *বদলে দেয় আপনি এর পরে কী করবেন* - স্টাফিং, অর্ডার, আর আজ রাতে যে টেবিলটি আপনি ওভারবুক করছেন।',
    coda: 'Foresight আগামী সপ্তাহকে এমন কিছুতে পরিণত করে যার উপর আপনি আজই পদক্ষেপ নিতে পারেন।',
  },
  th: {
    eyebrow: 'ทำไมเราจึงพยากรณ์',
    statement:
      'การพยากรณ์ไร้ค่า หากมันบอกได้แค่สิ่งที่เกิดไปแล้ว เราสร้างการพยากรณ์ที่ *เปลี่ยนสิ่งที่คุณจะทำต่อไป* - การจัดกำลังคน การสั่งของ และโต๊ะที่คุณรับจองเกินในคืนนี้',
    coda: 'Foresight เปลี่ยนสัปดาห์หน้าให้เป็นสิ่งที่คุณลงมือจัดการได้ตั้งแต่วันนี้',
  },
  ms: {
    eyebrow: 'Mengapa kami meramal',
    statement:
      'Ramalan tidak bernilai jika ia hanya memberitahu apa yang sudah berlaku. Kami membina ramalan yang *mengubah langkah anda seterusnya* - bilangan kakitangan, pesanan, dan meja yang anda tempah lebih malam ini.',
    coda: 'Foresight menjadikan minggu depan sesuatu yang boleh anda tangani hari ini.',
  },
};

export const watchtowerConviction: RouteConviction = {
  en: {
    eyebrow: 'Why we watch the market',
    statement:
      'A competitor moved a price, a menu, an ad budget this weekend. You should know *before it shows up in your covers* - not three weeks late, and not by hand.',
    coda: 'Watchtower reads the outside market so your team can run the inside one.',
  },
  ar: {
    eyebrow: 'لماذا نراقب السوق',
    statement:
      'منافس غيّر سعراً، أو قائمة طعام، أو ميزانية إعلان نهاية هذا الأسبوع. يجب أن تعرف *قبل أن يظهر ذلك في عدد روّادك* - لا بعد ثلاثة أسابيع، ولا بالعمل اليدوي.',
    coda: 'يقرأ Watchtower السوق الخارجي كي يدير فريقك السوق الداخلي.',
  },
  fr: {
    eyebrow: 'Pourquoi nous surveillons le marché',
    statement:
      "Un concurrent a bougé un prix, une carte, un budget pub ce week-end. Vous devriez le savoir *avant que ça n'apparaisse dans vos couverts* - pas trois semaines trop tard, et pas à la main.",
    coda: 'Watchtower lit le marché extérieur pour que votre équipe gère celui de la salle.',
  },
  es: {
    eyebrow: 'Por qué vigilamos el mercado',
    statement:
      'Un competidor movió un precio, una carta, un presupuesto de publicidad este fin de semana. Deberías saberlo *antes de que aparezca en tus comensales* - no tres semanas tarde, ni a mano.',
    coda: 'Watchtower lee el mercado de fuera para que tu equipo gestione el de dentro.',
  },
  de: {
    eyebrow: 'Warum wir den Markt beobachten',
    statement:
      'Ein Wettbewerber hat am Wochenende einen Preis, eine Karte, ein Werbebudget verändert. Sie sollten es wissen, *bevor es in Ihren Gedecken auftaucht* - nicht drei Wochen zu spät, und nicht von Hand.',
    coda: 'Watchtower liest den Markt von außen, damit Ihr Team den von innen führen kann.',
  },
  nl: {
    eyebrow: 'Waarom wij de markt volgen',
    statement:
      'Een concurrent verschoof dit weekend een prijs, een menu, een advertentiebudget. U hoort het te weten *voordat het in uw couverts opduikt* - niet drie weken te laat, en niet met de hand.',
    coda: 'Watchtower leest de markt buiten, zodat uw team die binnen kan runnen.',
  },
  pt: {
    eyebrow: 'Por que vigiamos o mercado',
    statement:
      'Um concorrente mexeu num preço, num cardápio, num orçamento de anúncio neste fim de semana. Você deveria saber *antes que isso apareça nos seus couverts* - não três semanas atrasado, nem na mão.',
    coda: 'O Watchtower lê o mercado de fora para que sua equipe cuide do de dentro.',
  },
  hi: {
    eyebrow: 'हम बाज़ार पर नज़र क्यों रखते हैं',
    statement:
      'किसी प्रतिस्पर्धी ने इस वीकेंड एक कीमत, एक मेन्यू, एक विज्ञापन बजट बदल दिया। आपको यह पता होना चाहिए *इससे पहले कि यह आपके कवर में दिखाई दे* - तीन हफ्ते देर से नहीं, और हाथ से नहीं।',
    coda: 'Watchtower बाहर का बाज़ार पढ़ता है ताकि आपकी टीम अंदर का बाज़ार चला सके।',
  },
  ur: {
    eyebrow: 'ہم بازار پر نظر کیوں رکھتے ہیں',
    statement:
      'کسی حریف نے اِس ویک اینڈ ایک قیمت، ایک مینیو، ایک اشتہاری بجٹ بدل دیا۔ آپ کو یہ معلوم ہونا چاہیے *اِس سے پہلے کہ یہ آپ کے کورز میں ظاہر ہو* - تین ہفتے دیر سے نہیں، اور ہاتھ سے نہیں۔',
    coda: 'Watchtower باہر کا بازار پڑھتا ہے تاکہ آپ کی ٹیم اندر کا بازار چلا سکے۔',
  },
  it: {
    eyebrow: 'Perché teniamo d’occhio il mercato',
    statement:
      'Un concorrente questo weekend ha mosso un prezzo, un menù, un budget pubblicitario. Dovresti saperlo *prima che si veda nei tuoi coperti* - non tre settimane dopo, e non a mano.',
    coda: 'Watchtower legge il mercato di fuori, così la tua squadra può gestire quello di dentro.',
  },
  pl: {
    eyebrow: 'Dlaczego obserwujemy rynek',
    statement:
      'Konkurent ruszył w ten weekend cenę, menu, budżet reklamowy. Powinieneś wiedzieć *zanim pojawi się to w twoich nakryciach* - nie trzy tygodnie za późno i nie ręcznie.',
    coda: 'Watchtower czyta rynek na zewnątrz, żeby twój zespół mógł prowadzić ten w środku.',
  },
  tr: {
    eyebrow: 'Pazarı neden izliyoruz',
    statement:
      'Bir rakip bu hafta sonu bir fiyatı, bir menüyü, bir reklam bütçesini değiştirdi. Bunu *kapak sayınıza yansımadan önce* bilmelisiniz - üç hafta geç değil, elle de değil.',
    coda: 'Watchtower dışarıdaki pazarı okur ki ekibiniz içerideki pazarı yönetebilsin.',
  },
  'zh-Hans': {
    eyebrow: '我们为何盯着市场',
    statement:
      '这个周末，对手动了价格、动了菜单、动了广告预算。你该*在它反映到你的客流之前*就知道--而不是迟了三周，也不是靠人工。',
    coda: 'Watchtower 替你读懂外面的市场，好让你的团队经营里面的那个。',
  },
  ja: {
    eyebrow: 'なぜ市場を見張るのか',
    statement:
      'この週末、競合が価格を、メニューを、広告予算を動かしました。それが*客数に表れる前に*知るべきです--三週間も遅れてからではなく、手作業でもなく。',
    coda: 'Watchtower が外の市場を読み解くから、あなたのチームは中の市場に専念できます。',
  },
  ko: {
    eyebrow: '우리가 시장을 지켜보는 이유',
    statement:
      '이번 주말, 경쟁자가 가격을, 메뉴를, 광고 예산을 움직였습니다. *그것이 당신의 객수에 나타나기 전에* 알아야 합니다 - 3주 늦게가 아니라, 손으로가 아니라.',
    coda: 'Watchtower가 바깥 시장을 읽어 주어, 당신의 팀은 안쪽 시장에 집중할 수 있습니다.',
  },
  id: {
    eyebrow: 'Mengapa kami mengawasi pasar',
    statement:
      'Seorang pesaing mengubah harga, menu, anggaran iklan akhir pekan ini. Anda seharusnya tahu *sebelum itu muncul di jumlah tamu Anda* - bukan tiga minggu terlambat, dan bukan dengan tangan.',
    coda: 'Watchtower membaca pasar di luar agar tim Anda bisa menjalankan pasar di dalam.',
  },
  vi: {
    eyebrow: 'Vì sao chúng tôi theo dõi thị trường',
    statement:
      'Cuối tuần này, một đối thủ vừa đổi một mức giá, một thực đơn, một ngân sách quảng cáo. Bạn nên biết *trước khi nó hiện ra trong lượng khách của bạn* - không phải trễ ba tuần, và không phải làm bằng tay.',
    coda: 'Watchtower đọc thị trường bên ngoài để đội ngũ của bạn lo thị trường bên trong.',
  },
  ro: {
    eyebrow: 'De ce urmărim piața',
    statement:
      'Un concurent a mișcat un preț, un meniu, un buget de reclamă în weekendul ăsta. Ar trebui să afli *înainte să apară în numărul tău de acoperiri* - nu cu trei săptămâni întârziere și nu de mână.',
    coda: 'Watchtower citește piața de afară ca echipa ta s-o poată conduce pe cea dinăuntru.',
  },
  sv: {
    eyebrow: 'Varför vi bevakar marknaden',
    statement:
      'En konkurrent flyttade ett pris, en meny, en annonsbudget i helgen. Du borde veta det *innan det syns i dina gäster* - inte tre veckor för sent, och inte för hand.',
    coda: 'Watchtower läser marknaden utanför så att ditt team kan sköta den inuti.',
  },
  bn: {
    eyebrow: 'কেন আমরা বাজারে নজর রাখি',
    statement:
      'এই উইকেন্ডে কোনো প্রতিযোগী একটা দাম, একটা মেনু, একটা বিজ্ঞাপন বাজেট নড়িয়েছে। আপনার জানা উচিত *তা আপনার কভার-সংখ্যায় ফুটে ওঠার আগেই* - তিন সপ্তাহ দেরিতে নয়, আর হাতে-কলমে নয়।',
    coda: 'Watchtower বাইরের বাজার পড়ে নেয়, যাতে আপনার দল ভেতরের বাজারটা চালাতে পারে।',
  },
  th: {
    eyebrow: 'ทำไมเราจึงเฝ้าดูตลาด',
    statement:
      'สุดสัปดาห์นี้คู่แข่งขยับราคา ขยับเมนู ขยับงบโฆษณา คุณควรรู้ *ก่อนที่มันจะปรากฏในจำนวนลูกค้าของคุณ* - ไม่ใช่ช้าไปสามสัปดาห์ และไม่ใช่ด้วยมือ',
    coda: 'Watchtower อ่านตลาดข้างนอกให้ เพื่อให้ทีมของคุณดูแลตลาดข้างในได้',
  },
  ms: {
    eyebrow: 'Mengapa kami memerhati pasaran',
    statement:
      'Seorang pesaing mengubah harga, menu, bajet iklan hujung minggu ini. Anda sepatutnya tahu *sebelum ia muncul dalam bilangan tetamu anda* - bukan tiga minggu lewat, dan bukan dengan tangan.',
    coda: 'Watchtower membaca pasaran di luar supaya pasukan anda boleh mengurus yang di dalam.',
  },
};

export const crossIntelligenceConviction: RouteConviction = {
  en: {
    eyebrow: 'Why the modules talk',
    statement:
      "Labor didn't spike on its own. The margin didn't slip in a vacuum. The answer is almost never in one number - it's in *how they move together.*",
    coda: 'Cross-Intelligence connects every module so the cause surfaces, not just the symptom.',
  },
  ar: {
    eyebrow: 'لماذا تتحدّث الوحدات معاً',
    statement:
      'لم ترتفع تكلفة العمالة من تلقاء نفسها. ولم يتراجع الهامش في فراغ. الجواب لا يكمن أبداً تقريباً في رقم واحد - بل في *كيف تتحرّك معاً.*',
    coda: 'يربط Cross-Intelligence كل وحدة بالأخرى ليظهر السبب لا العرَض وحده.',
  },
  fr: {
    eyebrow: 'Pourquoi les modules se parlent',
    statement:
      "La masse salariale n'a pas grimpé toute seule. La marge n'a pas glissé dans le vide. La réponse n'est presque jamais dans un seul chiffre - elle est dans *la façon dont ils bougent ensemble.*",
    coda: 'Cross-Intelligence relie chaque module pour faire remonter la cause, pas seulement le symptôme.',
  },
  es: {
    eyebrow: 'Por qué los módulos se hablan',
    statement:
      'La mano de obra no se disparó sola. El margen no se escapó en el vacío. La respuesta casi nunca está en un solo número - está en *cómo se mueven juntos.*',
    coda: 'Cross-Intelligence conecta cada módulo para que aflore la causa, no solo el síntoma.',
  },
  de: {
    eyebrow: 'Warum die Module miteinander reden',
    statement:
      'Die Personalkosten sind nicht von allein gestiegen. Die Marge ist nicht im luftleeren Raum gerutscht. Die Antwort steckt fast nie in einer einzelnen Zahl - sie steckt darin, *wie sie sich gemeinsam bewegen.*',
    coda: 'Cross-Intelligence verbindet jedes Modul, damit die Ursache auftaucht, nicht nur das Symptom.',
  },
  nl: {
    eyebrow: 'Waarom de modules praten',
    statement:
      'De loonkosten schoten niet vanzelf omhoog. De marge zakte niet in een vacuüm. Het antwoord zit bijna nooit in één getal - het zit in *hoe ze samen bewegen.*',
    coda: 'Cross-Intelligence verbindt elke module zodat de oorzaak bovenkomt, niet alleen het symptoom.',
  },
  pt: {
    eyebrow: 'Por que os módulos conversam',
    statement:
      'A mão de obra não disparou sozinha. A margem não escorregou no vácuo. A resposta quase nunca está num único número - está em *como eles se movem juntos.*',
    coda: 'O Cross-Intelligence conecta cada módulo para que a causa apareça, não só o sintoma.',
  },
  hi: {
    eyebrow: 'मॉड्यूल आपस में बात क्यों करते हैं',
    statement:
      'श्रम-लागत अपने आप नहीं उछली। मार्जिन शून्य में नहीं फिसला। जवाब लगभग कभी एक अकेले आँकड़े में नहीं होता - वह इसमें होता है कि *वे साथ कैसे चलते हैं।*',
    coda: 'Cross-Intelligence हर मॉड्यूल को जोड़ता है ताकि कारण सामने आए, सिर्फ लक्षण नहीं।',
  },
  ur: {
    eyebrow: 'ماڈیولز آپس میں بات کیوں کرتے ہیں',
    statement:
      'مزدوری کی لاگت خود بخود نہیں اچھلی۔ مارجن خلا میں نہیں پھسلا۔ جواب تقریباً کبھی کسی ایک عدد میں نہیں ہوتا - وہ اِس میں ہوتا ہے کہ *وہ مل کر کیسے حرکت کرتے ہیں۔*',
    coda: 'Cross-Intelligence ہر ماڈیول کو جوڑتا ہے تاکہ سبب سامنے آئے، صرف علامت نہیں۔',
  },
  it: {
    eyebrow: 'Perché i moduli si parlano',
    statement:
      'Il costo del lavoro non è schizzato da solo. Il margine non è scivolato nel vuoto. La risposta non sta quasi mai in un solo numero - sta in *come si muovono insieme.*',
    coda: 'Cross-Intelligence collega ogni modulo così emerge la causa, non solo il sintomo.',
  },
  pl: {
    eyebrow: 'Dlaczego moduły rozmawiają',
    statement:
      'Koszty pracy nie skoczyły same. Marża nie osunęła się w próżni. Odpowiedź prawie nigdy nie tkwi w jednej liczbie - tkwi w tym, *jak poruszają się razem.*',
    coda: 'Cross-Intelligence łączy każdy moduł, żeby na wierzch wyszła przyczyna, a nie tylko objaw.',
  },
  tr: {
    eyebrow: 'Modüller neden konuşur',
    statement:
      'İşçilik kendiliğinden fırlamadı. Marj boşlukta kaymadı. Cevap neredeyse hiç tek bir sayıda değildir - *birlikte nasıl hareket ettiklerindedir.*',
    coda: 'Cross-Intelligence her modülü bağlar; böylece yalnızca belirti değil, neden yüzeye çıkar.',
  },
  'zh-Hans': {
    eyebrow: '模块为何彼此对话',
    statement:
      '人力成本不会自己飙升。利润率不会凭空滑落。答案几乎从不在某一个数字里--而在于*它们如何一起变动。*',
    coda: 'Cross-Intelligence 把每个模块连起来，让浮现的是病因，而不只是症状。',
  },
  ja: {
    eyebrow: 'なぜモジュールは対話するのか',
    statement:
      '人件費は、ひとりでに跳ね上がったわけではありません。利益率も、真空のなかで滑り落ちたわけではない。答えがひとつの数字にあることは、まずありません--答えは*それらがどう一緒に動くか*にある。',
    coda: 'Cross-Intelligence はすべてのモジュールをつなぎ、症状だけでなく原因を浮かび上がらせます。',
  },
  ko: {
    eyebrow: '모듈이 서로 대화하는 이유',
    statement:
      '인건비가 저절로 치솟은 게 아닙니다. 마진이 진공 속에서 미끄러진 것도 아닙니다. 답은 거의 언제나 하나의 숫자에 있지 않습니다 - *그것들이 어떻게 함께 움직이는가*에 있습니다.',
    coda: 'Cross-Intelligence는 모든 모듈을 연결해, 증상이 아니라 원인이 드러나게 합니다.',
  },
  id: {
    eyebrow: 'Mengapa modul-modul saling bicara',
    statement:
      'Biaya tenaga kerja tidak melonjak sendiri. Margin tidak tergelincir dalam ruang hampa. Jawabannya hampir tak pernah ada di satu angka - melainkan di *bagaimana semuanya bergerak bersama.*',
    coda: 'Cross-Intelligence menghubungkan setiap modul agar penyebabnya muncul, bukan cuma gejalanya.',
  },
  vi: {
    eyebrow: 'Vì sao các mô-đun trò chuyện',
    statement:
      'Chi phí nhân công không tự nó tăng vọt. Biên lợi nhuận không trượt trong chân không. Câu trả lời gần như chẳng bao giờ nằm ở một con số - nó nằm ở *cách chúng dịch chuyển cùng nhau.*',
    coda: 'Cross-Intelligence kết nối mọi mô-đun để nguyên nhân lộ ra, chứ không chỉ triệu chứng.',
  },
  ro: {
    eyebrow: 'De ce vorbesc modulele între ele',
    statement:
      'Costul cu munca n-a sărit de unul singur. Marja n-a alunecat în vid. Răspunsul aproape niciodată nu stă într-un singur număr - stă în *felul în care se mișcă împreună.*',
    coda: 'Cross-Intelligence leagă fiecare modul, ca să iasă la suprafață cauza, nu doar simptomul.',
  },
  sv: {
    eyebrow: 'Varför modulerna pratar',
    statement:
      'Personalkostnaden sköt inte i höjden av sig själv. Marginalen gled inte i ett vakuum. Svaret finns nästan aldrig i ett enda tal - det finns i *hur de rör sig tillsammans.*',
    coda: 'Cross-Intelligence kopplar ihop varje modul så att orsaken kommer fram, inte bara symtomet.',
  },
  bn: {
    eyebrow: 'কেন মডিউলগুলো কথা বলে',
    statement:
      'শ্রমব্যয় নিজে থেকে লাফিয়ে ওঠেনি। মার্জিন শূন্যে পিছলে যায়নি। উত্তর প্রায় কখনোই একটিমাত্র সংখ্যায় থাকে না - থাকে *ওরা কীভাবে একসঙ্গে নড়ে তার মধ্যে।*',
    coda: 'Cross-Intelligence প্রতিটি মডিউলকে যুক্ত করে, যাতে কেবল উপসর্গ নয়, কারণটাই সামনে আসে।',
  },
  th: {
    eyebrow: 'ทำไมโมดูลต่าง ๆ จึงคุยกัน',
    statement:
      'ต้นทุนแรงงานไม่ได้พุ่งขึ้นเอง อัตรากำไรไม่ได้ลื่นไหลในสุญญากาศ คำตอบแทบไม่เคยอยู่ในตัวเลขเดียว - แต่อยู่ที่ *มันขยับไปด้วยกันอย่างไร*',
    coda: 'Cross-Intelligence เชื่อมทุกโมดูลเข้าด้วยกัน เพื่อให้สาเหตุปรากฏ ไม่ใช่แค่อาการ',
  },
  ms: {
    eyebrow: 'Mengapa modul saling berbicara',
    statement:
      'Kos buruh tidak melonjak dengan sendirinya. Margin tidak tergelincir dalam kekosongan. Jawapannya hampir tidak pernah pada satu angka - ia pada *bagaimana semuanya bergerak bersama.*',
    coda: 'Cross-Intelligence menghubungkan setiap modul supaya puncanya timbul, bukan sekadar gejalanya.',
  },
};

export const sundaeReportConviction: RouteConviction = {
  en: {
    eyebrow: 'Why the report is free',
    statement:
      "You can't tell a good night from a great one without something to measure it against. The first honest read on where you really stand *should cost you nothing.*",
    coda: 'Sundae Report benchmarks your restaurant against the market - free, in minutes.',
  },
  ar: {
    eyebrow: 'لماذا التقرير مجاني',
    statement:
      'لا يمكنك أن تميّز ليلة جيدة من ليلة رائعة دون شيء تقيس عليه. أول قراءة صادقة لموقعك الحقيقي *يجب ألا تكلّفك شيئاً.*',
    coda: 'يقارن Sundae Report مطعمك بالسوق - مجاناً، وفي دقائق.',
  },
  fr: {
    eyebrow: 'Pourquoi le rapport est gratuit',
    statement:
      "Impossible de distinguer une bonne soirée d'une excellente sans rien à quoi la mesurer. La première lecture honnête de votre vraie position *ne devrait rien vous coûter.*",
    coda: 'Sundae Report situe votre restaurant face au marché - gratuitement, en quelques minutes.',
  },
  es: {
    eyebrow: 'Por qué el informe es gratis',
    statement:
      'No puedes distinguir una buena noche de una excelente sin algo con que compararla. La primera lectura honesta de dónde estás de verdad *no debería costarte nada.*',
    coda: 'Sundae Report compara tu restaurante con el mercado - gratis, en minutos.',
  },
  de: {
    eyebrow: 'Warum der Report kostenlos ist',
    statement:
      'Sie können einen guten Abend nicht von einem großartigen unterscheiden, wenn Sie nichts zum Vergleich haben. Der erste ehrliche Blick darauf, wo Sie wirklich stehen, *sollte Sie nichts kosten.*',
    coda: 'Sundae Report vergleicht Ihr Restaurant mit dem Markt - kostenlos, in Minuten.',
  },
  nl: {
    eyebrow: 'Waarom het rapport gratis is',
    statement:
      'U kunt een goede avond niet van een geweldige onderscheiden zonder iets om hem aan af te meten. De eerste eerlijke blik op waar u echt staat *zou u niets mogen kosten.*',
    coda: 'Sundae Report zet uw restaurant af tegen de markt - gratis, in minuten.',
  },
  pt: {
    eyebrow: 'Por que o relatório é grátis',
    statement:
      'Você não distingue uma boa noite de uma excelente sem algo com que medi-la. A primeira leitura honesta de onde você realmente está *não deveria lhe custar nada.*',
    coda: 'O Sundae Report compara seu restaurante com o mercado - grátis, em minutos.',
  },
  hi: {
    eyebrow: 'रिपोर्ट मुफ्त क्यों है',
    statement:
      'किसी अच्छी रात को शानदार रात से आप तब तक अलग नहीं कर सकते जब तक तुलना के लिए कुछ न हो। आप असल में कहाँ खड़े हैं, उसकी पहली ईमानदार पड़ताल *आपसे कुछ नहीं माँगनी चाहिए।*',
    coda: 'Sundae Report आपके रेस्तरां को बाज़ार के मुकाबले आँकता है - मुफ्त, मिनटों में।',
  },
  ur: {
    eyebrow: 'رپورٹ مفت کیوں ہے',
    statement:
      'کسی اچھی رات کو شاندار رات سے آپ تب تک الگ نہیں کر سکتے جب تک موازنے کے لیے کچھ نہ ہو۔ آپ دراصل کہاں کھڑے ہیں، اُس کی پہلی ایماندار جانچ *آپ سے کچھ نہیں مانگنی چاہیے۔*',
    coda: 'Sundae Report آپ کے ریستوران کو بازار کے مقابلے میں جانچتا ہے - مفت، منٹوں میں۔',
  },
  it: {
    eyebrow: 'Perché il report è gratis',
    statement:
      'Non puoi distinguere una buona serata da una grande senza qualcosa con cui misurarla. La prima lettura onesta di dove sei davvero *non dovrebbe costarti nulla.*',
    coda: 'Sundae Report confronta il tuo ristorante con il mercato - gratis, in pochi minuti.',
  },
  pl: {
    eyebrow: 'Dlaczego raport jest darmowy',
    statement:
      'Dobrego wieczoru nie odróżnisz od świetnego bez czegoś, do czego można go odnieść. Pierwszy uczciwy odczyt tego, gdzie naprawdę jesteś, *nie powinien cię nic kosztować.*',
    coda: 'Sundae Report zestawia twoją restaurację z rynkiem - za darmo, w kilka minut.',
  },
  tr: {
    eyebrow: 'Rapor neden ücretsiz',
    statement:
      'İyi bir geceyi harika bir geceden ayırmak için, ölçüp karşılaştıracak bir şey olmadan mümkün değil. Gerçekte nerede durduğunuza dair ilk dürüst okuma *size hiçbir şeye mal olmamalı.*',
    coda: 'Sundae Report restoranınızı piyasayla kıyaslar - ücretsiz, dakikalar içinde.',
  },
  'zh-Hans': {
    eyebrow: '报告为何免费',
    statement:
      '没有可对照的标尺，你分不清一个好晚上和一个绝佳的晚上。第一次诚实地看清你真正所处的位置，*本就不该让你花一分钱。*',
    coda: 'Sundae Report 把你的餐厅与市场对标--免费，几分钟搞定。',
  },
  ja: {
    eyebrow: 'なぜレポートは無料なのか',
    statement:
      '比べる物差しがなければ、よい夜と最高の夜は見分けがつきません。自分が本当はどこに立っているのかを示す最初の正直な一読は、*あなたに何の代償も求めるべきではありません。*',
    coda: 'Sundae Report はあなたの店を市場と照らし合わせます--無料で、数分で。',
  },
  ko: {
    eyebrow: '리포트가 무료인 이유',
    statement:
      '견줄 잣대가 없으면 좋은 밤과 훌륭한 밤을 가릴 수 없습니다. 당신이 정말 어디에 서 있는지에 대한 첫 정직한 진단은 *아무것도 치르지 않아야 합니다.*',
    coda: 'Sundae Report는 당신의 레스토랑을 시장과 견줍니다 - 무료로, 몇 분 만에.',
  },
  id: {
    eyebrow: 'Mengapa laporannya gratis',
    statement:
      'Anda tak bisa membedakan malam yang baik dari yang luar biasa tanpa sesuatu sebagai pembanding. Bacaan jujur pertama tentang posisi Anda yang sebenarnya *seharusnya tidak menelan biaya apa pun.*',
    coda: 'Sundae Report membandingkan restoran Anda dengan pasar - gratis, dalam hitungan menit.',
  },
  vi: {
    eyebrow: 'Vì sao báo cáo miễn phí',
    statement:
      'Bạn không thể phân biệt một buổi tối tốt với một buổi tối tuyệt vời nếu không có gì để đối chiếu. Lần đọc trung thực đầu tiên về vị trí thật của bạn *lẽ ra chẳng phải tốn của bạn đồng nào.*',
    coda: 'Sundae Report đối chiếu nhà hàng của bạn với thị trường - miễn phí, trong vài phút.',
  },
  ro: {
    eyebrow: 'De ce raportul e gratuit',
    statement:
      'Nu deosebești o seară bună de una grozavă fără ceva la care s-o raportezi. Prima citire onestă a locului în care chiar te afli *n-ar trebui să te coste nimic.*',
    coda: 'Sundae Report îți compară restaurantul cu piața - gratuit, în câteva minute.',
  },
  sv: {
    eyebrow: 'Varför rapporten är gratis',
    statement:
      'Du kan inte skilja en bra kväll från en lysande utan något att mäta den mot. Den första ärliga avläsningen av var du faktiskt står *borde inte kosta dig något.*',
    coda: 'Sundae Report mäter din restaurang mot marknaden - gratis, på minuter.',
  },
  bn: {
    eyebrow: 'রিপোর্ট কেন বিনামূল্যে',
    statement:
      'মাপার মতো কিছু না থাকলে আপনি একটি ভালো রাতকে একটি দুর্দান্ত রাত থেকে আলাদা করতে পারবেন না। আপনি আসলে কোথায় দাঁড়িয়ে, তার প্রথম সৎ পাঠ *আপনার কাছে কিছুই দাবি করা উচিত নয়।*',
    coda: 'Sundae Report আপনার রেস্তোরাঁকে বাজারের সঙ্গে মেলায় - বিনামূল্যে, কয়েক মিনিটেই।',
  },
  th: {
    eyebrow: 'ทำไมรายงานจึงฟรี',
    statement:
      'คุณแยกคืนที่ดีออกจากคืนที่ยอดเยี่ยมไม่ได้ ถ้าไม่มีอะไรไว้เทียบวัด การอ่านอย่างซื่อตรงครั้งแรกว่าคุณยืนอยู่ตรงไหนจริง ๆ *ไม่ควรต้องเสียอะไรเลย*',
    coda: 'Sundae Report เทียบร้านของคุณกับตลาด - ฟรี ภายในไม่กี่นาที',
  },
  ms: {
    eyebrow: 'Mengapa laporan ini percuma',
    statement:
      'Anda tidak boleh membezakan malam yang baik daripada yang hebat tanpa sesuatu untuk diukur. Bacaan jujur pertama tentang kedudukan anda yang sebenar *sepatutnya tidak mengenakan kos apa pun.*',
    coda: 'Sundae Report membandingkan restoran anda dengan pasaran - percuma, dalam beberapa minit.',
  },
};

/** Editorial band copy for the (thin) Sundae Report route - adds warmth + rhythm. */
export type RouteBandCopy = { eyebrow: string; headline: string; sub: string; alt: string };

export const sundaeReportBand: Record<WebsiteLocale, RouteBandCopy> = {
  en: {
    eyebrow: 'Where you actually stand',
    headline: 'Every operator believes they run above average. The market is the only honest scorecard.',
    sub: 'Sundae Report puts your sales, labor, and covers up against real restaurants like yours - so "good" stops being a guess.',
    alt: 'A warmly lit restaurant dining room during evening service',
  },
  ar: {
    eyebrow: 'أين تقف فعلاً',
    headline: 'كل مشغّل يظن أنه يدير أداءً فوق المتوسط. السوق هو بطاقة التقييم الصادقة الوحيدة.',
    sub: 'يضع Sundae Report مبيعاتك وعمالتك وعدد روّادك في مواجهة مطاعم حقيقية مثل مطعمك - فيكفّ "جيد" عن أن يكون مجرّد تخمين.',
    alt: 'صالة مطعم بإضاءة دافئة أثناء خدمة المساء',
  },
  fr: {
    eyebrow: 'Où vous vous situez vraiment',
    headline: 'Chaque exploitant se croit au-dessus de la moyenne. Le marché est le seul tableau de bord honnête.',
    sub: 'Sundae Report confronte vos ventes, votre main-d’œuvre et vos couverts à de vrais restaurants comme le vôtre - pour que « bien » cesse d’être une supposition.',
    alt: 'Une salle de restaurant à la lumière chaleureuse pendant le service du soir',
  },
  es: {
    eyebrow: 'Dónde estás de verdad',
    headline: 'Todo operador cree que rinde por encima de la media. El mercado es el único marcador honesto.',
    sub: 'Sundae Report enfrenta tus ventas, tu mano de obra y tus comensales con restaurantes reales como el tuyo - para que «bueno» deje de ser una suposición.',
    alt: 'Una sala de restaurante con luz cálida durante el servicio de la noche',
  },
  de: {
    eyebrow: 'Wo Sie wirklich stehen',
    headline: 'Jeder Betreiber glaubt, er liege über dem Durchschnitt. Der Markt ist das einzige ehrliche Scorecard.',
    sub: 'Sundae Report misst Ihren Umsatz, Ihre Personalkosten und Ihre Gedecke an echten Restaurants wie dem Ihren - damit "gut" aufhört, eine Vermutung zu sein.',
    alt: 'Ein warm beleuchteter Gastraum eines Restaurants während des Abendservice',
  },
  nl: {
    eyebrow: 'Waar u echt staat',
    headline: 'Elke uitbater gelooft dat hij boven het gemiddelde presteert. De markt is de enige eerlijke scorekaart.',
    sub: 'Sundae Report zet uw omzet, loonkosten en couverts af tegen echte restaurants zoals het uwe - zodat "goed" geen gok meer is.',
    alt: 'Een warm verlichte eetzaal van een restaurant tijdens de avondservice',
  },
  pt: {
    eyebrow: 'Onde você realmente está',
    headline: 'Todo operador acredita que opera acima da média. O mercado é o único placar honesto.',
    sub: 'O Sundae Report põe suas vendas, sua mão de obra e seus couverts diante de restaurantes reais como o seu - para que "bom" deixe de ser um palpite.',
    alt: 'Um salão de restaurante com iluminação acolhedora durante o serviço da noite',
  },
  hi: {
    eyebrow: 'आप असल में कहाँ खड़े हैं',
    headline: 'हर ऑपरेटर मानता है कि वह औसत से ऊपर चलाता है। बाज़ार ही एकमात्र ईमानदार स्कोरकार्ड है।',
    sub: 'Sundae Report आपकी बिक्री, श्रम और कवर को आपके जैसे असली रेस्तरां के सामने रखता है - ताकि "अच्छा" अब अनुमान न रहे।',
    alt: 'शाम की सेवा के दौरान गर्म रोशनी से जगमगाता एक रेस्तरां का भोजन-कक्ष',
  },
  ur: {
    eyebrow: 'آپ دراصل کہاں کھڑے ہیں',
    headline: 'ہر آپریٹر یہ سمجھتا ہے کہ وہ اوسط سے اوپر چلا رہا ہے۔ بازار ہی واحد ایماندار اسکور کارڈ ہے۔',
    sub: 'Sundae Report آپ کی فروخت، مزدوری اور کورز کو آپ جیسے حقیقی ریستورانوں کے سامنے رکھتا ہے - تاکہ "اچھا" اب اندازہ نہ رہے۔',
    alt: 'شام کی سروس کے دوران گرم روشنی سے جگمگاتا کسی ریستوران کا کھانے کا کمرہ',
  },
  it: {
    eyebrow: 'Dove sei davvero',
    headline: 'Ogni gestore crede di stare sopra la media. Il mercato è l’unico tabellone onesto.',
    sub: 'Sundae Report mette le tue vendite, il tuo costo del lavoro e i tuoi coperti di fronte a ristoranti veri come il tuo - così "buono" smette di essere un’ipotesi.',
    alt: 'Una sala da pranzo di un ristorante con luce calda durante il servizio serale',
  },
  pl: {
    eyebrow: 'Gdzie naprawdę jesteś',
    headline: 'Każdy operator wierzy, że radzi sobie powyżej średniej. Rynek to jedyna uczciwa karta wyników.',
    sub: 'Sundae Report zestawia twoją sprzedaż, koszty pracy i nakrycia z prawdziwymi restauracjami takimi jak twoja - żeby "dobrze" przestało być zgadywaniem.',
    alt: 'Ciepło oświetlona sala restauracyjna podczas wieczornego serwisu',
  },
  tr: {
    eyebrow: 'Gerçekte nerede durduğunuz',
    headline: 'Her işletmeci ortalamanın üstünde olduğuna inanır. Tek dürüst karne piyasadır.',
    sub: 'Sundae Report satışınızı, işçiliğinizi ve kapak sayınızı sizinkine benzer gerçek restoranlarla karşılaştırır - böylece "iyi" bir tahmin olmaktan çıkar.',
    alt: 'Akşam servisi sırasında sıcak ışıkla aydınlatılmış bir restoran salonu',
  },
  'zh-Hans': {
    eyebrow: '你究竟身处何处',
    headline: '每位经营者都相信自己跑在平均线之上。市场是唯一诚实的成绩单。',
    sub: 'Sundae Report 把你的营收、人力和客流，放到和你一样的真实餐厅面前对照--让"还不错"不再是猜测。',
    alt: '晚市服务时分一间暖光照明的餐厅用餐区',
  },
  ja: {
    eyebrow: '本当のところ、どこに立っているか',
    headline: 'どの経営者も、自分は平均を上回っていると信じています。正直な通信簿は市場だけです。',
    sub: 'Sundae Report は、あなたの売上、人件費、客数を、あなたと同じような実在の店と突き合わせます--「いい」が当て推量でなくなるように。',
    alt: '夜の営業時間に温かな灯りに照らされたレストランのダイニング',
  },
  ko: {
    eyebrow: '당신이 실제로 서 있는 곳',
    headline: '모든 운영자는 자신이 평균 이상이라 믿습니다. 시장만이 정직한 성적표입니다.',
    sub: 'Sundae Report는 당신의 매출, 인건비, 객수를 당신과 같은 실제 레스토랑과 맞세웁니다 - "괜찮다"가 더 이상 짐작이 되지 않도록.',
    alt: '저녁 영업 시간, 따뜻한 조명이 비치는 레스토랑 다이닝 룸',
  },
  id: {
    eyebrow: 'Di mana posisi Anda sebenarnya',
    headline: 'Setiap operator yakin dirinya berjalan di atas rata-rata. Pasar adalah satu-satunya kartu skor yang jujur.',
    sub: 'Sundae Report menyandingkan penjualan, tenaga kerja, dan jumlah tamu Anda dengan restoran nyata seperti milik Anda - agar "bagus" berhenti jadi tebakan.',
    alt: 'Ruang makan restoran bercahaya hangat saat layanan malam',
  },
  vi: {
    eyebrow: 'Bạn thật sự đang ở đâu',
    headline: 'Người điều hành nào cũng tin mình vận hành trên mức trung bình. Thị trường là bảng điểm trung thực duy nhất.',
    sub: 'Sundae Report đặt doanh thu, nhân công và lượng khách của bạn cạnh những nhà hàng thật giống bạn - để "tốt" thôi còn là phỏng đoán.',
    alt: 'Một phòng ăn nhà hàng được thắp sáng ấm áp trong giờ phục vụ buổi tối',
  },
  ro: {
    eyebrow: 'Unde te afli de fapt',
    headline: 'Orice operator crede că lucrează peste medie. Piața e singurul carnet de note onest.',
    sub: 'Sundae Report îți pune vânzările, forța de muncă și acoperirile față în față cu restaurante reale ca al tău - ca "bine" să nu mai fie o presupunere.',
    alt: 'O sală de restaurant luminată cald în timpul serviciului de seară',
  },
  sv: {
    eyebrow: 'Var du faktiskt står',
    headline: 'Varje krögare tror sig ligga över snittet. Marknaden är det enda ärliga betyget.',
    sub: 'Sundae Report ställer din försäljning, din personal och dina gäster mot riktiga restauranger som din - så att "bra" slutar vara en gissning.',
    alt: 'En varmt upplyst restaurangmatsal under kvällsservering',
  },
  bn: {
    eyebrow: 'আপনি আসলে কোথায় দাঁড়িয়ে',
    headline: 'প্রতিটি অপারেটর বিশ্বাস করেন তিনি গড়ের ওপরে চালান। বাজারই একমাত্র সৎ স্কোরকার্ড।',
    sub: 'Sundae Report আপনার বিক্রি, শ্রম আর কভারকে আপনার মতো সত্যিকারের রেস্তোরাঁর মুখোমুখি দাঁড় করায় - যাতে "ভালো" আর আন্দাজ না থাকে।',
    alt: 'সন্ধ্যার পরিবেশন চলাকালীন উষ্ণ আলোয় আলোকিত একটি রেস্তোরাঁর খাবার-ঘর',
  },
  th: {
    eyebrow: 'คุณยืนอยู่ตรงไหนจริง ๆ',
    headline: 'ผู้ประกอบการทุกคนเชื่อว่าตนทำได้เหนือค่าเฉลี่ย ตลาดคือใบประเมินผลที่ซื่อตรงเพียงหนึ่งเดียว',
    sub: 'Sundae Report นำยอดขาย แรงงาน และจำนวนลูกค้าของคุณไปวางเทียบกับร้านจริงที่เหมือนร้านคุณ - เพื่อให้คำว่า "ดี" เลิกเป็นการเดา',
    alt: 'ห้องอาหารของร้านที่อาบไล้ด้วยแสงอบอุ่นระหว่างการให้บริการช่วงค่ำ',
  },
  ms: {
    eyebrow: 'Di mana anda sebenarnya berada',
    headline: 'Setiap pengendali percaya mereka beroperasi di atas purata. Pasaran ialah satu-satunya kad skor yang jujur.',
    sub: 'Sundae Report meletakkan jualan, buruh dan bilangan tetamu anda berdepan restoran sebenar seperti anda - supaya "baik" berhenti menjadi tekaan.',
    alt: 'Ruang makan restoran bercahaya hangat semasa servis malam',
  },
};
