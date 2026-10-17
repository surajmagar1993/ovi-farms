import { cookies } from "next/headers";

const ADMIN_TOKEN_COOKIE = "ovi_admin_session";
const VALID_TOKEN = "ovi_admin_token_2026_secure";

// Default admin credentials (can be overridden via environment variables)
export const DEFAULT_ADMIN_EMAIL = "admin@ovifarms.com";
export const DEFAULT_ADMIN_PASSWORD = "ovi@farms2026";

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_TOKEN_COOKIE)?.value;
  return token === VALID_TOKEN;
}

export async function setAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_TOKEN_COOKIE, VALID_TOKEN, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_TOKEN_COOKIE);
}
