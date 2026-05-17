import { describe, expect, it } from "vitest";
import type { EbookLandingCopy } from "@/types/ebook-landing";
import es from "@/dictionaries/landings/discover-your-character/es.json";
import {
  buildOfferView,
  getActiveBonuses,
  hasActiveBonuses,
  isBonusEnabled,
} from "@/utils/offerBonuses";

describe("isBonusEnabled", () => {
  it("is true when enabled is true or omitted", () => {
    expect(isBonusEnabled({ enabled: true } as never)).toBe(true);
    expect(isBonusEnabled({} as never)).toBe(true);
  });

  it("is false only when enabled is false", () => {
    expect(isBonusEnabled({ enabled: false } as never)).toBe(false);
  });
});

describe("buildOfferView", () => {
  const offer = es.offer as EbookLandingCopy["offer"];

  it("returns all bonuses and full stack when every bonus is enabled", () => {
    const view = buildOfferView(offer);
    expect(view.bonuses).toHaveLength(4);
    expect(view.valueStack.lineItems).toHaveLength(5);
    expect(view.valueStack.totalAnchorLabel).toBe("USD 81");
  });

  it("filters bonuses and value-stack rows per enabled flag", () => {
    const partial = {
      ...offer,
      bonuses: offer.bonuses.map((bonus, i) => ({
        ...bonus,
        enabled: i < 2,
      })),
    };
    const view = buildOfferView(partial);
    expect(view.bonuses).toHaveLength(2);
    expect(view.valueStack.lineItems.map((r) => r.id)).toEqual([
      "ebook",
      "b1",
      "b2",
    ]);
    expect(view.valueStack.totalAnchorLabel).toBe("USD 57");
  });

  it("ebook-only stack when all bonuses disabled", () => {
    const none = {
      ...offer,
      bonuses: offer.bonuses.map((bonus) => ({ ...bonus, enabled: false })),
    };
    const view = buildOfferView(none);
    expect(view.bonuses).toHaveLength(0);
    expect(view.valueStack.lineItems).toHaveLength(1);
    expect(view.valueStack.lineItems[0]?.id).toBe("ebook");
    expect(view.valueStack.totalAnchorLabel).toBe("USD 27");
  });

  it("hasActiveBonuses reflects active count", () => {
    expect(hasActiveBonuses(offer)).toBe(true);
    expect(getActiveBonuses(offer)).toHaveLength(4);
    const none = {
      ...offer,
      bonuses: offer.bonuses.map((bonus) => ({ ...bonus, enabled: false })),
    };
    expect(hasActiveBonuses(none)).toBe(false);
  });
});
