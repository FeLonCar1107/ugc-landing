import Notify from "@/enums/notify.enum";
import UserSvg from "@/components/svg/form/UserSvg";
import MailSvg from "@/components/svg/form/MailSvg";
import LoaderEmail from "@/components/buttons/LoaderEmail";
import SubjectSvg from "@/components/svg/form/SubjectSvg";
import MessageSvg from "@/components/svg/form/MessageSvg";
import notify from "@/services/notify.service";
import apiService from "@/services/api.service";
import { IFieldForm } from "@/types/field-form";
import { IContactFormProps } from "@/types/props/contact-form";
import { useState } from "react";

const SVGIcons: { [key: string]: JSX.Element } = {
  user: <UserSvg />,
  mail: <MailSvg />,
  subject: <SubjectSvg />,
  message: <MessageSvg />,
};

export default function ContactForm(props: IContactFormProps) {
  const { fields, button } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useState<{ [key: string]: string }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = event.target;
    setForm({
      ...form,
      [id]: value,
    });

    const field = fields.find((f) => `input-${f.value}` === id);
    if (field) {
      const errorMessage = validateField(value, field);
      setErrors({
        ...errors,
        [id]: errorMessage,
      });
    }
  };

  const validateField = (value: string, field: IFieldForm): string => {
    if (field.required && !value) return "Este campo es obligatorio.";
    if (field.pattern && !new RegExp(field.pattern).test(value)) {
      return "El valor ingresado no es válido.";
    }
    return "";
  };

  const sendMail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    let formIsValid = true;
    let newErrors: { [key: string]: string } = {};

    try {
      fields.forEach((field) => {
        const value = form[`input-${field.value}`];
        const errorMessage = validateField(value, field);
        if (errorMessage) {
          formIsValid = false;
        }
        newErrors[`input-${field.value}`] = errorMessage;
      });

      if (!formIsValid) {
        setErrors(newErrors);
        return;
      }

      const payload = {
        name: form["input-name"],
        email: form["input-email"],
        subject: form["input-subject"],
        message: form["input-message"],
      };

      const data = await apiService.POST("send-email", payload);
      if (data) notify("Se envió el mensaje correctamente", Notify.SUCCESS);
    } catch (error) {
      notify("No se pudo enviar el mensaje", Notify.ERROR);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={sendMail} className="w-full h-auto flex flex-col gap-2">
      {fields.map((field, index: number) => (
        <div
          key={field.id}
          className={`border-t-[1px] border-jazzberry-jam-600 py-[3vw] md:py-[0.7vw] ${
            fields.length - 1 === index ? "border-b-[1px]" : ""
          }`}
        >
          <div className="flex justify-start items-center gap-2">
            <div className="flex items-center pointer-events-none">
              {SVGIcons[field.icon]}
            </div>
            <label
              htmlFor={`input-${field.id}`}
              className="block text-base font-medium text-jazzberry-jam-100 pt-[2px]"
            >
              {field.label}
            </label>
          </div>
          <div className="relative">
            <input
              type={field.type}
              id={`input-${field.value}`}
              onChange={handleInputChange}
              required={field.required}
              placeholder={`${field.placeholder}${field.required ? "*" : ""}`}
              className={`block w-full ps-6 text-jazzberry-jam-100 ${
                field.type === "textarea" ? "h-20" : "h-10"
              }`}
            />
            {errors[`input-${field.value}`] && (
              <span className="text-red-900 ps-6 text-[12px]">
                {errors[`input-${field.value}`]}
              </span>
            )}
          </div>
        </div>
      ))}
      <div className="w-full h-auto flex items-center justify-end py-1">
        <button
          type="submit"
          className="bg-jazzberry-jam-900 text-white text-sm font-medium w-full h-20 mt-3 md:mt-0 md:w-40 md:h-40 rounded-md md:rounded-full flex items-center justify-center transition-all duration-300 ease-in-out slide"
        >
          {loading ? <LoaderEmail /> : button.title}
        </button>
      </div>
    </form>
  );
}
