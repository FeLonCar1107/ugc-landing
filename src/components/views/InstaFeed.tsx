import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import apiService from "@/services/api.service";
import ReelIcon from "@/components/svg/instagram/ReelIcon";
import CarouselIcon from "@/components/svg/instagram/CarouselIcon";
import CloseIcon from "@/components/svg/instagram/CloseIcon";
import Instagram from "@/components/svg/social-media/Instagram";
import LeftArrowIcon from "@/components/svg/LeftArrow";
import RightArrowIcon from "@/components/svg/RightArrow";
import LoaderInsta from "@/components/buttons/LoaderInsta";
import { IInstaFeedProps } from "@/types/props/insta-feed";
import { LocomotiveScrollContext } from "@/hooks/useLocomotiveScroll";

const LIMIT = 12;

export default function InstaFeed(props: IInstaFeedProps) {
  const [user, setUser] = useState<any>({});
  const [content, setContent] = useState<any>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [visibleRows, setVisibleRows] = useState<number>(1);
  const [currentPostIndex, setCurrentPostIndex] = useState<number>(0);
  const [mediaLoadingStates, setMediaLoadingStates] = useState<boolean[]>([]);
  const locomotiveScroll = useContext(LocomotiveScrollContext);
  const itemsPerRow = isMobile ? 2 : 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setUser(await apiService.GET("get-user"));
        setMediaLoadingStates(new Array(LIMIT).fill(true));
        setContent(await apiService.POST("content-media", { limit: LIMIT }));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (locomotiveScroll) locomotiveScroll.update();
  }, [visibleRows, locomotiveScroll]);

  const handleLoadMore = () => {
    setIsLoading(true);
    setVisibleRows((prev) => prev + 1);
    setIsLoading(false);
  };

  const openModal = (index: number) => {
    setCurrentPostIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextPost = () => {
    if (currentPostIndex < content.data.length - 1) {
      setCurrentPostIndex((prev) => prev + 1);
    }
  };

  const prevPost = () => {
    if (currentPostIndex > 0) {
      setCurrentPostIndex((prev) => prev - 1);
    }
  };

  const formatDate = (date: string) => {
    const newDate = new Date(date);
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    }).format(newDate);
  };

  const handleMediaLoad = (index: number) => {
    setIsLoading(true);
    setMediaLoadingStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = false;
      return newStates;
    });
    setIsLoading(false);
  };

  return (
    <section
      data-scroll-section
      id="insta-feed"
      className="bg-transparent w-screen min-h-screen h-auto flex flex-col items-center justify-center gap-5 lg:gap-10 py-10 bg-red-800"
    >
      <div className="w-full flex flex-col md:flex-row justify-center items-center md:gap-3 text-jazzberry-jam-500 text-[25px] md:text-[40px] xl:text-[50px] uppercase">
        <h2 className="font-bold">@{user?.username}</h2>
        <h2>{props.subtitle}</h2>
      </div>
      <div className="w-[75%] max-w-[1000px] flex flex-wrap gap-1 justify-center items-center">
        {content ? (
          content.data
            .slice(0, visibleRows * itemsPerRow)
            .map((post: any, index: number) => (
              <div
                key={post.id}
                className="relative group w-[calc(50%-0.25rem)] md:w-[calc(33.333%-0.25rem)] h-0 pb-[50%] md:pb-[33.333%] overflow-hidden flex items-center justify-center cursor-pointer"
                onClick={() => openModal(index)}
              >
                <Image
                  src={
                    post.media_type === "VIDEO"
                      ? post.thumbnail_url
                      : post.media_url
                  }
                  alt={post.caption}
                  fill
                  className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 ${
                    mediaLoadingStates[index] ? "opacity-0" : "opacity-100"
                  }`}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  onLoad={() => handleMediaLoad(index)}
                />
                {mediaLoadingStates[index] && (
                  <div className="absolute inset-0 flex justify-center items-center bg-jazzberry-jam-200">
                    <div className="media-loader"></div>
                  </div>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-2">
                  <p className="text-[10px] md:text-base text-white text-center overflow-hidden whitespace-pre-wrap text-ellipsis w-[80%] max-h-[75%]">
                    {post.caption}
                  </p>
                </div>
                <div className="w-4 h-4 md:w-6 md:h-6 absolute top-2 right-2">
                  {post.media_type === "VIDEO" ? (
                    <ReelIcon color="#FFFFFF" size="100%" />
                  ) : post.media_type === "CAROUSEL_ALBUM" ? (
                    <CarouselIcon color="#FFFFFF" size="100%" />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            ))
        ) : (
          <>
            {[...Array(itemsPerRow)].map((_, index) => (
              <div
                key={index}
                className="relative group w-[calc(50%-0.25rem)] md:w-[calc(33.333%-0.25rem)] h-0 pb-[50%] md:pb-[33.333%] overflow-hidden flex items-center justify-center cursor-pointer"
              >
                <div className="absolute inset-0 flex justify-center items-center bg-jazzberry-jam-200">
                  <div className="media-loader"></div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      {content && visibleRows * itemsPerRow < content.data.length && (
        <button
          onClick={handleLoadMore}
          className="mt-3 w-40 h-11 bg-jazzberry-jam-500 text-white rounded"
        >
          {isLoading ? <LoaderInsta /> : "Cargar más"}
        </button>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-[5000] bg-jazzberry-jam-100 flex items-center justify-center">
          <div className="relative w-[70%] max-w-[1200px] h-[85%] bg-jazzberry-jam-50 flex flex-col md:flex-row rounded-sm shadow-lg animated zoomIn">
            <button
              className="w-6 h-6 absolute top-[-10px] right-[-10px] text-white bg-jazzberry-jam-300 rounded-full p-1 z-50"
              onClick={closeModal}
            >
              <CloseIcon color="#FFFFFF" />
            </button>
            <button
              onClick={prevPost}
              disabled={currentPostIndex === 0}
              className="w-7 h-7 md:w-10 md:h-10 absolute top-[50%] transform -translate-y-1/2 left-[-2vw] bg-white rounded-full disabled:opacity-50 flex justify-center items-center z-40"
            >
              <LeftArrowIcon color="#871444" size="15" />
            </button>
            <div className="relative w-full md:w-[50%] h-[50%] md:h-full">
              {content.data[currentPostIndex].media_type === "VIDEO" ? (
                <video
                  src={content.data[currentPostIndex].media_url}
                  loop
                  autoPlay
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={content.data[currentPostIndex].media_url}
                  alt={content.data[currentPostIndex].caption}
                  fill
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  sizes="(min-width: 768px) 50vw, 100vw"
                  onLoad={() => handleMediaLoad(currentPostIndex)}
                />
              )}
            </div>
            <div className="w-full md:w-[50%] h-[50%] md:h-full overflow-hidden relative">
              <div className="w-full h-auto flex justify-between items-center py-5 px-7">
                <div className="flex justify-start items-center gap-3">
                  <Image
                    src={user?.profile_picture}
                    alt={`Foto del perfil de ${user?.username}`}
                    width={35}
                    height={35}
                    className="bg-jazzberry-jam-200 rounded-full"
                  />
                  <div className="flex flex-col">
                    <h2 className="text-sm font-bold">
                      {content.data[currentPostIndex].username}
                    </h2>
                    <p className="text-xs">
                      {formatDate(content.data[currentPostIndex].timestamp)}
                    </p>
                  </div>
                </div>
                <Instagram
                  url={content.data[currentPostIndex].permalink}
                  size="20"
                  color="#871444"
                />
              </div>
              <hr className="border-jazzberry-jam-200" />
              <div className="py-5 px-7">
                <p className="text-xs md:text-sm">
                  <strong>{content.data[currentPostIndex].username} </strong>
                  {content.data[currentPostIndex].caption}
                </p>
              </div>
            </div>
            <button
              onClick={nextPost}
              disabled={currentPostIndex === content.data.length - 1}
              className="w-7 h-7 md:w-10 md:h-10 absolute top-[50%] transform -translate-y-1/2 right-[-2vw] bg-white rounded-full disabled:opacity-50 flex justify-center items-center"
            >
              <RightArrowIcon color="#871444" size="15" />
            </button>
            <div className="flex md:hidden absolute bottom-0 left-0 w-full h-[18%] bg-gradient-to-b from-transparent to-white pointer-events-none"></div>
          </div>
        </div>
      )}
    </section>
  );
}
