import { cookies } from "next/headers";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const DATA_DIR = path.join(process.cwd(), "data");
const CREDS_FILE = path.join(DATA_DIR, "admin-credentials.json");
const ADMIN_TOKEN_COOKIE = "ovi_admin_session";
const VALID_TOKEN = "ovi_admin_token_2026_secure";

export interface AdminCredentials {
  email: string;
  passwordHash: string;
  salt: string;
  updatedAt: string;
}

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

export function hashPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
}

export async function getAdminCredentials(): Promise<AdminCredentials> {
  ensureDataDir();

  if (fs.existsSync(CREDS_FILE)) {
    try {
      const content = await fs.promises.readFile(CREDS_FILE, "utf-8");
      return JSON.parse(content);
    } catch {
      // Fallback
    }
  }

  // Initial credentials from environment variables or defaults
  const email = process.env.ADMIN_EMAIL || "admin@ovifarms.com";
  const rawPassword = process.env.ADMIN_PASSWORD || "ovi@farms2026";
  const salt = crypto.randomBytes(16).toString("hex");
  const passwordHash = hashPassword(rawPassword, salt);

  const initialCreds: AdminCredentials = {
    email,
    passwordHash,
    salt,
    updatedAt: new Date().toISOString(),
  };

  try {
    const tempPath = `${CREDS_FILE}.${Date.now()}.tmp`;
    await fs.promises.writeFile(tempPath, JSON.stringify(initialCreds, null, 2), "utf-8");
    await fs.promises.rename(tempPath, CREDS_FILE);
  } catch (err) {
    console.warn("Could not save initial admin-credentials.json:", err);
  }

  return initialCreds;
}

export async function verifyAdminCredentials(inputEmail: string, inputPassword: string): Promise<boolean> {
  const creds = await getAdminCredentials();
  if (!inputEmail || !inputPassword) return false;
  if (creds.email.toLowerCase() !== inputEmail.trim().toLowerCase()) {
    return false;
  }
  const computedHash = hashPassword(inputPassword, creds.salt);
  return crypto.timingSafeEqual(Buffer.from(computedHash, "hex"), Buffer.from(creds.passwordHash, "hex"));
}

export async function updateAdminCredentials(
  newEmail: string,
  newPassword?: string
): Promise<{ success: boolean; email: string }> {
  ensureDataDir();
  const current = await getAdminCredentials();
  const email = newEmail && newEmail.trim() ? newEmail.trim() : current.email;

  let salt = current.salt;
  let passwordHash = current.passwordHash;

  if (newPassword && newPassword.trim().length > 0) {
    salt = crypto.randomBytes(16).toString("hex");
    passwordHash = hashPassword(newPassword.trim(), salt);
  }

  const updatedCreds: AdminCredentials = {
    email,
    passwordHash,
    salt,
    updatedAt: new Date().toISOString(),
  };

  const tempPath = `${CREDS_FILE}.${Date.now()}.tmp`;
  await fs.promises.writeFile(tempPath, JSON.stringify(updatedCreds, null, 2), "utf-8");
  await fs.promises.rename(tempPath, CREDS_FILE);

  return { success: true, email };
}

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
