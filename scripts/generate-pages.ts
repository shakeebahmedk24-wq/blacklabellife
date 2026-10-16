/**
 * ============================================================================
 * BLACK LABEL LIFESTYLE — STATIC SITE GENERATOR (SSG) & CONTENT PIPELINE
 * ============================================================================
 * 
 * OWNER & DEVELOPER HANDOFF GUIDE:
 * ----------------------------------------------------------------------------
 * This build script is the primary content compiler for the Black Label Lifestyle
 * web application. It generates 13 production-grade, statically-rendered HTML pages
 * with high-performance WebP media, Schema.org JSON-LD, and preloaded Core Web Vitals.
 * 
 * HOW THE OWNER CAN EDIT CONTENT:
 * 1. Modify Division Details (Copy, Deliverables, Pricing Specs, FAQs):
 *    - Locate the `DIVISIONS` master registry array below.
 *    - Each entry defines a brand (Social, Entertainment, Trading, Lifestyle,
 *      Design, Business Services, Investments, Luxury).
 *    - Updates made here automatically propagate across page titles, meta descriptions,
 *      H1 headings, standard metric badges, service matrices, step-by-step methodologies,
 *      and Schema.org FAQ structured data.
 * 2. Homepage Content & Interactive Sections:
 *    - Located in `generateHomePage()`.
 *    - Controls the Twilight Penthouse Hero, 8-brand directory grid,
 *      reclaimed time freedom calculator, and priority executive intake banner.
 * 3. Concierge Terminal & Millennium Tower Schemes:
 *    - Located in `generateConciergePage()`.
 *    - Controls architectural floor elevations (Level 60, 48, 10, 1),
 *      arrival protocols, and direct concierge ticket dispatch.
 * 4. Contact & Headquarters:
 *    - Located in `generateContactPage()`.
 *    - Controls the interactive CartoDB dark map, Millennium Tower address,
 *      and 24/7 coverage status indicators.
 * 5. Rebuilding & Deployment:
 *    - Execute `npm run build` to automatically run this generator and Vite bundle.
 * ============================================================================
 */

import * as fs from 'fs';
import * as path from 'path';
import {
  renderSharedHeader,
  renderSharedFooter,
  renderHeadTags,
  DIVISION_SVGS,
} from './shared-template.ts';

/**
 * FAQ Schema definition used for both on-page accordion displays
 * and Google Schema.org FAQPage JSON-LD rich snippets.
 */
interface FAQ {
  question: string;
  answer: string;
}

interface ServiceDetail {
  title: string;
  badge: string;
  description: string;
  deliverables: string[];
  spec: string;
}

interface StepDetail {
  num: string;
  phase: string;
  title: string;
  desc: string;
  timeframe: string;
  milestone: string;
}

interface StandardMetric {
  value: string;
  label: string;
  desc: string;
}

interface DivisionPageConfig {
  slug: string;
  num: string;
  divisionName: string;
  pageTitle: string;
  metaDesc: string;
  h1: string;
  intro: string;
  standards: StandardMetric[];
  services: ServiceDetail[];
  steps: StepDetail[];
  faqs: FAQ[];
  related: { label: string; href: string; desc: string; category?: string }[];
  svgKey: string;
}

/**
 * ============================================================================
 * MASTER BRAND REGISTRY: THE EIGHT OPERATING DIVISIONS
 * ============================================================================
 * Owner Note: Edit the text, services, deliverables, steps, and FAQs below
 * to update the content of any division page across the entire website.
 * 
 * 1. Social: AI-powered organic social authority & narrative engineering
 * 2. Entertainment: In-home private chef dining, sommelier & bespoke events
 * 3. Trading: Algorithmic quant market intelligence & proprietary systems
 * 4. Lifestyle: Private aviation charters, superyachts & dedicated concierge
 * 5. Design: Luxury penthouse architectural staging & residential design
 * 6. Business Services: Executive back-office infrastructure & fiduciary support
 * 7. Investments: Private syndications, prime real estate & deal flow
 * 8. Luxury: Millennium Tower residential rentals & exotic mobility fleet
 * ============================================================================
 */
const DIVISIONS: DivisionPageConfig[] = [
  {
    slug: 'social',
    num: '01',
    divisionName: 'Social',
    pageTitle: 'Black Label Social · Discretion & Narrative Sovereignty',
    metaDesc: 'In an era of relentless algorithmic noise, true authority is quiet. Explore Black Label\'s philosophy of narrative sovereignty, dignity, and private resonance.',
    h1: 'The Sovereignty of Silence',
    intro: 'In a culture obsessed with broadcasting and algorithmic vanity, silence has become the ultimate differentiator. We deliver a message of narrative sovereignty: that the most enduring influence is communicated with restraint to those who already listen, never shouted to the crowd.',
    standards: [
      { value: 'Silence', label: 'The Quiet Voice', desc: 'True authority never competes for attention in the public arena.' },
      { value: 'Depth', label: 'Substance Over Metrics', desc: 'Cultivating enduring ideas that outlast fleeting digital hysteria.' },
      { value: 'Sovereignty', label: 'Algorithmic Immunity', desc: 'Preserving dignity, perspective, and poise beyond public validation.' },
      { value: 'Resonance', label: 'Selective Fellowship', desc: 'Speaking exclusively to peer minds without intermediary distortion.' },
    ],
    services: [
      {
        title: 'The Philosophy of Restraint',
        badge: 'DISCIPLINE',
        description: 'Why broadcasting everything diminishes genuine power. Framing thoughts with architectural economy and philosophical weight.',
        deliverables: [
          'Selective narrative positioning',
          'Elimination of vanity engagement',
          'Direct intellectual triage',
          'Sovereign reputation covenants',
        ],
        spec: 'SACRED DISCRETION',
      },
      {
        title: 'Thought Leadership as Literature',
        badge: 'EDITORIAL',
        description: 'Treating founder visions, economic theses, and philosophical essays as enduring literature rather than disposable social media content.',
        deliverables: [
          'Executive monographs and essays',
          'Restrained digital commentary',
          'Tone and editorial voice architecture',
          'Timeless typographic presentation',
        ],
        spec: 'EDITORIAL INTEGRITY',
      },
      {
        title: 'The Sovereign Peer Network',
        badge: 'ALLIANCE',
        description: 'Cultivating unhurried intellectual exchange between verified leaders, fellows, and family offices without public spectacle.',
        deliverables: [
          'Confidential direct inquiry routing',
          'Peer dialogue facilitation',
          'Private salon correspondences',
          'Zero algorithmic automation guarantee',
        ],
        spec: 'PEER DIALOGUE',
      },
      {
        title: 'Architectural Discretion',
        badge: 'SANCTUARY',
        description: 'Preserving personal and institutional privacy as an impregnable fortress for original thought and independent creation.',
        deliverables: [
          'Selective channel refinement',
          'Private distribution cadences',
          'Digital boundary governance',
          'Audited confidentiality briefs',
        ],
        spec: 'RESTRICTED PRESENCE',
      },
    ],
    steps: [
      {
        num: '01',
        phase: 'STEP 01 · AWARENESS',
        title: 'The Recognition of Noise',
        desc: 'Auditing external digital exposure to identify algorithmic distraction and establish boundaries of silence.',
        timeframe: 'Initial Inquiry',
        milestone: 'Narrative Sovereignty Thesis',
      },
      {
        num: '02',
        phase: 'STEP 02 · ARCHITECTURE',
        title: 'Editorial Alignment',
        desc: 'Articulating core principles, intellectual boundaries, and restrained channels of private distribution.',
        timeframe: 'Reflection Window',
        milestone: 'Monograph Bank Prepared',
      },
      {
        num: '03',
        phase: 'STEP 03 · SOVEREIGNTY',
        title: 'Quiet Practice',
        desc: 'Operating with unassailable calm, filtering noise, and cultivating high-caliber private resonance without friction.',
        timeframe: 'Continuous Practice',
        milestone: 'Sovereign Presence Established',
      },
    ],
    faqs: [
      {
        question: 'Why does Black Label emphasize silence over self-promotion?',
        answer: 'Mass visibility is often the enemy of genuine depth. In an age where everyone shouts, the individual who speaks with measured precision and quiet poise holds the true intellectual high ground.',
      },
      {
        question: 'What is the relationship between privacy and influence?',
        answer: 'True influence is not measured by follower counts or vanity impressions; it is measured by the gravity of your ideas among the few decision-makers who shape culture, capital, and architecture.',
      },
      {
        question: 'How are correspondence and dialogues maintained?',
        answer: 'All interactions are conducted under strict institutional non-disclosure covenants, ensuring that thoughts, essays, and exchanges remain strictly confidential.',
      },
    ],
    related: [
      { label: '02 Entertainment', href: '/entertainment', desc: 'The sacred ritual of gathering and presence.' },
      { label: '04 Lifestyle', href: '/lifestyle', desc: 'The sovereignty of human time and domestic stillness.' },
      { label: '06 Business Services', href: '/business-services', desc: 'Structural order and the elimination of friction.' },
    ],
    svgKey: 'social',
  },
  {
    slug: 'entertainment',
    num: '02',
    divisionName: 'Entertainment',
    pageTitle: 'Black Label Entertainment · The Ritual of Shared Gathering',
    metaDesc: 'The shared table is our oldest sacred space. Explore Black Label\'s philosophy of unhurried fellowship, in-residence culinary art, and cellared contemplation.',
    h1: 'The Sacred Ritual of the Table',
    intro: 'Humanity’s greatest ideas were never conceived in conference rooms; they were born around the shared table over fire, bread, and wine. We deliver a message on the sacred power of gathering: an unhurried communion that restores human connection and presence in an accelerated world.',
    standards: [
      { value: 'Fellowship', label: 'The Unhurried Table', desc: 'Time decelerated for deep, luminous human communion.' },
      { value: 'Terroir', label: 'Artisanal Reverence', desc: 'Honoring earth, season, and master culinary craft.' },
      { value: 'Stillness', label: 'Sacred Domesticity', desc: 'The private residence transformed into an intimate salon.' },
      { value: 'Restoration', label: 'Effortless Equilibrium', desc: 'Pristine quietude following joyous celebration.' },
    ],
    services: [
      {
        title: 'The Sanctuary of the Hearth',
        badge: 'FELLOWSHIP',
        description: 'Master chefs orchestrating bespoke seasonal tasting menus directly within residential kitchens. Tailored menus, fine presentation, and quiet brigade execution.',
        deliverables: [
          'Bespoke multi-course tasting menus',
          'Private executive chef on-site brigade',
          'Fine plateware, linens, and table appointments',
          'Dietary preference and timing accommodation',
        ],
        spec: 'RESIDENTIAL TASTINGS',
      },
      {
        title: 'Sommelier Cellar Pairings',
        badge: 'TERROIR',
        description: 'Certified sommeliers curating rare library vintages paired course-by-course with private dinners to celebrate historic wine regions.',
        deliverables: [
          'Library vintage sommelier pairings',
          'Craft cocktail setup and botanical reductions',
          'Fine crystal glassware and decanting service',
          'Private cellar inventory consultation',
        ],
        spec: 'RARE VINTAGE INTEGRATION',
      },
      {
        title: 'Atmospheric Spatial Staging',
        badge: 'HARMONY',
        description: 'Coordinating spatial acoustics, architectural floral installations, and ambient candlelight to inspire elevated dialogue.',
        deliverables: [
          'Architectural floral installations',
          'Ambient illumination and acoustic tuning',
          'Valet and arrival coordination',
          'Floor plan arrangement for fluid hosting',
        ],
        spec: 'TURNKEY STAGING',
      },
      {
        title: 'Quiet Restoration & Equilibrium',
        badge: 'SERENITY',
        description: 'Bonded hospitality staff managing beverage service, crystal polishing, and complete residential reset so tranquility returns before dawn.',
        deliverables: [
          'Bonded service staff and sommeliers',
          'Continuous quiet clearing',
          'Kitchen sanitization and waste evacuation',
          'Complete residential reset to pristine condition',
        ],
        spec: 'PRISTINE HOME TURNOVER',
      },
    ],
    steps: [
      {
        num: '01',
        phase: 'STEP 01 · CONCEPTION',
        title: 'The Vision of Fellowship',
        desc: 'Reviewing residence acoustics, guest dynamics, cellar preferences, and seasonal culinary themes.',
        timeframe: 'Initial Consultation',
        milestone: 'Run-of-Show and Menu Philosophy',
      },
      {
        num: '02',
        phase: 'STEP 02 · ORCHESTRATION',
        title: 'Culinary Preparation & Staging',
        desc: 'Chefs and sommeliers arrive quietly to prepare the residence, arrange the table, and decant historic vintages.',
        timeframe: 'Pre-Gathering Window',
        milestone: 'Hearth and Table Set',
      },
      {
        num: '03',
        phase: 'STEP 03 · RESTORATION',
        title: 'Paced Service & Reset',
        desc: 'Unobtrusive course progression followed by meticulous cleanup, crystal polishing, and complete domestic reset.',
        timeframe: 'Evening Conclusion',
        milestone: 'Pristine Sanctuary Restored',
      },
    ],
    faqs: [
      {
        question: 'Why does Black Label reframe dining as a ritual rather than catering?',
        answer: 'Catering is a commercial transaction; a ritual is a deliberate act of communion. When food, wine, candlelight, and conversation are composed with reverence, guests experience a level of presence that cannot be bought in a restaurant.',
      },
      {
        question: 'How do you preserve residential privacy during gatherings?',
        answer: 'All culinary brigades and sommeliers are bonded professionals trained in high-rise and private estate etiquette, operating under audited non-disclosure covenants.',
      },
      {
        question: 'What is the role of historic terroir in your pairings?',
        answer: 'Wine is bottled time and geography. Pairing rare library vintages honors centuries of agricultural stewardship, giving guests a tangible encounter with history.',
      },
    ],
    related: [
      { label: '04 Lifestyle', href: '/lifestyle', desc: 'The sovereignty of human time and domestic stillness.' },
      { label: '05 Design', href: '/design', desc: 'The architecture of calm and spatial harmony.' },
      { label: '08 Luxury', href: '/luxury', desc: 'The philosophy of ephemeral wonder.' },
    ],
    svgKey: 'entertainment',
  },
  {
    slug: 'trading',
    num: '03',
    divisionName: 'Trading',
    pageTitle: 'Black Label Trading · The Benchmark of Material Truth',
    metaDesc: 'In a world of synthetic speculation, physical relics embody objective truth. Discover our multispectral analysis, archival preservation, and material history.',
    h1: 'The Benchmark of Material Truth',
    intro: 'As modern life becomes increasingly ephemeral, digital, and synthetic, tangible artifacts carry an irrefutable gravity. We deliver a message on the sanctity of physical truth: preserving cultural heritage, historical paper relics, and verified provenance through uncompromising optical science.',
    standards: [
      { value: 'Objective', label: 'Material Truth', desc: 'Multispectral scanning calibrated to laboratory precision without human fatigue.' },
      { value: 'Centuries', label: 'Archival Permanence', desc: 'Museum-grade ultrasonic encapsulation designed to protect across generations.' },
      { value: 'Sanctuary', label: 'Vault Custody', desc: 'Climate-controlled depositories protected by biometric authentication.' },
      { value: 'Verified', label: 'Unbroken Lineage', desc: 'Cryptographic provenance tethered directly to physical matter.' },
    ],
    services: [
      {
        title: 'Multispectral Optical Analysis',
        badge: 'OPTICAL',
        description: 'Sensory analysis evaluating physical collectibles under multispectral illumination. Sub-millimeter assessment of centering ratios, surface micro-depth, and edge contours.',
        deliverables: [
          'Sub-millimeter centering measurement',
          'Surface defect mapping and depth profiling',
          'Corner radius and perimeter diagnostics',
          'Optical verification summary',
        ],
        spec: 'PRECISION BENCHMARK',
      },
      {
        title: 'Archival Museum Encapsulation',
        badge: 'PRESERVATION',
        description: 'Certified physical assets sealed in ultrasonically welded, museum-grade UV-resistant acrylic slabs designed for multi-generational protection.',
        deliverables: [
          'Sonic-welded archival acrylic slab',
          'Cryptographic tamper-evident NFC tag',
          'Serialized holographic identifier',
          'Museum-grade UV protection layer',
        ],
        spec: 'ARCHIVAL PRESERVATION',
      },
      {
        title: 'Private Peer Liquidity & Placement',
        badge: 'EXCHANGE',
        description: 'Direct transaction channels between verified private collectors and alternative asset funds, avoiding public auction markups and sensationalism.',
        deliverables: [
          'Private off-market liquidity facilitation',
          'Secure escrow and custodial authentication',
          'Consignment for rare asset portfolios',
          'Discreet peer settlement',
        ],
        spec: 'VERIFIED NETWORK',
      },
      {
        title: 'Tangible Heritage Telemetry',
        badge: 'VALUATION',
        description: 'Telemetry for alternative physical portfolios. Monitoring valuation shifts, comps, population indices, and insurance appraisal records.',
        deliverables: [
          'Physical asset portfolio tracker',
          'Population scarcity index review',
          'Formal insurance appraisal documentation',
          'Quarterly alternative asset liquidity briefs',
        ],
        spec: 'CONTINUOUS VALUATION',
      },
    ],
    steps: [
      {
        num: '01',
        phase: 'STEP 01 · CUSTODY',
        title: 'Sanctuary Intake',
        desc: 'Physical relics received via insured secure courier, cataloged under biometric custody, and placed in climate stabilization.',
        timeframe: 'Day 1',
        milestone: 'Custody Certificate Issued',
      },
      {
        num: '02',
        phase: 'STEP 02 · SCIENCE',
        title: 'Multispectral Inspection',
        desc: 'Computational analysis of paper fiber, surface micro-plane, chromatic fidelity, and perimeter geometry.',
        timeframe: 'Days 2–3',
        milestone: 'Diagnostic Truth Report Generated',
      },
      {
        num: '03',
        phase: 'STEP 03 · PERMANENCE',
        title: 'Encapsulation & Vaulting',
        desc: 'Ultrasonic archival sealing, cryptographic ledger tagging, and vault depository placement or insured repatriation.',
        timeframe: 'Days 4–5',
        milestone: 'Physical Delivery or Vault Deposit',
      },
    ],
    faqs: [
      {
        question: 'Why does physical provenance matter in a digital age?',
        answer: 'Digital assets can be duplicated or deleted with a keystroke; physical artifacts embody irreplaceable historical time and human craft. Preserving tangible truth anchors human culture in reality.',
      },
      {
        question: 'What is the advantage of computational optical analysis?',
        answer: 'Human grading is prone to subjective mood, eye strain, and inconsistent lighting. Multispectral optical scanning measures centering and surface micro-depth with mathematical impartiality.',
      },
      {
        question: 'How does ultrasonic encapsulation protect paper across generations?',
        answer: 'Ultrasonic welding creates a hermetic seal without glues or chemical off-gassing, shielded by museum-grade UV filters that prevent atmospheric yellowing and degradation.',
      },
    ],
    related: [
      { label: '07 Investments', href: '/investments', desc: 'The patient multi-year horizon in tangible property.' },
      { label: '08 Luxury', href: '/luxury', desc: 'The philosophy of ephemeral wonder.' },
      { label: '06 Business Services', href: '/business-services', desc: 'Structural order and corporate governance.' },
    ],
    svgKey: 'trading',
  },
  {
    slug: 'lifestyle',
    num: '04',
    divisionName: 'Lifestyle',
    pageTitle: 'Black Label Lifestyle · The Sovereignty of Human Time',
    metaDesc: 'Time is non-renewable consciousness. Explore our philosophy of domestic stillness, unburdened calendars, and reclaiming the hours required for deep creation.',
    h1: 'The Sovereignty of Human Time',
    intro: 'Time is not an asset to be bartered; it is the fabric of human consciousness. When our days are consumed by domestic friction, trivial maintenance, and administrative clutter, the mind loses the margin required for original creation. We deliver a message of temporal liberation and quiet focus.',
    standards: [
      { value: 'Stillness', label: 'Domestic Equilibrium', desc: 'A living sanctuary that actively restores psychological serenity.' },
      { value: 'Margin', label: 'Protected Focus', desc: 'Preserving uninterrupted blocks of daylight for deep work.' },
      { value: 'Reverence', label: 'Tactile Care', desc: 'Preserving natural stone, fine wool, and linens with master grace.' },
      { value: 'Presence', label: 'Silent Cadence', desc: 'Service that is felt through peace, never seen or heard.' },
    ],
    services: [
      {
        title: 'The Architecture of Daily Quiet',
        badge: 'EQUILIBRIUM',
        description: 'Unobtrusive household coordination protecting focus. Daily schedule logistics, dry cleaning, parcel triage, and guest reception.',
        deliverables: [
          'Daily residential logistics coordination',
          'Wardrobe pressing, styling, and packing',
          'Private guest greeting and reception',
          'Executive parcel and delivery management',
        ],
        spec: 'DAILY CALM',
      },
      {
        title: 'Sanctuary Stewardship & Turndown',
        badge: 'SANCTUARY',
        description: 'Methodical daily linen turns, fine marble and hardwood care, sanitization, and discreet pantry management.',
        deliverables: [
          'Daily turn-down and linen care',
          'Marble, bronze, and stone surface care',
          'Pantry inventory and replenishment',
          'Scent-free hospital-grade maintenance',
        ],
        spec: 'CUSTOM CADENCE',
      },
      {
        title: 'The Restorative Wardrobe',
        badge: 'ATELIER',
        description: 'Access to vetted personal stylists and tailors for wardrobe curation, private atelier fittings, and apparel care.',
        deliverables: [
          'In-residence wardrobe consultation',
          'Private designer collection previews',
          'Bespoke fitting and tailoring coordination',
          'Grooming and wellness liaison',
        ],
        spec: 'BESPOKE CURATION',
      },
      {
        title: 'Cultural Access & Curated Privileges',
        badge: 'ACCESS',
        description: 'Preferred terms and private reservations across an established network of luxury maisons, aviation carriers, and private clubs.',
        deliverables: [
          'Dining reservations at premier tables',
          'Private aviation and charter liaison',
          'Luxury maison previews and privileges',
          'Cultural event access',
        ],
        spec: 'CURATED NETWORK',
      },
    ],
    steps: [
      {
        num: '01',
        phase: 'STEP 01 · AUDIT',
        title: 'The Attention Audit',
        desc: 'Reviewing daily domestic friction points, weekly rhythms, and personal preferences to map out temporal liberation.',
        timeframe: 'Initial 24 Hours',
        milestone: 'Equilibrium Blueprint Established',
      },
      {
        num: '02',
        phase: 'STEP 02 · INTEGRATION',
        title: 'Stewardship Onboarding',
        desc: 'Assigning bonded, discreet domestic stewards trained to private residence standards and high-rise guidelines.',
        timeframe: 'Within 48 Hours',
        milestone: 'Domestic Cadence Initiated',
      },
      {
        num: '03',
        phase: 'STEP 03 · SOVEREIGNTY',
        title: 'The Unburdened Mind',
        desc: 'A pristine residence and a clear calendar, returning valuable daylight hours for deep creation, fellowship, and rest.',
        timeframe: 'Ongoing Cadence',
        milestone: 'Sovereign Hours Returned',
      },
    ],
    faqs: [
      {
        question: 'Why do you view household stewardship as an intellectual issue?',
        answer: 'Cognitive bandwidth is finite. Every minute spent managing domestic repairs, laundry, or errands is cognitive capacity stolen from your life\'s work, family presence, and creative vision.',
      },
      {
        question: 'What training is required for Black Label residential staff?',
        answer: 'All personnel undergo rigorous background verification, institutional non-disclosure agreements, and specialized training in private estate etiquette, high-rise building protocol, and tactile surface preservation.',
      },
      {
        question: 'How many hours can realistically be reclaimed each week?',
        answer: 'Clients typically recover between 24 and 48 hours each week—the equivalent of two full working days—by eliminating domestic friction and logistics management.',
      },
    ],
    related: [
      { label: '02 Entertainment', href: '/entertainment', desc: 'The sacred ritual of gathering and presence.' },
      { label: '05 Design', href: '/design', desc: 'The architecture of calm and spatial harmony.' },
      { label: '08 Luxury', href: '/luxury', desc: 'The philosophy of ephemeral wonder.' },
    ],
    svgKey: 'lifestyle',
  },
  {
    slug: 'design',
    num: '05',
    divisionName: 'Design',
    pageTitle: 'Black Label Design · The Architecture of Spatial Quietude',
    metaDesc: 'Space is a silent mentor to human thought. Experience our architectural manifesto on natural light, acoustic stillness, tactile materiality, and quiet harmony.',
    h1: 'The Architecture of Spatial Calm',
    intro: 'The rooms we inhabit are not merely physical enclosures; they are the external architecture of our subconscious minds. When daylight, stone, acoustic silence, and proportion harmonize into a single coherent thought, the human spirit finds calm. We deliver a manifesto on quiet, enduring spatial design.',
    standards: [
      { value: 'Proportion', label: 'The Golden Line', desc: 'Harmonic balance between natural illumination, shadow, and architectural void.' },
      { value: 'Honesty', label: 'Natural Materiality', desc: 'Raw stones, warm European hardwoods, and textiles that age with character.' },
      { value: 'Stillness', label: 'Tower Acoustics', desc: 'Engineered dampening designed to silence reverberation in glass residential towers.' },
      { value: 'Cohesion', label: 'The Single Thought', desc: 'Every line, shadow, and tactile surface speaking a unified language of peace.' },
    ],
    services: [
      {
        title: 'Turnkey Spatial Curation',
        badge: 'CURATION',
        description: 'Transforming residences into balanced, quiet-luxury spaces. Curating designer furnishings, artwork, and lighting to accentuate architectural lines.',
        deliverables: [
          'Architectural space planning and flow',
          'Curated designer furniture and lighting',
          'Original artwork and sculpture placement',
          'Turnkey installation and logistics',
        ],
        spec: 'TURNKEY DEPLOYMENT',
      },
      {
        title: 'Interior Architecture & Millwork',
        badge: 'ARCHITECTURE',
        description: 'Interior architecture unifying every room into one intentional visual thought. Space planning, bespoke millwork, and material palettes.',
        deliverables: [
          'Spatial and lighting schematics',
          'Custom cabinetry and millwork design',
          'Stone, hardwood, and textile palettes',
          '3D architectural visualizations',
        ],
        spec: 'COMPLETE COMMISSIONS',
      },
      {
        title: 'Artisan Material Provenance',
        badge: 'PROVENANCE',
        description: 'Direct sourcing from European ateliers and independent master craftspeople. Furnishings and fittings selected for aging grace and warmth.',
        deliverables: [
          'Bespoke furniture commissions',
          'Private gallery art acquisition',
          'Architectural brass and bronze hardware',
          'Fine tactile wool and linen textile packages',
        ],
        spec: 'BESPOKE COMMISSIONS',
      },
      {
        title: 'Acoustic & Circadian Lighting Engineering',
        badge: 'EQUILIBRIUM',
        description: 'Engineered for glass residential towers. Discreet acoustic treatments reducing reverberation, paired with warm architectural lighting.',
        deliverables: [
          'Discreet acoustic paneling',
          'Circadian warm architectural lighting',
          'Motorized quiet-run drapery',
          'Complete audio-visual integration',
        ],
        spec: 'TOWER ENGINEERING',
      },
    ],
    steps: [
      {
        num: '01',
        phase: 'STEP 01 · ANALYSIS',
        title: 'Spatial & Light Vectors',
        desc: 'Analyzing daylight angles, sightlines, and room volume to establish the aesthetic thesis of the residence.',
        timeframe: 'Week 1',
        milestone: 'Spatial Thesis Approved',
      },
      {
        num: '02',
        phase: 'STEP 02 · SPECIFICATION',
        title: 'Specification & Sourcing',
        desc: 'Specifying natural materials, commissioning bespoke millwork, and scheduling freight logistics.',
        timeframe: 'Weeks 2–4',
        milestone: 'Procurement Log Finalized',
      },
      {
        num: '03',
        phase: 'STEP 03 · HARMONY',
        title: 'Placement & Reveal',
        desc: 'Precision installation of furnishings, fine art hanging, circadian lighting calibration, and peaceful turnover.',
        timeframe: 'Installation Window',
        milestone: 'Sanctuary Completed',
      },
    ],
    faqs: [
      {
        question: 'How does spatial architecture influence cognitive performance?',
        answer: 'Visual clutter and harsh acoustic reflections keep the nervous system in a state of low-grade ambient vigilance. A space characterized by proportional void, natural materials, and acoustic stillness allows the mind to enter effortless deep focus.',
      },
      {
        question: 'What defines the Black Label aesthetic signature?',
        answer: 'Quiet luxury: balanced neutrals, warm ivories, honest materials (limestone, walnut, linen, bronze), and intentional negative space that allows architectural volume to breathe.',
      },
      {
        question: 'Why is acoustic treatment critical in residential towers?',
        answer: 'High-rise towers feature vast expanses of floor-to-ceiling glass and hard surfaces, creating echo and sound fatigue. We engineer subtle acoustic absorption that preserves panoramic views while restoring intimate library quiet.',
      },
    ],
    related: [
      { label: '07 Investments', href: '/investments', desc: 'The patient multi-year horizon in tangible property.' },
      { label: '04 Lifestyle', href: '/lifestyle', desc: 'The sovereignty of human time and domestic stillness.' },
      { label: '08 Luxury', href: '/luxury', desc: 'The philosophy of ephemeral wonder.' },
    ],
    svgKey: 'design',
  },
  {
    slug: 'business-services',
    num: '06',
    divisionName: 'Business Services',
    pageTitle: 'Black Label Business · Structural Clarity & Order',
    metaDesc: 'Order precedes creation. Explore our philosophy of eliminating administrative chaos and structural friction so founders can concentrate on what endures.',
    h1: 'Structural Clarity & Quiet Order',
    intro: 'Order is the indispensable foundation for creation. Too many visionaries dissipate their vital energy on procedural friction, fragmented ledgers, and administrative chaos. We deliver a message of structural clarity: unifying law, accounting, and governance into a quiet, reliable bedrock of peace.',
    standards: [
      { value: 'Order', label: 'Structural Harmony', desc: 'Corporate legal architecture and accounting operating in unified alignment.' },
      { value: 'Equanimity', label: 'Perpetual Balance', desc: 'Continuously reconciled ledgers eliminating month-end anxiety.' },
      { value: 'Fiduciary', label: 'Multi-Decade Horizon', desc: 'Meticulous corporate governance protecting multi-generational foundations.' },
      { value: 'Discretion', label: 'Entity Privacy', desc: 'Structuring focused on asset protection, clean execution, and institutional privacy.' },
    ],
    services: [
      {
        title: 'Strategic Corporate Tax Architecture',
        badge: 'TAX',
        description: 'Proactive tax planning shielding equity and optimizing holding structures. Multi-jurisdiction compliance and investor-grade reporting.',
        deliverables: [
          'Annual corporate and partnership returns',
          'Equity tax structure optimization',
          'Credit capture and calculation',
          'Multi-state apportionment strategy',
        ],
        spec: 'YEAR-ROUND ADVISORY',
      },
      {
        title: 'Continuous Real-Time Ledgers',
        badge: 'EQUILIBRIUM',
        description: 'Daily transaction reconciliations, payroll oversight, and vendor bill management. Real-time runway and burn modeling.',
        deliverables: [
          'Daily bank and corporate card reconciliation',
          'Executive runway and burn reporting',
          'Accounts payable management',
          'Monthly board-ready financial packets',
        ],
        spec: 'AUDIT READY',
      },
      {
        title: 'Corporate Legal Governance',
        badge: 'COUNSEL',
        description: 'Comprehensive legal infrastructure for company lifecycles. Formation, operating agreements, stock purchase agreements, and clean dissolutions.',
        deliverables: [
          'Entity formation and filings',
          'Stock purchase agreements and elections',
          'Standard commercial contracts',
          'Corporate wind-down execution',
        ],
        spec: 'CONTINUOUS GOVERNANCE',
      },
      {
        title: 'Dedicated Back-Office Stewardship',
        badge: 'STEWARDSHIP',
        description: 'A dedicated office manager serving as the central point of contact, coordinating payroll, registrations, and reporting.',
        deliverables: [
          'Dedicated senior back-office liaison',
          'Payroll setup and withholding filings',
          'Franchise tax and entity compliance',
          'Contractor compliance management',
        ],
        spec: 'ZERO FRICTION',
      },
    ],
    steps: [
      {
        num: '01',
        phase: 'STEP 01 · AUDIT',
        title: 'Structural Architecture Audit',
        desc: 'Reviewing existing corporate entities, cap tables, tax filings, and banking feeds to identify friction and exposure.',
        timeframe: 'Days 1–3',
        milestone: 'Structural Review Completed',
      },
      {
        num: '02',
        phase: 'STEP 02 · HARMONIZATION',
        title: 'Ledger Synchronization',
        desc: 'Synchronizing accounting feeds, corporate governance, and payroll under a single dedicated executive liaison.',
        timeframe: 'Weeks 1–2',
        milestone: 'Unified Reporting Live',
      },
      {
        num: '03',
        phase: 'STEP 03 · EQUANINITY',
        title: 'Quiet Governance',
        desc: 'Perpetual reconciliation, forward-looking tax advisory, and seamless compliance returning complete peace of mind.',
        timeframe: 'Ongoing Cadence',
        milestone: 'Perpetual Governance Maintained',
      },
    ],
    faqs: [
      {
        question: 'Why unify legal and accounting under one practice?',
        answer: 'Miscommunication between attorneys and accountants is the number one source of corporate administrative drag. Unifying tax planning and corporate law creates seamless structural integrity.',
      },
      {
        question: 'What client profile benefits most from this approach?',
        answer: 'Founders, family offices, and investment principals who want institutional-grade back-office rigor without managing five disparate agencies and accountants.',
      },
      {
        question: 'How does structural order support creative focus?',
        answer: 'When taxes, entity compliance, and financial ledgers are perpetually in order, visionary leaders never suffer from procedural anxiety, leaving their intellect free to innovate.',
      },
    ],
    related: [
      { label: '07 Investments', href: '/investments', desc: 'The patient multi-year horizon in tangible property.' },
      { label: '01 Social', href: '/social', desc: 'The sovereignty of silence and narrative dignity.' },
      { label: '03 Trading', href: '/trading', desc: 'The benchmark of material truth and permanence.' },
    ],
    svgKey: 'business-services',
  },
  {
    slug: 'investments',
    num: '07',
    divisionName: 'Investments',
    pageTitle: 'Black Label Investments · The Patient Multi-Year Horizon',
    metaDesc: 'True wealth compounds in silence, unhurried by quarterly frenzy. Discover our philosophy of patient stewardship, tangible foundations, and generational poise.',
    h1: 'The Patient Multi-Year Horizon',
    intro: 'In a financial climate dominated by breathless quarterly speculation, true wealth compounds in patient silence. We deliver a message of counter-cyclical poise: anchoring capital in tangible prime architecture, enduring residential foundations, and disciplined multi-year horizons.',
    standards: [
      { value: '5-7 Year', label: 'Patient Horizon', desc: 'Disciplined counter-cyclical underwriting and multi-generational stewardship.' },
      { value: 'Bedrock', label: 'Tangible Architecture', desc: 'Prime San Francisco condominium assets with enduring structural demand.' },
      { value: 'Corporate', label: 'LLC Financing', desc: 'Specialized debt structuring isolating liability and optimizing returns.' },
      { value: 'Preserved', label: 'Turnkey Value', desc: 'End-to-end design, staging, and executive leasing protecting capital.' },
    ],
    services: [
      {
        title: 'Executive Residential Stewardship',
        badge: 'LEASING',
        description: 'Managing turnkey 3-6-9 month executive leases. Tenant vetting, corporate lease agreements, maintenance, and concierge turnover.',
        deliverables: [
          'Executive tenant background screening',
          'Corporate lease agreements',
          'White-glove turnover and inspection',
          '24/7 dedicated maintenance dispatch',
        ],
        spec: 'EXECUTIVE TENANCY',
      },
      {
        title: 'Corporate LLC Debt Structuring',
        badge: 'FINANCING',
        description: 'Partnering with institutional lenders specializing in corporate LLC debt financing for real estate investors.',
        deliverables: [
          'LLC corporate mortgage debt analysis',
          'Fast-track institutional underwriting liaison',
          'Portfolio financing options',
          'Refinancing and equity extraction advisory',
        ],
        spec: 'PORTFOLIO DEBT',
      },
      {
        title: 'Concentrated Prime Residential Fund',
        badge: 'CAPITAL',
        description: 'Disciplined acquisition of prime residential condominium assets with a 5 to 7 year horizon, capturing counter-cyclical pricing.',
        deliverables: [
          'Off-market deal flow sourcing',
          'Institutional cash flow and IRR modeling',
          'Quarterly audited financial statements',
          'Strategic capital exit planning',
        ],
        spec: '5–7 YEAR HORIZON',
      },
      {
        title: 'Turnkey Architectural Elevation',
        badge: 'STAGING',
        description: 'Integrating with Black Label Design to remodel, stage, and elevate acquired residential units, protecting long-term capital valuation.',
        deliverables: [
          'High-ROI residential renovation plans',
          'Turnkey quiet-luxury staging and furnishings',
          'Building HOA and contractor liaison',
          'Comprehensive asset depreciation support',
        ],
        spec: 'ASSET OPTIMIZATION',
      },
    ],
    steps: [
      {
        num: '01',
        phase: 'STEP 01 · SOURCING',
        title: 'Underwriting & Counter-Cyclical Modeling',
        desc: 'Identifying off-market prime tower residences, analyzing replacement costs, and running 5-to-7-year patient capital models.',
        timeframe: 'Weeks 1–2',
        milestone: 'Investment Pro Forma Approved',
      },
      {
        num: '02',
        phase: 'STEP 02 · ACQUISITION',
        title: 'Structuring & Escrow',
        desc: 'Executing tax-efficient corporate debt packaging and closing escrow with discretion.',
        timeframe: 'Closing Window',
        milestone: 'Acquisition Finalized',
      },
      {
        num: '03',
        phase: 'STEP 03 · STEWARDSHIP',
        title: 'Staging & Long-Term Yield',
        desc: 'Elevating residences with quiet-luxury furnishings, placing high-caliber corporate tenants, and compounding value.',
        timeframe: 'Multi-Year Horizon',
        milestone: 'Generational Value Realized',
      },
    ],
    faqs: [
      {
        question: 'Why focus exclusively on a 5-to-7-year investment horizon?',
        answer: 'Real estate is fundamentally an illiquid, enduring asset class. Attempting to time 12-month market gyrations introduces unnecessary anxiety; a 5-to-7-year horizon allows counter-cyclical investments to compound through full economic cycles.',
      },
      {
        question: 'Why are prime San Francisco tower condominiums compelling?',
        answer: 'San Francisco remains the undisputed intellectual and capital center of global artificial intelligence and technological innovation. Prime high-rise residential inventory in SoMa possesses scarcity that cannot be replicated.',
      },
      {
        question: 'How does design integration protect capital downside?',
        answer: 'Generic apartments compete on price; residences curated with architectural lighting, European millwork, and balanced interiors command premium executive tenancies and endure market contractions.',
      },
    ],
    related: [
      { label: '05 Design', href: '/design', desc: 'The architecture of calm and spatial harmony.' },
      { label: '06 Business Services', href: '/business-services', desc: 'Structural order and corporate governance.' },
      { label: '08 Luxury', href: '/luxury', desc: 'The philosophy of ephemeral wonder.' },
    ],
    svgKey: 'investments',
  },
  {
    slug: 'luxury',
    num: '08',
    divisionName: 'Luxury',
    pageTitle: 'Black Label Luxury · Ephemeral Wonder & Pure Appreciation',
    metaDesc: 'Appreciation transcends accumulation. Experience the sublime pinnacle of mechanical art and rare horology, unencumbered by the heavy gravity of possession.',
    h1: 'The Philosophy of Ephemeral Wonder',
    intro: 'Possession often becomes an unintended burden—maintenance, storage, insurance, and the psychological gravity of material accumulation. We deliver a message on the lightness of being: experiencing the sublime peak of automotive mechanics and rare horological art as pure aesthetic moments, free from the anchor of ownership.',
    standards: [
      { value: 'Lightness', label: 'Freedom from Possession', desc: 'Deep aesthetic appreciation without the logistical weight of ownership.' },
      { value: 'Mastery', label: 'Mechanical Pinnacle', desc: 'Celebrating human engineering and handcrafted horological art.' },
      { value: 'Purity', label: 'Pristine Preservation', desc: 'Assets maintained to factory perfection and certified provenance.' },
      { value: 'Presence', label: 'The Unencumbered Moment', desc: 'Enjoying the open road or the evening gala with absolute serenity.' },
    ],
    services: [
      {
        title: 'The Pure Mechanical Encounter',
        badge: 'MOBILITY',
        description: 'Access to a private stable of performance vehicles maintained in showroom condition. Delivered with a full tank directly to residential valet.',
        deliverables: [
          'Showroom-condition performance vehicle fleet',
          'White-glove residential or aviation delivery',
          'Flexible daily, weekend, and multi-week arrangements',
          '24/7 dedicated roadside concierge support',
        ],
        spec: 'RESIDENTIAL VALET DELIVERY',
      },
      {
        title: 'Haute Horlogerie & The Fine Vault',
        badge: 'HOROLOGY',
        description: 'Exceptional fine jewelry collections and collector timepieces available for galas, events, and private gatherings.',
        deliverables: [
          'Certified diamond and gemstone suites',
          'Collector timepieces from recognized maisons',
          'Professional ultrasonic cleaning and verification',
          'Personal stylist pairing consultation',
        ],
        spec: 'INSURED TRANSIT',
      },
      {
        title: 'Discreet Insured Custody Transfer',
        badge: 'CUSTODY',
        description: 'Every vehicle and jewelry parcel is handled by vetted, bonded couriers with comprehensive casualty insurance.',
        deliverables: [
          'Comprehensive transit and casualty coverage',
          'Bonded delivery specialist',
          'Custody handoff protocol',
          'Zero liability exposure beyond reservation terms',
        ],
        spec: 'COMPREHENSIVE COVERAGE',
      },
      {
        title: 'Occasion & Itinerary Curation',
        badge: 'CURATION',
        description: 'Coordinated styling for high-profile moments. Matching vehicles and jewelry suites to itinerary and attire.',
        deliverables: [
          'Curated vehicle and jewelry packages',
          'Weekend itinerary and route support',
          'Private chauffeur liaison on request',
          'Seamless residential return collection',
        ],
        spec: 'OCCASION SUPPORT',
      },
    ],
    steps: [
      {
        num: '01',
        phase: 'STEP 01 · SELECTION',
        title: 'The Aesthetic Selection',
        desc: 'Select a performance machine or horological masterpiece tailored to the specific nature of your journey or evening.',
        timeframe: 'Instant to 24 Hours',
        milestone: 'Reservation Confirmed',
      },
      {
        num: '02',
        phase: 'STEP 02 · HARMONY',
        title: 'Sanctuary Delivery',
        desc: 'The piece or vehicle is hand-delivered to your residential valet or private aviation terminal in showroom condition.',
        timeframe: 'Scheduled Hour',
        milestone: 'Pristine Custody Transferred',
      },
      {
        num: '03',
        phase: 'STEP 03 · RELEASE',
        title: 'Effortless Return',
        desc: 'Our bonded couriers collect keys or jewels directly from your residence, leaving you completely unburdened.',
        timeframe: 'Journey Conclusion',
        milestone: 'Unencumbered Account Cleared',
      },
    ],
    faqs: [
      {
        question: 'Why advocate for access over possession of luxury assets?',
        answer: 'Owning exotic vehicles and high jewelry entails depreciation, maintenance anxiety, specialized insurance, and storage security. Experiencing them on demand allows you to enjoy 100% of the aesthetic thrill with 0% of the material drag.',
      },
      {
        question: 'How is transit and insurance handled?',
        answer: 'Every machine and horological suite is backed by comprehensive casualty and transit insurance, delivered discreetly by bonded couriers.',
      },
      {
        question: 'Where can delivery be arranged?',
        answer: 'Directly to your residential valet porte-cochère, private airport FBO, or personal estate across the San Francisco Bay Area.',
      },
    ],
    related: [
      { label: '02 Entertainment', href: '/entertainment', desc: 'The sacred ritual of gathering and presence.' },
      { label: '04 Lifestyle', href: '/lifestyle', desc: 'The sovereignty of human time and domestic stillness.' },
      { label: '07 Investments', href: '/investments', desc: 'The patient multi-year horizon in tangible property.' },
    ],
    svgKey: 'luxury',
  },
];


/**
 * ============================================================================
 * 1. HOMEPAGE COMPILER (generateHomePage)
 * ============================================================================
 * Owner & Developer Guide:
 * Generates the master landing page (index.html) showcasing the eight-brand
 * ecosystem anchored at Millennium Tower, San Francisco.
 * 
 * CORE SECTIONS:
 * - Twilight Penthouse Hero: LCP-optimized WebP asset with high-priority preload,
 *   smooth parallax lerp, and direct call-to-actions.
 * - Brand Directory Grid: 8 distinct division cards featuring responsive
 *   picture elements, bespoke animated SVG artwork, and 3D card tilt.
 * - Interactive Zero-Latency Filter Tabs: Instantly filters cards by category
 *   ('all', 'enterprise', 'living', 'assets') without reloading.
 * - Reclaimed Time Freedom ROI Calculator: Dynamic sliders allowing clients
 *   to calculate recovered weekly/monthly hours and financial return.
 * - Priority Concierge Intake: Direct submission to concierge@blacklabel.life.
 * ============================================================================
 */
function generateHomePage(): string {
  const brandCards = [
    {
      num: '01',
      title: 'Social',
      tagline: 'The Sovereignty of Silence',
      desc: 'In an era of relentless algorithmic noise, true authority is quiet. Enduring influence is communicated with restraint to those who already listen, never shouted to the crowd.',
      href: '/social',
      category: 'enterprise',
      image: '/assets/images/social.jpg',
      svg: 'social',
      badge: 'Inquiry 01 · Restraint',
    },
    {
      num: '02',
      title: 'Entertainment',
      tagline: 'The Ritual of Human Gathering',
      desc: 'The dinner table is not an event to be managed, but a sacred ritual of presence. Curating intimate culinary atmospheres where meaningful dialogue flourishes.',
      href: '/entertainment',
      category: 'living',
      image: '/assets/images/dining.jpg',
      svg: 'entertainment',
      badge: 'Inquiry 02 · Presence',
    },
    {
      num: '03',
      title: 'Trading',
      tagline: 'The Benchmark of Authentic Truth',
      desc: 'True rarity requires no exaggeration. Benchmarking authenticity, historical provenance, and objective valuation with mathematical rigor and calm clarity.',
      href: '/trading',
      category: 'enterprise',
      image: '/assets/images/trading.jpg',
      svg: 'trading',
      badge: 'Inquiry 03 · Veracity',
    },
    {
      num: '04',
      title: 'Lifestyle',
      tagline: 'The Reclamation of Mortal Time',
      desc: 'Time is the only irreplaceable asset. Eliminating domestic friction and executive clutter to restore the human spirit to contemplation, health, and creation.',
      href: '/lifestyle',
      category: 'living',
      image: '/assets/images/lifestyle.jpg',
      svg: 'lifestyle',
      badge: 'Inquiry 04 · Sovereignty',
    },
    {
      num: '05',
      title: 'Design',
      tagline: 'The Architecture of Inner Calm',
      desc: 'A space is an external manifestation of the mind. Designing serene, unhurried environments stripped of decorative noise and anchored in geometric grace.',
      href: '/design',
      category: 'living',
      image: '/assets/images/interior.jpg',
      svg: 'design',
      badge: 'Inquiry 05 · Quietude',
    },
    {
      num: '06',
      title: 'Business Services',
      tagline: 'The Elimination of Friction',
      desc: 'Administrative complexity should never consume creative genius. Fiduciary clarity and unyielding governance form the quiet bedrock of enduring enterprise.',
      href: '/business-services',
      category: 'enterprise',
      image: '/assets/images/business.jpg',
      svg: 'business-services',
      badge: 'Inquiry 06 · Clarity',
    },
    {
      num: '07',
      title: 'Investments',
      tagline: 'The Patient Horizon',
      desc: 'Generational stewardship over speculative hysteria. Preserving capital, enduring real estate, and long-term purpose with quiet conviction.',
      href: '/investments',
      category: 'enterprise',
      image: '/assets/images/penthouse.jpg',
      svg: 'investments',
      badge: 'Inquiry 07 · Permanence',
    },
    {
      num: '08',
      title: 'Luxury',
      tagline: 'The Poetry of Mechanical Art',
      desc: 'True luxury is an experience of craftsmanship, kinetic harmony, and timeless engineering—never conspicuous consumption or fleeting status signaling.',
      href: '/luxury',
      category: 'living',
      image: '/assets/images/luxury.jpg',
      svg: 'luxury',
      badge: 'Inquiry 08 · Mastery',
    },
  ];

  const brandGridHtml = brandCards
    .map((card) => {
      const hasImage = Boolean(card.image);
      return `
      <article data-division-category="${card.category}" class="division-card-item relative group bg-[#0b0e13] border border-[#c5a059]/25 hover:border-[#c5a059]/75 rounded-sm luxury-card-hover flex flex-col justify-between overflow-hidden shadow-xl" data-reveal="scale">
        ${
          hasImage
            ? `
        <!-- High-End Photography Card Window -->
        <div class="relative h-56 sm:h-64 w-full overflow-hidden border-b border-[#c5a059]/15">
          <picture>
            <source media="(max-width: 768px)" srcset="${card.image.replace('.jpg', '-mobile.webp')}" type="image/webp" />
            <source srcset="${card.image.replace('.jpg', '.webp')}" type="image/webp" />
            <img src="${card.image}" alt="Black Label ${card.title} - ${card.tagline}" width="800" height="450" loading="lazy" decoding="async" class="w-full h-full object-cover luxury-image-zoom filter brightness-90 group-hover:brightness-100" />
          </picture>
          <div class="absolute inset-0 bg-gradient-to-t from-[#0b0e13] via-[#0b0e13]/30 to-transparent"></div>
          <div class="absolute top-4 left-4 flex items-center gap-2">
            <span class="px-3 py-1 text-[11px] font-mono uppercase tracking-widest text-[#faf8f5] bg-[#060709]/85 backdrop-blur-md border border-[#c5a059]/30 rounded-sm">
              ${card.badge}
            </span>
          </div>
          <span class="absolute bottom-3 right-4 text-4xl font-serif font-light text-[#c5a059]/40 group-hover:text-[#c5a059] transition-colors">
            ${card.num}
          </span>
        </div>
        `
            : `
        <!-- Pure Editorial Dark Lacquer Panel -->
        <div class="p-7 pb-0 flex items-center justify-between">
          <span class="px-3 py-1.5 text-[11px] font-mono uppercase tracking-widest text-[#c5a059] bg-[#c5a059]/10 border border-[#c5a059]/30 rounded-sm">
            ${card.badge}
          </span>
          <span class="text-4xl font-serif font-light text-[#c5a059]/40 group-hover:text-[#c5a059] transition-colors">
            ${card.num}
          </span>
        </div>
        `
        }

        <div class="p-7 sm:p-8 space-y-5 flex-1 flex flex-col justify-between">
          <div class="space-y-2.5">
            <h3 class="text-2xl sm:text-3xl font-serif text-[#faf8f5] group-hover:text-[#c5a059] transition-colors font-medium">
              <a href="${card.href}" class="focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a059]">
                ${card.title}
              </a>
            </h3>
            <p class="text-xs sm:text-[13px] uppercase tracking-[0.2em] text-[#c5a059] font-mono font-medium">${card.tagline}</p>
            <p class="text-sm sm:text-[15px] text-[#dcd6ca] leading-relaxed font-light pt-1">${card.desc}</p>
          </div>

          <div class="pt-5 mt-5 border-t border-[#c5a059]/15 flex items-center justify-between">
            <span class="text-xs font-mono uppercase tracking-widest text-[#a69f91] group-hover:text-[#faf8f5] transition-colors">
              Inquiry ${card.num}
            </span>
            <a href="${card.href}" class="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold uppercase tracking-[0.2em] text-[#c5a059] group-hover:text-[#dfc182] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a059]">
              Explore <span aria-hidden="true" class="transition-transform group-hover:translate-x-1 font-mono">→</span>
            </a>
          </div>
        </div>
      </article>
    `;
    })
    .join('');

  const homeFaqs = [
    {
      question: 'What message does Black Label exist to communicate?',
      answer:
        'Black Label delivers a message of sovereign living and intentional presence. In a culture driven by perpetual urgency, public validation, and friction, we assert that the highest form of living is achieved through restraint, quiet excellence, and the reclamation of unhurried time.',
    },
    {
      question: 'Why does Black Label present eight dimensional inquiries?',
      answer:
        'Human life is multifaceted. Sovereignty cannot exist in enterprise if personal space is chaotic, nor can it flourish in the mind if time is squandered on friction. The eight dimensions—Social, Entertainment, Trading, Lifestyle, Design, Business, Investments, and Luxury—represent a holistic architecture of calm, order, and intentional focus.',
    },
    {
      question: 'Why does Black Label refrain from commercial selling and advertising?',
      answer:
        'True value requires no frantic sales pitch. We believe that genuine authority and craft speak for themselves. Rather than treating clients as consumers to be persuaded, we invite peer minds to participate in a shared standard of excellence and quiet dignity.',
    },
    {
      question: 'What is the significance of Millennium Tower in San Francisco?',
      answer:
        'Millennium Tower at 301 Mission St serves as our physical anchor and sanctuary. Standing tall above the city, it embodies our architectural perspective: elevated above the noise, grounded in precision, and dedicated to lasting presence.',
    },
    {
      question: 'What is the principle of discretion and silence?',
      answer:
        'Discretion is not merely a legal covenant; it is a moral stance. We believe that what is sacred should be preserved in private, and that true power does not need to broadcast its achievements to the world.',
    },
    {
      question: 'How does one enter into correspondence with Black Label?',
      answer:
        'We do not operate automated sales funnels. We welcome direct, thoughtful correspondence through our Concierge Liaison at concierge@blacklabel.life or through our intake portal, where every inquiry is received with personal consideration.',
    },
  ];

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Black Label Lifestyle',
      url: 'https://blacklabel.life',
      logo: 'https://blacklabel.life/assets/logo-light.png',
      email: 'concierge@blacklabel.life',
      description:
        'A sanctuary of quietude, depth, and intentional presence anchored in Millennium Tower, San Francisco. Delivering eight dimensional inquiries of sovereign living.',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'San Francisco',
        addressRegion: 'CA',
        streetAddress: 'Millennium Tower, SoMa',
        addressCountry: 'US',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Black Label Lifestyle',
      url: 'https://blacklabel.life/',
      description: 'The Philosophy of Sovereign Living and Eight Dimensional Inquiries',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: homeFaqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
  ];

  return `<!doctype html>
<html lang="en" class="scroll-smooth">
<head>
  ${renderHeadTags({
    title: 'Black Label · Sanctuary of Human Attention & Sovereign Living',
    description: 'A sanctuary of quietude, depth, and intentional presence anchored in Millennium Tower, San Francisco. Delivering eight dimensional inquiries of sovereign living.',
    canonicalUrl: 'https://blacklabel.life/',
    jsonLd: jsonLd,
    preloadImage: {
      href: '/assets/images/penthouse.webp',
      mobileHref: '/assets/images/penthouse-mobile.webp',
    },
  })}
</head>
<body class="bg-[#060709] text-[#e6e0d4]">
  ${renderSharedHeader('/')}

  <main id="main-content">
    <!-- 1. CINEMATIC TWILIGHT PENTHOUSE HERO -->
    <section id="hero" class="relative min-h-[96vh] sm:min-h-screen flex items-center pt-32 sm:pt-40 md:pt-44 pb-20 sm:pb-28 overflow-hidden border-b border-white/[0.08]">
      <!-- Background Luxury Visual Asset & Cinematic Drift -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden" data-hero-parallax-bg>
        <picture>
          <source media="(max-width: 768px)" srcset="/assets/images/penthouse-mobile.webp" type="image/webp" />
          <source media="(min-width: 769px)" srcset="/assets/images/penthouse.webp" type="image/webp" />
          <img src="/assets/images/penthouse.jpg" alt="Millennium Tower San Francisco Penthouse at Twilight" width="1920" height="1080" fetchpriority="high" loading="eager" decoding="async" class="w-full h-full object-cover filter brightness-[0.38] contrast-105 anim-hero-bg-drift" />
        </picture>
        <div class="absolute inset-0 bg-gradient-to-t from-[#060709] via-[#060709]/70 to-[#060709]/50"></div>
        <div class="absolute inset-0 bg-radial-hero"></div>
        <div class="absolute inset-0 bg-radial-luxury anim-hero-ambient-sweep opacity-60"></div>
      </div>

      <!-- Ambient Golden Dust / Twilight Bokeh Particle Layer -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden z-[5]" data-hero-parallax-particles aria-hidden="true">
        <div class="absolute top-[28%] left-[12%] w-2.5 h-2.5 rounded-full bg-[#ebd4a2] blur-[1px] anim-hero-particle-1 shadow-[0_0_12px_#ebd4a2]"></div>
        <div class="absolute top-[65%] left-[22%] w-3.5 h-3.5 rounded-full bg-[#c5a059] blur-[1.5px] anim-hero-particle-2 shadow-[0_0_15px_#c5a059]"></div>
        <div class="absolute top-[35%] right-[18%] w-3 h-3 rounded-full bg-[#dfc182] blur-[1px] anim-hero-particle-3 shadow-[0_0_14px_#dfc182]"></div>
        <div class="absolute top-[72%] right-[28%] w-2 h-2 rounded-full bg-[#ebd4a2] blur-[0.8px] anim-hero-particle-4 shadow-[0_0_10px_#ebd4a2]"></div>
        <div class="absolute top-[18%] right-[38%] w-2 h-2 rounded-full bg-[#c5a059] blur-[1px] anim-hero-particle-5 shadow-[0_0_10px_#c5a059]"></div>
        <div class="absolute top-[50%] left-[45%] w-1.5 h-1.5 rounded-full bg-[#faf8f5] blur-[0.5px] anim-hero-particle-2 shadow-[0_0_8px_#faf8f5]"></div>
      </div>

      <div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-7 sm:space-y-9 z-10" data-hero-parallax-content>
        <!-- Architectural Animated Crest Emblem -->
        <div class="animate-hero-badge flex items-center justify-center" data-luxury-card-tilt>
          <div class="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
            <!-- Ambient Breathing Glow Behind Crest -->
            <div class="absolute inset-0 bg-radial-glow-champagne rounded-full anim-ambient-breathe pointer-events-none scale-125"></div>

            <svg viewBox="0 0 120 120" class="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <!-- Outer Rotating Ring with Compass Ticks -->
              <circle cx="60" cy="60" r="54" stroke="#c5a059" stroke-width="1" stroke-opacity="0.35" stroke-dasharray="4 8" class="anim-crest-ring-clockwise" />
              <circle cx="60" cy="60" r="46" stroke="#c5a059" stroke-width="0.75" stroke-opacity="0.25" />
              
              <!-- Counter-Rotating Octagram Geometric Lattice -->
              <g class="anim-crest-ring-counter">
                <rect x="25" y="25" width="70" height="70" stroke="#c5a059" stroke-width="0.85" stroke-opacity="0.5" rx="2" />
                <rect x="25" y="25" width="70" height="70" stroke="#ebd4a2" stroke-width="0.85" stroke-opacity="0.5" rx="2" transform="rotate(45 60 60)" />
              </g>

              <!-- Rapid Concentric Inner Radar Ring -->
              <circle cx="60" cy="60" r="22" stroke="#c5a059" stroke-width="1.2" stroke-opacity="0.6" stroke-dasharray="8 6" class="anim-crest-ring-fast" />

              <!-- Center Champagne Jewel & Radiance Ticks -->
              <circle cx="60" cy="60" r="8" fill="#060709" stroke="#c5a059" stroke-width="1.5" />
              <circle cx="60" cy="60" r="4" fill="#c5a059" class="anim-sparkle" />

              <!-- 4 Cardinal Ray Crossbars -->
              <line x1="60" y1="6" x2="60" y2="18" stroke="#ebd4a2" stroke-width="1.5" stroke-linecap="round" />
              <line x1="60" y1="102" x2="60" y2="114" stroke="#ebd4a2" stroke-width="1.5" stroke-linecap="round" />
              <line x1="6" y1="60" x2="18" y2="60" stroke="#ebd4a2" stroke-width="1.5" stroke-linecap="round" />
              <line x1="102" y1="60" x2="114" y2="60" stroke="#ebd4a2" stroke-width="1.5" stroke-linecap="round" />
            </svg>
          </div>
        </div>

        <!-- High-Fashion Roman H1 -->
        <h1 class="animate-hero-title text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-serif text-[#faf8f5] font-light leading-[1.08] tracking-tight max-w-5xl mx-auto">
          The Architecture of
          <span class="block text-[#c5a059] font-serif font-light text-2xl sm:text-4xl md:text-5xl lg:text-6xl mt-3 sm:mt-4 tracking-normal">
            Human Attention
          </span>
        </h1>

        <!-- Subheading -->
        <p class="animate-hero-sub text-lg sm:text-xl md:text-2xl text-[#dcd6ca] max-w-4xl mx-auto leading-relaxed font-light">
          A manifesto for sovereign living. In an era dominated by relentless urgency and algorithmic distraction, Black Label offers a sanctuary of quiet depth, intentional focus, and enduring perspective.
        </p>

        <!-- Buttons -->
        <div class="animate-hero-cta pt-4 flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-7">
          <a href="#brands" id="hero-explore-btn" class="w-full sm:w-auto px-9 py-4 text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-[#faf8f5] border border-[#c5a059]/60 hover:bg-[#c5a059]/15 hover:border-[#c5a059] transition-all duration-300 rounded-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a059]">
            Explore 8 Inquiries ↓
          </a>
          <a href="/concierge" id="hero-concierge-btn" class="w-full sm:w-auto px-9 py-4 text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-[#060709] bg-[#c5a059] hover:bg-[#dfc182] transition-all duration-300 rounded-sm shadow-[0_0_22px_rgba(197,160,89,0.35)] hover:shadow-[0_0_28px_rgba(197,160,89,0.55)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a059]">
            Sanctuary & Dialogue
          </a>
        </div>

        <!-- Animated Scroll Cue with Downward Laser Pulse -->
        <div class="pt-6 sm:pt-8 pb-1 flex flex-col items-center justify-center">
          <a href="#brands" class="group inline-flex flex-col items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-[#a69f91] hover:text-[#c5a059] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a059]" aria-label="Scroll to discover divisions">
            <span>Discover The Eight Inquiries</span>
            <div class="w-[18px] h-8 rounded-full border border-[#c5a059]/40 p-1 flex justify-center relative overflow-hidden bg-black/40">
              <div class="w-1 h-2.5 rounded-full bg-[#c5a059] anim-scroll-beam shadow-[0_0_8px_#c5a059]"></div>
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- 2. "EIGHT DIMENSIONS OF SOVEREIGN INQUIRY" -->
    <section id="brands" data-reveal-section class="py-28 sm:py-36 bg-[#060709] text-[#faf8f5] border-b border-white/[0.08] relative">
      <div class="max-w-7xl xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-14 sm:mb-20 space-y-4" data-reveal="fade-up">
          <span class="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-mono font-semibold">Eight Dimensional Inquiries</span>
          <h2 class="text-4xl sm:text-6xl font-serif text-[#faf8f5]">Eight Dimensions of Sovereign Inquiry</h2>
          <p class="text-sm sm:text-base text-[#dcd6ca] leading-relaxed font-light">
            Rather than asking what to consume, we ask what must be preserved. Explore eight distinct expressions of quietude, dignity, and elevated living.
          </p>
        </div>

        <!-- Curated 8 Division Bento Grid -->
        <div id="division-cards-grid" data-reveal-stagger class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 sm:gap-8">
          ${brandGridHtml}
        </div>
      </div>
    </section>

    <!-- 3. THE BLACK LABEL MINDSET (ATMOSPHERIC NOIR) -->
    <section id="quote-section" data-reveal-section class="py-28 sm:py-36 bg-[#090b0e] text-[#faf8f5] border-b border-white/[0.08] relative overflow-hidden">
      <div class="absolute inset-0 bg-radial-luxury pointer-events-none opacity-60"></div>
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10" data-reveal="fade-up">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-[#c5a059]/10 border border-[#c5a059]/30 text-xs">
          <span class="text-[#c5a059] font-mono uppercase tracking-[0.25em] text-[11px]">The Black Label Mindset</span>
        </div>

        <blockquote class="text-3xl sm:text-5xl lg:text-6xl font-serif font-light text-[#faf8f5] leading-snug tracking-tight">
          “Hire out everything that distracts you from what you are building. <br class="hidden sm:inline" />
          <span class="italic text-gold-accent font-normal">Time is the only asset you cannot buy back.</span>”
        </blockquote>

        <div class="pt-3 flex items-center justify-center gap-4">
          <span class="h-px w-20 bg-[#c5a059]/40"></span>
          <span class="text-xs uppercase tracking-[0.25em] text-[#a69f91] font-mono">Founding Principle · Millennium Tower</span>
          <span class="h-px w-20 bg-[#c5a059]/40"></span>
        </div>
      </div>
    </section>

    <!-- 4. "ORIGIN & HERITAGE" (RE-ARCHITECTED LUXURY DUAL-CANVAS SHOWCASE) -->
    <section id="story-section" data-reveal-section class="py-28 sm:py-36 bg-[#060709] text-[#faf8f5] border-b border-white/[0.08] relative">
      <div class="max-w-7xl xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4" data-reveal="fade-up">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#c5a059]/10 border border-[#c5a059]/30 text-xs">
            <span class="text-[#c5a059] font-mono uppercase tracking-[0.25em] text-[10px] font-semibold">Origin & Heritage · San Francisco</span>
          </div>
          <h2 class="text-4xl sm:text-6xl font-serif text-[#faf8f5] font-light leading-tight">
            Built from the <span class="italic text-gold-accent font-normal">top floor down</span>
          </h2>
          <p class="text-sm sm:text-base text-[#dcd6ca] leading-relaxed font-light">
            Born in the residences of Millennium Tower at 301 Mission St, Black Label was created out of a singular realization: operational friction is the silent tax on human achievement.
          </p>
        </div>

        <!-- Editorial Dual-Canvas Frame -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <!-- Left Architectural Visual Canvas -->
          <div class="lg:col-span-6 flex flex-col" data-reveal="slide-left">
            <div class="relative w-full h-full min-h-[420px] rounded-sm overflow-hidden border border-[#c5a059]/30 shadow-2xl group flex flex-col justify-end p-8 sm:p-10">
              <picture>
                <source media="(max-width: 768px)" srcset="/assets/images/penthouse-mobile.webp" type="image/webp" />
                <source srcset="/assets/images/penthouse.webp" type="image/webp" />
                <img src="/assets/images/penthouse.jpg" alt="Millennium Tower San Francisco Skyline at Dusk" width="1200" height="800" loading="lazy" decoding="async" class="absolute inset-0 w-full h-full object-cover filter brightness-[0.55] contrast-105 luxury-image-zoom transition-transform duration-700 group-hover:scale-105" />
              </picture>
              <div class="absolute inset-0 bg-gradient-to-t from-[#060709] via-[#060709]/50 to-transparent"></div>
              
              <!-- Subtle decorative gold corner brackets -->
              <div class="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#c5a059]/50"></div>
              <div class="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#c5a059]/50"></div>
              
              <!-- Architectural Brass Plaque -->
              <div class="relative z-10 p-6 rounded bg-[#060709]/90 backdrop-blur-md border border-[#c5a059]/40 space-y-2">
                <div class="flex items-center justify-between text-[10px] font-mono text-[#c5a059] uppercase tracking-[0.25em]">
                  <span>San Francisco, CA</span>
                  <span>37.7903° N, 122.3972° W</span>
                </div>
                <h3 class="text-xl sm:text-2xl font-serif text-[#faf8f5] font-medium">Millennium Tower Residences</h3>
                <p class="text-xs sm:text-[13px] text-[#dcd6ca] font-light leading-relaxed">
                  “In high-stakes living, friction is the enemy of focus. We built the sovereign infrastructure so you can operate at peak elevation.”
                </p>
                <div class="pt-2 flex items-center gap-3 text-[10px] font-mono text-[#a69f91] uppercase tracking-wider">
                  <span>301 Mission St</span>
                  <span>·</span>
                  <span>Transbay SoMa Hub</span>
                  <span>·</span>
                  <span class="text-[#c5a059]">Resident Terminal</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Right: The Three Pillars of Sovereignty -->
          <div class="lg:col-span-6 flex flex-col justify-between space-y-6" data-reveal-stagger>
            <div class="p-8 rounded-sm bg-[#0b0e13] border border-white/[0.08] hover:border-[#c5a059]/40 transition-colors space-y-3" data-reveal="slide-right">
              <div class="flex items-center justify-between">
                <span class="text-xs font-mono uppercase tracking-[0.25em] text-[#c5a059] font-semibold">Pillar 01</span>
                <span class="text-2xl font-serif font-light text-[#c5a059]/40">01</span>
              </div>
              <h3 class="text-xl sm:text-2xl font-serif text-[#faf8f5] font-medium">The Abundance Standard</h3>
              <p class="text-xs sm:text-sm text-[#dcd6ca] leading-relaxed font-light">
                Why compromise between aggressive enterprise scaling and private sanctuary? We manage housekeeping, culinary dining, staging, and exotic transport concurrently so your home environment mirrors the caliber of your ambitions.
              </p>
            </div>

            <div class="p-8 rounded-sm bg-[#0b0e13] border border-white/[0.08] hover:border-[#c5a059]/40 transition-colors space-y-3" data-reveal="slide-right">
              <div class="flex items-center justify-between">
                <span class="text-xs font-mono uppercase tracking-[0.25em] text-[#c5a059] font-semibold">Pillar 02</span>
                <span class="text-2xl font-serif font-light text-[#c5a059]/40">02</span>
              </div>
              <h3 class="text-xl sm:text-2xl font-serif text-[#faf8f5] font-medium">Institutional Discretion</h3>
              <p class="text-xs sm:text-sm text-[#dcd6ca] leading-relaxed font-light">
                Every butler, chef, private chauffeur, and back-office CPA operates under strict, audited non-disclosure protocols. Your schedules, residential guests, and family finances are sealed behind absolute institutional privacy.
              </p>
            </div>

            <div class="p-8 rounded-sm bg-[#0b0e13] border border-white/[0.08] hover:border-[#c5a059]/40 transition-colors space-y-3" data-reveal="slide-right">
              <div class="flex items-center justify-between">
                <span class="text-xs font-mono uppercase tracking-[0.25em] text-[#c5a059] font-semibold">Pillar 03</span>
                <span class="text-2xl font-serif font-light text-[#c5a059]/40">03</span>
              </div>
              <h3 class="text-xl sm:text-2xl font-serif text-[#faf8f5] font-medium">Zero Handoff Friction</h3>
              <p class="text-xs sm:text-sm text-[#dcd6ca] leading-relaxed font-light">
                A single concierge liaison orchestrates all eight specialized operating companies. No fragmented vendors, no redundant invoices, and no phone tag—just seamless luxury execution with one point of command.
              </p>
            </div>
          </div>
        </div>

        <!-- Architectural Metric Showcase Ribbon -->
        <div class="mt-14 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.08] border border-white/[0.08] rounded-sm overflow-hidden shadow-2xl" data-reveal-stagger>
          <div class="p-8 sm:p-10 bg-[#090b0e] text-center space-y-2 group hover:bg-[#0d1016] transition-colors" data-reveal="scale">
            <div class="text-4xl sm:text-5xl font-serif text-[#c5a059] font-light">8</div>
            <p class="text-xs sm:text-sm uppercase tracking-[0.2em] text-[#faf8f5] font-semibold">Specialized Companies</p>
            <p class="text-xs text-[#a69f91] font-light">One unified luxury standard</p>
          </div>

          <div class="p-8 sm:p-10 bg-[#090b0e] text-center space-y-2 group hover:bg-[#0d1016] transition-colors" data-reveal="scale">
            <div class="text-4xl sm:text-5xl font-serif text-[#c5a059] font-light">48 hrs</div>
            <p class="text-xs sm:text-sm uppercase tracking-[0.2em] text-[#faf8f5] font-semibold">Weekly Reclaim</p>
            <p class="text-xs text-[#a69f91] font-light">Sovereign focus returned</p>
          </div>

          <div class="p-8 sm:p-10 bg-[#090b0e] text-center space-y-2 group hover:bg-[#0d1016] transition-colors" data-reveal="scale">
            <div class="text-4xl sm:text-5xl font-serif text-[#c5a059] font-light">3 · 6 · 9 mo</div>
            <p class="text-xs sm:text-sm uppercase tracking-[0.2em] text-[#faf8f5] font-semibold">Turnkey Leases</p>
            <p class="text-xs text-[#a69f91] font-light">Furnished executive suites</p>
          </div>

          <div class="p-8 sm:p-10 bg-[#090b0e] text-center space-y-2 group hover:bg-[#0d1016] transition-colors" data-reveal="scale">
            <div class="text-4xl sm:text-5xl font-serif text-[#c5a059] font-light">301 Mission</div>
            <p class="text-xs sm:text-sm uppercase tracking-[0.2em] text-[#faf8f5] font-semibold">Resident Core</p>
            <p class="text-xs text-[#a69f91] font-light">Millennium Tower headquarters</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. "RESIDENTIAL FOCUS ENGINE" (RE-ARCHITECTED EXECUTIVE COMMAND CONSOLE) -->
    <section id="time-calculator" data-reveal-section class="py-28 sm:py-36 bg-[#090b0e] text-[#faf8f5] border-b border-white/[0.08] relative">
      <div class="max-w-7xl xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4" data-reveal="fade-up">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#c5a059]/10 border border-[#c5a059]/30 text-xs">
            <span class="text-[#c5a059] font-mono uppercase tracking-[0.25em] text-[10px] font-semibold">Residential Focus Engine · Bandwidth Model</span>
          </div>
          <h2 class="text-4xl sm:text-6xl font-serif text-[#faf8f5]">Calculate Your Reclaimed Time</h2>
          <p class="text-sm sm:text-base text-[#dcd6ca] leading-relaxed font-light">
            Toggle the operational dimensions you delegate to Black Label. Watch your returned weekly focus compound into business growth and personal freedom.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          <!-- Interactive Selector Cards (8 cols) -->
          <div class="lg:col-span-7 space-y-4" data-reveal-stagger>
            <!-- Service Card 1 -->
            <label data-service-card data-reveal="slide-left" class="block p-5 sm:p-6 rounded-sm bg-[#12161f] border border-[#c5a059]/60 hover:border-[#c5a059] cursor-pointer transition-all duration-300 shadow-md">
              <div class="flex items-start gap-4">
                <input type="checkbox" data-hours="24" checked class="mt-1 w-5 h-5 accent-[#c5a059] rounded cursor-pointer" />
                <div class="space-y-1 flex-1">
                  <div class="flex items-center justify-between">
                    <span class="text-base sm:text-lg font-serif text-[#faf8f5] font-medium">Daily Housekeeping & Wardrobe Architecture</span>
                    <span class="text-xs sm:text-sm font-mono text-[#c5a059] font-semibold whitespace-nowrap px-2.5 py-0.5 rounded bg-[#c5a059]/15 border border-[#c5a059]/30">+24 hrs / wk</span>
                  </div>
                  <p class="text-xs sm:text-[13px] text-[#dcd6ca] font-light leading-relaxed">
                    Turnkey morning reset, garment preservation, laundry management, evening turn-down, and direct butler dispatch.
                  </p>
                </div>
              </div>
            </label>

            <!-- Service Card 2 -->
            <label data-service-card data-reveal="slide-left" class="block p-5 sm:p-6 rounded-sm bg-[#12161f] border border-[#c5a059]/60 hover:border-[#c5a059] cursor-pointer transition-all duration-300 shadow-md">
              <div class="flex items-start gap-4">
                <input type="checkbox" data-hours="12" checked class="mt-1 w-5 h-5 accent-[#c5a059] rounded cursor-pointer" />
                <div class="space-y-1 flex-1">
                  <div class="flex items-center justify-between">
                    <span class="text-base sm:text-lg font-serif text-[#faf8f5] font-medium">In-Residence Private Chef & Sommelier Dinners</span>
                    <span class="text-xs sm:text-sm font-mono text-[#c5a059] font-semibold whitespace-nowrap px-2.5 py-0.5 rounded bg-[#c5a059]/15 border border-[#c5a059]/30">+12 hrs / wk</span>
                  </div>
                  <p class="text-xs sm:text-[13px] text-[#dcd6ca] font-light leading-relaxed">
                    Bespoke menu engineering, organic market sourcing, tableside dining, and pristine zero-trace kitchen restoration.
                  </p>
                </div>
              </div>
            </label>

            <!-- Service Card 3 -->
            <label data-service-card data-reveal="slide-left" class="block p-5 sm:p-6 rounded-sm bg-[#12161f] border border-[#c5a059]/60 hover:border-[#c5a059] cursor-pointer transition-all duration-300 shadow-md">
              <div class="flex items-start gap-4">
                <input type="checkbox" data-hours="8" checked class="mt-1 w-5 h-5 accent-[#c5a059] rounded cursor-pointer" />
                <div class="space-y-1 flex-1">
                  <div class="flex items-center justify-between">
                    <span class="text-base sm:text-lg font-serif text-[#faf8f5] font-medium">Institutional Back Office (Accounting, Tax & Legal)</span>
                    <span class="text-xs sm:text-sm font-mono text-[#c5a059] font-semibold whitespace-nowrap px-2.5 py-0.5 rounded bg-[#c5a059]/15 border border-[#c5a059]/30">+8 hrs / wk</span>
                  </div>
                  <p class="text-xs sm:text-[13px] text-[#dcd6ca] font-light leading-relaxed">
                    Corporate entity governance, bookkeeping, vendor reconciliation, tax strategy, and regulatory compliance under one roof.
                  </p>
                </div>
              </div>
            </label>

            <!-- Service Card 4 -->
            <label data-service-card data-reveal="slide-left" class="block p-5 sm:p-6 rounded-sm bg-[#12161f] border border-[#c5a059]/60 hover:border-[#c5a059] cursor-pointer transition-all duration-300 shadow-md">
              <div class="flex items-start gap-4">
                <input type="checkbox" data-hours="4" checked class="mt-1 w-5 h-5 accent-[#c5a059] rounded cursor-pointer" />
                <div class="space-y-1 flex-1">
                  <div class="flex items-center justify-between">
                    <span class="text-base sm:text-lg font-serif text-[#faf8f5] font-medium">Furnished SoMa Lease & Staging Management</span>
                    <span class="text-xs sm:text-sm font-mono text-[#c5a059] font-semibold whitespace-nowrap px-2.5 py-0.5 rounded bg-[#c5a059]/15 border border-[#c5a059]/30">+4 hrs / wk</span>
                  </div>
                  <p class="text-xs sm:text-[13px] text-[#dcd6ca] font-light leading-relaxed">
                    Turnkey executive leasing, tenant vetting, and architectural staging maintenance across San Francisco's premier towers.
                  </p>
                </div>
              </div>
            </label>
          </div>

          <!-- Right Telemetry Console (5 cols) -->
          <div class="lg:col-span-5 flex flex-col justify-between p-8 sm:p-10 bg-[#060709] border border-[#c5a059]/40 rounded-sm shadow-2xl relative overflow-hidden" data-reveal="slide-right">
            <div class="absolute -top-16 -right-16 w-48 h-48 bg-[#c5a059]/10 blur-3xl pointer-events-none"></div>
            
            <div class="space-y-6 relative z-10">
              <div class="flex items-center justify-between border-b border-white/10 pb-4">
                <span class="text-[11px] font-mono uppercase tracking-[0.25em] text-[#c5a059] font-medium">Live Telemetry</span>
                <span class="flex items-center gap-2 text-[10px] font-mono text-emerald-400">
                  <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Telemetry Console
                </span>
              </div>

              <div>
                <span class="block text-xs uppercase tracking-[0.2em] text-[#a69f91] font-mono mb-2">Weekly Sovereign Focus Reclaimed</span>
                <div id="total-reclaimed-hours" class="text-6xl sm:text-7xl font-serif text-[#faf8f5] font-light tracking-tight">
                  48 hrs
                </div>
                <div id="monthly-reclaimed-hours" class="text-sm font-mono text-[#c5a059] mt-1 font-medium">
                  ~208 hrs / mo
                </div>
              </div>

              <!-- Visual Capacity Meter -->
              <div class="space-y-2">
                <div class="flex justify-between text-xs text-[#a69f91] font-mono">
                  <span>Reclaimed Bandwidth</span>
                  <span class="text-[#faf8f5]">100% of ceiling</span>
                </div>
                <div class="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                  <div id="reclaimed-progress-bar" class="h-full bg-gradient-to-r from-[#c5a059] to-[#ebd4a2] transition-all duration-500 rounded-full" style="width: 100%;"></div>
                </div>
              </div>

              <!-- Equivalency Note -->
              <div class="p-4 rounded bg-white/[0.03] border border-white/10 space-y-1">
                <p class="text-xs sm:text-[13px] text-[#faf8f5] font-medium">
                  Equivalent to 2.0 full uninterrupted working days every 7 days.
                </p>
                <p class="text-xs text-[#dcd6ca]/75 font-light">
                  Direct bandwidth unlocked to invest in deal flow, company building, and physical restoration.
                </p>
              </div>
            </div>

            <div class="pt-6 relative z-10">
              <a href="/concierge" class="w-full inline-flex items-center justify-center py-4 px-6 text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-[#060709] bg-[#c5a059] hover:bg-[#dfc182] transition-all duration-300 rounded-sm shadow-[0_0_20px_rgba(197,160,89,0.3)] hover:shadow-[0_0_25px_rgba(197,160,89,0.5)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a059]">
                Lock In Your Allocation →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. FREQUENTLY ASKED QUESTIONS (NEW SECTION) -->
    <section id="faq-section" data-reveal-section class="py-28 sm:py-36 bg-[#060709] text-[#faf8f5] border-b border-white/[0.08] relative">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4" data-reveal="fade-up">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#c5a059]/10 border border-[#c5a059]/30 text-xs">
            <span class="text-[#c5a059] font-mono uppercase tracking-[0.25em] text-[10px] font-semibold">Institutional Clarity</span>
          </div>
          <h2 class="text-4xl sm:text-6xl font-serif text-[#faf8f5]">Frequently Asked Questions</h2>
          <p class="text-sm sm:text-base text-[#dcd6ca] leading-relaxed font-light">
            Direct answers regarding our 8-division operating collective, Millennium Tower residence privileges, and client onboarding.
          </p>
        </div>

        <!-- Accordion Container -->
        <div class="space-y-4" data-reveal-stagger>
          ${homeFaqs
            .map(
              (faq, idx) => `
            <details class="group bg-[#0b0e13] border border-white/[0.08] hover:border-[#c5a059]/40 rounded-sm transition-all duration-300 open:border-[#c5a059]/60 open:bg-[#0e1218]" data-reveal="fade-up">
              <summary class="flex items-center justify-between p-6 sm:p-7 cursor-pointer list-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a059]">
                <div class="flex items-center gap-4">
                  <span class="font-mono text-xs text-[#c5a059]">0${idx + 1}</span>
                  <span class="text-base sm:text-lg font-serif text-[#faf8f5] group-hover:text-[#c5a059] transition-colors font-medium">
                    ${faq.question}
                  </span>
                </div>
                <span class="ml-4 p-1.5 rounded-sm border border-white/10 text-[#c5a059] transition-transform duration-300 group-open:rotate-180">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <div class="px-6 pb-7 sm:px-7 sm:pb-8 pt-0 text-sm text-[#dcd6ca] font-light leading-relaxed border-t border-white/[0.04]">
                <p class="pt-4">${faq.answer}</p>
              </div>
            </details>
          `
            )
            .join('')}
        </div>

        <div class="mt-12 text-center pt-4" data-reveal="fade-up">
          <p class="text-xs sm:text-sm text-[#a69f91] font-light">
            Have a custom requirement or institutional mandate?
            <a href="/concierge" class="text-[#c5a059] hover:underline underline-offset-4 ml-1 font-medium">
              Consult with our concierge desk directly →
            </a>
          </p>
        </div>
      </div>
    </section>

    <!-- 7. "PRIORITY INTAKE" (RE-ARCHITECTED PRIVATE CLIENT INTAKE TERMINAL) -->
    <section id="concierge-desk" data-reveal-section class="py-28 sm:py-36 bg-[#060709] text-[#faf8f5] relative overflow-hidden">
      <div class="absolute inset-0 bg-radial-luxury pointer-events-none opacity-40"></div>
      
      <div class="max-w-7xl xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <!-- Section Header -->
        <div class="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4" data-reveal="fade-up">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#c5a059]/10 border border-[#c5a059]/30 text-xs">
            <span class="text-[#c5a059] font-mono uppercase tracking-[0.25em] text-[10px] font-semibold">Direct Executive Access · Millennium Tower SF</span>
          </div>
          <h2 class="text-4xl sm:text-6xl font-serif text-[#faf8f5] leading-tight">
            Priority Intake Desk
          </h2>
          <p class="text-sm sm:text-base text-[#dcd6ca] leading-relaxed font-light">
            Whether orchestrating a single urgent engagement or initiating an enterprise collective retainer, our concierge liaison routes your mandate directly to leadership.
          </p>
        </div>

        <!-- Dual Column Intake Terminal -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <!-- Left Column: Diplomatic Desk & Institutional Credentials -->
          <div class="lg:col-span-5 space-y-6" data-reveal="slide-left">
            <div class="p-8 sm:p-10 rounded-sm bg-[#0b0e13] border border-white/[0.08] space-y-6">
              <div>
                <span class="text-[10px] font-mono uppercase tracking-[0.25em] text-[#c5a059]">Direct Electronic Mail</span>
                <a href="mailto:concierge@blacklabel.life" class="block text-2xl sm:text-3xl font-serif text-[#faf8f5] hover:text-[#c5a059] transition-colors mt-1 underline underline-offset-8 decoration-[#c5a059]/40">
                  concierge@blacklabel.life
                </a>
                <p class="text-xs text-[#a69f91] font-mono mt-1">Direct Liaison Window Monitored 24/7</p>
              </div>

              <div class="space-y-4 pt-4 border-t border-white/[0.08]">
                <div class="flex items-start gap-3">
                  <span class="text-[#c5a059] text-base">✦</span>
                  <div>
                    <p class="text-xs uppercase tracking-widest text-[#faf8f5] font-semibold">Millennium Tower Concierge Suite</p>
                    <p class="text-xs text-[#a69f91] font-light">301 Mission St, SoMa, San Francisco, CA</p>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <span class="text-[#c5a059] text-base">✦</span>
                  <div>
                    <p class="text-xs uppercase tracking-widest text-[#faf8f5] font-semibold">&lt; 2 Hour Executive Response SLA</p>
                    <p class="text-xs text-[#a69f91] font-light">Direct response guaranteed for all principal inquiries</p>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <span class="text-[#c5a059] text-base">✦</span>
                  <div>
                    <p class="text-xs uppercase tracking-widest text-[#faf8f5] font-semibold">Institutional Non-Disclosure</p>
                    <p class="text-xs text-[#a69f91] font-light">Audited privacy & NDA protocols standard</p>
                  </div>
                </div>
              </div>

              <div class="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                <span class="text-[10px] font-mono uppercase tracking-wider text-[#a69f91]">Status</span>
                <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Liaison Available Now
                </span>
              </div>
            </div>

            <!-- Alternative Action Card -->
            <div class="p-6 rounded-sm bg-[#060709] border border-[#c5a059]/30 text-center space-y-3">
              <p class="text-xs text-[#dcd6ca] font-light">
                Prefer our multi-step interactive concierge terminal with detailed budget and schedule selectors?
              </p>
              <a href="/concierge" class="inline-flex items-center justify-center w-full py-3 px-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#060709] bg-[#c5a059] hover:bg-[#dfc182] transition-colors rounded-sm shadow-sm">
                Launch Full Concierge Desk →
              </a>
            </div>
          </div>

          <!-- Right Column: Priority Intake Dispatch Terminal Form -->
          <div class="lg:col-span-7 p-8 sm:p-10 rounded-sm bg-[#0b0e13] border border-[#c5a059]/40 shadow-2xl relative" data-reveal="slide-right">
            <div class="mb-6 pb-4 border-b border-white/10 flex items-center justify-between">
              <div>
                <h3 class="text-xl sm:text-2xl font-serif text-[#faf8f5] font-medium">Priority Dispatch Terminal</h3>
                <p class="text-xs text-[#a69f91] mt-0.5">Direct encrypted routing to executive team</p>
              </div>
              <span class="px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-[#c5a059] bg-[#c5a059]/15 border border-[#c5a059]/30 rounded-sm">
                Priority Tier
              </span>
            </div>

            <form id="priority-intake-form" class="space-y-5">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label for="priority-name" class="block text-xs uppercase tracking-wider text-[#dcd6ca] font-mono mb-2">
                    Principal or Office Name *
                  </label>
                  <input type="text" id="priority-name" required placeholder="e.g., Alexander Vance" class="w-full px-4 py-3 bg-[#060709] border border-white/10 focus:border-[#c5a059] rounded-sm text-sm text-[#faf8f5] placeholder-[#a69f91]/50 focus-visible:outline-none transition-colors" />
                </div>
                <div>
                  <label for="priority-email" class="block text-xs uppercase tracking-wider text-[#dcd6ca] font-mono mb-2">
                    Corporate Email or Line *
                  </label>
                  <input type="email" id="priority-email" required placeholder="name@domain.com" class="w-full px-4 py-3 bg-[#060709] border border-white/10 focus:border-[#c5a059] rounded-sm text-sm text-[#faf8f5] placeholder-[#a69f91]/50 focus-visible:outline-none transition-colors" />
                </div>
              </div>

              <div>
                <label for="priority-division" class="block text-xs uppercase tracking-wider text-[#dcd6ca] font-mono mb-2">
                  Primary Division of Interest *
                </label>
                <select id="priority-division" required class="w-full px-4 py-3 bg-[#060709] border border-white/10 focus:border-[#c5a059] rounded-sm text-sm text-[#faf8f5] focus-visible:outline-none transition-colors">
                  <option value="Holistic Collective Retainer">All 8 Divisions — Holistic Collective Retainer</option>
                  <option value="Social Media Scaling">01 · Social Media Scaling & Authority</option>
                  <option value="In-Residence Dining">02 · In-Residence Dining & Sommelier Dinners</option>
                  <option value="AI Trading & Vaulting">03 · AI Trading Strategy & Physical Vaulting</option>
                  <option value="Housekeeping & Butler">04 · Housekeeping & Estate Butler Management</option>
                  <option value="Interior Staging">05 · Architectural Design & Interior Staging</option>
                  <option value="Business Services">06 · Corporate Back Office (Accounting & Tax)</option>
                  <option value="SoMa Investments">07 · SoMa Real Estate Fund & Leases</option>
                  <option value="Exotic Cars & Luxury">08 · Exotic Vehicles, Aircraft & Haute Horlogerie</option>
                </select>
              </div>

              <div>
                <label for="priority-notes" class="block text-xs uppercase tracking-wider text-[#dcd6ca] font-mono mb-2">
                  Executive Mandate & Timing *
                </label>
                <textarea id="priority-notes" rows="4" required placeholder="Detail your immediate objectives, timeline, or residential requirements..." class="w-full px-4 py-3 bg-[#060709] border border-white/10 focus:border-[#c5a059] rounded-sm text-sm text-[#faf8f5] placeholder-[#a69f91]/50 focus-visible:outline-none transition-colors resize-none"></textarea>
              </div>

              <div class="pt-2">
                <button type="submit" id="priority-submit-btn" class="w-full py-4 px-6 text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-[#060709] bg-[#c5a059] hover:bg-[#dfc182] transition-all duration-300 rounded-sm shadow-[0_0_20px_rgba(197,160,89,0.3)] hover:shadow-[0_0_25px_rgba(197,160,89,0.5)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a059]">
                  Submit Priority Intake Mandate →
                </button>
              </div>

              <!-- Success Notification Banner -->
              <div id="priority-form-success" class="hidden p-4 rounded bg-[#c5a059]/10 border border-[#c5a059]/40 text-center space-y-1">
                <p class="text-sm font-serif text-[#faf8f5] font-medium">Priority Dispatch Prepared</p>
                <p class="text-xs text-[#dcd6ca]/80">Your email client has opened with your pre-formatted mandate. Our concierge liaison will respond within two hours.</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </main>

  ${renderSharedFooter()}
</body>
</html>`;
}

/**
 * ============================================================================
 * 2. DIVISION PAGE COMPILER (generateDivisionPage)
 * ============================================================================
 * Owner & Developer Guide:
 * Generates the dedicated landing page for any of the eight operating divisions
 * (/social, /entertainment, /trading, /lifestyle, /design, /business-services,
 * /investments, /luxury).
 * 
 * CORE SECTIONS:
 * - Division Hero: High-res WebP photography, division badge, headline, and SLA promise.
 * - Standards Matrix: 4 sovereign metrics (Discretion, Network, Cadence, Standard).
 * - Core Service Pillars: 4 detailed operational pillars with deliverables & protocols.
 * - Execution Methodology: 3-phase chronological sequence (Phase 01, 02, 03).
 * - Client FAQ Accordion: Frequently asked questions for this division.
 * - Related Divisions: Cross-navigation to complementary service offerings.
 * ============================================================================
 */
function generateDivisionPage(div: DivisionPageConfig): string {
  // Map division to bespoke high-end photo asset
  const divisionImages: Record<string, string> = {
    social: '/assets/images/social.jpg',
    entertainment: '/assets/images/dining.jpg',
    trading: '/assets/images/trading.jpg',
    lifestyle: '/assets/images/lifestyle.jpg',
    design: '/assets/images/interior.jpg',
    'business-services': '/assets/images/business.jpg',
    investments: '/assets/images/penthouse.jpg',
    luxury: '/assets/images/luxury.jpg',
  };

  const heroImage = divisionImages[div.slug] || '/assets/images/penthouse.jpg';

  const standardsBlocks = div.standards
    .map(
      (std, idx) => `
      <div class="relative p-6 sm:p-7 bg-[#0b0e13]/90 border border-white/[0.09] hover:border-[#c5a059]/60 transition-all duration-300 rounded-sm flex flex-col justify-between group shadow-xl hover:-translate-y-0.5" data-reveal>
        <!-- Subtle Top Corner Accent Reticle -->
        <div class="absolute top-2 right-2 w-2 h-2 border-t border-r border-[#c5a059]/40 pointer-events-none group-hover:border-[#c5a059] transition-colors"></div>

        <div>
          <!-- Top Row: Eyebrow Label & Index -->
          <div class="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-white/[0.06]">
            <span class="text-[10px] font-mono tracking-[0.22em] text-[#c5a059] font-medium uppercase truncate">
              ${std.label}
            </span>
            <span class="text-[10px] font-mono text-[#a69f91]/60 shrink-0">
              0${idx + 1}
            </span>
          </div>

          <!-- Value / Benchmark Name -->
          <h3 class="text-xl sm:text-2xl font-serif text-[#faf8f5] group-hover:text-[#c5a059] transition-colors font-light leading-snug tracking-wide mb-2.5">
            ${std.value}
          </h3>

          <!-- Accent Line -->
          <div class="w-6 h-[1px] bg-[#c5a059]/40 group-hover:w-12 group-hover:bg-[#c5a059] transition-all duration-300 mb-3"></div>

          <!-- Description -->
          <p class="text-xs sm:text-[13px] text-[#dcd6ca]/80 font-light leading-relaxed">
            ${std.desc}
          </p>
        </div>

        <!-- Bottom Spec Footnote -->
        <div class="mt-5 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[9px] font-mono text-[#a69f91]/70 uppercase tracking-widest">
          <span>COVENANT SPEC</span>
        </div>
      </div>
    `
    )
    .join('');

  const serviceBlocks = div.services
    .map(
      (srv, index) => `
      <article class="p-8 sm:p-10 lg:p-12 bg-[#0b0e13]/90 backdrop-blur-md border border-white/[0.1] hover:border-[#c5a059]/70 rounded-sm space-y-6 luxury-card-hover relative flex flex-col justify-between group shadow-2xl" data-reveal>
        <!-- Architectural Corner Reticles -->
        <div class="absolute top-2.5 left-2.5 w-2.5 h-2.5 border-t border-l border-[#c5a059]/40 pointer-events-none group-hover:border-[#c5a059] transition-colors"></div>
        <div class="absolute top-2.5 right-2.5 w-2.5 h-2.5 border-t border-r border-[#c5a059]/40 pointer-events-none group-hover:border-[#c5a059] transition-colors"></div>

        <div class="space-y-5">
          <!-- Top Row: Serif Number & Badge -->
          <div class="flex items-center justify-between border-b border-white/[0.08] pb-4">
            <span class="text-2xl sm:text-3xl font-serif font-light text-[#c5a059]">0${index + 1}</span>
            <span class="px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-[#c5a059] bg-[#c5a059]/10 border border-[#c5a059]/30 rounded-sm">
              ${srv.badge}
            </span>
          </div>

          <!-- Title -->
          <h3 class="text-2xl sm:text-3xl font-serif text-[#faf8f5] group-hover:text-[#c5a059] transition-colors font-medium">
            ${srv.title}
          </h3>

          <!-- Description -->
          <p class="text-sm sm:text-base text-[#dcd6ca]/90 leading-relaxed font-light">
            ${srv.description}
          </p>

          <!-- Deliverables Checklist -->
          <div class="pt-4 border-t border-white/[0.06] space-y-3">
            <span class="text-[10px] font-mono uppercase tracking-[0.22em] text-[#a69f91] block">
              Principles & Expressions of the Standard
            </span>
            <ul class="space-y-2.5">
              ${srv.deliverables
                .map(
                  (del) => `
                <li class="flex items-start gap-3 text-xs sm:text-sm text-[#faf8f5]/90 font-light">
                  <span class="text-[#c5a059] text-xs mt-0.5 select-none shrink-0">◆</span>
                  <span>${del}</span>
                </li>
              `
                )
                .join('')}
            </ul>
          </div>
        </div>

        <!-- Card Footer -->
        <div class="pt-6 mt-6 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono">
          <span class="text-[#a69f91] uppercase tracking-wider text-[10px] sm:text-[11px]">${srv.spec}</span>
          <a href="/concierge" class="text-[#c5a059] group-hover:text-[#dfc182] transition-colors inline-flex items-center gap-1.5 uppercase tracking-widest text-[11px] font-semibold">
            Explore Inquiry <span aria-hidden="true" class="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>
      </article>
    `
    )
    .join('');

  const stepsHtml = div.steps
    .map(
      (st) => `
      <div class="p-8 sm:p-10 lg:p-12 bg-[#0b0e13]/90 backdrop-blur-md border border-white/[0.1] hover:border-[#c5a059]/70 rounded-sm space-y-6 luxury-card-hover group relative flex flex-col justify-between shadow-2xl" data-reveal>
        <!-- Corner Reticles -->
        <div class="absolute top-2.5 left-2.5 w-2.5 h-2.5 border-t border-l border-[#c5a059]/40 pointer-events-none group-hover:border-[#c5a059] transition-colors"></div>
        <div class="absolute top-2.5 right-2.5 w-2.5 h-2.5 border-t border-r border-[#c5a059]/40 pointer-events-none group-hover:border-[#c5a059] transition-colors"></div>

        <div class="space-y-5">
          <!-- Step Top Header with Circular Jewel Badge -->
          <div class="flex items-center justify-between">
            <div class="w-14 h-14 rounded-full bg-[#060709] border-2 border-[#c5a059] flex items-center justify-center font-serif text-xl text-[#c5a059] shadow-[0_0_20px_rgba(197,160,89,0.3)] group-hover:scale-110 group-hover:border-[#ebd4a2] group-hover:text-[#ebd4a2] group-hover:shadow-[0_0_25px_rgba(197,160,89,0.5)] transition-all duration-300">
              ${st.num}
            </div>
            <span class="px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-[#a69f91] bg-white/[0.04] border border-white/[0.08] rounded-sm group-hover:text-[#c5a059] group-hover:border-[#c5a059]/40 transition-colors">
              ${st.phase}
            </span>
          </div>

          <!-- Step Title -->
          <h3 class="text-xl sm:text-2xl font-serif text-[#faf8f5] group-hover:text-[#c5a059] transition-colors font-medium pt-1">
            ${st.title}
          </h3>

          <!-- Step Description -->
          <p class="text-sm sm:text-[15px] text-[#dcd6ca]/90 leading-relaxed font-light">
            ${st.desc}
          </p>
        </div>

        <!-- Milestone & Timeframe Box -->
        <div class="pt-5 border-t border-white/[0.08] space-y-2 bg-[#060709]/60 -mx-8 sm:-mx-10 lg:-mx-12 -mb-8 sm:-mb-10 lg:-mb-12 p-6 rounded-b-sm">
          <div class="flex items-center justify-between text-xs font-mono">
            <span class="text-[#a69f91]">THE DISCIPLINE:</span>
            <span class="text-[#faf8f5] font-medium">${st.timeframe}</span>
          </div>
          <div class="flex items-center justify-between text-xs font-mono">
            <span class="text-[#a69f91]">SOVEREIGN PERSPECTIVE:</span>
            <span class="text-[#c5a059] font-medium text-right">${st.milestone}</span>
          </div>
        </div>
      </div>
    `
    )
    .join('');

  const faqAccordionHtml = div.faqs
    .map(
      (f) => `
      <details class="group py-6 sm:py-7 transition-all focus-within:border-[#c5a059]" data-reveal>
        <summary class="flex items-center justify-between cursor-pointer font-serif text-lg sm:text-xl text-[#faf8f5] group-hover:text-[#c5a059] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a059] rounded-sm py-1">
          <span class="pr-4">${f.question}</span>
          <span class="faq-icon shrink-0 text-xs font-mono text-[#c5a059] border border-[#c5a059]/40 w-7 h-7 flex items-center justify-center rounded-full group-hover:border-[#c5a059] group-hover:scale-110 transition-all">+</span>
        </summary>
        <p class="mt-4 text-sm sm:text-base text-[#dcd6ca]/85 leading-relaxed font-light max-w-3xl pl-1">
          ${f.answer}
        </p>
      </details>
    `
    )
    .join('');

  const relatedHtml = div.related
    .map(
      (rel) => `
      <a href="${rel.href}" class="p-8 bg-[#0b0e13]/80 border border-[#c5a059]/25 hover:border-[#c5a059]/75 rounded-sm group transition-all luxury-card-hover flex flex-col justify-between space-y-4 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a059] shadow-lg" data-reveal>
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-xs font-mono text-[#c5a059] uppercase tracking-widest">${rel.label.slice(0, 2)}</span>
            <span class="text-xs text-[#c5a059] font-mono group-hover:translate-x-1 transition-transform">Explore →</span>
          </div>
          <h3 class="text-xl font-serif text-[#faf8f5] group-hover:text-[#c5a059] transition-colors font-medium">
            ${rel.label}
          </h3>
          <p class="text-xs sm:text-sm text-[#dcd6ca]/80 font-light leading-relaxed">${rel.desc}</p>
        </div>
      </a>
    `
    )
    .join('');

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: div.divisionName,
      serviceType: div.services.map((s) => s.title).join(', '),
      provider: {
        '@type': 'Organization',
        name: 'Black Label Lifestyle',
        url: 'https://blacklabel.life',
      },
      areaServed: {
        '@type': 'Place',
        name: 'San Francisco, Millennium Tower',
      },
      description: div.intro,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://blacklabel.life/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: div.divisionName,
          item: `https://blacklabel.life/${div.slug}`,
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: div.faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.answer,
        },
      })),
    },
  ];

  return `<!doctype html>
<html lang="en" class="scroll-smooth">
<head>
  ${renderHeadTags({
    title: div.pageTitle,
    description: div.metaDesc,
    canonicalUrl: `https://blacklabel.life/${div.slug}`,
    jsonLd: jsonLd,
    preloadImage: {
      href: heroImage.replace('.jpg', '.webp'),
      mobileHref: heroImage.replace('.jpg', '-mobile.webp'),
    },
  })}
</head>
<body class="bg-[#060709] text-[#e6e0d4]">
  ${renderSharedHeader(`/${div.slug}`)}

  <main id="main-content">
    <!-- DIVISION CINEMATIC HERO -->
    <section class="relative pt-32 pb-20 sm:pb-28 border-b border-white/[0.08] overflow-hidden">
      <!-- Background Luxury Visual Asset -->
      <div class="absolute inset-0 pointer-events-none">
        <picture>
          <source media="(max-width: 768px)" srcset="${heroImage.replace('.jpg', '-mobile.webp')}" type="image/webp" />
          <source srcset="${heroImage.replace('.jpg', '.webp')}" type="image/webp" />
          <img src="${heroImage}" alt="${div.divisionName} backdrop" width="1920" height="1080" fetchpriority="high" loading="eager" decoding="async" class="w-full h-full object-cover filter brightness-[0.25] contrast-110 scale-105" />
        </picture>
        <div class="absolute inset-0 bg-gradient-to-t from-[#060709] via-[#060709]/80 to-[#060709]/60"></div>
        <div class="absolute inset-0 bg-radial-hero"></div>
      </div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div class="lg:col-span-7 space-y-6">
            <!-- Division Breadcrumb & Number -->
            <div class="flex items-center gap-2.5 animate-inner-hero-tag">
              <span class="px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-[#faf8f5] bg-[#060709]/80 backdrop-blur-md border border-[#c5a059]/40 rounded-sm">
                ${div.num} DIVISION
              </span>
              <span class="text-xs text-white/30">/</span>
              <span class="text-xs uppercase tracking-[0.2em] font-mono text-[#a69f91]">MILLENNIUM TOWER ORIGIN</span>
            </div>

            <!-- H1 -->
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#faf8f5] leading-[1.12] font-light animate-inner-hero-title">
              ${div.h1}
            </h1>

            <!-- Intro -->
            <p class="text-base sm:text-lg text-[#dcd6ca]/90 leading-relaxed font-light max-w-2xl animate-inner-hero-desc">
              ${div.intro}
            </p>

            <div class="pt-3 flex flex-wrap items-center gap-4 animate-inner-hero-cta">
              <a href="/concierge" class="inline-flex items-center justify-center px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#060709] bg-[#c5a059] hover:bg-[#dfc182] transition-colors rounded-sm shadow-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a059]">
                Direct Correspondence
              </a>
              <a href="#services" class="text-xs uppercase tracking-[0.18em] text-[#dcd6ca] hover:text-[#c5a059] px-5 py-3.5 border border-white/20 hover:border-[#c5a059]/60 rounded-sm transition-colors">
                Expressions of Principle ↓
              </a>
            </div>
          </div>

          <!-- Custom Division Artwork & Visual Seal with Luxury Micro-Animations and 3D Tilt -->
          <div class="lg:col-span-5 flex justify-center animate-inner-hero-graphic">
            <div data-luxury-card-tilt class="w-full max-w-md aspect-[4/3] p-5 bg-[#0b0e13]/90 backdrop-blur-xl border border-[#c5a059]/35 rounded-sm relative flex items-center justify-center overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.85)] group transition-all duration-300">
              <!-- Champagne radial ambient glow -->
              <div class="absolute inset-0 bg-radial-glow-champagne pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity duration-700"></div>

              <!-- Top Architectural Spec Header -->
              <div class="absolute top-2.5 left-4 right-4 flex items-center justify-between text-[9px] font-mono uppercase tracking-[0.22em] text-[#c5a059] border-b border-white/[0.08] pb-1.5 z-10">
                <span class="flex items-center gap-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span class="text-[#faf8f5]/80">SAN FRANCISCO</span>
                </span>
                <span class="text-[#c5a059]/90 font-light">${div.num} · SOVEREIGN SPEC</span>
              </div>

              <!-- Corner Architectural Reticles -->
              <div class="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-[#c5a059]/70 pointer-events-none"></div>
              <div class="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-[#c5a059]/70 pointer-events-none"></div>
              <div class="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-[#c5a059]/70 pointer-events-none"></div>
              <div class="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-[#c5a059]/70 pointer-events-none"></div>

              <!-- Animated Vector Artwork -->
              <div class="w-full h-full p-2 pt-6 pb-6 flex items-center justify-center relative z-10 transition-transform duration-500 group-hover:scale-[1.03]">
                ${DIVISION_SVGS[div.svgKey] || ''}
              </div>

              <!-- Bottom Status Bar -->
              <div class="absolute bottom-2.5 left-4 right-4 flex items-center justify-between text-[9px] font-mono text-[#c5a059]/80 uppercase tracking-widest border-t border-white/[0.08] pt-1.5 z-10">
                <span class="flex items-center gap-1">
                  <span class="text-white/40">ORIGIN:</span>
                  <span class="text-[#faf8f5]/80">MILLENNIUM TOWER</span>
                </span>
                <span class="text-[#c5a059] group-hover:text-[#ebd4a2] transition-colors">AUTHENTIC SPEC</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- OPERATIONAL STANDARDS BENCHMARK STRIP -->
    <section class="py-14 sm:py-20 bg-[#060709] border-b border-white/[0.08] relative z-10 overflow-hidden">
      <!-- Subtle Ambient Glow -->
      <div class="absolute inset-0 bg-radial-luxury pointer-events-none opacity-25"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <!-- Section Header -->
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12 pb-5 border-b border-white/[0.08]" data-reveal>
          <div class="space-y-1.5">
            <span class="text-[10px] font-mono uppercase tracking-[0.25em] text-[#c5a059] font-medium block">
              DIVISION ${div.num} · OPERATIONAL BENCHMARKS
            </span>
            <h2 class="text-2xl sm:text-3xl font-serif text-[#faf8f5] font-light">
              Sovereign Standards & Covenants
            </h2>
          </div>
          <div class="text-xs font-mono text-[#a69f91] flex items-center gap-2">
            <span>RESIDENCY: MILLENNIUM TOWER</span>
            <span class="text-white/20" aria-hidden="true">·</span>
            <span class="text-[#c5a059]">100% INSTITUTIONAL COMPLIANCE</span>
          </div>
        </div>

        <!-- 4-Column Benchmark Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          ${standardsBlocks}
        </div>
      </div>
    </section>

    <!-- DIVISION SERVICES SECTION -->
    <section id="services" class="py-24 sm:py-32 bg-[#090b0e] text-[#faf8f5] border-b border-white/[0.08] relative overflow-hidden">
      <div class="absolute inset-0 bg-radial-luxury pointer-events-none opacity-40"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center max-w-3xl mx-auto mb-20 space-y-4" data-reveal>
          <div class="inline-flex items-center gap-2 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.25em] text-[#c5a059] bg-[#c5a059]/10 border border-[#c5a059]/30 rounded-sm">
            <span>DIVISION ${div.num}</span>
            <span>·</span>
            <span>EXPRESSIONS OF THE PRINCIPLE</span>
          </div>
          <h2 class="text-3xl sm:text-5xl lg:text-6xl font-serif text-[#faf8f5] font-light leading-tight">
            Expressions of the Standard
          </h2>
          <p class="text-base sm:text-lg text-[#dcd6ca]/90 font-light leading-relaxed">
            Four deliberate inquiries into quiet excellence, discernment, and sovereign presence within the Black Label framework.
          </p>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
          ${serviceBlocks}
        </div>
      </div>
    </section>

    <!-- 3-STEP "THE UNFOLDING OF ORDER" PROGRESSIVE TIMELINE -->
    <section id="how-it-works" class="py-24 sm:py-32 bg-[#060709] text-[#faf8f5] border-b border-white/[0.08] relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center max-w-3xl mx-auto mb-20 space-y-4" data-reveal>
          <div class="inline-flex items-center gap-2 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.25em] text-[#c5a059] bg-[#c5a059]/10 border border-[#c5a059]/30 rounded-sm">
            <span>THE ARCHITECTURE OF PRACTICE</span>
            <span>·</span>
            <span>UNCOMPROMISING RIGOR</span>
          </div>
          <h2 class="text-3xl sm:text-5xl lg:text-6xl font-serif text-[#faf8f5] font-light leading-tight">
            The Unfolding of Order
          </h2>
          <p class="text-base sm:text-lg text-[#dcd6ca]/90 font-light leading-relaxed">
            A disciplined path of discernment, reduction, and enduring quietude—designed to protect human focus and preserve sovereignty.
          </p>
        </div>

        <div class="relative">
          <!-- Desktop Connecting Progress Track -->
          <div class="hidden md:block absolute top-[50px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-[#c5a059]/20 via-[#c5a059]/70 to-[#c5a059]/20 z-0 pointer-events-none"></div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 relative z-10">
            ${stepsHtml}
          </div>
        </div>

        <!-- Sanctuary Reassurance Strip -->
        <div class="mt-16 p-6 sm:p-8 bg-[#0b0e13]/90 border border-white/[0.1] rounded-sm flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl" data-reveal>
          <div class="flex items-center gap-4 text-center sm:text-left">
            <span class="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
            <div>
              <p class="text-sm sm:text-base font-serif text-[#faf8f5]">Millennium Tower Sanctuary</p>
              <p class="text-xs sm:text-sm text-[#a69f91] font-light">Direct physical anchoring in 301 Mission St, preserving absolute confidentiality and sovereign perspective.</p>
            </div>
          </div>
          <a href="/concierge" class="shrink-0 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#060709] bg-[#c5a059] hover:bg-[#dfc182] transition-colors rounded-sm shadow-md whitespace-nowrap">
            Begin Inquiry →
          </a>
        </div>
      </div>
    </section>

    <!-- FAQS ACCORDION -->
    <section id="faqs" class="py-24 sm:py-32 bg-[#090b0e] text-[#faf8f5] border-b border-white/[0.08]">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-20 space-y-4" data-reveal>
          <div class="inline-flex items-center gap-2 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.25em] text-[#c5a059] bg-[#c5a059]/10 border border-[#c5a059]/30 rounded-sm">
            <span>PHILOSOPHICAL DIALOGUE</span>
          </div>
          <h2 class="text-3xl sm:text-5xl font-serif text-[#faf8f5] font-light">Inquiries & Answers</h2>
          <p class="text-base sm:text-lg text-[#dcd6ca]/90 font-light leading-relaxed">
            Essential inquiries into silence, discretion, architectural order, and the preservation of sovereign living for ${div.divisionName}.
          </p>
        </div>
        <div class="divide-y divide-white/[0.1] bg-[#0b0e13]/60 border border-white/[0.08] rounded-sm p-6 sm:p-10 lg:p-12 shadow-2xl">
          ${faqAccordionHtml}
        </div>
      </div>
    </section>

    <!-- CONCIERGE CTA BAND -->
    <section class="py-24 sm:py-32 bg-[#060709] text-[#faf8f5] border-b border-white/[0.08] relative overflow-hidden">
      <div class="absolute inset-0 bg-radial-hero pointer-events-none opacity-50"></div>
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10" data-reveal>
        <div class="inline-flex items-center gap-2.5 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.25em] text-[#c5a059] bg-[#c5a059]/10 border border-[#c5a059]/30 rounded-sm">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>A SANCTUARY FOR DIALOGUE</span>
        </div>
        <h2 class="text-3xl sm:text-5xl lg:text-6xl font-serif text-[#faf8f5] font-light leading-tight max-w-4xl mx-auto">
          A Sanctuary for Sovereign Dialogue
        </h2>
        <p class="text-base sm:text-lg text-[#dcd6ca]/90 max-w-2xl mx-auto font-light leading-relaxed">
          We do not broadcast or solicit. We maintain direct, discreet correspondence for those who seek depth, architectural stillness, and sovereign living.
        </p>

        <div class="pt-4 flex flex-col sm:flex-row items-center justify-center gap-5">
          <a href="/concierge" class="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#060709] bg-[#c5a059] hover:bg-[#dfc182] transition-colors rounded-sm shadow-[0_0_25px_rgba(197,160,89,0.3)] hover:shadow-[0_0_35px_rgba(197,160,89,0.5)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a059]">
            Direct Correspondence
          </a>
          <a href="mailto:concierge@blacklabel.life" class="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-xs font-mono uppercase tracking-[0.18em] text-[#faf8f5] bg-[#0b0e13] hover:bg-[#12151c] border border-white/[0.15] hover:border-[#c5a059]/60 transition-colors rounded-sm">
            concierge@blacklabel.life
          </a>
        </div>

        <div class="pt-4 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-mono text-[#a69f91]">
          <span class="flex items-center gap-2">
            <span class="text-[#c5a059]">✦</span> Strict Confidentiality
          </span>
          <span class="flex items-center gap-2">
            <span class="text-[#c5a059]">✦</span> Millennium Tower Anchor
          </span>
          <span class="flex items-center gap-2">
            <span class="text-[#c5a059]">✦</span> Peer-to-Peer Resonance
          </span>
        </div>
      </div>
    </section>

    <!-- RELATED DIVISIONS -->
    <section class="py-24 sm:py-32 bg-[#090b0e] text-[#faf8f5]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4" data-reveal>
          <div>
            <span class="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-mono font-semibold">The Ecosystem</span>
            <h2 class="text-3xl sm:text-4xl font-serif text-[#faf8f5] mt-1">Related Black Label Divisions</h2>
          </div>
          <a href="/" class="text-xs uppercase tracking-[0.2em] text-[#c5a059] hover:text-[#dfc182] font-semibold transition-colors flex items-center gap-1.5">
            All 8 Brands <span aria-hidden="true">→</span>
          </a>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          ${relatedHtml}
        </div>
      </div>
    </section>
  </main>

  ${renderSharedFooter()}
</body>
</html>`;
}

/**
 * ============================================================================
 * 3. CONCIERGE DESK COMPILER (generateConciergePage)
 * ============================================================================
 * Owner & Developer Guide:
 * Generates the private client inquiry terminal (/concierge).
 * 
 * CORE SECTIONS:
 * - Concierge Hero: Millennium Tower twilight backdrop, concierge badge, SLA timer.
 * - Architectural Elevation Schemes: Interactive tabs representing Millennium Tower
 *   tiers (Penthouse Level 60, Private Residences Level 48, Club Level 10, Courtyard Level 1).
 * - Priority Intake Mandate Terminal: Direct dispatch form routing client
 *   requests to concierge@blacklabel.life with real-time encrypted reference code.
 * ============================================================================
 */
function generateConciergePage(): string {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Black Label Concierge Desk',
      url: 'https://blacklabel.life/concierge',
      description: 'Inquire with Black Label Lifestyle concierge in Millennium Tower, San Francisco.',
      mainEntity: {
        '@type': 'Organization',
        name: 'Black Label Lifestyle',
        email: 'concierge@blacklabel.life',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Millennium Tower, SoMa',
          addressLocality: 'San Francisco',
          addressRegion: 'CA',
          addressCountry: 'US',
        },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://blacklabel.life/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Concierge',
          item: 'https://blacklabel.life/concierge',
        },
      ],
    },
  ];

  return `<!doctype html>
<html lang="en" class="scroll-smooth">
<head>
  ${renderHeadTags({
    title: 'Black Label Concierge · The Sanctuary for Sovereign Dialogue',
    description: 'Direct liaison and quiet correspondence anchored at Millennium Tower, 301 Mission St, San Francisco. A sanctuary for sovereign dialogue and unhurried inquiry.',
    canonicalUrl: 'https://blacklabel.life/concierge',
    jsonLd: jsonLd,
    preloadImage: {
      href: '/assets/images/penthouse.webp',
      mobileHref: '/assets/images/penthouse-mobile.webp',
    },
  })}
</head>
<body class="bg-[#060709] text-[#e6e0d4]">
  ${renderSharedHeader('/concierge')}

  <main id="main-content">
    <!-- CONCIERGE HEADER -->
    <section class="relative pt-32 pb-20 sm:pb-28 border-b border-white/[0.08] overflow-hidden">
      <!-- Background Luxury Visual Asset -->
      <div class="absolute inset-0 pointer-events-none">
        <picture>
          <source media="(max-width: 768px)" srcset="/assets/images/penthouse-mobile.webp" type="image/webp" />
          <source srcset="/assets/images/penthouse.webp" type="image/webp" />
          <img src="/assets/images/penthouse.jpg" alt="Millennium Tower San Francisco" width="1920" height="1080" fetchpriority="high" loading="eager" decoding="async" class="w-full h-full object-cover filter brightness-[0.2] contrast-110" />
        </picture>
        <div class="absolute inset-0 bg-gradient-to-t from-[#060709] via-[#060709]/80 to-[#060709]/70"></div>
        <div class="absolute inset-0 bg-radial-hero"></div>
      </div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div class="lg:col-span-7 space-y-6">
            <div class="flex items-center gap-2.5 animate-inner-hero-tag">
              <span class="px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-[#faf8f5] bg-[#060709]/80 backdrop-blur-md border border-[#c5a059]/40 rounded-sm">
                CENTRAL SANCTUARY
              </span>
              <span class="text-xs text-white/30">/</span>
              <span class="text-xs uppercase tracking-[0.2em] font-mono text-[#a69f91]">SOVEREIGN DIALOGUE</span>
            </div>

            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#faf8f5] leading-[1.12] font-light animate-inner-hero-title">
              A Sanctuary for Sovereign Dialogue
            </h1>

            <p class="text-base sm:text-lg text-[#dcd6ca]/90 leading-relaxed font-light max-w-2xl animate-inner-hero-desc">
              One quiet point of contact for the eight dimensional inquiries of Black Label. Share your perspective or institutional mandate; our concierge liaison responds with discretion and thoughtful consideration.
            </p>

            <!-- Direct Electronic Intake & CTA -->
            <div class="pt-3 flex flex-wrap items-center gap-6 animate-inner-hero-cta">
              <div>
                <span class="block text-[10px] uppercase tracking-[0.25em] text-[#a69f91] mb-1 font-mono">Direct Electronic Intake</span>
                <a href="mailto:concierge@blacklabel.life" class="text-xl sm:text-2xl font-serif text-[#c5a059] hover:text-[#dfc182] transition-colors underline underline-offset-8 decoration-[#c5a059]/40">
                  concierge@blacklabel.life
                </a>
              </div>
              <a href="#inquiry-form" class="inline-flex items-center justify-center px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#060709] bg-[#c5a059] hover:bg-[#dfc182] transition-colors rounded-sm shadow-md">
                Complete Intake Form ↓
              </a>
            </div>
          </div>

          <!-- Concierge Astrolabe Seal Card -->
          <div class="lg:col-span-5 flex justify-center animate-inner-hero-graphic">
            <div data-luxury-card-tilt class="w-full max-w-md aspect-[4/3] p-5 bg-[#0b0e13]/90 backdrop-blur-xl border border-[#c5a059]/35 rounded-sm relative flex items-center justify-center overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.85)] group transition-all duration-300">
              <div class="absolute inset-0 bg-radial-glow-champagne pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity duration-700"></div>

              <!-- Top Architectural Spec Header -->
              <div class="absolute top-2.5 left-4 right-4 flex items-center justify-between text-[9px] font-mono uppercase tracking-[0.22em] text-[#c5a059] border-b border-white/[0.08] pb-1.5 z-10">
                <span class="flex items-center gap-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span class="text-[#faf8f5]/80">SAN FRANCISCO</span>
                </span>
                <span class="text-[#c5a059]/90 font-light">CENTRAL INTAKE DESK</span>
              </div>

              <!-- Corner Architectural Reticles -->
              <div class="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-[#c5a059]/70 pointer-events-none"></div>
              <div class="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-[#c5a059]/70 pointer-events-none"></div>
              <div class="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-[#c5a059]/70 pointer-events-none"></div>
              <div class="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-[#c5a059]/70 pointer-events-none"></div>

              <!-- Animated Vector Artwork -->
              <div class="w-full h-full p-2 pt-6 pb-6 flex items-center justify-center relative z-10 transition-transform duration-500 group-hover:scale-[1.03]">
                ${DIVISION_SVGS.concierge || ''}
              </div>

              <!-- Bottom Status Bar -->
              <div class="absolute bottom-2.5 left-4 right-4 flex items-center justify-between text-[9px] font-mono text-[#c5a059]/80 uppercase tracking-widest border-t border-white/[0.08] pt-1.5 z-10">
                <span class="flex items-center gap-1">
                  <span class="text-white/40">ORIGIN:</span>
                  <span class="text-[#faf8f5]/80">MILLENNIUM TOWER</span>
                </span>
                <span class="text-[#c5a059] group-hover:text-[#ebd4a2] transition-colors">DIRECT DESK</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- GOOGLE MAP WITH CONCIERGE CONTACT FORM SECTION (DARK LUXURY TERMINAL) -->
    <section id="inquiry-form" class="py-20 sm:py-28 bg-[#060709] border-t border-white/[0.08] text-[#faf8f5] relative overflow-hidden">
      <!-- Subtle Ambient Lighting -->
      <div class="absolute top-0 left-1/4 w-[600px] h-[300px] bg-[#c5a059]/[0.03] blur-[120px] pointer-events-none"></div>
      <div class="absolute bottom-0 right-1/4 w-[600px] h-[300px] bg-[#c5a059]/[0.02] blur-[120px] pointer-events-none"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <!-- SECTION EDITORIAL HEADER -->
        <div class="max-w-3xl mb-12 sm:mb-16 space-y-4" data-reveal="fade-up">
          <div class="flex flex-wrap items-center gap-2.5 text-xs font-mono tracking-[0.2em] text-[#c5a059] uppercase">
            <span>MILLENNIUM TOWER</span>
            <span class="text-white/30" aria-hidden="true">·</span>
            <span>301 MISSION STREET</span>
            <span class="text-white/30" aria-hidden="true">·</span>
            <span>SAN FRANCISCO HQ</span>
          </div>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#faf8f5] font-light leading-[1.15]">
            The Concierge Desk & Mandate Terminal
          </h2>
          <p class="text-sm sm:text-base text-[#dcd6ca]/85 font-light leading-relaxed">
            Direct your mandate to our executive liaisons, review private residential arrival protocols at Millennium Tower, or initiate immediate dispatch across all eight Black Label divisions.
          </p>

          <!-- Zero-Pill Unboxed Key Assurance Pillars -->
          <div class="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 border-t border-white/[0.08] mt-6 pt-6">
            <div>
              <span class="block text-[10px] font-mono uppercase tracking-[0.2em] text-[#a69f91]">RESPONSE SLA</span>
              <span class="text-sm font-serif text-[#c5a059] font-medium">&lt; 2 Hours Guaranteed</span>
            </div>
            <div>
              <span class="block text-[10px] font-mono uppercase tracking-[0.2em] text-[#a69f91]">VALET ARRIVAL</span>
              <span class="text-sm font-serif text-[#faf8f5] font-medium">Fremont St Porte-Cochère</span>
            </div>
            <div>
              <span class="block text-[10px] font-mono uppercase tracking-[0.2em] text-[#a69f91]">CONFIDENTIALITY</span>
              <span class="text-sm font-serif text-[#c5a059] font-medium">100% Institutional NDA</span>
            </div>
            <div>
              <span class="block text-[10px] font-mono uppercase tracking-[0.2em] text-[#a69f91]">JURISDICTION</span>
              <span class="text-sm font-serif text-[#faf8f5] font-medium">Global via SF Command</span>
            </div>
          </div>
        </div>

        <!-- MAIN DUAL-STAGE GRID -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          <!-- LEFT: MULTI-PERSPECTIVE LUXURY MAP & TOWER TERMINAL (7 COLS) -->
          <div class="lg:col-span-7 flex flex-col space-y-4" data-reveal="fade-up">
            <div class="bg-[#0b0e13] border border-[#c5a059]/40 rounded-sm overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.85)] relative">
              
              <!-- Card Corner Reticles -->
              <div class="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-[#c5a059]/70 pointer-events-none z-20"></div>
              <div class="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-[#c5a059]/70 pointer-events-none z-20"></div>
              <div class="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-[#c5a059]/70 pointer-events-none z-20"></div>
              <div class="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-[#c5a059]/70 pointer-events-none z-20"></div>

              <!-- Top Terminal Header -->
              <div class="p-3.5 sm:p-4 bg-[#090b0e] border-b border-white/[0.08] flex items-center justify-between gap-3 relative z-10">
                <div class="flex items-center gap-2.5">
                  <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span class="text-xs font-mono uppercase tracking-[0.18em] text-[#faf8f5] font-semibold">
                    Millennium Tower · Headquarters Terminal
                  </span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-[10px] font-mono uppercase tracking-wider text-[#c5a059] bg-[#c5a059]/10 px-2.5 py-1 rounded-sm border border-[#c5a059]/30">
                    301 Mission St · Level 48 HQ
                  </span>
                </div>
              </div>

              <!-- VIEW 1: GOOGLE MAP LIVE VIEW -->
              <div id="terminal-view-map" class="relative w-full">
                <!-- Map Top HUD Bar -->
                <div class="px-4 py-2 bg-[#060709]/95 backdrop-blur-md border-b border-white/[0.08] flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-[#dcd6ca]/80">
                  <div class="flex items-center gap-2">
                    <span class="text-[#c5a059] font-medium">37.7903° N, 122.3970° W</span>
                    <span class="text-white/20">|</span>
                    <span>Elev. 645 FT</span>
                    <span class="text-white/20">|</span>
                    <span class="text-emerald-400">Valet On-Site</span>
                  </div>
                  <button
                    type="button"
                    data-copy-address="301 Mission St, San Francisco, CA 94105"
                    class="hover:text-[#c5a059] transition-colors flex items-center gap-1 focus-visible:outline-none text-[10px] uppercase tracking-wider"
                    title="Copy Address to Clipboard"
                  >
                    <svg class="w-3 h-3 text-[#c5a059]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                    </svg>
                    <span id="copy-address-label">Copy Address</span>
                  </button>
                </div>

                <!-- Google Map Embed Container -->
                <div class="relative w-full h-[460px] sm:h-[500px] bg-[#060709] overflow-hidden">
                  <iframe
                    src="https://maps.google.com/maps?q=Millennium+Tower,+301+Mission+St,+San+Francisco,+CA+94105&t=&z=16&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style="border:0;"
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                    class="w-full h-full filter contrast-[1.08] brightness-[0.92]"
                    title="Google Map of Millennium Tower, 301 Mission St, San Francisco"
                  ></iframe>

                  <!-- Floating Architectural Pin Overlay -->
                  <div class="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs z-10 pointer-events-auto">
                    <div class="p-3 bg-[#060709]/95 backdrop-blur-xl border border-[#c5a059]/40 rounded-sm shadow-2xl">
                      <div class="text-[9px] font-mono uppercase tracking-[0.2em] text-[#c5a059] font-semibold mb-1">
                        Sovereign Anchor
                      </div>
                      <div class="text-sm font-serif text-[#faf8f5] font-medium leading-tight">
                        Millennium Tower · Level 48 HQ
                      </div>
                      <div class="text-[11px] text-[#dcd6ca]/80 mt-1">
                        Private Porte-Cochère valet on Fremont St. High-speed residential elevators with biometric clearance.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Map Specification & Directions Bar -->
              <div class="p-4 sm:p-5 bg-[#090b0e] border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                <div class="space-y-1">
                  <div class="text-[#faf8f5] font-serif text-sm font-medium">Millennium Tower · 301 Mission St, San Francisco, CA 94105</div>
                  <div class="text-[#a69f91] font-mono text-[11px]">Private Valet: Fremont St Porte-Cochère · SoMa Financial District</div>
                </div>

                <div class="flex items-center gap-2.5 shrink-0">
                  <a
                    href="https://maps.google.com/?q=Millennium+Tower,+301+Mission+St,+San+Francisco,+CA+94105"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="px-3.5 py-2 bg-[#c5a059] hover:bg-[#dfc182] text-[#060709] text-[11px] font-semibold uppercase tracking-wider rounded-sm transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a059]"
                  >
                    Google Maps ↗
                  </a>
                  <a
                    href="https://maps.apple.com/?q=Millennium+Tower,+301+Mission+St,+San+Francisco,+CA+94105"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="px-3.5 py-2 bg-white/[0.06] hover:bg-white/[0.12] text-[#faf8f5] border border-white/10 text-[11px] font-semibold uppercase tracking-wider rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a059]"
                  >
                    Apple Maps ↗
                  </a>
                </div>
              </div>

            </div>
          </div>

          <!-- RIGHT: SOVEREIGN MANDATE INTAKE TERMINAL (5 COLS) -->
          <div class="lg:col-span-5" data-reveal="fade-up">
            <div class="bg-[#0b0e13] border border-[#c5a059]/40 rounded-sm p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.85)] relative">
              
              <!-- Card Corner Reticles -->
              <div class="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-[#c5a059]/70 pointer-events-none"></div>
              <div class="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-[#c5a059]/70 pointer-events-none"></div>
              <div class="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-[#c5a059]/70 pointer-events-none"></div>
              <div class="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-[#c5a059]/70 pointer-events-none"></div>

              <!-- Terminal Heading -->
              <div class="mb-6 space-y-1.5 border-b border-white/[0.08] pb-5">
                <div class="flex items-center justify-between">
                  <span class="text-[10px] font-mono uppercase tracking-[0.25em] text-[#c5a059] font-semibold">
                    SOVEREIGN INTAKE TERMINAL
                  </span>
                  <span class="text-[9px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-sm">
                    LIVE DISPATCH
                  </span>
                </div>
                <h3 class="text-2xl sm:text-3xl font-serif text-[#faf8f5] font-medium">
                  Submit Private Mandate
                </h3>
                <p class="text-xs text-[#dcd6ca]/80 leading-relaxed font-light">
                  Single point of command for all eight luxury divisions. Direct response SLA: &lt; 2 hours.
                </p>
              </div>

              <!-- Success banner -->
              <div id="form-success-banner" class="hidden mb-6 p-5 bg-[#060709] text-[#faf8f5] border border-[#c5a059] rounded-sm shadow-xl space-y-3">
                <div class="flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                  <span class="text-sm font-serif text-[#c5a059] font-semibold">Mandate Transmission Prepared</span>
                </div>
                <div class="text-xs font-mono text-[#faf8f5] bg-white/[0.03] p-2.5 rounded border border-white/10">
                  <div class="text-[#a69f91] text-[10px]">SOVEREIGN REFERENCE TOKEN:</div>
                  <div id="success-token-ref" class="text-base text-[#c5a059] font-bold tracking-wider mt-0.5">BLL-SF-884219</div>
                </div>
                <p class="text-xs text-[#dcd6ca]/90 leading-relaxed font-light">
                  Your native email client has launched with encrypted mandate parameters addressed to <strong class="text-white">concierge@blacklabel.life</strong>. Our executive liaison will acknowledge receipt within 2 hours.
                </p>
                <div class="pt-2 flex items-center gap-2">
                  <a href="mailto:concierge@blacklabel.life" class="px-3 py-1.5 bg-[#c5a059] hover:bg-[#dfc182] text-[#060709] text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors">
                    Re-open Email Client
                  </a>
                  <button type="button" id="reset-mandate-form-btn" class="px-3 py-1.5 bg-white/[0.05] hover:bg-white/10 text-xs text-[#faf8f5] border border-white/10 rounded-sm transition-colors">
                    New Mandate
                  </button>
                </div>
              </div>

              <form id="concierge-inquiry-form" class="space-y-4 sm:space-y-5">
                
                <!-- STEP 1: DIVISION SELECTOR DROPDOWN -->
                <div>
                  <label for="form-division" class="block text-[11px] font-mono uppercase tracking-[0.18em] text-[#faf8f5] font-semibold mb-2">
                    1. Select Division or Scope <span class="text-[#c5a059]">*</span>
                  </label>
                  <div class="relative">
                    <select
                      id="form-division"
                      name="division"
                      required
                      class="w-full px-3.5 py-3 bg-[#060709] border border-white/10 text-[#faf8f5] text-xs sm:text-sm rounded-sm focus:outline-none focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059] appearance-none cursor-pointer pr-10"
                    >
                      <option value="General Concierge">General Concierge — Central Triage &amp; Route My Mandate</option>
                      <option value="01 Social">01 Social — Organic Authority &amp; Executive Reach</option>
                      <option value="02 Entertainment">02 Entertainment — Private Dining &amp; Bespoke Galas</option>
                      <option value="03 Trading">03 Trading — AI Collectibles &amp; Vaulting</option>
                      <option value="04 Lifestyle">04 Lifestyle — Style, Housekeeping &amp; Butler Service</option>
                      <option value="05 Design">05 Design — Architectural Staging &amp; Interiors</option>
                      <option value="06 Business Services">06 Business Services — Institutional Back Office &amp; Tax</option>
                      <option value="07 Investments">07 Investments — SoMa Trophy Real Estate</option>
                      <option value="08 Luxury">08 Luxury — Exotic Fleet &amp; Haute Horlogerie</option>
                      <option value="Executive Retainer">★ Sovereign Whole-Collective Retainer</option>
                    </select>
                    <!-- Custom Chevron -->
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#c5a059]">
                      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>

                <!-- STEP 2: CONTACT CREDENTIALS (Email & Phone) -->
                <div class="space-y-3 pt-1">
                  <div>
                    <label for="form-email" class="block text-[11px] font-mono uppercase tracking-[0.18em] text-[#faf8f5] font-semibold mb-1.5">
                      2. Confidential Email <span class="text-[#c5a059]">*</span>
                    </label>
                    <input
                      type="email"
                      id="form-email"
                      required
                      placeholder="e.g. liaison@domain.com"
                      class="w-full px-3.5 py-2.5 bg-[#060709] border border-white/10 text-[#faf8f5] text-sm rounded-sm focus:outline-none focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059] placeholder-[#a69f91]/40"
                    />
                  </div>

                  <div>
                    <label for="form-phone" class="block text-[11px] font-mono uppercase tracking-[0.18em] text-[#faf8f5] font-semibold mb-1.5">
                      Direct Phone / Signal <span class="text-[#a69f91] font-normal text-[10px]">(Optional)</span>
                    </label>
                    <input
                      type="tel"
                      id="form-phone"
                      placeholder="+1 (415) 890-4800"
                      class="w-full px-3.5 py-2.5 bg-[#060709] border border-white/10 text-[#faf8f5] text-sm rounded-sm focus:outline-none focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059] placeholder-[#a69f91]/40"
                    />
                  </div>
                </div>

                <!-- STEP 3: MANDATE OBJECTIVES & SCOPE -->
                <div>
                  <div class="flex items-center justify-between mb-1.5">
                    <label for="form-message" class="block text-[11px] font-mono uppercase tracking-[0.18em] text-[#faf8f5] font-semibold">
                      3. Mandate Objectives & Scope <span class="text-[#c5a059]">*</span>
                    </label>
                    <span class="text-[10px] font-mono text-[#a69f91]">STRICT NDA</span>
                  </div>
                  <textarea
                    id="form-message"
                    required
                    rows="4"
                    placeholder="Describe your objectives, timeline, or required division coordination..."
                    class="w-full px-3.5 py-2.5 bg-[#060709] border border-white/10 text-[#faf8f5] text-sm rounded-sm focus:outline-none focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059] placeholder-[#a69f91]/40 leading-relaxed font-light"
                  ></textarea>
                </div>

                <!-- TRANSMIT BUTTON -->
                <button
                  type="submit"
                  id="concierge-submit-btn"
                  class="w-full py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#060709] bg-[#c5a059] hover:bg-[#dfc182] transition-all rounded-sm shadow-[0_0_20px_rgba(197,160,89,0.3)] hover:shadow-[0_0_30px_rgba(197,160,89,0.5)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a059] relative overflow-hidden group cursor-pointer"
                >
                  <span class="relative z-10 flex items-center justify-center gap-2">
                    <span>Transmit Sovereign Mandate</span>
                    <span class="group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </button>
              </form>
            </div>
          </div>

        </div>

        <!-- THREE SUPPORTING EXECUTIVE INTELLIGENCE CARDS -->
        <div class="mt-14 sm:mt-18 pt-10 border-t border-white/[0.08] grid grid-cols-1 md:grid-cols-3 gap-6" data-reveal="fade-up">
          <div class="p-6 bg-[#0b0e13] border border-white/[0.08] rounded-sm space-y-2.5 hover:border-[#c5a059]/40 transition-colors">
            <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c5a059]">01. PRIVATE APPOINTMENTS</span>
            <h4 class="text-lg font-serif text-[#faf8f5]">Level 48 Executive Salon</h4>
            <p class="text-xs text-[#dcd6ca]/80 leading-relaxed font-light">
              Confidential in-person appointments hosted within our private chambers at Millennium Tower. Advance guest authorization and building security pass generated upon mandate confirmation.
            </p>
          </div>

          <div class="p-6 bg-[#0b0e13] border border-white/[0.08] rounded-sm space-y-2.5 hover:border-[#c5a059]/40 transition-colors">
            <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c5a059]">02. PORTE-COCHÈRE STAGING</span>
            <h4 class="text-lg font-serif text-[#faf8f5]">Fremont St White-Glove Valet</h4>
            <p class="text-xs text-[#dcd6ca]/80 leading-relaxed font-light">
              Private vehicle arrival with continuous valet security. Secure subterranean staging for high-performance exotics, armored executive transport, and chauffeured fleets.
            </p>
          </div>

          <div class="p-6 bg-[#0b0e13] border border-white/[0.08] rounded-sm space-y-2.5 hover:border-[#c5a059]/40 transition-colors">
            <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c5a059]">03. WHOLE-COLLECTIVE RETAINERS</span>
            <h4 class="text-lg font-serif text-[#faf8f5]">Institutional Family Office</h4>
            <p class="text-xs text-[#dcd6ca]/80 leading-relaxed font-light">
              Multi-division governance and lifestyle architecture for principals, family offices, and tech enterprise founders requiring unified executive command.
            </p>
          </div>
        </div>

      </div>
    </section>
  </main>

  ${renderSharedFooter()}
</body>
</html>`;
}

/**
 * ============================================================================
 * 4. CONTACT & HEADQUARTERS COMPILER (generateContactPage)
 * ============================================================================
 * Owner & Developer Guide:
 * Generates the physical anchor and headquarters page (/contact).
 * 
 * CORE SECTIONS:
 * - Interactive Luxury Dark Map: Leaflet + CartoDB Dark Matter map centered on
 *   Millennium Tower [37.7903, -122.3970] with custom champagne gold marker.
 *   Note: Leaflet JS and CSS are dynamically loaded on-demand exclusively on this page.
 * - Headquarters Dossier: 301 Mission St, SoMa, San Francisco arrival protocols,
 *   subterranean valet staging, and live 24/7 concierge coverage badge.
 * - Sovereign Mandate Dispatch: Client transmission form generating an
 *   encrypted mandate token and direct mailto link to concierge@blacklabel.life.
 * ============================================================================
 */
function generateContactPage(): string {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Black Label Lifestyle Contact & Headquarters',
      url: 'https://blacklabel.life/contact',
      description: 'Contact Black Label Lifestyle at Millennium Tower, San Francisco. Interactive headquarters map and sovereign concierge inquiry terminal.',
      mainEntity: {
        '@type': 'Organization',
        name: 'Black Label Lifestyle',
        email: 'concierge@blacklabel.life',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Millennium Tower, 301 Mission St',
          addressLocality: 'San Francisco',
          addressRegion: 'CA',
          postalCode: '94105',
          addressCountry: 'US',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 37.7903,
          longitude: -122.397,
        },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://blacklabel.life/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Contact',
          item: 'https://blacklabel.life/contact',
        },
      ],
    },
  ];

  return `<!doctype html>
<html lang="en" class="scroll-smooth">
<head>
  ${renderHeadTags({
    title: 'Contact Black Label · Millennium Tower San Francisco',
    description: 'Direct correspondence and architectural presence at Millennium Tower, 301 Mission St, San Francisco. An anchor of quietude, clarity, and sovereign perspective.',
    canonicalUrl: 'https://blacklabel.life/contact',
    jsonLd: jsonLd,
    preloadImage: {
      href: '/assets/images/penthouse.webp',
      mobileHref: '/assets/images/penthouse-mobile.webp',
    },
  })}
</head>
<body class="bg-[#060709] text-[#e6e0d4]">
  ${renderSharedHeader('/contact')}

  <main id="main-content">
    <!-- CONTACT HERO SECTION -->
    <section class="relative pt-32 pb-16 sm:pb-20 border-b border-white/[0.08] overflow-hidden">
      <!-- Background Luxury Visual Asset -->
      <div class="absolute inset-0 pointer-events-none">
        <picture>
          <source media="(max-width: 768px)" srcset="/assets/images/penthouse-mobile.webp" type="image/webp" />
          <source srcset="/assets/images/penthouse.webp" type="image/webp" />
          <img src="/assets/images/penthouse.jpg" alt="Millennium Tower San Francisco" width="1920" height="1080" fetchpriority="high" loading="eager" decoding="async" class="w-full h-full object-cover filter brightness-[0.18] contrast-110" />
        </picture>
        <div class="absolute inset-0 bg-gradient-to-t from-[#060709] via-[#060709]/85 to-[#060709]/75"></div>
        <div class="absolute inset-0 bg-radial-hero"></div>
      </div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div class="max-w-3xl space-y-6">
          <div class="flex items-center gap-2.5 animate-inner-hero-tag">
            <span class="px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-[#faf8f5] bg-[#060709]/80 backdrop-blur-md border border-[#c5a059]/40 rounded-sm">
              SAN FRANCISCO SANCTUARY
            </span>
            <span class="text-xs text-white/30">/</span>
            <span class="text-xs uppercase tracking-[0.2em] font-mono text-[#a69f91]">SOVEREIGN CORRESPONDENCE</span>
          </div>

          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#faf8f5] leading-[1.12] font-light animate-inner-hero-title">
            Direct Correspondence & Sanctuary
          </h1>

          <p class="text-base sm:text-lg text-[#dcd6ca]/90 leading-relaxed font-light animate-inner-hero-desc">
            Anchored in Millennium Tower, 301 Mission St, San Francisco. We invite quiet dialogue, confidential consultations, and thoughtful inquiries across all eight dimensions of sovereign living.
          </p>

          <!-- Direct Electronic Intake Telemetry Pills -->
          <div class="pt-2 flex flex-wrap items-center gap-3 sm:gap-4 animate-inner-hero-cta">
            <div class="px-3.5 py-2 rounded-sm bg-[#0b0e13]/80 border border-white/10 flex items-center gap-2.5 text-xs font-mono text-[#e6e0d4]">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Direct Telemetry:</span>
              <a href="mailto:concierge@blacklabel.life" class="text-[#c5a059] hover:underline">concierge@blacklabel.life</a>
            </div>

            <div class="px-3.5 py-2 rounded-sm bg-[#0b0e13]/80 border border-white/10 flex items-center gap-2.5 text-xs font-mono text-[#a69f91]">
              <svg class="w-3.5 h-3.5 text-[#c5a059]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 21s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 7.2c0 7.3-8 11.8-8 11.8z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span>301 Mission St, San Francisco, CA 94105</span>
            </div>

            <div class="px-3.5 py-2 rounded-sm bg-[#0b0e13]/80 border border-white/10 flex items-center gap-2.5 text-xs font-mono text-[#a69f91]">
              <span class="text-[#c5a059]">24/7/365</span>
              <span>Executive Protocol</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- MAIN TERMINAL: INTERACTIVE MAP & CONTACT FORM STAGE -->
    <section class="py-16 sm:py-24 bg-[#060709] border-b border-white/[0.08] relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          <!-- LEFT: INTERACTIVE LUXURY DARK MAP -->
          <div class="lg:col-span-7 flex flex-col space-y-4" data-reveal="fade-up">
            <div class="bg-[#0b0e13] border border-[#c5a059]/35 rounded-sm overflow-hidden shadow-2xl flex flex-col justify-between">
              
              <!-- Map Toolbar Header -->
              <div class="p-3.5 sm:p-4 bg-[#090b0e] border-b border-white/[0.08] flex items-center justify-between">
                <div class="flex items-center gap-2.5">
                  <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span class="text-xs font-mono uppercase tracking-[0.2em] text-[#faf8f5] font-semibold">
                    Millennium Tower · Headquarters
                  </span>
                </div>

                <!-- Custom Map Action Controls -->
                <div class="flex items-center gap-1.5">
                  <button
                    type="button"
                    id="map-recenter"
                    class="p-1.5 px-2.5 text-[11px] font-mono uppercase tracking-wider text-[#faf8f5] bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 rounded-sm transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a059]"
                    title="Recenter Millennium Tower"
                  >
                    <svg class="w-3.5 h-3.5 text-[#c5a059]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="10" />
                      <circle cx="12" cy="12" r="3" />
                      <line x1="12" y1="2" x2="12" y2="5" />
                      <line x1="12" y1="19" x2="12" y2="22" />
                      <line x1="2" y1="12" x2="5" y2="12" />
                      <line x1="19" y1="12" x2="22" y2="12" />
                    </svg>
                    <span class="hidden sm:inline">Recenter</span>
                  </button>

                  <button
                    type="button"
                    id="map-zoom-in"
                    class="w-7 h-7 flex items-center justify-center text-sm font-mono text-[#faf8f5] bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a059]"
                    aria-label="Zoom in map"
                  >
                    +
                  </button>

                  <button
                    type="button"
                    id="map-zoom-out"
                    class="w-7 h-7 flex items-center justify-center text-sm font-mono text-[#faf8f5] bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a059]"
                    aria-label="Zoom out map"
                  >
                    −
                  </button>
                </div>
              </div>

              <!-- Leaflet Map Container -->
              <div class="relative w-full h-[420px] sm:h-[500px] lg:h-[540px] bg-[#060709] overflow-hidden">
                <div id="contact-map" class="w-full h-full z-0"></div>

                <!-- Subtle Top Floating Badge Overlay -->
                <div class="absolute top-3 left-3 z-[400] pointer-events-none">
                  <div class="px-2.5 py-1 bg-[#060709]/85 backdrop-blur-md border border-white/10 rounded-sm text-[10px] font-mono text-[#e6e0d4]/90 flex items-center gap-1.5 shadow-lg">
                    <span class="text-[#c5a059]">37.7903° N, 122.3970° W</span>
                    <span class="text-white/20">|</span>
                    <span>Elev. 645 FT</span>
                  </div>
                </div>
              </div>

              <!-- Map Specification & Directions Bar -->
              <div class="p-4 sm:p-5 bg-[#090b0e] border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                <div class="space-y-1">
                  <div class="text-[#faf8f5] font-serif text-sm font-medium">301 Mission St, San Francisco, CA 94105</div>
                  <div class="text-[#a69f91] font-mono text-[11px]">Private Valet: Fremont St Porte-Cochère · SoMa District</div>
                </div>

                <div class="flex items-center gap-2.5 shrink-0">
                  <a
                    href="https://maps.apple.com/?q=Millennium+Tower,+301+Mission+St,+San+Francisco,+CA+94105"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="px-3.5 py-2 bg-[#c5a059] hover:bg-[#dfc182] text-[#060709] text-[11px] font-semibold uppercase tracking-wider rounded-sm transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a059]"
                  >
                    Apple Maps ↗
                  </a>
                  <a
                    href="https://maps.google.com/?q=301+Mission+St,+San+Francisco,+CA+94105"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="px-3.5 py-2 bg-white/[0.06] hover:bg-white/[0.12] text-[#faf8f5] border border-white/10 text-[11px] font-semibold uppercase tracking-wider rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a059]"
                  >
                    Google Maps ↗
                  </a>
                </div>
              </div>

            </div>
          </div>

          <!-- RIGHT: SOVEREIGN CONTACT FORM -->
          <div class="lg:col-span-5" data-reveal="fade-up">
            <div class="bg-[#0b0e13] border border-[#c5a059]/35 rounded-sm p-6 sm:p-8 shadow-2xl relative">
              
              <!-- Card Corner Reticles -->
              <div class="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-[#c5a059]/60 pointer-events-none"></div>
              <div class="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-[#c5a059]/60 pointer-events-none"></div>
              <div class="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-[#c5a059]/60 pointer-events-none"></div>
              <div class="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-[#c5a059]/60 pointer-events-none"></div>

              <div class="mb-6 space-y-1.5 border-b border-white/[0.08] pb-5">
                <span class="text-[10px] font-mono uppercase tracking-[0.25em] text-[#c5a059] font-semibold">
                  ENCRYPTED MANDATE INTAKE
                </span>
                <h2 class="text-2xl sm:text-3xl font-serif text-[#faf8f5] font-medium">
                  Direct Concierge Terminal
                </h2>
                <p class="text-xs text-[#dcd6ca]/80 leading-relaxed font-light">
                  All transmissions handled under strict NDA protocols. Guaranteed executive review within 2 hours.
                </p>
              </div>

              <!-- Success Banner -->
              <div id="contact-success-banner" class="hidden mb-6 p-4 bg-[#060709] text-[#faf8f5] border border-[#c5a059] rounded-sm">
                <div class="flex items-center justify-between mb-1">
                  <span class="text-xs font-mono uppercase tracking-widest text-[#c5a059] font-semibold">Mandate Formatted</span>
                  <span id="contact-ticket-ref" class="text-xs font-mono text-white/70"></span>
                </div>
                <p class="text-xs text-[#dcd6ca]/90 leading-relaxed">
                  Your mail client has been opened with your mandate addressed to <strong class="text-[#c5a059]">concierge@blacklabel.life</strong>. Our senior concierge liaison will acknowledge receipt within 2 hours.
                </p>
              </div>

              <!-- Contact Form -->
              <form id="contact-form" class="space-y-4 sm:space-y-5">
                
                <div>
                  <label for="contact-name" class="block text-[11px] font-mono uppercase tracking-[0.18em] text-[#faf8f5] font-semibold mb-1.5">
                    Principal / Client Name <span class="text-[#c5a059]">*</span>
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    required
                    placeholder="e.g. Sterling Hayes"
                    class="w-full px-3.5 py-3 bg-[#060709] border border-white/10 text-[#faf8f5] text-sm rounded-sm focus:outline-none focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059] placeholder-[#a69f91]/40"
                  />
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label for="contact-email" class="block text-[11px] font-mono uppercase tracking-[0.18em] text-[#faf8f5] font-semibold mb-1.5">
                      Direct Email <span class="text-[#c5a059]">*</span>
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      required
                      placeholder="s.hayes@domain.com"
                      class="w-full px-3.5 py-3 bg-[#060709] border border-white/10 text-[#faf8f5] text-sm rounded-sm focus:outline-none focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059] placeholder-[#a69f91]/40"
                    />
                  </div>

                  <div>
                    <label for="contact-phone" class="block text-[11px] font-mono uppercase tracking-[0.18em] text-[#faf8f5] font-semibold mb-1.5">
                      Phone / Signal (Confidential)
                    </label>
                    <input
                      type="tel"
                      id="contact-phone"
                      placeholder="+1 (415) ..."
                      class="w-full px-3.5 py-3 bg-[#060709] border border-white/10 text-[#faf8f5] text-sm rounded-sm focus:outline-none focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059] placeholder-[#a69f91]/40"
                    />
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label for="contact-division" class="block text-[11px] font-mono uppercase tracking-[0.18em] text-[#faf8f5] font-semibold mb-1.5">
                      Division <span class="text-[#c5a059]">*</span>
                    </label>
                    <select
                      id="contact-division"
                      required
                      class="w-full px-3 py-3 bg-[#060709] border border-white/10 text-[#faf8f5] text-xs rounded-sm focus:outline-none focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059]"
                    >
                      <option value="General Concierge">General Concierge / Route Me</option>
                      <option value="01 Social">01 Social — AI Growth Engine</option>
                      <option value="02 Entertainment">02 Entertainment — In-Residence Dining</option>
                      <option value="03 Trading">03 Trading — Collectibles AI</option>
                      <option value="04 Lifestyle">04 Lifestyle — Butlers & Time Reclaimed</option>
                      <option value="05 Design">05 Design — Staging & Interiors</option>
                      <option value="06 Business Services">06 Business — Back Office & Legal</option>
                      <option value="07 Investments">07 Investments — SoMa Leases & Fund</option>
                      <option value="08 Luxury">08 Luxury — Exotics & High Jewelry</option>
                      <option value="Executive Retainer">Private Collective Retainer</option>
                    </select>
                  </div>

                  <div>
                    <label for="contact-urgency" class="block text-[11px] font-mono uppercase tracking-[0.18em] text-[#faf8f5] font-semibold mb-1.5">
                      Urgency / SLA
                    </label>
                    <select
                      id="contact-urgency"
                      class="w-full px-3 py-3 bg-[#060709] border border-white/10 text-[#faf8f5] text-xs rounded-sm focus:outline-none focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059]"
                    >
                      <option value="Immediate (Under 2 Hours)">Immediate (Under 2 Hours SLA)</option>
                      <option value="Within 24 Hours">Within 24 Hours</option>
                      <option value="Next 30 Days">Next 30 Days</option>
                      <option value="Strategic Planning">Strategic Planning</option>
                    </select>
                  </div>
                </div>

                <!-- Preferred Channel Radios -->
                <div>
                  <span class="block text-[11px] font-mono uppercase tracking-[0.18em] text-[#faf8f5] font-semibold mb-2">
                    Preferred Contact Channel
                  </span>
                  <div class="grid grid-cols-3 gap-2 text-xs">
                    <label class="flex items-center gap-2 p-2 bg-[#060709] border border-white/10 rounded-sm cursor-pointer hover:border-[#c5a059]/40">
                      <input type="radio" name="preferred_channel" value="Email" checked class="text-[#c5a059] focus:ring-[#c5a059]" />
                      <span class="text-[#dcd6ca]">Email</span>
                    </label>
                    <label class="flex items-center gap-2 p-2 bg-[#060709] border border-white/10 rounded-sm cursor-pointer hover:border-[#c5a059]/40">
                      <input type="radio" name="preferred_channel" value="Confidential Phone" class="text-[#c5a059] focus:ring-[#c5a059]" />
                      <span class="text-[#dcd6ca]">Phone</span>
                    </label>
                    <label class="flex items-center gap-2 p-2 bg-[#060709] border border-white/10 rounded-sm cursor-pointer hover:border-[#c5a059]/40">
                      <input type="radio" name="preferred_channel" value="Millennium Tower Suite" class="text-[#c5a059] focus:ring-[#c5a059]" />
                      <span class="text-[#dcd6ca]">In-Person</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label for="contact-message" class="block text-[11px] font-mono uppercase tracking-[0.18em] text-[#faf8f5] font-semibold mb-1.5">
                    Objectives & Mandate <span class="text-[#c5a059]">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows="4"
                    placeholder="Describe your requirement, timeline, residence, or collective scope..."
                    class="w-full px-3.5 py-3 bg-[#060709] border border-white/10 text-[#faf8f5] text-sm rounded-sm focus:outline-none focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059] placeholder-[#a69f91]/40"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  id="contact-submit-btn"
                  class="w-full py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#060709] bg-[#c5a059] hover:bg-[#dfc182] transition-colors rounded-sm shadow-[0_0_20px_rgba(197,160,89,0.3)] hover:shadow-[0_0_25px_rgba(197,160,89,0.5)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a059]"
                >
                  Transmit Mandate to Concierge →
                </button>
              </form>

              <div class="mt-5 pt-5 border-t border-white/[0.08] flex items-center justify-between text-[10px] font-mono text-[#a69f91]">
                <span>CONFIDENTIALITY: 100% NDA</span>
                <span class="text-[#c5a059]">MILLENNIUM TOWER ORIGIN</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>

    <!-- 3-PILLAR HEADQUARTERS PROTOCOL DOSSIER -->
    <section class="py-16 sm:py-24 bg-[#090b0e] text-[#faf8f5]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3" data-reveal="fade-up">
          <span class="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-mono font-semibold">Headquarters Operations</span>
          <h2 class="text-3xl sm:text-4xl font-serif">Sovereign Presence & Access</h2>
          <p class="text-sm text-[#dcd6ca] font-light">
            Engineered from Millennium Tower to protect focus, uphold complete privacy, and deliver instant luxury dispatch.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8" data-reveal-stagger>
          <!-- Protocol 1 -->
          <div class="bg-[#0b0e13] border border-white/[0.08] p-7 rounded-sm space-y-4 relative" data-reveal="scale">
            <span class="text-3xl font-serif text-[#c5a059]/40 font-light">01</span>
            <h3 class="text-xl font-serif text-[#faf8f5]">Central Concierge Dispatch</h3>
            <p class="text-xs text-[#dcd6ca]/80 leading-relaxed font-light">
              One confidential point of contact coordinates all eight operating companies. All incoming mandates are routed through encrypted channels with direct 2-hour response guarantees.
            </p>
            <div class="pt-3 border-t border-white/[0.06] font-mono text-[11px] text-[#c5a059]">
              concierge@blacklabel.life
            </div>
          </div>

          <!-- Protocol 2 -->
          <div class="bg-[#0b0e13] border border-white/[0.08] p-7 rounded-sm space-y-4 relative" data-reveal="scale">
            <span class="text-3xl font-serif text-[#c5a059]/40 font-light">02</span>
            <h3 class="text-xl font-serif text-[#faf8f5]">Private Arrival & Valet</h3>
            <p class="text-xs text-[#dcd6ca]/80 leading-relaxed font-light">
              In-person executive appointments at Millennium Tower are coordinated with dedicated residential valet clearance at the Fremont St. entrance with pre-cleared guest security.
            </p>
            <div class="pt-3 border-t border-white/[0.06] font-mono text-[11px] text-[#c5a059]">
              301 Mission St · Porte-Cochère
            </div>
          </div>

          <!-- Protocol 3 -->
          <div class="bg-[#0b0e13] border border-white/[0.08] p-7 rounded-sm space-y-4 relative" data-reveal="scale">
            <span class="text-3xl font-serif text-[#c5a059]/40 font-light">03</span>
            <h3 class="text-xl font-serif text-[#faf8f5]">Institutional Collective Retainer</h3>
            <p class="text-xs text-[#dcd6ca]/80 leading-relaxed font-light">
              Family offices and high-net-worth founders can engage the complete collective on bespoke annual or multi-entity retainers with dedicated managing director liaisons.
            </p>
            <div class="pt-3 border-t border-white/[0.06] font-mono text-[11px] text-[#c5a059]">
              Retainers from $15,000 / mo
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

  ${renderSharedFooter()}
</body>
</html>`;
}

/**
 * ============================================================================
 * 5. EXECUTIVE ANALYTICS PORTAL COMPILER (generateAdminPage)
 * ============================================================================
 * Owner & Developer Guide:
 * Generates the confidential executive analytics dashboard (/admin).
 * 
 * CORE CAPABILITIES:
 * - Real-Time First-Party Telemetry: Collects and displays real website visits
 *   and geo-located US state origin (CA, NY, TX, FL, etc.) without 3rd-party ad scripts.
 * - Dynamic State Distribution: Interactive ranking of visitor market volume.
 * - Live Visitor Event Stream: Shows incoming visits with timestamps and platforms.
 * - One-Click CSV Export: Generates downloadable reports for executive leadership.
 * ============================================================================
 */
function generateAdminPage(): string {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Black Label Executive Visitor Intelligence',
      url: 'https://blacklabel.life/admin',
      description: 'Sovereign visitor telemetry, US state geographic distribution, session metrics, and executive inquiry tracking.',
    },
  ];

  return `<!doctype html>
<html lang="en" class="scroll-smooth">
<head>
  ${renderHeadTags({
    title: 'Executive Intelligence Portal · Black Label',
    description: 'Confidential executive analytics and visitor intelligence for Black Label.',
    canonicalUrl: 'https://blacklabel.life/admin',
    jsonLd: jsonLd,
    noIndex: true,
  })}
</head>
<body class="bg-[#060709] text-[#e6e0d4] min-h-screen">
  ${renderSharedHeader('/admin')}

  <main id="main-content" class="pt-28 pb-24">
    <!-- ADMIN DASHBOARD CONTAINER -->
    <div id="admin-dashboard-container" class="max-w-7xl xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

      <!-- 1. EXECUTIVE CONSOLE COMMAND BANNER (ONLY FOR THIS SITE · REAL SCORE) -->
      <section class="p-6 sm:p-8 rounded-sm bg-[#090b0e] border border-[#c5a059]/30 shadow-2xl relative overflow-hidden">
        <div class="absolute -top-24 -right-24 w-96 h-96 bg-[#c5a059]/5 blur-3xl pointer-events-none"></div>

        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div class="space-y-2">
            <div class="flex flex-wrap items-center gap-2">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#c5a059]/10 border border-[#c5a059]/30 text-xs">
                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span class="text-[#c5a059] font-mono uppercase tracking-[0.2em] text-[11px] font-semibold">Real Score Telemetry</span>
              </div>
              <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-white/[0.04] border border-white/10 text-xs font-mono text-[#dcd6ca]">
                <span>Site:</span>
                <span id="telemetry-site-host" class="text-[#faf8f5] font-semibold">Tracking This Domain</span>
              </div>
              <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-white/[0.04] border border-white/10 text-xs font-mono text-[#c5a059]">
                <span>Scope:</span>
                <span>US Visitors First (50 States + DC)</span>
              </div>
            </div>

            <h1 class="text-3xl sm:text-5xl font-serif text-[#faf8f5] font-light">
              Executive US Visitor <span class="italic text-gold-accent font-normal">Intelligence</span>
            </h1>
            <p class="text-xs sm:text-sm text-[#dcd6ca] font-light max-w-2xl">
              Verified real-time telemetry tracked strictly for this site. Shows real US visitors first with exact state counts, calculated percentage shares, and live resident session logs — no dummy scores.
            </p>
          </div>

          <!-- Quick Action & Verification Tools -->
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <!-- State Selector & Log Button -->
            <div class="flex items-center gap-1.5 bg-[#060709] border border-white/15 p-1 rounded-sm">
              <select id="admin-pick-state-select" class="bg-transparent text-xs font-mono text-[#faf8f5] px-2 py-1.5 border-none focus:outline-none cursor-pointer">
                <option value="CA" class="bg-[#0b0e13] text-[#faf8f5]">California (CA)</option>
                <option value="NY" class="bg-[#0b0e13] text-[#faf8f5]">New York (NY)</option>
                <option value="TX" class="bg-[#0b0e13] text-[#faf8f5]">Texas (TX)</option>
                <option value="FL" class="bg-[#0b0e13] text-[#faf8f5]">Florida (FL)</option>
                <option value="WA" class="bg-[#0b0e13] text-[#faf8f5]">Washington (WA)</option>
                <option value="NV" class="bg-[#0b0e13] text-[#faf8f5]">Nevada (NV)</option>
                <option value="IL" class="bg-[#0b0e13] text-[#faf8f5]">Illinois (IL)</option>
                <option value="MA" class="bg-[#0b0e13] text-[#faf8f5]">Massachusetts (MA)</option>
                <option value="CO" class="bg-[#0b0e13] text-[#faf8f5]">Colorado (CO)</option>
                <option value="AZ" class="bg-[#0b0e13] text-[#faf8f5]">Arizona (AZ)</option>
                <option value="GA" class="bg-[#0b0e13] text-[#faf8f5]">Georgia (GA)</option>
                <option value="NJ" class="bg-[#0b0e13] text-[#faf8f5]">New Jersey (NJ)</option>
                <option value="PA" class="bg-[#0b0e13] text-[#faf8f5]">Pennsylvania (PA)</option>
                <option value="OR" class="bg-[#0b0e13] text-[#faf8f5]">Oregon (OR)</option>
                <option value="NC" class="bg-[#0b0e13] text-[#faf8f5]">North Carolina (NC)</option>
                <option value="VA" class="bg-[#0b0e13] text-[#faf8f5]">Virginia (VA)</option>
                <option value="OH" class="bg-[#0b0e13] text-[#faf8f5]">Ohio (OH)</option>
                <option value="MI" class="bg-[#0b0e13] text-[#faf8f5]">Michigan (MI)</option>
                <option value="DC" class="bg-[#0b0e13] text-[#faf8f5]">District of Columbia (DC)</option>
              </select>
              <button
                type="button"
                id="log-us-state-visit-btn"
                class="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#060709] bg-[#c5a059] hover:bg-[#dfc182] transition-colors rounded-sm cursor-pointer whitespace-nowrap"
                title="Log a verified visit for selected US state"
              >
                + Log Visit
              </button>
            </div>

            <!-- Detect Location Button -->
            <button
              type="button"
              id="detect-my-location-btn"
              class="px-3.5 py-2 text-xs font-semibold tracking-wider text-[#faf8f5] border border-white/20 hover:border-[#c5a059] hover:text-[#c5a059] transition-colors rounded-sm flex items-center justify-center gap-1.5 bg-white/[0.02] cursor-pointer whitespace-nowrap"
            >
              <span>📍</span>
              <span>Log My Location</span>
            </button>

            <!-- Export CSV -->
            <button
              type="button"
              id="export-csv-btn"
              class="px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-[#faf8f5] border border-white/20 hover:border-[#c5a059] hover:text-[#c5a059] transition-colors rounded-sm flex items-center justify-center gap-1.5 bg-white/[0.02] cursor-pointer"
            >
              <span>↓</span>
              <span>CSV</span>
            </button>

            <!-- Reset Button -->
            <button
              type="button"
              id="reset-telemetry-btn"
              class="px-3 py-2 text-xs font-mono uppercase tracking-wider text-[#a69f91] hover:text-[#faf8f5] border border-white/10 hover:border-rose-500/40 hover:text-rose-400 transition-colors rounded-sm bg-black/40 cursor-pointer"
              title="Reset All Tracked Data for this Site to 0"
            >
              Reset
            </button>
          </div>
        </div>

        <!-- Live Notification Toast Bar -->
        <div id="live-ping-notification" class="hidden mt-5 p-3 rounded bg-[#c5a059]/15 border border-[#c5a059]/40 text-xs font-mono text-[#c5a059] flex items-center gap-2">
          Real visitor recorded...
        </div>
      </section>

      <!-- 2. TOTAL REAL DATA DASHBOARD (PRIMARY KPI TILES) -->
      <section id="admin-kpis" class="space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span class="text-[11px] font-mono uppercase tracking-[0.25em] text-[#c5a059]">Verified Real Score</span>
            <h2 class="text-2xl sm:text-3xl font-serif text-[#faf8f5] font-light">Site Visitor Telemetry Overview</h2>
          </div>
          <div id="kpi-us-share-badge" class="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#c5a059]/10 border border-[#c5a059]/30 text-xs font-mono text-[#c5a059]">
            Calculating US Share...
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <!-- Metric 1: Real US Visitors -->
          <div class="p-6 rounded-sm bg-[#0b0e13] border border-white/[0.08] hover:border-[#c5a059]/40 transition-colors space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-[#a69f91]">US Visitors</span>
              <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">US Priority</span>
            </div>
            <div id="kpi-total-us-visitors" class="text-3xl sm:text-4xl font-serif text-[#c5a059] font-light">0</div>
            <p class="text-[11px] text-[#a69f91] font-light">
              Real recorded US residents
            </p>
          </div>

          <!-- Metric 2: Top US State Origin -->
          <div class="p-6 rounded-sm bg-[#0b0e13] border border-white/[0.08] hover:border-[#c5a059]/40 transition-colors space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-[#a69f91]">Top US State</span>
              <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#c5a059]/10 text-[#c5a059] border border-[#c5a059]/30">Anchor</span>
            </div>
            <div id="kpi-top-state" class="text-xl sm:text-2xl font-serif text-[#faf8f5] font-light truncate">Awaiting Visits</div>
            <p id="kpi-top-state-share" class="text-[11px] text-[#dcd6ca] font-mono">
              0 recorded US visitors yet
            </p>
          </div>

          <!-- Metric 3: Total Page Views on this Site -->
          <div class="p-6 rounded-sm bg-[#0b0e13] border border-white/[0.08] hover:border-[#c5a059]/40 transition-colors space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-[#a69f91]">Site Page Hits</span>
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
            <div id="kpi-total-page-views" class="text-3xl sm:text-4xl font-serif text-[#faf8f5] font-light">0</div>
            <p class="text-[11px] text-[#a69f91] font-light">Total views on this domain</p>
          </div>

          <!-- Metric 4: Total Visitors (All Countries) -->
          <div class="p-6 rounded-sm bg-[#0b0e13] border border-white/[0.08] hover:border-[#c5a059]/40 transition-colors space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-[#a69f91]">Total Visitors</span>
              <span class="text-[10px] font-mono text-[#c5a059]">Global Total</span>
            </div>
            <div id="kpi-total-visitors" class="text-3xl sm:text-4xl font-serif text-[#faf8f5] font-light">0</div>
            <p class="text-[11px] text-[#a69f91] font-light">Combined visitors logged</p>
          </div>

          <!-- Metric 5: Unique Devices -->
          <div class="p-6 rounded-sm bg-[#0b0e13] border border-white/[0.08] hover:border-[#c5a059]/40 transition-colors space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-[#a69f91]">Unique Devices</span>
              <span class="text-[10px] font-mono text-[#c5a059]">UUID Scoped</span>
            </div>
            <div id="kpi-unique-principals" class="text-3xl sm:text-4xl font-serif text-[#faf8f5] font-light">0</div>
            <p class="text-[11px] text-[#a69f91] font-light">Distinct visitor devices</p>
          </div>
        </div>
      </section>

      <!-- 3. GEOSPATIAL US STATE INTELLIGENCE & VISITOR PERCENTAGE BREAKDOWN (US VISITORS FIRST) -->
      <section id="state-intelligence-section" class="p-6 sm:p-8 rounded-sm bg-[#090b0e] border border-white/[0.08] space-y-6">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#c5a059]/10 border border-[#c5a059]/30 text-xs mb-2">
              <span class="text-[#c5a059] font-mono uppercase tracking-[0.25em] text-[10px] font-semibold">US Visitors First</span>
            </div>
            <h2 class="text-2xl sm:text-4xl font-serif text-[#faf8f5] font-light">
              Visitor Traffic by US States & Real Percentages
            </h2>
            <p class="text-xs sm:text-sm text-[#dcd6ca] font-light mt-1">
              Complete catalog of all 50 US states & DC. Percentages are mathematically computed from verified real visitors logged on this site.
            </p>
          </div>

          <div id="state-match-count" class="font-mono text-xs text-[#c5a059]">
            Loading US states...
          </div>
        </div>

        <!-- Filter & Search Controls Bar -->
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-2">
          <!-- Regional Filter Pills (US First) -->
          <div class="flex flex-wrap items-center gap-2">
            <span class="text-xs font-mono text-[#a69f91] mr-1 hidden sm:inline">Filter:</span>
            <button
              type="button"
              data-us-filter="all"
              class="px-3 py-1.5 rounded-sm text-xs font-mono uppercase tracking-wider border border-[#c5a059] text-[#c5a059] bg-[#c5a059]/15 font-semibold transition-colors cursor-pointer"
            >
              All 50 US States
            </button>
            <button
              type="button"
              data-us-filter="active-only"
              class="px-3 py-1.5 rounded-sm text-xs font-mono uppercase tracking-wider border border-white/10 text-[#a69f91] hover:border-[#c5a059]/50 hover:text-[#faf8f5] transition-colors cursor-pointer"
            >
              With Real Visits (>0)
            </button>
            <button
              type="button"
              data-us-filter="West"
              class="px-3 py-1.5 rounded-sm text-xs font-mono uppercase tracking-wider border border-white/10 text-[#a69f91] hover:border-[#c5a059]/50 hover:text-[#faf8f5] transition-colors cursor-pointer"
            >
              West
            </button>
            <button
              type="button"
              data-us-filter="East"
              class="px-3 py-1.5 rounded-sm text-xs font-mono uppercase tracking-wider border border-white/10 text-[#a69f91] hover:border-[#c5a059]/50 hover:text-[#faf8f5] transition-colors cursor-pointer"
            >
              East
            </button>
            <button
              type="button"
              data-us-filter="Sunbelt"
              class="px-3 py-1.5 rounded-sm text-xs font-mono uppercase tracking-wider border border-white/10 text-[#a69f91] hover:border-[#c5a059]/50 hover:text-[#faf8f5] transition-colors cursor-pointer"
            >
              Sunbelt
            </button>
            <button
              type="button"
              data-us-filter="Midwest"
              class="px-3 py-1.5 rounded-sm text-xs font-mono uppercase tracking-wider border border-white/10 text-[#a69f91] hover:border-[#c5a059]/50 hover:text-[#faf8f5] transition-colors cursor-pointer"
            >
              Midwest
            </button>
          </div>

          <!-- Search & Sort Box -->
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div class="relative min-w-[220px]">
              <input
                type="text"
                id="admin-state-search"
                placeholder="Search state name, code, metro..."
                class="w-full bg-[#060709] border border-white/15 focus:border-[#c5a059] rounded-sm px-3 py-1.5 text-xs text-[#faf8f5] placeholder-[#a69f91]/60 focus:outline-none transition-colors font-mono"
              />
            </div>

            <div class="flex items-center gap-2">
              <span class="text-xs font-mono text-[#a69f91] whitespace-nowrap">Sort:</span>
              <select
                id="admin-sort-select"
                class="bg-[#060709] border border-white/15 focus:border-[#c5a059] rounded-sm px-2.5 py-1.5 text-xs text-[#faf8f5] font-mono focus:outline-none cursor-pointer"
              >
                <option value="visitors">Most Real Visitors ↓</option>
                <option value="percentage">Highest % Share</option>
                <option value="views">Most Page Views</option>
                <option value="name">State Name (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        <!-- US States Table -->
        <div class="overflow-x-auto border border-white/[0.08] rounded-sm bg-[#060709]/60">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-white/10 bg-[#0c0f14] text-[10px] font-mono uppercase tracking-[0.2em] text-[#a69f91]">
                <th class="py-3.5 px-4 sm:px-6">Rank & US State</th>
                <th class="py-3.5 px-4 sm:px-6 text-right">Real Visitors</th>
                <th class="py-3.5 px-4 sm:px-6 text-right sm:text-left min-w-[180px]">US Traffic Share %</th>
                <th class="py-3.5 px-4 sm:px-6 text-center hidden md:table-cell">Region</th>
                <th class="py-3.5 px-4 sm:px-6 text-right hidden lg:table-cell">Status</th>
              </tr>
            </thead>
            <tbody id="state-table-body" class="divide-y divide-white/[0.04]">
              <!-- Dynamic real rows rendered by src/admin-analytics.ts -->
            </tbody>
          </table>
        </div>
      </section>

      <!-- 4. REGIONAL MACRO BENTO GRID -->
      <section class="space-y-4">
        <div>
          <span class="text-[11px] font-mono uppercase tracking-[0.25em] text-[#c5a059]">US Geography</span>
          <h2 class="text-2xl sm:text-3xl font-serif text-[#faf8f5] font-light">Major US Regional Corridors</h2>
        </div>

        <div id="regional-bento-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <!-- Populated by admin-analytics.ts -->
        </div>
      </section>

      <!-- 5. PAGES ON THIS SITE & REAL LIVE STREAM DUAL PANELS -->
      <section class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <!-- Left: Pages on THIS Site Breakdown (6 cols) -->
        <div class="lg:col-span-6 p-6 sm:p-8 rounded-sm bg-[#090b0e] border border-white/[0.08] space-y-6">
          <div class="flex items-center justify-between pb-4 border-b border-white/10">
            <div>
              <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c5a059]">Site Architecture</span>
              <h3 class="text-xl sm:text-2xl font-serif text-[#faf8f5] font-medium">Pages on This Site</h3>
            </div>
            <span class="text-xs font-mono text-[#a69f91]">Real URL Hits</span>
          </div>

          <p class="text-xs text-[#a69f91] font-light">
            Exact page view distribution across the divisions and desk endpoints of this website.
          </p>

          <div id="pages-breakdown-container" class="space-y-4">
            <!-- Populated by admin-analytics.ts -->
          </div>
        </div>

        <!-- Right: Real-Time Live Activity Stream (6 cols) -->
        <div class="lg:col-span-6 p-6 sm:p-8 rounded-sm bg-[#090b0e] border border-white/[0.08] space-y-6">
          <div class="flex items-center justify-between pb-4 border-b border-white/10">
            <div>
              <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c5a059]">Audit Stream</span>
              <h3 class="text-xl sm:text-2xl font-serif text-[#faf8f5] font-medium">Real Visitor Session Log</h3>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span class="text-xs font-mono text-emerald-400">Live Scoped</span>
            </div>
          </div>

          <p class="text-xs text-[#a69f91] font-light">
            Chronological audit feed of actual real visitor hits on this site with detected state location and client details.
          </p>

          <div id="live-activity-stream" class="space-y-3">
            <!-- Populated by admin-analytics.ts -->
          </div>
        </div>
      </section>

    </div>
  </main>

  ${renderSharedFooter()}
</body>
</html>`;
}

/**
 * ============================================================================
 * 6. 404 EXCEPTION PAGE COMPILER (generate404Page)
 * ============================================================================
 * Owner & Developer Guide:
 * Generates the branded error 404 page (/404.html).
 * Provides graceful recovery links directing users back to the homepage
 * or the private concierge intake desk.
 * ============================================================================
 */
function generate404Page(): string {
  return `<!doctype html>
<html lang="en" class="scroll-smooth">
<head>
  ${renderHeadTags({
    title: 'Destination Uncharted · The Standard Remains | Black Label',
    description: 'The path you requested is beyond the current perimeter. Discover the eight inquiries of sovereign living with Black Label.',
    canonicalUrl: 'https://blacklabel.life/404',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: '404 - The Standard Remains',
        url: 'https://blacklabel.life/404',
        description: 'The requested page was not found.',
      },
    ],
  })}
</head>
<body class="bg-[#060709] text-[#e6e0d4]">
  ${renderSharedHeader('/404')}

  <main id="main-content" class="min-h-[75vh] flex items-center justify-center pt-28 pb-20 px-4">
    <div class="max-w-2xl mx-auto text-center space-y-8" data-reveal>
      <span class="text-xs uppercase tracking-[0.3em] text-[#c5a059] font-mono font-semibold">404 Exception</span>
      <h1 class="text-5xl sm:text-7xl font-serif text-[#faf8f5] font-light">
        The Standard Remains
      </h1>
      <p class="text-base sm:text-lg text-[#dcd6ca]/80 font-light max-w-lg mx-auto leading-relaxed">
        The destination you requested has been relocated or is not part of the Black Label portfolio.
      </p>

      <div class="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
        <a href="/" class="w-full sm:w-auto px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#060709] bg-[#c5a059] hover:bg-[#dfc182] transition-colors rounded-sm">
          Return to Home
        </a>
        <a href="/concierge" class="w-full sm:w-auto px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#faf8f5] border border-white/20 hover:border-[#c5a059] transition-colors rounded-sm">
          Contact Concierge
        </a>
      </div>

      <!-- Quick Directory of 8 Divisions -->
      <div class="pt-12 border-t border-white/[0.08]">
        <p class="text-xs uppercase tracking-[0.25em] text-[#c5a059] mb-4 font-mono font-semibold">Explore Divisions</p>
        <div class="flex flex-wrap justify-center gap-3 text-xs text-[#dcd6ca]">
          <a href="/social" class="hover:text-[#c5a059] px-3 py-1.5 border border-white/10 rounded-sm hover:border-[#c5a059]/40 transition-colors">01 Social</a>
          <a href="/entertainment" class="hover:text-[#c5a059] px-3 py-1.5 border border-white/10 rounded-sm hover:border-[#c5a059]/40 transition-colors">02 Entertainment</a>
          <a href="/trading" class="hover:text-[#c5a059] px-3 py-1.5 border border-white/10 rounded-sm hover:border-[#c5a059]/40 transition-colors">03 Trading</a>
          <a href="/lifestyle" class="hover:text-[#c5a059] px-3 py-1.5 border border-white/10 rounded-sm hover:border-[#c5a059]/40 transition-colors">04 Lifestyle</a>
          <a href="/design" class="hover:text-[#c5a059] px-3 py-1.5 border border-white/10 rounded-sm hover:border-[#c5a059]/40 transition-colors">05 Design</a>
          <a href="/business-services" class="hover:text-[#c5a059] px-3 py-1.5 border border-white/10 rounded-sm hover:border-[#c5a059]/40 transition-colors">06 Business</a>
          <a href="/investments" class="hover:text-[#c5a059] px-3 py-1.5 border border-white/10 rounded-sm hover:border-[#c5a059]/40 transition-colors">07 Investments</a>
          <a href="/luxury" class="hover:text-[#c5a059] px-3 py-1.5 border border-white/10 rounded-sm hover:border-[#c5a059]/40 transition-colors">08 Luxury</a>
        </div>
      </div>
    </div>
  </main>

  ${renderSharedFooter()}
</body>
</html>`;
}

// MAIN GENERATOR
async function buildAllPages(): Promise<void> {
  const rootDir = path.resolve('.');

  // 1. Home Page
  fs.writeFileSync(path.join(rootDir, 'index.html'), generateHomePage(), 'utf8');
  console.log('✓ Generated: /index.html');

  // 2. Division Pages
  for (const div of DIVISIONS) {
    const dirPath = path.join(rootDir, div.slug);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    fs.writeFileSync(path.join(dirPath, 'index.html'), generateDivisionPage(div), 'utf8');
    console.log(`✓ Generated: /${div.slug}/index.html`);
  }

  // 3. Concierge Page
  const conciergeDir = path.join(rootDir, 'concierge');
  if (!fs.existsSync(conciergeDir)) {
    fs.mkdirSync(conciergeDir, { recursive: true });
  }
  fs.writeFileSync(path.join(conciergeDir, 'index.html'), generateConciergePage(), 'utf8');
  console.log('✓ Generated: /concierge/index.html');

  // 4. Contact Page (With Millennium Tower Interactive Map & Sovereign Form)
  const contactDir = path.join(rootDir, 'contact');
  if (!fs.existsSync(contactDir)) {
    fs.mkdirSync(contactDir, { recursive: true });
  }
  fs.writeFileSync(path.join(contactDir, 'index.html'), generateContactPage(), 'utf8');
  console.log('✓ Generated: /contact/index.html');

  // 5. Admin Analytics Dashboard Page
  const adminDir = path.join(rootDir, 'admin');
  if (!fs.existsSync(adminDir)) {
    fs.mkdirSync(adminDir, { recursive: true });
  }
  fs.writeFileSync(path.join(adminDir, 'index.html'), generateAdminPage(), 'utf8');
  console.log('✓ Generated: /admin/index.html');

  // 6. 404 Page
  fs.writeFileSync(path.join(rootDir, '404.html'), generate404Page(), 'utf8');
  console.log('✓ Generated: /404.html');

  console.log('\nAll 13 marketing, contact & admin pages successfully generated.');
}

buildAllPages().catch((err) => {
  console.error('Error generating pages:', err);
  process.exit(1);
});
