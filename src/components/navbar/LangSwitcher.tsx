import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import ColombianFlag from "../../../public/flags/co.svg";
import AmericanFlag from "../../../public/flags/us.svg";
import Image from "next/image";

interface LangSwitcherProps {
  currentLanguage: string;
}

export default function LangSwitcher({ currentLanguage }: LangSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isColombianFlag, setIsColombianFlag] = useState<boolean>(
    currentLanguage === "es",
  );

  const handleLanguageChange = () => {
    const newLang = isColombianFlag ? "en" : "es";
    const newPathname = pathname.replace(`/${currentLanguage}`, `/${newLang}`);
    router.push(newPathname);
    setIsColombianFlag(newLang === "es");
  };

  return (
    <button
      className="w-[40px] h-[20px] rounded-full bg-jazzberry-jam-400 flex items-center transition duration-300 focus:outline-none shadow animated fadeIn"
      onClick={handleLanguageChange}
    >
      <div
        id="switch-toggle"
        className={`w-[30px] h-[30px] relative rounded-full transition duration-500 transform ${
          isColombianFlag ? "-translate-x-[10px]" : "translate-x-[20px]"
        }`}
      >
        <Image
          src={isColombianFlag ? ColombianFlag : AmericanFlag}
          alt={`Flag of ${isColombianFlag ? "Colombia" : "USA"}`}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="rounded-full object-cover"
        />
      </div>
    </button>
  );
}
