"use client";

import { useEffect, useState } from "react";
import CheckoutLink from "./CheckoutLink";

export default function StickyLaunchCta({
  label,
  href,
  hideWhenIntersectingId,
  barClassName,
}: {
  label: string;
  href: string;
  /** When this element intersects the viewport, the bar is hidden (e.g. final section already has the same CTA). */
  hideWhenIntersectingId?: string;
  /** Optional extra classes on the fixed bar (e.g. per-landing palette hooks). */
  barClassName?: string;
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

  // Mobile: bottom bar (full-width CTA button)
  const mobileBarClasses = [
    "fixed inset-x-0 bottom-0 z-40 border-t border-brand-ink/10 bg-brand-surface/95 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md md:hidden",
    barClassName,
  ]
    .filter(Boolean)
    .join(" ");

  // Desktop: slim top bar (label + compact CTA pill side by side)
  const desktopBarClasses = [
    "fixed inset-x-0 top-0 z-40 hidden border-b border-brand-ink/8 bg-brand-surface/95 backdrop-blur-md md:flex md:items-center md:justify-center md:gap-4 md:px-6 md:py-2",
    barClassName,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      {/* Mobile sticky bottom bar */}
      <div className={mobileBarClasses}>
        <CheckoutLink
          href={href}
          placement="sticky_mobile"
          className="flex w-full items-center justify-center rounded-full bg-brand-accent px-6 py-3 text-center text-base font-semibold text-brand-card shadow-lg shadow-brand-accent/25"
        >
          {label}
        </CheckoutLink>
      </div>

      {/* Desktop sticky top bar */}
      <div className={desktopBarClasses}>
        <span className="text-sm font-semibold text-brand-ink/70">{label}</span>
        <CheckoutLink
          href={href}
          placement="sticky_desktop"
          className="inline-flex items-center justify-center rounded-full bg-brand-accent px-5 py-1.5 text-sm font-semibold text-brand-card shadow-sm shadow-brand-accent/30 transition-opacity hover:opacity-90"
        >
          {label}
        </CheckoutLink>
      </div>
    </>
  );
}
