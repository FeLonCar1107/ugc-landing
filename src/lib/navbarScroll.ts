/**
 * Pixel offset for Locomotive `scrollTo`: library aligns target to the top of the
 * scroll container; subtract the fixed navbar so headings sit just below it.
 */
export function getNavbarScrollOffsetPx(): number {
  if (typeof document === "undefined") return 0;
  const nav = document.querySelector("nav");
  if (nav) {
    const h = nav.getBoundingClientRect().height;
    if (h > 0) return Math.round(h);
  }
  const root = document.documentElement;
  const raw = getComputedStyle(root).getPropertyValue("--navbar-height").trim();
  const fs = parseFloat(getComputedStyle(root).fontSize) || 16;
  if (raw.endsWith("rem")) {
    return Math.round(parseFloat(raw) * fs);
  }
  if (raw.endsWith("px")) {
    return Math.round(parseFloat(raw));
  }
  return Math.round(3.5 * fs);
}
