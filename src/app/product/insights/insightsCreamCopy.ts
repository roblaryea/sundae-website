/**
 * Copy for the warm "cream relief" editorial band on the Insights marketing page.
 *
 * Hand-authored native transcreation per locale - NOT literal word-for-word - so
 * each line reads the way an operator in that market would actually say it. Follows
 * the self-contained creamReliefCopy.ts pattern: a locale-keyed map resolved at
 * render with an English fallback, kept out of the large per-locale i18n.ts trees.
 *
 * EMPHASIS MARKER: every `statement` carries exactly one `*...*` span around the
 * "what should I do next?" question (the emphasized phrase in the English source).
 * The renderer splits on `*` and italicizes the wrapped phrase. Each locale MUST
 * keep exactly one `*...*` pair around the equivalent emphasized phrase.
 *
 * Glossary discipline: the product name "Insights" stays untranslated in every
 * locale. The number "twelve" is rendered as the correct number word (or numeral
 * where idiomatic) for each language.
 *
 * Punctuation: normal hyphen "-" only - no em dashes, en dashes, ellipsis
 * characters, or zero-width characters. Arabic (ar) and Urdu (ur) are RTL; the
 * copy is written natively and the layout handles direction.
 */

export interface InsightsCreamCopy {
  eyebrow: string;
  /** Big editorial belief. The emphasized question is wrapped in `*...*`. */
  statement: string;
  lede: string;
}

export const insightsCreamCopy: Record<string, InsightsCreamCopy> = {
  en: {
    eyebrow: 'FROM DASHBOARDS TO DECISIONS',
    statement: 'Every module answers the one question that matters - *what should I do next?*',
    lede: 'Insights turns twelve streams of operational data into a single, clear next step for every role - on the floor and in the back office.',
  },
  ar: {
    eyebrow: 'من لوحات المعلومات إلى القرارات',
    statement: 'كل وحدة تجيب عن السؤال الوحيد المهم - *ما الخطوة التالية التي ينبغي أن أتخذها؟*',
    lede: 'يحوّل Insights اثنتي عشرة قناة من بيانات التشغيل إلى خطوة تالية واحدة وواضحة لكل دور - في الصالة وفي المكتب الخلفي.',
  },
  fr: {
    eyebrow: 'DES TABLEAUX DE BORD AUX DÉCISIONS',
    statement: "Chaque module répond à la seule question qui compte - *que dois-je faire ensuite ?*",
    lede: "Insights transforme douze flux de données opérationnelles en une seule prochaine action claire pour chaque rôle - en salle comme au bureau.",
  },
  es: {
    eyebrow: 'DE LOS PANELES A LAS DECISIONES',
    statement: 'Cada módulo responde la única pregunta que importa - *¿qué debería hacer ahora?*',
    lede: 'Insights convierte doce flujos de datos operativos en un único próximo paso claro para cada rol - en la sala y en la trastienda.',
  },
  de: {
    eyebrow: 'VON DASHBOARDS ZU ENTSCHEIDUNGEN',
    statement: 'Jedes Modul beantwortet die eine Frage, auf die es ankommt - *was sollte ich als Nächstes tun?*',
    lede: 'Insights macht aus zwölf Strömen operativer Daten einen einzigen, klaren nächsten Schritt für jede Rolle - im Gastraum wie im Backoffice.',
  },
  nl: {
    eyebrow: 'VAN DASHBOARDS NAAR BESLISSINGEN',
    statement: 'Elke module beantwoordt de ene vraag die ertoe doet - *wat moet ik nu doen?*',
    lede: 'Insights maakt van twaalf stromen operationele data één heldere volgende stap voor elke rol - op de vloer en op kantoor.',
  },
  pt: {
    eyebrow: 'DOS PAINÉIS ÀS DECISÕES',
    statement: 'Cada módulo responde à única pergunta que importa - *o que devo fazer a seguir?*',
    lede: 'O Insights transforma doze fluxos de dados operacionais em um único próximo passo claro para cada função - no salão e na retaguarda.',
  },
  hi: {
    eyebrow: 'डैशबोर्ड से फैसलों तक',
    statement: 'हर मॉड्यूल उस एक सवाल का जवाब देता है जो असल में मायने रखता है - *अब मुझे क्या करना चाहिए?*',
    lede: 'Insights बारह तरह के ऑपरेशनल डेटा को हर भूमिका के लिए एक ही साफ अगले कदम में बदल देता है - फ्लोर पर और बैक ऑफिस में।',
  },
  ur: {
    eyebrow: 'ڈیش بورڈ سے فیصلوں تک',
    statement: 'ہر ماڈیول اُسی ایک سوال کا جواب دیتا ہے جو واقعی اہم ہے - *اب مجھے کیا کرنا چاہیے؟*',
    lede: 'Insights بارہ طرح کے آپریشنل ڈیٹا کو ہر کردار کے لیے ایک ہی واضح اگلے قدم میں بدل دیتا ہے - فلور پر اور بیک آفس میں۔',
  },
  it: {
    eyebrow: 'DAI CRUSCOTTI ALLE DECISIONI',
    statement: "Ogni modulo risponde all'unica domanda che conta - *cosa dovrei fare adesso?*",
    lede: "Insights trasforma dodici flussi di dati operativi in un unico, chiaro passo successivo per ogni ruolo - in sala e in ufficio.",
  },
  pl: {
    eyebrow: 'OD PULPITÓW DO DECYZJI',
    statement: 'Każdy moduł odpowiada na jedno pytanie, które się liczy - *co powinienem zrobić teraz?*',
    lede: 'Insights zamienia dwanaście strumieni danych operacyjnych w jeden, jasny następny krok dla każdej roli - na sali i na zapleczu.',
  },
  tr: {
    eyebrow: 'GÖSTERGE PANELLERİNDEN KARARLARA',
    statement: 'Her modül asıl önemli olan tek soruyu yanıtlar - *şimdi ne yapmalıyım?*',
    lede: 'Insights, on iki operasyonel veri akışını her rol için tek ve net bir sonraki adıma dönüştürür - sahada ve arka ofiste.',
  },
  'zh-Hans': {
    eyebrow: '从仪表盘到决策',
    statement: '每个模块都回答那个真正重要的问题--*下一步我该做什么？*',
    lede: 'Insights 把十二路运营数据，化为每个岗位清晰的下一步--无论在一线还是后台。',
  },
  ja: {
    eyebrow: 'ダッシュボードから、決断へ',
    statement: 'どのモジュールも、本当に大切なただ一つの問いに答える--*次に何をすべきか？*',
    lede: 'Insights は12系統の運用データを、あらゆる役割にとっての明確な次の一手に変えます--現場でも、バックオフィスでも。',
  },
  ko: {
    eyebrow: '대시보드에서 결정으로',
    statement: '모든 모듈은 정말 중요한 단 하나의 질문에 답합니다 - *다음에 무엇을 해야 하는가?*',
    lede: 'Insights는 열두 갈래의 운영 데이터를 모든 역할을 위한 하나의 명확한 다음 단계로 바꿉니다 - 현장에서도, 백오피스에서도.',
  },
  id: {
    eyebrow: 'DARI DASBOR KE KEPUTUSAN',
    statement: 'Setiap modul menjawab satu pertanyaan yang penting - *apa yang harus saya lakukan berikutnya?*',
    lede: 'Insights mengubah dua belas aliran data operasional menjadi satu langkah berikutnya yang jelas untuk setiap peran - di lantai maupun di kantor belakang.',
  },
  vi: {
    eyebrow: 'TỪ BẢNG SỐ LIỆU ĐẾN QUYẾT ĐỊNH',
    statement: 'Mỗi module trả lời đúng một câu hỏi quan trọng nhất - *tiếp theo tôi nên làm gì?*',
    lede: 'Insights biến mười hai luồng dữ liệu vận hành thành một bước tiếp theo rõ ràng duy nhất cho từng vai trò - ngay tại sàn lẫn trong văn phòng.',
  },
  ro: {
    eyebrow: 'DE LA PANOURI LA DECIZII',
    statement: 'Fiecare modul răspunde la singura întrebare care contează - *ce ar trebui să fac în continuare?*',
    lede: 'Insights transformă douăsprezece fluxuri de date operaționale într-un singur pas următor clar pentru fiecare rol - în sală și în birou.',
  },
  sv: {
    eyebrow: 'FRÅN INSTRUMENTPANELER TILL BESLUT',
    statement: 'Varje modul svarar på den enda fråga som betyder något - *vad bör jag göra härnäst?*',
    lede: 'Insights gör tolv strömmar av driftdata till ett enda, tydligt nästa steg för varje roll - på golvet och på kontoret.',
  },
  bn: {
    eyebrow: 'ড্যাশবোর্ড থেকে সিদ্ধান্তে',
    statement: 'প্রতিটি মডিউল সেই একটি প্রশ্নেরই উত্তর দেয় যা সত্যিই গুরুত্বপূর্ণ - *এরপর আমার কী করা উচিত?*',
    lede: 'Insights বারোটি অপারেশনাল ডেটার ধারাকে প্রতিটি ভূমিকার জন্য একটিই স্পষ্ট পরবর্তী পদক্ষেপে রূপ দেয় - ফ্লোরে এবং ব্যাক অফিসে।',
  },
  th: {
    eyebrow: 'จากแดชบอร์ดสู่การตัดสินใจ',
    statement: 'ทุกโมดูลตอบคำถามเดียวที่สำคัญจริง ๆ - *ต่อไปฉันควรทำอะไร?*',
    lede: 'Insights เปลี่ยนข้อมูลการดำเนินงานสิบสองสายให้เป็นก้าวต่อไปที่ชัดเจนเพียงหนึ่งเดียวสำหรับทุกบทบาท - ทั้งที่หน้างานและในออฟฟิศหลังบ้าน',
  },
  ms: {
    eyebrow: 'DARIPADA PAPAN PEMUKA KEPADA KEPUTUSAN',
    statement: 'Setiap modul menjawab satu soalan yang benar-benar penting - *apa yang patut saya lakukan seterusnya?*',
    lede: 'Insights mengubah dua belas aliran data operasi menjadi satu langkah seterusnya yang jelas untuk setiap peranan - di lantai dan di pejabat belakang.',
  },
};
