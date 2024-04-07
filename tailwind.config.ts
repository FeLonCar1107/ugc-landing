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
        black: "#141414",
        chartTruth: "#EAFC88",
        coolWhip: "#FFFEEC",
        laughyTaffy: "#EDB5F7",
        lavenDuhi: "#BDB4FF",
        peachyKeen: "#FFB985",
        white: "#FFFFFF",
      },
      fontFamily: {
        BeckanPersonal: ["Beckan-Personal-Use", "sans-serif"],
      },
    },
  },
  plugins: [
    require("postcss-import"),
    require("tailwindcss"),
    require("autoprefixer"),
  ],
};
export default config;
