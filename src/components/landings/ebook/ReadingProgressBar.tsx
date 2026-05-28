"use client";

import { useEffect, useState } from "react";

/**
 * Thin 2 px bar fixed at the top of the viewport.
 * Fills from left to right as the user scrolls the page.
 * Uses `brand-accent` colour from the design system.
 */
export default function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const el = document.documentElement;
      const scrollable = el.scrollHeight - window.innerHeight;
      if (scrollable <= 0) {
        setProgress(100);
        return;
      }
      setProgress(Math.min(100, Math.round((window.scrollY / scrollable) * 100)));
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-brand-accent transition-transform duration-75"
      style={{ transform: `scaleX(${progress / 100})` }}
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Progreso de lectura"
    />
  );
}
