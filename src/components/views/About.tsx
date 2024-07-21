import Image from "next/image";
import useHoverEffects from "@/hooks/useHoverEffects";
import { IAboutProps } from "@/types/props/about";
import { useEffect, useState } from "react";
import CameraBackground from "@/components/svg/CameraBackground";

export default function About(props: IAboutProps) {
  useHoverEffects();
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const [totalBrands, setTotalBrands] = useState<string>("0");
  const { title, subtitle, content } = props;

  useEffect(() => {
    setIsDesktop(window.innerWidth > 1024);
    setTotalBrands(
      window
        .getComputedStyle(document.documentElement)
        .getPropertyValue("--total-brands"),
    );
  }, []);

  return (
    <section
      data-scroll-section
      id="about"
      className="w-screen h-auto min-h-screen flex items-center justify-center lg:py-10"
    >
      <div className="w-full h-full max-w-[1300px] flex flex-col lg:flex-row items-center justify-center gap-3">
        <div className="w-full lg:w-[40%] h-full flex flex-col items-center justify-center">
          <div
            data-scroll
            data-scroll-direction="horizontal"
            data-scroll-speed={isDesktop ? "-1" : "-3.5"}
            className="hidden lg:block"
          >
            <CameraBackground color="#fdcde9">
              <Image
                src={content.illustration.src}
                alt={content.illustration.alt}
                width={800}
                height={800}
                className="camera-picture rotate-[-7deg] drop-shadow-md"
              />
            </CameraBackground>
          </div>
        </div>
        <div className="w-full lg:w-[60%] h-full flex flex-col lg:flex-row items-center justify-center gap-3">
          <div className="w-[75%] lg:w-full flex flex-col gap-3 lg:z-30">
            <div className="w-full h-auto flex flex-col lg:flex-row text-jazzberry-jam-600 text-[25px] md:text-[40px] xl:text-[50px] uppercase space-y-[-3vw] md:space-y-[-1vw] lg:space-y-0">
              <p className="flex text-center font-bold lg:hidden">{title}</p>
              <p className="text-center lg:font-bold">{subtitle}</p>
            </div>
            <div className="w-full h-auto text-[10px] md:text-[0.8rem] text-jazzberry-jam-950">
              <div className="w-full h-auto flex justify-start items-start">
                <p className="w-[85%] h-full">
                  {content.description.paragraph1}
                </p>
              </div>
              <div className="w-full h-auto flex justify-end items-end">
                <p className="w-[85%] h-full">
                  {content.description.paragraph2}
                </p>
              </div>
              <div className="hidden lg:flex w-full h-auto justify-start items-start">
                <p className="w-[85%] h-full">
                  {content.description.paragraph3} {totalBrands}{" "}
                  {content.description.paragraph4}
                </p>
              </div>
            </div>
          </div>
          <div
            data-scroll
            data-scroll-direction="horizontal"
            data-scroll-speed={isDesktop ? "1" : "3.5"}
            className="w-full h-[550px] flex flex-col relative"
          >
            <div className="w-[320px] h-[450px] rotate-[8deg] absolute right-[3vw] z-10">
              <Image
                src={content.image.src}
                alt={content.image.alt}
                width={400}
                height={800}
                priority
                className="show-image grayscale"
              />
            </div>
            <div
              data-scroll
              data-scroll-direction="horizontal"
              data-scroll-speed={isDesktop ? "1" : "3.5"}
              className="w-full h-auto flex flex-col items-center justify-center font-semibold text-[30px] text-center text-white uppercase leading-none absolute bottom-0 z-50 drop-shadow-md"
            >
              {content.birth.name}
              <br />
              {content.birth.lastName}
              <br />
              {content.birth.prefix}
              <em className="font-bold text-jazzberry-jam-300">
                <span className="font-BeckanPersonal tracking-wider">
                  {content.birth.day}
                </span>{" "}
                {content.birth.month}
              </em>
              <em className="font-BeckanPersonal tracking-wider text-jazzberry-jam-300">
                {content.birth.year}
              </em>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
