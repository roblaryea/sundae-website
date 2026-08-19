import type { RequiredEnglishLocalizedRecord, WebsiteLocale } from '@/lib/i18n';
import { getLocalizedCopy } from '@/lib/i18n';

/**
 * Copy for the profit-recovery product page.
 *
 * This is the capability the rest of the site could not previously explain:
 * the closed loop that detects a margin leak, routes it to exactly one owner,
 * and refuses to call it recovered until it has been measured against a
 * baseline frozen before the work started.
 *
 * Every claim here is behaviour the product actually has. The detectors read
 * real materialised data and abstain when there is nothing to raise; an
 * outcome stays directional until a human confirms it and verified only after
 * a second authorised reviewer checks it against evidence; the connection is
 * read-only. Nothing on this page promises more than the loop does.
 *
 * Locale model follows CookieConsent and the solutions content: English is
 * required, every other locale is optional and falls back to English through
 * getLocalizedCopy. Transcreation lands per locale as a deliberate pass, so a
 * locale is either natively written or honestly English - never machine-filled.
 *
 * Dash house-style: spaced ASCII hyphen " - " for Latin, Arabic, Indic and
 * Thai scripts; double hyphen "--" for CJK. No em dashes anywhere.
 */

export type RecoveryStage = {
  /** The loop is a genuine sequence, so the ordinal carries information. */
  step: string;
  name: string;
  line: string;
};

export type RecoveryCopy = {
  badge: string;
  title: string;
  titleAccent: string;
  description: string;
  stagesEyebrow: string;
  stagesTitle: string;
  stages: RecoveryStage[];
  honestyEyebrow: string;
  honestyTitle: string;
  honesty: { title: string; body: string }[];
  ctaTitle: string;
  ctaDescription: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

const recoveryCopy: RequiredEnglishLocalizedRecord<RecoveryCopy> = {
  en: {
    badge: 'Closed-loop profit recovery',
    title: 'Finding the money is the easy part.',
    titleAccent: 'Proving you got it back is the product.',
    description:
      'Most tools stop at the flag. Sundae opens the records behind it, names the item doing the damage, gives the work to one person, and freezes the number it will be judged against before that work begins.',

    stagesEyebrow: 'The loop',
    stagesTitle: 'Five steps, and none of them end at a dashboard.',
    stages: [
      {
        step: '01',
        name: 'Detect',
        line: 'Fourteen detectors read your own data across labour, procurement, revenue capture, waste, delivery, stockouts and menu pricing. Where there is nothing to raise, they say so rather than invent something.',
      },
      {
        step: '02',
        name: 'Decide',
        line: 'Each opportunity is valued in the outlet currency, ranked against every other one, and carries the evidence that triggered it. Accept it, decline it, or ask for more.',
      },
      {
        step: '03',
        name: 'Execute',
        line: 'One decision becomes exactly one task, for one named person, with a date. Not an alert to a group, and never two tasks racing the same leak.',
      },
      {
        step: '04',
        name: 'Measure',
        line: 'The before number is locked the moment work starts, so the result is compared with what was actually true. Where the data cannot tell, Sundae says so rather than guessing.',
      },
      {
        step: '05',
        name: 'Learn',
        line: 'Every measured outcome feeds a record graded by sample size, so the next recommendation is shaped by what worked in your estate rather than an industry average.',
      },
    ],

    honestyEyebrow: 'The limits',
    honestyTitle: 'What it will not do.',
    honesty: [
      {
        title: 'It will not claim a saving it has not measured.',
        body: 'An outcome stays directional until a person confirms it, and verified only after a second authorised reviewer checks it against evidence. The machine-measured number is kept intact underneath.',
      },
      {
        title: 'It will not invent an opportunity to look busy.',
        body: 'Detectors read real data and return nothing when there is nothing there. An estate with no leak in a domain simply sees no decision for it.',
      },
      {
        title: 'It will not write to the systems you run on.',
        body: 'The connection is read-only, so bringing Sundae in cannot change a price, a menu or an order in the system your floor depends on.',
      },
    ],

    ctaTitle: 'Connect one outlet, read-only.',
    ctaDescription:
      'Within a week you will have your own ranked recovery list, each item valued, owned and evidenced. If there is nothing worth acting on, Sundae will say so.',
    ctaPrimary: 'Book a demo',
    ctaSecondary: 'See how Sundae Core fits',
  },
};

export function getRecoveryCopy(locale: WebsiteLocale): RecoveryCopy {
  return getLocalizedCopy(recoveryCopy, locale);
}
