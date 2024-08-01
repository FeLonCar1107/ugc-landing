import { useState, useEffect } from "react";
import Image from "next/image";
import SvgArrow from "@/components/svg/Arrow";
import { IUserCreatorContentProps } from "@/types/props/ugc";

const classMap: { [key: string]: string } = {
  "card-1": "ugc-1",
  "card-2": "ugc-2",
  "card-3": "ugc-3",
};

export default function UGC(props: IUserCreatorContentProps) {
  const { content } = props;
  const [selected, setSelected] = useState("card-1");
  const [imageLoadingStates, setImageLoadingStates] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    const initialStates = content.cards.reduce<{ [key: string]: boolean }>(
      (acc, card) => {
        acc[card.id] = true;
        return acc;
      },
      {},
    );
    setImageLoadingStates(initialStates);
  }, [content.cards]);

  const handleNext = () => {
    setSelected((prev) =>
      prev === "card-3" ? "card-1" : `card-${parseInt(prev.split("-")[1]) + 1}`,
    );
  };

  const handlePrev = () => {
    setSelected((prev) =>
      prev === "card-1" ? "card-3" : `card-${parseInt(prev.split("-")[1]) - 1}`,
    );
  };

  const handleImageLoad = (id: string) => {
    setImageLoadingStates((prevStates) => ({
      ...prevStates,
      [id]: false,
    }));
  };

  const selectedIndex = content.cards.findIndex((card) => card.id === selected);

  const getCardClass = (index: number) => {
    if (index === selectedIndex) return "selected";
    if (index === (selectedIndex + 1) % 3) return "next";
    if (index === (selectedIndex + 2) % 3) return "prev";
    return "";
  };

  const selectedImage = content.cards[selectedIndex];

  return (
    <div
      id="ugc"
      data-scroll-section
      className={`w-screen h-screen flex flex-col gap-5 relative ${classMap[selected]}`}
    >
      <p className="absolute top-0 left-1/2 transform -translate-x-1/2 text-[45vw] md:text-[25vw] 2xl:text-[20vw] font-BeckanPersonal text-jazzberry-jam-300 leading-none drop-shadow-md z-0">
        UGC
      </p>
      <div className="slider-ugc z-10">
        <div className="cards">
          {content.cards.map((card, index: number) => (
            <div
              key={card.id}
              className={`card ${getCardClass(index)}`}
              onClick={() => setSelected(card.id)}
            >
              <div className="w-full h-full flex flex-col text-jazzberry-jam-200">
                <div className="w-full h-[80%] relative">
                  {imageLoadingStates[card.id] && (
                    <div className="absolute inset-0 flex justify-center items-center bg-jazzberry-jam-200 rounded-sm">
                      <div className="media-loader"></div>
                    </div>
                  )}
                  <Image
                    src={card.image.src}
                    alt={card.image.alt}
                    fill
                    sizes="(max-width: 600px) 100vw, 600px"
                    className={`picture-image rounded-sm ${
                      imageLoadingStates[card.id] ? "opacity-0" : "opacity-100"
                    }`}
                    onLoad={() => handleImageLoad(card.id)}
                  />
                </div>
                <div className="w-full h-[20%] flex items-center justify-center">
                  <p className="text-center text-sm sm:text-[1.8vw] md:text-[2vw] lg:text-[1.5vw] xl:text-[1.2vw] 2xl:text-[0.7vw] font-medium">
                    {card.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full h-fit flex items-center justify-center gap-5">
          <div
            onClick={handlePrev}
            className="w-[6vw] h-[6vw] md:w-[2vw] md:h-[2vw] cursor-pointer"
          >
            <SvgArrow color="#871444" position="left" />
          </div>
          <span className="text-[6vw] md:text-[2vw] text-jazzberry-jam-900">
            •••
          </span>
          <div
            onClick={handleNext}
            className="w-[6vw] h-[6vw] md:w-[2vw] md:h-[2vw] cursor-pointer"
          >
            <SvgArrow color="#871444" />
          </div>
        </div>
        {selectedImage && (
          <p className="w-[60%] max-w-[800px] min-h-24 text-center text-jazzberry-jam-800">
            {selectedImage.description}
          </p>
        )}
      </div>
    </div>
  );
}
