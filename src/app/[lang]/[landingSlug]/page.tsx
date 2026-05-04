import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { i18n } from "@/i18n/config";
import EbookLanding from "@/components/landings/ebook/EbookLanding";
import {
  getEbookLandingCopy,
} from "@/lib/ebookLandingCopy";
import {
  ALLOWED_LANDING_SLUGS,
  isAllowedLandingSlug,
  type AllowedLandingSlug,
} from "@/lib/allowedLandings";
import {
  getLaunchCheckoutUrl,
  getLaunchPriceUsd,
  getLaunchTimeToResult,
  launchAssetBase,
} from "@/utils/launchEnv";

export async function generateStaticParams() {
  const params: { lang: Locale; landingSlug: string }[] = [];
  for (const lang of i18n.locales) {
    for (const landingSlug of ALLOWED_LANDING_SLUGS) {
      params.push({ lang, landingSlug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale; landingSlug: string };
}): Promise<Metadata> {
  if (!isAllowedLandingSlug(params.landingSlug)) {
    return {};
  }
  const copy = await getEbookLandingCopy(
    params.landingSlug as AllowedLandingSlug,
    params.lang,
  );
  return {
    title: copy.meta.title,
    description: copy.meta.description,
  };
}

export default async function LandingBySlugPage({
  params,
}: {
  params: { lang: Locale; landingSlug: string };
}) {
  if (!isAllowedLandingSlug(params.landingSlug)) {
    notFound();
  }

  const slug = params.landingSlug as AllowedLandingSlug;
  const copy = await getEbookLandingCopy(slug, params.lang);
  const checkoutUrl = getLaunchCheckoutUrl(slug);
  const priceUsd = getLaunchPriceUsd(slug);
  const timeToResult = getLaunchTimeToResult(slug);

  return (
    <EbookLanding
      copy={copy}
      assetBase={launchAssetBase(slug)}
      checkoutUrl={checkoutUrl}
      priceUsd={priceUsd}
      timeToResult={timeToResult}
      locale={params.lang}
    />
  );
}
