import type { EbookLandingCopy } from "@/types/ebook-landing";

export default function ValueStack({
  valueStack,
  priceLine,
}: {
  valueStack: EbookLandingCopy["offer"]["valueStack"];
  priceLine: string;
}) {
  return (
    <div className="w-full min-w-0 space-y-2 rounded-2xl border border-[#131212]/10 bg-white/90 p-3 shadow-sm sm:p-4">
      {valueStack.lineItems.map((row) => (
        <div
          key={row.id}
          className="flex min-w-0 flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5 border-b border-[#131212]/10 pb-2 last:border-0 last:pb-0"
        >
          <span className="min-w-0 flex-1 text-left text-xs font-semibold text-[#131212]/90 sm:text-sm">
            {row.label}
          </span>
          <span className="shrink-0 text-xs font-bold tabular-nums text-[#131212]/55 line-through decoration-[#131212]/35 sm:text-sm">
            {row.anchorValueLabel}
          </span>
        </div>
      ))}
      <div className="flex min-w-0 flex-wrap items-baseline justify-between gap-x-3 gap-y-1 border-t border-[#131212]/10 pt-2">
        <span className="min-w-0 text-xs font-bold text-[#131212] sm:text-sm">
          {valueStack.totalLabel}
        </span>
        <span className="shrink-0 text-xs font-black tabular-nums text-[#131212]/55 line-through decoration-[#131212]/35 sm:text-sm">
          {valueStack.totalAnchorLabel}
        </span>
      </div>
      <div className="flex min-w-0 flex-col gap-0.5 rounded-lg bg-[#F8F7F4] px-3 py-2.5 sm:flex-row sm:items-baseline sm:justify-between">
        <span className="text-[0.6875rem] font-bold uppercase tracking-wide text-[#131212]/70 sm:text-xs">
          {valueStack.youPayLabel}
        </span>
        <span className="text-xl font-black tabular-nums text-[#ff62b4] sm:text-2xl md:text-3xl">
          {priceLine}
        </span>
      </div>
    </div>
  );
}
