"use client";
import Image from "next/image";
import LeftArrowIcon from "../svg/LeftArrow";
import RightArrowIcon from "../svg/RightArrow";
import { usePictureCarousel } from "@/hooks/usePictureCarousel";

export default function Portafolio() {
  usePictureCarousel();

  const images = [
    {
      id: 1,
      title: "Image 1",
      url: "https://source.unsplash.com/random/200x370?sig=",
    },
    {
      id: 2,
      title: "Image 2",
      url: "https://source.unsplash.com/random/200x370?sig=",
    },
    {
      id: 3,
      title: "Image 3",
      url: "https://source.unsplash.com/random/200x370?sig=",
    },
    {
      id: 4,
      title: "Image 4",
      url: "https://source.unsplash.com/random/200x370?sig=",
    },
    {
      id: 5,
      title: "Image 5",
      url: "https://source.unsplash.com/random/200x370?sig=",
    },
    {
      id: 6,
      title: "Image 6",
      url: "https://source.unsplash.com/random/200x370?sig=",
    },
    {
      id: 7,
      title: "Image 7",
      url: "https://source.unsplash.com/random/200x370?sig=",
    },
    {
      id: 8,
      title: "Image 8",
      url: "https://source.unsplash.com/random/200x370?sig=",
    },
    {
      id: 9,
      title: "Image 9",
      url: "https://source.unsplash.com/random/200x370?sig=",
    },
    {
      id: 10,
      title: "Image 10",
      url: "https://source.unsplash.com/random/200x370?sig=",
    },
    {
      id: 11,
      title: "Image 11",
      url: "https://source.unsplash.com/random/200x370?sig=",
    },
    {
      id: 12,
      title: "Image 12",
      url: "https://source.unsplash.com/random/200x370?sig=",
    },
  ];

  return (
    <section
      id="portafolio"
      className="w-screen h-screen bg-gray-100 flex flex-col items-center justify-center gap-16 2xl:gap-20"
    >
      <div className="w-full flex flex-col items-center justify-center">
        <p className="text-[9vw] sm:text-[7vw] lg:text-[5vw] 2xl:text-[4vw] leading-none overflow-hidden">
          <strong>PORTA</strong>FOLIO
        </p>
      </div>
      <div className="w-[90%] max-w-[1150px] h-auto min-h-[475px] flex items-center justify-between overflow-hidden">
        <div className="pictures-wrapper">
          <div id="left-picture-arrow" className="picture-arrow">
            <LeftArrowIcon color="#000000" />
          </div>
          <div className="pictures-carousel">
            {images.map((image) => (
              <div key={image.id} className="picture">
                <Image
                  src={`${image.url}${image.id}`}
                  alt={image.title}
                  fill
                  quality={100}
                  className="picture-image"
                />
              </div>
            ))}
          </div>
          <div id="right-picture-arrow" className="picture-arrow">
            <RightArrowIcon color="#000000" />
          </div>
        </div>
      </div>
    </section>
  );
}
