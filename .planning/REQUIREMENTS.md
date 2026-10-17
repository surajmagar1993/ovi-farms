# OVI FARMS — Requirements Specification

## 1. Functional Requirements (FR)
- [x] **FR-1 [Hero & First Impression]:** Full-bleed nature visual, emotional headline, trust pills, and dual CTAs ("Schedule Free Site Visit" and "Explore Master Layout").
- [x] **FR-2 [Interactive Master Plan]:** Visual map/grid with plot dimensions, orientation, status filters (Available, Reserved, Sold), and instant plot quote popup.
- [x] **FR-3 [Managed Agro Experience]:** 4-pillar managed farming showcase (agronomists, smart drip irrigation, annual harvest delivery, live fencing & caretaking).
- [x] **FR-4 [Clubhouse & Amenities]:** Visual cards with high-end photography for pool, stargazing deck, café, kids park, organic orchards, and wellness pavilion.
- [x] **FR-5 [Strategic Location & Connectivity]:** Interactive travel time matrix and distance cards to airports, tech corridors, highways, and medical centers with Google Maps link.
- [x] **FR-6 [Transparent Pricing & Financial Estimator]:** Interactive plot acreage calculator with cost breakdown, managed farming inclusions, and estimated appreciation.
- [x] **FR-7 [Legal Transparency & Clear Title Center]:** Clear title guarantee, RERA verification details, certified soil health & groundwater test report badges.
- [x] **FR-8 [Site Visit Booking Engine]:** 3-step frictionless booking modal with date selection, weekend highlight, complimentary cab pickup option, and instant WhatsApp confirmation.
- [x] **FR-9 [Gated Brochure & Layout Download]:** Fast modal capturing lead contact info with instant download and automated WhatsApp delivery.
- [x] **FR-10 [Persistent Contact & Omnichannel Support]:** Floating WhatsApp chat button, mobile sticky action bar, quick phone call button, and comprehensive footer.
- [x] **FR-11 [Admin Authentication & Session Security]:** Dedicated secure login `/admin` with persistent session token and protected routes.
- [x] **FR-12 [Dynamic Site Identity & Media CMS]:** Admin control to live-update Logo (SVG/PNG), Hero media, Gallery photos & videos, and plot statuses.
- [x] **FR-13 [Customer Inquiries Log & Excel Export]:** Centralized table of contact submissions, site visit bookings, and brochure requests with status management and one-click `.xlsx` export.

## 2. Non-Functional Requirements (NFR)
- [x] **NFR-1 [Visual Fidelity & High Refresh Rate (60/120Hz)]:** 4K/Retina high-DPI assets, locked 60–120fps GPU-accelerated micro-interactions (`transform`, `opacity`), zero layout thrashing, and buttery-smooth scrolling.
- [x] **NFR-2 [Performance & Core Web Vitals]:** Google Lighthouse score > 90 on mobile & desktop, sub-2.0s Largest Contentful Paint (LCP).
- [x] **NFR-3 [Universal Multi-Device Responsive Architecture]:** Automatic dynamic layout adaptation across all viewports:
  - Mobile Phones (320px–480px): Thumb-friendly UX, persistent sticky bottom quick-action bar (Call/WhatsApp/Book), swipeable cards.
  - Tablets & Foldables (481px–1024px): Adaptive 2-column grids, landscape/portrait auto-reflow, touch-friendly plot selector.
  - Desktop PCs & Laptops (1025px–1920px): Full-featured luxury layouts, side-by-side masterplan explorer, sticky header.
  - Ultra-Wide & Smart TVs (1920px–3840px / 4K): 10-foot UI legibility for family living room / investor pitches, fluid CSS `clamp()` scaling, max-width centered container bounds.
- [x] **NFR-4 [SEO & Social Sharing]:** Rich OpenGraph previews for WhatsApp link sharing, JSON-LD Schema (`RealEstateAgent`, `Place`, `FAQPage`).
- [x] **NFR-5 [Accessibility & Contrast]:** WCAG 2.1 AA compliant contrast ratios across dark forest greens, warm gold, and sand neutrals.
- [x] **NFR-6 [Data Protection & Secure API]:** Authenticated admin endpoints and spam-protected public forms.

