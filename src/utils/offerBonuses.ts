import type { EbookLandingCopy } from "@/types/ebook-landing";

export type OfferBonus = EbookLandingCopy["offer"]["bonuses"][number];

/** Single-ebook landings use `ebook`; bundle landings use `ebook1`, `ebook2`, … */
export function isEbookLineItemId(id: string): boolean {
  return id === "ebook" || /^ebook\d+$/.test(id);
}

/** Bonus rows in the value stack use `b1`, `b2`, … */
export function isBonusLineItemId(id: string): boolean {
  return /^b\d+$/.test(id);
}

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
  const rounded = Math.round(amount * 100) / 100;
  const hasCents = Math.abs(rounded % 1) > 0;
  return hasCents ? `USD ${rounded.toFixed(2)}` : `USD ${rounded}`;
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
    (row) => isEbookLineItemId(row.id) || activeStackIds.has(row.id),
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
