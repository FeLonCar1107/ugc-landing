import type { Locale } from "@/i18n/config";
import type { AllowedLandingSlug } from "@/lib/allowedLandings";
import type { EbookLandingCopy } from "@/types/ebook-landing";
import { launchAssetBase } from "@/utils/launchEnv";
import {
  defaultBonusValueStackId,
  isBonusEnabled,
  isEbookLineItemId,
} from "@/utils/offerBonuses";

export const COMPLETE_SAGA_VOLUME_SLUGS = [
  "discover-your-character",
  "catch-the-attention",
  "magnetic-creator",
] as const satisfies readonly AllowedLandingSlug[];

const VOLUME_TAGS = ["Vol. 1", "Vol. 2", "Vol. 3"] as const;

function formatSagaBonusBadge(locale: Locale, bonusCount: number): string {
  const noun = bonusCount === 1 ? "bonus" : "bonuses";
  if (locale === "es") {
    return `3 ebooks + ${bonusCount} ${noun}`;
  }
  return `3 ebooks + ${bonusCount} ${noun}`;
}

function appendVolumeTag(label: string, volumeTag: string): string {
  if (label.includes(`(${volumeTag})`)) return label;
  return `${label} (${volumeTag})`;
}

type MergedBonus = EbookLandingCopy["offer"]["bonuses"][number];

/**
 * Builds the complete-saga offer from bundle copy plus each volume's active bonuses.
 * Value-stack rows and bonus cards stay in sync with per-volume `enabled` flags.
 */
export function mergeCompleteSagaOffer(
  bundleCopy: EbookLandingCopy,
  volumeCopies: EbookLandingCopy[],
  locale: Locale,
): EbookLandingCopy {
  const ebookLineItems = bundleCopy.offer.valueStack.lineItems.filter((row) =>
    isEbookLineItemId(row.id),
  );

  const mergedBonuses: MergedBonus[] = [];
  const mergedBonusLineItems: EbookLandingCopy["offer"]["valueStack"]["lineItems"] =
    [];

  volumeCopies.forEach((volumeCopy, volumeIndex) => {
    const volumeTag = VOLUME_TAGS[volumeIndex] ?? `Vol. ${volumeIndex + 1}`;
    const volumeSlug = COMPLETE_SAGA_VOLUME_SLUGS[volumeIndex];
    const { offer } = volumeCopy;

    offer.bonuses.forEach((bonus, bonusIndex) => {
      if (!isBonusEnabled(bonus)) return;

      const sourceStackId =
        bonus.valueStackId ?? defaultBonusValueStackId(bonusIndex);
      const sourceLineItem = offer.valueStack.lineItems.find(
        (row) => row.id === sourceStackId,
      );
      if (!sourceLineItem) return;

      const bundleStackId = `b${mergedBonuses.length + 1}`;

      mergedBonusLineItems.push({
        id: bundleStackId,
        label: appendVolumeTag(sourceLineItem.label, volumeTag),
        anchorValueLabel: sourceLineItem.anchorValueLabel,
      });

      mergedBonuses.push({
        enabled: true,
        valueStackId: bundleStackId,
        imageFile: bonus.imageFile,
        imageAssetBase: volumeSlug ? launchAssetBase(volumeSlug) : undefined,
        imageAlt: bonus.imageAlt,
        painHeadline: bonus.painHeadline,
        outcomeBenefit: bonus.outcomeBenefit,
      });
    });
  });

  const badges = [...bundleCopy.offer.hero.badges];
  if (badges.length > 1) {
    badges[1] = formatSagaBonusBadge(locale, mergedBonuses.length);
  } else if (mergedBonuses.length > 0) {
    badges.push(formatSagaBonusBadge(locale, mergedBonuses.length));
  }

  return {
    ...bundleCopy,
    offer: {
      ...bundleCopy.offer,
      hero: {
        ...bundleCopy.offer.hero,
        badges,
      },
      valueStack: {
        ...bundleCopy.offer.valueStack,
        lineItems: [...ebookLineItems, ...mergedBonusLineItems],
      },
      bonuses: mergedBonuses,
    },
  };
}
