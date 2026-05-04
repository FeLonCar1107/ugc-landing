import type { ReactNode } from "react";

/** Warm plate behind transparent PNG cutouts (cream / blush) — avoids “floating” halos vs flat page bg. */
export default function CutoutPlate({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={[
        "relative overflow-hidden rounded-2xl",
        "bg-gradient-to-b from-brand-cutout-from via-brand-cutout-via to-brand-cutout-to",
        "shadow-[0_16px_48px_-20px_rgb(var(--brand-shadow-tint-rgb)/0.28)]",
        className ?? "",
      ].join(" ")}
    >
      {children}
    </div>
  );
}
