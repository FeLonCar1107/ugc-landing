import Languages from "@/enums/languages.enum";
export const i18n = {
  defaultLocale: Languages.ES,
  locales: [Languages.EN, Languages.ES],
} as const;

export type Locale = (typeof i18n.locales)[number];
