"use client";

import { useState } from "react";

export default function FaqAccordion({
  items,
}: {
  items: { q: string; a: string }[];
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="w-full">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            className="border-b border-[#6B5344]/18 last:border-b-0"
          >
            <button
              type="button"
              className="flex w-full items-center justify-between gap-6 py-6 text-left text-[#131212] md:py-7"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span className="text-base font-bold leading-snug md:text-[1.0625rem]">
                {item.q}
              </span>
              <span
                className="shrink-0 text-2xl font-light leading-none tracking-[-0.02em] text-[#ff62b4]"
                aria-hidden
              >
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {isOpen ? (
              <p className="-mt-1 pb-8 text-[0.9375rem] leading-relaxed text-[#131212]/80 md:text-base">
                {item.a}
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
