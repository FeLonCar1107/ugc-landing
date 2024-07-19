import VideosCarousel from "@/components/VideosCarousel";
import { IVideosProps } from "@/types/props/videos";

export default function Videos(props: IVideosProps) {
  const { splitTitle, content } = props;
  return (
    <section
      data-scroll-section
      id="videos"
      className="bg-transparent w-screen min-h-screen h-auto flex flex-col items-center justify-center"
    >
      <div className="w-[73%] h-auto max-w-[1350px]">
        <div className="bg-jazzberry-jam-200 w-full h-[35vw] max-h-[250px] text-[25px] md:text-[40px] xl:text-[50px] text-white text-center flex flex-col space-y-[-10px] md:space-y-0 md:flex-row md:justify-center md:gap-3 uppercase pt-[5vw] 2xl:pt-[1.5vw] shadow-sm">
          <h2>
            <strong>{splitTitle[0]}</strong>
          </h2>
          <h2>{splitTitle[1]}</h2>
        </div>
        <div className="w-full h-auto lg:h-auto mt-[-10vw] sm:mt-[-15vw]  lg:mt-[-5vw]">
          <VideosCarousel data={content.videos} />
        </div>
      </div>
    </section>
  );
}
