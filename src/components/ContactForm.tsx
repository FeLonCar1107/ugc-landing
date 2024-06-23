import UserSvg from "@/components/svg/form/UserSvg";
import MailSvg from "@/components/svg/form/MailSvg";
import SubjectSvg from "@/components/svg/form/SubjectSvg";
import MessageSvg from "@/components/svg/form/MessageSvg";
import { IContactFormProps } from "@/types/contact-form";

const SVGIcons: { [key: string]: JSX.Element } = {
  user: <UserSvg />,
  mail: <MailSvg />,
  subject: <SubjectSvg />,
  message: <MessageSvg />,
};

export default function ContactForm(props: IContactFormProps) {
  const { fields, button } = props;
  return (
    <form onSubmit={() => {}} className="w-full h-auto flex flex-col gap-2">
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
              id={`input-${field.id}`}
              className={`block w-full ps-6 text-jazzberry-jam-100 ${
                field.type === "textarea" ? "h-20" : "h-10"
              }`}
              placeholder={`${field.placeholder}*`}
            />
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
