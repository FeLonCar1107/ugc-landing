export interface IAboutProps {
  data: {
    title: string;
    subtitle: string;
    content: {
      languages: string[];
      hello: string;
      image: {
        src: string;
        alt: string;
      };
      description: string;
    };
  };
}
