"use client";
import { useEffect, useState } from "react";
import { LocomotiveScrollContext } from "@/hooks/useLocomotiveScroll";
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
import { Locale } from "@/i18n/config";

export default function Main(props: any) {
  useCustomCursor();
  const locomotiveScroll = useLocomotiveScroll();
  const { navigation, page } = props.data;
  const {
    home,
    about,
    social,
    collaborations,
    portafolio,
    ugc,
    videos,
    contact,
  } = page;
  const [lang, setLang] = useState<Locale>("es");

  useEffect(() => {
    setLang(document.documentElement.lang as Locale);
  }, []);

  return (
    <LocomotiveScrollContext.Provider value={locomotiveScroll}>
      <Navbar lang={lang} navigation={navigation} />
      <div className="cursor-dot" data-cursor-dot id="cursor1"></div>
      <div className="cursor-outline" data-cursor-outline id="cursor2"></div>
      <div className="cursor-outline-sec" id="cursor3"></div>
      <main id="main" data-scroll-container className="bg-jazzberry-jam-100">
        <Home data={home} />
        <Videos data={videos} />
        <Collaborations data={collaborations} />
        <Portafolio data={portafolio} />
        <About data={about} />
        <InstaFeed />
        <UGC data={ugc} />
        {/* <FeedBack /> */}
        <Contact data={contact} />
        <Footer />
        <SocialFixed data={social} />
      </main>
      <Footer />
    </LocomotiveScrollContext.Provider>
  );
}
