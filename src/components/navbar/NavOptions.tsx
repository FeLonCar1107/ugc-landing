import { useContext, useEffect } from "react";
import { LocomotiveScrollContext } from "@/hooks/useLocomotiveScroll";

export default function NavOptions(props: any) {
  const locomotiveScroll = useContext(LocomotiveScrollContext);

  useEffect(() => {
    if (locomotiveScroll) {
      locomotiveScroll.update();
    }
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
    <div className="hidden md:flex mx-auto justify-center items-center gap-2 2xl:gap-8 nav-options">
      {props.options.map((option: any) => (
        <a
          onClick={() => scrollTo(option.href)}
          key={option.id}
          className="text-jazzberry-jam-800 rounded-3xl hover:text-jazzberry-jam-500 py-2 px-5 flex-grow text-[11px] lg:text-[14px] 2xl:text-[20px] text-center font-normal cursor-pointer transition-all duration-300 ease-in-out nav-option"
        >
          {option.title}
        </a>
      ))}
    </div>
  );
}
