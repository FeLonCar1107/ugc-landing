import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /** Marketing / ebook palette — values driven by `globals.css` `:root` */
        landing: {
          page: "rgb(var(--landing-page-bg-rgb) / <alpha-value>)",
        },
        brand: {
          ink: "rgb(var(--brand-ink-rgb) / <alpha-value>)",
          surface: "rgb(var(--brand-surface-rgb) / <alpha-value>)",
          card: "rgb(var(--brand-card-rgb) / <alpha-value>)",
          accent: "rgb(var(--brand-accent-rgb) / <alpha-value>)",
          "accent-mid": "rgb(var(--brand-accent-mid-rgb) / <alpha-value>)",
          "accent-deep": "rgb(var(--brand-accent-deep-rgb) / <alpha-value>)",
          blush: "rgb(var(--brand-blush-rgb) / <alpha-value>)",
          rose: "rgb(var(--brand-rose-rgb) / <alpha-value>)",
          warm: "rgb(var(--brand-warm-rgb) / <alpha-value>)",
          "cutout-from": "rgb(var(--brand-cutout-from-rgb) / <alpha-value>)",
          "cutout-via": "rgb(var(--brand-cutout-via-rgb) / <alpha-value>)",
          "cutout-to": "rgb(var(--brand-cutout-to-rgb) / <alpha-value>)",
          "shadow-tint": "rgb(var(--brand-shadow-tint-rgb) / <alpha-value>)",
        },
        xBlack: "#141517",
        xChartTruth: "#EAFC88",
        xCoolWhip: "#FFFEEC",
        xLaughyTaffy: "#EDB5F7",
        xLavenDuhi: "#BDB4FF",
        xPeachyKeen: "#FFB985",
        xWhite: "#FFFFFF",
        "jazzberry-jam": {
          "50": "#fdf2f8",
          "100": "#fde6f3",
          "200": "#fdcde9",
          "300": "#fca5d5",
          "400": "#f96db8",
          "500": "#f3419c",
          "600": "#e22079", // Primary color
          "700": "#c5115f",
          "800": "#9c114b",
          "900": "#871444",
          "950": "#530424",
        },
      },
      fontFamily: {
        BeckanPersonal: ["Beckan-Personal-Use", "sans-serif"],
      },
      padding: {
        micro: "0.125rem",
        small: "0.25rem",
        medium: "0.5rem",
        large: "1rem",
        xLarge: "60px",
      },
    },
  },
  plugins: [
    plugin(({ addComponents, theme }) => {
      addComponents({
        /** Matches section h2 in About: fluid size + uppercase tracking */
        ".tw-section-heading": {
          fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
          lineHeight: "1.05",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
        },
        ".section-shell": {
          marginLeft: "auto",
          marginRight: "auto",
          width: "100%",
          maxWidth: theme("maxWidth.6xl"),
          paddingLeft: theme("spacing.4"),
          paddingRight: theme("spacing.4"),
          "@screen sm": {
            paddingLeft: theme("spacing.6"),
            paddingRight: theme("spacing.6"),
          },
          "@screen md": {
            paddingLeft: "2.5rem",
            paddingRight: "2.5rem",
          },
          "@screen lg": {
            paddingLeft: theme("spacing.12"),
            paddingRight: theme("spacing.12"),
          },
          /* Below lg: equal extra inset on both sides (balance + clearance vs fixed social rail) */
          "@media (max-width: 639px)": {
            paddingLeft: `calc(${theme("spacing.4")} + 1.25rem)`,
            paddingRight: `calc(${theme("spacing.4")} + 1.25rem)`,
          },
          "@media (min-width: 640px) and (max-width: 767px)": {
            paddingLeft: `calc(${theme("spacing.6")} + 1.25rem)`,
            paddingRight: `calc(${theme("spacing.6")} + 1.25rem)`,
          },
          "@media (min-width: 768px) and (max-width: 1023px)": {
            paddingLeft: `calc(2.5rem + 1.25rem)`,
            paddingRight: `calc(2.5rem + 1.25rem)`,
          },
        },
        /** Small label above section titles (About, reviews, …) */
        ".tw-eyebrow": {
          fontSize: "11px",
          fontWeight: "500",
          textTransform: "uppercase",
          letterSpacing: "0.35em",
          color: theme("colors.jazzberry-jam.900"),
        },
        /** Primary section titles on light backgrounds (matches hero h1: jazzberry-jam-900) */
        ".tw-text-heading": {
          color: theme("colors.jazzberry-jam.900"),
        },
        /** Soft accent copy (hero meta, watermarks) */
        ".tw-text-soft": {
          color: theme("colors.jazzberry-jam.300"),
        },
        /**
         * Vertical rhythm: top = nav clearance + small gutter (`--section-top-gutter`).
         * Bottom keeps the previous soft section spacing.
         */
        ".tw-section-y": {
          paddingTop: "calc(var(--navbar-height) + var(--section-top-gutter))",
          paddingBottom: "clamp(2.5rem, 6vw, 5rem)",
        },
        /** Tighter bottom band; same top title band as `.tw-section-y`. */
        ".tw-section-y-compact": {
          paddingTop: "calc(var(--navbar-height) + var(--section-top-gutter))",
          paddingBottom: "clamp(2rem, 4vw, 3.5rem)",
        },
        /**
         * Stacked section (e.g. Collabs right after Videos): no repeated nav-height on
         * padding-top — previous section + scroll offset already clear the fixed bar.
         */
        ".tw-section-y-stack": {
          paddingTop: "clamp(1rem, 2.8vw, 2rem)",
          paddingBottom: "clamp(2rem, 4vw, 3.5rem)",
        },
        /** Long-form copy on light surfaces */
        ".tw-body-readable": {
          fontSize: "13px",
          lineHeight: "1.65",
          color: "rgba(83, 4, 36, 0.9)",
          "@screen md": {
            fontSize: "0.95rem",
          },
        },
        /** Image / video loading skeleton */
        ".tw-media-placeholder": {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme("colors.jazzberry-jam.100"),
        },
        /** Title band (Videos): blush surface + ink text */
        ".tw-band-soft": {
          borderRadius: theme("borderRadius.2xl"),
          backgroundColor: `rgb(var(--brand-blush-rgb) / 0.94)`,
          color: `rgb(var(--brand-ink-rgb) / 0.9)`,
          boxShadow: "0 1px 2px rgb(var(--brand-shadow-tint-rgb) / 0.08)",
        },
        /** Hover: opacity only (no scale) — minimal motion */
        ".tw-soft-interactive": {
          transitionProperty: "opacity, color",
          transitionDuration: "300ms",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            opacity: "0.88",
          },
        },
        /** Primary CTA — rounded, soft */
        ".tw-btn-primary-soft": {
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          height: theme("spacing.11"),
          minWidth: "10rem",
          paddingLeft: theme("spacing.6"),
          paddingRight: theme("spacing.6"),
          fontSize: theme("fontSize.sm"),
          fontWeight: "500",
          borderRadius: theme("borderRadius.lg"),
          backgroundColor: theme("colors.jazzberry-jam.500"),
          color: theme("colors.white"),
          transitionProperty: "background-color, opacity",
          transitionDuration: "300ms",
          "&:hover": {
            backgroundColor: theme("colors.jazzberry-jam.600"),
          },
        },
        /** Mobile stacked letters in CustomerReviews */
        ".tw-section-heading-split": {
          fontSize: "clamp(1.75rem, 6vw, 2.25rem)",
          fontWeight: "700",
          textTransform: "uppercase",
          lineHeight: "1",
          letterSpacing: "0.08em",
          color: theme("colors.jazzberry-jam.900"),
        },
        /** Contact: same title inset as `.tw-section-y` */
        ".tw-contact-shell": {
          paddingTop: "calc(var(--navbar-height) + var(--section-top-gutter))",
        },
      });
    }),
  ],
};
export default config;
