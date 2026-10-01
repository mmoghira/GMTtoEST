const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", ".vercel", "output", "static", "blog", "newfoundland-time-zone", "index.html");

if (fs.existsSync(filePath)) {
  const content = fs.readFileSync(filePath, "utf8");
  console.log("File size:", content.length, "bytes");
  console.log("Title found:", content.includes("Newfoundland Time Zone Explained"));
  console.log("BlogPosting schema:", content.includes("BlogPosting"));
  console.log("FAQPage schema:", content.includes("FAQPage"));
  console.log("BreadcrumbList schema:", content.includes("BreadcrumbList"));
  console.log("Hero AVIF preload:", content.includes("newfoundland-time-zone-hero-1200.avif"));
  console.log("Hero WebP:", content.includes("newfoundland-time-zone-hero-1200.webp"));
  console.log("Infographic 1 (Solar Longitude):", content.includes("newfoundland-solar-time-longitude-infographic.webp"));
  console.log("Infographic 2 (Canada Time Zones):", content.includes("newfoundland-vs-canadian-time-zones.webp"));
  console.log("Infographic 3 (Provincial Split):", content.includes("newfoundland-and-labrador-timezone-split.webp"));

  // Check sitemap
  const sitemapPath = path.join(__dirname, "..", ".vercel", "output", "static", "sitemap-0.xml");
  if (fs.existsSync(sitemapPath)) {
    const sitemap = fs.readFileSync(sitemapPath, "utf8");
    console.log("Found in sitemap-0.xml:", sitemap.includes("newfoundland-time-zone"));
  }
} else {
  console.error("File not found at:", filePath);
  process.exit(1);
}
