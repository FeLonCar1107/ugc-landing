import Instagram from "@/components/svg/social-media/Instagram";
import Facebook from "@/components/svg/social-media/Facebook";
import TikTok from "@/components/svg/social-media/TikTok";
import { ISocialMediaProps } from "@/types/social-media";

export default function SocialFixed(props: ISocialMediaProps) {
  const { content } = props.data;

  return (
    <div className="bg-transparent w-fit h-screen fixed right-0 top-0 flex flex-col items-center justify-center gap-3 pl-2 pr-5 z-50">
      <Instagram url={content.instagram.url} color="#530424" size={22} />
      <TikTok url={content.tikTok.url} color="#530424" size={22} />
      <Facebook url={content.facebook.url} color="#530424" size={22} />
    </div>
  );
}
