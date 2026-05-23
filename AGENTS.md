# Agent & Developer Documentation Hub (AGENTS.md)

Welcome to the **AceeStats Agent & Developer Hub**. This file serves as the main directory and operational manual for both artificial intelligence agents and human developers operating within this repository. 

Here you will find links to the core product, engineering, and design specification files that define the AceeStats platform.

---

## 📂 Core Documentation Index

This repository separates the high-level business vision, engineering architecture, and visual aesthetics into three detailed documents. Select a document below to view its full specification:

````carousel
### 📋 Product Requirements Document
[prd.md](file:///c:/Users/efren%20L%20Cenir/OneDrive/Desktop/aceestats/prd.md)

**Focus:** What we are building, who we are building it for, and the functional feature specifications of the platform.

**Key Sections:**
- Target User Personas
- Detailed Functional Requirements (Log, Profile, Feed, Trending pages)
- Product Roadmap & Milestones
<!-- slide -->
### 🏗️ System Design Document
[sdd.md](file:///c:/Users/efren%20L%20Cenir/OneDrive/Desktop/aceestats/sdd.md)

**Focus:** How we are building it, database ER schemas, application architectures, and API endpoints.

**Key Sections:**
- Three-Tier Client-Server Architecture
- Relational Database Schemas (MySQL tables)
- RESTful JSON API specifications
- Core Data Flow Sequences
<!-- slide -->
### 🎨 UI/UX Design Specification
[design.md](file:///c:/Users/efren%20L%20Cenir/OneDrive/Desktop/aceestats/design.md)

**Focus:** The visual identity, responsive layouts, color systems, and interactive micro-animations.

**Key Sections:**
- Typography (`Outfit` & `Inter` font pairings)
- HSL Custom Colors (Premium Emerald Sage theme)
- Dark Mode vs. Light Mode specifications
- CSS transition & micro-animation recipes
````

---

## 🤖 Instructions & Guidelines for Coding Agents

If you are an AI coding agent assigned to edit, debug, or build features in this codebase, you **must** adhere to the following rules:

### 1. Database Integrity
* All database interactions must match the MySQL schema detailed in [sdd.md](file:///c:/Users/efren%20L%20Cenir/OneDrive/Desktop/aceestats/sdd.md).
* Do not introduce direct database schema changes without updating the ER diagram and raw SQL creation statements in the SDD.
* Ensure all tables use standard relational integrity, proper foreign key cascade rules, and check constraints (e.g., star ratings constrained to `1 AND 5`).

### 2. Styling & UX Excellence
* Avoid generic, raw HTML components. Implement the glassmorphic aesthetics defined in [design.md](file:///c:/Users/efren%20L%20Cenir/OneDrive/Desktop/aceestats/design.md).
* Keep components interactive. Apply hover scaling (`transform: scale(...)`), subtle shadows, and state-change transitions on stars, cards, and buttons.
* Maintain complete compatibility with the dual-theme system (`[data-theme="dark"]`). Always write styling using CSS variables.

### 3. Progressive Code Delivery
* Ensure frontend features (Vanilla JavaScript, HTML structure) are separated neatly from server-side handlers.
* Build features incrementally, starting with the **Database Schema & Server-Side API** first, followed by **Client-Side Views & Integration**.

---

## 📈 Project Status & Quick Links

- **Main User Overview:** [README.md](file:///c:/Users/efren%20L%20Cenir/OneDrive/Desktop/aceestats/README.md)
- **Current Milestone:** `Phase 1: MVP Core (Log & Profile Pages)`
- **Tech Stack:** HTML5 / CSS3 / Vanilla JS (Frontend) + MySQL 8.0 + Node.js / PHP (Backend)
