import { database } from "@/utils/firebase";
import { ref, child, get } from "firebase/database";

const ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;

export async function GET() {
  try {
    let data: {
      id: string;
      username: string;
      account_type: string;
      media_count: number;
      profile_picture: string;
    } = {
      id: "",
      username: "",
      account_type: "",
      media_count: 0,
      profile_picture: "",
    };
    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, `/instagram/userPictureProfile`));

    if (snapshot.exists()) {
      const profile_picture = snapshot.val();
      data.profile_picture = profile_picture;
    }

    const url = `https://graph.instagram.com/me?fields=id,username,account_type,media_count&access_token=${ACCESS_TOKEN}`;
    const response = await fetch(url);
    const result = await response.json();
    if (result.error) throw new Error(result.error);

    data.id = result.id;
    data.username = result.username;
    data.account_type = result.account_type;
    data.media_count = result.media_count;

    return Response.json({ data });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
