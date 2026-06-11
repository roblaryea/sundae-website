import type { WebsiteLocale } from '@/lib/i18n';

/**
 * The homepage closing-CTA sign-off line ("Start making every day a Sundae.").
 *
 * Hand-authored native transcreation per locale - NOT literal word-for-word. Each
 * line keeps the literal token "Sundae" so withWordmark() can swap the inline
 * <SundaeWordmark> in the same place across every language (mirrors editorialCopy's
 * band2 headline treatment). Resolved at render with an English fallback.
 *
 * The English line is a play on the brand name (the dessert "sundae" → a good day);
 * that pun does not survive transcreation, so each locale renders an idiomatic
 * equivalent of "make every day a great day, with Sundae" while preserving the
 * brand token for the wordmark swap.
 */
export const closerLineCopy: Record<WebsiteLocale, string> = {
  en: 'Start making every day a Sundae.',
  ar: 'ابدأ واجعل كل يوم يومًا مع Sundae.',
  fr: 'Faites de chaque journée une réussite, avec Sundae.',
  es: 'Empieza a hacer de cada día un buen día, con Sundae.',
  de: 'Machen Sie jeden Tag zu einem guten Tag - mit Sundae.',
  nl: 'Maak van elke dag een goede dag, met Sundae.',
  pt: 'Comece a fazer de cada dia um bom dia, com o Sundae.',
  hi: 'हर दिन को बेहतरीन बनाना शुरू करें, Sundae के साथ।',
  ur: 'ہر دن کو بہترین بنانا شروع کریں، Sundae کے ساتھ۔',
  it: 'Inizia a rendere ogni giorno un buon giorno, con Sundae.',
  pl: 'Zacznij robić z każdego dnia dobry dzień - z Sundae.',
  tr: 'Her günü iyi bir güne dönüştürmeye başlayın, Sundae ile.',
  'zh-Hans': '让每一天都更好，从 Sundae 开始。',
  ja: '毎日を、もっと良い一日に。Sundae とともに始めましょう。',
  ko: '매일을 더 좋은 하루로. Sundae와 함께 시작하세요.',
  id: 'Mulai jadikan setiap hari hari yang baik, bersama Sundae.',
  vi: 'Bắt đầu biến mỗi ngày thành một ngày trọn vẹn, cùng Sundae.',
  ro: 'Începe să faci din fiecare zi o zi bună, cu Sundae.',
  sv: 'Börja göra varje dag till en bra dag, med Sundae.',
  bn: 'প্রতিটি দিনকে দারুণ করে তুলুন, Sundae-র সঙ্গে।',
  th: 'เริ่มทำให้ทุกวันเป็นวันที่ดี ด้วย Sundae',
  ms: 'Mula jadikan setiap hari hari yang baik, bersama Sundae.',
};
