import { afterEach, describe, expect, it, vi } from "vitest";
import type { EbookLandingCopy } from "@/types/ebook-landing";
import es from "@/dictionaries/landings/discover-your-character/es.json";
import {
  applyLaunchOfferEnv,
  BONUS_ANCHOR_ENV_SENTINEL,
  EBOOK_ANCHOR_ENV_SENTINEL,
} from "@/utils/launchOfferEnv";
import {
  formatUsdAnchorLabel,
  getLaunchBonusAnchorPriceUsd,
} from "@/utils/launchEnv";

describe("launchEnv — formatUsdAnchorLabel", () => {
  it("normalizes numeric and USD-prefixed values", () => {
    expect(formatUsdAnchorLabel("27")).toBe("USD 27");
    expect(formatUsdAnchorLabel("USD 27")).toBe("USD 27");
    expect(formatUsdAnchorLabel("3.9")).toBe("USD 3.9");
  });
});

describe("launchEnv — bonus anchor price", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("getLaunchBonusAnchorPriceUsd reads global env", () => {
    vi.stubEnv("NEXT_PUBLIC_LAUNCH_BONUS_ANCHOR_PRICE_USD", "3.9");
    expect(getLaunchBonusAnchorPriceUsd()).toBe("3.9");
  });
});

describe("applyLaunchOfferEnv", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("replaces ebook sentinel with anglo normal price from pricing.ts and bonus sentinel from env", () => {
    vi.stubEnv("NEXT_PUBLIC_LAUNCH_BONUS_ANCHOR_PRICE_USD", "3.9");
    const offer = es.offer as EbookLandingCopy["offer"];
    expect(offer.valueStack.lineItems[0]?.anchorValueLabel).toBe(
      EBOOK_ANCHOR_ENV_SENTINEL,
    );
    expect(offer.valueStack.lineItems[2]?.anchorValueLabel).toBe(
      BONUS_ANCHOR_ENV_SENTINEL,
    );

    const resolved = applyLaunchOfferEnv(
      { ...es, offer } as EbookLandingCopy,
      "discover-your-character",
    );
    // discover-your-character anglo normal = 27
    expect(resolved.offer.valueStack.lineItems[0]?.anchorValueLabel).toBe(
      "USD 27",
    );
    expect(resolved.offer.valueStack.lineItems[2]?.anchorValueLabel).toBe(
      "USD 3.9",
    );
  });
});
