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
      <div className="absolute top-56 sm:bottom-12 w-full h-auto flex flex-col items-center justify-end z-10 overflow-hidden">
        <h1 className="text-white text-[80px] sm:text-[140px] md:text-[180px] lg:text-[250px] font-BeckanPersonal leading-[70px] sm:leading-[120px] md:leading-[150px] lg:md:leading-[200px] overflow-hidden">
          {content?.name.toUpperCase()}
        </h1>
        <h1 className="tw-secondary-title text-transparent text-[80px] sm:text-[140px] md:text-[180px] lg:text-[250px] font-BeckanPersonal leading-[70px] sm:leading-[120px] md:leading-[150px] lg:md:leading-[210px] overflow-hidden">
          {content?.name.toUpperCase()}
        </h1>
      </div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-20">
        <Image
          src={Isabella}
          alt="Isabella"
          priority={true}
          width={315}
          height={265}
          quality={100}
          className="main-image"
        />
      </div>
    </section>
  );
}
