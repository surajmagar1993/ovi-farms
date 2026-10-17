"use client";

import React, { useState } from "react";
import { Sparkles, Waves, Compass, Trophy, Flame, Eye, Dumbbell, Gamepad2 } from "lucide-react";

interface AmenitiesProps {
  amenities?: any[];
}

export default function Amenities({ amenities }: AmenitiesProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const defaultAmenities = [
    {
      id: "pool",
      title: "Edge-less Infinity Swimming Pool",
      desc: "Architectural masterpiece set against the Sahyadri backdrop featuring a cascading waterfall spillover overlooking the verdant valley.",
      category: "Wellness",
      image: "/images/clubhouse-infinity-pool.jpg",
      highlight: "Valley-Facing Edge",
    },
    {
      id: "clubhouse",
      title: "The Centerpiece Countryside Club",
      desc: "Exclusive resort clubhouse with dual-tier balconies, indoor entertainment lounges, and limited club membership for estate owners.",
      category: "Lifestyle",
      image: "/images/clubhouse-aerial-overview.jpg",
      highlight: "Private Membership",
    },
    {
      id: "bbq",
      title: "Sunken Poolside Barbecue Terrace",
      desc: "Illuminated luxury lounge with built-in barbecue grill station, plush seating, and ambient lighting for golden-hour gatherings.",
      category: "Dining",
      image: "/images/poolside-barbecue-lounge.jpg",
      highlight: "Chef Grill Station",
    },
    {
      id: "stargazing",
      title: "Milky Way Stargazing Observatory",
      desc: "High-powered astronomical telescope deck positioned in the pure, pollution-free night skies of Ghavar for celestial viewing.",
      category: "Experience",
      image: "/images/stargazing-telescope.jpg",
      highlight: "Telescope Deck",
    },
    {
      id: "billiards",
      title: "Indoor Leisure & Billiards Veranda",
      desc: "Open-air leisure veranda equipped with tournament pool table, table tennis, air hockey, carrom, and a PlayStation gaming zone.",
      category: "Recreation",
      image: "/images/billiards-lounge.jpg",
      highlight: "Multi-Gaming Arcade",
    },
    {
      id: "gazebo",
      title: "Sunset Tea Gazebo & Valley Balcony",
      desc: "Private elevated wooden pavilions perched above water bodies for serene morning tea, meditation, and unobstructed sunset panoramas.",
      category: "Experience",
      image: "/images/gazebo-couple-sunset.jpg",
      highlight: "360° Valley Panorama",
    },
  ];

  const items = amenities && amenities.length > 0 ? amenities : defaultAmenities;
  const categories = ["All", "Wellness", "Lifestyle", "Dining", "Experience", "Recreation"];

  const filtered = activeCategory === "All" ? items : items.filter((i) => i.category === activeCategory);

  const amenityChecklist = [
    { title: "Infinity Swimming Pool", icon: <Waves size={16} color="#EE5D2B" /> },
    { title: "Poolside Relaxation Deck", icon: <Sparkles size={16} color="#EE5D2B" /> },
    { title: "Tournament Pool Table", icon: <Trophy size={16} color="#EE5D2B" /> },
    { title: "PlayStation Gaming Zone", icon: <Gamepad2 size={16} color="#EE5D2B" /> },
    { title: "Air Hockey & Table Tennis", icon: <Trophy size={16} color="#EE5D2B" /> },
    { title: "Pickleball & Basketball Court", icon: <Dumbbell size={16} color="#EE5D2B" /> },
    { title: "Volleyball Court", icon: <Dumbbell size={16} color="#EE5D2B" /> },
    { title: "Machaan for Bird Watching", icon: <Eye size={16} color="#EE5D2B" /> },
    { title: "Outdoor Sunset Gazebos", icon: <Compass size={16} color="#EE5D2B" /> },
    { title: "Sunken Barbecue Terrace", icon: <Flame size={16} color="#EE5D2B" /> },
    { title: "Children’s Adventure Play Area", icon: <Sparkles size={16} color="#EE5D2B" /> },
    { title: "Limited Club Membership", icon: <Sparkles size={16} color="#EE5D2B" /> },
  ];

  return (
    <section
      id="amenities"
      style={{
        padding: "6rem 0",
        backgroundColor: "transparent",
        borderTop: "1px solid rgba(212, 175, 55, 0.15)",
        borderBottom: "1px solid rgba(212, 175, 55, 0.15)",
        position: "relative",
      }}
    >
      <div className="container-constrained">
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span
            style={{
              color: "#EE5D2B",
              fontSize: "0.82rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              display: "inline-block",
              marginBottom: "0.5rem",
            }}
          >
            ★ THE HEART OF ELEGANT LIVING
          </span>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "var(--font-h2)",
              color: "#FFFFFF",
              marginBottom: "0.8rem",
            }}
          >
            Architectural Masterpiece Set Against the Sahyadri Backdrop
          </h2>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "var(--font-body)",
              color: "rgba(255, 255, 255, 0.82)",
              maxWidth: "760px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            The centerpiece clubhouse features an edge-less infinity pool overlooking the valley, indoor leisure lounges, stargazing decks, multi-sport courts, and limited club membership for estate owners.
          </p>

          {/* Category Filters */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "0.6rem",
              marginTop: "2rem",
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: "0.5rem 1.3rem",
                  borderRadius: "var(--radius-full)",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  border:
                    activeCategory === cat
                      ? "1.5px solid #EE5D2B"
                      : "1px solid rgba(255, 255, 255, 0.2)",
                  backgroundColor: activeCategory === cat ? "#EE5D2B" : "rgba(255, 255, 255, 0.08)",
                  color: "#FFFFFF",
                  boxShadow:
                    activeCategory === cat
                      ? "0 4px 14px rgba(238, 93, 43, 0.3)"
                      : "none",
                  transition: "all 0.25s ease",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Grid of Authentic Amenity Photos */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "2rem",
            marginBottom: "4.5rem",
          }}
        >
          {filtered.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: "rgba(7, 29, 23, 0.60)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                border: "1px solid rgba(212, 175, 55, 0.25)",
                boxShadow: "0 12px 32px rgba(0, 0, 0, 0.35)",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              className="amenity-card"
            >
              <div style={{ position: "relative", height: "240px", overflow: "hidden" }}>
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.6s ease",
                  }}
                  className="amenity-img"
                />
                <div
                  style={{
                    position: "absolute",
                    top: "1rem",
                    right: "1rem",
                    backgroundColor: "rgba(7, 29, 23, 0.85)",
                    color: "#FFFFFF",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    padding: "0.3rem 0.8rem",
                    borderRadius: "var(--radius-full)",
                    border: "1px solid rgba(238, 93, 43, 0.4)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {item.category}
                </div>
                {item.highlight && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "1rem",
                      left: "1rem",
                      backgroundColor: "rgba(238, 93, 43, 0.95)",
                      color: "#FFFFFF",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      padding: "0.25rem 0.75rem",
                      borderRadius: "var(--radius-full)",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                    }}
                  >
                    ★ {item.highlight}
                  </div>
                )}
              </div>

              <div style={{ padding: "1.6rem", flex: 1, display: "flex", flexDirection: "column" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.3rem",
                    color: "#FFFFFF",
                    marginBottom: "0.6rem",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.92rem",
                    color: "rgba(255, 255, 255, 0.82)",
                    lineHeight: 1.6,
                    flex: 1,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Complete Amenity Directory Checklist */}
        <div
          style={{
            backgroundColor: "rgba(7, 29, 23, 0.65)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            borderRadius: "var(--radius-xl)",
            padding: "clamp(2rem, 5vw, 3.5rem)",
            color: "#FFFFFF",
            boxShadow: "0 25px 50px rgba(0, 0, 0, 0.45)",
            border: "1px solid rgba(212, 175, 55, 0.25)",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span
              style={{
                color: "#EE5D2B",
                fontSize: "0.8rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              COMPREHENSIVE CLUB INVENTORY
            </span>
            <h3
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)",
                color: "#FFFFFF",
                marginTop: "0.4rem",
              }}
            >
              Every Sport, Leisure & Relaxation Amenity On-Site
            </h3>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "1.2rem",
            }}
          >
            {amenityChecklist.map((a, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.8rem",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  padding: "0.9rem 1.2rem",
                  borderRadius: "12px",
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    backgroundColor: "rgba(238, 93, 43, 0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {a.icon}
                </div>
                <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "#FFFFFF" }}>
                  {a.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .amenity-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 36px rgba(7, 29, 23, 0.15);
        }
        .amenity-card:hover .amenity-img {
          transform: scale(1.05);
        }
      `}</style>
    </section>
  );
}
