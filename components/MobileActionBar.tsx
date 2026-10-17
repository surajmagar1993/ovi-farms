"use client";

import React from "react";
import { Phone, MessageCircle, Calendar } from "lucide-react";

interface MobileActionBarProps {
  onOpenBooking: () => void;
  phone?: string;
  whatsapp?: string;
}

export default function MobileActionBar({
  onOpenBooking,
  phone = "+91 98765 43210",
  whatsapp = "+919876543210",
}: MobileActionBarProps) {
  return (
    <aside
      aria-label="Quick Actions"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 999,
        backgroundColor: "rgba(11, 42, 34, 0.95)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderTop: "1.5px solid rgba(212, 175, 55, 0.4)",
        padding: "0.65rem 1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "0.8rem",
        boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.3)",
      }}
      className="mobile-action-bar"
    >
      {/* Call */}
      <a
        href={`tel:${phone.replace(/\s+/g, "")}`}
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.2rem",
          color: "#FFFFFF",
          textDecoration: "none",
          fontSize: "0.75rem",
          fontWeight: 600,
          padding: "0.4rem 0",
        }}
      >
        <Phone size={18} color="#D4AF37" />
        <span>Call</span>
      </a>

      {/* WhatsApp */}
      <a
        href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
          "Hi OVI FARMS team, I am interested in knowing more about plot availability and scheduling a site visit."
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.2rem",
          color: "#FFFFFF",
          textDecoration: "none",
          fontSize: "0.75rem",
          fontWeight: 600,
          padding: "0.4rem 0",
        }}
      >
        <MessageCircle size={18} color="#25D366" />
        <span>WhatsApp</span>
      </a>

      {/* Book Visit */}
      <button
        onClick={onOpenBooking}
        className="btn btn-gold"
        style={{
          flex: 2,
          padding: "0.65rem 0.8rem",
          fontSize: "0.85rem",
        }}
      >
        <Calendar size={16} />
        <span>Book Visit</span>
      </button>

      <style jsx>{`
        @media (min-width: 768px) {
          .mobile-action-bar {
            display: none !important;
          }
        }
      `}</style>
    </aside>
  );
}
