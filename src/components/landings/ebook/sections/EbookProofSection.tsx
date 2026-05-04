import Image from "next/image";
import type { EbookLandingCopy } from "@/types/ebook-landing";
import CutoutPlate from "../CutoutPlate";
import {
  IMAGE_SLOTS,
  PROOF_HEADLINE_CAMERA_INTRINSIC,
  proofTimelineImageForYear,
} from "../ebookLandingConstants";
import {
  ScrollReveal,
  ScrollRevealItem,
  ScrollRevealStagger,
} from "../ScrollReveal";

type ProofBulletListProps = {
  bullets: string[];
  className?: string;
};

function ProofBulletList({ bullets, className }: ProofBulletListProps) {
  return (
    <ul className={className ?? "space-y-2 text-sm text-brand-ink/85"}>
      {bullets.map((text, index) => (
        <li key={`${index}-${text}`} className="flex gap-2">
          <span className="text-brand-accent">•</span>
          <span>{text}</span>
        </li>
      ))}
    </ul>
  );
}

type TimelineFigureProps = {
  year: string;
  phase: string;
  asset: (filename: string) => string;
  sizes: string;
  className?: string;
};

function TimelineFigure({
  year,
  phase,
  asset,
  sizes,
  className = "relative aspect-video",
}: TimelineFigureProps) {
  return (
    <CutoutPlate className={className}>
      <Image
        src={asset(proofTimelineImageForYear(year))}
        alt={phase}
        fill
        className="object-cover object-center"
        sizes={sizes}
      />
    </CutoutPlate>
  );
}

type EbookProofSectionProps = {
  proof: EbookLandingCopy["proof"];
  sectionBandHeading: string;
  asset: (filename: string) => string;
};

export default function EbookProofSection({
  proof,
  sectionBandHeading,
  asset,
}: EbookProofSectionProps) {
  return (
    <section className="border-y border-brand-ink/10 bg-gradient-to-b from-brand-blush/40 to-brand-surface py-16">
      <div className="mx-auto max-w-6xl px-12">
        <ScrollReveal className="mx-auto mb-12 max-w-3xl text-center">
          <span className="text-xs tracking-wide font-bold uppercase text-brand-accent">
            ★ {proof.badge}
          </span>
          <h2
            className={`mt-4 flex items-start justify-center gap-2 sm:gap-3 ${sectionBandHeading}`}
          >
            <Image
              src={asset(IMAGE_SLOTS.proofHeadlineCamera)}
              alt=""
              width={PROOF_HEADLINE_CAMERA_INTRINSIC.width}
              height={PROOF_HEADLINE_CAMERA_INTRINSIC.height}
              className="mt-[0.18em] h-[1.05em] w-auto shrink-0 origin-center -rotate-12 object-contain sm:h-[1.12em]"
              sizes="(max-width: 640px) 12vw, 64px"
              quality={100}
              aria-hidden
            />
            <span className="max-w-[min(100%,52rem)] text-balance">{proof.headline}</span>
          </h2>
          <p className="mt-4 text-brand-ink/85">{proof.intro}</p>
        </ScrollReveal>

        <div className="relative hidden lg:block">
          <div className="absolute left-0 right-0 top-8 h-0.5 bg-brand-accent/40" />
          <ScrollRevealStagger className="relative grid grid-cols-4 gap-6">
            {proof.timeline.map((entry) => (
              <ScrollRevealItem key={entry.year} className="space-y-4 pt-14">
                <div className="flex flex-col items-center">
                  <span className="h-4 w-4 rounded-full bg-brand-accent ring-4 ring-brand-surface" />
                  <span className="mt-3 text-sm font-bold text-brand-accent">{entry.year}</span>
                  <span className="text-center text-xs font-semibold uppercase text-brand-ink/70">
                    {entry.phase}
                  </span>
                </div>
                <div className="mx-auto mt-4 w-[76%] max-w-[228px] min-w-0">
                  <TimelineFigure
                    year={entry.year}
                    phase={entry.phase}
                    asset={asset}
                    sizes="(max-width:1024px) 280px, 228px"
                  />
                </div>
                <ProofBulletList bullets={entry.bullets} />
              </ScrollRevealItem>
            ))}
          </ScrollRevealStagger>
        </div>

        <ScrollRevealStagger className="space-y-10 lg:hidden">
          {proof.timeline.map((entry) => (
            <ScrollRevealItem key={entry.year}>
              <div className="rounded-2xl border border-brand-ink/10 bg-brand-card/90 p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-accent text-sm font-bold text-brand-card">
                    {entry.year.slice(2)}
                  </span>
                  <div>
                    <p className="font-bold text-brand-accent">{entry.year}</p>
                    <p className="text-sm font-semibold">{entry.phase}</p>
                  </div>
                </div>
                <div className="mx-auto mt-4 w-full max-w-[17rem] min-w-0">
                  <TimelineFigure
                    year={entry.year}
                    phase={entry.phase}
                    asset={asset}
                    sizes="(max-width:1024px) 272px, 228px"
                  />
                </div>
                <ProofBulletList bullets={entry.bullets} className="mt-4 space-y-2 text-sm text-brand-ink/85" />
              </div>
            </ScrollRevealItem>
          ))}
        </ScrollRevealStagger>
      </div>
    </section>
  );
}
