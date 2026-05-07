import { useContext, useEffect, useState } from "react";
import type LocomotiveScroll from "locomotive-scroll";
import { Locale } from "@/i18n/config";
import { montserrat } from "@/app/ui/fonts";
import { INavigationProps } from "@/types/props/navigation";
import { LocomotiveScrollContext } from "@/hooks/useLocomotiveScroll";
import NavOptions from "@/components/navbar/NavOptions";
import LangSwitcher from "@/components/navbar/LangSwitcher";
import HamburgerMenu from "@/components/navbar/HamburgerMenu";

/**
 * Locomotive scroll `y` above this (px) → frosted navbar.
 * Small threshold so blur kicks in as soon as the user starts scrolling.
 */
const GLASS_NAV_AFTER_SCROLL_PX = 8;

export default function Navbar({
  lang,
  navigation,
}: {
  lang: Locale;
  navigation: INavigationProps;
}) {
  const [glassNav, setGlassNav] = useState(false);
  const locomotiveScroll = useContext(LocomotiveScrollContext);

  useEffect(() => {
    if (!locomotiveScroll) return;

    locomotiveScroll.update();

    const onScroll = (event: { scroll: { y: number } }) => {
      setGlassNav(event.scroll.y > GLASS_NAV_AFTER_SCROLL_PX);
    };

    locomotiveScroll.on("scroll", onScroll);
    onScroll({ scroll: { y: 0 } });

    return () => {
      (
        locomotiveScroll as LocomotiveScroll & {
          off: (event: "scroll", callback: typeof onScroll) => void;
        }
      ).off("scroll", onScroll);
    };
  }, [locomotiveScroll]);

  const goToHome = () => {
    if (locomotiveScroll) {
      locomotiveScroll.scrollTo("#home", {
        duration: 1000,
        easing: [0.22, 0.22, 0.2, 1],
      });
    }
  };

  return (
    <nav
      className={`box-border flex h-[var(--navbar-height)] min-h-[var(--navbar-height)] max-h-[var(--navbar-height)] w-full shrink-0 items-center justify-center text-white fixed top-0 left-0 z-[1000] animated fadeIn transition-[background-color,backdrop-filter,box-shadow,border-color] duration-500 ease-out ${
        montserrat.className
      } ${
        glassNav
          ? "border-b border-white/25 bg-jazzberry-jam-100/55 shadow-[0_8px_32px_-12px_rgba(83,4,36,0.18)] backdrop-blur-xl backdrop-saturate-150 [box-shadow:inset_0_1px_0_0_rgba(255,255,255,0.35)]"
          : "border-[1px] border-jazzberry-jam-500 border-opacity-20 bg-transparent md:border-none md:border-opacity-0"
      }`}
    >
      <div className="section-shell flex h-full w-full min-w-0 items-center justify-between gap-2">
        {/* hamburger-react usa caja 48px con barras centradas (~12px de hueco a la izquierda); -ml-3 alinea el trazo con section-shell como el texto del hero */}
        <div className="md:hidden -ml-3 flex shrink-0 items-center justify-start">
          <HamburgerMenu
            color="#530424"
            navigation={navigation}
            currentLanguage={lang}
          />
        </div>
        <a
          onClick={goToHome}
          className="text-jazzberry-jam-900 font-bold font-BeckanPersonal tracking-widest text-[20px] cursor-pointer animated fadeIn"
        >
          ILA
        </a>
        <NavOptions options={navigation.nav_options} />
        <LangSwitcher currentLanguage={lang} />
      </div>
    </nav>
  );
}
