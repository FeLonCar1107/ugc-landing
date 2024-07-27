import { INavigationProps } from "./navigation";
import { IHomeProps } from "./home";
import { IVideoProps } from "./videos";
import { ICollaborationsProps } from "./collaborations";
import { IPortfolioProps } from "./portfolio";
import { IAboutProps } from "./about";
import { IInstaFeedProps } from "./instafeed";
import { IUgcProps } from "./ugc";
import { ICustomerReviewsProps } from "./customer-reviews";
import { IContactProps } from "./contact";
import { IFooterProps } from "./footer";
import { ISocialMediaProps } from "./social-media";

export interface IMainProps {
  navigation: INavigationProps;
  page: {
    home: IHomeProps;
    videos: IVideoProps;
    collaborations: ICollaborationsProps;
    portfolio: IPortfolioProps;
    about: IAboutProps;
    instaFeed: IInstaFeedProps;
    ugc: IUgcProps;
    customerReviews: ICustomerReviewsProps;
    contact: IContactProps;
    footer: IFooterProps;
    social: ISocialMediaProps;
  };
}
