const fs = require("fs");
const path = require("path");

const configPath = path.join(process.cwd(), ".vercel", "output", "config.json");

if (!fs.existsSync(configPath)) {
  console.log("No Vercel output config found; skipping cache header patch.");
  process.exit(0);
}

const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
const securityHeadersSource = "^/(.*)$";
const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://pagead2.googlesyndication.com https://www.clarity.ms https://*.clarity.ms https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: blob: https://www.google-analytics.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://www.clarity.ms https://*.clarity.ms",
  "font-src 'self' data: https://fonts.gstatic.com",
  "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://pagead2.googlesyndication.com https://www.clarity.ms https://*.clarity.ms https://vitals.vercel-insights.com https://va.vercel-scripts.com",
  "frame-src 'self' https://googleads.g.doubleclick.net https://tpc.googlesyndication.com",
  "form-action 'self' https://formsubmit.co",
  "upgrade-insecure-requests",
].join("; ");
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
      "content-security-policy": contentSecurityPolicy,
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
const securityInsertIndex = filesystemIndex === -1 ? filteredRoutes.length : filesystemIndex;
const withSecurityHeaders = [
  ...filteredRoutes.slice(0, securityInsertIndex),
  ...securityRoutes,
  ...filteredRoutes.slice(securityInsertIndex),
];
const fallbackIndex = withSecurityHeaders.findIndex((route) => route.status === 404);
const insertIndex = fallbackIndex === -1 ? withSecurityHeaders.length : fallbackIndex;

config.routes = [
  ...withSecurityHeaders.slice(0, insertIndex),
  ...cacheRoutes,
  ...withSecurityHeaders.slice(insertIndex),
];

fs.writeFileSync(configPath, `${JSON.stringify(config, null, "\t")}\n`);
console.log("Applied security and cache headers to .vercel/output/config.json");
