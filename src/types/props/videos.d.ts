import { IVideo } from "@/types/video";

export interface IVideosProps {
  title: string;
  splitTitle: string[];
  content: {
    videos: IVideo[];
  };
}
