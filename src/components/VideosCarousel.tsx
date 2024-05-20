"use client";
import { IVideo } from "@/types/videos";
import LeftArrowIcon from "@/components/svg/LeftArrow";
import RightArrowIcon from "@/components/svg/RightArrow";

export default function VideosCarousel({ data }: { data: IVideo[] }) {
  return (
    <div className="w-full h-full relative">
      <div className="video-wrapper">
        <ul className="video-carousel">
          {data.map((video) => (
            <li key={video.id} className="video-card">
              <div className="video bg-xLaughyTaffy"></div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const LeftArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="w-[3vw] h-[3vw] absolute top-1/2 transform -translate-y-1/2 left-0 z-40"
    >
      <LeftArrowIcon />
    </div>
  );
};

const RightArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="w-[3vw] h-[3vw] absolute top-1/2 transform -translate-y-1/2 right-0 z-50"
    >
      <RightArrowIcon />
    </div>
  );
};
