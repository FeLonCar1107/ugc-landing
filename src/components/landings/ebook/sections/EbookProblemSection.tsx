import type { EbookLandingCopy } from "@/types/ebook-landing";
import CheckoutLink from "../CheckoutLink";
import {
  ScrollReveal,
  ScrollRevealItem,
  ScrollRevealStagger,
} from "../ScrollReveal";

type EbookProblemSectionProps = {
  problem: EbookLandingCopy["problem"];
  checkoutUrl: string;
  sectionBandHeading: string;
};

export default function EbookProblemSection({
  problem,
  checkoutUrl,
  sectionBandHeading,
}: EbookProblemSectionProps) {
  return (
    <section className="relative border-y border-brand-ink/10 bg-brand-card/60 py-16">
      <div className="mx-auto max-w-6xl px-12">
        <ScrollReveal className="mx-auto mb-12 max-w-3xl text-center">
          <span className="rounded-full bg-brand-rose/35 px-4 py-1 text-xs tracking-wide font-semibold uppercase text-brand-ink">
            {problem.eyebrow}
          </span>
          <h2 className={`mt-6 ${sectionBandHeading}`}>{problem.title}</h2>
        </ScrollReveal>
        <ScrollRevealStagger className="grid gap-6 md:grid-cols-2">
          {problem.cards.map((card, index) => (
            <ScrollRevealItem key={`${card.title}-${index}`}>
              <div className="rounded-2xl border border-brand-ink/10 bg-brand-surface p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-brand-accent">{card.title}</h3>
                <p className="mt-2 whitespace-pre-line text-brand-ink/85">{card.body}</p>
              </div>
            </ScrollRevealItem>
          ))}
        </ScrollRevealStagger>
        <ScrollReveal className="mt-12 flex justify-center" y={18}>
          <CheckoutLink
            href={checkoutUrl}
            className="rounded-full bg-brand-ink px-8 py-3 font-semibold text-brand-card hover:bg-black"
          >
            {problem.cta}
          </CheckoutLink>
        </ScrollReveal>
      </div>
    </section>
  );
}
