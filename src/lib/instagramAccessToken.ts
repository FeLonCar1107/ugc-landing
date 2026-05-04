import { getAdminDatabase, INSTAGRAM_TOKEN_RTDB_PATH } from "@/lib/firebaseAdmin";

/**
 * Long-lived Instagram user token: Firebase (after first refresh) or INSTAGRAM_ACCESS_TOKEN.
 */
export async function getInstagramAccessToken(): Promise<string | undefined> {
  const db = getAdminDatabase();
  if (db) {
    const snap = await db.ref(`${INSTAGRAM_TOKEN_RTDB_PATH}/accessToken`).once("value");
    const v = snap.val();
    if (typeof v === "string" && v.trim().length > 0) return v.trim();
  }
  const fromEnv = process.env.INSTAGRAM_ACCESS_TOKEN;
  return typeof fromEnv === "string" && fromEnv.trim().length > 0
    ? fromEnv.trim()
    : undefined;
}
