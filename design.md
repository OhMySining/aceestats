# UI/UX Design Specification

## Project: AceeStats (Student Activity Tracking Platform)

| Attribute | Details |
| :--- | :--- |
| **Document Version** | v1.1.0 |
| **Theme** | Emerald Sage & Glassmorphism |
| **Design Paradigm** | Responsive, Alive, High-Contrast Premium Dark & Light Modes |

---

## 1. Brand Identity & Design Philosophy

AceeStats is a student activity tracker. The design should evoke **growth, active achievement, community, and energy**.
* **Clean & Modern Layouts:** Using structured grid columns and generous spacing to prevent visual clutter.
* **Glassmorphic Depth:** Translucent backgrounds (`backdrop-filter: blur()`) paired with thin, crisp borders to create depth and a premium look.
* **Medalling & Streaks (Gamification):** Beautiful custom elements like glowing, pulsing streaks (🔥) and rank badges to reward active co-development.

---

## 2. Design System & Design Tokens

### 2.1 Typography
* **Primary Headings Font:** `Outfit`, sans-serif (imported from Google Fonts). Known for its geometric, premium, and friendly shape.
* **Body & UI Font:** `Inter`, sans-serif. Highly readable, clean, and professional for tabular data and paragraphs.

### 2.2 Color System
Tailored HSL palettes specifically formulated for premium presentation in both Light and Dark modes.

#### Light Mode Tokens:
* `--bg-primary`: `#F2F7F4` (Very soft minty gray)
* `--bg-card`: `rgba(255, 255, 255, 0.8)`
* `--border-card`: `rgba(255, 255, 255, 0.4)`
* `--text-main`: `#14281c` (Deep dark forest green)
* `--text-muted`: `#576d60` (Muted olive-gray)
* `--accent-primary`: `#10B981` (Vibrant Emerald Green)
* `--accent-hover`: `#059669` (Darker Emerald)
* `--accent-light`: `rgba(16, 185, 129, 0.1)`
* `--accent-secondary`: `#34D399` (Mint Green)
* `--shadow`: `0 8px 32px 0 rgba(16, 185, 129, 0.08)`

#### Dark Mode Tokens:
* `--bg-primary`: `#08110b` (Ultra-deep forest black)
* `--bg-card`: `rgba(16, 28, 20, 0.7)`
* `--border-card`: `rgba(255, 255, 255, 0.04)`
* `--text-main`: `#ECFDF5` (Soft white-emerald)
* `--text-muted`: `#8E9F95` (Sage gray)
* `--accent-primary`: `#10B981` (Vibrant Emerald Green)
* `--accent-hover`: `#34D399` (Brighter Mint)
* `--accent-secondary`: `#059669` (Darker Emerald)
* `--accent-light`: `rgba(16, 185, 129, 0.15)`
* `--shadow`: `0 8px 32px 0 rgba(0, 0, 0, 0.35)`

---

## 3. Page Layouts & Component Design

### 3.1 Layout 1: Log Page (Activity Tracker)
A centered, clean form container with high interactive feedback.
* **Form Container:** Centered card, `max-width: 680px`. Use a subtle shadow and thin border.
* **Associated School Input:** Premium input field to associate activities with a campus.
* **Interactive Star Rating Selector:**
  - Stars are drawn using SVG paths.
  - Hovering over a star scales it by `1.2x` and fills it with vibrant gold/amber (`#FBBF24`).

### 3.2 Layout 2: Profile Page (Dashboard)
A dynamic, two-column split layout.
* **Left Column (Profile Info Card - 1/3 Width):**
  - **Avatar & Bio:** Circular avatar with a dual-ring gradient border.
  - **🏫 School Badge:** Custom primary tag (`.profile-school`) representing their Philippine campus.
  - **🔥 Gamified Streak Badge:** Pulsing, glowing indicator (`.profile-streak`) celebrating consecutive weeks of logging.
* **Right Column (Main Board - 2/3 Width):**
  - **Top 4 Favorites Grid:** A `2x2` grid showcasing the best logs. On hover, the background image scales up (`transform: scale(1.08)`).

### 3.3 Layout 3: Feed Page (3-Column Social Hub)
* **Left Panel (20%): Friend Directory**
  - Displays classmates alongside green status indicators and school names.
* **Center Panel (60%): Interactive Post Feed**
  - Card-based feeds displaying creator names, respective schools, categories, and attached images.
* **Right Panel (20%): Quick Actions & User Analytics**
  - Features quick navigation buttons, and a **📊 User Metrics Card** showing Total Logs, Average Rating, and Top Category updated in real time.

### 3.4 Layout 4: Trending Page (Analytics Scoreboard)
* **Top 3 Podium:**
  - Top 3 organizations showcased in vertical column pedestals (Gold, Silver, Bronze theme headers).

---

## 4. UI CSS Stylesheet Recipes

### 4.1 Gamified Active Streak Pulse Animation
```css
.profile-streak {
  font-size: 12px;
  font-weight: 800;
  color: #f59e0b; /* Amber */
  background: rgba(245, 158, 11, 0.1);
  padding: 4px 12px;
  border-radius: var(--radius-xl);
  margin-bottom: 18px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  box-shadow: 0 0 10px rgba(245, 158, 11, 0.05);
  animation: pulseStreak 2s infinite ease-in-out;
}

@keyframes pulseStreak {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 10px rgba(245, 158, 11, 0.05);
  }
  50% {
    transform: scale(1.03);
    box-shadow: 0 0 15px rgba(245, 158, 11, 0.2);
  }
}
```

### 4.2 School Badge Style
```css
.profile-school {
  font-size: 13px;
  font-weight: 700;
  color: var(--accent-primary);
  background: var(--accent-light);
  padding: 4px 12px;
  border-radius: var(--radius-xl);
  margin-bottom: 14px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  text-align: center;
}
```
