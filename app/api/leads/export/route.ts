import { NextRequest, NextResponse } from "next/server";
import { getLeads, generateLeadsExcelBuffer, generateLeadsCsvBuffer } from "@/lib/db";
import { generateLeadsPdfBuffer } from "@/lib/pdf";
import { isAuthenticated } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized access to lead logs." }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const format = (searchParams.get("format") || "xlsx").toLowerCase();
  const dateStamp = new Date().toISOString().slice(0, 10);

  try {
    // 1. PDF EXPORT
    if (format === "pdf") {
      const leads = await getLeads();
      const pdfBuffer = await generateLeadsPdfBuffer(leads);
      const filename = `OVI_FARMS_Leads_Report_${dateStamp}.pdf`;

      return new NextResponse(new Uint8Array(pdfBuffer), {
        status: 200,
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="${filename}"`,
          "Content-Length": pdfBuffer.length.toString(),
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      });
    }

    // 2. CSV EXPORT
    if (format === "csv") {
      const csvContent = await generateLeadsCsvBuffer();
      const filename = `OVI_FARMS_Customer_Leads_${dateStamp}.csv`;

      return new NextResponse(csvContent, {
        status: 200,
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="${filename}"`,
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      });
    }

    // 3. EXCEL (.xlsx) EXPORT (DEFAULT)
    const excelBuffer = await generateLeadsExcelBuffer();
    const filename = `OVI_FARMS_Customer_Leads_${dateStamp}.xlsx`;

    return new NextResponse(new Uint8Array(excelBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": excelBuffer.length.toString(),
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to generate export file: " + (error?.message || "Internal error") },
      { status: 500 }
    );
  }
}
