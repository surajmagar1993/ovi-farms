import { NextRequest, NextResponse } from "next/server";
import { getPlots, updatePlotStatus } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  const plots = await getPlots();
  return NextResponse.json({ success: true, plots });
}

export async function PATCH(req: NextRequest) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { plotId, status } = await req.json();
    if (!plotId || !["available", "reserved", "sold"].includes(status)) {
      return NextResponse.json({ error: "Invalid plotId or status" }, { status: 400 });
    }

    const updatedPlots = await updatePlotStatus(plotId, status);
    return NextResponse.json({ success: true, plots: updatedPlots });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update plot" }, { status: 500 });
  }
}
