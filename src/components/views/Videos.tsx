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
      <div className="section-shell h-auto">
        <div className="flex h-[35vw] max-h-[250px] w-full flex-col space-y-[-10px] bg-jazzberry-jam-200 pt-[5vw] text-center text-white shadow-sm md:flex-row md:justify-center md:gap-3 md:space-y-0 2xl:pt-[1.5vw]">
          <h2 className="tw-section-heading font-bold">
            {splitTitle[0]}
          </h2>
          <h2 className="tw-section-heading font-normal">{splitTitle[1]}</h2>
        </div>
        <div className="w-full h-auto lg:h-auto mt-[-10vw] sm:mt-[-15vw] lg:mt-[-5vw] flex items-center justify-between">
          <div className="videos-wrapper">
            <div id="left-video-arrow" className="video-arrow">
              <LeftArrowIcon color="#871444" />
            </div>
            <div className="videos-carousel">
              {content.videos.map((video: IVideo, index: number) => (
                <div
                  key={video.id}
                  className="video"
                  onMouseEnter={() => setShowInfo(index)}
                  onMouseLeave={() => setShowInfo(null)}
                >
                  <video
                    loop
                    playsInline
                    controls
                    controlsList="nodownload nofullscreen"
                    src={video.src}
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
