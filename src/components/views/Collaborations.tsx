"use client";
import { useEffect } from "react";

export default function Collaborations() {
  const brands = [
    {
      id: 1,
      name: "Brand 1",
      logo: "/brand1.png",
    },
    {
      id: 2,
      name: "Brand 2",
      logo: "/brand2.png",
    },
    {
      id: 3,
      name: "Brand 3",
      logo: "/brand3.png",
    },
    {
      id: 4,
      name: "Brand 4",
      logo: "/brand4.png",
    },
    {
      id: 5,
      name: "Brand 5",
      logo: "/brand5.png",
    },
    {
      id: 6,
      name: "Brand 6",
      logo: "/brand6.png",
    },
    {
      id: 7,
      name: "Brand 7",
      logo: "/brand7.png",
    },
    {
      id: 8,
      name: "Brand 8",
      logo: "/brand8.png",
    },
    {
      id: 9,
      name: "Brand 9",
      logo: "/brand9.png",
    },
    {
      id: 10,
      name: "Brand 10",
      logo: "/brand10.png",
    },
    {
      id: 11,
      name: "Brand 11",
      logo: "/brand11.png",
    },
    {
      id: 12,
      name: "Brand 12",
      logo: "/brand12.png",
    },
  ];

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--total-brands", (brands.length * 2).toString());
  }, [brands.length]);

  return (
    <section id="collaborations" className="w-screen h-auto pb-20">
      <div className="w-full h-[170px] flex items-end justify-center">
        <p className="text-[9vw] sm:text-[7vw] lg:text-[5vw] 2xl:text-[4vw]">
          <strong>COLABORACIONES</strong> CON:
        </p>
      </div>
      <div className="collaborations-slider">
        <div className="collaborations-slider-track">
          {brands.concat(brands).map((brand) => (
            <div key={brand.id} className="collaborations-slider-brand"></div>
          ))}
        </div>
      </div>
    </section>
  );
}
