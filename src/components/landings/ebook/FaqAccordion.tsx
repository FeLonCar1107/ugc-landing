"use client";

import { useState } from "react";
import { GA_MEASUREMENT_ID, trackFaqItemExpand } from "@/lib/analytics/launchGa";
import { useLaunchAnalytics } from "./analytics/launchAnalyticsContext";

export default function FaqAccordion({
  items,
}: {
  items: { q: string; a: string }[];
}) {
  const [open, setOpen] = useState<number | null>(0);
  const ctx = useLaunchAnalytics();

  return (
    <div className="w-full">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            className="border-b border-brand-warm/18 last:border-b-0"
          >
            <button
              type="button"
              className="flex w-full items-center justify-between gap-6 py-6 text-left text-brand-ink md:py-7"
              aria-expanded={isOpen}
              onClick={() => {
                if (isOpen) {
                  setOpen(null);
                  return;
                }
                setOpen(i);
                if (ctx && GA_MEASUREMENT_ID) {
                  trackFaqItemExpand({
                    landing_slug: ctx.slug,
                    locale: ctx.locale,
                    faq_index: i,
                    faq_question: item.q.slice(0, 120),
                  });
                }
              }}
            >
              <span className="text-base font-bold leading-snug md:text-[1.0625rem]">
                {item.q}
              </span>
              <span
                className="shrink-0 text-2xl font-light leading-none tracking-tight text-brand-accent"
                aria-hidden
              >
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {isOpen ? (
              <p className="-mt-1 pb-8 text-[0.9375rem] leading-relaxed text-brand-ink/80 md:text-base">
                {item.a}
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
