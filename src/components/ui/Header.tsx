import { Locale } from "@/i18n/config";
import { getDictionary } from "@/lib/dictionary";
import Navbar from "@/components/ui/Navbar";

export default async function Header({ lang }: { lang: Locale }) {
  const { navigation } = await getDictionary(lang);

  return (
    <header>
      <Navbar lang={lang} navigation={navigation} />
    </header>
  );
}
