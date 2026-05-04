import type { ComponentProps } from "react";
import { LAUNCH_HERO_VISUAL_MOCKUP, type LaunchHeroVisual } from "@/utils/launchEnv";
import EbookHeroMockupSection from "./EbookHeroMockupSection";
import EbookHeroPortraitSection from "./EbookHeroPortraitSection";

type EbookHeroSectionProps = {
  heroVisual: LaunchHeroVisual;
} & ComponentProps<typeof EbookHeroPortraitSection>;

/**
 * Picks between the portrait hero (Isabella) and the ebook mockup hero.
 * Controlled by `NEXT_PUBLIC_LAUNCH_<SLUG>_HERO_VISUAL` — see `getLaunchHeroVisual`.
 */
export default function EbookHeroSection({ heroVisual, ...rest }: EbookHeroSectionProps) {
  if (heroVisual === LAUNCH_HERO_VISUAL_MOCKUP) {
    return <EbookHeroMockupSection {...rest} />;
  }
  return <EbookHeroPortraitSection {...rest} />;
}
