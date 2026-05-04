import Image from "next/image";
import type { EbookLandingCopy } from "@/types/ebook-landing";
import {
  IMAGE_SLOTS,
  SOLUTION_EBOOK_OVAL_INTRINSIC,
} from "./ebookLandingConstants";

type SolutionSectionHeadingProps = {
  copy: EbookLandingCopy;
  asset: (filename: string) => string;
};

export default function SolutionSectionHeading({
  copy,
  asset,
}: SolutionSectionHeadingProps) {
  const parts = copy.solution.titleHighlight;
  if (!parts) {
    return <>{copy.solution.title}</>;
  }
  return (
    <>
      {parts.before}
      <span className="relative inline-block whitespace-nowrap">
        <Image
          src={asset(IMAGE_SLOTS.solutionEbookHighlightOval)}
          alt=""
          width={SOLUTION_EBOOK_OVAL_INTRINSIC.width}
          height={SOLUTION_EBOOK_OVAL_INTRINSIC.height}
          className="pointer-events-none absolute left-1/2 top-[52%] z-0 h-[1.42em] w-auto max-w-none -translate-x-1/2 -translate-y-1/2 select-none object-contain opacity-[0.92]"
          sizes="(max-width:768px) 55vw, min(280px, 28vw)"
          quality={100}
          aria-hidden
        />
        <span className="relative z-10">{parts.highlight}</span>
      </span>
      {parts.after}
    </>
  );
}
