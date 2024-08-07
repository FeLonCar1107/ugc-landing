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
      className="w-screen flex items-center justify-center relative"
    >
      <div id="customers" className="w-[80%] max-w-[1200px] h-auto flex gap-10">
        <div
          data-scroll
          data-scroll-sticky
          data-scroll-speed="1.2"
          data-scroll-target="#customers"
          className="w-[15%] lg:w-[40%] h-screen flex flex-col items-center justify-center"
        >
          <div className="hidden lg:flex w-full lg:h-[25%] items-center justify-between">
            <Image
              src={content.flower.src}
              alt={content.flower.alt}
              width={30}
              height={30}
              className="rotating"
            />
            <div className="flex flex-col items-center justify-center -space-y-4">
              {splitTitle.map((title: string, index: number) => (
                <h2
                  key={index}
                  className={`text-jazzberry-jam-500 text-[25px] md:text-[40px] xl:text-[45px] uppercase ${
                    index ? "font-bold" : "opacity-100"
                  }`}
                >
                  {title}
                </h2>
              ))}
            </div>
            <Image
              src={content.flower.src}
              alt={content.flower.alt}
              width={30}
              height={30}
              className="rotating"
            />
          </div>
          <div
            id="split-letter"
            className="flex lg:hidden w-full h-full lg:h-[75%] flex-col items-center justify-center"
          >
            <Image
              src={content.flower.src}
              alt={content.flower.alt}
              width={30}
              height={30}
              className="rotating my-5"
            />
            {splitLetter.map((letter: string, index: number) => (
              <h2
                key={index}
                className={`text-jazzberry-jam-500 text-[35px] uppercase font-bold`}
              >
                {letter}
              </h2>
            ))}
            <Image
              src={content.flower.src}
              alt={content.flower.alt}
              width={30}
              height={30}
              className="rotating my-5"
            />
          </div>
          <div className="hidden lg:flex w-full h-[80%] items-center justify-center">
            <Image
              src={content.image.src}
              alt={content.image.alt}
              width={255}
              height={400}
              priority
              className="show-image grayscale"
              style={{ width: "auto", height: "auto" }}
            />
          </div>
        </div>
        <div className="w-[85%] h-auto lg:w-[60%] pt-10 pb-20">
          {reviews.length ? (
            <div className="w-full h-auto flex flex-col items-center justify-center gap-2 lg:gap-8">
              {reviews.map((review: IReview, index: number) => (
                <div
                  key={review.id}
                  data-scroll
                  data-scroll-speed="1"
                  className="w-[90%] max-w-[450px] h-[150px] lg:h-[130px]"
                >
                  <CardReview review={review} index={index} />
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
