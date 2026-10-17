import fs from "fs";

const xml = fs.readFileSync(".vercel/output/static/sitemap-0.xml", "utf8");
const urls = new Set([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]));

const testUrls = [
  "https://gmttoestconverter.com/ru/blog/uefa-champions-league-final-2026-kickoff-time-gmt-est/",
  "https://gmttoestconverter.com/bn/gmt-to-nzdt/",
  "https://gmttoestconverter.com/japan-time-to-est/",
  "https://gmttoestconverter.com/hi/gmt-to-pkt/",
  "https://gmttoestconverter.com/es/gmt-to-hdt/",
  "https://gmttoestconverter.com/ar/disclaimer/",
  "https://gmttoestconverter.com/gmt-to-mest",
  "https://gmttoestconverter.com/gmt-to-mest/",
  "https://gmttoestconverter.com/en/",
  "https://gmttoestconverter.com/what-is-est/",
  "https://gmttoestconverter.com/business-hours-overlap",
  "https://gmttoestconverter.com/bst",
  "https://gmttoestconverter.com/gmt-to-est",
];

for (const u of testUrls) {
  console.log(u, "in sitemap?", urls.has(u));
}
