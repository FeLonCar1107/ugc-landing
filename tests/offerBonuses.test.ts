import { afterEach, describe, expect, it, vi } from "vitest";
import type { EbookLandingCopy } from "@/types/ebook-landing";
import es from "@/dictionaries/landings/discover-your-character/es.json";
import { applyLaunchOfferEnv } from "@/utils/launchOfferEnv";
import {
  buildOfferView,
  getActiveBonuses,
  hasActiveBonuses,
  isBonusEnabled,
  isEbookLineItemId,
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

describe("isEbookLineItemId", () => {
  it("matches single and bundle ebook ids", () => {
    expect(isEbookLineItemId("ebook")).toBe(true);
    expect(isEbookLineItemId("ebook1")).toBe(true);
    expect(isEbookLineItemId("ebook2")).toBe(true);
    expect(isEbookLineItemId("b1")).toBe(false);
  });
});

describe("buildOfferView", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  function discoverOffer(): EbookLandingCopy["offer"] {
    vi.stubEnv("NEXT_PUBLIC_LAUNCH_BONUS_ANCHOR_PRICE_USD", "3.9");
    return applyLaunchOfferEnv(
      es as EbookLandingCopy,
      "discover-your-character",
    ).offer as EbookLandingCopy["offer"];
  }

  it("returns all bonuses and full stack when every bonus is enabled", () => {
    const offer = discoverOffer();
    const view = buildOfferView(offer);
    expect(view.bonuses).toHaveLength(1);
    expect(view.valueStack.lineItems).toHaveLength(2);
    expect(view.valueStack.lineItems.map((r) => r.id)).toEqual(["ebook", "b3"]);
    expect(view.valueStack.totalAnchorLabel).toBe("USD 30.90");
  });

  it("filters bonuses and value-stack rows per enabled flag", () => {
    const offer = discoverOffer();
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
    expect(view.valueStack.totalAnchorLabel).toBe("USD 34.80");
  });

  it("ebook-only stack when all bonuses disabled", () => {
    const offer = discoverOffer();
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
    const offer = discoverOffer();
    expect(hasActiveBonuses(offer)).toBe(true);
    expect(getActiveBonuses(offer)).toHaveLength(1);
    const none = {
      ...offer,
      bonuses: offer.bonuses.map((bonus) => ({ ...bonus, enabled: false })),
    };
    expect(hasActiveBonuses(none)).toBe(false);
  });
});
