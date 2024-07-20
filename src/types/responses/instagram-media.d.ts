export interface IChildrenMedia {
  id: string;
  type: string;
  url: string;
  thumbnailUrl: string;
}

export interface IInstagramMediaResponse {
  id: string;
  caption: string;
  instaLink: string;
  type: string;
  url: string;
  preview: string;
  date: string;
  children: IChildrenMedia[];
  username: string;
}
