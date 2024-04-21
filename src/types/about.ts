export interface AboutProps {
  data: {
    title: string;
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
