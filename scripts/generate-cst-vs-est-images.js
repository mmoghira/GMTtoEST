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
      <stop offset="0%" stop-color="#070b14"/>
      <stop offset="50%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#0a101f"/>
    </linearGradient>
    <linearGradient id="cardGradCst" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#111f38"/>
      <stop offset="100%" stop-color="#0d1829"/>
    </linearGradient>
    <linearGradient id="cardGradEst" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#162238"/>
      <stop offset="100%" stop-color="#0e1726"/>
    </linearGradient>
    <linearGradient id="accentCyan" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="100%" stop-color="#2dd4bf"/>
    </linearGradient>
    <linearGradient id="accentBlue" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#60a5fa"/>
      <stop offset="100%" stop-color="#818cf8"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bgGrad)"/>

  <!-- Subtle Grid lines -->
  <g stroke="#1e293b" stroke-width="1" opacity="0.4">
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
  <rect x="475" y="38" width="250" height="32" rx="16" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
  <text x="600" y="59" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#38bdf8" text-anchor="middle" letter-spacing="1.5">TIME ZONE COMPARISON</text>

  <!-- Header Title -->
  <text x="600" y="112" font-family="system-ui, -apple-system, sans-serif" font-size="44" font-weight="800" fill="#ffffff" text-anchor="middle">CST vs EST: What's the Difference?</text>
  <text x="600" y="142" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="400" fill="#94a3b8" text-anchor="middle">Central Time (UTC−6) vs Eastern Time (UTC−5) • 1-Hour Time Difference</text>

  <!-- Left Card: Central Time (CST) -->
  <g transform="translate(80, 175)">
    <rect width="440" height="345" rx="16" fill="url(#cardGradCst)" stroke="#0284c7" stroke-width="2"/>
    <rect x="24" y="24" width="130" height="28" rx="14" fill="#0369a1" opacity="0.3"/>
    <text x="89" y="43" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#38bdf8" text-anchor="middle">CENTRAL TIME</text>

    <!-- Zone code & offset -->
    <text x="24" y="96" font-family="system-ui, -apple-system, sans-serif" font-size="40" font-weight="800" fill="#f8fafc">CST</text>
    <text x="120" y="85" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="700" fill="#38bdf8">UTC−6</text>
    <text x="120" y="105" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="500" fill="#64748b">Standard Time (Winter)</text>

    <text x="24" y="142" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="700" fill="#94a3b8">CDT</text>
    <text x="80" y="137" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="700" fill="#2dd4bf">UTC−5</text>
    <text x="145" y="137" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="500" fill="#64748b">Daylight Time (Summer)</text>

    <!-- Divider -->
    <line x1="24" y1="165" x2="416" y2="165" stroke="#1e293b" stroke-width="1.5"/>

    <!-- Clock / Time Example -->
    <rect x="24" y="185" width="392" height="68" rx="12" fill="#0b1324" stroke="#1e293b" stroke-width="1"/>
    <text x="44" y="226" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="800" fill="#38bdf8">11:00 AM</text>
    <text x="44" y="243" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="500" fill="#64748b">Central Reference Hour</text>
    <rect x="270" y="200" width="130" height="38" rx="8" fill="#1e293b"/>
    <text x="335" y="224" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#f8fafc" text-anchor="middle">1 Hr Behind ET</text>

    <!-- Key Cities -->
    <text x="24" y="285" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#64748b">MAJOR METROPOLITAN HUBS</text>
    <text x="24" y="310" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="500" fill="#cbd5e1">Chicago • Dallas • Houston • Minneapolis • Winnipeg</text>
  </g>

  <!-- Middle Connector & +1 Hour Badge -->
  <g transform="translate(520, 290)">
    <!-- Arrow line -->
    <line x1="15" y1="40" x2="145" y2="40" stroke="#38bdf8" stroke-width="3" stroke-dasharray="6,4"/>
    <polygon points="145,40 135,33 135,47" fill="#38bdf8"/>
    
    <rect x="25" y="12" width="110" height="56" rx="28" fill="#0f172a" stroke="url(#accentCyan)" stroke-width="2.5"/>
    <text x="80" y="38" font-family="system-ui, -apple-system, sans-serif" font-size="17" font-weight="900" fill="#38bdf8" text-anchor="middle">+1 HOUR</text>
    <text x="80" y="54" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="700" fill="#94a3b8" text-anchor="middle">EAST IS AHEAD</text>
  </g>

  <!-- Right Card: Eastern Time (EST) -->
  <g transform="translate(680, 175)">
    <rect width="440" height="345" rx="16" fill="url(#cardGradEst)" stroke="#4f46e5" stroke-width="2"/>
    <rect x="24" y="24" width="130" height="28" rx="14" fill="#4338ca" opacity="0.3"/>
    <text x="89" y="43" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#818cf8" text-anchor="middle">EASTERN TIME</text>

    <!-- Zone code & offset -->
    <text x="24" y="96" font-family="system-ui, -apple-system, sans-serif" font-size="40" font-weight="800" fill="#f8fafc">EST</text>
    <text x="120" y="85" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="700" fill="#818cf8">UTC−5</text>
    <text x="120" y="105" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="500" fill="#64748b">Standard Time (Winter)</text>

    <text x="24" y="142" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="700" fill="#94a3b8">EDT</text>
    <text x="80" y="137" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="700" fill="#a78bfa">UTC−4</text>
    <text x="145" y="137" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="500" fill="#64748b">Daylight Time (Summer)</text>

    <!-- Divider -->
    <line x1="24" y1="165" x2="416" y2="165" stroke="#1e293b" stroke-width="1.5"/>

    <!-- Clock / Time Example -->
    <rect x="24" y="185" width="392" height="68" rx="12" fill="#0b1324" stroke="#1e293b" stroke-width="1"/>
    <text x="44" y="226" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="800" fill="#818cf8">12:00 PM</text>
    <text x="44" y="243" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="500" fill="#64748b">Eastern Reference Hour (Noon)</text>
    <rect x="270" y="200" width="130" height="38" rx="8" fill="#1e293b"/>
    <text x="335" y="224" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#f8fafc" text-anchor="middle">1 Hr Ahead of CT</text>

    <!-- Key Cities -->
    <text x="24" y="285" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#64748b">MAJOR METROPOLITAN HUBS</text>
    <text x="24" y="310" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="500" fill="#cbd5e1">New York • Toronto • Atlanta • Miami • Boston</text>
  </g>

  <!-- Bottom Conversion Bar -->
  <g transform="translate(80, 550)">
    <rect width="1040" height="52" rx="10" fill="#0b1220" stroke="#1e293b" stroke-width="1.5"/>
    <text x="520" y="32" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="600" fill="#e2e8f0" text-anchor="middle">
      <tspan fill="#38bdf8" font-weight="800">CST → EST:</tspan> Add 1 Hour (1:00 PM CST = 2:00 PM EST)  •  <tspan fill="#818cf8" font-weight="800">EST → CST:</tspan> Subtract 1 Hour (8:00 PM EST = 7:00 PM CST)
    </text>
  </g>
</svg>
`;

// 2. Image 2: UTC Offset Comparison & Seasonal Infographic (1200x800)
const offsetComparisonSvg = `
<svg width="1200" height="800" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#090d16"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
    <linearGradient id="winterGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#1e3a8a"/>
      <stop offset="100%" stop-color="#0284c7"/>
    </linearGradient>
    <linearGradient id="summerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#047857"/>
      <stop offset="100%" stop-color="#0d9488"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="800" fill="url(#bgGrad2)"/>

  <!-- Header -->
  <text x="600" y="65" font-family="system-ui, -apple-system, sans-serif" font-size="34" font-weight="800" fill="#ffffff" text-anchor="middle">CST and EST UTC Offset Comparison</text>
  <text x="600" y="100" font-family="system-ui, -apple-system, sans-serif" font-size="17" font-weight="400" fill="#94a3b8" text-anchor="middle">How Central Time and Eastern Time Offsets Shift Between Standard and Daylight Time</text>

  <!-- Section 1: Standard Time (Winter) -->
  <g transform="translate(80, 135)">
    <rect width="1040" height="240" rx="16" fill="#111827" stroke="#1e293b" stroke-width="2"/>
    <rect x="0" y="0" width="1040" height="44" rx="14" fill="url(#winterGrad)"/>
    <text x="24" y="28" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="800" fill="#ffffff">STANDARD TIME (Winter Months: First Sunday in November – Second Sunday in March)</text>
    <text x="940" y="28" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#e0f2fe">4 Months / Year</text>

    <!-- Central Standard -->
    <g transform="translate(40, 70)">
      <rect width="360" height="135" rx="12" fill="#0b1324" stroke="#1e293b" stroke-width="1.5"/>
      <text x="24" y="36" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="800" fill="#f8fafc">Central Standard Time</text>
      <text x="24" y="76" font-family="system-ui, -apple-system, sans-serif" font-size="36" font-weight="900" fill="#38bdf8">CST</text>
      <text x="120" y="70" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="700" fill="#f8fafc">UTC−6</text>
      <text x="24" y="112" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="500" fill="#64748b">Chicago • Dallas • Houston • Winnipeg</text>
    </g>

    <!-- Difference Indicator -->
    <g transform="translate(435, 110)">
      <circle cx="85" cy="25" r="38" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
      <text x="85" y="22" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="800" fill="#38bdf8" text-anchor="middle">+1 HR</text>
      <text x="85" y="38" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="700" fill="#94a3b8" text-anchor="middle">GAP</text>
    </g>

    <!-- Eastern Standard -->
    <g transform="translate(640, 70)">
      <rect width="360" height="135" rx="12" fill="#0b1324" stroke="#1e293b" stroke-width="1.5"/>
      <text x="24" y="36" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="800" fill="#f8fafc">Eastern Standard Time</text>
      <text x="24" y="76" font-family="system-ui, -apple-system, sans-serif" font-size="36" font-weight="900" fill="#818cf8">EST</text>
      <text x="120" y="70" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="700" fill="#f8fafc">UTC−5</text>
      <text x="24" y="112" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="500" fill="#64748b">New York • Toronto • Miami • Atlanta</text>
    </g>
  </g>

  <!-- Section 2: Daylight Saving Time (Summer) -->
  <g transform="translate(80, 410)">
    <rect width="1040" height="240" rx="16" fill="#111827" stroke="#1e293b" stroke-width="2"/>
    <rect x="0" y="0" width="1040" height="44" rx="14" fill="url(#summerGrad)"/>
    <text x="24" y="28" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="800" fill="#ffffff">DAYLIGHT SAVING TIME (Summer Months: Second Sunday in March – First Sunday in November)</text>
    <text x="940" y="28" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#ccfbf1">8 Months / Year</text>

    <!-- Central Daylight -->
    <g transform="translate(40, 70)">
      <rect width="360" height="135" rx="12" fill="#0b1324" stroke="#1e293b" stroke-width="1.5"/>
      <text x="24" y="36" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="800" fill="#f8fafc">Central Daylight Time</text>
      <text x="24" y="76" font-family="system-ui, -apple-system, sans-serif" font-size="36" font-weight="900" fill="#2dd4bf">CDT</text>
      <text x="120" y="70" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="700" fill="#f8fafc">UTC−5</text>
      <text x="24" y="112" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="500" fill="#64748b">Clocks advance 1 hour forward</text>
    </g>

    <!-- Difference Indicator -->
    <g transform="translate(435, 110)">
      <circle cx="85" cy="25" r="38" fill="#1e293b" stroke="#2dd4bf" stroke-width="2"/>
      <text x="85" y="22" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="800" fill="#2dd4bf" text-anchor="middle">+1 HR</text>
      <text x="85" y="38" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="700" fill="#94a3b8" text-anchor="middle">GAP</text>
    </g>

    <!-- Eastern Daylight -->
    <g transform="translate(640, 70)">
      <rect width="360" height="135" rx="12" fill="#0b1324" stroke="#1e293b" stroke-width="1.5"/>
      <text x="24" y="36" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="800" fill="#f8fafc">Eastern Daylight Time</text>
      <text x="24" y="76" font-family="system-ui, -apple-system, sans-serif" font-size="36" font-weight="900" fill="#a78bfa">EDT</text>
      <text x="120" y="70" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="700" fill="#f8fafc">UTC−4</text>
      <text x="24" y="112" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="500" fill="#64748b">Clocks advance 1 hour forward</text>
    </g>
  </g>

  <!-- Bottom Key Finding Callout -->
  <g transform="translate(80, 680)">
    <rect width="1040" height="85" rx="12" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="30" y="32" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="800" fill="#38bdf8">CRITICAL TECHNICAL DISTINCTION:</text>
    <text x="30" y="55" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="400" fill="#e2e8f0">
      Central Time and Eastern Time remain <tspan font-weight="700" fill="#ffffff">1 hour apart year-round</tspan> when observing DST in tandem. However, <tspan font-weight="700" fill="#2dd4bf">CDT (UTC−5)</tspan> and <tspan font-weight="700" fill="#818cf8">EST (UTC−5)</tspan> share the exact same UTC offset during opposite seasons!
    </text>
  </g>
</svg>
`;

// 3. Image 3: Conversion Chart (1200x800)
const conversionChartSvg = `
<svg width="1200" height="800" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#070b14"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="800" fill="url(#bgGrad3)"/>

  <!-- Title -->
  <text x="600" y="60" font-family="system-ui, -apple-system, sans-serif" font-size="34" font-weight="800" fill="#ffffff" text-anchor="middle">CST to EST Practical Conversion Chart</text>
  <text x="600" y="92" font-family="system-ui, -apple-system, sans-serif" font-size="17" font-weight="400" fill="#94a3b8" text-anchor="middle">Hourly conversions, business windows, and midnight calendar rollover rules</text>

  <!-- Table Container -->
  <g transform="translate(80, 125)">
    <!-- Table Header -->
    <rect width="1040" height="48" rx="8" fill="#1e293b"/>
    <text x="120" y="30" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="800" fill="#38bdf8" text-anchor="middle">CENTRAL TIME (CST)</text>
    <text x="380" y="30" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="800" fill="#818cf8" text-anchor="middle">EASTERN TIME (EST)</text>
    <text x="710" y="30" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="800" fill="#f8fafc">PRACTICAL COLLABORATION CONTEXT</text>

    <!-- Row 1: 6 AM -->
    <g transform="translate(0, 56)">
      <rect width="1040" height="56" rx="6" fill="#0f172a" stroke="#1e293b" stroke-width="1"/>
      <text x="120" y="35" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="800" fill="#f8fafc" text-anchor="middle">6:00 AM CST</text>
      <text x="250" y="35" font-family="system-ui, -apple-system, sans-serif" font-size="18" fill="#38bdf8" text-anchor="middle">➔</text>
      <text x="380" y="35" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="800" fill="#818cf8" text-anchor="middle">7:00 AM EST</text>
      <text x="510" y="35" font-family="system-ui, -apple-system, sans-serif" font-size="14" fill="#cbd5e1">Early morning prep; financial pre-market opens in New York</text>
    </g>

    <!-- Row 2: 9 AM -->
    <g transform="translate(0, 118)">
      <rect width="1040" height="56" rx="6" fill="#0f172a" stroke="#1e293b" stroke-width="1"/>
      <text x="120" y="35" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="800" fill="#f8fafc" text-anchor="middle">9:00 AM CST</text>
      <text x="250" y="35" font-family="system-ui, -apple-system, sans-serif" font-size="18" fill="#38bdf8" text-anchor="middle">➔</text>
      <text x="380" y="35" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="800" fill="#818cf8" text-anchor="middle">10:00 AM EST</text>
      <text x="510" y="35" font-family="system-ui, -apple-system, sans-serif" font-size="14" fill="#cbd5e1">Central workday begins; primary multi-zone corporate standup slot</text>
    </g>

    <!-- Row 3: 12 PM -->
    <g transform="translate(0, 180)">
      <rect width="1040" height="56" rx="6" fill="#0f172a" stroke="#1e293b" stroke-width="1"/>
      <text x="120" y="35" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="800" fill="#f8fafc" text-anchor="middle">12:00 PM CST</text>
      <text x="250" y="35" font-family="system-ui, -apple-system, sans-serif" font-size="18" fill="#38bdf8" text-anchor="middle">➔</text>
      <text x="380" y="35" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="800" fill="#818cf8" text-anchor="middle">1:00 PM EST</text>
      <text x="510" y="35" font-family="system-ui, -apple-system, sans-serif" font-size="14" fill="#cbd5e1">Central lunch hour corresponds to Eastern afternoon return</text>
    </g>

    <!-- Row 4: 1 PM -->
    <g transform="translate(0, 242)">
      <rect width="1040" height="56" rx="6" fill="#0b172b" stroke="#0284c7" stroke-width="1.5"/>
      <text x="120" y="35" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="900" fill="#38bdf8" text-anchor="middle">1:00 PM CST</text>
      <text x="250" y="35" font-family="system-ui, -apple-system, sans-serif" font-size="18" fill="#38bdf8" text-anchor="middle">➔</text>
      <text x="380" y="35" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="900" fill="#818cf8" text-anchor="middle">2:00 PM EST</text>
      <text x="510" y="35" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600" fill="#f8fafc">High-demand search time: peak afternoon joint meetings and demos</text>
    </g>

    <!-- Row 5: 7 PM -->
    <g transform="translate(0, 304)">
      <rect width="1040" height="56" rx="6" fill="#0b172b" stroke="#0284c7" stroke-width="1.5"/>
      <text x="120" y="35" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="900" fill="#38bdf8" text-anchor="middle">7:00 PM CST</text>
      <text x="250" y="35" font-family="system-ui, -apple-system, sans-serif" font-size="18" fill="#38bdf8" text-anchor="middle">➔</text>
      <text x="380" y="35" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="900" fill="#818cf8" text-anchor="middle">8:00 PM EST</text>
      <text x="510" y="35" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600" fill="#f8fafc">Prime-time sports kickoff and evening broadcast sync</text>
    </g>

    <!-- Row 6: 11 PM -->
    <g transform="translate(0, 366)">
      <rect width="1040" height="56" rx="6" fill="#1e1b4b" stroke="#4338ca" stroke-width="1.5"/>
      <text x="120" y="35" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="800" fill="#f8fafc" text-anchor="middle">11:00 PM CST</text>
      <text x="250" y="35" font-family="system-ui, -apple-system, sans-serif" font-size="18" fill="#a78bfa" text-anchor="middle">➔</text>
      <text x="380" y="35" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="800" fill="#c084fc" text-anchor="middle">12:00 AM EST</text>
      <text x="510" y="35" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" fill="#e9d5ff">Midnight transition: Eastern advances to the start of the next calendar day</text>
    </g>

    <!-- Row 7: 11:30 PM (Date Rollover) -->
    <g transform="translate(0, 428)">
      <rect width="1040" height="56" rx="6" fill="#2d0620" stroke="#f43f5e" stroke-width="1.5"/>
      <text x="120" y="35" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="900" fill="#fb7185" text-anchor="middle">11:30 PM CST</text>
      <text x="250" y="35" font-family="system-ui, -apple-system, sans-serif" font-size="18" fill="#fb7185" text-anchor="middle">➔</text>
      <text x="380" y="35" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="900" fill="#fda4af" text-anchor="middle">12:30 AM EST (+1)</text>
      <text x="510" y="35" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" fill="#fecdd3">DATE ROLLOVER: Eastern time is on the NEXT calendar date</text>
    </g>
  </g>

  <!-- Bottom Date Change Explanatory Box -->
  <g transform="translate(80, 640)">
    <rect width="1040" height="110" rx="12" fill="#0f172a" stroke="#e11d48" stroke-width="1.5"/>
    <text x="30" y="36" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="800" fill="#fb7185">IMPORTANT DATE ROLLOVER RULE:</text>
    <text x="30" y="62" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="400" fill="#e2e8f0">
      Only times between <tspan font-weight="700" fill="#ffffff">11:01 PM and 11:59 PM CST</tspan> advance into the next calendar day in Eastern Time (e.g. 11:30 PM CST on Friday is 12:30 AM EST on Saturday).
    </text>
    <text x="30" y="86" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="400" fill="#94a3b8">
      Times before 11:00 PM CST remain on the same calendar day in both time zones.
    </text>
  </g>
</svg>
`;

// 4. Image 4: Daylight Saving Exceptions & Geographic Scope (1200x800)
const daylightExceptionsSvg = `
<svg width="1200" height="800" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad4" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#080c16"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="800" fill="url(#bgGrad4)"/>

  <!-- Title -->
  <text x="600" y="60" font-family="system-ui, -apple-system, sans-serif" font-size="34" font-weight="800" fill="#ffffff" text-anchor="middle">Central vs Eastern Time: Regional DST Exceptions</text>
  <text x="600" y="92" font-family="system-ui, -apple-system, sans-serif" font-size="17" font-weight="400" fill="#94a3b8" text-anchor="middle">Where the standard 1-hour difference changes due to non-observance of Daylight Saving Time</text>

  <!-- 3 Exception Cards -->
  <!-- Card 1: Saskatchewan -->
  <g transform="translate(80, 130)">
    <rect width="1040" height="165" rx="14" fill="#111827" stroke="#0284c7" stroke-width="1.5"/>
    <text x="30" y="38" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="800" fill="#38bdf8">1. Saskatchewan (Canada): Permanent CST (UTC−6)</text>
    <text x="30" y="70" font-family="system-ui, -apple-system, sans-serif" font-size="15" fill="#cbd5e1">
      Most of Saskatchewan observes Central Standard Time year-round and does not spring forward to CDT.
    </text>
    <rect x="30" y="90" width="470" height="50" rx="8" fill="#0b1324" stroke="#1e293b"/>
    <text x="45" y="120" font-family="system-ui, -apple-system, sans-serif" font-size="14" fill="#94a3b8">Winter (Nov–Mar): <tspan font-weight="700" fill="#f8fafc">1 hour behind</tspan> New York (EST)</text>
    <rect x="520" y="90" width="490" height="50" rx="8" fill="#0b1324" stroke="#0369a1"/>
    <text x="535" y="120" font-family="system-ui, -apple-system, sans-serif" font-size="14" fill="#38bdf8">Summer (Mar–Nov): <tspan font-weight="800" fill="#ffffff">2 HOURS BEHIND</tspan> New York (EDT)!</text>
  </g>

  <!-- Card 2: Mexico Central Zone -->
  <g transform="translate(80, 315)">
    <rect width="1040" height="165" rx="14" fill="#111827" stroke="#10b981" stroke-width="1.5"/>
    <text x="30" y="38" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="800" fill="#34d399">2. Mexico Central Zone: Permanent Standard Time (UTC−6)</text>
    <text x="30" y="70" font-family="system-ui, -apple-system, sans-serif" font-size="15" fill="#cbd5e1">
      Mexico abolished seasonal clock changes nationwide in October 2022 (except for designated US border strips).
    </text>
    <rect x="30" y="90" width="470" height="50" rx="8" fill="#0b1324" stroke="#1e293b"/>
    <text x="45" y="120" font-family="system-ui, -apple-system, sans-serif" font-size="14" fill="#94a3b8">Winter: Mexico City is <tspan font-weight="700" fill="#f8fafc">1 hour behind</tspan> Eastern Standard Time (EST)</text>
    <rect x="520" y="90" width="490" height="50" rx="8" fill="#0b1324" stroke="#047857"/>
    <text x="535" y="120" font-family="system-ui, -apple-system, sans-serif" font-size="14" fill="#34d399">Summer: Mexico City is <tspan font-weight="800" fill="#ffffff">2 HOURS BEHIND</tspan> Eastern Daylight Time (EDT)!</text>
  </g>

  <!-- Card 3: Panama, Colombia, Jamaica -->
  <g transform="translate(80, 500)">
    <rect width="1040" height="165" rx="14" fill="#111827" stroke="#818cf8" stroke-width="1.5"/>
    <text x="30" y="38" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="800" fill="#818cf8">3. Panama, Colombia &amp; Jamaica: Permanent UTC−5 (No DST)</text>
    <text x="30" y="70" font-family="system-ui, -apple-system, sans-serif" font-size="15" fill="#cbd5e1">
      These tropical jurisdictions remain on UTC−5 year-round without seasonal adjustments.
    </text>
    <rect x="30" y="90" width="470" height="50" rx="8" fill="#0b1324" stroke="#1e293b"/>
    <text x="45" y="120" font-family="system-ui, -apple-system, sans-serif" font-size="14" fill="#94a3b8">Winter: Panama matches <tspan font-weight="700" fill="#f8fafc">Eastern Standard Time (EST)</tspan> (1h ahead of CST)</text>
    <rect x="520" y="90" width="490" height="50" rx="8" fill="#0b1324" stroke="#4338ca"/>
    <text x="535" y="120" font-family="system-ui, -apple-system, sans-serif" font-size="14" fill="#a78bfa">Summer: Panama matches <tspan font-weight="800" fill="#ffffff">Central Daylight Time (CDT)</tspan> (0h gap with Chicago!)</text>
  </g>

  <!-- Bottom Takeaway -->
  <g transform="translate(80, 685)">
    <rect width="1040" height="80" rx="12" fill="#0f172a" stroke="#475569" stroke-width="1.5"/>
    <text x="30" y="35" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">SCHEDULING SUMMARY FOR GLOBAL TEAMS:</text>
    <text x="30" y="60" font-family="system-ui, -apple-system, sans-serif" font-size="14" fill="#cbd5e1">
      Always verify whether your counterpart's specific state or country changes clocks. In the US and Canadian provinces observing DST, the 1-hour gap is constant. Outside them, the difference shifts between 0, 1, or 2 hours!
    </text>
  </g>
</svg>
`;

async function main() {
  console.log("Generating CST vs EST custom visuals via Sharp...\n");

  // Hero: generate responsive 1200w and 600w WebP and AVIF
  await renderSvgToWebpAndAvif(heroSvg, "cst-vs-est-hero", 1200, 630, true);

  // Infographic 2: UTC offset comparison
  await renderSvgToWebpAndAvif(offsetComparisonSvg, "cst-est-utc-offset-comparison", 1200, 800, false);

  // Infographic 3: Conversion chart
  await renderSvgToWebpAndAvif(conversionChartSvg, "cst-to-est-conversion-chart", 1200, 800, false);

  // Infographic 4: Daylight saving exceptions
  await renderSvgToWebpAndAvif(daylightExceptionsSvg, "cst-cdt-est-edt-daylight-saving", 1200, 800, false);

  console.log("\nAll CST vs EST visual assets generated successfully!");
}

main().catch(err => {
  console.error("Image generation error:", err);
  process.exit(1);
});
