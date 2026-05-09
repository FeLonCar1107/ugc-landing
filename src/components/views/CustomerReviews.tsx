import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { IReview } from "@/types/review";
import { ICustomerReviewsProps } from "@/types/props/customer-reviews";
import { LocomotiveScrollContext } from "@/hooks/useLocomotiveScroll";
import apiService from "@/services/api.service";
import CardReview from "@/components/CardReview";

export default function CustomerReviews(props: ICustomerReviewsProps) {
  const { content, splitTitle, splitLetter } = props;
  const [reviews, setReviews] = useState<IReview[]>([]);
  const locomotiveScroll = useContext(LocomotiveScrollContext);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (locomotiveScroll) locomotiveScroll.update();
  }, [reviews, locomotiveScroll]);

  const fetchData = async () => {
    try {
      setReviews(await apiService.GET("reviews"));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section
      id="customer-reviews"
      data-scroll-section
      className="relative z-[1] flex w-screen items-center justify-center tw-section-y"
    >
      <div id="customers" className="section-shell flex h-auto gap-10">
        <div
          data-scroll
          data-scroll-sticky
          data-scroll-speed="1.2"
          data-scroll-target="#customers"
          className="relative z-[1] flex h-screen w-[15%] flex-col items-center lg:w-[40%]"
        >
          {/*
            Inner band: when Locomotive pins this column to the viewport top, section
            tw-section-y padding no longer clears the fixed nav — this pt matches
            --navbar-height + --section-top-gutter. Section/column stay z-[1]; Navbar z-[1000].
          */}
          <div className="flex min-h-0 w-full flex-1 flex-col items-center justify-start lg:pt-[calc(var(--navbar-height)+var(--section-top-gutter))]">
            {/* Desktop: portrait sits behind the headline; anchor low so only a sliver peeks past the text */}
            <div className="relative isolate hidden min-h-[min(52vh,420px)] w-full flex-1 flex-col lg:flex">
              <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[clamp(6.75rem,26vh,10.5rem)] z-0 flex items-end justify-center px-2 pb-3">
                <Image
                  src={content.image.src}
                  alt={content.image.alt}
                  width={900}
                  height={1410}
                  priority
                  quality={100}
                  sizes="(min-width: 1024px) min(42vw, 290px), 0px"
                  className="customer-reviews-hero-img h-auto w-full max-w-[min(100%,290px)] translate-y-2 object-contain object-bottom"
                />
              </div>
              <div className="relative z-10 flex w-full shrink-0 items-center justify-between">
                <Image
                  src={content.flower.src}
                  alt={content.flower.alt}
                  width={30}
                  height={30}
                  className="rotating"
                />
                <header className="flex min-w-0 max-w-[min(100%,20rem)] flex-col items-center justify-center space-y-0.5 px-2 text-center">
                  <p className="tw-eyebrow">{splitTitle[0]}</p>
                  <h2 className="tw-section-heading tw-text-heading font-bold [text-shadow:0_1px_0_rgb(var(--landing-page-bg-rgb)),0_2px_12px_rgb(var(--landing-page-bg-rgb)/0.85)]">
                    {splitTitle[1]}
                  </h2>
                </header>
                <Image
                  src={content.flower.src}
                  alt={content.flower.alt}
                  width={30}
                  height={30}
                  className="rotating"
                />
              </div>
            </div>
            <div
              id="split-letter"
              className="flex h-full w-full flex-col items-center justify-center lg:hidden"
            >
              <Image
                src={content.flower.src}
                alt={content.flower.alt}
                width={30}
                height={30}
                className="rotating my-5"
              />
              {splitLetter.map((letter: string, index: number) => (
                <span key={index} className="tw-section-heading-split">
                  {letter}
                </span>
              ))}
              <Image
                src={content.flower.src}
                alt={content.flower.alt}
                width={30}
                height={30}
                className="rotating my-5"
              />
            </div>
          </div>
        </div>
        <div className="w-[85%] h-auto lg:w-[60%] pt-10 pb-20">
          {reviews.length ? (
            <div className="flex h-auto w-full flex-col items-center justify-center gap-4 lg:gap-7">
              {reviews.map((review: IReview, index: number) => (
                <div
                  key={review.id}
                  data-scroll
                  data-scroll-speed="1"
                  className="h-auto min-h-0 w-[90%] max-w-[450px]"
                >
                  <CardReview review={review} variantIndex={index} />
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full h-screen flex flex-col">
              {Array.from({ length: 5 }).map((_, index: number) => (
                <span key={index} className="reviews-loader"></span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
