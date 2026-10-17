import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export interface CustomerLeadPdfItem {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  email?: string;
  type?: string;
  plotInterest?: string;
  preferredDate?: string;
  preferredSlot?: string;
  cabPickup?: string;
  status?: string;
  notes?: string;
}

export async function generateLeadsPdfBuffer(leads: CustomerLeadPdfItem[]): Promise<Buffer> {
  const pdfDoc = await PDFDocument.create();
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // A4 Landscape: 841.89 x 595.28 points
  const pageWidth = 841.89;
  const pageHeight = 595.28;
  const margin = 40;

  // Colors
  const darkGreen = rgb(7 / 255, 29 / 255, 23 / 255);
  const gold = rgb(212 / 255, 175 / 255, 55 / 255);
  const charcoal = rgb(30 / 255, 41 / 255, 59 / 255);
  const textMuted = rgb(100 / 255, 116 / 255, 139 / 255);
  const white = rgb(1, 1, 1);
  const lightBg = rgb(248 / 255, 250 / 255, 252 / 255);
  const borderGray = rgb(226 / 255, 232 / 255, 240 / 255);

  const rowsPerPage = 11;
  const totalPages = Math.max(1, Math.ceil(leads.length / rowsPerPage));

  // Column definitions
  const columns = [
    { title: "LEAD ID", width: 75, key: "id" },
    { title: "DATE & TIME", width: 105, key: "date" },
    { title: "NAME & CONTACT", width: 155, key: "contact" },
    { title: "INQUIRY TYPE & PLOT", width: 175, key: "inquiry" },
    { title: "VISIT / CAB DETAILS", width: 145, key: "visit" },
    { title: "STATUS", width: 105, key: "status" },
  ];

  for (let pageIdx = 0; pageIdx < totalPages; pageIdx++) {
    const page = pdfDoc.addPage([pageWidth, pageHeight]);
    let y = pageHeight - margin;

    // Header Banner
    page.drawRectangle({
      x: margin,
      y: y - 55,
      width: pageWidth - margin * 2,
      height: 55,
      color: darkGreen,
    });

    // Gold accent top line
    page.drawRectangle({
      x: margin,
      y: y - 3,
      width: pageWidth - margin * 2,
      height: 3,
      color: gold,
    });

    // Brand Title
    page.drawText("OVI FARMS — Managed Farmland Estates", {
      x: margin + 15,
      y: y - 26,
      size: 16,
      font: fontBold,
      color: gold,
    });

    page.drawText("CONFIDENTIAL CUSTOMER LEADS & SITE VISIT REGISTER", {
      x: margin + 15,
      y: y - 44,
      size: 8.5,
      font: fontRegular,
      color: rgb(200 / 255, 220 / 255, 210 / 255),
    });

    // Generation timestamp on right of banner
    const dateStr = new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    page.drawText(`Generated: ${dateStr}`, {
      x: pageWidth - margin - 180,
      y: y - 24,
      size: 9,
      font: fontRegular,
      color: white,
    });
    page.drawText(`Total Inquiries: ${leads.length} | Page ${pageIdx + 1} of ${totalPages}`, {
      x: pageWidth - margin - 180,
      y: y - 42,
      size: 8.5,
      font: fontRegular,
      color: gold,
    });

    y -= 75;

    // Table Header Row
    page.drawRectangle({
      x: margin,
      y: y - 24,
      width: pageWidth - margin * 2,
      height: 24,
      color: rgb(15 / 255, 59 / 255, 48 / 255),
    });

    let currentX = margin + 10;
    for (const col of columns) {
      page.drawText(col.title, {
        x: currentX,
        y: y - 16,
        size: 8,
        font: fontBold,
        color: white,
      });
      currentX += col.width;
    }

    y -= 24;

    // Table Rows for this page
    const pageLeads = leads.slice(pageIdx * rowsPerPage, (pageIdx + 1) * rowsPerPage);

    for (let i = 0; i < pageLeads.length; i++) {
      const lead = pageLeads[i];
      const rowHeight = 34;
      const isAlt = i % 2 === 1;

      // Row background
      if (isAlt) {
        page.drawRectangle({
          x: margin,
          y: y - rowHeight,
          width: pageWidth - margin * 2,
          height: rowHeight,
          color: lightBg,
        });
      }

      // Bottom row divider line
      page.drawLine({
        start: { x: margin, y: y - rowHeight },
        end: { x: pageWidth - margin, y: y - rowHeight },
        thickness: 0.5,
        color: borderGray,
      });

      let colX = margin + 10;

      // 1. Lead ID
      page.drawText(lead.id || "N/A", {
        x: colX,
        y: y - 18,
        size: 8.5,
        font: fontBold,
        color: charcoal,
      });
      colX += columns[0].width;

      // 2. Date
      const leadDate = new Date(lead.createdAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
      page.drawText(leadDate, {
        x: colX,
        y: y - 18,
        size: 8,
        font: fontRegular,
        color: textMuted,
      });
      colX += columns[1].width;

      // 3. Name & Contact
      const cleanName = (lead.name || "Customer").slice(0, 24);
      const cleanPhone = lead.phone || "";
      page.drawText(cleanName, {
        x: colX,
        y: y - 14,
        size: 8.5,
        font: fontBold,
        color: charcoal,
      });
      page.drawText(cleanPhone, {
        x: colX,
        y: y - 26,
        size: 8,
        font: fontRegular,
        color: rgb(16 / 255, 185 / 255, 129 / 255),
      });
      colX += columns[2].width;

      // 4. Inquiry & Plot
      const cleanType = (lead.type || "Inquiry").slice(0, 26);
      const cleanPlot = (lead.plotInterest || "General").slice(0, 28);
      page.drawText(cleanType, {
        x: colX,
        y: y - 14,
        size: 8,
        font: fontRegular,
        color: charcoal,
      });
      page.drawText(cleanPlot, {
        x: colX,
        y: y - 26,
        size: 7.5,
        font: fontRegular,
        color: rgb(180 / 255, 83 / 255, 9 / 255),
      });
      colX += columns[3].width;

      // 5. Visit / Cab
      if (lead.preferredDate) {
        page.drawText(`${lead.preferredDate} (${lead.preferredSlot || "Morning"})`, {
          x: colX,
          y: y - 14,
          size: 7.5,
          font: fontRegular,
          color: charcoal,
        });
        const cabText = (lead.cabPickup || "No Cab").slice(0, 24);
        page.drawText(cabText, {
          x: colX,
          y: y - 26,
          size: 7,
          font: fontRegular,
          color: textMuted,
        });
      } else {
        page.drawText("No Visit Scheduled", {
          x: colX,
          y: y - 18,
          size: 8,
          font: fontRegular,
          color: textMuted,
        });
      }
      colX += columns[4].width;

      // 6. Status Badge
      let statusColor = textMuted;
      if (lead.status === "Visit Scheduled") statusColor = rgb(16 / 255, 185 / 255, 129 / 255);
      else if (lead.status === "Contacted") statusColor = rgb(245 / 255, 158 / 255, 11 / 255);
      else if (lead.status === "New") statusColor = rgb(59 / 255, 130 / 255, 246 / 255);

      page.drawText(`[${lead.status || "New"}]`, {
        x: colX,
        y: y - 18,
        size: 8.5,
        font: fontBold,
        color: statusColor,
      });

      y -= rowHeight;
    }

    // Outer table border
    page.drawRectangle({
      x: margin,
      y: margin + 30,
      width: pageWidth - margin * 2,
      height: pageHeight - margin * 2 - 75 - 30,
      borderColor: borderGray,
      borderWidth: 1,
    });

    // Page Footer
    page.drawText("OVI FARMS Internal Operations • Strictly Confidential • Not for Public Distribution", {
      x: margin,
      y: margin + 12,
      size: 7.5,
      font: fontRegular,
      color: textMuted,
    });

    page.drawText(`Page ${pageIdx + 1} of ${totalPages}`, {
      x: pageWidth - margin - 60,
      y: margin + 12,
      size: 7.5,
      font: fontRegular,
      color: textMuted,
    });
  }

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}
