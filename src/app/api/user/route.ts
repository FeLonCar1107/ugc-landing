import { IInstagramUserResponse } from "@/types/responses/instagram-user";

const ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;

export async function GET() {
  try {
    const url = `https://graph.instagram.com/me?fields=id,username,account_type,media_count,profile_picture_url&access_token=${ACCESS_TOKEN}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.error) throw new Error(data.error);
    const formattedData: IInstagramUserResponse = {
      id: data.id,
      username: data.username,
      accountType: data.account_type,
      mediaCount: data.media_count,
      profilePictureUrl: data.profile_picture_url,
    };

    return Response.json({ data: formattedData });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
