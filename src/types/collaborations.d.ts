import { IBrand } from "./brand";

export interface ICollaborationsProps {
  data: {
    title: string;
    splitTitle: string[];
    content: {
      brands: IBrand[];
    };
  };
}
