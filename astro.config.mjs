import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";

export default defineConfig({
  site: process.env.SITE_URL || "https://gmttoest.com",
  trailingSlash: "always",
  output: "static",
  adapter: vercel(),
  integrations: [mdx(), sitemap()],
  vite: {
    resolve: {
      alias: {
        src: "/src",
        theme: "/theme"
      }
    }
  }
});
