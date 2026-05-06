import { montserrat } from "@/app/ui/fonts";
import type { Locale } from "@/i18n/config";
import { i18n } from "@/i18n/config";
import type { EbookLandingCopy } from "@/types/ebook-landing";
import {
  getLaunchBonusBundleDeadlineIso,
  getLaunchHeroVisual,
  getLaunchOfferPhaseLabel,
} from "@/utils/launchEnv";
import { sectionBandHeading } from "./ebookLandingConstants";
import OfferSection from "./offer/OfferSection";
import EbookCloseSection from "./sections/EbookCloseSection";
import EbookFaqSection from "./sections/EbookFaqSection";
import EbookHeroSection from "./sections/EbookHeroSection";
import EbookProblemSection from "./sections/EbookProblemSection";
import EbookProofSection from "./sections/EbookProofSection";
import EbookSolutionSection from "./sections/EbookSolutionSection";
import StickyLaunchCta from "./StickyLaunchCta";

export type EbookLandingProps = {
  copy: EbookLandingCopy;
  assetBase: string;
  checkoutUrl: string;
  priceUsd: string;
  timeToResult: string;
  locale?: Locale;
};

function normalizeAssetBase(assetBase: string): string {
  return assetBase.replace(/\/$/, "");
}

function buildAssetUrl(base: string) {
  return (filename: string) => `${base}/${filename}`;
}

function launchSlugFromAssetBase(assetBase: string): string {
  return assetBase.replace(/^\//, "").split("/").filter(Boolean).pop() ?? "";
}

export default function EbookLanding({
  copy,
  assetBase,
  checkoutUrl,
  priceUsd,
  timeToResult,
  locale = i18n.defaultLocale,
}: EbookLandingProps) {
  const base = normalizeAssetBase(assetBase);
  const asset = buildAssetUrl(base);

  const priceLine =
    priceUsd.trim().length > 0 ? `$${priceUsd} USD` : copy.offer.priceHint;

  const launchSlug = launchSlugFromAssetBase(assetBase);
  const heroVisual = getLaunchHeroVisual(launchSlug);
  const offerPhaseLabel = getLaunchOfferPhaseLabel(launchSlug);
  const offerDeadlineIso = getLaunchBonusBundleDeadlineIso(launchSlug);

  return (
    <div
      className={`relative min-h-screen tracking-tight bg-brand-surface text-brand-ink ${montserrat.className}`}
    >
      <StickyLaunchCta
        label={copy.hero.cta}
        href={checkoutUrl}
        hideWhenIntersectingId="landing-close"
      />

      <EbookHeroSection
        heroVisual={heroVisual}
        hero={copy.hero}
        checkoutUrl={checkoutUrl}
        timeToResult={timeToResult}
        asset={asset}
      />

      <EbookProblemSection
        problem={copy.problem}
        checkoutUrl={checkoutUrl}
        sectionBandHeading={sectionBandHeading}
      />

      <EbookSolutionSection
        copy={copy}
        checkoutUrl={checkoutUrl}
        sectionBandHeading={sectionBandHeading}
        asset={asset}
      />

      <EbookProofSection
        proof={copy.proof}
        sectionBandHeading={sectionBandHeading}
        asset={asset}
      />

      <OfferSection
        offer={copy.offer}
        assetBase={base}
        priceLine={priceLine}
        checkoutUrl={checkoutUrl}
        sectionBandHeading={sectionBandHeading}
        locale={locale}
        phaseLabel={offerPhaseLabel}
        deadlineIso={offerDeadlineIso}
      />

      <EbookFaqSection
        faq={copy.faq}
        checkoutUrl={checkoutUrl}
        sectionBandHeading={sectionBandHeading}
        asset={asset}
      />

      <EbookCloseSection
        close={copy.close}
        checkoutUrl={checkoutUrl}
        asset={asset}
      />
    </div>
  );
}
