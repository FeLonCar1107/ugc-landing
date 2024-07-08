export interface IHomeProps {
  data: {
    title: string;
    content: {
      name: string;
      fullName: string;
      shortDescription: string;
      skills: string[];
      image: string;
      flower: string;
    };
  };
}
