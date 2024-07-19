import { useState } from "react";
import { IVideo } from "@/types/video";
import { useVideoCarousel } from "@/hooks/useVideoCarousel";
import LeftArrowIcon from "@/components/svg/LeftArrow";
import RightArrowIcon from "@/components/svg/RightArrow";

export default function VideosCarousel({ data }: { data: IVideo[] }) {
  useVideoCarousel();
  const [showInfo, setShowInfo] = useState<number | null>(null);

  const handleMouseEnter = (
    event: React.MouseEvent<HTMLVideoElement, MouseEvent>,
    index: number,
  ) => {
    setShowInfo(index);
    const videoElement = event.currentTarget;
    videoElement.play();
  };

  const handleMouseLeave = (index: number) => {
    setShowInfo(null);
    const videoElement = document.getElementById(
      `video-${index}`,
    ) as HTMLVideoElement;
    if (videoElement) {
      videoElement.pause();
    }
  };

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
              <video
                id={`video-${index}`}
                src={video.src}
                loop
                playsInline
                onMouseEnter={(event) => handleMouseEnter(event, index)}
                onMouseLeave={() => handleMouseLeave(index)}
              />
              <div className="w-full min-h-[70px] text-jazzberry-jam-950 relative">
                {showInfo === index && (
                  <div className="fade-in-top w-full h-full text-center flex flex-col items-center justify-center">
                    <h3 className="font-bold text-sm md:text-base">
                      {video.title}
                    </h3>
                    <p className="text-xs md:text-sm">{video.description}</p>
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
