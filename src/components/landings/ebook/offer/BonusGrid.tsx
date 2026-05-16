import Image from "next/image";
import type { EbookLandingCopy } from "@/types/ebook-landing";
import {
  OFFER_BONUS_FRAME_CLASS,
  OFFER_BONUS_IMAGE_CLASS,
} from "./offerImageSlots";

export default function BonusGrid({
  bonuses,
  asset,
}: {
  bonuses: EbookLandingCopy["offer"]["bonuses"];
  asset: (filename: string) => string;
}) {
  return (
    <div className="grid w-full min-w-0 grid-cols-1 items-stretch gap-3 sm:grid-cols-2 sm:gap-3 md:gap-4 lg:grid-cols-4 lg:gap-3">
      {bonuses.map((bonus, i) => (
        <div
          key={`${bonus.imageFile}-${i}`}
          className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden rounded-xl border border-brand-ink/10 bg-brand-card shadow-sm"
        >
          <div className="flex w-full justify-center px-2 pt-2 sm:px-3 sm:pt-3">
            <div
              className={`${OFFER_BONUS_FRAME_CLASS} w-full max-w-[11.5rem] sm:max-w-[12.25rem]`}
            >
              <Image
                src={asset(bonus.imageFile)}
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
