/** GA4 Measurement ID — same value as Firebase Web “Measurement ID” (public, safe in client bundles). */
export const GA_MEASUREMENT_ID =
  typeof process !== "undefined"
    ? process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ?? ""
    : "";

/** When true, GA4 sends hits to DebugView (Admin → DebugView). Use only while testing. */
export const GA_DEBUG =
  typeof process !== "undefined" &&
  (process.env.NEXT_PUBLIC_GA_DEBUG === "1" ||
    process.env.NEXT_PUBLIC_GA_DEBUG === "true");

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackLandingView(payload: {
  landing_slug: string;
  locale: string;
}) {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", "landing_view", {
    landing_slug: payload.landing_slug,
    locale: payload.locale,
  });
}

export function trackCtaCheckoutClick(payload: {
  landing_slug: string;
  locale: string;
  placement: string;
}) {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", "cta_checkout_click", {
    landing_slug: payload.landing_slug,
    locale: payload.locale,
    cta_placement: payload.placement,
  });
}

/** Max vertical scroll as % of scrollable range (25 / 50 / 75 / 100). Once per milestone per page load. */
export function trackLandingScrollDepth(payload: {
  landing_slug: string;
  locale: string;
  depth_percent: 25 | 50 | 75 | 100;
}) {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", "landing_scroll_depth", {
    landing_slug: payload.landing_slug,
    locale: payload.locale,
    depth_percent: payload.depth_percent,
  });
}

/** First time the offer block enters the viewport (readiness to buy zone). */
export function trackOfferSectionView(payload: {
  landing_slug: string;
  locale: string;
}) {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", "offer_section_view", {
    landing_slug: payload.landing_slug,
    locale: payload.locale,
  });
}

export function trackFaqItemExpand(payload: {
  landing_slug: string;
  locale: string;
  faq_index: number;
  /** Truncated question for reports; keep short for privacy. */
  faq_question: string;
}) {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", "faq_item_expand", {
    landing_slug: payload.landing_slug,
    locale: payload.locale,
    faq_index: payload.faq_index,
    faq_question: payload.faq_question,
  });
}
