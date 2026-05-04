import admin from "firebase-admin";

/** RTDB path written by cron; Admin SDK bypasses security rules. */
export const INSTAGRAM_TOKEN_RTDB_PATH = "internal/instagram";

function tryInit(): void {
  if (admin.apps.length > 0) return;
  const json = process.env.FIREBASE_SERVICE_ACCOUNT;
  const databaseURL = process.env.REACT_APP_FIREBASE_DATABASE_URL;
  if (!json || !databaseURL) return;
  try {
    const serviceAccount = JSON.parse(json) as admin.ServiceAccount;
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL,
    });
  } catch {
    // Invalid JSON or credentials — leave uninitialized; env token fallback applies.
  }
}

export function getAdminDatabase(): admin.database.Database | null {
  tryInit();
  if (!admin.apps.length) return null;
  return admin.database();
}
