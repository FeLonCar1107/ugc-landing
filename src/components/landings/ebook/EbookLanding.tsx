import { montserrat } from "@/app/ui/fonts";
import type { Locale } from "@/i18n/config";
import { i18n } from "@/i18n/config";
import type { AllowedLandingSlug } from "@/lib/allowedLandings";
import type { EbookLandingCopy } from "@/types/ebook-landing";
import { buildLaunchAssetResolver } from "@/utils/launchAssets";
import {
  getLaunchBonusBundleDeadlineIso,
  getLaunchHeroVisual,
  getLaunchOfferPhaseLabel,
} from "@/utils/launchEnv";
import {
  LANDING_OFFER_SECTION_HREF,
  sectionBandHeading,
} from "./ebookLandingConstants";
import ExitIntentModal from "./ExitIntentModal";
import ReadingProgressBar from "./ReadingProgressBar";
import OfferSection from "./offer/OfferSection";
import EbookCloseSection from "./sections/EbookCloseSection";
import EbookFaqSection from "./sections/EbookFaqSection";
import EbookHeroSection from "./sections/EbookHeroSection";
import EbookProblemSection from "./sections/EbookProblemSection";
import EbookProofSection from "./sections/EbookProofSection";
import EbookSolutionSection from "./sections/EbookSolutionSection";
import StickyLaunchCta from "./StickyLaunchCta";

export type EbookLandingProps = {
  /** Used to scope CSS variables so each ebook landing can have its own palette. */
  slug: AllowedLandingSlug;
  copy: EbookLandingCopy;
  assetBase: string;
  checkoutUrl: string;
  timeToResult: string;
  /** Optional social proof count string (e.g. "247") to show in the hero. */
  socialCount?: string;
  locale?: Locale;
};

function normalizeAssetBase(assetBase: string): string {
  return assetBase.replace(/\/$/, "");
}

function launchSlugFromAssetBase(assetBase: string): string {
  return assetBase.replace(/^\//, "").split("/").filter(Boolean).pop() ?? "";
}

/**
 * Layout-neutral wrapper: `display:contents` + `ebook-catch-surface--*` hooks
 * so each landing can scope CSS (tokens + optional section bands) under `[data-landing-slug]`.
 */
function EbookCatchSurface({
  slot,
  children,
}: {
  slot: "hero" | "problem" | "solution" | "proof" | "offer" | "faq" | "close";
  children: React.ReactNode;
}) {
  return (
    <div className={`contents ebook-catch-surface ebook-catch-surface--${slot}`}>
      {children}
    </div>
  );
}

export default function EbookLanding({
  slug,
  copy,
  assetBase,
  checkoutUrl,
  timeToResult,
  socialCount,
  locale = i18n.defaultLocale,
}: EbookLandingProps) {
  const base = normalizeAssetBase(assetBase);
  const asset = buildLaunchAssetResolver(base);

  const launchSlug = launchSlugFromAssetBase(assetBase);
  const heroVisual = getLaunchHeroVisual(launchSlug);
  const offerPhaseLabel = getLaunchOfferPhaseLabel(launchSlug);
  const offerDeadlineIso = getLaunchBonusBundleDeadlineIso(launchSlug);

  const showProblemToSolutionBridge =
    (copy.transitions?.problemToSolution?.trim().length ?? 0) > 0;
  const showProofToOfferBridge =
    (copy.transitions?.proofToOffer?.trim().length ?? 0) > 0;

  return (
    <div
      data-landing-slug={slug}
      className={`relative min-h-screen tracking-tight bg-brand-surface text-brand-ink ${montserrat.className}`}
    >
      {/* Reading progress bar — fixed, top of viewport */}
      <ReadingProgressBar />

      {/* Exit intent modal — once per session per landing slug */}
      {copy.exitIntent ? (
        <ExitIntentModal slug={slug} copy={copy.exitIntent} />
      ) : null}

      <StickyLaunchCta
        label={copy.hero.cta}
        contextLabel={copy.hero.eyebrow}
        href={checkoutUrl}
        hideWhenIntersectingId="landing-close"
        barClassName="ebook-catch-sticky-bar"
      />

      <EbookCatchSurface slot="hero">
        <EbookHeroSection
          heroVisual={heroVisual}
          hero={copy.hero}
          checkoutUrl={LANDING_OFFER_SECTION_HREF}
          timeToResult={timeToResult}
          socialCount={socialCount}
          asset={asset}
        />
      </EbookCatchSurface>

      <EbookCatchSurface slot="problem">
        <EbookProblemSection
          problem={copy.problem}
          checkoutUrl={LANDING_OFFER_SECTION_HREF}
          sectionBandHeading={sectionBandHeading}
        />
      </EbookCatchSurface>

      {/* Transition bridge: Problem → Solution */}
      {showProblemToSolutionBridge ? (
        <div className="flex justify-center px-4 py-6 md:py-8">
          <p className="text-center text-base font-semibold italic text-brand-accent-mid md:text-lg">
            {copy.transitions!.problemToSolution}
          </p>
        </div>
      ) : null}

      <EbookCatchSurface slot="solution">
        <EbookSolutionSection
          copy={copy}
          checkoutUrl={LANDING_OFFER_SECTION_HREF}
          sectionBandHeading={sectionBandHeading}
          asset={asset}
        />
      </EbookCatchSurface>

      <EbookCatchSurface slot="proof">
        <EbookProofSection
          proof={copy.proof}
          sectionBandHeading={sectionBandHeading}
          asset={asset}
        />
      </EbookCatchSurface>

      {/* Transition bridge: Proof → Offer */}
      {showProofToOfferBridge ? (
        <div className="flex justify-center px-4 py-6 md:py-8">
          <p className="text-center text-base font-semibold italic text-brand-accent-mid md:text-lg">
            {copy.transitions!.proofToOffer}
          </p>
        </div>
      ) : null}

      <EbookCatchSurface slot="offer">
        <OfferSection
          offer={copy.offer}
          assetBase={base}
          checkoutUrl={checkoutUrl}
          sectionBandHeading={sectionBandHeading}
          locale={locale}
          phaseLabel={offerPhaseLabel}
          deadlineIso={offerDeadlineIso}
          slug={slug}
        />
      </EbookCatchSurface>

      <EbookCatchSurface slot="faq">
        <EbookFaqSection
          faq={copy.faq}
          checkoutUrl={LANDING_OFFER_SECTION_HREF}
          sectionBandHeading={sectionBandHeading}
          asset={asset}
        />
      </EbookCatchSurface>

      <EbookCatchSurface slot="close">
        <EbookCloseSection
          close={copy.close}
          checkoutUrl={checkoutUrl}
          asset={asset}
        />
      </EbookCatchSurface>
    </div>
  );
}
