"use client";
import { useEffect, useState } from "react";
import { LocomotiveScrollContext } from "@/hooks/useLocomotiveScroll";
import { Locale } from "@/i18n/config";
import { IMainProps } from "@/types/props/main";
import Loader from "@/components/Loader";
import Languages from "@/enums/languages.enum";
import useLocomotiveScroll from "@/hooks/useLocomotiveScroll";
import useCustomCursor from "@/hooks/useCustomCursor";
import Home from "@/components/views/Home";
import Videos from "@/components/views/Videos";
import Collaborations from "@/components/views/Collaborations";
import Portafolio from "@/components/views/Portafolio";
import About from "@/components/views/About";
import InstaFeed from "@/components/views/InstaFeed";
import UGC from "@/components/views/UGC";
// import FeedBack from "@/components/views/FeedBack";
import Contact from "@/components/views/Contact";
import SocialFixed from "@/components/SocialFixed";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

export default function Main(props: IMainProps) {
  useCustomCursor();
  const { navigation, page } = props;
  const { locomotiveScrollInstance, isLoading } = useLocomotiveScroll();
  const [lang, setLang] = useState<Locale>(Languages.ES);
  const {
    home,
    videos,
    collaborations,
    portafolio,
    about,
    instaFeed,
    ugc,
    contact,
    footer,
    social,
  } = page;

  useEffect(() => {
    setLang(document.documentElement.lang as Locale);
  }, []);

  useEffect(() => {
    if (!isLoading && locomotiveScrollInstance)
      locomotiveScrollInstance.update();
  }, [isLoading, locomotiveScrollInstance]);

  return (
    <LocomotiveScrollContext.Provider value={locomotiveScrollInstance}>
      <Navbar lang={lang} navigation={navigation} />
      <div className="cursor-dot" data-cursor-dot id="cursor-one"></div>
      <div className="cursor-outline" data-cursor-outline id="cursor-two"></div>
      <div className="cursor-outline-sec" id="cursor-tree"></div>
      <main id="main" data-scroll-container className="bg-jazzberry-jam-100">
        {!isLoading ? (
          <>
            <Home {...home} />
            <Videos {...videos} />
            <Collaborations {...collaborations} />
            <Portafolio {...portafolio} />
            <About {...about} />
            <InstaFeed {...instaFeed} />
            <UGC {...ugc} />
            <Contact {...contact} />
            <Footer {...footer} />
            <SocialFixed {...social} />
          </>
        ) : (
          <div className="fade-out w-screen h-screen flex items-center justify-center">
            <Loader />
          </div>
        )}
      </main>
    </LocomotiveScrollContext.Provider>
  );
}
