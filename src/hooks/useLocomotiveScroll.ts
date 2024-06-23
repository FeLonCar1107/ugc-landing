import { createContext, useEffect, useState } from "react";
import type LocomotiveScroll from "locomotive-scroll";

export const LocomotiveScrollContext = createContext<LocomotiveScroll | null>(
  null,
);

const useLocomotiveScroll = () => {
  const [locomotiveScrollInstance, setLocomotiveScrollInstance] =
    useState<LocomotiveScroll | null>(null);

  useEffect(() => {
    let locomotiveScroll: LocomotiveScroll;
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      locomotiveScroll = new LocomotiveScroll({
        el: document.querySelector("#main") as HTMLElement,
        smooth: true,
        smartphone: {
          smooth: true,
        },
      });
      setLocomotiveScrollInstance(locomotiveScroll);
    })();

    return () => {
      if (locomotiveScroll) locomotiveScroll.destroy();
    };
  }, []);

  return locomotiveScrollInstance;
};

export default useLocomotiveScroll;
