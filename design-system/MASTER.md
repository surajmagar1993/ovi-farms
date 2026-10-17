# OVI FARMS — Master Design System Specification (MASTER.md)
*Generated with UI/UX Pro Max Intelligence*

---

## 1. Brand Identity & Visual Philosophy
- **Brand Archetype:** The Oasis of Green Wealth — A fusion of serene countryside living and elite country-club luxury.
- **Core Aesthetic:** **Organic Luxury + Precision Glassmorphism**
  - Organic nature elements (deep emerald greens, warm sandstone, natural botanical textures).
  - High-end hospitality & realty cues (champagne gold accents, refined serif typography, crisp borders).
  - High-tech 120Hz micro-interactions (frosted glass badges, smooth GPU scale effects, silky transitions).

---

## 2. Color Palette & Design Tokens

### 2.1 Core Palette Tokens (CSS Custom Properties)

```css
:root {
  /* Brand Primary: Deep Forest Emerald */
  --color-primary-900: #071D17;
  --color-primary-800: #0B2A22;
  --color-primary-700: #0F3B30;  /* Main Brand Emerald */
  --color-primary-600: #165243;
  --color-primary-500: #1D6B57;

  /* Brand Accent: Champagne & Antique Gold */
  --color-gold-600: #A88424;
  --color-gold-500: #C5A059;     /* Core Gold Accent */
  --color-gold-400: #D4AF37;     /* Bright Gold Highlight */
  --color-gold-300: #E6CE78;
  --color-gold-100: #FAF4E2;

  /* Nature Neutrals: Warm Sand & Alabaster */
  --color-sand-50:  #FDFBF7;     /* Warm Page Background */
  --color-sand-100: #F7F3EB;     /* Card & Section Surface */
  --color-sand-200: #EFE9DC;     /* Subtle Borders & Dividers */
  --color-sand-300: #DFD7C4;
  --color-sand-800: #2C2824;     /* Deep Neutral Text */

  /* Dark Luxury (Hero, Footer, Club sections, Admin sidebar) */
  --color-dark-950: #090F0D;     /* Pure Deep Pine */
  --color-dark-900: #0E1714;     /* Dark Surface */
  --color-dark-800: #16231F;     /* Dark Card Background */
  --color-dark-700: #21332D;     /* Dark Borders & Chips */

  /* Semantic Plot States */
  --color-status-available: #10B981;  /* Emerald Green: Available */
  --color-status-reserved:  #F59E0B;  /* Amber Gold: Under Reservation */
  --color-status-sold:      #64748B;  /* Slate Charcoal: Sold Out */
  
  /* Text Contrast Standards */
  --text-primary: #1C2420;
  --text-secondary: #56645E;
  --text-muted: #84948D;
  --text-inverse: #FFFFFF;
  --text-gold: #D4AF37;
}
```

### 2.2 Glassmorphism & Elevation System

```css
:root {
  /* Glass Surfaces (Light & Dark) */
  --glass-light-bg: rgba(255, 255, 255, 0.75);
  --glass-light-border: rgba(255, 255, 255, 0.4);
  --glass-dark-bg: rgba(14, 23, 20, 0.72);
  --glass-dark-border: rgba(212, 175, 55, 0.22);
  --glass-blur: blur(16px);

  /* Shadows (Curated Warm Shadows, Not Harsh Black) */
  --shadow-sm: 0 2px 8px rgba(7, 29, 23, 0.05);
  --shadow-md: 0 8px 24px rgba(7, 29, 23, 0.08);
  --shadow-lg: 0 16px 40px rgba(7, 29, 23, 0.12);
  --shadow-gold: 0 8px 30px rgba(212, 175, 55, 0.25);
  --shadow-inner: inset 0 1px 2px rgba(255, 255, 255, 0.2);

  /* Radius System */
  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 20px;
  --radius-xl: 32px;
  --radius-full: 9999px;
}
```

---

## 3. Typography Architecture

### 3.1 Font Families
- **Display / Headings:** `'Playfair Display', Georgia, serif`
  - *Weights:* 500, 600, 700 (italic accents for emotional hooks).
  - *Role:* Conveys heritage, architectural luxury, and prestige.
- **Body & Navigation:** `'Plus Jakarta Sans', -apple-system, sans-serif`
  - *Weights:* 400 (regular), 500 (medium), 600 (semi-bold), 700 (bold).
  - *Role:* Crisp, modern geometric sans-serif ensuring effortless readability from 320px screens to 4K TVs.
- **Data & Acreage Figures:** `'Space Mono', monospace`
  - *Weights:* 500, 700.
  - *Role:* Plot coordinates, square footage measurements, and pricing badges.

### 3.2 Fluid Typography Hierarchy (using `CSS clamp()`)

```css
:root {
  /* Scales seamlessly from mobile (320px) to 4K TV (3840px) */
  --font-h1: clamp(2.25rem, 5vw + 1rem, 4.5rem);      /* 36px -> 72px */
  --font-h2: clamp(1.85rem, 3.5vw + 0.5rem, 3.25rem);  /* 30px -> 52px */
  --font-h3: clamp(1.4rem, 2vw + 0.5rem, 2.25rem);     /* 22px -> 36px */
  --font-h4: clamp(1.15rem, 1.2vw + 0.3rem, 1.5rem);   /* 18px -> 24px */
  --font-body: clamp(0.95rem, 0.4vw + 0.85rem, 1.15rem);/* 15px -> 18.5px */
  --font-small: clamp(0.8rem, 0.2vw + 0.75rem, 0.95rem); /* 13px -> 15px */
  --font-label: 0.75rem;

  --line-height-tight: 1.15;
  --line-height-normal: 1.6;
  --line-height-relaxed: 1.8;
  --letter-spacing-wide: 0.05em;
  --letter-spacing-ultrawide: 0.15em;
}
```

---

## 4. 120Hz Animation & Micro-Interaction Engine

### 4.1 Frame Pacing & Hardware Acceleration Rules
1. **GPU Composited Only:** Animations use `transform: translate3d()` and `opacity` only. Never animate `width`, `height`, `margin`, or `top/left`.
2. **Spring Timing Curves:**
   ```css
   --ease-luxury: cubic-bezier(0.16, 1, 0.3, 1);    /* Silky deceleration */
   --ease-smooth: cubic-bezier(0.25, 0.1, 0.25, 1);
   --duration-fast: 180ms;
   --duration-normal: 320ms;
   --duration-slow: 600ms;
   ```
3. **High Refresh Rate Touch Feedback:**
   - Button tap scale: `transform: scale(0.98)` on active state.
   - Plot card hover: `transform: translateY(-4px)` with gold glow expansion.

---

## 5. UI Component Design Specifications

### 5.1 Luxury Button Variants
- **Primary Gold CTA (`.btn-gold`):**
  - Background: Gradient from `--color-gold-500` to `--color-gold-400`.
  - Color: `#090F0D` (Deep Pine for bold contrast).
  - Hover: Elevation lift + gold ambient glow (`box-shadow: var(--shadow-gold)`).
- **Secondary Emerald CTA (`.btn-emerald`):**
  - Background: `--color-primary-700`.
  - Color: `#FFFFFF`.
  - Border: `1px solid rgba(212, 175, 55, 0.3)`.
- **Ghost Luxury CTA (`.btn-ghost-gold`):**
  - Transparent background, `1.5px solid var(--color-gold-400)`, text in Gold with smooth fill transition.

### 5.2 Interactive Masterplan Plot Node
- **Plot Tile (`.plot-node`):**
  - Border: 1.5px solid based on state (`--color-status-available`, `--color-status-reserved`, `--color-status-sold`).
  - Available: Subtle pulsing emerald indicator badge.
  - Hover: Scale 1.05 + popover card displaying Plot Number, Acreage, Plantation mix, and "Inquire" button.

### 5.3 Site Visit Booking Modal
- 3-step progressive reveal with visual progress bar.
- Date picker highlighting upcoming weekends with leaf/nature icons.
- Toggle switch for *"Need Free Cab Pickup from City Center?"*.

---

## 6. Admin Portal Design Language

### 6.1 Theme & Layout
- **Style:** Executive Slate-Emerald Dark Mode (`#0E1714` background with `#16231F` cards).
- **Sidebar:** Collapsible navigation with gold icon highlights (Dashboard, Media/Logo CMS, Leads Table, Plot Layout Manager, Settings).
- **Action Toolbar:**
  - Search bar + Status filter chips (All, New, Contacted, Visit Confirmed, Closed).
  - **"Export to Excel (.xlsx)" Button:** Standout button with Microsoft Excel emerald/gold accent and download icon.
- **Media Upload Cards:**
  - Drag-and-drop file dropzones with instant thumbnail preview, file size indicator, and "Set as Hero / Logo" toggle.
