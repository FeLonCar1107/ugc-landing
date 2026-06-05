"use client";

import { getPrice } from "@/lib/pricing";
import { useRegionPrice } from "@/hooks/useRegionPrice";

type Props = {
  slug: string;
  deadlineIso?: string;
};

export default function GeoPriceLine({ slug, deadlineIso }: Props) {
  const { price, isLoading } = useRegionPrice(slug, deadlineIso);

  // While detecting region, show the latam price (correct for most visitors, avoids layout shift)
  if (isLoading || price === null) {
    const isLaunchActive = deadlineIso ? Date.now() < Date.parse(deadlineIso) : false;
    const { price: fallback } = getPrice(slug, "latam", isLaunchActive);
    return (
      <span className="text-xl font-black tabular-nums text-brand-accent sm:text-2xl md:text-3xl">
        ${fallback} USD
      </span>
    );
  }

  return (
    <span className="text-xl font-black tabular-nums text-brand-accent sm:text-2xl md:text-3xl">
      ${price} USD
    </span>
  );
}
