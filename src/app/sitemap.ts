import { MetadataRoute } from "next";
import Languages from "@/enums/languages.enum";

type Language = Languages.ES | Languages.EN;
type Section =
  | "videos"
  | "collaborations"
  | "portfolio"
  | "about"
  | "insta-feed"
  | "ugc"
  | "contact";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
if (!BASE_URL)
  throw new Error(
    "NEXT_PUBLIC_BASE_URL is not defined in the environment variables",
  );

function generateStaticRoutes(
  languages: Language[],
  sections: Section[],
): string[] {
  return languages.flatMap((language) =>
    sections.map((section) => `${BASE_URL}/${language}#${section}`),
  );
}

export default async function Sitemap(): Promise<MetadataRoute.Sitemap> {
  const languages: Language[] = [Languages.ES, Languages.EN];
  const sections: Section[] = [
    "videos",
    "collaborations",
    "portfolio",
    "about",
    "insta-feed",
    "ugc",
    "contact",
  ];

  const staticRoutes = generateStaticRoutes(languages, sections);
  const baseRoutes = languages.map((language) => `${BASE_URL}/${language}`);
  const allRoutes = [...baseRoutes, ...staticRoutes].map((url) => ({ url }));

  return allRoutes;
}
