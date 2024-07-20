export interface IActionButton {
  title: string;
  url?: string;
}

export interface IInstaFeedProps {
  title: string;
  subtitle: string;
  buttons: {
    loadMore: IActionButton;
    follow: IActionButton;
  };
}
