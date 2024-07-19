import { IFieldForm } from "@/types/field-form";

export interface IContactFormProps {
  title: string;
  fields: IFieldForm[];
  button: {
    title: string;
  };
}
