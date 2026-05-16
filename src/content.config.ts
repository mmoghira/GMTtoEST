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
const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    keywords: z.string().optional(),
    sources: z.array(z.object({
      title: z.string(),
      url: z.string().url(),
      publisher: z.string().optional()
    })).optional(),
    faq: z.array(z.object({
      q: z.string(),
      a: z.string()
    })).optional(),
  })
});

export const collections = { topics, blog };
