import fs from "fs";
import path from "path";
import * as XLSX from "xlsx";

const DATA_DIR = path.join(process.cwd(), "data");

function ensureDirectoryExists() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// Atomic file writer to avoid file corruption
async function writeJsonAtomic(filePath: string, data: any): Promise<void> {
  ensureDirectoryExists();
  const tempPath = `${filePath}.${Date.now()}.tmp`;
  await fs.promises.writeFile(tempPath, JSON.stringify(data, null, 2), "utf-8");
  await fs.promises.rename(tempPath, filePath);
}

/* ==================== SITE CONFIG ==================== */
export async function getSiteConfig() {
  ensureDirectoryExists();
  const filePath = path.join(DATA_DIR, "site-config.json");
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const content = await fs.promises.readFile(filePath, "utf-8");
  return JSON.parse(content);
}

export async function updateSiteConfig(newConfig: any) {
  const filePath = path.join(DATA_DIR, "site-config.json");
  const current = await getSiteConfig();
  const merged = { ...current, ...newConfig };
  await writeJsonAtomic(filePath, merged);
  return merged;
}

/* ==================== PLOTS INVENTORY ==================== */
export async function getPlots() {
  ensureDirectoryExists();
  const filePath = path.join(DATA_DIR, "plots.json");
  if (!fs.existsSync(filePath)) {
    return [];
  }
  const content = await fs.promises.readFile(filePath, "utf-8");
  return JSON.parse(content);
}

export async function updatePlotStatus(plotId: number, status: "available" | "reserved" | "sold") {
  const plots = await getPlots();
  const updatedPlots = plots.map((p: any) => (p.id === plotId ? { ...p, status } : p));
  const filePath = path.join(DATA_DIR, "plots.json");
  await writeJsonAtomic(filePath, updatedPlots);
  return updatedPlots;
}

/* ==================== CUSTOMER LEADS & LOGS ==================== */
export interface CustomerLead {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  email: string;
  type: string; // 'Site Visit Booking' | 'Brochure Download' | 'General Inquiry'
  plotInterest?: string;
  preferredDate?: string;
  preferredSlot?: string;
  cabPickup?: string;
  status: "New" | "Contacted" | "Visit Scheduled" | "Closed";
  notes?: string;
}

export async function getLeads(): Promise<CustomerLead[]> {
  ensureDirectoryExists();
  const filePath = path.join(DATA_DIR, "leads.json");
  if (!fs.existsSync(filePath)) {
    return [];
  }
  const content = await fs.promises.readFile(filePath, "utf-8");
  return JSON.parse(content);
}

export async function addLead(leadData: Omit<CustomerLead, "id" | "createdAt" | "status">): Promise<CustomerLead> {
  const leads = await getLeads();
  const newLead: CustomerLead = {
    ...leadData,
    id: `LEAD-${1000 + leads.length + 1}`,
    createdAt: new Date().toISOString(),
    status: "New",
    notes: leadData.notes || "New inquiry via web experience",
  };
  leads.unshift(newLead);
  const filePath = path.join(DATA_DIR, "leads.json");
  await writeJsonAtomic(filePath, leads);
  return newLead;
}

export async function updateLeadStatus(id: string, status: CustomerLead["status"], notes?: string) {
  const leads = await getLeads();
  const updatedLeads = leads.map((l: CustomerLead) =>
    l.id === id ? { ...l, status, ...(notes !== undefined ? { notes } : {}) } : l
  );
  const filePath = path.join(DATA_DIR, "leads.json");
  await writeJsonAtomic(filePath, updatedLeads);
  return updatedLeads.find((l: CustomerLead) => l.id === id);
}

/* ==================== EXCEL SPREADSHEET EXPORT (.xlsx & .csv) ==================== */
export async function generateLeadsExcelBuffer(): Promise<Buffer> {
  const leads = await getLeads();

  // 1. Master Leads Sheet with professional executive headers
  const titleRows = [
    ["OVI FARMS — Managed Farmland Estates & Countryside Villas"],
    ["Customer Leads, Site Visit Bookings & Digital Brochure Inquiries Log"],
    [
      `Report Generated: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} | Total Records: ${leads.length} | Strictly Confidential`,
    ],
    [], // Blank spacing row
    [
      "Lead ID",
      "Inquiry Date & Time",
      "Customer Name",
      "Phone Number",
      "Email Address",
      "Inquiry Type",
      "Plot of Interest",
      "Visit Date",
      "Visit Time Slot",
      "Cab Pickup Requested",
      "Current Status",
      "Sales / Internal Notes",
    ],
  ];

  const dataRows = leads.map((lead) => [
    lead.id,
    new Date(lead.createdAt).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
    lead.name || "N/A",
    String(lead.phone || ""),
    lead.email || "N/A",
    lead.type || "General Inquiry",
    lead.plotInterest || "General",
    lead.preferredDate || "N/A",
    lead.preferredSlot || "N/A",
    lead.cabPickup || "No",
    lead.status || "New",
    lead.notes || "",
  ]);

  const allRows = [...titleRows, ...dataRows];
  const worksheet = XLSX.utils.aoa_to_sheet(allRows);

  // Set generous column widths so no text is truncated or shows ###
  worksheet["!cols"] = [
    { wch: 14 }, // Lead ID
    { wch: 24 }, // Inquiry Date & Time
    { wch: 25 }, // Customer Name
    { wch: 20 }, // Phone Number
    { wch: 32 }, // Email Address
    { wch: 22 }, // Inquiry Type
    { wch: 28 }, // Plot of Interest
    { wch: 16 }, // Visit Date
    { wch: 22 }, // Visit Time Slot
    { wch: 24 }, // Cab Pickup
    { wch: 18 }, // Current Status
    { wch: 45 }, // Sales Notes
  ];

  // Auto-filter on Row 5 (column headers)
  worksheet["!autofilter"] = { ref: `A5:L${allRows.length}` };

  // Freeze top 5 rows so header stays visible when scrolling
  worksheet["!views"] = [{ state: "frozen", ySplit: 5 }];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Customer Leads Register");

  // 2. Executive KPI Summary Sheet
  const siteVisits = leads.filter((l) => l.type === "Site Visit Booking").length;
  const brochures = leads.filter((l) => l.type === "Brochure Download").length;
  const newLeads = leads.filter((l) => l.status === "New").length;
  const contacted = leads.filter((l) => l.status === "Contacted").length;
  const visitScheduled = leads.filter((l) => l.status === "Visit Scheduled").length;
  const closed = leads.filter((l) => l.status === "Closed").length;

  const summaryRows = [
    ["OVI FARMS — Executive Operations Summary"],
    [`Generated: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}`],
    [],
    ["Operational Metric", "Count"],
    ["Total Inquiries Received", leads.length],
    ["Site Visit Bookings Requested", siteVisits],
    ["Digital Brochure Downloads", brochures],
    ["New / Uncontacted Inquiries", newLeads],
    ["Inquiries Contacted", contacted],
    ["Site Visits Confirmed & Scheduled", visitScheduled],
    ["Deals Closed / Converted", closed],
  ];
  const summarySheet = XLSX.utils.aoa_to_sheet(summaryRows);
  summarySheet["!cols"] = [{ wch: 36 }, { wch: 16 }];
  XLSX.utils.book_append_sheet(workbook, summarySheet, "Executive Summary");

  const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
  return buffer;
}

export async function generateLeadsCsvBuffer(): Promise<string> {
  const leads = await getLeads();
  const formattedRows = leads.map((lead) => ({
    "Lead ID": lead.id,
    "Date & Time": new Date(lead.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    "Customer Name": lead.name,
    "Phone Number": lead.phone,
    "Email Address": lead.email || "N/A",
    "Inquiry Type": lead.type,
    "Plot of Interest": lead.plotInterest || "General",
    "Visit Date": lead.preferredDate || "N/A",
    "Visit Time Slot": lead.preferredSlot || "N/A",
    "Cab Pickup Requested": lead.cabPickup || "No",
    "Lead Status": lead.status,
    "Sales Notes": lead.notes || "",
  }));
  const worksheet = XLSX.utils.json_to_sheet(formattedRows);
  return XLSX.utils.sheet_to_csv(worksheet);
}
