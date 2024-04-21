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
        xBlack: "#141414",
        xChartTruth: "#EAFC88",
        xCoolWhip: "#FFFEEC",
        xLaughyTaffy: "#EDB5F7",
        xLavenDuhi: "#BDB4FF",
        xPeachyKeen: "#FFB985",
        xWhite: "#FFFFFF",
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
