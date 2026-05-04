"use client";

import Script from "next/script";
import { useEffect, type ReactNode } from "react";
import {
  GA_MEASUREMENT_ID,
  trackLandingView,
} from "@/lib/analytics/launchGa";
import { LaunchAnalyticsContext } from "./launchAnalyticsContext";
import LaunchEngagementTracker from "./LaunchEngagementTracker";

export default function LaunchAnalyticsRoot({
  slug,
  locale,
  children,
}: {
  slug: string;
  locale: string;
  children: ReactNode;
}) {
  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;
    let cancelled = false;
    const fire = () => {
      if (cancelled) return true;
      if (typeof window !== "undefined" && typeof window.gtag === "function") {
        trackLandingView({ landing_slug: slug, locale });
        return true;
      }
      return false;
    };
    if (fire()) return () => {
      cancelled = true;
    };
    const id = window.setInterval(() => {
      if (fire()) window.clearInterval(id);
    }, 80);
    const max = window.setTimeout(() => window.clearInterval(id), 10000);
    return () => {
      cancelled = true;
      window.clearInterval(id);
      window.clearTimeout(max);
    };
  }, [slug, locale]);

  return (
    <LaunchAnalyticsContext.Provider value={{ slug, locale }}>
      {GA_MEASUREMENT_ID ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="launch-ga-init" strategy="afterInteractive">
            {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
            `.trim()}
          </Script>
        </>
      ) : null}
      {children}
      {GA_MEASUREMENT_ID ? <LaunchEngagementTracker /> : null}
    </LaunchAnalyticsContext.Provider>
  );
}
