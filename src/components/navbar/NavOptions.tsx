import { useContext, useEffect } from "react";
import { LocomotiveScrollContext } from "@/hooks/useLocomotiveScroll";
import { INavOption } from "@/types/nav-option";
import { NavOptionsProps } from "@/types/props/nav-options";

const NAV_OPTIONS_FONT_SIZE = "clamp(10px, 1.5vw + 0.5rem, 13px)";

export default function NavOptions({ options }: NavOptionsProps) {
  const locomotiveScroll = useContext(LocomotiveScrollContext);

  useEffect(() => {
    if (locomotiveScroll) locomotiveScroll.update();
  }, [locomotiveScroll]);

  const scrollTo = (target: string) => {
    if (locomotiveScroll) {
      locomotiveScroll.scrollTo(target, {
        duration: 1000,
        easing: [0.22, 0.22, 0.2, 1],
      });
    }
  };

  return (
    <div className="hidden md:flex mx-auto justify-center items-center gap-2 2xl:gap-8 nav-options animated fadeIn">
      {options.map((option: INavOption) => (
        <a
          onClick={() => scrollTo(option.href)}
          key={option.id}
          className="text-jazzberry-jam-800 rounded-3xl hover:text-jazzberry-jam-500 py-2 px-5 flex-grow text-center font-medium cursor-pointer transition-all duration-300 ease-in-out nav-option"
          style={{ fontSize: NAV_OPTIONS_FONT_SIZE }}
        >
          {option.title}
        </a>
      ))}
    </div>
  );
}
