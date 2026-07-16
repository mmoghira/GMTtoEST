const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const brainDir = path.resolve('C:/Users/PMYLS/.gemini/antigravity/brain/c1f3b227-6bd5-474c-9f27-8f48e81518ff');
const targetDir = path.resolve(__dirname, '../public/assets');

const mappings = [
  { src: 'los_angeles_skyline_1784186472478.png', dest: 'los-angeles-skyline.webp' },
  { src: 'california_time_zone_map_1784186488005.png', dest: 'california-time-zone-map.webp' },
  { src: 'pst_vs_pdt_timeline_1784186506384.png', dest: 'pst-vs-pdt-timeline.webp' },
  { src: 'pacific_time_utc_offset_1784186533802.png', dest: 'pacific-time-utc-offset.webp' },
  { src: 'hollywood_production_schedule_1784186549030.png', dest: 'hollywood-production-schedule.webp' },
  { src: 'silicon_beach_business_hours_1784186569615.png', dest: 'silicon-beach-business-hours.webp' },
  { src: 'los_angeles_vs_world_time_1784186585074.png', dest: 'los-angeles-vs-world-time.webp' },
  { src: 'international_meeting_planner_1784186599276.png', dest: 'international-meeting-planner.webp' },
  { src: 'flight_time_difference_1784186614247.png', dest: 'flight-time-difference.webp' },
  { src: 'annual_pacific_time_clock_1784186626472.png', dest: 'annual-pacific-time-clock.webp' }
];

async function convert() {
  for (const m of mappings) {
    const srcPath = path.join(brainDir, m.src);
    const destPath = path.join(targetDir, m.dest);
    
    if (!fs.existsSync(srcPath)) {
      console.error(`Source file not found: ${srcPath}`);
      continue;
    }
    
    console.log(`Converting ${m.src} to ${m.dest}...`);
    try {
      await sharp(srcPath)
        .webp({ quality: 85 })
        .toFile(destPath);
      console.log(`Success: Saved to ${destPath}`);
    } catch (err) {
      console.error(`Error converting ${m.src}:`, err);
    }
  }
}

convert();
