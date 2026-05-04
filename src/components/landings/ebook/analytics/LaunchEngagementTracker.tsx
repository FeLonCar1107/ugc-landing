"use client";

import { useEffect, useRef } from "react";
import {
  GA_MEASUREMENT_ID,
  trackLandingScrollDepth,
  trackOfferSectionView,
} from "@/lib/analytics/launchGa";
import { useLaunchAnalytics } from "./launchAnalyticsContext";

const SCROLL_MILESTONES = [25, 50, 75, 100] as const;

function scrollableRatio(): number {
  const el = document.documentElement;
  const total = el.scrollHeight - window.innerHeight;
  if (total <= 1) return 1;
  return Math.min(1, Math.max(0, window.scrollY / total));
}

/**
 * Scroll depth + offer section visibility. Complements `landing_view` / `cta_checkout_click`
 * for organic funnel diagnosis (read depth vs checkout intent).
 */
export default function LaunchEngagementTracker() {
  const ctx = useLaunchAnalytics();
  const scrollFired = useRef<Set<number>>(new Set());
  const offerFired = useRef(false);

  useEffect(() => {
    if (!ctx || !GA_MEASUREMENT_ID) return;

    const { slug, locale } = ctx;

    const onScroll = () => {
      const pct = Math.round(scrollableRatio() * 100);
      for (const m of SCROLL_MILESTONES) {
        if (pct >= m && !scrollFired.current.has(m)) {
          scrollFired.current.add(m);
          trackLandingScrollDepth({
            landing_slug: slug,
            locale,
            depth_percent: m,
          });
        }
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ctx]);

  useEffect(() => {
    if (!ctx || !GA_MEASUREMENT_ID) return;
    const { slug, locale } = ctx;
    const el = document.getElementById("offer");
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && e.intersectionRatio >= 0.2 && !offerFired.current) {
            offerFired.current = true;
            trackOfferSectionView({ landing_slug: slug, locale });
            obs.disconnect();
            break;
          }
        }
      },
      { threshold: [0, 0.2, 0.35] },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ctx]);

  return null;
}
