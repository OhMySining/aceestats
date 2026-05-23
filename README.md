# AceeStats

AceeStats is a premium student activity tracking and social logging platform designed to help learners log, rate, and showcase their extracurricular involvement across school organizations in the Philippines.

---

## 🌟 High-Fidelity Features

### 1. ✍️ Extracurricular Activity Logging (Log Page)
* **Detailed Logs**: Log activities with descriptive titles, date, host club, and reflections.
* **1–5 Star Rating System**: Rate enjoyment, learning outcomes, and overall values with interactive SVG stars.
* **Photo Attachments**: Upload and attach high-resolution memory proofs directly from your local disk using a dynamic Base64 FileReader uploader.
* **Campus Integration**: Tie logs to specific schools or default to your primary campus.

### 2. 👤 Student Extracurricular Portfolio (Profile Page)
* **Identity Card**: Showcases student name (**Ethan Sterling**), custom avatar, bio, and a dedicated **🏫 UP Diliman** badge.
* **🔥 Active Streak counter**: Visualizes consecutive active loggings with a custom glowing, pulsing CSS animation.
* **Rating Distribution**: Calculates log star frequencies and renders stagger-animated progressive progress bars.
* **Featured Favorites Grid**: Spotlights your top 4 highest-rated activities with smooth hover zoom animations.
* **Personal Archive**: Lists all chronological activity logs with campus metadata.

### 3. 👥 Social Feed & Analytics Panel (Feed Page)
* **Classmates Directory**: Real-time directory of online classmates across different schools (e.g. *Sarah from Ateneo*, *Alex from De La Salle*, *Carlos from UST*).
* **Community Timeline**: Scrolling feed of recent activity cards with responsive social reactions ("Clap", "Support") and animations.
* **📊 Personal Metrics Widget**: Computes dynamic stats in real time (Total Logs, Average Rating, and Top Category) inside a dedicated glassmorphic sidebar card.

### 4. 📈 Organization Analytics Scoreboard (Trending Page)
* **Top 3 Podium**: Showcases the 3 most active clubs (Student Council, Debate Society, Robotics) inside beautiful pedestal columns.
* **Real-time Re-ranking**: Scoreboard updates dynamically when users express interest using the active **"Want to Join"** button. The database re-sorts all organizations instantly using the formula: `logs_count * 2 + interests_count`.

---

## 🎨 Premium UI/UX & Styling
* **Emerald Sage Theme**: Harmonized HSL custom colors designed for high-end digital platforms.
* **Sleek Dark Mode**: A floating theme controller persists user dark/light mode preference across page reloads.
* **Glassmorphism**: Backdrop filters (`blur(16px)`), translucent white overlays, and ultra-fine card borders.
* **Tab Icon (Favicon)**: Custom tab logo using the Gemini-generated AceeStats brand logo.

---

## 🏗️ Technical Architecture
* **Frontend**: HTML5, custom HSL CSS3, responsive single-page Vanilla JS framework.
* **Simulated Relational Database**: Implemented in **[app.js](app.js)** using `localStorage`. Seeds comprehensive starting items (5 clubs, 10 friends, 12 logs, and interests) so the system is immediately functional.
* **Auto-Healing Schema Engine**: Features a database seed version tracker. Outdated local caches automatically purge and re-seed clean, working assets in the browser on page load.
* **Simulated REST API Router**: Simulates REST endpoints asynchronously with mock network latency (150ms) to provide an authentic client-server performance simulation.

---

## 📂 Developer & Agent Resources

To support co-development, the detailed specifications for this project are organized into specialized files. You can find the main documentation entry point at:
* 📑 **[AGENTS.md](AGENTS.md)**: Main developer and AI agent manual.
  * 📋 **[prd.md](prd.md)**: Product Requirements Document.
  * 🏗️ **[sdd.md](sdd.md)**: System Design Document.
  * 🎨 **[design.md](design.md)**: UI/UX Design Specification.

---

AceeStats is intended to help students stay organized, celebrate their achievements, and discover activity trends across their school community.
