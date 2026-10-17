"use client";

import React from "react";
import { FileCheck, Sprout, Palmtree, TrendingUp } from "lucide-react";

export default function ValueStrip() {
  const pillars = [
    {
      icon: FileCheck,
      title: "100% Legally Vetted Titles",
      desc: "Each plot has individual demarcation, clear title deed vetted by high court advocates, and immediate mutation registration in your name.",
    },
    {
      icon: Sprout,
      title: "24/7 Managed Organic Farming",
      desc: "Professional agronomists manage automated drip irrigation, fruit pruning, and soil care. Enjoy fresh seasonal organic harvests delivered to your home.",
    },
    {
      icon: Palmtree,
      title: "Country Club & Resort Amenities",
      desc: "Exclusive access to the Central Clubhouse, Horizon Swimming Pool, Stargazing Observatory, Organic Café, and children's eco-adventure park.",
    },
    {
      icon: TrendingUp,
      title: "High Capital Appreciation",
      desc: "Strategically located along fast-growing infrastructure corridors, combining real agro-yields with robust long-term land wealth appreciation.",
    },
  ];

  return (
    <section
      style={{
        padding: "5rem 0",
        backgroundColor: "rgba(7, 29, 23, 0.65)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderTop: "1px solid rgba(212, 175, 55, 0.15)",
        borderBottom: "1px solid rgba(212, 175, 55, 0.15)",
        position: "relative",
      }}
    >
      <div className="container-constrained">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span className="section-tag">★ The OVI FARMS Difference</span>
          <h2 className="section-title light">Why Discerning Families & Investors Choose Us</h2>
          <p className="section-subtitle light" style={{ margin: "0 auto" }}>
            We eliminate the traditional bottlenecks of rural land acquisition—offering complete legal peace of mind, resort luxury, and professionally managed agriculture.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.8rem",
          }}
        >
          {pillars.map((p, idx) => {
            const IconComponent = p.icon;
            return (
              <div
                key={idx}
                style={{
                  backgroundColor: "rgba(14, 35, 28, 0.82)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(212, 175, 55, 0.25)",
                  borderRadius: "var(--radius-lg)",
                  padding: "2.2rem 1.8rem",
                  boxShadow: "0 12px 32px rgba(0, 0, 0, 0.35)",
                  transition: "transform 0.3s var(--ease-luxury), box-shadow 0.3s var(--ease-luxury), border-color 0.3s ease",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
                className="pillar-card"
              >
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "14px",
                    backgroundColor: "rgba(212, 175, 55, 0.12)",
                    border: "1px solid rgba(212, 175, 55, 0.35)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IconComponent size={28} color="#D4AF37" />
                </div>

                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.3rem",
                    color: "#FFFFFF",
                    fontWeight: 600,
                  }}
                >
                  {p.title}
                </h3>

                <p
                  style={{
                    fontSize: "0.92rem",
                    color: "rgba(255, 255, 255, 0.82)",
                    lineHeight: 1.6,
                  }}
                >
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .pillar-card:hover {
          transform: translateY(-6px) translate3d(0, 0, 0);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
          border-color: rgba(212, 175, 55, 0.55);
        }
      `}</style>
    </section>
  );
}
