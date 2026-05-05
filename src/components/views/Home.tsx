import Image from "next/image";
import Skills from "@/components/Skills";
import { IHomeProps } from "@/types/props/home";

/** Fluid hero title: scales with viewport width, no breakpoint tweaks (min / preferred vw / max). */
const HERO_NAME_SIZE = "clamp(4.5rem, 17.5vw + 0.9rem, 15.5rem)";

/** Top strip: clears fixed navbar + fluid inset (single source; Main no longer adds pt). */
const HOME_TOP_PADDING =
  "calc(var(--navbar-height) + clamp(0.5rem, 2.5vh, 1.25rem))";

/** Short description: fluid size + line-height (no breakpoint font classes). */
const HOME_INTRO_FONT_SIZE =
  "clamp(0.8125rem, 1.15vw + 0.58rem, 1.125rem)";
const HOME_INTRO_LINE_HEIGHT =
  "clamp(1.28rem, 0.65vw + 1.05rem, 1.65rem)";

export default function Home(props: IHomeProps) {
  const { content } = props;

  return (
    <section
      id="home"
      data-scroll-section
      className="flex h-[100dvh] min-h-0 w-full flex-col overflow-hidden bg-transparent lg:overflow-visible"
    >
      {/* Top band: skills + short description — pt en calc para empezar siempre bajo el navbar */}
      <div
        className="section-shell flex shrink-0 flex-row items-start justify-between gap-12 font-semibold text-jazzberry-jam-300"
        style={{ paddingTop: HOME_TOP_PADDING }}
      >
        <div className="min-h-0 min-w-0 flex-1 basis-0 max-w-[350px]">
          <Skills words={content?.skills} />
        </div>
        <div className="min-h-0 min-w-0 flex-1 basis-0 max-w-[350px]">
          <p
            className="text-right sm:text-left"
            style={{
              fontSize: HOME_INTRO_FONT_SIZE,
              lineHeight: HOME_INTRO_LINE_HEIGHT,
            }}
          >
            {content?.shortDescription}
          </p>
        </div>
      </div>

      {/* Hero: resto del viewport */}
      <div className="relative min-h-0 w-full flex-1 overflow-hidden lg:overflow-visible">
        <div
          data-scroll
          data-scroll-speed="5"
          className="pointer-events-none absolute inset-0 z-10 flex w-full flex-col items-center justify-center overflow-hidden"
        >
          <h1
            className="tw-primary-title font-BeckanPersonal leading-none text-jazzberry-jam-400"
            style={{ fontSize: HERO_NAME_SIZE }}
          >
            {content?.name.toUpperCase()}
          </h1>
          <h1
            className="tw-secondary-title font-BeckanPersonal leading-none text-transparent"
            style={{
              fontSize: HERO_NAME_SIZE,
              marginTop: "calc(-1 * clamp(0.85rem, 3.2vw, 2.75rem))",
            }}
          >
            {content?.name.toUpperCase()}
          </h1>
        </div>

        {/* Imagen: capa llena el flex-1 */}
        <div className="absolute inset-0 z-20 min-h-0 overflow-hidden lg:overflow-visible">
          <div
            data-scroll
            data-scroll-speed="1"
            className="section-shell relative h-full"
          >
            <Image
              src={content?.image}
              alt="Isabella"
              fill
              sizes="(max-width: 640px) 96vw, (max-width: 1024px) 88vw, (max-width: 1536px) 75vw, 65vw"
              priority
              quality={100}
              className="main-image blur-in origin-bottom object-contain object-bottom lg:scale-[1.25]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
