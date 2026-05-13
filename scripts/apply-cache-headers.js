const fs = require("fs");
const path = require("path");

const configPath = path.join(process.cwd(), ".vercel", "output", "config.json");

if (!fs.existsSync(configPath)) {
  console.log("No Vercel output config found; skipping cache header patch.");
  process.exit(0);
}

const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
const managedSources = new Set([
  "^/index\\.php/?$",
  "^/assets/(.*)$",
  "^/(.*\\.(?:avif|webp|png|jpg|jpeg|gif|svg|ico|css|js|woff2?))$",
  "^/(.*\\.(?:html|xml|txt|json))$",
]);

const redirectRoutes = [
  {
    src: "^/index\\.php/?$",
    headers: {
      Location: "/",
    },
    status: 301,
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
const fallbackIndex = withRedirects.findIndex((route) => route.status === 404);
const insertIndex = fallbackIndex === -1 ? withRedirects.length : fallbackIndex;

config.routes = [
  ...withRedirects.slice(0, insertIndex),
  ...cacheRoutes,
  ...withRedirects.slice(insertIndex),
];

fs.writeFileSync(configPath, `${JSON.stringify(config, null, "\t")}\n`);
console.log("Applied cache headers to .vercel/output/config.json");
