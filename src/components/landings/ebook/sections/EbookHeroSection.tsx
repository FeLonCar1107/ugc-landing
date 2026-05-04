import Image from "next/image";
import type { EbookLandingCopy } from "@/types/ebook-landing";
import CheckoutLink from "../CheckoutLink";
import {
  HERO_HEADLINE_STARS_INTRINSIC,
  HERO_IMAGE_QUALITY,
  HERO_IMAGE_SIZES_DESKTOP,
  HERO_SIGNATURE_INTRINSIC,
  HERO_VISUAL_INTRINSIC,
  IMAGE_SLOTS,
  heroFigureDesktopStyle,
  heroFigureScaleWrapperStyle,
} from "../ebookLandingConstants";
import {
  ScrollReveal,
  ScrollRevealItem,
  ScrollRevealStagger,
} from "../ScrollReveal";

type EbookHeroSectionProps = {
  hero: EbookLandingCopy["hero"];
  checkoutUrl: string;
  timeToResult: string;
  asset: (filename: string) => string;
};

export default function EbookHeroSection({
  hero,
  checkoutUrl,
  timeToResult,
  asset,
}: EbookHeroSectionProps) {
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

          <ScrollRevealItem className="relative z-10 col-span-full mx-auto w-full max-w-[min(380px,92vw)] max-md:-mt-2 max-md:-mb-[min(14vw,4.25rem)] md:hidden">
            <figure className="relative mx-auto w-full max-w-[min(380px,92vw)]">
              <div className="max-md:-translate-y-[min(8vw,2.75rem)]">
                <Image
                  src={asset(IMAGE_SLOTS.heroVisual)}
                  alt={hero.decorativeAlt}
                  width={HERO_VISUAL_INTRINSIC.width}
                  height={HERO_VISUAL_INTRINSIC.height}
                  className="h-auto w-full object-contain object-top drop-shadow-[0_12px_40px_rgb(var(--brand-ink-rgb)/0.08)] [mask-image:linear-gradient(to_bottom,black_0%,black_78%,rgba(0,0,0,0.5)_88%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_78%,rgba(0,0,0,0.5)_88%,transparent_100%)]"
                  sizes="min(380px,92vw)"
                  quality={HERO_IMAGE_QUALITY}
                  priority
                />
              </div>
              <div
                className="pointer-events-none absolute right-[min(10%,2rem)] top-[clamp(10%,16vw,18%)] z-30 w-[clamp(4.5rem,33vw,6.5rem)] mix-blend-screen opacity-[0.94]"
                aria-hidden
              >
                <Image
                  src={asset(IMAGE_SLOTS.heroSignature)}
                  alt=""
                  width={HERO_SIGNATURE_INTRINSIC.width}
                  height={HERO_SIGNATURE_INTRINSIC.height}
                  className="h-auto w-full object-contain"
                  sizes="min(104px,33vw)"
                  quality={100}
                />
              </div>
              <figcaption className="sr-only">{hero.imageAlt}</figcaption>
            </figure>
          </ScrollRevealItem>

          <ScrollRevealItem className="relative z-10 flex min-w-0 flex-col gap-[clamp(0.875rem,2vw,1.125rem)] max-md:mt-14 md:col-start-1 md:row-start-2 md:mt-0 md:max-w-none md:pt-1 md:pl-24 md:-mr-10">
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

          <ScrollRevealItem className="relative z-20 hidden min-h-[260px] md:col-start-2 md:row-start-2 md:block md:min-h-0 -mt-10">
            <figure
              className="pointer-events-none absolute inset-x-0 bottom-0 z-20 overflow-visible drop-shadow-[0_12px_40px_rgb(var(--brand-ink-rgb)/0.08)]"
              style={heroFigureDesktopStyle}
            >
              <div className="absolute inset-0" style={heroFigureScaleWrapperStyle}>
                <Image
                  src={asset(IMAGE_SLOTS.heroVisual)}
                  alt={hero.decorativeAlt}
                  fill
                  className="object-cover object-[center_14%] [mask-image:linear-gradient(to_bottom,black_0%,black_74%,rgba(0,0,0,0.42)_87%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_74%,rgba(0,0,0,0.42)_87%,transparent_100%)]"
                  sizes={HERO_IMAGE_SIZES_DESKTOP}
                  quality={HERO_IMAGE_QUALITY}
                  priority
                />
              </div>
              <div
                className="pointer-events-none absolute left-[210px] top-[230px] z-30 w-[clamp(5.75rem,15vw,9.5rem)] mix-blend-screen opacity-[0.94]"
                aria-hidden
              >
                <Image
                  src={asset(IMAGE_SLOTS.heroSignature)}
                  alt=""
                  width={HERO_SIGNATURE_INTRINSIC.width}
                  height={HERO_SIGNATURE_INTRINSIC.height}
                  className="h-auto w-[85px] object-contain"
                  sizes="(max-width: 768px) 0px, min(152px,15vw)"
                  quality={100}
                />
              </div>
              <figcaption className="sr-only">{hero.imageAlt}</figcaption>
            </figure>
          </ScrollRevealItem>
        </ScrollRevealStagger>
      </div>
    </section>
  );
}
