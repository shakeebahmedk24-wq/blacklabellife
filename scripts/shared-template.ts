/**
 * ============================================================================
 * BLACK LABEL LIFESTYLE — SHARED TEMPLATES & MASTER SEO ARCHITECTURE
 * ============================================================================
 * 
 * OWNER & DEVELOPER HANDOFF GUIDE:
 * ----------------------------------------------------------------------------
 * This module is the single source of truth for all shared HTML components
 * across the 13 static pages of the Black Label Lifestyle digital presence:
 * 
 * CORE OWNER CAPABILITIES:
 * 1. Global Navigation Configuration (NAV_ITEMS):
 *    - To reorder, add, or rename divisions in the top header and mobile drawer,
 *      edit the `NAV_ITEMS` array below.
 * 2. Master Head & SEO Architecture (renderHeadTags):
 *    - Injects OpenGraph 1200x630 cards, Twitter summaries, and Schema.org JSON-LD.
 *    - Manages non-blocking Google Web Fonts (Jost + Cormorant Garamond).
 *    - Injects high-priority LCP image preloads with mobile/desktop srcset media queries.
 * 3. Shared Sticky Luxury Header (renderSharedHeader):
 *    - Renders the desktop navigation bar, active division indicators,
 *      and the "Concierge Desk" quick-action button.
 * 4. Off-Canvas Mobile Drawer:
 *    - Accessible full-screen modal drawer for iPhone, iPad, and Android viewports.
 * 5. Global Luxury Shared Footer (renderSharedFooter):
 *    - Millennium Tower origin story, proprietary DBA disclaimers,
 *      division links, and live 24/7 coverage status indicators.
 * 6. Bespoke Animated Vector Art (DIVISION_SVGS):
 *    - Handcrafted SVG illustrations with champagne gold gradients, orbital geometry,
 *      and pulse keyframes representing each specialized brand.
 * ============================================================================
 */

import * as fs from 'fs';
import * as path from 'path';

/**
 * Navigation items rendered across desktop header and mobile drawer.
 * Strict requested sequence: Social, Entertainment, Trading, Lifestyle, Design, Business, Investments, Luxury.
 */
const NAV_ITEMS = [
  { label: 'Social', href: '/social', id: 'nav-social' },
  { label: 'Entertainment', href: '/entertainment', id: 'nav-entertainment' },
  { label: 'Trading', href: '/trading', id: 'nav-trading' },
  { label: 'Lifestyle', href: '/lifestyle', id: 'nav-lifestyle' },
  { label: 'Design', href: '/design', id: 'nav-design' },
  { label: 'Business', href: '/business-services', id: 'nav-business' },
  { label: 'Investments', href: '/investments', id: 'nav-investments' },
  { label: 'Luxury', href: '/luxury', id: 'nav-luxury' },
];

/**
 * Bespoke Division SVGs:
 * Custom vector artwork featuring champagne (#c5a059), obsidian backgrounds,
 * and orbital CSS animation classes.
 */
export const DIVISION_SVGS: Record<string, string> = {
  social: `
    <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full" aria-label="Social media algorithm network illustration">
      <title>Black Label Social Network Art</title>
      <defs>
        <radialGradient id="socialCoreGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ebd4a2" stop-opacity="0.5" />
          <stop offset="60%" stop-color="#c5a059" stop-opacity="0.15" />
          <stop offset="100%" stop-color="#c5a059" stop-opacity="0" />
        </radialGradient>
      </defs>
      <!-- Ambient Core Aura -->
      <circle cx="200" cy="120" r="60" fill="url(#socialCoreGlow)" class="anim-ambient-breathe" />
      <!-- Orbital concentric rings with rotation -->
      <circle cx="200" cy="120" r="84" stroke="#c5a059" stroke-width="1" stroke-opacity="0.25" class="anim-spin-slow-center anim-dash-flow" />
      <circle cx="200" cy="120" r="54" stroke="#c5a059" stroke-width="1.5" stroke-opacity="0.5" class="anim-spin-slow-center-rev" />
      <circle cx="200" cy="120" r="28" stroke="#ebd4a2" stroke-width="0.75" stroke-opacity="0.4" class="anim-pulse-core" />
      <!-- Central AI Core -->
      <circle cx="200" cy="120" r="14" fill="#c5a059" fill-opacity="0.25" stroke="#c5a059" stroke-width="2" class="anim-pulse-core" />
      <circle cx="200" cy="120" r="4" fill="#faf8f5" />
      <!-- Dynamic Network Waves with flowing dashed data strokes -->
      <path d="M70 120 C 130 60, 270 180, 330 120" stroke="#c5a059" stroke-width="1.5" stroke-opacity="0.85" class="anim-dash-flow" />
      <path d="M100 180 C 160 100, 240 140, 300 60" stroke="#c5a059" stroke-width="1.2" stroke-opacity="0.55" class="anim-dash-flow-fast" />
      <!-- Connecting vector rays -->
      <line x1="135" y1="88" x2="200" y2="120" stroke="#c5a059" stroke-width="1" stroke-opacity="0.5" />
      <line x1="265" y1="152" x2="200" y2="120" stroke="#c5a059" stroke-width="1" stroke-opacity="0.5" />
      <!-- Floating and Sparkling Satellite Nodes -->
      <g class="anim-float-node">
        <circle cx="100" cy="180" r="4" fill="#c5a059" />
        <circle cx="100" cy="180" r="9" stroke="#c5a059" stroke-width="0.75" stroke-opacity="0.4" />
      </g>
      <g class="anim-float-node-delayed">
        <circle cx="300" cy="60" r="4" fill="#c5a059" />
        <circle cx="300" cy="60" r="9" stroke="#c5a059" stroke-width="0.75" stroke-opacity="0.4" />
      </g>
      <circle cx="135" cy="88" r="4.5" fill="#faf8f5" class="anim-sparkle" />
      <circle cx="265" cy="152" r="4.5" fill="#faf8f5" class="anim-sparkle-delayed" />
      <!-- Traveling light packets -->
      <circle r="2" fill="#faf8f5">
        <animateMotion path="M135 88 L200 120" dur="2.4s" repeatCount="indefinite" />
      </circle>
      <circle r="2" fill="#faf8f5">
        <animateMotion path="M265 152 L200 120" dur="3s" repeatCount="indefinite" />
      </circle>
    </svg>
  `,
  entertainment: `
    <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full" aria-label="In-residence private dining and event illustration">
      <title>Black Label Entertainment Private Event Art</title>
      <defs>
        <radialGradient id="candleAuraGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ebd4a2" stop-opacity="0.5" />
          <stop offset="45%" stop-color="#c5a059" stop-opacity="0.18" />
          <stop offset="100%" stop-color="#c5a059" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="flameGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#ffffff" />
          <stop offset="25%" stop-color="#ebd4a2" />
          <stop offset="70%" stop-color="#c5a059" />
          <stop offset="100%" stop-color="#997836" />
        </linearGradient>
      </defs>
      <!-- Base Dining Table & Horizon Line -->
      <line x1="130" y1="170" x2="270" y2="170" stroke="#c5a059" stroke-width="2" stroke-linecap="round" />
      <line x1="80" y1="190" x2="320" y2="190" stroke="#c5a059" stroke-width="0.5" stroke-opacity="0.3" stroke-dasharray="4 6" />
      <!-- Candle Column & Dish -->
      <path d="M160 170 L 160 90 Q 200 70 240 90 L 240 170" stroke="#c5a059" stroke-width="1.2" stroke-opacity="0.5" fill="#c5a059" fill-opacity="0.04" />
      <ellipse cx="200" cy="90" rx="40" ry="12" stroke="#c5a059" stroke-width="1.5" />
      <!-- Radiant Warmth Glow Behind Candle Flame -->
      <circle cx="200" cy="58" r="48" fill="url(#candleAuraGlow)" class="anim-ambient-breathe" />
      <!-- Rotating Sacred Geometric Halo Rings -->
      <circle cx="200" cy="60" r="24" stroke="#c5a059" stroke-width="0.75" stroke-opacity="0.4" stroke-dasharray="3 3" class="anim-spin-slow" />
      <circle cx="200" cy="60" r="34" stroke="#c5a059" stroke-width="0.5" stroke-opacity="0.2" stroke-dasharray="2 4" class="anim-spin-slow-center-rev" />
      <!-- Living Animated Candle Flame -->
      <g class="anim-flame">
        <path d="M200 42 C 195 53, 193 64, 200 72 C 207 64, 205 53, 200 42 Z" fill="url(#flameGrad)" />
        <ellipse cx="200" cy="63" rx="2.5" ry="5.5" fill="#faf8f5" />
      </g>
      <!-- Champagne Flute Silhouettes with Floating Rising Bubbles -->
      <g>
        <path d="M100 160 L 100 120 C 100 105, 115 105, 115 120 L 115 160" stroke="#c5a059" stroke-width="1.2" stroke-opacity="0.65" fill="#c5a059" fill-opacity="0.03" />
        <line x1="107.5" y1="160" x2="107.5" y2="180" stroke="#c5a059" stroke-width="1" />
        <line x1="98" y1="180" x2="117" y2="180" stroke="#c5a059" stroke-width="1" stroke-linecap="round" />
        <!-- Rising Champagne Bubbles Left -->
        <circle cx="107.5" cy="155" r="1.5" fill="#c5a059" class="anim-bubble-1" />
        <circle cx="104.5" cy="150" r="1.2" fill="#ebd4a2" class="anim-bubble-2" />
        <circle cx="110" cy="144" r="1.5" fill="#faf8f5" class="anim-bubble-3" />
      </g>
      <g>
        <path d="M285 160 L 285 120 C 285 105, 300 105, 300 120 L 300 160" stroke="#c5a059" stroke-width="1.2" stroke-opacity="0.65" fill="#c5a059" fill-opacity="0.03" />
        <line x1="292.5" y1="160" x2="292.5" y2="180" stroke="#c5a059" stroke-width="1" />
        <line x1="283" y1="180" x2="302" y2="180" stroke="#c5a059" stroke-width="1" stroke-linecap="round" />
        <!-- Rising Champagne Bubbles Right -->
        <circle cx="292.5" cy="155" r="1.5" fill="#c5a059" class="anim-bubble-4" />
        <circle cx="289.5" cy="150" r="1.2" fill="#ebd4a2" class="anim-bubble-1" />
        <circle cx="295" cy="144" r="1.5" fill="#faf8f5" class="anim-bubble-2" />
      </g>
      <!-- Center Specular Gleam -->
      <circle cx="200" cy="90" r="2.5" fill="#faf8f5" class="anim-sparkle" />
    </svg>
  `,
  trading: `
    <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full" aria-label="Collectible card grading and slab illustration">
      <title>Black Label Trading AI Grading Art</title>
      <defs>
        <linearGradient id="laserBeamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#c5a059" stop-opacity="0" />
          <stop offset="20%" stop-color="#c5a059" stop-opacity="0.8" />
          <stop offset="50%" stop-color="#ffffff" stop-opacity="1" />
          <stop offset="80%" stop-color="#c5a059" stop-opacity="0.8" />
          <stop offset="100%" stop-color="#c5a059" stop-opacity="0" />
        </linearGradient>
      </defs>
      <!-- Graded Slab Outer Frame with Luxury Shimmer -->
      <rect x="140" y="30" width="120" height="180" rx="8" stroke="#c5a059" stroke-width="1.8" stroke-opacity="0.8" class="anim-card-shimmer" />
      <!-- Header Label Area -->
      <rect x="148" y="38" width="104" height="34" rx="4" fill="#171a20" stroke="#c5a059" stroke-width="0.75" />
      <line x1="156" y1="48" x2="210" y2="48" stroke="#c5a059" stroke-width="1.5" />
      <line x1="156" y1="58" x2="190" y2="58" stroke="#c5a059" stroke-width="1" stroke-opacity="0.6" />
      <rect x="226" y="44" width="20" height="20" rx="2" fill="#c5a059" fill-opacity="0.25" stroke="#c5a059" stroke-width="1" class="anim-sparkle" />
      <!-- Internal Card Well -->
      <rect x="152" y="82" width="96" height="118" rx="4" stroke="#c5a059" stroke-width="1" stroke-opacity="0.4" fill="#0b0e13" />
      <!-- Central Cryptographic Polygon Diamond Core -->
      <polygon points="180,105 220,105 235,135 200,165 165,135" stroke="#c5a059" stroke-width="1.2" fill="#c5a059" fill-opacity="0.15" class="anim-holo-gem" />
      <!-- Corner Optical Calibration Reticles -->
      <circle cx="158" cy="88" r="2" fill="#c5a059" stroke="#ebd4a2" stroke-width="0.5" />
      <circle cx="242" cy="88" r="2" fill="#c5a059" stroke="#ebd4a2" stroke-width="0.5" />
      <circle cx="158" cy="194" r="2" fill="#c5a059" stroke="#ebd4a2" stroke-width="0.5" />
      <circle cx="242" cy="194" r="2" fill="#c5a059" stroke="#ebd4a2" stroke-width="0.5" />
      <!-- Precision Laser Scan Overlay Moving Vertically -->
      <g class="anim-laser-scan">
        <line x1="120" y1="140" x2="280" y2="140" stroke="url(#laserBeamGrad)" stroke-width="2" />
        <circle cx="200" cy="140" r="3.5" fill="#ffffff" />
      </g>
    </svg>
  `,
  lifestyle: `
    <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full" aria-label="Lifestyle chronometer and hour glass art representing time reclamation">
      <title>Black Label Lifestyle Time and Freedom Art</title>
      <defs>
        <radialGradient id="clockCenterGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ebd4a2" stop-opacity="0.35" />
          <stop offset="100%" stop-color="#c5a059" stop-opacity="0" />
        </radialGradient>
      </defs>
      <!-- Minimalist Chronometer Dial -->
      <circle cx="200" cy="120" r="70" stroke="#c5a059" stroke-width="1.5" stroke-opacity="0.75" />
      <circle cx="200" cy="120" r="78" stroke="#c5a059" stroke-width="0.75" stroke-opacity="0.3" stroke-dasharray="3 3" class="anim-spin-slow-center" />
      <circle cx="200" cy="120" r="46" stroke="#c5a059" stroke-width="0.5" stroke-opacity="0.25" class="anim-spin-slow-center-rev" />
      <circle cx="200" cy="120" r="35" fill="url(#clockCenterGlow)" class="anim-ambient-breathe" />
      <!-- Hour Indices -->
      <line x1="200" y1="52" x2="200" y2="62" stroke="#c5a059" stroke-width="2" />
      <line x1="200" y1="178" x2="200" y2="188" stroke="#c5a059" stroke-width="2" />
      <line x1="132" y1="120" x2="142" y2="120" stroke="#c5a059" stroke-width="2" />
      <line x1="258" y1="120" x2="268" y2="120" stroke="#c5a059" stroke-width="2" />
      <!-- Modern Hourglass Core -->
      <path d="M185 88 L 215 88 L 185 152 L 215 152 Z" stroke="#c5a059" stroke-width="1" stroke-opacity="0.6" fill="#c5a059" fill-opacity="0.08" />
      <!-- Flowing Sand Stream Particles -->
      <line x1="200" y1="110" x2="200" y2="140" stroke="#ebd4a2" stroke-width="1.5" class="anim-sand-stream" />
      <circle cx="200" cy="144" r="3" fill="#c5a059" class="anim-sparkle" />
      <!-- Smoothly Rotating Chronometer Seconds Hand -->
      <g class="anim-clock-hand">
        <line x1="200" y1="120" x2="200" y2="65" stroke="#faf8f5" stroke-width="1.5" stroke-linecap="round" />
        <circle cx="200" cy="65" r="2.5" fill="#faf8f5" />
      </g>
      <!-- Center Pivot Jewel -->
      <circle cx="200" cy="120" r="3.5" fill="#ebd4a2" stroke="#060709" stroke-width="1" />
    </svg>
  `,
  design: `
    <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full" aria-label="Architectural spatial golden ratio and staging illustration">
      <title>Black Label Design Cohesive Spaces Art</title>
      <defs>
        <radialGradient id="designGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ebd4a2" stop-opacity="0.3" />
          <stop offset="100%" stop-color="#c5a059" stop-opacity="0" />
        </radialGradient>
      </defs>
      <!-- Architectural Golden Rectangle Grid -->
      <rect x="110" y="45" width="180" height="150" stroke="#c5a059" stroke-width="1.5" stroke-opacity="0.8" class="anim-card-shimmer" />
      <line x1="221" y1="45" x2="221" y2="195" stroke="#c5a059" stroke-width="1" stroke-opacity="0.4" />
      <line x1="221" y1="138" x2="290" y2="138" stroke="#c5a059" stroke-width="1" stroke-opacity="0.4" />
      <!-- Golden Ratio Ambient Hearth Glow -->
      <circle cx="230" cy="145" r="38" fill="url(#designGlow)" class="anim-ambient-breathe" />
      <!-- Golden Spiral Curve with animated tracing light flow -->
      <path d="M110 195 A 111 111 0 0 1 221 45 A 69 69 0 0 1 290 138 A 42 42 0 0 1 248 195" stroke="#ebd4a2" stroke-width="1.75" stroke-linecap="round" fill="none" class="anim-spiral-flow" />
      <!-- Harmonic Proportion Nodes -->
      <circle cx="110" cy="195" r="3" fill="#c5a059" />
      <circle cx="221" cy="45" r="3" fill="#c5a059" />
      <circle cx="290" cy="138" r="3" fill="#c5a059" />
      <circle cx="248" cy="195" r="3.5" fill="#faf8f5" class="anim-sparkle" />
      <!-- Minimalist Interior Elevation Lines -->
      <line x1="130" y1="165" x2="190" y2="165" stroke="#faf8f5" stroke-width="1.5" stroke-opacity="0.9" />
      <line x1="140" y1="165" x2="140" y2="180" stroke="#faf8f5" stroke-width="1" stroke-opacity="0.8" />
      <line x1="180" y1="165" x2="180" y2="180" stroke="#faf8f5" stroke-width="1" stroke-opacity="0.8" />
    </svg>
  `,
  'business-services': `
    <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full" aria-label="Corporate legal and accounting balance architecture illustration">
      <title>Black Label Business Services Back Office Art</title>
      <defs>
        <radialGradient id="scaleGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ebd4a2" stop-opacity="0.35" />
          <stop offset="100%" stop-color="#c5a059" stop-opacity="0" />
        </radialGradient>
      </defs>
      <!-- Neoclassical Architectural Entablature -->
      <line x1="120" y1="65" x2="280" y2="65" stroke="#c5a059" stroke-width="2" stroke-linecap="round" />
      <line x1="130" y1="75" x2="270" y2="75" stroke="#c5a059" stroke-width="1.2" stroke-opacity="0.6" />
      <!-- Three Pillars: Accounting, Bookkeeping, Legal with light wash -->
      <line x1="150" y1="75" x2="150" y2="175" stroke="#c5a059" stroke-width="2" stroke-opacity="0.75" class="anim-facet-shimmer" />
      <line x1="200" y1="75" x2="200" y2="175" stroke="#c5a059" stroke-width="2" stroke-opacity="0.75" />
      <line x1="250" y1="75" x2="250" y2="175" stroke="#c5a059" stroke-width="2" stroke-opacity="0.75" class="anim-facet-shimmer" />
      <line x1="120" y1="175" x2="280" y2="175" stroke="#c5a059" stroke-width="2" stroke-linecap="round" />
      <!-- Fulcrum Radiant Glow -->
      <circle cx="200" cy="115" r="28" fill="url(#scaleGlow)" class="anim-ambient-breathe" />
      <!-- Precision Balance Scale Silhouette with gentle realistic pendulum sway -->
      <g class="anim-balance-beam">
        <line x1="165" y1="125" x2="235" y2="125" stroke="#ebd4a2" stroke-width="1.5" stroke-linecap="round" />
        <path d="M160 140 Q 165 148 170 140 Z" fill="#c5a059" fill-opacity="0.7" stroke="#ebd4a2" stroke-width="0.5" />
        <line x1="165" y1="125" x2="165" y2="140" stroke="#c5a059" stroke-width="0.75" />
        <path d="M230 140 Q 235 148 240 140 Z" fill="#c5a059" fill-opacity="0.7" stroke="#ebd4a2" stroke-width="0.5" />
        <line x1="235" y1="125" x2="235" y2="140" stroke="#c5a059" stroke-width="0.75" />
      </g>
      <!-- Central Fulcrum Keystone Jewel -->
      <circle cx="200" cy="115" r="5" fill="#faf8f5" stroke="#c5a059" stroke-width="1" class="anim-sparkle" />
    </svg>
  `,
  investments: `
    <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full" aria-label="Millennium Tower and SoMa real estate skyline illustration">
      <title>Black Label Investments SoMa Real Estate Art</title>
      <defs>
        <radialGradient id="spireAura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.8" />
          <stop offset="40%" stop-color="#ebd4a2" stop-opacity="0.4" />
          <stop offset="100%" stop-color="#c5a059" stop-opacity="0" />
        </radialGradient>
      </defs>
      <!-- Millennium Tower Silhouette Vector -->
      <polygon points="200,30 225,50 220,195 180,195 175,50" stroke="#c5a059" stroke-width="1.8" stroke-opacity="0.85" fill="#c5a059" fill-opacity="0.06" class="anim-card-shimmer" />
      <!-- Architectural Glass Facet Lines with Shimmer -->
      <line x1="200" y1="30" x2="200" y2="195" stroke="#c5a059" stroke-width="1" stroke-opacity="0.7" />
      <line x1="178" y1="90" x2="222" y2="90" stroke="#ebd4a2" stroke-width="0.75" stroke-opacity="0.45" class="anim-facet-shimmer" />
      <line x1="178" y1="130" x2="222" y2="130" stroke="#ebd4a2" stroke-width="0.75" stroke-opacity="0.45" />
      <line x1="178" y1="170" x2="222" y2="170" stroke="#ebd4a2" stroke-width="0.75" stroke-opacity="0.45" class="anim-facet-shimmer" />
      <!-- Surrounding SoMa Skyline Profiles -->
      <rect x="135" y="110" width="35" height="85" stroke="#c5a059" stroke-width="1" stroke-opacity="0.4" />
      <rect x="230" y="95" width="40" height="100" stroke="#c5a059" stroke-width="1" stroke-opacity="0.4" />
      <!-- Ground Horizon Line with Radar Sweep -->
      <line x1="90" y1="195" x2="310" y2="195" stroke="#c5a059" stroke-width="1.5" stroke-linecap="round" />
      <!-- Rooftop Aeronautical Obstruction Beacon Flashing at Apex -->
      <circle cx="200" cy="30" r="16" fill="url(#spireAura)" class="anim-ambient-breathe" />
      <circle cx="200" cy="30" r="3" fill="#ffffff" class="anim-spire-beacon" />
    </svg>
  `,
  luxury: `
    <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full" aria-label="Exotic automotive silhouette and fine diamond jewel illustration">
      <title>Black Label Luxury Car and Fine Jewelry Art</title>
      <defs>
        <radialGradient id="diamondGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.6" />
          <stop offset="40%" stop-color="#ebd4a2" stop-opacity="0.3" />
          <stop offset="100%" stop-color="#c5a059" stop-opacity="0" />
        </radialGradient>
      </defs>
      <!-- Brilliant Cut Diamond Geometry with Sparkles -->
      <circle cx="200" cy="70" r="38" fill="url(#diamondGlow)" class="anim-ambient-breathe" />
      <polygon points="200,50 230,50 245,70 200,105 155,70 170,50" stroke="#c5a059" stroke-width="1.5" stroke-opacity="0.9" fill="#c5a059" fill-opacity="0.12" class="anim-holo-gem" />
      <line x1="170" y1="50" x2="200" y2="70" stroke="#ebd4a2" stroke-width="0.75" />
      <line x1="230" y1="50" x2="200" y2="70" stroke="#ebd4a2" stroke-width="0.75" />
      <line x1="155" y1="70" x2="245" y2="70" stroke="#ebd4a2" stroke-width="0.75" />
      <line x1="200" y1="70" x2="200" y2="105" stroke="#ebd4a2" stroke-width="0.75" />
      <!-- Rotating Star Specular Flares at Diamond Vertices -->
      <g transform="translate(200, 50)" class="anim-sparkle">
        <line x1="-5" y1="0" x2="5" y2="0" stroke="#faf8f5" stroke-width="1.5" />
        <line x1="0" y1="-5" x2="0" y2="5" stroke="#faf8f5" stroke-width="1.5" />
      </g>
      <g transform="translate(155, 70)" class="anim-sparkle-delayed">
        <line x1="-4" y1="0" x2="4" y2="0" stroke="#faf8f5" stroke-width="1.2" />
        <line x1="0" y1="-4" x2="0" y2="4" stroke="#faf8f5" stroke-width="1.2" />
      </g>
      <g transform="translate(245, 70)" class="anim-sparkle">
        <line x1="-4" y1="0" x2="4" y2="0" stroke="#faf8f5" stroke-width="1.2" />
        <line x1="0" y1="-4" x2="0" y2="4" stroke="#faf8f5" stroke-width="1.2" />
      </g>
      <!-- Aerodynamic Supercar Profile with Speed Streak -->
      <path d="M100 170 C 130 170, 150 145, 185 142 C 220 140, 260 146, 290 158 L 305 170 Z" stroke="#c5a059" stroke-width="1.6" stroke-opacity="0.85" fill="#c5a059" fill-opacity="0.08" />
      <!-- Animated Aerodynamic Light Trail running along roofline -->
      <path d="M100 170 C 130 170, 150 145, 185 142 C 220 140, 260 146, 290 158 L 305 170" stroke="#ffffff" stroke-width="2" class="anim-speed-streak" />
      <!-- Lightweight Alloy Wheels with Specular Rings -->
      <circle cx="140" cy="170" r="14" stroke="#c5a059" stroke-width="1.5" />
      <circle cx="140" cy="170" r="7" stroke="#ebd4a2" stroke-width="0.75" class="anim-spin-slow" />
      <circle cx="270" cy="170" r="14" stroke="#c5a059" stroke-width="1.5" />
      <circle cx="270" cy="170" r="7" stroke="#ebd4a2" stroke-width="0.75" class="anim-spin-slow" />
    </svg>
  `,
  concierge: `
    <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full" aria-label="Millennium Tower Sovereign Concierge Astrolabe Seal">
      <title>Black Label Concierge Astrolabe Seal</title>
      <defs>
        <radialGradient id="conciergeCoreGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.5" />
          <stop offset="45%" stop-color="#ebd4a2" stop-opacity="0.25" />
          <stop offset="100%" stop-color="#c5a059" stop-opacity="0" />
        </radialGradient>
      </defs>
      <!-- Core Aura Glow -->
      <circle cx="200" cy="120" r="64" fill="url(#conciergeCoreGlow)" class="anim-ambient-breathe" />
      <!-- Outer Celestial Astrolabe Ring Rotating Slowly -->
      <circle cx="200" cy="120" r="82" stroke="#c5a059" stroke-width="1" stroke-opacity="0.35" stroke-dasharray="4 4" class="anim-spin-slow-center" />
      <circle cx="200" cy="120" r="68" stroke="#c5a059" stroke-width="1.5" stroke-opacity="0.6" class="anim-spin-slow-center-rev" />
      <circle cx="200" cy="120" r="50" stroke="#ebd4a2" stroke-width="0.75" stroke-opacity="0.4" class="anim-pulse-core" />
      <!-- Millennium Tower Vector Emblem inside Core -->
      <polygon points="200,65 212,75 210,145 190,145 188,75" stroke="#c5a059" stroke-width="1.2" fill="#c5a059" fill-opacity="0.2" />
      <line x1="200" y1="65" x2="200" y2="145" stroke="#ffffff" stroke-width="1" />
      <!-- Astrolabe Crosshair / Compass Axes -->
      <line x1="200" y1="34" x2="200" y2="206" stroke="#c5a059" stroke-width="0.75" stroke-opacity="0.5" stroke-dasharray="2 3" />
      <line x1="114" y1="120" x2="286" y2="120" stroke="#c5a059" stroke-width="0.75" stroke-opacity="0.5" stroke-dasharray="2 3" />
      <!-- Cardinal Compass Star Flares -->
      <g transform="translate(200, 36)" class="anim-sparkle">
        <circle cx="0" cy="0" r="3" fill="#ffffff" />
      </g>
      <g transform="translate(200, 204)" class="anim-sparkle-delayed">
        <circle cx="0" cy="0" r="3" fill="#ffffff" />
      </g>
      <g transform="translate(116, 120)" class="anim-sparkle">
        <circle cx="0" cy="0" r="3" fill="#ffffff" />
      </g>
      <g transform="translate(284, 120)" class="anim-sparkle-delayed">
        <circle cx="0" cy="0" r="3" fill="#ffffff" />
      </g>
      <!-- Center Sovereign Spire Sparkle -->
      <circle cx="200" cy="65" r="3" fill="#ffffff" class="anim-spire-beacon" />
    </svg>
  `,
};

/**
 * ============================================================================
 * SHARED STICKY LUXURY HEADER & MOBILE DRAWER (renderSharedHeader)
 * ============================================================================
 * Owner & Developer Guide:
 * Renders the top navigation bar across all 13 pages:
 * - Desktop: Sticky glassmorphism header with champagne gold underlines on active route.
 * - Mobile: Hamburger toggle triggering the off-canvas accessible slide-in drawer.
 * - Quick Actions: Direct link to the /concierge desk.
 * ============================================================================
 */
export function renderSharedHeader(activePath: string): string {
  const navLinks = NAV_ITEMS.map((item) => {
    const isActive = activePath === item.href || (activePath === '/' && item.href === '/index');
    return `
      <a href="${item.href}" id="${item.id}" class="text-[11px] sm:text-xs tracking-[0.16em] uppercase font-medium transition-all duration-300 px-2.5 py-1.5 rounded-sm relative group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a059] ${
      isActive
        ? 'text-[#c5a059] font-semibold'
        : 'text-[#e6e0d4]/80 hover:text-[#faf8f5]'
    }">
        ${item.label}
        <span class="absolute bottom-0 left-2.5 right-2.5 h-[1.5px] bg-[#c5a059] transition-transform duration-300 origin-left ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}"></span>
      </a>
    `;
  }).join('');

  const mobileNavLinks = NAV_ITEMS.map((item, index) => {
    const num = `0${index + 1}`;
    const isActive = activePath === item.href;
    return `
      <a href="${item.href}" class="flex items-center justify-between py-3.5 px-3 rounded border-b border-white/5 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a059] transition-all hover:bg-white/[0.02] ${
      isActive ? 'text-[#c5a059] bg-[#c5a059]/5' : 'text-[#faf8f5]'
    }">
        <div class="flex items-center gap-3">
          <span class="text-xs text-[#c5a059] font-mono tracking-widest">${num}</span>
          <span class="text-base font-serif tracking-wide group-hover:text-[#c5a059] transition-colors">${item.label}</span>
        </div>
        <span class="text-xs text-[#c5a059]/60 font-mono group-hover:translate-x-1 transition-transform">→</span>
      </a>
    `;
  }).join('');

  return `
  <!-- LUXURY IMMERSIVE STICKY HEADER -->
  <header data-sticky-header id="site-header" class="fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-[#060709]/85 backdrop-blur-xl border-b border-[#c5a059]/20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-22 sm:h-24 lg:h-26 flex items-center justify-between">
      <!-- BRAND LOGO -->
      <a href="/" id="header-brand-logo" class="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a059] rounded-sm py-1.5" aria-label="Black Label">
        <picture>
          <source srcset="/assets/logo-light.webp" type="image/webp" />
          <img src="/assets/logo-light.png" alt="Black Label" width="800" height="254" fetchpriority="high" decoding="async" class="h-10 sm:h-12 md:h-13 lg:h-14 xl:h-15 w-auto max-w-[220px] sm:max-w-[260px] md:max-w-[290px] lg:max-w-[330px] object-contain transition-transform duration-300 group-hover:scale-[1.02]" />
        </picture>
      </a>

      <!-- DESKTOP MENU -->
      <nav id="desktop-nav" class="hidden xl:flex items-center space-x-1" aria-label="Main Navigation">
        ${navLinks}
        <div class="pl-4 ml-2 border-l border-white/10 flex items-center gap-2">
          <a href="/events" id="header-plan-event-btn" class="inline-flex items-center justify-center px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#faf8f5] bg-white/[0.04] hover:bg-[#c5a059]/15 border border-[#c5a059]/40 hover:border-[#c5a059] transition-all duration-300 rounded-sm">
            Plan Event
          </a>
          <a href="/concierge" id="header-concierge-btn" class="inline-flex items-center justify-center px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#060709] bg-[#c5a059] hover:bg-[#dfc182] transition-all duration-300 rounded-sm shadow-[0_0_15px_rgba(197,160,89,0.25)] hover:shadow-[0_0_20px_rgba(197,160,89,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a059]">
            Concierge
          </a>
        </div>
      </nav>

      <!-- MOBILE / TABLET MENU TOGGLE -->
      <div class="flex items-center gap-2 xl:hidden">
        <a href="/events" class="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1.5 text-[#faf8f5] bg-white/[0.06] border border-[#c5a059]/40 rounded-sm">Plan Event</a>
        <a href="/concierge" class="text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1.5 text-[#060709] bg-[#c5a059] rounded-sm shadow-sm">Concierge</a>
        <button type="button" data-mobile-menu-open id="mobile-menu-toggle-btn" class="p-2 text-[#faf8f5] hover:text-[#c5a059] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a059] rounded-sm border border-white/10 bg-white/[0.03]" aria-label="Open mobile menu">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>
    </div>
  </header>

  <!-- MOBILE OFF-CANVAS DRAWER -->
  <div id="mobile-drawer" class="fixed inset-0 z-50 hidden" role="dialog" aria-modal="true" aria-label="Mobile Navigation Menu">
    <!-- Backdrop -->
    <div id="mobile-drawer-backdrop" class="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-300 opacity-0"></div>
    <!-- Off-canvas panel -->
    <div id="mobile-drawer-content" class="fixed inset-y-0 right-0 max-w-sm w-full bg-[#090b0e] border-l border-[#c5a059]/20 shadow-2xl p-6 sm:p-8 flex flex-col justify-between transition-transform duration-300 translate-x-full overflow-y-auto">
      <div>
        <div class="flex items-center justify-between pb-6 border-b border-white/10">
          <picture>
            <source srcset="/assets/logo-light.webp" type="image/webp" />
            <img src="/assets/logo-light.png" alt="Black Label Lifestyle" width="800" height="254" loading="lazy" decoding="async" class="h-9 sm:h-10 w-auto object-contain" />
          </picture>
          <button type="button" data-mobile-menu-close id="mobile-drawer-close-btn" class="p-2 text-[#faf8f5] hover:text-[#c5a059] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a059] border border-white/10 rounded-sm" aria-label="Close mobile menu">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="mt-6 mb-2">
          <p class="text-[10px] uppercase tracking-[0.25em] text-[#c5a059] font-mono">Eight Divisions</p>
        </div>

        <nav class="flex flex-col space-y-1" aria-label="Mobile Brand Directory">
          ${mobileNavLinks}
        </nav>
      </div>

      <div class="mt-8 pt-6 border-t border-white/10 space-y-4">
        <!-- Direct Event Intake CTA -->
        <a href="/events" class="flex items-center justify-between py-3 px-3.5 rounded bg-[#c5a059]/15 border border-[#c5a059]/50 text-[#c5a059] group transition-all">
          <div class="flex items-center gap-2.5">
            <span class="w-2 h-2 rounded-full bg-[#c5a059] animate-pulse"></span>
            <span class="text-xs font-semibold uppercase tracking-widest font-mono">Plan Private Event</span>
          </div>
          <span class="text-xs font-mono group-hover:translate-x-1 transition-transform">10–50 Guests →</span>
        </a>

        <div class="grid grid-cols-2 gap-2.5">
          <a href="/contact" class="inline-flex items-center justify-center py-3.5 px-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#060709] bg-[#c5a059] hover:bg-[#dfc182] transition-colors rounded-sm shadow-md text-center">
            Contact & Map
          </a>
          <a href="/concierge" class="inline-flex items-center justify-center py-3.5 px-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#faf8f5] bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 transition-colors rounded-sm text-center">
            Concierge
          </a>
        </div>
        <div class="text-xs text-[#e6e0d4]/70 space-y-1.5 text-center">
          <p class="text-[#faf8f5] font-serif text-sm">Millennium Tower · San Francisco</p>
          <p><a href="mailto:concierge@blacklabel.life" class="text-[#c5a059] hover:underline font-mono text-xs">concierge@blacklabel.life</a></p>
        </div>
      </div>
    </div>
  </div>
  `;
}

/**
 * ============================================================================
 * SHARED LUXURY FOOTER (renderSharedFooter)
 * ============================================================================
 * Owner & Developer Guide:
 * Renders the global footer across all pages:
 * - Brand Monogram & High-Res WebP Logo
 * - Millennium Tower Origin & Address: 301 Mission St, SoMa, San Francisco, CA
 * - All 8 Operating Division Links
 * - Direct Concierge Call-to-Action
 * - Executive Portal Link (/admin)
 * ============================================================================
 */
export function renderSharedFooter(): string {
  return `
  <!-- LUXURY SHARED FOOTER -->
  <footer id="site-footer" class="bg-[#050608] text-[#faf8f5] border-t border-[#c5a059]/20 pt-20 pb-14 relative overflow-hidden">
    <!-- Subtle top gold light leak -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#c5a059]/40 to-transparent"></div>
    <div class="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-24 bg-[#c5a059]/5 blur-3xl pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-14 border-b border-[#c5a059]/20">
        <!-- Brand Info -->
        <div class="lg:col-span-2 space-y-5">
          <a href="/" class="inline-block" aria-label="Black Label Home">
            <picture>
              <source srcset="/assets/logo-light.webp" type="image/webp" />
              <img src="/assets/logo-light.png" alt="Black Label" width="800" height="254" loading="lazy" decoding="async" class="h-10 sm:h-12 w-auto max-w-[280px] object-contain" />
            </picture>
          </a>
          <p class="text-xs sm:text-sm text-[#dcd6ca]/80 leading-relaxed max-w-md font-light">
            A declaration on focus, quietude, and sovereign living. Conceived in Millennium Tower, San Francisco, we deliver a message to those who shape tomorrow.
          </p>
          <div class="pt-2 text-sm">
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-white/[0.03] border border-[#c5a059]/20 text-xs">
              <span class="w-2 h-2 rounded-full bg-[#c5a059] animate-pulse"></span>
              <span class="font-mono text-[#c5a059] uppercase tracking-wider text-[10px]">Private Concierge Desk</span>
            </div>
            <div class="mt-3">
              <a href="mailto:concierge@blacklabel.life" class="text-base text-[#faf8f5] hover:text-[#c5a059] transition-colors font-medium underline underline-offset-4 decoration-[#c5a059]/50">
                concierge@blacklabel.life
              </a>
              <p class="text-xs text-[#a69f91] mt-1 font-mono">Millennium Tower · San Francisco</p>
            </div>
          </div>
        </div>

        <!-- Divisions Column 1 -->
        <div>
          <h3 class="text-[10px] font-mono font-semibold uppercase tracking-[0.25em] text-[#c5a059] mb-5">Pillars I</h3>
          <ul class="space-y-3 text-xs sm:text-sm text-[#dcd6ca]/80">
            <li><a href="/entertainment" class="hover:text-[#c5a059] transition-colors flex items-center gap-2"><span class="text-[#c5a059] font-mono text-[10px]">02</span> Entertainment</a></li>
            <li><a href="/lifestyle" class="hover:text-[#c5a059] transition-colors flex items-center gap-2"><span class="text-[#c5a059] font-mono text-[10px]">04</span> Lifestyle</a></li>
            <li><a href="/design" class="hover:text-[#c5a059] transition-colors flex items-center gap-2"><span class="text-[#c5a059] font-mono text-[10px]">05</span> Design</a></li>
            <li><a href="/luxury" class="hover:text-[#c5a059] transition-colors flex items-center gap-2"><span class="text-[#c5a059] font-mono text-[10px]">08</span> Luxury</a></li>
          </ul>
        </div>

        <!-- Divisions Column 2 -->
        <div>
          <h3 class="text-[10px] font-mono font-semibold uppercase tracking-[0.25em] text-[#c5a059] mb-5">Pillars II</h3>
          <ul class="space-y-3 text-xs sm:text-sm text-[#dcd6ca]/80">
            <li><a href="/social" class="hover:text-[#c5a059] transition-colors flex items-center gap-2"><span class="text-[#c5a059] font-mono text-[10px]">01</span> Social</a></li>
            <li><a href="/trading" class="hover:text-[#c5a059] transition-colors flex items-center gap-2"><span class="text-[#c5a059] font-mono text-[10px]">03</span> Signal & Equanimity</a></li>
            <li><a href="/business-services" class="hover:text-[#c5a059] transition-colors flex items-center gap-2"><span class="text-[#c5a059] font-mono text-[10px]">06</span> Structural Clarity</a></li>
            <li><a href="/investments" class="hover:text-[#c5a059] transition-colors flex items-center gap-2"><span class="text-[#c5a059] font-mono text-[10px]">07</span> Patient Stewardship</a></li>
          </ul>
        </div>

        <!-- Concierge & Contact Column -->
        <div>
          <h3 class="text-[10px] font-mono font-semibold uppercase tracking-[0.25em] text-[#c5a059] mb-5">Open Dialogue</h3>
          <p class="text-xs text-[#a69f91] mb-4 leading-relaxed">
            Time is the only asset that cannot be bought back. Reclaim your focus, quiet the noise, and live with enduring intention.
          </p>
          <div class="space-y-2">
            <a href="/contact" class="inline-flex items-center justify-center w-full px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#060709] bg-[#c5a059] hover:bg-[#dfc182] transition-colors rounded-sm shadow-sm">
              Direct Correspondence
            </a>
            <a href="/concierge" class="inline-flex items-center justify-center w-full px-4 py-2 text-[10px] font-mono uppercase tracking-[0.16em] text-[#faf8f5] bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-colors rounded-sm">
              Enter The Dialogue →
            </a>
          </div>
        </div>
      </div>

      <!-- Legal & Copyright -->
      <div class="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#a69f91] space-y-3 sm:space-y-0 font-light">
        <div class="flex items-center gap-3">
          <p>© 2026 Black Label Lifestyle. All rights reserved.</p>
          <span class="text-white/20">·</span>
          <a href="/admin" id="footer-admin-link" class="text-[#c5a059]/90 hover:text-[#c5a059] transition-colors inline-flex items-center gap-1.5 font-mono text-[11px]">
            <span class="w-1.5 h-1.5 rounded-full bg-[#c5a059] animate-pulse"></span>
            Executive Dashboard
          </a>
        </div>
        <p class="text-center sm:text-right text-[11px]">All DBAs are proprietary operating divisions of the Black Label family of companies.</p>
      </div>
    </div>
  </footer>
  `;
}

/**
 * Configuration for high-priority Largest Contentful Paint (LCP) preloading.
 * Provides distinct mobile (<768px) and desktop (>769px) WebP assets.
 */
export interface PreloadImageConfig {
  href: string;
  mobileHref?: string;
}

/**
 * Generates pristine HTML <head> metadata for optimal SEO, Core Web Vitals, and social sharing.
 * 
 * PERFORMANCE & SEO HIGHLIGHTS:
 * - Injects media-queried <link rel="preload" as="image" fetchpriority="high"> for 0ms delay on LCP hero assets.
 * - Non-blocking asynchronous Google Fonts (Jost + Cormorant Garamond) with font-display: swap.
 * - Complete OpenGraph, Twitter card, and Schema.org JSON-LD structured data.
 */
export function renderHeadTags(params: {
  title: string;
  description: string;
  canonicalUrl: string;
  jsonLd: object[];
  preloadImage?: PreloadImageConfig;
  noIndex?: boolean;
}): string {
  const jsonLdScripts = params.jsonLd
    .map((data) => `<script type="application/ld+json">\n${JSON.stringify(data, null, 2)}\n</script>`)
    .join('\n');

  const preloadImageMarkup = params.preloadImage
    ? `
  <!-- High Priority LCP Image Preload -->
  ${params.preloadImage.mobileHref ? `<link rel="preload" as="image" href="${params.preloadImage.mobileHref}" type="image/webp" media="(max-width: 768px)" fetchpriority="high" />` : ''}
  <link rel="preload" as="image" href="${params.preloadImage.href}" type="image/webp" ${params.preloadImage.mobileHref ? 'media="(min-width: 769px)"' : ''} fetchpriority="high" />
  `
    : '';

  const robotsTag = params.noIndex
    ? `<!-- Admin Private Dashboard Directive -->
  <meta name="robots" content="noindex, nofollow" />
  <meta name="googlebot" content="noindex, nofollow" />`
    : `<!-- High Performance 100-Score SEO Meta Directives -->
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
  <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
  <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />`;

  return `
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${params.title}</title>
  <meta name="description" content="${params.description}" />
  ${robotsTag}
  <link rel="canonical" href="${params.canonicalUrl}" />
  <meta name="theme-color" content="#060709" />
  <meta name="author" content="Black Label Lifestyle" />

  <!-- Open Graph 100-Score Social Sharing Cards -->
  <meta property="og:site_name" content="Black Label Lifestyle" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="en_US" />
  <meta property="og:url" content="${params.canonicalUrl}" />
  <meta property="og:title" content="${params.title}" />
  <meta property="og:description" content="${params.description}" />
  <meta property="og:image" content="https://blacklabel.life/assets/og-image.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="${params.title}" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@BlackLabelLife" />
  <meta name="twitter:creator" content="@BlackLabelLife" />
  <meta name="twitter:title" content="${params.title}" />
  <meta name="twitter:description" content="${params.description}" />
  <meta name="twitter:image" content="https://blacklabel.life/assets/og-image.png" />
  <meta name="twitter:image:alt" content="${params.title}" />

  <!-- Favicon & Monogram -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  ${preloadImageMarkup}
  <!-- Preconnect to Font Endpoints -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <!-- Optimized Asynchronous Google Web Fonts -->
  <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&display=swap" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&display=swap" media="print" onload="this.media='all'" />
  <noscript>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&display=swap" />
  </noscript>

  <!-- Shared Stylesheet -->
  <link rel="stylesheet" href="/src/index.css" />

  <!-- Structured Data JSON-LD -->
  ${jsonLdScripts}

  <!-- Client Script -->
  <script type="module" src="/src/site.ts"></script>
  `;
}
