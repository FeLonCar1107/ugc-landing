export interface HomeProps {
  data: {
    title: string;
    content: {
      name: string;
      fullName: string;
      shortDescription: string;
      skills: string[];
    };
  };
}
