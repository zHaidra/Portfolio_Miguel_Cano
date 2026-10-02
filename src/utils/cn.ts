/**
 * Minimal class-name joiner. Filters out false/null/undefined so
 * conditional classes read cleanly at the call site.
 *
 * Deliberately not `clsx` — this is the whole of what we need.
 */
export const cn = (...values: Array<string | false | null | undefined>): string =>
  values.filter(Boolean).join(' ');
