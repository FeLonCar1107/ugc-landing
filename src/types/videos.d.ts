export interface IVideo {
  id: string;
  title: string;
  description: string;
  preview: string;
  src: string;
}

export interface IVideosProps {
  data: {
    title: string;
    splitTitle: string[];
    content: {
      videos: IVideo[];
    };
  };
}
