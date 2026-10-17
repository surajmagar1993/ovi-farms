"use client";

import React, { useState } from "react";
import { X, Download, CheckCircle2, FileText, Phone, User, Mail, Map, ArrowRight } from "lucide-react";

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
  whatsapp?: string;
}

export default function BrochureModal({
  isOpen,
  onClose,
  whatsapp = "+917350500045",
}: BrochureModalProps) {
  const [loading, setLoading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      setError("Please provide your name and phone number.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          type: "Brochure Download",
          plotInterest: "Official OVI FARMS Brochure & Masterplan A3",
        }),
      });

      if (res.ok) {
        setDownloaded(true);
        // Automatically trigger download of main brochure
        const link = document.createElement("a");
        link.href = "/docs/ovi-farms-brochure.pdf";
        link.download = "OVI-FARMS-Brochure.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        const data = await res.json();
        setError(data.error || "Failed to submit request.");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(7, 29, 23, 0.8)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        zIndex: 2000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "var(--radius-xl)",
          maxWidth: "500px",
          width: "100%",
          padding: "clamp(1.5rem, 4vw, 2.2rem)",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.4)",
          position: "relative",
          border: "1px solid rgba(238, 93, 43, 0.2)",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "1.2rem",
            right: "1.2rem",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: "var(--text-muted)",
          }}
          aria-label="Close"
        >
          <X size={22} />
        </button>

        {!downloaded ? (
          <div>
            <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "16px",
                  backgroundColor: "rgba(238, 93, 43, 0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1rem auto",
                  border: "1.5px solid rgba(238, 93, 43, 0.3)",
                }}
              >
                <FileText size={28} color="#EE5D2B" />
              </div>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.65rem", color: "var(--color-primary-900)" }}>
                Download Official Brochure
              </h3>
              <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginTop: "0.4rem", lineHeight: 1.5 }}>
                Get instant access to the complete OVI FARMS Presentation, High-Resolution Masterplan, Fort Connectivity map, and Plot Pricing.
              </p>
            </div>

            {error && (
              <div
                style={{
                  backgroundColor: "#FEE2E2",
                  color: "#B91C1C",
                  padding: "0.75rem",
                  borderRadius: "8px",
                  fontSize: "0.85rem",
                  marginBottom: "1rem",
                }}
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    color: "var(--color-primary-900)",
                    marginBottom: "0.3rem",
                    letterSpacing: "0.04em",
                  }}
                >
                  FULL NAME *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sameer Kapoor"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.8rem",
                    borderRadius: "8px",
                    border: "1px solid var(--color-sand-300)",
                    fontSize: "0.92rem",
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    color: "var(--color-primary-900)",
                    marginBottom: "0.3rem",
                    letterSpacing: "0.04em",
                  }}
                >
                  WHATSAPP NUMBER * (FOR BROCHURE DELIVERY)
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.8rem",
                    borderRadius: "8px",
                    border: "1px solid var(--color-sand-300)",
                    fontSize: "0.92rem",
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    color: "var(--color-primary-900)",
                    marginBottom: "0.3rem",
                    letterSpacing: "0.04em",
                  }}
                >
                  EMAIL ADDRESS (OPTIONAL)
                </label>
                <input
                  type="email"
                  placeholder="e.g. sameer@investor.in"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.8rem",
                    borderRadius: "8px",
                    border: "1px solid var(--color-sand-300)",
                    fontSize: "0.92rem",
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-gold"
                style={{
                  width: "100%",
                  padding: "1rem",
                  marginTop: "0.5rem",
                  fontSize: "0.95rem",
                  fontWeight: 700,
                }}
              >
                <Download size={18} />
                <span>{loading ? "Generating Download..." : "Instant Download Official Brochure (PDF)"}</span>
              </button>
            </form>
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "1.2rem 0" }}>
            <CheckCircle2 size={48} color="#10B981" style={{ margin: "0 auto 1rem auto" }} />
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.65rem", color: "var(--color-primary-900)" }}>
              Brochure Downloaded!
            </h3>
            <p style={{ fontSize: "0.92rem", color: "var(--text-secondary)", margin: "0.6rem 0 1.5rem 0", lineHeight: 1.5 }}>
              Thank you, <strong>{formData.name}</strong>. The official OVI FARMS brochure has been saved to your device and forwarded to <strong>{formData.phone}</strong>.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <a
                href="/docs/ovi-farms-brochure.pdf"
                download="OVI-FARMS-Brochure.pdf"
                className="btn btn-gold"
                style={{ width: "100%", padding: "0.85rem", textDecoration: "none" }}
              >
                <Download size={16} />
                <span>Re-download Main Brochure (PDF)</span>
              </a>

              <a
                href="/docs/ovi-farms-masterplan-a3.pdf"
                download="OVI-FARMS-Masterplan-A3.pdf"
                className="btn"
                style={{
                  width: "100%",
                  padding: "0.85rem",
                  textDecoration: "none",
                  backgroundColor: "rgba(11, 42, 34, 0.08)",
                  color: "var(--color-primary-900)",
                  border: "1px solid var(--color-primary-700)",
                }}
              >
                <Map size={16} color="#EE5D2B" />
                <span>Download A3 Master Layout Map (PDF)</span>
              </a>
            </div>

            <a
              href="#masterplan"
              onClick={onClose}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                color: "#EE5D2B",
                textDecoration: "none",
                fontWeight: 700,
                fontSize: "0.9rem",
              }}
            >
              <span>Explore Interactive Masterplan</span>
              <ArrowRight size={16} />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
