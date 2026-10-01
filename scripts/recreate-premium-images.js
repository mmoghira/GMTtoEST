const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const BRAIN_DIR = "C:/Users/PMYLS/.gemini/antigravity/brain/f0d0c60f-158b-4eab-bd9c-488bce523d4b";
const ASSETS_DIR = path.join(__dirname, "..", "public", "assets");

async function main() {
  console.log("Recreating images with premium high-resolution artwork...\n");

  // 1. Hero Image: newfoundland_hero_1790850762337.jpg
  const heroSrc = path.join(BRAIN_DIR, "newfoundland_hero_1790850762337.jpg");
  if (fs.existsSync(heroSrc)) {
    console.log("Processing Hero Image from generated artwork...");
    // 1200w WebP & AVIF
    await sharp(heroSrc)
      .resize(1200, 630, { fit: "cover", position: "center" })
      .webp({ quality: 86 })
      .toFile(path.join(ASSETS_DIR, "newfoundland-time-zone-hero-1200.webp"));

    await sharp(heroSrc)
      .resize(1200, 630, { fit: "cover", position: "center" })
      .avif({ quality: 70, effort: 4 })
      .toFile(path.join(ASSETS_DIR, "newfoundland-time-zone-hero-1200.avif"));

    // 600w WebP & AVIF
    await sharp(heroSrc)
      .resize(600, 315, { fit: "cover", position: "center" })
      .webp({ quality: 86 })
      .toFile(path.join(ASSETS_DIR, "newfoundland-time-zone-hero-600.webp"));

    await sharp(heroSrc)
      .resize(600, 315, { fit: "cover", position: "center" })
      .avif({ quality: 65, effort: 4 })
      .toFile(path.join(ASSETS_DIR, "newfoundland-time-zone-hero-600.avif"));

    console.log("✓ Hero images (1200w & 600w, WebP & AVIF) created successfully!");
  } else {
    console.error("Hero source not found:", heroSrc);
  }

  // 2. Solar Longitude Infographic: newfoundland_solar_1790850787808.jpg
  const solarSrc = path.join(BRAIN_DIR, "newfoundland_solar_1790850787808.jpg");
  if (fs.existsSync(solarSrc)) {
    console.log("Processing Solar Longitude Artwork...");
    await sharp(solarSrc)
      .resize(1200, 800, { fit: "cover", position: "center" })
      .webp({ quality: 86 })
      .toFile(path.join(ASSETS_DIR, "newfoundland-solar-time-longitude-infographic.webp"));
    console.log("✓ Solar Longitude visual created successfully!");
  }

  // 3. Canada Time Zones Map: canada_timezones_nl_1790850817817.jpg
  const canadaSrc = path.join(BRAIN_DIR, "canada_timezones_nl_1790850817817.jpg");
  if (fs.existsSync(canadaSrc)) {
    console.log("Processing Canada Time Zones Artwork...");
    await sharp(canadaSrc)
      .resize(1200, 800, { fit: "cover", position: "center" })
      .webp({ quality: 86 })
      .toFile(path.join(ASSETS_DIR, "newfoundland-vs-canadian-time-zones.webp"));
    console.log("✓ Canada Time Zones visual created successfully!");
  }

  // 4. Newfoundland & Labrador Provincial Split (Ultra-Premium Glassmorphism + Cartographic styling)
  console.log("Generating Ultra-Premium Provincial Split Infographic...");
  const splitSvg = `
<svg width="1200" height="800" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background Radial Gradients -->
    <radialGradient id="oceanGlow" cx="65%" cy="50%" r="55%">
      <stop offset="0%" stop-color="#0c2547"/>
      <stop offset="60%" stop-color="#061224"/>
      <stop offset="100%" stop-color="#030814"/>
    </radialGradient>
    <linearGradient id="glassGradNl" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0369a1" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#082f49" stop-opacity="0.6"/>
    </linearGradient>
    <linearGradient id="glassGradLab" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e293b" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#0f172a" stop-opacity="0.8"/>
    </linearGradient>
    <linearGradient id="glassGradStraits" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4f46e5" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#1e1b4b" stop-opacity="0.7"/>
    </linearGradient>
    <linearGradient id="cyanGlow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="100%" stop-color="#06b6d4"/>
    </linearGradient>
    <linearGradient id="amberGlow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#fbbf24"/>
    </linearGradient>
    <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#000000" flood-opacity="0.6"/>
    </filter>
    <filter id="neonBlur" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <!-- Deep Ocean Background -->
  <rect width="1200" height="800" fill="url(#oceanGlow)"/>

  <!-- Bathymetric & Cartographic Grid Lines -->
  <g stroke="#1e3a5f" stroke-width="1" opacity="0.3">
    <circle cx="950" cy="400" r="180" fill="none" stroke-dasharray="4,6"/>
    <circle cx="950" cy="400" r="300" fill="none" stroke-dasharray="3,8"/>
    <line x1="60" y1="200" x2="1140" y2="200"/>
    <line x1="60" y1="400" x2="1140" y2="400"/>
    <line x1="60" y1="600" x2="1140" y2="600"/>
    <line x1="400" y1="60" x2="400" y2="740"/>
    <line x1="800" y1="60" x2="800" y2="740"/>
  </g>

  <!-- Top Category Pill -->
  <rect x="425" y="32" width="350" height="34" rx="17" fill="#0f172a" stroke="#0ea5e9" stroke-width="1.5"/>
  <text x="600" y="54" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="800" fill="#38bdf8" text-anchor="middle" letter-spacing="2">CANADIAN PROVINCIAL TIME ZONES</text>

  <!-- Main Headline -->
  <text x="600" y="104" font-family="system-ui, -apple-system, sans-serif" font-size="34" font-weight="900" fill="#ffffff" text-anchor="middle">Newfoundland &amp; Labrador Provincial Time Split</text>
  <text x="600" y="132" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="400" fill="#94a3b8" text-anchor="middle">One Province, Two Time Zones: How the Boundary Separates Island &amp; Mainland Labrador</text>

  <!-- Left Column: The 3 Regional Zones -->
  <!-- Card 1: The Island of Newfoundland -->
  <g transform="translate(60, 160)" filter="url(#cardShadow)">
    <rect width="640" height="175" rx="16" fill="url(#glassGradNl)" stroke="#0284c7" stroke-width="2"/>
    <!-- Glowing corner badge -->
    <rect x="24" y="20" width="220" height="26" rx="13" fill="#0369a1"/>
    <text x="134" y="38" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="800" fill="#ffffff" text-anchor="middle" letter-spacing="0.5">THE ISLAND OF NEWFOUNDLAND</text>
    
    <text x="590" y="44" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="900" fill="#38bdf8" text-anchor="end">UTC−3:30 / −2:30</text>
    
    <text x="24" y="80" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="800" fill="#ffffff">Newfoundland Time (NST / NDT)</text>
    <text x="24" y="106" font-family="system-ui, -apple-system, sans-serif" font-size="14" fill="#e0f2fe">
      Covers 100% of the island portion: St. John's, Corner Brook, Gander, Mount Pearl, Grand Falls-Windsor, and Gros Morne National Park.
    </text>
    <text x="24" y="132" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#38bdf8">
      Status: 30 minutes ahead of Atlantic Time • 1.5 hours ahead of Eastern Time
    </text>
    <rect x="24" y="146" width="310" height="18" rx="4" fill="#0c4a6e"/>
    <text x="32" y="159" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="700" fill="#7dd3fc">First place in North America to ring in the New Year</text>
  </g>

  <!-- Card 2: Mainland Labrador -->
  <g transform="translate(60, 355)" filter="url(#cardShadow)">
    <rect width="640" height="170" rx="16" fill="url(#glassGradLab)" stroke="#3b82f6" stroke-width="2"/>
    <rect x="24" y="20" width="180" height="26" rx="13" fill="#1e3a8a"/>
    <text x="114" y="38" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="800" fill="#93c5fd" text-anchor="middle" letter-spacing="0.5">MAINLAND LABRADOR</text>
    
    <text x="590" y="44" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="900" fill="#60a5fa" text-anchor="end">UTC−4 / −3</text>
    
    <text x="24" y="80" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="800" fill="#ffffff">Atlantic Time (AST / ADT)</text>
    <text x="24" y="106" font-family="system-ui, -apple-system, sans-serif" font-size="14" fill="#cbd5e1">
      Happy Valley-Goose Bay, Labrador City, Wabush, Churchill Falls, and Nain.
    </text>
    <text x="24" y="130" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="600" fill="#94a3b8">
      Why: Geographically and logistically aligned with northeastern Quebec and Atlantic Canada.
    </text>
  </g>

  <!-- Card 3: The Labrador Straits -->
  <g transform="translate(60, 545)" filter="url(#cardShadow)">
    <rect width="640" height="175" rx="16" fill="url(#glassGradStraits)" stroke="#818cf8" stroke-width="2"/>
    <rect x="24" y="20" width="270" height="26" rx="13" fill="#3730a3"/>
    <text x="159" y="38" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="800" fill="#c7d2fe" text-anchor="middle" letter-spacing="0.5">THE LABRADOR STRAITS EXCEPTION</text>
    
    <text x="590" y="44" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="900" fill="#a78bfa" text-anchor="end">UTC−3:30 / −2:30</text>
    
    <text x="24" y="80" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="800" fill="#ffffff">Newfoundland Time (Follows the Island)</text>
    <text x="24" y="106" font-family="system-ui, -apple-system, sans-serif" font-size="14" fill="#e0e7ff">
      Mainland communities from L'Anse-au-Clair north to Norman Bay (including Forteau and Red Bay).
    </text>
    <text x="24" y="130" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="600" fill="#c4b5fd">
      Connected via direct daily ferry across the Strait of Belle Isle to St. Barbe for schools and healthcare.
    </text>
  </g>

  <!-- Right Column: Cartographic Visual Display & Compass -->
  <g transform="translate(730, 160)" filter="url(#cardShadow)">
    <rect width="410" height="560" rx="20" fill="#081426" stroke="#1e3a5f" stroke-width="2"/>

    <!-- Map Title Badge -->
    <rect x="30" y="25" width="350" height="36" rx="18" fill="#0b1b36" stroke="#0284c7" stroke-width="1"/>
    <text x="205" y="48" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="800" fill="#38bdf8" text-anchor="middle">PROVINCIAL CARTOGRAPHIC PROFILE</text>

    <!-- Stylized Geography Graphics -->
    <!-- Mainland Labrador Block -->
    <g transform="translate(45, 80)">
      <path d="M 20 20 L 160 30 L 180 120 L 140 180 L 40 160 Z" fill="#1e293b" stroke="#3b82f6" stroke-width="2.5" opacity="0.9"/>
      <text x="85" y="90" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="800" fill="#93c5fd">LABRADOR</text>
      <text x="85" y="110" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="700" fill="#64748b">Atlantic Time</text>
      <text x="85" y="125" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="800" fill="#60a5fa">UTC−4</text>
      
      <!-- Goose Bay dot -->
      <circle cx="100" cy="140" r="4" fill="#60a5fa"/>
      <text x="110" y="144" font-family="system-ui, -apple-system, sans-serif" font-size="10" fill="#cbd5e1">Goose Bay</text>
    </g>

    <!-- Labrador Straits Strip -->
    <g transform="translate(190, 240)">
      <rect x="0" y="0" width="90" height="30" rx="6" fill="#4338ca" stroke="#818cf8" stroke-width="2"/>
      <text x="45" y="15" font-family="system-ui, -apple-system, sans-serif" font-size="9" font-weight="800" fill="#ffffff" text-anchor="middle">STRAITS (NT)</text>
      <text x="45" y="25" font-family="system-ui, -apple-system, sans-serif" font-size="8" font-weight="700" fill="#a78bfa" text-anchor="middle">UTC−3:30</text>
    </g>

    <!-- Ferry Line across Belle Isle -->
    <g transform="translate(235, 272)">
      <line x1="0" y1="0" x2="25" y2="40" stroke="#fbbf24" stroke-width="2.5" stroke-dasharray="4,4"/>
      <text x="35" y="25" font-family="system-ui, -apple-system, sans-serif" font-size="10" font-weight="800" fill="#fbbf24">Ferry</text>
    </g>

    <!-- Island of Newfoundland Shape -->
    <g transform="translate(180, 310)">
      <path d="M 60 10 L 140 25 L 175 90 L 160 160 L 90 170 L 30 110 Z" fill="#0369a1" stroke="#38bdf8" stroke-width="3" filter="url(#neonBlur)"/>
      <path d="M 60 10 L 140 25 L 175 90 L 160 160 L 90 170 L 30 110 Z" fill="#0284c7" stroke="#38bdf8" stroke-width="2.5"/>
      <text x="105" y="80" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="900" fill="#ffffff" text-anchor="middle">NEWFOUNDLAND</text>
      <text x="105" y="100" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="800" fill="#bae6fd" text-anchor="middle">UTC−3:30 (NST)</text>
      <text x="105" y="116" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="800" fill="#2dd4bf" text-anchor="middle">UTC−2:30 (NDT)</text>
      
      <!-- St. John's star -->
      <polygon points="160,115 162,121 168,121 163,125 165,131 160,127 155,131 157,125 152,121 158,121" fill="#fbbf24"/>
      <text x="175" y="125" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="800" fill="#fde047">St. John's</text>
    </g>

    <!-- Nautical Compass & Coordinate Grid -->
    <g transform="translate(60, 430)">
      <circle cx="45" cy="45" r="35" fill="none" stroke="#1e3a5f" stroke-width="1.5"/>
      <polygon points="45,15 50,45 45,40" fill="#f87171"/>
      <polygon points="45,15 40,45 45,40" fill="#ef4444"/>
      <polygon points="45,75 50,45 45,50" fill="#64748b"/>
      <polygon points="45,75 40,45 45,50" fill="#475569"/>
      <text x="45" y="10" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="800" fill="#ffffff" text-anchor="middle">N</text>
      <text x="100" y="38" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#cbd5e1">52.7° W Longitude</text>
      <text x="100" y="56" font-family="system-ui, -apple-system, sans-serif" font-size="11" fill="#64748b">Easternmost Edge of Canada</text>
    </g>
  </g>
</svg>
`;

  const splitPath = path.join(ASSETS_DIR, "newfoundland-and-labrador-timezone-split.webp");
  await sharp(Buffer.from(splitSvg))
    .resize(1200, 800)
    .webp({ quality: 88 })
    .toFile(splitPath);
  console.log("✓ Ultra-Premium Provincial Split visual created successfully!");

  console.log("\nAll visual assets successfully recreated at premium quality!");
}

main().catch(err => {
  console.error("Recreation error:", err);
  process.exit(1);
});
