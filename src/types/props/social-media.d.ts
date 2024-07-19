export interface ISocialMediaProps {
  title: string;
  content: {
    instagram: {
      name: string;
      url: string;
    };
    facebook: {
      name: string;
      url: string;
    };
    tikTok: {
      name: string;
      url: string;
    };
    whatsApp: {
      name: string;
      url: string;
    };
  };
}
