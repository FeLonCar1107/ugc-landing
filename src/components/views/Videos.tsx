import { useState } from "react";
import { IVideo } from "@/types/video";
import { IVideosProps } from "@/types/props/videos";
import { useVideoCarousel } from "@/hooks/useVideoCarousel";
import LeftArrowIcon from "@/components/svg/LeftArrow";
import RightArrowIcon from "@/components/svg/RightArrow";

export default function Videos(props: IVideosProps) {
  useVideoCarousel();
  const { splitTitle, content } = props;
  const [showInfo, setShowInfo] = useState<number | null>(null);

  return (
    <section
      data-scroll-section
      id="videos"
      className="bg-transparent w-screen min-h-screen h-auto flex flex-col items-center justify-center py-14"
    >
      <div className="w-[73%] h-auto max-w-[1350px]">
        <div className="bg-jazzberry-jam-200 w-full h-[35vw] max-h-[250px] text-[25px] md:text-[40px] xl:text-[50px] text-white text-center flex flex-col space-y-[-10px] md:space-y-0 md:flex-row md:justify-center md:gap-3 uppercase pt-[5vw] 2xl:pt-[1.5vw] shadow-sm">
          <h2>
            <strong>{splitTitle[0]}</strong>
          </h2>
          <h2>{splitTitle[1]}</h2>
        </div>
        <div className="w-full h-auto lg:h-auto mt-[-10vw] sm:mt-[-15vw] lg:mt-[-5vw] flex items-center justify-between">
          <div className="videos-wrapper">
            <div id="left-video-arrow" className="video-arrow">
              <LeftArrowIcon color="#871444" />
            </div>
            <div className="videos-carousel">
              {content.videos.map((video: IVideo, index: number) => (
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
                    controls
                    controlsList="nodownload,nofullscreen"
                    poster={video.preview}
                  />
                  <div className="w-full min-h-[70px] text-jazzberry-jam-950 relative">
                    {showInfo === index && (
                      <div className="fade-in-top w-full h-full text-center flex flex-col items-center justify-center">
                        <h3 className="font-bold text-sm md:text-base">
                          {video.title}
                        </h3>
                        <p className="text-xs md:text-sm">
                          {video.description}
                        </p>
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
      </div>
    </section>
  );
}
