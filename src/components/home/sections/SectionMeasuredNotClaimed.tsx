"use client";

import { motion } from "framer-motion";
import { useSettledReducedMotion as useReducedMotion } from "@/lib/useSettledReducedMotion";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";
import { getLocalizedCopy, type RequiredEnglishLocalizedRecord } from "@/lib/i18n";

/**
 * Beat 5 - "Identified is not recovered."
 *
 * The differentiator the homepage never made. Every competitor can flag a
 * problem; almost none will state, in public, that they refuse to call a
 * saving real until it has been measured against a baseline frozen before
 * the work started. Both customer documents lead on exactly this, and the
 * page had no equivalent.
 *
 * Deliberately quiet: three plain claims and an escalating attribution
 * ladder. The restraint is the argument. Nothing here is a number the page
 * cannot stand behind, and the ladder ends at a state Sundae will not award
 * itself.
 */

type Rung = { label: string; note: string };
type MeasuredCopy = {
  eyebrow: string;
  headlineLead: string;
  headlineEmphasis: string;
  sub: string;
  ladderLabel: string;
  rungs: Rung[];
  closer: string;
};

const copy: RequiredEnglishLocalizedRecord<MeasuredCopy> = {
  en: {
    eyebrow: "Measure and learn",
    headlineLead: "Spotting the loss is the easy part.",
    headlineEmphasis: "Getting the money back is the job.",
    sub: "Most tools stop at the alert. Sundae opens the records behind it, names the item that is costing you, hands the job to one person, and writes down the number to beat before they start.",
    ladderLabel: "How much you can trust a number",
    rungs: [
      { label: "Measuring", note: "Work has started. We noted where the number was, so there is something to compare against." },
      { label: "Directional", note: "The number moved. We can show by how much - but we will not yet say the work caused it." },
      { label: "Operator confirmed", note: "The person who did the work says it worked." },
      { label: "Independently verified", note: "Someone else checked it against the evidence and agreed." },
    ],
    closer: "Sundae will not call money recovered until it is measured, or verified until someone else has checked it. Where the data cannot tell, it says so.",
  },
  de: {
    eyebrow: "Messen und lernen",
    headlineLead: "Den Verlust zu sehen ist der leichte Teil.",
    headlineEmphasis: "Das Geld zurückzuholen ist die Arbeit.",
    sub: "Die meisten Werkzeuge hören bei der Warnung auf. Sundae öffnet die Belege dahinter, benennt den Artikel, der Sie Geld kostet, gibt die Aufgabe an eine Person und notiert die Zahl, die es zu schlagen gilt, bevor sie anfängt.",
    ladderLabel: "Wie weit Sie einer Zahl trauen können",
    rungs: [
      { label: "Wird gemessen", note: "Die Arbeit läuft. Wir haben festgehalten, wo die Zahl stand, damit es etwas zum Vergleichen gibt." },
      { label: "Richtungweisend", note: "Die Zahl hat sich bewegt. Wir können zeigen, um wie viel - sagen aber noch nicht, dass die Arbeit es bewirkt hat." },
      { label: "Vom Betrieb bestätigt", note: "Die Person, die es gemacht hat, sagt, dass es gewirkt hat." },
      { label: "Unabhängig geprüft", note: "Jemand anderes hat es gegen die Belege geprüft und zugestimmt." },
    ],
    closer: "Sundae nennt Geld erst zurückgeholt, wenn es gemessen ist, und erst geprüft, wenn jemand anderes nachgesehen hat. Wo die Daten es nicht hergeben, sagt Sundae das.",
  },
  fr: {
    eyebrow: "Mesurer et apprendre",
    headlineLead: "Voir la perte, c'est la partie facile.",
    headlineEmphasis: "Récupérer l'argent, c'est le travail.",
    sub: "La plupart des outils s'arrêtent à l'alerte. Sundae ouvre les écritures derrière, nomme le plat qui vous coûte, confie la tâche à une personne et note le chiffre à battre avant qu'elle ne commence.",
    ladderLabel: "Jusqu'où faire confiance à un chiffre",
    rungs: [
      { label: "En cours de mesure", note: "Le travail a commencé. Nous avons noté où en était le chiffre, pour avoir un point de comparaison." },
      { label: "Indicatif", note: "Le chiffre a bougé. Nous pouvons montrer de combien, sans encore dire que le travail en est la cause." },
      { label: "Confirmé par l'exploitant", note: "La personne qui a fait le travail dit que ça a marché." },
      { label: "Vérifié indépendamment", note: "Quelqu'un d'autre l'a recoupé avec les preuves et l'a validé." },
    ],
    closer: "Sundae ne parle d'argent récupéré qu'une fois mesuré, et de vérifié qu'une fois recoupé par quelqu'un d'autre. Là où les données ne tranchent pas, Sundae le dit.",
  },
  es: {
    eyebrow: "Medir y aprender",
    headlineLead: "Ver la pérdida es lo fácil.",
    headlineEmphasis: "Recuperar el dinero es el trabajo.",
    sub: "La mayoría de las herramientas se paran en la alerta. Sundae abre los apuntes que hay detrás, nombra el plato que te está costando, encarga la tarea a una persona y anota la cifra a batir antes de que empiece.",
    ladderLabel: "Cuánto puedes fiarte de una cifra",
    rungs: [
      { label: "Midiendo", note: "El trabajo ha empezado. Hemos anotado dónde estaba la cifra, para tener con qué comparar." },
      { label: "Orientativo", note: "La cifra se ha movido. Podemos enseñar cuánto, pero aún no decimos que el trabajo lo haya causado." },
      { label: "Confirmado por el operador", note: "La persona que hizo el trabajo dice que funcionó." },
      { label: "Verificado de forma independiente", note: "Otra persona lo contrastó con las pruebas y dio el visto bueno." },
    ],
    closer: "Sundae no habla de dinero recuperado hasta medirlo, ni de verificado hasta que otra persona lo comprueba. Donde los datos no llegan, lo dice.",
  },
  ar: {
    eyebrow: "القياس والتعلّم",
    headlineLead: "رؤية الخسارة هي الجزء السهل.",
    headlineEmphasis: "استرجاع المال هو العمل.",
    sub: "معظم الأدوات تتوقف عند التنبيه. أما Sundae فيفتح القيود خلفه، ويسمّي الصنف الذي يكلّفك، ويسند المهمة إلى شخص واحد، ويدوّن الرقم المطلوب تجاوزه قبل أن يبدأ.",
    ladderLabel: "إلى أي حد يمكن الوثوق برقم",
    rungs: [
      { label: "قيد القياس", note: "بدأ العمل. وقد دوّنّا أين كان الرقم، ليكون هناك ما يُقارَن به." },
      { label: "استرشادي", note: "تحرّك الرقم. يمكننا أن نُظهر بكم تحرّك - لكننا لا نقول بعد إن العمل هو السبب." },
      { label: "مؤكَّد من المشغّل", note: "الشخص الذي نفّذ العمل يقول إنه نجح." },
      { label: "مُتحقَّق منه باستقلال", note: "شخص آخر راجعه مقابل الأدلة ووافق." },
    ],
    closer: "لا يعتبر Sundae المال مستَرجعاً قبل أن يُقاس، ولا مُتحقَّقاً منه قبل أن يراجعه شخص آخر. وحيث لا تكفي البيانات، يقول ذلك.",
  },
  nl: {
    eyebrow: "Meten en leren",
    headlineLead: "De schade zien is het makkelijke deel.",
    headlineEmphasis: "Het geld terughalen is het werk.",
    sub: "De meeste tools stoppen bij de melding. Sundae opent de boekingen erachter, benoemt het gerecht dat je geld kost, geeft de klus aan één persoon en noteert het getal dat verslagen moet worden voordat die begint.",
    ladderLabel: "Hoever je een getal kunt vertrouwen",
    rungs: [
      { label: "Wordt gemeten", note: "Het werk is begonnen. We hebben genoteerd waar het getal stond, zodat er iets te vergelijken valt." },
      { label: "Richtinggevend", note: "Het getal is bewogen. We kunnen laten zien hoeveel, maar zeggen nog niet dat het werk dat deed." },
      { label: "Bevestigd door de operator", note: "De persoon die het werk deed zegt dat het werkte." },
      { label: "Onafhankelijk geverifieerd", note: "Iemand anders heeft het tegen het bewijs gelegd en beaamd." },
    ],
    closer: "Sundae noemt geld pas teruggehaald als het gemeten is, en pas geverifieerd als iemand anders het heeft nagekeken. Waar de data het niet zegt, zegt Sundae dat.",
  },
  pt: {
    eyebrow: "Medir e aprender",
    headlineLead: "Ver a perda é a parte fácil.",
    headlineEmphasis: "Recuperar o dinheiro é o trabalho.",
    sub: "A maioria das ferramentas para no alerta. O Sundae abre os lançamentos por trás, nomeia o prato que lhe está a custar, entrega a tarefa a uma pessoa e anota o número a bater antes de ela começar.",
    ladderLabel: "Até onde se pode confiar num número",
    rungs: [
      { label: "Em medição", note: "O trabalho começou. Anotámos onde estava o número, para haver com que comparar." },
      { label: "Indicativo", note: "O número mexeu. Conseguimos mostrar quanto, mas ainda não dizemos que foi o trabalho que o moveu." },
      { label: "Confirmado pelo operador", note: "A pessoa que fez o trabalho diz que resultou." },
      { label: "Verificado de forma independente", note: "Outra pessoa confrontou com as provas e concordou." },
    ],
    closer: "O Sundae só fala em dinheiro recuperado depois de medido, e em verificado depois de outra pessoa conferir. Onde os dados não dizem, o Sundae diz isso.",
  },
  it: {
    eyebrow: "Misurare e imparare",
    headlineLead: "Vedere la perdita è la parte facile.",
    headlineEmphasis: "Recuperare i soldi è il lavoro.",
    sub: "La maggior parte degli strumenti si ferma all'avviso. Sundae apre le registrazioni dietro, nomina il piatto che ti sta costando, affida il compito a una persona e annota il numero da battere prima che inizi.",
    ladderLabel: "Quanto ci si può fidare di un numero",
    rungs: [
      { label: "In misurazione", note: "Il lavoro è partito. Abbiamo annotato dov'era il numero, così c'è qualcosa con cui confrontarlo." },
      { label: "Indicativo", note: "Il numero si è mosso. Possiamo mostrare di quanto, ma non diciamo ancora che sia stato il lavoro." },
      { label: "Confermato dall'operatore", note: "Chi ha fatto il lavoro dice che ha funzionato." },
      { label: "Verificato in modo indipendente", note: "Un'altra persona lo ha riscontrato con le prove ed è d'accordo." },
    ],
    closer: "Sundae parla di soldi recuperati solo dopo averli misurati, e di verificato solo dopo che qualcun altro ha controllato. Dove i dati non bastano, lo dice.",
  },
  pl: {
    eyebrow: "Mierz i ucz się",
    headlineLead: "Zobaczyć stratę to łatwa część.",
    headlineEmphasis: "Odzyskać pieniądze to robota.",
    sub: "Większość narzędzi kończy na alercie. Sundae otwiera zapisy, które za nim stoją, wskazuje pozycję, która cię kosztuje, oddaje zadanie jednej osobie i zapisuje liczbę do pobicia, zanim ta zacznie.",
    ladderLabel: "Na ile można ufać liczbie",
    rungs: [
      { label: "W pomiarze", note: "Praca ruszyła. Zapisaliśmy, gdzie była liczba, żeby było z czym porównać." },
      { label: "Kierunkowo", note: "Liczba się ruszyła. Możemy pokazać o ile, ale jeszcze nie mówimy, że sprawiła to ta praca." },
      { label: "Potwierdzone przez operatora", note: "Osoba, która wykonała pracę, mówi, że zadziałało." },
      { label: "Zweryfikowane niezależnie", note: "Ktoś inny zestawił to z dowodami i się zgodził." },
    ],
    closer: "Sundae nie mówi o odzyskanych pieniądzach, dopóki ich nie zmierzy, ani o zweryfikowanych, dopóki nie sprawdzi ich ktoś inny. Gdzie dane nie rozstrzygają, mówi to wprost.",
  },
  tr: {
    eyebrow: "Ölç ve öğren",
    headlineLead: "Kaybı görmek işin kolay kısmı.",
    headlineEmphasis: "Parayı geri getirmek asıl iş.",
    sub: "Çoğu araç uyarıda durur. Sundae arkasındaki kayıtları açar, size para kaybettiren ürünü adıyla söyler, işi tek bir kişiye verir ve o başlamadan önce aşılması gereken sayıyı not eder.",
    ladderLabel: "Bir sayıya ne kadar güvenilir",
    rungs: [
      { label: "Ölçülüyor", note: "İş başladı. Sayının nerede olduğunu not ettik, karşılaştıracak bir şey olsun diye." },
      { label: "Yön gösterici", note: "Sayı hareket etti. Ne kadar olduğunu gösterebiliriz - ama henüz sebebi bu iş demiyoruz." },
      { label: "İşletmeci onayladı", note: "İşi yapan kişi işe yaradığını söylüyor." },
      { label: "Bağımsız doğrulandı", note: "Bir başkası kanıtlarla karşılaştırdı ve katıldı." },
    ],
    closer: "Sundae ölçmeden paraya geri kazanıldı demez, bir başkası kontrol etmeden doğrulandı demez. Verinin söyleyemediği yerde bunu açıkça söyler.",
  },
  "zh-Hans": {
    eyebrow: "衡量与学习",
    headlineLead: "看见亏损是容易的部分。",
    headlineEmphasis: "把钱拿回来才是活儿。",
    sub: "多数工具停在告警。Sundae 会打开背后的单据，指名是哪个单品在让你亏钱，把这件事交给一个人，并在他动手之前先记下要超过的那个数字。",
    ladderLabel: "一个数字能信到什么程度",
    rungs: [
      { label: "衡量中", note: "活儿开始了。我们记下了当时的数字，好有个对照。" },
      { label: "方向性", note: "数字动了。我们能告诉你动了多少，但还不会说是这件事让它动的。" },
      { label: "运营者确认", note: "做这件事的人说，有效。" },
      { label: "独立复核", note: "另一个人对着凭证核过，并且同意。" },
    ],
    closer: "没有量出来，Sundae 不会说钱追回来了；没有第二个人核过，也不会说已复核。数据说不清的地方，它就直说。",
  },
  ja: {
    eyebrow: "測って学ぶ",
    headlineLead: "損失に気づくのは簡単な方です。",
    headlineEmphasis: "取り戻すのが仕事です。",
    sub: "多くのツールは警告で止まります。Sundae はその裏の伝票まで開き、損を出している商品を名指しし、対応を一人に任せ、その人が動き出す前に「超えるべき数字」を書き留めます。",
    ladderLabel: "その数字をどこまで信じられるか",
    rungs: [
      { label: "測定中", note: "作業が始まりました。比較できるよう、その時点の数字を記録してあります。" },
      { label: "方向性", note: "数字が動きました。どれだけ動いたかは示せますが、その作業が動かしたとはまだ言いません。" },
      { label: "担当者が確認", note: "その作業をした本人が、効いたと言っています。" },
      { label: "第三者が検証", note: "別の人が証跡と突き合わせ、同意しました。" },
    ],
    closer: "測るまで、Sundae は「取り戻した」とは言いません。誰かが確かめるまで「検証済み」とも言いません。データで判断できないときは、そう申し上げます。",
  },
  ko: {
    eyebrow: "측정하고 배우기",
    headlineLead: "손실을 발견하는 건 쉬운 쪽입니다.",
    headlineEmphasis: "돈을 되찾는 게 일입니다.",
    sub: "대부분의 도구는 알림에서 멈춥니다. Sundae는 그 뒤의 전표를 열고, 돈을 새게 하는 품목을 짚어내고, 그 일을 한 사람에게 맡기고, 그 사람이 시작하기 전에 넘어야 할 숫자를 적어 둡니다.",
    ladderLabel: "숫자를 어디까지 믿을 수 있나",
    rungs: [
      { label: "측정 중", note: "작업이 시작됐습니다. 비교할 기준이 있도록, 그때의 숫자를 적어 두었습니다." },
      { label: "방향성", note: "숫자가 움직였습니다. 얼마나 움직였는지는 보여드릴 수 있지만, 그 작업 때문이라고는 아직 말하지 않습니다." },
      { label: "운영자 확인", note: "그 일을 한 사람이 효과가 있었다고 말합니다." },
      { label: "독립 검증", note: "다른 사람이 증빙과 대조해 확인했습니다." },
    ],
    closer: "측정하기 전에는 되찾았다고 하지 않고, 다른 사람이 확인하기 전에는 검증됐다고 하지 않습니다. 데이터로 알 수 없는 곳에서는 그렇다고 말합니다.",
  },
  hi: {
    eyebrow: "मापिए और सीखिए",
    headlineLead: "नुक़सान देख लेना आसान हिस्सा है।",
    headlineEmphasis: "पैसा वापस लाना असली काम है।",
    sub: "ज़्यादातर टूल अलर्ट पर रुक जाते हैं। Sundae उसके पीछे की एंट्रियाँ खोलता है, बताता है कौन-सा आइटम पैसा खा रहा है, काम एक व्यक्ति को सौंपता है, और उसके शुरू करने से पहले वह आँकड़ा लिख देता है जिसे पार करना है।",
    ladderLabel: "किसी आँकड़े पर कितना भरोसा करें",
    rungs: [
      { label: "माप जारी", note: "काम शुरू हो चुका है। हमने लिख लिया कि आँकड़ा कहाँ था, ताकि तुलना करने को कुछ हो।" },
      { label: "दिशासूचक", note: "आँकड़ा हिला है। कितना हिला यह दिखा सकते हैं - पर अभी यह नहीं कहेंगे कि इसी काम ने हिलाया।" },
      { label: "ऑपरेटर ने पुष्टि की", note: "जिसने काम किया, वही कह रहा है कि काम आया।" },
      { label: "स्वतंत्र रूप से जाँचा", note: "किसी और ने प्रमाणों से मिलाकर देखा और सहमत हुआ।" },
    ],
    closer: "मापे बिना Sundae यह नहीं कहेगा कि पैसा वापस आया, और किसी और की जाँच के बिना यह नहीं कहेगा कि सत्यापित है। जहाँ डेटा नहीं बता सकता, वहाँ वह यही कहता है।",
  },
  ur: {
    eyebrow: "ماپیے اور سیکھیے",
    headlineLead: "نقصان دیکھ لینا آسان حصہ ہے۔",
    headlineEmphasis: "پیسہ واپس لانا اصل کام ہے۔",
    sub: "زیادہ تر ٹولز الرٹ پر رک جاتے ہیں۔ Sundae اُس کے پیچھے کی اندراجات کھولتا ہے، بتاتا ہے کون سا آئٹم پیسہ کھا رہا ہے، کام ایک شخص کے سپرد کرتا ہے، اور اُس کے شروع کرنے سے پہلے وہ عدد لکھ دیتا ہے جسے عبور کرنا ہے۔",
    ladderLabel: "کسی عدد پر کتنا بھروسہ کیا جائے",
    rungs: [
      { label: "ماپا جا رہا ہے", note: "کام شروع ہو چکا ہے۔ ہم نے لکھ لیا کہ عدد کہاں تھا، تاکہ موازنے کو کچھ ہو۔" },
      { label: "سمت نما", note: "عدد ہلا ہے۔ کتنا ہلا یہ دکھا سکتے ہیں - مگر ابھی یہ نہیں کہیں گے کہ اِسی کام نے ہلایا۔" },
      { label: "آپریٹر نے تصدیق کی", note: "جس نے کام کیا، وہی کہتا ہے کہ کام آیا۔" },
      { label: "آزادانہ تصدیق شدہ", note: "کسی اور نے شواہد سے ملا کر دیکھا اور اتفاق کیا۔" },
    ],
    closer: "ماپے بغیر Sundae یہ نہیں کہے گا کہ پیسہ واپس آیا، اور کسی اور کی جانچ کے بغیر یہ نہیں کہے گا کہ تصدیق شدہ ہے۔ جہاں ڈیٹا نہ بتا سکے، وہاں وہ یہی کہتا ہے۔",
  },
  id: {
    eyebrow: "Ukur dan pelajari",
    headlineLead: "Melihat kerugian itu bagian mudahnya.",
    headlineEmphasis: "Menariknya kembali itu pekerjaannya.",
    sub: "Sebagian besar alat berhenti di peringatan. Sundae membuka catatan di baliknya, menyebut item yang menggerus uang Anda, menyerahkan tugasnya ke satu orang, dan mencatat angka yang harus dilampaui sebelum orang itu mulai.",
    ladderLabel: "Seberapa jauh sebuah angka bisa dipercaya",
    rungs: [
      { label: "Sedang diukur", note: "Pekerjaan sudah mulai. Kami mencatat posisi angkanya, supaya ada pembandingnya." },
      { label: "Indikatif", note: "Angkanya bergerak. Kami bisa menunjukkan sebesar apa - tapi belum menyebut pekerjaan itu penyebabnya." },
      { label: "Dikonfirmasi operator", note: "Orang yang mengerjakannya bilang itu berhasil." },
      { label: "Diverifikasi independen", note: "Orang lain mencocokkannya dengan bukti dan setuju." },
    ],
    closer: "Sundae tidak menyebut uang kembali sebelum diukur, dan tidak menyebut terverifikasi sebelum orang lain memeriksanya. Bila datanya tidak bisa memastikan, Sundae mengatakannya.",
  },
  vi: {
    eyebrow: "Đo và học",
    headlineLead: "Nhìn ra khoản mất là phần dễ.",
    headlineEmphasis: "Lấy lại tiền mới là việc.",
    sub: "Phần lớn công cụ dừng ở cảnh báo. Sundae mở các bút toán phía sau, gọi tên món đang làm bạn mất tiền, giao việc cho một người, và ghi lại con số cần vượt trước khi người đó bắt đầu.",
    ladderLabel: "Tin được một con số tới đâu",
    rungs: [
      { label: "Đang đo", note: "Việc đã bắt đầu. Chúng tôi đã ghi lại con số lúc đó, để có cái mà đối chiếu." },
      { label: "Mang tính chỉ hướng", note: "Con số đã dịch chuyển. Chúng tôi cho bạn thấy dịch bao nhiêu, nhưng chưa nói là do việc ấy." },
      { label: "Người vận hành xác nhận", note: "Người trực tiếp làm nói rằng nó có hiệu quả." },
      { label: "Được kiểm chứng độc lập", note: "Một người khác đã đối chiếu với bằng chứng và đồng ý." },
    ],
    closer: "Sundae không gọi là đã thu hồi khi chưa đo, và không gọi là đã kiểm chứng khi chưa có người khác rà lại. Chỗ nào dữ liệu không nói được, Sundae nói thẳng.",
  },
  ro: {
    eyebrow: "Măsoară și învață",
    headlineLead: "Să vezi pierderea e partea ușoară.",
    headlineEmphasis: "Să recuperezi banii e treaba.",
    sub: "Majoritatea instrumentelor se opresc la alertă. Sundae deschide înregistrările din spate, numește produsul care te costă, dă sarcina unei singure persoane și notează cifra de bătut înainte ca aceasta să înceapă.",
    ladderLabel: "Cât de mult te poți baza pe o cifră",
    rungs: [
      { label: "În măsurare", note: "Munca a început. Am notat unde era cifra, ca să existe cu ce compara." },
      { label: "Orientativ", note: "Cifra s-a mișcat. Putem arăta cu cât - dar încă nu spunem că munca a mișcat-o." },
      { label: "Confirmat de operator", note: "Persoana care a făcut munca spune că a funcționat." },
      { label: "Verificat independent", note: "Altcineva a confruntat cu dovezile și a fost de acord." },
    ],
    closer: "Sundae nu spune că banii au fost recuperați până nu îi măsoară, nici verificat până nu verifică altcineva. Unde datele nu pot spune, o spune ca atare.",
  },
  sv: {
    eyebrow: "Mät och lär",
    headlineLead: "Att se förlusten är den lätta delen.",
    headlineEmphasis: "Att få tillbaka pengarna är jobbet.",
    sub: "De flesta verktyg stannar vid larmet. Sundae öppnar posterna bakom, pekar ut rätten som kostar er pengar, lägger uppgiften på en person och antecknar talet som ska slås innan hen börjar.",
    ladderLabel: "Hur långt ett tal går att lita på",
    rungs: [
      { label: "Mäts", note: "Arbetet har börjat. Vi antecknade var talet låg, så att det finns något att jämföra med." },
      { label: "Riktningsgivande", note: "Talet har rört sig. Vi kan visa hur mycket - men säger ännu inte att arbetet gjorde det." },
      { label: "Bekräftat av verksamheten", note: "Personen som gjorde jobbet säger att det fungerade." },
      { label: "Oberoende granskat", note: "Någon annan har stämt av mot underlaget och instämt." },
    ],
    closer: "Sundae säger inte att pengar återvunnits förrän det är mätt, och inte granskat förrän någon annan har kollat. Där data inte räcker säger Sundae det.",
  },
  bn: {
    eyebrow: "মাপুন আর শিখুন",
    headlineLead: "ক্ষতিটা চোখে পড়া সহজ অংশ।",
    headlineEmphasis: "টাকাটা ফিরিয়ে আনাই আসল কাজ।",
    sub: "বেশির ভাগ টুল সতর্কবার্তাতেই থেমে যায়। Sundae তার পেছনের হিসাবগুলো খোলে, কোন আইটেম আপনার টাকা খাচ্ছে তা নাম ধরে বলে, কাজটা একজনকে দেয়, আর সে শুরু করার আগেই যে সংখ্যাটা টপকাতে হবে তা লিখে রাখে।",
    ladderLabel: "একটি সংখ্যাকে কতটা বিশ্বাস করা যায়",
    rungs: [
      { label: "মাপা চলছে", note: "কাজ শুরু হয়েছে। সংখ্যাটা কোথায় ছিল তা লিখে রেখেছি, যাতে তুলনা করার মতো কিছু থাকে।" },
      { label: "দিকনির্দেশক", note: "সংখ্যাটা নড়েছে। কতটা নড়েছে দেখাতে পারি - তবে এখনও বলব না যে এই কাজই তা নড়িয়েছে।" },
      { label: "পরিচালক নিশ্চিত করেছেন", note: "যিনি কাজটা করেছেন, তিনিই বলছেন এটা কাজে দিয়েছে।" },
      { label: "স্বাধীনভাবে যাচাই", note: "অন্য একজন প্রমাণের সঙ্গে মিলিয়ে দেখে সম্মত হয়েছেন।" },
    ],
    closer: "না মেপে Sundae বলবে না টাকা ফিরেছে, আর অন্য কেউ না দেখা পর্যন্ত বলবে না যাচাই হয়েছে। ডেটা যেখানে বলতে পারে না, সেখানে সেটাই বলে।",
  },
  th: {
    eyebrow: "วัดผลและเรียนรู้",
    headlineLead: "เห็นว่าเสียตรงไหนคือส่วนที่ง่าย",
    headlineEmphasis: "เอาเงินกลับมาต่างหากคืองาน",
    sub: "เครื่องมือส่วนใหญ่หยุดที่การแจ้งเตือน Sundae เปิดรายการที่อยู่เบื้องหลัง ระบุชื่อเมนูที่ทำให้คุณเสียเงิน มอบงานให้คนคนเดียว และจดตัวเลขที่ต้องเอาชนะไว้ก่อนที่เขาจะเริ่ม",
    ladderLabel: "เชื่อตัวเลขได้แค่ไหน",
    rungs: [
      { label: "กำลังวัด", note: "งานเริ่มแล้ว เราจดไว้ว่าตัวเลขอยู่ตรงไหน จะได้มีอะไรไว้เทียบ" },
      { label: "บอกทิศทาง", note: "ตัวเลขขยับแล้ว เราบอกได้ว่าขยับเท่าไร แต่ยังไม่บอกว่างานนี้เป็นเหตุ" },
      { label: "ผู้ปฏิบัติงานยืนยัน", note: "คนที่ลงมือทำบอกว่ามันได้ผล" },
      { label: "ตรวจสอบโดยอิสระ", note: "อีกคนหนึ่งสอบทานกับหลักฐานแล้วเห็นตรงกัน" },
    ],
    closer: "ถ้ายังไม่ได้วัด Sundae จะไม่บอกว่าได้เงินคืน และถ้ายังไม่มีคนอื่นตรวจ ก็จะไม่บอกว่าผ่านการตรวจสอบ ตรงไหนที่ข้อมูลบอกไม่ได้ ก็จะบอกตามนั้น",
  },
  ms: {
    eyebrow: "Ukur dan pelajari",
    headlineLead: "Melihat kerugian itu bahagian mudah.",
    headlineEmphasis: "Mendapatkan wang itu kembali barulah kerjanya.",
    sub: "Kebanyakan alat berhenti pada amaran. Sundae membuka catatan di sebaliknya, menamakan item yang merugikan anda, menyerahkan tugas kepada seorang, dan mencatat angka yang perlu diatasi sebelum dia bermula.",
    ladderLabel: "Sejauh mana sesuatu angka boleh dipercayai",
    rungs: [
      { label: "Sedang diukur", note: "Kerja sudah bermula. Kami catat di mana angka itu berada, supaya ada bahan perbandingan." },
      { label: "Menunjuk arah", note: "Angka itu bergerak. Kami boleh tunjukkan sebanyak mana - tetapi belum berkata kerja itu puncanya." },
      { label: "Disahkan pengendali", note: "Orang yang membuat kerja itu berkata ia berkesan." },
      { label: "Disahkan secara bebas", note: "Orang lain menyemaknya dengan bukti dan bersetuju." },
    ],
    closer: "Sundae tidak menyebut wang telah dipulihkan sebelum ia diukur, dan tidak menyebut disahkan sebelum orang lain menyemak. Di mana data tidak dapat memastikan, Sundae menyatakannya.",
  },
};

export function SectionMeasuredNotClaimed() {
  const { locale } = useWebsiteI18n();
  const c = getLocalizedCopy(copy, locale);
  const reduce = useReducedMotion();

  return (
    <section
      id="chapter-measured"
      aria-labelledby="measured-heading"
      className="scroll-mt-24 py-20 sm:py-28 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="eyebrow">
            {c.eyebrow}
          </p>
          <h2
            id="measured-heading"
            className="section-h2 mt-3 text-[var(--text-primary)] text-balance"
          >
            <span className="block">{c.headlineLead}</span>
            <span className="block text-[var(--text-display)]">{c.headlineEmphasis}</span>
          </h2>
          <p className="mt-5 max-w-[64ch] text-base sm:text-lg leading-relaxed text-[var(--text-supporting)]">
            {c.sub}
          </p>
        </motion.div>

        {/* The ladder is the proof: each rung is a state the product actually
            tracks, and the last two are awarded by a person, never by Sundae.
            Rendered as an ascending ladder rather than a list, because the
            content is a progression of confidence - the shape should carry
            that, not just the words. Strength is derived from the rung index,
            so no new copy keys and all 22 locales get it for free. */}
        <div className="mt-12 sm:mt-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
            {c.ladderLabel}
          </p>

          <ol className="mt-6 grid gap-4 sm:gap-5 md:grid-cols-4">

            {c.rungs.map((r, i) => {
              const strength = i + 1;
              const attested = i >= 2; // confirmed / verified are human-awarded
              return (
                <motion.li
                  key={r.label}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: reduce ? 0 : i * 0.08 }}
                  className={[
                    "relative flex gap-4 rounded-2xl border p-5 md:flex-col md:gap-4",
                    attested
                      ? "border-[var(--trust-border)] bg-[var(--trust-bg)]"
                      : "border-[var(--border-default)] bg-[var(--surface-subtle)]",
                  ].join(" ")}
                >
                  {i < c.rungs.length - 1 && (
                    <span
                      aria-hidden
                      className={[
                        "absolute bg-[var(--border-default)]",
                        // sits in the gap, aligned to the centre of the discs
                        "left-10 -bottom-4 h-4 w-px sm:-bottom-5 sm:h-5",
                        "md:left-auto md:bottom-auto md:top-10 md:-right-5 md:h-px md:w-5",
                      ].join(" ")}
                    />
                  )}

                  <span
                    aria-hidden
                    className={[
                      "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border text-sm font-semibold tabular-nums",
                      attested
                        ? "border-[var(--trust)] bg-[var(--trust)] text-[var(--ink)]"
                        : "border-[var(--border-default)] bg-[var(--surface-faint)] text-[var(--text-muted)]",
                    ].join(" ")}
                  >
                    {strength}
                  </span>

                  <div className="min-w-0">
                    {/* Confidence meter - four segments, filled to this rung. */}
                    <span aria-hidden className="mb-3 flex gap-1">
                      {[0, 1, 2, 3].map((seg) => (
                        <span
                          key={seg}
                          className={[
                            "h-1 w-5 rounded-full",
                            seg < strength
                              ? attested
                                ? "bg-[var(--trust)]"
                                : "bg-[var(--text-muted)]"
                              : "bg-[var(--border-default)]",
                          ].join(" ")}
                        />
                      ))}
                    </span>
                    <h3 className="text-base font-semibold text-[var(--text-primary)]">
                      {r.label}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-muted)]">
                      {r.note}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>

        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          whileInView={reduce ? undefined : { opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mt-10 max-w-[70ch] border-t border-[var(--border-default)] pt-6 text-sm sm:text-base leading-relaxed text-[var(--text-supporting)]"
        >
          {c.closer}
        </motion.p>
      </div>
    </section>
  );
}
