import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";

const rawSiteUrl = process.env.SITE_URL || "https://gmttoestconverter.com";
const siteUrl = rawSiteUrl.replace(/\/+$/, "").replace("://www.", "://");
const enableMultilingualPages = true;
const sitemapExcludedPaths = new Set([
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
        
        const langMatch = pathname.match(/^\/([a-z]{2})\//);
        const lang = langMatch ? langMatch[1] : "en";
        const cleanPath = pathname.replace(/^\/[a-z]{2}\//, "/");
        
        // Exclude paths explicitly configured in exclusions list
        if (sitemapExcludedPaths.has(cleanPath)) {
          return false;
        }
        
        const mainPaths = ["/", "/gmt-to-est/", "/est-to-gmt/", "/gmt-vs-est/", "/time-zone-guide/"];
        
        // Exclude dynamic timezone converter pages that redirect to the homepage,
        // while keeping activated converter landing pages indexable.
        const activatedConverterPaths = new Set([
          "/ast-to-est/", "/cdt-to-est/", "/cst-to-est/", "/kst-to-est/", "/mst-to-est/", "/pdt-to-est/",
          "/gmt-to-acdt/", "/gmt-to-bst/", "/gmt-to-aest/", "/gmt-to-idt/", "/eest-to-est/", "/gmt-to-nzst/",
          "/aest-to-est/", "/gmt-to-eet/", "/edt-to-est/", "/gmt-to-cdt/", "/gmt-to-eat/", "/gmt-to-ist/",
          "/gmt-to-akdt/", "/gmt-to-awst/", "/gmt-to-met/", "/gmt-to-pdt/", "/wita-to-est/",
          "/eet-to-est/", "/gmt-to-pst/", "/hst-to-est/", "/idt-to-est/", "/pkt-to-est/",
          "/gmt-to-ast/", "/gmt-to-cst/", "/gmt-to-utc/", "/cat-to-est/", "/ist-to-est/",
          "/mest-to-est/", "/gmt-to-sst/", "/acst-to-est/", "/gmt-to-acst/", "/west-to-est/",
          "/gmt-to-kst/", "/bst-to-est/", "/cet-to-est/", "/gmt-to-ndt/", "/awst-to-est/",
          "/wit-to-est/", "/gmt-to-sast/", "/gmt-to-mdt/", "/gmt-to-eest/", "/wet-to-est/",
          "/msk-to-est/", "/nzst-to-est/", "/akdt-to-est/", "/wat-to-est/", "/acdt-to-est/",
          "/cest-to-est/", "/gmt-to-chst/", "/gmt-to-west/", "/gmt-to-wet/", "/gmt-to-wit/",
          "/gmt-to-cest/", "/mdt-to-est/"
        ]);
        if (!activatedConverterPaths.has(cleanPath)) {
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
