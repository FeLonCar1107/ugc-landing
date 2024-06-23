interface IBrand {
  id: number;
  alt: string;
  logo: string;
}

export interface ICollaborationsProps {
  data: {
    title: string;
    splitTitle: string[];
    content: {
      brands: IBrand[];
    };
  };
}
