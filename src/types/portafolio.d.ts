interface IPicture {
  id: number;
  src: string;
  alt: string;
}

export interface IPortafolioProps {
  data: {
    title: string;
    splitTitle: string[];
    content: {
      pictures: IPicture[];
    };
  };
}
