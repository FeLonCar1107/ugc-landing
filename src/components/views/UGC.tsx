import { useState, useEffect } from "react";
import { IUserCreatorContentProps } from "@/types/props/ugc";
import Image from "next/image";
import ChevronNav from "@/components/svg/ChevronNav";
import UgcCards from "@/enums/ugc-cards.enum";

const classMap: { [key: string]: string } = {
  [UgcCards.CARD_ONE]: UgcCards.UGC_ONE,
  [UgcCards.CARD_TWO]: UgcCards.UGC_TWO,
  [UgcCards.CARD_THREE]: UgcCards.UGC_THREE,
};

export default function UGC(props: IUserCreatorContentProps) {
  const { content } = props;
  const [selected, setSelected] = useState<UgcCards>(UgcCards.CARD_ONE);
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
    setSelected((prev: UgcCards) =>
      prev === UgcCards.CARD_THREE
        ? UgcCards.CARD_ONE
        : (`card-${parseInt(prev.split("-")[1]) + 1}` as UgcCards),
    );
  };

  const handlePrev = () => {
    setSelected((prev: UgcCards) =>
      prev === UgcCards.CARD_ONE
        ? UgcCards.CARD_THREE
        : (`card-${parseInt(prev.split("-")[1]) - 1}` as UgcCards),
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

  return (
    <div
      id="ugc"
      data-scroll-section
      className={`relative flex min-h-screen w-screen flex-col tw-section-y ${classMap[selected]}`}
    >
      {/* Title: watermark stays behind readable headline so “UGC” is never fully covered */}
      <header className="relative z-[5] flex w-full shrink-0 flex-col items-center px-4">
        <div className="relative flex w-full max-w-5xl items-center justify-center py-1">
          <p
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 w-max -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap font-BeckanPersonal text-[clamp(6.5rem,50vw,19rem)] leading-none tracking-tight text-jazzberry-jam-300/[0.18] md:text-[clamp(7.5rem,36vw,18.5rem)]"
          >
            UGC
          </p>
          <h2 className="relative z-[1] text-center font-BeckanPersonal text-[clamp(4.85rem,19vw,13.5rem)] md:text-[clamp(3rem,12vw,10rem)] tracking-[0.02em] text-jazzberry-jam-900">
            UGC
          </h2>
        </div>
      </header>

      <div className="slider-ugc section-shell z-10 flex min-h-0 flex-1 flex-col justify-start gap-0 -mt-20 md:-mt-10">
        <div className="cards">
          {content.cards.map((card, index: number) => (
            <div
              key={card.id}
              role="button"
              tabIndex={0}
              className={`card ${getCardClass(index)}`}
              onClick={() => setSelected(card.id as UgcCards)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelected(card.id as UgcCards);
                }
              }}
            >
              <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-[11px] bg-white shadow-[0_12px_40px_-12px_rgba(83,4,36,0.12)] ring-1 ring-jazzberry-jam-200/70">
                <div className="relative min-h-0 flex-1">
                  {imageLoadingStates[card.id] && (
                    <div className="tw-media-placeholder absolute inset-0 rounded-none">
                      <div className="media-loader"></div>
                    </div>
                  )}
                  <Image
                    src={card.image.src}
                    alt={card.image.alt}
                    fill
                    sizes="(max-width: 640px) 85vw, 400px"
                    className="picture-image object-cover transition-all duration-500"
                    onLoad={() => handleImageLoad(card.id)}
                    onError={() => handleImageLoad(card.id)}
                  />
                </div>
                <div className="flex shrink-0 flex-col justify-center bg-jazzberry-jam-50/95 px-3 py-3 sm:py-3.5">
                  <p className="text-center text-[13px] font-medium leading-snug text-jazzberry-jam-900 sm:text-sm">
                    {card.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex h-fit w-full flex-col items-center justify-center gap-4 pt-4 md:gap-5 md:pt-6">
          <div className="flex items-center gap-8 md:gap-10">
            <button
              type="button"
              aria-label="Previous card"
              onClick={handlePrev}
              className="group flex h-11 min-w-[44px] cursor-pointer items-center justify-center px-1 text-jazzberry-jam-400 transition-colors duration-200 hover:text-jazzberry-jam-800"
            >
              <ChevronNav
                direction="left"
                className="h-6 w-6 md:h-5 md:w-5"
                aria-hidden
              />
            </button>
            <div
              className="flex items-center gap-2.5"
              role="tablist"
              aria-label="UGC slides"
            >
              {content.cards.map((card, i) => (
                <button
                  key={card.id}
                  type="button"
                  role="tab"
                  aria-selected={selectedIndex === i}
                  aria-label={`Slide ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    selectedIndex === i
                      ? "w-7 bg-jazzberry-jam-700"
                      : "w-2 bg-jazzberry-jam-300/55 hover:bg-jazzberry-jam-400/70"
                  }`}
                  onClick={() => setSelected(card.id as UgcCards)}
                />
              ))}
            </div>
            <button
              type="button"
              aria-label="Next card"
              onClick={handleNext}
              className="group flex h-11 min-w-[44px] cursor-pointer items-center justify-center px-1 text-jazzberry-jam-400 transition-colors duration-200 hover:text-jazzberry-jam-800"
            >
              <ChevronNav className="h-6 w-6 md:h-5 md:w-5" aria-hidden />
            </button>
          </div>
          {/* Grid stack: all descriptions occupy the same cell so height = tallest copy (no CLS when sliding). */}
          <div
            className="mx-auto grid w-full max-w-xl justify-items-center px-2"
            aria-live="polite"
          >
            {content.cards.map((card, i) => (
              <p
                key={card.id}
                aria-hidden={selectedIndex !== i}
                className={`tw-body-readable col-start-1 row-start-1 max-w-xl text-center text-jazzberry-jam-800/95 transition-opacity duration-300 ease-out ${
                  selectedIndex === i
                    ? "visible relative z-10 opacity-100"
                    : "invisible z-0 opacity-0 pointer-events-none"
                }`}
              >
                {card.description}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
