import type { en } from "./en";

type Widen<T> = T extends string
  ? string
  : T extends readonly (infer Item)[]
    ? Widen<Item>[]
    : T extends object
      ? { [Key in keyof T]: Widen<T[Key]> }
      : T;

/**
 * Every locale pack has exactly the keys of the English pack. Arrays keep the
 * English length (checked by `scripts/qa-diagnostic-i18n.mjs`), and every
 * `{placeholder}` in an English string must appear in its translation.
 */
export type DiagnosticPack = Widen<typeof en>;
