"use client";

import React from "react";
import { Sprout, Droplets, Apple, ShieldCheck, Zap, Waves, CheckCircle2 } from "lucide-react";

interface AgroServicesProps {
  services?: any[];
}

export default function AgroServices({ services }: AgroServicesProps) {
  const fruitVarieties = [
    { name: "Kesar Mango", desc: "Golden sweet saffron aroma", tag: "2 Trees / Plot" },
    { name: "Rajapuri Mango", desc: "Large format aromatic fruit", tag: "2 Trees / Plot" },
    { name: "Chiku (Sapota)", desc: "Sweet recurring yields", tag: "1 Tree / Plot" },
    { name: "Jackfruit", desc: "Hardy native Western Ghats tree", tag: "1 Tree / Plot" },
    { name: "Malaysian Dwarf Coconut", desc: "Fast-yielding tender coconut", tag: "1 Tree / Plot" },
  ];

  const pillars = [
    {
      icon: Sprout,
      title: "7 Pre-Planted Fruit Trees Per Plot",
      desc: "Every single parcel comes pre-planted with 7 thriving fruit plants nurtured by our resident horticulturists, transforming your land into an instant private orchard.",
      tag: "Orchard Included",
    },
    {
      icon: Droplets,
      title: "Smart Israeli Drip Irrigation",
      desc: "Automated low-pressure drip irrigation lines connected directly to water reservoirs, delivering pinpoint hydration to root systems on timed cycles.",
      tag: "Automated Tech",
    },
    {
      icon: Waves,
      title: "Separate Dedicated Water Supply",
      desc: "Independent water supply infrastructure and community reservoir guaranteeing pressurized, crystal-pure Sahyadri groundwater for your estate.",
      tag: "Water Abundance",
    },
    {
      icon: Zap,
      title: "Electricity Supply & Transformer",
      desc: "Dedicated community electrical transformer and underground cabling infrastructure, eliminating power voltage drop and ensuring uninterrupted living.",
      tag: "Dedicated Power",
    },
  ];

  return (
    <section
      id="farming"
      style={{
        padding: "6rem 0",
        backgroundColor: "rgba(11, 35, 28, 0.75)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
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
            ★ MANAGED AGRO-LIVING & UTILITIES
          </span>
          <h2 className="section-title light">The Joy of Farmland. Zero Maintenance Hassle.</h2>
          <p className="section-subtitle light" style={{ margin: "0 auto" }}>
            Every plot at OVI FARMS includes 7 pre-planted organic fruit trees, automated Israeli drip irrigation, dedicated electricity transformer, and independent water systems.
          </p>
        </div>

        {/* Feature Split Banner: Photo + Fruit List */}
        <div
          style={{
            backgroundColor: "rgba(14, 35, 28, 0.85)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderRadius: "var(--radius-xl)",
            overflow: "hidden",
            border: "1px solid rgba(212, 175, 55, 0.25)",
            boxShadow: "0 25px 60px rgba(0, 0, 0, 0.45)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            marginBottom: "3.5rem",
          }}
        >
          {/* Photo from brochure */}
          <div style={{ position: "relative", minHeight: "360px" }}>
            <img
              src="/images/fruit-plantation-orchard.jpg"
              alt="OVI FARMS 7 Fruit Trees with Drip Irrigation"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "1rem",
                left: "1rem",
                backgroundColor: "rgba(7, 29, 23, 0.9)",
                color: "#FFFFFF",
                padding: "0.45rem 1rem",
                borderRadius: "var(--radius-full)",
                fontSize: "0.78rem",
                fontWeight: 700,
                border: "1px solid rgba(238, 93, 43, 0.5)",
              }}
            >
              ★ Real Orchard Plot with Drip Lines
            </div>
          </div>

          {/* Fruit Tree Breakdown */}
          <div style={{ padding: "clamp(2rem, 4vw, 3rem)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <span style={{ color: "#EE5D2B", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em" }}>
              PRE-PLANTED ORCHARD INVENTORY
            </span>
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.85rem", color: "#FFFFFF", margin: "0.4rem 0 1.2rem 0" }}>
              7 Fruit Plants Included With Every Single Plot
            </h3>
            <p style={{ fontSize: "0.92rem", color: "rgba(255, 255, 255, 0.82)", lineHeight: 1.6, marginBottom: "1.5rem" }}>
              Carefully chosen Western Ghats climate cultivars that thrive in Ghavar valley soil, maintained completely by our farm team.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {fruitVarieties.map((f, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.75rem 1rem",
                    backgroundColor: "rgba(7, 29, 23, 0.75)",
                    borderRadius: "10px",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <CheckCircle2 size={18} color="#10B981" />
                    <div>
                      <strong style={{ fontSize: "0.92rem", color: "#FFFFFF" }}>
                        {f.name}
                      </strong>
                      <span style={{ fontSize: "0.78rem", color: "rgba(255, 255, 255, 0.65)", marginLeft: "0.5rem" }}>
                        ({f.desc})
                      </span>
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      backgroundColor: "rgba(238, 93, 43, 0.18)",
                      color: "#EE5D2B",
                      padding: "0.2rem 0.6rem",
                      borderRadius: "var(--radius-full)",
                      border: "1px solid rgba(238, 93, 43, 0.35)",
                    }}
                  >
                    {f.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "2rem",
          }}
        >
          {pillars.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div
                key={idx}
                style={{
                  backgroundColor: "rgba(14, 35, 28, 0.82)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  borderRadius: "var(--radius-xl)",
                  border: "1px solid rgba(212, 175, 55, 0.25)",
                  padding: "2.2rem 1.8rem",
                  boxShadow: "0 12px 32px rgba(0, 0, 0, 0.35)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  transition: "all 0.3s ease",
                }}
                className="agro-card"
              >
                <div
                  style={{
                    display: "inline-block",
                    padding: "0.3rem 0.8rem",
                    backgroundColor: "rgba(238, 93, 43, 0.18)",
                    color: "#EE5D2B",
                    borderRadius: "var(--radius-full)",
                    border: "1px solid rgba(238, 93, 43, 0.35)",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    alignSelf: "flex-start",
                  }}
                >
                  {service.tag}
                </div>

                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "14px",
                    backgroundColor: "rgba(212, 175, 55, 0.12)",
                    border: "1px solid rgba(212, 175, 55, 0.35)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon size={26} color="#D4AF37" />
                </div>

                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.25rem",
                    color: "#FFFFFF",
                  }}
                >
                  {service.title}
                </h3>

                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.9rem",
                    color: "rgba(255, 255, 255, 0.82)",
                    lineHeight: 1.6,
                    flex: 1,
                  }}
                >
                  {service.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .agro-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-md);
          border-color: #ee5d2b !important;
        }
      `}</style>
    </section>
  );
}
