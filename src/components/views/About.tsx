import { IAboutProps } from "@/types/props/about";
import { useCollabs } from "@/context/CollabsContext";
import Image from "next/image";
import useHoverEffects from "@/hooks/useHoverEffects";

export default function About(props: IAboutProps) {
  useHoverEffects();
  const { totalBrands } = useCollabs();
  const { title, subtitle, content } = props;

  return (
    <section
      data-scroll-section
      id="about"
      className="w-screen flex items-center justify-center py-16 md:py-20 lg:py-24"
    >
      <div className="section-shell w-full">
        <div className="grid w-full grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(17.5rem,26.25rem)] lg:items-start lg:gap-x-16 lg:gap-y-6 xl:gap-x-24 xl:gap-y-8">
          <header className="min-w-0 space-y-0.5 lg:col-start-1 lg:row-start-1">
            <p className="text-center text-[11px] font-medium uppercase tracking-[0.35em] text-jazzberry-jam-400 lg:text-left">
              {title}
            </p>
            <h2 className="tw-section-heading text-center font-bold text-jazzberry-jam-600 lg:text-left">
              {subtitle}
            </h2>
          </header>

          <div className="flex w-full justify-center lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:justify-end">
            <div className="relative aspect-[3/4] w-full max-w-[min(100%,380px)] overflow-hidden rounded-2xl bg-jazzberry-jam-100 shadow-[0_24px_60px_-20px_rgba(157,23,77,0.18)] sm:max-w-[420px]">
              <Image
                src={content.image.src}
                alt={content.image.alt}
                fill
                priority
                sizes="(max-width: 1024px) min(90vw, 420px), 45vw"
                className="object-cover object-center"
              />
              <div
                className="pointer-events-none absolute left-7 top-10 z-10 p-2.5 backdrop-blur-[5px]"
                aria-hidden
              >
                <Image
                  src="/launch-assets/discover-your-character/hero_signature.png"
                  alt=""
                  width={300}
                  height={120}
                  className="relative block h-auto w-[min(30vw,7.5rem)] -rotate-[2.5deg] mix-blend-screen"
                />
              </div>
            </div>
          </div>

          <div className="flex w-full min-w-0 flex-col justify-start lg:col-start-1 lg:row-start-2">
            <div className="space-y-5 text-[13px] leading-relaxed text-jazzberry-jam-950/90 md:text-[0.95rem]">
              <p>{content.description.paragraph1}</p>
              <p>{content.description.paragraph2}</p>
              <p className="hidden lg:block">
                {content.description.paragraph3} {totalBrands}{" "}
                {content.description.paragraph4}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
