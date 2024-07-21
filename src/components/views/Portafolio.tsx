import { useEffect, useState } from "react";
import Image from "next/image";
import LeftArrowIcon from "@/components/svg/LeftArrow";
import RightArrowIcon from "@/components/svg/RightArrow";
import { IPicture } from "@/types/picture";
import { IPortfolioProps } from "@/types/props/portfolio";
import { usePictureCarousel } from "@/hooks/usePictureCarousel";

export default function Portafolio(props: IPortfolioProps) {
  usePictureCarousel();
  const { splitTitle, content } = props;
  const [imageLoadingStates, setImageLoadingStates] = useState<boolean[]>([]);

  useEffect(() => {
    setImageLoadingStates(new Array(content.pictures.length).fill(true));
  }, [content.pictures.length]);

  const handleImageLoad = (index: number) => {
    setImageLoadingStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = false;
      return newStates;
    });
  };

  return (
    <section
      id="portfolio"
      data-scroll-section
      className="w-screen h-screen bg-transparent flex flex-col items-center justify-center gap-5 lg:gap-10 2xl:gap-20"
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
            {content.pictures.map((picture: IPicture, index: number) => (
              <div key={picture.id} className="picture">
                {imageLoadingStates[index] && (
                  <div className="absolute inset-0 flex justify-center items-center bg-jazzberry-jam-200">
                    <div className="media-loader"></div>
                  </div>
                )}
                <Image
                  src={picture.src}
                  alt={picture.alt}
                  fill
                  sizes="(max-width: 600px) 100vw, 600px"
                  quality={100}
                  className={`picture-image ${
                    imageLoadingStates[index] ? "opacity-0" : "opacity-100"
                  }`}
                  onLoad={() => handleImageLoad(index)}
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
