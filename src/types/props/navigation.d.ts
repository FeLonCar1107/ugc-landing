import { ILanguage } from "@/types/language";
import { INavOption } from "@/types/nav-option";

interface IOption {
  title: string;
  url: string;
}

export interface INavigationProps {
  home: IOption;
  about: IOption;
  portfolio: IOption;
  contact: IOption;
  courses: IOption;
  ugc: IOption;
  nav_options: INavOption[];
  languages: ILanguage[];
  menu: {
    image: string;
  };
}
