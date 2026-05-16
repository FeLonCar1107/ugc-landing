/** Canonical filenames for transparent offer mockups (generated from reference). */
export const OFFER_EBOOK_FILE = "offer_ebook_mockup.png" as const;

/**
 * Target canvas for every slug's `offer_ebook_mockup.png`.
 * Run `npm run assets:normalize-offer-ebook` after replacing art so on-screen size matches.
 */
export const OFFER_EBOOK_INTRINSIC = { width: 421, height: 470 } as const;

export const OFFER_EBOOK_ASPECT_CLASS = "aspect-[421/470]" as const;

/** Max rendered width (hero + offer) — keep in sync with `OFFER_EBOOK_SIZES`. */
export const OFFER_EBOOK_MAX_WIDTH_PX = 300;

export const OFFER_EBOOK_IMAGE_QUALITY = 96;

export const OFFER_EBOOK_SIZES = `(max-width: 768px) min(${OFFER_EBOOK_MAX_WIDTH_PX}px, 88vw), (max-width: 1024px) 42vw, ${OFFER_EBOOK_MAX_WIDTH_PX}px`;

export const OFFER_EBOOK_SLOT_CLASS =
  `relative mx-auto flex w-full max-w-[min(${OFFER_EBOOK_MAX_WIDTH_PX}px,88vw)] flex-col` as const;

export const OFFER_EBOOK_FRAME_CLASS =
  `relative w-full shrink-0 ${OFFER_EBOOK_ASPECT_CLASS}` as const;

export const OFFER_EBOOK_IMAGE_CLASS =
  "object-contain object-bottom px-2 pt-2 pb-0 drop-shadow-[0_12px_40px_rgb(var(--brand-ink-rgb)/0.08)] sm:px-3 sm:pt-3" as const;

export const OFFER_EBOOK_GROUND_SHADOW_CLASS =
  "pointer-events-none h-2.5 w-[72%] max-w-[220px] shrink-0 rounded-[100%] bg-brand-ink/14 shadow-[0_0_24px_rgb(var(--brand-ink-rgb)/0.12)] blur-[12px] sm:h-3 sm:w-[68%] sm:blur-[14px]" as const;

/** Source bonus PNGs (612×408) — shared across launch slugs. */
export const OFFER_BONUS_CARD_INTRINSIC = { width: 612, height: 408 } as const;

export const OFFER_BONUS_ASPECT_CLASS = "aspect-[3/2]" as const;

export const OFFER_BONUS_FRAME_CLASS =
  `relative w-full shrink-0 ${OFFER_BONUS_ASPECT_CLASS}` as const;

export const OFFER_BONUS_IMAGE_CLASS =
  "object-contain object-bottom p-2 sm:p-3" as const;

export function offerBonusIntrinsic(_imageFile: string) {
  return OFFER_BONUS_CARD_INTRINSIC;
}
