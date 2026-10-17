"use client";

import React from "react";
import Link from "next/link";
import { Lock, Phone, Mail, MapPin, ShieldCheck, Download, ExternalLink } from "lucide-react";

interface FooterProps {
  brand?: any;
  contact?: any;
}

export default function Footer({ brand, contact }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const phone = contact?.phone || "+91 73505 00045";
  const email = contact?.email || "surendra@ovifarms.com";
  const address = contact?.address || "Ghavar Region, Near Bhor, 40 Mins from Pune, Maharashtra";

  return (
    <footer
      style={{
        backgroundColor: "rgba(7, 29, 23, 0.88)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        color: "#FFFFFF",
        paddingTop: "5rem",
        paddingBottom: "6rem", // extra padding for mobile action bar
        borderTop: "1.5px solid rgba(238, 93, 43, 0.35)",
      }}
    >
      <div className="container-constrained">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "3rem",
            marginBottom: "4rem",
          }}
        >
          {/* Brand Info */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginBottom: "1.2rem" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  backgroundColor: "#FAF7F2",
                  border: "1.5px solid #EE5D2B",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "4px",
                  overflow: "hidden",
                }}
              >
                <img
                  src="/images/ovi-farms-logo.png"
                  alt="OVI FARMS"
                  width={44}
                  height={44}
                  style={{ objectFit: "contain", width: "100%", height: "100%" }}
                />
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: "1.4rem", fontWeight: 700, color: "#FFFFFF" }}>
                  {brand?.name || "OVI FARMS"}
                </div>
                <div style={{ fontSize: "0.68rem", color: "#EE5D2B", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700 }}>
                  WHERE HERITAGE MEETS LIVING
                </div>
              </div>
            </div>

            <p style={{ fontSize: "0.9rem", color: "rgba(255, 255, 255, 0.75)", lineHeight: 1.6, marginBottom: "1.5rem" }}>
              Private plotted farmsteads (11,000 sq.ft onwards) in Ghavar valley, near Bhor. Encircled by Rajgad & Torna forts, featuring centerpiece clubhouse, infinity pool, and 7-tree managed orchards.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <a
                href="/docs/ovi-farms-brochure.pdf"
                download="OVI-FARMS-Brochure.pdf"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.5rem 1rem",
                  backgroundColor: "rgba(238, 93, 43, 0.15)",
                  border: "1px solid #EE5D2B",
                  borderRadius: "var(--radius-sm)",
                  color: "#EE5D2B",
                  textDecoration: "none",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  width: "fit-content",
                }}
              >
                <Download size={14} />
                <span>Download Official Brochure (PDF)</span>
              </a>

              <a
                href="/docs/ovi-farms-masterplan-a3.pdf"
                download="OVI-FARMS-Masterplan-A3.pdf"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.5rem 1rem",
                  backgroundColor: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  borderRadius: "var(--radius-sm)",
                  color: "#FFFFFF",
                  textDecoration: "none",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  width: "fit-content",
                }}
              >
                <Download size={14} />
                <span>Download Masterplan Map (A3 PDF)</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontFamily: "var(--font-serif)", fontSize: "1.2rem", color: "#FFFFFF", marginBottom: "1.2rem" }}>
              Explore Project
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.7rem", fontSize: "0.9rem" }}>
              <li><a href="#masterplan" style={{ color: "rgba(255,255,255,0.75)", textDecoration: "none" }}>Master Layout & Plots</a></li>
              <li><a href="#amenities" style={{ color: "rgba(255,255,255,0.75)", textDecoration: "none" }}>Clubhouse & Infinity Pool</a></li>
              <li><a href="#farming" style={{ color: "rgba(255,255,255,0.75)", textDecoration: "none" }}>7 Fruit Plants per Plot</a></li>
              <li><a href="#location" style={{ color: "rgba(255,255,255,0.75)", textDecoration: "none" }}>Rajgad & Torna Forts</a></li>
              <li><a href="#pricing" style={{ color: "rgba(255,255,255,0.75)", textDecoration: "none" }}>Plot Pricing & Calculator</a></li>
              <li><a href="#gallery" style={{ color: "rgba(255,255,255,0.75)", textDecoration: "none" }}>High-Res Visual Gallery</a></li>
              <li><a href="#trust" style={{ color: "rgba(255,255,255,0.75)", textDecoration: "none" }}>Due Diligence & Title Deed</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 style={{ fontFamily: "var(--font-serif)", fontSize: "1.2rem", color: "#FFFFFF", marginBottom: "1.2rem" }}>
              Inquiries & Bookings
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem", fontSize: "0.9rem", color: "rgba(255,255,255,0.75)" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                <MapPin size={18} color="#EE5D2B" style={{ flexShrink: 0, marginTop: "2px" }} />
                <span>{address}</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <Phone size={16} color="#EE5D2B" style={{ flexShrink: 0 }} />
                  <a href="tel:+917350500045" style={{ color: "#FFFFFF", textDecoration: "none", fontWeight: 600 }}>
                    +91 73505 00045
                  </a>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", paddingLeft: "1.6rem" }}>
                  <a href="tel:+917350500046" style={{ color: "rgba(255,255,255,0.8)", textDecoration: "none" }}>
                    +91 73505 00046
                  </a>
                  <span>/</span>
                  <a href="tel:+917350500040" style={{ color: "rgba(255,255,255,0.8)", textDecoration: "none" }}>
                    +91 73505 00040
                  </a>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <Mail size={16} color="#EE5D2B" style={{ flexShrink: 0 }} />
                <a href={`mailto:${email}`} style={{ color: "rgba(255,255,255,0.8)", textDecoration: "none" }}>
                  {email}
                </a>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <ExternalLink size={16} color="#EE5D2B" style={{ flexShrink: 0 }} />
                <a href="https://www.ovifarms.com" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.8)", textDecoration: "none" }}>
                  www.ovifarms.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal Disclaimer Bar */}
        <div
          style={{
            paddingTop: "2rem",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
            fontSize: "0.82rem",
            color: "rgba(255, 255, 255, 0.55)",
          }}
        >
          <div>
            © {currentYear} <strong>OVI FARMS</strong>. All Rights Reserved. Premier Farmstead Development.
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <span>Privacy Policy</span>
            <span>Terms of Ownership</span>
            <Link href="/admin" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.3rem" }}>
              <Lock size={12} /> Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
