import UserSvg from "@/components/svg/form/UserSvg";
import MailSvg from "@/components/svg/form/MailSvg";
import SubjectSvg from "@/components/svg/form/SubjectSvg";
import MessageSvg from "@/components/svg/form/MessageSvg";
import { IContactFormProps } from "@/types/contact-form";
import { useState } from "react";

const SVGIcons: { [key: string]: JSX.Element } = {
  user: <UserSvg />,
  mail: <MailSvg />,
  subject: <SubjectSvg />,
  message: <MessageSvg />,
};

export default function ContactForm(props: IContactFormProps) {
  const { fields, button } = props;
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

  const validateField = (value: string, field: any): string => {
    if (field.required && !value) return "Este campo es obligatorio.";
    if (field.pattern && !new RegExp(field.pattern).test(value)) {
      return "El valor ingresado no es válido.";
    }
    return "";
  };

  const sendMail = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let formIsValid = true;
    let newErrors: { [key: string]: string } = {};
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

    fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form["input-name"],
        email: form["input-email"],
        subject: form["input-subject"],
        message: form["input-message"],
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
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
      <button
        type="submit"
        className="bg-jazzberry-jam-900 text-white text-base font-medium rounded-md w-full h-12 mt-4"
      >
        {button.title}
      </button>
    </form>
  );
}
