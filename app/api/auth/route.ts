import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated, setAdminSession, clearAdminSession, DEFAULT_ADMIN_EMAIL, DEFAULT_ADMIN_PASSWORD } from "@/lib/auth";

export async function GET() {
  const authed = await isAuthenticated();
  return NextResponse.json({ authenticated: authed });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, email, password } = body;

    if (action === "logout") {
      await clearAdminSession();
      return NextResponse.json({ success: true, message: "Logged out" });
    }

    if (email === DEFAULT_ADMIN_EMAIL && password === DEFAULT_ADMIN_PASSWORD) {
      await setAdminSession();
      return NextResponse.json({ success: true, message: "Authentication successful" });
    }

    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Authentication error" }, { status: 500 });
  }
}
