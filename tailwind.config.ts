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
      });
    }),
  ],
};
export default config;
