import LandingScrollRoot from "@/components/landings/ebook/LandingScrollRoot";

export default function LandingSlugLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <LandingScrollRoot>{children}</LandingScrollRoot>;
}
