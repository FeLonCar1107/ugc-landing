import Image from "next/image";
import LeftArrowIcon from "@/components/svg/LeftArrow";
import RightArrowIcon from "@/components/svg/RightArrow";
import { IPortafolioProps } from "@/types/portafolio";
import { usePictureCarousel } from "@/hooks/usePictureCarousel";

export default function Portafolio(props: IPortafolioProps) {
  usePictureCarousel();
  const { splitTitle, content } = props.data;

  return (
    <section
      data-scroll-section
      id="portafolio"
      className="w-screen h-screen bg-transparent flex flex-col items-center justify-center gap-5 lg:gap-16 2xl:gap-20"
    >
      <div className="w-full flex flex-col items-center justify-center">
        <p className="text-jazzberry-jam-500 text-[25px] md:text-[40px] xl:text-[50px] uppercase leading-none overflow-hidden">
          <strong>{splitTitle[0]}</strong>
          {splitTitle[1]}
        </p>
      </div>
      <div className="w-[77%] md:w-[85%] max-w-[1150px] h-auto min-h-[475px] flex items-center justify-between overflow-hidden">
        <div className="pictures-wrapper">
          <div id="left-picture-arrow" className="picture-arrow">
            <LeftArrowIcon color="#871444" />
          </div>
          <div className="pictures-carousel">
            {content.pictures.map((picture) => (
              <div key={picture.id} className="picture">
                <Image
                  src={picture.src}
                  alt={picture.alt}
                  fill
                  sizes="(max-width: 600px) 100vw, 600px"
                  quality={100}
                  className="picture-image"
                />
              </div>
            ))}
          </div>
          <div id="right-picture-arrow" className="picture-arrow">
            <RightArrowIcon color="#871444" />
          </div>
        </div>
      </div>
    </section>
  );
}
