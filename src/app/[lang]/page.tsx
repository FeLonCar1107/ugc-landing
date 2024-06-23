import { Locale } from "@/i18n/config";
import { getDictionary } from "@/lib/dictionary";
import Main from "@/components/ui/Main";

export default async function Page({
  params: { lang },
}: Readonly<{ params: { lang: Locale } }>) {
  const page = await getDictionary(lang);

  return <Main data={page} />;
}
