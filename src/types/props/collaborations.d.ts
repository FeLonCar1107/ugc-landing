import { IBrand } from "@/types/brand";

export interface ICollaborationsProps {
  title: string;
  splitTitle: string[];
  content: {
    brands: IBrand[];
    butterfly: {
      gold: string;
      rose: string;
      alt: string;
    };
  };
}
