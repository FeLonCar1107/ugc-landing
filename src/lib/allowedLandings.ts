/** Each slug: loaders in `ebookLandingCopy.ts`, JSON under `dictionaries/landings/<slug>/`,
 * per-slug assets in `public/launch-assets/<slug>/` (mockup + bonuses),
 * shared art in `public/launch-assets/shared/`, env triplets.
 * Brand palette: `[data-landing-slug="<slug>"]` in `src/styles/globals.css`
 * (discover = Saga; catch / magnetic = bold section themes; complete-saga = Saga Noir bundle).
 */
export const ALLOWED_LANDING_SLUGS = [
  "discover-your-character",
  "catch-the-attention",
  "magnetic-creator",
  "complete-saga",
] as const;

export type AllowedLandingSlug = (typeof ALLOWED_LANDING_SLUGS)[number];

export function isAllowedLandingSlug(
  slug: string,
): slug is AllowedLandingSlug {
  return (ALLOWED_LANDING_SLUGS as readonly string[]).includes(slug);
}
