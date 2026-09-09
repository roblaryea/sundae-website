import {
  LEGAL_POLICY_EFFECTIVE_DATE,
  LEGAL_POLICY_VERSION,
} from './approved-policies'
import { APPROVED_POLICY_LOCALES } from './generated-policy-locales'
import { getLocalizedCopy, getWebsiteIntlLocale, type RequiredEnglishLocalizedRecord, type WebsiteLocale } from '@/lib/i18n'

export const policyUiCopy: RequiredEnglishLocalizedRecord<{
  effectiveDate: string
  version: string
  questions: string
}> = {
  en: { effectiveDate: 'Effective', version: 'Version', questions: 'Questions? Email' },
  ar: { effectiveDate: 'ساري من', version: 'الإصدار', questions: 'للأسئلة، راسل' },
  fr: { effectiveDate: 'En vigueur le', version: 'Version', questions: 'Questions ? Écrivez à' },
  es: { effectiveDate: 'En vigor desde', version: 'Versión', questions: '¿Preguntas? Escribe a' },
  de: { effectiveDate: 'Gültig ab', version: 'Version', questions: 'Fragen? E-Mail an' },
  nl: { effectiveDate: 'Geldig vanaf', version: 'Versie', questions: 'Vragen? E-mail' },
  pt: { effectiveDate: 'Em vigor desde', version: 'Versão', questions: 'Dúvidas? Envie um e-mail para' },
  hi: { effectiveDate: 'प्रभावी तिथि', version: 'संस्करण', questions: 'प्रश्न? ईमेल करें' },
  ur: { effectiveDate: 'نافذ العمل', version: 'ورژن', questions: 'سوالات؟ ای میل کریں' },
  it: { effectiveDate: 'In vigore dal', version: 'Versione', questions: 'Domande? Scrivi a' },
  pl: { effectiveDate: 'Obowiązuje od', version: 'Wersja', questions: 'Pytania? Napisz na' },
  tr: { effectiveDate: 'Yürürlük tarihi', version: 'Sürüm', questions: 'Sorularınız mı var? E-posta:' },
  'zh-Hans': { effectiveDate: '生效日期', version: '版本', questions: '如有疑问，请发送邮件至' },
  ja: { effectiveDate: '発効日', version: 'バージョン', questions: 'ご質問は次のメールアドレスまで' },
  ko: { effectiveDate: '시행일', version: '버전', questions: '문의 사항은 이메일로 연락해 주세요:' },
  id: { effectiveDate: 'Berlaku sejak', version: 'Versi', questions: 'Pertanyaan? Email' },
  vi: { effectiveDate: 'Có hiệu lực từ', version: 'Phiên bản', questions: 'Câu hỏi? Email' },
  ro: { effectiveDate: 'În vigoare din', version: 'Versiunea', questions: 'Întrebări? Trimiteți e-mail la' },
  sv: { effectiveDate: 'Gäller från', version: 'Version', questions: 'Frågor? Mejla' },
  bn: { effectiveDate: 'কার্যকর তারিখ', version: 'সংস্করণ', questions: 'প্রশ্ন? ইমেল করুন' },
  th: { effectiveDate: 'มีผลตั้งแต่', version: 'ฉบับ', questions: 'มีคำถาม? อีเมล' },
  ms: { effectiveDate: 'Berkuat kuasa', version: 'Versi', questions: 'Soalan? E-mel' },
}

export function getLocalizedPolicy(locale: WebsiteLocale, kind: 'terms' | 'privacy') {
  const localized = APPROVED_POLICY_LOCALES[locale] ?? APPROVED_POLICY_LOCALES.en
  const copy = localized[kind]
  const ui = getLocalizedCopy(policyUiCopy, locale)
  const date = new Intl.DateTimeFormat(getWebsiteIntlLocale(locale), {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${LEGAL_POLICY_VERSION}T00:00:00Z`))
  return {
    ...copy,
    effectiveDate: date,
    version: LEGAL_POLICY_VERSION,
    effectiveDateLabel: ui.effectiveDate,
    versionLabel: ui.version,
    questionsLabel: ui.questions,
  }
}

export { LEGAL_POLICY_EFFECTIVE_DATE }
