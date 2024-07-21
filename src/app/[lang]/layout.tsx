import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Locale, i18n } from "@/i18n/config";
import "locomotive-scroll/dist/locomotive-scroll.css";
import "../../styles/globals.css";
import "../../styles/tailwind.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export async function getStaticParams() {
  return i18n.locales.map((lang) => ({ params: { lang } }));
}

export const metadata: Metadata = {
  title: {
    default: "Isabella Lizarralde Arias",
    template: "%s | Isabella Lizarralde Arias",
  },
  description:
    "Descubre el portafolio de Isabella Lizarralde Arias: proyectos innovadores, videos creativos, fotos y detalles de contacto. Explora ahora y conoce el talento detrás de cada proyecto.",
  keywords: [
    "Isabella Lizarralde Arias",
    "portafolio",
    "videos creativos",
    "fotos",
    "ugc",
    "proyectos",
    "contacto",
  ],
  authors: [
    {
      name: "Felipe Londoño Cardona",
      url: "https://www.linkedin.com/in/felipelondo%C3%B1ocardona/",
    },
  ],
  openGraph: {
    type: "website",
    url: process.env.NEXT_PUBLIC_BASE_URL,
    title: "Isabella Lizarralde Arias",
    description:
      "Descubre el portafolio de Isabella Lizarralde Arias: proyectos innovadores, videos creativos, fotos impactantes y detalles de contacto.",
    images: [
      {
        url: "https://static.wixstatic.com/media/655690_74ce8f138f3e4a42ab59547aeafc628c~mv2.webp",
        width: 800,
        height: 600,
        alt: "Isabella Lizarralde Arias",
      },
    ],
  },
};

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  return (
    <html lang={params.lang}>
      <body className={inter.className}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
