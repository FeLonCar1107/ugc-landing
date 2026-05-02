import { Inter, Montserrat, Playfair_Display } from "next/font/google";

export const inter = Inter({ subsets: ["latin"] });

export const montserrat = Montserrat({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

/** Editorial serif for landing heroes (paired with Montserrat body UI). */
export const playfairDisplay = Playfair_Display({
  weight: ["600", "700"],
  subsets: ["latin"],
  display: "swap",
});
