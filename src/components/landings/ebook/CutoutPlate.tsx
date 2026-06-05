import type { ReactNode } from "react";

type CutoutPlateElevation = "default" | "flat";

const elevationClass: Record<CutoutPlateElevation, string> = {
  default: "shadow-[0_16px_48px_-20px_rgb(var(--brand-shadow-tint-rgb)/0.28)]",
  flat: "border border-brand-ink/8 shadow-none",
};

/** Warm plate behind transparent PNG cutouts (cream / blush) — avoids “floating” halos vs flat page bg. */
export default function CutoutPlate({
  className,
  children,
  elevation = "default",
}: {
  className?: string;
  children: ReactNode;
  /** `flat` — timeline tiles: no drop shadow, light border only. */
  elevation?: CutoutPlateElevation;
}) {
  return (
    <div
      className={[
        "relative overflow-hidden rounded-2xl",
        "bg-gradient-to-b from-brand-cutout-from via-brand-cutout-via to-brand-cutout-to",
        elevationClass[elevation],
        className ?? "",
      ].join(" ")}
    >
      {children}
    </div>
  );
}
