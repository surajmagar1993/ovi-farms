"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ValueStrip from "@/components/ValueStrip";
import Masterplan from "@/components/Masterplan";
import AgroServices from "@/components/AgroServices";
import Amenities from "@/components/Amenities";
import LocationMatrix from "@/components/LocationMatrix";
import PricingCalculator from "@/components/PricingCalculator";
import TrustCenter from "@/components/TrustCenter";
import Gallery from "@/components/Gallery";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import MobileActionBar from "@/components/MobileActionBar";
import BookingModal from "@/components/BookingModal";
import BrochureModal from "@/components/BrochureModal";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function HomePage() {
  const [config, setConfig] = useState<any>(null);
  const [plots, setPlots] = useState<any[]>([]);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [brochureOpen, setBrochureOpen] = useState(false);
  const [selectedPlot, setSelectedPlot] = useState<any>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  useEffect(() => {
    // Fetch live site config & plots from our persistent store
    fetch("/api/config")
      .then((res) => res.json())
      .then((data) => {
        if (data.config) setConfig(data.config);
      })
      .catch((err) => console.error("Error loading config:", err));

    fetch("/api/plots")
      .then((res) => res.json())
      .then((data) => {
        if (data.plots) setPlots(data.plots);
      })
      .catch((err) => console.error("Error loading plots:", err));
  }, []);

  const handleOpenBookingWithPlot = (plot: any) => {
    setSelectedPlot(plot);
    setBookingOpen(true);
  };

  const handleOpenGeneralBooking = () => {
    setSelectedPlot(null);
    setBookingOpen(true);
  };

  return (
    <main style={{ minHeight: "100vh", position: "relative", backgroundColor: "#071D17" }}>
      {/* GLOBAL FIXED CINEMATIC DRONE VIDEO BACKGROUND */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={config?.hero?.coverImage || "/images/hero-sahyadri-valley.jpg"}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.82) contrast(1.05) saturate(1.15)",
            transform: "translate3d(0, 0, 0)",
          }}
        >
          <source src={config?.hero?.videoUrl || "/videos/hero-drone-web.mp4"} type="video/mp4" />
          <source src="/videos/hero-drone-web.mp4" type="video/mp4" />
          <source src="/videos/hero-drone-720p.mp4" type="video/mp4" />
          <source
            src={
              config?.hero?.fallbackVideoUrl ||
              "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-green-nature-and-trees-42686-large.mp4"
            }
            type="video/mp4"
          />
        </video>
        {/* Subtle Ambient Vignette & Emerald Tint */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(7, 29, 23, 0.22) 0%, rgba(7, 29, 23, 0.32) 40%, rgba(7, 29, 23, 0.45) 100%)",
          }}
        />
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
      {/* Top Navbar */}
      <Navbar
        onOpenBooking={handleOpenGeneralBooking}
        brand={config?.brand}
        phone={config?.contact?.phone}
        whatsapp={config?.contact?.whatsapp}
      />

      {/* Hero Section */}
      <Hero
        heroData={config?.hero}
        onOpenBooking={handleOpenGeneralBooking}
        onOpenBrochure={() => setBrochureOpen(true)}
      />

      {/* SEO Breadcrumb Navigation */}
      <Breadcrumbs />

      {/* Value Pillars */}
      <ValueStrip />

      {/* Interactive Masterplan & Plot Selector */}
      <Masterplan
        plots={plots}
        onSelectPlotForBooking={handleOpenBookingWithPlot}
        whatsapp={config?.contact?.whatsapp}
      />

      {/* 24/7 Managed Agro-Forestry Services */}
      <AgroServices services={config?.agroServices} />

      {/* Country Club & Resort Amenities */}
      <Amenities amenities={config?.amenities} />

      {/* Strategic Location Matrix */}
      <LocationMatrix />

      {/* Transparent Pricing & ROI Calculator */}
      <PricingCalculator
        whatsapp={config?.contact?.whatsapp}
        onOpenBooking={handleOpenGeneralBooking}
      />

      {/* Legal Transparency & Trust Documents */}
      <TrustCenter />

      {/* Photo & Video Gallery (Managed via Admin CMS) */}
      <Gallery galleryItems={config?.gallery} />

      {/* FAQ Accordion */}
      <FaqSection />

      {/* Footer */}
      <Footer brand={config?.brand} contact={config?.contact} />

      {/* Mobile Sticky Quick Action Bar */}
      <MobileActionBar
        onOpenBooking={handleOpenGeneralBooking}
        phone={config?.contact?.phone}
        whatsapp={config?.contact?.whatsapp}
      />

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        selectedPlot={selectedPlot}
      />

      {/* Gated Brochure Download Modal */}
      <BrochureModal
        isOpen={brochureOpen}
        onClose={() => setBrochureOpen(false)}
        whatsapp={config?.contact?.whatsapp}
      />
    </div>
  </main>
  );
}
