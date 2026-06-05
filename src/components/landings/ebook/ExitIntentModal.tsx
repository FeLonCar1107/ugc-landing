"use client";

import type { AllowedLandingSlug } from "@/lib/allowedLandings";
import { useEffect, useRef, useState } from "react";
import {
  LANDING_OFFER_SECTION_HREF,
  LANDING_OFFER_SECTION_ID,
} from "./ebookLandingConstants";
import CheckoutLink from "./CheckoutLink";

type ExitIntentCopy = {
  headline: string;
  body: string;
  cta: string;
  dismiss: string;
};

const SESSION_KEY_PREFIX = "ebook_exit_intent_shown";

function exitIntentSessionKey(slug: AllowedLandingSlug) {
  return `${SESSION_KEY_PREFIX}:${slug}`;
}

/** Ignore exit signals until the user has been on the page this long. */
const MIN_DWELL_MS = 8_000;
/** Minimum pixels scrolled before any exit signal (also scaled by viewport / page). */
const MIN_SCROLL_DEPTH_PX = 320;
/** Fraction of viewport height the user must have reached while scrolling down. */
const MIN_SCROLL_DEPTH_VIEWPORT_RATIO = 0.35;
/** Cursor must leave through this band at the top of the viewport (desktop). */
const TOP_LEAVE_ZONE_PX = 8;
/** Mobile: scroll position must be within this distance of the top. */
const SCROLL_EXIT_NEAR_TOP_PX = 48;
/** Mobile: minimum upward scroll accumulated within the burst window. */
const SCROLL_EXIT_UPWARD_ACCUM_PX = 100;
/** Mobile: burst window for accumulated upward scroll (ms). */
const SCROLL_EXIT_BURST_MS = 450;
/** Mobile: minimum instantaneous upward velocity (px/ms). */
const SCROLL_EXIT_MIN_VELOCITY = 0.9;
/**
 * Desktop without deep scroll: only allow tab-exit mouse gesture after this dwell
 * (avoids firing when the user barely landed and moves toward the browser chrome).
 */
const DESKTOP_SHALLOW_EXIT_MIN_DWELL_MS = 45_000;

/**
 * Exit-intent modal — triggered only on strong leave signals:
 *   - Desktop: pointer leaves the document upward (toward tabs / close), after engagement.
 *   - Mobile / coarse pointer: fast upward scroll back to the top after meaningful depth.
 *
 * Shown at most once per browser session per landing slug (`sessionStorage` flag).
 */
export default function ExitIntentModal({
  slug,
  copy,
}: {
  slug: AllowedLandingSlug;
  copy: ExitIntentCopy;
}) {
  const sessionKey = exitIntentSessionKey(slug);
  const [visible, setVisible] = useState(false);
  const firedRef = useRef(false);
  const mountedAtRef = useRef(0);
  const maxScrollYRef = useRef(0);
  const pointerEngagedRef = useRef(false);

  function minScrollDepthRequired() {
    if (typeof window === "undefined") return MIN_SCROLL_DEPTH_PX;
    return Math.max(
      MIN_SCROLL_DEPTH_PX,
      Math.round(window.innerHeight * MIN_SCROLL_DEPTH_VIEWPORT_RATIO),
    );
  }

  function hasMeaningfulScrollDepth() {
    return maxScrollYRef.current >= minScrollDepthRequired();
  }

  function isCoarsePointerDevice() {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(pointer: coarse)").matches;
  }

  function canShowExitIntent() {
    if (firedRef.current) return false;
    if (mountedAtRef.current === 0) return false;
    if (Date.now() - mountedAtRef.current < MIN_DWELL_MS) return false;
    try {
      if (sessionStorage.getItem(sessionKey)) return false;
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
      sessionStorage.setItem(sessionKey, "1");
    } catch {
      // ignore
    }
  }

  function goToOfferSection() {
    dismiss();
    document.getElementById(LANDING_OFFER_SECTION_ID)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function canDesktopMouseExitFire() {
    const dwell = Date.now() - mountedAtRef.current;
    if (hasMeaningfulScrollDepth()) return true;
    return dwell >= DESKTOP_SHALLOW_EXIT_MIN_DWELL_MS;
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

  // Desktop: pointer leaves the document through the top edge
  useEffect(() => {
    function onPointerMove() {
      pointerEngagedRef.current = true;
    }

    function onDocumentMouseOut(e: MouseEvent) {
      if (!pointerEngagedRef.current) return;
      if (isCoarsePointerDevice()) return;

      const related = e.relatedTarget as Node | null;
      if (related && document.documentElement.contains(related)) return;
      if (e.clientY > TOP_LEAVE_ZONE_PX) return;
      if (!canDesktopMouseExitFire()) return;

      show();
    }

    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("mouseout", onDocumentMouseOut);
    return () => {
      document.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener(
        "mouseout",
        onDocumentMouseOut,
      );
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Mobile / coarse pointer: rapid upward scroll back to the top after real depth
  useEffect(() => {
    if (!isCoarsePointerDevice()) return;

    let lastY = window.scrollY;
    let lastTime = Date.now();
    let upwardAccum = 0;
    let upwardBurstStart = 0;

    function onScroll() {
      const y = window.scrollY;
      maxScrollYRef.current = Math.max(maxScrollYRef.current, y);

      const now = Date.now();
      const delta = lastY - y;
      const dt = Math.max(now - lastTime, 1);

      if (delta > 0) {
        if (upwardBurstStart === 0 || now - upwardBurstStart > SCROLL_EXIT_BURST_MS) {
          upwardAccum = 0;
          upwardBurstStart = now;
        }
        upwardAccum += delta;
      } else {
        upwardAccum = 0;
        upwardBurstStart = 0;
      }

      const velocity = delta / dt;
      const minDepth = minScrollDepthRequired();

      if (
        maxScrollYRef.current >= minDepth &&
        y <= SCROLL_EXIT_NEAR_TOP_PX &&
        upwardAccum >= SCROLL_EXIT_UPWARD_ACCUM_PX &&
        delta > 0 &&
        velocity >= SCROLL_EXIT_MIN_VELOCITY
      ) {
        show();
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

        <div className="mb-1 text-2xl" aria-hidden>
          ✦
        </div>

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
            href={LANDING_OFFER_SECTION_HREF}
            placement="exit_intent"
            className="flex w-full items-center justify-center rounded-full bg-brand-accent px-7 py-3.5 text-center text-base font-semibold text-brand-card shadow-md shadow-brand-accent/25"
            onClick={(e) => {
              e.preventDefault();
              goToOfferSection();
            }}
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
