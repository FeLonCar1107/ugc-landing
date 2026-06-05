export type Region = "co" | "latam" | "es" | "anglo";

type PriceEntry = { launch: number; normal: number };

type ProductEntry = {
  /** Explicit strikethrough price shown in value stack line items (all regions). */
  reference: number;
  co: PriceEntry;
  latam: PriceEntry;
  es: PriceEntry;
  anglo: PriceEntry;
};

type ProductPricing = { [slug: string]: ProductEntry };

export const PRICING: ProductPricing = {
  "discover-your-character": {
    reference: 27,
    co: { launch: 12, normal: 17 },
    latam: { launch: 17, normal: 22 },
    es: { launch: 17, normal: 22 },
    anglo: { launch: 19, normal: 27 },
  },
  "catch-the-attention": {
    reference: 37,
    co: { launch: 17, normal: 22 },
    latam: { launch: 22, normal: 29 },
    es: { launch: 22, normal: 29 },
    anglo: { launch: 25, normal: 37 },
  },
  "magnetic-creator": {
    reference: 39,
    co: { launch: 19, normal: 25 },
    latam: { launch: 25, normal: 32 },
    es: { launch: 25, normal: 32 },
    anglo: { launch: 27, normal: 39 },
  },
  "complete-saga": {
    reference: 67,
    co: { launch: 37, normal: 47 },
    latam: { launch: 42, normal: 57 },
    es: { launch: 42, normal: 57 },
    anglo: { launch: 47, normal: 67 },
  },
};

export function getPrice(
  slug: string,
  region: Region,
  isLaunchActive: boolean,
): { price: number; anchor: number | null } {
  const product = PRICING[slug];
  if (!product) return { price: 0, anchor: null };

  const entry = product[region];
  if (isLaunchActive) {
    return { price: entry.launch, anchor: entry.normal };
  }
  return { price: entry.normal, anchor: null };
}

/** Strikethrough price shown in value stack line items (independent of region). */
export function getReference(slug: string): number {
  return PRICING[slug]?.reference ?? 0;
}
