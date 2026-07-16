const fs = require('fs');
const path = require('path');

const targetDir = path.resolve(__dirname, '../public/assets');

const svgs = {
  'tokyo-skyline-digital-clock.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 720" width="1200" height="720">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#090514" />
          <stop offset="100%" stop-color="#140b28" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg)" rx="16" />
      <text x="600" y="80" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="36" font-weight="700" fill="#f8fafc">Tokyo Time &amp; Skyline Clock</text>
      
      <!-- Mount Fuji & Skyline Silhouette -->
      <path d="M 150,550 L 350,380 L 550,550 Z" fill="#1b1230" opacity="0.6" />
      <path d="M 280,440 L 350,380 L 420,440 Z" fill="#ffffff" opacity="0.8" />
      <rect x="50" y="480" width="80" height="120" fill="#0f0920" />
      <rect x="700" y="420" width="120" height="180" fill="#0f0920" />
      <rect x="880" y="320" width="100" height="280" fill="#0c071a" />
      <line x1="930" y1="320" x2="930" y2="150" stroke="#f43f5e" stroke-width="4" />
      <circle cx="930" cy="150" r="10" fill="#f43f5e" />

      <!-- Giant Digital Clock Display -->
      <g transform="translate(300, 200)">
        <rect width="600" height="220" fill="#180e29" rx="16" stroke="#c084fc" stroke-width="4" />
        <text x="300" y="110" text-anchor="middle" font-family="monospace" font-size="72" font-weight="800" fill="#a855f7">JST (UTC+9)</text>
        <text x="300" y="170" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="32" font-weight="600" fill="#f8fafc">Tokyo Standard Time</text>
      </g>
    </svg>
  `,
  'japan-time-zone-map.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 720" width="1200" height="720">
      <rect width="100%" height="100%" fill="#090514" rx="16" />
      <text x="600" y="80" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="36" font-weight="700" fill="#f8fafc">Japan Standard Time Zone Map</text>
      
      <!-- Outline Map of Japan representation -->
      <path d="M250,550 C280,500 320,440 380,360 C440,300 480,240 520,180 C560,140 600,100 650,60" fill="none" stroke="#6b21a8" stroke-width="24" stroke-linecap="round" opacity="0.4" />
      <path d="M250,550 C280,500 320,440 380,360 C440,300 480,240 520,180 C560,140 600,100 650,60" fill="none" stroke="#a855f7" stroke-width="12" stroke-linecap="round" />
      
      <circle cx="480" cy="240" r="16" fill="#f43f5e" />
      <text x="510" y="248" font-family="'Space Grotesk', sans-serif" font-size="28" font-weight="700" fill="#f8fafc">TOKYO</text>
      
      <g transform="translate(750, 320)">
        <rect width="350" height="240" fill="#180e29" rx="12" stroke="#6b21a8" stroke-width="2" />
        <text x="175" y="60" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="24" font-weight="700" fill="#c084fc">Single Time Zone</text>
        <text x="175" y="120" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="18" fill="#f1f5f9">100% of Japan observes</text>
        <text x="175" y="160" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="24" font-weight="800" fill="#a855f7">JST (UTC+9)</text>
        <text x="175" y="200" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="16" fill="#94a3b8">No regional variations</text>
      </g>
    </svg>
  `,
  'jst-utc9-infographic.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 720" width="1200" height="720">
      <rect width="100%" height="100%" fill="#090514" rx="16" />
      <text x="600" y="80" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="36" font-weight="700" fill="#f8fafc">JST (UTC+9) Offset Infographic</text>
      
      <circle cx="600" cy="380" r="180" fill="none" stroke="#4c1d95" stroke-width="16" />
      <circle cx="600" cy="380" r="180" fill="none" stroke="#c084fc" stroke-width="16" stroke-dasharray="280 850" />
      
      <text x="600" y="360" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="48" font-weight="800" fill="#f8fafc">+9 Hours</text>
      <text x="600" y="410" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="24" fill="#a855f7">Ahead of UTC / GMT</text>

      <g transform="translate(100, 280)">
        <rect width="250" height="200" fill="#180e29" rx="8" />
        <text x="125" y="60" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="22" fill="#94a3b8">UTC / GMT</text>
        <text x="125" y="130" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="48" font-weight="700" fill="#f8fafc">00:00</text>
      </g>
      <g transform="translate(850, 280)">
        <rect width="250" height="200" fill="#180e29" rx="8" />
        <text x="125" y="60" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="22" fill="#a855f7">JST (Tokyo)</text>
        <text x="125" y="130" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="48" font-weight="700" fill="#a855f7">09:00</text>
      </g>
    </svg>
  `,
  'jst-timeline.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 720" width="1200" height="720">
      <rect width="100%" height="100%" fill="#090514" rx="16" />
      <text x="600" y="80" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="36" font-weight="700" fill="#f8fafc">Japan Standard Time Annual Timeline</text>
      
      <!-- Linear Timeline indicating no change -->
      <line x1="100" y1="360" x2="1100" y2="360" stroke="#6b21a8" stroke-width="8" stroke-linecap="round" />
      
      <rect x="150" y="240" width="900" height="80" rx="8" fill="#180e29" stroke="#a855f7" stroke-width="4" />
      <text x="600" y="290" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="28" font-weight="700" fill="#f8fafc">JST (UTC+9) Observed Year-Round</text>
      
      <text x="200" y="440" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="20" fill="#94a3b8">January</text>
      <text x="500" y="440" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="20" fill="#94a3b8">June (No DST Change)</text>
      <text x="800" y="440" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="20" fill="#94a3b8">December</text>
    </svg>
  `,
  'tse-business-hours.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 720" width="1200" height="720">
      <rect width="100%" height="100%" fill="#090514" rx="16" />
      <text x="600" y="80" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="36" font-weight="700" fill="#f8fafc">Tokyo Stock Exchange (TSE) Trading Hours</text>
      
      <!-- Morning Session -->
      <g transform="translate(150, 200)">
        <rect width="400" height="340" fill="#180e29" rx="12" stroke="#6b21a8" stroke-width="2" />
        <text x="200" y="60" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="24" font-weight="700" fill="#c084fc">Morning Session</text>
        <text x="200" y="160" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="42" font-weight="800" fill="#f8fafc">9:00 AM</text>
        <text x="200" y="210" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="24" fill="#94a3b8">to</text>
        <text x="200" y="260" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="42" font-weight="800" fill="#f8fafc">11:30 AM JST</text>
      </g>
      
      <!-- Afternoon Session -->
      <g transform="translate(650, 200)">
        <rect width="400" height="340" fill="#180e29" rx="12" stroke="#6b21a8" stroke-width="2" />
        <text x="200" y="60" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="24" font-weight="700" fill="#c084fc">Afternoon Session</text>
        <text x="200" y="160" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="42" font-weight="800" fill="#f8fafc">12:30 PM</text>
        <text x="200" y="210" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="24" fill="#94a3b8">to</text>
        <text x="200" y="260" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="42" font-weight="800" fill="#f8fafc">3:00 PM JST</text>
      </g>
    </svg>
  `,
  'tokyo-vs-world-time-comparison.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 720" width="1200" height="720">
      <rect width="100%" height="100%" fill="#090514" rx="16" />
      <text x="600" y="80" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="36" font-weight="700" fill="#f8fafc">Tokyo vs Global Offsets Comparison</text>
      
      <g transform="translate(100, 180)">
        <rect width="200" height="150" fill="#180e29" rx="8" />
        <text x="100" y="50" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="20" fill="#94a3b8">TOKYO</text>
        <text x="100" y="100" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="28" font-weight="700" fill="#a855f7">JST (UTC+9)</text>
      </g>
      <g transform="translate(350, 180)">
        <rect width="200" height="150" fill="#180e29" rx="8" />
        <text x="100" y="50" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="20" fill="#94a3b8">LONDON</text>
        <text x="100" y="100" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="28" font-weight="700" fill="#f8fafc">-8 / -9 Hours</text>
      </g>
      <g transform="translate(600, 180)">
        <rect width="200" height="150" fill="#180e29" rx="8" />
        <text x="100" y="50" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="20" fill="#94a3b8">NEW YORK</text>
        <text x="100" y="100" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="28" font-weight="700" fill="#f8fafc">-13 / -14 Hours</text>
      </g>
      <g transform="translate(850, 180)">
        <rect width="200" height="150" fill="#180e29" rx="8" />
        <text x="100" y="50" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="20" fill="#94a3b8">LOS ANGELES</text>
        <text x="100" y="100" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="28" font-weight="700" fill="#f8fafc">-16 / -17 Hours</text>
      </g>
      
      <g transform="translate(475, 400)">
        <rect width="250" height="150" fill="#180e29" rx="8" />
        <text x="125" y="50" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="20" fill="#94a3b8">SYDNEY</text>
        <text x="125" y="100" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="28" font-weight="700" fill="#f8fafc">+1 / +2 Hours</text>
      </g>
    </svg>
  `,
  'tokyo-international-meeting-planner.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 720" width="1200" height="720">
      <rect width="100%" height="100%" fill="#090514" rx="16" />
      <text x="600" y="80" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="36" font-weight="700" fill="#f8fafc">Tokyo International Meeting Planner</text>
      
      <g transform="translate(100, 180)">
        <rect width="1000" height="100" fill="#180e29" rx="8" />
        <text x="50" y="60" font-family="'Space Grotesk', sans-serif" font-size="24" font-weight="700" fill="#c084fc">Tokyo Time (JST)</text>
        <text x="350" y="60" font-family="'Manrope', sans-serif" font-size="20" fill="#f8fafc">9:00 AM to 11:00 AM</text>
        <rect x="700" y="20" width="250" height="60" rx="4" fill="#047857" />
        <text x="825" y="55" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="18" font-weight="700" fill="#f8fafc">Overlapping Slot</text>
      </g>
      <g transform="translate(100, 310)">
        <rect width="1000" height="100" fill="#180e29" rx="8" />
        <text x="50" y="60" font-family="'Space Grotesk', sans-serif" font-size="24" font-weight="700" fill="#f8fafc">London Time (GMT)</text>
        <text x="350" y="60" font-family="'Manrope', sans-serif" font-size="20" fill="#f8fafc">12:00 AM to 2:00 AM</text>
        <rect x="700" y="20" width="250" height="60" rx="4" fill="#b91c1c" />
        <text x="825" y="55" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="18" font-weight="700" fill="#f8fafc">Midnight Gap</text>
      </g>
      <g transform="translate(100, 440)">
        <rect width="1000" height="100" fill="#180e29" rx="8" />
        <text x="50" y="60" font-family="'Space Grotesk', sans-serif" font-size="24" font-weight="700" fill="#f59e0b">Sydney Time (AEST)</text>
        <text x="350" y="60" font-family="'Manrope', sans-serif" font-size="20" fill="#f8fafc">10:00 AM to 12:00 PM</text>
        <rect x="700" y="20" width="250" height="60" rx="4" fill="#047857" />
        <text x="825" y="55" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="18" font-weight="700" fill="#f8fafc">Perfect Alignment</text>
      </g>
    </svg>
  `,
  'japan-travel-time-difference.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 720" width="1200" height="720">
      <rect width="100%" height="100%" fill="#090514" rx="16" />
      <text x="600" y="80" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="36" font-weight="700" fill="#f8fafc">Japan Travel Jet Lag Map</text>
      
      <circle cx="600" cy="380" r="180" fill="none" stroke="#4c1d95" stroke-width="8" />
      <circle cx="600" cy="380" r="180" fill="none" stroke="#c084fc" stroke-width="8" stroke-dasharray="400 800" />
      <text x="600" y="360" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="24" font-weight="700" fill="#f8fafc">Eastward Jet Lag</text>
      <text x="600" y="400" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="18" fill="#94a3b8">Requires earlier sleep patterns</text>
    </svg>
  `,
  'programming-with-jst-workflow.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 720" width="1200" height="720">
      <rect width="100%" height="100%" fill="#090514" rx="16" />
      <text x="600" y="80" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="36" font-weight="700" fill="#f8fafc">Japan API Timestamp Flow</text>
      
      <g transform="translate(100, 260)">
        <rect width="260" height="200" fill="#180e29" rx="12" stroke="#6b21a8" stroke-width="2" />
        <text x="130" y="50" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="22" font-weight="700" fill="#60a5fa">API Client (Tokyo)</text>
        <text x="130" y="110" text-anchor="middle" font-family="monospace" font-size="14" fill="#f1f5f9">2026-07-15T09:00:00+09:00</text>
        <text x="130" y="150" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="16" fill="#94a3b8">ISO 8601 Offset</text>
      </g>
      
      <line x1="390" y1="360" x2="490" y2="360" stroke="#a855f7" stroke-width="6" stroke-dasharray="10 5" />
      
      <g transform="translate(520, 260)">
        <rect width="260" height="200" fill="#1e1b4b" rx="12" stroke="#a855f7" stroke-width="2" />
        <text x="130" y="50" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="22" font-weight="700" fill="#10b981">Database (UTC)</text>
        <text x="130" y="110" text-anchor="middle" font-family="monospace" font-size="14" fill="#f1f5f9">2026-07-15T00:00:00Z</text>
        <text x="130" y="150" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="16" fill="#94a3b8">Zero offset storage</text>
      </g>
      
      <line x1="810" y1="360" x2="910" y2="360" stroke="#a855f7" stroke-width="6" stroke-dasharray="10 5" />
      
      <g transform="translate(940, 260)">
        <rect width="220" height="200" fill="#180e29" rx="12" stroke="#6b21a8" stroke-width="2" />
        <text x="110" y="50" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="22" font-weight="700" fill="#a78bfa">Local Presentation</text>
        <text x="110" y="110" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="18" fill="#f8fafc">Asia/Tokyo</text>
        <text x="110" y="150" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="16" fill="#94a3b8">Resolved using zone ID</text>
      </g>
    </svg>
  `,
  'tokyo-24-hour-clock-timeline.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 720" width="1200" height="720">
      <rect width="100%" height="100%" fill="#090514" rx="16" />
      <text x="600" y="80" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="36" font-weight="700" fill="#f8fafc">Tokyo 24-Hour Clock Timeline</text>
      
      <circle cx="600" cy="380" r="180" fill="none" stroke="#6b21a8" stroke-width="12" />
      
      <text x="600" y="360" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-size="24" font-weight="700" fill="#a855f7">24-Hour Scheduling</text>
      <text x="600" y="400" text-anchor="middle" font-family="'Manrope', sans-serif" font-size="20" fill="#f8fafc">Standard in Transport</text>
    </svg>
  `
};

for (const [name, content] of Object.entries(svgs)) {
  const filePath = path.join(targetDir, name);
  console.log(`Writing SVG ${name} to ${filePath}...`);
  fs.writeFileSync(filePath, content.trim(), 'utf8');
}
console.log('SUCCESS: All Tokyo SVGs generated successfully!');
