import { useContext, useEffect } from "react";
import { Locale } from "@/i18n/config";
import LanguagesList from "@/components/LanguagesList";
import NavOptions from "@/components/navbar/NavOptions";
import HamburgerMenu from "@/components/navbar/HamburgerMenu";
import { LocomotiveScrollContext } from "@/hooks/useLocomotiveScroll";
import useScrollNavbarHide from "@/hooks/useScrollNavbarHide";

export default function Navbar({
  lang,
  navigation,
}: {
  lang: Locale;
  navigation: any;
}) {
  const showNavbar = useScrollNavbarHide();
  const locomotiveScroll = useContext(LocomotiveScrollContext);

  useEffect(() => {
    if (locomotiveScroll) {
      locomotiveScroll.update();
    }
  }, [locomotiveScroll]);

  return (
    <nav
      className={`w-full h-14 lg:h-16 flex items-center justify-between px-4 text-white fixed top-0 left-0 right-0 border-jazzberry-jam-500 md:border-none border-opacity-20 z-[1001] transition-transform duration-500 ease-out ${
        showNavbar ? "border-b-[0.5px]" : ""
      }`}
    >
      <HamburgerMenu navigation={navigation} />
      <a
        onClick={() => {
          if (locomotiveScroll) {
            locomotiveScroll.scrollTo("#home", {
              duration: 1000,
              easing: [0.22, 0.22, 0.2, 1],
            });
          }
        }}
        className="text-jazzberry-jam-950 font-bold font-BeckanPersonal tracking-widest text-[25px] cursor-pointer"
      >
        ILA
      </a>
      <NavOptions options={navigation.nav_options} currentLanguage={lang} />
      <LanguagesList currentLanguage={lang} languages={navigation.languages} />
    </nav>
  );
}
