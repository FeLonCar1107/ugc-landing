import { describe, expect, it } from "vitest";
import {
  buildLaunchAssetResolver,
  isPerLaunchAsset,
  resolveLaunchAssetUrl,
} from "@/utils/launchAssets";

const LAUNCH_BASE = "/launch-assets/discover-your-character";

describe("launchAssets", () => {
  it("routes shared decorative assets to /launch-assets/shared", () => {
    expect(resolveLaunchAssetUrl(LAUNCH_BASE, "hero_done.png")).toBe(
      "/launch-assets/shared/hero_done.png",
    );
    expect(resolveLaunchAssetUrl(LAUNCH_BASE, "proof_timeline_2024.png")).toBe(
      "/launch-assets/shared/proof_timeline_2024.png",
    );
  });

  it("routes offer mockup and bonuses to the launch slug folder", () => {
    expect(resolveLaunchAssetUrl(LAUNCH_BASE, "offer_ebook_mockup.png")).toBe(
      `${LAUNCH_BASE}/offer_ebook_mockup.png`,
    );
    expect(resolveLaunchAssetUrl(LAUNCH_BASE, "offer_bonus_02.png")).toBe(
      `${LAUNCH_BASE}/offer_bonus_02.png`,
    );
  });

  it("classifies per-launch filenames", () => {
    expect(isPerLaunchAsset("offer_ebook_mockup.png")).toBe(true);
    expect(isPerLaunchAsset("offer_bonus_04.png")).toBe(true);
    expect(isPerLaunchAsset("hero_done.png")).toBe(false);
  });

  it("buildLaunchAssetResolver strips trailing slash on launch base", () => {
    const asset = buildLaunchAssetResolver(`${LAUNCH_BASE}/`);
    expect(asset("faq_done.png")).toBe("/launch-assets/shared/faq_done.png");
    expect(asset("offer_bonus_01.png")).toBe(
      `${LAUNCH_BASE}/offer_bonus_01.png`,
    );
  });
});
