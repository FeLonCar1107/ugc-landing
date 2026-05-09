import { useRef, useCallback, useState } from "react";
import { IVideo } from "@/types/video";
import { IVideosProps } from "@/types/props/videos";
import { useVideoCarousel } from "@/hooks/useVideoCarousel";
import ChevronNav from "@/components/svg/ChevronNav";

function PlayGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M9 6.5v11l9-5.5L9 6.5z" />
    </svg>
  );
}

export default function Videos(props: IVideosProps) {
  const { splitTitle, content } = props;
  const videos = content.videos;
  const count = videos.length;

  useVideoCarousel(count);

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  const safePauseOthers = useCallback((except: number) => {
    videoRefs.current.forEach((node, i) => {
      if (i !== except && node && !node.paused) {
        node.pause();
      }
    });
  }, []);

  const handlePlayRequest = useCallback(
    (index: number) => {
      safePauseOthers(index);
      const el = videoRefs.current[index];
      void el?.play().catch(() => {
        /* ignore autoplay-style rejection */
      });
    },
    [safePauseOthers],
  );

  return (
    <section
      data-scroll-section
      id="videos"
      className="bg-transparent flex h-auto w-screen flex-col items-center justify-start tw-section-y"
    >
      <div className="section-shell flex h-auto flex-col items-center gap-8 pb-8 md:gap-10 md:pb-12 lg:gap-12">
        <header className="flex w-full max-w-2xl flex-col items-center px-1 text-center">
          <h2
            id="videos-heading"
            className="tw-section-heading tw-text-heading flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1"
          >
            <span className="font-semibold tracking-[0.12em]">{splitTitle[0]}</span>
            {splitTitle[1] ? (
              <span className="font-light tracking-[0.14em] text-jazzberry-jam-900">
                {splitTitle[1]}
              </span>
            ) : null}
          </h2>
        </header>

        <div className="flex w-full items-center justify-center">
          <div className="videos-wrapper">
            <button
              type="button"
              id="left-video-arrow"
              className="video-arrow group flex items-center justify-center rounded-full border border-jazzberry-jam-200/40 bg-white/90 text-jazzberry-jam-900 shadow-[0_4px_24px_-8px_rgba(83,4,36,0.15)] backdrop-blur-sm transition hover:border-jazzberry-jam-300/60 hover:bg-white"
              aria-label="Previous videos"
            >
              <ChevronNav direction="left" className="h-5 w-5" />
            </button>

            <div
              className="videos-carousel touch-pan-x"
              tabIndex={0}
              role="region"
              aria-labelledby="videos-heading"
            >
              {videos.map((video: IVideo, index: number) => {
                const isPlaying = playingIndex === index;
                return (
                  <article key={video.id} className="video-slide group">
                    <div className="video-slide__frame">
                      <video
                        ref={(el) => {
                          videoRefs.current[index] = el;
                        }}
                        loop
                        playsInline
                        preload="metadata"
                        poster={video.preview}
                        src={video.src}
                        className="video-slide__media"
                        controls={isPlaying}
                        controlsList="nodownload"
                        onPlay={() => {
                          setPlayingIndex(index);
                          safePauseOthers(index);
                        }}
                        onPause={() => {
                          setPlayingIndex((p) => (p === index ? null : p));
                        }}
                      />

                      {!isPlaying ? (
                        <button
                          type="button"
                          className="video-slide__play absolute inset-0 z-[1] flex cursor-pointer items-center justify-center border-0 bg-gradient-to-t from-black/25 via-transparent to-black/10 p-0 transition-opacity duration-300 hover:from-black/35"
                          onClick={() => handlePlayRequest(index)}
                          aria-label={`Play video: ${video.title}`}
                        >
                          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/92 text-jazzberry-jam-950 shadow-[0_8px_32px_-6px_rgba(83,4,36,0.35)] ring-1 ring-white/80 transition duration-300 group-hover:scale-[1.03] md:h-14 md:w-14">
                            <PlayGlyph className="ml-0.5 h-5 w-5 md:h-6 md:w-6" />
                          </span>
                        </button>
                      ) : null}

                      <div className="video-slide__caption pointer-events-none absolute inset-x-0 bottom-0 z-[2] bg-gradient-to-t from-black/55 via-black/20 to-transparent px-3 pb-3 pt-12 opacity-0 transition duration-300 group-hover:opacity-100 md:pb-4">
                        <h3 className="text-center text-xs font-semibold leading-tight text-white drop-shadow-sm md:text-sm">
                          {video.title}
                        </h3>
                        <p className="mt-1 text-center text-[11px] leading-snug text-white/90 drop-shadow-sm md:text-xs">
                          {video.description}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <button
              type="button"
              id="right-video-arrow"
              className="video-arrow group flex items-center justify-center rounded-full border border-jazzberry-jam-200/40 bg-white/90 text-jazzberry-jam-900 shadow-[0_4px_24px_-8px_rgba(83,4,36,0.15)] backdrop-blur-sm transition hover:border-jazzberry-jam-300/60 hover:bg-white"
              aria-label="Next videos"
            >
              <ChevronNav direction="right" className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
