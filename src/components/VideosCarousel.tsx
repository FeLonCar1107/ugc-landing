"use client";
import Image from "next/image";
import { IVideo } from "@/types/videos";
import LeftArrowIcon from "@/components/svg/LeftArrow";
import RightArrowIcon from "@/components/svg/RightArrow";
import { useVideoCarousel } from "@/hooks/useVideoCarousel";

export default function VideosCarousel({ data }: { data: IVideo[] }) {
  useVideoCarousel();

  return (
    <div className="w-full h-full flex items-center justify-between">
      <div className="videos-wrapper">
        <div id="left-video-arrow" className="video-arrow">
          <LeftArrowIcon color="#000000" />
        </div>
        <div className="videos-carousel">
          {data.concat(data).map((video: IVideo, index: number) => (
            <div key={`${video.id}-${index}`} className="video">
              <Image
                src={video.src}
                alt={video.title}
                fill
                quality={100}
                className="video-image"
              />
            </div>
          ))}
        </div>
        <div id="right-video-arrow" className="video-arrow">
          <RightArrowIcon color="#000000" />
        </div>
      </div>
    </div>
  );
}
