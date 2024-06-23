import { useEffect } from "react";
import Image from "next/image";
import { ICollaborationsProps } from "@/types/collaborations";
import mariposas from "../../../public/borboletas-butterflies.gif";
import mariposas2 from "../../../public/borboletas-butterflies2.gif";

export default function Collaborations(props: ICollaborationsProps) {
  const { splitTitle, content } = props.data;

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--total-brands", content.brands.length.toString());
  }, [content.brands.length]);

  return (
    <section
      data-scroll-section
      id="collaborations"
      className="w-screen h-auto relative bg-transparent"
    >
      <div className="w-full h-auto flex items-end justify-center">
        <div
          data-scroll
          data-scroll-speed="-1.5"
          className="relative w-[15vw] h-[15vw] max-w-[250px] max-h-[250px]"
        >
          <Image
            src={mariposas2}
            alt="Mariposas"
            fill
            sizes="100vw"
            quality={100}
            className="mariposas transform scale-x-[-1]"
          />
        </div>
        <p className="flex gap-3 text-[25px] md:text-[40px] xl:text-[50px] uppercase text-jazzberry-jam-600">
          <strong>{splitTitle[0]}</strong> <span className="hidden md:flex">{splitTitle[1]}</span>
        </p>
        <div
          data-scroll
          data-scroll-speed="3"
          className="relative w-[15vw] h-[15vw] max-w-[250px] max-h-[250px]"
        >
          <Image
            src={mariposas}
            alt="Mariposas"
            fill
            sizes="100vw"
            quality={100}
            className="mariposas"
          />
        </div>
      </div>
      <div className="collaborations-slider z-30">
        <div className="collaborations-slider-track">
          {content.brands.concat(content.brands).map((brand, index) => (
            <div key={index} className="collaborations-slider-brand">
              <div className="brand relative">
                {/* <Image src={brand.logo} alt={brand.alt} fill sizes="100vw" /> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
