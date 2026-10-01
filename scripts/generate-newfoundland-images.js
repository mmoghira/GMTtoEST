const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.join(__dirname, "..", "public", "assets");
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Helper to wrap SVG in buffer and render via sharp
async function renderSvgToWebpAndAvif(svgString, baseName, width, height, generateResponsive = false) {
  const svgBuffer = Buffer.from(svgString);

  if (generateResponsive) {
    // 1200w
    const out1200Webp = path.join(OUTPUT_DIR, `${baseName}-1200.webp`);
    const out1200Avif = path.join(OUTPUT_DIR, `${baseName}-1200.avif`);
    await sharp(svgBuffer).resize(1200, height).webp({ quality: 85 }).toFile(out1200Webp);
    await sharp(svgBuffer).resize(1200, height).avif({ quality: 70, effort: 4 }).toFile(out1200Avif);
    console.log(`✓ Generated ${baseName}-1200.webp and .avif`);

    // 600w
    const out600Webp = path.join(OUTPUT_DIR, `${baseName}-600.webp`);
    const out600Avif = path.join(OUTPUT_DIR, `${baseName}-600.avif`);
    const h600 = Math.round(height * (600 / 1200));
    await sharp(svgBuffer).resize(600, h600).webp({ quality: 85 }).toFile(out600Webp);
    await sharp(svgBuffer).resize(600, h600).avif({ quality: 70, effort: 4 }).toFile(out600Avif);
    console.log(`✓ Generated ${baseName}-600.webp and .avif`);
  } else {
    const outWebp = path.join(OUTPUT_DIR, `${baseName}.webp`);
    await sharp(svgBuffer).resize(width, height).webp({ quality: 85 }).toFile(outWebp);
    console.log(`✓ Generated ${baseName}.webp`);
  }
}

// 1. Hero Image (1200x630)
const heroSvg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#050d1a"/>
      <stop offset="50%" stop-color="#0c192e"/>
      <stop offset="100%" stop-color="#081120"/>
    </linearGradient>
    <linearGradient id="cardGradNst" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#122543"/>
      <stop offset="100%" stop-color="#0c182e"/>
    </linearGradient>
    <linearGradient id="cardGradCompare" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#16223b"/>
      <stop offset="100%" stop-color="#0d1629"/>
    </linearGradient>
    <linearGradient id="accentTeal" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#06b6d4"/>
      <stop offset="100%" stop-color="#14b8a6"/>
    </linearGradient>
    <linearGradient id="accentAmber" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#fbbf24"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bgGrad)"/>

  <!-- Subtle Coordinate / Map Grid -->
  <g stroke="#1e293b" stroke-width="1" opacity="0.35">
    <line x1="0" y1="105" x2="1200" y2="105"/>
    <line x1="0" y1="210" x2="1200" y2="210"/>
    <line x1="0" y1="315" x2="1200" y2="315"/>
    <line x1="0" y1="420" x2="1200" y2="420"/>
    <line x1="0" y1="525" x2="1200" y2="525"/>
    <line x1="200" y1="0" x2="200" y2="630"/>
    <line x1="400" y1="0" x2="400" y2="630"/>
    <line x1="600" y1="0" x2="600" y2="630"/>
    <line x1="800" y1="0" x2="800" y2="630"/>
    <line x1="1000" y1="0" x2="1000" y2="630"/>
  </g>

  <!-- Header Pill Badge -->
  <rect x="440" y="38" width="320" height="32" rx="16" fill="#1e293b" stroke="#06b6d4" stroke-width="1.5"/>
  <text x="600" y="59" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#38bdf8" text-anchor="middle" letter-spacing="1.5">CANADIAN TIME ZONES EXPLAINED</text>

  <!-- Header Title -->
  <text x="600" y="112" font-family="system-ui, -apple-system, sans-serif" font-size="42" font-weight="800" fill="#ffffff" text-anchor="middle">Newfoundland Time Zone (NST / NDT)</text>
  <text x="600" y="142" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="400" fill="#94a3b8" text-anchor="middle">Why Canada Has a 30-Minute Offset • UTC−3:30 (Winter) &amp; UTC−2:30 (Summer)</text>

  <!-- Left Card: Newfoundland Time Details -->
  <g transform="translate(80, 175)">
    <rect width="450" height="345" rx="16" fill="url(#cardGradNst)" stroke="#0284c7" stroke-width="2"/>
    <rect x="24" y="24" width="180" height="28" rx="14" fill="#0369a1" opacity="0.35"/>
    <text x="114" y="43" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#38bdf8" text-anchor="middle">NEWFOUNDLAND TIME</text>

    <!-- Zone code & offset -->
    <text x="24" y="96" font-family="system-ui, -apple-system, sans-serif" font-size="38" font-weight="800" fill="#f8fafc">NST</text>
    <text x="120" y="85" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="800" fill="#38bdf8">UTC−3:30</text>
    <text x="120" y="105" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="500" fill="#94a3b8">Standard Time (Winter: Nov–Mar)</text>

    <text x="24" y="142" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="700" fill="#cbd5e1">NDT</text>
    <text x="120" y="136" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="700" fill="#2dd4bf">UTC−2:30</text>
    <text x="235" y="136" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="500" fill="#94a3b8">Daylight Time (Mar–Nov)</text>

    <!-- Divider -->
    <line x1="24" y1="165" x2="426" y2="165" stroke="#1e293b" stroke-width="1.5"/>

    <!-- Clock / Time Example -->
    <rect x="24" y="185" width="402" height="68" rx="12" fill="#071120" stroke="#1e293b" stroke-width="1"/>
    <text x="44" y="226" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="800" fill="#38bdf8">12:00 PM</text>
    <text x="44" y="243" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="500" fill="#64748b">Newfoundland Reference Noon</text>
    <rect x="250" y="200" width="162" height="38" rx="8" fill="#1e293b"/>
    <text x="331" y="224" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#f8fafc" text-anchor="middle">Canada's Earliest Clock</text>

    <!-- Hubs -->
    <text x="24" y="285" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#64748b">KEY POPULATION HUBS</text>
    <text x="24" y="310" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="500" fill="#cbd5e1">St. John's • Corner Brook • Gander • Grand Falls-Windsor</text>
  </g>

  <!-- Middle Connector & Offset Badge -->
  <g transform="translate(540, 275)">
    <rect x="0" y="0" width="120" height="90" rx="16" fill="#0f172a" stroke="url(#accentTeal)" stroke-width="2"/>
    <text x="60" y="30" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="800" fill="#38bdf8" text-anchor="middle">+30 MIN</text>
    <text x="60" y="48" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="600" fill="#94a3b8" text-anchor="middle">vs Atlantic (AST)</text>
    <line x1="15" y1="56" x2="105" y2="56" stroke="#1e293b" stroke-width="1"/>
    <text x="60" y="72" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="800" fill="#2dd4bf" text-anchor="middle">+90 MIN</text>
    <text x="60" y="85" font-family="system-ui, -apple-system, sans-serif" font-size="10" font-weight="600" fill="#94a3b8" text-anchor="middle">vs Eastern (EST)</text>
  </g>

  <!-- Right Card: Time Zone Comparison -->
  <g transform="translate(670, 175)">
    <rect width="450" height="345" rx="16" fill="url(#cardGradCompare)" stroke="#3b82f6" stroke-width="2"/>
    <rect x="24" y="24" width="200" height="28" rx="14" fill="#1d4ed8" opacity="0.3"/>
    <text x="124" y="43" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#60a5fa" text-anchor="middle">OFFSETS AT A GLANCE</text>

    <!-- Comparison items -->
    <g transform="translate(24, 75)">
      <rect width="402" height="48" rx="8" fill="#0b1324" stroke="#1e293b"/>
      <text x="16" y="28" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="700" fill="#f8fafc">Atlantic Time (AST/ADT)</text>
      <text x="385" y="29" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="800" fill="#38bdf8" text-anchor="end">30 min behind NL</text>
      <text x="16" y="42" font-family="system-ui, -apple-system, sans-serif" font-size="11" fill="#64748b">Halifax, Moncton, Charlottetown</text>
    </g>

    <g transform="translate(24, 133)">
      <rect width="402" height="48" rx="8" fill="#0b1324" stroke="#1e293b"/>
      <text x="16" y="28" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="700" fill="#f8fafc">Eastern Time (EST/EDT)</text>
      <text x="385" y="29" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="800" fill="#60a5fa" text-anchor="end">1 hr 30 min behind NL</text>
      <text x="16" y="42" font-family="system-ui, -apple-system, sans-serif" font-size="11" fill="#64748b">Toronto, Montreal, New York</text>
    </g>

    <g transform="translate(24, 191)">
      <rect width="402" height="48" rx="8" fill="#0b1324" stroke="#1e293b"/>
      <text x="16" y="28" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="700" fill="#f8fafc">Central Time (CST/CDT)</text>
      <text x="385" y="29" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="800" fill="#a78bfa" text-anchor="end">2 hr 30 min behind NL</text>
      <text x="16" y="42" font-family="system-ui, -apple-system, sans-serif" font-size="11" fill="#64748b">Winnipeg, Chicago, Dallas</text>
    </g>

    <g transform="translate(24, 249)">
      <rect width="402" height="48" rx="8" fill="#0b1324" stroke="#1e293b"/>
      <text x="16" y="28" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="700" fill="#f8fafc">Pacific Time (PST/PDT)</text>
      <text x="385" y="29" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="800" fill="#f43f5e" text-anchor="end">4 hr 30 min behind NL</text>
      <text x="16" y="42" font-family="system-ui, -apple-system, sans-serif" font-size="11" fill="#64748b">Vancouver, Victoria, Seattle</text>
    </g>
  </g>

  <!-- Bottom Conversion Bar -->
  <g transform="translate(80, 550)">
    <rect width="1040" height="52" rx="10" fill="#071120" stroke="#1e293b" stroke-width="1.5"/>
    <text x="520" y="32" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="600" fill="#e2e8f0" text-anchor="middle">
      <tspan fill="#38bdf8" font-weight="800">Newfoundland → Eastern:</tspan> Subtract 1.5 Hours (11:30 AM NT = 10:00 AM ET)  •  <tspan fill="#2dd4bf" font-weight="800">Eastern → Newfoundland:</tspan> Add 1.5 Hours (1:00 PM ET = 2:30 PM NT)
    </text>
  </g>
</svg>
`;

// 2. Solar Longitude Infographic (1200x800)
const solarLongitudeSvg = `
<svg width="1200" height="800" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGradSolar" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#050a14"/>
      <stop offset="50%" stop-color="#0c172a"/>
      <stop offset="100%" stop-color="#07101f"/>
    </linearGradient>
    <linearGradient id="sunGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#ef4444"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="800" fill="url(#bgGradSolar)"/>

  <!-- Title -->
  <text x="600" y="60" font-family="system-ui, -apple-system, sans-serif" font-size="34" font-weight="800" fill="#ffffff" text-anchor="middle">The Solar Astronomy Behind Newfoundland's 30-Minute Offset</text>
  <text x="600" y="95" font-family="system-ui, -apple-system, sans-serif" font-size="17" font-weight="400" fill="#94a3b8" text-anchor="middle">Why 52.7° West Longitude Naturally Creates a UTC−3:30 Standard Time</text>

  <!-- Math Formula Card -->
  <g transform="translate(80, 130)">
    <rect width="1040" height="110" rx="14" fill="#0f172a" stroke="#0284c7" stroke-width="1.5"/>
    <text x="30" y="38" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="800" fill="#38bdf8">THE MATHEMATICAL FORMULA OF SOLAR TIME</text>
    <text x="30" y="70" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="600" fill="#f8fafc">
      Earth rotates 360° in 24 Hours = <tspan fill="#38bdf8" font-weight="800">15° of Longitude per Hour</tspan> (or 1° every 4 minutes)
    </text>
    <text x="30" y="96" font-family="system-ui, -apple-system, sans-serif" font-size="14" fill="#94a3b8">
      St. John's Longitude: 52.71° W  ➔  52.71° ÷ 15° = <tspan fill="#2dd4bf" font-weight="700">3.514 Hours (3 hours, 30 minutes, 50 seconds)</tspan> west of Greenwich!
    </text>
  </g>

  <!-- 3 Options Comparison -->
  <g transform="translate(80, 265)">
    <!-- Option A: UTC-4 (Atlantic) -->
    <g transform="translate(0, 0)">
      <rect width="330" height="340" rx="14" fill="#111827" stroke="#334155" stroke-width="1.5"/>
      <rect x="0" y="0" width="330" height="42" rx="12" fill="#1e293b"/>
      <text x="165" y="27" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="800" fill="#94a3b8" text-anchor="middle">OPTION 1: ATLANTIC TIME</text>
      <text x="165" y="80" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="800" fill="#f8fafc" text-anchor="middle">UTC−4</text>
      <text x="165" y="105" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="600" fill="#64748b" text-anchor="middle">Centered at 60° W Longitude</text>
      
      <circle cx="165" cy="165" r="35" fill="#1e293b" stroke="#64748b" stroke-width="2"/>
      <text x="165" y="162" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#f8fafc" text-anchor="middle">Solar Noon</text>
      <text x="165" y="180" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="800" fill="#f87171" text-anchor="middle">12:30 PM</text>

      <text x="20" y="235" font-family="system-ui, -apple-system, sans-serif" font-size="13" fill="#cbd5e1">❌ Clocks 30 min behind sun.</text>
      <text x="20" y="260" font-family="system-ui, -apple-system, sans-serif" font-size="13" fill="#cbd5e1">❌ Sun sets unnaturally early in winter.</text>
      <text x="20" y="285" font-family="system-ui, -apple-system, sans-serif" font-size="13" fill="#cbd5e1">❌ Evening daylight wasted.</text>
    </g>

    <!-- Option B: UTC-3:30 (Newfoundland Choice) -->
    <g transform="translate(355, 0)">
      <rect width="330" height="340" rx="14" fill="#0b172b" stroke="#0284c7" stroke-width="2.5"/>
      <rect x="0" y="0" width="330" height="42" rx="12" fill="#0369a1"/>
      <text x="165" y="27" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="900" fill="#ffffff" text-anchor="middle">★ NEWFOUNDLAND TIME</text>
      <text x="165" y="80" font-family="system-ui, -apple-system, sans-serif" font-size="32" font-weight="900" fill="#38bdf8" text-anchor="middle">UTC−3:30</text>
      <text x="165" y="105" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="600" fill="#38bdf8" text-anchor="middle">Centered at 52.5° W Longitude</text>
      
      <circle cx="165" cy="165" r="38" fill="#082f49" stroke="#38bdf8" stroke-width="2.5"/>
      <text x="165" y="162" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#f8fafc" text-anchor="middle">Solar Noon</text>
      <text x="165" y="181" font-family="system-ui, -apple-system, sans-serif" font-size="17" font-weight="900" fill="#34d399" text-anchor="middle">12:01 PM</text>

      <text x="20" y="235" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="600" fill="#f8fafc">✓ Near-perfect solar alignment!</text>
      <text x="20" y="260" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="600" fill="#f8fafc">✓ Clock matches the human circadian rhythm.</text>
      <text x="20" y="285" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="600" fill="#f8fafc">✓ Preserves morning &amp; evening light.</text>
      <text x="20" y="310" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#38bdf8">Adopted formally in 1935</text>
    </g>

    <!-- Option C: UTC-3 (Greenland/Atlantic) -->
    <g transform="translate(710, 0)">
      <rect width="330" height="340" rx="14" fill="#111827" stroke="#334155" stroke-width="1.5"/>
      <rect x="0" y="0" width="330" height="42" rx="12" fill="#1e293b"/>
      <text x="165" y="27" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="800" fill="#94a3b8" text-anchor="middle">OPTION 3: WEST GREENLAND</text>
      <text x="165" y="80" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="800" fill="#f8fafc" text-anchor="middle">UTC−3</text>
      <text x="165" y="105" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="600" fill="#64748b" text-anchor="middle">Centered at 45° W Longitude</text>
      
      <circle cx="165" cy="165" r="35" fill="#1e293b" stroke="#64748b" stroke-width="2"/>
      <text x="165" y="162" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#f8fafc" text-anchor="middle">Solar Noon</text>
      <text x="165" y="180" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="800" fill="#f87171" text-anchor="middle">11:30 AM</text>

      <text x="20" y="235" font-family="system-ui, -apple-system, sans-serif" font-size="13" fill="#cbd5e1">❌ Clocks 30 min ahead of sun.</text>
      <text x="20" y="260" font-family="system-ui, -apple-system, sans-serif" font-size="13" fill="#cbd5e1">❌ Brutally dark winter mornings.</text>
      <text x="20" y="285" font-family="system-ui, -apple-system, sans-serif" font-size="13" fill="#cbd5e1">❌ Schoolchildren commuting in pitch black.</text>
    </g>
  </g>

  <!-- Bottom Historical Context Card -->
  <g transform="translate(80, 630)">
    <rect width="1040" height="120" rx="14" fill="#0f172a" stroke="#1e293b" stroke-width="1.5"/>
    <text x="30" y="35" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="800" fill="#f59e0b">HISTORICAL INDEPENDENCE &amp; 1949 CONFEDERATION:</text>
    <text x="30" y="62" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="400" fill="#e2e8f0">
      When Sir Sandford Fleming designed world time zones in the 1880s, Newfoundland was an independent British Dominion, not part of Canada. It set its own laws based on St. John's solar time.
    </text>
    <text x="30" y="90" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="400" fill="#94a3b8">
      When Newfoundland joined Canada in 1949 as the 10th province, its citizens and commercial institutions chose to retain their custom time zone to protect daylight patterns and preserve local identity.
    </text>
  </g>
</svg>
`;

// 3. Canada Time Zones Comparison (1200x800)
const canadaZonesSvg = `
<svg width="1200" height="800" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGradCan" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#060c18"/>
      <stop offset="100%" stop-color="#0d1829"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="800" fill="url(#bgGradCan)"/>

  <!-- Title -->
  <text x="600" y="60" font-family="system-ui, -apple-system, sans-serif" font-size="34" font-weight="800" fill="#ffffff" text-anchor="middle">Newfoundland vs All Canadian Time Zones</text>
  <text x="600" y="92" font-family="system-ui, -apple-system, sans-serif" font-size="17" font-weight="400" fill="#94a3b8" text-anchor="middle">Across Canada's Six Standard Time Zones: Exact Offsets and Real-Time Example</text>

  <!-- Table Header -->
  <g transform="translate(80, 130)">
    <rect width="1040" height="46" rx="8" fill="#1e293b"/>
    <text x="110" y="29" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="800" fill="#38bdf8" text-anchor="middle">CANADIAN TIME ZONE</text>
    <text x="280" y="29" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="800" fill="#94a3b8" text-anchor="middle">WINTER (STD)</text>
    <text x="410" y="29" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="800" fill="#2dd4bf" text-anchor="middle">SUMMER (DST)</text>
    <text x="590" y="29" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="800" fill="#fbbf24" text-anchor="middle">GAP FROM NEWFOUNDLAND</text>
    <text x="890" y="29" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="800" fill="#f8fafc" text-anchor="middle">WHEN IT'S 12:30 PM IN ST. JOHN'S</text>

    <!-- Row 1: Newfoundland -->
    <g transform="translate(0, 54)">
      <rect width="1040" height="54" rx="6" fill="#082f49" stroke="#0284c7" stroke-width="1.5"/>
      <text x="110" y="33" font-family="system-ui, -apple-system, sans-serif" font-size="17" font-weight="900" fill="#38bdf8" text-anchor="middle">Newfoundland (NT)</text>
      <text x="280" y="33" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="700" fill="#f8fafc" text-anchor="middle">UTC−3:30 (NST)</text>
      <text x="410" y="33" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="700" fill="#2dd4bf" text-anchor="middle">UTC−2:30 (NDT)</text>
      <text x="590" y="33" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="800" fill="#38bdf8" text-anchor="middle">Baseline Reference</text>
      <text x="890" y="33" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="900" fill="#ffffff" text-anchor="middle">12:30 PM (Noon)</text>
    </g>

    <!-- Row 2: Atlantic -->
    <g transform="translate(0, 114)">
      <rect width="1040" height="54" rx="6" fill="#0f172a" stroke="#1e293b" stroke-width="1"/>
      <text x="110" y="33" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="700" fill="#f8fafc" text-anchor="middle">Atlantic (AT)</text>
      <text x="280" y="33" font-family="system-ui, -apple-system, sans-serif" font-size="15" fill="#cbd5e1" text-anchor="middle">UTC−4 (AST)</text>
      <text x="410" y="33" font-family="system-ui, -apple-system, sans-serif" font-size="15" fill="#cbd5e1" text-anchor="middle">UTC−3 (ADT)</text>
      <text x="590" y="33" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="700" fill="#f87171" text-anchor="middle">−30 Minutes (Behind NL)</text>
      <text x="890" y="33" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="700" fill="#cbd5e1" text-anchor="middle">12:00 PM (Halifax)</text>
    </g>

    <!-- Row 3: Eastern -->
    <g transform="translate(0, 174)">
      <rect width="1040" height="54" rx="6" fill="#0f172a" stroke="#1e293b" stroke-width="1"/>
      <text x="110" y="33" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="700" fill="#f8fafc" text-anchor="middle">Eastern (ET)</text>
      <text x="280" y="33" font-family="system-ui, -apple-system, sans-serif" font-size="15" fill="#cbd5e1" text-anchor="middle">UTC−5 (EST)</text>
      <text x="410" y="33" font-family="system-ui, -apple-system, sans-serif" font-size="15" fill="#cbd5e1" text-anchor="middle">UTC−4 (EDT)</text>
      <text x="590" y="33" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="700" fill="#f87171" text-anchor="middle">−1 Hour 30 Min</text>
      <text x="890" y="33" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="700" fill="#cbd5e1" text-anchor="middle">11:00 AM (Toronto)</text>
    </g>

    <!-- Row 4: Central -->
    <g transform="translate(0, 234)">
      <rect width="1040" height="54" rx="6" fill="#0f172a" stroke="#1e293b" stroke-width="1"/>
      <text x="110" y="33" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="700" fill="#f8fafc" text-anchor="middle">Central (CT)</text>
      <text x="280" y="33" font-family="system-ui, -apple-system, sans-serif" font-size="15" fill="#cbd5e1" text-anchor="middle">UTC−6 (CST)</text>
      <text x="410" y="33" font-family="system-ui, -apple-system, sans-serif" font-size="15" fill="#cbd5e1" text-anchor="middle">UTC−5 (CDT)</text>
      <text x="590" y="33" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="700" fill="#f87171" text-anchor="middle">−2 Hours 30 Min</text>
      <text x="890" y="33" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="700" fill="#cbd5e1" text-anchor="middle">10:00 AM (Winnipeg)</text>
    </g>

    <!-- Row 5: Mountain -->
    <g transform="translate(0, 294)">
      <rect width="1040" height="54" rx="6" fill="#0f172a" stroke="#1e293b" stroke-width="1"/>
      <text x="110" y="33" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="700" fill="#f8fafc" text-anchor="middle">Mountain (MT)</text>
      <text x="280" y="33" font-family="system-ui, -apple-system, sans-serif" font-size="15" fill="#cbd5e1" text-anchor="middle">UTC−7 (MST)</text>
      <text x="410" y="33" font-family="system-ui, -apple-system, sans-serif" font-size="15" fill="#cbd5e1" text-anchor="middle">UTC−6 (MDT)</text>
      <text x="590" y="33" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="700" fill="#f87171" text-anchor="middle">−3 Hours 30 Min</text>
      <text x="890" y="33" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="700" fill="#cbd5e1" text-anchor="middle">9:00 AM (Calgary)</text>
    </g>

    <!-- Row 6: Pacific -->
    <g transform="translate(0, 354)">
      <rect width="1040" height="54" rx="6" fill="#0f172a" stroke="#1e293b" stroke-width="1"/>
      <text x="110" y="33" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="700" fill="#f8fafc" text-anchor="middle">Pacific (PT)</text>
      <text x="280" y="33" font-family="system-ui, -apple-system, sans-serif" font-size="15" fill="#cbd5e1" text-anchor="middle">UTC−8 (PST)</text>
      <text x="410" y="33" font-family="system-ui, -apple-system, sans-serif" font-size="15" fill="#cbd5e1" text-anchor="middle">UTC−7 (PDT)</text>
      <text x="590" y="33" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="700" fill="#f87171" text-anchor="middle">−4 Hours 30 Min</text>
      <text x="890" y="33" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="700" fill="#cbd5e1" text-anchor="middle">8:00 AM (Vancouver)</text>
    </g>
  </g>

  <!-- Bottom Explanatory Banner -->
  <g transform="translate(80, 580)">
    <rect width="1040" height="160" rx="14" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
    <text x="30" y="35" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="800" fill="#38bdf8">CANADIAN SCHEDULING TAKEAWAYS:</text>
    <text x="30" y="65" font-family="system-ui, -apple-system, sans-serif" font-size="14" fill="#e2e8f0">
      • <tspan font-weight="700" fill="#ffffff">The 4.5-Hour Cross-Canada Span:</tspan> St. John's is 4.5 hours ahead of Vancouver. A morning 9:00 AM meeting in Vancouver happens at 1:30 PM in Newfoundland.
    </text>
    <text x="30" y="95" font-family="system-ui, -apple-system, sans-serif" font-size="14" fill="#e2e8f0">
      • <tspan font-weight="700" fill="#ffffff">DST Synchrony with Eastern/Atlantic:</tspan> Ontario, Quebec, Nova Scotia, and Newfoundland change clocks on the exact same dates, preserving constant gaps year-round.
    </text>
    <text x="30" y="125" font-family="system-ui, -apple-system, sans-serif" font-size="14" fill="#94a3b8">
      • <tspan font-weight="700" fill="#fbbf24">Provincial Exceptions:</tspan> Saskatchewan stays on permanent CST (UTC−6) and Yukon on permanent MST (UTC−7), creating an extra hour difference in summer.
    </text>
  </g>
</svg>
`;

// 4. Newfoundland & Labrador Split (1200x800)
const nlSplitSvg = `
<svg width="1200" height="800" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGradSplit" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#050a14"/>
      <stop offset="100%" stop-color="#0b172a"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="800" fill="url(#bgGradSplit)"/>

  <!-- Title -->
  <text x="600" y="60" font-family="system-ui, -apple-system, sans-serif" font-size="34" font-weight="800" fill="#ffffff" text-anchor="middle">Newfoundland &amp; Labrador Provincial Time Split</text>
  <text x="600" y="92" font-family="system-ui, -apple-system, sans-serif" font-size="17" font-weight="400" fill="#94a3b8" text-anchor="middle">One Province, Two Time Zones: Where the Boundary Lies Between Island and Mainland</text>

  <!-- Section 1: The Island -->
  <g transform="translate(80, 130)">
    <rect width="1040" height="150" rx="14" fill="#082f49" stroke="#0284c7" stroke-width="2"/>
    <rect x="24" y="20" width="220" height="28" rx="14" fill="#0369a1"/>
    <text x="134" y="39" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="800" fill="#ffffff" text-anchor="middle">THE ISLAND OF NEWFOUNDLAND</text>
    
    <text x="24" y="80" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="900" fill="#38bdf8">Newfoundland Time (NST: UTC−3:30 / NDT: UTC−2:30)</text>
    <text x="24" y="108" font-family="system-ui, -apple-system, sans-serif" font-size="15" fill="#e2e8f0">
      Covers 100% of the island portion: St. John's, Corner Brook, Gander, Grand Falls-Windsor, Conception Bay South, and Gros Morne.
    </text>
    <text x="24" y="130" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="600" fill="#7dd3fc">
      Status: 30 minutes ahead of Atlantic Time, 1.5 hours ahead of Eastern Time.
    </text>
  </g>

  <!-- Section 2: Most of Labrador -->
  <g transform="translate(80, 305)">
    <rect width="1040" height="150" rx="14" fill="#111827" stroke="#3b82f6" stroke-width="2"/>
    <rect x="24" y="20" width="180" height="28" rx="14" fill="#1e3a8a"/>
    <text x="114" y="39" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="800" fill="#ffffff" text-anchor="middle">MOST OF LABRADOR</text>
    
    <text x="24" y="80" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="900" fill="#60a5fa">Atlantic Time (AST: UTC−4 / ADT: UTC−3)</text>
    <text x="24" y="108" font-family="system-ui, -apple-system, sans-serif" font-size="15" fill="#e2e8f0">
      Covers major mainland Labrador centres: Happy Valley-Goose Bay, Labrador City, Wabush, Churchill Falls, and Nain.
    </text>
    <text x="24" y="130" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="600" fill="#93c5fd">
      Why: Geographically and logistically aligned with northeastern Quebec and the Atlantic mainland corridor.
    </text>
  </g>

  <!-- Section 3: The Labrador Straits Exception -->
  <g transform="translate(80, 480)">
    <rect width="1040" height="165" rx="14" fill="#1e1b4b" stroke="#8b5cf6" stroke-width="2"/>
    <rect x="24" y="20" width="280" height="28" rx="14" fill="#4c1d95"/>
    <text x="164" y="39" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="800" fill="#ffffff" text-anchor="middle">THE LABRADOR STRAITS EXCEPTION</text>
    
    <text x="24" y="80" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="900" fill="#a78bfa">Newfoundland Time (NST: UTC−3:30 / NDT: UTC−2:30)</text>
    <text x="24" y="108" font-family="system-ui, -apple-system, sans-serif" font-size="15" fill="#e2e8f0">
      Mainland communities in southeastern Labrador from L'Anse-au-Clair north to Norman Bay (including Forteau and Red Bay).
    </text>
    <text x="24" y="132" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600" fill="#c4b5fd">
      Reason: Linked directly by daily ferry across the Strait of Belle Isle to the island (St. Barbe) for commerce, healthcare, and schools.
    </text>
  </g>

  <!-- Bottom Tip -->
  <g transform="translate(80, 670)">
    <rect width="1040" height="85" rx="12" fill="#0f172a" stroke="#eab308" stroke-width="1.5"/>
    <text x="30" y="32" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="800" fill="#facc15">CRITICAL TRAVEL &amp; LOGISTICS RULE:</text>
    <text x="30" y="58" font-family="system-ui, -apple-system, sans-serif" font-size="14" fill="#e2e8f0">
      Never assume "Newfoundland and Labrador" uses a single time zone. If your flight or meeting is in Labrador City or Goose Bay, use <tspan font-weight="700" fill="#ffffff">Atlantic Time</tspan>. If it's in St. John's or Forteau, use <tspan font-weight="700" fill="#38bdf8">Newfoundland Time (+30 min)</tspan>!
    </text>
  </g>
</svg>
`;

async function main() {
  console.log("Generating Newfoundland custom visuals via Sharp...\n");

  // Hero: generate responsive 1200w and 600w WebP and AVIF
  await renderSvgToWebpAndAvif(heroSvg, "newfoundland-time-zone-hero", 1200, 630, true);

  // Infographic 2: Solar Longitude
  await renderSvgToWebpAndAvif(solarLongitudeSvg, "newfoundland-solar-time-longitude-infographic", 1200, 800, false);

  // Infographic 3: Canada Time Zones Comparison
  await renderSvgToWebpAndAvif(canadaZonesSvg, "newfoundland-vs-canadian-time-zones", 1200, 800, false);

  // Infographic 4: Newfoundland & Labrador Split
  await renderSvgToWebpAndAvif(nlSplitSvg, "newfoundland-and-labrador-timezone-split", 1200, 800, false);

  console.log("\nAll Newfoundland visual assets generated successfully!");
}

main().catch(err => {
  console.error("Image generation error:", err);
  process.exit(1);
});
