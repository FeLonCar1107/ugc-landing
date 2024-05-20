import Image from "next/image";
import VideosCarousel from "@/components/VideosCarousel";
import { IVideo } from "@/types/videos";
export default function Videos() {
  const videos: IVideo[] = [
    {
      id: 1,
      title: "Video 1",
      src: "https://www.youtube.com/embed/1",
    },
    {
      id: 2,
      title: "Video 2",
      src: "https://www.youtube.com/embed/2",
    },
    {
      id: 3,
      title: "Video 3",
      src: "https://www.youtube.com/embed/3",
    },
    {
      id: 4,
      title: "Video 4",
      src: "https://www.youtube.com/embed/4",
    },
    {
      id: 5,
      title: "Video 5",
      src: "https://www.youtube.com/embed/5",
    },
    {
      id: 6,
      title: "Video 6",
      src: "https://www.youtube.com/embed/6",
    },
    {
      id: 7,
      title: "Video 7",
      src: "https://www.youtube.com/embed/7",
    },
    {
      id: 8,
      title: "Video 8",
      src: "https://www.youtube.com/embed/8",
    },
    {
      id: 9,
      title: "Video 9",
      src: "https://www.youtube.com/embed/9",
    },
    {
      id: 10,
      title: "Video 10",
      src: "https://www.youtube.com/embed/10",
    },
    {
      id: 11,
      title: "Video 11",
      src: "https://www.youtube.com/embed/11",
    },
    {
      id: 12,
      title: "Video 12",
      src: "https://www.youtube.com/embed/12",
    },
    {
      id: 13,
      title: "Video 13",
      src: "https://www.youtube.com/embed/13",
    },
    {
      id: 14,
      title: "Video 14",
      src: "https://www.youtube.com/embed/14",
    },
    {
      id: 15,
      title: "Video 15",
      src: "https://www.youtube.com/embed/15",
    },
    {
      id: 16,
      title: "Video 16",
      src: "https://www.youtube.com/embed/16",
    },
    {
      id: 17,
      title: "Video 17",
      src: "https://www.youtube.com/embed/17",
    },
    {
      id: 18,
      title: "Video 18",
      src: "https://www.youtube.com/embed/18",
    },
    {
      id: 19,
      title: "Video 19",
      src: "https://www.youtube.com/embed/19",
    },
    {
      id: 20,
      title: "Video 20",
      src: "https://www.youtube.com/embed/20",
    },
  ];

  const imageUrl = "/images/hero.jpg";

  return (
    <section id="videos" className="bg-white w-screen h-screen relative">
      <div className="bg-xChartTruth w-full h-[40%] relative">
        <Image
          src={imageUrl}
          alt="random-image"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          quality={100}
          className="filter grayscale"
        ></Image>
      </div>
      <div className="bg-gray-100 w-full h-[60%]">
        <div className="w-[80%] h-[70%] max-w-[1200px] absolute bottom-[10%] left-1/2 transform -translate-x-1/2">
          <div className="w-full h-full relative">
            <div className="bg-xBlack absolute top-0 w-full h-[50%] text-[60px] text-white text-center flex justify-center gap-3 pt-[2%]">
              <h2>
                <strong>ÚLTIMOS</strong>
              </h2>
              <h2>VIDEOS</h2>
            </div>
            <div className="w-full h-[65%] absolute bottom-0">
              <VideosCarousel data={videos} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
