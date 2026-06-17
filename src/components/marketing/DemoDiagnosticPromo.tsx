"use client";

import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";
import type { WebsiteLocale } from "@/lib/i18n";

// Localized "want substance before the call" promo on /demo, pointing to the
// Operations Diagnostic. Native transcreation per locale.
type Promo = { badge: string; title: string; description: string; cta: string; disclaimer: string };

const promoCopy: Record<WebsiteLocale, Promo> = {
  "en": {
    "badge": "✦ Recommended · 10 minutes · Premium report",
    "title": "Want substance before the call?",
    "description": "Take the Sundae Operations Diagnostic - 20 strategic questions → personalized report showing the margin leaks we'd surface, the recommended stack, and a 30/60/90 plan. Same outcome as a discovery call, on your time, with a shareable artifact at the end.",
    "cta": "Start your diagnostic",
    "disclaimer": "No credit card · Output is a directional read, never a promise"
  },
  "fr": {
    "badge": "✦ Recommandé · 10 minutes · Rapport premium",
    "title": "Envie de fond avant l'échange ?",
    "description": "Lancez l'Operations Diagnostic de Sundae - 20 questions stratégiques → un rapport personnalisé qui révèle les fuites de marge que nous identifierions, la stack recommandée et un plan 30/60/90. Le même résultat qu'un appel de découverte, à votre rythme, avec un livrable partageable à la clé.",
    "cta": "Lancer votre diagnostic",
    "disclaimer": "Sans carte bancaire · Une lecture directionnelle, jamais une promesse"
  },
  "es": {
    "badge": "✦ Recomendado · 10 minutos · Informe premium",
    "title": "¿Quieres sustancia antes de la llamada?",
    "description": "Realiza el Operations Diagnostic de Sundae - 20 preguntas estratégicas → un informe personalizado que muestra las fugas de margen que detectaríamos, la stack recomendada y un plan de 30/60/90. El mismo resultado que una llamada de descubrimiento, a tu ritmo y con un entregable que puedes compartir al final.",
    "cta": "Inicia tu diagnóstico",
    "disclaimer": "Sin tarjeta de crédito · Es una lectura orientativa, nunca una promesa"
  },
  "de": {
    "badge": "✦ Empfohlen · 10 Minuten · Premium-Report",
    "title": "Substanz vor dem Gespräch?",
    "description": "Starten Sie das Sundae Operations Diagnostic - 20 strategische Fragen → ein personalisierter Report, der die Margenlecks zeigt, die wir aufdecken würden, die empfohlene Stack und einen 30/60/90-Plan. Dasselbe Ergebnis wie ein Erstgespräch, in Ihrem Tempo, mit einem teilbaren Ergebnis am Ende.",
    "cta": "Diagnostic starten",
    "disclaimer": "Keine Kreditkarte · Eine richtungsweisende Einschätzung, niemals ein Versprechen"
  },
  "nl": {
    "badge": "✦ Aanbevolen · 10 minuten · Premium rapport",
    "title": "Liever inhoud vóór het gesprek?",
    "description": "Doe de Sundae Operations Diagnostic - 20 strategische vragen → een persoonlijk rapport dat de margelekken laat zien die wij zouden blootleggen, de aanbevolen stack en een 30/60/90-plan. Hetzelfde resultaat als een kennismakingsgesprek, op jouw tempo, met een deelbaar eindproduct.",
    "cta": "Start je diagnostic",
    "disclaimer": "Geen creditcard · Een richtinggevende inschatting, nooit een belofte"
  },
  "pt": {
    "badge": "✦ Recomendado · 10 minutos · Relatório premium",
    "title": "Quer substância antes da conversa?",
    "description": "Faça o Operations Diagnostic da Sundae - 20 perguntas estratégicas → um relatório personalizado que mostra as fugas de margem que identificaríamos, a stack recomendada e um plano de 30/60/90. O mesmo resultado de uma reunião de descoberta, no seu ritmo, com um entregável partilhável no final.",
    "cta": "Inicie o seu diagnóstico",
    "disclaimer": "Sem cartão de crédito · Uma leitura orientativa, nunca uma promessa"
  },
  "it": {
    "badge": "✦ Consigliato · 10 minuti · Report premium",
    "title": "Vuoi sostanza prima della call?",
    "description": "Fai l'Operations Diagnostic di Sundae - 20 domande strategiche → un report personalizzato che mostra le perdite di margine che faremmo emergere, lo stack consigliato e un piano 30/60/90. Lo stesso risultato di una discovery call, con i tuoi tempi e un output condivisibile alla fine.",
    "cta": "Avvia il tuo diagnostic",
    "disclaimer": "Nessuna carta di credito · Una lettura orientativa, mai una promessa"
  },
  "ar": {
    "badge": "✦ موصى به · 10 دقائق · تقرير متميز",
    "title": "تريد جوهراً قبل المكالمة؟",
    "description": "ابدأ Operations Diagnostic من Sundae - 20 سؤالاً استراتيجياً → تقرير مخصّص يكشف تسرّبات الهامش التي سنرصدها، والحزمة الموصى بها، وخطة 30/60/90. النتيجة نفسها التي تحصل عليها من مكالمة استكشافية، وفق وقتك، مع مخرَج قابل للمشاركة في النهاية.",
    "cta": "ابدأ تشخيصك",
    "disclaimer": "بدون بطاقة ائتمان · قراءة توجيهية، وليست وعداً أبداً"
  },
  "pl": {
    "badge": "✦ Polecane · 10 minut · Raport premium",
    "title": "Chcesz konkretów przed rozmową?",
    "description": "Wykonaj Sundae Operations Diagnostic - 20 strategicznych pytań → spersonalizowany raport pokazujący wycieki marży, które byśmy ujawnili, rekomendowany zestaw narzędzi oraz plan 30/60/90. Ten sam efekt co rozmowa wstępna, w Twoim czasie, z gotowym dokumentem do udostępnienia na końcu.",
    "cta": "Rozpocznij diagnostykę",
    "disclaimer": "Bez karty kredytowej · Wynik to wskazanie kierunku, nigdy obietnica"
  },
  "tr": {
    "badge": "✦ Önerilen · 10 dakika · Premium rapor",
    "title": "Görüşmeden önce somut bir şey ister misiniz?",
    "description": "Sundae Operations Diagnostic'i tamamlayın - 20 stratejik soru → ortaya çıkaracağımız marj kayıplarını, önerdiğimiz kurguyu ve bir 30/60/90 planını gösteren kişiselleştirilmiş bir rapor. Bir tanışma görüşmesiyle aynı sonuç, kendi zamanınızda ve sonunda paylaşılabilir bir çıktıyla.",
    "cta": "Tanılamayı başlatın",
    "disclaimer": "Kredi kartı gerekmez · Çıktı yön gösteren bir okumadır, asla bir vaat değil"
  },
  "zh-Hans": {
    "badge": "✦ 推荐 · 10 分钟 · 高级报告",
    "title": "想在通话前先看到实质内容？",
    "description": "完成 Sundae Operations Diagnostic - 20 个战略问题 → 一份个性化报告，呈现我们将发现的利润流失点、推荐的方案组合，以及一份 30/60/90 计划。与一次需求沟通同样的成效，按你的节奏进行，最终还有一份可分享的成果。",
    "cta": "开始你的诊断",
    "disclaimer": "无需信用卡 · 输出为方向性判断，绝非承诺"
  },
  "ja": {
    "badge": "✦ おすすめ · 10 分 · プレミアムレポート",
    "title": "通話の前に、確かな手応えを得たいですか？",
    "description": "Sundae Operations Diagnostic を受けてみてください - 20 の戦略的な質問 → 私たちが見つけ出す利益の漏れ、推奨する構成、そして 30/60/90 のプランを示すパーソナライズされたレポートが得られます。商談と同じ成果を、あなたのペースで、最後には共有できる成果物とともに。",
    "cta": "診断を始める",
    "disclaimer": "クレジットカード不要 · 出力は方向性を示す見立てであり、約束ではありません"
  },
  "ko": {
    "badge": "✦ 추천 · 10분 · 프리미엄 리포트",
    "title": "통화 전에 실질적인 내용을 확인하고 싶으신가요?",
    "description": "Sundae Operations Diagnostic을 진행해 보세요 - 20개의 전략 질문 → 우리가 찾아낼 마진 누수, 추천 구성, 그리고 30/60/90 플랜을 담은 맞춤형 리포트를 받아보실 수 있습니다. 디스커버리 콜과 동일한 성과를, 원하는 시간에, 마지막에는 공유 가능한 결과물과 함께.",
    "cta": "진단 시작하기",
    "disclaimer": "신용카드 불필요 · 결과물은 방향을 제시하는 판단이며, 결코 약속이 아닙니다"
  },
  "ro": {
    "badge": "✦ Recomandat · 10 minute · Raport premium",
    "title": "Vrei substanță înainte de discuție?",
    "description": "Parcurge Sundae Operations Diagnostic - 20 de întrebări strategice → un raport personalizat care arată pierderile de marjă pe care le-am scoate la iveală, configurația recomandată și un plan 30/60/90. Același rezultat ca o discuție de descoperire, în ritmul tău, cu un document pe care îl poți distribui la final.",
    "cta": "Începe diagnosticul",
    "disclaimer": "Fără card de credit · Rezultatul este o estimare orientativă, niciodată o promisiune"
  },
  "sv": {
    "badge": "✦ Rekommenderat · 10 minuter · Premiumrapport",
    "title": "Vill du ha substans innan samtalet?",
    "description": "Gör Sundae Operations Diagnostic - 20 strategiska frågor → en personlig rapport som visar de marginalläckor vi skulle lyfta fram, den rekommenderade uppsättningen och en 30/60/90-plan. Samma resultat som ett första samtal, i din egen takt, med ett delbart underlag på slutet.",
    "cta": "Starta din diagnostik",
    "disclaimer": "Inget kreditkort · Resultatet är en vägledande bedömning, aldrig ett löfte"
  },
  "hi": {
    "badge": "✦ अनुशंसित · 10 मिनट · प्रीमियम रिपोर्ट",
    "title": "कॉल से पहले ठोस आधार चाहिए?",
    "description": "Sundae Operations Diagnostic लें - 20 रणनीतिक सवाल → एक व्यक्तिगत रिपोर्ट जो दिखाती है कि हम कौन-से मार्जिन रिसाव उजागर करेंगे, अनुशंसित स्टैक क्या होगा, और एक 30/60/90 योजना। डिस्कवरी कॉल जैसा ही नतीजा, आपके समय पर, और अंत में एक साझा करने योग्य आर्टिफैक्ट के साथ।",
    "cta": "अपना डायग्नोस्टिक शुरू करें",
    "disclaimer": "कोई क्रेडिट कार्ड नहीं · नतीजा एक दिशात्मक आकलन है, कोई वादा नहीं"
  },
  "ur": {
    "badge": "✦ تجویز کردہ · 10 منٹ · پریمیم رپورٹ",
    "title": "کال سے پہلے ٹھوس بنیاد چاہیے؟",
    "description": "Sundae Operations Diagnostic لیں - 20 حکمتِ عملی سوالات → ایک ذاتی رپورٹ جو دکھاتی ہے کہ ہم کون سے مارجن لیک سامنے لائیں گے، تجویز کردہ اسٹیک کیا ہوگا، اور ایک 30/60/90 منصوبہ۔ ڈسکوری کال جیسا ہی نتیجہ، آپ کے وقت پر، اور آخر میں ایک قابلِ اشتراک آرٹیفیکٹ کے ساتھ۔",
    "cta": "اپنی ڈائیگنوسٹک شروع کریں",
    "disclaimer": "کوئی کریڈٹ کارڈ نہیں · نتیجہ ایک سمتی اندازہ ہے، کوئی وعدہ نہیں"
  },
  "id": {
    "badge": "✦ Direkomendasikan · 10 menit · Laporan premium",
    "title": "Ingin dasar yang kuat sebelum panggilan?",
    "description": "Ambil Sundae Operations Diagnostic - 20 pertanyaan strategis → laporan personal yang menunjukkan kebocoran margin yang akan kami ungkap, stack yang direkomendasikan, dan rencana 30/60/90. Hasil yang sama seperti discovery call, sesuai waktu Anda, dengan artefak yang bisa dibagikan di akhir.",
    "cta": "Mulai diagnostik Anda",
    "disclaimer": "Tanpa kartu kredit · Hasilnya adalah pembacaan arah, bukan janji"
  },
  "vi": {
    "badge": "✦ Được đề xuất · 10 phút · Báo cáo cao cấp",
    "title": "Muốn có nền tảng vững chắc trước buổi gọi?",
    "description": "Thực hiện Sundae Operations Diagnostic - 20 câu hỏi chiến lược → báo cáo cá nhân hóa chỉ ra những điểm thất thoát biên lợi nhuận mà chúng tôi sẽ phát hiện, bộ giải pháp được đề xuất, và kế hoạch 30/60/90. Cùng kết quả như một buổi discovery call, theo thời gian của bạn, kèm một tài liệu có thể chia sẻ ở cuối.",
    "cta": "Bắt đầu chẩn đoán của bạn",
    "disclaimer": "Không cần thẻ tín dụng · Kết quả là một đánh giá định hướng, không phải lời hứa"
  },
  "bn": {
    "badge": "✦ প্রস্তাবিত · 10 মিনিট · প্রিমিয়াম রিপোর্ট",
    "title": "কলের আগে শক্ত ভিত্তি চান?",
    "description": "Sundae Operations Diagnostic নিন - 20টি কৌশলগত প্রশ্ন → একটি ব্যক্তিগত রিপোর্ট যা দেখায় আমরা কোন মার্জিন লিকগুলো সামনে আনব, প্রস্তাবিত স্ট্যাক কী, এবং একটি 30/60/90 পরিকল্পনা। ডিসকভারি কলের মতোই ফলাফল, আপনার সময়মতো, শেষে একটি শেয়ারযোগ্য আর্টিফ্যাক্ট সহ।",
    "cta": "আপনার ডায়াগনস্টিক শুরু করুন",
    "disclaimer": "কোনো ক্রেডিট কার্ড নয় · ফলাফল একটি দিকনির্দেশক পাঠ, কখনও প্রতিশ্রুতি নয়"
  },
  "th": {
    "badge": "✦ แนะนำ · 10 นาที · รายงานระดับพรีเมียม",
    "title": "อยากมีข้อมูลที่จับต้องได้ก่อนคุยกันไหม?",
    "description": "ทำ Sundae Operations Diagnostic - 20 คำถามเชิงกลยุทธ์ → รายงานเฉพาะบุคคลที่แสดงจุดรั่วไหลของมาร์จิ้นที่เราจะค้นพบ ชุดเครื่องมือที่แนะนำ และแผน 30/60/90 ได้ผลลัพธ์เหมือนการคุย discovery call ในเวลาของคุณเอง พร้อมเอกสารที่แชร์ได้ในตอนท้าย",
    "cta": "เริ่มการวินิจฉัยของคุณ",
    "disclaimer": "ไม่ต้องใช้บัตรเครดิต · ผลลัพธ์เป็นการประเมินเชิงทิศทาง ไม่ใช่คำสัญญา"
  },
  "ms": {
    "badge": "✦ Disyorkan · 10 minit · Laporan premium",
    "title": "Mahu asas yang kukuh sebelum panggilan?",
    "description": "Ambil Sundae Operations Diagnostic - 20 soalan strategik → laporan peribadi yang menunjukkan kebocoran margin yang akan kami dedahkan, stack yang disyorkan, dan pelan 30/60/90. Hasil yang sama seperti panggilan discovery, mengikut masa anda, dengan artifak yang boleh dikongsi pada akhirnya.",
    "cta": "Mulakan diagnostik anda",
    "disclaimer": "Tiada kad kredit · Hasilnya ialah bacaan berarah, bukan janji"
  }
};

export function DemoDiagnosticPromo() {
  const { locale } = useWebsiteI18n();
  const c = promoCopy[locale] ?? promoCopy.en;
  return (
    <section className="px-4 sm:px-6 lg:px-8 pb-16">
      <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-[var(--warm-coral)]/15 via-[var(--warm-coral)]/8 to-emerald-500/8 border border-[var(--warm-coral)]/30 p-6 md:p-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--warm-coral)]/15 border border-[var(--warm-coral)]/30 mb-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--warm-coral)]">
            {c.badge}
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-3 text-balance">
          {c.title}
        </h2>
        <p className="text-base text-[var(--text-supporting)] mb-6 max-w-2xl mx-auto">
          {c.description}
        </p>
        <a
          href="/diagnostic"
          className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[var(--warm-coral)] to-emerald-500 text-white font-bold rounded-xl shadow-xl shadow-[var(--warm-coral)]/20 hover:shadow-[var(--warm-coral)]/40 transition-all"
        >
          {c.cta}
          <span aria-hidden>→</span>
        </a>
        <p className="text-[11px] text-[var(--text-muted)] mt-3">
          {c.disclaimer}
        </p>
      </div>
    </section>
  );
}
