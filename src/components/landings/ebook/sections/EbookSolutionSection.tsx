import Image from "next/image";
import type { CSSProperties } from "react";
import type { EbookLandingCopy } from "@/types/ebook-landing";
import CheckoutLink from "../CheckoutLink";
import GrainOverlay from "../GrainOverlay";
import SolutionSectionHeading from "../SolutionSectionHeading";
import { IMAGE_SLOTS, SOLUTION_TROPHY_INTRINSIC } from "../ebookLandingConstants";
import {
  ScrollReveal,
  ScrollRevealLi,
  ScrollRevealStaggerUl,
  ScrollRevealStagger,
} from "../ScrollReveal";

const timelineMaskStyle = {
  WebkitMaskImage:
    "linear-gradient(to bottom, #000 0%, #000 52%, transparent 100%)",
  maskImage: "linear-gradient(to bottom, #000 0%, #000 52%, transparent 100%)",
} satisfies CSSProperties;

type EbookSolutionSectionProps = {
  copy: EbookLandingCopy;
  checkoutUrl: string;
  sectionBandHeading: string;
  asset: (filename: string) => string;
};

export default function EbookSolutionSection({
  copy,
  checkoutUrl,
  sectionBandHeading,
  asset,
}: EbookSolutionSectionProps) {
  const { solution } = copy;
  const titleAriaProps = solution.titleHighlight
    ? { "aria-label": solution.title }
    : {};

  return (
    <section className="relative py-16 md:py-20">
      <GrainOverlay />
      <div className="relative mx-auto max-w-6xl px-12">
        <ScrollReveal className="mb-10 flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <h2
            className={`text-center md:text-left ${sectionBandHeading}`}
            {...titleAriaProps}
          >
            <SolutionSectionHeading copy={copy} asset={asset} />
          </h2>
          <CheckoutLink
            href={checkoutUrl}
            placement="solution_top"
            className="hidden rounded-full border-2 border-brand-accent px-6 py-2 text-sm font-semibold text-brand-accent md:inline-flex"
          >
            {solution.ctaTop}
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
                style={timelineMaskStyle}
              >
                <Image
                  src={asset(IMAGE_SLOTS.proofTimeline)}
                  alt={solution.imageAlt}
                  fill
                  className="object-contain object-bottom"
                  style={{ left: 118, top: 12 }}
                  sizes="(max-width:768px) 100vw, 320px"
                  quality={100}
                />
              </div>
              <div
                className="pointer-events-none absolute left-[9%] top-[43%] z-20 w-[clamp(2.5rem,14vw,3.85rem)] -translate-y-1/2 max-md:left-[7%] max-md:top-[45%]"
                aria-hidden
              >
                <Image
                  src={asset(IMAGE_SLOTS.solutionAchievementTrophy)}
                  alt=""
                  width={SOLUTION_TROPHY_INTRINSIC.width}
                  height={SOLUTION_TROPHY_INTRINSIC.height}
                  className="absolute left-0 top-[60px] h-auto w-full object-contain -rotate-[16deg] drop-shadow-[0_2px_4px_rgb(var(--brand-ink-rgb)/0.12),0_6px_18px_rgb(var(--brand-ink-rgb)/0.22)]"
                  sizes="64px"
                  quality={100}
                />
              </div>
            </div>
            <p className="mt-5 text-center text-xs font-medium text-brand-accent">
              {solution.giftHint}
            </p>
          </ScrollReveal>
          <div className="flex-1 space-y-4">
            <ScrollRevealStaggerUl className="space-y-7 md:space-y-8">
              {solution.outcomes.map((outcome, index) => (
                <ScrollRevealLi key={`${outcome.title}-${index}`} className="flex gap-4 md:gap-5">
                  <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-accent/15 text-sm font-bold text-brand-accent">
                    ✓
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold leading-snug">{outcome.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-brand-ink/80">
                      {outcome.body}
                    </p>
                  </div>
                </ScrollRevealLi>
              ))}
            </ScrollRevealStaggerUl>
            <ScrollReveal className="flex justify-end pt-6" y={16}>
              <CheckoutLink
                href={checkoutUrl}
                placement="solution_bottom"
                className="rounded-full bg-brand-accent px-8 py-4 font-semibold text-brand-card shadow-md"
              >
                {solution.ctaBottom}
              </CheckoutLink>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
