import { defineCollection, z } from "astro:content";

import { glob } from "astro/loaders";

const writings = defineCollection({
  loader: glob({ pattern: "*.md", base: "src/pages/writings" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = { writings };
