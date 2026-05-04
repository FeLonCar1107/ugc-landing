import { getAdminDatabase, INSTAGRAM_TOKEN_RTDB_PATH } from "@/lib/firebaseAdmin";
import { getInstagramAccessToken } from "@/lib/instagramAccessToken";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const REFRESH_URL = "https://graph.instagram.com/refresh_access_token";

function authorize(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  const auth = request.headers.get("authorization");
  return auth === `Bearer ${secret}`;
}

export async function GET(request: Request) {
  if (!authorize(request)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = getAdminDatabase();
  if (!db) {
    return Response.json(
      {
        error:
          "Firebase Admin not configured (set FIREBASE_SERVICE_ACCOUNT + REACT_APP_FIREBASE_DATABASE_URL).",
      },
      { status: 503 },
    );
  }

  const current = await getInstagramAccessToken();
  if (!current) {
    return Response.json(
      { error: "No token: set INSTAGRAM_ACCESS_TOKEN or run after seeding RTDB." },
      { status: 503 },
    );
  }

  const url = new URL(REFRESH_URL);
  url.searchParams.set("grant_type", "ig_refresh_token");
  url.searchParams.set("access_token", current);

  const igRes = await fetch(url.toString(), { method: "GET" });
  const body = (await igRes.json()) as {
    access_token?: string;
    expires_in?: number;
    error?: { message?: string; type?: string };
  };

  if (!igRes.ok || body.error || !body.access_token) {
    return Response.json(
      {
        error: "Instagram refresh failed",
        details: body.error ?? body,
      },
      { status: 502 },
    );
  }

  const now = Date.now();
  await db.ref(INSTAGRAM_TOKEN_RTDB_PATH).set({
    accessToken: body.access_token,
    refreshedAt: now,
    expiresIn: body.expires_in ?? null,
  });

  return Response.json({
    ok: true,
    refreshedAt: now,
    expiresIn: body.expires_in ?? null,
  });
}
