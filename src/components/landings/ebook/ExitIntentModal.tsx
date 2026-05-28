"use client";

import { useEffect, useRef, useState } from "react";
import CheckoutLink from "./CheckoutLink";

type ExitIntentCopy = {
  headline: string;
  body: string;
  cta: string;
  dismiss: string;
};

const SESSION_KEY = "ebook_exit_intent_shown";

/** Ignore exit signals until the user has been on the page this long. */
const MIN_DWELL_MS = 5_000;
/** User must have scrolled at least this far before scroll-based exit intent. */
const MIN_SCROLL_DEPTH_PX = 120;

/**
 * Exit-intent modal — triggered by:
 *   - Desktop: `mouseleave` when the cursor moves above the viewport.
 *   - Mobile: rapid upward scroll (velocity > threshold).
 *
 * Shown at most once per browser session (`sessionStorage` flag).
 */
export default function ExitIntentModal({
  copy,
  checkoutUrl,
}: {
  copy: ExitIntentCopy;
  checkoutUrl: string;
}) {
  const [visible, setVisible] = useState(false);
  const firedRef = useRef(false);
  const mountedAtRef = useRef(0);
  const maxScrollYRef = useRef(0);
  const pointerEngagedRef = useRef(false);

  function canShowExitIntent() {
    if (firedRef.current) return false;
    if (mountedAtRef.current === 0) return false;
    if (Date.now() - mountedAtRef.current < MIN_DWELL_MS) return false;
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return false;
    } catch {
      // sessionStorage unavailable — still show once per mount
    }
    return true;
  }

  function show() {
    if (!canShowExitIntent()) return;
    firedRef.current = true;
    setVisible(true);
  }

  function dismiss() {
    setVisible(false);
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // ignore
    }
  }

  // Record mount time (client-only) and track max scroll depth
  useEffect(() => {
    mountedAtRef.current = Date.now();
    maxScrollYRef.current = window.scrollY;

    function onScroll() {
      maxScrollYRef.current = Math.max(maxScrollYRef.current, window.scrollY);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Desktop: mouse leaves viewport through the top (after real pointer use)
  useEffect(() => {
    function onPointerMove() {
      pointerEngagedRef.current = true;
    }

    function onMouseLeave(e: MouseEvent) {
      if (!pointerEngagedRef.current) return;
      if (e.clientY > 0) return;
      show();
    }

    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    return () => {
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Mobile: rapid upward scroll near top after user scrolled down first
  useEffect(() => {
    let lastY = window.scrollY;
    let lastTime = Date.now();

    function onScroll() {
      const y = window.scrollY;
      maxScrollYRef.current = Math.max(maxScrollYRef.current, y);

      const now = Date.now();
      const delta = lastY - y; // positive = scrolling up
      const dt = now - lastTime;

      if (
        dt > 0 &&
        delta > 0 &&
        maxScrollYRef.current >= MIN_SCROLL_DEPTH_PX
      ) {
        const velocity = delta / dt; // px/ms
        if (velocity > 0.4 && y < 300) show();
      }

      lastY = y;
      lastTime = now;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Close on Escape
  useEffect(() => {
    if (!visible) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") dismiss();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [visible]);

  if (!visible) return null;

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-brand-ink/60 p-4 backdrop-blur-sm"
      onClick={dismiss}
      aria-modal="true"
      role="dialog"
      aria-labelledby="exit-intent-headline"
    >
      {/* Card — stop propagation so clicking inside doesn't close */}
      <div
        className="relative w-full max-w-md rounded-3xl bg-brand-surface p-7 shadow-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Dismiss ×  */}
        <button
          type="button"
          onClick={dismiss}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-brand-ink/45 transition-colors hover:bg-brand-ink/8 hover:text-brand-ink"
          aria-label={copy.dismiss}
        >
          ✕
        </button>

        <div className="mb-1 text-2xl" aria-hidden>✦</div>

        <h2
          id="exit-intent-headline"
          className="text-xl font-bold leading-snug text-brand-ink sm:text-2xl"
        >
          {copy.headline}
        </h2>

        <p className="mt-3 text-[0.9375rem] leading-relaxed text-brand-ink/75">
          {copy.body}
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <CheckoutLink
            href={checkoutUrl}
            placement="exit_intent"
            className="flex w-full items-center justify-center rounded-full bg-brand-accent px-7 py-3.5 text-center text-base font-semibold text-brand-card shadow-md shadow-brand-accent/25"
          >
            {copy.cta}
          </CheckoutLink>

          <button
            type="button"
            onClick={dismiss}
            className="text-center text-sm text-brand-ink/45 underline-offset-2 hover:text-brand-ink/70 hover:underline"
          >
            {copy.dismiss}
          </button>
        </div>
      </div>
    </div>
  );
}
