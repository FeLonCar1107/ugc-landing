import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { montserrat } from "@/app/ui/fonts";
import type { EbookLandingCopy } from "@/types/ebook-landing";
import FaqAccordion from "./FaqAccordion";
import {
  ScrollReveal,
  ScrollRevealItem,
  ScrollRevealLi,
  ScrollRevealStagger,
  ScrollRevealStaggerUl,
} from "./ScrollReveal";
import StickyLaunchCta from "./StickyLaunchCta";

/** Titulares de sección: peso + tracking; el texto respeta mayúsculas/minúsculas del copy (JSON). */
const sectionBandHeading =
  "font-semibold tracking-tighter text-[clamp(1.125rem,3.5vw,1.875rem)] leading-tight text-[#131212] md:text-[clamp(1.375rem,3vw,2.375rem)]";

/** Filenames expected under `assetBase` (mirror `discover-your-character` or swap files keeping names). */
const IMAGE_SLOTS = {
  heroVisual: "hero_done.png",
  /** Doodle stars to the left of the hero product title (`hero_headline_stars.png`). */
  heroHeadlineStars: "hero_headline_stars.png",
  heroSignature: "hero_signature.png",
  proofTimeline: "proof_done.png",
  proofHeadlineCamera: "proof_headline_camera.png",
  solutionAchievementTrophy: "solution_achievement_trophy.png",
  solutionEbookHighlightOval: "solution_ebook_highlight_oval.png",
  faqAside: "faq_done.png",
} as const;

/** Per-year visuals in the proof timeline (`proof_timeline_2022.png` … matching `timeline[].year`). */
function proofTimelineImageForYear(year: string) {
  return `proof_timeline_${year}.png`;
}

/** Intrinsic pixels of `IMAGE_SLOTS.heroVisual` — keeps Next/Image aspect + srcset honest. */
const HERO_VISUAL_INTRINSIC = { width: 3748, height: 3684 } as const;

/** Intrinsic pixels of `IMAGE_SLOTS.heroSignature`. */
const HERO_SIGNATURE_INTRINSIC = { width: 384, height: 213 } as const;

/** Intrinsic pixels of `IMAGE_SLOTS.heroHeadlineStars`. */
const HERO_HEADLINE_STARS_INTRINSIC = { width: 241, height: 259 } as const;

/** Intrinsic pixels of `IMAGE_SLOTS.solutionAchievementTrophy`. */
const SOLUTION_TROPHY_INTRINSIC = { width: 300, height: 375 } as const;

/** Intrinsic pixels of `IMAGE_SLOTS.solutionEbookHighlightOval`. */
const SOLUTION_EBOOK_OVAL_INTRINSIC = { width: 367, height: 131 } as const;

/** Intrinsic pixels of `IMAGE_SLOTS.proofHeadlineCamera`. */
const PROOF_HEADLINE_CAMERA_INTRINSIC = { width: 848, height: 641 } as const;

/** Hero photo: Next/Image default quality (75) reads soft on hair/detail at this crop scale. */
const HERO_IMAGE_QUALITY = 96;

/** Desktop hero portrait (absolute in grid rail): tweak `top` for title overlap strength. */
const HERO_IMAGE_DESKTOP = {
  top: "clamp(-5.75rem,-14vw,-2.75rem)",
  /** Extra zoom so the figure reads taller inside the rail (symmetric vs copy + CTA) */
  scale: 1.06,
} as const;

/**
 * Desktop rail caps at 300px CSS width; `scale(1.06)` upsamples the bitmap — bump `sizes` by scale
 * so Next srcset targets aren’t undersized (DPR is applied by the browser on top).
 */
const HERO_IMAGE_SIZES_DESKTOP =
  `(max-width: 768px) 0px, min(${Math.ceil(300 * HERO_IMAGE_DESKTOP.scale)}px, 92vw)`;

/** Warm plate behind transparent PNG cutouts (cream / blush) — avoids “floating” halos vs flat page bg. */
function CutoutPlate({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={[
        "relative overflow-hidden rounded-2xl",
        "bg-gradient-to-b from-[#FFFBF7] via-[#FFF6F2] to-[#EFE8E4]",
        "shadow-[0_16px_48px_-20px_rgba(180,110,130,0.28)]",
        className ?? "",
      ].join(" ")}
    >
      {children}
    </div>
  );
}

function GrainOverlay() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.07]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}

function CheckoutLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const safe = href || "#offer";
  return (
    <a
      href={safe}
      className={className}
      {...(!href ? { "aria-disabled": true } : {})}
    >
      {children}
    </a>
  );
}

function SolutionSectionHeading({
  copy,
  asset,
}: {
  copy: EbookLandingCopy;
  asset: (filename: string) => string;
}) {
  const parts = copy.solution.titleHighlight;
  if (!parts) {
    return <>{copy.solution.title}</>;
  }
  return (
    <>
      {parts.before}
      <span className="relative inline-block whitespace-nowrap">
        <Image
          src={asset(IMAGE_SLOTS.solutionEbookHighlightOval)}
          alt=""
          width={SOLUTION_EBOOK_OVAL_INTRINSIC.width}
          height={SOLUTION_EBOOK_OVAL_INTRINSIC.height}
          className="pointer-events-none absolute left-1/2 top-[52%] z-0 h-[1.42em] w-auto max-w-none -translate-x-1/2 -translate-y-1/2 select-none object-contain opacity-[0.92]"
          sizes="(max-width:768px) 55vw, min(280px, 28vw)"
          quality={100}
          aria-hidden
        />
        <span className="relative z-10">{parts.highlight}</span>
      </span>
      {parts.after}
    </>
  );
}

export default function EbookLanding({
  copy,
  assetBase,
  checkoutUrl,
  priceUsd,
  timeToResult,
}: {
  copy: EbookLandingCopy;
  /** e.g. `/launch-assets/<slug>` — no trailing slash */
  assetBase: string;
  checkoutUrl: string;
  priceUsd: string;
  timeToResult: string;
}) {
  const base = assetBase.replace(/\/$/, "");
  const asset = (filename: string) => `${base}/${filename}`;

  const priceLine =
    priceUsd.trim().length > 0 ? `$${priceUsd} USD` : copy.offer.priceHint;

  return (
    <div
      className={`relative min-h-screen tracking-tight bg-[#F8F7F4] text-[#131212] ${montserrat.className}`}
    >
      <StickyLaunchCta
        label={copy.hero.cta}
        href={checkoutUrl}
        hideWhenIntersectingId="landing-close"
      />

      {/* Hero — grid stacks title + copy; portrait is absolute in right rail (overlap + height = copy column) */}
      <section className="relative overflow-x-clip overflow-y-visible bg-gradient-to-b from-[#ffe8f4]/40 to-[#F8F7F4] py-[clamp(3rem,8vw,5.5rem)] px-[clamp(1.25rem,8vw,6rem)] text-black">
        <div className="relative z-10 mx-auto w-full max-w-[76rem]">
          {/* Eyebrow stays outside the hero grid so md:row-start-2 still targets the row below the H1 */}
          {copy.hero.eyebrow.trim().length > 0 ? (
            <ScrollReveal className="block" y={14} duration={0.55}>
              <p className="mb-1.5 text-center text-[0.6875rem] tracking-wide font-semibold uppercase text-[#e91e63] md:text-xs">
                {copy.hero.eyebrow}
              </p>
            </ScrollReveal>
          ) : null}

          <ScrollRevealStagger className="relative mx-auto grid w-full max-w-4xl grid-cols-1 gap-y-0 md:grid-cols-[minmax(0,1fr)_minmax(232px,min(44%,300px))] md:items-stretch md:gap-x-0 md:gap-y-[clamp(1.25rem,3vw,2rem)] lg:gap-x-3">
            <ScrollRevealItem
              className={`relative z-10 col-span-full m-0 max-w-none text-center text-pretty max-md:-mb-2 font-bold leading-[1.06] text-black text-3xl md:text-5xl tracking-tighter max-md:leading-[1.02] md:leading-[1.06]`}
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
                <h1 className="m-0 max-w-none text-inherit">
                  {copy.hero.productTitle}
                </h1>
              </div>
            </ScrollRevealItem>

            {/* Mobile: portrait tucked under title (PNG pad + grid gap handled separately from copy block) */}
            <ScrollRevealItem className="relative z-10 col-span-full mx-auto w-full max-w-[min(380px,92vw)] max-md:-mt-2 max-md:-mb-[min(14vw,4.25rem)] md:hidden">
              <figure className="relative mx-auto w-full max-w-[min(380px,92vw)]">
                <div className="max-md:-translate-y-[min(8vw,2.75rem)]">
                  <Image
                    src={asset(IMAGE_SLOTS.heroVisual)}
                    alt={copy.hero.decorativeAlt}
                    width={HERO_VISUAL_INTRINSIC.width}
                    height={HERO_VISUAL_INTRINSIC.height}
                    className="h-auto w-full object-contain object-top drop-shadow-[0_12px_40px_rgba(30,20,25,0.08)] [mask-image:linear-gradient(to_bottom,black_0%,black_78%,rgba(0,0,0,0.5)_88%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_78%,rgba(0,0,0,0.5)_88%,transparent_100%)]"
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
                <figcaption className="sr-only">{copy.hero.imageAlt}</figcaption>
              </figure>
            </ScrollRevealItem>

            <ScrollRevealItem className="relative z-10 flex min-w-0 flex-col gap-[clamp(0.875rem,2vw,1.125rem)] max-md:mt-14 md:col-start-1 md:row-start-2 md:mt-0 md:max-w-none md:pt-1 md:pl-24 md:-mr-10">
              <h2 className="m-0 text-pretty text-[clamp(1.125rem,2.25vw,1.5rem)] font-semibold leading-snug text-black">
                {copy.hero.headline}
              </h2>
              <p className="m-0 text-[clamp(0.9375rem,1.75vw,1.0625rem)] font-normal leading-relaxed text-black">
                {copy.hero.subhead}
              </p>
              {timeToResult.trim().length > 0 ? (
                <p className="text-sm text-black/65">
                  <span className="font-semibold text-[#e91e63]">
                    {timeToResult}
                  </span>
                </p>
              ) : null}
              <div className="flex justify-start pt-1">
                <CheckoutLink
                  href={checkoutUrl}
                  className="inline-flex items-center justify-center rounded-full border border-[#E91E63] bg-[rgba(233,30,99,0.07)] px-[1.75rem] py-3.5 text-base font-bold leading-tight text-[#E91E63] no-underline transition-colors duration-200 hover:bg-[#E91E63] hover:text-white md:px-[2rem] md:py-4 md:text-[1.0625rem]"
                >
                  {copy.hero.cta}
                </CheckoutLink>
              </div>
            </ScrollRevealItem>

            {/* Desktop: rail stretches to copy column height; figure fills rail bottom → CTA baseline */}
            <ScrollRevealItem className="relative z-20 hidden min-h-[260px] md:col-start-2 md:row-start-2 md:block md:min-h-0 -mt-10">
              <figure
                className="pointer-events-none absolute inset-x-0 bottom-0 z-20 overflow-visible drop-shadow-[0_12px_40px_rgba(30,20,25,0.08)]"
                style={{ top: HERO_IMAGE_DESKTOP.top } satisfies CSSProperties}
              >
                <div
                  className="absolute inset-0"
                  style={
                    {
                      transform: `scale(${HERO_IMAGE_DESKTOP.scale})`,
                      transformOrigin: "top center",
                    } satisfies CSSProperties
                  }
                >
                  <Image
                    src={asset(IMAGE_SLOTS.heroVisual)}
                    alt={copy.hero.decorativeAlt}
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
                <figcaption className="sr-only">{copy.hero.imageAlt}</figcaption>
              </figure>
            </ScrollRevealItem>
          </ScrollRevealStagger>
        </div>
      </section>

      {/* Problem */}
      <section className="relative border-y border-[#131212]/10 bg-white/60 py-16">
        <div className="mx-auto max-w-6xl px-12">
          <ScrollReveal className="mx-auto mb-12 max-w-3xl text-center">
            <span className="rounded-full bg-[#ffb3d9]/35 px-4 py-1 text-xs tracking-wide font-semibold uppercase text-[#131212]">
              {copy.problem.eyebrow}
            </span>
            <h2 className={`mt-6 ${sectionBandHeading}`}>{copy.problem.title}</h2>
          </ScrollReveal>
          <ScrollRevealStagger className="grid gap-6 md:grid-cols-2">
            {copy.problem.cards.map((c, i) => (
              <ScrollRevealItem key={i}>
                <div className="rounded-2xl border border-[#131212]/10 bg-[#F8F7F4] p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-[#ff62b4]">{c.title}</h3>
                  <p className="mt-2 text-[#131212]/85">{c.body}</p>
                </div>
              </ScrollRevealItem>
            ))}
          </ScrollRevealStagger>
          <ScrollReveal className="mt-12 flex justify-center" y={18}>
            <CheckoutLink
              href={checkoutUrl}
              className="rounded-full bg-[#131212] px-8 py-3 font-semibold text-white hover:bg-black"
            >
              {copy.problem.cta}
            </CheckoutLink>
          </ScrollReveal>
        </div>
      </section>

      {/* Solution */}
      <section className="relative py-16 md:py-20">
        <GrainOverlay />
        <div className="relative mx-auto max-w-6xl px-12">
          <ScrollReveal className="mb-10 flex flex-col items-center gap-4 md:flex-row md:justify-between">
            <h2
              className={`text-center md:text-left ${sectionBandHeading}`}
              {...(copy.solution.titleHighlight
                ? { "aria-label": copy.solution.title }
                : {})}
            >
              <SolutionSectionHeading copy={copy} asset={asset} />
            </h2>
            <CheckoutLink
              href={checkoutUrl}
              className="hidden rounded-full border-2 border-[#ff62b4] px-6 py-2 text-sm font-semibold text-[#ff62b4] md:inline-flex"
            >
              {copy.solution.ctaTop}
            </CheckoutLink>
          </ScrollReveal>
          <div className="flex flex-col gap-10 md:flex-row md:items-start">
            <ScrollReveal
              className="relative mx-auto w-full max-w-sm shrink-0 md:mx-0"
              y={20}
              duration={0.78}
            >
              <div className="relative aspect-[3/4] w-full -mt-20 overflow-visible">
                <div
                  className="absolute left-[-267px] top-[-10px] md:top-[-45px] right-0 bottom-0 overflow-hidden"
                  style={
                    {
                      WebkitMaskImage:
                        "linear-gradient(to bottom, #000 0%, #000 52%, transparent 100%)",
                      maskImage:
                        "linear-gradient(to bottom, #000 0%, #000 52%, transparent 100%)",
                    } as CSSProperties
                  }
                >
                  <Image
                    src={asset(IMAGE_SLOTS.proofTimeline)}
                    alt={copy.solution.imageAlt}
                    fill
                    className="object-contain object-bottom"
                    style={{ left: 118, top: 12 }}
                    sizes="(max-width:768px) 100vw, 320px"
                    quality={100}
                  />
                </div>
                {/* Trophy: empty band left of figure (~waist); not masked so it stays crisp.
                    Avoid mix-blend-screen — it washes gold/light tones to white on this pale bg. */}
                <div
                  className="pointer-events-none absolute left-[9%] top-[43%] z-20 w-[clamp(2.5rem,14vw,3.85rem)] -translate-y-1/2 max-md:left-[7%] max-md:top-[45%]"
                  aria-hidden
                >
                  <Image
                    src={asset(IMAGE_SLOTS.solutionAchievementTrophy)}
                    alt=""
                    width={SOLUTION_TROPHY_INTRINSIC.width}
                    height={SOLUTION_TROPHY_INTRINSIC.height}
                    className="absolute left-0 top-[60px] h-auto w-full object-contain -rotate-[16deg] drop-shadow-[0_2px_4px_rgba(19,18,18,0.12),0_6px_18px_rgba(19,18,18,0.22)]"
                    sizes="64px"
                    quality={100}
                  />
                </div>
              </div>
              <p className="mt-5 text-center text-xs font-medium text-[#ff62b4]">
                {copy.solution.giftHint}
              </p>
            </ScrollReveal>
            <div className="flex-1 space-y-4">
              <ScrollRevealStaggerUl className="space-y-7 md:space-y-8">
                {copy.solution.outcomes.map((o, i) => (
                  <ScrollRevealLi key={i} className="flex gap-4 md:gap-5">
                    <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ff62b4]/15 text-sm font-bold text-[#ff62b4]">
                      ✓
                    </span>
                    <div className="min-w-0">
                      <p className="font-semibold leading-snug">{o.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-[#131212]/80">
                        {o.body}
                      </p>
                    </div>
                  </ScrollRevealLi>
                ))}
              </ScrollRevealStaggerUl>
              <ScrollReveal className="flex justify-end pt-6" y={16}>
                <CheckoutLink
                  href={checkoutUrl}
                  className="rounded-full bg-[#ff62b4] px-8 py-4 font-semibold text-white shadow-md"
                >
                  {copy.solution.ctaBottom}
                </CheckoutLink>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Proof */}
      <section className="border-y border-[#131212]/10 bg-gradient-to-b from-[#ffe8f4]/40 to-[#F8F7F4] py-16">
        <div className="mx-auto max-w-6xl px-12">
          <ScrollReveal className="mx-auto mb-12 max-w-3xl text-center">
            <span className="text-xs tracking-wide font-bold uppercase text-[#ff62b4]">
              ★ {copy.proof.badge}
            </span>
            <h2
              className={`mt-4 flex items-start justify-center gap-2 sm:gap-3 ${sectionBandHeading}`}
            >
              {/* Camera icon beside headline (`proof_headline_camera.png`). */}
              <Image
                src={asset(IMAGE_SLOTS.proofHeadlineCamera)}
                alt=""
                width={PROOF_HEADLINE_CAMERA_INTRINSIC.width}
                height={PROOF_HEADLINE_CAMERA_INTRINSIC.height}
                className="mt-[0.18em] h-[1.05em] w-auto shrink-0 origin-center -rotate-12 object-contain sm:h-[1.12em]"
                sizes="(max-width: 640px) 12vw, 64px"
                quality={100}
                aria-hidden
              />
              <span className="max-w-[min(100%,52rem)] text-balance">
                {copy.proof.headline}
              </span>
            </h2>
            <p className="mt-4 text-[#131212]/85">{copy.proof.intro}</p>
          </ScrollReveal>

          {/* Desktop timeline */}
          <div className="relative hidden lg:block">
            <div className="absolute left-0 right-0 top-8 h-0.5 bg-[#ff62b4]/40" />
            <ScrollRevealStagger className="relative grid grid-cols-4 gap-6">
              {copy.proof.timeline.map((t) => (
                <ScrollRevealItem key={t.year} className="space-y-4 pt-14">
                  <div className="flex flex-col items-center">
                    <span className="h-4 w-4 rounded-full bg-[#ff62b4] ring-4 ring-[#F8F7F4]" />
                    <span className="mt-3 text-sm font-bold text-[#ff62b4]">
                      {t.year}
                    </span>
                    <span className="text-center text-xs font-semibold uppercase text-[#131212]/70">
                      {t.phase}
                    </span>
                  </div>
                  <div className="mx-auto mt-4 w-[76%] max-w-[228px] min-w-0">
                    <CutoutPlate className="relative aspect-video">
                      <Image
                        src={asset(proofTimelineImageForYear(t.year))}
                        alt={t.phase}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width:1024px) 280px, 228px"
                      />
                    </CutoutPlate>
                  </div>
                  <ul className="space-y-2 text-sm text-[#131212]/85">
                    {t.bullets.map((b, j) => (
                      <li key={j} className="flex gap-2">
                        <span className="text-[#ff62b4]">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </ScrollRevealItem>
              ))}
            </ScrollRevealStagger>
          </div>

          {/* Mobile timeline */}
          <ScrollRevealStagger className="space-y-10 lg:hidden">
            {copy.proof.timeline.map((t) => (
              <ScrollRevealItem key={t.year}>
                <div className="rounded-2xl border border-[#131212]/10 bg-white/90 p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ff62b4] text-sm font-bold text-white">
                    {t.year.slice(2)}
                  </span>
                  <div>
                    <p className="font-bold text-[#ff62b4]">{t.year}</p>
                    <p className="text-sm font-semibold">{t.phase}</p>
                  </div>
                </div>
                <div className="mx-auto mt-4 w-full max-w-[17rem] min-w-0">
                  <CutoutPlate className="relative aspect-video">
                    <Image
                      src={asset(proofTimelineImageForYear(t.year))}
                      alt={t.phase}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width:1024px) 272px, 228px"
                    />
                  </CutoutPlate>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-[#131212]/85">
                  {t.bullets.map((b, j) => (
                    <li key={j} className="flex gap-2">
                      <span className="text-[#ff62b4]">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                </div>
              </ScrollRevealItem>
            ))}
          </ScrollRevealStagger>
        </div>
      </section>

      {/* Offer */}
      <section id="offer" className="scroll-mt-24 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-12">
          <ScrollRevealStagger className="grid gap-10 rounded-3xl border border-[#131212]/10 bg-white p-8 shadow-xl md:grid-cols-2 md:p-12">
            <ScrollRevealItem>
              <h2 className={sectionBandHeading}>{copy.offer.title}</h2>
              <p className="mt-2 text-sm text-[#131212]/85">{copy.offer.subtitle}</p>
              <p className="mt-4 text-4xl font-black text-[#ff62b4]">{priceLine}</p>
              <CheckoutLink
                href={checkoutUrl}
                className="mt-4 inline-flex rounded-full bg-[#ff62b4] px-10 py-4 text-lg font-semibold text-white shadow-lg"
              >
                {copy.offer.cta}
              </CheckoutLink>
              <p className="mt-5 text-sm text-[#131212]/65">
                {copy.offer.supportNote}{" "}
                <a
                  href={`mailto:${copy.offer.supportEmail}`}
                  className="font-semibold text-[#ff62b4] underline"
                >
                  {copy.offer.supportEmail}
                </a>
              </p>
            </ScrollRevealItem>
            <ScrollRevealItem>
              <h3 className="text-lg font-semibold">{copy.offer.bonusesTitle}</h3>
              <ScrollRevealStaggerUl className="mt-4 space-y-3">
                {copy.offer.bonuses.map((b, i) => (
                  <ScrollRevealLi
                    key={i}
                    className="flex gap-3 rounded-xl bg-[#F8F7F4] px-4 py-3 text-[#131212]/90"
                  >
                    <span className="text-[#ff62b4]">✦</span>
                    <span>{b}</span>
                  </ScrollRevealLi>
                ))}
              </ScrollRevealStaggerUl>
            </ScrollRevealItem>
          </ScrollRevealStagger>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-24 border-t border-[#131212]/10 bg-[#F8F7F4] py-16">
        <div className="mx-auto max-w-6xl px-12">
          <ScrollRevealStagger className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
            <ScrollRevealItem className="space-y-6">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ff62b4]/15 text-2xl">
                💬
              </div>
              <h2 className={sectionBandHeading}>{copy.faq.introTitle}</h2>
              <p className="text-[#131212]/85">{copy.faq.introBody}</p>
              <CheckoutLink
                href={checkoutUrl}
                className="inline-flex rounded-full bg-[#131212] px-8 py-3 font-semibold text-white"
              >
                {copy.faq.cta}
              </CheckoutLink>
            </ScrollRevealItem>
            <ScrollRevealItem>
              <CutoutPlate className="relative mx-auto aspect-[5/6] w-full max-w-[min(220px,58vw)] overflow-hidden lg:mx-0 lg:ml-auto lg:max-w-[200px]">
                <Image
                  src={asset(IMAGE_SLOTS.faqAside)}
                  alt={copy.faq.introTitle}
                  fill
                  className="object-cover object-[50%_26%]"
                  sizes="(max-width:1024px) min(220px,58vw), 200px"
                />
              </CutoutPlate>
            </ScrollRevealItem>
          </ScrollRevealStagger>
          <ScrollReveal className="mt-10 w-full" y={20}>
            <FaqAccordion items={copy.faq.items} />
          </ScrollReveal>
        </div>
      </section>

      {/* Close */}
      <section
        id="landing-close"
        className="bg-[#131212] py-16 text-[#F8F7F4]"
      >
        <ScrollReveal className="mx-auto max-w-3xl px-12 text-center" y={22}>
          <h2 className="max-w-[38ch] text-pretty text-3xl font-bold leading-snug md:text-4xl">
            {copy.close.headline}
          </h2>
          <p className="mt-4 text-lg text-[#F8F7F4]/85">{copy.close.body}</p>
          <CheckoutLink
            href={checkoutUrl}
            className="mt-10 inline-flex rounded-full bg-[#ff62b4] px-10 py-4 text-lg font-semibold text-white"
          >
            {copy.close.cta}
          </CheckoutLink>
          <p className="mt-10 text-sm text-[#F8F7F4]/55">{copy.close.footnote}</p>
        </ScrollReveal>
      </section>
    </div>
  );
}
