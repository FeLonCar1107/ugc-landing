import type { Locale } from "@/i18n/config";

/** Market timezone for offer urgency copy and countdown (es → Colombia, en → US Eastern). */
export function getLocaleOfferTimeZone(locale: Locale): string {
  return locale === "es" ? "America/Bogota" : "America/New_York";
}

/** Parses `YYYY-MM-DD` from env ISO or date-only strings. */
export function parseDeadlineCalendarDate(
  isoOrDate: string,
): { y: number; m: number; d: number } | null {
  const m = isoOrDate.trim().match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return null;
  const y = Number(m[1]);
  const mo = Number(m[2]);
  const day = Number(m[3]);
  if (!Number.isFinite(y) || mo < 1 || mo > 12 || day < 1 || day > 31) return null;
  return { y, m: mo, d: day };
}

/** Offset (ms) to add to UTC instant so civil fields match `timeZone` wall clock. */
function timeZoneOffsetMs(utcMs: number, timeZone: string): number {
  const d = new Date(utcMs);
  const asUtc = Date.UTC(
    d.getUTCFullYear(),
    d.getUTCMonth(),
    d.getUTCDate(),
    d.getUTCHours(),
    d.getUTCMinutes(),
    d.getUTCSeconds(),
    d.getUTCMilliseconds(),
  );
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    fractionalSecondDigits: 3,
    hourCycle: "h23",
    hour12: false,
  }).formatToParts(d);

  const pick = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((p) => p.type === type)?.value ?? NaN);

  let h = pick("hour");
  if (h === 24) h = 0;

  const asTz = Date.UTC(
    pick("year"),
    pick("month") - 1,
    pick("day"),
    h,
    pick("minute"),
    pick("second"),
    pick("fractionalSecond") || 0,
  );

  return asTz - asUtc;
}

/** UTC instant for local civil time in `timeZone` (stable within ~2 refinement passes). */
function zonedTimeToUtcMs(
  y: number,
  m: number,
  d: number,
  hour: number,
  minute: number,
  second: number,
  millisecond: number,
  timeZone: string,
): number {
  let utc = Date.UTC(y, m - 1, d, hour, minute, second, millisecond);
  for (let i = 0; i < 2; i++) {
    utc = Date.UTC(y, m - 1, d, hour, minute, second, millisecond) - timeZoneOffsetMs(utc, timeZone);
  }
  return utc;
}

/** Last millisecond of `y-m-d` in `timeZone` (23:59:59.999 local). */
export function endOfCalendarDayMs(
  y: number,
  m: number,
  d: number,
  timeZone: string,
): number {
  return zonedTimeToUtcMs(y, m, d, 23, 59, 59, 999, timeZone);
}

/**
 * Offer ends at 23:59:59.999 on the calendar day from env, in the locale market timezone.
 */
export function resolveBonusBundleDeadlineEndMs(
  isoOrDate: string,
  locale: Locale,
): number | null {
  const cal = parseDeadlineCalendarDate(isoOrDate);
  if (!cal) return null;
  const ms = endOfCalendarDayMs(cal.y, cal.m, cal.d, getLocaleOfferTimeZone(locale));
  return Number.isNaN(ms) ? null : ms;
}

export function formatBonusBundleDeadlineLineFromEndMs(
  endMs: number,
  locale: Locale,
): string {
  const tag = locale === "es" ? "es-CO" : "en-US";
  return new Intl.DateTimeFormat(tag, {
    timeZone: getLocaleOfferTimeZone(locale),
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(endMs));
}

export function formatBonusBundleDeadlineLine(
  isoOrDate: string,
  locale: Locale,
): string {
  const endMs = resolveBonusBundleDeadlineEndMs(isoOrDate, locale);
  if (endMs === null) return "";
  return formatBonusBundleDeadlineLineFromEndMs(endMs, locale);
}

export function isBonusBundleDeadlineActive(
  isoOrDate: string,
  locale: Locale,
  nowMs: number = Date.now(),
): boolean {
  const endMs = resolveBonusBundleDeadlineEndMs(isoOrDate, locale);
  return endMs !== null && endMs > nowMs;
}
