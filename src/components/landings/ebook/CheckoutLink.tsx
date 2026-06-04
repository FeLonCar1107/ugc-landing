"use client";

import type { MouseEvent, ReactNode } from "react";
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
  onClick,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  /** Identifies which block sent the click (GA parameter `cta_placement`). */
  placement?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
}) {
  const safe = href || "#offer";
  const ctx = useLaunchAnalytics();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (href && ctx && GA_MEASUREMENT_ID) {
      trackCtaCheckoutClick({
        landing_slug: ctx.slug,
        locale: ctx.locale,
        placement,
      });
    }
    onClick?.(e);
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
