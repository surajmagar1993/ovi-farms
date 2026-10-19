import { NextRequest, NextResponse } from "next/server";
import { getPlots, updatePlotStatus, updatePlot, addPlot, deletePlot } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  const plots = await getPlots();
  return NextResponse.json({ success: true, plots });
}

export async function POST(req: NextRequest) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const plotData = await req.json();
    if (!plotData.plotNumber || !plotData.sector) {
      return NextResponse.json({ error: "Plot number and sector are required" }, { status: 400 });
    }

    const updatedPlots = await addPlot(plotData);
    return NextResponse.json({ success: true, plots: updatedPlots, message: "Plot created successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to add plot" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const plotData = await req.json();
    if (!plotData.id) {
      return NextResponse.json({ error: "Plot ID is required" }, { status: 400 });
    }

    const updatedPlots = await updatePlot(plotData);
    return NextResponse.json({ success: true, plots: updatedPlots, message: "Plot updated successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update plot" }, { status: 500 });
  }
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
    return NextResponse.json({ error: error.message || "Failed to update plot status" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const { searchParams } = new URL(req.url);
    const plotId = body.plotId || searchParams.get("id");

    if (!plotId) {
      return NextResponse.json({ error: "Plot ID is required for deletion" }, { status: 400 });
    }

    const updatedPlots = await deletePlot(Number(plotId));
    return NextResponse.json({ success: true, plots: updatedPlots, message: "Plot deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete plot" }, { status: 500 });
  }
}
