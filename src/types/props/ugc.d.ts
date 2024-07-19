export interface IUserCreatorContentProps {
  title: string;
  content: {
    cards: {
      id: string;
      title: string;
      description: string;
      image: {
        src: string;
        alt: string;
      };
    }[];
  };
}
