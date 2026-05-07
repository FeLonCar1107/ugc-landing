import Image from "next/image";
import { IReview } from "@/types/review";

/**
 * Light → mid → deeper on the jazzberry ramp (100 / 200 / 300).
 * Kept one scale so adjacent cards never look like duplicate pinks on typical displays.
 */
const CARD_SURFACES = [
  "border-jazzberry-jam-400/30 bg-jazzberry-jam-200/95",
  "border-jazzberry-jam-300/45 bg-jazzberry-jam-100",
  "border-jazzberry-jam-400/40 bg-jazzberry-jam-300/60",
  "border-jazzberry-jam-300/45 bg-jazzberry-jam-100",
] as const;

export default function CardReview({
  review,
  variantIndex,
}: {
  review: IReview;
  variantIndex: number;
}) {
  const surface = CARD_SURFACES[variantIndex % CARD_SURFACES.length];

  return (
    <article
      className={`flex h-full w-full flex-col rounded-2xl p-5 shadow-[0_4px_18px_-8px_rgba(130,20,70,0.14)] lg:p-6 ${surface}`}
    >
      <div className="flex w-full items-start gap-3.5">
        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ring-jazzberry-jam-100 ring-offset-2 ring-offset-[rgb(var(--landing-page-bg-rgb))]">
          <Image
            src={review.image.src}
            alt={review.image.alt}
            fill
            sizes="44px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0 flex-1 pt-0.5">
          <h2 className="text-sm font-semibold leading-snug tracking-tight text-jazzberry-jam-900 lg:text-[0.95rem]">
            {review.fullName}
          </h2>
          <p className="mt-0.5 text-[11px] font-medium leading-relaxed text-jazzberry-jam-600/75 lg:text-xs">
            {review.role}
          </p>
        </div>
      </div>
      <div className="mt-4 border-t border-jazzberry-jam-300/35 pt-4">
        <p className="text-left text-[13px] leading-relaxed text-jazzberry-jam-950/80 md:text-[0.8125rem] lg:text-sm">
          {review.description}
        </p>
      </div>
    </article>
  );
}
