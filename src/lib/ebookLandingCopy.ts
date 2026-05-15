import type { Locale } from "@/i18n/config";
import type { AllowedLandingSlug } from "@/lib/allowedLandings";
import type { EbookLandingCopy } from "@/types/ebook-landing";

type LocaleCopyLoader = () => Promise<{ default: EbookLandingCopy }>;

/**
 * Per-slug locale JSON under `src/dictionaries/landings/<slug>/`.
 * When adding a landing: extend ALLOWED_LANDING_SLUGS and add loaders here.
 */
export const ebookLandingCopyLoaders: Record<
  AllowedLandingSlug,
  Record<Locale, LocaleCopyLoader>
> = {
  "discover-your-character": {
    en: () => import("@/dictionaries/landings/discover-your-character/en.json"),
    es: () => import("@/dictionaries/landings/discover-your-character/es.json"),
  },
  "catch-the-attention": {
    en: () => import("@/dictionaries/landings/catch-the-attention/en.json"),
    es: () => import("@/dictionaries/landings/catch-the-attention/es.json"),
  },
};

export async function getEbookLandingCopy(
  slug: AllowedLandingSlug,
  locale: Locale,
): Promise<EbookLandingCopy> {
  const mod = await ebookLandingCopyLoaders[slug][locale]();
  return mod.default;
}
