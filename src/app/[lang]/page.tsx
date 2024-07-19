import { Locale } from "@/i18n/config";
import { getDictionary } from "@/lib/dictionary";
import Main from "@/components/ui/Main";
import { IMainProps } from "@/types/props/main";

export default async function Page({
  params: { lang },
}: Readonly<{ params: { lang: Locale } }>) {
  const page: IMainProps = await getDictionary(lang);
  return <Main {...page} />;
}
