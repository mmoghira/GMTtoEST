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
  "script-src 'self' 'unsafe-inline' https://www.clarity.ms https://*.clarity.ms https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.clarity.ms https://*.clarity.ms",
  "font-src 'self' data:",
  "connect-src 'self' https://www.clarity.ms https://*.clarity.ms https://vitals.vercel-insights.com https://va.vercel-scripts.com",
  "form-action 'self' https://formsubmit.co",
  "upgrade-insecure-requests",
].join("; ");
const managedSources = new Set([
  securityHeadersSource,
  "^/$",
  "^/index\\.php/?$",
  "^/assets/(.*)$",
  "^/(.*\\.(?:avif|webp|png|jpg|jpeg|gif|svg|ico|css|js|woff2?))$",
  "^/(.*\\.(?:html|xml|txt|json))$",
]);

const redirectRoutes = [
  {
    src: "^/$",
    headers: {
      Location: "/gmt-to-est-converter/",
    },
    status: 301,
  },
  {
    src: "^/index\\.php/?$",
    headers: {
      Location: "/gmt-to-est-converter/",
    },
    status: 301,
  },
];

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
const wellKnownIndex = filteredRoutes.findIndex((route) => route.src === "^/\\.well-known(?:/.*)?$");
const redirectIndex = wellKnownIndex === -1 ? 0 : wellKnownIndex + 1;
const withRedirects = [
  ...filteredRoutes.slice(0, redirectIndex),
  ...redirectRoutes,
  ...filteredRoutes.slice(redirectIndex),
];
const filesystemIndex = withRedirects.findIndex((route) => route.handle === "filesystem");
const securityInsertIndex = filesystemIndex === -1 ? withRedirects.length : filesystemIndex;
const withSecurityHeaders = [
  ...withRedirects.slice(0, securityInsertIndex),
  ...securityRoutes,
  ...withRedirects.slice(securityInsertIndex),
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
