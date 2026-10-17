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
        padding: "4.5rem 0",
        backgroundColor: "var(--color-sand-50)",
        position: "relative",
      }}
    >
      <div className="container-constrained">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span className="section-tag">★ The OVI FARMS Difference</span>
          <h2 className="section-title">Why Discerning Families & Investors Choose Us</h2>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
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
                  backgroundColor: "#FFFFFF",
                  border: "1px solid var(--color-sand-200)",
                  borderRadius: "var(--radius-lg)",
                  padding: "2.2rem 1.8rem",
                  boxShadow: "var(--shadow-sm)",
                  transition: "transform 0.3s var(--ease-luxury), box-shadow 0.3s var(--ease-luxury)",
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
                    backgroundColor: "rgba(15, 59, 48, 0.08)",
                    border: "1px solid rgba(212, 175, 55, 0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IconComponent size={28} color="#0F3B30" />
                </div>

                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.3rem",
                    color: "var(--color-primary-900)",
                    fontWeight: 600,
                  }}
                >
                  {p.title}
                </h3>

                <p
                  style={{
                    fontSize: "0.92rem",
                    color: "var(--text-secondary)",
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
          box-shadow: 0 16px 36px rgba(7, 29, 23, 0.1);
          border-color: rgba(212, 175, 55, 0.45);
        }
      `}</style>
    </section>
  );
}
