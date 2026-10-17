"use client";

import React, { useState } from "react";
import { Check, ArrowRight, PhoneCall, Compass, Droplets, Zap, Trees } from "lucide-react";

interface PricingCalculatorProps {
  whatsapp?: string;
  onOpenBooking: () => void;
}

export default function PricingCalculator({
  whatsapp = "+917350500045",
  onOpenBooking,
}: PricingCalculatorProps) {
  const [selectedTier, setSelectedTier] = useState<"standard" | "estate" | "grand">("standard");

  const estateTiers = {
    standard: {
      label: "11,000 Sq.Ft Onwards",
      sublabel: "Rare Large-Format Parcel",
      sqft: "11,000+ sq.ft (Approx 0.25 Acre+)",
      plantations: "7 Fruit Plants with Drip Irrigation",
      roadAccess: "Wide Concrete Internal Road",
      water: "Separate Water Supply System",
      power: "Dedicated Transformer Supply",
    },
    estate: {
      label: "22,000 Sq.Ft Estate",
      sublabel: "Half-Acre Farmstead",
      sqft: "22,000 sq.ft (Approx 0.50 Acre)",
      plantations: "14 Fruit Plants with Drip Irrigation",
      roadAccess: "Wide Concrete Internal Road",
      water: "Separate Water Supply System",
      power: "Dedicated Transformer Supply",
    },
    grand: {
      label: "44,000 Sq.Ft Flagship",
      sublabel: "Full-Acre Countryside Estate",
      sqft: "44,000 sq.ft (Approx 1.00 Acre)",
      plantations: "28 Fruit Plants with Drip Irrigation",
      roadAccess: "Wide Concrete Internal Road",
      water: "Separate Water Supply System",
      power: "Dedicated Transformer Supply",
    },
  };

  const current = estateTiers[selectedTier];

  return (
    <section
      id="pricing"
      style={{
        padding: "6rem 0",
        backgroundColor: "transparent",
        borderTop: "1px solid rgba(212, 175, 55, 0.15)",
        borderBottom: "1px solid rgba(212, 175, 55, 0.15)",
        position: "relative",
      }}
    >
      <div className="container-constrained">
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
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
            ★ ESTATE SIZES & PLOTS
          </span>
          <h2 className="section-title light">The Space to Live. The Freedom to Build.</h2>
          <p className="section-subtitle light" style={{ margin: "0 auto" }}>
            Rare large-format land parcels starting from 11,000 sq.ft onwards in the tranquil, monsoon-rich valley of Ghavar near Bhor, equipped with independent utilities and infrastructure.
          </p>

          {/* Size Selector Tabs */}
          <div
            style={{
              display: "inline-flex",
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.18)",
              borderRadius: "var(--radius-full)",
              padding: "0.35rem",
              marginTop: "2.2rem",
              gap: "0.4rem",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <button
              onClick={() => setSelectedTier("standard")}
              className={`calc-tab ${selectedTier === "standard" ? "active" : ""}`}
            >
              11,000 Sq.Ft Onwards ★ Brochure Standard
            </button>
            <button
              onClick={() => setSelectedTier("estate")}
              className={`calc-tab ${selectedTier === "estate" ? "active" : ""}`}
            >
              22,000 Sq.Ft (Half Acre)
            </button>
            <button
              onClick={() => setSelectedTier("grand")}
              className={`calc-tab ${selectedTier === "grand" ? "active" : ""}`}
            >
              44,000 Sq.Ft (One Acre)
            </button>
          </div>
        </div>

        {/* 3 Core Brochure Specifications Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
            marginBottom: "3rem",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(7, 29, 23, 0.65)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              border: "1px solid rgba(238, 93, 43, 0.4)",
              borderRadius: "var(--radius-lg)",
              padding: "1.8rem",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "0.78rem",
                color: "#EE5D2B",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "0.5rem",
              }}
            >
              PLOT RANGE
            </div>
            <div
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.6rem",
                color: "#FFFFFF",
                fontWeight: 700,
              }}
            >
              11,000 SQ FT ONWARDS
            </div>
            <p style={{ fontSize: "0.85rem", color: "rgba(255, 255, 255, 0.75)", marginTop: "0.5rem" }}>
              Rare large-format countryside parcels with clear boundary demarcation.
            </p>
          </div>

          <div
            style={{
              backgroundColor: "rgba(7, 29, 23, 0.65)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              border: "1px solid rgba(212, 175, 55, 0.35)",
              borderRadius: "var(--radius-lg)",
              padding: "1.8rem",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "0.78rem",
                color: "#D4AF37",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "0.5rem",
              }}
            >
              WATER SUPPLY
            </div>
            <div
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.45rem",
                color: "#FFFFFF",
                fontWeight: 700,
              }}
            >
              SEPARATE WATER SUPPLY SYSTEM
            </div>
            <p style={{ fontSize: "0.85rem", color: "rgba(255, 255, 255, 0.75)", marginTop: "0.5rem" }}>
              Dedicated pipelines and storage network delivering continuous water.
            </p>
          </div>

          <div
            style={{
              backgroundColor: "rgba(7, 29, 23, 0.65)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              border: "1px solid rgba(16, 185, 129, 0.35)",
              borderRadius: "var(--radius-lg)",
              padding: "1.8rem",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "0.78rem",
                color: "#10B981",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "0.5rem",
              }}
            >
              ELECTRICITY
            </div>
            <div
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.35rem",
                color: "#FFFFFF",
                fontWeight: 700,
              }}
            >
              ELECTRICITY SUPPLY WITH SEPARATE TRANSFORMER
            </div>
            <p style={{ fontSize: "0.85rem", color: "rgba(255, 255, 255, 0.75)", marginTop: "0.5rem" }}>
              Dedicated transformer infrastructure installed exclusively for the community.
            </p>
          </div>
        </div>

        {/* Selected Tier Specifications Card */}
        <div
          style={{
            maxWidth: "920px",
            margin: "0 auto",
            backgroundColor: "rgba(7, 29, 23, 0.65)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            border: "1.5px solid rgba(212, 175, 55, 0.35)",
            borderRadius: "var(--radius-xl)",
            padding: "clamp(1.8rem, 4vw, 3rem)",
            boxShadow: "0 25px 60px rgba(0, 0, 0, 0.5)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2.5rem",
            alignItems: "center",
          }}
        >
          {/* Left Column: Configuration Overview */}
          <div>
            <div
              style={{
                display: "inline-block",
                padding: "0.25rem 0.8rem",
                backgroundColor: "rgba(238, 93, 43, 0.15)",
                color: "#EE5D2B",
                borderRadius: "var(--radius-full)",
                fontSize: "0.8rem",
                fontWeight: 700,
                border: "1px solid rgba(238, 93, 43, 0.35)",
                marginBottom: "0.8rem",
              }}
            >
              OFFICIAL PLOT CONFIGURATION
            </div>

            <h3
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
                color: "#FFFFFF",
                marginBottom: "0.3rem",
              }}
            >
              {current.label}
            </h3>

            <div style={{ fontSize: "0.95rem", color: "#D4AF37", fontWeight: 600, marginBottom: "1.2rem" }}>
              {current.sublabel} • {current.sqft}
            </div>

            <p style={{ fontSize: "0.9rem", color: "rgba(255, 255, 255, 0.8)", lineHeight: 1.6, marginBottom: "1.8rem" }}>
              Every plot at OVI FARMS is cleanly surveyed, boundary-pegged, enclosed with hedge boundaries, and provided with internal concrete road connectivity, drip irrigation, separate water, and transformer electricity.
            </p>

            <div
              style={{
                padding: "1.2rem",
                backgroundColor: "rgba(4, 18, 14, 0.7)",
                borderRadius: "var(--radius-md)",
                border: "1px dashed rgba(212, 175, 55, 0.35)",
              }}
            >
              <div style={{ fontSize: "0.8rem", color: "#D4AF37", fontWeight: 700, marginBottom: "0.3rem" }}>
                PRICE & PAYMENT SCHEDULE:
              </div>
              <div style={{ fontSize: "1.1rem", color: "#FFFFFF", fontWeight: 700 }}>
                Transparent Pricing on Request
              </div>
              <div style={{ fontSize: "0.78rem", color: "rgba(255, 255, 255, 0.7)", marginTop: "0.3rem" }}>
                Call or WhatsApp our team for the official price list, 7/12 extract, and site visit arrangements.
              </div>
            </div>
          </div>

          {/* Right Column: Inclusions strictly from Brochure */}
          <div style={{ borderLeft: "1px solid rgba(255, 255, 255, 0.12)", paddingLeft: "clamp(0rem, 3vw, 2rem)" }}>
            <div
              style={{
                fontSize: "0.85rem",
                color: "#EE5D2B",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "1.2rem",
              }}
            >
              SPECIFICATIONS INCLUDED PER PLOT:
            </div>

            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.9rem", marginBottom: "2rem" }}>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", fontSize: "0.92rem", color: "#FFFFFF" }}>
                <Check size={18} color="#10B981" style={{ flexShrink: 0, marginTop: "2px" }} />
                <span><strong>Clear Demarcation:</strong> Cleanly surveyed, pegged boundaries enclosed with live hedge boundaries.</span>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", fontSize: "0.92rem", color: "#FFFFFF" }}>
                <Check size={18} color="#10B981" style={{ flexShrink: 0, marginTop: "2px" }} />
                <span><strong>7 Fruit Plants with Drip:</strong> Kesar Mango, Rajapuri Mango, Chiku, Jackfruit, and Malaysian Green Dwarf Coconut.</span>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", fontSize: "0.92rem", color: "#FFFFFF" }}>
                <Check size={18} color="#10B981" style={{ flexShrink: 0, marginTop: "2px" }} />
                <span><strong>Separate Water Supply System:</strong> Dedicated independent water pipeline hookup for each plot.</span>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", fontSize: "0.92rem", color: "#FFFFFF" }}>
                <Check size={18} color="#10B981" style={{ flexShrink: 0, marginTop: "2px" }} />
                <span><strong>Dedicated Transformer Power:</strong> Electricity supply powered by dedicated community transformer.</span>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", fontSize: "0.92rem", color: "#FFFFFF" }}>
                <Check size={18} color="#10B981" style={{ flexShrink: 0, marginTop: "2px" }} />
                <span><strong>Concrete Internal Roads:</strong> Wide, durable concrete roads for smooth access throughout the estate.</span>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", fontSize: "0.92rem", color: "#FFFFFF" }}>
                <Check size={18} color="#10B981" style={{ flexShrink: 0, marginTop: "2px" }} />
                <span><strong>Clubhouse & Infinity Pool Access:</strong> Limited club membership for estate plot owners.</span>
              </li>
            </ul>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
              <button onClick={onOpenBooking} className="btn btn-gold" style={{ width: "100%", padding: "0.95rem" }}>
                <span>Schedule Site Visit to View Plots</span>
                <ArrowRight size={18} />
              </button>

              <a
                href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                  `Hello OVI FARMS team, please share the official price list and plot details for ${current.label} (${current.sqft}).`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-emerald"
                style={{ width: "100%", padding: "0.85rem" }}
              >
                <PhoneCall size={17} color="#D4AF37" />
                <span>Request Price List on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .calc-tab {
          border: none;
          background: transparent;
          padding: 0.6rem 1.4rem;
          border-radius: var(--radius-full);
          font-family: var(--font-sans);
          font-size: 0.88rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.75);
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .calc-tab:hover {
          color: #ffffff;
        }
        .calc-tab.active {
          background-color: #ee5d2b;
          color: #ffffff;
          box-shadow: 0 4px 14px rgba(238, 93, 43, 0.4);
        }
      `}</style>
    </section>
  );
}

