import Image from "next/image";
import Skills from "@/components/Skills";
import { IHomeProps } from "@/types/home";

export default function Home(props: IHomeProps) {
  const { content } = props.data;

  return (
    <section
      id="home"
      data-scroll-section
      className="w-screen min-h-screen h-screen bg-transparent relative"
    >
      <div className="absolute top-20 lg:top-11 left-[14%] sm:left-[7%] text-jazzberry-jam-300 font-bold ">
        <Skills words={content?.skills} />
      </div>
      <div className="w-[50%] sm:w-auto absolute top-20 lg:top-12 right-0 sm:right-[7%] text-jazzberry-jam-300 font-bold">
        <p className="text-sm sm:text-base h-auto sm:text-[2.5vw] lg:text-[1.4vw] sm:max-w-[40vw] lg:max-w-[20vw] pr-5 md:pr-0 lg:leading-[1.5vw]">
          {content?.shortDescription}
        </p>
      </div>
      <div
        data-scroll
        data-scroll-speed="5"
        className="absolute top-1/3 transform -translate-y-1/3 sm:bottom-12 w-full h-auto flex flex-col items-center justify-end z-10 overflow-hidden space-y-[-3.3vw]"
      >
        <h1 className="tw-primary-title text-jazzberry-jam-400 font-BeckanPersonal leading-none text-[17vw] xl:text-[15vw] 2xl:text-[13vw] overflow-hidden">
          {content?.name.toUpperCase()}
        </h1>
        <h1 className="tw-secondary-title font-BeckanPersonal text-transparent text-[17vw] xl:text-[15vw] 2xl:text-[13vw] leading-none overflow-hidden">
          {content?.name.toUpperCase()}
        </h1>
      </div>
      <div className="absolute w-[90%] max-w-[270px] md:max-w-[300px] lg:max-w-[340px] 2xl:max-w-[460px] h-[70%] lg:h-[95%] px-1 bottom-0 left-1/2 transform -translate-x-1/2 z-20">
        <div
          data-scroll
          data-scroll-speed="1"
          className="w-full h-full relative"
        >
          <Image
            src={content?.image}
            alt="Isabella"
            fill
            sizes="(max-width: 600px) 100vw, 600px"
            quality={100}
            className="main-image"
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
          className="w-[57vw] sm:w-[40vw] md:w-[25vw] h-[67vw] sm:h-[50vw] md:h-[30vw] relative"
        >
          <Image
            src={content?.flower}
            alt="flower"
            fill
            sizes="(max-width: 600px) 100vw, 600px"
            className="rotate-[-30deg] md:ml-8 lg:ml-14 2x:ml-20"
          />
        </div>
        <div
          data-scroll
          data-scroll-direction="horizontal"
          data-scroll-speed="1.5"
          className="w-[57vw] sm:w-[40vw] md:w-[25vw] h-[67vw] sm:h-[50vw] md:h-[30vw] relative"
        >
          <Image
            src={content?.flower}
            alt="flower"
            fill
            sizes="(max-width: 600px) 100vw, 600px"
          />
        </div>
      </div>
    </section>
  );
}
