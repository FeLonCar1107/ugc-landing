import Image from "next/image";
import { IBrand } from "@/types/brand";
import { ICollaborationsProps } from "@/types/props/collaborations";
import { useCollabs } from "@/context/CollabsContext";

export default function Collaborations(props: ICollaborationsProps) {
  const { splitTitle } = props;
  const { brands, isLoading } = useCollabs();

  const sortedBrands = [...brands].sort((a, b) => a.id - b.id);
  const doubledBrands = [...sortedBrands, ...sortedBrands, ...sortedBrands];

  return (
    <section
      data-scroll-section
      id="collaborations"
      className="relative h-auto w-screen bg-transparent tw-section-y-stack lg:pb-20"
    >
      <div className="section-shell flex h-auto items-center justify-center">
        <h2 className="tw-section-heading tw-text-heading flex items-center gap-3">
          <span className="font-bold">{splitTitle[0]}</span>
          {splitTitle[1] ? (
            <>
              {" "}
              <span className="hidden font-normal md:inline">{splitTitle[1]}</span>
            </>
          ) : null}
        </h2>
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
