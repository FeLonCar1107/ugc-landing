import Link from "next/link";
import { Locale } from "@/i18n/config";
import { getDictionary } from "@/lib/dictionary";
import LanguagesList from "@/components/LanguagesList";

export default async function Navbar({ lang }: { lang: Locale }) {
  const { navigation } = await getDictionary(lang);
  return (
    <header>
      <nav className="w-full p-7 flex justify-between text-white fixed top-0 left-0 right-0 z-10">
        <Link href="/" className="">
          My Blog
        </Link>
        <div className="mx-auto flex justify-center items-center gap-4 xl:gap-8">
          {navigation.nav_options.map((option) => (
            <Link
              key={option.id}
              href={option.href}
              className="rounded-3xl hover:bg-white hover:text-black py-2 px-7 flex-grow lg:text-[16px] xl:text-[19px] 2xl:text-[23px] text-center font-normal"
            >
              {option.title}
            </Link>
          ))}
        </div>
          <LanguagesList
            currentLanguage={lang}
            languages={navigation.languages}
          />
      </nav>
    </header>
  );
}
