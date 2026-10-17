"use client";

import React, { useState } from "react";
import { Calculator, Check, ArrowRight, PhoneCall, TrendingUp } from "lucide-react";

interface PricingCalculatorProps {
  whatsapp?: string;
  onOpenBooking: () => void;
}

export default function PricingCalculator({ whatsapp = "+919876543210", onOpenBooking }: PricingCalculatorProps) {
  const [tier, setTier] = useState<0.25 | 0.5 | 1.0>(0.5);

  const tierData = {
    0.25: {
      acres: "0.25 Acre",
      sqft: "10,890 sq.ft",
      basePrice: 49.5,
      maintenanceValue: 2.5,
      plantations: "14 Mangoes + 4 Exotic Fruits + 8 Teak Trees",
      growth5yr: "₹88–95 Lakhs",
      recommended: false,
    },
    0.5: {
      acres: "0.50 Acre",
      sqft: "21,780 sq.ft",
      basePrice: 94.0,
      maintenanceValue: 4.8,
      plantations: "28 Mangoes + 8 Exotic Fruits + 16 Mahogany Trees",
      growth5yr: "₹170–185 Lakhs",
      recommended: true,
    },
    1.0: {
      acres: "1.00 Acre",
      sqft: "43,560 sq.ft",
      basePrice: 184.0,
      maintenanceValue: 9.2,
      plantations: "55 Mangoes + 15 Exotic Fruits + 32 Teak & Timber Trees",
      growth5yr: "₹340–375 Lakhs",
      recommended: false,
    },
  };

  const current = tierData[tier];

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
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span className="section-tag">★ Financial Transparency</span>
          <h2 className="section-title light">Transparent Pricing & Investment Returns</h2>
          <p className="section-subtitle light" style={{ margin: "0 auto" }}>
            No hidden costs. Every plot includes legal registration support, ready boundary demarcation, automated drip irrigation, and 3 years of free managed agro-care.
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
            }}
          >
            <button
              onClick={() => setTier(0.25)}
              className={`calc-tab ${tier === 0.25 ? "active" : ""}`}
            >
              Quarter Acre (0.25)
            </button>
            <button
              onClick={() => setTier(0.5)}
              className={`calc-tab ${tier === 0.5 ? "active" : ""}`}
            >
              Half Acre (0.50) ★ Most Popular
            </button>
            <button
              onClick={() => setTier(1.0)}
              className={`calc-tab ${tier === 1.0 ? "active" : ""}`}
            >
              Full Acre (1.00)
            </button>
          </div>
        </div>

        {/* Pricing Card Details */}
        <div
          style={{
            maxWidth: "880px",
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
          {/* Left: Financial Figure */}
          <div>
            <div style={{ display: "inline-block", padding: "0.25rem 0.8rem", backgroundColor: "rgba(16, 185, 129, 0.15)", color: "#10B981", borderRadius: "var(--radius-full)", fontSize: "0.8rem", fontWeight: 700, border: "1px solid rgba(16, 185, 129, 0.35)", marginBottom: "0.8rem" }}>
              ALL-INCLUSIVE FARMLAND INVESTMENT
            </div>

            <div style={{ fontSize: "1.1rem", color: "rgba(255, 255, 255, 0.85)", marginBottom: "0.2rem" }}>
              {current.acres} <span style={{ fontSize: "0.9rem", color: "rgba(255, 255, 255, 0.65)" }}>({current.sqft})</span>
            </div>

            <div style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(2.5rem, 5vw, 3.5rem)", fontWeight: 700, color: "#FFFFFF", lineHeight: 1.1, marginBottom: "0.5rem" }}>
              ₹{current.basePrice} <span style={{ fontSize: "1.4rem", color: "#D4AF37" }}>Lakhs*</span>
            </div>

            <div style={{ fontSize: "0.85rem", color: "rgba(255, 255, 255, 0.6)", marginBottom: "1.8rem" }}>
              *Govt. stamp duty and registry registration charges as applicable.
            </div>

            <div style={{ padding: "1.2rem", backgroundColor: "rgba(7, 29, 23, 0.75)", borderRadius: "var(--radius-md)", border: "1px dashed rgba(212, 175, 55, 0.35)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#FFFFFF", fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.3rem" }}>
                <TrendingUp size={18} color="#D4AF37" />
                <span>Projected 5-Year Capital Valuation:</span>
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "1.3rem", fontWeight: 700, color: "#10B981" }}>
                {current.growth5yr}
              </div>
              <div style={{ fontSize: "0.78rem", color: "rgba(255, 255, 255, 0.7)" }}>
                Based on historical 14-18% CAGR for infrastructure-connected green belts.
              </div>
            </div>
          </div>

          {/* Right: Inclusions & CTA */}
          <div style={{ borderLeft: "1px solid rgba(255, 255, 255, 0.12)", paddingLeft: "clamp(0rem, 3vw, 2rem)" }}>
            <div style={{ fontSize: "0.85rem", color: "#D4AF37", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1.2rem" }}>
              WHAT YOUR INVESTMENT INCLUDES:
            </div>

            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.9rem", marginBottom: "2rem" }}>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", fontSize: "0.92rem", color: "#FFFFFF" }}>
                <Check size={18} color="#10B981" style={{ flexShrink: 0, marginTop: "2px" }} />
                <span><strong>100% Mutation & Clear Title:</strong> Individual demarcation with physical corner boundary stones.</span>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", fontSize: "0.92rem", color: "#FFFFFF" }}>
                <Check size={18} color="#10B981" style={{ flexShrink: 0, marginTop: "2px" }} />
                <span><strong>3 Years Free Managed Farming:</strong> ₹{current.maintenanceValue} Lakhs maintenance package included at ₹0 cost.</span>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", fontSize: "0.92rem", color: "#FFFFFF" }}>
                <Check size={18} color="#10B981" style={{ flexShrink: 0, marginTop: "2px" }} />
                <span><strong>Pre-Planted Fruit Grove:</strong> {current.plantations}.</span>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", fontSize: "0.92rem", color: "#FFFFFF" }}>
                <Check size={18} color="#10B981" style={{ flexShrink: 0, marginTop: "2px" }} />
                <span><strong>Lifetime Club Membership:</strong> Full family access to pool, restaurant, co-working, and stargazing deck.</span>
              </li>
            </ul>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
              <button onClick={onOpenBooking} className="btn btn-gold" style={{ width: "100%", padding: "0.95rem" }}>
                <span>Schedule Site Visit to View Plots</span>
                <ArrowRight size={18} />
              </button>

              <a
                href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                  `Hello OVI FARMS team, please share the detailed cost sheet and payment schedule for the ${current.acres} plot (₹${current.basePrice} Lakhs).`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-emerald"
                style={{ width: "100%", padding: "0.85rem" }}
              >
                <PhoneCall size={17} color="#D4AF37" />
                <span>Receive Cost Sheet on WhatsApp</span>
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
