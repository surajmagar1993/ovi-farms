import { NextRequest, NextResponse } from "next/server";
import { getLeads, addLead } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const leads = await getLeads();
  return NextResponse.json({ success: true, leads });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, type, plotInterest, preferredDate, preferredSlot, cabPickup, notes } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: "Name and Phone Number are required." }, { status: 400 });
    }

    const lead = await addLead({
      name,
      phone,
      email: email || "",
      type: type || "General Inquiry",
      plotInterest: plotInterest || "General",
      preferredDate: preferredDate || "",
      preferredSlot: preferredSlot || "",
      cabPickup: cabPickup || "No",
      notes: notes || "",
    });

    return NextResponse.json({ success: true, lead });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to process inquiry." }, { status: 500 });
  }
}
