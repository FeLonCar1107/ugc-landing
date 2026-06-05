import { afterEach, describe, expect, it, vi } from "vitest";
import catchEs from "@/dictionaries/landings/catch-the-attention/es.json";
import completeSagaEs from "@/dictionaries/landings/complete-saga/es.json";
import discoverEs from "@/dictionaries/landings/discover-your-character/es.json";
import magneticEs from "@/dictionaries/landings/magnetic-creator/es.json";
import type { EbookLandingCopy } from "@/types/ebook-landing";
import { mergeCompleteSagaOffer } from "@/utils/completeSagaOffer";
import { applyLaunchOfferEnv } from "@/utils/launchOfferEnv";
import { buildOfferView } from "@/utils/offerBonuses";

function withLaunchEnv() {
  vi.stubEnv("NEXT_PUBLIC_LAUNCH_BONUS_ANCHOR_PRICE_USD", "3.9");
}

describe("mergeCompleteSagaOffer", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  function mergedBundleOffer(): EbookLandingCopy["offer"] {
    withLaunchEnv();
    const bundle = applyLaunchOfferEnv(
      completeSagaEs as EbookLandingCopy,
      "complete-saga",
    );
    const volumes = [
      applyLaunchOfferEnv(
        discoverEs as EbookLandingCopy,
        "discover-your-character",
      ),
      applyLaunchOfferEnv(
        catchEs as EbookLandingCopy,
        "catch-the-attention",
      ),
      applyLaunchOfferEnv(
        magneticEs as EbookLandingCopy,
        "magnetic-creator",
      ),
    ];
    return mergeCompleteSagaOffer(bundle, volumes, "es").offer;
  }

  it("includes only active bonuses from each volume landing", () => {
    const offer = mergedBundleOffer();
    expect(offer.bonuses).toHaveLength(7);
    expect(offer.hero.badges[1]).toBe("3 ebooks + 7 bonuses");
    expect(offer.bonuses.map((bonus) => bonus.imageAssetBase)).toEqual([
      "/launch-assets/discover-your-character",
      "/launch-assets/catch-the-attention",
      "/launch-assets/catch-the-attention",
      "/launch-assets/catch-the-attention",
      "/launch-assets/magnetic-creator",
      "/launch-assets/magnetic-creator",
      "/launch-assets/magnetic-creator",
    ]);
  });

  it("builds value stack from ebooks plus merged bonus rows", () => {
    const view = buildOfferView(mergedBundleOffer());
    expect(view.valueStack.lineItems.map((row) => row.id)).toEqual([
      "ebook1",
      "ebook2",
      "ebook3",
      "b1",
      "b2",
      "b3",
      "b4",
      "b5",
      "b6",
      "b7",
    ]);
    expect(view.valueStack.lineItems[3]?.label).toContain("(Vol. 1)");
    expect(view.valueStack.lineItems[7]?.label).toContain("Brand hunting");
    expect(view.valueStack.lineItems[7]?.label).toContain("(Vol. 3)");
    // ebook anchors from pricing.ts anglo normal: 27+37+39 = 103; 7 bonuses × 3.9 = 27.30
    expect(view.valueStack.totalAnchorLabel).toBe("USD 130.30");
  });

  it("reflects volume bonus toggles without editing complete-saga JSON", () => {
    withLaunchEnv();
    const bundle = applyLaunchOfferEnv(
      completeSagaEs as EbookLandingCopy,
      "complete-saga",
    );
    const magneticDisabled = applyLaunchOfferEnv(
      {
        ...(magneticEs as EbookLandingCopy),
        offer: {
          ...(magneticEs as EbookLandingCopy).offer,
          bonuses: (magneticEs as EbookLandingCopy).offer.bonuses.map(
            (bonus) => ({ ...bonus, enabled: false }),
          ),
        },
      },
      "magnetic-creator",
    );
    const offer = mergeCompleteSagaOffer(
      bundle,
      [
        applyLaunchOfferEnv(
          discoverEs as EbookLandingCopy,
          "discover-your-character",
        ),
        applyLaunchOfferEnv(
          catchEs as EbookLandingCopy,
          "catch-the-attention",
        ),
        magneticDisabled,
      ],
      "es",
    ).offer;

    expect(offer.bonuses).toHaveLength(4);
    expect(offer.hero.badges[1]).toBe("3 ebooks + 4 bonuses");
    expect(
      offer.valueStack.lineItems.some((row) =>
        row.label.includes("Brand hunting"),
      ),
    ).toBe(false);
  });
});
