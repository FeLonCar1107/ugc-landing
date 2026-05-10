import { createContext, useEffect, useState } from "react";
import type LocomotiveScroll from "locomotive-scroll";

export const LocomotiveScrollContext = createContext<LocomotiveScroll | null>(
  null,
);

/** Debounce Locomotive `update()` so resize/layout bursts do not thrash work. */
const LAYOUT_UPDATE_DEBOUNCE_MS = 200;

const useLocomotiveScroll = () => {
  const [locomotiveScrollInstance, setLocomotiveScrollInstance] =
    useState<LocomotiveScroll | null>(null);

  useEffect(() => {
    let locomotiveScroll: LocomotiveScroll | undefined;
    let cancelled = false;

    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const el = document.querySelector("#main") as HTMLElement | null;
      if (!el || cancelled) return;

      locomotiveScroll = new LocomotiveScroll({
        el,
        smooth: true,
        // Default library behavior: `tablet.smooth` is false. Viewports ≥ breakpoint use
        // Native scroll (window), but this app locks document scroll (`overflow:hidden` on
        // html/body + `#main[data-scroll-container]`). iPads ≥1024px width hit that path and
        // appear “stuck” on the hero; phones/tablets below breakpoint use Smooth instead.
        tablet: {
          smooth: true,
          breakpoint: 1024,
        },
        smartphone: {
          smooth: true,
        },
      });
      if (!cancelled) setLocomotiveScrollInstance(locomotiveScroll);
      else locomotiveScroll.destroy();
    })();

    return () => {
      cancelled = true;
      setLocomotiveScrollInstance(null);
      locomotiveScroll?.destroy();
    };
  }, []);

  useEffect(() => {
    if (!locomotiveScrollInstance) return;

    const el = document.querySelector("#main") as HTMLElement | null;
    if (!el) return;

    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const scheduleUpdate = () => {
      if (timeoutId !== undefined) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        timeoutId = undefined;
        locomotiveScrollInstance.update();
      }, LAYOUT_UPDATE_DEBOUNCE_MS);
    };

    window.addEventListener("resize", scheduleUpdate, { passive: true });
    window.addEventListener("orientationchange", scheduleUpdate);

    const vv = window.visualViewport;
    if (vv) {
      vv.addEventListener("resize", scheduleUpdate);
    }

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(scheduleUpdate)
        : null;
    resizeObserver?.observe(el);

    return () => {
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("orientationchange", scheduleUpdate);
      vv?.removeEventListener("resize", scheduleUpdate);
      resizeObserver?.disconnect();
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, [locomotiveScrollInstance]);

  return { locomotiveScrollInstance };
};

export default useLocomotiveScroll;
