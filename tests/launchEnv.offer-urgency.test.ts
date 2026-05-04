import { afterEach, describe, expect, it, vi } from "vitest";
import {
  getLaunchBonusBundleDeadlineIso,
  getLaunchHeroVisual,
  getLaunchOfferPhaseLabel,
} from "@/utils/launchEnv";

const SLUG = "discover-your-character";

describe("launchEnv — offer urgency helpers", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("getLaunchOfferPhaseLabel returns undefined when env unset", () => {
    expect(getLaunchOfferPhaseLabel(SLUG)).toBeUndefined();
  });

  it("getLaunchOfferPhaseLabel returns trimmed value when set", () => {
    vi.stubEnv(
      "NEXT_PUBLIC_LAUNCH_DISCOVER_YOUR_CHARACTER_OFFER_PHASE_LABEL",
      "  Early bird  ",
    );
    expect(getLaunchOfferPhaseLabel(SLUG)).toBe("Early bird");
  });

  it("getLaunchBonusBundleDeadlineIso returns undefined for invalid ISO (honest urgency)", () => {
    vi.stubEnv(
      "NEXT_PUBLIC_LAUNCH_DISCOVER_YOUR_CHARACTER_BONUS_BUNDLE_DEADLINE_ISO",
      "not-a-date",
    );
    expect(getLaunchBonusBundleDeadlineIso(SLUG)).toBeUndefined();
  });

  it("getLaunchBonusBundleDeadlineIso returns value when ISO parses", () => {
    const iso = "2026-12-31T23:59:59.000Z";
    vi.stubEnv(
      "NEXT_PUBLIC_LAUNCH_DISCOVER_YOUR_CHARACTER_BONUS_BUNDLE_DEADLINE_ISO",
      iso,
    );
    expect(getLaunchBonusBundleDeadlineIso(SLUG)).toBe(iso);
  });

  it("getLaunchHeroVisual defaults to portrait when unset", () => {
    expect(getLaunchHeroVisual(SLUG)).toBe("portrait");
  });

  it("getLaunchHeroVisual returns mockup when set (case-insensitive)", () => {
    vi.stubEnv(
      "NEXT_PUBLIC_LAUNCH_DISCOVER_YOUR_CHARACTER_HERO_VISUAL",
      " Mockup ",
    );
    expect(getLaunchHeroVisual(SLUG)).toBe("mockup");
  });

  it("getLaunchHeroVisual treats unknown values as portrait", () => {
    vi.stubEnv(
      "NEXT_PUBLIC_LAUNCH_DISCOVER_YOUR_CHARACTER_HERO_VISUAL",
      "ebook",
    );
    expect(getLaunchHeroVisual(SLUG)).toBe("portrait");
  });
});
