import { useEffect, useState } from "react";
import Image from "next/image";
import { IBrand } from "@/types/brand";
import { ICollaborationsProps } from "@/types/props/collaborations";
import apiService from "@/services/api.service";

export default function Collaborations(props: ICollaborationsProps) {
  const { splitTitle, content } = props;
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--total-brands", content.brands.length.toString());
  }, [content.brands.length]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setBrands(await apiService.GET("brands"));
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <section
      data-scroll-section
      id="collaborations"
      className="w-screen h-auto relative bg-transparent lg:pb-20"
    >
      <div className="w-full h-auto flex items-end justify-center">
        <div
          data-scroll
          data-scroll-speed="-1.5"
          className="relative w-[15vw] h-[15vw] max-w-[250px] max-h-[250px]"
        >
          <Image
            src={content.butterfly.rose}
            alt={content.butterfly.alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            unoptimized={true}
            className="mariposas transform scale-x-[-1]"
          />
        </div>
        <p className="flex gap-3 text-[25px] md:text-[40px] xl:text-[50px] uppercase text-jazzberry-jam-600">
          <strong>{splitTitle[0]}</strong>{" "}
          <span className="hidden md:flex">{splitTitle[1]}</span>
        </p>
        <div
          data-scroll
          data-scroll-speed="3"
          className="relative w-[15vw] h-[15vw] max-w-[250px] max-h-[250px]"
        >
          <Image
            src={content.butterfly.gold}
            alt={content.butterfly.alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            unoptimized={true}
            className="mariposas"
          />
        </div>
      </div>
      {isLoading ? (
        <div className="w-full h-[250px] flex items-center justify-center">
          <div className="collabs-loader"></div>
        </div>
      ) : (
        <div className="collaborations-slider z-30">
          <div className="collaborations-slider-track">
            {brands?.map((brand: IBrand) => (
              <div key={brand.id} className="collaborations-slider-brand">
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
    </section>
  );
}
