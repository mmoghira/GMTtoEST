import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";

export default defineConfig({
  site: process.env.SITE_URL || "https://gmttoest.com",
  trailingSlash: "always",
  output: "static",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
    speedInsights: {
      enabled: true,
    },
  }),
  integrations: [
    mdx(),
    sitemap({
      changefreq: "weekly",
      priority: 0.8,
      i18n: {
        defaultLocale: "en",
        locales: {
          en: "en",
          es: "es",
          zh: "zh",
          hi: "hi",
          ar: "ar",
          pt: "pt",
          ru: "ru",
          ja: "ja",
          de: "de",
          fr: "fr",
          ko: "ko",
          it: "it",
          tr: "tr",
          ur: "ur",
          bn: "bn",
          vi: "vi",
          th: "th",
          id: "id",
          fa: "fa",
          pl: "pl",
        },
      },
    }),
  ],
  vite: {
    resolve: {
      alias: {
        src: "/src",
        theme: "/theme"
      }
    }
  },
  // Redirect all root traffic to /en/
  server: {
    middlewares: [
      (req, res, next) => {
        if (req.url === "/" || req.url === "") {
          res.statusCode = 301;
          res.setHeader("Location", "/en/");
          res.end();
        } else {
          next();
        }
      }
    ]
  }
});
