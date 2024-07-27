export interface IReview {
  id: number;
  fullName: string;
  role: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
}
