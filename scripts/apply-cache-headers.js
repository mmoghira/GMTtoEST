const fs = require("fs");
const path = require("path");

const configPath = path.join(process.cwd(), ".vercel", "output", "config.json");

if (!fs.existsSync(configPath)) {
  console.log("No Vercel output config found; skipping cache header patch.");
  process.exit(0);
}

const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
const securityHeadersSource = "^/(.*)$";
const managedSources = new Set([
  securityHeadersSource,
  "^/assets/(.*)$",
  "^/(.*\\.(?:avif|webp|png|jpg|jpeg|gif|svg|ico|css|js|woff2?))$",
  "^/(.*\\.(?:html|xml|txt|json))$",
]);

const securityRoutes = [
  {
    src: securityHeadersSource,
    headers: {
      "x-content-type-options": "nosniff",
      "x-frame-options": "SAMEORIGIN",
      "referrer-policy": "strict-origin-when-cross-origin",
    },
    continue: true,
  },
];

const cacheRoutes = [
  {
    src: "^/assets/(.*)$",
    headers: {
      "cache-control": "public, max-age=31536000, immutable",
    },
    continue: true,
  },
  {
    src: "^/(.*\\.(?:avif|webp|png|jpg|jpeg|gif|svg|ico|css|js|woff2?))$",
    headers: {
      "cache-control": "public, max-age=31536000, immutable",
    },
    continue: true,
  },
  {
    src: "^/(.*\\.(?:html|xml|txt|json))$",
    headers: {
      "cache-control": "public, max-age=0, must-revalidate",
    },
    continue: true,
  },
];

const routes = Array.isArray(config.routes) ? config.routes : [];
const filteredRoutes = routes.filter((route) => !managedSources.has(route.src));
const filesystemIndex = filteredRoutes.findIndex((route) => route.handle === "filesystem");
const headerInsertIndex = filesystemIndex === -1 ? filteredRoutes.length : filesystemIndex;

config.routes = [
  ...filteredRoutes.slice(0, headerInsertIndex),
  ...securityRoutes,
  ...cacheRoutes,
  ...filteredRoutes.slice(headerInsertIndex),
];

fs.writeFileSync(configPath, `${JSON.stringify(config, null, "\t")}\n`);
console.log("Applied security and cache headers to .vercel/output/config.json");

// Ensure sitemap.xml exists alongside sitemap-index.xml in output directories
const vercelStaticDir = path.join(process.cwd(), ".vercel", "output", "static");
const distClientDir = path.join(process.cwd(), "dist", "client");

[vercelStaticDir, distClientDir].forEach((dir) => {
  const indexXml = path.join(dir, "sitemap-index.xml");
  const sitemapXml = path.join(dir, "sitemap.xml");
  if (fs.existsSync(indexXml)) {
    fs.copyFileSync(indexXml, sitemapXml);
    console.log(`Copied sitemap-index.xml to sitemap.xml in ${dir}`);
  }
});
