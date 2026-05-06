import { createContext, useEffect, useState } from "react";
import type LocomotiveScroll from "locomotive-scroll";

export const LocomotiveScrollContext = createContext<LocomotiveScroll | null>(
  null,
);

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

  return { locomotiveScrollInstance };
};

export default useLocomotiveScroll;
