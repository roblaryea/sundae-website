import copy0 from '@/content/operator-workflows/en.json'
import copy1 from '@/content/operator-workflows/ar.json'
import copy2 from '@/content/operator-workflows/fr.json'
import copy3 from '@/content/operator-workflows/es.json'
import copy4 from '@/content/operator-workflows/de.json'
import copy5 from '@/content/operator-workflows/nl.json'
import copy6 from '@/content/operator-workflows/pt.json'
import copy7 from '@/content/operator-workflows/hi.json'
import copy8 from '@/content/operator-workflows/ur.json'
import copy9 from '@/content/operator-workflows/it.json'
import copy10 from '@/content/operator-workflows/pl.json'
import copy11 from '@/content/operator-workflows/tr.json'
import copy12 from '@/content/operator-workflows/zh-Hans.json'
import copy13 from '@/content/operator-workflows/ja.json'
import copy14 from '@/content/operator-workflows/ko.json'
import copy15 from '@/content/operator-workflows/id.json'
import copy16 from '@/content/operator-workflows/vi.json'
import copy17 from '@/content/operator-workflows/ro.json'
import copy18 from '@/content/operator-workflows/sv.json'
import copy19 from '@/content/operator-workflows/bn.json'
import copy20 from '@/content/operator-workflows/th.json'
import copy21 from '@/content/operator-workflows/ms.json'
import type { WebsiteLocale } from '@/lib/i18n'

export type OperatorWorkflowCopy = typeof copy0
export type OperatorWorkflowSlug = keyof OperatorWorkflowCopy['pages']

export const operatorWorkflowCopy: Record<WebsiteLocale, OperatorWorkflowCopy> = {
  'en': copy0,
  'ar': copy1,
  'fr': copy2,
  'es': copy3,
  'de': copy4,
  'nl': copy5,
  'pt': copy6,
  'hi': copy7,
  'ur': copy8,
  'it': copy9,
  'pl': copy10,
  'tr': copy11,
  'zh-Hans': copy12,
  'ja': copy13,
  'ko': copy14,
  'id': copy15,
  'vi': copy16,
  'ro': copy17,
  'sv': copy18,
  'bn': copy19,
  'th': copy20,
  'ms': copy21,
}
