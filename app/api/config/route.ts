import { NextRequest, NextResponse } from "next/server";
import { getSiteConfig, updateSiteConfig } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  const config = await getSiteConfig();
  return NextResponse.json({ success: true, config });
}

export async function PUT(req: NextRequest) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const updated = await updateSiteConfig(body);
    return NextResponse.json({ success: true, config: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update config" }, { status: 500 });
  }
}
