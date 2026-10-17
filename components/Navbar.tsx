"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, Calendar, Menu, X, Download, ShieldCheck, Lock } from "lucide-react";

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenBrochure?: () => void;
  brand?: any;
  phone?: string;
  whatsapp?: string;
}

export default function Navbar({
  onOpenBooking,
  onOpenBrochure,
  brand,
  phone = "+91 73505 00045",
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logoText = brand?.name || "OVI FARMS";
  const logoSubtitle = brand?.tagline || "WHERE HERITAGE MEETS LIVING";

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        backgroundColor: scrolled ? "rgba(7, 29, 23, 0.96)" : "rgba(7, 29, 23, 0.65)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: scrolled
          ? "1px solid rgba(212, 175, 55, 0.3)"
          : "1px solid rgba(255, 255, 255, 0.12)",
        padding: scrolled ? "0.65rem 0" : "1rem 0",
      }}
    >
      <div
        className="container-constrained"
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
      >
        {/* Brand Identity / Logo */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.85rem",
            textDecoration: "none",
            color: "#FFFFFF",
          }}
        >
          {/* Authentic Logo Emblem */}
          <div
            style={{
              width: "46px",
              height: "46px",
              borderRadius: "12px",
              backgroundColor: "#FAF7F2",
              padding: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 14px rgba(0, 0, 0, 0.3)",
              border: "1.5px solid #EE5D2B",
              overflow: "hidden",
            }}
          >
            <img
              src="/images/ovi-farms-logo.png"
              alt="OVI FARMS Logo"
              width={42}
              height={42}
              style={{ objectFit: "contain", width: "100%", height: "100%" }}
            />
          </div>
          <div>
            <div
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.35rem",
                fontWeight: 700,
                letterSpacing: "0.06em",
                color: "#FFFFFF",
                lineHeight: 1.1,
              }}
            >
              {logoText}
            </div>
            <div
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.65rem",
                letterSpacing: "0.14em",
                color: "#EE5D2B",
                fontWeight: 700,
                textTransform: "uppercase",
              }}
            >
              {logoSubtitle}
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: "none",
            alignItems: "center",
            gap: "1.8rem",
          }}
          className="desktop-nav"
        >
          <a href="#masterplan" className="nav-link">
            Masterplan
          </a>
          <a href="#amenities" className="nav-link">
            Clubhouse & Pool
          </a>
          <a href="#farming" className="nav-link">
            7-Tree Orchards
          </a>
          <a href="#location" className="nav-link">
            Location & Forts
          </a>
          <a href="#pricing" className="nav-link">
            Plot Pricing
          </a>
          <a href="#gallery" className="nav-link">
            Visual Gallery
          </a>
          <a href="#trust" className="nav-link">
            Due Diligence
          </a>
        </nav>

        {/* Action Buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          {/* Phone Call */}
          <a
            href={`tel:${phone.replace(/\s+/g, "")}`}
            style={{
              display: "none",
              alignItems: "center",
              gap: "0.5rem",
              color: "#FFFFFF",
              textDecoration: "none",
              fontSize: "0.88rem",
              fontWeight: 600,
            }}
            className="desktop-phone"
          >
            <Phone size={15} color="#D4AF37" />
            <span>{phone}</span>
          </a>

          {/* Brochure Button */}
          {onOpenBrochure && (
            <button
              onClick={onOpenBrochure}
              style={{
                display: "none",
                alignItems: "center",
                gap: "0.45rem",
                padding: "0.6rem 1.1rem",
                fontSize: "0.85rem",
                fontWeight: 600,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                color: "#FFFFFF",
                border: "1px solid rgba(255, 255, 255, 0.25)",
                borderRadius: "var(--radius-full)",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              className="desktop-brochure-btn"
            >
              <Download size={15} color="#EE5D2B" />
              <span>Brochure</span>
            </button>
          )}

          {/* Book Site Visit CTA */}
          <button
            onClick={onOpenBooking}
            className="btn btn-gold"
            style={{
              padding: "0.65rem 1.35rem",
              fontSize: "0.88rem",
              fontWeight: 700,
            }}
          >
            <Calendar size={16} />
            <span>Book Site Visit</span>
          </button>

          {/* Discreet Admin Login */}
          <Link
            href="/admin"
            title="Admin Console"
            style={{
              color: "rgba(255, 255, 255, 0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0.5rem",
              borderRadius: "50%",
              transition: "all 0.2s ease",
            }}
            className="admin-link"
          >
            <Lock size={15} />
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: "transparent",
              border: "none",
              color: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              padding: "0.4rem",
            }}
            className="mobile-toggle"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X size={26} color="#EE5D2B" /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: "fixed",
            top: "100%",
            left: 0,
            right: 0,
            backgroundColor: "#071D17",
            borderBottom: "2px solid #EE5D2B",
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.2rem",
            boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
          }}
        >
          <a
            href="#masterplan"
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: "#FFFFFF", textDecoration: "none", fontSize: "1.05rem", fontWeight: 600 }}
          >
            Explore Masterplan & Plots
          </a>
          <a
            href="#amenities"
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: "#FFFFFF", textDecoration: "none", fontSize: "1.05rem", fontWeight: 600 }}
          >
            Clubhouse & Infinity Pool
          </a>
          <a
            href="#farming"
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: "#FFFFFF", textDecoration: "none", fontSize: "1.05rem", fontWeight: 600 }}
          >
            7-Tree Organic Orchards
          </a>
          <a
            href="#location"
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: "#FFFFFF", textDecoration: "none", fontSize: "1.05rem", fontWeight: 600 }}
          >
            Location & Maratha Forts
          </a>
          <a
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: "#FFFFFF", textDecoration: "none", fontSize: "1.05rem", fontWeight: 600 }}
          >
            Plot Pricing & Calculator
          </a>
          <a
            href="#gallery"
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: "#FFFFFF", textDecoration: "none", fontSize: "1.05rem", fontWeight: 600 }}
          >
            Visual Gallery
          </a>
          <a
            href="#trust"
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: "#FFFFFF", textDecoration: "none", fontSize: "1.05rem", fontWeight: 600 }}
          >
            Due Diligence & Clear Titles
          </a>

          {onOpenBrochure && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBrochure();
              }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                padding: "0.8rem",
                borderRadius: "8px",
                backgroundColor: "rgba(238, 93, 43, 0.15)",
                color: "#EE5D2B",
                border: "1px solid #EE5D2B",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              <Download size={16} />
              <span>Download Digital Brochure (PDF)</span>
            </button>
          )}

          <div style={{ paddingTop: "0.5rem", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: "#D4AF37", textDecoration: "none", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <Lock size={14} /> Admin CMS Portal
            </Link>
          </div>
        </div>
      )}

      <style jsx>{`
        .nav-link {
          color: rgba(255, 255, 255, 0.85);
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          transition: color 0.2s ease;
        }
        .nav-link:hover {
          color: #ee5d2b;
        }
        .desktop-brochure-btn:hover {
          background: rgba(255, 255, 255, 0.2) !important;
          border-color: #ee5d2b !important;
        }
        .admin-link:hover {
          color: #d4af37 !important;
          background: rgba(255, 255, 255, 0.1);
        }
        @media (min-width: 992px) {
          .desktop-nav {
            display: flex !important;
          }
          .desktop-phone {
            display: flex !important;
          }
          .desktop-brochure-btn {
            display: flex !important;
          }
          .mobile-toggle {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
