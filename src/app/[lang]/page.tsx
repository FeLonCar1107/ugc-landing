import { Locale } from "@/i18n/config";
import { getDictionary } from "@/lib/dictionary";
import Home from "@/components/views/Home";
import About from "@/components/views/About";
import Portafolio from "@/components/views/Portafolio";

export default async function Page({
  params: { lang },
}: Readonly<{ params: { lang: Locale } }>) {
  const { page } = await getDictionary(lang);
  const { home, about } = page;

  return (
    <main className="w-screen h-auto">
      <Home data={home} />

      <Portafolio />
    </main>
  );
}
