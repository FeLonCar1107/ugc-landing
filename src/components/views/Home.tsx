import { useEffect, useState } from "react";
import Image from "next/image";
import Skills from "@/components/Skills";
import { IHomeProps } from "@/types/props/home";

export default function Home(props: IHomeProps) {
  const { content } = props;
  const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth);

  const handleResize = () => {
    setInnerWidth(window.innerWidth);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getImageDimensions = () => {
    if (innerWidth <= 768) {
      return { width: 600, height: 400 };
    } else if (innerWidth <= 1500) {
      return { width: 255, height: 400 };
    } else {
      return { width: 380, height: 700 };
    }
  };

  const { width, height } = getImageDimensions();

  return (
    <section
      id="home"
      data-scroll-section
      className="w-screen min-h-screen h-screen bg-transparent relative"
    >
      <div className="absolute top-20 lg:top-[4rem] 2xl:top-14 left-[14%] sm:left-[7%] lg:left-[6%] text-jazzberry-jam-300 font-bold">
        <Skills words={content?.skills} />
      </div>
      <div className="w-[50%] sm:w-auto absolute top-20 lg:top-[4rem] 2xl:top-14 right-0 sm:right-[7%] lg:right-[4%] text-jazzberry-jam-300 font-bold">
        <p className="text-sm sm:text-base h-auto sm:text-[2.5vw] lg:text-[1.4vw] sm:max-w-[40vw] lg:max-w-[25vw] pr-5 md:pr-0 lg:leading-[1.5vw]">
          {content?.shortDescription}
        </p>
      </div>
      <div
        data-scroll
        data-scroll-speed="5"
        className="absolute top-[35%] transform -translate-y-1/3 sm:bottom-12 w-full h-auto flex flex-col items-center justify-end z-10 overflow-hidden space-y-[-3.3vw]"
      >
        <h1 className="tw-primary-title text-jazzberry-jam-400 font-BeckanPersonal leading-none text-[17vw] xl:text-[15vw] 2xl:text-[13vw] overflow-hidden">
          {content?.name.toUpperCase()}
        </h1>
        <h1 className="tw-secondary-title font-BeckanPersonal text-transparent text-[17vw] xl:text-[15vw] 2xl:text-[13vw] leading-none overflow-hidden">
          {content?.name.toUpperCase()}
        </h1>
      </div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-20">
        <div data-scroll data-scroll-speed="1" className="relative">
          <Image
            src={content?.image}
            alt="Isabella"
            width={width}
            height={height}
            priority
            quality={100}
            className="main-image blur-in w-full h-auto"
          />
        </div>
      </div>
      <div
        data-scroll
        data-scroll-speed="0.3"
        className="absolute bottom-[-50px] sm:bottom-[35vw] md:bottom-0 2xl:-bottom-32 w-full flex justify-between"
      >
        <div
          data-scroll
          data-scroll-direction="horizontal"
          data-scroll-speed="-1.5"
          className="w-[55vw] sm:w-[40vw] md:w-[20vw] h-[65vw] sm:h-[50vw] md:h-[25vw] relative"
        >
          <Image
            src={content?.flower}
            alt="flower"
            fill
            priority
            sizes="(max-width: 600px) 100vw, 600px"
            className="rotate-[-30deg] md:ml-8 lg:ml-14 2x:ml-20"
          />
        </div>
        <div
          data-scroll
          data-scroll-direction="horizontal"
          data-scroll-speed="1.5"
          className="w-[55vw] sm:w-[40vw] md:w-[20vw] h-[65vw] sm:h-[50vw] md:h-[25vw] relative"
        >
          <Image
            src={content?.flower}
            alt="flower"
            fill
            priority
            sizes="(max-width: 600px) 100vw, 600px"
          />
        </div>
      </div>
    </section>
  );
}
