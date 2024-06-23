import Image from "next/image";
import { IVideo } from "@/types/videos";
import LeftArrowIcon from "@/components/svg/LeftArrow";
import RightArrowIcon from "@/components/svg/RightArrow";
import { useVideoCarousel } from "@/hooks/useVideoCarousel";
import { useState } from "react";

export default function VideosCarousel({ data }: { data: IVideo[] }) {
  useVideoCarousel();
  const [showInfo, setShowInfo] = useState<number | null>(null);

  return (
    <div className="w-full h-full flex items-center justify-between">
      <div className="videos-wrapper">
        <div id="left-video-arrow" className="video-arrow">
          <LeftArrowIcon color="#871444" />
        </div>
        <div className="videos-carousel">
          {data.concat(data).map((video: IVideo, index: number) => (
            <div
              onMouseEnter={() => setShowInfo(index)}
              onMouseLeave={() => setShowInfo(null)}
              key={`${video.id}-${index}`}
              className="video"
            >
              <div className="relative w-full h-[80%]">
                <Image
                  src={video.src}
                  alt={video.title}
                  fill
                  sizes="100vw"
                  quality={100}
                  className="video-image"
                />
              </div>
              <div className="w-full h-[20%] text-jazzberry-jam-950 relative">
                {showInfo === index && (
                  <div className="fade-in-top w-full h-full text-center p-2">
                    <h3 className="font-bold text-base">{video.title}</h3>
                    <p className="text-sm">{video.description}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div id="right-video-arrow" className="video-arrow">
          <RightArrowIcon color="#871444" />
        </div>
      </div>
    </div>
  );
}
