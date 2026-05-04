import Image from "next/image";
import type { EbookLandingCopy } from "@/types/ebook-landing";
import {
  HERO_HEADLINE_STARS_INTRINSIC,
  IMAGE_SLOTS,
} from "../ebookLandingConstants";
import {
  OFFER_EBOOK_FILE,
  OFFER_EBOOK_INTRINSIC,
} from "../offer/offerImageSlots";
import CheckoutLink from "../CheckoutLink";
import {
  ScrollReveal,
  ScrollRevealItem,
  ScrollRevealStagger,
} from "../ScrollReveal";

const MOCKUP_IMAGE_QUALITY = 96;

/** Floor shadow under the 3D book — same pattern as `ProductHero` (shadow below opaque PNG). */
const GROUND_SHADOW =
  "pointer-events-none h-2.5 w-[72%] max-w-[220px] shrink-0 rounded-[100%] bg-brand-ink/14 shadow-[0_0_24px_rgb(var(--brand-ink-rgb)/0.12)] blur-[12px] sm:h-3 sm:w-[68%] sm:blur-[14px]";

export type EbookHeroMockupSectionProps = {
  hero: EbookLandingCopy["hero"];
  checkoutUrl: string;
  timeToResult: string;
  asset: (filename: string) => string;
};

/**
 * Top hero using the ebook mockup (`offer_ebook_mockup.png`).
 * Separate from `EbookHeroPortraitSection` so portrait masks, scale, and signature overlays stay untouched.
 */
export default function EbookHeroMockupSection({
  hero,
  checkoutUrl,
  timeToResult,
  asset,
}: EbookHeroMockupSectionProps) {
  const showEyebrow = hero.eyebrow.trim().length > 0;
  const showTimeToResult = timeToResult.trim().length > 0;

  return (
    <section className="relative overflow-x-clip overflow-y-visible bg-gradient-to-b from-brand-blush/40 to-brand-surface py-[clamp(3rem,8vw,5.5rem)] px-[clamp(1.25rem,8vw,6rem)] text-brand-ink">
      <div className="relative z-10 mx-auto w-full max-w-[76rem]">
        {showEyebrow ? (
          <ScrollReveal className="block" y={14} duration={0.55}>
            <p className="mb-1.5 text-center text-[0.6875rem] tracking-wide font-semibold uppercase text-brand-accent-mid md:text-xs">
              {hero.eyebrow}
            </p>
          </ScrollReveal>
        ) : null}

        <ScrollRevealStagger className="relative mx-auto grid w-full max-w-4xl grid-cols-1 gap-y-0 md:grid-cols-[minmax(0,1fr)_minmax(232px,min(44%,300px))] md:items-stretch md:gap-x-0 md:gap-y-[clamp(1.25rem,3vw,2rem)] lg:gap-x-3">
          <ScrollRevealItem
            className={`relative z-10 col-span-full m-0 max-w-none text-center text-pretty max-md:-mb-2 font-bold leading-[1.06] text-brand-ink text-3xl md:text-5xl tracking-tighter max-md:leading-[1.02] md:leading-[1.06]`}
          >
            <div className="flex items-start justify-center gap-2 sm:gap-3">
              <Image
                src={asset(IMAGE_SLOTS.heroHeadlineStars)}
                alt=""
                width={HERO_HEADLINE_STARS_INTRINSIC.width}
                height={HERO_HEADLINE_STARS_INTRINSIC.height}
                className="mt-[0.1em] h-[0.92em] w-auto shrink-0 origin-center object-contain mix-blend-screen opacity-[0.95] sm:h-[1em] md:h-[0.95em]"
                sizes="(max-width: 768px) 14vw, 72px"
                quality={100}
                priority
                aria-hidden
              />
              <h1 className="m-0 max-w-none text-inherit">{hero.productTitle}</h1>
            </div>
          </ScrollRevealItem>

          <ScrollRevealItem className="relative z-10 col-span-full mx-auto w-full max-w-[min(380px,92vw)] max-md:-mt-1 max-md:-mb-[min(10vw,3rem)] md:hidden">
            <figure className="flex w-full flex-col items-center">
              <div className="relative h-[min(17.5rem,52vw)] w-full max-w-[min(300px,88vw)]">
                <Image
                  src={asset(OFFER_EBOOK_FILE)}
                  alt={hero.decorativeAlt}
                  fill
                  className="object-contain object-center px-2 pt-2 pb-0 drop-shadow-[0_12px_40px_rgb(var(--brand-ink-rgb)/0.08)]"
                  sizes="min(300px,88vw)"
                  quality={MOCKUP_IMAGE_QUALITY}
                  priority
                />
              </div>
              <div className="-mt-5 flex shrink-0 justify-center pb-1 pt-0" aria-hidden>
                <div className={GROUND_SHADOW} />
              </div>
              <figcaption className="sr-only">{hero.imageAlt}</figcaption>
            </figure>
          </ScrollRevealItem>

          <ScrollRevealItem className="relative z-10 flex min-w-0 flex-col gap-[clamp(0.875rem,2vw,1.125rem)] max-md:mt-8 md:col-start-1 md:row-start-2 md:mt-0 md:max-w-none md:pt-1 md:pl-24 md:-mr-10">
            <h2 className="m-0 text-pretty text-[clamp(1.125rem,2.25vw,1.5rem)] font-semibold leading-snug text-brand-ink">
              {hero.headline}
            </h2>
            <p className="m-0 text-[clamp(0.9375rem,1.75vw,1.0625rem)] font-normal leading-relaxed text-brand-ink">
              {hero.subhead}
            </p>
            {showTimeToResult ? (
              <p className="text-sm text-brand-ink/65">
                <span className="font-semibold text-brand-accent-mid">{timeToResult}</span>
              </p>
            ) : null}
            <div className="flex justify-start pt-1">
              <CheckoutLink
                href={checkoutUrl}
                className="inline-flex items-center justify-center rounded-full border border-brand-accent-mid bg-brand-accent-mid/[0.07] px-[1.75rem] py-3.5 text-base font-bold leading-tight text-brand-accent-mid no-underline transition-colors duration-200 hover:bg-brand-accent-mid hover:text-brand-card md:px-[2rem] md:py-4 md:text-[1.0625rem]"
              >
                {hero.cta}
              </CheckoutLink>
            </div>
          </ScrollRevealItem>

          <ScrollRevealItem className="relative z-20 hidden min-h-[240px] md:col-start-2 md:row-start-2 md:flex md:min-h-0 md:items-end md:justify-center md:pb-2 md:pt-4">
            <figure className="flex w-full max-w-[300px] flex-col items-center">
              <div className="relative aspect-[421/470] w-full max-w-[280px]">
                <Image
                  src={asset(OFFER_EBOOK_FILE)}
                  alt={hero.decorativeAlt}
                  width={OFFER_EBOOK_INTRINSIC.width}
                  height={OFFER_EBOOK_INTRINSIC.height}
                  className="h-full w-full object-contain object-center drop-shadow-[0_12px_40px_rgb(var(--brand-ink-rgb)/0.08)]"
                  sizes="(max-width: 768px) 0px, min(280px,30vw)"
                  quality={MOCKUP_IMAGE_QUALITY}
                  priority
                />
              </div>
              <div className="-mt-4 flex shrink-0 justify-center pb-1" aria-hidden>
                <div className={GROUND_SHADOW} />
              </div>
              <figcaption className="sr-only">{hero.imageAlt}</figcaption>
            </figure>
          </ScrollRevealItem>
        </ScrollRevealStagger>
      </div>
    </section>
  );
}
