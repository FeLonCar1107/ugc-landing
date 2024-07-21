import { IPicture } from "@/types/picture";

export interface IPortfolioProps {
  title: string;
  splitTitle: string[];
  content: {
    pictures: IPicture[];
  };
}
