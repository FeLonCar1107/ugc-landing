import Instagram from "@/components/svg/social-media/Instagram";
import Facebook from "@/components/svg/social-media/Facebook";
import TikTok from "@/components/svg/social-media/TikTok";
export default function SocialFixed() {
  return (
    <div className="w-fit h-screen fixed right-0 top-0 flex flex-col items-center justify-center gap-3 px-5 z-50">
      <Instagram url="https://www.instagram.com/" size={22} />
      <TikTok url="https://www.tiktok.com/" size={22} />
      <Facebook url="https://www.facebook.com/" size={22} />
    </div>
  );
}
