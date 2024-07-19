import { IContactFormProps } from "./contact-form";

export interface IContactProps {
  title: string[];
  content: {
    image: {
      src: string;
      alt: string;
    };
    details: {
      id: number;
      title: string;
      items: {
        id: number;
        type: string;
        title?: string;
        value: string;
      }[];
    }[];
    form: IContactFormProps;
  };
}
