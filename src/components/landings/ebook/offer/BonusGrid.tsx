import Image from "next/image";
import type { EbookLandingCopy } from "@/types/ebook-landing";

/** Same visual slot for every bonus mockup (aligned row + image scales inside). */
const BONUS_MEDIA_SLOT =
  "relative h-[11.75rem] w-full shrink-0 sm:h-[12.75rem] lg:h-[13.25rem]";

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
          className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden rounded-xl border border-[#131212]/10 bg-white shadow-sm"
        >
          <div className={BONUS_MEDIA_SLOT}>
            <Image
              src={asset(bonus.imageFile)}
              alt={bonus.imageAlt}
              fill
              className="object-contain object-center p-2 sm:p-3"
              sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 22vw"
            />
          </div>
          <div className="flex min-h-0 flex-1 flex-col justify-start border-t border-[#131212]/8 bg-white px-3 pb-4 pt-3 sm:px-3.5 sm:pb-5">
            <p className="text-xs font-bold leading-snug text-[#131212] sm:text-sm">
              {bonus.painHeadline}
            </p>
            <p className="text-[0.8125rem] leading-relaxed text-[#131212]/85 sm:text-sm">
              {bonus.outcomeBenefit}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
