"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Lock,
  LogOut,
  FileSpreadsheet,
  FileText,
  Printer,
  Download,
  TreePine,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Calendar,
  Phone,
  Mail,
  User,
  Plus,
  Trash2,
  ExternalLink,
  ShieldAlert,
  Layers,
  Image as ImageIcon,
  Compass,
} from "lucide-react";

export default function AdminPortal() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [email, setEmail] = useState("admin@ovifarms.com");
  const [password, setPassword] = useState("ovi@farms2026");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<"leads" | "branding" | "media" | "plots">("leads");

  // Data states
  const [leads, setLeads] = useState<any[]>([]);
  const [config, setConfig] = useState<any>(null);
  const [plots, setPlots] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [saveMessage, setSaveMessage] = useState("");
  const [exporting, setExporting] = useState(false);
  const [exportingFormat, setExportingFormat] = useState<string | null>(null);

  // New Media Form state
  const [newMedia, setNewMedia] = useState({
    title: "",
    category: "Nature",
    url: "",
    isVideo: false,
  });

  // Check initial auth state
  useEffect(() => {
    fetch("/api/auth")
      .then((res) => res.json())
      .then((data) => {
        setAuthed(data.authenticated);
        if (data.authenticated) {
          loadAdminData();
        }
      })
      .catch(() => setAuthed(false));
  }, []);

  const loadAdminData = () => {
    fetch("/api/leads")
      .then((res) => res.json())
      .then((data) => {
        if (data.leads) setLeads(data.leads);
      });

    fetch("/api/config")
      .then((res) => res.json())
      .then((data) => {
        if (data.config) setConfig(data.config);
      });

    fetch("/api/plots")
      .then((res) => res.json())
      .then((data) => {
        if (data.plots) setPlots(data.plots);
      });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        setAuthed(true);
        loadAdminData();
      } else {
        setLoginError(data.error || "Invalid login credentials.");
      }
    } catch (err: any) {
      setLoginError(err.message || "Failed to log in.");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "logout" }),
    });
    setAuthed(false);
  };

  const handleExport = async (format: "xlsx" | "csv" | "pdf") => {
    try {
      setExportingFormat(format);
      const res = await fetch(`/api/leads/export?format=${format}`);
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Export failed" }));
        alert("Export failed: " + (err.error || res.statusText));
        return;
      }
      const blob = await res.blob();
      const ext = format === "xlsx" ? "xlsx" : format === "pdf" ? "pdf" : "csv";
      const filename = `OVI_FARMS_Leads_${new Date().toISOString().slice(0, 10)}.${ext}`;
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      alert("Error exporting: " + err.message);
    } finally {
      setExportingFormat(null);
    }
  };

  const handlePrintReport = () => {
    window.print();
  };

  const handleUpdateLeadStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l)));
      }
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const handleSaveBranding = async () => {
    setSaveMessage("");
    try {
      const res = await fetch("/api/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      if (res.ok) {
        setSaveMessage("✓ Brand & Logo Settings saved successfully!");
        setTimeout(() => setSaveMessage(""), 4000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMedia.title || !newMedia.url) return;

    const updatedGallery = [
      ...(config?.gallery || []),
      {
        id: `g-${Date.now()}`,
        ...newMedia,
      },
    ];

    const updatedConfig = { ...config, gallery: updatedGallery };
    setConfig(updatedConfig);

    await fetch("/api/config", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedConfig),
    });

    setNewMedia({ title: "", category: "Nature", url: "", isVideo: false });
  };

  const handleDeleteMedia = async (id: string) => {
    const updatedGallery = (config?.gallery || []).filter((item: any) => item.id !== id);
    const updatedConfig = { ...config, gallery: updatedGallery };
    setConfig(updatedConfig);

    await fetch("/api/config", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedConfig),
    });
  };

  const handleTogglePlotStatus = async (plotId: number, status: "available" | "reserved" | "sold") => {
    try {
      const res = await fetch("/api/plots", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plotId, status }),
      });
      if (res.ok) {
        const data = await res.json();
        setPlots(data.plots);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Filtered Leads
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone?.includes(searchTerm) ||
      lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.plotInterest?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Loading indicator while checking initial cookie
  if (authed === null) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#071D17", display: "flex", alignItems: "center", justifyContent: "center", color: "#D4AF37" }}>
        Loading OVI FARMS Admin Portal...
      </div>
    );
  }

  /* ==================== LOGIN SCREEN ==================== */
  if (!authed) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#071D17",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.5rem",
          backgroundImage: "radial-gradient(circle at center, #0F3B30 0%, #071D17 80%)",
        }}
      >
        <div
          style={{
            maxWidth: "440px",
            width: "100%",
            backgroundColor: "#0E1714",
            border: "1.5px solid rgba(212, 175, 55, 0.35)",
            borderRadius: "var(--radius-xl)",
            padding: "2.5rem 2rem",
            boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              backgroundColor: "rgba(212, 175, 55, 0.15)",
              border: "1px solid #D4AF37",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.2rem auto",
            }}
          >
            <TreePine size={30} color="#D4AF37" />
          </div>

          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.85rem", color: "#FFFFFF", marginBottom: "0.3rem" }}>
            OVI FARMS
          </h2>
          <div style={{ fontSize: "0.8rem", color: "#D4AF37", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1.8rem" }}>
            Admin Console Login
          </div>

          {loginError && (
            <div style={{ backgroundColor: "rgba(239, 68, 68, 0.15)", color: "#F87171", padding: "0.75rem", borderRadius: "8px", fontSize: "0.85rem", marginBottom: "1.2rem" }}>
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1.2rem", textAlign: "left" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", color: "rgba(255,255,255,0.7)", marginBottom: "0.3rem" }}>
                ADMIN EMAIL
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.8rem",
                  borderRadius: "8px",
                  backgroundColor: "#16231F",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#FFFFFF",
                  fontSize: "0.95rem",
                  outline: "none",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.8rem", color: "rgba(255,255,255,0.7)", marginBottom: "0.3rem" }}>
                PASSWORD
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.8rem",
                  borderRadius: "8px",
                  backgroundColor: "#16231F",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#FFFFFF",
                  fontSize: "0.95rem",
                  outline: "none",
                }}
              />
            </div>

            <button type="submit" className="btn btn-gold" style={{ width: "100%", padding: "0.95rem", marginTop: "0.5rem" }}>
              <Lock size={16} />
              <span>Sign In to Dashboard</span>
            </button>
          </form>

          <div style={{ marginTop: "1.8rem", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1rem" }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem", textDecoration: "none" }}>
              ← Return to Public Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* ==================== AUTHENTICATED DASHBOARD ==================== */
  const siteVisitsCount = leads.filter((l) => l.type === "Site Visit Booking").length;
  const availablePlotsCount = plots.filter((p) => p.status === "available").length;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0A1310", color: "#FFFFFF" }}>
      {/* Top Header */}
      <header
        style={{
          backgroundColor: "#0E1714",
          borderBottom: "1px solid rgba(212, 175, 55, 0.25)",
          padding: "1rem 2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #165243 0%, #0F3B30 100%)",
              border: "1px solid #D4AF37",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TreePine size={22} color="#D4AF37" />
          </div>
          <div>
            <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "1.3rem", color: "#FFFFFF", lineHeight: 1.1 }}>
              OVI FARMS Console
            </h1>
            <div style={{ fontSize: "0.72rem", color: "#D4AF37", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              Managed Farmland Operations & CMS
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
          <Link
            href="/"
            target="_blank"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              color: "rgba(255,255,255,0.8)",
              fontSize: "0.85rem",
              textDecoration: "none",
              backgroundColor: "rgba(255,255,255,0.06)",
              padding: "0.45rem 0.9rem",
              borderRadius: "var(--radius-sm)",
            }}
          >
            <span>Live Site</span>
            <ExternalLink size={14} />
          </Link>

          <button
            onClick={handleLogout}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              color: "#F87171",
              fontSize: "0.85rem",
              background: "none",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              padding: "0.45rem 0.9rem",
              borderRadius: "var(--radius-sm)",
              cursor: "pointer",
            }}
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="container-constrained" style={{ padding: "2.5rem 1rem" }}>
        {/* Vital Metric Statistics */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1.2rem",
            marginBottom: "2.5rem",
          }}
        >
          <div style={{ backgroundColor: "#16231F", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
            <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", textTransform: "uppercase" }}>Total Inquiries & Leads</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "2.2rem", fontWeight: 700, color: "#D4AF37", margin: "0.2rem 0" }}>
              {leads.length}
            </div>
            <div style={{ fontSize: "0.78rem", color: "#10B981" }}>From web forms & brochure downloads</div>
          </div>

          <div style={{ backgroundColor: "#16231F", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
            <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", textTransform: "uppercase" }}>Site Visits Booked</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "2.2rem", fontWeight: 700, color: "#10B981", margin: "0.2rem 0" }}>
              {siteVisitsCount}
            </div>
            <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.7)" }}>High-intent prospective buyers</div>
          </div>

          <div style={{ backgroundColor: "#16231F", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
            <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", textTransform: "uppercase" }}>Available Plots Remaining</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "2.2rem", fontWeight: 700, color: "#FFFFFF", margin: "0.2rem 0" }}>
              {availablePlotsCount} <span style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.5)" }}>/ {plots.length}</span>
            </div>
            <div style={{ fontSize: "0.78rem", color: "#F59E0B" }}>Live masterplan inventory</div>
          </div>

          <div style={{ backgroundColor: "#16231F", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
            <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", textTransform: "uppercase" }}>Gated Farmland Expanse</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "2.2rem", fontWeight: 700, color: "#D4AF37", margin: "0.2rem 0" }}>
              48+ Acres
            </div>
            <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.7)" }}>NH-44 Green Belt Sanctuary</div>
          </div>
        </div>

        {/* Console Tabs */}
        <div
          style={{
            display: "flex",
            gap: "0.6rem",
            borderBottom: "1px solid rgba(255,255,255,0.15)",
            paddingBottom: "1rem",
            marginBottom: "2rem",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => setActiveTab("leads")}
            style={{
              padding: "0.65rem 1.4rem",
              borderRadius: "var(--radius-md)",
              fontSize: "0.9rem",
              fontWeight: 600,
              cursor: "pointer",
              border: activeTab === "leads" ? "1.5px solid #D4AF37" : "1px solid transparent",
              backgroundColor: activeTab === "leads" ? "#16231F" : "transparent",
              color: activeTab === "leads" ? "#D4AF37" : "rgba(255,255,255,0.7)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <User size={16} />
            <span>Customer Leads ({leads.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("branding")}
            style={{
              padding: "0.65rem 1.4rem",
              borderRadius: "var(--radius-md)",
              fontSize: "0.9rem",
              fontWeight: 600,
              cursor: "pointer",
              border: activeTab === "branding" ? "1.5px solid #D4AF37" : "1px solid transparent",
              backgroundColor: activeTab === "branding" ? "#16231F" : "transparent",
              color: activeTab === "branding" ? "#D4AF37" : "rgba(255,255,255,0.7)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <TreePine size={16} />
            <span>Logo & Brand Identity CMS</span>
          </button>

          <button
            onClick={() => setActiveTab("media")}
            style={{
              padding: "0.65rem 1.4rem",
              borderRadius: "var(--radius-md)",
              fontSize: "0.9rem",
              fontWeight: 600,
              cursor: "pointer",
              border: activeTab === "media" ? "1.5px solid #D4AF37" : "1px solid transparent",
              backgroundColor: activeTab === "media" ? "#16231F" : "transparent",
              color: activeTab === "media" ? "#D4AF37" : "rgba(255,255,255,0.7)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <ImageIcon size={16} />
            <span>Photos & Videos Manager</span>
          </button>

          <button
            onClick={() => setActiveTab("plots")}
            style={{
              padding: "0.65rem 1.4rem",
              borderRadius: "var(--radius-md)",
              fontSize: "0.9rem",
              fontWeight: 600,
              cursor: "pointer",
              border: activeTab === "plots" ? "1.5px solid #D4AF37" : "1px solid transparent",
              backgroundColor: activeTab === "plots" ? "#16231F" : "transparent",
              color: activeTab === "plots" ? "#D4AF37" : "rgba(255,255,255,0.7)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <Compass size={16} />
            <span>Plot Inventory Controller ({plots.length})</span>
          </button>
        </div>

        {/* ==================== TAB 1: CUSTOMER LEADS & EXCEL EXPORT ==================== */}
        {activeTab === "leads" && (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "1.2rem",
                marginBottom: "1.5rem",
              }}
            >
              {/* Search & Filter */}
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", flex: 1 }}>
                <div style={{ position: "relative", minWidth: "260px" }}>
                  <Search size={16} color="rgba(255,255,255,0.5)" style={{ position: "absolute", left: "12px", top: "12px" }} />
                  <input
                    type="text"
                    placeholder="Search by name, phone, plot..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.7rem 0.8rem 0.7rem 2.2rem",
                      backgroundColor: "#16231F",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: "var(--radius-sm)",
                      color: "#FFFFFF",
                      fontSize: "0.88rem",
                      outline: "none",
                    }}
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  style={{
                    padding: "0.7rem 1rem",
                    backgroundColor: "#16231F",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: "var(--radius-sm)",
                    color: "#FFFFFF",
                    fontSize: "0.88rem",
                    outline: "none",
                  }}
                >
                  <option value="all">All Statuses</option>
                  <option value="New">New</option>
                  <option value="Visit Scheduled">Visit Scheduled</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              {/* EXPORT OPTIONS TOOLBAR (EXCEL, PDF, CSV, PRINT) */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap" }}>
                {/* 1. EXCEL EXPORT */}
                <button
                  onClick={() => handleExport("xlsx")}
                  disabled={!!exportingFormat}
                  title="Download professional multi-sheet Excel workbook with formatted columns and auto-filter"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.7rem 1.2rem",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    borderRadius: "var(--radius-sm)",
                    backgroundColor: "#10B981",
                    backgroundImage: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                    color: "#FFFFFF",
                    border: "none",
                    cursor: exportingFormat ? "not-allowed" : "pointer",
                    boxShadow: "0 4px 14px rgba(16, 185, 129, 0.35)",
                    transition: "all 0.2s ease",
                  }}
                >
                  <FileSpreadsheet size={16} />
                  <span>{exportingFormat === "xlsx" ? "Generating Excel..." : "Export Excel (.xlsx)"}</span>
                </button>

                {/* 2. PDF EXPORT */}
                <button
                  onClick={() => handleExport("pdf")}
                  disabled={!!exportingFormat}
                  title="Download executive confidential landscape PDF report"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.7rem 1.2rem",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    borderRadius: "var(--radius-sm)",
                    backgroundColor: "#DC2626",
                    backgroundImage: "linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)",
                    color: "#FFFFFF",
                    border: "none",
                    cursor: exportingFormat ? "not-allowed" : "pointer",
                    boxShadow: "0 4px 14px rgba(220, 38, 38, 0.35)",
                    transition: "all 0.2s ease",
                  }}
                >
                  <FileText size={16} />
                  <span>{exportingFormat === "pdf" ? "Generating PDF..." : "Export PDF (.pdf)"}</span>
                </button>

                {/* 3. CSV EXPORT */}
                <button
                  onClick={() => handleExport("csv")}
                  disabled={!!exportingFormat}
                  title="Export raw CSV for Google Sheets or CRM import"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.7rem 1rem",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    borderRadius: "var(--radius-sm)",
                    backgroundColor: "#1E293B",
                    color: "#E2E8F0",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    cursor: exportingFormat ? "not-allowed" : "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  <Download size={15} />
                  <span>{exportingFormat === "csv" ? "Exporting..." : "CSV"}</span>
                </button>

                {/* 4. PRINT REPORT */}
                <button
                  onClick={handlePrintReport}
                  title="Print customer leads report or save directly to PDF via browser print"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    padding: "0.7rem 1rem",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    borderRadius: "var(--radius-sm)",
                    backgroundColor: "transparent",
                    color: "#D4AF37",
                    border: "1px solid rgba(212, 175, 55, 0.5)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  <Printer size={15} />
                  <span>Print</span>
                </button>
              </div>
            </div>

            {/* Leads Table */}
            <div
              style={{
                backgroundColor: "#16231F",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "var(--radius-lg)",
                overflowX: "auto",
              }}
            >
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.88rem" }}>
                <thead>
                  <tr style={{ backgroundColor: "#0E1714", borderBottom: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.6)" }}>
                    <th style={{ padding: "1rem" }}>Lead ID</th>
                    <th style={{ padding: "1rem" }}>Date & Time</th>
                    <th style={{ padding: "1rem" }}>Customer Name</th>
                    <th style={{ padding: "1rem" }}>Phone Number</th>
                    <th style={{ padding: "1rem" }}>Type & Interest</th>
                    <th style={{ padding: "1rem" }}>Visit Slot / Transport</th>
                    <th style={{ padding: "1rem" }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                      <td style={{ padding: "1rem", fontFamily: "var(--font-mono)", color: "#D4AF37", fontWeight: 700 }}>
                        {lead.id}
                      </td>
                      <td style={{ padding: "1rem", color: "rgba(255,255,255,0.7)", fontSize: "0.82rem" }}>
                        {new Date(lead.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td style={{ padding: "1rem" }}>
                        <div style={{ fontWeight: 600, color: "#FFFFFF" }}>{lead.name}</div>
                        {lead.email && <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.5)" }}>{lead.email}</div>}
                      </td>
                      <td style={{ padding: "1rem" }}>
                        <a href={`tel:${lead.phone}`} style={{ color: "#10B981", textDecoration: "none", fontWeight: 600 }}>
                          {lead.phone}
                        </a>
                      </td>
                      <td style={{ padding: "1rem" }}>
                        <div style={{ color: "#FFFFFF" }}>{lead.type}</div>
                        <div style={{ fontSize: "0.78rem", color: "#D4AF37" }}>{lead.plotInterest}</div>
                      </td>
                      <td style={{ padding: "1rem" }}>
                        {lead.preferredDate ? (
                          <div>
                            <div>{lead.preferredDate} ({lead.preferredSlot})</div>
                            <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.6)" }}>{lead.cabPickup}</div>
                          </div>
                        ) : (
                          <span style={{ color: "rgba(255,255,255,0.4)" }}>N/A</span>
                        )}
                      </td>
                      <td style={{ padding: "1rem" }}>
                        <select
                          value={lead.status}
                          onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value)}
                          style={{
                            padding: "0.35rem 0.6rem",
                            borderRadius: "var(--radius-sm)",
                            backgroundColor:
                              lead.status === "New"
                                ? "#1E293B"
                                : lead.status === "Visit Scheduled"
                                ? "rgba(16, 185, 129, 0.2)"
                                : lead.status === "Contacted"
                                ? "rgba(245, 158, 11, 0.2)"
                                : "rgba(100, 116, 139, 0.2)",
                            color:
                              lead.status === "New"
                                ? "#94A3B8"
                                : lead.status === "Visit Scheduled"
                                ? "#10B981"
                                : lead.status === "Contacted"
                                ? "#F59E0B"
                                : "#CBD5E1",
                            border: "1px solid rgba(255,255,255,0.2)",
                            fontWeight: 700,
                            fontSize: "0.8rem",
                            cursor: "pointer",
                          }}
                        >
                          <option value="New">New</option>
                          <option value="Visit Scheduled">Visit Scheduled</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                  {filteredLeads.length === 0 && (
                    <tr>
                      <td colSpan={7} style={{ padding: "2.5rem", textAlign: "center", color: "rgba(255,255,255,0.5)" }}>
                        No leads match your search criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ==================== TAB 2: BRAND IDENTITY & LOGO CMS ==================== */}
        {activeTab === "branding" && config && (
          <div style={{ maxWidth: "800px" }}>
            <div style={{ backgroundColor: "#16231F", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "var(--radius-xl)", padding: "2rem" }}>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", color: "#FFFFFF", marginBottom: "1.5rem" }}>
                Brand Identity & Logo Configuration
              </h3>

              {/* Live Logo Preview Box */}
              <div style={{ marginBottom: "2rem", padding: "1.5rem", backgroundColor: "#0E1714", borderRadius: "var(--radius-lg)", border: "1px dashed rgba(212, 175, 55, 0.3)" }}>
                <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", marginBottom: "0.8rem" }}>
                  LIVE LOGO PREVIEW (AS DISPLAYED ACROSS PUBLIC SITE):
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "12px",
                      background: "linear-gradient(135deg, #165243 0%, #0F3B30 100%)",
                      border: "1.5px solid #D4AF37",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <TreePine size={28} color="#D4AF37" />
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--font-serif)", fontSize: "1.6rem", fontWeight: 700, color: "#FFFFFF" }}>
                      {config.brand?.name || "OVI FARMS"}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "#D4AF37", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                      {config.brand?.tagline || "COUNTRYSIDE ESTATES"}
                    </div>
                  </div>
                </div>
              </div>

              {saveMessage && (
                <div style={{ backgroundColor: "rgba(16, 185, 129, 0.15)", color: "#10B981", padding: "0.8rem", borderRadius: "8px", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
                  {saveMessage}
                </div>
              )}

              {/* Form fields */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem", marginBottom: "1.5rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "rgba(255,255,255,0.7)", marginBottom: "0.3rem" }}>
                    BRAND / COMPANY NAME
                  </label>
                  <input
                    type="text"
                    value={config.brand?.name || ""}
                    onChange={(e) =>
                      setConfig({ ...config, brand: { ...config.brand, name: e.target.value } })
                    }
                    style={{ width: "100%", padding: "0.75rem", backgroundColor: "#0E1714", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "8px", color: "#FFFFFF" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "rgba(255,255,255,0.7)", marginBottom: "0.3rem" }}>
                    TAGLINE / SUBTITLE
                  </label>
                  <input
                    type="text"
                    value={config.brand?.tagline || ""}
                    onChange={(e) =>
                      setConfig({ ...config, brand: { ...config.brand, tagline: e.target.value } })
                    }
                    style={{ width: "100%", padding: "0.75rem", backgroundColor: "#0E1714", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "8px", color: "#FFFFFF" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "rgba(255,255,255,0.7)", marginBottom: "0.3rem" }}>
                    RERA REGISTRATION NUMBER
                  </label>
                  <input
                    type="text"
                    value={config.brand?.reraNumber || ""}
                    onChange={(e) =>
                      setConfig({ ...config, brand: { ...config.brand, reraNumber: e.target.value } })
                    }
                    style={{ width: "100%", padding: "0.75rem", backgroundColor: "#0E1714", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "8px", color: "#FFFFFF" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "rgba(255,255,255,0.7)", marginBottom: "0.3rem" }}>
                    PHONE NUMBER
                  </label>
                  <input
                    type="text"
                    value={config.contact?.phone || ""}
                    onChange={(e) =>
                      setConfig({ ...config, contact: { ...config.contact, phone: e.target.value } })
                    }
                    style={{ width: "100%", padding: "0.75rem", backgroundColor: "#0E1714", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "8px", color: "#FFFFFF" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "rgba(255,255,255,0.7)", marginBottom: "0.3rem" }}>
                    WHATSAPP NUMBER (WITHOUT SPACES)
                  </label>
                  <input
                    type="text"
                    value={config.contact?.whatsapp || ""}
                    onChange={(e) =>
                      setConfig({ ...config, contact: { ...config.contact, whatsapp: e.target.value } })
                    }
                    style={{ width: "100%", padding: "0.75rem", backgroundColor: "#0E1714", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "8px", color: "#FFFFFF" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "rgba(255,255,255,0.7)", marginBottom: "0.3rem" }}>
                    OFFICIAL INQUIRY EMAIL
                  </label>
                  <input
                    type="email"
                    value={config.contact?.email || ""}
                    onChange={(e) =>
                      setConfig({ ...config, contact: { ...config.contact, email: e.target.value } })
                    }
                    style={{ width: "100%", padding: "0.75rem", backgroundColor: "#0E1714", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "8px", color: "#FFFFFF" }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.8rem", color: "rgba(255,255,255,0.7)", marginBottom: "0.3rem" }}>
                  ESTATE ADDRESS
                </label>
                <input
                  type="text"
                  value={config.contact?.address || ""}
                  onChange={(e) =>
                    setConfig({ ...config, contact: { ...config.contact, address: e.target.value } })
                  }
                  style={{ width: "100%", padding: "0.75rem", backgroundColor: "#0E1714", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "8px", color: "#FFFFFF", marginBottom: "1.5rem" }}
                />
              </div>

              <button onClick={handleSaveBranding} className="btn btn-gold" style={{ padding: "0.95rem 2rem" }}>
                <span>Save Branding Changes</span>
              </button>
            </div>
          </div>
        )}

        {/* ==================== TAB 3: PHOTOS & VIDEOS MANAGER ==================== */}
        {activeTab === "media" && config && (
          <div>
            {/* Hero Media Settings */}
            <div style={{ backgroundColor: "#16231F", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "var(--radius-xl)", padding: "2rem", marginBottom: "2rem" }}>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.4rem", color: "#FFFFFF", marginBottom: "1rem" }}>
                Hero Section Headline & Background Media
              </h3>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.2rem", marginBottom: "1.2rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "rgba(255,255,255,0.7)", marginBottom: "0.3rem" }}>
                    HERO MAIN HEADLINE
                  </label>
                  <input
                    type="text"
                    value={config.hero?.headline || ""}
                    onChange={(e) =>
                      setConfig({ ...config, hero: { ...config.hero, headline: e.target.value } })
                    }
                    style={{ width: "100%", padding: "0.75rem", backgroundColor: "#0E1714", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "8px", color: "#FFFFFF" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "rgba(255,255,255,0.7)", marginBottom: "0.3rem" }}>
                    HERO BACKGROUND VIDEO URL (/videos/hero-project.mp4 or CDN link)
                  </label>
                  <input
                    type="text"
                    placeholder="/videos/hero-project.mp4"
                    value={config.hero?.videoUrl || ""}
                    onChange={(e) =>
                      setConfig({ ...config, hero: { ...config.hero, videoUrl: e.target.value } })
                    }
                    style={{ width: "100%", padding: "0.75rem", backgroundColor: "#0E1714", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "8px", color: "#FFFFFF" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", color: "rgba(255,255,255,0.7)", marginBottom: "0.3rem" }}>
                    BACKGROUND POSTER / COVER IMAGE URL
                  </label>
                  <input
                    type="text"
                    value={config.hero?.coverImage || ""}
                    onChange={(e) =>
                      setConfig({ ...config, hero: { ...config.hero, coverImage: e.target.value } })
                    }
                    style={{ width: "100%", padding: "0.75rem", backgroundColor: "#0E1714", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "8px", color: "#FFFFFF" }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.8rem", color: "rgba(255,255,255,0.7)", marginBottom: "0.3rem" }}>
                  HERO SUBHEADLINE
                </label>
                <textarea
                  rows={2}
                  value={config.hero?.subheadline || ""}
                  onChange={(e) =>
                    setConfig({ ...config, hero: { ...config.hero, subheadline: e.target.value } })
                  }
                  style={{ width: "100%", padding: "0.75rem", backgroundColor: "#0E1714", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "8px", color: "#FFFFFF", marginBottom: "1rem" }}
                />
              </div>

              <button onClick={handleSaveBranding} className="btn btn-gold" style={{ padding: "0.75rem 1.6rem", fontSize: "0.85rem" }}>
                <span>Update Hero Media</span>
              </button>
            </div>

            {/* Gallery Media Grid & Add Form */}
            <div style={{ backgroundColor: "#16231F", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "var(--radius-xl)", padding: "2rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.4rem", color: "#FFFFFF" }}>
                  Gallery Photos & Video Links ({config.gallery?.length || 0})
                </h3>
              </div>

              {/* Add New Media Form */}
              <form onSubmit={handleAddMedia} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", backgroundColor: "#0E1714", padding: "1.2rem", borderRadius: "var(--radius-md)", marginBottom: "2rem", alignItems: "end" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.78rem", color: "rgba(255,255,255,0.7)", marginBottom: "0.25rem" }}>
                    PHOTO / VIDEO TITLE
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Horizon Pool View"
                    value={newMedia.title}
                    onChange={(e) => setNewMedia({ ...newMedia, title: e.target.value })}
                    style={{ width: "100%", padding: "0.65rem", backgroundColor: "#16231F", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "6px", color: "#FFFFFF" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.78rem", color: "rgba(255,255,255,0.7)", marginBottom: "0.25rem" }}>
                    CATEGORY
                  </label>
                  <select
                    value={newMedia.category}
                    onChange={(e) => setNewMedia({ ...newMedia, category: e.target.value })}
                    style={{ width: "100%", padding: "0.65rem", backgroundColor: "#16231F", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "6px", color: "#FFFFFF" }}
                  >
                    <option value="Nature">Nature</option>
                    <option value="Villas">Villas</option>
                    <option value="Clubhouse">Clubhouse</option>
                    <option value="Farming">Farming</option>
                    <option value="Infrastructure">Infrastructure</option>
                    <option value="Lifestyle">Lifestyle</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.78rem", color: "rgba(255,255,255,0.7)", marginBottom: "0.25rem" }}>
                    IMAGE OR VIDEO URL
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://..."
                    value={newMedia.url}
                    onChange={(e) => setNewMedia({ ...newMedia, url: e.target.value })}
                    style={{ width: "100%", padding: "0.65rem", backgroundColor: "#16231F", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "6px", color: "#FFFFFF" }}
                  />
                </div>

                <button type="submit" className="btn btn-gold" style={{ padding: "0.65rem 1rem", fontSize: "0.85rem" }}>
                  <Plus size={16} />
                  <span>Add To Gallery</span>
                </button>
              </form>

              {/* Gallery Items Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1.5rem" }}>
                {(config.gallery || []).map((item: any) => (
                  <div
                    key={item.id}
                    style={{
                      backgroundColor: "#0E1714",
                      borderRadius: "var(--radius-md)",
                      overflow: "hidden",
                      border: "1px solid rgba(255,255,255,0.1)",
                      position: "relative",
                    }}
                  >
                    <div style={{ height: "150px", overflow: "hidden" }}>
                      <img src={item.url} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div style={{ padding: "0.9rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ fontSize: "0.75rem", color: "#D4AF37", textTransform: "uppercase" }}>{item.category}</div>
                        <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "#FFFFFF" }}>{item.title}</div>
                      </div>
                      <button
                        onClick={() => handleDeleteMedia(item.id)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#EF4444",
                          cursor: "pointer",
                          padding: "0.4rem",
                        }}
                        title="Delete Media"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 4: PLOT INVENTORY CONTROLLER ==================== */}
        {activeTab === "plots" && (
          <div style={{ backgroundColor: "#16231F", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "var(--radius-xl)", padding: "2rem" }}>
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", color: "#FFFFFF", marginBottom: "0.5rem" }}>
              Live Plot Availability Controller
            </h3>
            <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.6)", marginBottom: "1.8rem" }}>
              Toggle plot states here to immediately reflect real-time status on the public masterplan explorer.
            </p>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.88rem" }}>
                <thead>
                  <tr style={{ backgroundColor: "#0E1714", borderBottom: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.6)" }}>
                    <th style={{ padding: "1rem" }}>Plot #</th>
                    <th style={{ padding: "1rem" }}>Sector</th>
                    <th style={{ padding: "1rem" }}>Size</th>
                    <th style={{ padding: "1rem" }}>Facing</th>
                    <th style={{ padding: "1rem" }}>Base Price</th>
                    <th style={{ padding: "1rem" }}>Status</th>
                    <th style={{ padding: "1rem" }}>Quick Toggle Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {plots.map((plot) => (
                    <tr key={plot.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                      <td style={{ padding: "1rem", fontFamily: "var(--font-mono)", color: "#D4AF37", fontWeight: 700 }}>
                        {plot.plotNumber}
                      </td>
                      <td style={{ padding: "1rem", color: "#FFFFFF" }}>{plot.sector}</td>
                      <td style={{ padding: "1rem" }}>
                        {plot.acreage} Acre <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.5)" }}>({plot.sqft} sq.ft)</span>
                      </td>
                      <td style={{ padding: "1rem", color: "rgba(255,255,255,0.8)" }}>{plot.facing}</td>
                      <td style={{ padding: "1rem", fontFamily: "var(--font-mono)", color: "#FFFFFF" }}>
                        ₹{plot.priceInLakhs} L
                      </td>
                      <td style={{ padding: "1rem" }}>
                        {plot.status === "available" && <span style={{ color: "#10B981", fontWeight: 700 }}>● Available</span>}
                        {plot.status === "reserved" && <span style={{ color: "#F59E0B", fontWeight: 700 }}>▲ Reserved</span>}
                        {plot.status === "sold" && <span style={{ color: "#64748B", fontWeight: 700 }}>✕ Sold Out</span>}
                      </td>
                      <td style={{ padding: "1rem" }}>
                        <div style={{ display: "flex", gap: "0.4rem" }}>
                          <button
                            onClick={() => handleTogglePlotStatus(plot.id, "available")}
                            style={{
                              padding: "0.3rem 0.6rem",
                              borderRadius: "4px",
                              backgroundColor: plot.status === "available" ? "#10B981" : "#1E293B",
                              color: "#FFFFFF",
                              border: "none",
                              cursor: "pointer",
                              fontSize: "0.75rem",
                              fontWeight: 600,
                            }}
                          >
                            Available
                          </button>
                          <button
                            onClick={() => handleTogglePlotStatus(plot.id, "reserved")}
                            style={{
                              padding: "0.3rem 0.6rem",
                              borderRadius: "4px",
                              backgroundColor: plot.status === "reserved" ? "#F59E0B" : "#1E293B",
                              color: "#FFFFFF",
                              border: "none",
                              cursor: "pointer",
                              fontSize: "0.75rem",
                              fontWeight: 600,
                            }}
                          >
                            Reserved
                          </button>
                          <button
                            onClick={() => handleTogglePlotStatus(plot.id, "sold")}
                            style={{
                              padding: "0.3rem 0.6rem",
                              borderRadius: "4px",
                              backgroundColor: plot.status === "sold" ? "#64748B" : "#1E293B",
                              color: "#FFFFFF",
                              border: "none",
                              cursor: "pointer",
                              fontSize: "0.75rem",
                              fontWeight: 600,
                            }}
                          >
                            Sold
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        @media print {
          body, html {
            background-color: #FFFFFF !important;
            color: #000000 !important;
          }
          header, .admin-tabs-nav, .export-controls, button, select, input {
            display: none !important;
          }
          .container-constrained {
            max-width: 100% !important;
            padding: 0 !important;
          }
          table {
            width: 100% !important;
            border-collapse: collapse !important;
            color: #000000 !important;
            background: #FFFFFF !important;
          }
          th {
            background-color: #0F3B30 !important;
            color: #FFFFFF !important;
            border: 1px solid #CCCCCC !important;
            padding: 8px !important;
          }
          td {
            color: #111111 !important;
            border: 1px solid #CCCCCC !important;
            padding: 8px !important;
          }
        }
      `}</style>
    </div>
  );
}
