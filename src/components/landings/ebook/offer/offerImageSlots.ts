/** Canonical filenames for transparent offer mockups (generated from reference). */
export const OFFER_EBOOK_FILE = "offer_ebook_mockup.png" as const;

/** Trimmed transparent PNG intrinsics — update if you re-run `generate-transparent-offer-assets.mjs`. */
export const OFFER_EBOOK_INTRINSIC = { width: 421, height: 470 } as const;

/** All four bonus mockups: same 3D book plate aspect in UI. */
export const OFFER_BONUS_CARD_INTRINSIC = { width: 227, height: 346 } as const;

export function offerBonusIntrinsic(_imageFile: string) {
  return OFFER_BONUS_CARD_INTRINSIC;
}
