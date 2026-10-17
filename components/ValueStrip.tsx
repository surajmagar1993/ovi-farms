"use client";

import React from "react";
import { ShieldCheck, CheckCircle2, Droplets, Waves } from "lucide-react";

export default function ValueStrip() {
  const pillars = [
    {
      icon: ShieldCheck,
      title: "24x7 Security & Grand Archway",
      desc: "Manned entry gates, perimeter fencing, continuous CCTV surveillance, and an imposing natural stone & wood entrance landmark.",
    },
    {
      icon: CheckCircle2,
      title: "Clear Demarcation & Pegging",
      desc: "Every plot is cleanly surveyed, pegged, and enclosed with live hedge boundaries with clear individual 7/12 title mutation.",
    },
    {
      icon: Droplets,
      title: "Separate Water & Transformer",
      desc: "Independent water supply system with dedicated drip lines and electricity supply powered by a dedicated transformer.",
    },
    {
      icon: Waves,
      title: "Clubhouse & Infinity Pool",
      desc: "Architectural centerpiece featuring an edge-less infinity pool overlooking the Sahyadri valley and 14 indoor & outdoor club amenities.",
    },
  ];

  return (
    <section
      style={{
        padding: "5rem 0",
        backgroundColor: "transparent",
        borderTop: "1px solid rgba(212, 175, 55, 0.15)",
        borderBottom: "1px solid rgba(212, 175, 55, 0.15)",
        position: "relative",
      }}
    >
      <div className="container-constrained">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span className="section-tag">★ The OVI FARMS Difference</span>
          <h2 className="section-title light" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.7)" }}>Why Discerning Families & Investors Choose Us</h2>
          <p className="section-subtitle light" style={{ margin: "0 auto", textShadow: "0 1px 8px rgba(0,0,0,0.6)" }}>
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
                  backgroundColor: "rgba(7, 29, 23, 0.60)",
                  backdropFilter: "blur(14px)",
                  WebkitBackdropFilter: "blur(14px)",
                  border: "1px solid rgba(212, 175, 55, 0.3)",
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
