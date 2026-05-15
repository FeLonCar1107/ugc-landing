/** Each slug needs: loaders in ebookLandingCopy.ts, JSON under dictionaries/landings/<slug>/, assets in public/launch-assets/<slug>/, env triplets in .env */
export const ALLOWED_LANDING_SLUGS = [
  "discover-your-character",
  "catch-the-attention",
] as const;

export type AllowedLandingSlug = (typeof ALLOWED_LANDING_SLUGS)[number];

export function isAllowedLandingSlug(
  slug: string,
): slug is AllowedLandingSlug {
  return (ALLOWED_LANDING_SLUGS as readonly string[]).includes(slug);
}
