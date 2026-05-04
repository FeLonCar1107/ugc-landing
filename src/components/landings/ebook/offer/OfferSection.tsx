import type { EbookLandingCopy } from "@/types/ebook-landing";
import type { Locale } from "@/i18n/config";
import CheckoutLink from "../CheckoutLink";
import BonusGrid from "./BonusGrid";
import ProductHero from "./ProductHero";
import UrgencyBlock from "./UrgencyBlock";
import ValueStack from "./ValueStack";

export default function OfferSection({
  offer,
  assetBase,
  priceLine,
  checkoutUrl,
  sectionBandHeading,
  locale,
  phaseLabel,
  deadlineIso,
}: {
  offer: EbookLandingCopy["offer"];
  /** Resolved launch-assets base without trailing slash (serializable; avoids passing functions from RSC). */
  assetBase: string;
  priceLine: string;
  checkoutUrl: string;
  sectionBandHeading: string;
  locale: Locale;
  phaseLabel?: string;
  deadlineIso?: string;
}) {
  const asset = (filename: string) => `${assetBase}/${filename}`;

  return (
    <section id="offer" className="scroll-mt-24 py-10 md:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-10">
        {/*
          Offer stack is static (no ScrollReveal / whileInView here). Scroll-driven
          opacity + stagger made the block feel empty or slow until IO fired.
        */}
        <div className="rounded-3xl border border-[#131212]/10 bg-white p-4 shadow-xl sm:p-5 md:p-7 lg:p-8">
          <div className="flex w-full min-w-0 flex-col gap-6 md:gap-7">
            <div>
              <h2 className={`${sectionBandHeading} text-center`}>
                {offer.sectionTitle}
              </h2>
            </div>

            {/*
              md+: hero + value stack side-by-side saves a full viewport of vertical scroll.
            */}
            <div className="grid min-w-0 grid-cols-1 items-start gap-6 md:grid-cols-2 md:gap-8 lg:gap-10">
              <div className="min-w-0">
                <ProductHero hero={offer.hero} asset={asset} />
              </div>
              <div className="min-w-0 md:pt-1">
                <ValueStack valueStack={offer.valueStack} priceLine={priceLine} />
              </div>
            </div>

            <div className="flex w-full min-w-0 flex-col items-center gap-4">
              <div className="flex w-full flex-wrap items-center justify-center gap-2">
                <span className="rounded-full border border-[#131212]/15 bg-[#ff62b4]/12 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-[#131212]">
                  {offer.hero.badges[0] ?? ""}
                </span>
                <span className="rounded-full border border-[#131212]/15 bg-white/90 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-[#131212]">
                  {offer.hero.badges[1] ?? ""}
                </span>
              </div>
              <p className="w-full max-w-none text-pretty text-[clamp(1.05rem,3.2vw,1.5rem)] font-semibold leading-snug tracking-tight text-[#131212]">
                {offer.hero.statement}
              </p>
            </div>

            <div className="w-full min-w-0 space-y-3">
              <h3 className="text-center text-base tracking-wide font-semibold text-[#ff62b4] sm:text-lg">
                {offer.bonusesSectionTitle}
              </h3>
              <BonusGrid bonuses={offer.bonuses} asset={asset} />
            </div>

            <div className="w-full min-w-0">
              <UrgencyBlock
                urgency={offer.urgency}
                phaseLabel={phaseLabel}
                deadlineIso={deadlineIso}
                locale={locale}
              />
            </div>

            <div className="flex w-full min-w-0 flex-col items-center gap-3 text-center">
              <CheckoutLink
                href={checkoutUrl}
                className="inline-flex min-h-[48px] w-full max-w-md items-center justify-center rounded-full bg-[#ff62b4] px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#ff62b4]/25 sm:text-lg"
              >
                {offer.ctaPrimary}
              </CheckoutLink>
              <p className="text-sm text-[#131212]/65">
                {offer.supportNote}{" "}
                <a
                  href={`mailto:${offer.supportEmail}`}
                  className="font-semibold text-[#ff62b4] underline"
                >
                  {offer.supportEmail}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
