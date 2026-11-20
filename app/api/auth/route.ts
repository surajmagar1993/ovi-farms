import { NextRequest, NextResponse } from "next/server";
import {
  isAuthenticated,
  setAdminSession,
  clearAdminSession,
  verifyAdminCredentials,
  updateAdminCredentials,
  getAdminCredentials,
} from "@/lib/auth";

export async function GET() {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ authenticated: false });
  }
  const creds = await getAdminCredentials();
  return NextResponse.json({ authenticated: true, adminEmail: creds.email });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, email, password, currentPassword, newEmail, newPassword } = body;

    // 1. LOGOUT
    if (action === "logout") {
      await clearAdminSession();
      return NextResponse.json({ success: true, message: "Logged out" });
    }

    // 2. UPDATE CREDENTIALS (AUTHENTICATED)
    if (action === "update-credentials") {
      const authed = await isAuthenticated();
      if (!authed) {
        return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
      }

      if (!currentPassword) {
        return NextResponse.json({ error: "Current password is required to make security changes." }, { status: 400 });
      }

      const creds = await getAdminCredentials();
      const isValid = await verifyAdminCredentials(creds.email, currentPassword);
      if (!isValid) {
        return NextResponse.json({ error: "Current password does not match." }, { status: 400 });
      }

      if (newPassword && newPassword.trim().length < 6) {
        return NextResponse.json({ error: "New password must be at least 6 characters." }, { status: 400 });
      }

      const updated = await updateAdminCredentials(newEmail || creds.email, newPassword);
      return NextResponse.json({
        success: true,
        message: "Admin credentials successfully updated!",
        email: updated.email,
      });
    }

    // 3. LOGIN
    const isValid = await verifyAdminCredentials(email, password);
    if (isValid) {
      await setAdminSession();
      return NextResponse.json({ success: true, message: "Authentication successful" });
    }

    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Authentication error" }, { status: 500 });
  }
}
