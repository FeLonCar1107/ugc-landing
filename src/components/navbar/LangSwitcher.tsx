"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGroup, motion } from "framer-motion";
import { ILangSwitcherProps } from "@/types/props/lang-switcher";
import Languages from "@/enums/languages.enum";
import type { Locale } from "@/i18n/config";

type LocaleOption = {
  code: Locale;
  label: string;
  nativeName: string;
};

const LOCALE_OPTIONS: LocaleOption[] = [
  { code: Languages.ES, label: "ES", nativeName: "Español" },
  { code: Languages.EN, label: "EN", nativeName: "English" },
];

const segmentBaseClass =
  "relative flex min-h-5 min-w-7 flex-1 items-center justify-center rounded-full px-1.5 py-px text-[8px] font-semibold uppercase tracking-[0.05em] sm:min-h-6 sm:min-w-8 sm:px-2 sm:py-0.5 sm:text-[9px]";

const indicatorTransition = {
  type: "spring" as const,
  stiffness: 420,
  damping: 36,
  mass: 0.55,
};

export default function LangSwitcher({ currentLanguage }: ILangSwitcherProps) {
  const pathname = usePathname();

  const hrefFor = (target: Locale) =>
    pathname.replace(`/${currentLanguage}`, `/${target}`);

  return (
    <LayoutGroup id="lang-switcher">
      <div
        className="inline-flex shrink-0 items-center rounded-full bg-white/55 p-px shadow-sm backdrop-blur-sm"
        role="group"
        aria-label="Site language"
      >
        {LOCALE_OPTIONS.map(({ code, label, nativeName }) => {
          const active = code === currentLanguage;

          const inner = (
            <>
              {active && (
                <motion.span
                  layoutId="lang-segment-indicator"
                  className="absolute inset-0 z-0 rounded-full bg-jazzberry-jam-600 shadow-sm"
                  transition={indicatorTransition}
                />
              )}
              <span
                className={`relative z-10 transition-colors duration-300 ease-out ${
                  active
                    ? "text-white"
                    : "text-jazzberry-jam-800 group-hover:text-jazzberry-jam-950"
                }`}
              >
                {label}
              </span>
            </>
          );

          if (active) {
            return (
              <span
                key={code}
                lang={code}
                aria-current="true"
                className={`${segmentBaseClass} cursor-default`}
              >
                {inner}
              </span>
            );
          }

          return (
            <Link
              key={code}
              href={hrefFor(code)}
              hrefLang={code}
              lang={code}
              prefetch={false}
              aria-label={`${nativeName} — switch language`}
              className={`group ${segmentBaseClass} text-jazzberry-jam-800 transition-colors duration-300 ease-out hover:bg-jazzberry-jam-200/55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-jazzberry-jam-600`}
            >
              {inner}
            </Link>
          );
        })}
      </div>
    </LayoutGroup>
  );
}
