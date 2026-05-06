export interface IAboutProps {
  title: string;
  subtitle: string;
  content: {
    hello: string;
    image: {
      src: string;
      alt: string;
    };
    description: {
      paragraph1: string;
      paragraph2: string;
      paragraph3: string;
      paragraph4: string;
    };
    birth: {
      name: string;
      lastName: string;
      prefix: string;
      day: number;
      month: string;
      year: number;
    };
  };
}
