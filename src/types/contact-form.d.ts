export interface IContactFormProps {
  title: string;
  fields: {
    id: number;
    icon: string;
    type: string;
    label: string;
    placeholder: string;
    required: boolean;
  }[];
  button: {
    title: string;
  };
}
