/** Canonical filenames for transparent offer mockups (generated from reference). */
export const OFFER_EBOOK_FILE = "offer_ebook_mockup.png" as const;

/**
 * Target canvas for every slug's `offer_ebook_mockup.png`.
 * Run `npm run assets:normalize-offer-ebook` after replacing art so on-screen size matches.
 */
export const OFFER_EBOOK_INTRINSIC = { width: 421, height: 470 } as const;

export const OFFER_EBOOK_ASPECT_CLASS = "aspect-[421/470]" as const;

export const OFFER_EBOOK_MAX_WIDTH_PX = 300;

/** Offer card grid — smaller than hero so the value stack gets more room. */
export const OFFER_CARD_EBOOK_MAX_WIDTH_PX = 220;

export const OFFER_EBOOK_IMAGE_QUALITY = 96;

export const OFFER_EBOOK_SIZES = `(max-width: 768px) min(${OFFER_EBOOK_MAX_WIDTH_PX}px, 88vw), (max-width: 1024px) 42vw, ${OFFER_EBOOK_MAX_WIDTH_PX}px`;

export const OFFER_CARD_EBOOK_SIZES = `(max-width: 768px) min(${OFFER_CARD_EBOOK_MAX_WIDTH_PX}px, 78vw), (max-width: 1024px) 28vw, ${OFFER_CARD_EBOOK_MAX_WIDTH_PX}px`;

const EBOOK_MOCKUP_MAX_W = `max-w-[min(${OFFER_EBOOK_MAX_WIDTH_PX}px,88vw)]`;

const OFFER_CARD_MOCKUP_MAX_W = `max-w-[min(${OFFER_CARD_EBOOK_MAX_WIDTH_PX}px,78vw)]`;

/** Hero mockup — override in `globals.css` via `.ebook-hero-mockup__*`. */
export const EBOOK_HERO_MOCKUP = {
  root: "ebook-hero-mockup mx-5 mt-7 mb-10 md:-mt-10",
  slot: `ebook-hero-mockup__slot relative mx-auto flex w-full ${EBOOK_MOCKUP_MAX_W} flex-col`,
  frame: `ebook-hero-mockup__frame relative w-full shrink-0 ${OFFER_EBOOK_ASPECT_CLASS}`,
  image:
    "ebook-hero-mockup__image object-contain object-bottom p-0 drop-shadow-[0_12px_40px_rgb(var(--brand-ink-rgb)/0.08)]",
  shadowWrap: "ebook-hero-mockup__shadow-wrap -mt-5 flex shrink-0 justify-center pb-1 pt-0",
  shadow:
    "ebook-hero-mockup__shadow pointer-events-none h-2.5 w-[72%] max-w-[220px] shrink-0 rounded-[100%] bg-brand-ink/14 shadow-[0_0_24px_rgb(var(--brand-ink-rgb)/0.12)] blur-[12px] sm:h-3 sm:w-[68%] sm:blur-[14px]",
} as const;

/** Offer card mockup — override in `globals.css` via `.ebook-offer-mockup__*`. */
export const EBOOK_OFFER_MOCKUP = {
  root: "ebook-offer-mockup",
  slot: `ebook-offer-mockup__slot relative mx-auto flex w-full ${OFFER_CARD_MOCKUP_MAX_W} flex-col`,
  frame: `ebook-offer-mockup__frame relative w-full shrink-0 ${OFFER_EBOOK_ASPECT_CLASS}`,
  image:
    "ebook-offer-mockup__image object-contain object-bottom p-0 drop-shadow-[0_12px_40px_rgb(var(--brand-ink-rgb)/0.08)]",
  shadowWrap: "ebook-offer-mockup__shadow-wrap -mt-5 flex shrink-0 justify-center pb-1 pt-0",
  shadow:
    "ebook-offer-mockup__shadow pointer-events-none h-2.5 w-[72%] max-w-[220px] shrink-0 rounded-[100%] bg-brand-ink/14 shadow-[0_0_24px_rgb(var(--brand-ink-rgb)/0.12)] blur-[12px] sm:h-3 sm:w-[68%] sm:blur-[14px]",
} as const;

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
