import Image from "next/image";
import LeftArrowIcon from "../svg/LeftArrow";
import RightArrowIcon from "../svg/RightArrow";

export default function Portafolio() {
  const images = [
    {
      id: 1,
      title: "Image 1",
      url: "/image1.jpg",
    },
    {
      id: 2,
      title: "Image 2",
      url: "/image2.jpg",
    },
    {
      id: 3,
      title: "Image 3",
      url: "/image3.jpg",
    },
    {
      id: 4,
      title: "Image 4",
      url: "/image4.jpg",
    },
    {
      id: 5,
      title: "Image 5",
      url: "/image5.jpg",
    },
    {
      id: 6,
      title: "Image 6",
      url: "/image6.jpg",
    },
    {
      id: 7,
      title: "Image 7",
      url: "/image7.jpg",
    },
    {
      id: 8,
      title: "Image 8",
      url: "/image8.jpg",
    },
    {
      id: 9,
      title: "Image 9",
      url: "/image9.jpg",
    },
    {
      id: 10,
      title: "Image 10",
      url: "/image10.jpg",
    },
    {
      id: 11,
      title: "Image 11",
      url: "/image11.jpg",
    },
    {
      id: 12,
      title: "Image 12",
      url: "/image12.jpg",
    },
  ];
  return (
    <section
      id="portafolio"
      className="w-screen h-screen bg-gray-100 relative flex flex-col items-center justify-center"
    >
      <div className="w-full h-[25%] flex flex-col items-center justify-end">
        <p className="text-[60px]">
          <strong>PORT</strong>AFOLIO
        </p>
      </div>
      <div className="w-[70%] h-[75%] flex items-center justify-between">
        <div className="arrow-left">
          <LeftArrowIcon color="#000000" size="50" />
        </div>
        <div className="pictures-slider">
          <div className="pictures-slider-track">
            {images.map((video) => (
              <div key={video.id} className="picture bg-xLaughyTaffy"></div>
            ))}
          </div>
        </div>
        <div className="arrow-right">
          <RightArrowIcon color="#000000" size="50" />
        </div>
      </div>
    </section>
  );
}
