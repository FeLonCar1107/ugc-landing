import Image from "next/image";
import Isabella from "../../public/isabella.png";
import AnimatedBackground from "@/components/AnimatedBackground";

export default function Home() {
  return (
    <div id="home" className="w-screen h-screen relative">
      <AnimatedBackground />
      <div className="absolute bottom-0 w-full flex flex-col items-center justify-center">
        <h1 className="primary-title font-BeckanPersonal">Isabella</h1>
        <h1 className="secondary-title font-BeckanPersonal">Isabella</h1>
      </div>
      <Image
        src={Isabella}
        alt="Isabella"
        width={600}
        height={500}
        quality={100}
        className="absolute bottom-0 right-[50%] transform translate-x-1/2 filter grayscale"
      />
    </div>
  );
}
