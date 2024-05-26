import Image from "next/image";
import Isabella from "../../../public/isabella.png";
import AnimatedBackground from "@/components/AnimatedBackground";
import { IHomeProps } from "@/types/home";

export default function Home(props: IHomeProps) {
  const { content } = props.data;
  return (
    <section id="home" className="w-screen min-h-screen h-screen bg-xLavenDuhi">
      <AnimatedBackground />
      <div className="absolute flex justify-between top-14 lg:top-2 w-full h-auto py-3 text-white lg:opacity-80 font-bold">
        <div className="w-[50%] sm-w-auto pl-5 sm:ml-[7%] lg:ml-[10%] flex flex-col space-y-[-7px]">
          {content?.skills.map((skill: string, index: number) => (
            <p
              key={index}
              className="text-[18px] sm:text-[23px] lg:text-[27px]"
            >
              {skill}
            </p>
          ))}
        </div>
        <div className="w-[50%] sm:w-[20%] pr-1 sm:p-0 sm:mr-[7%] lg:mr-[11%] lg:py-2">
          <p className="text-sm sm:text-base lg:text-xl leading-[17px] sm:leading-[19px] lg:leading-[25px]">
            {content?.shortDescription}
          </p>
        </div>
      </div>
      <div className="absolute top-56 sm:bottom-12 w-full h-auto flex flex-col items-center justify-end z-10 overflow-hidden space-y-[-3.7vw]">
        <h1 className="text-white font-BeckanPersonal leading-none text-[15vw] sm:text-[18vw] lg:text-[13vw] overflow-hidden">
          {content?.name.toUpperCase()}
        </h1>
        <h1 className="tw-secondary-title font-BeckanPersonal text-transparent text-[15vw] sm:text-[18vw] lg:text-[13vw] leading-none overflow-hidden">
          {content?.name.toUpperCase()}
        </h1>
      </div>
      <div className="absolute w-auto h-screen px-1 bottom-0 left-1/2 transform -translate-x-1/2 z-20">
        <div className="w-[18vw] h-full relative">
          <Image
            src={Isabella}
            alt="Isabella"
            fill
            priority={true}
            quality={100}
            className="main-image"
          />
        </div>
      </div>
    </section>
  );
}
