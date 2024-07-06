import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
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
  const router = useRouter();
  const pathname = usePathname();
  const [showLanguages, setShowLanguages] = useState(false);

  const handleLanguageChange = (lang: string) => {
    if (lang !== currentLanguage) {
      const newPathname = pathname.replace(`/${currentLanguage}`, `/${lang}`);
      router.push(newPathname);
    }
    setShowLanguages(false);
  };

  return (
    <div>
      <button
        id="dropdown-languages-button"
        data-dropdown-toggle="dropdown-languages"
        data-dropdown-placement="bottom"
        className="w-fit flex items-center justify-between gap-2 py-2 px-3 rounded-lg hover:opacity-80"
        onClick={() => setShowLanguages(!showLanguages)}
      >
        <div className="flex items-center justify-start gap-[5px]">
          <LanguageSvg color="#530424" size={23} />
          <span className="text-jazzberry-jam-950 hidden lg:flex text-[18px]">
            {currentLanguage}
          </span>
        </div>
        <div className="hidden md:flex">
          <CaretDownSvg color="#530424" size={23} />
        </div>
      </button>
      {showLanguages && (
        <div
          id="dropdown-languages"
          className="fade-in-top absolute z-20 text-jazzberry-jam-600 text-sm px-2"
        >
          <ul>
            {languages.map((language) => (
              <li key={language.id}>
                <button
                  onClick={() => handleLanguageChange(language.value)}
                  className="w-full flex items-center justify-start gap-2 p-2 text-left hover:opacity-80"
                >
                  <Image
                    src={flags[language.flag]}
                    alt={`Flag of ${language.title}`}
                    width={25}
                    height={25}
                    className="rounded-[4px]"
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
