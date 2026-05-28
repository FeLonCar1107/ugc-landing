"use client";

import { useEffect, useState } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
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
 * Live countdown that ticks down to `deadlineIso`.
 * Renders nothing when the deadline has passed or is invalid.
 */
export default function CountdownTimer({ deadlineIso }: { deadlineIso: string }) {
  const deadlineMs = Date.parse(deadlineIso);
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(() =>
    Number.isNaN(deadlineMs) ? null : calcTimeLeft(deadlineMs),
  );

  useEffect(() => {
    if (Number.isNaN(deadlineMs)) return;
    const id = setInterval(() => {
      setTimeLeft(calcTimeLeft(deadlineMs));
    }, 1_000);
    return () => clearInterval(id);
  }, [deadlineMs]);

  if (!timeLeft) return null;

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3" aria-live="polite" aria-label="Tiempo restante">
      {timeLeft.days > 0 && (
        <>
          <CountUnit value={timeLeft.days} label="días" />
          <Sep />
        </>
      )}
      <CountUnit value={timeLeft.hours} label="hr" />
      <Sep />
      <CountUnit value={timeLeft.minutes} label="min" />
      <Sep />
      <CountUnit value={timeLeft.seconds} label="seg" />
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
