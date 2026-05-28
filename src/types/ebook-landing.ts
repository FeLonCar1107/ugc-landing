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
    /** Short trust-signal line rendered below the hero CTA (e.g. "Acceso inmediato · Pago seguro"). */
    ctaMicrocopy?: string;
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
    /**
     * Optional split title: draws highlight with a scribble oval asset behind it.
     * When omitted, render plain title.
     */
    titleHighlight?: {
      before: string;
      highlight: string;
      after: string;
    };
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
    /** Visible band title above the conversion stack (access / bundle framing). */
    sectionTitle: string;
    hero: {
      /** Launch framing; v1 expects two strings (rendered as pills). */
      badges: string[];
      statement: string;
      imageAlt: string;
    };
    valueStack: {
      lineItems: Array<{
        id: string;
        label: string;
        anchorValueLabel: string;
      }>;
      totalLabel: string;
      totalAnchorLabel: string;
      youPayLabel: string;
    };
    bonusesSectionTitle: string;
    bonuses: Array<{
      /**
       * Show this bonus in the grid and include its value-stack row (default: on).
       * Set false to hide without removing copy from the file.
       */
      enabled?: boolean;
      /** Links to valueStack.lineItems[].id (default: b1, b2, by array index). */
      valueStackId?: string;
      imageFile: string;
      imageAlt: string;
      painHeadline: string;
      outcomeBenefit: string;
    }>;
    urgency: {
      title: string;
      bullets: string[];
      /** When set and NEXT_PUBLIC_LAUNCH_*_BONUS_BUNDLE_DEADLINE_ISO is valid, {date} is replaced. */
      deadlineLineTemplate?: string;
    };
    ctaPrimary: string;
    /** Shown when priceUsd env is empty (same behavior as legacy priceHint). */
    priceHint: string;
    /** Short risk-reversal line shown near the price (e.g. refund policy hint). */
    guaranteeHint?: string;
    /** Short trust-signal line rendered below the offer CTA. */
    ctaMicrocopy?: string;
    /** 3-step post-purchase micro-flow rendered below the offer CTA. */
    postPurchaseSteps?: string[];
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
    /** Short trust-signal line rendered below the close CTA. */
    ctaMicrocopy?: string;
    footnote: string;
  };
  /** Optional narrative bridges rendered between sections. */
  transitions?: {
    /** Italic sentence between Problem and Solution sections. */
    problemToSolution?: string;
    /** Italic sentence between Proof and Offer sections. */
    proofToOffer?: string;
  };
  /** When present, an exit-intent overlay is enabled for this landing. */
  exitIntent?: {
    headline: string;
    body: string;
    cta: string;
    dismiss: string;
  };
}
