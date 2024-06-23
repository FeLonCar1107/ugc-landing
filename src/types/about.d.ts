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
      description: {
        paragraph1: string;
        paragraph2: string;
        paragraph3: string;
      };
      birth: {
        name: string;
        lastName: string;
        prefix: string;
        day: number;
        month: string;
        year: number;
      };
      button: {
        title: string;
        url: string;
      };
    };
  };
}
