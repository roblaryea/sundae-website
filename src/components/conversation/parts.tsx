'use client';

/**
 * Presentational pieces shared by Sundae's scripted conversations: guided
 * booking (`ConversationalLeadCapture`) and the guided Operations Diagnostic
 * (`DiagnosticConversation`). No state machines and no copy here - each
 * conversation passes its own lines, labels and handlers.
 *
 * Extracted from the guided booking without changing its markup, classes,
 * copy, analytics or focus behaviour (spec 6.2): the booking unit and E2E
 * suites guard that. Styles stay in the booking's CSS module, which follows
 * the design board (docs/guided-booking/design/guided-booking-design-reference.html).
 */

import { useId, useState, type FormEvent, type ReactNode, type Ref } from 'react';
import { ArrowLeft, ArrowRight, CalendarDays, Check, CircleAlert, Lock } from 'lucide-react';
import Link from 'next/link';
import { ApprovedMark } from '@/components/ui/ApprovedMark';
import styles from '@/components/marketing/guidedBooking/guidedBooking.module.css';

export { styles as conversationStyles };

// ── Log ────────────────────────────────────────────────────────────────

/** One Sundae line. The opening line is a Fraunces greeting with the mark. */
export function SundaeLine({ children, greeting = false }: { children: ReactNode; greeting?: boolean }) {
  if (greeting) {
    return (
      <div className={`${styles.greetingBlock} ${styles.enter}`}>
        <div className={styles.who} aria-hidden="true">
          <ApprovedMark className={styles.whoMark} />
          <bdi>Sundae</bdi>
        </div>
        <p className={styles.greeting}>{children}</p>
      </div>
    );
  }
  return <p className={`${styles.line} ${styles.enter}`}>{children}</p>;
}

/** The visitor's answer, on the cream bubble, with an optional Edit. */
export function UserBubble({
  children,
  edit,
}: {
  children: ReactNode;
  edit?: { label: string; ariaLabel: string; onClick: () => void } | null;
}) {
  return (
    <div className={`${styles.userWrap} ${styles.enterUser}`}>
      <p className={styles.user}>{children}</p>
      {edit && (
        <button type="button" className={styles.editButton} onClick={edit.onClick} aria-label={edit.ariaLabel}>
          {edit.label}
        </button>
      )}
    </div>
  );
}

export function TypingDots() {
  return (
    <span className={styles.typing} aria-hidden="true" data-typing>
      <i />
      <i />
      <i />
    </span>
  );
}

// ── Panel chrome ───────────────────────────────────────────────────────

export function ConversationHeader({
  titleId,
  title,
  sub,
  classic,
}: {
  titleId: string;
  title: string;
  sub: ReactNode;
  classic?: { full: string; short: string; onClick: () => void } | null;
}) {
  return (
    <header className={styles.head}>
      <ApprovedMark className={styles.headMark} />
      <div className={styles.headText}>
        <h2 className={styles.title} id={titleId}>{title}</h2>
        <p className={styles.sub} style={{ margin: 0 }}>{sub}</p>
      </div>
      {classic && (
        <button type="button" className={styles.classicLink} onClick={classic.onClick}>
          <span className={styles.classicFull}>{classic.full}</span>
          <span className={styles.classicShort}>{classic.short}</span>
        </button>
      )}
    </header>
  );
}

/** A subline with a short form for phones. */
export function Subline({ full, short }: { full: ReactNode; short: ReactNode }) {
  return (
    <>
      <span className={styles.subFull}>{full}</span>
      <span className={styles.subShort}>{short}</span>
    </>
  );
}

/** Caramel progress segments: done ones full, the current one half full. */
export function ProgressSegments({ segments, current, label }: { segments: number; current: number; label: string }) {
  return (
    <div className={styles.progress}>
      {Array.from({ length: segments }, (_, index) => (
        <span
          key={index}
          aria-hidden="true"
          className={styles.segment}
          style={{ ['--fill' as string]: index < current ? 1 : index === current ? 0.5 : 0 }}
        />
      ))}
      <span className={styles.srOnly}>{label}</span>
    </div>
  );
}

/** Back and the keyboard hint under the answer control. */
export function AnswerMeta({ back, hint }: { back?: { label: string; onClick: () => void } | null; hint?: string | null }) {
  return (
    <div className={styles.meta}>
      {back && (
        <button type="button" className={styles.backButton} onClick={back.onClick}>
          <ArrowLeft aria-hidden="true" className={styles.flip} />
          {back.label}
        </button>
      )}
      {hint && <span>{hint}</span>}
    </div>
  );
}

/** The olive privacy line at the foot of the panel. */
export function PrivacyFoot({ text, linkLabel }: { text: string; linkLabel: string }) {
  return (
    <footer className={styles.foot}>
      <Lock aria-hidden="true" strokeWidth={1.8} />
      <span>
        {text}
        {' · '}
        <Link href="/privacy">{linkLabel}</Link>
      </span>
    </footer>
  );
}

// ── Answer controls ────────────────────────────────────────────────────

export function ErrorLine({ id, text }: { id: string; text: string | null }) {
  if (!text) return null;
  return (
    <p id={id} className={styles.error} role="alert">
      <CircleAlert aria-hidden="true" strokeWidth={2} />
      {text}
    </p>
  );
}

/** One text, email, number or long-text answer with the coral send button. */
export function TextAnswer({
  label,
  placeholder,
  type = 'text',
  autoComplete,
  inputMode,
  dir,
  multiline = false,
  maxLength,
  defaultValue,
  error,
  sendLabel,
  onSubmit,
  onValueChange,
  autoFocus,
}: {
  label: string;
  placeholder: string;
  type?: 'text' | 'email' | 'tel';
  autoComplete?: string;
  inputMode?: 'email' | 'tel' | 'text' | 'numeric';
  dir?: 'ltr';
  multiline?: boolean;
  /** Defaults: 500 for long text, 254 for email, 120 otherwise. */
  maxLength?: number;
  defaultValue?: string;
  error: string | null;
  sendLabel: string;
  onSubmit: (value: string) => void;
  onValueChange?: (value: string) => void;
  /** Focus the field when it appears (after "Other" or "Different name"). */
  autoFocus?: boolean;
}) {
  const id = useId();
  const [value, setValue] = useState(defaultValue ?? '');
  const [showError, setShowError] = useState(true);
  const visibleError = showError ? error : null;
  const send = (event?: FormEvent) => {
    event?.preventDefault();
    setShowError(true);
    onSubmit(value);
  };
  const change = (next: string) => {
    setValue(next);
    setShowError(false);
    onValueChange?.(next);
  };
  const shared = {
    id: `${id}-field`,
    className: styles.field,
    value,
    placeholder,
    'aria-label': label,
    'aria-invalid': !!visibleError,
    'aria-describedby': visibleError ? `${id}-error` : undefined,
    autoComplete,
    dir,
    autoFocus,
  };
  return (
    <form onSubmit={send} noValidate>
      <div className={styles.fieldRow}>
        {multiline ? (
          <textarea
            {...shared}
            rows={2}
            maxLength={maxLength ?? 500}
            onChange={(event) => change(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) send(event);
            }}
          />
        ) : (
          <input
            {...shared}
            type={type}
            inputMode={inputMode}
            maxLength={maxLength ?? (type === 'email' ? 254 : 120)}
            enterKeyHint="send"
            onChange={(event) => change(event.target.value)}
          />
        )}
        <button type="submit" className={styles.send} aria-label={sendLabel}>
          <ArrowRight aria-hidden="true" strokeWidth={2.2} className={styles.flip} />
        </button>
      </div>
      <ErrorLine id={`${id}-error`} text={visibleError} />
    </form>
  );
}

export interface ChoiceOption {
  key: string;
  label: string;
}

/** Single-choice chips: one tap answers. */
export function Choices({
  label,
  options,
  selected,
  onChoose,
}: {
  label: string;
  options: ChoiceOption[];
  selected?: string;
  onChoose: (key: string) => void;
}) {
  return (
    <div className={styles.chips} role="group" aria-label={label}>
      {options.map((option) => (
        <button
          key={option.key}
          type="button"
          className={`${styles.chip} ${selected === option.key ? styles.chipOn : ''}`}
          onClick={() => onChoose(option.key)}
        >
          {selected === option.key && <Check aria-hidden="true" strokeWidth={2.2} />}
          <bdi>{option.label}</bdi>
        </button>
      ))}
    </div>
  );
}

/** Multi-choice chips (`aria-pressed`) closed by a coral "Done · n selected". */
export function MultiChoices({
  label,
  options,
  selected,
  onToggle,
  doneLabel,
  onDone,
  describedBy,
  doneBarClassName,
}: {
  label: string;
  options: ChoiceOption[];
  selected: readonly string[];
  onToggle: (key: string) => void;
  doneLabel: string;
  onDone: () => void;
  describedBy?: string;
  /** Long lists: "Done" goes in its own bar after the chips (with this class) instead of last in the group. */
  doneBarClassName?: string;
}) {
  const done = (
    <button type="button" className={`${styles.chip} ${styles.chipDone}`} onClick={onDone}>
      {doneLabel}
    </button>
  );
  const group = (
    <div className={styles.chips} role="group" aria-label={label} aria-describedby={describedBy}>
      {options.map((option) => {
        const on = selected.includes(option.key);
        return (
          <button key={option.key} type="button" aria-pressed={on} className={`${styles.chip} ${on ? styles.chipOn : ''}`} onClick={() => onToggle(option.key)}>
            {on && <Check aria-hidden="true" strokeWidth={2.2} />}
            {option.label}
          </button>
        );
      })}
      {!doneBarClassName && done}
    </div>
  );
  if (!doneBarClassName) return group;
  return (
    <>
      {group}
      <div className={doneBarClassName}>{done}</div>
    </>
  );
}

/** "Are you with {company}?" Yes / Different name, then a typed name. */
export function CompanyConfirm({
  question,
  inferred,
  yesLabel,
  differentLabel,
  startTyped,
  text,
  onConfirm,
  onTyped,
  focusTyped = false,
}: {
  question: string;
  inferred: string;
  yesLabel: string;
  differentLabel: string;
  startTyped: boolean;
  text: { label: string; placeholder: string; defaultValue: string; error: string | null; sendLabel: string };
  onConfirm: () => void;
  onTyped: (value: string) => void;
  /** Move focus into the field after "Different name". */
  focusTyped?: boolean;
}) {
  const [typed, setTyped] = useState(startTyped || !inferred);
  const [chose, setChose] = useState(false);
  if (!typed) {
    return (
      <Choices
        label={question}
        options={[{ key: 'yes', label: yesLabel }, { key: 'different', label: differentLabel }]}
        onChoose={(choice) => {
          if (choice === 'yes') onConfirm();
          else {
            setTyped(true);
            setChose(true);
          }
        }}
      />
    );
  }
  return (
    <TextAnswer
      autoFocus={focusTyped && chose ? true : undefined}
      key="company-text"
      label={text.label}
      placeholder={text.placeholder}
      autoComplete="organization"
      defaultValue={text.defaultValue}
      error={text.error}
      sendLabel={text.sendLabel}
      onSubmit={onTyped}
    />
  );
}

/**
 * The region-aware POS picker: the brands most used where the visitor
 * operates, then Other (typed) and Not sure. With `search`, typing under
 * Other also offers matching brands from the full list.
 */
export function PosPicker({
  question,
  listed,
  otherLabel,
  notSureLabel,
  selected,
  startTyped,
  text,
  search,
  onListed,
  onNotSure,
  onOther,
  focusTyped = false,
}: {
  question: string;
  listed: ChoiceOption[];
  otherLabel: string;
  notSureLabel: string;
  selected?: string;
  startTyped: boolean;
  text: { label: string; placeholder: string; defaultValue: string; error: string | null; sendLabel: string };
  search?: { match: (query: string) => ChoiceOption[]; label: string };
  onListed: (key: string) => void;
  onNotSure: () => void;
  onOther: (value: string) => void;
  /** Move focus into the field after "Other". */
  focusTyped?: boolean;
}) {
  const [typed, setTyped] = useState(startTyped);
  const [chose, setChose] = useState(false);
  const [query, setQuery] = useState(text.defaultValue);
  if (!typed) {
    return (
      <Choices
        label={question}
        selected={selected}
        options={[...listed, { key: 'other', label: otherLabel }, { key: 'not_sure', label: notSureLabel }]}
        onChoose={(choice) => {
          if (choice === 'other') {
            setTyped(true);
            setChose(true);
          } else if (choice === 'not_sure') onNotSure();
          else onListed(choice);
        }}
      />
    );
  }
  const field = (
    <TextAnswer
      autoFocus={focusTyped && chose ? true : undefined}
      key="pos-text"
      label={text.label}
      placeholder={text.placeholder}
      defaultValue={text.defaultValue}
      error={text.error}
      sendLabel={text.sendLabel}
      onSubmit={onOther}
      onValueChange={search ? setQuery : undefined}
    />
  );
  if (!search) return field;
  const matches = query.trim() ? search.match(query).slice(0, 6) : [];
  return (
    <div className={styles.stack}>
      {field}
      {matches.length > 0 && <Choices label={search.label} options={matches} onChoose={onListed} />}
    </div>
  );
}

// ── Inline booking hand-off ────────────────────────────────────────────

/** "Times shown in your time zone" card shown with the booking offer. */
export function BookingOfferCard({ title, body }: { title: ReactNode; body: ReactNode }) {
  return (
    <div className={`${styles.doneCard} ${styles.handoffCard} ${styles.enter}`}>
      <CalendarDays aria-hidden="true" strokeWidth={1.7} />
      <div>
        <p className={styles.handoffTitle}>{title}</p>
        <p className={styles.handoffBody}>{body}</p>
      </div>
    </div>
  );
}

/** "Choose a time" and "I'll use the email link later". */
export function BookingOfferActions({
  chooseLabel,
  laterLabel,
  opening,
  onChoose,
  onLater,
  chooseRef,
}: {
  chooseLabel: string;
  laterLabel: string;
  opening: boolean;
  onChoose: () => void;
  onLater: () => void;
  chooseRef?: Ref<HTMLButtonElement>;
}) {
  return (
    <div className={styles.inlineRow}>
      <button ref={chooseRef} type="button" className={styles.solid} data-autofocus disabled={opening} onClick={onChoose}>
        <CalendarDays aria-hidden="true" />
        {chooseLabel}
      </button>
      <button type="button" className={styles.textLink} onClick={onLater}>{laterLabel}</button>
    </div>
  );
}
