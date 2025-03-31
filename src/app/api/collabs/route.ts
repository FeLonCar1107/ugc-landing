import { database } from "@/utils/firebase";
import { ref, child, get } from "firebase/database";

export async function GET() {
  try {
    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, `/collabs`));

    if (snapshot.exists()) {
      const data = snapshot.val();
      return new Response(JSON.stringify({ data }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ error: "No data available" }), {
        status: 404,
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
}
