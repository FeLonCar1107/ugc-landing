"use client";
import { useState } from "react";
import Image from "next/image";
import LanguageSvg from "@/components/svg/LanguageSvg";
import CaretDownSvg from "@/components/svg/CaretDownSvg";
import ColombianFlag from "../../public/flags/co.svg";
import AmericanFlag from "../../public/flags/us.svg";

const flags: { [key: string]: any } = {
  co: ColombianFlag,
  us: AmericanFlag,
};

interface LanguagesListProps {
  currentLanguage: string;
  languages: {
    id: number;
    title: string;
    value: string;
    flag: string;
  }[];
}

export default function LanguagesList({
  currentLanguage,
  languages,
}: LanguagesListProps) {
  const [showLanguages, setShowLanguages] = useState(false);
  return (
    <div>
      <button
        id="dropdown-languages-button"
        data-dropdown-toggle="dropdown-languages"
        data-dropdown-placement="bottom"
        className="w-fit flex items-center justify-between gap-2 py-2 px-3 rounded-lg"
        onClick={() => setShowLanguages(!showLanguages)}
      >
        <div className="flex items-center justify-start gap-[5px]">
          <LanguageSvg color="#ffff" size={20} />
          <span className="hidden lg:flex text-lg">{currentLanguage}</span>
        </div>
        <div className="hidden md:flex">
          <CaretDownSvg color="#ffff" size={20} />
        </div>
      </button>
      {showLanguages && (
        <div
          id="dropdown-languages"
          className="absolute z-20 text-white text-base"
        >
          <ul>
            {languages.map((language) => (
              <li key={language.id}>
                <button className="w-full flex items-center justify-start gap-2 p-2 text-left">
                  <Image
                    src={flags[language.flag]}
                    alt={`Flag of ${language.title}`}
                    width={20}
                    height={20}
                    className="rounded-sm"
                  />
                  {language.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
