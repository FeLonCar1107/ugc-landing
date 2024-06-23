export interface IContactFormProps {
  title: string;
  fields: {
    id: number;
    icon: string;
    type: string;
    value: string;
    label: string;
    placeholder: string;
    required: boolean;
    pattern: string;
  }[];
  button: {
    title: string;
  };
}
