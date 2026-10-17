"use client";

import React from "react";
import { ShieldCheck, FileText, Droplet, TestTube, Scale, CheckCircle2 } from "lucide-react";

export default function TrustCenter() {
  const documents = [
    {
      icon: Scale,
      title: "Clear Pedigree & Title Deed",
      detail: "40+ Years Historical Title Search",
      desc: "Title searched and vetted by senior High Court advocates, ensuring zero legal encumbrance and immediate individual registerability.",
    },
    {
      icon: ShieldCheck,
      title: "RERA Registered & Sanctioned",
      detail: "PRM/KA/RERA/1251/310/PR/220815/005124",
      desc: "Full statutory compliance, sanctioned layout plan with 40-ft and 50-ft dedicated avenue road buffers.",
    },
    {
      icon: Droplet,
      title: "Sweet Groundwater Purity Report",
      detail: "Certified Lab Test (TDS < 250 PPM)",
      desc: "Multiple high-yield sweet water aquifers tested by accredited geological laboratories, guaranteeing abundant potable water.",
    },
    {
      icon: TestTube,
      title: "Agricultural Soil Health Card",
      detail: "Rich Red Loam Soil (pH 6.8 - 7.2)",
      desc: "High organic matter carbon index, ideal for high-yield organic horticulture (Alphonso mangoes, avocadoes, guavas).",
    },
  ];

  return (
    <section
      id="trust"
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
          <span className="section-tag">★ Absolute Peace of Mind</span>
          <h2 className="section-title light">Legal Due Diligence & Technical Certifications</h2>
          <p className="section-subtitle light" style={{ margin: "0 auto" }}>
            We understand that legal security and resource sustainability are your top priorities. Every document is available for inspection prior to booking.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.8rem",
          }}
        >
          {documents.map((doc, idx) => {
            const Icon = doc.icon;
            return (
              <div
                key={idx}
                style={{
                  backgroundColor: "rgba(7, 29, 23, 0.60)",
                  backdropFilter: "blur(14px)",
                  WebkitBackdropFilter: "blur(14px)",
                  borderRadius: "var(--radius-xl)",
                  border: "1px solid rgba(212, 175, 55, 0.25)",
                  padding: "2.2rem 1.8rem",
                  boxShadow: "0 12px 32px rgba(0, 0, 0, 0.35)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.9rem",
                  transition: "transform 0.3s var(--ease-luxury), box-shadow 0.3s ease, border-color 0.3s ease",
                }}
                className="trust-card"
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "12px",
                      backgroundColor: "rgba(212, 175, 55, 0.12)",
                      border: "1px solid rgba(212, 175, 55, 0.35)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon size={26} color="#D4AF37" />
                  </div>
                  <CheckCircle2 size={22} color="#10B981" />
                </div>

                <div>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", color: "#FFFFFF" }}>
                    {doc.title}
                  </h3>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "#D4AF37", fontWeight: 700, marginTop: "0.2rem" }}>
                    {doc.detail}
                  </div>
                </div>

                <p style={{ fontSize: "0.9rem", color: "rgba(255, 255, 255, 0.82)", lineHeight: 1.6 }}>
                  {doc.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .trust-card:hover {
          transform: translateY(-5px) translate3d(0, 0, 0);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
          border-color: rgba(212, 175, 55, 0.55);
        }
      `}</style>
    </section>
  );
}
