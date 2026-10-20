/**
 * Form timing limits, in their own dependency-free module so the browser form can use them without
 * pulling in the server-side validation (and its phone metadata).
 */
/**
 * Timing is a risk signal, not proof of a bot: AutoFill can complete a form in well under two
 * seconds, and a tab can sit open for a day. Such submissions are asked to retry rather than
 * acknowledged and dropped, so a real connection is never lost behind a success message.
 */
export const MIN_FILL_MS = 2000
export const MAX_FORM_AGE_MS = 24 * 60 * 60 * 1000
