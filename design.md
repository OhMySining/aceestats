# UI/UX Design Specification

## Project: AceeStats (Student Activity Tracking Platform)

| Attribute | Details |
| :--- | :--- |
| **Document Version** | v1.0.0 |
| **Theme** | Emerald Sage & Glassmorphism |
| **Design Paradigm** | Responsive, Alive, High-Contrast Premium Dark & Light Modes |

---

## 1. Brand Identity & Design Philosophy

AceeStats is a student activity tracker. The design should evoke **growth, active achievement, community, and energy**.
* **Clean & Modern Layouts:** Using structured grid columns and generous spacing to prevent visual clutter.
* **Glassmorphism Elements:** Translucent backgrounds (`backdrop-filter: blur()`) paired with thin, crisp borders to create depth and a premium look.
* **Micro-Animations:** Interactive elements must feel organic, using spring-like bezier curves for scaling, transitions, and hover behaviors.

---

## 2. Design System & Design Tokens

### 2.1 Typography
* **Primary Headings Font:** `Outfit`, sans-serif (imported from Google Fonts). Known for its geometric, premium, and friendly shape.
* **Body & UI Font:** `Inter`, sans-serif. Highly readable, clean, and professional for tabular data and paragraphs.

### 2.2 Color System
Tailored palettes specifically formulated for premium presentation in both Light and Dark modes.

#### Light Mode Tokens:
* `--bg-primary`: `#F4F7F5` (Very soft minty gray)
* `--bg-card`: `rgba(255, 255, 255, 0.8)`
* `--border-card`: `rgba(255, 255, 255, 0.4)`
* `--text-main`: `#1A2F22` (Deep dark forest green)
* `--text-muted`: `#607367` (Muted olive-gray)
* `--accent-primary`: `#10B981` (Vibrant Emerald Green)
* `--accent-hover`: `#059669` (Darker Emerald)
* `--accent-secondary`: `#34D399` (Mint Green)
* `--shadow`: `0 8px 32px 0 rgba(16, 185, 129, 0.08)`

#### Dark Mode Tokens:
* `--bg-primary`: `#0B130E` (Ultra-deep forest black)
* `--bg-card`: `rgba(18, 30, 23, 0.7)`
* `--border-card`: `rgba(255, 255, 255, 0.05)`
* `--text-main`: `#ECFDF5` (Soft white-emerald)
* `--text-muted`: `#8E9F95` (Sage gray)
* `--accent-primary`: `#10B981` (Vibrant Emerald Green)
* `--accent-hover`: `#34D399` (Brighter Mint)
* `--accent-secondary`: `#059669` (Darker Emerald)
* `--shadow`: `0 8px 32px 0 rgba(0, 0, 0, 0.37)`

---

## 3. Page Layouts & Component Design

### 3.1 Layout 1: Log Page (Activity Tracker)
A centered, clean form container with high interactive feedback.
* **Form Container:** Centered card, `max-width: 600px`. Use a subtle shadow and thin border.
* **Interactive Star Rating Selector:**
  - Stars are drawn using SVG paths.
  - Hovering over a star scales it by `1.2x` and fills it with vibrant gold/amber (`#FBBF24`).
  - Left-hand stars fill automatically on hover.
  - Smooth animation: `transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)`.
* **Image Drag-and-Drop Area:**
  - Dashed border (`border: 2px dashed var(--accent-primary)`).
  - Hovering over the upload zone changes the background to a soft translucent green tint with a slide-up icon animation.

### 3.2 Layout 2: Profile Page (Dashboard)
A dynamic, two-column split layout.
* **Left Column (Profile Info Card - 1/3 Width):**
  - **Avatar & Bio:** Circular avatar with a dual-ring gradient border representing activity status.
  - **Rating Distribution Breakdown:** A vertical list of star classes (5★ down to 1★). Beside each is a progress bar. The bar fills dynamically using CSS `transition: width 1s ease-out` on page load to reveal how many activities the student has in each tier.
* **Right Column (Main Board - 2/3 Width):**
  - **Top 4 Favorites Grid:** A `2x2` grid showcasing the best logs. Card designs use a gradient background overlay. On hover, the background image scales up (`transform: scale(1.05)`) inside its overflow-hidden container, while details fade in from the bottom.
  - **Recent Activity Log Timeline:** Vertical timeline tracking chronological events with small emerald node markers.

### 3.3 Layout 3: Feed Page (3-Column Social Hub)
* **Left Panel (20%): Friend Directory**
  - Dynamic profile list with status indicator dots (green = online, green ring = active logger).
* **Center Panel (60%): Interactive Post Feed**
  - Card-based feeds. Each activity card showcases the creator, organization, star rating, full description, and high-resolution picture attachment.
  - Interactive reaction buttons (e.g. "Clap", "Support", "Comment") that trigger subtle bounce animations.
* **Right Panel (20%): Quick Navigation & Activity Statistics**
  - Easy toggle links and static profile overview shortcuts.

### 3.4 Layout 4: Trending Page (Analytics Scoreboard)
* **Top 3 Podium:**
  - Top 3 organizations showcased in vertical column pedestals (Gold, Silver, Bronze theme headers).
  - Subtle glow effects around the pedestals (`box-shadow: 0 0 20px var(--accent-primary)`).
* **Rankings Table:**
  - Glassmorphic list where rows slide into place on page load (`animation: slideIn 0.5s ease forwards`).
  - Each row features a custom button to toggle user interest ("Want to Join") which transitions from a hollow outlined button to a filled emerald button on click, displaying a micro-particle pop effect.

---

## 4. UI CSS Stylesheet Recipes

### 4.1 CSS Variables & Themes
```css
/* Core Styling System - Variable Setup */
:root {
  --font-heading: 'Outfit', sans-serif;
  --font-body: 'Inter', sans-serif;
  
  /* Light Mode Default */
  --bg-primary: #f4f7f5;
  --bg-card: rgba(255, 255, 255, 0.8);
  --border-card: rgba(255, 255, 255, 0.4);
  --text-main: #1a2f22;
  --text-muted: #607367;
  --accent-primary: #10b981;
  --accent-hover: #059669;
  --shadow: 0 8px 32px 0 rgba(16, 185, 129, 0.08);
}

[data-theme="dark"] {
  --bg-primary: #0b130e;
  --bg-card: rgba(18, 30, 23, 0.7);
  --border-card: rgba(255, 255, 255, 0.05);
  --text-main: #ecfdf5;
  --text-muted: #8e9f95;
  --accent-primary: #10b981;
  --accent-hover: #34d399;
  --shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
}

body {
  font-family: var(--font-body);
  background-color: var(--bg-primary);
  color: var(--text-main);
  transition: background-color 0.3s ease, color 0.3s ease;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
}
```

### 4.2 Card Glassmorphism & Hover Transition
```css
.premium-card {
  background: var(--bg-card);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--border-card);
  border-radius: 16px;
  padding: 24px;
  box-shadow: var(--shadow);
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
              box-shadow 0.3s ease;
}

.premium-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 40px 0 rgba(16, 185, 129, 0.15);
}
```

### 4.3 Star Micro-Animations
```css
.star-selector svg {
  width: 32px;
  height: 32px;
  fill: #d1d5db;
  cursor: pointer;
  transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
              fill 0.2s ease;
}

.star-selector svg:hover {
  transform: scale(1.25);
}

.star-selector svg.active {
  fill: #fbbf24;
}
```
