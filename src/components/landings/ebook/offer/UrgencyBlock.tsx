import type { EbookLandingCopy } from "@/types/ebook-landing";
import type { Locale } from "@/i18n/config";

function formatDeadlineLine(iso: string, locale: Locale): string {
  const tag = locale === "es" ? "es-ES" : "en-US";
  return new Date(iso).toLocaleDateString(tag, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function UrgencyBlock({
  urgency,
  phaseLabel,
  deadlineIso,
  locale,
}: {
  urgency: EbookLandingCopy["offer"]["urgency"];
  phaseLabel?: string;
  deadlineIso?: string;
  locale: Locale;
}) {
  const bullets = [...urgency.bullets];
  const deadlineMs = deadlineIso ? Date.parse(deadlineIso) : NaN;
  if (
    deadlineIso &&
    !Number.isNaN(deadlineMs) &&
    urgency.deadlineLineTemplate &&
    urgency.deadlineLineTemplate.includes("{date}")
  ) {
    const dateStr = formatDeadlineLine(deadlineIso, locale);
    bullets.push(urgency.deadlineLineTemplate.replace("{date}", dateStr));
  }

  return (
    <div className="w-full min-w-0 space-y-2.5 rounded-xl border border-[#ff62b4]/25 bg-[#ff62b4]/8 p-3 sm:p-4">
      {phaseLabel ? (
        <div>
          <span className="inline-flex rounded-md border border-[#131212]/10 bg-white/90 px-2 py-0.5 text-[0.625rem] font-bold uppercase tracking-wide text-[#131212]">
            {phaseLabel}
          </span>
        </div>
      ) : null}
      <div>
        <h3 className="text-base font-bold leading-snug text-[#131212] sm:text-lg">
          {urgency.title}
        </h3>
      </div>
      <ul className="space-y-1.5 text-left text-[0.8125rem] leading-relaxed text-[#131212]/90 sm:text-sm">
        {bullets.map((line, i) => (
          <li key={i} className="flex gap-2">
            <span className="mt-0.5 shrink-0 text-[#ff62b4]">✦</span>
            <span className="min-w-0">{line}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
