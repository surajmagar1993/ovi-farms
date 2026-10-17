# OVI FARMS — Admin Portal & CMS UI/UX Blueprint
*Page-Specific Design Specification*

---

## 1. Information Architecture & Navigation

```
┌────────────────────────────────────────────────────────────────────────┐
│ TOP BAR: [Logo Preview] | OVI FARMS Admin Console | [Admin User] [Logout]│
├─────────────────┬──────────────────────────────────────────────────────┤
│ SIDEBAR         │ MAIN CONTENT AREA                                    │
│                 │                                                      │
│ 📊 Overview     │ 1. STATS BANNER:                                     │
│    (Dashboard)  │    Total Inquiries | Site Visits | Available Plots   │
│                 ├──────────────────────────────────────────────────────┤
│ 📋 Customer     │ 2. CUSTOMER LEADS & CONTACT LOG:                     │
│    Leads Log    │    [Search...] [Filter: All / Site Visits / Contact] │
│                 │    [📥 EXPORT TO EXCEL (.xlsx)]                      │
│ 🖼️ Media &      │                                                      │
│    Logo CMS     │    Table Columns:                                    │
│                 │    • Date & Time | Name | Phone | Email | Inquiry    │
│ 🗺️ Plot Status  │    • Visit Date & Slot | Cab Pickup | Status | Action│
│    Manager      │                                                      │
│                 ├──────────────────────────────────────────────────────┤
│ ⚙️ Settings     │ 3. LIVE BRANDING & LOGO CMS:                         │
│                 │    • Current Logo Preview (Light & Dark preview)     │
│                 │    • Upload New Logo (SVG, PNG, WebP)                │
│                 │    • Site Title & Tagline Editor                     │
│                 ├──────────────────────────────────────────────────────┤
│                 │ 4. MEDIA & GALLERY MANAGER:                          │
│                 │    • Hero Media: Video URL / Image Dropzone          │
│                 │    • Gallery Photos Manager (Add, Reorder, Delete)   │
│                 │    • Drone / Amenities Video Links                   │
│                 ├──────────────────────────────────────────────────────┤
│                 │ 5. PLOT AVAILABILITY TOGGLE:                         │
│                 │    • Instant status switch for Plot #1 to #48        │
│                 │      [Available 🟢] [Reserved 🟡] [Sold ⚪]           │
└─────────────────┴──────────────────────────────────────────────────────┘
```

---

## 2. Interactive Lead Management & Excel Export UX
- **Data Table Styling:**
  - Dark Slate surface (`#16231F`) with subtle `#21332D` row dividers.
  - Alternating subtle row hover highlight with 120Hz smooth transition.
  - Interactive status dropdown per row allowing instant status update (*New* -> *Contacted* -> *Visit Scheduled* -> *Closed*).
- **Excel Export Action (`.xlsx`):**
  - High-visibility button with Excel icon and gold/emerald styling.
  - Instant client/server generation: clicking triggers instant download without page refresh.
  - Downloaded spreadsheet includes formatted headers, auto-calculated column widths, and proper date formatting.

---

## 3. Logo & Media CMS Management UX
- **Live Logo Replacement:**
  - Shows real-time dual preview: how the logo looks on the dark hero header and on the light sand footer.
  - File picker + drag & drop area with instant thumbnail generation.
  - Save button updates `data/site-config.json` immediately.
- **Media Gallery Grid:**
  - Thumbnail grid of active pictures and videos.
  - Category tags: *Landscape*, *Orchards*, *Clubhouse*, *Avenue*.
  - Delete and preview actions on each item.
