"use client";

import React, { useState, useRef, useEffect } from "react";
import { ShieldCheck, Calendar, Download, Play, Pause, Volume2, VolumeX, Sparkles, MapPin, Compass, ArrowDown } from "lucide-react";

interface HeroProps {
  heroData?: any;
  onOpenBooking: () => void;
  onOpenBrochure: () => void;
}

export default function Hero({ heroData, onOpenBooking, onOpenBrochure }: HeroProps) {
  const headline = heroData?.headline || "Where Heritage Meets Living";
  const subheadline =
    heroData?.subheadline ||
    "Rare large-format plotted estates (11,000 sq.ft onwards) in the monsoon-rich valley of Ghavar, near Bhor. Encircled by legendary Maratha forts, just 40 minutes from Pune.";
  const coverImage = heroData?.coverImage || "/images/hero-sahyadri-valley.jpg";
  const videoUrl = heroData?.videoUrl || "/videos/hero-drone-web.mp4";
  const fallbackVideo = heroData?.fallbackVideoUrl || "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-green-nature-and-trees-42686-large.mp4";

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  useEffect(() => {
    const video = document.querySelector("video");
    if (video) {
      setIsPlaying(!video.paused);
      setIsMuted(video.muted);
    }
  }, [videoUrl]);

  const togglePlay = () => {
    const video = document.querySelector("video");
    if (video) {
      if (video.paused) {
        video.play().catch(() => {});
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    const video = document.querySelector("video");
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "7.5rem",
        paddingBottom: "4.5rem",
        overflow: "hidden",
        backgroundColor: "transparent",
      }}
    >

      {/* Hero Video Floating Controls */}
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          right: "2rem",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          gap: "0.6rem",
          backgroundColor: "rgba(11, 42, 34, 0.75)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(212, 175, 55, 0.3)",
          padding: "0.4rem 0.8rem",
          borderRadius: "var(--radius-full)",
        }}
        className="hero-video-controls"
      >
        <button
          onClick={togglePlay}
          style={{
            background: "none",
            border: "none",
            color: "#FFFFFF",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            padding: "0.25rem",
          }}
          title={isPlaying ? "Pause Video" : "Play Video"}
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} fill="#D4AF37" color="#D4AF37" />}
        </button>
        <button
          onClick={toggleMute}
          style={{
            background: "none",
            border: "none",
            color: "#FFFFFF",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            padding: "0.25rem",
          }}
          title={isMuted ? "Unmute Sound" : "Mute Sound"}
          aria-label={isMuted ? "Unmute audio" : "Mute audio"}
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} color="#D4AF37" />}
        </button>
        <span style={{ fontSize: "0.72rem", color: "#D4AF37", fontWeight: 600, letterSpacing: "0.08em" }}>
          HERO FILM
        </span>
      </div>

      {/* Main Content Hero */}
      <div
        className="container-constrained"
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          maxWidth: "1020px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Prestige Location Pill */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.6rem",
            backgroundColor: "rgba(14, 35, 28, 0.82)",
            border: "1.5px solid rgba(238, 93, 43, 0.6)",
            borderRadius: "var(--radius-full)",
            padding: "0.45rem 1.4rem",
            marginBottom: "1.6rem",
            backdropFilter: "blur(14px)",
            boxShadow: "0 8px 24px rgba(238, 93, 43, 0.2)",
          }}
        >
          <Sparkles size={16} color="#EE5D2B" />
          <span
            style={{
              color: "#FFFFFF",
              fontFamily: "var(--font-sans)",
              fontSize: "0.82rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            EXCLUSIVE LAND PLOTTING • BHOR, 40 MINS FROM PUNE
          </span>
        </div>

        {/* Main Serif Headline */}
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "var(--font-h1)",
            color: "#FFFFFF",
            lineHeight: 1.08,
            marginBottom: "1.2rem",
            textShadow: "0 4px 24px rgba(0, 0, 0, 0.6)",
            letterSpacing: "-0.01em",
            maxWidth: "920px",
          }}
        >
          {headline}
        </h1>

        {/* Subtitle / Brand Ethos */}
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: "clamp(1.2rem, 1.8vw, 1.6rem)",
            color: "#EE5D2B",
            marginBottom: "1rem",
            letterSpacing: "0.04em",
          }}
        >
          Private Plotted Estate Framed by Nature • Simplicity with Luxury
        </div>

        {/* Subheadline Description */}
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "var(--font-body)",
            color: "rgba(255, 255, 255, 0.9)",
            maxWidth: "780px",
            lineHeight: 1.65,
            marginBottom: "2.4rem",
            textShadow: "0 2px 12px rgba(0, 0, 0, 0.4)",
          }}
        >
          {subheadline}
        </p>

        {/* Primary Call to Actions */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.2rem",
            flexWrap: "wrap",
            marginBottom: "3.2rem",
          }}
        >
          <button
            onClick={onOpenBooking}
            className="btn btn-gold"
            style={{
              padding: "1rem 2.2rem",
              fontSize: "1rem",
              fontWeight: 700,
              boxShadow: "0 8px 30px rgba(212, 175, 55, 0.45)",
            }}
          >
            <Calendar size={18} />
            <span>Book Private Site Visit</span>
          </button>

          <button
            onClick={onOpenBrochure}
            className="btn"
            style={{
              padding: "1rem 2rem",
              fontSize: "1rem",
              fontWeight: 600,
              backgroundColor: "rgba(255, 255, 255, 0.12)",
              color: "#FFFFFF",
              border: "1.5px solid rgba(255, 255, 255, 0.35)",
              backdropFilter: "blur(12px)",
            }}
          >
            <Download size={18} color="#D4AF37" />
            <span>Download Official Brochure</span>
          </button>

          <button
            onClick={() => setVideoModalOpen(true)}
            style={{
              background: "transparent",
              border: "none",
              color: "#FFFFFF",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.55rem",
              fontSize: "0.95rem",
              fontWeight: 600,
              cursor: "pointer",
              padding: "0.8rem 1rem",
              borderRadius: "var(--radius-full)",
              transition: "all 0.2s ease",
            }}
            className="tour-btn"
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                backgroundColor: "#EE5D2B",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 14px rgba(238, 93, 43, 0.5)",
              }}
            >
              <Play size={16} fill="#FFFFFF" color="#FFFFFF" style={{ marginLeft: "2px" }} />
            </div>
            <span>Watch Drone Tour</span>
          </button>
        </div>

        {/* Feature Highlights Strip */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "1rem",
            width: "100%",
            maxWidth: "960px",
            backgroundColor: "rgba(11, 42, 34, 0.8)",
            border: "1px solid rgba(212, 175, 55, 0.25)",
            borderRadius: "var(--radius-lg)",
            padding: "1.4rem",
            backdropFilter: "blur(16px)",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.35)",
          }}
        >
          <div style={{ textAlign: "center", borderRight: "1px solid rgba(255, 255, 255, 0.08)" }}>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: "1.35rem", fontWeight: 700, color: "#D4AF37" }}>
              11,000+
            </div>
            <div style={{ fontSize: "0.78rem", color: "rgba(255, 255, 255, 0.75)", textTransform: "uppercase", letterSpacing: "0.06em", marginTop: "0.2rem" }}>
              Sq.Ft Onwards Plots
            </div>
          </div>

          <div style={{ textAlign: "center", borderRight: "1px solid rgba(255, 255, 255, 0.08)" }}>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: "1.35rem", fontWeight: 700, color: "#EE5D2B" }}>
              40 Mins
            </div>
            <div style={{ fontSize: "0.78rem", color: "rgba(255, 255, 255, 0.75)", textTransform: "uppercase", letterSpacing: "0.06em", marginTop: "0.2rem" }}>
              Drive From Pune
            </div>
          </div>

          <div style={{ textAlign: "center", borderRight: "1px solid rgba(255, 255, 255, 0.08)" }}>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: "1.35rem", fontWeight: 700, color: "#D4AF37" }}>
              7 Fruit Plants
            </div>
            <div style={{ fontSize: "0.78rem", color: "rgba(255, 255, 255, 0.75)", textTransform: "uppercase", letterSpacing: "0.06em", marginTop: "0.2rem" }}>
              Per Plot with Smart Drip
            </div>
          </div>

          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: "1.35rem", fontWeight: 700, color: "#10B981" }}>
              Rajgad & Torna
            </div>
            <div style={{ fontSize: "0.78rem", color: "rgba(255, 255, 255, 0.75)", textTransform: "uppercase", letterSpacing: "0.06em", marginTop: "0.2rem" }}>
              Encircled Heritage Vistas
            </div>
          </div>
        </div>

        {/* Subtle Scroll Cue */}
        <a
          href="#masterplan"
          style={{
            marginTop: "2.5rem",
            color: "rgba(255, 255, 255, 0.55)",
            display: "inline-flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.35rem",
            textDecoration: "none",
            fontSize: "0.75rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            transition: "color 0.2s ease",
          }}
          className="scroll-cue"
        >
          <span>EXPLORE MASTERPLAN</span>
          <ArrowDown size={14} />
        </a>
      </div>

      {/* Cinematic Drone Video Modal */}
      {videoModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "rgba(0, 0, 0, 0.92)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            backdropFilter: "blur(12px)",
          }}
          onClick={() => setVideoModalOpen(false)}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "1000px",
              aspectRatio: "16 / 9",
              backgroundColor: "#000000",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.8)",
              border: "1px solid rgba(212, 175, 55, 0.4)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setVideoModalOpen(false)}
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                background: "rgba(0,0,0,0.7)",
                border: "1px solid rgba(255,255,255,0.3)",
                color: "#FFFFFF",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 10,
                fontSize: "1.2rem",
              }}
            >
              ✕
            </button>
            <video
              controls
              autoPlay
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              poster={coverImage}
            >
              <source src={videoUrl} type="video/mp4" />
              <source src="/videos/hero-drone-720p.mp4" type="video/mp4" />
              <source src={fallbackVideo} type="video/mp4" />
            </video>
          </div>
        </div>
      )}

      <style jsx>{`
        .tour-btn:hover {
          color: #ee5d2b !important;
        }
        .scroll-cue:hover {
          color: #d4af37 !important;
        }
        @media (max-width: 768px) {
          .hero-video-controls {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
