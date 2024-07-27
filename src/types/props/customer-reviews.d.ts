import IReview from "@/types/review";

export interface ICustomerReviewsProps {
  title: string;
  splitTitle: string[];
  splitLetter: string[];
  content: {
    image: {
      src: string;
      alt: string;
    };
    flower: {
      src: string;
      alt: string;
    };
  };
}
