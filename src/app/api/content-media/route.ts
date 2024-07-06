const ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const url = `https://graph.instagram.com/me/media?fields=id,caption,permalink,media_type,media_url,preview_image_url,thumbnail_url,timestamp,username,children{id,media_type,media_url,thumbnail_url}&access_token=${ACCESS_TOKEN}&limit=${payload.limit}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.error) throw new Error(data.error);

    return Response.json({ data });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
