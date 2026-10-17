# OVI FARMS — Public Experience UI/UX Blueprint
*Page-Specific Design Specification*

---

## 1. Page Layout & Section Wireframes

```
┌─────────────────────────────────────────────────────────────┐
│ STICKY GLASS NAVBAR: Logo | Nav Links | Phone | Book CTA   │
├─────────────────────────────────────────────────────────────┤
│ 1. HERO (Full Bleed): Drone/Nature Video + Gold Headline    │
│    "Own Your Private Countryside Sanctuary"                 │
│    [Schedule Free Site Visit] [Explore Master Layout]       │
│    Floating Trust Badges: Clear Title • Managed Farming • RERA
├─────────────────────────────────────────────────────────────┤
│ 2. VALUE PROPOSITION STRIP (4 Pillars):                     │
│    100% Clear Title | Expert Agronomists | Club Life | 60m  │
├─────────────────────────────────────────────────────────────┤
│ 3. THE LIVING MASTERPLAN (Interactive SVG Plot Map):       │
│    Filter Tabs: [All Plots] [0.25 Acre] [0.5 Acre] [1 Acre] │
│    Visual Grid/Map with status colors: Green/Amber/Gray     │
│    Side/Popup Inspector with Plot Stats & Instant Quote     │
├─────────────────────────────────────────────────────────────┤
│ 4. MANAGED AGRO-FORESTRY & FARMING LIFESTYLE:              │
│    Orchards Showcase • Drip Tech • Organic Harvest Deliveries
├─────────────────────────────────────────────────────────────┤
│ 5. RESORT CLUB & AMENITIES:                                │
│    Infinity Pool • Stargazing Deck • Café • Wellness Pods   │
├─────────────────────────────────────────────────────────────┤
│ 6. STRATEGIC LOCATION & DISTANCE MATRIX:                   │
│    Expressway, Airport, Hospitals, Towns + Google Maps link │
├─────────────────────────────────────────────────────────────┤
│ 7. TRANSPARENT PRICING & ACREAGE CALCULATOR:               │
│    Interactive Slider: Size -> Cost -> Farming Benefit      │
├─────────────────────────────────────────────────────────────┤
│ 8. LEGAL INTEGRITY & TRUST BADGES:                         │
│    Clear Title Guarantee • Soil Health • Water Test Report  │
├─────────────────────────────────────────────────────────────┤
│ 9. PHOTO & VIDEO GALLERY (Driven by Admin CMS):            │
│    High-res filterable gallery: Aerials, Flora, Villas      │
├─────────────────────────────────────────────────────────────┤
│ 10. FAQ ACCORDION & SITE VISIT BOOKING ENGINE:             │
│     Frictionless 3-step scheduler with Cab Pickup toggle    │
├─────────────────────────────────────────────────────────────┤
│ 11. LUXURY FOOTER: Detailed Address, Disclaimers, Socials   │
├─────────────────────────────────────────────────────────────┤
│ MOBILE STICKY BAR: [📞 Call] [💬 WhatsApp] [📅 Book Visit]  │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Interactive Masterplan Visual Specification
- **Map Container:** Responsive SVG / CSS Grid with 16:9 aspect ratio or adaptive pan-zoom container.
- **Plot Card Popover:**
  - Appears with a spring transition (`transform: scale(1) translateY(0)`).
  - Displays:
    - Plot ID (e.g. `Plot #14`)
    - Acreage (e.g. `0.25 Acre / 10,890 sq.ft`)
    - Status Badge (Available in Emerald, Reserved in Amber)
    - Plantations (e.g. `12 Alphonso Mangoes, 8 Teak border trees`)
    - Action: *"Book This Plot"* / *"Inquire on WhatsApp"*.

---

## 3. Responsive Breakpoints & Device Behavior
- **Mobile (< 768px):**
  - Hero headline scales via `clamp()` to 2.25rem.
  - Masterplan presents a toggle between **Visual Map** and **List View** for easy one-handed selection.
  - Sticky bottom action bar fixed at `bottom: 0`, height `64px`, glassmorphic backdrop.
- **Tablet (768px – 1024px):**
  - 2-column cards for amenities and farming showcase.
  - Plot layout explorer fills 100% width with touch-friendly popovers.
- **Desktop (1024px – 1920px):**
  - Side-by-side masterplan: Visual map on left (70% width), real-time plot detail inspector on right (30% width).
- **Smart TV / 4K Displays (> 1920px):**
  - Max container width capped at `1440px` centered.
  - Scaled font size ensuring effortless 10-foot legibility for family living rooms and presentation screens.
