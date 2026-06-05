import type { EbookLandingCopy } from "@/types/ebook-landing";
import type { Locale } from "@/i18n/config";
import { resolveLaunchAssetUrl } from "@/utils/launchAssets";
import { buildOfferView, hasActiveBonuses } from "@/utils/offerBonuses";
import { LANDING_OFFER_SECTION_ID } from "../ebookLandingConstants";
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
  /** Per-launch folder, e.g. `/launch-assets/discover-your-character` (offer mockup + bonuses only). */
  assetBase: string;
  priceLine: string;
  checkoutUrl: string;
  sectionBandHeading: string;
  locale: Locale;
  phaseLabel?: string;
  deadlineIso?: string;
}) {
  const asset = (filename: string) => resolveLaunchAssetUrl(assetBase, filename);
  const offerView = buildOfferView(offer);
  const showBonuses = offerView.bonuses.length > 0;
  const heroBadges = showBonuses
    ? offer.hero.badges
    : offer.hero.badges.slice(0, 1);

  return (
    <section id={LANDING_OFFER_SECTION_ID} className="scroll-mt-24 py-10 md:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-10">
        <div className="rounded-3xl border border-brand-ink/10 bg-brand-card p-4 shadow-xl sm:p-5 md:p-7 lg:p-8">
          <div className="flex w-full min-w-0 flex-col gap-6 md:gap-7">
            <div>
              <h2 className={`${sectionBandHeading} text-center`}>
                {offer.sectionTitle}
              </h2>
            </div>

            <div className="grid min-w-0 grid-cols-1 items-start gap-6 md:grid-cols-[minmax(220px,min(40%,280px))_minmax(0,1fr)] md:gap-5 lg:gap-6">
              <div className="flex min-w-0 w-full justify-center md:justify-end">
                <ProductHero hero={offer.hero} asset={asset} />
              </div>
              <div className="min-w-0 md:pt-1">
                <ValueStack valueStack={offerView.valueStack} priceLine={priceLine} />
              </div>
            </div>

            <div className="flex w-full min-w-0 flex-col items-center gap-4">
              <div className="flex w-full flex-wrap items-center justify-center gap-2">
                {heroBadges.map((badge, i) => (
                  <span
                    key={`${badge}-${i}`}
                    className={
                      i === 0
                        ? "rounded-full border border-brand-ink/15 bg-brand-accent/12 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-brand-ink"
                        : "rounded-full border border-brand-ink/15 bg-brand-card/90 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-brand-ink"
                    }
                  >
                    {badge}
                  </span>
                ))}
              </div>
              <p className="w-full max-w-none text-pretty text-[clamp(1.05rem,3.2vw,1.5rem)] font-semibold leading-snug tracking-tight text-brand-ink">
                {offerView.hero.statement}
              </p>
            </div>

            {showBonuses ? (
              <div className="w-full min-w-0 space-y-3">
                <h3 className="text-center text-base tracking-wide font-semibold text-brand-accent sm:text-lg">
                  {offerView.bonusesSectionTitle}
                </h3>
                <BonusGrid bonuses={offerView.bonuses} assetBase={assetBase} />
              </div>
            ) : null}

            <div className="w-full min-w-0">
              <UrgencyBlock
                urgency={offerView.urgency}
                phaseLabel={phaseLabel}
                deadlineIso={hasActiveBonuses(offer) ? deadlineIso : undefined}
                locale={locale}
              />
            </div>

            {/* Guarantee hint -- risk reversal near the price */}
            {offer.guaranteeHint ? (
              <p className="w-full text-center text-xs leading-relaxed text-brand-ink/55">
                🔒 {offer.guaranteeHint}
              </p>
            ) : null}

            <div className="flex w-full min-w-0 flex-col items-center gap-3 text-center">
              <CheckoutLink
                href={checkoutUrl}
                placement="offer"
                className="inline-flex min-h-[48px] w-full max-w-md items-center justify-center rounded-full bg-brand-accent px-7 py-3.5 text-base font-semibold text-brand-card shadow-lg shadow-brand-accent/25 sm:text-lg"
              >
                {offer.ctaPrimary}
              </CheckoutLink>

              {/* Micro-copy: trust signals below CTA */}
              {offer.ctaMicrocopy ? (
                <p className="text-xs text-brand-ink/45">{offer.ctaMicrocopy}</p>
              ) : null}

              {/* Post-purchase micro-flow: 3 steps */}
              {offer.postPurchaseSteps && offer.postPurchaseSteps.length > 0 ? (
                <div className="mt-1 flex w-full max-w-xs items-center justify-center gap-0">
                  {offer.postPurchaseSteps.map((step, i) => (
                    <div key={i} className="flex items-center">
                      <div className="flex flex-col items-center gap-1">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-accent/15 text-[0.6rem] font-black text-brand-accent">
                          {i + 1}
                        </span>
                        <span className="text-center text-[0.6rem] font-semibold leading-tight text-brand-ink/55">
                          {step}
                        </span>
                      </div>
                      {i < offer.postPurchaseSteps!.length - 1 ? (
                        <span className="mx-1.5 mb-4 text-[0.6rem] text-brand-ink/25" aria-hidden>
                          →
                        </span>
                      ) : null}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
