export interface IAboutProps {
  title: string;
  subtitle: string;
  content: {
    hello: string;
    image: {
      src: string;
      alt: string;
    };
    description: {
      paragraph1: string;
      paragraph2: string;
      paragraph3: string;
    };
    whyWorkWithMeTitle: string;
    reasons: { title: string; description: string }[];
    experienceTitle: string;
    experience: {
      brandsTrustedLabel: string;
      yearsCreatingLabel: string;
      yearsUgcLabel: string;
      yearsCreatingValue: string;
      yearsUgcValue: string;
    };
    toolsTitle: string;
    tools: string[];
    socialProofTitle: string;
    socialStats: { platform: string; followers: string; url: string }[];
    birth: {
      name: string;
      lastName: string;
      prefix: string;
      day: number;
      month: string;
      year: number;
    };
  };
}
