# OVI FARMS — Finalized Technology Stack Architecture

## 1. Selected Technology Stack
Based on stakeholder decisions, the OVI FARMS platform will be architected as a **Full-Stack Next.js Application** with a **Structured JSON Persistence Layer**.

```
┌─────────────────────────────────────────────────────────────┐
│                    OVI FARMS WEB PLATFORM                   │
├──────────────────────────────┬──────────────────────────────┤
│    Public Client Portal      │     Admin CMS & Lead Portal  │
│  (Next.js React Client)      │   (Next.js Protected Portal) │
│  - 120Hz GPU Micro-effects   │   - Secure Session Auth      │
│  - Interactive Masterplan    │   - Dynamic Logo & Media CMS │
│  - Site Visit Booking Engine │   - Customer Leads Log Table │
│  - Price & Acreage Calc      │   - 1-Click Excel (.xlsx)    │
├──────────────────────────────┴──────────────────────────────┤
│                   Next.js App Router (v15+)                 │
│         Server Components + API Route Handlers              │
│       `/api/leads`, `/api/admin/*`, `/api/export`           │
├─────────────────────────────────────────────────────────────┤
│                    Styling & Design System                  │
│       Vanilla CSS Modules / CSS Custom Properties           │
│       - Earth Luxury Design System (ui-ux-pro-max)          │
│       - Hardware-Accelerated 60/120Hz Transitions           │
├─────────────────────────────────────────────────────────────┤
│               Persistence & File Storage Layer              │
│       Structured JSON Store (Atomic File Read/Writes)       │
│       - `data/site-config.json` (Logo, Hero, Gallery, Plots)│
│       - `data/leads.json` (Customer Submissions & Statuses) │
│       - `public/uploads/` (Uploaded high-res media)         │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Component Specifications

### 2.1 Core Framework & Runtime
* **Framework:** **Next.js (App Router)**
* **Language:** TypeScript / JavaScript (Modern React 19)
* **Rendering Strategy:** Hybrid
  * *Server Components (RSC):* Fast initial page load, SEO meta tags, OpenGraph previews, and minimal JavaScript overhead.
  * *Client Components:* Interactive plot selection, dynamic pricing calculator, booking modals, and 120Hz UI micro-interactions.

### 2.2 Styling & Aesthetics
* **Approach:** **Vanilla CSS / CSS Modules with Design Tokens**
* **Tokens & Theme:** Derived from `ui-ux-pro-max` design intelligence:
  * Primary Palette: Deep Forest Emerald (`#0D3B2E`), Rich Sand/Beige (`#F7F4EE`), Warm Gold/Ochre (`#D4AF37`), Dark Slate (`#161D1A`).
  * Typography: Display Serif for luxury elegance (e.g. *Playfair Display* / *Cinzel*) + Modern clean Sans-Serif for high legibility (*Inter* / *Plus Jakarta Sans*).
* **Universal Multi-Device Adaptive Engine:**
  * **Fluid Typography & Spacing:** CSS `clamp(min, val, max)` ensures headings and padding gracefully scale from small smartphone screens up to 4K / 8K TV displays without jarring breakpoints.
  * **Device Tiers Handled:**
    * *Phones (320px–480px):* Single-column flow, bottom sticky action sheet, full-width touch cards.
    * *Tablets (481px–1024px):* 2-column adaptive grids, landscape/portrait auto-reflow.
    * *Laptops/Desktops (1025px–1920px):* Multi-column luxury cards, side-by-side plot layout inspector.
    * *Ultra-Wide & Smart TVs (1920px–3840px / 4K):* Centered container constraints (`max-width: 1440px`–`1600px`), 10-foot viewing distance legibility for living rooms and presentation screens.
* **120Hz High Refresh Rate Pipeline:**
  * All active animations use GPU-accelerated compositing (`transform: translate3d()`, `opacity`).
  * CSS `backdrop-filter: blur(12px)` for glassmorphism without CPU frame drops.
  * Strict avoidance of layout thrashing and unthrottled resize/scroll triggers.

### 2.3 Backend API & Server Actions
* **Route Handlers:**
  * `POST /api/leads` — Public endpoint to record inquiries, site visits, and brochure requests.
  * `POST /api/admin/login` & `POST /api/admin/logout` — Authentication & session cookie management.
  * `GET  /api/admin/leads` — Authenticated retrieval of leads with search & status filters.
  * `PATCH /api/admin/leads/:id` — Update lead progress status (New, Contacted, Visit Scheduled, Closed).
  * `GET  /api/admin/leads/export` — Generates and streams Microsoft Excel (`.xlsx`) files.
  * `GET  /api/content` — Public endpoint to serve active logo, media URLs, and plot statuses.
  * `PUT  /api/admin/content` — Updates logo, hero banner, gallery, and plot statuses.
  * `POST /api/admin/upload` — Multipart file uploads for photos, videos, and logos into `public/uploads/`.

### 2.4 Data Persistence (Structured JSON Store)
* **File Structure:**
  * `data/site-config.json` — Stores site identity, current logo, hero video/image, photo/video gallery list, and plot layout inventory with availability states.
  * `data/leads.json` — Stores customer contact logs, visit dates, cab pickup preferences, timestamps, and status notes.
* **Concurrency & Safety:**
  * Atomic writes using temporary file swaps (`fs.promises.writeFile` with atomic replace) to avoid file corruption under concurrent requests.

### 2.5 Specialized Libraries
* **Excel Generation:** `xlsx` (SheetJS) — Server-side spreadsheet building and binary streaming.
* **Authentication Security:** Encrypted session cookies / JWT with secure hash validation (`bcryptjs`).
* **Icons:** `lucide-react` for crisp high-DPI vector icons.
