import { describe, expect, it } from "vitest";
import Languages from "@/enums/languages.enum";
import {
  endOfCalendarDayMs,
  formatBonusBundleDeadlineLine,
  getLocaleOfferTimeZone,
  resolveBonusBundleDeadlineEndMs,
} from "@/utils/launchDeadline";

describe("launchDeadline — locale timezones", () => {
  it("uses Colombia for es and US Eastern for en", () => {
    expect(getLocaleOfferTimeZone(Languages.ES)).toBe("America/Bogota");
    expect(getLocaleOfferTimeZone(Languages.EN)).toBe("America/New_York");
  });

  it("ends June 15, 2026 at 23:59:59.999 in Bogota (UTC-5)", () => {
    const ms = endOfCalendarDayMs(2026, 6, 15, "America/Bogota");
    expect(new Date(ms).toISOString()).toBe("2026-06-16T04:59:59.999Z");
  });

  it("ends June 15, 2026 at 23:59:59.999 in New York (EDT)", () => {
    const ms = endOfCalendarDayMs(2026, 6, 15, "America/New_York");
    expect(new Date(ms).toISOString()).toBe("2026-06-16T03:59:59.999Z");
  });

  it("resolves different instants for es vs en from the same env date", () => {
    const iso = "2026-06-15T23:59:59.000Z";
    const esMs = resolveBonusBundleDeadlineEndMs(iso, Languages.ES);
    const enMs = resolveBonusBundleDeadlineEndMs(iso, Languages.EN);
    expect(esMs).not.toBe(enMs);
    expect(esMs! - enMs!).toBe(3_600_000);
  });

  it("formats deadline line with es-CO locale", () => {
    const line = formatBonusBundleDeadlineLine("2026-06-15", Languages.ES);
    expect(line).toMatch(/2026/);
    expect(line).toMatch(/junio/i);
  });
});
