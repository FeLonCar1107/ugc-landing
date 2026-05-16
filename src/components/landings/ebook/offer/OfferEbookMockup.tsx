import Image from "next/image";
import {
  OFFER_EBOOK_FRAME_CLASS,
  OFFER_EBOOK_GROUND_SHADOW_CLASS,
  OFFER_EBOOK_IMAGE_CLASS,
  OFFER_EBOOK_IMAGE_QUALITY,
  OFFER_EBOOK_SIZES,
  OFFER_EBOOK_SLOT_CLASS,
} from "./offerImageSlots";

export type OfferEbookMockupProps = {
  src: string;
  alt: string;
  priority?: boolean;
  /** Extra classes on the outer centering wrapper (e.g. hero grid column). */
  wrapperClassName?: string;
};

/**
 * Single layout for every launch slug's ebook mockup (hero + offer).
 * Assets should be normalized to `OFFER_EBOOK_INTRINSIC` — see `assets:normalize-offer-ebook`.
 */
export default function OfferEbookMockup({
  src,
  alt,
  priority = false,
  wrapperClassName = "",
}: OfferEbookMockupProps) {
  return (
    <figure
      className={`flex w-full flex-col items-center ${wrapperClassName}`.trim()}
    >
      <div className={OFFER_EBOOK_SLOT_CLASS}>
        <div className={OFFER_EBOOK_FRAME_CLASS}>
          <Image
            src={src}
            alt={alt}
            fill
            className={OFFER_EBOOK_IMAGE_CLASS}
            sizes={OFFER_EBOOK_SIZES}
            quality={OFFER_EBOOK_IMAGE_QUALITY}
            priority={priority}
          />
        </div>
        <div
          className="-mt-5 flex shrink-0 justify-center pb-1 pt-0"
          aria-hidden
        >
          <div className={OFFER_EBOOK_GROUND_SHADOW_CLASS} />
        </div>
      </div>
      <figcaption className="sr-only">{alt}</figcaption>
    </figure>
  );
}
