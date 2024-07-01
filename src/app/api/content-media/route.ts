const ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const url = `https://graph.instagram.com/me/media?fields=caption,permalink,media_type,media_url&access_token=${ACCESS_TOKEN}&limit=${payload.limit}`;
    const response = await fetch(url);
    const data = await response.json();

    return Response.json({ data });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
