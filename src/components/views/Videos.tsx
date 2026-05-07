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
      className="bg-transparent flex h-auto min-h-screen w-screen flex-col items-center justify-center tw-section-y"
    >
      <div className="section-shell h-auto">
        <div className="tw-band-soft flex h-[35vw] max-h-[250px] w-full flex-col space-y-[-10px] overflow-hidden pt-[5vw] text-center md:flex-row md:justify-center md:gap-3 md:space-y-0 2xl:pt-[1.5vw]">
          <h2 className="tw-section-heading font-bold tw-text-heading">
            {splitTitle[0]}
          </h2>
          <h2 className="tw-section-heading font-normal tw-text-heading">
            {splitTitle[1]}
          </h2>
        </div>
        <div className="w-full h-auto lg:h-auto mt-[-10vw] sm:mt-[-15vw] lg:mt-[-5vw] flex items-center justify-between">
          <div className="videos-wrapper">
            <div id="left-video-arrow" className="video-arrow">
              <LeftArrowIcon color="#9c114b" />
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
                  <div className="relative min-h-[70px] w-full text-jazzberry-jam-950">
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
              <RightArrowIcon color="#9c114b" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
