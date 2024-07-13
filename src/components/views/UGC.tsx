import { useState, useEffect } from "react";
import Image from "next/image";
import SvgArrow from "@/components/svg/Arrow";
import { IUserCreatorContentProps } from "@/types/ugc";

const classMap: { [key: string]: string } = {
  "card-1": "ugc-1",
  "card-2": "ugc-2",
  "card-3": "ugc-3",
};

export default function UGC(props: IUserCreatorContentProps) {
  const { content } = props.data;
  const [selected, setSelected] = useState("card-1");
  const [imageLoadingStates, setImageLoadingStates] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    const initialStates = content.cards.reduce((acc, card) => {
      acc[card.id] = true;
      return acc;
    }, {} as Record<string, boolean>);
    setImageLoadingStates(initialStates);
  }, [content.cards]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(event.target.id);
  };

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

  const selectedImage = content.cards.find((card) => card.id === selected);

  return (
    <div
      id="ugc"
      data-scroll-section
      className={`w-screen h-screen flex flex-col gap-5 relative ${classMap[selected]}`}
    >
      <p className="absolute top-0 left-1/2 transform -translate-x-1/2 text-[45vw] md:text-[25vw] 2xl:text-[20vw] font-BeckanPersonal text-jazzberry-jam-300 leading-none drop-shadow-md">
        UGC
      </p>
      <div className="slider-ugc">
        {content.cards.map((image) => (
          <input
            key={image.id}
            type="radio"
            name="slider"
            id={image.id}
            checked={selected === image.id}
            onChange={handleChange}
          />
        ))}
        <div className="cards">
          {content.cards.map((card) => (
            <label
              key={card.id}
              className="card"
              htmlFor={card.id}
              id={`ugc-${card.id.split("-")[1]}`}
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
                    sizes="100vw"
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
            </label>
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
          <p className="w-[60%] max-w-[800px] min-h-24 text-center text-jazzberry-jam-800 fade-in">
            {selectedImage.description}
          </p>
        )}
      </div>
    </div>
  );
}
