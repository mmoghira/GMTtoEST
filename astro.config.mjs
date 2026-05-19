import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";

const rawSiteUrl = process.env.SITE_URL || "https://gmttoestconverter.com";
const siteUrl = rawSiteUrl.replace(/\/+$/, "").replace("://www.", "://");

export default defineConfig({
  site: siteUrl,
  trailingSlash: "always",
  output: "static",
  build: {
    inlineStylesheets: "always"
  },
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
      filter: (page) => page !== `${siteUrl}/`,
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
});
