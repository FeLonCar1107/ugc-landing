import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import apiService from "@/services/api.service";
import MediaTypes from "@/enums/media-types.enum";
import ReelIcon from "@/components/svg/instagram/ReelIcon";
import CarouselIcon from "@/components/svg/instagram/CarouselIcon";
import InstaModal from "@/components/Insta/InstaModal";
import { IActionButton } from "@/types/props/insta-feed";
import { IInstaFeedProps } from "@/types/props/insta-feed";
import { IInstagramUserResponse } from "@/types/responses/instagram-user";
import { IInstagramMediaResponse } from "@/types/responses/instagram-media";
import { LocomotiveScrollContext } from "@/hooks/useLocomotiveScroll";

const LIMIT = 12;

export default function InstaFeed(props: IInstaFeedProps) {
  const [user, setUser] = useState<IInstagramUserResponse | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [visibleRows, setVisibleRows] = useState<number>(1);
  const [currentPostIndex, setCurrentPostIndex] = useState<number>(0);
  const [mediaLoadingStates, setMediaLoadingStates] = useState<boolean[]>([]);
  const [content, setContent] = useState<IInstagramMediaResponse[]>([]);
  const locomotiveScroll = useContext(LocomotiveScrollContext);
  const [currentButton, setCurrentButton] = useState<IActionButton>(
    props.buttons.loadMore,
  );

  const itemsPerRow = isMobile ? 2 : 3;
  useEffect(() => {
    fetchData();
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (locomotiveScroll) locomotiveScroll.update();
  }, [visibleRows, locomotiveScroll]);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  const fetchData = async () => {
    try {
      setUser(await apiService.GET("user"));
      setMediaLoadingStates(new Array(LIMIT).fill(true));
      setContent(await apiService.POST("content-media", { limit: LIMIT }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoadMore = () => {
    setVisibleRows((prev) => prev + 1);
    if (visibleRows + 1 === Math.ceil(content?.length / itemsPerRow)) {
      setCurrentButton(props.buttons.follow);
    }
  };

  const openModal = (index: number) => {
    setCurrentPostIndex(index);
    setIsModalOpen(true);
  };

  const handleMediaLoad = (index: number) => {
    setMediaLoadingStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = false;
      return newStates;
    });
  };

  return (
    <section
      id="insta-feed"
      data-scroll-section
      className="flex h-auto min-h-screen w-screen flex-col items-center justify-center gap-5 bg-transparent tw-section-y lg:gap-6"
    >
      <div className="section-shell flex flex-col items-center justify-center gap-5 lg:gap-6">
        <div className="flex w-full flex-col items-center justify-center md:flex-row md:gap-3">
          <h2 className="tw-section-heading tw-text-heading tw-soft-interactive font-bold">
            <a
              target="_blank"
              className="animate-underline"
              href={props.buttons.follow.url}
            >
              @{user?.username}
            </a>
          </h2>
          <h2 className="tw-section-heading tw-text-heading font-normal">
            {props.subtitle}
          </h2>
        </div>
        <div className="w-full flex flex-wrap gap-1 justify-center items-center">
          {content.length ? (
            content
              .slice(0, visibleRows * itemsPerRow)
              .map((post: IInstagramMediaResponse, index: number) => (
                <div
                  key={post.id}
                  className="relative group w-[calc(50%-0.25rem)] md:w-[calc(33.333%-0.25rem)] h-0 pb-[50%] md:pb-[33.333%] overflow-hidden flex items-center justify-center cursor-pointer"
                  onClick={() => openModal(index)}
                >
                  <Image
                    src={post.type === MediaTypes.VIDEO ? post.preview : post.url}
                    alt={post.caption}
                    fill
                    className={`absolute top-0 left-0 w-full h-full object-cover transition-all duration-500 ${
                      mediaLoadingStates[index] ? "opacity-0" : "opacity-100"
                    }`}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    unoptimized={true}
                    onLoad={() => handleMediaLoad(index)}
                  />
                  {mediaLoadingStates[index] && (
                    <div className="tw-media-placeholder absolute inset-0">
                      <div className="media-loader"></div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-2">
                    <p className="text-[10px] md:text-base text-white text-center overflow-hidden whitespace-pre-wrap text-ellipsis w-[80%] max-h-[75%]">
                      {post.caption}
                    </p>
                  </div>
                  <div className="w-4 h-4 md:w-6 md:h-6 absolute top-2 right-2">
                    {post.type === MediaTypes.VIDEO ? (
                      <ReelIcon color="#FFFFFF" size="100%" />
                    ) : post.type === MediaTypes.CAROUSEL_ALBUM ? (
                      <CarouselIcon color="#FFFFFF" size="100%" />
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              ))
          ) : (
            <>
              {[...Array(itemsPerRow)].map((_, index: number) => (
                <div
                  key={index}
                  className="relative group w-[calc(50%-0.25rem)] md:w-[calc(33.333%-0.25rem)] h-0 pb-[50%] md:pb-[33.333%] overflow-hidden flex items-center justify-center cursor-pointer"
                >
                  <div className="tw-media-placeholder absolute inset-0">
                    <div className="media-loader"></div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        <button
          onClick={
            !currentButton?.url
              ? handleLoadMore
              : () => window.open(currentButton.url)
          }
          type="button"
          className="tw-btn-primary-soft mt-3"
        >
          {currentButton.title}
        </button>
      </div>

      <InstaModal
        user={user}
        content={content}
        isOpen={isModalOpen}
        postIndex={currentPostIndex}
        profilePictureUrl={props.profilePictureUrl}
        prevPost={() => {
          setCurrentPostIndex((prev) => Math.max(prev - 1, 0));
        }}
        nextPost={() => {
          setCurrentPostIndex((prev) => Math.min(prev + 1, content.length - 1));
        }}
        closeModal={() => setIsModalOpen(false)}
        handleMediaLoad={handleMediaLoad}
      />
    </section>
  );
}
