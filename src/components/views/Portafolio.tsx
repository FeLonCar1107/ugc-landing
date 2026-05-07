import { useEffect, useState } from "react";
import Image from "next/image";
import LeftArrowIcon from "@/components/svg/LeftArrow";
import RightArrowIcon from "@/components/svg/RightArrow";
import { IPicture } from "@/types/picture";
import { IPortfolioProps } from "@/types/props/portfolio";
import { usePictureCarousel } from "@/hooks/usePictureCarousel";

export default function Portafolio(props: IPortfolioProps) {
  const { splitTitle, content } = props;
  const [imageLoadingStates, setImageLoadingStates] = useState<boolean[]>([]);

  usePictureCarousel(content.pictures.length);

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
      className="relative w-full scroll-mt-6 bg-transparent pt-16 pb-10 md:pt-20 md:pb-14 lg:pt-24 lg:pb-16"
    >
      <div className="section-shell flex flex-col items-center gap-6 md:gap-8 lg:gap-10">
        <header className="flex max-w-2xl flex-col items-center px-1 text-center">
          <h2 className="tw-section-heading tw-text-heading flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1">
            <span className="font-semibold tracking-[0.12em]">
              {splitTitle[0]}
            </span>
            {splitTitle[1] ? (
              <span className="font-light tracking-[0.14em] text-jazzberry-jam-900">
                {splitTitle[1]}
              </span>
            ) : null}
          </h2>
        </header>

        <div className="relative w-full">
          <div className="pictures-wrapper">
            <button
              type="button"
              id="left-picture-arrow"
              className="picture-arrow group flex items-center justify-center rounded-full border border-jazzberry-jam-200/40 bg-white/90 shadow-[0_4px_24px_-8px_rgba(83,4,36,0.15)] backdrop-blur-sm transition hover:border-jazzberry-jam-300/60 hover:bg-white"
              aria-label="Previous images"
            >
              <LeftArrowIcon
                color="#9c114b"
                size="18px"
              />
            </button>

            <div
              className="pictures-carousel touch-pan-x"
              tabIndex={0}
              role="region"
              aria-label="Portfolio gallery"
            >
              {content.pictures.map((picture: IPicture, index: number) => (
                <div key={picture.id} className="picture">
                  {imageLoadingStates[index] && (
                    <div className="tw-media-placeholder absolute inset-0 rounded-[inherit]">
                      <div className="media-loader"></div>
                    </div>
                  )}
                  <Image
                    src={picture.src}
                    alt={picture.alt}
                    fill
                    quality={95}
                    draggable={false}
                    onLoad={() => handleImageLoad(index)}
                    onLoadingComplete={() => handleImageLoad(index)}
                    onError={() => handleImageLoad(index)}
                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 45vw, 30vw"
                    className={`picture-image rounded-[inherit] ${
                      imageLoadingStates[index] ? "opacity-0" : "opacity-100"
                    }`}
                  />
                </div>
              ))}
            </div>

            <button
              type="button"
              id="right-picture-arrow"
              className="picture-arrow group flex items-center justify-center rounded-full border border-jazzberry-jam-200/40 bg-white/90 shadow-[0_4px_24px_-8px_rgba(83,4,36,0.15)] backdrop-blur-sm transition hover:border-jazzberry-jam-300/60 hover:bg-white"
              aria-label="Next images"
            >
              <RightArrowIcon color="#9c114b" size="18px" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
