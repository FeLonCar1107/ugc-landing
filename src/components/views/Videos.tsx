import Image from "next/image";
import VideosCarousel from "@/components/VideosCarousel";
import { IVideo } from "@/types/videos";
export default function Videos() {
  const videos: IVideo[] = [
    {
      id: 1,
      title: "Video 1",
      src: "https://source.unsplash.com/random/200x370?sig=1",
    },
    {
      id: 2,
      title: "Video 2",
      src: "https://source.unsplash.com/random/200x370?sig=2",
    },
    {
      id: 3,
      title: "Video 3",
      src: "https://source.unsplash.com/random/200x370?sig=3",
    },
    {
      id: 4,
      title: "Video 4",
      src: "https://source.unsplash.com/random/200x370?sig=4",
    },
    {
      id: 5,
      title: "Video 5",
      src: "https://source.unsplash.com/random/200x370?sig=5",
    },
    {
      id: 6,
      title: "Video 6",
      src: "https://source.unsplash.com/random/200x370?sig=6",
    },
    {
      id: 7,
      title: "Video 7",
      src: "https://source.unsplash.com/random/200x370?sig=7",
    },
    {
      id: 8,
      title: "Video 8",
      src: "https://source.unsplash.com/random/200x370?sig=8",
    },
    {
      id: 9,
      title: "Video 9",
      src: "https://source.unsplash.com/random/200x370?sig=9",
    },
    {
      id: 10,
      title: "Video 10",
      src: "https://source.unsplash.com/random/200x370?sig=10",
    },
    {
      id: 11,
      title: "Video 11",
      src: "https://source.unsplash.com/random/200x370?sig=11",
    },
    {
      id: 12,
      title: "Video 12",
      src: "https://source.unsplash.com/random/200x370?sig=12",
    },
    {
      id: 13,
      title: "Video 13",
      src: "https://source.unsplash.com/random/200x370?sig=13",
    },
    {
      id: 14,
      title: "Video 14",
      src: "https://source.unsplash.com/random/200x370?sig=14",
    },
    {
      id: 15,
      title: "Video 15",
      src: "https://source.unsplash.com/random/200x370?sig=15",
    },
    {
      id: 16,
      title: "Video 16",
      src: "https://source.unsplash.com/random/200x370?sig=16",
    },
    {
      id: 17,
      title: "Video 17",
      src: "https://source.unsplash.com/random/200x370?sig=17",
    },
    {
      id: 18,
      title: "Video 18",
      src: "https://source.unsplash.com/random/200x370?sig=18",
    },
    {
      id: 19,
      title: "Video 19",
      src: "https://source.unsplash.com/random/200x370?sig=19",
    },
    {
      id: 20,
      title: "Video 20",
      src: "https://source.unsplash.com/random/200x370?sig=20",
    },
  ];

  const imageUrl = "/images/hero.jpg";

  return (
    <section id="videos" className="bg-white w-screen h-screen relative">
      <div className="bg-xChartTruth w-full h-[40%] relative">
        {/* <Image
          src={imageUrl}
          alt="random-image"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          quality={100}
          className="filter grayscale"
        ></Image> */}
      </div>
      <div className="w-full h-[60%]">
        <div className="bg-gray-100 w-[80%] h-[70%] max-w-[1200px] absolute bottom-[10%] left-1/2 transform -translate-x-1/2">
          <div className="w-full h-full relative">
            <div className="bg-xBlack absolute top-0 w-full h-[45%] text-[60px] text-white text-center flex justify-center gap-3 pt-[2%]">
              <h2>
                <strong>ÚLTIMOS</strong>
              </h2>
              <h2>VIDEOS</h2>
            </div>
            <div className="w-full h-[65%] absolute bottom-20">
              <VideosCarousel data={videos} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
