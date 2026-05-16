import type { EbookLandingCopy } from "@/types/ebook-landing";
import { OFFER_EBOOK_FILE } from "./offerImageSlots";
import OfferEbookMockup from "./OfferEbookMockup";

/** Ebook mockup only — badges and headline live in `OfferSection` (full card width). */
export default function ProductHero({
  hero,
  asset,
}: {
  hero: EbookLandingCopy["offer"]["hero"];
  asset: (filename: string) => string;
}) {
  return (
    <OfferEbookMockup
      src={asset(OFFER_EBOOK_FILE)}
      alt={hero.imageAlt}
    />
  );
}
