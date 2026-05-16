/** Shared decorative / editorial PNGs — one copy under `public/launch-assets/shared/`. */
export const LAUNCH_SHARED_ASSET_DIR = "shared" as const;

export function launchSharedAssetBase(): string {
  return `/launch-assets/${LAUNCH_SHARED_ASSET_DIR}`;
}

/** Ebook mockup + bonus plates — unique per launch slug folder. */
const PER_LAUNCH_ASSET_PATTERN = /^offer_(ebook_mockup|bonus_\d+)\.png$/;

export function isPerLaunchAsset(filename: string): boolean {
  return PER_LAUNCH_ASSET_PATTERN.test(filename);
}

export function resolveLaunchAssetUrl(
  launchAssetBase: string,
  filename: string,
): string {
  const launch = launchAssetBase.replace(/\/$/, "");
  if (isPerLaunchAsset(filename)) {
    return `${launch}/${filename}`;
  }
  return `${launchSharedAssetBase()}/${filename}`;
}

export function buildLaunchAssetResolver(launchAssetBase: string) {
  return (filename: string) => resolveLaunchAssetUrl(launchAssetBase, filename);
}
