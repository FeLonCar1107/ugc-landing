/** Resolve per-launch env vars: NEXT_PUBLIC_LAUNCH_<SLUG_UPPER_SNAKE>_* */

export function launchAssetBase(slug: string): string {
  return `/launch-assets/${slug}`;
}

export function slugToEnvSuffix(slug: string): string {
  return slug.replace(/-/g, "_").toUpperCase();
}

export function getLaunchCheckoutUrl(slug: string): string {
  const k = `NEXT_PUBLIC_LAUNCH_${slugToEnvSuffix(slug)}_CHECKOUT_URL`;
  return process.env[k] ?? "";
}

export function getLaunchPriceUsd(slug: string): string {
  const k = `NEXT_PUBLIC_LAUNCH_${slugToEnvSuffix(slug)}_PRICE_USD`;
  return process.env[k] ?? "";
}

export function getLaunchTimeToResult(slug: string): string {
  const k = `NEXT_PUBLIC_LAUNCH_${slugToEnvSuffix(slug)}_TIME_TO_RESULT`;
  return process.env[k] ?? "";
}
