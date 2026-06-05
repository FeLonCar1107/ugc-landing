import type { Locale } from "@/i18n/config";
import type { AllowedLandingSlug } from "@/lib/allowedLandings";
import type { EbookLandingCopy } from "@/types/ebook-landing";
import {
  COMPLETE_SAGA_VOLUME_SLUGS,
  mergeCompleteSagaOffer,
} from "@/utils/completeSagaOffer";
import { applyLaunchOfferEnv } from "@/utils/launchOfferEnv";

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
  "magnetic-creator": {
    en: () => import("@/dictionaries/landings/magnetic-creator/en.json"),
    es: () => import("@/dictionaries/landings/magnetic-creator/es.json"),
  },
  "complete-saga": {
    en: () => import("@/dictionaries/landings/complete-saga/en.json"),
    es: () => import("@/dictionaries/landings/complete-saga/es.json"),
  },
};

export async function getEbookLandingCopy(
  slug: AllowedLandingSlug,
  locale: Locale,
): Promise<EbookLandingCopy> {
  if (slug === "complete-saga") {
    const [bundleMod, ...volumeMods] = await Promise.all([
      ebookLandingCopyLoaders["complete-saga"][locale](),
      ...COMPLETE_SAGA_VOLUME_SLUGS.map((volumeSlug) =>
        ebookLandingCopyLoaders[volumeSlug][locale](),
      ),
    ]);

    const bundleWithEnv = applyLaunchOfferEnv(
      bundleMod.default,
      "complete-saga",
    );
    const volumesWithEnv = volumeMods.map((mod, index) =>
      applyLaunchOfferEnv(mod.default, COMPLETE_SAGA_VOLUME_SLUGS[index]),
    );

    return mergeCompleteSagaOffer(bundleWithEnv, volumesWithEnv, locale);
  }

  const mod = await ebookLandingCopyLoaders[slug][locale]();
  return applyLaunchOfferEnv(mod.default, slug);
}
