import { describe, expect, it } from "vitest";
import type { EbookLandingCopy } from "@/types/ebook-landing";
import en from "@/dictionaries/landings/discover-your-character/en.json";
import es from "@/dictionaries/landings/discover-your-character/es.json";

function assertOfferStackContract(
  offer: EbookLandingCopy["offer"],
  label: string,
) {
  expect(offer.sectionTitle, `${label} sectionTitle`).toBeTruthy();
  expect(offer.hero.badges.length, `${label} hero.badges`).toBeGreaterThanOrEqual(
    2,
  );
  expect(offer.hero.statement, `${label} hero.statement`).toBeTruthy();
  expect(offer.hero.imageAlt, `${label} hero.imageAlt`).toBeTruthy();
  expect(offer.valueStack.lineItems.length, `${label} valueStack`).toBeGreaterThan(
    0,
  );
  expect(offer.valueStack.totalLabel).toBeTruthy();
  expect(offer.valueStack.totalAnchorLabel).toBeTruthy();
  expect(offer.valueStack.youPayLabel).toBeTruthy();
  expect(offer.bonusesSectionTitle).toBeTruthy();
  expect(offer.bonuses, `${label} bonuses`).toHaveLength(4);
  const files = offer.bonuses.map((b) => b.imageFile).sort();
  expect(files).toEqual([
    "offer_bonus_01.png",
    "offer_bonus_02.png",
    "offer_bonus_03.png",
    "offer_bonus_04.png",
  ]);
  for (const b of offer.bonuses) {
    expect(b.imageAlt).toBeTruthy();
    expect(b.painHeadline).toBeTruthy();
    expect(b.outcomeBenefit).toBeTruthy();
  }
  expect(offer.urgency.title).toBeTruthy();
  expect(offer.urgency.bullets.length).toBeGreaterThan(0);
  expect(offer.ctaPrimary).toBeTruthy();
  expect(offer.supportEmail).toMatch(/@/);
  expect(offer.priceHint).toBeTruthy();
}

describe("discover-your-character dictionaries — offer stack", () => {
  it("es.json offer satisfies extended contract (A11)", () => {
    assertOfferStackContract(es.offer as EbookLandingCopy["offer"], "es");
  });

  it("en.json offer satisfies extended contract (A11)", () => {
    assertOfferStackContract(en.offer as EbookLandingCopy["offer"], "en");
  });
});
