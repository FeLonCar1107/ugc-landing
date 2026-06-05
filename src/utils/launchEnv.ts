/** Resolve per-launch env vars: NEXT_PUBLIC_LAUNCH_<SLUG_UPPER_SNAKE>_* */

export function launchAssetBase(slug: string): string {
  return `/launch-assets/${slug}`;
}

export function slugToEnvSuffix(slug: string): string {
  return slug.replace(/-/g, "_").toUpperCase();
}

export function getLaunchCheckoutUrl(slug: string): string {
  const k = `NEXT_PUBLIC_LAUNCH_${slugToEnvSuffix(slug)}_CHECKOUT_URL`;
  return process.env[k]?.trim() ?? "";
}

/** Struck-through reference price for bonus rows in every landing value stack. */
export const LAUNCH_BONUS_ANCHOR_PRICE_USD_ENV_KEY =
  "NEXT_PUBLIC_LAUNCH_BONUS_ANCHOR_PRICE_USD" as const;

export const DEFAULT_LAUNCH_BONUS_ANCHOR_PRICE_USD = "3.9" as const;

/** Reference anchor price for bonus line items (`b1`, `b2`, …) in the value stack. */
export function getLaunchBonusAnchorPriceUsd(): string {
  return (
    process.env[LAUNCH_BONUS_ANCHOR_PRICE_USD_ENV_KEY]?.trim() ??
    DEFAULT_LAUNCH_BONUS_ANCHOR_PRICE_USD
  );
}

/** Formats a numeric or partial USD string as `USD <amount>` for value-stack labels. */
export function formatUsdAnchorLabel(rawUsd: string): string {
  const v = rawUsd.trim();
  if (!v) return "";
  if (/^USD\s/i.test(v)) return v.replace(/\s+/g, " ");
  return `USD ${v}`;
}

export function getLaunchTimeToResult(slug: string): string {
  const k = `NEXT_PUBLIC_LAUNCH_${slugToEnvSuffix(slug)}_TIME_TO_RESULT`;
  return process.env[k] ?? "";
}

/** Optional editorial label (e.g. launch phase) for offer urgency — no fabricated inventory. */
export function getLaunchOfferPhaseLabel(slug: string): string | undefined {
  const k = `NEXT_PUBLIC_LAUNCH_${slugToEnvSuffix(slug)}_OFFER_PHASE_LABEL`;
  const v = process.env[k]?.trim();
  return v && v.length > 0 ? v : undefined;
}

/**
 * Optional deadline date (`YYYY-MM-DD` or ISO string). The calendar day is interpreted per locale:
 * end of day 23:59:59.999 in Colombia (`es`) or US Eastern (`en`). Invalid values are omitted.
 */
export function getLaunchBonusBundleDeadlineIso(
  slug: string,
): string | undefined {
  const k = `NEXT_PUBLIC_LAUNCH_${slugToEnvSuffix(slug)}_BONUS_BUNDLE_DEADLINE_ISO`;
  const v = process.env[k]?.trim();
  if (!v) return undefined;
  const ms = Date.parse(v);
  if (Number.isNaN(ms)) return undefined;
  return v;
}

/** Top-of-page landing hero image — Isabella portrait vs ebook mockup (conversion A/B). */
export const LAUNCH_HERO_VISUAL_PORTRAIT = "portrait" as const;
export const LAUNCH_HERO_VISUAL_MOCKUP = "mockup" as const;

export type LaunchHeroVisual =
  | typeof LAUNCH_HERO_VISUAL_PORTRAIT
  | typeof LAUNCH_HERO_VISUAL_MOCKUP;

/** Default for all ebook landings when no per-slug override is set. */
export const LAUNCH_HERO_VISUAL_ENV_KEY = "NEXT_PUBLIC_LAUNCH_HERO_VISUAL" as const;

function parseLaunchHeroVisual(raw: string | undefined): LaunchHeroVisual | undefined {
  const v = raw?.trim().toLowerCase();
  if (!v) return undefined;
  return v === LAUNCH_HERO_VISUAL_MOCKUP
    ? LAUNCH_HERO_VISUAL_MOCKUP
    : LAUNCH_HERO_VISUAL_PORTRAIT;
}

/**
 * Hero visual resolution (first match wins):
 * 1. NEXT_PUBLIC_LAUNCH_SLUG_HERO_VISUAL — per ebook
 * 2. NEXT_PUBLIC_LAUNCH_HERO_VISUAL — all ebooks
 * 3. portrait (hero_done.png from shared assets)
 *
 * Set mockup to use each slug's offer_ebook_mockup.png in the first hero.
 */
export function getLaunchHeroVisual(slug: string): LaunchHeroVisual {
  const perSlugKey = `NEXT_PUBLIC_LAUNCH_${slugToEnvSuffix(slug)}_HERO_VISUAL`;
  return (
    parseLaunchHeroVisual(process.env[perSlugKey]) ??
    parseLaunchHeroVisual(process.env[LAUNCH_HERO_VISUAL_ENV_KEY]) ??
    LAUNCH_HERO_VISUAL_PORTRAIT
  );
}

/**
 * Optional social proof count string shown in the hero
 * (e.g. "247" renders as "247 creadoras ya tienen acceso").
 * Read from NEXT_PUBLIC_LAUNCH_SLUG_SOCIAL_COUNT.
 */
export function getLaunchSocialCount(slug: string): string {
  const k = `NEXT_PUBLIC_LAUNCH_${slugToEnvSuffix(slug)}_SOCIAL_COUNT`;
  return process.env[k]?.trim() ?? "";
}
