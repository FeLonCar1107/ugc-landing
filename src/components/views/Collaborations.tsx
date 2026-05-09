import Image from "next/image";
import { IBrand } from "@/types/brand";
import { ICollaborationsProps } from "@/types/props/collaborations";
import { useCollabs } from "@/context/CollabsContext";

/** Fluid butterfly frame: min / vw blend / max — no breakpoint utilities. */
const COLLAB_BUTTERFLY_SIZE = "clamp(2.25rem, 5vw + 0.2rem, 4rem)";

export default function Collaborations(props: ICollaborationsProps) {
  const { splitTitle, content } = props;
  const { brands, isLoading } = useCollabs();

  const sortedBrands = [...brands].sort((a, b) => a.id - b.id);
  const doubledBrands = [...sortedBrands, ...sortedBrands, ...sortedBrands];

  return (
    <section
      data-scroll-section
      id="collaborations"
      className="relative h-auto w-screen bg-transparent tw-section-y-stack lg:pb-20"
    >
      <div className="section-shell h-auto flex items-end justify-center">
        <div
          data-scroll
          data-scroll-speed="-1.5"
          className="relative shrink-0"
          style={{
            width: COLLAB_BUTTERFLY_SIZE,
            height: COLLAB_BUTTERFLY_SIZE,
          }}
        >
          <Image
            src={content.butterfly.rose}
            alt={content.butterfly.alt}
            fill
            sizes="80px"
            unoptimized={true}
            className="mariposas transform scale-x-[-1]"
          />
        </div>
        <h2 className="tw-section-heading tw-text-heading flex items-center gap-3">
          <span className="font-bold">{splitTitle[0]}</span>
          {splitTitle[1] ? (
            <>
              {" "}
              <span className="hidden font-normal md:inline">{splitTitle[1]}</span>
            </>
          ) : null}
        </h2>
        <div
          data-scroll
          data-scroll-speed="3"
          className="relative shrink-0"
          style={{
            width: COLLAB_BUTTERFLY_SIZE,
            height: COLLAB_BUTTERFLY_SIZE,
          }}
        >
          <Image
            src={content.butterfly.gold}
            alt={content.butterfly.alt}
            fill
            sizes="80px"
            unoptimized={true}
            className="mariposas"
          />
        </div>
      </div>
      <div className="section-shell w-full">
        {isLoading ? (
          <div className="flex h-[250px] w-full items-center justify-center">
            <div className="collabs-loader"></div>
          </div>
        ) : (
          <div className="collaborations-slider z-30">
            <div className="collaborations-slider-track">
              {doubledBrands?.map((brand: IBrand, idx: number) => (
                <div
                  key={brand.id + "-" + idx}
                  className="collaborations-slider-brand"
                >
                  <div className="brand relative">
                    <Image
                      src={brand.logo}
                      alt={brand.alt}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      unoptimized={true}
                      className="transition-all duration-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
