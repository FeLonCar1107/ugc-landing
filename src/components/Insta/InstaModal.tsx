import React from "react";
import Image from "next/image";
import MediaTypes from "@/enums/media-types.enum";
import CloseIcon from "@/components/svg/instagram/CloseIcon";
import LeftArrowIcon from "@/components/svg/LeftArrow";
import RightArrowIcon from "@/components/svg/RightArrow";
import Instagram from "@/components/svg/social-media/Instagram";
import { formatDate } from "@/utils/utils";
import { IInstagramUserResponse } from "@/types/responses/instagram-user";
import { IInstagramMediaResponse } from "@/types/responses/instagram-media";

interface InstaModalProps {
  isOpen: boolean;
  profilePictureUrl: string;
  user: IInstagramUserResponse | null;
  content: IInstagramMediaResponse[];
  postIndex: number;
  prevPost: () => void;
  nextPost: () => void;
  closeModal: () => void;
  handleMediaLoad: (index: number) => void;
}

const InstaModal: React.FC<InstaModalProps> = ({
  user,
  isOpen,
  content,
  postIndex,
  profilePictureUrl,
  prevPost,
  nextPost,
  closeModal,
  handleMediaLoad,
}) => {
  return (
    <React.Fragment>
      {isOpen && (
        <div className="fixed inset-0 z-[5000] bg-jazzberry-jam-100 flex items-center justify-center">
          <div className="relative w-[70%] lg:max-w-[800px] 2xl:max-w-[1200px] h-[80%] lg:max-h-[570px] 2xl:max-h-[850px] bg-jazzberry-jam-50 flex flex-col md:flex-row rounded-sm shadow-lg animated zoomIn">
            <button
              className="w-6 h-6 absolute top-[-10px] right-[-10px] text-white bg-jazzberry-jam-300 rounded-full p-1 z-50"
              onClick={() => closeModal()}
            >
              <CloseIcon color="#FFFFFF" />
            </button>
            <button
              onClick={prevPost}
              disabled={postIndex === 0}
              className="w-7 h-7 md:w-10 md:h-10 absolute top-[50%] transform -translate-y-1/2 left-[-2vw] bg-white rounded-full disabled:opacity-30 flex justify-center items-center z-40"
            >
              <LeftArrowIcon color="#871444" size="15" />
            </button>
            <div className="relative w-full md:w-[50%] h-[50%] md:h-full">
              {content[postIndex].type === MediaTypes.VIDEO ? (
                <video
                  src={content[postIndex].url}
                  loop
                  autoPlay
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={content[postIndex].url}
                  alt="Contenido del feed de Instagram"
                  fill
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  sizes="(min-width: 768px) 50vw, 100vw"
                  onLoad={() => handleMediaLoad(postIndex)}
                />
              )}
            </div>
            <div className="w-full md:w-[50%] h-[50%] md:h-full overflow-hidden relative">
              <div className="w-full h-auto flex justify-between items-center py-5 px-7">
                <div className="flex justify-start items-center gap-3">
                  <Image
                    src={user?.profilePictureUrl || profilePictureUrl}
                    alt={`Foto del perfil de ${user?.username}`}
                    width={35}
                    height={35}
                    className="bg-jazzberry-jam-200 rounded-full"
                  />
                  <div className="flex flex-col">
                    <h2 className="text-sm font-bold">
                      {content[postIndex].username}
                    </h2>
                    <p className="text-xs">
                      {formatDate(content[postIndex].date)}
                    </p>
                  </div>
                </div>
                <Instagram
                  url={content[postIndex].instaLink}
                  size="20"
                  color="#871444"
                />
              </div>
              <hr className="border-jazzberry-jam-200" />
              <div className="py-5 px-7">
                <p className="text-xs md:text-sm">
                  <strong>{content[postIndex].username} </strong>
                  {content[postIndex].caption}
                </p>
              </div>
            </div>
            <button
              onClick={nextPost}
              disabled={postIndex === content.length - 1}
              className="w-7 h-7 md:w-10 md:h-10 absolute top-[50%] transform -translate-y-1/2 right-[-2vw] bg-white rounded-full disabled:opacity-30 flex justify-center items-center"
            >
              <RightArrowIcon color="#871444" size="15" />
            </button>
            <div className="flex md:hidden absolute bottom-0 left-0 w-full h-[18%] bg-gradient-to-b from-transparent to-white pointer-events-none"></div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default InstaModal;
