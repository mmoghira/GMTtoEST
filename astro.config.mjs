import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";

const rawSiteUrl = process.env.SITE_URL || "https://gmttoestconverter.com";
const siteUrl = rawSiteUrl.replace(/\/+$/, "").replace("://www.", "://");
const enableMultilingualPages = true;
const sitemapExcludedPaths = new Set([
  "/gmt-to-est/",
  "/gmt-to-est-converter/",
  "/sitemap/",
]);
const sitemapLocales = enableMultilingualPages
  ? {
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
    }
  : { en: "en" };

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
      filter: (page) => {
        const url = new URL(page);
        const pathname = url.pathname;
        
        // Strip localized language prefix (e.g. /es/, /zh/) to perform clean path matches
        const cleanPath = pathname.replace(/^\/[a-z]{2}\//, "/");
        
        // Exclude paths explicitly configured in exclusions list
        if (sitemapExcludedPaths.has(cleanPath)) {
          return false;
        }
        
        // Exclude dynamic timezone converter pages that redirect to the homepage,
        // while keeping activated converter landing pages indexable.
        if (!["/ast-to-est/", "/cdt-to-est/", "/cst-to-est/", "/kst-to-est/", "/mst-to-est/", "/pdt-to-est/", "/gmt-to-acdt/", "/gmt-to-bst/", "/gmt-to-aest/", "/gmt-to-idt/", "/eest-to-est/", "/gmt-to-nzst/", "/aest-to-est/", "/gmt-to-eet/", "/edt-to-est/", "/gmt-to-cdt/"].includes(cleanPath)) {
          const gmtToTzRegex = /^\/gmt-to-[a-z0-9]+(\/)?$/i;
          const tzToEstRegex = /^\/[a-z0-9]+-to-est(\/)?$/i;
          
          if (gmtToTzRegex.test(cleanPath) || tzToEstRegex.test(cleanPath)) {
            return false;
          }
        }
        
        return true;
      },
      i18n: {
        defaultLocale: "en",
        locales: sitemapLocales,
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
