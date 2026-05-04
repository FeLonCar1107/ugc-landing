import type { CSSProperties } from "react";

/** Section titles: weight + tracking; copy casing comes from JSON. */
export const sectionBandHeading =
  "font-semibold tracking-tighter text-[clamp(1.125rem,3.5vw,1.875rem)] leading-tight text-brand-ink md:text-[clamp(1.375rem,3vw,2.375rem)]";

export const IMAGE_SLOTS = {
  heroVisual: "hero_done.png",
  heroHeadlineStars: "hero_headline_stars.png",
  heroSignature: "hero_signature.png",
  proofTimeline: "proof_done.png",
  proofHeadlineCamera: "proof_headline_camera.png",
  solutionAchievementTrophy: "solution_achievement_trophy.png",
  solutionEbookHighlightOval: "solution_ebook_highlight_oval.png",
  faqAside: "faq_done.png",
  closeHeart: "close_heart.png",
} as const;

/** Timeline stills: `proof_timeline_{year}.png` aligned with `timeline[].year`. */
export function proofTimelineImageForYear(year: string): string {
  return `proof_timeline_${year}.png`;
}

/** Intrinsic pixels of `IMAGE_SLOTS.heroVisual`. */
export const HERO_VISUAL_INTRINSIC = { width: 3748, height: 3684 } as const;

/** Intrinsic pixels of `IMAGE_SLOTS.heroSignature`. */
export const HERO_SIGNATURE_INTRINSIC = { width: 384, height: 213 } as const;

/** Intrinsic pixels of `IMAGE_SLOTS.heroHeadlineStars`. */
export const HERO_HEADLINE_STARS_INTRINSIC = { width: 241, height: 259 } as const;

/** Intrinsic pixels of `IMAGE_SLOTS.solutionAchievementTrophy`. */
export const SOLUTION_TROPHY_INTRINSIC = { width: 300, height: 375 } as const;

/** Intrinsic pixels of `IMAGE_SLOTS.solutionEbookHighlightOval`. */
export const SOLUTION_EBOOK_OVAL_INTRINSIC = { width: 367, height: 131 } as const;

/** Intrinsic pixels of `IMAGE_SLOTS.proofHeadlineCamera`. */
export const PROOF_HEADLINE_CAMERA_INTRINSIC = { width: 848, height: 641 } as const;

/** Intrinsic pixels of `IMAGE_SLOTS.closeHeart`. */
export const CLOSE_HEART_INTRINSIC = { width: 134, height: 251 } as const;

/** Hero photo: Next/Image default quality (75) reads soft at this crop scale. */
export const HERO_IMAGE_QUALITY = 96;

/** Desktop hero portrait (absolute in grid rail). */
export const HERO_IMAGE_DESKTOP = {
  top: "clamp(-5.75rem,-14vw,-2.75rem)",
  scale: 1.06,
} as const;

/**
 * Desktop rail caps at 300px CSS width; scale upsamples the bitmap — bump sizes so
 * Next srcset targets are not undersized.
 */
export const HERO_IMAGE_SIZES_DESKTOP = `(max-width: 768px) 0px, min(${Math.ceil(300 * HERO_IMAGE_DESKTOP.scale)}px, 92vw)`;

export const heroFigureDesktopStyle = {
  top: HERO_IMAGE_DESKTOP.top,
} satisfies CSSProperties;

export const heroFigureScaleWrapperStyle = {
  transform: `scale(${HERO_IMAGE_DESKTOP.scale})`,
  transformOrigin: "top center",
} satisfies CSSProperties;
