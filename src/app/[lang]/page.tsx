import { Locale } from "@/i18n/config";
import { getDictionary } from "@/lib/dictionary";
import Home from "@/views/Home";
import About from "@/views/About";
import Portafolio from "@/views/Portafolio";

export default async function Page({
  params: { lang },
}: Readonly<{ params: { lang: Locale } }>) {
  const { page } = await getDictionary(lang);

  return (
    <main className="w-screen h-auto">
      <Home />
      <About />
      <Portafolio />
    </main>
  );
}
