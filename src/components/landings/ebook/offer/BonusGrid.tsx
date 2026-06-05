import Image from "next/image";
import type { EbookLandingCopy } from "@/types/ebook-landing";
import { resolveLaunchAssetUrl } from "@/utils/launchAssets";
import {
  OFFER_BONUS_FRAME_CLASS,
  OFFER_BONUS_IMAGE_CLASS,
} from "./offerImageSlots";

/** Column count matches active bonuses so each row shares equal cell height. */
function bonusGridColumnClass(count: number): string {
  if (count <= 1) return "grid-cols-1";
  if (count === 2) return "grid-cols-1 sm:grid-cols-2";
  if (count === 3) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
  if (count <= 6) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
  return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
}

export default function BonusGrid({
  bonuses,
  assetBase,
}: {
  bonuses: EbookLandingCopy["offer"]["bonuses"];
  /** Default launch-assets folder for bonus images. */
  assetBase: string;
}) {
  return (
    <div
      className={`mx-auto grid w-full min-w-0 max-w-5xl items-stretch justify-items-center gap-3 sm:gap-3 md:gap-4 ${bonusGridColumnClass(bonuses.length)}`}
    >
      {bonuses.map((bonus, i) => (
        <div
          key={`${bonus.imageFile}-${i}`}
          className="flex h-full w-full max-w-[17.5rem] flex-col overflow-hidden rounded-xl border border-brand-ink/10 bg-brand-card shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-accent/25 hover:shadow-md lg:max-w-none"
        >
          <div className="flex w-full shrink-0 justify-center px-2 pt-2 sm:px-3 sm:pt-3">
            <div
              className={`${OFFER_BONUS_FRAME_CLASS} w-full max-w-[11.5rem] sm:max-w-[12.25rem]`}
            >
              <Image
                src={resolveLaunchAssetUrl(
                  bonus.imageAssetBase ?? assetBase,
                  bonus.imageFile,
                )}
                alt={bonus.imageAlt}
                fill
                className={OFFER_BONUS_IMAGE_CLASS}
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 12rem"
              />
            </div>
          </div>
          <div className="flex min-h-0 flex-1 flex-col justify-start border-t border-brand-ink/8 bg-brand-card px-3 pb-4 pt-3 sm:px-3.5 sm:pb-5">
            <p className="text-xs font-bold leading-snug text-brand-ink sm:text-sm">
              {bonus.painHeadline}
            </p>
            <p className="text-[0.8125rem] leading-relaxed text-brand-ink/85 sm:text-sm">
              {bonus.outcomeBenefit}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
