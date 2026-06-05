import type { AllowedLandingSlug } from "@/lib/allowedLandings";
import type { EbookLandingCopy } from "@/types/ebook-landing";
import { getReference } from "@/lib/pricing";
import {
  formatUsdAnchorLabel,
  getLaunchBonusAnchorPriceUsd,
} from "@/utils/launchEnv";
import { isBonusLineItemId, isEbookLineItemId } from "@/utils/offerBonuses";

/** Dictionary placeholder — resolved from env at runtime via `applyLaunchOfferEnv`. */
export const EBOOK_ANCHOR_ENV_SENTINEL = "env:EBOOK_ANCHOR" as const;
export const BONUS_ANCHOR_ENV_SENTINEL = "env:BONUS_ANCHOR" as const;

/** Maps complete-saga bundle stack rows to the slug that owns each volume's anchor env. */
const COMPLETE_SAGA_EBOOK_LINE_SLUGS: Record<string, AllowedLandingSlug> = {
  ebook1: "discover-your-character",
  ebook2: "catch-the-attention",
  ebook3: "magnetic-creator",
};

function ebookAnchorSlugForLineItem(
  lineId: string,
  landingSlug: AllowedLandingSlug,
): AllowedLandingSlug {
  if (lineId === "ebook") return landingSlug;
  return COMPLETE_SAGA_EBOOK_LINE_SLUGS[lineId] ?? landingSlug;
}

function resolveAnchorValueLabel(
  row: EbookLandingCopy["offer"]["valueStack"]["lineItems"][number],
  landingSlug: AllowedLandingSlug,
): string {
  if (isEbookLineItemId(row.id)) {
    const ref = getReference(ebookAnchorSlugForLineItem(row.id, landingSlug));
    return formatUsdAnchorLabel(String(ref));
  }

  if (isBonusLineItemId(row.id)) {
    const anchorUsd = getLaunchBonusAnchorPriceUsd();
    if (anchorUsd) return formatUsdAnchorLabel(anchorUsd);
    return row.anchorValueLabel === BONUS_ANCHOR_ENV_SENTINEL
      ? ""
      : row.anchorValueLabel;
  }

  return row.anchorValueLabel;
}

/**
 * Injects env-driven anchor prices for ebook and bonus rows in the offer value stack.
 */
export function applyLaunchOfferEnv(
  copy: EbookLandingCopy,
  landingSlug: AllowedLandingSlug,
): EbookLandingCopy {
  const lineItems = copy.offer.valueStack.lineItems.map((row) => ({
    ...row,
    anchorValueLabel: resolveAnchorValueLabel(row, landingSlug),
  }));

  return {
    ...copy,
    offer: {
      ...copy.offer,
      valueStack: {
        ...copy.offer.valueStack,
        lineItems,
      },
    },
  };
}
