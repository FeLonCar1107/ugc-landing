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
  getLaunchEbookAnchorPriceUsd,
} from "@/utils/launchEnv";

const SLUG = "discover-your-character";

describe("launchEnv — ebook anchor price", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("getLaunchEbookAnchorPriceUsd uses per-slug env", () => {
    vi.stubEnv(
      "NEXT_PUBLIC_LAUNCH_DISCOVER_YOUR_CHARACTER_EBOOK_ANCHOR_PRICE_USD",
      "27",
    );
    expect(getLaunchEbookAnchorPriceUsd(SLUG)).toBe("27");
  });

  it("getLaunchEbookAnchorPriceUsd prefers per-slug over global fallback", () => {
    vi.stubEnv("NEXT_PUBLIC_LAUNCH_EBOOK_ANCHOR_PRICE_USD", "25");
    vi.stubEnv(
      "NEXT_PUBLIC_LAUNCH_DISCOVER_YOUR_CHARACTER_EBOOK_ANCHOR_PRICE_USD",
      "29",
    );
    expect(getLaunchEbookAnchorPriceUsd(SLUG)).toBe("29");
  });

  it("getLaunchEbookAnchorPriceUsd falls back to global env", () => {
    vi.stubEnv("NEXT_PUBLIC_LAUNCH_EBOOK_ANCHOR_PRICE_USD", "25");
    expect(getLaunchEbookAnchorPriceUsd(SLUG)).toBe("25");
  });

  it("formatUsdAnchorLabel normalizes numeric and USD-prefixed values", () => {
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

  it("replaces env sentinel on ebook rows from per-slug anchor env", () => {
    vi.stubEnv(
      "NEXT_PUBLIC_LAUNCH_DISCOVER_YOUR_CHARACTER_EBOOK_ANCHOR_PRICE_USD",
      "27",
    );
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
    expect(resolved.offer.valueStack.lineItems[0]?.anchorValueLabel).toBe(
      "USD 27",
    );
    expect(resolved.offer.valueStack.lineItems[2]?.anchorValueLabel).toBe(
      "USD 3.9",
    );
  });
});
