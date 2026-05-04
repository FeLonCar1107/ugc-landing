"use client";

import type { ReactNode } from "react";
import {
  GA_MEASUREMENT_ID,
  trackCtaCheckoutClick,
} from "@/lib/analytics/launchGa";
import { useLaunchAnalytics } from "./analytics/launchAnalyticsContext";

export default function CheckoutLink({
  href,
  children,
  className,
  placement = "unknown",
}: {
  href: string;
  children: ReactNode;
  className?: string;
  /** Identifies which block sent the click (GA parameter `cta_placement`). */
  placement?: string;
}) {
  const safe = href || "#offer";
  const ctx = useLaunchAnalytics();

  const handleClick = () => {
    if (!href || !ctx || !GA_MEASUREMENT_ID) return;
    trackCtaCheckoutClick({
      landing_slug: ctx.slug,
      locale: ctx.locale,
      placement,
    });
  };

  return (
    <a
      href={safe}
      className={className}
      onClick={handleClick}
      {...(!href ? { "aria-disabled": true } : {})}
    >
      {children}
    </a>
  );
}
