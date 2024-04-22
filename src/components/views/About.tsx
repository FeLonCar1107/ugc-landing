import { IAboutProps } from "@/types/about";
export default function About(props: IAboutProps) {
  const { title, subtitle, content } = props.data;
  return (
    <section
      id="about"
      className="bg-white w-screen h-screen flex items-center justify-center"
    >
      <div className="w-[85%] h-full flex items-center justify-center">
        <div className="w-[50%] h-full py-14 px-micro sm:px-small md:px-medium lg:px-large xl:px-xLarge">
          <div className="w-full h-auto flex flex-col space-y-[-30px]">
            <p className="font-bold text-[60px]">{title.toUpperCase()}</p>
            <p className="text-[60px]">{subtitle.toUpperCase()}</p>
          </div>
          <p className="text-sm">{content.description}</p>
        </div>
        <div className="w-[50%] h-full bg-xBlack"></div>
      </div>
    </section>
  );
}
