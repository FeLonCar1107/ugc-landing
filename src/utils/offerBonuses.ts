import type { EbookLandingCopy } from "@/types/ebook-landing";

const EBOOK_LINE_ITEM_ID = "ebook";

export type OfferBonus = EbookLandingCopy["offer"]["bonuses"][number];

/** Default `valueStack` row id for bonus at index (0 → b1, 1 → b2, …). */
export function defaultBonusValueStackId(index: number): string {
  return `b${index + 1}`;
}

/** Per-bonus flag from landing JSON (`enabled: false` hides that bonus). */
export function isBonusEnabled(bonus: OfferBonus): boolean {
  return bonus.enabled !== false;
}

export function getActiveBonuses(
  offer: EbookLandingCopy["offer"],
): OfferBonus[] {
  return offer.bonuses.filter(isBonusEnabled);
}

export function hasActiveBonuses(offer: EbookLandingCopy["offer"]): boolean {
  return getActiveBonuses(offer).length > 0;
}

function parseUsdAmount(anchorValueLabel: string): number {
  const match = anchorValueLabel.match(/(\d+(?:[.,]\d+)?)/);
  if (!match) return 0;
  return Number(match[1].replace(",", "."));
}

function formatUsdTotal(amount: number): string {
  return `USD ${amount}`;
}

/**
 * Filters bonuses and matching value-stack rows; recomputes bundle anchor total
 * from enabled line items (ebook + active bonuses).
 */
export function buildOfferView(
  offer: EbookLandingCopy["offer"],
): EbookLandingCopy["offer"] {
  const activeEntries = offer.bonuses
    .map((bonus, index) => ({
      bonus,
      valueStackId: bonus.valueStackId ?? defaultBonusValueStackId(index),
    }))
    .filter(({ bonus }) => isBonusEnabled(bonus));

  const activeStackIds = new Set(
    activeEntries.map((entry) => entry.valueStackId),
  );

  const lineItems = offer.valueStack.lineItems.filter(
    (row) =>
      row.id === EBOOK_LINE_ITEM_ID || activeStackIds.has(row.id),
  );

  const totalAnchorLabel =
    lineItems.length > 0
      ? formatUsdTotal(
          lineItems.reduce(
            (sum, row) => sum + parseUsdAmount(row.anchorValueLabel),
            0,
          ),
        )
      : offer.valueStack.totalAnchorLabel;

  return {
    ...offer,
    bonuses: activeEntries.map((entry) => entry.bonus),
    valueStack: {
      ...offer.valueStack,
      lineItems,
      totalAnchorLabel,
    },
  };
}
