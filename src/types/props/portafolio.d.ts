import { IPicture } from "@/types/picture";

export interface IPortafolioProps {
  title: string;
  splitTitle: string[];
  content: {
    pictures: IPicture[];
  };
}
