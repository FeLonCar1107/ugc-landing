import Image from "next/image";
import type { EbookLandingCopy } from "@/types/ebook-landing";
import CheckoutLink from "../CheckoutLink";
import { CLOSE_HEART_INTRINSIC, IMAGE_SLOTS } from "../ebookLandingConstants";
import { ScrollReveal } from "../ScrollReveal";

type EbookCloseSectionProps = {
  close: EbookLandingCopy["close"];
  checkoutUrl: string;
  asset: (filename: string) => string;
};

export default function EbookCloseSection({
  close,
  checkoutUrl,
  asset,
}: EbookCloseSectionProps) {
  return (
    <section id="landing-close" className="bg-brand-ink py-16 text-brand-surface">
      <ScrollReveal className="mx-auto max-w-3xl px-12 text-center" y={22}>
        <h2 className="max-w-[38ch] text-pretty text-3xl font-bold leading-snug md:text-4xl">
          {close.headline}
        </h2>
        <p className="mt-4 text-lg text-brand-surface/85">{close.body}</p>
        <div className="mt-10 flex flex-col items-center gap-2">
          <div className="relative">
            <CheckoutLink
              href={checkoutUrl}
              placement="close"
              className="inline-flex rounded-full bg-brand-accent px-10 py-4 text-lg font-semibold text-brand-card shadow-md shadow-brand-accent/30 transition-opacity hover:opacity-90"
            >
              {close.cta}
            </CheckoutLink>
            <Image
              src={asset(IMAGE_SLOTS.closeHeart)}
              alt=""
              width={CLOSE_HEART_INTRINSIC.width}
              height={CLOSE_HEART_INTRINSIC.height}
              className="pointer-events-none absolute left-full top-1/2 ml-4 h-[clamp(3rem,10vw,4.25rem)] w-auto max-w-none translate-x-10 translate-y-[calc(-50%-2.5rem)] rotate-12 object-contain mix-blend-screen opacity-[0.92] sm:ml-6"
              sizes="(max-width: 640px) 18vw, 72px"
              quality={100}
              aria-hidden
            />
          </div>
          {close.ctaMicrocopy ? (
            <p className="text-xs text-brand-surface/50">{close.ctaMicrocopy}</p>
          ) : null}
        </div>
        <p className="mt-10 text-sm text-brand-surface/80">{close.footnote}</p>
      </ScrollReveal>
    </section>
  );
}
