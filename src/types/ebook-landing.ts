/** Shared copy shape for slug-based ebook / lead-magnet landings. */
export interface EbookLandingCopy {
  meta: { title: string; description: string };
  hero: {
    eyebrow: string;
    /** Large product / series title; part of it may sit behind the hero figure on desktop */
    productTitle: string;
    headline: string;
    subhead: string;
    cta: string;
    imageAlt: string;
    decorativeAlt: string;
  };
  problem: {
    eyebrow: string;
    title: string;
    cards: { title: string; body: string }[];
    cta: string;
  };
  solution: {
    title: string;
    giftHint: string;
    outcomes: { title: string; body: string }[];
    ctaTop: string;
    ctaBottom: string;
    imageAlt: string;
  };
  proof: {
    badge: string;
    headline: string;
    intro: string;
    timeline: { year: string; phase: string; bullets: string[] }[];
  };
  offer: {
    title: string;
    subtitle: string;
    priceHint: string;
    bonusesTitle: string;
    bonuses: string[];
    cta: string;
    supportNote: string;
    supportEmail: string;
  };
  faq: {
    introTitle: string;
    introBody: string;
    cta: string;
    items: { q: string; a: string }[];
  };
  close: {
    headline: string;
    body: string;
    cta: string;
    footnote: string;
  };
}
