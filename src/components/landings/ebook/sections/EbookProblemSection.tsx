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
        <ScrollRevealStagger className="grid items-stretch gap-6 md:grid-cols-2">
          {problem.cards.map((card, index) => (
            <ScrollRevealItem key={`${card.title}-${index}`} className="h-full">
              <div className="flex h-full min-h-full flex-col rounded-2xl border border-brand-ink/10 bg-brand-surface p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-accent/30 hover:shadow-md">
                <h3 className="text-lg font-semibold text-brand-accent">{card.title}</h3>
                <p className="mt-2 flex-1 whitespace-pre-line text-brand-ink/85">{card.body}</p>
              </div>
            </ScrollRevealItem>
          ))}
        </ScrollRevealStagger>
        <ScrollReveal className="mt-12 flex justify-center" y={18}>
          <CheckoutLink
            href={checkoutUrl}
            placement="problem"
            className="rounded-full bg-brand-accent px-8 py-3 font-semibold text-brand-card shadow-sm shadow-brand-accent/25 transition-opacity hover:opacity-90"
          >
            {problem.cta}
          </CheckoutLink>
        </ScrollReveal>
      </div>
    </section>
  );
}
