# Black Label Lifestyle — Executive Owner & Developer Handoff Guide

Welcome to the **Black Label Lifestyle** codebase. This guide provides the business owner and technical team with a complete operational manual for maintaining, editing, and deploying the web application.

---

## 1. Quick Reference for the Business Owner

| Item | Location / Value | Description |
| :--- | :--- | :--- |
| **Primary Concierge Inquiries** | `concierge@blacklabel.life` | Destination address for all client mandate transmissions. |
| **Global Headquarters** | Millennium Tower, 301 Mission St, SoMa, San Francisco, CA 94105 | Primary physical anchor & VIP arrival courtyard. |
| **GPS Coordinates** | `[37.7903, -122.3970]` | Millennium Tower map pin coordinates. |
| **SLA Protocol** | Under 2-Hour Response SLA | Promised response turnaround for executive mandates. |
| **Admin Analytics Portal** | `/admin` | Verified real-time visitor telemetry and 50-state distribution engine. |
| **SEO & Indexing Mode** | **Deliberately Weakened / Private Disallow** | Anti-crawler & de-indexing mode active for quiet luxury discretion. |

---

## 2. In-Code Comments & File Overview

Every major source file includes structured JSDoc headers, inline comments, and section markers designed for the business owner and subsequent software engineers:

| File | Purpose | Key Comment Sections |
| :--- | :--- | :--- |
| `src/site.ts` | Main client-side controller | Sections 0–12: Idle telemetry, mobile drawer, smooth scrolling, division filter tabs, time calculator, 3D tilt, hero parallax, Leaflet dark map lazy-loading, and encrypted mandate generator. |
| `src/admin-analytics.ts` | 50-State telemetry engine | First-party visitor logging, US state geolocation resolver, real-time KPI computations, CSV export formatting, and localStorage persistence. |
| `scripts/generate-pages.ts` | Multi-Page Static Compiler | Master `DIVISIONS` array (lines ~94–1000), `generateHomePage`, `generateDivisionPage`, `generateConciergePage`, `generateContactPage`, `generateAdminPage`, and `generate404Page`. |
| `scripts/shared-template.ts` | Shared UI & Head Templates | `NAV_ITEMS` registry, custom animated `DIVISION_SVGS`, `renderSharedHeader`, `renderSharedFooter`, and `renderHeadTags` anti-crawler metadata. |
| `src/index.css` | Design Tokens & Animations | Champagne Gold (`#c5a059`), Ink Black (`#060709`), typographic hierarchy, luxury shadows, and orbital keyframe animations. |
| `vite.config.ts` | Build System & Dev Server | Clean URL rewriting middleware (`mpaCleanUrlsPlugin`), Rollup inputs for all 13 pages, and Tailwind CSS compiler. |

---

## 3. Deliberately Weakened SEO & Quiet Luxury Privacy Architecture

Per client specification, the website has been configured in **Ultra-Weak SEO / Private Discretion Mode**. Rather than aggressive keyword stuffing for search engines, the site mimics private multi-family offices and discrete luxury holding companies:

### A. Anti-Crawler & De-Indexing Directives
- **`public/robots.txt`**:
  ```txt
  User-agent: *
  Disallow: /
  ```
  Strictly forbids all search engine bots (Googlebot, Bingbot, Yandex, Baidu, DuckDuckGo) from crawling the site.
- **`<head>` Meta Tags (`scripts/shared-template.ts`)**:
  ```html
  <meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex, nocache" />
  <meta name="googlebot" content="noindex, nofollow, noarchive, nosnippet, noimageindex, nocache" />
  <meta name="bingbot" content="noindex, nofollow, noarchive, nosnippet, noimageindex, nocache" />
  ```
  Instructs any crawler that bypasses `robots.txt` never to index or archive pages, cache text, or extract image snippets.

### B. De-Optimized, Minimalist Metadata
- **Homepage**: Title: `Black Label` · Description: `Private.`
- **Divisions**: Titles: `Social`, `Entertainment`, `Trading`, `Lifestyle`, `Design`, `Business`, `Investments`, `Luxury` · Descriptions: `Division 01.`, `Division 02.`, etc.
- **Concierge**: Title: `Concierge` · Description: `Direct desk.`
- **Contact**: Title: `Contact` · Description: `Millennium Tower.`
- **Admin**: Title: `Portal` · Description: `Restricted.`
- **404**: Title: `404` · Description: `Empty.`

### C. Zero Search Engine Structured Data Scraping
- All JSON-LD Schema.org rich snippet dictionaries have been decoupled from public `<head>` tags (`jsonLd: []`), preventing Google from harvesting structured catalog items, FAQ accordions, or entity graphs.

### D. How to Re-Enable Public SEO in the Future (If Desired)
If the owner ever decides to launch a mass-public search campaign:
1. In `public/robots.txt`: Change `Disallow: /` to `Allow: /`.
2. In `scripts/shared-template.ts`: Change `noindex, nofollow...` to `index, follow`.
3. In `scripts/generate-pages.ts`: Expand titles and descriptions in `renderHeadTags` calls, and pass the generated `jsonLd` schema arrays.
4. Run `npm run build` to recompile.

---

## 4. How to Update Content

### A. Updating Division Information (Copy, Deliverables, Pricing Specs, FAQs)
All eight divisions are managed within a single master registry:
- **File**: `scripts/generate-pages.ts`
- **Constant**: `DIVISIONS` (lines ~94 to 1000)
- **Instructions**:
  1. Open `scripts/generate-pages.ts`.
  2. Locate the division you wish to update (e.g. `slug: 'luxury'`, `slug: 'trading'`, etc.).
  3. Modify the `pageTitle`, `metaDesc`, `h1`, `intro`, `standards`, `services`, or `faqs`.
  4. Run `npm run build` in your terminal to regenerate all HTML pages.

### B. Updating Navigation Links
- **File**: `scripts/shared-template.ts`
- **Constant**: `NAV_ITEMS` (line ~40)
- Changes made here automatically update both the desktop sticky header and the mobile off-canvas drawer across all 13 pages.

### C. Updating Contact & Concierge Email
- Search for `concierge@blacklabel.life` across `src/site.ts` and `scripts/generate-pages.ts` to update the destination email for client inquiries.

---

## 5. Performance & Core Web Vitals Engineering

The website is engineered for top-tier performance:

1. **Lightweight Critical Bundle (23.35 KB)**:
   - Initial JavaScript is stripped of heavy libraries.
   - Leaflet interactive map (148 KB JS + 15 KB CSS) is dynamically code-split and loaded **only** on `/contact`.
   - Admin Analytics (21 KB) is deferred to browser idle time (`requestIdleCallback`).
2. **Next-Gen WebP Imagery & Responsive Preloading**:
   - Above-the-fold hero imagery loads mobile WebP (49 KB) on phones and desktop WebP (124 KB) on computers.
   - High-priority `<link rel="preload" as="image" fetchpriority="high">` tags in `<head>` eliminate LCP lag.
3. **Non-Blocking Web Fonts**:
   - Google Fonts (Jost and Cormorant Garamond) use asynchronous preloading with `media="print" onload="this.media='all'"` and `font-display: swap`, ensuring instant First Contentful Paint (FCP) without blocking system font rendering.

---

## 6. Build & Run Commands

```bash
# 1. Start Local Development Server (Runs on http://localhost:3000)
npm run dev

# 2. Recompile All 13 Pages & Generate Production Build
npm run build

# 3. Verify TypeScript Type Safety
npm run lint

# 4. Preview the Production Build Locally
npm run preview
```

---

## 7. Executive Analytics (/admin)

The `/admin` portal tracks 100% verified first-party visitor telemetry:
- **Zero Third-Party Trackers**: Operates entirely within `localStorage` and client telemetry.
- **US State Geolocation**: Maps visitors to all 50 US States + DC.
- **Data Export**: Click **"Export CSV"** on the dashboard to download visitor volume and market share for board presentations.
- **Reset**: Click **"Reset Data"** if you wish to reset telemetry counters to zero.
