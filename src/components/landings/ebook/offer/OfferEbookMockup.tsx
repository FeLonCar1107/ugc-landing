import Image from "next/image";
import {
  EBOOK_OFFER_MOCKUP,
  OFFER_EBOOK_IMAGE_QUALITY,
  OFFER_EBOOK_SIZES,
} from "./offerImageSlots";

export type OfferEbookMockupProps = {
  src: string;
  alt: string;
  priority?: boolean;
};

/** Offer-card ebook mockup. Style via `.ebook-offer-mockup__*` in `globals.css`. */
export default function OfferEbookMockup({
  src,
  alt,
  priority = false,
}: OfferEbookMockupProps) {
  return (
    <figure
      className={`${EBOOK_OFFER_MOCKUP.root} flex w-full flex-col items-center`}
    >
      <div className={EBOOK_OFFER_MOCKUP.slot}>
        <div className={EBOOK_OFFER_MOCKUP.frame}>
          <Image
            src={src}
            alt={alt}
            fill
            className={EBOOK_OFFER_MOCKUP.image}
            sizes={OFFER_EBOOK_SIZES}
            quality={OFFER_EBOOK_IMAGE_QUALITY}
            priority={priority}
          />
        </div>
        <div className={EBOOK_OFFER_MOCKUP.shadowWrap} aria-hidden>
          <div className={EBOOK_OFFER_MOCKUP.shadow} />
        </div>
      </div>
      <figcaption className="sr-only">{alt}</figcaption>
    </figure>
  );
}
