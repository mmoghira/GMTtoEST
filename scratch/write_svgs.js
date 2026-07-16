const fs = require('fs');
const path = require('path');

const targetDir = path.resolve(__dirname, '../public/assets');

const svgs = {
  // === TORONTO SVGS ===
  'est-vs-edt-timeline.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 720" width="1200" height="720">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0f172a" />
          <stop offset="100%" stop-color="#1e293b" />
        </linearGradient>
        <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#3b82f6" />
          <stop offset="100%" stop-color="#8b5cf6" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg)" rx="16" />
      <text x="600" y="80" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="36" font-weight="700" fill="#f8fafc">EST vs EDT Timeline (Toronto)</text>
      <line x1="100" y1="360" x2="1100" y2="360" stroke="#475569" stroke-width="6" stroke-linecap="round" />
      
      <!-- EST Block -->
      <rect x="100" y="240" width="200" height="80" rx="8" fill="#1e1b4b" stroke="#3730a3" stroke-width="2" />
      <text x="200" y="285" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="20" font-weight="700" fill="#f8fafc">EST (UTC-5)</text>
      <text x="200" y="390" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="16" fill="#94a3b8">Nov - Mar (Winter)</text>

      <!-- DST Transition Point -->
      <circle cx="300" cy="360" r="12" fill="#ef4444" />
      <text x="300" y="440" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="16" font-weight="700" fill="#ef4444">March (DST Starts)</text>
      
      <!-- EDT Block -->
      <rect x="300" y="240" width="600" height="80" rx="8" fill="url(#accent)" />
      <text x="600" y="285" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="20" font-weight="700" fill="#f8fafc">EDT (UTC-4)</text>
      <text x="600" y="390" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="16" fill="#f1f5f9">Mar - Nov (Summer)</text>

      <!-- DST Ends -->
      <circle cx="900" cy="360" r="12" fill="#ef4444" />
      <text x="900" y="440" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="16" font-weight="700" fill="#ef4444">November (DST Ends)</text>

      <!-- EST Block 2 -->
      <rect x="900" y="240" width="200" height="80" rx="8" fill="#1e1b4b" stroke="#3730a3" stroke-width="2" />
      <text x="1000" y="285" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="20" font-weight="700" fill="#f8fafc">EST (UTC-5)</text>
      <text x="1000" y="390" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="16" fill="#94a3b8">Nov - Dec</text>
    </svg>
  `,
  'tsx-business-hours.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 720" width="1200" height="720">
      <rect width="100%" height="100%" fill="#0f172a" rx="16" />
      <text x="600" y="80" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="36" font-weight="700" fill="#f8fafc">TSX Trading Schedule &amp; Business Hours</text>
      
      <!-- Pre-market -->
      <rect x="150" y="200" width="250" height="300" rx="12" fill="#1e293b" stroke="#334155" stroke-width="2" />
      <text x="275" y="250" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="24" font-weight="700" fill="#60a5fa">Pre-Market</text>
      <text x="275" y="320" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="32" font-weight="800" fill="#f8fafc">7:00 AM</text>
      <text x="275" y="360" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="20" fill="#94a3b8">to 9:30 AM ET</text>
      
      <!-- Core hours -->
      <rect x="475" y="170" width="250" height="360" rx="12" fill="#1e1b4b" stroke="#3b82f6" stroke-width="4" />
      <text x="600" y="230" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="28" font-weight="700" fill="#3b82f6">Core Trading</text>
      <text x="600" y="310" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="36" font-weight="800" fill="#f8fafc">9:30 AM</text>
      <text x="600" y="370" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="24" fill="#94a3b8">to</text>
      <text x="600" y="430" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="36" font-weight="800" fill="#f8fafc">4:00 PM EST/EDT</text>
      
      <!-- Post-market -->
      <rect x="800" y="200" width="250" height="300" rx="12" fill="#1e293b" stroke="#334155" stroke-width="2" />
      <text x="925" y="250" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="24" font-weight="700" fill="#a78bfa">Post-Market</text>
      <text x="925" y="320" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="32" font-weight="800" fill="#f8fafc">4:15 PM</text>
      <text x="925" y="360" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="20" fill="#94a3b8">to 5:00 PM ET</text>
    </svg>
  `,
  'toronto-world-time-comparison.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 720" width="1200" height="720">
      <rect width="100%" height="100%" fill="#0f172a" rx="16" />
      <text x="600" y="80" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="36" font-weight="700" fill="#f8fafc">Toronto vs Global Cities Offset Dashboard</text>
      
      <!-- Clocks Grid -->
      <g transform="translate(100, 180)">
        <rect width="200" height="150" fill="#1e293b" rx="8" />
        <text x="100" y="50" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="20" fill="#94a3b8">TORONTO</text>
        <text x="100" y="100" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="28" font-weight="700" fill="#3b82f6">Local (ET)</text>
      </g>
      <g transform="translate(350, 180)">
        <rect width="200" height="150" fill="#1e293b" rx="8" />
        <text x="100" y="50" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="20" fill="#94a3b8">NEW YORK</text>
        <text x="100" y="100" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="28" font-weight="700" fill="#f8fafc">Same Time</text>
      </g>
      <g transform="translate(600, 180)">
        <rect width="200" height="150" fill="#1e293b" rx="8" />
        <text x="100" y="50" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="20" fill="#94a3b8">LONDON</text>
        <text x="100" y="100" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="28" font-weight="700" fill="#f8fafc">+5 Hours</text>
      </g>
      <g transform="translate(850, 180)">
        <rect width="200" height="150" fill="#1e293b" rx="8" />
        <text x="100" y="50" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="20" fill="#94a3b8">LOS ANGELES</text>
        <text x="100" y="100" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="28" font-weight="700" fill="#f8fafc">-3 Hours</text>
      </g>
      
      <!-- Bottom Row -->
      <g transform="translate(225, 400)">
        <rect width="250" height="150" fill="#1e293b" rx="8" />
        <text x="125" y="50" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="20" fill="#94a3b8">TOKYO</text>
        <text x="125" y="100" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="28" font-weight="700" fill="#f8fafc">+13 / +14 Hours</text>
      </g>
      <g transform="translate(725, 400)">
        <rect width="250" height="150" fill="#1e293b" rx="8" />
        <text x="125" y="50" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="20" fill="#94a3b8">UTC / GMT</text>
        <text x="125" y="100" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="28" font-weight="700" fill="#f8fafc">+4 / +5 Hours</text>
      </g>
    </svg>
  `,
  'toronto-travel-planner.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 720" width="1200" height="720">
      <rect width="100%" height="100%" fill="#0f172a" rx="16" />
      <text x="600" y="80" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="36" font-weight="700" fill="#f8fafc">Toronto Travel Planning &amp; Jet Lag Map</text>
      
      <!-- Jet lag diagram -->
      <circle cx="600" cy="360" r="180" fill="none" stroke="#334155" stroke-width="8" />
      <circle cx="600" cy="360" r="180" fill="none" stroke="#3b82f6" stroke-width="8" stroke-dasharray="300 800" />
      <text x="600" y="340" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="24" font-weight="700" fill="#f8fafc">Sync Circadian Rhythm</text>
      <text x="600" y="380" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="18" fill="#94a3b8">Shift Bedtime 1 Hour Per Day</text>

      <g transform="translate(100, 250)">
        <rect width="220" height="220" fill="#1e293b" rx="12" />
        <text x="110" y="50" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="20" fill="#f8fafc">Westbound Flights</text>
        <text x="110" y="110" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="16" fill="#94a3b8">From Europe</text>
        <text x="110" y="150" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="18" font-weight="700" fill="#10b981">Easier Adjustment</text>
      </g>
      <g transform="translate(880, 250)">
        <rect width="220" height="220" fill="#1e293b" rx="12" />
        <text x="110" y="50" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="20" fill="#f8fafc">Eastbound Flights</text>
        <text x="110" y="110" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="16" fill="#94a3b8">To Europe / Asia</text>
        <text x="110" y="150" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="18" font-weight="700" fill="#ef4444">Harder Adjustment</text>
      </g>
    </svg>
  `,
  'toronto-programming-workflow.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 720" width="1200" height="720">
      <rect width="100%" height="100%" fill="#0f172a" rx="16" />
      <text x="600" y="80" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="36" font-weight="700" fill="#f8fafc">Toronto Database &amp; API Time Format Flow</text>
      
      <!-- API Input -->
      <g transform="translate(100, 260)">
        <rect width="260" height="200" fill="#1e293b" rx="12" stroke="#475569" stroke-width="2" />
        <text x="130" y="50" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="22" font-weight="700" fill="#60a5fa">API Timestamp</text>
        <text x="130" y="110" text-anchor="middle" font-family="monospace" font-size="14" fill="#f1f5f9">2026-10-15T09:00:00-04:00</text>
        <text x="130" y="150" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="16" fill="#94a3b8">ISO 8601 Format (EDT)</text>
      </g>
      
      <!-- Arrow 1 -->
      <line x1="390" y1="360" x2="490" y2="360" stroke="#3b82f6" stroke-width="6" stroke-dasharray="10 5" />
      <polygon points="500,360 485,350 485,370" fill="#3b82f6" />
      
      <!-- Storage -->
      <g transform="translate(520, 260)">
        <rect width="260" height="200" fill="#1e1b4b" rx="12" stroke="#3b82f6" stroke-width="2" />
        <text x="130" y="50" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="22" font-weight="700" fill="#10b981">Database Storage</text>
        <text x="130" y="110" text-anchor="middle" font-family="monospace" font-size="14" fill="#f1f5f9">2026-10-15T13:00:00Z</text>
        <text x="130" y="150" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="16" fill="#94a3b8">Always store in UTC</text>
      </g>
      
      <!-- Arrow 2 -->
      <line x1="810" y1="360" x2="910" y2="360" stroke="#3b82f6" stroke-width="6" stroke-dasharray="10 5" />
      <polygon points="920,360 905,350 905,370" fill="#3b82f6" />
      
      <!-- Output -->
      <g transform="translate(940, 260)">
        <rect width="220" height="200" fill="#1e293b" rx="12" stroke="#475569" stroke-width="2" />
        <text x="110" y="50" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="22" font-weight="700" fill="#a78bfa">User Presentation</text>
        <text x="110" y="110" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="18" fill="#f8fafc">America/Toronto</text>
        <text x="110" y="150" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="16" fill="#94a3b8">Resolve offsets dynamically</text>
      </g>
    </svg>
  `,
  'toronto-business-meeting-planner.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 720" width="1200" height="720">
      <rect width="100%" height="100%" fill="#0f172a" rx="16" />
      <text x="600" y="80" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="36" font-weight="700" fill="#f8fafc">Toronto International Business Meeting Planner</text>
      
      <!-- Meeting slots grid -->
      <g transform="translate(100, 180)">
        <rect width="1000" height="100" fill="#1e293b" rx="8" />
        <text x="50" y="60" font-family="'Space Grotesk', sans-serif" font-size="24" font-weight="700" fill="#60a5fa">Toronto Time (ET)</text>
        <text x="350" y="60" font-family="'Manrope', sans-serif" font-size="20" fill="#f8fafc">9:00 AM to 5:00 PM</text>
        <rect x="700" y="20" width="250" height="60" rx="4" fill="#047857" />
        <text x="825" y="55" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="18" font-weight="700" fill="#f8fafc">Active Working Hours</text>
      </g>
      <g transform="translate(100, 310)">
        <rect width="1000" height="100" fill="#1e293b" rx="8" />
        <text x="50" y="60" font-family="'Space Grotesk', sans-serif" font-size="24" font-weight="700" fill="#a78bfa">London Time (BST/GMT)</text>
        <text x="350" y="60" font-family="'Manrope', sans-serif" font-size="20" fill="#f8fafc">2:00 PM to 10:00 PM</text>
        <rect x="700" y="20" width="250" height="60" rx="4" fill="#b91c1c" />
        <text x="825" y="55" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="18" font-weight="700" fill="#f8fafc">Afternoon / Evening</text>
      </g>
      <g transform="translate(100, 440)">
        <rect width="1000" height="100" fill="#1e293b" rx="8" />
        <text x="50" y="60" font-family="'Space Grotesk', sans-serif" font-size="24" font-weight="700" fill="#f59e0b">Sydney Time (AEST/AEDT)</text>
        <text x="350" y="60" font-family="'Manrope', sans-serif" font-size="20" fill="#f8fafc">11:00 PM to 7:00 AM</text>
        <rect x="700" y="20" width="250" height="60" rx="4" fill="#4b5563" />
        <text x="825" y="55" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="18" font-weight="700" fill="#f8fafc">Night-Time Gap</text>
      </g>
    </svg>
  `,
  'toronto-annual-dst-timeline.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 720" width="1200" height="720">
      <rect width="100%" height="100%" fill="#0f172a" rx="16" />
      <text x="600" y="80" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="36" font-weight="700" fill="#f8fafc">Toronto Annual DST Clock Timeline</text>
      
      <!-- Calendar months ring -->
      <circle cx="600" cy="380" r="180" fill="none" stroke="#475569" stroke-width="12" />
      <path d="M 600,200 A 180,180 0 1,1 599.9,200" fill="none" stroke="#3b82f6" stroke-width="12" stroke-dasharray="750 380" />
      
      <text x="600" y="360" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="24" font-weight="700" fill="#3b82f6">March to November</text>
      <text x="600" y="400" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="20" fill="#f8fafc">EDT (UTC-4)</text>
      <text x="600" y="440" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="18" fill="#94a3b8">Standard EST (UTC-5) in Winter</text>

      <!-- Label pointers -->
      <text x="600" y="160" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="18" font-weight="700" fill="#f8fafc">DEC/JAN/FEB (EST)</text>
      <text x="820" y="380" text-anchor="start" font-family="'Space Grotesk', sans-serif" font-size="18" font-weight="700" fill="#3b82f6">JUN/JUL/AUG (EDT)</text>
    </svg>
  `,

  // === LONDON SVGS ===
  'london-skyline-clock.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 720" width="1200" height="720">
      <rect width="100%" height="100%" fill="#0f172a" rx="16" />
      <text x="600" y="80" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="36" font-weight="700" fill="#f8fafc">London Time &amp; Skyline Clock</text>
      
      <!-- Big Ben Clock representation -->
      <rect x="525" y="180" width="150" height="420" fill="#1e293b" stroke="#334155" stroke-width="4" rx="8" />
      <circle cx="600" cy="270" r="45" fill="#fef08a" stroke="#ca8a04" stroke-width="6" />
      <line x1="600" y1="270" x2="600" y2="245" stroke="#0f172a" stroke-width="4" stroke-linecap="round" />
      <line x1="600" y1="270" x2="625" y2="270" stroke="#0f172a" stroke-width="4" stroke-linecap="round" />
      
      <text x="600" y="500" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="28" font-weight="700" fill="#60a5fa">GMT / BST</text>
      <text x="600" y="550" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="20" fill="#94a3b8">Greenwich Mean Time Zone</text>
    </svg>
  `,
  'big-ben-time-illustration.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 720" width="1200" height="720">
      <rect width="100%" height="100%" fill="#0f172a" rx="16" />
      <text x="600" y="80" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="36" font-weight="700" fill="#f8fafc">Big Ben &amp; London Clock Illustration</text>
      <g transform="translate(300, 150)">
        <rect width="600" height="450" fill="#1e293b" rx="12" stroke="#475569" stroke-width="2" />
        <!-- Big Dial -->
        <circle cx="300" cy="225" r="160" fill="#0f172a" stroke="#ca8a04" stroke-width="8" />
        <circle cx="300" cy="225" r="140" fill="#fef08a" />
        
        <!-- Hands -->
        <line x1="300" y1="225" x2="300" y2="120" stroke="#0f172a" stroke-width="8" stroke-linecap="round" />
        <line x1="300" y1="225" x2="410" y2="225" stroke="#0f172a" stroke-width="6" stroke-linecap="round" />
      </g>
    </svg>
  `,
  'prime-meridian-map.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 720" width="1200" height="720">
      <rect width="100%" height="100%" fill="#0f172a" rx="16" />
      <text x="600" y="80" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="36" font-weight="700" fill="#f8fafc">The Prime Meridian (0° Longitude) Map</text>
      
      <!-- Longitude line -->
      <line x1="600" y1="160" x2="600" y2="600" stroke="#ef4444" stroke-width="8" stroke-linecap="round" />
      <text x="620" y="250" font-family="'Space Grotesk', sans-serif" font-size="20" font-weight="700" fill="#ef4444">Prime Meridian Line (0°)</text>
      <text x="620" y="290" font-family="'Manrope', sans-serif" font-size="16" fill="#94a3b8">Royal Observatory, Greenwich</text>
      
      <!-- West / East Hemispheres -->
      <text x="350" y="380" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="32" fill="#3b82f6">Western Hemisphere</text>
      <text x="850" y="380" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="32" fill="#10b981">Eastern Hemisphere</text>
    </svg>
  `,
  'gmt-vs-bst-timeline.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 720" width="1200" height="720">
      <rect width="100%" height="100%" fill="#0f172a" rx="16" />
      <text x="600" y="80" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="36" font-weight="700" fill="#f8fafc">Greenwich Mean Time (GMT) vs British Summer Time (BST)</text>
      
      <!-- Timeline axis -->
      <line x1="100" y1="360" x2="1100" y2="360" stroke="#475569" stroke-width="6" stroke-linecap="round" />
      
      <!-- GMT Block -->
      <rect x="100" y="240" width="250" height="80" rx="8" fill="#1e293b" stroke="#334155" stroke-width="2" />
      <text x="225" y="285" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="20" font-weight="700" fill="#f8fafc">GMT (UTC+0)</text>
      <text x="225" y="390" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="16" fill="#94a3b8">Winter Period (Oct - Mar)</text>

      <!-- Transition Point -->
      <circle cx="350" cy="360" r="12" fill="#eab308" />
      <text x="350" y="440" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="16" font-weight="700" fill="#eab308">Last Sunday in March</text>
      
      <!-- BST Block -->
      <rect x="350" y="240" width="500" height="80" rx="8" fill="#1e1b4b" stroke="#3b82f6" stroke-width="2" />
      <text x="600" y="285" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="20" font-weight="700" fill="#f8fafc">BST (UTC+1)</text>
      <text x="600" y="390" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="16" fill="#94a3b8">Summer Period (Mar - Oct)</text>

      <!-- Transition Point 2 -->
      <circle cx="850" cy="360" r="12" fill="#eab308" />
      <text x="850" y="440" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="16" font-weight="700" fill="#eab308">Last Sunday in October</text>

      <!-- GMT Block 2 -->
      <rect x="850" y="240" width="250" height="80" rx="8" fill="#1e293b" stroke="#334155" stroke-width="2" />
      <text x="975" y="285" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="20" font-weight="700" fill="#f8fafc">GMT (UTC+0)</text>
      <text x="975" y="390" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="16" fill="#94a3b8">Winter Period (Oct - Dec)</text>
    </svg>
  `,
  'london-business-hours.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 720" width="1200" height="720">
      <rect width="100%" height="100%" fill="#0f172a" rx="16" />
      <text x="600" y="80" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="36" font-weight="700" fill="#f8fafc">London Financial Markets &amp; LSE Hours</text>
      
      <g transform="translate(150, 200)">
        <rect width="400" height="360" fill="#1e293b" rx="12" stroke="#334155" stroke-width="2" />
        <text x="200" y="60" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="24" font-weight="700" fill="#60a5fa">LSE Trading Hours</text>
        <text x="200" y="160" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="42" font-weight="800" fill="#f8fafc">8:00 AM</text>
        <text x="200" y="220" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="24" fill="#94a3b8">to</text>
        <text x="200" y="280" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="42" font-weight="800" fill="#f8fafc">4:30 PM local time</text>
      </g>
      
      <g transform="translate(650, 200)">
        <rect width="400" height="360" fill="#1e293b" rx="12" stroke="#334155" stroke-width="2" />
        <text x="200" y="60" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="24" font-weight="700" fill="#10b981">Standard Office Hours</text>
        <text x="200" y="160" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="42" font-weight="800" fill="#f8fafc">9:00 AM</text>
        <text x="200" y="220" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="24" fill="#94a3b8">to</text>
        <text x="200" y="280" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="42" font-weight="800" fill="#f8fafc">5:00 PM local time</text>
      </g>
    </svg>
  `,
  'london-world-time-comparison.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 720" width="1200" height="720">
      <rect width="100%" height="100%" fill="#0f172a" rx="16" />
      <text x="600" y="80" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="36" font-weight="700" fill="#f8fafc">London vs Global Time Offsets</text>
      
      <g transform="translate(100, 180)">
        <rect width="200" height="150" fill="#1e293b" rx="8" />
        <text x="100" y="50" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="20" fill="#94a3b8">LONDON</text>
        <text x="100" y="100" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="28" font-weight="700" fill="#10b981">Local (GMT/BST)</text>
      </g>
      <g transform="translate(350, 180)">
        <rect width="200" height="150" fill="#1e293b" rx="8" />
        <text x="100" y="50" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="20" fill="#94a3b8">NEW YORK</text>
        <text x="100" y="100" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="28" font-weight="700" fill="#f8fafc">-5 Hours</text>
      </g>
      <g transform="translate(600, 180)">
        <rect width="200" height="150" fill="#1e293b" rx="8" />
        <text x="100" y="50" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="20" fill="#94a3b8">TOKYO</text>
        <text x="100" y="100" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="28" font-weight="700" fill="#f8fafc">+8 / +9 Hours</text>
      </g>
      <g transform="translate(850, 180)">
        <rect width="200" height="150" fill="#1e293b" rx="8" />
        <text x="100" y="50" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="20" fill="#94a3b8">SYDNEY</text>
        <text x="100" y="100" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="28" font-weight="700" fill="#f8fafc">+9 / +11 Hours</text>
      </g>
      
      <g transform="translate(325, 400)">
        <rect width="250" height="150" fill="#1e293b" rx="8" />
        <text x="125" y="50" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="20" fill="#94a3b8">LOS ANGELES</text>
        <text x="125" y="100" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="28" font-weight="700" fill="#f8fafc">-8 Hours</text>
      </g>
      <g transform="translate(625, 400)">
        <rect width="250" height="150" fill="#1e293b" rx="8" />
        <text x="125" y="50" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="20" fill="#94a3b8">TORONTO</text>
        <text x="125" y="100" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="28" font-weight="700" fill="#f8fafc">-5 Hours</text>
      </g>
    </svg>
  `,
  'london-meeting-planner.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 720" width="1200" height="720">
      <rect width="100%" height="100%" fill="#0f172a" rx="16" />
      <text x="600" y="80" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="36" font-weight="700" fill="#f8fafc">London International Meeting Planner</text>
      
      <g transform="translate(100, 180)">
        <rect width="1000" height="100" fill="#1e293b" rx="8" />
        <text x="50" y="60" font-family="'Space Grotesk', sans-serif" font-size="24" font-weight="700" fill="#60a5fa">London Time</text>
        <text x="350" y="60" font-family="'Manrope', sans-serif" font-size="20" fill="#f8fafc">2:00 PM to 6:00 PM</text>
        <rect x="700" y="20" width="250" height="60" rx="4" fill="#047857" />
        <text x="825" y="55" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="18" font-weight="700" fill="#f8fafc">Optimal Meeting Window</text>
      </g>
      <g transform="translate(100, 310)">
        <rect width="1000" height="100" fill="#1e293b" rx="8" />
        <text x="50" y="60" font-family="'Space Grotesk', sans-serif" font-size="24" font-weight="700" fill="#a78bfa">New York Time</text>
        <text x="350" y="60" font-family="'Manrope', sans-serif" font-size="20" fill="#f8fafc">9:00 AM to 1:00 PM</text>
        <rect x="700" y="20" width="250" height="60" rx="4" fill="#047857" />
        <text x="825" y="55" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="18" font-weight="700" fill="#f8fafc">Morning Start</text>
      </g>
      <g transform="translate(100, 440)">
        <rect width="1000" height="100" fill="#1e293b" rx="8" />
        <text x="50" y="60" font-family="'Space Grotesk', sans-serif" font-size="24" font-weight="700" fill="#f59e0b">Tokyo Time</text>
        <text x="350" y="60" font-family="'Manrope', sans-serif" font-size="20" fill="#f8fafc">10:00 PM to 2:00 AM</text>
        <rect x="700" y="20" width="250" height="60" rx="4" fill="#4b5563" />
        <text x="825" y="55" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="18" font-weight="700" fill="#f8fafc">Late Evening Gap</text>
      </g>
    </svg>
  `,
  'london-travel-timeline.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 720" width="1200" height="720">
      <rect width="100%" height="100%" fill="#0f172a" rx="16" />
      <text x="600" y="80" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="36" font-weight="700" fill="#f8fafc">London Travel Timeline &amp; Flight Paths</text>
      
      <circle cx="600" cy="380" r="180" fill="none" stroke="#475569" stroke-width="8" />
      <circle cx="600" cy="380" r="180" fill="none" stroke="#3b82f6" stroke-width="8" stroke-dasharray="400 800" />
      <text x="600" y="360" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="24" font-weight="700" fill="#f8fafc">UK Arrival Guidance</text>
      <text x="600" y="400" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="18" fill="#94a3b8">Check local BST/GMT offsets</text>
    </svg>
  `,
  'london-programming-workflow.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 720" width="1200" height="720">
      <rect width="100%" height="100%" fill="#0f172a" rx="16" />
      <text x="600" y="80" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="36" font-weight="700" fill="#f8fafc">London Programming Timestamp Workflow</text>
      
      <g transform="translate(100, 260)">
        <rect width="260" height="200" fill="#1e293b" rx="12" stroke="#475569" stroke-width="2" />
        <text x="130" y="50" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="22" font-weight="700" fill="#60a5fa">API Timestamp</text>
        <text x="130" y="110" text-anchor="middle" font-family="monospace" font-size="14" fill="#f1f5f9">2026-07-15T09:00:00+01:00</text>
        <text x="130" y="150" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="16" fill="#94a3b8">ISO 8601 Format (BST)</text>
      </g>
      
      <line x1="390" y1="360" x2="490" y2="360" stroke="#3b82f6" stroke-width="6" stroke-dasharray="10 5" />
      <polygon points="500,360 485,350 485,370" fill="#3b82f6" />
      
      <g transform="translate(520, 260)">
        <rect width="260" height="200" fill="#1e1b4b" rx="12" stroke="#3b82f6" stroke-width="2" />
        <text x="130" y="50" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="22" font-weight="700" fill="#10b981">Database Storage</text>
        <text x="130" y="110" text-anchor="middle" font-family="monospace" font-size="14" fill="#f1f5f9">2026-07-15T08:00:00Z</text>
        <text x="130" y="150" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="16" fill="#94a3b8">Stored as UTC (Zero offset)</text>
      </g>
      
      <line x1="810" y1="360" x2="910" y2="360" stroke="#3b82f6" stroke-width="6" stroke-dasharray="10 5" />
      <polygon points="920,360 905,350 905,370" fill="#3b82f6" />
      
      <g transform="translate(940, 260)">
        <rect width="220" height="200" fill="#1e293b" rx="12" stroke="#475569" stroke-width="2" />
        <text x="110" y="50" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="22" font-weight="700" fill="#a78bfa">Local Presentation</text>
        <text x="110" y="110" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="18" fill="#f8fafc">Europe/London</text>
        <text x="110" y="150" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="16" fill="#94a3b8">Handles BST/GMT shifts</text>
      </g>
    </svg>
  `,
  'london-annual-dst-calendar.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 720" width="1200" height="720">
      <rect width="100%" height="100%" fill="#0f172a" rx="16" />
      <text x="600" y="80" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="36" font-weight="700" fill="#f8fafc">London Annual DST Clock Calendar</text>
      
      <circle cx="600" cy="380" r="180" fill="none" stroke="#475569" stroke-width="12" />
      <path d="M 600,200 A 180,180 0 1,1 599.9,200" fill="none" stroke="#3b82f6" stroke-width="12" stroke-dasharray="700 430" />
      
      <text x="600" y="360" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="24" font-weight="700" fill="#3b82f6">March to October</text>
      <text x="600" y="400" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="20" fill="#f8fafc">BST (UTC+1)</text>
      <text x="600" y="440" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="18" fill="#94a3b8">Standard GMT (UTC+0) in Winter</text>
    </svg>
  `
};

for (const [name, content] of Object.entries(svgs)) {
  const filePath = path.join(targetDir, name);
  console.log(`Writing SVG ${name} to ${filePath}...`);
  fs.writeFileSync(filePath, content.trim(), 'utf8');
}
console.log('SUCCESS: All SVGs generated successfully!');
