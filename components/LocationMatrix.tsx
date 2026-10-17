"use client";

import React from "react";
import { Shield, MapPin, Navigation, Compass, Car, Sparkles, ExternalLink } from "lucide-react";

export default function LocationMatrix() {
  const forts = [
    {
      name: "Rajgad Fort",
      subtitle: "Historical Seat of Power • West View",
      time: "Within 15 Mins",
      desc: "Historical seat of power and iconic trekking destination, located just 15 minutes away from the project.",
      image: "/images/rajgad-torna-forts.jpg",
    },
    {
      name: "Torana Fort",
      subtitle: "Highest Hill Fort • North-West View",
      time: "Within 15 Mins",
      desc: "Highest hill fort offering legendary Sahyadri trekking trails, located just 15 minutes away from the project.",
      image: "/images/rajgad-torna-forts.jpg",
    },
    {
      name: "Sinhagad Fort",
      subtitle: "Legendary Citadel • Pune Corridor",
      time: "Pune Corridor",
      desc: "Legendary Maratha citadel framing the mountain corridor towards Pune city.",
      image: "/images/hero-sahyadri-valley.jpg",
    },
    {
      name: "Purandar Fort",
      subtitle: "Iconic Hill Fort • East View",
      time: "East View",
      desc: "Iconic hill fortress anchoring the eastern mountain horizon around Ghavar valley.",
      image: "/images/scenic-valley-plots.jpg",
    },
  ];

  const connectivity = [
    {
      title: "Proposed Ring Road",
      badge: "Approx 8 KM",
      desc: "Located approximately 8 km from the proposed Ring Road, offering strong future connectivity and convenient access.",
      image: "/images/proposed-ring-road.jpg",
    },
    {
      title: "20 Minutes from Nasrapur",
      badge: "20 Mins",
      desc: "Conveniently located just 20 minutes from Nasrapur, ensuring quick access while staying close to nature.",
      image: "/images/nasrapur-highway.jpg",
    },
    {
      title: "Scenic Valley-View Plots",
      badge: "On-Site",
      desc: "Enjoy scenic valley-view plots surrounded by open landscapes, natural beauty, and peaceful surroundings.",
      image: "/images/scenic-valley-plots.jpg",
    },
    {
      title: "Concrete Internal Roads",
      badge: "Smooth Access",
      desc: "Wide, durable concrete roads for smooth access throughout the project.",
      image: "/images/concrete-internal-roads.jpg",
    },
  ];

  return (
    <section
      id="location"
      style={{
        padding: "6rem 0",
        backgroundColor: "transparent",
        borderTop: "1px solid rgba(212, 175, 55, 0.15)",
        borderBottom: "1px solid rgba(212, 175, 55, 0.15)",
        color: "#FFFFFF",
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
            ★ STRATEGIC ACCESSIBILITY & HISTORY
          </span>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "var(--font-h2)",
              color: "#FFFFFF",
              marginBottom: "0.8rem",
            }}
          >
            An Address Rooted In Legend
          </h2>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "var(--font-body)",
              color: "rgba(255, 255, 255, 0.8)",
              maxWidth: "780px",
              margin: "0 auto",
              lineHeight: 1.65,
            }}
          >
            Positioned in the tranquil, monsoon-rich valley of Ghavar near Bhor, OVI FARMS offers a rare blend of rapid urban accessibility and profound historical significance. Encircled by the iconic Maratha hill forts of Rajgad, Torana, Sinhagad, and Purandar.
          </p>
        </div>

        {/* 4 Forts Heritage Banner */}
        <div
          style={{
            backgroundColor: "rgba(7, 29, 23, 0.65)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            border: "1.5px solid rgba(238, 93, 43, 0.4)",
            borderRadius: "var(--radius-xl)",
            padding: "clamp(1.8rem, 4vw, 3rem)",
            marginBottom: "3.5rem",
            boxShadow: "0 25px 60px rgba(0, 0, 0, 0.45)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1rem",
              marginBottom: "2rem",
              borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
              paddingBottom: "1.2rem",
            }}
          >
            <div>
              <span style={{ color: "#D4AF37", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.1em" }}>
                HERITAGE FORT ARCHITECTURE
              </span>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.7rem", color: "#FFFFFF" }}>
                Encircled By Maharashtra’s Proudest Landmarks
              </h3>
            </div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                backgroundColor: "rgba(238, 93, 43, 0.15)",
                color: "#EE5D2B",
                padding: "0.5rem 1.2rem",
                borderRadius: "var(--radius-full)",
                fontSize: "0.85rem",
                fontWeight: 700,
              }}
            >
              <Compass size={16} />
              <span>Ghavar Valley Hub</span>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.8rem",
            }}
          >
            {forts.map((f, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "rgba(4, 18, 14, 0.60)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  borderRadius: "var(--radius-lg)",
                  overflow: "hidden",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ height: "180px", position: "relative", overflow: "hidden" }}>
                  <img
                    src={f.image}
                    alt={f.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "0.75rem",
                      left: "0.75rem",
                      backgroundColor: "rgba(238, 93, 43, 0.95)",
                      color: "#FFFFFF",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "var(--radius-full)",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                    }}
                  >
                    {f.time}
                  </div>
                </div>
                <div style={{ padding: "1.4rem", flex: 1, display: "flex", flexDirection: "column" }}>
                  <h4 style={{ fontFamily: "var(--font-serif)", fontSize: "1.3rem", color: "#FFFFFF", marginBottom: "0.3rem" }}>
                    {f.name}
                  </h4>
                  <div style={{ fontSize: "0.78rem", color: "#D4AF37", fontWeight: 600, marginBottom: "0.6rem" }}>
                    {f.subtitle}
                  </div>
                  <p style={{ fontSize: "0.88rem", color: "rgba(255, 255, 255, 0.75)", lineHeight: 1.5, flex: 1 }}>
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Connectivity & Infrastructure Grid */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <span style={{ color: "#EE5D2B", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.12em" }}>
            CONNECTED LIVING, SCENIC ADVANTAGES
          </span>
          <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.8rem", color: "#FFFFFF", marginTop: "0.3rem" }}>
            Unrivaled Road & Infrastructure Advantages
          </h3>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.5rem",
            marginBottom: "3rem",
          }}
        >
          {connectivity.map((c, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: "rgba(7, 29, 23, 0.60)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(212, 175, 55, 0.25)",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.3s ease, border-color 0.3s ease",
              }}
              className="connect-card"
            >
              <div style={{ height: "150px", overflow: "hidden" }}>
                <img
                  src={c.image}
                  alt={c.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div style={{ padding: "1.3rem", flex: 1, display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                  <h4 style={{ fontFamily: "var(--font-serif)", fontSize: "1.15rem", color: "#FFFFFF" }}>
                    {c.title}
                  </h4>
                  <span
                    style={{
                      backgroundColor: "rgba(212, 175, 55, 0.15)",
                      color: "#D4AF37",
                      padding: "0.2rem 0.65rem",
                      borderRadius: "var(--radius-full)",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                    }}
                  >
                    {c.badge}
                  </span>
                </div>
                <p style={{ fontSize: "0.86rem", color: "rgba(255, 255, 255, 0.75)", lineHeight: 1.5, flex: 1 }}>
                  {c.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* GPS Map Callout */}
        <div
          style={{
            textAlign: "center",
            padding: "2rem",
            backgroundColor: "rgba(7, 29, 23, 0.65)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            borderRadius: "var(--radius-lg)",
            border: "1px dashed rgba(212, 175, 55, 0.4)",
            maxWidth: "760px",
            margin: "0 auto",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <MapPin size={20} color="#EE5D2B" />
            <span style={{ fontSize: "1rem", fontWeight: 700, color: "#FFFFFF" }}>
              Site Address: Ghavar Region, Near Bhor, Maharashtra
            </span>
          </div>
          <p style={{ fontSize: "0.88rem", color: "rgba(255, 255, 255, 0.7)", marginBottom: "1.2rem" }}>
            Complimentary private cab pickup available from Pune for pre-booked site visits.
          </p>
          <a
            href="https://maps.google.com/?q=Bhor,Maharashtra"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              backgroundColor: "#EE5D2B",
              color: "#FFFFFF",
              padding: "0.75rem 1.6rem",
              borderRadius: "var(--radius-full)",
              textDecoration: "none",
              fontSize: "0.88rem",
              fontWeight: 700,
              boxShadow: "0 4px 14px rgba(238, 93, 43, 0.4)",
            }}
          >
            <span>Open in Google Maps</span>
            <ExternalLink size={15} />
          </a>
        </div>
      </div>

      <style jsx>{`
        .connect-card:hover {
          transform: translateY(-5px);
          border-color: #ee5d2b !important;
        }
      `}</style>
    </section>
  );
}
