"use client";

import React, { useState } from "react";
import { Compass, CheckCircle2, Trees, Sparkles, PhoneCall, Calendar, Download, Eye, Maximize2 } from "lucide-react";

interface Plot {
  id: number;
  plotNumber: string;
  sector: string;
  acreage: number;
  sqft: number;
  status: "available" | "reserved" | "sold";
  facing: string;
  priceInLakhs: number;
  plantations: string;
  roadWidth: string;
  features: string[];
}

interface MasterplanProps {
  plots: Plot[];
  onSelectPlotForBooking: (plot: Plot) => void;
  whatsapp?: string;
}

export default function Masterplan({
  plots,
  onSelectPlotForBooking,
  whatsapp = "+917350500045",
}: MasterplanProps) {
  const [selectedSector, setSelectedSector] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [activePlot, setActivePlot] = useState<Plot | null>(plots[1] || plots[0] || null);
  const [mapZoomed, setMapZoomed] = useState(false);

  const sectors = ["all", "Rajgad Enclave", "Torna Ridge", "Sinhagad Vista", "Purandar Valley"];

  const filteredPlots = plots.filter((plot) => {
    if (selectedSector !== "all" && plot.sector !== selectedSector) return false;
    if (selectedStatus !== "all" && plot.status !== selectedStatus) return false;
    return true;
  });

  const getStatusBadge = (status: Plot["status"]) => {
    switch (status) {
      case "available":
        return <span className="badge-available">● Available</span>;
      case "reserved":
        return <span className="badge-reserved">▲ Under Reservation</span>;
      case "sold":
        return <span className="badge-sold">✕ Sold Out</span>;
    }
  };

  const getBorderColor = (status: Plot["status"]) => {
    switch (status) {
      case "available":
        return "#10B981";
      case "reserved":
        return "#F59E0B";
      case "sold":
        return "#64748B";
    }
  };

  return (
    <section
      id="masterplan"
      style={{
        padding: "6rem 0",
        backgroundColor: "transparent",
        borderTop: "1px solid rgba(212, 175, 55, 0.15)",
        borderBottom: "1px solid rgba(212, 175, 55, 0.15)",
        color: "#FFFFFF",
        position: "relative",
      }}
    >
      <div className="container-constrained">
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span
            style={{
              color: "#EE5D2B",
              fontSize: "0.82rem",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              display: "inline-block",
              marginBottom: "0.5rem",
            }}
          >
            ★ PLOTTED WITH PRECISION
          </span>
          <h2 className="section-title light">The Master Layout & Live Plot Inventory</h2>
          <p className="section-subtitle light" style={{ margin: "0 auto" }}>
            Rare large-format parcels (11,000 sq.ft onwards) in Ghavar valley. Every plot is cleanly surveyed, boundary pegged, and connected to concrete avenue roads and automated drip lines.
          </p>
        </div>

        {/* Masterplan Aerial Visual Showcase */}
        <div
          style={{
            backgroundColor: "rgba(7, 29, 23, 0.65)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            borderRadius: "var(--radius-xl)",
            border: "1.5px solid rgba(238, 93, 43, 0.35)",
            overflow: "hidden",
            marginBottom: "3rem",
            boxShadow: "0 25px 60px rgba(0, 0, 0, 0.45)",
          }}
        >
          <div
            style={{
              padding: "1.2rem 1.8rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1rem",
              borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
              backgroundColor: "rgba(7, 29, 23, 0.8)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <Compass size={20} color="#EE5D2B" />
              <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "#FFFFFF" }}>
                Aerial Master Layout & Spine Road Demarcation
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
              <button
                onClick={() => setMapZoomed(!mapZoomed)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "#FFFFFF",
                  padding: "0.45rem 1rem",
                  borderRadius: "var(--radius-full)",
                  fontSize: "0.82rem",
                  cursor: "pointer",
                }}
              >
                <Maximize2 size={14} />
                <span>{mapZoomed ? "Reset View" : "Enlarge Map"}</span>
              </button>

              <a
                href="/docs/ovi-farms-masterplan-a3.pdf"
                download="OVI-FARMS-Masterplan-A3.pdf"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  backgroundColor: "#EE5D2B",
                  color: "#FFFFFF",
                  padding: "0.45rem 1.1rem",
                  borderRadius: "var(--radius-full)",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  textDecoration: "none",
                  boxShadow: "0 4px 12px rgba(238, 93, 43, 0.35)",
                }}
              >
                <Download size={14} />
                <span>Download A3 Map (PDF)</span>
              </a>
            </div>
          </div>

          <div
            style={{
              position: "relative",
              overflow: "hidden",
              cursor: "pointer",
              height: mapZoomed ? "650px" : "380px",
              transition: "height 0.4s ease",
            }}
            onClick={() => setMapZoomed(!mapZoomed)}
          >
            <img
              src="/images/master-layout-clean.jpg"
              alt="OVI FARMS Official Masterplan Layout"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transform: mapZoomed ? "scale(1.15)" : "scale(1)",
                transition: "transform 0.4s ease",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "1rem",
                left: "1rem",
                backgroundColor: "rgba(7, 29, 23, 0.85)",
                color: "#FFFFFF",
                padding: "0.4rem 1rem",
                borderRadius: "var(--radius-full)",
                fontSize: "0.78rem",
                border: "1px solid rgba(212, 175, 55, 0.3)",
                backdropFilter: "blur(8px)",
              }}
            >
              ★ Showing Demarcated Plots, Concrete Spine Road, Lake & Bio-Fencing
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1.2rem",
            marginBottom: "2.5rem",
            padding: "1.2rem 1.8rem",
            backgroundColor: "rgba(7, 29, 23, 0.65)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            borderRadius: "var(--radius-lg)",
            border: "1px solid rgba(212, 175, 55, 0.25)",
          }}
        >
          {/* Sector Filters */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center" }}>
            <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", marginRight: "0.5rem" }}>
              Sector:
            </span>
            {sectors.map((sec) => (
              <button
                key={sec}
                onClick={() => setSelectedSector(sec)}
                className={`filter-btn ${selectedSector === sec ? "active" : ""}`}
              >
                {sec === "all" ? "All Enclaves" : sec}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", marginRight: "0.5rem" }}>
              Status:
            </span>
            <button
              onClick={() => setSelectedStatus("all")}
              className={`filter-btn ${selectedStatus === "all" ? "active" : ""}`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedStatus("available")}
              className={`filter-btn ${selectedStatus === "available" ? "active" : ""}`}
            >
              Available
            </button>
            <button
              onClick={() => setSelectedStatus("sold")}
              className={`filter-btn ${selectedStatus === "sold" ? "active" : ""}`}
            >
              Sold
            </button>
          </div>
        </div>

        {/* Interactive Masterplan Grid + Inspector */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2.5rem",
            alignItems: "start",
          }}
        >
          {/* Left Column: Visual Plot Grid */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <div style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.7)" }}>
                Showing <strong style={{ color: "#EE5D2B" }}>{filteredPlots.length}</strong> Plots matching your criteria
              </div>
              <div style={{ display: "flex", gap: "1rem", fontSize: "0.78rem" }}>
                <span style={{ color: "#10B981" }}>● Available</span>
                <span style={{ color: "#F59E0B" }}>▲ Reserved</span>
                <span style={{ color: "#64748B" }}>✕ Sold</span>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(135px, 1fr))",
                gap: "1rem",
              }}
            >
              {filteredPlots.map((plot) => {
                const isSelected = activePlot?.id === plot.id;
                const borderColor = getBorderColor(plot.status);

                return (
                  <button
                    key={plot.id}
                    onClick={() => setActivePlot(plot)}
                    style={{
                      backgroundColor: isSelected ? "rgba(238, 93, 43, 0.28)" : "rgba(22, 43, 36, 0.82)",
                      backdropFilter: "blur(8px)",
                      WebkitBackdropFilter: "blur(8px)",
                      border: `1.5px solid ${isSelected ? "#EE5D2B" : borderColor}`,
                      borderRadius: "var(--radius-md)",
                      padding: "1rem 0.8rem",
                      textAlign: "center",
                      cursor: "pointer",
                      color: "#FFFFFF",
                      transition: "all 0.25s ease",
                      position: "relative",
                      transform: isSelected ? "scale(1.04)" : "none",
                      boxShadow: isSelected ? "0 8px 24px rgba(238, 93, 43, 0.3)" : "none",
                    }}
                    className="plot-tile"
                  >
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        color: isSelected ? "#EE5D2B" : "#FFFFFF",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {plot.plotNumber}
                    </div>

                    <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.7)", marginBottom: "0.5rem" }}>
                      {plot.sqft.toLocaleString()} sq.ft
                    </div>

                    <div style={{ display: "flex", justifyContent: "center" }}>
                      {plot.status === "available" && (
                        <span style={{ color: "#10B981", fontSize: "0.75rem", fontWeight: 700 }}>Available</span>
                      )}
                      {plot.status === "reserved" && (
                        <span style={{ color: "#F59E0B", fontSize: "0.75rem", fontWeight: 700 }}>Reserved</span>
                      )}
                      {plot.status === "sold" && (
                        <span style={{ color: "#64748B", fontSize: "0.75rem", fontWeight: 700 }}>Sold Out</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Live Plot Inspector Card */}
          {activePlot && (
            <div
              style={{
                backgroundColor: "rgba(7, 29, 23, 0.75)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1.5px solid rgba(238, 93, 43, 0.4)",
                borderRadius: "var(--radius-xl)",
                padding: "2.2rem",
                boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
                position: "sticky",
                top: "100px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "1.5rem",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                  paddingBottom: "1.2rem",
                }}
              >
                <div>
                  <div style={{ fontSize: "0.8rem", color: "#EE5D2B", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700 }}>
                    {activePlot.sector}
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "2rem",
                      color: "#FFFFFF",
                      margin: "0.2rem 0",
                    }}
                  >
                    Plot {activePlot.plotNumber}
                  </h3>
                  <div style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.75)" }}>
                    Facing: <strong>{activePlot.facing}</strong> • Road: <strong>{activePlot.roadWidth}</strong>
                  </div>
                </div>

                <div>{getStatusBadge(activePlot.status)}</div>
              </div>

              {/* Plot Metrics */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                  backgroundColor: "rgba(4, 18, 14, 0.70)",
                  padding: "1.2rem",
                  borderRadius: "var(--radius-md)",
                  marginBottom: "1.5rem",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                <div>
                  <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.6)" }}>PLOT SIZE</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "1.25rem", fontWeight: 700, color: "#FFFFFF" }}>
                    {activePlot.sqft.toLocaleString()} sq.ft
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)" }}>
                    ({activePlot.acreage} Acre)
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.6)" }}>STARTING VALUE</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "1.25rem", fontWeight: 700, color: "#D4AF37" }}>
                    ₹{activePlot.priceInLakhs} Lakhs*
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)" }}>
                    (Includes 7 Fruit Trees)
                  </div>
                </div>
              </div>

              {/* Plantations Included */}
              <div style={{ marginBottom: "1.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#10B981", fontSize: "0.82rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                  <Trees size={18} />
                  <span>PRE-PLANTED 7 FRUIT PLANTS (SMART DRIP):</span>
                </div>
                <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.5 }}>
                  {activePlot.plantations}
                </p>
              </div>

              {/* Key Highlights */}
              <div style={{ marginBottom: "2rem" }}>
                <div style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.6)", marginBottom: "0.6rem", fontWeight: 600 }}>
                  INFRASTRUCTURE SPECIFICATIONS:
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {activePlot.features.map((feat, idx) => (
                    <span
                      key={idx}
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.08)",
                        border: "1px solid rgba(255,255,255,0.15)",
                        padding: "0.35rem 0.75rem",
                        borderRadius: "var(--radius-full)",
                        fontSize: "0.78rem",
                        color: "#FFFFFF",
                      }}
                    >
                      ✓ {feat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Plot Action CTAs */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
                {activePlot.status === "available" ? (
                  <button
                    onClick={() => onSelectPlotForBooking(activePlot)}
                    className="btn btn-gold"
                    style={{ width: "100%", padding: "0.95rem" }}
                  >
                    <Calendar size={18} />
                    <span>Schedule Visit for Plot {activePlot.plotNumber}</span>
                  </button>
                ) : (
                  <button
                    disabled
                    className="btn"
                    style={{
                      width: "100%",
                      backgroundColor: "rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.5)",
                      cursor: "not-allowed",
                    }}
                  >
                    <span>Plot {activePlot.plotNumber} is {activePlot.status === "reserved" ? "Reserved" : "Sold Out"}</span>
                  </button>
                )}

                <a
                  href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                    `Hello OVI FARMS team, I am interested in Plot ${activePlot.plotNumber} in ${activePlot.sector} (${activePlot.sqft.toLocaleString()} sq.ft / ₹${activePlot.priceInLakhs} Lakhs). Please share the clear-title 7/12 extract and layout map.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-emerald"
                  style={{ width: "100%", padding: "0.85rem" }}
                >
                  <PhoneCall size={17} color="#D4AF37" />
                  <span>WhatsApp Inquiry for Plot {activePlot.plotNumber}</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .filter-btn {
          background-color: transparent;
          color: rgba(255, 255, 255, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.15);
          padding: 0.45rem 1rem;
          border-radius: var(--radius-full);
          font-size: 0.82rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .filter-btn:hover {
          color: #ee5d2b;
          border-color: #ee5d2b;
        }
        .filter-btn.active {
          background-color: #ee5d2b;
          color: #ffffff;
          border-color: #ee5d2b;
          font-weight: 700;
        }
        .plot-tile:hover {
          border-color: #ee5d2b !important;
          transform: translateY(-3px) translate3d(0, 0, 0);
        }
      `}</style>
    </section>
  );
}
