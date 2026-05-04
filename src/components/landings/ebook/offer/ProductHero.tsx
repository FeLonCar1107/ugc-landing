import Image from "next/image";
import type { EbookLandingCopy } from "@/types/ebook-landing";
import { OFFER_EBOOK_FILE } from "./offerImageSlots";

/**
 * Column layout: mockup fills the top region; a dedicated strip below holds the floor shadow.
 * A shadow layered *behind* a full-bleed `fill` image is invisible wherever the PNG is opaque.
 */
const EBOOK_MEDIA_SLOT =
  "relative flex h-[17.5rem] w-full max-w-[min(300px,88vw)] flex-col sm:h-[18.5rem] md:h-[19.5rem]";

const EBOOK_IMAGE_AREA = "relative min-h-0 flex-1 w-full";

/** Subtle oval under the book — sits below the image frame so it is never covered by opaque pixels. */
const EBOOK_GROUND_SHADOW =
  "bg-gray-600 pointer-events-none h-2.5 w-[72%] max-w-[220px] shrink-0 rounded-[100%] bg-[rgba(15,15,18,0.14)] shadow-[0_0_24px_rgba(15,15,18,0.12)] blur-[12px] sm:h-3 sm:w-[68%] sm:blur-[14px]";

/** Ebook mockup only — badges and headline live in `OfferSection` (full card width). */
export default function ProductHero({
  hero,
  asset,
}: {
  hero: EbookLandingCopy["offer"]["hero"];
  asset: (filename: string) => string;
}) {
  return (
    <div className="flex w-full justify-center">
      <div className={EBOOK_MEDIA_SLOT}>
        <div className={EBOOK_IMAGE_AREA}>
          <Image
            src={asset(OFFER_EBOOK_FILE)}
            alt={hero.imageAlt}
            fill
            className="object-contain object-center px-2 pt-2 pb-0 sm:px-3 sm:pt-3 z-[1]"
            sizes="(max-width: 768px) 88vw, (max-width: 1024px) 42vw, 300px"
            quality={96}
          />
        </div>
        <div
          className="-mt-5 z-[0] flex shrink-0 justify-center pb-1 pt-0"
          aria-hidden
        >
          <div className={EBOOK_GROUND_SHADOW} />
        </div>
      </div>
    </div>
  );
}
