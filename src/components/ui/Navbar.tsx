import { useContext, useEffect, useState } from "react";
import { Locale } from "@/i18n/config";
import LanguagesList from "@/components/LanguagesList";
import NavOptions from "@/components/navbar/NavOptions";
import HamburgerMenu from "@/components/navbar/HamburgerMenu";
import { LocomotiveScrollContext } from "@/hooks/useLocomotiveScroll";

export default function Navbar({
  lang,
  navigation,
}: {
  lang: Locale;
  navigation: any;
}) {
  const [showNavOptions, setShowNavOptions] = useState(true);
  const locomotiveScroll = useContext(LocomotiveScrollContext);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        locomotiveScroll?.on("scroll", (event) => {
          setShowNavOptions(event.scroll.y <= 1);
        });
      }
    };

    if (locomotiveScroll) {
      locomotiveScroll.update();
      controlNavbar();

      window.addEventListener("scroll", controlNavbar);
      return () => window.removeEventListener("scroll", controlNavbar);
    }
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
      className={`w-full h-14 lg:h-16 flex items-center justify-between px-4 text-white fixed top-0 left-0 z-[1000] transition-transform duration-500 ease-out animated fadeIn ${
        showNavOptions
          ? "border-[1px] border-jazzberry-jam-500 md:border-none border-opacity-20"
          : ""
      }`}
    >
      <div className="lg:hidden">
        <HamburgerMenu navigation={navigation} currentLanguage={lang} />
      </div>
      {showNavOptions && (
        <>
          <a
            onClick={goToHome}
            className="text-jazzberry-jam-950 font-bold font-BeckanPersonal tracking-widest text-[25px] cursor-pointer animated fadeIn"
          >
            ILA
          </a>
          <NavOptions options={navigation.nav_options} currentLanguage={lang} />
          <LanguagesList
            currentLanguage={lang}
            languages={navigation.languages}
          />
        </>
      )}
      {!showNavOptions && (
        <div className="hidden lg:block bg-jazzberry-jam-600 rounded-full">
          <HamburgerMenu
            size={20}
            color="#ffff"
            currentLanguage={lang}
            navigation={navigation}
          />
        </div>
      )}
    </nav>
  );
}
