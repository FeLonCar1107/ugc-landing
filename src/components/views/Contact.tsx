import Image from "next/image";
import ArrowContact from "@/components/svg/ArrowContact";
import DividerBottom from "@/components/svg/DividerBottom";
import DividerTop from "@/components/svg/DividerTop";
import ContactForm from "@/components/ContactForm";
import { IContactProps } from "@/types/contact";

type ActionFunction = (value: string) => void;

export default function Contact(props: IContactProps) {
  const { title, content } = props.data;

  const ACTIONS: { [key: string]: ActionFunction } = {
    email: (value: string) => (window.location.href = `mailto:${value}`),
    location: (value: string) =>
      window.open(`https://www.google.com/maps/search/?api=1&query=${value}`),
    social: (value: string) => window.open(value),
    style: (value: string) => console.log(value),
  };

  return (
    <section
      id="contact"
      data-scroll-section
      className="bg-jazzberry-jam-700 w-screen min-h-screen h-auto flex items-center justify-center lg:py-10"
    >
      <DividerBottom />
      <DividerTop />
      <div className="w-[68%] max-w-[1300px] h-[65%] flex flex-col md:flex-row gap-7 pt-[130px] md:pt-3">
        <div className="w-full md:w-[50%] h-auto md:h-full flex flex-col items-start justify-start text-jazzberry-jam-50">
          <div className="w-full h-full flex flex-col items-start justify-start">
            <div className="w-full flex gap-3 items-center justify-start">
              <div className="w-[70px] h-[70px] lg:w-[100px] lg:h-[100px] rounded-full relative shadow-md">
                <Image
                  src={content.image.src}
                  alt={content.image.alt}
                  fill
                  sizes="100vw"
                  className="rounded-full"
                />
              </div>
              <p className="text-[8vw] md:text-[3vw] 2xl:md:text-[2vw]">
                {title[0]}
              </p>
            </div>
            <p className="text-[8vw] md:text-[3vw] 2xl:md:text-[2vw]">
              {title[1]}
            </p>
          </div>
          <div className="hidden md:flex w-full flex-col gap-3 items-start justify-start">
            <div className="min-w-[40px] min-h-[40px] w-[2vw] h-[2vw] my-7">
              <ArrowContact color="#fde6f3" />
            </div>
            {content.details.map((detail) => (
              <div key={detail.id}>
                <p className="text-base text-jazzberry-jam-400">
                  {detail.title}
                </p>
                <div className="text-base text-jazzberry-jam-100 flex flex-col">
                  {detail.items.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => ACTIONS[item.type](item.value)}
                      className="text-base text-jazzberry-jam-100 flex flex-col"
                    >
                      <p className="h-7 cursor-pointer hover:border-b-2 border-jazzberry-jam-100">
                        {item.title ?? item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full md:w-[50%] h-auto md:h-full flex flex-col items-center justify-center pb-14 md:pb-0">
          <ContactForm
            title={content.form.title}
            fields={content.form.fields}
            button={content.form.button}
          />
        </div>
      </div>
    </section>
  );
}
