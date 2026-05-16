import Image from "next/image";
import {
  EBOOK_HERO_MOCKUP,
  OFFER_EBOOK_IMAGE_QUALITY,
  OFFER_EBOOK_SIZES,
} from "./offerImageSlots";

export type HeroEbookMockupProps = {
  src: string;
  alt: string;
  priority?: boolean;
  wrapperClassName?: string;
};

/** Hero-only ebook mockup. Style via `.ebook-hero-mockup__*` in `globals.css`. */
export default function HeroEbookMockup({
  src,
  alt,
  priority = false,
  wrapperClassName = "",
}: HeroEbookMockupProps) {
  return (
    <figure
      className={`${EBOOK_HERO_MOCKUP.root} flex w-full flex-col items-center ${wrapperClassName}`.trim()}
    >
      <div className={EBOOK_HERO_MOCKUP.slot}>
        <div className={EBOOK_HERO_MOCKUP.frame}>
          <Image
            src={src}
            alt={alt}
            fill
            className={EBOOK_HERO_MOCKUP.image}
            sizes={OFFER_EBOOK_SIZES}
            quality={OFFER_EBOOK_IMAGE_QUALITY}
            priority={priority}
          />
        </div>
        <div className={EBOOK_HERO_MOCKUP.shadowWrap} aria-hidden>
          <div className={EBOOK_HERO_MOCKUP.shadow} />
        </div>
      </div>
      <figcaption className="sr-only">{alt}</figcaption>
    </figure>
  );
}
