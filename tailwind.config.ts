import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
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
  plugins: [],
};
export default config;
