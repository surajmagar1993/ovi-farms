"use client";

import React, { useState } from "react";
import { Image as ImageIcon, Sparkles, X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

interface GalleryProps {
  galleryItems?: any[];
}

export default function Gallery({ galleryItems }: GalleryProps) {
  const [selectedCat, setSelectedCat] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const defaultItems = [
    {
      id: "g1",
      title: "Grand Landmark Entrance Archway at Sunset",
      category: "Entrance",
      url: "/images/grand-archway-sunset.jpg",
    },
    {
      id: "g2",
      title: "The Countryside Clubhouse & Horizon Infinity Pool",
      category: "Clubhouse",
      url: "/images/clubhouse-infinity-pool.jpg",
    },
    {
      id: "g3",
      title: "Sunken Poolside Barbecue Lounge & Dining Terrace",
      category: "Lifestyle",
      url: "/images/poolside-barbecue-lounge.jpg",
    },
    {
      id: "g4",
      title: "Stargazing Observatory Deck Under the Milky Way",
      category: "Experience",
      url: "/images/stargazing-telescope.jpg",
    },
    {
      id: "g5",
      title: "Veranda Billiards Lounge Overlooking Sports Court",
      category: "Sports",
      url: "/images/billiards-lounge.jpg",
    },
    {
      id: "g6",
      title: "Sunset Tea Gazebo Overlooking the Sahyadri Valley",
      category: "Vistas",
      url: "/images/gazebo-couple-sunset.jpg",
    },
    {
      id: "g7",
      title: "Master Layout Aerial View with Demarcated Plots",
      category: "Layout",
      url: "/images/master-layout-clean.jpg",
    },
    {
      id: "g8",
      title: "Clubhouse Complex, Tennis Court & Green Canopy",
      category: "Clubhouse",
      url: "/images/clubhouse-aerial-overview.jpg",
    },
    {
      id: "g9",
      title: "7-Tree Organic Fruit Plantation with Drip Lines",
      category: "Agriculture",
      url: "/images/fruit-plantation-orchard.jpg",
    },
    {
      id: "g10",
      title: "Concrete Internal Avenue Roads",
      category: "Infrastructure",
      url: "/images/concrete-internal-roads.jpg",
    },
    {
      id: "g11",
      title: "Rajgad & Torna Forts Encircled Valley",
      category: "Heritage",
      url: "/images/rajgad-torna-forts.jpg",
    },
    {
      id: "g12",
      title: "Daytime Manned Security Entrance Gate",
      category: "Security",
      url: "/images/grand-archway-day.jpg",
    },
  ];

  const items = galleryItems && galleryItems.length > 0 ? galleryItems : defaultItems;
  const categories = ["All", "Entrance", "Clubhouse", "Lifestyle", "Experience", "Sports", "Vistas", "Layout", "Agriculture"];

  const filtered = selectedCat === "All" ? items : items.filter((item) => item.category === selectedCat);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filtered.length);
    }
  };

  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length);
    }
  };

  return (
    <section
      id="gallery"
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
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
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
            ★ VISUAL ARCHITECTURE & REAL LANDSCAPES
          </span>
          <h2 className="section-title light">Experience OVI FARMS in High Resolution</h2>
          <p className="section-subtitle light" style={{ margin: "0 auto" }}>
            Real landscapes, authentic organic orchards, clubhouse architecture, and sunset vistas from the official project brochure.
          </p>

          {/* Filter Pills */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "0.5rem",
              marginTop: "2rem",
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                style={{
                  padding: "0.45rem 1.15rem",
                  borderRadius: "var(--radius-full)",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  border:
                    selectedCat === cat
                      ? "1.5px solid #EE5D2B"
                      : "1px solid rgba(255, 255, 255, 0.15)",
                  backgroundColor: selectedCat === cat ? "#EE5D2B" : "rgba(255, 255, 255, 0.05)",
                  color: selectedCat === cat ? "#FFFFFF" : "rgba(255, 255, 255, 0.8)",
                  transition: "all 0.2s ease",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Masonry / Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {filtered.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openLightbox(idx)}
              style={{
                position: "relative",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                height: "260px",
                cursor: "pointer",
                boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
                border: "1px solid rgba(212, 175, 55, 0.2)",
              }}
              className="gallery-card"
            >
              <img
                src={item.url}
                alt={item.title}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.5s ease",
                }}
                className="gallery-thumb"
              />

              {/* Gradient Overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(7, 29, 23, 0.9) 0%, rgba(7, 29, 23, 0.2) 50%, rgba(7, 29, 23, 0) 100%)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: "1.2rem",
                  transition: "background 0.3s ease",
                }}
                className="gallery-overlay"
              >
                <div
                  style={{
                    backgroundColor: "rgba(238, 93, 43, 0.9)",
                    color: "#FFFFFF",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    padding: "0.2rem 0.6rem",
                    borderRadius: "var(--radius-full)",
                    width: "fit-content",
                    marginBottom: "0.4rem",
                    textTransform: "uppercase",
                  }}
                >
                  {item.category}
                </div>
                <h4
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.05rem",
                    color: "#FFFFFF",
                    lineHeight: 1.3,
                  }}
                >
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filtered[lightboxIndex] && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "rgba(0, 0, 0, 0.95)",
            backdropFilter: "blur(12px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem",
          }}
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setLightboxIndex(null)}
            style={{
              position: "absolute",
              top: "1.5rem",
              right: "1.5rem",
              background: "rgba(255, 255, 255, 0.15)",
              border: "none",
              color: "#FFFFFF",
              borderRadius: "50%",
              width: "44px",
              height: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 10,
            }}
          >
            <X size={22} />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            style={{
              position: "absolute",
              left: "1.5rem",
              background: "rgba(255, 255, 255, 0.15)",
              border: "none",
              color: "#FFFFFF",
              borderRadius: "50%",
              width: "48px",
              height: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 10,
            }}
          >
            <ChevronLeft size={26} />
          </button>

          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            style={{
              position: "absolute",
              right: "1.5rem",
              background: "rgba(255, 255, 255, 0.15)",
              border: "none",
              color: "#FFFFFF",
              borderRadius: "50%",
              width: "48px",
              height: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 10,
            }}
          >
            <ChevronRight size={26} />
          </button>

          {/* Active Image Container */}
          <div
            style={{
              maxWidth: "1100px",
              width: "100%",
              maxHeight: "85vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filtered[lightboxIndex].url}
              alt={filtered[lightboxIndex].title}
              style={{
                maxWidth: "100%",
                maxHeight: "75vh",
                objectFit: "contain",
                borderRadius: "12px",
                boxShadow: "0 25px 60px rgba(0, 0, 0, 0.8)",
                border: "1px solid rgba(212, 175, 55, 0.3)",
              }}
            />
            <div
              style={{
                marginTop: "1rem",
                textAlign: "center",
                color: "#FFFFFF",
              }}
            >
              <span
                style={{
                  backgroundColor: "rgba(238, 93, 43, 0.9)",
                  color: "#FFFFFF",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  padding: "0.2rem 0.8rem",
                  borderRadius: "var(--radius-full)",
                  marginRight: "0.6rem",
                }}
              >
                {filtered[lightboxIndex].category}
              </span>
              <span style={{ fontFamily: "var(--font-serif)", fontSize: "1.2rem" }}>
                {filtered[lightboxIndex].title}
              </span>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .gallery-card:hover .gallery-thumb {
          transform: scale(1.08);
        }
        .gallery-card:hover .gallery-overlay {
          background: linear-gradient(
            to top,
            rgba(7, 29, 23, 0.95) 0%,
            rgba(7, 29, 23, 0.4) 60%,
            rgba(7, 29, 23, 0.1) 100%
          ) !important;
        }
      `}</style>
    </section>
  );
}
