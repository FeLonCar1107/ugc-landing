"use client";

import type { Locale } from "@/i18n/config";
import { useEffect, useState } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const UNIT_LABELS: Record<
  Locale,
  { days: string; hours: string; minutes: string; seconds: string; aria: string }
> = {
  es: {
    days: "días",
    hours: "hr",
    minutes: "min",
    seconds: "seg",
    aria: "Tiempo restante",
  },
  en: {
    days: "days",
    hours: "hr",
    minutes: "min",
    seconds: "sec",
    aria: "Time remaining",
  },
};

function calcTimeLeft(deadlineMs: number): TimeLeft | null {
  const diff = deadlineMs - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1_000),
  };
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

/**
 * Live countdown to `deadlineMs` (locale-specific end-of-day from env).
 * Renders nothing when the deadline has passed or is invalid.
 */
export default function CountdownTimer({
  deadlineMs,
  locale,
}: {
  deadlineMs: number;
  locale: Locale;
}) {
  const labels = UNIT_LABELS[locale];
  // Start null so SSR and the first client paint match; tick only after mount.
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    if (Number.isNaN(deadlineMs)) return;
    const tick = () => setTimeLeft(calcTimeLeft(deadlineMs));
    tick();
    const id = setInterval(tick, 1_000);
    return () => clearInterval(id);
  }, [deadlineMs]);

  if (!timeLeft) return null;

  return (
    <div
      className="flex items-center justify-center gap-2 sm:gap-3"
      aria-live="polite"
      aria-label={labels.aria}
    >
      {timeLeft.days > 0 && (
        <>
          <CountUnit value={timeLeft.days} label={labels.days} />
          <Sep />
        </>
      )}
      <CountUnit value={timeLeft.hours} label={labels.hours} />
      <Sep />
      <CountUnit value={timeLeft.minutes} label={labels.minutes} />
      <Sep />
      <CountUnit value={timeLeft.seconds} label={labels.seconds} />
    </div>
  );
}

function Sep() {
  return (
    <span className="text-base font-bold text-brand-accent/60 sm:text-lg" aria-hidden>
      :
    </span>
  );
}

function CountUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex min-w-[2.75rem] flex-col items-center">
      <span className="tabular-nums text-xl font-black leading-none text-brand-accent sm:text-2xl">
        {pad(value)}
      </span>
      <span className="mt-0.5 text-[0.5rem] font-bold uppercase tracking-widest text-brand-ink/50">
        {label}
      </span>
    </div>
  );
}
