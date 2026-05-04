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
        "bg-gradient-to-b from-[#FFFBF7] via-[#FFF6F2] to-[#EFE8E4]",
        "shadow-[0_16px_48px_-20px_rgba(180,110,130,0.28)]",
        className ?? "",
      ].join(" ")}
    >
      {children}
    </div>
  );
}
