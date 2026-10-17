"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "Can non-agriculturists or salaried professionals buy farmhouse plots at OVI FARMS?",
      a: "Yes, absolutely! The legal land conversion, demarcation, and statutory agricultural guidelines have been completely cleared by our legal team. Anyone can legally purchase and register these plots in their individual name with clear title deed and direct mutation entry.",
    },
    {
      q: "Can I build a private weekend home or farmhouse villa on my plot?",
      a: "Yes. Farmhouse construction of up to standard permissible floor area is officially sanctioned. You can build a private luxury wooden cottage, container villa, or brick farmhouse. Our architects also offer ready-to-construct eco-villa blueprints if desired.",
    },
    {
      q: "What is included in the 3-Year Complimentary Managed Agriculture?",
      a: "For the first 3 full years, our team of dedicated agronomists, soil specialists, and gardeners maintains your 25+ fruit trees (pruning, organic compost, bio-pest control, drip irrigation) at zero extra cost. After 3 years, you can renew at a nominal cooperative society maintenance fee.",
    },
    {
      q: "What is the water supply and electrical infrastructure?",
      a: "OVI FARMS features multiple heavy-yield dedicated community borewells with certified sweet drinking groundwater (TDS < 250 ppm) connected via automated drip irrigation to every plot. Electricity connection and solar street lighting lines are fully operational.",
    },
    {
      q: "How are the plots demarcated to prevent boundary disputes?",
      a: "Every single plot features physical concrete boundary demarcation stones, legal survey numbers, and a live green bio-fence border. The entire estate is enclosed by a secure gated perimeter with 24/7 security personnel and CCTV surveillance.",
    },
  ];

  return (
    <section
      id="faq"
      style={{
        padding: "6rem 0",
        backgroundColor: "var(--color-sand-50)",
        position: "relative",
      }}
    >
      <div className="container-constrained" style={{ maxWidth: "860px" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span className="section-tag">★ Common Questions</span>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            Clear answers to help you make an informed and confident decision.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                style={{
                  backgroundColor: "#FFFFFF",
                  border: isOpen ? "1.5px solid #D4AF37" : "1px solid var(--color-sand-200)",
                  borderRadius: "var(--radius-lg)",
                  overflow: "hidden",
                  boxShadow: isOpen ? "var(--shadow-md)" : "var(--shadow-sm)",
                  transition: "all 0.25s var(--ease-luxury)",
                }}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  style={{
                    width: "100%",
                    padding: "1.4rem 1.6rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "1rem",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    color: "var(--color-primary-900)",
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.15rem",
                    fontWeight: 600,
                  }}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={20}
                    color={isOpen ? "#D4AF37" : "var(--text-muted)"}
                    style={{
                      transform: isOpen ? "rotate(180deg)" : "none",
                      transition: "transform 0.25s ease",
                      flexShrink: 0,
                    }}
                  />
                </button>

                {isOpen && (
                  <div
                    style={{
                      padding: "0 1.6rem 1.4rem 1.6rem",
                      color: "var(--text-secondary)",
                      fontSize: "0.95rem",
                      lineHeight: 1.7,
                      borderTop: "1px solid var(--color-sand-100)",
                      paddingTop: "1rem",
                    }}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
