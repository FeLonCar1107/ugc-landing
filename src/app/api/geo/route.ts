import { NextRequest, NextResponse } from "next/server";
import type { Region } from "@/lib/pricing";

const COLOMBIA_COUNTRY = "CO";
const SPAIN_COUNTRY = "ES";
const USA_COUNTRY = "US";

const LATAM_COUNTRIES = new Set([
  "AR",
  "MX",
  "PE",
  "CL",
  "EC",
  "BO",
  "VE",
  "UY",
  "PY",
  "CR",
  "GT",
  "HN",
  "SV",
  "NI",
  "DO",
  "CU",
  "PA",
]);

function countryToRegion(country: string | null | undefined): Region {
  if (!country) return "latam";
  const c = country.toUpperCase();
  if (c === COLOMBIA_COUNTRY) return "co";
  if (c === SPAIN_COUNTRY) return "es";
  if (LATAM_COUNTRIES.has(c)) return "latam";
  // US treated as latam for pricing purposes (us_hispanic intent, refinable later)
  if (c === USA_COUNTRY) return "latam";

  return "anglo";
}

export async function GET(request: NextRequest) {
  // 1. Vercel injects this header automatically in production — no external service needed
  const vercelCountry = request.headers.get("x-vercel-ip-country");
  if (vercelCountry) {
    const region = countryToRegion(vercelCountry);
    return NextResponse.json({ country: vercelCountry.toUpperCase(), region });
  }

  // 2. Local dev: use GEO_FALLBACK_COUNTRY env var (server-only, not NEXT_PUBLIC_)
  const fallbackCountry = process.env.GEO_FALLBACK_COUNTRY;
  if (fallbackCountry) {
    const region = countryToRegion(fallbackCountry);
    return NextResponse.json({
      country: fallbackCountry.toUpperCase(),
      region,
    });
  }

  // 3. Last resort: ipapi.co free tier (local dev without fallback env var)
  try {
    const forwarded = request.headers.get("x-forwarded-for");
    const ip =
      forwarded?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "";
    const ipapiUrl = ip
      ? `https://ipapi.co/${ip}/json/`
      : "https://ipapi.co/json/";

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);

    const res = await fetch(ipapiUrl, { signal: controller.signal });
    clearTimeout(timeout);

    const data = (await res.json()) as { country_code?: string };
    const country = data.country_code ?? null;
    const region = countryToRegion(country);

    return NextResponse.json({
      country: country?.toUpperCase() ?? null,
      region,
    });
  } catch {
    return NextResponse.json({
      country: null,
      region: "latam" satisfies Region,
    });
  }
}
