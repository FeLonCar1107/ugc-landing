import type { EbookLandingCopy } from "@/types/ebook-landing";

export default function ValueStack({
  valueStack,
  priceLine,
}: {
  valueStack: EbookLandingCopy["offer"]["valueStack"];
  priceLine: string;
}) {
  return (
    <div className="w-full min-w-0 space-y-2 rounded-2xl border border-brand-ink/10 bg-brand-card/90 p-3 shadow-sm sm:p-4">
      {valueStack.lineItems.map((row) => (
        <div
          key={row.id}
          className="flex min-w-0 flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5 border-b border-brand-ink/10 pb-2 last:border-0 last:pb-0"
        >
          <span className="min-w-0 flex-1 text-left text-xs font-semibold text-brand-ink/90 sm:text-sm">
            {row.label}
          </span>
          <span className="shrink-0 text-xs font-bold tabular-nums text-brand-ink/55 line-through decoration-brand-ink/35 sm:text-sm">
            {row.anchorValueLabel}
          </span>
        </div>
      ))}
      <div className="flex min-w-0 flex-wrap items-baseline justify-between gap-x-3 gap-y-1 border-t border-brand-ink/10 pt-2">
        <span className="min-w-0 text-xs font-bold text-brand-ink sm:text-sm">
          {valueStack.totalLabel}
        </span>
        <span className="shrink-0 text-xs font-black tabular-nums text-brand-ink/55 line-through decoration-brand-ink/35 sm:text-sm">
          {valueStack.totalAnchorLabel}
        </span>
      </div>
      <div className="flex min-w-0 flex-col gap-0.5 rounded-lg bg-brand-surface px-3 py-2.5 sm:flex-row sm:items-baseline sm:justify-between">
        <span className="text-[0.6875rem] font-bold uppercase tracking-wide text-brand-ink/70 sm:text-xs">
          {valueStack.youPayLabel}
        </span>
        <span className="text-xl font-black tabular-nums text-brand-accent sm:text-2xl md:text-3xl">
          {priceLine}
        </span>
      </div>
    </div>
  );
}
