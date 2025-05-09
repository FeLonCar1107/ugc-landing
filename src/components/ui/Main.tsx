"use client";
import { useEffect, useState } from "react";
import { Locale } from "@/i18n/config";
import { montserrat } from "@/app/ui/fonts";
import { IMainProps } from "@/types/props/main";
import { LocomotiveScrollContext } from "@/hooks/useLocomotiveScroll";
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
import CustomerReviews from "@/components/views/CustomerReviews";
import Contact from "@/components/views/Contact";
import SocialFixed from "@/components/SocialFixed";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { CollabsProvider } from "@/context/CollabsContext";

export default function Main(props: IMainProps) {
  useCustomCursor();
  const { navigation, page } = props;
  const { locomotiveScrollInstance, isLoading } = useLocomotiveScroll();
  const [lang, setLang] = useState<Locale>(Languages.ES);

  useEffect(() => {
    setLang(document.documentElement.lang as Locale);
  }, []);

  useEffect(() => {
    if (!isLoading && locomotiveScrollInstance)
      locomotiveScrollInstance.update();
  }, [isLoading, locomotiveScrollInstance]);

  return (
    <LocomotiveScrollContext.Provider value={locomotiveScrollInstance}>
      <CollabsProvider>
        <Navbar lang={lang} navigation={navigation} />
        <div className="cursor-dot" data-cursor-dot id="cursor-one"></div>
        <div
          className="cursor-outline"
          data-cursor-outline
          id="cursor-two"
        ></div>
        <div className="cursor-outline-sec" id="cursor-tree"></div>
        <main
          id="main"
          data-scroll-container
          className={`${montserrat.className} bg-jazzberry-jam-100`}
        >
          {!isLoading ? (
            <>
              <Home {...page.home} />
              <Videos {...page.videos} />
              <Collaborations {...page.collaborations} />
              <Portafolio {...page.portfolio} />
              <About {...page.about} />
              <InstaFeed {...page.instaFeed} />
              <UGC {...page.ugc} />
              <CustomerReviews {...page.customerReviews} />
              <Contact {...page.contact} />
              <Footer {...page.footer} />
              <SocialFixed {...page.social} />
            </>
          ) : (
            <div className="fade-out w-screen h-screen flex items-center justify-center">
              <Loader />
            </div>
          )}
        </main>
      </CollabsProvider>
    </LocomotiveScrollContext.Provider>
  );
}
