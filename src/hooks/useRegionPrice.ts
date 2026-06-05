"use client";

import { useState, useEffect } from "react";
import { getPrice } from "@/lib/pricing";
import type { Region } from "@/lib/pricing";

type UseRegionPriceResult = {
  price: number | null;
  anchorPrice: number | null;
  region: Region | null;
  currency: "USD";
  isLoading: boolean;
};

export function useRegionPrice(
  slug: string,
  deadlineIso?: string,
): UseRegionPriceResult {
  const [region, setRegion] = useState<Region | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);

    fetch("/api/geo", { signal: controller.signal })
      .then((r) => r.json())
      .then((data: { country: string | null; region: Region }) => {
        setRegion(data.region ?? "latam");
      })
      .catch(() => {
        // Timeout or network error — fail silently with safe default
        setRegion("latam");
      })
      .finally(() => {
        clearTimeout(timeout);
        setIsLoading(false);
      });

    return () => {
      controller.abort();
      clearTimeout(timeout);
    };
  }, []);

  if (isLoading || region === null) {
    return { price: null, anchorPrice: null, region: null, currency: "USD", isLoading: true };
  }

  const isLaunchActive = deadlineIso
    ? Date.now() < Date.parse(deadlineIso)
    : false;

  const { price, anchor } = getPrice(slug, region, isLaunchActive);

  return {
    price,
    anchorPrice: anchor,
    region,
    currency: "USD",
    isLoading: false,
  };
}
