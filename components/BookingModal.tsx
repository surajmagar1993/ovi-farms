"use client";

import React, { useState } from "react";
import { X, Calendar, CheckCircle2, Car, Clock, User, Phone, Mail, Sparkles } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlot?: any;
}

export default function BookingModal({ isOpen, onClose, selectedPlot }: BookingModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    preferredDate: "",
    preferredSlot: "Morning (10:00 AM)",
    cabPickup: "Yes (Complimentary AC Cab from City)",
  });
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
          type: "Site Visit Booking",
          plotInterest: selectedPlot ? `Plot ${selectedPlot.plotNumber} (${selectedPlot.acreage} Acre)` : "General Farmland Tour",
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError(data.error || "Failed to schedule visit. Please try again.");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setStep(1);
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(7, 29, 23, 0.75)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
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
          maxWidth: "540px",
          width: "100%",
          padding: "clamp(1.5rem, 4vw, 2.4rem)",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.35)",
          position: "relative",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          style={{
            position: "absolute",
            top: "1.2rem",
            right: "1.2rem",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: "var(--text-muted)",
            padding: "0.4rem",
            borderRadius: "50%",
          }}
          aria-label="Close"
        >
          <X size={22} />
        </button>

        {!submitted ? (
          <div>
            <div style={{ textAlign: "center", marginBottom: "1.8rem" }}>
              <span className="section-tag" style={{ justifyContent: "center" }}>
                ★ Personalized Farmland Tour
              </span>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.75rem", color: "var(--color-primary-900)" }}>
                Schedule Your Private Site Visit
              </h3>
              <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginTop: "0.4rem" }}>
                Experience the gentle breeze, taste pure groundwater, and walk through our flourishing mango orchards.
              </p>

              {selectedPlot && (
                <div
                  style={{
                    backgroundColor: "rgba(212, 175, 55, 0.15)",
                    border: "1px solid rgba(212, 175, 55, 0.4)",
                    borderRadius: "var(--radius-md)",
                    padding: "0.6rem 1rem",
                    marginTop: "0.8rem",
                    fontSize: "0.85rem",
                    color: "var(--color-primary-900)",
                    fontWeight: 600,
                  }}
                >
                  Selected: Plot {selectedPlot.plotNumber} ({selectedPlot.acreage} Acre)
                </div>
              )}
            </div>

            {error && (
              <div
                style={{
                  backgroundColor: "rgba(239, 68, 68, 0.1)",
                  color: "#DC2626",
                  padding: "0.8rem",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "0.85rem",
                  marginBottom: "1rem",
                  textAlign: "center",
                }}
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
              {/* Name */}
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "var(--color-primary-900)", marginBottom: "0.3rem" }}>
                  FULL NAME *
                </label>
                <div style={{ position: "relative" }}>
                  <User size={18} color="#84948D" style={{ position: "absolute", left: "12px", top: "12px" }} />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Rajesh Malhotra"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "0.75rem 0.8rem 0.75rem 2.4rem",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--color-sand-300)",
                      fontSize: "0.92rem",
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "var(--color-primary-900)", marginBottom: "0.3rem" }}>
                  MOBILE NUMBER *
                </label>
                <div style={{ position: "relative" }}>
                  <Phone size={18} color="#84948D" style={{ position: "absolute", left: "12px", top: "12px" }} />
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "0.75rem 0.8rem 0.75rem 2.4rem",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--color-sand-300)",
                      fontSize: "0.92rem",
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "var(--color-primary-900)", marginBottom: "0.3rem" }}>
                  EMAIL ADDRESS (OPTIONAL)
                </label>
                <div style={{ position: "relative" }}>
                  <Mail size={18} color="#84948D" style={{ position: "absolute", left: "12px", top: "12px" }} />
                  <input
                    type="email"
                    placeholder="e.g. rajesh@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "0.75rem 0.8rem 0.75rem 2.4rem",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--color-sand-300)",
                      fontSize: "0.92rem",
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              {/* Preferred Date & Slot */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "var(--color-primary-900)", marginBottom: "0.3rem" }}>
                    VISIT DATE
                  </label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--color-sand-300)",
                      fontSize: "0.88rem",
                      outline: "none",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "var(--color-primary-900)", marginBottom: "0.3rem" }}>
                    TIME SLOT
                  </label>
                  <select
                    value={formData.preferredSlot}
                    onChange={(e) => setFormData({ ...formData, preferredSlot: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--color-sand-300)",
                      fontSize: "0.88rem",
                      outline: "none",
                      backgroundColor: "#FFFFFF",
                    }}
                  >
                    <option value="Morning (10:00 AM)">Morning (10:00 AM)</option>
                    <option value="Afternoon (02:00 PM)">Afternoon (02:00 PM)</option>
                    <option value="Sunset Tour (04:00 PM)">Sunset Tour (04:00 PM)</option>
                  </select>
                </div>
              </div>

              {/* Free Cab Pickup Toggle */}
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "var(--color-primary-900)", marginBottom: "0.3rem" }}>
                  TRANSPORTATION PREFERENCE
                </label>
                <select
                  value={formData.cabPickup}
                  onChange={(e) => setFormData({ ...formData, cabPickup: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--color-sand-300)",
                    fontSize: "0.88rem",
                    outline: "none",
                    backgroundColor: "#FFFFFF",
                  }}
                >
                  <option value="Yes (Complimentary AC Cab from City)">
                    🚗 Yes, please arrange a free AC Cab pickup from my city residence
                  </option>
                  <option value="No (Self-Drive with GPS Route)">
                    🚙 No, I prefer to self-drive (send GPS route on WhatsApp)
                  </option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-gold"
                style={{ width: "100%", padding: "1rem", marginTop: "0.5rem" }}
              >
                {loading ? "Confirming Visit..." : "Confirm Free Site Visit Booking"}
              </button>

              <div style={{ textAlign: "center", fontSize: "0.75rem", color: "var(--text-muted)" }}>
                🔒 Your contact details are 100% private. We will never share or spam.
              </div>
            </form>
          </div>
        ) : (
          /* Submission Success State */
          <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                backgroundColor: "rgba(16, 185, 129, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.2rem auto",
              }}
            >
              <CheckCircle2 size={36} color="#10B981" />
            </div>

            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.8rem", color: "var(--color-primary-900)", marginBottom: "0.6rem" }}>
              Site Visit Scheduled!
            </h3>

            <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "1.5rem" }}>
              Thank you, <strong>{formData.name}</strong>. Our estate manager will call you at <strong>{formData.phone}</strong> shortly to confirm the cab pickup and share your digital estate pass.
            </p>

            <div
              style={{
                backgroundColor: "var(--color-sand-100)",
                borderRadius: "var(--radius-md)",
                padding: "1rem",
                fontSize: "0.85rem",
                color: "var(--text-primary)",
                marginBottom: "1.8rem",
                textAlign: "left",
              }}
            >
              <div>• <strong>Tour Date:</strong> {formData.preferredDate || "Upcoming Weekend"}</div>
              <div>• <strong>Time Slot:</strong> {formData.preferredSlot}</div>
              <div>• <strong>Transport:</strong> {formData.cabPickup}</div>
            </div>

            <button onClick={handleResetAndClose} className="btn btn-emerald" style={{ width: "100%" }}>
              Close & Return to Website
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
