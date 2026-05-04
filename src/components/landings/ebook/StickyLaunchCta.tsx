"use client";

import { useEffect, useState } from "react";

export default function StickyLaunchCta({
  label,
  href,
  hideWhenIntersectingId,
}: {
  label: string;
  href: string;
  /** When this element intersects the viewport, the bar is hidden (e.g. final section already has the same CTA). */
  hideWhenIntersectingId?: string;
}) {
  const [pastIntro, setPastIntro] = useState(false);
  const [finalSectionVisible, setFinalSectionVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastIntro(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!hideWhenIntersectingId) return;
    const el = document.getElementById(hideWhenIntersectingId);
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setFinalSectionVisible(entry.isIntersecting),
      { threshold: 0, rootMargin: "0px 0px 0px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hideWhenIntersectingId]);

  if (!pastIntro || finalSectionVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-ink/10 bg-brand-surface/95 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md md:hidden">
      <a
        href={href || "#offer"}
        className="flex w-full items-center justify-center rounded-full bg-brand-accent px-6 py-3 text-center text-base font-semibold text-brand-card shadow-lg shadow-brand-accent/25"
      >
        {label}
      </a>
    </div>
  );
}
