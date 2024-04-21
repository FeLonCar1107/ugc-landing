export default function Portafolio() {
  const videos = [
    {
      id: 1,
      title: "Video 1",
      url: "https://www.youtube.com/embed/1",
    },
    {
      id: 2,
      title: "Video 2",
      url: "https://www.youtube.com/embed/2",
    },
    {
      id: 3,
      title: "Video 3",
      url: "https://www.youtube.com/embed/3",
    },
    {
      id: 4,
      title: "Video 4",
      url: "https://www.youtube.com/embed/4",
    },
    {
      id: 5,
      title: "Video 5",
      url: "https://www.youtube.com/embed/5",
    },
    {
      id: 6,
      title: "Video 6",
      url: "https://www.youtube.com/embed/6",
    },
    {
      id: 7,
      title: "Video 7",
      url: "https://www.youtube.com/embed/7",
    },
    {
      id: 8,
      title: "Video 8",
      url: "https://www.youtube.com/embed/8",
    },
    {
      id: 9,
      title: "Video 9",
      url: "https://www.youtube.com/embed/9",
    },
    {
      id: 10,
      title: "Video 10",
      url: "https://www.youtube.com/embed/10",
    },
    {
      id: 11,
      title: "Video 11",
      url: "https://www.youtube.com/embed/11",
    },
    {
      id: 12,
      title: "Video 12",
      url: "https://www.youtube.com/embed/12",
    },
    {
      id: 13,
      title: "Video 13",
      url: "https://www.youtube.com/embed/13",
    },
    {
      id: 14,
      title: "Video 14",
      url: "https://www.youtube.com/embed/14",
    },
    {
      id: 15,
      title: "Video 15",
      url: "https://www.youtube.com/embed/15",
    },
    {
      id: 16,
      title: "Video 16",
      url: "https://www.youtube.com/embed/16",
    },
    {
      id: 17,
      title: "Video 17",
      url: "https://www.youtube.com/embed/17",
    },
    {
      id: 18,
      title: "Video 18",
      url: "https://www.youtube.com/embed/18",
    },
    {
      id: 19,
      title: "Video 19",
      url: "https://www.youtube.com/embed/19",
    },
    {
      id: 20,
      title: "Video 20",
      url: "https://www.youtube.com/embed/20",
    },
  ];
  return (
    <section id="portafolio" className="w-screen h-screen bg-xWhite">
      <div className="w-full h-full flex items-center justify-center">
        <div className="bg-xCoolWhip w-[87%] h-[80%]">
          <div className="projects">
            <div className="bg-xBlack text-center">
              <h2 className="text-white text-4xl">
                <strong>PORTAFOLIO</strong>
                VIDEOS
              </h2>
            </div>
            <div className="videos-slider">
              {videos.map((video) => (
                <div key={video.id}></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
