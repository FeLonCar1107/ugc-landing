import Image from "next/image";
import Isabella from "../../public/isabella.png";
import AnimatedBackground from "@/components/AnimatedBackground";
import { HomeProps } from "@/types/home";

export default function Home(props: HomeProps) {
  const { content } = props.data;
  return (
    <section id="home" className="w-screen h-screen">
      <div className="bg-chartTruth w-full h-12"></div>
      <AnimatedBackground />
      <div className="absolute bottom-0 w-full h-auto flex flex-col items-center justify-center z-10 bg-red-700">
        <h1 className="title primary-title font-BeckanPersonal">
          {content?.name}
        </h1>
        <h1 className="title secondary-title font-BeckanPersonal">
          {content?.name}
        </h1>
      </div>
      <div className="absolute bottom-0 z-20">
        <Image
          src={Isabella}
          alt="Isabella"
          width={600}
          height={500}
          quality={100}
          className="filter grayscale"
        />
      </div>
    </section>
  );
}
