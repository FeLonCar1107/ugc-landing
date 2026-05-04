import Image from "next/image";
import type { EbookLandingCopy } from "@/types/ebook-landing";
import CheckoutLink from "../CheckoutLink";
import CutoutPlate from "../CutoutPlate";
import FaqAccordion from "../FaqAccordion";
import { IMAGE_SLOTS } from "../ebookLandingConstants";
import {
  ScrollReveal,
  ScrollRevealItem,
  ScrollRevealStagger,
} from "../ScrollReveal";

type EbookFaqSectionProps = {
  faq: EbookLandingCopy["faq"];
  checkoutUrl: string;
  sectionBandHeading: string;
  asset: (filename: string) => string;
};

export default function EbookFaqSection({
  faq,
  checkoutUrl,
  sectionBandHeading,
  asset,
}: EbookFaqSectionProps) {
  return (
    <section
      id="faq"
      className="scroll-mt-24 border-t border-brand-ink/10 bg-brand-surface py-16"
    >
      <div className="mx-auto max-w-6xl px-12">
        <ScrollRevealStagger className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
          <ScrollRevealItem className="space-y-6">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-accent/15 text-2xl">
              💬
            </div>
            <h2 className={sectionBandHeading}>{faq.introTitle}</h2>
            <p className="text-brand-ink/85">{faq.introBody}</p>
            <CheckoutLink
              href={checkoutUrl}
              placement="faq"
              className="inline-flex rounded-full bg-brand-ink px-8 py-3 font-semibold text-brand-card"
            >
              {faq.cta}
            </CheckoutLink>
          </ScrollRevealItem>
          <ScrollRevealItem>
            <CutoutPlate className="relative mx-auto aspect-[5/6] w-full max-w-[min(220px,58vw)] overflow-hidden lg:mx-0 lg:ml-auto lg:max-w-[200px]">
              <Image
                src={asset(IMAGE_SLOTS.faqAside)}
                alt={faq.introTitle}
                fill
                className="object-cover object-[50%_26%]"
                sizes="(max-width:1024px) min(220px,58vw), 200px"
              />
            </CutoutPlate>
          </ScrollRevealItem>
        </ScrollRevealStagger>
        <ScrollReveal className="mt-10 w-full" y={20}>
          <FaqAccordion items={faq.items} />
        </ScrollReveal>
      </div>
    </section>
  );
}
