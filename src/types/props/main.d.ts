import { INavigationProps } from "./navigation";
import { IHomeProps } from "./home";
import { IVideoProps } from "./videos";
import { ICollaborationsProps } from "./collaborations";
import { IPortafolioProps } from "./portafolio";
import { IAboutProps } from "./about";
import { IInstaFeedProps } from "./instafeed";
import { IUgcProps } from "./ugc";
import { IContactProps } from "./contact";
import { IFooterProps } from "./footer";
import { ISocialMediaProps } from "./social-media";

export interface IMainProps {
  navigation: INavigationProps;
  page: {
    home: IHomeProps;
    videos: IVideoProps;
    collaborations: ICollaborationsProps;
    portafolio: IPortafolioProps;
    about: IAboutProps;
    instaFeed: IInstaFeedProps;
    ugc: IUgcProps;
    contact: IContactProps;
    footer: IFooterProps;
    social: ISocialMediaProps;
  };
}