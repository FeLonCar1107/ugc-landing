import Link from "next/link";
import { Locale } from "@/i18n/config";
import { getDictionary } from "@/lib/dictionary";
import LanguagesList from "@/components/LanguagesList";
import NavOptions from "@/components/navbar/NavOptions";
import HamburgerMenu from "@/components/navbar/HamburgerMenu";

export default async function Navbar({ lang }: { lang: Locale }) {
  const { navigation } = await getDictionary(lang);

  return (
    <header>
      <nav className="w-full h-14 lg:h-16 flex items-center justify-between px-4 text-white fixed top-0 left-0 right-0 border-b-[0.5px] md:border-none border-opacity-20 z-[1001]">
        {" "}
        <HamburgerMenu navigation={navigation} />
        <Link href="/" className="font-bold text-2xl">
          ILA
        </Link>
        <NavOptions options={navigation.nav_options} />
        <LanguagesList
          currentLanguage={lang}
          languages={navigation.languages}
        />
      </nav>
    </header>
  );
}
