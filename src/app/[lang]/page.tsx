import { Locale } from "@/i18n/config";
import { getDictionary } from "@/lib/dictionary";
import Home from "@/components/views/Home";
import Videos from "@/components/views/Videos";
import Collaborations from "@/components/views/Collaborations";
import Portafolio from "@/components/views/Portafolio";
import About from "@/components/views/About";
import SocialFixed from "@/components/SocialFixed";

export default async function Page({
  params: { lang },
}: Readonly<{ params: { lang: Locale } }>) {
  const { page } = await getDictionary(lang);
  const { home, about } = page;

  return (
    <main className="w-screen h-auto">
      <Home data={home} />
      <Videos />
      <Collaborations />
      <Portafolio />
      <About data={about} />
      <SocialFixed />
    </main>
  );
}
