import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const topics = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/topics" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    order: z.number()
  })
});

export const collections = { topics };
