import { IInstagramMediaResponse } from "@/types/responses/instagram-media";

const ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;

interface ChildrenRes {
  id: string;
  media_type: string;
  media_url: string;
  thumbnail_url: string;
}

interface InstagramRes {
  id: string;
  caption: string;
  permalink: string;
  media_type: string;
  media_url: string;
  thumbnail_url: string;
  timestamp: string;
  username: string;
  children: {
    data: ChildrenRes[];
  };
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const url = `https://graph.instagram.com/me/media?fields=id,caption,permalink,media_type,media_url,thumbnail_url,timestamp,username,children{id,media_type,media_url,thumbnail_url}&access_token=${ACCESS_TOKEN}&limit=${payload.limit}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.error) throw data.error;

    const formattedData: IInstagramMediaResponse[] = data.data.map(
      (item: InstagramRes) => {
        return {
          id: item.id,
          caption: item.caption,
          instaLink: item.permalink,
          type: item.media_type,
          url: item.media_url,
          preview: item.thumbnail_url,
          date: item.timestamp,
          username: item.username,
          children: item.children?.data.map((child: ChildrenRes) => {
            return {
              id: child.id,
              type: child.media_type,
              url: child.media_url,
              preview: child.thumbnail_url,
            };
          }),
        };
      },
    );

    return Response.json({ data: formattedData });
  } catch (error) {
    return Response.json({ error, data: [] }, { status: 500 });
  }
}
