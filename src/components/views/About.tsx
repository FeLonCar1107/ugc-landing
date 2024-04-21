import { AboutProps } from "@/types/about";
export default function About(props: AboutProps) {
  const { title, content } = props.data;
  return (
    <section
      id="about"
      className="bg-white w-screen h-screen flex px-micro sm:px-small md:px-medium lg:px-large xl:px-xLarge"
    >
      <div className="w-full md:w-[60%] flex flex-col items-center">
        <h2 className="text-white">{title}</h2>
        <div className="w-full h-auto">
          <p className="text-white">{content.description}</p>
        </div>
      </div>
      <div className="w-full md:w-[40%]"></div>
    </section>
  );
}
